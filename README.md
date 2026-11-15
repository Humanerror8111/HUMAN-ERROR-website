# HUMAN ERROR: Website

Cinematic scroll-controlled intro, services, portfolio, pricing, enquiry system and an AI video studio.
Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Framer Motion, Lucide, Zod. Node.js 20.9+ (22 LTS recommended). No Python needed.

> **Honest status:** this project was written and checked in an environment with no package-install access, so
> `npm install` and `npm run build` were **not run** before delivery. The scroll-scrubbing algorithm was tested
> in a real browser against your real video; all source files pass TypeScript syntax checks and the shared
> modules pass a strict type-check. Run the steps below once and send any build error to be fixed.

## Run locally (VS Code)

1. Extract `HUMAN-ERROR-WEBSITE.zip`.
2. Open the extracted `HUMAN-ERROR` folder in VS Code.
3. Open the terminal (Terminal → New Terminal).
4. `npm install`
5. Copy `.env.example` to `.env.local` (only fill what you use; the site runs without any keys).
6. `npm run dev`
7. Open http://localhost:3000
8. Production check: `npm run build` then `npm start`.

## The cinematic intro (signature feature)

- Component: `components/cinematic/ScrollVideo.tsx` (reusable). Composition + logo/overlays: `IntroSequence.tsx`.
- Math (pure, testable): `lib/video/scrub.ts`.
- A 480vh section holds a `position: sticky` full-screen stage. Scroll progress 0→1 maps to `video.currentTime = progress × (duration − 0.04)`. The duration is read from the file, never hard-coded.
- Never autoplays or loops. rAF-driven, eased, skips redundant seeks, does not stack seeks, cleans up listeners.
- Fallbacks: reduced-motion or unsupported/failed video → static poster + a "Watch the sequence" button. A "Skip intro" button and a "Skip to content" link are included. No scroll trapping: after the section, the page scrolls normally.
- Change scroll length: `scrollLength={480}` in `IntroSequence.tsx` (higher = slower scrub).
- Portrait screens letterbox the video (`contain`) instead of heavily cropping it; landscape uses `cover` (`styles/globals.css`, `.scrub-video`).

### About your video file
The file you uploaded was **368 × 368 with black bars (real picture 368 × 208), 16 seconds, with audio**, not 1280×720 / 8 s.
`public/videos/human-error-intro.mp4` is **your footage**, with the black bars cropped, audio removed (the page is muted)
and every frame encoded as a keyframe for smooth scrubbing in both directions. Your untouched upload is kept at
`source-assets/human-error-original-upload.mp4`. At full-screen the 368-px picture is upscaled and looks soft.
**For a sharper result, export the same sequence at 1280×720 (or 1920×1080) and re-encode:**

```bash
ffmpeg -i your-hd-source.mp4 -an -c:v libx264 -preset slow -crf 20 -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart public/videos/human-error-intro.mp4
ffmpeg -i public/videos/human-error-intro.mp4 -frames:v 1 -q:v 3 public/videos/human-error-intro-poster.jpg
```
`-g 1` (all keyframes) is what makes seeking instant; the file will be larger but scrubs smoothly.
Keep the same file names and no code changes are needed.

## Editing content (no admin database yet)

All frequently edited content is in `data/`:

| File | Controls |
|---|---|
| `site-config.ts` | Email, WhatsApp number, social links, navigation, homepage headline/CTAs, budget ranges |
| `services.ts` | The 11 services (title, description, features, benefits) |
| `projects.ts` | Portfolio: add / edit / delete projects (cover, video, tech, live URL, case study, status) |
| `pricing.ts` | Packages, add-ons, AI credit plans. Prices are `null` ("Quote on request") until you set numbers |
| `content.ts` | About, process, FAQ, "why choose us" text |
| `ai-studio.ts` | AI Studio modes, limits, rate limit |

A protected, database-backed admin panel is **not** included (it would need a database and auth provider you choose).
The data files are typed, so the editor warns you about mistakes. Project images go in `public/images/projects/`.
**Add your real email and WhatsApp number in `data/site-config.ts`**, otherwise those links are hidden.

## Enquiry form

`/contact` → `app/api/enquiry/route.ts`. Validated in the browser and again on the server (same Zod schema),
honeypot field, per-IP rate limit, optional Cloudflare Turnstile. Delivery uses [Resend](https://resend.com):
set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`. **Without them the form shows an honest
"not sent" error; it never fakes success.** For Turnstile set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

## AI Studio (`/ai-studio`)

Frontend → `/api/ai/generate` (server, validated, rate-limited, duplicate-protected) → provider adapter → job id →
`/api/ai/status` polling → video preview/download. Keys stay server-side.

- Default `AI_PROVIDER=none`: **clearly labelled demo mode**. Nothing is generated and the UI says so.
- `AI_PROVIDER=replicate` with `REPLICATE_API_TOKEN` and `REPLICATE_VIDEO_MODEL=owner/name` enables live generation.
  Model input names differ, so check the model's API page and adjust `buildInput()` in `lib/ai-providers/replicate.ts`.
  Only modes the provider reports are enabled (image-to-video needs `REPLICATE_SUPPORTS_IMAGE=true` and a model that accepts `image`).
- Add another provider: implement `VideoProvider` (`lib/ai-providers/types.ts`), register it in `lib/ai-providers/index.ts`.
- Rate limiting is in-memory (best-effort on serverless). For strict limits swap `lib/utilities/rate-limit.ts` for Upstash Redis / Vercel KV.
- **Accounts, credits and payments are not active.** `/login` and `/dashboard` are honest placeholders and `types/index.ts` holds the prepared data shapes. To go further, add an auth provider + database (e.g. Auth.js or Supabase) and a payment provider; nothing simulates either.

## Brand assets

Symbol and wordmark: `components/brand/Logo.tsx` (edit paths there). SVG exports in `public/icons/`
(`logo-symbol.svg` for dark backgrounds, `logo-symbol-light-bg.svg`, `logo-wordmark.svg`). Favicon: `app/icon.svg`.
Open Graph image: `app/opengraph-image.tsx`. The portfolio demo covers in `public/images/projects/` are placeholder SVGs.

## Deploy: GitHub → Vercel

1. github.com → **New repository** (e.g. `human-error-website`, private is fine). Do not add a README.
2. In the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial HUMAN ERROR website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/human-error-website.git
   git push -u origin main
   ```
   (`.env.local` and `node_modules` are git-ignored.)
3. vercel.com → **Add New → Project** → import the repository. Framework: Next.js (auto-detected).
4. **Settings → Environment Variables:** add the values from `.env.example` you use. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
5. Click **Deploy**. Add your domain under Settings → Domains.
6. Future updates: edit, `git commit`, `git push`; Vercel redeploys automatically.

## Checklist before launch
- [ ] `npm install` and `npm run build` pass on your machine
- [ ] Real email / WhatsApp in `data/site-config.ts`
- [ ] Resend variables set and a test enquiry received
- [ ] HD version of the intro video swapped in (optional, recommended)
- [ ] Prices set (or left as "Quote on request")
- [ ] Demo projects replaced as real work appears (keep demos labelled)
