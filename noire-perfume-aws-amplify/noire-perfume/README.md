# NOIRÉ — Luxury Perfume Landing Page

A responsive, static luxury fragrance brand showcase built with plain HTML, CSS, and vanilla JavaScript. No framework, backend, database, checkout, or build step is required.

## Files

- `index.html` — semantic page structure and metadata
- `style.css` — visual design, responsive breakpoints, motion and reduced-motion support
- `script.js` — interactive mood selector, scroll reveals, mobile navigation and subtle hero parallax
- `images/` — local JPG artwork used by the page

The images in this starter are original stylized product-art illustrations generated for this concept. Replace them with licensed product photography before using NOIRÉ as a real commercial brand.

## Run locally

Open `index.html` in a browser, or use VS Code Live Server. The website uses relative paths, so local assets will work when deployed under the site root.

Google Fonts are loaded from Google Fonts when internet access is available; system serif/sans-serif fallbacks are included.

## Deploy to AWS Amplify Hosting via GitHub

1. Create a new GitHub repository, for example `noire-perfume`.
2. Add `index.html`, `style.css`, `script.js`, and the `images/` folder to the repository root and push to your chosen branch.
3. In the AWS Console, open **AWS Amplify** and choose **Create new app / Host web app** (labels may vary).
4. Select **GitHub**, authorize AWS Amplify, and choose the repository and branch.
5. For this plain static site, use the repository root as the app root. No framework build is needed. If Amplify asks for build settings, use:

   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - echo "Static NOIRÉ site — no build step required"
     artifacts:
       baseDirectory: /
       files:
         - '**/*'
     cache:
       paths: []
   ```

6. Save and deploy. Amplify will provide a hosted URL with HTTPS. Subsequent pushes to the connected branch trigger redeployment.
7. Open the hosted URL and verify the hero artwork, mood selector, mobile menu, navigation, and all image paths.

### If you prefer a build configuration file

You may save the YAML above as `amplify.yml` in the repository root. Because the site has no compilation step, publish the repository root (`/`) as the artifact directory. Do not set the artifact directory to `dist` or `build` unless you move the site files there.

## Optional S3 note

You do not need to configure a separate S3 static website bucket for this workflow. Amplify Hosting manages the hosting and delivery infrastructure for the connected app. A separate S3 bucket can be useful later for independently managed media, but it adds configuration that this first version does not need.

## Before production

- Replace concept artwork with your own or properly licensed product images.
- Update the fictional fragrance copy and concept-brand wording.
- Add a custom domain through Amplify if desired.
- Check current AWS Amplify pricing, quotas, and account eligibility before launch.
- Test on mobile and keyboard navigation.
