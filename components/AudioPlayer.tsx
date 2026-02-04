'use client'

import { useState, useRef } from 'react'

interface AudioPlayerProps {
  audioFile: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
  title: string
}

export default function AudioPlayer({ audioFile, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Get audio URL from asset
  if (!audioFile?.asset) {
    return null
  }
  
  // Use the URL directly if available, otherwise construct from _ref
  const audioUrl = audioFile.asset.url || (() => {
    if (!audioFile.asset._ref) return null
    const assetId = audioFile.asset._ref.replace('file-', '').replace('-mp3', '.mp3').replace('-m4a', '.m4a')
    return `https://cdn.sanity.io/files/w7lunhwo/production/${assetId}`
  })()
  
  if (!audioUrl) {
    return null
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl">🎧</span>
        <h3 className="text-lg font-semibold text-purple-600">Listen to the story</h3>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                (currentTime / duration) * 100
              }%, #e9d5ff ${(currentTime / duration) * 100}%, #e9d5ff 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
