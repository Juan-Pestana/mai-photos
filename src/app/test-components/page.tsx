import React from 'react'
import UploadForm from '@/components/UploadForm'
import { auth } from '@/auth/auth'

export default async function testComponents() {
  const session = await auth()

  if (!session || !session.user) {
    return (
      <>
        <h1 className="text-4xl py-10 text-center">Upload Images</h1>
        <div>
          <h2>You must be authenticated to upload photos</h2>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="text-4xl py-10 text-center">Upload Images to S3</h1>

      <UploadForm id={session.user.id} />
    </>
  )
}
