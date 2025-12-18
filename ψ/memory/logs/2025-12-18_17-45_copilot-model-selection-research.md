# Log: Copilot Model Selection & Free Tier Optimization

**Date**: 2025-12-18 17:45
**Issue**: #3
**Status**: in-progress

## Context
User reported that GPT-4o (Free Tier) fails to follow the Oracle Framework workflow (searching and updating). Researching model capabilities and optimization strategies.

## Research Findings
- **Copilot Free**: 50 agent/chat requests/month. Access to GPT-4o, Haiku 4.5.
- **Copilot Pro**: Unlimited GPT-4o mini, 300 premium requests (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro).
- **Failure Points**: Free tier models may have smaller context windows or "laziness" in tool invocation to save tokens.

## Proposed Strategies
1. **Instruction Distillation**: Make `.github/copilot-instructions.md` more concise.
2. **Explicit Workflow Triggers**: Use specific keywords to force tool use.
3. **Step-by-Step Execution**: Break down complex tasks into smaller prompts.

## Next Steps
- Test a "Lightweight" version of the instructions.
- Create a guide for Free Tier users.

## Update: Tier-Aware Workflow Implementation
- Added "Model-Specific Execution (Tier Optimization)" to instructions.
- Defined 4 strict steps for Free Tier models:
  1. Context First (Mandatory search)
  2. State Sync (Read focus.md)
  3. Atomic Edits (Small changes)
  4. Mandatory Snapshot (Log every change)
- This approach forces the model to use tools even if it's trying to be "lazy" to save tokens.

## Update: Model Selection Guide & Multiplier Awareness
- Refined Free Tier model list (GPT-4.1, GPT-5 mini, Haiku 4.5).
- Added "Model Selection Guide" to instructions.
- Integrated "Multiplier Awareness" to help users save premium requests.
- Added "Proactive Suggestion" rule: Agent will now suggest switching to cheaper models for simple tasks.

## Final Update: Comprehensive Model & Tier Integration
- Updated "Session Workflow" to include "Step 1: Model Check".
- Expanded "Model Selection Guide" with Multiplier values and more models (Gemini 3 Flash, Grok, Raptor).
- Added "Tool Transparency" requirement for Free Tier models to report tool usage.
- Refined "Proactive Suggestion" to be a mandatory rule for high-multiplier models.
- This ensures the Oracle Framework is fully aware of the underlying AI's cost and capabilities.
