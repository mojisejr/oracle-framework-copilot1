# Snapshot: Special Registration Link Implementation Report
**Date**: 2026-01-06 22:35 GMT+7
**Project**: jaothui-event
**Status**: Completed
**Branch**: `feat/jaothui-special-registration`

## 🚀 Delivered Features

### 1. Targeted Re-registration (History Card)
- **Functionality**: Users who have been **rejected** from a specific Royal Event can now see a "สมัครใหม่อีกครั้ง" (Register Again) button directly on their registration history card.
- **Logic**:
    - Checks `event.eventType === "royal"`
    - Checks `approvementResult === false`
    - Checks `event._id === "44da822e-7ec6-4e82-b530-a2ef06759f24"` (Target Event)
- **Visuals**: Added a red status badge ("ไม่ผ่านการอนุมัติ") and an error button.

### 2. Disposable Registration Route
- **Path**: `src/pages/public/special-register/[eventId].tsx`
- **Security**:
    - **Bypass**: Ignores `registrationActive` (which is false for expired events).
    - **Enforce**: Strictly checks `registrationDeadline` against the current time.
    - **Guard**: Only allows access for the specific target Event ID.
- **Cleanup**: Marked with `[SPECIAL-HACK-JAN2026]` for easy removal.

### 3. Data Service Enhancements
- **Service**: `register-event.service.ts`
- **Update**: `getAllRegisteredBy` now joins `approvment` table to fetch `approvementResult` and `comment`.
- **Interface**: Updated `EventRegister` to include approval status fields.

## 🛠️ Technical Verification
- **Build**: Passed (`npx tsc --noEmit` & `npm run lint`).
- **Code Quality**: Followed "Nothing is Deleted" and "Safety First" principles.
- **Integration**: Re-used `RoyalForm` component ensuring consistent data validation and submission.

## 📝 Next Steps (For Admin)
1.  **Deploy**: Merge PR and deploy to production.
2.  **Notify**: Inform users to check their History page.
3.  **Cleanup**: After the event concludes, delete the `src/pages/public/special-register` folder and revert `HistoryCard` changes (search for tag).
