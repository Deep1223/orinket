import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
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
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
