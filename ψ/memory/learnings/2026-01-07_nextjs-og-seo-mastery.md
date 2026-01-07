# Learning: Next.js Social Sharing & OG Image Mastery

**Date**: 2026-01-07
**Context**: Debugging production issues for `mmv-tarots` social share features.

## The Core Problem
Social scrapers (Facebook, Line, Twitter, Discord) are NOT web browsers. They do not execute JavaScript. If your metadata or images depend on `useEffect` or Client-Side Rendering, the "Link Preview" will be empty or broken.

## Technical Distillations

### 1. The Metadata Hierarchy
- **Server Components are Mandatory**: Always use a Server Component for your route if you need `generateMetadata`.
- **Absolute URLs**: Social scrapers cannot resolve relative paths like `/api/og`. You MUST set `metadataBase` in your `layout.tsx`.
  ```typescript
  // layout.tsx
  export const metadata = {
    metadataBase: new URL('https://your-domain.com'),
  };
  ```

### 2. Satori (OG Image) Engine Constraints
The engine that creates images from JSX (`next/og`) is powerful but limited compared to a browser:
- **CSS Support**: Avoid complex properties. `radial-gradient`, variable-opacity gradients, and `box-shadow` can cause `TypeError: u2 is not iterable`. Stick to solid colors and simple flexbox.
- **Font Loading**: Fonts must be passed as `ArrayBuffer`. Loading via remote URL in production is risky (HTML redirects, CORS). **Preferred**: Keep fonts as local `.ttf`/`.otf` files and use `fs.readFileSync`.
- **Image Formats**: Satori struggles with some WebP variants or SVGs with complex paths. If images don't show, try a static PNG/JPG or a base64 encoded string.

### 3. Smart ID Lookups (Safe Prisma Queries)
When a route supports both standard UUIDs and custom readable IDs (like `job-123`):
- **Validation First**: Use regex to verify the ID format BEFORE querying the database.
- **Prisma Error Prevention**: Querying a UUID field with a non-UUID string will throw a crash. Use a `where` clause that matches the input type.

### 4. SEO Refactoring Strategy
If a page has heavy client logic, split it:
- `page.tsx` (Server): Handles `generateMetadata`, fetches initial DB data, and passes it to the detail view.
- `detail-view.tsx` (Client): Handles all interaction, polling, and UI state.

## Summary Checklist for Next Project
- [ ] Set `metadataBase` in root layout.
- [ ] Use `generateMetadata` in server-side `page.tsx` for dynamic routes.
- [ ] Bundle Thai/Custom fonts as local binaries.
- [ ] Keep OG Image CSS extremely simple (Solid colors, Flexbox).
- [ ] Test with "Social Share Preview" extensions and official Debuggers (FB/Twitter).
