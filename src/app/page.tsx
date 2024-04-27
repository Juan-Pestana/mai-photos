'use server'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'
import PhotoGallery from '@/components/photoGallery'
import { db } from '@/db'

//import photos from '@/photos'
import { albums } from '../db/schema/album'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  if (!session) {
    return redirect('/signIn')
  }

  //console.log(pphotos)

  return (
    <>
      <main></main>
    </>
  )
}
