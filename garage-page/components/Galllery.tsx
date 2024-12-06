// src/components/Gallery.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryItem } from '@/types'

interface GalleryProps {
  items: GalleryItem[]
}

export default function Gallery({ items }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="relative bg-black py-24">
      <div className="container mx-auto px-4">
        {/* Gallery Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-10">
          <Button
            onClick={previousSlide}
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        {/* Gallery Content */}
        <div className="relative h-[600px] overflow-hidden">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <div className="relative z-10 h-full flex items-end">
                <div className="max-w-2xl mb-16 text-white">
                  <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl mb-8">{item.description}</p>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <a href={item.ctaLink}>{item.ctaText}</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}