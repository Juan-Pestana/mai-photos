//id
//photos
//users
//created_at
//description

import { relations, sql } from 'drizzle-orm'
import { integer, text, sqliteTable, int } from 'drizzle-orm/sqlite-core'
import { users } from './authSchema'
import { photos } from './photos'

export const albums = sqliteTable('albums', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  description: text('url'),
  created_at: text('created_at').default(sql`(CURRENT_DATE)`),
})

export const albumRelations = relations(albums, ({ many }) => ({
  photos: many(photos),
}))

// const usersToChatGroups = sqliteTable('usersToChatGroups', {
//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id),
//   albumId: integer('album_id')
//     .notNull()
//     .references(() => albums.id),
// })
