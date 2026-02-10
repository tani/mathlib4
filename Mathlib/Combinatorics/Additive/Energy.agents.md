### Technical Metadata Brief: Additive and Multiplicative Energy in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mulEnergy` | `Finset α → Finset α → ℕ` | Counts quadruples `(a₁, a₂, b₁, b₂) ∈ s × s × t × t` such that `a₁ * b₁ = a₂ * b₂`. |
| `addEnergy` (via `to_additive`) | `Finset α → Finset α → ℕ` | Additive analog: counts quadruples with `a₁ + b₁ = a₂ + b₂`. |
| `Eₘ[s, t]` | Notation for `mulEnergy s t` | Shorthand in `Combinatorics.Additive` scope. |
| `E[s, t]` | Notation for `addEnergy s t` | Additive shorthand. |
| `Eₘ[s]`, `E[s]` | Notations for `mulEnergy s s`, `addEnergy s s` | Self-energy variants. |
| `mulEnergy_mono` | `s₁ ⊆ s₂ → t₁ ⊆ t₂ → Eₘ[s₁, t₁] ≤ Eₘ[s₂, t₂]` | Monotonicity of energy under inclusion. |
| `le_mulEnergy` | `s.card * t.card ≤ Eₘ[s, t]` | Lower bound: at least one quadruple per `(a, b) ∈ s × t` via diagonal embedding. |
| `mulEnergy_pos_iff` | `0 < Eₘ[s, t] ↔ s.Nonempty ∧ t.Nonempty` | Positivity characterization. |
| `mulEnergy_eq_card_filter` | Rewrites energy as filtered product cardinality | Alternative definition using `(s × t) × (s × t)`. |
| `mulEnergy_eq_sum_sq'` | `Eₘ[s, t] = ∑ a ∈ s * t, |{(x, y) ∈ s × t | x * y = a}|²` | Energy as sum of squares of fiber sizes over product set. |
| `card_sq_le_card_mul_mulEnergy` | `|{(a,b) ∈ s×t | a*b ∈ u}|² ≤ |u| * Eₘ[s, t]` | Cauchy–Schwarz-type inequality linking filter size and energy. |
| `le_card_add_mul_mulEnergy` | `s.card² * t.card² ≤ |s * t| * Eₘ[s, t]` | Key inequality in additive combinatorics (Ruzsa triangle inequality precursor). |
| `mulEnergy_comm` | `Eₘ[s, t] = Eₘ[t, s]` (in `CommMonoid`) | Symmetry of energy in commutative setting. |
| `mulEnergy_univ_left/right` | `Eₘ[univ, t] = |α| * |t|²`, etc. (in `CommGroup` + `Fintype`) | Exact formula when one argument is the full group. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mulEnergy` / `addEnergy`: Core definitions (multiplicative vs additive).
  - `le_`, `card_`, `sq_`: Inequalities involving cardinalities or squares.
  - `mono`: Monotonicity lemmas (`mulEnergy_mono`, `mulEnergy_mono_left/right`).
- **Suffixes**:
  - `_left`, `_right`: Specializations of binary lemmas to one argument.
  - `_iff`: Biconditional characterizations (`mulEnergy_pos_iff`, `mulEnergy_eq_zero_iff`).
  - `_filter`, `_sum_sq`: Rewrites in terms of filtering or summation.
- **Notation**:
  - `Eₘ[_, _]`, `E[_, _]`, `Eₘ[_]`, `E[_]`: Scoped notations in `Combinatorics.Additive`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification with lemmas like `mem_product`, `mem_filter`, `and_true`, etc.
- `gcongr`: For monotonicity proofs (e.g., `mulEnergy_mono`).
- `rw`: Rewriting using equalities like `mulEnergy_eq_card_filter`.
- `card_le_card_of_injOn`: To bound cardinalities via injective maps.
- `aesop`: Automated reasoning for set/membership goals (especially in `mulEnergy_eq_sum_sq'`).
- `exact`, `refine`, `swap`: For structured proof construction.
- `ext`: Extensionality for set equality.
- `calc`: Chain of inequalities (e.g., in `card_sq_le_card_mul_mulEnergy`).
- `filter_eq_self`, `filter_eq_empty_iff`: Set-theoretic simplifications.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern: *rewrite → bound → apply known inequalities*.
  - Key technique: **fiber decomposition** over the product operation (`∑_{a ∈ s*t} |fiber_a|²`).
  - Use of **injective embeddings** (e.g., diagonal map `x ↦ ((x.1, x.1), x.2, x.2)`) to derive lower bounds.
  - In finite commutative groups: explicit bijections (e.g., `f(x) = ((a * c⁻¹, a), c, d)`) to compute `Eₘ[univ, t]`.
- **Induction**: Not used directly; relies on set-theoretic and algebraic properties.
- **Case analysis**: Used in `mulEnergy_pos_iff` (via `not_and_or`, `not_nonempty_iff_eq_empty`).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Pointwise.Finset.Basic` | Defines `s • t`, `s⁻¹`, etc., for finsets in groups. |
| `Mathlib.Algebra.Order.BigOperators.Ring.Finset` | Provides `∑`, `∏`, `sq`, `card`, and ordering lemmas over `ℕ`. |
| `Mathlib.Data.Finset.Prod` | Products of finsets (`×ˢ`), filtering, cardinality lemmas. |
| `Mathlib.Data.Fintype.Prod` | Fintype product instances (used in `mulEnergy_univ_left/right`). |

---

### Summary

This module formalizes **additive/multiplicative energy**, a central concept in additive combinatorics, with:
- Precise definitions via filtered products,
- Fundamental inequalities (e.g., Ruzsa-type),
- Symmetry and positivity properties,
- Exact formulas in finite commutative groups.

The formalization is highly structured, leveraging Lean’s typeclass inference (`[Mul α]`, `[CommGroup α]`, `[Fintype α]`) and Lean 4’s `to_additive` infrastructure for parallel additive/multiplicative development.