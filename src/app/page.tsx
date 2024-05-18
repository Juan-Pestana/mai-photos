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
    return redirect('/auth/signIn')
  }

  //console.log(pphotos)

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div>
          <MyAlbumsList id={session.user?.id} />
        </div>
        <div className="mt-8">
          <SharedAlbumsList email={session.user?.email!} id={session.user.id} />
        </div>
      </main>
    </>
  )
}
