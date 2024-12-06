// src/components/Hero.tsx
import { type HeroProps } from '@/types'
import { Button } from '@/components/ui/button'

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink
}: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/background.jpg"
          alt="Garage Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            {title}
          </h1>
          
          <div className="mt-12 bg-black/70 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              {subtitle}
            </h2>
            <p className="text-xl mb-6">
              {description}
            </p>
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
              <a href={ctaLink}>{ctaText}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}