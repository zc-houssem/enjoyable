import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 12)

  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'product',
    limit,
    page,
    sort: '-createdAt',
  })

  return NextResponse.json(products)
}
