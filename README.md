# anaellemathe.dev — Personal Portfolio

Personal portfolio of Anaëlle Mathé, software engineer. Built with a cyberpunk girly aesthetic: deep black background, neon pink & cyan accents, smooth animations.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger, Framer Motion
- **Smooth scroll**: Lenis
- **i18n**: next-intl (FR / EN, browser detection)
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (mono)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-detects your browser language and redirects to `/fr` or `/en`.

## Project structure

```
src/
├── app/
│   ├── [locale]/         # Localized routes (FR / EN)
│   │   ├── layout.tsx    # Locale layout (Lenis, cursor, intl provider)
│   │   └── page.tsx      # One-pager with all sections
│   ├── globals.css       # CSS variables, global styles
│   └── layout.tsx        # Root layout (fonts, SEO metadata)
├── components/
│   ├── sections/         # Hero, About, Projects, Stack, Contact
│   ├── ui/               # Navigation, CustomCursor, Marquee, ProjectCard…
│   └── animations/       # SplitText (GSAP), ScrambleText
├── i18n/                 # next-intl config & routing
└── lib/
    └── projects.ts       # Project data
messages/
├── en.json
└── fr.json
```

## Customisation

| What | Where |
|------|-------|
| Your projects | `src/lib/projects.ts` + `messages/en.json` / `fr.json` |
| Your bio / stats | `messages/en.json` → `about.*` |
| Social links | `src/components/sections/Contact.tsx` — `EMAIL`, `GITHUB`, `LINKEDIN` |
| Color palette | `src/app/globals.css` → `:root` |
| Stack marquee items | `src/components/sections/Stack.tsx` → `STACK_ITEMS` |
| Your photo | Replace the `AM` placeholder in `About.tsx` with `<Image>` |

## Deployment on Vercel

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. No env vars needed — click Deploy

To add a custom domain (e.g. `anaellemathe.dev`):
- Buy on Porkbun or Cloudflare (~$12/yr)
- Add in Vercel → Project → Settings → Domains
- Follow the DNS instructions

## Development

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```
