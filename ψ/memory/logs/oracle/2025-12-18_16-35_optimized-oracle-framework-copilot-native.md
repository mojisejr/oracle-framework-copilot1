---
project: oracle
issue: #none
tags: []
date: 2025-12-18
agent: oracle-keeper
---

# Snapshot: Optimized Oracle Framework for GitHub Copilot Native Features

**Time**: 2025-12-18 16:35
**Context**: Refining the Oracle Framework to leverage advanced GitHub Copilot features like YAML frontmatter and path-specific instructions.

## Insight

By using YAML frontmatter (`applyTo: "**"`) in `.github/copilot-instructions.md` and creating directory-specific rules in `.github/instructions/memory.instructions.md`, we can enforce the "Nothing is Deleted" philosophy more strictly. Mapping the `ψ/` folder explicitly in instructions ensures that Copilot's RAG (Retrieval-Augmented Generation) remains accurate despite the use of special characters.

## Apply When

- When integrating a custom organizational philosophy into GitHub Copilot.
- When managing a project with a strict "append-only" memory or log structure.
- When using special characters in directory names that might confuse AI context retrieval.

## Tags

`copilot-native` `optimization` `rag` `philosophy` `memory-protection`
