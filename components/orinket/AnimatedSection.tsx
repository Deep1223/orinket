'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  delay?: number
  className?: string
  threshold?: number
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'slideUp',
  delay = 0,
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'
    
    switch (animation) {
      case 'fadeIn':
        return 'animate-fadeIn'
      case 'slideUp':
        return 'animate-slideUp'
      case 'slideInLeft':
        return 'animate-slideInLeft'
      case 'slideInRight':
        return 'animate-slideInRight'
      case 'scaleIn':
        return 'animate-scaleIn'
      default:
        return 'animate-slideUp'
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

