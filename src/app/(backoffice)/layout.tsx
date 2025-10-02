import React from 'react'
import '../../styles.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

export const metadata = {
  description: '',
  title: 'Enjoyable Backoffice',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
