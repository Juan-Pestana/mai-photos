'use server'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'
import PhotoGallery from '@/components/photoGallery'
import { db } from '@/db'

//import photos from '@/photos'
import { albums } from '../db/schema/album'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import MyAlbumsList from '@/components/myAlbumsList'
import SharedAlbumsList from '@/components/sharedAlbumsList'

export default async function Home() {
  const session = await auth()
  if (!session || !session.user?.id) {
    return redirect('/signIn')
  }

  //console.log(pphotos)

  return (
    <>
      <main className="flex flex-col justify-between mx-auto max-w-screen-xl my-10  px-3">
        <div>
          <h2 className="text-xl">My Albums</h2>
          <MyAlbumsList id={session.user?.id} />
        </div>
        <div>
          <h2 className="text-xl">Shared with me</h2>
          <SharedAlbumsList id={session.user?.id} />
        </div>
      </main>
    </>
  )
}
