# Complete Recovery Plan: TikTok Shop Automation Refactoring Recovery

**Time**: 2026-01-13 22:41 GMT+7
**Status**: ACTIONABLE RECOVERY PLAN
**Analyst**: Oracle Keeper

---

## Executive Summary

### Current Situation
```
Feature 2.1: Pull Data             ✅ WORKING (unchanged, 2,617 lines)
Feature 2.2: Image Compose         ❌ BROKEN (refactored with bugs, 550 lines)
Feature 2.3: Video Generate        ❌ BROKEN (refactored with bugs, 450 lines)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Codebase: ~3,617 lines working (Feature 2.1) + broken (Features 2.2, 2.3)
```

### Root Cause
SOA Refactoring (Features 2.2 & 2.3) made 3 critical mistakes:
1. **Function Name Mismatch**: `handleImageStartState` called but `handleImageStart` exported
2. **Shared Logic Fragmentation**: FILL_IMAGES/FILL_PROMPT/GENERATE moved to separate services but both Image & Video need them
3. **Entry Point Deleted**: `handleStartState()` removed but State Machine expects it

### Recovery Goal
Restore Image Compose (2.2) and Video Generate (2.3) to working state while keeping:
- ✅ SOA structure (Services are good)
- ✅ Code organization improvements
- ✅ Feature 2.1 integration (Pull Data)

---

## Part 1: Detailed Problem Breakdown

### Problem 1: Function Name Mismatch

**Current State**:
```
State Machine (flow-state-machine.js:125):
  await window.ImageService.handleImageStartState(data);
  
Image Service Export (services/image-gen.js:608):
  handleImageStart  ← MISSING "State" suffix
  
Result: TypeError - handleImageStartState is undefined
```

**Impact**: START state cannot transition to Image/Video flow

**Fix Locations**:
- `flow-state-machine.js` line 125: Change `handleImageStartState` → `handleImageStart`
- `flow-state-machine.js` line 123: Change `handleVideoStartState` → `handleVideoStart`

### Problem 2: Shared Logic Fragmentation

**Legacy Pattern** (2,040 lines in one file):
```
handleStartState()
  └─ handleImageStartState() {
       if (mode === 'image') { ... }
       else if (mode === 'video') { ... }
       
       // Both call the SAME functions for middle states:
       handleFillImagesState()   ← SHARED
       handleFillPromptState()   ← SHARED
       handleGenerateState()     ← SHARED
       handleWaitResultState()   ← BRANCHED at end
     }
```

**New Pattern** (Broken):
```
ImageService:
  ├─ handleImageStart()
  ├─ handleFillImages()      ← Only in ImageService
  ├─ handleFillPrompt()      ← Only in ImageService
  ├─ handleImageGenerate()   ← Only in ImageService
  └─ handleImageWaitResult()

VideoService:
  ├─ handleVideoStart()
  ├─ (No FILL_IMAGES)        ← MISSING!
  ├─ (No FILL_PROMPT)        ← MISSING!
  ├─ (No GENERATE)           ← MISSING!
  └─ handleVideoWaitResult()
```

**Impact**: Video flow can't call FILL_IMAGES, FILL_PROMPT, GENERATE

**Fix Strategy**:
Option A: Create `core/shared-handlers.js` with:
```javascript
// core/shared-handlers.js
window.SharedHandlers = {
  handleFillImages,
  handleFillPrompt,
  handleGenerate
};
```

Option B: Keep these in `flow-content-script.js` as utilities

### Problem 3: Missing Entry Point

**Legacy**:
```
flow-state-machine.js calls:
  executeState(FLOW_STATES.START, data)
  
flow-content-script.js provides:
  function handleStartState(data) {
    if (mode === 'video') ...
    else ...  ← Routes to correct handler
  }
```

**Current (Broken)**:
```
flow-state-machine.js expects:
  window.handleStartState() ← Doesn't exist!
  
flow-content-script.js has:
  (deleted in Phase 4)
```

**Impact**: Script crashes on START state before anything happens

**Fix**: Restore `handleStartState()` as router function

---

## Part 2: Recovery Strategy (Two Options)

