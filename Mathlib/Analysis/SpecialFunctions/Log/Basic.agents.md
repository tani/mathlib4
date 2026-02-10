### Technical Metadata Brief: `Mathlib.Analysis.SpecialFunctions.Log`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `log : ℝ → ℝ` | `def log (x : ℝ) : ℝ` | Real logarithm, defined as `expOrderIso.symm ⟨|x|, ...⟩` for `x ≠ 0`, and `0` at `0`. |
| `log_of_ne_zero` | `x ≠ 0 → log x = expOrderIso.symm ⟨|x|, ...⟩` | Simplifies `log x` when `x ≠ 0`. |
| `log_of_pos` | `0 < x → log x = expOrderIso.symm ⟨x, hx⟩` | Special case of `log` on positive reals. |
| `exp_log_eq_abs` | `x ≠ 0 → exp (log x) = |x|` | Inverse relationship between `exp` and `log`. |
| `log_exp` | `log (exp x) = x` | `log` is a left-inverse of `exp`. |
| `log_mul` | `x ≠ 0 ∧ y ≠ 0 → log (x * y) = log x + log y` | Logarithmic identity for multiplication. |
| `log_div` | `x ≠ 0 ∧ y ≠ 0 → log (x / y) = log x - log y` | Logarithmic identity for division. |
| `log_pow` | `log (x ^ n) = n * log x` | Logarithm of powers (natural exponent). |
| `log_zpow` | `log (x ^ n) = n * log x` | Extends `log_pow` to integer exponents. |
| `log_le_log_iff` | `0 < x ∧ 0 < y → log x ≤ log y ↔ x ≤ y` | Monotonicity equivalence. |
| `log_lt_log_iff` | `0 < x ∧ 0 < y → log x < log y ↔ x < y` | Strict monotonicity equivalence. |
| `log_pos_iff` | `0 < x → 0 < log x ↔ 1 < x` | Positivity criterion for `log x`. |
| `log_neg_iff` | `0 < x → log x < 0 ↔ x < 1` | Negativity criterion for `log x`. |
| `log_eq_zero` | `log x = 0 ↔ x = 0 ∨ x = 1 ∨ x = -1` | Characterization of zeros of `log`. |
| `log_nat_eq_sum_factorization` | `log n = ∑ p in n.factorization, t * log p` | Log of natural number in terms of prime factorization. |
| `continuous_log` | `Continuous fun x : {x // x ≠ 0} => log x` | Continuity of `log` on nonzero reals. |
| `tendsto_log_atTop` | `Tendsto log atTop atTop` | `log x → ∞` as `x → ∞`. |
| `tendsto_log_nhdsWithin_zero` | `Tendsto log (𝓝[≠] 0) atBot` | `log x → -∞` as `x → 0` (nonzero). |
| `isLittleO_log_id_atTop` | `log =o[atTop] id` | `log x` grows strictly slower than `x`. |
| `expPartialHomeomorph` | `PartialHomeomorph ℝ ℝ` | `exp` and `log` form a partial homeomorphism between `ℝ` and `Ioi 0`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `log_`: Core definitions and properties (`log_mul`, `log_div`, `log_pow`, `log_exp`, etc.)
  - `log_nonneg`, `log_pos`, `log_neg`, `log_nonpos`: Sign properties.
  - `log_le_log`, `log_lt_log`: Monotonicity lemmas.
  - `log_eq_zero`, `log_ne_zero`: Zero/nonzero characterizations.
  - `log_natCast_nonneg`, `log_intCast_nonneg`: For casts from `ℕ`, `ℤ`.
  - `log_prod`, `log_zpow`, `log_sqrt`: Structural properties.

