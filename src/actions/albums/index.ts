'use server'
import { revalidatePath } from 'next/cache'

import { z, ZodError } from 'zod'
import { db } from '@/db'

import { auth, signIn } from '@/auth/auth'
//import sharp from 'sharp'
import { albums, usersToAlbums } from '@/db/schema/album'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema/authSchema'

export async function createAlbum(
  prevState: { message: string; status: string },
  formData: FormData
) {
  const formDataSchema = z.object({
    album_name: z.string().min(1, 'We need a name for the album'),
    album_description: z.string().optional(),
    album_cover: z.string().optional(),
  })

  try {
    const session = await auth()
    if (!session || !session.user) {
      return {
        status: 'error',
        message: 'You must be authenticated to perform this action',
      }
    }
    const data = formDataSchema.parse({
      album_name: formData.get('album_name'),
      album_description: formData.get('album_description'),
      album_cover: formData.get('album_cover'),
    })

    const res = await db.insert(albums).values({
      name: data.album_name,
      ownerId: session.user.id,
      description: data.album_description,
      cover: data.album_cover || null,
    })
    if (res) console.log('db res', res)

    revalidatePath('/')
    return {
      status: 'success',
      message: `Album ${data.album_name} has been created.`,
    }
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return { status: 'error', message: error.errors[0].message }
    }
    return { status: 'error', message: 'Failed to create album.' }
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

    const isRegistered = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    })

    const albumRelation = await db
      .insert(usersToAlbums)
      .values({ albumId: data.albumId, userEmail: data.email })

    if (!isRegistered) {
      await signIn('resend', {
        redirect: false,
        email: data.email,
        redirectTo: '/',
      })
    }

    if (albumRelation)
      return { status: 'success', message: `album shared with ${data.email}` }

    revalidatePath('/')
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return { status: 'error', message: error.errors[0] }
    }
    return { status: 'error', message: 'Failed to upload file.' }
  }
}

// ////////// utils////

// const s3Client = new S3Client({
//   region: process.env.NEXT_AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
//   },
// })

// export async function uploadCover(file: Buffer, fileName: string) {
//   const fileBuffer = await sharp(file)
//     .jpeg({ quality: 60 })
//     .resize(400, 300)
//     .toBuffer()

//   const params = {
//     Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
//     Key: `covers/${fileName}`,
//     Body: fileBuffer,
//     ContentType: 'image/jpg',
//   }
//   try {
//     const command = new PutObjectCommand(params)
//     const response = await s3Client.send(command)

//     console.log('Cover uploaded successfully:', response)
//     return `${fileName}`
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
