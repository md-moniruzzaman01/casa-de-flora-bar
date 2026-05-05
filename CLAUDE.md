# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (Next.js)
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
```

## Architecture

**Next.js App Router** with two route groups:
- `app/(public)/` — public-facing pages: `/` (home), `/menu`, `/bouquet`, `/calebrate`, `/about`. Wrapped by `app/(public)/layout.tsx`, which injects `<Navbar>`, `<Footer>`, and the `<SmoothScroll>` provider.
- `app/(admin)/dashboard/` — admin dashboard. Separate layout with its own sidebar.

**Component organisation** mirrors the route structure:
```
components/
  Home/          partials + config (types, constants)
  Menu/          partials + config
  Bouquet/       partials + config
  Celebrate with us/  partials + config
  shared/
    Navbar/      partials + config
    Footer/      partials + config
    Dashboard Sidebar/
    SmoothScroll.tsx   (Lenis + GSAP ticker setup)
    WaveDivider.tsx
```

Each feature folder separates UI (`partials/`) from data (`config/constants.ts`, `config/types.ts`). All copy and static data lives in `constants.ts`; components import from there rather than inlining strings.

## Key Libraries & Patterns

- **Smooth scrolling** — Lenis (`@studio-freight/lenis`) is initialised once in `SmoothScroll.tsx` and wired to GSAP's ticker so `ScrollTrigger` stays in sync. Every `"use client"` component that uses `ScrollTrigger` must register it with `gsap.registerPlugin(ScrollTrigger)` and clean up via `ctx.revert()` / `ScrollTrigger.getAll().forEach(t => t.kill())` in the `useEffect` cleanup.
- **Animations** — GSAP (`gsap` + `@gsap/react`) is the animation library. Wrap GSAP calls in `gsap.context()` so cleanup is scoped to the component's DOM subtree.
- **Forms** — `react-hook-form` for all form components.
- **Icons** — `lucide-react`.

## Design System

Defined in `app/globals.css` using Tailwind v4's `@theme inline` block — no `tailwind.config` file exists. Custom tokens:

| Token | Value |
|---|---|
| `--color-primary` | `#ED80A8` (pink) |
| `--color-primary-50/100/200/300` | soft pink shades |
| `--color-gray` | `#2c2420` |
| `--font-sans` | Tenor Sans |
| `--font-serif` | Playfair Display |
| `--font-display` | EB Garamond |

Utility classes defined in `globals.css` (not via Tailwind plugins): `.gold-shimmer`, `.corner-frame`, `.hover-zoom`, `.gold-bar-hover`, `.img-cinematic`, `.res-section / .res-canvas / .res-content` (reservation section layout).

## Fonts

Three Google Fonts loaded in `app/layout.tsx` as CSS variables: `--font-playfair`, `--font-tenor`, `--font-garamond`. Use `font-serif`, `font-sans`, or `font-display` Tailwind utilities to apply them.
