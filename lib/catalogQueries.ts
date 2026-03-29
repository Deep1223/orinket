import type { Product } from '@/data/dummyProducts'

export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getNewArrivals(products: Product[]): Product[] {
  return products.filter((product) => product.isNew)
}

export function getBestsellers(products: Product[]): Product[] {
  return products.filter((product) => product.isBestseller)
}

export function searchProducts(products: Product[], query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  )
}

export function getProductsByIds(products: Product[], ids: string[]): Product[] {
  const order = new Map(ids.map((id, i) => [id, i]))
  return products
    .filter((p) => order.has(p.id))
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
}

export function getSaleProducts(products: Product[]): Product[] {
  return products.filter((p) => p.originalPrice != null && p.originalPrice > p.price)
}

export function getGiftProductsForRecipient(
  products: Product[],
  recipient: 'her' | 'him'
): Product[] {
  if (recipient === 'him') {
    return products.filter((p) => p.category === 'men')
  }
  return products.filter((p) => p.category !== 'men')
}
