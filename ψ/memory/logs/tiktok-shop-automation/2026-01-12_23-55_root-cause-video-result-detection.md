# Snapshot: Root Cause - Video Detection Failure (WAIT_RESULT State)

**Time**: 2026-01-12 23:55
**Context**: Automation stuck in a loop polling for generated images when in "Frames to Video" mode.

## Root Cause Analysis

### 1. Tag Name Divergence
- **Observation**: The system successfully clicks "Generate" and waits for the result.
- **Problem**: The code polls exclusively for `img` elements using `SELECTORS.generatedImage`.
- **Reality**: In "Frames to Video" mode, Google Labs Flow produces a `<video>` tag, not an `<img>` tag.
- **Log Evidence**: Logs show the system finding "Discord Logo" (an `img`) and rejecting it, but completely missing the `<video>` element.

### 2. URL Pattern Specificity
- **Selector**: `img[src*="storage.googleapis.com/ai-sandbox-videofx"]`.
- **Mismatch**: The result URL for videos contains `/video/` instead of `/image/`, and it's attached to a `video` tag. Even if the tag were changed to a generic selector, the validation logic is built for images.

### 3. Image-Specific Validation
- **Function**: `_isValidGeneratedImage(img)`.
- **Flaw**: It checks `naturalWidth` and `naturalHeight`. For a `video` element, these are `undefined`, leading the function to return `false` because the "size" is perceived as 0.

### 4. Background Script Expectation
- **Message**: The system sends `generatedImageUrl` to the background. 
- **Inconsistency**: In video mode, this should ideally be called `generatedVideoUrl` or handled generically, but the current code hardcodes `generatedImageUrl` which might confuse downstream logic.

## Proposed Plan

1.  **Expand Selectors**: Update `SELECTORS.generatedImage` to include `video` and `[role="presentation"] video` to catch the generated video result.
2.  **Unified Validation**: Refactor `_isValidGeneratedImage` to `_isValidResult`.
    - Detect if the element is an `IMG` or `VIDEO`.
    - For `VIDEO`: Validate based on Google Storage URL pattern or presence of a valid `src` (skipping natural size checks).
    - For `IMG`: Keep existing size filtering (100px+).
3.  **Adaptive Extraction**: Update `handleWaitResultState` to handle the transition correctly based on `currentMode` or detected tag type.
4.  **Data Consistency**: Ensure both `videoUrl` and `imageUrl` can be extracted and reported to the background.

## Tags
`video-gen` `dom-detection` `timing-issue` `wait-result-loop` `root-cause`
