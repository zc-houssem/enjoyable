import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function seedProductCategories() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  const categories = await payload.find({
    collection: 'product-category',
    limit: 1,
  })

  if (categories.totalDocs > 0) {
    console.log('✅ Categories already exist, skipping seed')
    return
  }

  const categoryLabels = [
    // Electronics
    'Electronics',
    'Phones & Accessories',
    'Computers & Tablets',
    'TV & Home Theater',
    'Cameras & Photography',
    'Wearable Technology',
    'Smart Home',

    // Fashion
    'Clothing',
    'Shoes',
    'Accessories',
    'Jewelry',
    'Watches',
    'Bags & Luggage',

    // Kids & Baby
    'Kids',
    'Baby Clothing',
    'Baby Gear',
    'Toys & Games',
    'Educational Toys',

    // Home & Living
    'Home & Kitchen',
    'Furniture',
    'Bedding',
    'Appliances',
    'Decor',
    'Garden & Outdoor',

    // Beauty & Health
    'Beauty & Personal Care',
    'Skincare',
    'Haircare',
    'Makeup',
    'Fragrances',
    'Health & Wellness',

    // Sports & Outdoors
    'Sports & Outdoors',
    'Exercise & Fitness',
    'Cycling',
    'Camping & Hiking',
    'Team Sports',

    // Food & Grocery
    'Groceries',
    'Snacks',
    'Beverages',
    'Organic Foods',

    // Books, Media & Entertainment
    'Books',
    'Music',
    'Movies',
    'Video Games',

    // Auto & Industrial
    'Automotive',
    'Tools & Equipment',
    'Industrial Supplies',

    // Office & School
    'Office Supplies',
    'Stationery',
    'School Supplies',

    // Pets
    'Pet Supplies',
    'Dog Supplies',
    'Cat Supplies',
    'Aquarium & Fish',
  ]

  for (const label of categoryLabels) {
    await payload.create({
      collection: 'product-category',
      data: { label },
    })
  }

  console.log('✅ Seeding complete')
}
