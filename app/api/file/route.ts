import r2Client from '@/app/lib/r2Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const Bucket = process.env.BUCKET_NAME!

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()

    const prefix: string | null =  data.get('prefix') as string
    const file: File | null = data.get('file') as unknown as File
    const path: string | null = data.get('path') as string

    if (!file || !path) throw new Error('Not Found')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const params = {
      ACL: 'public-read',
      Bucket,
      Key: prefix ? `${prefix}${path}` : path,
      ContentType: file.type,
      Body: buffer
    }

    await r2Client.send(new PutObjectCommand(params))

    const url = `${process.env.R2_NAME}/${params.Key}`

    return NextResponse.json({ ok: true, url })
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json({ ok: false, error: error.message })
    }
    return NextResponse.json({ ok: false, error })
  }
}
