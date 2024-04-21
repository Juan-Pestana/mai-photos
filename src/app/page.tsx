'use client'
import Image from 'next/image'

import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'

import PhotoAlbum from 'react-photo-album'
import NextJsImage from '@/components/nextJsImage'

import photos from '@/photos'

export default function Home() {
  // const session = await auth()

  // if (!session) {
  //   return redirect('/signIn')
  // }

  return (
    <>
      <div className="h-full">
        <main className="my-10 mx-auto max-w-screen-xl h-full">
          <PhotoAlbum
            photos={photos}
            layout="rows"
            defaultContainerWidth={1280}
            renderPhoto={NextJsImage}
            targetRowHeight={150}
            sizes={{
              size: 'calc(100vw - 40px)',
              sizes: [
                { viewport: '(max-width: 299px)', size: 'calc(100vw - 10px)' },
                { viewport: '(max-width: 599px)', size: 'calc(100vw - 20px)' },
                { viewport: '(max-width: 1199px)', size: 'calc(100vw - 30px)' },
              ],
            }}
            // onClick={({ index }) => setIndex(index)}
          />
        </main>
      </div>
    </>
  )
}
