import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { TypedObject } from '@portabletext/types'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'w7lunhwo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)
type SanityImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for our Sanity schemas
export interface StoryBook {
  _id: string
  _type: 'storyBook'
  _updatedAt?: string
  author?: string
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
    en: TypedObject[]
    af: TypedObject[]
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
  seo?: {
    metaTitle?: {
      en?: string
      af?: string
    }
    metaDescription?: {
      en?: string
      af?: string
    }
    ogImage?: {
      en?: {
        asset?: {
          _ref?: string
          _type?: 'reference'
          url?: string
        }
      }
      af?: {
        asset?: {
          _ref?: string
          _type?: 'reference'
          url?: string
        }
      }
    }
    canonicalUrl?: string
    noIndex?: boolean
  }
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