### Option A: "Surgical Service Extraction" (RECOMMENDED)

**Approach**: Keep SOA but restore shared logic

**Steps**:
1. ✅ **Restore Entry Point** (5 mins)
   - Add `handleStartState()` back to `flow-content-script.js`
   - Routes START to Image or Video service
   - Tracks current mode

2. ✅ **Create Shared Handlers** (15 mins)
   - Extract `handleFillImages()` from image-gen.js
   - Extract `handleFillPrompt()` from image-gen.js
   - Extract `handleGenerate()` from image-gen.js
   - Create `core/shared-handlers.js`
   - Export via `window.SharedHandlers`

3. ✅ **Update State Machine** (10 mins)
   - Fix function names: `handleImageStart`, `handleVideoStart`
   - Call `window.SharedHandlers.handleFillImages()`
   - Call `window.SharedHandlers.handleFillPrompt()`
   - Call `window.SharedHandlers.handleGenerate()`

4. ✅ **Update Manifest** (2 mins)
   - Load `core/shared-handlers.js` before Services
   - Order: Logger → Utils → DOM → Schema → **SharedHandlers** → Services → StateMachine → Main

5. ✅ **Test & Verify** (30 mins)
   - Load extension in Chrome
   - Check console: no errors
   - Test Image flow: PULL → IMAGE → GENERATE
   - Test Video flow: PULL → VIDEO → GENERATE

**Total Time**: ~1 hour
**Risk**: Low (Clear restoration path)
**Result**: Working SOA with shared logic separated

### Option B: "Keep It Together" (SIMPLER)

**Approach**: Move handlers back to main script temporarily

**Steps**:
1. Copy image-gen.js::FILL_IMAGES/PROMPT/GENERATE back to flow-content-script.js
2. Delete services/image-gen.js, services/video-gen.js
3. Create monolithic handler again (but cleaner than original)
4. Keep Utils in core/ (improvement over original)

**Pros**: Simple, no shared-handlers complexity
**Cons**: Loses SOA structure, defeats purpose of refactoring

**Time**: 30 mins
**Risk**: Very Low
**Result**: Back to working monolithic code

---

## Part 3: Step-by-Step Recovery (Option A)

### Phase 1: Restore Entry Point (5 mins)

**File**: `features/google-flow/flow-content-script.js`

**Action**: Add this function before the exports section (around line 1760):

```javascript
/**
 * Entry Point Router - Routes START state to Image or Video
 * This function decides which path to take based on currentMode
 * 
 * @param {Object} data - State data including mode
 */
async function handleStartState(data) {
  log('handleStartState called with mode:', 'FlowContentScript', 'info', { mode: data?.mode });
  
  // This will be called by State Machine for START state
  // It routes to appropriate service based on mode
  if (data?.mode === 'video') {
    // Video service handles video-specific START
    if (window.VideoService?.handleVideoStart) {
      return await window.VideoService.handleVideoStart(data);
    } else {
      throw new Error('VideoService.handleVideoStart not available');
    }
  } else {
    // Image service handles both image and default START
    if (window.ImageService?.handleImageStart) {
      return await window.ImageService.handleImageStart(data);
    } else {
      throw new Error('ImageService.handleImageStart not available');
    }
  }
}
```

**Why**: State Machine needs this routing function

### Phase 2: Create Shared Handlers (15 mins)

**File**: Create new `features/google-flow/core/shared-handlers.js`

