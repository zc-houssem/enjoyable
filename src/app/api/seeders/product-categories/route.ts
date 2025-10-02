import { seedProductCategories } from '@/collections/ecommerce/seeders/product-category.seeder'

export const GET = async (_request: Request) => {
  await seedProductCategories()
  return Response.json({ message: 'Successfully seeded product categories.' })
}
