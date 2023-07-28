import { Note } from '@prisma/client'
import prisma  from '@/lib/prisma'

export const runtime = 'edge'

export async function GET(request: Request) {
	const promises: Promise<Note>[] = Array(30)
    .fill(undefined)
    .map((_, i) => {
      return prisma.note.create({
        data: {
          title: `Note Title ${i + 1}`,
          content: `This is the content for the note ${i + 1}`,
          published: Math.random() > 0.5,  // Randomly set published status
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    });

  const notes = await Promise.all(promises);

	return new Response(JSON.stringify(notes), { status: 200 })
}
