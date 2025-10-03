import React from 'react'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata = {
  description: 'an ecommerce website built with Payload',
  title: 'Enjoyable Backoffice',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return <ClientProviders>{children}</ClientProviders>
}
