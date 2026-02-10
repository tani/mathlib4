### Technical Metadata Brief: `Mathlib.Data.ENNReal.Real` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `ENNReal.toReal : ℝ≥0∞ → ℝ` | Converts an extended non-negative real to a real number (0 if input is `∞`). |
| `ENNReal.ofReal : ℝ → ℝ≥0∞` | Embeds a real number into `ℝ≥0∞` as an extended non-negative real. |
| `ENNReal.toNNReal : ℝ≥0∞ → ℝ≥0` | Converts to a non-negative real (0 if input is `∞`). |
| `ENNReal.toRealHom` | Monoid homomorphism from `ℝ≥0∞` to `ℝ`, induced by `toReal`. |
| `ENNReal.toNNRealHom` | Monoid homomorphism from `ℝ≥0∞` to `ℝ≥0`, induced by `toNNReal`. |
| `trichotomy` | `p = 0 ∨ p = ∞ ∨ 0 < p.toReal` — fundamental case analysis on `p : ℝ≥0∞`. |
| `dichotomy` | Under assumption `1 ≤ p`, gives `p = ∞ ∨ 1 ≤ p.toReal`. |
| `toReal_add`, `toReal_sub_of_le`, `toReal_max`, `toReal_min`, `toReal_mul`, `toReal_pow`, `toReal_prod` | Preservation of algebraic/lattice operations under `toReal`, under finiteness assumptions. |
| `ofReal_add`, `ofReal_mul`, `ofReal_pow`, `ofReal_prod_of_nonneg` | Preservation of algebraic operations under `ofReal`, under non-negativity assumptions. |
| `toReal_le_add`, `toReal_le_add'` | Triangle inequality transfer from `ℝ≥0∞` to `ℝ`. |
| `toReal_iInf`, `toReal_sInf`, `toReal_iSup`, `toReal_sSup` | Interchange of `toReal` with indexed/ set infima/suprema (when all elements are finite). |
| `toNNReal_iInf`, `toNNReal_sInf`, `toNNReal_iSup`, `toNNReal_sSup` | Same as above for `toNNReal`. |
| `ofReal_le_ofReal_iff`, `ofReal_lt_ofReal_iff`, `ofReal_eq_ofReal_iff` | Characterizations of order/equality between `ofReal` values. |
| `ofReal_le_iff_le_toReal`, `ofReal_lt_iff_lt_toReal`, `le_ofReal_iff_toReal_le`, `lt_ofReal_iff_toReal_lt` | Adjunction-like relations between `ofReal` and `toReal`. |
| `ofReal_inv_of_pos`, `ofReal_div_of_pos` | Compatibility with division/inversion for positive reals. |
| `ofReal_pos`, `ofReal_eq_zero`, `ofReal_lt_natCast`, `ofReal_le_natCast`, etc. | Simplification lemmas for comparisons with naturals. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toReal_`, `toNNReal_`, `ofReal_`: indicate operations involving conversion functions.
  - `iInf_`, `sInf_`, `iSup_`, `sSup_`: indicate behavior with infima/suprema.
  - `add_`, `mul_`, `sub_`, `pow_`, `prod_`, `sup_`, `inf_`, `max_`, `min_`: indicate algebraic/lattice structure compatibility.

- **Suffixes**:
  - `_le`, `_lt`, `_eq`: indicate inequality/equality lemmas.
  - `_iff`: indicate biconditional characterizations.
  - `_mono`, `_strict_mono`: monotonicity/strict monotonicity.
  - `_of_`: often indicates preconditions (e.g., `ofReal_add` requires non-negativity).
  - `__iff_toReal_`, `_iff_ofReal_`: relate order/equality via `toReal`/`ofReal`.

- **Special**:
  - `hom`: indicates a structure-preserving map (e.g., `toRealHom`, `toNNRealHom`).
  - `pos`, `nonneg`: used in assumptions (e.g., `ofReal_pos`, `ofReal_mul` with `0 ≤ p`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `lift` | Lifts finite elements of `ℝ≥0∞` to `ℝ≥0` (via `ne_top`). |
| `simp only [...]` | Simplify using precise lemmas (often with `← coe_...`, `coe_toReal`, etc.). |
| `norm_cast` | Handles coercion simplifications (e.g., `↑(a : ℝ) = a`). |
| `rwa` | Rewrite + assumption (used in `↔` proofs). |
| `exact`, `refine`, `apply` | Direct proof steps. |
| `le_antisymm` | Prove equality via double inequality. |
| `induction'` / `induction` | Structural or arithmetic induction (e.g., on `Finset`, `ℕ`). |
| `rcases` / `cases` | Case analysis on disjunctions or equalities (e.g., `eq_or_ne`, `eq_or_lt_of_le`). |
| `simp_rw` | Simplify with rewrite rules (especially for `Finset` products/sums). |
| `mod_cast` | Cast inequalities/equalities between `ℝ` and `ℕ` (e.g., `ofReal_lt_natCast`). |
| `aesop`, `linarith`, `ring` | Not heavily used here — proofs are mostly structural/simplification-based. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *case analysis* pattern on whether elements are `0`, `∞`, or finite (`≠ ∞`).
  - For finite elements, use `lift` to `ℝ≥0`, then apply known lemmas about `NNReal`/`ℝ`.
  - For lattice/inf-sup operations, reduce to `iInf`/`iSup` over functions, then use `toReal_coe`/`toNNReal_coe` and properties of `NNReal`.
  - For `ofReal`, rely on `Real.toNNReal_*` lemmas and coercion injectivity (`coe_inj`, `coe_le_coe`, `coe_lt_coe`).
  - Monoid homomorphism lemmas (`toReal_mul`, `toReal_pow`, etc.) are proven via `map_*` lemmas of the homomorphism definitions.

