import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w7lunhwo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for our Sanity schemas
export interface StoryBook {
  _id: string
  _type: 'storyBook'
  title: {
    en: string
    af: string
  }
  slug: {
    current: string
  }
  shortIntroduction: {
    en: string
    af: string
  }
  story: {
    en: any[]
    af: any[]
  }
  audioFile?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  coverImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  isFree: boolean
  publishedAt: string
  ageRange: string
  averageRating: number
}

export interface SiteDesign {
  _id: string
  _type: 'siteDesign'
  title: string
  designType: 'hero' | 'background' | 'decoration'
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  description?: string
}
