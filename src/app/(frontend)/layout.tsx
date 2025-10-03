import React from 'react'
import { ClientProviders } from '@/components/ClientProviders'
import Layout from '@/components/layout/Layout'
import '../styles.css'

export const metadata = {
  description: 'an ecommerce website built with Payload',
  title: 'Enjoyable',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <ClientProviders>
      <Layout>{children}</Layout>
    </ClientProviders>
  )
}
