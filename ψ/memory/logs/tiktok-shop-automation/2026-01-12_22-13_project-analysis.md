# Snapshot: Project Analysis - GitHub Copilot TikTok Shop Automation

**Time**: 2026-01-12 22:13
**Context**: Initial analysis of the recovered and reverse-engineered `tiktok-shop-automation` project.
**Mode**: Oracle Keeper (Analysis Phase)

## 🔍 System Overview
**Type**: Chrome Extension (Manifest V3)
**Core Mission**: Automate the "TikTok Shop -> Google Flow -> Content Generation -> Post" loop.
**Key Constraints**: MV3 Service Worker lifecycle (must handle suspension via Alarms/Storage).

## 📂 Folder Structure & Responsibilities

| Path | Responsibility | Key Files |
| :--- | :--- | :--- |
| `background.js` | **The Conductor**. Orchestrates the entire workflow, manages queues, and keeps the service worker alive (`flow_heartbeat`). | `background.js` |
| `features/feature-c-google-flow/` | **The Hand (Google)**. Automates Google Labs UI. Uses a robust **State Machine** pattern. | `flow-state-machine.js`, `flow-content-script.js`, `human-behavior.js` |
| `content/` | **The Hand (TikTok)**. Scrapes product data from TikTok Seller Center. | `tiktok-content-script.js` |
| `ui/sidepanel/` | **The Control Center**. User interface for managing data and triggering automation. Modular functional components. | `index.js`, `flow-tab.js`, `product-list.js` |
| `core/` | **Shared Utilities**. Logging, DOM manipulation, Storage wrappers. | `logger.js`, `storage.js` |

## 🧬 Coding Style & Patterns

1.  **Functional Composition**: virtually no Classes. Uses Factory Functions (e.g., `createFlowTab`, `createLogger`) for dependency injection and encapsulation.
2.  **State Machine (FSM)**: `flow-state-machine.js` strictly defines states (`IDLE` -> `START` -> `GENERATE`...) and validates transitions. This is excellent for preventing "stuck" automation.
3.  **MV3 Survival**:
    *   **Keep-Alive**: Uses `chrome.alarms` to wake up the service worker.
    *   **State Persistence**: All state (`flowAutomationState`) is saved to `chrome.storage.local` immediately after change. Memory is treated as ephemeral.
4.  **Logging**: Structured logging with context tagging (`[FlowController]`, `[ContentScript]`).

## 👤 User Journey (The Flow)

1.  **Ingest**: User opens TikTok Shop Product List -> Extension scrapes products (Name, ID, Image).
2.  **Enrich**: User uploads a "Character" (Avatar/Brand Image) in Side Panel -> applied to all products.
3.  **Generate (Flow)**:
    *   User selects products and clicks "Start Flow".
    *   Background worker picks product #1.
    *   Opens Google Labs.
    *   Content Script (FSM) drives UI: Upload Character -> Enter Prompt -> Generate.
    *   Result (Image/Video URL) returned to Background.
4.  **Post (Future)**: (Implied) Use generated assets to create TikTok listing.

## 🔗 Feature Relations

-   `FlowTab` depends on `ProductList` (needs products to exist).
-   `Background` depends on `ContentScript` messaging for "job done" signals.
-   `Video Generation` (Feature D/Phase 3) shares the same pipeline as Image Gen but branches in the FSM (`SWITCH_MODE`).

## ⚠️ Integrity Check (Oracle Philosophy)

-   **[x] Nothing is deleted**: Logs are appended.
-   **[x] Patterns over intentions**: Code reflects a "Robust/Resilient" approach (retries, validations), matching the `universal-oracle-coding-standard.md`.
-   **[ ] Gap**: The "Posting" part seems to be the next logical step or is currently manual.

## Next Actions
-   Verify if `feature-b-gen-compose` is fully integrated or legacy.
-   Test the "Video Generation" path (Feature C Phase 3).
-   Check alignment with `project/triple-bot-reverse` (is there anything missing?).

## Tags
`#analysis` `#tiktok-shop` `#mv3` `#automation` `#fsm`
