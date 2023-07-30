import { db } from "@/db"
import { users } from "@/db/schema"

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	const selectAllUsers = await db.select().from(users)

	return new Response(JSON.stringify(selectAllUsers), { status: 200 })
}
