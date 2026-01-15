# ADDENDUM: Feature 2.1 (Pull Data) Deep Analysis

**Added**: 2026-01-13 22:15 GMT+7
**Context**: Missing analysis on Pull Data flow (Product → Character → Caption generation)

---

## Legacy Implementation: Feature 2.1 (Pull Data)

### Architecture Overview

**Pattern**: Factory Functions (Functional Style)
**Scope**: Multi-file, Cross-Extension Communication
**Key Challenge**: TikTok DOM is dynamic + OpenAI API calls

### Files & Responsibilities

```
STRUCTURE:
content/tiktok-content-script.js (726 lines)
  ├─ Role: TikTok side scraper (injected into product modal)
  ├─ Detects: Product modal open
  ├─ Extracts: Product table rows
  └─ Sends: Data to background.js

features/feature-b-gen-compose/ (~700 lines total)
  ├─ content-generator.js - System prompts + response formatting
  ├─ openai-client.js - API wrapper with retry logic
  ├─ prompt-builder.js - Prompt templates
  └─ (All use factory function pattern)

background.js (1,177 lines)
  ├─ Role: Orchestrator for all features
  ├─ Responsibility: Manage state, coordinate APIs
  ├─ Storage: localStorage for products, results
  └─ Integration: Connects all pieces
```

### Data Flow (Detailed)

```
STEP 1: User opens product modal in TikTok
  ├─ content/tiktok-content-script.js detects modal
  ├─ Selector: '[role="dialog"][title*="Add product links"]'
  └─ Status: Waits for modal to fully render

STEP 2: User clicks "Pull Data" button (in UI)
  ├─ UI sends chrome message to background.js
  ├─ Message type: 'PULL_PRODUCTS'
  └─ Payload: { action: 'PULL_PRODUCTS', tabName: 'my-shop' }

STEP 3: content/tiktok-content-script.js scrapes
  ├─ Function: _scrapeTab(tabName)
  ├─ Action 1: Click "My Shop" or "Showcase" tab
  ├─ Action 2: Get all product rows (querySelectorAll)
  ├─ Action 3: Parse each row via _parseProductRow()
  ├─ Extract:
  │  ├─ productId (from data-id or unique identifier)
  │  ├─ productName (from .product-name)
  │  ├─ productImage (from img.product-image)
  │  ├─ price (from .product-price)
  │  ├─ category (from .product-category)
  │  └─ status (from .product-status)
  └─ Return: Array of product objects

STEP 4: Pagination loop (if multiple pages)
  ├─ Function: _scanTotalPages() - Get max page count
  ├─ Loop: for each page:
  │  ├─ _scrapeTab() - Extract products
  │  ├─ Detect duplicates (seenProductIds Set)
  │  └─ _goToNextPage() - Click next button
  └─ Continue until: no more products or max pages reached

STEP 5: Send scraped data to background.js
  ├─ chrome.runtime.sendMessage({
  │    action: 'PULL_PRODUCTS',
  │    products: [ {...}, {...}, ... ]
  │  })
  └─ Wait for response

STEP 6: background.js receives products
  ├─ Function: handlePullProducts(products)
  ├─ For each product in products array:
  │  ├─ Create OpenAI client: createOpenAIClient(config)
  │  ├─ Generate caption:
  │  │  ├─ System prompt: CONTENT_SYSTEM_PROMPT (content-generator.js)
  │  │  ├─ User message: Product details
  │  │  ├─ Call: openai-client.js::chatCompletion()
  │  │  └─ Parse: JSON response (H1, H2, Caption, Speech, CTA)
  │  ├─ Save to localStorage:
  │  │  └─ Key: `product_${productId}_content`
  │  │  └─ Value: { h1, h2, caption, speech, cta, timestamp }
  │  └─ Track: completed, errors
  └─ Return results to UI

STEP 7: UI displays results
  ├─ Shows: Generated content for each product
  ├─ User can: Edit/approve
  └─ Ready for: Next phase (image compose)
```

### Key Implementation Details

#### 1. Product Scraping (content/tiktok-content-script.js)

