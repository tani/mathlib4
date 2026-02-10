**Technical Metadata Brief: `fconstructor` and `econstructor` Tactics**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `fconstructor` | **Tactic combinator** (`elab "fconstructor" : tactic`) — Applies the first matching constructor of the current goal’s target inductive type *without reordering goals*. Uses `constructor {newGoals := .all}`. |
| `econstructor` | **Tactic combinator** (`elab "econstructor" : tactic`) — Applies the first matching constructor, but *only introduces non-dependent premises as new goals*. Uses `constructor {newGoals := .nonDependentOnly}`. |

Both are variants of Lean’s core `constructor` tactic, differing in how they handle goal generation.

---

### 2. **Naming Conventions**

- **Prefixes**:  
  - `f` in `fconstructor` likely stands for **“fixed”** or **“first”** (no reordering).  
  - `e` in `econstructor` likely stands for **“essential”** or **“eliminate”** (only essential/non-dependent premises).  
- **Suffixes**:  
  - `-constructor` follows standard Lean tactic naming (e.g., `constructor`, `intro`, `apply`), indicating constructor-based introduction.

---

### 3. **Tactic Stack**

- **Core tactics used**:
  - `withMainContext` — Ensures tactic runs in the main context.
  - `getMainGoal` — Retrieves current main goal.
  - `.constructor { ... }` — Calls the internal `constructor` method on the goal with custom `newGoals` policy.
  - `Term.synthesizeSyntheticMVarsNoPostponing` — Forces immediate resolution of synthetic metavariables (prevents postponing).
  - `replaceMainGoal` — Replaces the current goal with the list of generated subgoals.

- **No high-level automation tactics** (e.g., `aesop`, `ring`, `simp`) are used — this is a low-level tactic implementation.

---

### 4. **Proof Logic / Implementation Flow**

1. **Context preservation**: Wrap in `withMainContext`.
2. **Goal retrieval**: Get the current main goal.
3. **Constructor application**:
   - For `fconstructor`: Apply constructor with `newGoals := .all` → all premises become goals, *in order*.
   - For `econstructor`: Apply with `newGoals := .nonDependentOnly` → only non-dependent premises become goals.
4. **Synthesize metavariables**: Force resolution of synthetic mvars (no postponing).
5. **Update goal state**: Replace the main goal with the resulting list of subgoals.

→ **No induction or case analysis** is performed here — purely a *goal introduction* tactic.

---

### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Init` | Core Lean functionality (e.g., basic types, tactics infrastructure). |
| `Lean.Elab.SyntheticMVars` | Provides `Term.synthesizeSyntheticMVarsNoPostponing`. |
| `Lean.Meta.Tactic.Constructor` | Provides the internal `.constructor` method on goals (with `newGoals` configuration). |

→ **No external mathlib dependencies** beyond core Lean infrastructure — this is a *core tactic extension*.

--- 

**Summary**: A minimal, low-level tactic module implementing two refined variants of `constructor`, differing in goal generation policy. Designed for predictable control flow in interactive theorem proving.