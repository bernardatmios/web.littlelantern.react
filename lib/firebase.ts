import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

interface FirebaseWebConfig {
  apiKey?: string
  authDomain?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

let configPromise: Promise<FirebaseWebConfig> | null = null

async function getFirebaseConfig() {
  if (!configPromise) {
    configPromise = fetch('/api/firebase-config').then(res => res.json())
  }
  return configPromise
}

export async function initializeFirebase() {
  if (app) {
    return { app, auth: auth!, db: db! }
  }

  const firebaseConfig = await getFirebaseConfig()
  
  // Initialize Firebase only if it hasn't been initialized already
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(app)
  db = getFirestore(app)

  return { app, auth, db }
}

// Export getters that will initialize if needed
export const getFirebaseAuth = async () => {
  const { auth } = await initializeFirebase()
  return auth
}

export const getFirebaseDb = async () => {
  const { db } = await initializeFirebase()
  return db
}

export { auth, db }
export default app
