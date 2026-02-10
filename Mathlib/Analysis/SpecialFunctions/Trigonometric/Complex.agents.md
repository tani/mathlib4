### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `cos_eq_zero_iff` | `cos θ = 0 ↔ ∃ k : ℤ, θ = (2 * k + 1) * π / 2` | Characterizes zeros of complex cosine. |
| `sin_eq_zero_iff` | `sin θ = 0 ↔ ∃ k : ℤ, θ = k * π` | Characterizes zeros of complex sine. |
| `tan_eq_zero_iff` | `tan θ = 0 ↔ ∃ k : ℤ, k * π / 2 = θ` | Zeros of complex tangent (accounts for junk value at poles). |
| `tan_eq_zero_iff'` | `cos θ ≠ 0 ⇒ tan θ = 0 ↔ ∃ k : ℤ, k * π = θ` | Zeros of tangent where defined (i.e., away from poles). |
| `cos_eq_cos_iff` | `cos x = cos y ↔ ∃ k : ℤ, y = 2kπ ± x` | Equality condition for complex cosine. |
| `sin_eq_sin_iff` | `sin x = sin y ↔ ∃ k : ℤ, y = 2kπ + x ∨ y = (2k+1)π - x` | Equality condition for complex sine. |
| `cos_eq_one_iff`, `cos_eq_neg_one_iff`, `sin_eq_one_iff`, `sin_eq_neg_one_iff` | Characterizations of points where trig functions attain extremal values. | Useful for solving equations like `cos z = 1`. |
| `tan_add`, `tan_add'`, `tan_two_mul`, `tan_add_mul_I`, `tan_eq` | Tangent addition formulas, double-angle, and decomposition into real/imag parts. | Enables algebraic manipulation and analysis of complex tangent. |
| `continuous_tan`, `continuousOn_tan` | Continuity of tangent on its domain (`{x | cos x ≠ 0}`). | Topological properties needed for analysis. |
| `cos_surjective`, `sin_surjective` | Surjectivity of complex cosine and sine onto ℂ. | Shows complex trig functions are onto ℂ (unlike real case). |
| `range_cos`, `range_sin` | `range cos = univ`, `range sin = univ`. | Immediate corollary of surjectivity. |
| `cos_eq_iff_quadratic` | `cos z = w ↔ exp(iz)² - 2w·exp(iz) + 1 = 0` | Connects cosine to quadratic equation in exponential form. |

#### 2. **Naming Conventions**

- **Predicate-style**: `*_eq_zero_iff`, `*_ne_zero_iff`, `*_eq_*_iff`, `*_surjective`, `range_*`
- **Logical equivalence**: `*_iff` suffix (e.g., `cos_eq_zero_iff`)
- **Negated predicates**: `*_ne_zero_iff`
- **Quantifier-based**: `*_iff` often uses `∃ k : ℤ` or `∀ k : ℤ`
- **Specialized variants**: `'` suffix for refined versions (e.g., `tan_eq_zero_iff'`)
- **Decomposition**: `*_mul_I`, `*_add_mul_I`, `*_eq` for real/imag decomposition

#### 3. **Tactic Stack**

Frequently used tactics:
- `rw` — rewriting using equivalences and definitions
- `simp` / `simp only` — simplification with lemmas and congruences
- `field_simp` — simplifying field expressions (especially division)
- `ring` / `ring_nf` — simplifying polynomial expressions
- `exact_mod_cast`, `mod_cast` — transporting results from ℂ to ℝ
- `convert` — flexible equality proof construction
- `rcases`, `obtain`, `rintro` — destructuring existential/universal hypotheses
- `exists_congr`, `or_congr`, `and_congr` — congruence for quantifiers/logical ops
- `nontriviality`, `norm_num` — normalization of numeric goals
- `div_self`, `div_eq_iff`, `mul_right_inj'`, `mul_ne_zero` — field arithmetic lemmas

#### 4. **Proof Logic**

- **Structure**: Most proofs follow a pattern:
  1. Expand definitions (`cos`, `sin`, `tan` via exponential).
  2. Reduce to known facts (e.g., `exp_eq_exp_iff_exists_int`, quadratic solvability).
  3. Use algebraic manipulation (`ring`, `field_simp`) to isolate conditions.
  4. Apply logical equivalences (`exists_congr`, `or_congr`) to restructure quantifiers.
  5. For continuity/surjectivity: use topological lemmas (`continuousOn_iff_continuous_restrict`, `range_eq`).
- **Inductive/Case-based reasoning** appears in `tan_add`, where cases split on whether arguments are poles or not.
- **Surjectivity proofs** rely on solving quadratic equations derived from `cos_eq_iff_quadratic`.

#### 5. **Imports**

- `Mathlib.Algebra.QuadraticDiscriminant`: Used for solving quadratic equations over ℂ (e.g., in `cos_surjective`).
- `Mathlib.Analysis.SpecialFunctions.Pow.Complex`: Provides complex power/exponential machinery (e.g., `cpow_nat_inv_pow`, `exp_log`, `exp_ne_zero`).
- Standard imports implied via `Complex`, `Real`, `Set`, `Filter`, `Topology`, `Real` scopes.

---

This module serves as a foundational reference for complex trigonometric identities, zeros, periodicity, continuity, and surjectivity — crucial for extending real trigonometric analysis to the complex plane.