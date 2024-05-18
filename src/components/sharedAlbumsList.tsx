import { db } from '@/db'
import { albums, usersToAlbums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

async function SharedAlbumsList({ email, id }: { email: string; id: string }) {
  const sharedAlbums = await db.query.usersToAlbums.findMany({
    where: eq(usersToAlbums.userEmail, email),
    with: { album: true },
  })

  if (sharedAlbums.some((shalbum) => shalbum.userId === null)) {
    const updateRefAlbums = sharedAlbums.filter((alb) => alb.userId === null)
    for (let album of updateRefAlbums) {
      await db
        .update(usersToAlbums)
        .set({ userId: id })
        .where(eq(usersToAlbums.id, album.id))
    }
  }

  //const sharedAlbums = undefined

  if (!sharedAlbums) {
    return (
      <>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Albums</h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="py-24 text-center">
            <h1 className="text-2xl font-bold py-4">
              You have no shared Albums
            </h1>
            <p className="text-lg">
              Ask your friend to share his album with you to contribute
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shared with me</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sharedAlbums.map((shalbum) => (
          <Link
            className="group"
            href={`/album/${shalbum.album.id}`}
            key={shalbum.album.id}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                alt="Album Cover"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                height={300}
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}covers/${shalbum
                  .album.cover!}`}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {shalbum.album.name}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  Capture the essence of summer with this vibrant photo album.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default SharedAlbumsList
