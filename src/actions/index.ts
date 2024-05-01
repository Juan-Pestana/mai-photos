'use server'
import { revalidatePath } from 'next/cache'
import { File } from 'buffer'
import { z, ZodError } from 'zod'

import { db } from '@/db'
import { photos } from '@/db/schema/photos'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { auth } from '@/auth/auth'
import sharp from 'sharp'
import { albums } from '@/db/schema/album'

export async function uploadFile(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    userId: z.string().min(1, 'You must be authenticated'),
    width: z
      .string()
      .min(1, 'File size is Required')
      .transform((width) => parseInt(width)),

    height: z
      .string()
      .min(1, 'File size is Required')
      .transform((height) => parseInt(height)),
    file: z
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
      userId: formData.get('userId'),
      width: formData.get('width'),
      height: formData.get('height'),
      file: formData.get('file'),
    })

    if (data.file && data.file instanceof File) {
      const buffer = Buffer.from(await data.file.arrayBuffer())
      const name = `${Date.now()}${data.file.name}`
      const uploadResponse = await uploadFileToS3(
        buffer,
        name,
        data.width,
        data.height
      )
      if (uploadResponse) {
        const res = await db.insert(photos).values({
          url: name,
          width: data.width,
          height: data.height,
          user: data.userId,
          //OJO CAMBIAR A DINAMICO
          album_id: 1,
          location: 'caca',
        })
        if (res) console.log('db res', res)
      }
    }

    revalidatePath('/')
    return {
      status: 'success',
      message: `File ${data.file.name} has been uploaded.`,
    }
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return { status: 'error', message: error.errors[0] }
    }
    return { status: 'error', message: 'Failed to upload file.' }
  }
}

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

    console.log(data)

    if (data.album_cover && data.album_cover instanceof File) {
      const buffer = Buffer.from(await data.album_cover.arrayBuffer())
      const name = `${Date.now()}${data.album_cover.name}`
      const uploadResponse = await uploadCover(buffer, name)

      if (uploadResponse) {
        const res = await db.insert(albums).values({
          name: data.album_name,
          ownerId: session.user.id,
          cover: data.album_cover.name,
          //OJO CAMBIAR A DINAMICO
        })
        if (res) console.log('db res', res)
      }
    }
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

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  width: number,
  height: number
) {
  const fileBuffer = await sharp(file)
    .jpeg({ quality: 80 })
    .resize(width / 2, height / 2)
    .toBuffer()

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `photos/${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpg',
  }

  const originalParams = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `original/${fileName}`,
    Body: file,
    ContentType: 'image/jpg',
  }

  const command = new PutObjectCommand(params)
  const originalCommand = new PutObjectCommand(originalParams)
  try {
    //const response = await s3Client.send(command)
    const response = await Promise.all([
      s3Client.send(command),
      s3Client.send(originalCommand),
    ])
    console.log('File uploaded successfully:', response)
    return `${fileName}`
  } catch (error) {
    console.log(error)
    throw error
  }
}

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
