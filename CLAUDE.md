# CLAUDE.md

## Overview
fight-app is a React 19 + Vite single-page app for browsing boxing, UFC and influencer fight events, plus a round timer for training. There's no backend: all data is static.

## Commands
- `npm run dev`: start the Vite dev server
- `npm run build`: production build
- `npm run lint`: ESLint
- No test setup exists.

## Stack
- React 19 with the React Compiler (configured via babel in `vite.config.js`)
- react-router-dom v7 (`BrowserRouter`)
- Tailwind CSS v3 (via PostCSS). Styling is inline Tailwind classes with a dark theme (`bg-gray-900`/`gray-800`, red-600 accents).
- Plain JavaScript (JSX), no TypeScript

## Structure
- `src/App.jsx`: navbar and routes: `/` → `Fights`, `/events/:id` → `EventDetail`, `/training` → `Training`
- `src/data/events.js`: the `events` array, the app's only data source. The schema is documented at the top of the file. `bouts[0]` is the main event, and `confirmed: false` shows an "Unconfirmed" badge.
- `src/data/categories.js`: the sport categories (boxing, ufc, mma, influencer, raf, other) and their badge colours. To add a category, add it here.
- `src/utils/dates.js`: always parse `YYYY-MM-DD` with `parseDate` (local time), never `new Date(str)`.
- `src/pages/Fights.jsx`: main page with Upcoming/Previous tabs, search, category chips and an organisation dropdown. Filters are kept in the URL query string.
- `src/components/EventCard.jsx`: card in the list that links to the detail page.
- `src/pages/EventDetail.jsx`: event info and the full fight card with results.
- `src/pages/Training.jsx`: unstyled 3/5-minute round countdown timer.

## Unused / leftover files
- `src/pages/Home.jsx` and `src/pages/Discover.jsx` are empty.
- `src/App.css` is leftover Vite template CSS and isn't imported. The README is the Vite template.
