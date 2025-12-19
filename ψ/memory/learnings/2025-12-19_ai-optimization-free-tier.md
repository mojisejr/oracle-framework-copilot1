# Learning: Optimizing AI Frameworks for Free Tier Models

**Date**: 2025-12-19 23:49 (Local Time)
**Category**: AI Workflow / Framework Design
**Tags**: #copilot-agents #free-tier #optimization #time-truth

## Context
When using AI frameworks (like Oracle Framework) with Free Tier models, consistency and instruction following often degrade due to context limits and model "laziness."

## The Pattern
1. **Instruction Dilution**: Long instructions in `.md` files are often ignored as the conversation grows.
2. **Model Laziness**: Smaller models skip tool calls to save compute/tokens.
3. **Time Drift**: Models use UTC or internal clocks, causing logs to become unsynchronized with the human's local time.

## The Solution (The "Oracle" Pattern)
- **Custom Agents**: Use `.agent.md` to embed core instructions into the System Prompt. This makes them persistent and high-priority.
- **Tier Optimization Protocol**: Define a mandatory sequence for smaller models:
    1. **Context First** (Search before acting)
    2. **State Sync** (Read focus file)
    3. **Time Truth** (Run `date` to sync with local time)
- **Local Time Enforcement**: Always use `run_in_terminal` with `date` to get the human's machine time. Never trust the AI's internal clock.

## Resonance
This approach shifts the AI from being a "passive reader" of instructions to an "active participant" in a structured workflow. It ensures that even less powerful models can maintain the integrity of a complex framework.
