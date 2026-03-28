import { notFound } from 'next/navigation'
import Header from '@/components/orinket/Header'
import Footer from '@/components/orinket/Footer'
import CategoryPageContent from '@/components/orinket/CategoryPageContent'

const categories = [
  { name: 'new-arrivals', displayName: 'New Arrivals', description: 'Discover our latest collection' },
  { name: 'necklaces', displayName: 'Necklaces', description: 'Elegant necklaces for every occasion' },
  { name: 'earrings', displayName: 'Earrings', description: 'Beautiful earrings to complement your style' },
  { name: 'bracelets', displayName: 'Bracelets', description: 'Stylish bracelets for everyday wear' },
  { name: 'rings', displayName: 'Rings', description: 'Stunning rings for special moments' },
  { name: 'men', displayName: 'Men', description: 'Sophisticated jewelry for modern men' },
  { name: '9kt-gold', displayName: '9KT Gold', description: 'Premium 9KT gold collection' },
  { name: 'gifts', displayName: 'Gifts', description: 'Perfect gifts for your loved ones' }
]

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find(cat => cat.name === slug)
  
  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <CategoryPageContent slug={slug} />
      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.name,
  }))
}

