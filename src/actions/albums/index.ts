'use server'
import { revalidatePath } from 'next/cache'
import { File } from 'buffer'
import { z, ZodError } from 'zod'
import { db } from '@/db'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { auth } from '@/auth/auth'
import sharp from 'sharp'
import { albums } from '@/db/schema/album'

export async function createAlbum(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    album_name: z.string().min(1, 'We need a name for the album'),
    album_cover: z
      .custom<File>()
      .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
        message: 'The profile picture must be a maximum of 10MB.',
      })
      .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
        message: 'Only images are allowed to be sent.',
      }),
  })

  try {
    const session = await auth()
    if (!session || !session.user) {
      throw new Error('unauthorized')
    }
    const data = formDataSchema.parse({
      album_name: formData.get('album_name'),
      album_cover: formData.get('album_cover'),
    })

    const photoName = `${Date.now()}${data.album_cover.name}`

    if (data.album_cover && data.album_cover instanceof File) {
      const buffer = Buffer.from(await data.album_cover.arrayBuffer())
      const name = photoName
      const uploadResponse = await uploadCover(buffer, name)

      if (uploadResponse) {
        const res = await db.insert(albums).values({
          name: data.album_name,
          ownerId: session.user.id,
          cover: name,
          //OJO CAMBIAR A DINAMICO
        })
        if (res) console.log('db res', res)
      }
    }

    revalidatePath('/')
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return { status: 'error', message: error.errors[0] }
    }
    return { status: 'error', message: 'Failed to upload file.' }
  }
}

////////// utils////

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
})

export async function uploadCover(file: Buffer, fileName: string) {
  const fileBuffer = await sharp(file)
    .jpeg({ quality: 60 })
    .resize(400, 400)
    .toBuffer()

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `covers/${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpg',
  }
  try {
    const command = new PutObjectCommand(params)
    const response = await s3Client.send(command)

    console.log('Cover uploaded successfully:', response)
    return `${fileName}`
  } catch (error) {
    console.log(error)
    throw error
  }
}
