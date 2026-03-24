import { notFound } from "next/navigation"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductCard from "@/components/orinket/ProductCard"
import { categories, getProductsByCategory, products } from "@/data/products"
import { Filter, ChevronDown } from "lucide-react"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.id,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.id === slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = getProductsByCategory(slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Category Hero */}
        <div className="bg-cream py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-muted-foreground font-[family-name:var(--font-nunito)] max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <p className="text-sm font-[family-name:var(--font-nunito)] text-muted-foreground">
              {categoryProducts.length} Products
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-[family-name:var(--font-nunito)] text-foreground hover:text-gold-dark transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 text-sm font-[family-name:var(--font-nunito)] text-foreground hover:text-gold-dark transition-colors">
                Sort by: Featured
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-[family-name:var(--font-nunito)] text-muted-foreground mb-4">
                No products found in this category
              </p>
              <p className="text-sm font-[family-name:var(--font-nunito)] text-muted-foreground">
                Check back soon for new arrivals!
              </p>
            </div>
          )}

          {/* Show all products if category is empty */}
          {categoryProducts.length === 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground text-center mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