- **Suffixes**:
  - `_iff`: Equivalence statements (`log_le_log_iff`, `log_pos_iff`, etc.)
  - `_of_pos`, `_of_lt_zero`, `_of_ne_zero`: Hypothesis-specific variants.
  - `_cast`: For results about `log` of casts (`log_natCast_nonneg`, `log_intCast_nonneg`).
  - `_atTop`, `_atBot`: Asymptotic behavior (`tendsto_log_atTop`, `tendsto_log_nhdsWithin_zero`).

- **Special**:
  - `log_abs`, `log_neg_eq_log`: Symmetry properties (`log |x| = log x`, `log (-x) = log x`).
  - `log_le_sub_one_of_pos`, `one_sub_inv_le_log_of_pos`: Inequalities bounding `log`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions, e.g., `log_of_ne_zero`, `exp_log`, `log_mul`. |
| `simp` | Simplifying using `@[simp]` lemmas (`log_zero`, `log_one`, `log_abs`, etc.). |
| `exact` / `apply` | Applying known theorems (e.g., `exp_injective`, `log_injOn_pos`). |
| `linarith` | Handling linear inequalities (e.g., `log_le_sub_one_of_pos`). |
| `congr` / `congr'` | Congruence reasoning, especially in continuity/tendsto proofs. |
| `aesop` | Automated reasoning in positivity and inequality proofs (e.g., `isLittleO_const_log_atTop`). |
| `filter_upwards` | For filter/tendsto arguments. |
| `rcases` / `cases` | Case analysis on `lt_trichotomy`, `eq_or_ne`, etc. |
| `induction'` | Induction on `ℕ`, `ℤ`, or `Finset`. |
| `convert` / `refine` | Refining goals using known equalities. |
| `norm_num` (via `NormNum`) | In positivity tactic extensions (`evalLogNatLit`). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a pattern:  
    `rw [definition] → simplify using known lemmas → apply injectivity/monotonicity → conclude`.
  - Many proofs use `exp_injective` to reduce to proving equality after applying `exp`.
  - Symmetry properties (`log_abs`, `log_neg_eq_log`) are used to reduce to the positive case.
  - Continuity proofs often reduce to continuity of `expOrderIso.symm` and `abs`.
  - Asymptotic results (`tendsto_log_atTop`, `isLittleO_log_id_atTop`) use composition with `exp` and known asymptotics of `exp`.

- **Common proof patterns**:
  - **Case analysis**: `by_cases h : x = 0`, `lt_trichotomy x 0`.
  - **Reduction to positive reals**: via `log_abs`, `log_neg_eq_log`.
  - **Monotonicity**: via `log_le_log_iff`, `log_lt_log_iff`, `strictMonoOn_log`.
  - **Injectivity**: via `log_injOn_pos`, `exp_injective`.
  - **Factorization**: for `log_nat_eq_sum_factorization`, using `Finsupp.log_prod`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Exp` | Defines `exp`, `expOrderIso`, and basic properties. |
| `Mathlib.Data.Nat.Factorization.Defs` | For `n.factorization`, used in `log_nat_eq_sum_factorization`. |
| `Mathlib.Analysis.NormedSpace.Real` | For topological and normed space structure on `ℝ`. |
| `Mathlib.Data.Rat.Cast.CharZero` | Ensures `ℚ` embeds into `ℝ`, used in positivity tactic extensions. |

---

#### **6. Additional Notes**

- **Conventions**:
  - `log 0 = 0`, `log (-x) = log x`: unconventional but enables `log (x * y) = log x + log y` for all nonzero `x, y`.
  - Domain of continuity/differentiability is `ℝ \ {0}`.
  - Differentiability is not explicitly treated here (would require `Mathlib.Analysis.Calculus.Deriv.Log`).

- **Tactic Extensions**:
  - `positivity` tactic support via `evalLogNatCast`, `evalLogIntCast`, `evalLogNatLit`.
  - Uses `NormNum` to evaluate numeric literals and decide positivity/zero/nonnegativity.

--- 

Let me know if you'd like a dependency graph, a list of missing properties (e.g., differentiability), or a comparison with `Complex.log`.