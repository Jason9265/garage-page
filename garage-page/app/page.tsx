// src/app/page.tsx
import { type Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
// import Gallery from '@/components/Gallery'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The GB Auto Care',
  description: 'Your one-stop shop specialising in automotive, crash repairs, mechanical, electrical, dyno tuning, maintenance & paint refinishing.',
}

export default function Home() {
  const heroContent = {
    title: "Your 'One-Stop Shop' specialising in Automotive Services",
    subtitle: "Welcome to the GB Auto Care",
    description: "We are Eastern Adelaide's premier one-stop shop for all things automotive. Experience The GB Auto Care difference for yourself.",
    ctaText: "Schedule A Call",
    ctaLink: "/contact"
  }

  const galleryItems = [
    {
      title: "Automotive Repairs",
      description: "Book now for all Mechanical Repairs",
      imageUrl: "/images/automotive.jpg",
      ctaText: "Book Now",
      ctaLink: "/mechanical-and-automotive-enquries"
    },
    {
      title: "GB Auto Care",
      description: "Book now for your Dyno Tuning and Performance upgrades.",
      imageUrl: "/images/performance.jpg",
      ctaText: "Learn More",
      ctaLink: "/gb-auto"
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <Hero {...heroContent} />
      {/* <Gallery items={galleryItems} /> */}
      <NewsSection 
        title="GB NEWS"
        description="Keep up to date with what's going on at The GB Auto Care as well as tips, tricks and handy hints to get the best out of your vehicle."
        ctaText="Get the latest here!"
        ctaLink="/news-offers"
      />
      <Footer />
    </main>
  )
}