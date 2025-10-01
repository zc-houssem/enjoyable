import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Layout from '@/components/layout/Layout'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const products = await payload.find({
    collection: 'product',

    limit: 10,
  })

  return (
    <Layout>
      <main className="p-4">
        <h1 className="text-xl font-bold mb-4">Products</h1>
        <ul className="space-y-2">
          {products.docs.map((product) => (
            <li key={product.id} className="p-2 border rounded">
              <h2 className="font-semibold">{product.title}</h2>
              <p>{product.price}</p>
              <p>
                {typeof product.category === 'object' && product.category?.label
                  ? product.category.label
                  : 'N/A'}
              </p>
              <ul>
                {product?.features?.map((feature) => (
                  <li key={feature.feature}>{feature.feature}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}