```javascript
// Factory function pattern
function createTikTokContentScript(dependencies = {}) {
  const dom = createDOMUtils(dependencies);
  const log = createLogger('TikTok');

  // Private scraping function
  async function _scrapeTab(tabName) {
    // 1. Click correct tab (My Shop vs Showcase)
    const tabSelector = tabName === 'my-shop' 
      ? SELECTORS.TAB_MY_SHOP 
      : SELECTORS.TAB_SHOWCASE;
    
    // 2. Get all product rows
    const rows = document.querySelectorAll(SELECTORS.ROW);
    
    // 3. Parse each row
    const products = [];
    rows.forEach(row => {
      const product = _parseProductRow(row);
      if (product && !seenProductIds.has(product.id)) {
        products.push(product);
        seenProductIds.add(product.id);
      }
    });
    
    return products;
  }

  // Private parsing function
  function _parseProductRow(row) {
    return {
      id: row.getAttribute('data-id'),
      name: row.querySelector(SELECTORS.PRODUCT_NAME)?.textContent,
      image: row.querySelector(SELECTORS.PRODUCT_IMAGE)?.src,
      price: row.querySelector('.price')?.textContent,
      status: row.querySelector(SELECTORS.PRODUCT_STATUS)?.textContent
    };
  }

  return { init, startWatching };
}
```

**Key Pattern**: Functional composition - dependencies passed in, private functions encapsulated

#### 2. OpenAI API Integration (openai-client.js)

```javascript
function createOpenAIClient(config = {}) {
  const { apiKey, model = 'gpt-4o-mini' } = config;

  // Retry logic with exponential backoff
  async function callWithRetry(systemPrompt, userMessage, options = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await _chatCompletion(systemPrompt, userMessage, options);
      } catch (error) {
        lastError = error;
        
        // Exponential backoff: 1s, 2s, 4s, 8s
        const delay = Math.pow(2, attempt - 1) * 1000;
        await _delay(delay);
      }
    }
    
    throw lastError;
  }

  return { callWithRetry, chatCompletion };
}
```

**Key Pattern**: Retry with exponential backoff for rate limiting

#### 3. Content Generation (content-generator.js)

```javascript
const CONTENT_SYSTEM_PROMPT = `คุณเป็นผู้เชี่ยวชาญด้านการสร้างเนื้อหา TikTok Shop...
Generate 5 components:
1. H1 - Short headline (3-8 chars)
2. H2 - Product name + feature (10-20 chars)
3. Caption - TikTok caption with emoji & hashtags
4. Speech - Spoken script (~20-30 words, 8 seconds)
5. CTA - Call to action

Respond as JSON: { h1, h2, caption, speech, cta }`;
```

**Key Pattern**: Structured prompting with clear JSON response format

#### 4. State Orchestration (background.js)

```javascript
let flowAutomationState = {
  isRunning: false,
  queue: [],           // Products to process
  current: null,       // Currently processing
  completed: [],       // Finished products
  errors: []          // Failed products
};

async function handlePullProducts(message) {
  const { products } = message;
  
  flowAutomationState.queue = products;
  flowAutomationState.isRunning = true;
  
  while (flowAutomationState.queue.length > 0) {
    const product = flowAutomationState.queue.shift();
    flowAutomationState.current = product;
    
    try {
      // Generate content via OpenAI
      const content = await generateProductContent(product);
      
      // Save to localStorage
      localStorage.setItem(
        `product_${product.id}_content`,
        JSON.stringify(content)
      );
      
      flowAutomationState.completed.push(product);
    } catch (error) {
      flowAutomationState.errors.push({ product, error });
    }
  }
  
  flowAutomationState.isRunning = false;
}
```

**Key Pattern**: Queue-based processing with state tracking

### What's Smart About This

✅ **Factory Functions**: Each component is testable, composable, injectable
✅ **Retry Logic**: OpenAI rate limiting handled gracefully
✅ **Error Handling**: Graceful degradation, logged errors
✅ **Storage**: localStorage for persistence across sessions
✅ **Message Passing**: Clean separation between TikTok content script & background
✅ **Functional Style**: No classes, pure functions, composition

### What's Missing from New Project

Looking at new project structure, Feature 2.1 (Pull Data) appears to be:
- ⚠️ **Not refactored** - Still in original form? OR
- ⚠️ **Not in current codebase** - Removed or in different location?
- ⚠️ **Not integrated** - Disconnected from Flow automation?

This is a **CRITICAL MISSING PIECE** that needs investigation!

---

## Summary: 3-Feature Analysis Complete

| Feature | Legacy Size | New Status | Issue |
| :--- | :--- | :--- | :--- |
| **2.1: Pull Data** | 2,617 lines (5 files) | ❓ Unknown | **MISSING ANALYSIS** |
| **2.2: Image Compose** | 550 lines (1 file) | Extracted to Service | ✅ Structure OK, naming broken |
| **2.3: Video Generate** | 450 lines (1 file) | Extracted to Service | ✅ Structure OK, naming broken |

**Priority**: Verify Feature 2.1 status immediately before recovery!
