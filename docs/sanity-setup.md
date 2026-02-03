# Sanity CMS Setup Guide

## Project Information

- **Project ID**: w7lunhwo
- **Dataset**: production
- **Studio Location**: `../studio-lantern-books`

## Content Schemas

### StoryBooks Schema

The main content type for children's stories with bilingual support.

**Fields:**
- `title` (object) - English and Afrikaans story titles
  - `en`: English title (required)
  - `af`: Afrikaans title (required)
- `slug` - URL-friendly identifier (auto-generated from English title)
- `shortIntroduction` (object) - Brief story description
  - `en`: English intro (max 200 chars)
  - `af`: Afrikaans intro (max 200 chars)
- `story` (object) - Full story content in portable text format
  - `en`: English story (rich text with formatting)
  - `af`: Afrikaans story (rich text with formatting)
- `audioFile` - Optional audio narration file
- `coverImage` - Story cover image (required, with hotspot)
- `isFree` - Boolean flag for free/premium content
- `publishedAt` - Publication date/time
- `ageRange` - Target age group (0-2, 3-5, 6-8, 9-12)
- `averageRating` - Calculated average rating (read-only)

### SiteDesigns Schema

For managing site images and decorative elements.

**Fields:**
- `title` - Image title/name
- `designType` - Type: hero, background, or decoration
- `image` - The design image (with hotspot)
- `description` - Optional description

## Starting Sanity Studio

\`\`\`bash
cd ../studio-lantern-books
npm run dev
\`\`\`

Access at: http://localhost:3333

## Adding a Story

1. Open Sanity Studio
2. Click "+ New document" → "Story Books"
3. Fill in both English (en) and Afrikaans (af) versions of:
   - Title
   - Short Introduction
   - Story content
4. Upload cover image (recommended: 800x1200px)
5. (Optional) Upload audio file (MP3 or M4A)
6. Set age range
7. Toggle "Free Story" if it should be accessible without login
8. Publish

## Content Guidelines

### Images
- Cover images: 800x1200px minimum, portrait orientation
- Use high-quality, child-friendly illustrations
- Enable hotspot for smart cropping

### Audio Files
- Format: MP3 or M4A
- Bitrate: 128kbps minimum
- Clear narration, appropriate pacing for children

### Story Content
- Use simple, age-appropriate language
- Break content into short paragraphs
- Use formatting (bold, emphasis) sparingly
- Keep introductions under 200 characters

## Querying Content

The Next.js app uses GROQ queries to fetch stories:

\`\`\`javascript
const query = \`*[_type == "storyBook"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  shortIntroduction,
  coverImage,
  isFree,
  ageRange,
  averageRating,
  publishedAt
}\`
\`\`\`

## Image CDN

Images are served through Sanity's CDN with automatic optimization:
- Automatic format selection (WebP when supported)
- Responsive sizing
- Quality optimization
- Hotspot-aware cropping

Access via: `https://cdn.sanity.io/images/w7lunhwo/production/...`
