import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function seedProductCategories() {
  const payload = await getPayload({
    config,
  })

  console.log('🌱 Starting seed...')

  const products = [{ label: 'Electronics' }, { label: 'Clothing' }, { label: 'Kids' }]

  for (const product of products) {
    await payload.create({
      collection: 'product-category',
      data: product,
    })
  }

  console.log('✅ Seeding complete')
}
