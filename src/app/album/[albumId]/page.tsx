'use server'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'
import PhotoGallery from '@/components/photoGallery'
import NotPhotosYet from '@/components/notPhotosYet'
import { db } from '@/db'

//import photos from '@/photos'
import { albums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import ShareAlbumForm from '@/components/shareAlbumForm'

export default async function AlbumsPage({
  params,
}: {
  params: { albumId: string }
}) {
  const session = await auth()
  if (!session) {
    return redirect('/signIn')
  }

  const album = await db.query.albums.findFirst({
    where: eq(albums.id, parseInt(params.albumId)),
    with: { photos: true, friends: true },
  })

  const isContributor = album?.friends.find(
    (contributor) => contributor.userId === session.user?.id
  )

  if (session.user?.id !== album?.ownerId && !isContributor) {
    redirect('/not-authorized')
  }

  const albumPhotos = album?.photos.map((photo) => {
    return {
      src: `${process.env.NEXT_PUBLIC_IMAGE_PATH}photos/${photo.url}`,
      width: photo.width!,
      height: photo.height!,
      download: `${process.env.NEXT_PUBLIC_IMAGE_PATH}photos/${photo.url}?download`,
    }
  })

  if (!albumPhotos || !albumPhotos?.length) {
    return (
      <>
        <NotPhotosYet />
        <div className="flex items-center justify-center mb-8">
          <div>
            <Link
              className="px-4 py-3 font-bold bg-blue-500 rounded-md text-white  hover:bg-blue-400 shadow-lg transition-all"
              href={`/photo-upload/${params.albumId}`}
            >
              Add more Photos
            </Link>
          </div>
        </div>
      </>
    )
  }

  //console.log(pphotos)

  return (
    <>
      <main>
        <div className=" flex flex-wrap-reverse gap-6 justify-between items-center mx-3 my-4">
          <div className="hidden lg:block lg:flex-1"></div>
          <div className="flex-1 text-center md:text-left lg:text-center">
            <h1 className="text-2xl">{album?.name}</h1>
          </div>

          <ShareAlbumForm albumId={params.albumId} />
        </div>
        <PhotoGallery photos={albumPhotos} />
        <div className="flex items-center justify-center mb-8">
          <div>
            <Link
              className="px-4 py-3 font-bold bg-blue-500 rounded-md text-white "
              href={`/photo-upload/${params.albumId}`}
            >
              Add more Photos
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
