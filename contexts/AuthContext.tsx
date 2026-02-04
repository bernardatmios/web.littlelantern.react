'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { initializeFirebase } from '@/lib/firebase'
import type { Auth } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  register: (email: string, password: string, displayName: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (displayName: string) => Promise<void>
  updateUserEmail: (email: string) => Promise<void>
  updateUserPassword: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState<Auth | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    initializeFirebase().then(({ auth: firebaseAuth }) => {
      setAuth(firebaseAuth)
      unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        setUser(user)
        setLoading(false)
      })
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const register = async (email: string, password: string, displayName: string) => {
    if (!auth) throw new Error('Firebase not initialized')
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    setUser(userCredential.user)
  }

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not initialized')
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    setUser(userCredential.user)
  }

  const logout = async () => {
    if (!auth) throw new Error('Firebase not initialized')
    await signOut(auth)
    setUser(null)
  }

  const updateUserProfile = async (displayName: string) => {
    if (user) {
      await updateProfile(user, { displayName })
      setUser({ ...user })
    }
  }

  const updateUserEmail = async (email: string) => {
    if (user) {
      await updateEmail(user, email)
      setUser({ ...user })
    }
  }

  const updateUserPassword = async (password: string) => {
    if (user) {
      await updatePassword(user, password)
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
