// src/types/index.ts

export interface NavigationItem {
    label: string;
    href: string;
    external?: boolean;
  }
  
  export interface HeroProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  }
  
  export interface GalleryItem {
    title: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
  }
  
  export interface NewsProps {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  }