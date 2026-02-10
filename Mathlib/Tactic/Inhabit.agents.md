### Technical Metadata Brief: `inhabit` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `nonempty_to_inhabited` | `∀ {α : Sort u}, Nonempty α → Inhabited α` | Constructs an `Inhabited α` instance from `Nonempty α` using *classical choice* (noncomputable). |
| `nonempty_prop_to_inhabited` | `∀ {α : Prop}, Nonempty α → Inhabited α` | Constructs `Inhabited α` *constructively* for propositions, avoiding classical choice. |
| `evalInhabit` | `MVarId → Option Ident → Syntax → TacticM MVarId` | Core implementation of the tactic: elaborates `term`, synthesizes `Nonempty term`, then applies appropriate constructor (`nonempty_prop_to_inhabited` or `nonempty_to_inhabited`) and introduces a new hypothesis. |
| `inhabit` (syntax) | `(name := inhabit) "inhabit " atomic(ident " : ")? term : tactic` | User-facing tactic syntax: `inhabit α` or `inhabit h : α`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nonempty_..._to_inhabited`: Indicates derivation *from* `Nonempty` *to* `Inhabited`.
  - `eval...`: Standard for tactic implementation helpers (e.g., `evalInhabit`).
- **Suffixes**:
  - `_pf`: Used for proof terms (e.g., `nonempty_e_pf`).
  - `_e`: Used for expressions/terms (e.g., `e`, `inhabited_e`, `nonempty_e`).
- **Internal identifiers**:
  - Backtick notation for generated names: `` `inhabited_h `` (default hypothesis name).

---

#### **3. Tactic Stack & Core Tactics Used**

- **`Tactic.elabTerm`**: Elaborates user-provided term.
- **`Meta.getLevel`**: Infers universe level of term.
- **`synthInstance`**: Synthesizes `Nonempty term` instance.
- **`Meta.mkAppM`**: Constructs applications of constants (e.g., `nonempty_prop_to_inhabited`).
- **`isProp`**: Checks if term is a proposition.
- **`MVarId.assert` + `.intro1P`**: Introduces a new hypothesis and returns the updated goal.
- **`replaceMainGoal`**: Replaces the current goal with the result of `evalInhabit`.

*No external tactics like `aesop`, `ring`, or `simp` are used — relies on core metaprogramming.*

---

#### **4. Proof Logic / Execution Flow**

1. **Elaborate input term** `t` (e.g., `α`).
2. **Synthesize `Nonempty t`** via typeclass resolution.
3. **Branch on whether `t` is a proposition**:
   - If `t : Prop`: Use `nonempty_prop_to_inhabited` (constructive).
   - Else: Use `nonempty_to_inhabited` (classical, via `Classical.choice`).
4. **Introduce hypothesis** `h : Inhabited t` into the local context.
5. **Return updated goal** with new hypothesis.

*No induction or case analysis on hypotheses — purely typeclass-driven synthesis + conditional proof construction.*

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Lean.Elab.Tactic.ElabTerm` | Provides `Tactic.elabTerm`, `getMainGoal`, etc. — core tactic infrastructure. |
| `Mathlib.Tactic.TypeStar` | Enables universe-polymorphic typeclass inference (e.g., `Nonempty`, `Inhabited`). |

**Domain**: Lean 4 metaprogramming + type theory (constructive vs classical logic).  
**Primary use case**: Automating construction of `Inhabited` instances from `Nonempty` goals, especially in interactive theorem proving where explicit witnesses are desired (or acceptable via choice).

--- 

Let me know if you'd like a formalized specification or a test suite for this tactic.