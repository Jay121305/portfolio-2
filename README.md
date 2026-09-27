# Jay Gautam - data-focused portfolio

A React, TypeScript, and Vite portfolio for a data-focused engineer with strong software and systems foundations.

## Run locally

Install packages with npm install, start the local server with npm run dev, and make a production build with npm run build.

## Fast content updates

| What to change | Where |
| --- | --- |
| Main projects, side quests, skills, experience, contact links | constants.tsx |
| Profile photo | Replace public/Jay.png and retain that filename |
| Resume | Replace public/JayGautam_VIT_Pune_DS_DE_DA.pdf |
| Resume viewer | public/resume.html |
| Blog posts | /admin after CMS setup, or content/posts/*.md |
| Blog images | /admin uploads them to public/images/blog |

## Beyond Work publishing

The site includes Decap CMS at /admin. It writes Markdown posts into content/posts and images into public/images/blog; Vite adds every post automatically during the next deployment. The portfolio reader supports headings, paragraphs, bullet lists, links, bold text, inline code, quotes, and images without requiring a code edit.

To enable the no-code editor on Netlify:

1. Deploy this repository to Netlify.
2. In Site configuration > Identity, enable Identity and invite yourself as a user.
3. Under Identity > Services, enable Git Gateway.
4. Visit your-domain/admin, accept the invitation, and sign in.
5. Use Beyond Work posts > New Beyond Work posts. Publish to commit the post and trigger a new deploy.

## Deployment

### Recommended: Netlify

Netlify is the easiest fit because this is a static Vite site and its free Identity plus Git Gateway integration powers the included on-site /admin writing experience.

1. Push this code to the GitHub repository.
2. At Netlify, choose Add new site > Import an existing project > GitHub and select the repository.
3. Use build command npm run build and publish directory dist.
4. Deploy. Every subsequent GitHub commit or post published through /admin deploys automatically.
5. Optionally add a custom domain under Domain management.

### GitHub Pages fallback

The GitHub workflow in .github/workflows/deploy-pages.yml builds and deploys this project after a push to main. In GitHub repository settings, set Pages > Source to GitHub Actions. This keeps the public site free and static, but Decap CMS needs Netlify Identity and Git Gateway, so use Netlify if the no-code blog editor is important.

The build uses VITE_BASE=/portfolio-2/ for the existing GitHub Pages URL and / by default for Netlify, Vercel, and custom-domain deployments.
