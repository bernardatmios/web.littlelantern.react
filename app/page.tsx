import Link from 'next/link'
import Header from '@/components/Header'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-purple-600 mb-6 font-fredoka">
            Little Lanterns
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Magical bilingual stories for children in English and Afrikaans
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/stories"
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Stories
            </Link>
            <Link
              href="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border-2 border-purple-600"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-3 font-fredoka">
                Bilingual Stories
              </h3>
              <p className="text-gray-600">
                Read stories in both English and Afrikaans, perfect for learning and fun
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-3 font-fredoka">
                Audio Narration
              </h3>
              <p className="text-gray-600">
                Listen along as stories come to life with professional narration
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-3 font-fredoka">
                Kid-Friendly
              </h3>
              <p className="text-gray-600">
                Age-appropriate content designed for young readers and listeners
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
