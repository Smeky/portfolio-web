import type { Metadata } from 'next'
import clsx from 'clsx'
import { GeistSans } from 'geist/font/sans'

// import '@/app/swiper'
import Theme from '@/components/Theme'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={clsx(GeistSans.className, 'bg-background overflow-x-hidden')}>
        <Theme />

        {children}
      </body>
    </html>
  )
}