```javascript
/**
 * Google Flow: Shared State Handlers
 * 
 * These handlers are used by BOTH Image and Video flows
 * because they represent common pipeline steps
 * 
 * Pipeline: START → FILL_IMAGES → FILL_PROMPT → GENERATE → WAIT_RESULT
 * 
 * @author Claude (Oracle Framework)
 * @date 2026-01-13 (Recovery Phase)
 */

// Import/use handlers extracted from image-gen.js
// These need to be copied from image-gen.js lines 300-520

async function handleFillImages(data) {
  // 👇 Copy from image-gen.js::handleFillImages() 
  // Find this function and copy it here
  log('handleFillImages executing', 'SharedHandlers', 'debug', { mode: data?.mode });
  
  // ... rest of function ...
}

async function handleFillPrompt(data) {
  // 👇 Copy from image-gen.js::handleFillPrompt()
  log('handleFillPrompt executing', 'SharedHandlers', 'debug');
  
  // ... rest of function ...
}

async function handleGenerate(data) {
  // 👇 Copy from image-gen.js::handleImageGenerate()
  log('handleGenerate executing', 'SharedHandlers', 'debug');
  
  // ... rest of function ...
}

// Export to global scope
if (typeof window !== 'undefined') {
  window.SharedHandlers = {
    handleFillImages,
    handleFillPrompt,
    handleGenerate
  };
  
  log('SharedHandlers loaded', 'SharedHandlers', 'info');
}
```

**Source**: Copy function bodies from `services/image-gen.js` lines ~300-520

### Phase 3: Update State Machine (10 mins)

**File**: `features/google-flow/flow-state-machine.js`

**Changes**:

```javascript
// Line 125: Change function names
case FLOW_STATES.START:
  if (currentMode === 'video') {
    await window.VideoService.handleVideoStart(data);      // ← was handleVideoStartState
  } else {
    await window.ImageService.handleImageStart(data);      // ← was handleImageStartState
  }
  break;

// Line 131: Use shared handlers
case FLOW_STATES.FILL_IMAGES:
  await window.SharedHandlers.handleFillImages(data);      // ← Changed!
  break;

case FLOW_STATES.FILL_PROMPT:
  await window.SharedHandlers.handleFillPrompt(data);      // ← Changed!
  break;

case FLOW_STATES.GENERATE:
  await window.SharedHandlers.handleGenerate(data);        // ← Changed!
  break;
```

### Phase 4: Update manifest.json (2 mins)

**File**: `manifest.json`

**Change script load order**:

```json
{
  "matches": ["https://labs.google/*"],
  "js": [
    "core/logger.js",
    "core/utils.js",
    "core/dom.js",
    "core/schema.js",
    "features/google-flow/core/shared-handlers.js",     // ← ADD THIS (new line)
    "features/google-flow/human-behavior.js",
    "features/google-flow/services/image-gen.js",
    "features/google-flow/services/video-gen.js",
    "features/google-flow/flow-state-machine.js",
    "features/google-flow/flow-content-script.js"
  ]
}
```

**Why**: SharedHandlers must load before Services try to call them

### Phase 5: Clean Up (5 mins)

**File**: `features/google-flow/flow-content-script.js`

**Action**: Remove dead exports (lines 1773-1821)

```javascript
// DELETE THIS ENTIRE BLOCK:
if (typeof window !== 'undefined') {
  window._originalHandleStartState = window.handleStartState;
  // ... all the dead stuff ...
}
```

**Replace with**:

```javascript
// Keep only utility exports:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    findElement,
    findElements,
    uploadImage,
    waitForElement,
    findAllAddButtons,
    // ... other utilities ...
  };
}

log('FlowContentScript utilities loaded', 'FlowContentScript', 'info');
```

### Phase 6: Syntax Check & Commit (5 mins)

```bash
# Validate syntax
node -c features/google-flow/core/shared-handlers.js
node -c features/google-flow/flow-state-machine.js
node -c features/google-flow/flow-content-script.js
node -c manifest.json  # Actually just JSON validation

# Stage changes
git add features/google-flow/ manifest.json

# Commit
git commit -m "recovery(phase-1): restore entry point and shared handlers

- Add handleStartState() as routing function
- Create core/shared-handlers.js for FILL_IMAGES/PROMPT/GENERATE
- Update state machine to use shared handlers
- Fix function names (handleImageStart, handleVideoStart)
- Update manifest load order
- Remove dead export block

Restores Image Compose (2.2) and Video Generate (2.3) functionality
Issue: #1"
```

---

## Part 4: Testing & Validation

### Test Sequence

**Stage 1: Extension Loads (5 mins)**
```
1. Reload extension in Chrome
2. Open DevTools Console (F12)
3. Check for errors:
   ✅ No "handleStartState is not defined"
   ✅ No "SharedHandlers is not defined"
   ✅ See logs: "FlowSchema loaded", "SharedHandlers loaded", "ImageService loaded"
```

