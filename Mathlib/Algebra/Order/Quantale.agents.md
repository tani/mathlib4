### Technical Metadata Brief: Quantale Theory in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsAddQuantale` | `class IsAddQuantale (α : Type*) [AddSemigroup α] [CompleteLattice α]` | Typeclass for additive quantales: additive semigroup distributive over complete lattice. |
| `IsQuantale` | `class IsQuantale (α : Type*) [Semigroup α] [CompleteLattice α]` | Typeclass for (multiplicative) quantales: semigroup distributive over complete lattice. |
| `add_sSup_distrib` | `x + sSup s = ⨆ y ∈ s, x + y` | Left distributivity of addition over sup. |
| `sSup_add_distrib` | `sSup s + x = ⨆ y ∈ s, y + x` | Right distributivity of addition over sup. |
| `mul_sSup_distrib` | `x * sSup s = ⨆ y ∈ s, x * y` | Left distributivity of multiplication over sup. |
| `sSup_mul_distrib` | `sSup s * x = ⨆ y ∈ s, y * x` | Right distributivity of multiplication over sup. |
| `leftAddResiduation` | `x ⇨ₗ y := sSup {z | z + x ≤ y}` | Left residuation for additive quantales. |
| `rightAddResiduation` | `x ⇨ᵣ y := sSup {z | x + z ≤ y}` | Right residuation for additive quantales. |
| `leftMulResiduation` | `x ⇨ₗ y := sSup {z | z * x ≤ y}` | Left residuation for multiplicative quantales. |
| `rightMulResiduation` | `x ⇨ᵣ y := sSup {z | x * z ≤ y}` | Right residuation for multiplicative quantales. |
| `mul_iSup_distrib` | `x * ⨆ i, f i = ⨆ i, x * f i` | Distributivity over indexed suprema. |
| `iSup_mul_distrib` | `(⨆ i, f i) * x = ⨆ i, f i * x` | Right distributivity over indexed suprema. |
| `mul_sup_distrib` | `x * (y ⊔ z) = (x * y) ⊔ (x * z)` | Distributivity over binary sup. |
| `sup_mul_distrib` | `(x ⊔ y) * z = (x * z) ⊔ (y * z)` | Right distributivity over binary sup. |
| `leftMulResiduation_le_iff_mul_le` | `x ≤ y ⇨ₗ z ↔ x * y ≤ z` | Adjunction property of left residuation. |
| `rightMulResiduation_le_iff_mul_le` | `x ≤ y ⇨ᵣ z ↔ y * x ≤ z` | Adjunction property of right residuation. |
| `bot_mul`, `mul_bot` | `⊥ * x = ⊥`, `x * ⊥ = ⊥` | Annihilation of bottom element. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Used in typeclass names (`IsQuantale`, `IsAddQuantale`).
  - `left_`, `right_`: For residuation operators (`leftMulResiduation`, `rightAddResiduation`).
  - `add_`, `mul_`: Distinguish additive vs multiplicative variants (`add_sSup_distrib`, `mul_sSup_distrib`).
  - `sSup_`, `iSup_`: For suprema over sets vs indexed families.

- **Suffixes**:
  - `_distrib`: For distributivity theorems.
  - `_le_iff_`: For residuation adjunctions.
  - `_mono`: For monotonicity instances (e.g., `MulLeftMono`, `MulRightMono`).

- **Infix Notation**:
  - `⇨ₗ`, `⇨ᵣ`: Left/right residuation (infix, right-associative, precedence 60).
  - Overloaded for additive and multiplicative cases via `to_additive`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using definitions and theorems (e.g., `mul_sSup_distrib`, `leftMulResiduation`).
- `simp only`: Simplification with specific lemmas, often combined with `rw`.
- `intro`, `apply`, `exact`: Basic intro/elimination steps.
- `le_sSup`, `le_trans`: For proving inequalities involving suprema.
- `iSup_le_iff`, `sup_of_le_left`: For reasoning about suprema.
- `set_tac`-like simplifications: e.g., `Set.mem_setOf_eq`, `not_false_eq_true`.
- `induction`, `cases`: Not heavily used here; proofs are mostly equational/adjunction-based.

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs rely heavily on **adjunctions** (e.g., residuation ↔ multiplication inequality).
  - Use of **lattice-theoretic properties**: suprema as least upper bounds, monotonicity of operations.
  - **Distributivity** is the core assumption, exploited via `mul_sSup_distrib`, `sSup_mul_distrib`.
  - Many proofs follow a pattern:
    - For `↔` theorems: prove both directions separately.
      - `mp`: use `le_trans` + `mul_le_mul_*` + `iSup_le_iff`.
      - `mpr`: use `le_sSup`.
    - For distributivity over `iSup`: reduce to `sSup` via `iSup` definition and `iSup_range`.
    - For binary `sup`: reduce to `iSup_pair` and apply `sSup_*_distrib`.

- **Induction**: Not used; proofs are mostly algebraic and order-theoretic.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Algebra.Group.Defs`: Basic algebraic structures (semigroups, etc.).
  - `Mathlib.Algebra.Order.Monoid.Unbundled.Basic`: Ordered monoids, monotonicity.
  - `Mathlib.Order.CompleteLattice`: Complete lattices, suprema, infima.

- **Scope**:
  - Focuses on *unbundled* structures (typeclasses over existing type classes).
  - Uses `CompleteLattice` as the order-theoretic foundation.
  - Designed for extensibility: `to_additive` and `to_additive existing` annotations support additive/multiplicative variants.

- **Notable Design Choices**:
  - Mixin typeclasses (`IsQuantale`, `IsAddQuantale`) allow future extensions (unital, commutative, etc.).
  - Residuation defined via `sSup {z | ...}` aligns with Heyting implication in frames/locales.

---

### Summary

This file formalizes the foundational theory of quantales and additive quantales in Lean 4, using a mixin typeclass approach. It emphasizes residuation, distributivity over suprema, and monotonicity, with a clean separation between additive and multiplicative cases. The design supports future extensions (e.g., unital quantales) and is aligned with standard mathematical literature (e.g., Wikipedia, nLab, Mulvey–Vickers).