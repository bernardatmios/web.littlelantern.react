'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { initializeFirebase } from '@/lib/firebase'

interface RatingComponentProps {
  storyId: string
  userId: string
}

export default function RatingComponent({ storyId, userId }: RatingComponentProps) {
  const t = useTranslations('rating')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadUserRating = async () => {
      try {
        const { db } = await initializeFirebase()
        const ratingId = `${userId}_${storyId}`
        const ratingDoc = await getDoc(doc(db, 'ratings', ratingId))

        if (ratingDoc.exists()) {
          setRating(ratingDoc.data().rating)
        }
      } catch (error) {
        console.error('Error loading rating:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserRating()
  }, [storyId, userId])

  const handleRating = async (newRating: number) => {
    setSaving(true)
    try {
      const { db } = await initializeFirebase()
      const ratingId = `${userId}_${storyId}`
      await setDoc(doc(db, 'ratings', ratingId), {
        userId,
        storyId,
        rating: newRating,
        timestamp: new Date(),
      })

      setRating(newRating)
    } catch (error) {
      console.error('Error saving rating:', error)
      alert(t('saveError'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center text-[#475569]">{t('loading')}</div>
  }

  return (
    <div className="text-center">
      <h3 className="mb-4 font-fredoka text-xl font-bold text-[#0f766e]">{t('title')}</h3>

      <div className="mb-2 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={saving}
            className="text-4xl transition-transform hover:scale-125 disabled:opacity-50"
          >
            {star <= (hoveredRating || rating) ? '★' : '☆'}
          </button>
        ))}
      </div>

      {rating > 0 && <p className="text-sm text-[#334155]">{t('ratedMessage', { rating })}</p>}

      {saving && <p className="mt-2 text-sm text-[#0f766e]">{t('saving')}</p>}
    </div>
  )
}
