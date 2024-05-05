'use server'
import { revalidatePath } from 'next/cache'
import { File } from 'buffer'
import { z, ZodError } from 'zod'
import { db } from '@/db'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { auth, signIn } from '@/auth/auth'
import sharp from 'sharp'
import { albums, usersToAlbums } from '@/db/schema/album'
import { redirect } from 'next/navigation'

export async function createAlbum(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    album_name: z.string().min(1, 'We need a name for the album'),
    album_description: z.string().optional(),
    album_cover: z
      .custom<File>()
      .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
        message: 'The profile picture must be a maximum of 10MB.',
      })
      .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
        message: 'Only images are allowed to be sent.',
      })
      .optional(),
  })

  try {
    const session = await auth()
    if (!session || !session.user) {
      throw new Error('unauthorized')
    }
    const data = formDataSchema.parse({
      album_name: formData.get('album_name'),
      album_description: formData.get('album_description'),
      album_cover: formData.get('album_cover'),
    })

    if (data.album_cover && data.album_cover instanceof File) {
      const photoName = `${Date.now()}${data.album_cover.name}`
      const buffer = Buffer.from(await data.album_cover.arrayBuffer())
      const name = photoName
      const uploadResponse = await uploadCover(buffer, name)

      if (uploadResponse) {
        const res = await db.insert(albums).values({
          name: data.album_name,
          ownerId: session.user.id,
          description: data.album_description,
          cover: name,
          //OJO CAMBIAR A DINAMICO
        })
        if (res) console.log('db res', res)
      }
    } else {
      const res = await db.insert(albums).values({
        name: data.album_name,
        ownerId: session.user.id,
        description: data.album_description,

        //OJO CAMBIAR A DINAMICO
      })
      if (res) console.log('db res', res)
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

export async function shareAlbum(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    email: z
      .string()
      .min(1, 'indicate email to share the album with')
      .email('email must be a valid email'),
    albumId: z
      .string()
      .min(1, 'missing album Id')
      .transform((albumId) => parseInt(albumId)),
  })

  const session = await auth()
  if (!session || !session.user) {
    throw new Error('unauthorized')
  }

  try {
    const data = formDataSchema.parse({
      email: formData.get('email'),
      albumId: formData.get('albumId'),
    })

    console.log('estamos aqui', data.email)

    await signIn('resend', { redirect: false, email: data.email })

    const albumRelation = await db
      .insert(usersToAlbums)
      .values({ albumId: data.albumId, userEmail: data.email })

    if (albumRelation) return { status: 'success', message: 'album shared' }

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
    .resize(400, 300)
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
