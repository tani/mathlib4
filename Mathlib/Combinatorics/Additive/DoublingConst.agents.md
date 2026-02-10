### Technical Brief: Doubling and Difference Constants in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `mulConst A B` | `Finset G → Finset G → ℚ≥0` | Defines the *multiplicative doubling constant*: `#(A * B) / #A` |
| `divConst A B` | `Finset G → Finset G → ℚ≥0` | Defines the *multiplicative difference constant*: `#(A / B) / #A` |
| `addConst A B` | `Finset G' → Finset G' → ℚ≥0` | Additive counterpart of `mulConst`: `#(A + B) / #A` |
| `subConst A B` | `Finset G' → Finset G' → ℚ≥0` | Additive counterpart of `divConst`: `#(A - B) / #A` |
| `mulConst_mul_card` | `σₘ[A, B] * #A = #(A * B)` | Relates doubling constant to cardinalities (used for simplification) |
| `divConst_mul_card` | `δₘ[A, B] * #A = #(A / B)` | Same for difference constant |
| `mulConst_empty_left/right`, `divConst_empty_left/right` | `σₘ[∅, B] = 0`, etc. | Handles edge cases where inputs are empty |
| `mulConst_inv_right` | `σₘ[A, B⁻¹] = δₘ[A, B]` | Connects doubling and difference via inversion |
| `divConst_inv_right` | `δₘ[A, B⁻¹] = σₘ[A, B]` | Inverse of above |
| `mulConst_le_inv_dens`, `divConst_le_inv_dens` | `σₘ[A, B] ≤ A.dens⁻¹`, etc. | Bounds doubling/difference constants by inverse density |
| `mulConst_le_divConst_sq`, `divConst_le_mulConst_sq` | `σₘ[A] ≤ δₘ[A]²`, `δₘ[A] ≤ σₘ[A]²` | Ruzsa triangle inequality consequences: small doubling ⇔ small difference (up to squaring) |
| `cast_*` lemmas (e.g., `cast_mulConst`, `cast_addConst_mul_card`) | Embedding into `𝕜` (semifield of char 0) | Allows lifting rational constants to reals or other fields |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mulConst`, `divConst`, `addConst`, `subConst`: Core definitions.
  - `cast_`: Embedding into a semifield/field.
- **Suffixes**:
  - `_mul_card`, `_card_mul`: Relating constants to cardinalities.
  - `_inv_left`, `_inv_right`: Behavior under inversion.
  - `_empty_left`, `_empty_right`: Edge-case lemmas.
- **Notation scopes**:
  - `Combinatorics.Additive`: Scope for `σ`, `δ`, `σₘ`, `δₘ`.
  - `σₘ`, `δₘ`: Multiplicative notation.
  - `σ`, `δ`: Additive notation.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` / `simp_rw`: For simplification using `@[simp]` lemmas.
  - `rw`: Rewriting using definitions and lemmas.
  - `norm_cast`: For lifting equalities from `ℚ≥0` to `𝕜`.
  - `gcongr`: For inequalities involving monotone functions (e.g., division).
  - `exact`, `refine`: For direct proof construction.
  - `ring`: For algebraic manipulation of rational expressions.
  - `obtain rfl | hA := A.eq_empty_or_nonempty`: Case analysis on finset emptiness.
  - `by positivity`: For proving positivity of cardinals.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a standard pattern:
    1. **Case analysis** on whether `A` is empty (`eq_empty_or_nonempty`).
    2. **Simplify** using definitions and `simp` lemmas.
    3. **Rewrite** using key lemmas like `mulConst_mul_card`.
    4. **Apply known inequalities** (e.g., `ruzsa_triangle_inequality_mul_div_div`).
    5. **Conclude** via algebraic manipulation (`ring`) or monotonicity (`gcongr`, `le_of_mul_le_mul_right`).
- **Key logical flow**:
  - For `mulConst_le_divConst_sq` and `divConst_le_mulConst_sq`:
    - Multiply both sides by `#A * #A` (positive).
    - Use Ruzsa triangle inequality to bound `#(A * A)` by `#(A / A)²` (or vice versa).
    - Convert back using `mulConst_mul_card` and simplify.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Combinatorics.Additive.PluenneckeRuzsa`: Provides Ruzsa triangle inequalities.
  - `Mathlib.Data.Finset.Density`: Defines density of finsets (`A.dens`).
- **Scope extensions**:
  - `Pointwise`: For `*`, `/`, `+`, `-`, `⁻¹` on finsets.
  - `Combinatorics.Additive`: For `σ`, `δ`, `σₘ`, `δₘ` notations.

---

This module formalizes foundational additive combinatorics concepts in Lean 4, with a focus on quantitative measures of structure (doubling/difference constants) and their interplay via classical inequalities like Ruzsa’s triangle inequality.