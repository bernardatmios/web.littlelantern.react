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
          throw new Error('Passwords do not match')
        }
        if (newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
        await updateUserPassword(newPassword)
        setNewPassword('')
        setConfirmPassword('')
      }

      setSuccess(t('updateSuccess'))
    } catch (err: any) {
      setError(err.message || t('updateError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center font-fredoka">
              {t('myProfile')}
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                  {tAuth('displayName')}
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {tAuth('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-purple-600 mb-4 font-fredoka">
                  {t('changePassword')}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New {tAuth('password')}
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  {newPassword && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        {tAuth('confirmPassword')}
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : t('updateProfile')}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center text-gray-600">
                <p className="mb-2">Account created: {new Date(user.metadata.creationTime!).toLocaleDateString()}</p>
                <p>User ID: <span className="text-xs font-mono">{user.uid}</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
