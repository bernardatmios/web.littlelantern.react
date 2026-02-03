'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('common')
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-600 font-fredoka">
          {t('appName')}
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/stories"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            {t('stories')}
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {t('profile')}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                href="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {t('register')}
              </Link>
            </>
          )}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
