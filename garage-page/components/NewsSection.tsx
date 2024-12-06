// src/components/NewsSection.tsx
import { type NewsProps } from '@/types'
import { Button } from '@/components/ui/button'

export default function NewsSection({
  title,
  description,
  ctaText,
  ctaLink
}: NewsProps) {
  return (
    <section className="relative bg-black text-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* News Content */}
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
            <p className="text-xl mb-8 text-gray-300">
              {description}
            </p>
            <Button className="bg-white text-black hover:bg-gray-200">
              <a href={ctaLink}>{ctaText}</a>
            </Button>
          </div>

          {/* Social Media Links */}
          <div className="mt-12">
            <p className="text-lg mb-4">Follow us on Instagram</p>
            <a 
              href="https://www.instagram.com/theglyndegarage/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold hover:text-gray-300 transition-colors"
            >
              @theglyndegarage
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}