"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { MoveHorizontal, Play } from "lucide-react"
import type { Product } from "@/data/dummyProducts"
import { fonts } from "@/lib/fonts"

interface ProductVideoAnd360Props {
  product: Product
  galleryImages: string[]
}

export default function ProductVideoAnd360({
  product,
  galleryImages,
}: ProductVideoAnd360Props) {
  const frames =
    product.view360Images && product.view360Images.length >= 2
      ? product.view360Images
      : galleryImages.length >= 2
        ? [...galleryImages, ...galleryImages].slice(0, 12)
        : galleryImages

  const show360 = frames.length >= 2
  const showVideo = Boolean(product.videoUrl)

  const [angleIndex, setAngleIndex] = useState(0)
  const dragRef = useRef<{ active: boolean; lastX: number }>({ active: false, lastX: 0 })

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { active: true, lastX: e.clientX }
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return
      const dx = e.clientX - dragRef.current.lastX
      dragRef.current.lastX = e.clientX
      if (Math.abs(dx) < 2) return
      setAngleIndex((i) => {
        const dir = dx > 0 ? 1 : -1
        const next = (i + dir + frames.length) % frames.length
        return next
      })
    },
    [frames.length]
  )

  const endDrag = useCallback(() => {
    dragRef.current.active = false
  }, [])

  if (!showVideo && !show360) return null

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {showVideo && product.videoUrl && (
        <section className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_18px_40px_-24px_rgba(25,18,14,0.12)]">
          <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
            <Play className="h-4 w-4 text-gold-dark" fill="currentColor" />
            <h2 className={`text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground ${fonts.labels}`}>
              Product video
            </h2>
          </div>
          <div className="relative aspect-video w-full bg-black">
            <iframe
              title={`${product.name} video`}
              src={product.videoUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {show360 && (
        <section className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_18px_40px_-24px_rgba(25,18,14,0.12)]">
          <div className="flex items-center justify-between gap-2 border-b border-border/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <MoveHorizontal className="h-4 w-4 text-gold-dark" strokeWidth={1.75} />
              <h2 className={`text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground ${fonts.labels}`}>
                360° view
              </h2>
            </div>
            <span className={`text-[10px] text-muted-foreground ${fonts.labels}`}>
              Drag to rotate
            </span>
          </div>
          <div
            role="img"
            aria-label={`360 view frame ${angleIndex + 1} of ${frames.length}`}
            className="relative aspect-square cursor-ew-resize touch-pan-y bg-gradient-to-br from-cream-dark/50 to-cream select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <Image
              src={frames[angleIndex]}
              alt={`${product.name} angle ${angleIndex + 1}`}
              fill
              className="object-cover object-top pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className={`pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[10px] text-white backdrop-blur-sm ${fonts.labels}`}>
              <span>
                {angleIndex + 1} / {frames.length}
              </span>
            </div>
          </div>
          <div className="border-t border-border/40 px-4 py-3">
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              value={angleIndex}
              onChange={(e) => setAngleIndex(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-gold"
              aria-label="Rotate product view"
            />
          </div>
        </section>
      )}
    </div>
  )
}
