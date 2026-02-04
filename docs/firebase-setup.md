# Firebase Setup Guide

## Creating a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Choose a project name (e.g., "little-lanterns")
4. Disable Google Analytics (optional for this project)

## Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. (Optional) Enable **Google** sign-in for easier registration

## Set Up Firestore

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose a location close to your users

## Firestore Security Rules

Navigate to Firestore > Rules and update with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Ratings collection
    match /ratings/{ratingId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
    
    // User profiles (future expansion)
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

## Get Configuration Credentials

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the **Web** icon (</>)
4. Register your app with a nickname
5. Copy the config object values to your `.env.local` (server-side only):

\`\`\`env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
\`\`\`

**Note:** These are server-side only variables (not prefixed with `NEXT_PUBLIC_`). The Firebase config is served to the client via an API route for better security.

## Testing

Create a test user in Authentication > Users to verify the setup.

## Firestore Collections

The app uses the following collections:

### `ratings`
- Document ID: `{userId}_{storyId}`
- Fields:
  - `userId`: string
  - `storyId`: string
  - `rating`: number (1-5)
  - `timestamp`: timestamp

## Cost Optimization

- Firestore: Free tier includes 1GB storage, 50K reads/day
- Authentication: Free tier includes unlimited users
- For production, enable billing alerts
