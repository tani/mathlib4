### Technical Metadata Brief: `Mathlib.Tactic.AtomM`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AtomM.Context` | `Structure` | Read-only state for `AtomM`, containing: <br> • `red : TransparencyMode` — controls definitional equality checking mode <br> • `evalAtom : Expr → MetaM Simp.Result` — preprocessing hook for atoms (default: identity) |
| `AtomM.State` | `Structure` | Mutable state: `atoms : Array Expr` — list of unique atoms (up to definitional equality at given transparency) encountered so far |
| `AtomM` | `abbrev AtomM := ReaderT Context (StateRefT State MetaM)` | Monadic stack for tracking and deduplicating atoms in tactics like `ring`/`abel` |
| `AtomM.run` | `TransparencyMode → AtomM α → (Expr → MetaM Simp.Result) → MetaM α` | Executes an `AtomM` computation with specified transparency and optional `evalAtom` hook |
| `AtomM.addAtom` | `Expr → AtomM (Nat × Expr)` | Interns an expression: returns `(i, e')` where `e'` is the stored representative of the atom (up to `isDefEq` at `red`), and `i` is its index in the `atoms` list |
| `AtomM.addAtomQ` | `Q($α) → AtomM (Nat × {e' : Q($α) // $e =Q $e'})` | Typed version of `addAtom` for `Qq`-based code; returns a quotiented equality proof witness |

> **Note**: No named theorems are present — this is a utility module for internal tactic state management.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `AtomM.` — module namespace prefix for monad and operations.
  - `isDefEq` — standard Lean meta-level definitional equality check.
- **Suffixes**:
  - `Q` suffix (`addAtomQ`) — indicates *typed* / `Qq`-compatible variant.
- **Structure fields**:
  - `red`, `evalAtom`, `atoms` — descriptive, minimal names reflecting their role.

---

#### **3. Tactic Stack**

- **Core tactics / utilities used**:
  - `withTransparency` — to adjust transparency mode for `isDefEq`.
  - `isDefEq` — definitional equality check (expensive; noted as performance concern).
  - `modifyGet` — state update + return of old/new pair.
  - `pure`, `return`, `do`-notation — standard monadic control flow.
  - `Qq`-based quoting (`Q($α)`, `=Q`) — for strongly-typed term handling.

> **Notably absent**: `simp`, `ring`, `aesop`, `linarith` — this module is *not* a tactic itself, but a *support monad* for such tactics.

---

#### **4. Proof Logic / Computation Flow**

- **`addAtom` logic**:
  1. Retrieve current state (`c ← get`).
  2. Iterate over existing `atoms` list.
  3. For each candidate `c.atoms[i]`, check definitional equality with input `e` *under the current transparency mode* (`withTransparency ... isDefEq`).
  4. If match found: return `(i, c.atoms[i])`.
  5. If no match: append `e` to `atoms`, return `(new_index, e)`.

- **`addAtomQ` logic**:
  - Delegates to `addAtom`, then wraps result in a dependent pair with trivial proof (`⟨e', ⟨⟩⟩`) to satisfy `Qq`-level equality.

- **Overall pattern**: *Deduplication via definitional equality under configurable transparency*, with state threading via `StateRefT`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization (basic types, tactics, meta-programming infrastructure) |
| `Lean.Meta.Tactic.Simp.Types` | Provides `Simp.Result` and related types for simplifier hooks (`evalAtom`) |
| `Qq` | Quoted expression library (`Q`, `Qq`, `=Q`) — enables strongly-typed term manipulation |

> **Scope**: This module is part of the *tactic infrastructure* for *normalizing tactics* (e.g., `ring`, `abel`) that require consistent atom ordering and unification modulo definitional equality.

--- 

Let me know if you'd like a formalized signature list or a diagram of the monad stack.