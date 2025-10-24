# 🚀 Deployment Guide

This guide shows you how to deploy your portfolio for **FREE** on various platforms.

## Option 1: GitHub Pages (Recommended)

### Setup:
1. Create a GitHub repository
2. Add this to your `package.json` scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "vite build && npx gh-pages -d dist"
   }
   ```

3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

4. Add to `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   })
   ```

5. Deploy:
   ```bash
   npm run deploy
   ```

6. Enable GitHub Pages in repo settings (Settings → Pages → Source: gh-pages branch)

**Your site:** `https://yourusername.github.io/your-repo-name/`

---

## Option 2: Netlify

### Method A - Drag & Drop:
1. Build the project: `.\run-build.ps1`
2. Go to [netlify.com](https://www.netlify.com/)
3. Drag the `dist` folder to deploy

### Method B - Git Integration:
1. Push to GitHub
2. Connect Netlify to your repo
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy automatically on every push

**Custom domain available for free!**

---

## Option 3: Vercel

### Deploy:
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Import your repository
4. Vercel auto-detects Vite
5. Click Deploy

**Features:**
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Edge network (fast globally)
- ✅ Free subdomain: `yoursite.vercel.app`

---

## Option 4: Cloudflare Pages

### Deploy:
1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com/)
3. Connect your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Deploy

**Benefits:**
- ✅ Cloudflare's global CDN
- ✅ Free custom domains
- ✅ Unlimited bandwidth
- ✅ DDoS protection

---

## Option 5: Firebase Hosting

### Setup:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init hosting
   ```
   - Choose `dist` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

**Your site:** `https://your-project.web.app`

---

## Pre-Deployment Checklist

Before deploying, make sure to:

### 1. Update Personal Information
- [ ] Social media links in `constants.tsx`
- [ ] Email address in `App.tsx` contact section
- [ ] Resume link in hero section
- [ ] Project links and descriptions

### 2. Update Assets
- [ ] Add all project images to `/assets` folder
- [ ] Add a favicon (`/favicon.svg`)
- [ ] Optimize images (use WebP format for smaller size)

### 3. Test Locally
- [ ] Run `.\run-dev.ps1`
- [ ] Test all navigation links
- [ ] Test contact form validation
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test all external links (GitHub, LinkedIn, etc.)

### 4. Build for Production
- [ ] Run `.\run-build.ps1`
- [ ] Check the `dist` folder is created
- [ ] Test the production build: `npm run preview`

### 5. SEO Optimization (Optional)
- [ ] Update `<title>` in `index.html`
- [ ] Add meta description in `index.html`:
  ```html
  <meta name="description" content="Jay Gautam - AI Developer & Innovator. Portfolio showcasing projects in AI, ML, and web development.">
  ```
- [ ] Add Open Graph tags for social sharing:
  ```html
  <meta property="og:title" content="Jay Gautam - Portfolio">
  <meta property="og:description" content="AI Developer & Innovator">
  <meta property="og:image" content="/assets/og-image.png">
  ```

### 6. Performance Optimization (Optional)
- [ ] Compress images
- [ ] Enable Vite's build optimizations (already enabled)
- [ ] Consider lazy loading for heavy components

---

## Troubleshooting

### Build fails on deployment platform:
- Check Node.js version (platform should use Node 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Site shows blank page:
- Check browser console for errors
- Verify the `base` path in `vite.config.ts` matches your deployment
- Ensure all assets are in the `dist` folder

### Styles not loading:
- Check Tailwind CDN link in `index.html`
- Verify Google Fonts are loading
- Clear browser cache

---

## Free Hosting Comparison

| Platform | Free Plan | Custom Domain | SSL | Build Minutes |
|----------|-----------|---------------|-----|---------------|
| **GitHub Pages** | ✅ Yes | ✅ Yes | ✅ Auto | Unlimited |
| **Netlify** | ✅ Yes | ✅ Yes | ✅ Auto | 300/month |
| **Vercel** | ✅ Yes | ✅ Yes | ✅ Auto | 6000/month |
| **Cloudflare Pages** | ✅ Yes | ✅ Yes | ✅ Auto | 500/month |
| **Firebase** | ✅ Yes | ✅ Yes | ✅ Auto | Unlimited |

**Recommendation:** All are excellent! Choose based on preference:
- **GitHub Pages:** Best if code is already on GitHub
- **Vercel:** Fastest setup, great DX
- **Netlify:** Great for static sites, form handling
- **Cloudflare Pages:** Best global performance
- **Firebase:** Good if using other Firebase services

---

## Continuous Deployment

Once connected to Git:
1. Make changes locally
2. Commit and push to GitHub
3. Platform auto-deploys new version
4. Live in 1-2 minutes ⚡

---

## Custom Domain Setup (Optional)

Most platforms offer free custom domains. Steps:
1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add domain in hosting platform settings
3. Update DNS records (platform provides instructions)
4. Wait for DNS propagation (can take up to 48 hours)

---

*Happy Deploying! 🚀*
