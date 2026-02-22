import Image from 'next/image'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import StoryCard from '@/components/StoryCard'
import { BRAND_LOGO_URL } from '@/lib/branding'
import { client, StoryBook } from '@/lib/sanity'

async function getSampleStories(): Promise<StoryBook[]> {
  const query = `*[_type == "storyBook"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    shortIntroduction,
    coverImage,
    isFree,
    ageRange,
    averageRating,
    publishedAt
  }`

  return client.fetch(query)
}

export default async function HomePage() {
  const t = await getTranslations('landing')
  const locale = await getLocale()
  const sampleStories = await getSampleStories()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#ccfbf1_0%,#f0fdfa_40%,#fff7ed_100%)]">
        <section className="container mx-auto px-4 pb-16 pt-14 text-center">
          <div className="mx-auto mb-4 relative h-72 w-72">
            <Image src={BRAND_LOGO_URL} alt="Little Lanterns logo" fill sizes="288px" className="object-contain" />
          </div>
          <p className="mx-auto mb-4 inline-block rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#0f766e] ring-1 ring-[#0f766e]/20">
            {t('independentPublication')}
          </p>
          <h1 className="mx-auto mb-5 max-w-5xl font-fredoka text-5xl font-bold leading-tight text-[#0f172a] md:text-7xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-[#334155] md:text-xl">{t('heroSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/stories"
              className="rounded-full bg-[#0f766e] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#115e59]"
            >
              {t('exploreLibrary')}
            </Link>
            <Link
              href="/kids"
              className="rounded-full border-2 border-[#f97316] bg-white px-8 py-4 text-lg font-semibold text-[#9a3412] transition hover:bg-[#fff7ed]"
            >
              {t('openKidsSpace')}
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-fredoka text-3xl font-bold text-[#0f172a]">{t('featuredStories')}</h2>
              <p className="text-[#475569]">{t('featuredSubtitle')}</p>
            </div>
            <Link href="/stories" className="font-semibold text-[#0f766e] hover:text-[#115e59]">
              {t('viewAllStories')} →
            </Link>
          </div>

          {sampleStories.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-md">
              <p className="text-lg text-[#475569]">{t('noStoriesReady')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {sampleStories.map((story) => (
                <StoryCard key={story._id} story={story} locale={locale} />
              ))}
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#0f766e]/10">
              <h3 className="mb-2 font-fredoka text-2xl text-[#0f172a]">{t('featureParentTitle')}</h3>
              <p className="text-[#475569]">{t('featureParentDescription')}</p>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#f97316]/20">
              <h3 className="mb-2 font-fredoka text-2xl text-[#0f172a]">{t('featureChildTitle')}</h3>
              <p className="text-[#475569]">{t('featureChildDescription')}</p>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#0f766e]/10">
              <h3 className="mb-2 font-fredoka text-2xl text-[#0f172a]">{t('featureRatingTitle')}</h3>
              <p className="text-[#475569]">{t('featureRatingDescription')}</p>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}