- **Common Flow**:
  1. Eliminate `∞` cases via `if ... then ... else`.
  2. Use `lift` to reduce to `NNReal`.
  3. Apply `coe_*` lemmas to transfer to `ℝ`/`NNReal`.
  4. Use `norm_cast`, `simp`, or `rwa` to finish.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.ENNReal.Inv` | Defines inversion on `ℝ≥0∞`, needed for division/inversion lemmas. |
| `Mathlib.Tactic.Bound.Attribute` | Enables `bound` attribute (used in `@[bound]` annotations like `ofReal_pos`). |
| `Mathlib.Data.ENNReal.Basic` | Defines `toReal`, `ofReal`, `toNNReal`, basic algebra/lattice structure (not directly imported, but assumed). |
| `Mathlib.Data.Set.Image`, `Mathlib.Data.Set.Basic` | Used in `sInf_sSup` lemmas involving images of sets. |
| `Mathlib.Data.NNReal.Basic`, `Mathlib.Data.NNReal.Infinite`, `Mathlib.Data.NNReal.Real` | Underlie `toNNReal` and `NNReal.toReal`, especially for coercion and algebra. |
| `Mathlib.Data.Real.Basic`, `Mathlib.Data.Real.NNReal` | For `Real.toNNReal`, `Real.toNNReal_*` lemmas. |
| `Mathlib.Data.Finset.Basic`, `Mathlib.Data.Finset.Supp`, `Mathlib.Data.Finset.Sum` | For `prod`, `sum`, `iInf_iSup` over finite sets. |

---

#### **6. Domain-Specific AI Agent Notes**

- **Focus**: This module is central to *measure theory* and *integration theory* in Mathlib, especially for handling extended non-negative reals in `WithLp`, `lp` spaces, and Bochner integration.
- **Key Use Cases**:
  - Transferring triangle inequalities from `ℝ≥0∞` to `ℝ`.
  - Simplifying expressions involving `toReal`/`ofReal` in proofs about integrals, measures, or norms.
  - Reasoning about limits/suprema/infima in `ℝ≥0∞` via real-valued approximations.
- **Tactics to Prioritize**:
  - `lift`, `simp only`, `rwa`, `rcases`, `le_antisymm`, `mod_cast`.
- **Common Pitfalls**:
  - Forgetting `≠ ∞` hypotheses (e.g., `toReal_add` requires both arguments finite).
  - Confusing `toReal` (returns `0` at `∞`) vs `toNNReal` (same behavior).
  - Misapplying `ofReal` to negative reals (it maps them to `0`).

--- 

Let me know if you'd like a dependency graph, usage examples, or a tactic automation guide for this module.