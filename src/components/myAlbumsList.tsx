import { db } from '@/db'
import { albums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import { Divide } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function MyAlbumsList({ id }: { id: string }) {
  const myAlbums = await db.query.albums.findMany({
    where: eq(albums.ownerId, id),
  })

  if (!myAlbums) {
    return
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Albums</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {myAlbums.map((album) => (
          <Link className="group" href={`album/${album.id}`} key={album.id}>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                alt="Album Cover"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                height={300}
                src={`${
                  process.env.NEXT_PUBLIC_IMAGE_PATH
                }covers/${album.cover!}`}
                style={{
                  aspectRatio: '400/300',
                  objectFit: 'cover',
                }}
                width={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {album.name}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {album.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default MyAlbumsList
