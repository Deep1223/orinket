import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import { CompareProvider } from '@/context/CompareContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { fonts } from '@/lib/fonts'
import BackToTop from '@/components/orinket/BackToTop'
import './globals.css'

export const metadata: Metadata = {
  title: 'ORINKET | Demi-Fine Jewellery | 18k Gold Plated - Shop Now',
  description: 'Discover everyday demi-fine jewellery at Orinket. Premium 18k thick gold plated pieces that are trendy, lasting, and high on quality. Shop necklaces, bracelets, earrings, and rings.',
  keywords: 'demi-fine jewellery, gold plated jewelry, 18k gold, necklaces, bracelets, earrings, rings, affordable luxury jewelry',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${fonts.mainVar} font-sans antialiased overflow-x-hidden min-w-0`}>
        <CurrencyProvider>
          <CartProvider>
            <CompareProvider>
              {children}
              <BackToTop />
            </CompareProvider>
          </CartProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  )
}

