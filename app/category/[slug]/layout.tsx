import React from 'react'
import { generateStaticParams } from './generate-static-params'

export { generateStaticParams }

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
