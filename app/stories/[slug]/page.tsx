import type { Metadata } from 'next'
import { cache } from 'react'
import { client, StoryBook, urlFor } from '@/lib/sanity'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import StoryContent from '@/components/StoryContent'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.littlelantern.kids'
export const revalidate = 300

const getStory = cache(async (slug: string): Promise<StoryBook | null> => {
  const query = `*[_type == "storyBook" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    author,
    shortIntroduction,
    story,
    audioFile {
      en {
        asset->
      },
      af {
        asset->
      }
    },
    coverImage {
      en {
        asset->
      },
      af {
        asset->
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        en {
          asset->
        },
        af {
          asset->
        }
      },
      canonicalUrl,
      noIndex
    },
    isFree,
    ageRange,
    averageRating,
    publishedAt
  }`

  return client.fetch(query, { slug })
})

const getStorySlugs = cache(async (): Promise<Array<{ slug: string }>> => {
  const query = `*[_type == "storyBook" && defined(slug.current)]{
    "slug": slug.current
  }`
  return client.fetch(query)
})

export async function generateStaticParams() {
  const slugs = await getStorySlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

function getLocalizedValue(
  value: { en?: string; af?: string } | undefined,
  locale: string,
): string | undefined {
  return value?.[locale as 'en' | 'af'] || value?.en || value?.af
}

function getLocalizedImage(
  image:
    | {
        en?: { asset?: { _ref?: string; _type?: 'reference'; url?: string } }
        af?: { asset?: { _ref?: string; _type?: 'reference'; url?: string } }
      }
    | undefined,
  locale: string,
) {
  return image?.[locale as 'en' | 'af'] || image?.en || image?.af
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const story = await getStory(slug)

  if (!story) {
    return {
      title: 'Story Not Found',
      robots: { index: false, follow: false },
    }
  }

  const title =
    getLocalizedValue(story.seo?.metaTitle, locale) ||
    story.title[locale as 'en' | 'af'] ||
    story.title.en ||
    story.title.af

  const description =
    getLocalizedValue(story.seo?.metaDescription, locale) ||
    story.shortIntroduction[locale as 'en' | 'af'] ||
    story.shortIntroduction.en ||
    story.shortIntroduction.af

  const canonical = story.seo?.canonicalUrl || `${siteUrl}/stories/${story.slug.current}`

  const seoImage = getLocalizedImage(story.seo?.ogImage, locale)
  const coverImage = getLocalizedImage(story.coverImage, locale)
  const imageUrl = seoImage ? urlFor(seoImage).width(1200).height(630).fit('crop').url() : coverImage ? urlFor(coverImage).width(1200).height(630).fit('crop').url() : undefined

  const openGraphLocale = locale === 'af' ? 'af_ZA' : 'en_US'

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: !story.seo?.noIndex,
      follow: !story.seo?.noIndex,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      locale: openGraphLocale,
      publishedTime: story.publishedAt,
      images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)
  const locale = await getLocale()

  if (!story) {
    notFound()
  }

  const storyTitle = story.title[locale as 'en' | 'af'] || story.title.en || story.title.af
  const storyDescription =
    story.shortIntroduction[locale as 'en' | 'af'] || story.shortIntroduction.en || story.shortIntroduction.af
  const coverImage = getLocalizedImage(story.coverImage, locale)
  const coverImageUrl = coverImage
    ? urlFor(coverImage).width(1200).height(630).fit('crop').url()
    : undefined

  const storyUrl = `${siteUrl}/stories/${story.slug.current}`

  const storyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: storyTitle,
    description: storyDescription,
    inLanguage: locale === 'af' ? 'af' : 'en',
    datePublished: story.publishedAt,
    dateModified: story._updatedAt,
    url: storyUrl,
    mainEntityOfPage: storyUrl,
    image: coverImageUrl,
    author: {
      '@type': 'Person',
      name: story.author || 'Little Lanterns',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Little Lanterns',
    },
    aggregateRating:
      story.averageRating > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: story.averageRating,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    isAccessibleForFree: story.isFree,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }} />
      <Header />
      <StoryContent story={story} locale={locale} />
    </>
  )
}
