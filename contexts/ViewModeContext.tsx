'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'

export type ViewMode = 'parent' | 'child'

interface ChildProfile {
  name: string
  ageRange: string
}

interface ViewModeContextType {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  childProfile: ChildProfile
  setChildProfile: (profile: ChildProfile) => void
}

const STORAGE_MODE_KEY = 'lanterns:view-mode'
const STORAGE_CHILD_KEY = 'lanterns:child-profile'

function getLocaleDefaultChildName() {
  if (typeof window === 'undefined') return 'Little Reader'
  return document.cookie.includes('locale=af') ? 'Klein Leser' : 'Little Reader'
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'parent'
    const savedMode = window.localStorage.getItem(STORAGE_MODE_KEY)
    return savedMode === 'child' ? 'child' : 'parent'
  })

  const [childProfile, setChildProfileState] = useState<ChildProfile>(() => {
    if (typeof window === 'undefined') {
      return { name: 'Little Reader', ageRange: '3-5' }
    }

    const defaultName = getLocaleDefaultChildName()
    const savedProfile = window.localStorage.getItem(STORAGE_CHILD_KEY)
    if (!savedProfile) {
      return { name: defaultName, ageRange: '3-5' }
    }

    try {
      const parsed = JSON.parse(savedProfile)
      if (parsed?.name && parsed?.ageRange) {
        return { name: parsed.name, ageRange: parsed.ageRange }
      }
    } catch {
      // Ignore invalid local data.
    }

    return { name: defaultName, ageRange: '3-5' }
  })

  const setMode = (nextMode: ViewMode) => {
    setModeState(nextMode)
    window.localStorage.setItem(STORAGE_MODE_KEY, nextMode)
  }

  const setChildProfile = (profile: ChildProfile) => {
    setChildProfileState(profile)
    window.localStorage.setItem(STORAGE_CHILD_KEY, JSON.stringify(profile))
  }

  const value = useMemo(
    () => ({ mode, setMode, childProfile, setChildProfile }),
    [mode, childProfile],
  )

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  const context = useContext(ViewModeContext)
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider')
  }
  return context
}
