import { client } from '@/lib/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.littlelantern.kids'

interface StoryForExport {
  title: { en?: string; af?: string }
  slug: { current: string }
  shortIntroduction: { en?: string; af?: string }
  story: { en?: Array<{ _type?: string; style?: string; children?: Array<{ text?: string }> }>; af?: Array<{ _type?: string; style?: string; children?: Array<{ text?: string }> }> }
  coverImage?: {
    en?: { asset?: { url?: string } }
    af?: { asset?: { url?: string } }
  }
  author?: string
  publishedAt?: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getLocaleFromRequest(request: Request): 'en' | 'af' {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang')
  return lang === 'af' ? 'af' : 'en'
}

function renderBlocks(blocks: Array<{ _type?: string; style?: string; children?: Array<{ text?: string }> }> = []) {
  return blocks
    .filter((block) => block?._type === 'block')
    .map((block) => {
      const text = escapeHtml((block.children || []).map((child) => child?.text || '').join(''))
      if (!text.trim()) return ''
      if (block.style === 'h2') return `<h2>${text}</h2>`
      if (block.style === 'h3') return `<h3>${text}</h3>`
      if (block.style === 'blockquote') return `<blockquote>${text}</blockquote>`
      return `<p>${text}</p>`
    })
    .join('\n')
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = getLocaleFromRequest(request)

  const story = await client.fetch<StoryForExport | null>(
    `*[_type == "storyBook" && slug.current == $slug][0] {
      title,
      slug,
      shortIntroduction,
      story,
      coverImage {
        en { asset-> { url } },
        af { asset-> { url } }
      },
      author,
      publishedAt
    }`,
    { slug },
  )

  if (!story) {
    return new Response('Story not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } })
  }

  const title = story.title?.[locale] || story.title?.en || story.title?.af || 'Story'
  const intro =
    story.shortIntroduction?.[locale] || story.shortIntroduction?.en || story.shortIntroduction?.af || ''
  const bodyBlocks = story.story?.[locale] || story.story?.en || story.story?.af || []
  const bodyHtml = renderBlocks(bodyBlocks)
  const cover = story.coverImage?.[locale] || story.coverImage?.en || story.coverImage?.af
  const coverUrl = cover?.asset?.url || ''
  const canonicalUrl = `${siteUrl}/stories/${story.slug.current}`
  const published = story.publishedAt ? new Date(story.publishedAt).toISOString() : ''
  const author = story.author || 'Little Lanterns'

  const html = `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Little Lanterns</title>
    <meta name="description" content="${escapeHtml(intro)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(intro)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    ${coverUrl ? `<meta property="og:image" content="${coverUrl}" />` : ''}
    ${published ? `<meta property="article:published_time" content="${published}" />` : ''}
    <style>
      body { font-family: Georgia, serif; max-width: 760px; margin: 40px auto; padding: 0 16px; color: #111; line-height: 1.7; }
      h1 { line-height: 1.2; margin-bottom: 8px; }
      .meta { color: #666; margin-bottom: 24px; font-size: 14px; }
      img { width: 100%; height: auto; margin: 16px 0 24px; border-radius: 8px; }
      p { margin: 0 0 16px; }
      blockquote { margin: 18px 0; padding-left: 14px; border-left: 3px solid #ccc; color: #444; }
    </style>
  </head>
  <body>
    <article>
      <h1>${escapeHtml(title)}</h1>
      <div class="meta">${escapeHtml(author)}${published ? ` · ${new Date(published).toISOString().slice(0, 10)}` : ''}</div>
      ${coverUrl ? `<img src="${coverUrl}" alt="${escapeHtml(title)}" />` : ''}
      ${intro ? `<p><em>${escapeHtml(intro)}</em></p>` : ''}
      ${bodyHtml}
    </article>
  </body>
</html>`

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  })
}
