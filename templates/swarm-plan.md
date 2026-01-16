# 🛡️ Mission Blueprint: [Task Name]

**Task**: [Brief description]
**Strategy**: [Solo | **Local Swarm**]
**Context Scope**: `ψ/active/[project]/focus.md`

## 1. Orchestration Plan (The Nodes)

| Node | Type | Responsibility | Branch (Worktree) |
| :--- | :--- | :--- | :--- |
| **Main** | **Harmonizer** | Core Logic, Schema, & Merge | `feat/main-task` |
| **Swarm-A** | Worker | UI Components / Frontend | `worktree/ui` |
| **Swarm-B** | Worker | Documentation / Tests | `worktree/docs` |

## 2. Soil Preparation (Run in Terminal)
*Copy and run these commands to spawn the swarm.*
```bash
# 1. Create Worktrees (Spawn Agents)
git worktree add ../[Project]-UI worktree/ui staging
git worktree add ../[Project]-Docs worktree/docs staging

# 2. Open Windows (Manual)
#code ../[Project]-UI
#code ../[Project]-Docs
```

## 3. The Contract (CONSENSUS_SCHEMA)
*Shared definitions to prevent conflict. All nodes must adhere to this.*
```typescript
// Shared Types / Constants
export interface ...
```

## 4. Execution Blocks (Deep Links)

### 🧱 Block A (Main Session)
- **Goal**: ...
- **Files**: ...

### 🐝 Block B (Swarm-A: UI)
- **Goal**: ...
- **Files**: ...

### 🐝 Block C (Swarm-B: Docs)
- **Goal**: ...
- **Files**: ...

## 5. Harmonization Sequence
1.  **Swarm**: Commit changes to `worktree/xxx`.
2.  **Main**: `git merge worktree/xxx`.
3.  **Main**: Run `npm run build` & `npm run lint`.
4.  **Main**: `git worktree remove ../[Project]-UI`.
