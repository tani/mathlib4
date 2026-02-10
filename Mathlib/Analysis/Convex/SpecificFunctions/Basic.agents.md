Here's a structured **technical metadata brief** extracted from the provided Lean 4 file:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `strictConvexOn_exp` | `StrictConvexOn ℝ univ exp` | Proves `exp` is strictly convex on all ℝ. |
| `convexOn_exp` | `ConvexOn ℝ univ exp` | Consequence: `exp` is convex (from strict convexity). |
| `strictConcaveOn_log_Ioi` | `StrictConcaveOn ℝ (Ioi 0) log` | `log` is strictly concave on `(0, ∞)`. |
| `strictConcaveOn_log_Iio` | `StrictConcaveOn ℝ (Iio 0) log` | `log` is strictly concave on `(-∞, 0)`. |
| `one_add_mul_self_lt_rpow_one_add` | `1 < p ∧ -1 ≤ s ∧ s ≠ 0 ⇒ 1 + p * s < (1 + s)^p` | Strict Bernoulli inequality for `p > 1`. |
| `one_add_mul_self_le_rpow_one_add` | `1 ≤ p ∧ -1 ≤ s ⇒ 1 + p * s ≤ (1 + s)^p` | Non-strict Bernoulli inequality for `p ≥ 1`. |
| `rpow_one_add_lt_one_add_mul_self` | `0 < p < 1 ∧ -1 ≤ s ∧ s ≠ 0 ⇒ (1 + s)^p < 1 + p * s` | Strict Bernoulli inequality for `0 < p < 1`. |
| `rpow_one_add_le_one_add_mul_self` | `0 ≤ p ≤ 1 ∧ -1 ≤ s ⇒ (1 + s)^p ≤ 1 + p * s` | Non-strict Bernoulli inequality for `0 ≤ p ≤ 1`. |
| `strictConvexOn_rpow` | `1 < p ⇒ StrictConvexOn ℝ (Ici 0) (λ x ↦ x ^ p)` | `x ↦ x^p` is strictly convex on `[0, ∞)` for `p > 1`. |
| `convexOn_rpow` | `1 ≤ p ⇒ ConvexOn ℝ (Ici 0) (λ x ↦ x ^ p)` | `x ↦ x^p` is convex on `[0, ∞)` for `p ≥ 1`. |
| `exp_mul_le_cosh_add_mul_sinh` | `|t| ≤ 1 ⇒ exp(t * x) ≤ cosh x + t * sinh x` | Intermediate inequality used in analysis (e.g., interpolation). |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `strictConvexOn_`, `convexOn_`, `strictConcaveOn_`: indicate convexity/concavity type and domain.
  - `one_add_mul_self_`, `rpow_one_add_`: refer to expressions like `1 + p * s` vs `(1 + s)^p`.
- **Suffixes**:
  - `_Ioi`, `_Iio`, `_Ici`: denote intervals `(a, ∞)`, `(-∞, a)`, `[a, ∞)` respectively.
  - `_le`, `_lt`: distinguish non-strict vs strict inequalities.
  - `_adjacent`, `_secant_strict_mono`: used in slope-based convexity proofs.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `linarith`: for linear arithmetic over ordered fields.
- `gcongr`: for monotonicity arguments (e.g., `exp` is increasing).
- `field_simp`, `ring`, `ring_nf`: algebraic simplifications and normalizations.
- `rw`, `convert`, `simp_rw`: rewriting using lemmas, especially with `log`, `exp`, `rpow`.
- `rcases`, `cases'`: case analysis on disjunctions (`eq_or_lt_of_le`, `lt_or_gt_of_ne`, etc.).
- `contrapose!`: for contrapositive reasoning (e.g., to prove inequality by contradiction).
- ` positivity`: to discharge positivity goals (e.g., `0 < 1 + s`).
- `apply strictConvexOn_of_slope_strict_mono_adjacent`: core proof strategy for convexity via monotone slopes.

---

### 🔹 **Proof Logic / Strategy**

- **Core technique**: Prove (strict) convexity/concavity via **monotonicity of secant slopes**, not via second derivatives.
  - Use lemmas like `strictConvexOn_of_slope_strict_mono_adjacent`, `strictConcaveOn_of_slope_strict_anti_adjacent`.
- **Bernoulli inequalities**:
  - Prove strict version first using `log_lt_sub_one_of_pos` and slope strict monotonicity of `log`.
  - Derive non-strict version via continuity or density (e.g., `eq_or_lt_of_le`, `by_cases s = 0`).
- **Power functions**:
  - Reduce to Bernoulli inequality via algebraic manipulation of difference quotients.
  - Use identities like `x^p = exp(p * log x)` for `x > 0`, and handle `x = 0` separately.
- **Logarithm on negative reals**:
  - Use identity `log x = log (-x)` for `x < 0`, reducing to `Ioi 0` case.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Slope` | Core convexity machinery (slope-based criteria). |
| `Mathlib.Analysis.SpecialFunctions.Pow.Real` | Definitions and basic properties of real exponentiation (`rpow`). |
| `Mathlib.Tactic.LinearCombination` | For linear combination tactics (used in convexity proofs). |

Additional implicit dependencies:
- `Real`, `Set`, `NNReal`: opened namespaces for real analysis and set operations.
- `exp`, `log`, `rpow`, `cosh`, `sinh`: defined in `Mathlib.Analysis.SpecialFunctions.Exp`, `Log`, `Pow`.

---

Let me know if you'd like a **dependency graph**, **proof outline diagram**, or **formalization notes** for teaching/teaching assistants.