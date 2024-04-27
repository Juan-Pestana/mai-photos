'use server'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'
import PhotoGallery from '@/components/photoGallery'
import { db } from '@/db'

//import photos from '@/photos'
import { albums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

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
    with: { photos: true },
  })

  const albumPhotos = album?.photos.map((photo) => {
    return {
      src: `${process.env.NEXT_PUBLIC_IMAGE_PATH}${photo.url}`,
      width: photo.width!,
      height: photo.height!,
    }
  })

  if (!albumPhotos || !albumPhotos?.length) {
    return <div>There are no phots in this album</div>
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

          <form className="flex-1 flex gap-2 justify-end " action="">
            <input
              className="px-2 py-1 rounded-md border-2 border-slate-300"
              type="text"
              placeholder="friends email"
            />
            <button className="px-3 py-1 rounded-md bg-blue-500 text-white">
              {' '}
              Invite{' '}
            </button>
          </form>
        </div>
        <PhotoGallery photos={albumPhotos} />
        <div className="flex items-center justify-center mb-8">
          <div>
            <Link
              className="px-4 py-3 font-bold bg-blue-500 rounded-md text-white "
              href={''}
            >
              Add more Photos
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
