import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function seedProducts() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting product seed...')

  const existing = await payload.find({ collection: 'product', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('✅ Products already exist, skipping seed')
    return
  }

  const categories = await payload.find({ collection: 'product-category', limit: 100 })
  const currencies = await payload.find({ collection: 'currency', limit: 100 })
  const users = await payload.find({ collection: 'users', limit: 100 })

  if (!categories.totalDocs || !currencies.totalDocs || !users.totalDocs) {
    console.log('❌ Missing categories, currencies, or users. Please seed them first.')
    return
  }

  const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

  const productsData = [
    {
      title: 'Smartphone Pro X',
      descriptionText: 'High-end smartphone with stunning display.',
      price: 999,
      stock: 50,
      discount: 10,
      brand: 'TechBrand',
      features: ['6.7-inch OLED', '128GB Storage', '5G Ready'],
    },
    {
      title: 'Wireless Headphones',
      descriptionText: 'Noise-cancelling over-ear headphones.',
      price: 299,
      stock: 100,
      discount: 5,
      brand: 'SoundMax',
      features: ['Bluetooth 5.2', '30hr Battery'],
    },
    {
      title: 'Gaming Laptop',
      descriptionText: 'Powerful laptop for gamers and creators.',
      price: 1599,
      stock: 20,
      discount: 15,
      brand: 'GigaTech',
      features: ['RTX 4080 GPU', '32GB RAM', '1TB SSD'],
    },
    {
      title: 'Smartwatch Active',
      descriptionText: 'Fitness tracking and notifications on your wrist.',
      price: 249,
      stock: 75,
      discount: 0,
      brand: 'FitPulse',
      features: ['Heart Rate Monitor', 'Water Resistant'],
    },
    {
      title: '4K Ultra HD TV',
      descriptionText: 'Crystal-clear 4K television for home entertainment.',
      price: 1200,
      stock: 30,
      discount: 20,
      brand: 'VisionTech',
      features: ['65-inch Display', 'HDR10+'],
    },
    {
      title: 'Bluetooth Speaker',
      descriptionText: 'Portable speaker with powerful sound.',
      price: 120,
      stock: 150,
      discount: 0,
      brand: 'SoundWave',
      features: ['Waterproof', '12hr Battery'],
    },
    {
      title: 'DSLR Camera',
      descriptionText: 'Capture stunning photos with this DSLR camera.',
      price: 850,
      stock: 25,
      discount: 5,
      brand: 'PhotoPro',
      features: ['24MP Sensor', '4K Video'],
    },
    {
      title: 'Gaming Console',
      descriptionText: 'Next-gen gaming console for immersive experiences.',
      price: 499,
      stock: 60,
      discount: 0,
      brand: 'GameMaster',
      features: ['8K Support', 'VR Ready'],
    },
    {
      title: 'Electric Kettle',
      descriptionText: 'Fast-boiling electric kettle for your kitchen.',
      price: 45,
      stock: 200,
      discount: 0,
      brand: 'KitchenPro',
      features: ['1.7L Capacity', 'Auto Shut-off'],
    },
    {
      title: 'Office Chair Ergonomic',
      descriptionText: 'Comfortable ergonomic chair for long hours.',
      price: 180,
      stock: 80,
      discount: 10,
      brand: 'ComfySeats',
      features: ['Adjustable Height', 'Lumbar Support'],
    },
    {
      title: 'Laptop Stand',
      descriptionText: 'Ergonomic laptop stand to improve posture.',
      price: 35,
      stock: 120,
      discount: 0,
      brand: 'ErgoTech',
      features: ['Adjustable Height', 'Lightweight'],
    },
    {
      title: 'Noise Cancelling Earbuds',
      descriptionText: 'Compact earbuds with active noise cancellation.',
      price: 180,
      stock: 200,
      discount: 5,
      brand: 'SoundZen',
      features: ['Wireless', '20hr Battery'],
    },
    {
      title: 'Mechanical Keyboard',
      descriptionText: 'RGB mechanical keyboard for gamers.',
      price: 99,
      stock: 90,
      discount: 0,
      brand: 'KeyMaster',
      features: ['Mechanical Switches', 'RGB Lighting'],
    },
    {
      title: 'Gaming Mouse',
      descriptionText: 'High precision gaming mouse with customizable DPI.',
      price: 60,
      stock: 150,
      discount: 0,
      brand: 'ClickPro',
      features: ['Ergonomic Design', 'Adjustable DPI'],
    },
    {
      title: 'External SSD 1TB',
      descriptionText: 'Portable fast storage solution.',
      price: 150,
      stock: 70,
      discount: 10,
      brand: 'DataStore',
      features: ['USB-C', '1TB Capacity'],
    },
    {
      title: 'Fitness Tracker Band',
      descriptionText: 'Track your activity and sleep quality.',
      price: 70,
      stock: 250,
      discount: 0,
      brand: 'FitTrack',
      features: ['Heart Rate Monitor', 'Sleep Tracking'],
    },
    {
      title: 'Smart Home Hub',
      descriptionText: 'Control all smart devices from one hub.',
      price: 130,
      stock: 60,
      discount: 5,
      brand: 'HomeSmart',
      features: ['Voice Control', 'WiFi Enabled'],
    },
    {
      title: 'Electric Toothbrush',
      descriptionText: 'Rechargeable electric toothbrush with timer.',
      price: 45,
      stock: 180,
      discount: 0,
      brand: 'SmilePro',
      features: ['Rechargeable', '2-Minute Timer'],
    },
    {
      title: 'Air Purifier',
      descriptionText: 'Purify the air in your home with HEPA filter.',
      price: 220,
      stock: 40,
      discount: 10,
      brand: 'PureAir',
      features: ['HEPA Filter', 'Quiet Operation'],
    },
    {
      title: 'Coffee Maker',
      descriptionText: 'Automatic coffee maker for fresh coffee every morning.',
      price: 120,
      stock: 80,
      discount: 5,
      brand: 'BrewMaster',
      features: ['Programmable', '12-Cup Capacity'],
    },
    {
      title: 'Tablet 10-inch',
      descriptionText: 'Lightweight tablet for work and entertainment.',
      price: 350,
      stock: 60,
      discount: 10,
      brand: 'TabPro',
      features: ['10-inch Display', '64GB Storage'],
    },
    {
      title: 'Portable Projector',
      descriptionText: 'Mini projector for home cinema.',
      price: 250,
      stock: 50,
      discount: 0,
      brand: 'VisionLite',
      features: ['HD Resolution', 'Portable'],
    },
    {
      title: 'Smart Thermostat',
      descriptionText: 'Save energy and control temperature remotely.',
      price: 199,
      stock: 75,
      discount: 5,
      brand: 'EcoTemp',
      features: ['WiFi Enabled', 'Energy Saving'],
    },
    {
      title: 'Wireless Charger',
      descriptionText: 'Fast wireless charging pad for smartphones.',
      price: 40,
      stock: 200,
      discount: 0,
      brand: 'ChargePro',
      features: ['Fast Charging', 'Qi Compatible'],
    },
    {
      title: 'VR Headset',
      descriptionText: 'Immersive virtual reality headset for gaming.',
      price: 399,
      stock: 30,
      discount: 10,
      brand: 'VRX',
      features: ['High Resolution', 'Adjustable Straps'],
    },
    {
      title: 'Smart Door Lock',
      descriptionText: 'Secure your home with keyless entry.',
      price: 220,
      stock: 45,
      discount: 5,
      brand: 'SafeHome',
      features: ['Bluetooth', 'Keyless Entry'],
    },
    {
      title: 'Electric Scooter',
      descriptionText: 'Eco-friendly electric scooter for city travel.',
      price: 699,
      stock: 20,
      discount: 15,
      brand: 'EcoRide',
      features: ['20km Range', 'Foldable'],
    },
    {
      title: 'Digital Camera Lens',
      descriptionText: 'High-quality zoom lens for DSLR cameras.',
      price: 450,
      stock: 25,
      discount: 0,
      brand: 'PhotoZoom',
      features: ['24-70mm', 'f/2.8 Aperture'],
    },
    {
      title: 'Portable Power Bank',
      descriptionText: 'High-capacity power bank for mobile devices.',
      price: 60,
      stock: 150,
      discount: 0,
      brand: 'PowerMax',
      features: ['20000mAh', 'Fast Charging'],
    },
    {
      title: 'LED Desk Lamp',
      descriptionText: 'Adjustable LED desk lamp for study and work.',
      price: 35,
      stock: 100,
      discount: 0,
      brand: 'BrightLite',
      features: ['Adjustable Brightness', 'Touch Control'],
    },
  ]

  for (const product of productsData) {
    await payload.create({
      collection: 'product',
      data: {
        title: product.title,
        description: {
          root: {
            type: 'root',
            version: 1,
            children: [
              {
                type: 'paragraph',
                version: 1, // <--- required on each block
                children: [{ text: product.descriptionText }],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
          },
        },
        price: product.price,
        stock: product.stock,
        discount: product.discount,
        brand: product.brand,
        features: product.features.map((f) => ({ feature: f })),
        category: randomItem(categories.docs).id,
        currency: randomItem(currencies.docs).id,
        seller: randomItem(users.docs).id,
      },
    })
  }

  console.log('✅ 10 products seeded successfully.')
}
