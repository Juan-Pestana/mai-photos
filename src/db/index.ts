import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as albumSchema from './schema/album'
import * as authSchema from './schema/authSchema'
import * as photoSchema from './schema/photos'

const client = createClient({
  url:
    process.env.NODE_ENV != 'production'
      ? 'http://127.0.0.1:8080'
      : process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})
export const db = drizzle(client, {
  schema: { ...albumSchema, ...authSchema, ...photoSchema },
})
