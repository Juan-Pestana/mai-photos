import React from 'react'
import UploadForm from '@/components/UploadForm'
import { auth } from '@/auth/auth'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/db'
import { albums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function testComponents({
  params,
}: {
  params: { albumId: string }
}) {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/not-authorized')
  }

  const album = await db.query.albums.findFirst({
    where: eq(albums.id, parseInt(params.albumId)),
    with: { friends: true },
  })

  const isContributor = album?.friends.find(
    (contributor) => contributor.userId === session.user?.id
  )

  if (session.user?.id !== album?.ownerId && !isContributor) {
    redirect('/not-authorized')
  }

  return (
    <>
      <main className="relative">
        <div className="absolute top-3 left-3 `">
          <Link
            href={`/album/${params.albumId}`}
            className="text-blue-800 pt-3 flex items-center gap-2"
          >
            {' '}
            <span className="justify-center">
              <Image
                src={'/backArrow.svg'}
                width={28}
                height={28}
                alt="back arrow"
              />
            </span>{' '}
            <div className="align-middle">Back to Album</div>
          </Link>
        </div>
        <div className="pt-10">
          <h1 className="text-4xl py-10 text-center">
            Upload Images to {album?.name}
          </h1>

          <UploadForm id={session.user.id!} albumId={params.albumId} />
        </div>
      </main>
    </>
  )
}
