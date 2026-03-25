import { notFound } from 'next/navigation'
import Header from '@/components/orinket/Header'
import Footer from '@/components/orinket/Footer'
import ProductGrid from '@/components/orinket/ProductGrid'
import AnimatedSection from '@/components/orinket/AnimatedSection'
import { getProductsByCategory } from '../../data/dummyProducts'

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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryInfo = categories.find(cat => cat.name === category)
  
  if (!categoryInfo) {
    notFound()
  }

  const products = getProductsByCategory(category)

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatedSection animation="fadeIn" delay={100}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{categoryInfo.displayName}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>
        </AnimatedSection>

        {products.length > 0 ? (
          <AnimatedSection animation="slideUp" delay={200}>
            <ProductGrid products={products} />
          </AnimatedSection>
        ) : (
          <AnimatedSection animation="fadeIn" delay={200}>
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                We're adding new products to this collection. Check back soon!
              </p>
              <a 
                href="/" 
                className="inline-block px-6 py-3 bg-foreground text-white rounded-sm hover:bg-gold-dark transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </AnimatedSection>
        )}
      </div>

      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.name,
  }))
}
