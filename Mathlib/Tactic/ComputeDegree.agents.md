### Technical Brief: `compute_degree` and `monicity` Tactics in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `compute_degree` | A tactic to solve goals of the form `natDegree f ≤ d`, `degree f ≤ d`, `natDegree f = d`, `degree f = d`, or `coeff f d = r` (when `d` is the degree of `f`). May leave side-goals. |
| `compute_degree!` | Aggressive variant: after `compute_degree`, applies `norm_num`, `norm_cast`, and `assumption` to remaining goals. Reports diagnostic errors if degree computation fails. |
| `monicity` | Tactic to prove `Monic f` by splitting into `natDegree f ≤ n` and `coeff f n = 1`, then calling `compute_degree`. |
| `monicity!` | Aggressive variant: uses `compute_degree!` instead of `compute_degree`. |
| `twoHeadsArgs` | Helper function analyzing goal shape: extracts function (`natDegree`, `degree`, `coeff`), relation (`Eq`, `LE.le`), polynomial head symbol, and metavariable flags. |
| `getCongrLemma` | Returns a congruence lemma (e.g., `coeff_congr`, `natDegree_eq_of_le_of_coeff_ne_zero'`) to preprocess the goal. |
| `dispatchLemma` | Core dictionary: maps goal shape (via `twoHeadsArgs`) to the appropriate *recursion lemma* (e.g., `natDegree_add_le_of_le`, `coeff_mul_add_of_le_natDegree_of_eq_ite`). |
| `try_rfl` | Closes metavariable goals of the form `?_ = x` or `x = ?_` using `rfl`. |
| `splitApply` | Applies `dispatchLemma`-selected lemmas to goals, returning new subgoals and static (non-progressable) goals. |
| `miscomputedDegree?` | Diagnostic function: inspects failed goals to produce human-readable error messages (e.g., “coefficient may be zero”, “term of degree too large”). |

**Key Supporting Theorems (used internally by `compute_degree`):**

| Theorem | Purpose |
|--------|---------|
| `natDegree_C_le`, `natDegree_natCast_le`, `natDegree_zero_le`, `natDegree_one_le` | Handle constant, numeral, zero, and one polynomials (degree ≤ 0). |
| `natDegree_add_le_of_le`, `natDegree_mul_le_of_le`, `natDegree_pow_le_of_le`, `natDegree_sub_le_of_le`, `natDegree_neg_le_of_le`, `natDegree_smul_le_of_le`, `natDegree_monomial_le`, `natDegree_X_le` | Upper bounds for operations on polynomials. |
| `coeff_add_of_eq`, `coeff_mul_add_of_le_natDegree_of_eq_ite`, `coeff_pow_of_natDegree_le_of_eq_ite'`, `coeff_sub_of_eq`, `coeff_neg`, `coeff_smul`, `coeff_monomial`, `coeff_C`, `coeff_X`, `coeff_natCast_ite`, `coeff_intCast_ite` | Exact coefficient formulas for operations. |
| `natDegree_eq_of_le_of_coeff_ne_zero'`, `degree_eq_of_le_of_coeff_ne_zero'` | Convert `≤` + nonzero leading coefficient to equality. |
| `coeff_congr`, `coeff_congr_lhs` | Substitution lemmas for coefficients under equality of indices. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `natDegree_*`, `degree_*`: Lemmas about degrees (e.g., `natDegree_add_le_of_le`, `degree_mul_le_of_le`).
  - `coeff_*`: Lemmas about coefficients (e.g., `coeff_mul_add_of_le_natDegree_of_eq_ite`, `coeff_C`, `coeff_X`).
  - `*_le`: Upper bounds (e.g., `natDegree_C_le`).
  - `*_ite`: Lemmas involving `ite` (if-then-else) for piecewise definitions (e.g., `coeff_natCast_ite`, `coeff_intCast_ite`).
  - `*_of_eq`, `*_of_le`: Conditions based on equalities or inequalities (e.g., `coeff_add_of_eq`, `natDegree_smul_le_of_le`).

- **Suffixes:**
  - `'` (prime): Variant of a lemma with extra metavariable flexibility (e.g., `natDegree_eq_of_le_of_coeff_ne_zero'`).
  - `!` modifier: Aggressive variant of tactic (`compute_degree!`, `monicity!`).

