---
type: learning
project: mmv-tarots
topic: ui-analysis-and-recommendations
status: draft
---

# Analysis Report: mmv-tarots UI/UX & Accessibility

## 1. Executive Summary
The primary reason for the "invisible" or "weird" UI is a **Z-Index Stacking Context** issue. The `LiquidBackground` component is positioned with `fixed z-0`, while the main content container is non-positioned (default `static`). According to CSS stacking rules, positioned elements with `z-index >= 0` paint *on top* of non-positioned block elements. This causes the opaque background layer to obscure the page content.

Additionally, there are opportunities to improve performance (font loading, blur effects) and consistency (design tokens).

## 2. Detailed Findings

### 2.1. The "Invisible UI" Root Cause
- **File**: `app/layout.tsx` & `components/background/liquid-background.tsx`
- **Issue**: `LiquidBackground` has `fixed inset-0 z-0` and contains an opaque `bg-[#2a2a2e]` layer. The `<main>` tag in `layout.tsx` has no positioning.
- **Result**: The background renders *over* the content.
- **Fix**: Apply `relative z-10` to the `<main>` tag to create a higher stacking context for the content.

### 2.2. Design Tokens & Theming
- **Colors**: The `tailwind.config.ts` correctly defines `primary`, `accent`, and `glass` tokens matching the template.
- **Inconsistency**: `StatusBadge` uses hardcoded Tailwind colors (`yellow-500`, `blue-500`) instead of semantic tokens.
- **Recommendation**: Define `warning`, `info`, and `destructive` in `tailwind.config.ts` and use them in components.

### 2.3. Typography & Performance
- **Font Loading**: Currently using Google Fonts CDN in `app/layout.tsx` (`<link>`).
- **Issue**: This can cause Layout Shift (CLS) and Flash of Unstyled Text (FOUT).
- **Recommendation**: Use `next/font/google` for zero-layout-shift font loading.

### 2.4. Glassmorphism Performance
- **Observation**: `GlassCard` uses `backdrop-blur-xl`.
- **Impact**: High blur values can be performance-intensive on mobile devices.
- **Recommendation**: Consider downgrading to `backdrop-blur-md` or `lg` if frame drops occur, matching the original template's lighter touch.

### 2.5. Accessibility (A11y)
- **Good**: Icons have `aria-hidden="true"`.
- **Missing**:
    - Focus indicators are default. Custom glass buttons might need distinct `focus-visible` styles for keyboard navigation.
    - Contrast ratios for `glass` elements need verification against the dynamic background.

## 3. Action Plan (Simple yet Robust)

### Step 1: Fix Visibility (Critical)
Modify `app/layout.tsx` to ensure content sits above the background.

```tsx
// app/layout.tsx
<body ...>
  <LiquidBackground />
  <NavigationProvider>
    <MainNavigation />
    {/* Add relative and z-10 to main */}
    <main className="flex-1 pt-16 relative z-10">{children}</main>
  </NavigationProvider>
</body>
```

### Step 2: Modernize Font Loading
Replace CDN links with `next/font`.

```tsx
// app/layout.tsx
import { Montserrat, Merriweather, Ubuntu_Mono } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' })
const merriweather = Merriweather({ weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-serif' })
// ... apply variables to body
```

### Step 3: Standardize Tokens
Update `tailwind.config.ts` to include missing semantic colors and refactor `StatusBadge`.

---
**Oracle Note**: Implementing Step 1 will immediately resolve the "broken" feeling. Steps 2 and 3 ensure long-term robustness.
