# Content Management Guide

A step-by-step guide for creating and managing stories in the Little Lanterns platform.

## Accessing Sanity Studio

### Local Development
```bash
cd ../studio-lantern-books
npm run dev
```
Visit: http://localhost:3333

### Production
Visit: https://[your-studio-name].sanity.studio

## Creating a New Story

### Step 1: Create Document

1. Click the **"+" button** or "Create new document"
2. Select **"Story Books"** from the list
3. You'll see an empty story form

### Step 2: Add Bilingual Titles

**English Title:**
- Enter the story title in English
- Example: "The Little Lantern's Adventure"

**Afrikaans Title:**
- Enter the story title in Afrikaans
- Example: "Die Klein Lantern se Avontuur"

### Step 3: Generate Slug

1. Click the **"Generate"** button next to the Slug field
2. This creates a URL-friendly version of your English title
3. Example: `the-little-lanterns-adventure`
4. You can edit this if needed (keep it lowercase with hyphens)

### Step 4: Write Short Introductions

**English Introduction (max 200 characters):**
- Brief, engaging summary of the story
- Encourage children to read
- Example: "Join Little Lantern on a magical journey through the starry night. What wonders will you discover?"

**Afrikaans Introduction:**
- Same content, translated to Afrikaans
- Example: "Sluit aan by Klein Lantern op 'n magiese reis deur die sterre nag. Watter wonders sal jy ontdek?"

### Step 5: Write the Full Story

#### English Story Content

1. Click in the "English" story field
2. Write your story using the rich text editor
3. Available formatting:
   - **Bold** for emphasis
   - *Italic* for special words
   - Headings (H2, H3) for chapters
   - Blockquotes for special sections

Tips:
- Break story into short paragraphs
- Use simple, age-appropriate language
- Add headings for chapters or sections
- Keep sentences short and clear

Example:
```
Once upon a time, in a small village...

## Chapter 1: The Discovery

Little Lantern found something *magical* in the forest...
```

#### Afrikaans Story Content

Repeat the same process in Afrikaans, translating your story.

### Step 6: Upload Cover Image

1. Click "Upload" in the Cover Image field
2. Select an image from your computer
3. **Recommended specifications:**
   - Size: 800x1200px minimum
   - Format: JPG or PNG
   - Orientation: Portrait
   - Style: Colorful, child-friendly illustration

4. **Set Hotspot (Important):**
   - After upload, click the image
   - Drag the circle to the focal point
   - This ensures proper cropping on different devices

### Step 7: Upload Audio Narration (Optional)

1. Click "Upload" in the Audio File field
2. Select your audio file
3. **Recommended specifications:**
   - Format: MP3 or M4A
   - Bitrate: 128kbps or higher
   - Clear, professional narration
   - Appropriate pacing for children
   - Include pauses between paragraphs

**Tips for Audio:**
- Speak slowly and clearly
- Use expressive tones
- Add sound effects sparingly
- Keep background music subtle
- Test on different devices

### Step 8: Set Story Metadata

**Age Range:**
- Select from: 0-2, 3-5, 6-8, or 9-12 years
- Choose based on content complexity and themes

**Free Story:**
- Toggle ON if story should be accessible without login
- Toggle OFF for premium content (requires login)
- Tip: Make 1-2 stories free to attract new users

**Published At:**
- Automatically set to current date/time
- Adjust if you want to schedule for future release

### Step 9: Publish

1. Click **"Publish"** button (bottom left)
2. Story is now live on your website
3. View it by visiting: `/stories/[your-slug]`

## Managing Existing Stories

### Edit a Story

1. Find story in the list
2. Click to open
3. Make your changes
4. Click "Publish" to save

### Unpublish a Story

1. Open the story
2. Click "Unpublish" (next to Publish button)
3. Story is removed from public website
4. Draft remains in Sanity

### Delete a Story

1. Open the story
2. Click the "..." menu (top right)
3. Select "Delete"
4. Confirm deletion
5. **Warning:** This cannot be undone

### Duplicate a Story

1. Open the story
2. Click the "..." menu
3. Select "Duplicate"
4. Edit the duplicate with new content

## Working with Site Designs

Site designs are images used for decorative purposes.

### Create Site Design

1. Click "Create" → "Site Designs"
2. Add a title (e.g., "Hero Background")
3. Select design type:
   - **Hero**: Large banner images
   - **Background**: Repeating patterns
   - **Decoration**: Icons, illustrations
4. Upload image
5. Add description (optional)
6. Publish

## Best Practices

### Story Writing

✅ **Do:**
- Use simple, age-appropriate language
- Break content into short paragraphs
- Include dialogue to engage children
- Add moral lessons subtly
- Test stories with target age group

❌ **Don't:**
- Use complex vocabulary
- Create overly long paragraphs
- Include scary or inappropriate content
- Forget to translate both versions
- Skip proofreading

### Image Guidelines

✅ **Do:**
- Use high-quality, colorful illustrations
- Ensure images are child-friendly
- Set hotspot on focal point
- Use consistent art style
- Compress images before upload

❌ **Don't:**
- Use blurry or low-resolution images
- Include scary or disturbing visuals
- Forget to test on mobile devices
- Use copyrighted images without permission

### Audio Guidelines

✅ **Do:**
- Speak clearly and slowly
- Use expressive voices for characters
- Pause between sentences/paragraphs
- Test audio quality before upload
- Keep consistent volume levels

❌ **Don't:**
- Rush through narration
- Use poor quality microphones
- Add loud background music
- Forget to edit out mistakes
- Make files too large

## Quality Checklist

Before publishing, verify:

- [ ] Both English and Afrikaans content complete
- [ ] Spelling and grammar checked (both languages)
- [ ] Cover image uploaded and hotspot set
- [ ] Audio file uploaded (if applicable)
- [ ] Age range appropriate for content
- [ ] Free/Premium status set correctly
- [ ] Slug is unique and descriptive
- [ ] Story tested in preview
- [ ] Content is child-appropriate
- [ ] Both versions tell the same story

## Workflow Recommendations

### Solo Content Creator

1. Write English version completely
2. Proofread and edit
3. Translate to Afrikaans
4. Add images and audio
5. Preview and test
6. Publish

### Team Workflow

1. **Writer:** Creates English story
2. **Translator:** Translates to Afrikaans
3. **Editor:** Reviews both versions
4. **Designer:** Creates cover image
5. **Voice Actor:** Records audio
6. **Publisher:** Final review and publish

## Troubleshooting

### Story Not Appearing on Website

- Check it's published (not draft)
- Verify slug is unique
- Clear browser cache
- Check for any errors in console

### Images Not Loading

- Ensure image is uploaded completely
- Check file size (max 10MB)
- Try JPG instead of PNG
- Verify CORS settings

### Audio Not Playing

- Check file format (MP3/M4A)
- Ensure file uploaded completely
- Test in different browsers
- Check file isn't corrupted

## Tips for Success

1. **Consistency:** Maintain regular publishing schedule
2. **Engagement:** Create series with recurring characters
3. **Feedback:** Monitor ratings and user comments
4. **Updates:** Refresh older stories with better images/audio
5. **Balance:** Mix free and premium content strategically

## Getting Help

If you encounter issues:
1. Check this documentation
2. Review Sanity Studio documentation
3. Contact technical support
4. Check the project's GitHub issues
