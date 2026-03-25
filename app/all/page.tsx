import Header from '@/components/orinket/Header'
import Footer from '@/components/orinket/Footer'
import ProductGrid from '@/components/orinket/ProductGrid'
import AnimatedSection from '@/components/orinket/AnimatedSection'
// Try relative import first
import { dummyProducts } from '../../data/dummyProducts'

export default function AllProductsPage() {
  console.log('All Products Page - dummyProducts:', dummyProducts.length)
  console.log('First product:', dummyProducts[0])
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatedSection animation="fadeIn" delay={100}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">All Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of beautiful jewelry pieces
            </p>
          </div>
        </AnimatedSection>

        {dummyProducts.length > 0 ? (
          <AnimatedSection animation="slideUp" delay={200}>
            <ProductGrid products={dummyProducts} />
          </AnimatedSection>
        ) : (
          <AnimatedSection animation="fadeIn" delay={200}>
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                We're adding new products to our collection. Check back soon!
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

