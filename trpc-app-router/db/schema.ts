import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { z } from "zod"

export const todoSchema = z.object({
    name: z.string(),
    content: z.string()
})

export const todos = sqliteTable("todos", {
    id: integer("id").primaryKey().unique(),
    name: text("name"),
    content: text("content"),
    done: integer("done")
})