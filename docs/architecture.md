# Architecture Overview

## System Architecture

The Little Lanterns application follows a modern JAMstack architecture with serverless functions, headless CMS, and client-side authentication.

```
┌─────────────────┐
│   Next.js App   │
│  (Server + UI)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│ Sanity │ │ Firebase │
│  CMS   │ │ Auth +   │
│        │ │ Firestore│
└────────┘ └──────────┘
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript** - Type safety throughout the application
- **TailwindCSS** - Utility-first CSS framework
- **Headless UI** - Accessible, unstyled UI components

### Content Management
- **Sanity CMS** - Headless CMS for content management
  - Project ID: w7lunhwo
  - Dataset: production
  - Studio: ../studio-lantern-books

### Authentication & Database
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - NoSQL database for ratings

### Internationalization
- **next-intl** - i18n with English and Afrikaans support

## Data Flow

### Story Content Delivery
1. Content is created in Sanity Studio
2. Next.js fetches content using GROQ queries
3. Server-side rendering (SSR) for SEO and performance
4. Images served via Sanity CDN with Next.js Image optimization
5. Audio files served directly from Sanity CDN

### User Authentication
1. User registers/logs in via Firebase Authentication
2. Auth state managed by React Context
3. Protected content conditionally rendered based on auth state
4. Session persisted automatically by Firebase SDK

### Rating System
1. User submits rating (1-5 stars)
2. Rating saved to Firestore: `ratings/{userId}_{storyId}`
3. Ratings aggregated in real-time
4. Average rating displayed on story cards

## Key Components

### Page Components
- `/` - Home page with hero section
- `/stories` - Story listing (SSR)
- `/stories/[slug]` - Individual story page (SSR + Client)
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile management

### Reusable Components
- `Header` - Navigation with auth state
- `LanguageSwitcher` - EN/AF language toggle
- `StoryCard` - Story preview card
- `StoryContent` - Full story display with gating
- `AudioPlayer` - Custom audio player
- `RatingComponent` - Star rating widget

### Context Providers
- `AuthProvider` - Firebase authentication state
- `NextIntlClientProvider` - i18n messages

## Content Schemas

### StoryBook
```typescript
{
  title: { en: string, af: string }
  slug: { current: string }
  shortIntroduction: { en: string, af: string }
  story: { en: PortableText[], af: PortableText[] }
  audioFile?: File
  coverImage: Image
  isFree: boolean
  ageRange: string
  averageRating: number
  publishedAt: datetime
}
```

### SiteDesign
```typescript
{
  title: string
  designType: 'hero' | 'background' | 'decoration'
  image: Image
  description?: string
}
```

## Security

### Content Gating
- Free stories: Accessible to all users
- Premium stories: Require authentication
- Logic implemented client-side with auth state check

### Firebase Security Rules
- Ratings: Users can only write their own ratings
- Read access: Public for all ratings
- Authentication: Email/password with validation

### Environment Variables
- All sensitive config in `.env.local`
- Firebase credentials prefixed with `NEXT_PUBLIC_`
- Sanity credentials public (read-only dataset)

## Performance Optimizations

1. **Server-Side Rendering (SSR)**
   - Stories fetched at build/request time
   - SEO-friendly rendered HTML

2. **Image Optimization**
   - Next.js Image component
   - Sanity CDN with automatic format selection
   - Responsive image sizes

3. **Code Splitting**
   - Automatic route-based code splitting
   - Dynamic imports where needed

4. **Caching**
   - Sanity CDN caching
   - Next.js automatic caching
   - Firebase SDK caching

## Deployment Strategy

### Recommended: Vercel
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Sanity Studio Deployment
```bash
cd ../studio-lantern-books
npm run build
npm run deploy
```

Access at: https://[project-name].sanity.studio

## Future Enhancements

- Progressive Web App (PWA) support
- Offline reading capability
- Push notifications for new stories
- Reading progress tracking
- Bookmarks/favorites
- Social sharing
- Analytics dashboard
- Admin panel for managing ratings
