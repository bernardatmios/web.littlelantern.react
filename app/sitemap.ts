import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.littlelantern.kids'

interface StoryForSitemap {
  slug: { current: string }
  publishedAt?: string
  _updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await client.fetch<StoryForSitemap[]>(
    `*[_type == "storyBook" && defined(slug.current)]{
      slug,
      publishedAt,
      _updatedAt
    }`,
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/stories`, changeFrequency: 'daily', priority: 0.9 },
  ]

  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${siteUrl}/stories/${story.slug.current}`,
    lastModified: story._updatedAt || story.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...storyRoutes]
}
