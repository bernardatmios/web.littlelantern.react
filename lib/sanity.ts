import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// Define SanityImageSource type locally as it's not exported from @sanity/image-url
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'w7lunhwo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)

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
    en?: {
      asset: {
        _ref?: string
        _type?: 'reference'
        url?: string
      }
    }
    af?: {
      asset: {
        _ref?: string
        _type?: 'reference'
        url?: string
      }
    }
  }
  coverImage: {
    en: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    af: {
      asset: {
        _ref: string
        _type: 'reference'
      }
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
