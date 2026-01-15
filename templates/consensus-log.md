# Consensus Log: [Task Title]
**Timestamp**: {{date}}
**Issue**: #{{issue_id}}
**Status**: [Planning | In-Progress | Resolved]

## 🎯 Shared Consensus (Contract)
*อธิบายข้อตกลงร่วมกันระหว่าง Agents เพื่อไม่ให้เกิด Logical Conflict*

### 1. File Ownership (เขตอำนาจ)
| Agent | Role | Directory/Files Boundaries |
|-------|------|---------------------------|
| **o** (Local) | Conductor/Core | `src/lib/`, `prisma/` |
| **@test-agent** | QA | `__tests__/` |
| **@docs-agent** | Documentation | `docs/`, `README.md` |
| **@ui-agent** | Frontend | `components/` |

### 2. Technical Contracts (สัญญาเทคนิค)
- **API Endpoints**: `GET /api/example` returns `{ data: string }`
- **Shared Types**: `interface SharedData { ... }` in `types/index.ts`
- **Naming Convention**: CamelCase for functions, PascalCase for components.

### 3. Execution Sequence (ลำดับการลงจอด)
1. **PR #1**: Core Logic & Types (Local) - **Merge First**
2. **PR #2**: UI Implementation (Remote)
3. **PR #3**: Testing Suite (Remote)

---

## 🚀 Dispatched Nodes
- [ ] **Node A**: [@agent_name] -> [Issue Link] -> [Status]
- [ ] **Node B**: [@agent_name] -> [Issue Link] -> [Status]

---
*Created by Oracle Conductor Protocol v2*
