import { db } from "@/db"
import { todos } from "@/db/schema"
import { NextResponse } from "next/server"

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {

	const result = await db.select().from(todos).all()

	return NextResponse.json({ ok: true, result })
}
