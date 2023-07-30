import { mysqlTable, serial, text, int, index } from "drizzle-orm/mysql-core"
import { InferModel, relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
})

export const posts = mysqlTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: int("author_id").notNull(),
  },
  (table) => ({
    authorIdIndex: index("authorId_idx").on(table.authorId),
  })
)

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}))

export type User = InferModel<typeof users>
export type NewUser = InferModel<typeof users, "insert">
export type Post = InferModel<typeof posts>
export type NewPost = InferModel<typeof posts, "insert">
