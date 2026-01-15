# Snapshot: Strategy Shift - The DOM Probe Protocol

**Time**: 2026-01-15 12:03
**Context**: Stuck in a "Guessing Game" loop with Google Flow's UI selectors. The AI (Oracle) cannot see the screen, and the DOM is heavily dynamic (React/Styled-components/Shadow DOM). Blind fixes were failing repeatedly.

## Insight
We cannot solve dynamic UI automation problems by "imagining" the DOM. We need **Ground Truth**.
Instead of writing code to *interact* (click/type) immediately, we first write code to *observe* (probe/dump).

## The Probe Method
We created `projects/tiktok-shop-automation/tools/dom-probe.js`.
**Concept**: A lightweight, standalone script that the user runs in the browser console.
**Output**: A JSON dump of the *actual* rendered state, including:
- Real-time coordinates (`rect`) for Proximity logic.
- True `aria-labels` and `roles` (often hidden from static analysis).
- React proprieties (`__reactProps`) if accessible.
- Visual hierarchy (Parent/Child relationships).

## Why This Matters
1.  **Stops Assumptions**: We stop guessing if a button is named "Tune" or "Settings". The JSON tells us exactly what it is.
2.  **Bridges the Air Gap**: It allows the AI to "see" the DOM structure without needing visual access.
3.  **Proximity Data**: Provides the `x,y` coordinates needed to implement the robust "Distance-based Selection" logic (v4.4).

## Apply When
- Automation selectors fail more than twice.
- Working with complex, obfuscated, or highly dynamic Web Apps (like Google Flow, TikTok Studio).
- Debugging "Element not found" errors where the element seems visible to the human eye.

## Tags
`strategy` `debugging` `dom-probe` `reverse-engineering` `context-gathering`