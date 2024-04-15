//id
//url
//created_at
//user
//location
//month
//album
import { sql } from 'drizzle-orm'
import { integer, text, sqliteTable, int } from 'drizzle-orm/sqlite-core'
import { albums } from './album'
import { users } from './authSchema'
export const photos = sqliteTable('photos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  url: text('url').notNull(),
  created_at: text('created_at').default(sql`(CURRENT_DATE)`),
  location: text('location'),
  album_id: text('album_id')
    .notNull()
    .references(() => albums.id),
  user: text('user_id')
    .notNull()
    .references(() => users.id),
})
