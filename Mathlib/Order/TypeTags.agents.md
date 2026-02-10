### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WithBot (α : Type*)` | Definition: `Option α`. Attaches a bottom element `⊥` to a type. |
| `WithTop (α : Type*)` | Definition: `Option α`. Attaches a top element `⊤` to a type. |
| `WithBot.some` / `WithTop.some` | Canonical inclusion `α → WithBot α` / `α → WithTop α`, defined as `Option.some`. Marked with `@[coe, match_pattern]`. |
| `WithBot.coe` / `WithTop.coeTC` | Coercion instances: `Coe α (WithBot α)` and `CoeTC α (WithTop α)`. |
| `WithBot.bot` / `WithTop.top` | Instances defining `⊥ : WithBot α` and `⊤ : WithTop α` as `none : Option α`. |
| `WithBot.inhabited` / `WithTop.inhabited` | `Inhabited` instances, using `⊥` / `⊤`. |
| `WithBot.recBotCoe` / `WithTop.recTopCoe` | Induction/cases eliminators for `WithBot` / `WithTop`, using canonical forms `⊥` and `↑a` / `⊤` and `↑a`. |
| `recBotCoe_bot`, `recBotCoe_coe`, `recTopCoe_top`, `recTopCoe_coe` | Simplification lemmas for the eliminators; all proved by `rfl`. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `WithBot` / `WithTop`: Module and type names.
  - `rec*`: Recursor names (`recBotCoe`, `recTopCoe`).
  - `coe`: For coercion-related definitions (`some`, `coe`, `coeTC`).
- **Suffixes:**
  - `_bot`, `_coe`, `_top`: Used in lemmas to indicate which case they handle (`recBotCoe_bot`, `recBotCoe_coe`, `recTopCoe_top`, `recTopCoe_coe`).
- **Notation:**
  - `↑a`: Coercion notation for `some a`.
  - `⊥`, `⊤`: Notation for bottom/top elements.

#### 3. **Tactic Stack**

- **`rfl`**: Used exclusively in simplification lemmas (all are definitional equalities).
- **`match`**: Used in `Repr` instances for pattern matching on `Option`.
- **`@[simp]`**: Applied to all simplification lemmas.
- **Attribute annotations**:
  - `@[coe, match_pattern]`: For coercion and pattern matching.
  - `@[elab_as_elim, induction_eliminator, cases_eliminator]`: For eliminators.

#### 4. **Proof Logic**

- Proofs are **definitional** (i.e., `rfl`), as all lemmas are about the behavior of eliminators on canonical forms (`⊥`, `↑a`, `⊤`).
- No induction or case analysis beyond pattern matching on `Option`.
- Structure follows standard Lean conventions for inductive types with constructors (`none`, `some`).

#### 5. **Imports**

- `Mathlib.Order.Notation`: Provides order-related notation (e.g., `⊥`, `⊤`, `↑`, `Repr` instances).
- **No other imports** — this is a minimal, self-contained module.

---

This module serves as a lightweight foundation for extending types with order-theoretic bounds (`⊥`, `⊤`) using `Option`, enabling later developments (e.g., `ENat`, `PNat`, countability results) without bloating imports.