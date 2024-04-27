import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function createAlbumPage() {
  const session = await auth()
  if (!session) {
    return redirect('/signIn')
  }
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="">
          <form action="">
            <div className="flex flex-col">
              <label htmlFor="">Album Name</label>
              <input type="text" id="name" name="name" />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
