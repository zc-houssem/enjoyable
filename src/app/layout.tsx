import './styles.css'

export const metadata = {
  description: 'an ecommerce website built with Payload',
  title: 'Enjoyable Backoffice',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
