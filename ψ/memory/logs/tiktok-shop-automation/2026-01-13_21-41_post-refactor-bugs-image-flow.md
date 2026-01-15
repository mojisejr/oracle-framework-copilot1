# Snapshot: Post-Refactor Bugs Analysis (Image Generation Flow)

**Time**: 2026-01-13 21:41
**Context**: Deep-dive analysis of bugs introduced during Phase 1-4 Service-Oriented Architecture refactoring, specifically for the Image Generation Pipeline.

## Critical Bugs Found

### 🔴 Bug #1: Function Name Mismatch (State Machine ↔ ImageService)
**Location**: `flow-state-machine.js` Line 125 vs `services/image-gen.js` Line 608

**Problem**:
- **State Machine calls**: `window.ImageService.handleImageStartState(data)` (with "State" suffix)
- **Service exports**: `handleImageStart` (without "State" suffix)

**Impact**: 
```
Uncaught ReferenceError: handleImageStartState is not defined
→ Extension crashes immediately on START state
→ Tab closes automatically
```

**Affected States**:
| State | State Machine Calls | Service Exports | Status |
| :--- | :--- | :--- | :--- |
| START | `handleImageStartState` | `handleImageStart` | ❌ Mismatch |
| FILL_IMAGES | `handleFillImages` | `handleFillImages` | ✅ Match |
| FILL_PROMPT | `handleFillPrompt` | `handleFillPrompt` | ✅ Match |
| GENERATE | `handleImageGenerate` | `handleImageGenerate` | ✅ Match |
| WAIT_RESULT | `handleImageWaitResult` | `handleImageWaitResult` | ✅ Match |

### 🔴 Bug #2: Dead Export in Main Script
**Location**: `flow-content-script.js` Lines 1777-1821

**Problem**:
- Exports reference functions that **no longer exist** after Phase 4 cleanup:
  - `handleStartState`
  - `handleFillImagesState`
  - `handleFillPromptState`
  - `handleGenerateState`
  - `handleWaitResultState`

**Impact**:
```
Uncaught ReferenceError: handleStartState is not defined (at flow-content-script.js:1783)
→ Script fails to load
→ All subsequent code unreachable
```

**Code Snippet (Lines 1777-1790)**:
```javascript
if (typeof window !== 'undefined') {
  // Store original handlers
  window._originalHandleStartState = window.handleStartState;
  window._originalHandleFillImagesState = window.handleFillImagesState;
  window._originalHandleFillPromptState = window.handleFillPromptState;
  window._originalHandleGenerateState = window.handleGenerateState;
  window._originalHandleWaitResultState = window.handleWaitResultState;

  // Replace with implementations ❌ THESE FUNCTIONS DON'T EXIST!
  window.handleStartState = handleStartState;
  window.handleFillImagesState = handleFillImagesState;
  window.handleFillPromptState = handleFillPromptState;
  window.handleGenerateState = handleGenerateState;
  window.handleWaitResultState = handleWaitResultState;
```

### 🟡 Bug #3: Inconsistent Function Naming Convention
**Location**: Cross-file inconsistency

**Pattern Analysis**:
- **ImageService**: Uses `handleImage<State>` (e.g., `handleImageStart`, `handleImageGenerate`)
- **VideoService**: Uses `handle<Type><State>State` (e.g., `handleVideoStartState`, `handleSwitchModeState`)
- **State Machine**: Calls with "State" suffix for START but not for others

**Risk**: Future refactoring will introduce similar bugs due to inconsistent patterns.

## Root Cause Analysis

### Phase 4 Cleanup Oversight
During Phase 4 integration, we:
1. ✅ **Moved** handler logic from `flow-content-script.js` to `services/image-gen.js`
2. ✅ **Removed** function implementations from main script
3. ❌ **Forgot** to delete the export block that references the old functions
4. ❌ **Forgot** to align function names between State Machine and Service

### Execution Order Issue
```
manifest.json loads in this order:
1. core/logger.js
2. core/utils.js
3. core/dom.js
4. features/google-flow/core/schema.js
5. features/google-flow/human-behavior.js
6. features/google-flow/services/image-gen.js ← Exports handleImageStart
7. features/google-flow/services/video-gen.js
8. features/google-flow/flow-state-machine.js ← Calls handleImageStartState ❌
9. features/google-flow/flow-content-script.js ← Tries to export handleStartState ❌ (CRASH)
```

Script crashes at step 9, so State Machine never gets to execute its buggy call.

## Correct Architecture (Expected)

### Image Generation Flow
```
User Action → State Machine → ImageService → DOM Manipulation
             ↓                ↓
          executeState()   handleImageStart()
                           handleFillImages()
                           handleFillPrompt()
                           handleImageGenerate()
                           handleImageWaitResult()
```

### Function Mapping (Should Be)
| State Machine Call | Service Function | File |
| :--- | :--- | :--- |
| `ImageService.handleImageStart()` | `handleImageStart()` | `services/image-gen.js` |
| `ImageService.handleFillImages()` | `handleFillImages()` | `services/image-gen.js` |
| `ImageService.handleFillPrompt()` | `handleFillPrompt()` | `services/image-gen.js` |
| `ImageService.handleImageGenerate()` | `handleImageGenerate()` | `services/image-gen.js` |
| `ImageService.handleImageWaitResult()` | `handleImageWaitResult()` | `services/image-gen.js` |

## Fix Plan

### Fix #1: Align Function Names in State Machine
**File**: `flow-state-machine.js` Line 125

**Change**:
```diff
- await window.ImageService.handleImageStartState(data);
+ await window.ImageService.handleImageStart(data);
```

### Fix #2: Remove Dead Export Block
**File**: `flow-content-script.js` Lines 1773-1821

**Action**: Delete entire export block that references non-existent handlers.

### Fix #3: Standardize Naming Convention (Future)
**Decision Needed**: Choose ONE pattern:
- Option A: `handleImageStart`, `handleVideoStart` (Current ImageService pattern)
- Option B: `handleImageStartState`, `handleVideoStartState` (Current VideoService pattern)

**Recommendation**: Option A (Remove "State" suffix) for consistency with ImageService.

## Testing Checklist
- [ ] Extension loads without console errors
- [ ] `window.ImageService` is defined with all 5 handlers
- [ ] `window.VideoService` is defined with all 3 handlers
- [ ] State Machine can call `ImageService.handleImageStart()`
- [ ] Image generation flow completes START → FILL_IMAGES → FILL_PROMPT → GENERATE → WAIT_RESULT

## Tags
`critical-bug` `post-refactor` `naming-mismatch` `dead-code` `image-generation`
