# Little Lanterns - Children's Story Books Website

A bilingual (English/Afrikaans) children's story book platform built with Next.js, Sanity CMS, and Firebase.

## Project Structure

```
web-lantern-books/          # Next.js frontend application
  ├── app/                  # Next.js App Router pages
  ├── components/           # React components
  ├── contexts/             # React contexts (Auth, etc.)
  ├── lib/                  # Utilities and configurations
  ├── messages/             # i18n translation files
  └── docs/                 # Documentation

studio-lantern-books/       # Sanity Studio CMS
  └── schemaTypes/          # Content schemas
```

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and SSR
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Headless UI** - Accessible UI components
- **next-intl** - Internationalization (EN/AF)

### Backend & Services
- **Sanity CMS** - Content management, image CDN, audio hosting
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - User data, ratings, profiles

## Getting Started

### Prerequisites
- Node.js v25+ and npm
- Firebase project
- Sanity project (already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your Firebase credentials in `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Start Sanity Studio (in separate terminal):
```bash
cd ../studio-lantern-books
npm run dev
```

Visit:
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3333

## Features

- ✅ Bilingual content (English/Afrikaans)
- ✅ User authentication (Firebase)
- ✅ Story management via Sanity CMS
- ✅ Image optimization with Next.js Image + Sanity CDN
- ✅ Audio playback for stories
- ✅ User ratings and reviews (Firestore)
- ✅ Free/Premium content gating
- ✅ User profile management
- ✅ Kid-friendly responsive UI

## Documentation

- [Architecture Overview](./architecture.md)
- [Sanity Setup](./sanity-setup.md)
- [Firebase Setup](./firebase-setup.md)
- [Content Management Guide](./content-management.md)
- [Deployment Guide](./deployment.md)

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Environment Variables

See `.env.example` for all required environment variables.

## License

Private - Little Lanterns Books
