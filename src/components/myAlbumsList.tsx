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
      <div className="p-4 flex flex-wrap gap-4">
        {myAlbums.map((album) => (
          <div
            key={album.id}
            className="border-4 border-slate-700 mx-auto sm:mx-0 relative "
          >
            <Link href={`/album/${album.id}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}covers/${album.cover}`}
                alt={album.name!}
                width={200}
                height={200}
              />
            </Link>
            <div className="absolute bottom-0 left-0 w-full text-center text-white bg-black bg-opacity-40">
              {album.name}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyAlbumsList
