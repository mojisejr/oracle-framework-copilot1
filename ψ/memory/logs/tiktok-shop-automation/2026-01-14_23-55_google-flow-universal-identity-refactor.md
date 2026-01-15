# Snapshot: Google Flow Settings Refactor (Universal Identity)

**Time**: 2026-01-14 23:55
**Context**: Fixing the fragile settings selection in Google Flow (Video FX) automation. Previous attempts (Proximity, Strict Scoping) failed due to DOM variability and "Status Buttons" interference.

## Challenge
The "Tune" button (Settings) in Video Mode is surrounded by "Status Buttons" (like "Veo 3.1", "Imagen 3") which ALSO open dialogs.
- **Proximity Logic**: Often picked the status button instead of the tune button because they are siblings.
- **Strict Scoping**: Still found the wrong button because they share the same container.
- **Result**: The script clicked "Veo 3.1" (Status) which opened a menu, but the script expected the "Settings" menu logic, leading to failure or "click outside" closing the menu.

## Solution: Universal Identity Logic (v4.3)
Instead of relying on *where* the button is (fragile), we rely on *what* the button is (robust).

**Key Selectors:**
1.  **Identity**: Must satisfy `aria-haspopup="dialog"`.
2.  **Semantic Match**: Must contain the text "tune" (icon ligature) OR "settings" (hidden a11y label).
3.  **Exclusion**: Must NOT contain "veo", "imagen", or "aspect" (to filter out neighboring status buttons).

```javascript
const candidates = document.querySelectorAll('button[aria-haspopup="dialog"]');
for (const btn of candidates) {
    const text = btn.textContent.toLowerCase();
    const isTune = text.includes('tune') || text.includes('settings');
    const isModel = text.includes('veo') || text.includes('imagen');
    
    if (isTune && !isModel) {
        return btn; // Found!
    }
}
```

## Why this works (Triple Bot Inspiration)
We analyzed `triple-bot-reverse` and found it uses similar XPath strategies: finding elements based on specific text ('tune', 'Settings') rather than just CSS structure. This proves that text-based identity is the most robust way to handle this specific obfuscated/dynamic UI.

## Next Steps
- Verify that this logic correctly identifies the Tune button in both Image and Video modes.
- Verify that it ignores the "Veo 3.1" status button.
