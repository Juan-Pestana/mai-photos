import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as albumSchema from './schema/album'
import * as authSchema from './schema/authSchema'
import * as photoSchema from './schema/photos'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})
export const db = drizzle(client, {
  schema: { ...albumSchema, ...authSchema, ...photoSchema },
})
