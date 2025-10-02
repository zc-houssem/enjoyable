import React from 'react'
import '../../styles.css'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata = {
  description: 'an ecommerce website built with Payload',
  title: 'Enjoyable',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
