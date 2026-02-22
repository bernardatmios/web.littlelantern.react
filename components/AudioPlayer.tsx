'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('audio')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  if (!audioFile?.asset) {
    return null
  }

  const audioUrl =
    audioFile.asset.url ||
    (() => {
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

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="rounded-xl border-2 border-[#99f6e4] bg-[#ecfeff] p-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-2xl">🎧</span>
        <h3 className="text-lg font-semibold text-[#0f766e]">{t('listenTitle')}</h3>
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
          aria-label={isPlaying ? t('pauseAria', { title }) : t('playAria', { title })}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white transition-colors hover:bg-[#115e59]"
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
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#99f6e4]"
            style={{
              background: `linear-gradient(to right, #0f766e 0%, #0f766e ${progress}%, #99f6e4 ${progress}%, #99f6e4 100%)`,
            }}
          />
          <div className="mt-1 flex justify-between text-sm text-[#475569]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
