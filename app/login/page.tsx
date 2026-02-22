'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export default function LoginPage() {
  const t = useTranslations('auth')
  const tCommon = useTranslations('common')
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/stories')
    } catch (err) {
      setError(t('loginError'))
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#ccfbf1_0%,#f0fdfa_45%,#fff7ed_100%)] px-4 py-12">
        <section className="mx-auto w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-xl ring-1 ring-[#0f766e]/15 md:p-10">
          <p className="mb-3 inline-block rounded-full bg-[#ecfeff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
            {t('parentAccount')}
          </p>
          <h1 className="mb-8 text-center font-fredoka text-3xl font-bold text-[#0f172a]">{t('loginTitle')}</h1>

          {error && (
            <div className="mb-4 rounded-xl border border-[#fca5a5] bg-[#fef2f2] px-4 py-3 text-[#991b1b]">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                {t('password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0f766e] py-3 font-semibold text-white transition hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '...' : tCommon('login')}
            </button>
          </form>

          <p className="mt-6 text-center text-[#475569]">
            {t('noAccount')}{' '}
            <Link href="/register" className="font-semibold text-[#0f766e] hover:text-[#115e59]">
              {tCommon('register')}
            </Link>
          </p>
        </section>
      </main>
    </>
  )
}
