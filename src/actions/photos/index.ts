'use server'

import { auth } from '@/auth/auth'
import { db } from '@/db'
import { photos } from '@/db/schema/photos'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'
//import sharp from 'sharp'
import { ZodError, z } from 'zod'

export async function uploadFile(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    userId: z.string().min(1, 'You must be authenticated'),
    albumId: z
      .string()
      .min(1, 'albumId is required')
      .transform((albumId) => parseInt(albumId)),
    width: z
      .string()
      .min(1, 'File size is Required')
      .transform((width) => parseInt(width)),

    height: z
      .string()
      .min(1, 'File size is Required')
      .transform((height) => parseInt(height)),
    file: z.string().min(1, 'file name is required'),
    // file: z
    //   .custom<File>()
    //   .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
    //     message: 'The profile picture must be a maximum of 10MB.',
    //   })
    //   .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
    //     message: 'Only images are allowed to be sent.',
    //   }),
  })
  try {
    const session = await auth()
    if (!session || !session.user) {
      throw new Error('unauthorized')
    }
    console.log('filename', formData.get('file'))

    const data = formDataSchema.parse({
      userId: formData.get('userId'),
      albumId: formData.get('albumId'),
      width: formData.get('width'),
      height: formData.get('height'),
      file: formData.get('file'),
    })

    if (data.file) {
      // const buffer = Buffer.from(await data.file.arrayBuffer())
      //const name = `${Date.now()}${data.file}`
      // const uploadResponse = await uploadFileToS3(
      //   buffer,
      //   name,
      //   data.width,
      //   data.height
      // )

      const res = await db.insert(photos).values({
        url: data.file,
        width: data.width,
        height: data.height,
        user: data.userId,
        album_id: data.albumId,
      })
      if (res) console.log('db res', res)
    }

    revalidatePath('/')
    return {
      status: 'success',
      message: `File ${data.file} has been uploaded.`,
    }
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return { status: 'error', message: error.errors[0].message }
    }
    return { status: 'error', message: 'Failed to upload file.' }
  }
}

// const s3Client = new S3Client({
//   region: process.env.NEXT_AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
//   },
// })

// export async function uploadFileToS3(
//   file: Buffer,
//   fileName: string,
//   width: number,
//   height: number
// ) {
//   const fileBuffer = await sharp(file)
//     .jpeg({ quality: 80 })
//     .resize(width / 2, height / 2)
//     .toBuffer()

//   const params = {
//     Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
//     Key: `photos/${fileName}`,
//     Body: fileBuffer,
//     ContentType: 'image/jpg',
//   }

//   const originalParams = {
//     Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
//     Key: `original/${fileName}`,
//     Body: file,
//     ContentType: 'image/jpg',
//   }

//   const command = new PutObjectCommand(params)
//   const originalCommand = new PutObjectCommand(originalParams)
//   try {
//     //const response = await s3Client.send(command)
//     const response = await Promise.all([
//       s3Client.send(command),
//       s3Client.send(originalCommand),
//     ])
//     console.log('File uploaded successfully:', response)
//     return `${fileName}`
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
