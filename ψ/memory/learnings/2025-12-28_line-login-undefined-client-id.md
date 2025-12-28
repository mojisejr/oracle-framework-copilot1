# Learning: LINE Login "undefined" Client ID Error

**Date**: 2025-12-28
**Project**: mmv-tarots
**Context**: Debugging LINE Login failure on Production (Vercel).

## The Problem
When attempting to log in via LINE on the production site, an error page from LINE appears with the following message:
> `400 Bad Request`
> `Confirm your request. Failed to convert property value of type 'java.lang.String' to required type 'java.lang.Integer' for property 'clientId'; For input string: "undefined"`

## The Cause
This error occurs because the `LINE_CLIENT_ID` environment variable is **missing** or **undefined** on the server side.
- Better Auth attempts to construct the OAuth URL using `process.env.LINE_CLIENT_ID`.
- If the variable is not set in Vercel, it evaluates to `undefined`.
- When converted to a string for the URL parameter, it becomes `"undefined"`.
- LINE's server expects a numeric string (Integer) for the `client_id` and fails when it receives the literal string `"undefined"`.

## Key Insight
**Always verify that ALL social provider credentials are added to Vercel's Environment Variables for the specific environment (Production/Preview).**

Setting `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` is not enough; each provider (LINE, Google, etc.) requires its own set of keys to be explicitly defined in the deployment platform.

## Corrective Action
1. Go to **Vercel Dashboard > Settings > Environment Variables**.
2. Add `LINE_CLIENT_ID` and `LINE_CLIENT_SECRET`.
3. Ensure the scope includes **Production**.
4. **Redeploy** the application to apply the new variables.

## Resonance
"Error message ที่ดูเหมือนปัญหาทางเทคนิคลึกๆ (Java conversion error) บ่อยครั้งมีสาเหตุมาจากเรื่องพื้นฐานอย่างการลืมตั้งค่า Environment Variable"
