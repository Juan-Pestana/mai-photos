'use server'
import { revalidatePath } from 'next/cache'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { File } from 'buffer'
import * as z from 'zod'

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
})

async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  width: number,
  height: number
) {
  console.log('dentro del upload')
  const fileBuffer = await sharp(file)
    .jpeg({ quality: 90 })
    .resize(width / 2, height / 2)
    .toBuffer()

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpg',
  }

  const command = new PutObjectCommand(params)
  try {
    const response = await s3Client.send(command)
    console.log('File uploaded successfully:', response)
    return `${fileName}`
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function uploadFile(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
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
    const data = formDataSchema.parse({
      width: formData.get('width'),
      height: formData.get('height'),
      file: formData.get('file'),
    })

    if (data.file && data.file instanceof File) {
      const buffer = Buffer.from(await data.file.arrayBuffer())
      console.log('antes del upload')
      //await uploadFileToS3(buffer, data.file.name, data.width, data.height)
    }

    revalidatePath('/')
    return { status: 'success', message: 'File has been uploaded.' }
  } catch (error) {
    console.log(error)
    return { status: 'error', message: 'Failed to upload file.' }
  }
}
