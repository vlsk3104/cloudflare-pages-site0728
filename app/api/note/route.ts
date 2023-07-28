import { cookies } from 'next/headers'
import prisma  from '@/lib/prisma'

export const runtime = 'edge'

export async function GET(request: Request) {
	const notes = await prisma.note.findMany()

	return new Response(JSON.stringify(notes), { status: 200 })
}
