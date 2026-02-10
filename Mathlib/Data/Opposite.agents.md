Here's a structured technical metadata extraction for the provided Lean 4 file `Mathlib.Logic.Equiv.Opposite`:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Opposite α` | `Type u → Type u` (record) | Defines the opposite type: a singleton-record wrapper with fields `op : α → αᵒᵖ` and `unop : αᵒᵖ → α`. |
| `op` | `α → αᵒᵖ` | Canonical map from a type to its opposite. |
| `unop` | `αᵒᵖ → α` | Inverse canonical map from opposite back to original. |
| `op_unop` | `∀ x : αᵒᵖ, op (unop x) = x` | Shows `op ∘ unop = id` (definitional). |
| `unop_op` | `∀ x : α, unop (op x) = x` | Shows `unop ∘ op = id` (definitional). |
| `op_injective` | `Function.Injective op` | Proves `op` is injective. |
| `unop_injective` | `Function.Injective unop` | Proves `unop` is injective. |
| `op_inj_iff` | `op x = op y ↔ x = y` | Equivalence version of injectivity for `op`. |
| `unop_inj_iff` | `unop x = unop y ↔ x = y` | Equivalence version of injectivity for `unop`. |
| `equivToOpposite` | `α ≃ αᵒᵖ` | Explicit equivalence (bijection) between `α` and `αᵒᵖ`. |
| `op_surjective` / `unop_surjective` | `Function.Surjective op` / `unop` | Surjectivity of both maps. |
| `op_eq_iff_eq_unop` | `op x = y ↔ x = unop y` | Curried form of equivalence. |
| `unop_eq_iff_eq_op` | `unop x = y ↔ x = op y` | Curried form of equivalence. |
| `Opposite.rec'` | Induction principle for `Opposite` | Recursor/induction principle for the record type. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `op_` / `unop_`: Used for functions and lemmas involving `op` and `unop`.
  - `equivToOpposite_`: For properties of the equivalence.
- **Suffixes**:
  - `_iff`: For biconditional characterizations (e.g., `op_inj_iff`, `unop_inj_iff`).
  - `_coe`: For coercion lemmas (e.g., `equivToOpposite_coe`).
- **Notation**:
  - `αᵒᵖ`: Postfix notation for `Opposite α`, with high binding power (like `⁻¹`).

---

### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`: Used in definitional equalities (`op_unop`, `unop_op`).
  - `simp`: In `unop_injective`.
  - `congr_arg`: In `op_injective`.
  - `by simp`: In `unop_injective`.
  - `exact`, `intro`, `cases`: Implicit in proofs (e.g., `unop_injective` uses `⟨_⟩` pattern matching).
- **No heavy automation** (e.g., no `aesop`, `linarith`, `ring`, `omega`), reflecting the foundational nature of the file.

---

### **4. Proof Logic**

- **Definitional equalities**: Both `op_unop` and `unop_op` are `rfl`, relying on Lean 4’s definitional eta for records.
- **Injectivity/surjectivity**: Proven via direct application of `congr_arg` or `simp`, leveraging the inverse relationship.
- **Equivalence proofs**: Constructed explicitly using `equivToOpposite`, with `left_inv`/`right_inv` instantiated via `unop_op`/`op_unop`.
- **Induction principle**: `rec'` is defined by pattern-matching on `X : αᵒᵖ` as `op (unop X)`, using definitional eta.

---

### **5. Imports**

- `Mathlib.Logic.Equiv.Defs`: Provides basic definitions and utilities for equivalences (`≃`), used in `equivToOpposite`.

---

### **Summary**

This file formalizes the foundational theory of the *opposite type* `αᵒᵖ`, a simple but crucial construction used throughout category theory (e.g., to define opposite categories). It leverages Lean 4’s record eta to make `op` and `unop` inverses *definitional*, simplifying reasoning. The proofs are minimal and rely on basic properties of equivalences and record types.

Let me know if you'd like a formalized summary in Lean 4 style or a comparison with Mathlib v3.