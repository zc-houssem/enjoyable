import { seedProducts } from '@/collections/ecommerce/seeders/product-seeder'

export const GET = async (_request: Request) => {
  await seedProducts()
  return Response.json({ message: 'Successfully seeded product.' })
}
