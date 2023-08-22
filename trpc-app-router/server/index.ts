import { drizzle } from "drizzle-orm/better-sqlite3";
import { router, publicProcedure } from "./trpc";
import Database from "better-sqlite3";
import { todos } from "@/db/schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { todoSchema } from "@/db/schema";
import { z } from "zod";


const sqlite = new Database("sqlite.db")
const db = drizzle(sqlite)

migrate(db, {migrationsFolder: "drizzle"})

export const appRouter = router({
 getTodos: publicProcedure.query(async () =>  {
    const response =  db.select().from(todos).all()
    return response
 }),
 addTodo: publicProcedure.input(z.object({
    name: z.string(),
    content: z.string(),
 })).mutation(async (req) => {
    try {
        // const validatedReq = todoSchema.parse(req)
         db.insert(todos).values({name: req.input.name, content: req.input.content, done: 0}).run()
            // await db.insert(todos).values({name: req.input, content: req.input, done: 0, id: req.input}).run()
    } catch (error) {
        console.log(error)
        return error
        
    }
 })
})

export type AppRouter = typeof appRouter