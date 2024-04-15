//id
//photos
//users
//created_at
//description

import { sql } from 'drizzle-orm'
import { integer, text, sqliteTable, int } from 'drizzle-orm/sqlite-core'
import { users } from './authSchema'
export const albums = sqliteTable('albums', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  description: text('url'),
  created_at: text('created_at').default(sql`(CURRENT_DATE)`),
})

const usersToChatGroups = sqliteTable('usersToChatGroups', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  albumId: integer('album_id')
    .notNull()
    .references(() => albums.id),
})
