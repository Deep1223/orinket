'use client'

import { useMemo } from 'react'
import ProductGrid from '@/components/orinket/ProductGrid'
import AnimatedSection from '@/components/orinket/AnimatedSection'
import { useAppSelector } from '@/store/hooks'
import { selectProducts } from '@/store/selectors'
import { getGiftProductsForRecipient } from '@/lib/catalogQueries'

export default function GiftsProductGridClient({ recipientKey }: { recipientKey: 'her' | 'him' }) {
  const catalog = useAppSelector(selectProducts)
  const products = useMemo(
    () => getGiftProductsForRecipient(catalog, recipientKey),
    [catalog, recipientKey]
  )

  return (
    <AnimatedSection animation="slideUp" delay={120}>
      <ProductGrid products={products} />
    </AnimatedSection>
  )
}
