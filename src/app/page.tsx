'use server'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'
import PhotoGallery from '@/components/photoGallery'
import { db } from '@/db'

//import photos from '@/photos'
import { albums } from '../db/schema/album'
import { eq } from 'drizzle-orm'

export default async function Home() {
  const session = await auth()
  if (!session) {
    return redirect('/signIn')
  }

  const pphotos = await db.query.albums.findFirst({
    where: eq(albums.id, 1),
    with: { photos: true },
  })

  const albumPhotos = pphotos?.photos.map((photo) => {
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
      <div>
        <PhotoGallery photos={albumPhotos} />
      </div>
    </>
  )
}
