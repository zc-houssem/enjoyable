import { seedAllCurrencies } from '@/collections/ecommerce/seeders/currency.seeder'

export const GET = async (_request: Request) => {
  await seedAllCurrencies()
  return Response.json({ message: 'Successfully seeded currencies.' })
}