- **Function names:**
  - `twoHeadsArgs`, `getCongrLemma`, `dispatchLemma`, `try_rfl`, `splitApply`, `miscomputedDegree?`: Reflect functional decomposition of the tactic logic.

---

#### **3. Tactic Stack**

Frequently used tactics and tactics in the tactic monad:

| Tactic | Role |
|--------|------|
| `rfl` | Close trivial equalities (especially metavariable assignments). |
| `norm_num`, `norm_cast` | Normalize numerical expressions and coercions (used in `compute_degree!`). |
| `assumption` | Close goals by hypothesis (used in `compute_degree!`). |
| `simp + decide only [...]` | Simplify degree expressions using known equalities (e.g., `Nat.cast_withBot`). |
| `conv_lhs` | Rewrite left-hand side of equations (used in `compute_degree` post-processing). |
| `apply ... <;> compute_degree` | Used in `monicity` to decompose `Monic f`. |
| `split_ifs`, `subst`, `exact`, `apply`, `rcases`, `obtain` | Internal proof steps in lemmas (not tactic-level, but used in lemmas). |

---

#### **4. Proof Logic / Recursion Strategy**

The `compute_degree` tactic follows a **top-down recursive decomposition**:

1. **Goal analysis** (`twoHeadsArgs`):
   - Detects if goal is `≤`, `=`, or `coeff f d = r`.
   - Identifies top-level polynomial constructor (`+`, `*`, `^`, `C a`, `X`, `monomial`, numerals, `fvar`, etc.).

2. **Congruence preprocessing** (`getCongrLemma`, `dispatchLemma`):
   - Applies a lemma to decompose the goal into:
     - `natDegree f ≤ ?_`, `degree f ≤ ?_`, `coeff f ?_ = ?_` (with fresh metavariables),
     - `coeff f m ≠ s` (to be checked later),
     - arithmetic/choice side conditions.

3. **Recursive splitting** (`splitApply`, `try_rfl`):
   - Iteratively applies lemmas to goals until no more progress can be made.
   - Uses `try_rfl` to assign metavariables where possible (e.g., `?n = 3`).

4. **Post-processing**:
   - Simplifies degree expressions (e.g., `max (0 * 1) ...`) using `simp + norm_num`.
   - In `compute_degree!`, applies `norm_num`, `norm_cast`, `assumption` to remaining goals.

5. **Error diagnosis** (`miscomputedDegree?`):
   - If `compute_degree!` leaves goals reducing to `False`, inspects them to produce diagnostics:
     - Coefficient nonzero failure → “coefficient may be zero”.
     - Degree too large → “term of degree too large”.

**Leaf cases** (base cases of recursion):
- `0`, `1`, `C a`, `n : ℕ`, `Int.cast n`, `X`, `monomial a n`: Assign degrees `0`, `0`, `0`, `0`, `0`, `1`, `n`, respectively.

---

#### **5. Imports & Scope**

- **Primary import**:  
  `Mathlib.Algebra.Polynomial.Degree.Lemmas`  
  → Provides foundational lemmas about `natDegree`, `degree`, `coeff`, and their behavior under operations.

- **Scope**:  
  `Mathlib.Tactic.ComputeDegree` (namespace), used internally by Lean’s tactic framework.

- **Dependencies**:
  - `Lean.Elab.Tactic` and `Meta` for tactic implementation.
  - `Polynomial` namespace for `natDegree`, `degree`, `coeff`, `monic_of_natDegree_le_of_coeff_eq_one`, etc.
  - `WithBot` for handling `degree : R[X] → WithBot ℕ`.

---

### Summary

This file implements a **domain-specific automation tactic** for polynomial degree reasoning in Lean 4. It leverages:
- A **structured dictionary** (`dispatchLemma`) to select appropriate lemmas,
- **Metavariable-driven decomposition** to avoid over-estimation,
- **Diagnostic reporting** for robustness,
- And integrates with Lean’s `norm_num` ecosystem for numerical simplification.

It is a mature example of *tactic engineering* in Lean, balancing automation, correctness, and user feedback.