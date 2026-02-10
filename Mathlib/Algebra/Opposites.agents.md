### Technical Brief: Multiplicative and Additive Opposites in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Definition | Purpose |
|------|-------------------|---------|
| `PreOpposite α` | `structure PreOpposite (α : Type*)` with fields `op' : α → PreOpposite α`, `unop' : PreOpposite α → α` | Internal auxiliary structure used to define both `MulOpposite` and `AddOpposite` uniformly. Enables definitional equality `MulOpposite α = AddOpposite α = PreOpposite α`. |
| `MulOpposite α` (`αᵐᵒᵖ`) | `def MulOpposite (α : Type*) := PreOpposite α` | Multiplicative opposite: inherits additive structure from `α`, reverses multiplication order: `op (x * y) = op y * op x`. |
| `AddOpposite α` (`αᵃᵒᵖ`) | `postfix:max "ᵃᵒᵖ" => AddOpposite` (defined as `MulOpposite` via `PreOpposite`) | Additive opposite: inherits multiplicative structure from `α`, reverses addition order: `op (x + y) = op y + op x`. |
| `op : α → αᵐᵒᵖ` | `def op := PreOpposite.op'` | Canonical embedding of `α` into its opposite. |
| `unop : αᵐᵒᵖ → α` | `def unop := PreOpposite.unop'` | Projection back to original type. |
| `opEquiv : α ≃ αᵐᵒᵖ` | `def opEquiv := ⟨op, unop, unop_op, op_unop⟩` | Canonical equivalence (bijection) between `α` and `αᵐᵒᵖ`. |
| `op_mul`, `unop_mul` | `op (x * y) = op y * op x`, `unop (x * y) = unop y * unop x` | Core property: multiplication is reversed in `αᵐᵒᵖ`. |
| `op_add`, `unop_add` | `op (x + y) = op x + op y`, `unop (x + y) = unop x + unop y` | In `αᵐᵒᵖ`, addition is *not* reversed (since `MulOpposite` inherits additive structure directly). |
| `op_smul`, `unop_smul` | `op (a • b) = a • op b`, `unop (a • b) = a • unop b` | Compatibility with scalar multiplication. |
| `instMul`, `instAdd`, etc. | Instance definitions for `Mul`, `Add`, `Neg`, `Inv`, `Div`, `SMul`, etc., on opposites | Endow opposites with algebraic structures via `op`/`unop`. |
| `op_inj`, `unop_inj` | `op x = op y ↔ x = y`, `unop x = unop y ↔ x = y` | `op` and `unop` are injective (in fact bijective). |
| `instNontrivial`, `instSubsingleton`, `instUnique`, `instIsEmpty`, `instDecidableEq` | Instance propagation | Algebraic/logical properties transfer via `opEquiv`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `op_`: functions/lemmas involving `op` (e.g., `op_mul`, `op_zero`, `op_inj`).
  - `unop_`: functions/lemmas involving `unop` (e.g., `unop_mul`, `unop_zero`, `unop_inj`).
  - `inst_`: typeclass instances (e.g., `instMul`, `instZero`, `instInvolutiveNeg`).
  - `forall`, `exists`: quantifier lemmas (`forall p ↔ ∀ a, p (op a)`).
  - `eq_zero_iff`, `ne_zero_iff`, `eq_one_iff`, etc.: characterizations of zero/one in terms of `unop`/`op`.
- **To-additive annotations**: Many lemmas have `@[to_additive ...]` attributes, indicating dual versions for `AddOpposite`. E.g., `op_mul` (for `MulOpposite`) ↔ `op_mul` (for `AddOpposite`, but with `*` instead of `+`).

---

#### **3. Tactic Stack**

- **`rfl`**: Dominant tactic — most lemmas are definitional (`op`, `unop`, `add`, `mul`, etc. are defined via `op`/`unop`).
- **`simp` / `simp_rw`**: Used for rewriting via `@[simp]` lemmas (e.g., `op_add`, `unop_mul`).
- **`exact` / `assumption`**: Implicit in many proofs via `rfl`.
- **`apply` / `congr`**: Used in instance proofs (e.g., `InvolutiveNeg`, `InvolutiveInv`) via `unop_injective`.
- **`induction` / `cases`**: Via `rec'` and `@[induction_eliminator]`.
- **`aesop` / `linarith`**: Not present — this file is purely definitional/structural.

---

#### **4. Proof Logic**

- **Definitional reasoning dominates**: Most proofs are `rfl`, relying on Lean 4’s definitional eta for structures.
- **Bijective transfer**: Properties (e.g., `Nontrivial`, `Subsingleton`, `DecidableEq`) are transferred via `opEquiv`:
  - `op_injective.nontrivial`, `unop_injective.subsingleton`, etc.
- **Structure lifting**: Algebraic operations are defined by pulling back via `unop`, applying original operation, then pushing forward via `op`. E.g.:
  ```lean
  mul x y := op (unop x * unop y)
  ```
  This ensures coherence with `op`/`unop` homomorphism properties.
- **Reversal of multiplication**: Key lemma `op_mul` shows reversal: `op (x * y) = op y * op x`. This is *definitional* (`rfl`) due to how `mul` is defined on `αᵐᵒᵖ`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Defs` | Provides basic group/ring-like structures (`Mul`, `One`, `Inv`, `InvolutiveInv`, etc.). |
| `Mathlib.Logic.Equiv.Defs` | Needed for `Equiv`/`≃` and `opEquiv`. |
| `Mathlib.Logic.Nontrivial.Basic` | For `Nontrivial`, `Subsingleton`, `IsEmpty`, `Unique`. |
| `Mathlib.Logic.IsEmpty` | For `IsEmpty` and related lemmas. |

---

### Summary

This file formalizes the **multiplicative and additive opposites** as a unified structure (`PreOpposite`), enabling a clean, definitional treatment of opposite types in Lean 4. It emphasizes **definitional equality** over propositional equality (a key departure from mathlib3), leveraging Lean 4’s definitional eta for structures. The API is built around the canonical bijection `opEquiv`, with all algebraic structures and properties transferred via this equivalence. The naming and annotation conventions (`@[to_additive]`, `@[simp]`, `inst_`) reflect Lean 4’s emphasis on dualities and automation.