**Stage 2: Feature 2.1 Still Works (5 mins)**
```
1. Open TikTok Studio (any product page)
2. Click "Pull Data" in extension UI
3. Check that products are scraped and caption generated
✅ Feature 2.1 unchanged, should work
```

**Stage 3: Image Compose Flow (10 mins)**
```
1. Go to https://labs.google/fx/tools/flow
2. Open browser console
3. Manually trigger (via console):
   window.FlowStateMachine.startFlow({ products: [...], mode: 'image' })
4. Check state transitions:
   START → FILL_IMAGES → FILL_PROMPT → GENERATE → WAIT_RESULT
✅ Each state should execute without errors
```

**Stage 4: Video Generate Flow (10 mins)**
```
Same as Stage 3, but with mode: 'video'
1. window.FlowStateMachine.startFlow({ products: [...], mode: 'video' })
2. Check state transitions:
   START → FILL_IMAGES → FILL_PROMPT → GENERATE → WAIT_RESULT
✅ Video-specific handlers should work
```

### Success Criteria
- ✅ No console errors during load
- ✅ No runtime errors during flow execution
- ✅ Each state handler executes
- ✅ Image and Video flows complete without errors

---

## Part 5: Rollback Plan (If Recovery Fails)

**If Recovery Phase 1 doesn't work**:

```bash
# Option A: Revert to before fixes
git reset --hard HEAD~1        # Go back to before recovery attempt
git reset --hard a3f81ce      # Or go back to function name fix
git reset --hard 1c3b01d      # Or go back to Phase 4 (safest point)

# Option B: Switch to Option B (Monolithic)
# Delete: services/image-gen.js, services/video-gen.js
# Copy handlers back to flow-content-script.js from legacy
```

---

## Part 6: Why This Recovery Works

### Architecture Alignment

**Legacy** (Monolithic):
```
flow-content-script.js
  ├─ handleStartState() ← Routes
  └─ All handlers (FILL_IMAGES, FILL_PROMPT, etc.) ← Shared by Image & Video
```

**Recovery** (SOA with Shared):
```
handleStartState() ← Routes to Image or Video
  ↓
ImageService.handleImageStart() or VideoService.handleVideoStart()
  ↓
window.SharedHandlers {
  handleFillImages()   ← Both use these
  handleFillPrompt()   ← Both use these
  handleGenerate()     ← Both use these
}
  ↓
ServiceWaitResult() ← Branched by service type
```

**This matches Legacy logic while keeping SOA structure!**

---

## Summary Table

| Task | Time | File | Action |
| :--- | :--- | :--- | :--- |
| Phase 1 | 5m | flow-content-script.js | Add handleStartState() router |
| Phase 2 | 15m | core/shared-handlers.js | Copy & create shared functions |
| Phase 3 | 10m | flow-state-machine.js | Fix function calls |
| Phase 4 | 2m | manifest.json | Update load order |
| Phase 5 | 5m | flow-content-script.js | Remove dead exports |
| Phase 6 | 5m | git commit | Syntax check & commit |
| **Test** | **30m** | **Chrome DevTools** | **Validate flows** |
| **Total** | **~70m** | — | — |

---

## Oracle's Confidence Assessment

| Factor | Confidence | Reason |
| :--- | :--- | :--- |
| **Will it work?** | 95% | Clear understanding of original architecture |
| **Is it sustainable?** | 85% | SOA structure is better, but needs testing |
| **Recovery risk?** | Low | Rollback to 1c3b01d if needed (Phase 4) |
| **Time estimate** | High | ~70 minutes realistic, includes testing |

---

## Next Steps

1. **Approve this plan** - Confirm Option A approach
2. **Ready to execute** - When you say "proceed", I'll execute Phase 1-6
3. **Monitor testing** - Real-time feedback from Chrome console
4. **Iterate if needed** - If test fails, pivot to Option B or rollback

**Ready to proceed with Recovery Phase 1-6? (Yes/No + any modifications?)**
