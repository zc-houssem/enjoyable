import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const payload = await getPayload({ config })

  try {
    const product = await payload.findByID({
      collection: 'product',
      id: params.id,
    })

    return NextResponse.json(product)
  } catch (_error) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
}
