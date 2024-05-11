import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest } from 'next/server'
import { auth } from '@/auth/auth'

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
})

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session)
    return Response.json(
      { error: 'You must be authenticated to perform this action' },
      { status: 400 }
    )

  const { searchParams } = request.nextUrl

  const name = searchParams.get('name')
  const type = searchParams.get('type')

  if (!name) {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${type}/${name}`,
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 })

  return Response.json({ url })
}
