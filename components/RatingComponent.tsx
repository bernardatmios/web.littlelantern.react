'use client'

import { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { initializeFirebase } from '@/lib/firebase'

interface RatingComponentProps {
  storyId: string
  userId: string
}

export default function RatingComponent({ storyId, userId }: RatingComponentProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadUserRating()
  }, [storyId, userId])

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
      alert('Failed to save rating. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading rating...</div>
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-purple-600 mb-4 font-fredoka">
        Rate this story
      </h3>

      <div className="flex justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={saving}
            className="text-4xl transition-transform transform hover:scale-125 disabled:opacity-50"
          >
            {star <= (hoveredRating || rating) ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="text-sm text-gray-600">
          You rated this story {rating} out of 5 stars
        </p>
      )}

      {saving && <p className="text-sm text-purple-600 mt-2">Saving...</p>}
    </div>
  )
}
