import { seedAllCurrencies } from '@/collections/ecommerce/seeders/currency.seeder'
import { seedProductCategories } from '@/collections/ecommerce/seeders/product-category.seeder'
import { seedProducts } from '@/collections/ecommerce/seeders/product-seeder'

export const GET = async (_request: Request) => {
  await seedProductCategories()
  await seedAllCurrencies()
  await seedProducts()
  return Response.json({ message: 'Successfully seeded all collections.' })
}
