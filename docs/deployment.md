# Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Firebase project set up with credentials
- ✅ Sanity Studio configured and accessible
- ✅ All environment variables configured
- ✅ Application tested locally

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Step 1: Prepare for Deployment

1. Commit all changes to Git:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Ensure `.env.local` is in `.gitignore` (it should be by default)

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your Git repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add all environment variables from `.env.local` (server-side only):

```
SANITY_PROJECT_ID=w7lunhwo
SANITY_DATASET=production
FIREBASE_API_KEY=your_actual_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

**Important:** These are server-side only variables. They are not exposed to the client bundle.

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

Your app will be available at: `https://your-project.vercel.app`

## Deploying Sanity Studio

### Option 1: Sanity Cloud (Recommended)

1. Navigate to studio directory:
```bash
cd ../studio-lantern-books
```

2. Build and deploy:
```bash
npm run build
npx sanity deploy
```

3. Choose a studio hostname (e.g., `little-lanterns`)

4. Access at: `https://little-lanterns.sanity.studio`

### Option 2: Self-Hosted

Deploy the Sanity Studio alongside your Next.js app or on a separate platform.

## Post-Deployment Checklist

### 1. Update Firebase Configuration

Add your production domain to Firebase:
1. Go to Firebase Console → Authentication → Settings
2. Add authorized domain: `your-project.vercel.app`
3. Add custom domain if using one

### 2. Update Sanity CORS

1. Go to Sanity Management Console
2. Navigate to Settings → API
3. Add CORS origin: `https://your-project.vercel.app`

### 3. Test Core Functionality

- [ ] User registration works
- [ ] User login works
- [ ] Story listing displays correctly
- [ ] Free stories are accessible without login
- [ ] Premium stories require login
- [ ] Audio player works
- [ ] Rating system saves and loads correctly
- [ ] Language switching works (EN ↔ AF)
- [ ] Images load from Sanity CDN
- [ ] Profile updates work

### 4. Configure Custom Domain (Optional)

In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

In Firebase:
1. Add custom domain to authorized domains

## Monitoring & Maintenance

### Analytics

Consider adding:
- Vercel Analytics (built-in)
- Google Analytics
- Plausible Analytics

### Error Tracking

Consider adding:
- Sentry
- LogRocket

### Performance Monitoring

- Use Vercel Speed Insights
- Monitor Core Web Vitals
- Check Lighthouse scores regularly

## Environment-Specific Configuration

### Development
- Local: `npm run dev`
- Sanity: `npm run dev` (in studio directory)
- Uses `.env.local`

### Staging (Optional)
- Create a preview branch
- Vercel creates automatic preview deployments
- Use separate Firebase project for staging

### Production
- Main branch deploys to production
- Environment variables set in Vercel
- Production Firebase project

## Rollback Procedure

If issues occur after deployment:

1. In Vercel, go to Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

Or revert Git commits:
```bash
git revert HEAD
git push origin main
```

## Troubleshooting

### Build Failures

Check Vercel build logs for errors. Common issues:
- TypeScript errors
- Missing environment variables
- Dependency issues

### Runtime Errors

Check Vercel runtime logs:
1. Go to Deployments → Select deployment → Runtime Logs

### Firebase Connection Issues

Verify:
- Environment variables are correct
- Domain is in authorized domains
- Firebase project is active

### Sanity Content Not Loading

Verify:
- CORS settings include production domain
- Sanity project ID is correct
- Dataset name is correct

## Backup Strategy

### Content Backup (Sanity)

Export dataset regularly:
```bash
npx sanity dataset export production backup.tar.gz
```

### User Data Backup (Firebase)

Use Firebase Console to:
1. Export Firestore data
2. Backup authentication users

### Code Backup

- Git repository serves as code backup
- Consider GitHub repository backups
- Store environment variables securely (1Password, etc.)

## Cost Optimization

### Vercel
- Free tier: Suitable for small projects
- Pro tier: $20/month for production apps

### Sanity
- Free tier: 3 users, 2 datasets, 10k documents
- Growth tier: $99/month for more capacity

### Firebase
- Free tier: Limited reads/writes
- Blaze (pay-as-you-go): Scale as needed
- Set up billing alerts to avoid surprises

## Security Best Practices

1. Never commit `.env.local` to Git
2. Rotate Firebase credentials periodically
3. Use Firebase security rules (see firebase-setup.md)
4. Enable HTTPS only (handled by Vercel)
5. Keep dependencies updated
6. Monitor for vulnerabilities: `npm audit`

## Continuous Deployment

Automatic deployments on Git push:
1. Merge to `main` → Production deployment
2. Push to any branch → Preview deployment
3. Pull requests → Preview deployment with comments

Configure in Vercel:
- Settings → Git → Production Branch
- Enable automatic deployments
