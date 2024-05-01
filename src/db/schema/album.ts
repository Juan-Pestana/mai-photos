//id
//photos
//users
//created_at
//description

import { relations, sql } from 'drizzle-orm'
import {
  integer,
  text,
  sqliteTable,
  int,
  primaryKey,
} from 'drizzle-orm/sqlite-core'
import { users } from './authSchema'
import { photos } from './photos'

export const albums = sqliteTable('albums', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  ownerId: text('ownerId'), //add notNull
  cover: text('cover'),
  created_at: text('created_at').default(sql`(CURRENT_DATE)`),
})

export const albumRelations = relations(albums, ({ many, one }) => ({
  photos: many(photos),
  owner: one(users, {
    fields: [albums.ownerId],
    references: [users.id],
  }),
  friends: many(usersToAlbums),
}))

export const usersToAlbums = sqliteTable(
  'users_to_albums',
  {
    userId: text('user_id')
      //.notNull()
      .references(() => users.id),
    albumId: integer('album_id')
      //.notNull()
      .references(() => albums.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.albumId] }),
  })
)

// const usersToChatGroups = sqliteTable('usersToChatGroups', {
//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id),
//   albumId: integer('album_id')
//     .notNull()
//     .references(() => albums.id),
// })
