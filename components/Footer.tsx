'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { BRAND_LOGO_URL } from '@/lib/branding'

export default function Footer() {
  const t = useTranslations('footer')
  const common = useTranslations('common')

  return (
    <footer className="border-t border-[#99f6e4] bg-[#ecfeff]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <Link href="/" className="mb-3 inline-flex items-center gap-3">
              <div className="relative h-16 w-16">
                <Image src={BRAND_LOGO_URL} alt={common('appName')} fill sizes="64px" className="object-contain" />
              </div>
              <span className="font-fredoka text-2xl font-bold text-[#0f766e]">{common('appName')}</span>
            </Link>
            <p className="max-w-sm text-sm text-[#475569]">{t('tagline')}</p>
          </section>

          <section>
            <h3 className="mb-3 font-fredoka text-xl text-[#0f172a]">{t('explore')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#334155] hover:text-[#0f766e]">{common('home')}</Link>
              </li>
              <li>
                <Link href="/stories" className="text-[#334155] hover:text-[#0f766e]">{common('storyLibrary')}</Link>
              </li>
              <li>
                <Link href="/kids" className="text-[#334155] hover:text-[#0f766e]">{common('kidsSpace')}</Link>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 font-fredoka text-xl text-[#0f172a]">{t('publication')}</h3>
            <ul className="space-y-2 text-sm text-[#334155]">
              <li>{t('independent')}</li>
              <li>{t('bilingual')}</li>
              <li>{t('rights')}</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 border-t border-[#99f6e4] pt-4 text-sm text-[#475569]">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}
