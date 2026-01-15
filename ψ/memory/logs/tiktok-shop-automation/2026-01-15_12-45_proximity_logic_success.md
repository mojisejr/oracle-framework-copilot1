# Snapshot: Proximity Logic Implementation (v4.4)

**Time**: 2026-01-15 12:45
**Context**: Replaced fragile DOM matching with robust Proximity Logic based on data from DOM Probe.

## The Change (Identity -> Spatial)
We moved from "Who are you?" (Identity) to "Where are you?" (Spatial).

### 1. New Utility: `findElementNear(targets, anchor, options)`
- **Anchor**: `textarea#PINHOLE_TEXT_AREA_ELEMENT_ID` (The unwavering center of the creation UI).
- **Candidates**: Any element matching the target selector.
- **Scoring**: `Math.abs(Candidate.y - Anchor.y)`. Lowest score wins.
- **Safety**: Explicitly ignores elements in the top 50px (Header Zone).

### 2. Refactored Services
- **`configureVideoSettings`**: Now finds the Tune button closest to the prompt URL. Fixes the "Edit Project" collision.
- **`uploadStartFrame`**: Now finds the Add button closest to the prompt text. Fixes the "Start vs End" frame confusion (using DOM order as tie-breaker).
- **`switchMode`**: (Future) Can also be upgraded to proximity if needed, but current specific selector works.

## Validation
This logic mimics human perception. A human looks for the "Settings" button *for this prompt*, not the settings for the whole website (header).

## Files Modified
- `features/google-flow/flow-content-script.js` (Added logic)
- `features/google-flow/services/video-gen.js` (Implemented logic)

## Tags
`v4.4` `proximity-logic` `spatial-automation` `robustness`