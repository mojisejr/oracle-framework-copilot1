# Snapshot: Mission Blueprint - Robust Anti-Fraud Referral System

**Time**: 2026-01-11 23:40
**Context**: Planning the refactor of mmv-tarots referral system to prevent fraud (Star-Farming) based on Red Team audit.

## Insight

เราจะเปลี่ยนระบบ Referral จากการ "จ่ายทันที" (Hardcoded & Risky) เป็นระบบที่ "ตรวจสอบได้และยืดหยุ่น" (Robust & Secure) โดยใช้หลักการของ Oracle Framework

# 🛡️ Mission Blueprint: Anti-Fraud Referral System

**Task**: Refactor referral logic to prevent farming and unify star reward constants.
**Orchestration Strategy**: Parallel (Fleet Mode)
**Target Environment**: `projects/mmv-tarots`
**Base Branch**: `staging`

## 1. Complexity & Delegation Analysis

| Node | Task Type | Ownership | Tool/Method |
| :--- | :--- | :--- | :--- |
| **A** | Core Logic & DB | Oracle (Local) | Schema Migration & Auth Hook Refactor |
| **B** | UI Consistency | Remote Agent | Update Profile UI to use central constants |

## 2. CONSENSUS_SCHEMA (The Contract)

```typescript
// @/constants/referral.ts
export const REFERRAL_REWARDS = {
  REFERRER: 2,
  REFEREE: 1,
};

// Prisma Enum (Proposed)
enum ReferralStatus {
  PENDING   // Joined via link, but not verified usage
  GRANTED   // Reward distributed
  BLOCKED   // Suspected fraud
}
```

## 3. Phase 0: Execution Plan

1. **Orchestration**:
    - สร้าง Issue ใน `mmv-tarots` สำหรับ Node B (UI Update)
    - มอบหมายงานให้ Remote Agent จัดการเรื่องการเปลี่ยน Hardcoded UI ให้ใช้ Constants
2. **Local Work (Node A)**:
    - **Step 1**: Modify `prisma/schema.prisma` (Add `ReferralHistory` table, add `signupIp` to `User`).
    - **Step 2**: Create `lib/server/services/referral-service.ts` to handle logic.
    - **Step 3**: Refactor `lib/server/auth.ts` to log referral instead of granting stars.
    - **Step 4**: Implement Global Trigger (Reward after 1st prediction).

## 4. Merge & Integration Sequence
1. Node A (Schema & Logic) -> `staging`
2. Node B (UI Update) -> `staging`
3. Verification (End-to-End Test)
4. Release to production

## 5. Protocol Checklist
- [x] Complexity evaluated
- [x] Consensus Schema defined
- [x] Project context identified (`mmv-tarots`)
- [x] Current state (Staging) verified

## Apply When
- เมื่อต้องแก้ปัญหา Referral Fraud หรือระบบความปลอดภัยในโปรเจกต์อื่นๆ
- เมื่อต้องการทำ Scale-up ระบบ Incentive

## Tags
`anti-fraud` `referral` `prisma` `robust` `blueprint`
