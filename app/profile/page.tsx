'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export default function ProfilePage() {
  const t = useTranslations('profile')
  const tAuth = useTranslations('auth')
  const { user, updateUserProfile, updateUserEmail, updateUserPassword } = useAuth()
  const router = useRouter()

  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!user) {
    router.push('/login')
    return null
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (displayName !== user.displayName) {
        await updateUserProfile(displayName)
      }

      if (email !== user.email) {
        await updateUserEmail(email)
      }

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error(tAuth('passwordMismatch'))
        }
        if (newPassword.length < 6) {
          throw new Error(tAuth('passwordMinLength'))
        }
        await updateUserPassword(newPassword)
        setNewPassword('')
        setConfirmPassword('')
      }

      setSuccess(t('updateSuccess'))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('updateError')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#ccfbf1_0%,#f0fdfa_45%,#fff7ed_100%)] py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <section className="rounded-3xl bg-white/95 p-8 shadow-xl ring-1 ring-[#0f766e]/15">
            <h1 className="mb-8 text-center font-fredoka text-4xl font-bold text-[#0f172a]">{t('myProfile')}</h1>

            {error && (
              <div className="mb-4 rounded-xl border border-[#fca5a5] bg-[#fef2f2] px-4 py-3 text-[#991b1b]">{error}</div>
            )}

            {success && (
              <div className="mb-4 rounded-xl border border-[#86efac] bg-[#f0fdf4] px-4 py-3 text-[#166534]">{success}</div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                  {tAuth('displayName')}
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                  {tAuth('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                />
              </div>

              <div className="border-t border-[#ccfbf1] pt-6">
                <h3 className="mb-4 font-fredoka text-xl font-semibold text-[#0f172a]">{t('changePassword')}</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                      {t('newPassword')}
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                      placeholder={t('keepPasswordPlaceholder')}
                    />
                  </div>

                  {newPassword && (
                    <div>
                      <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#0f172a]">
                        {tAuth('confirmPassword')}
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-[#99f6e4] bg-white px-4 py-3 text-[#0f172a] outline-none ring-offset-2 transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/30"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#0f766e] py-3 font-semibold text-white transition hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Updating...' : t('updateProfile')}
              </button>
            </form>

            <div className="mt-8 border-t border-[#ccfbf1] pt-8 text-center text-[#475569]">
              <p className="mb-2">
                {t('accountCreated')}: {new Date(user.metadata.creationTime!).toLocaleDateString()}
              </p>
              <p>
                {t('userId')}: <span className="font-mono text-xs">{user.uid}</span>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
