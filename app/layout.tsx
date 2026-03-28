import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const nunitoSans = Nunito_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: 'ORINKET | Demi-Fine Jewellery | 18k Gold Plated - Shop Now',
  description: 'Discover everyday demi-fine jewellery at Orinket. Premium 18k thick gold plated pieces that are trendy, lasting, and high on quality. Shop necklaces, bracelets, earrings, and rings.',
  keywords: 'demi-fine jewellery, gold plated jewelry, 18k gold, necklaces, bracelets, earrings, rings, affordable luxury jewelry',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

