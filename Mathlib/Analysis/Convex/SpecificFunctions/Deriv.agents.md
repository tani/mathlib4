### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `strictConvexOn_pow` | `{n : ℕ} → 2 ≤ n → StrictConvexOn ℝ (Ici 0) (fun x ↦ x ^ n)` | Proves strict convexity of `x^n` on `[0, ∞)` for `n ≥ 2`. |
| `Even.strictConvexOn_pow` | `{n : ℕ} → Even n → n ≠ 0 → StrictConvexOn ℝ Set.univ (fun x ↦ x ^ n)` | Proves strict convexity of `x^n` on all of `ℝ` when `n` is even and nonzero. |
| `strictConvexOn_zpow` | `{m : ℤ} → m ≠ 0 → m ≠ 1 → StrictConvexOn ℝ (Ioi 0) (fun x ↦ x ^ m)` | Proves strict convexity of `x^m` on `(0, ∞)` for integer exponents `m ≠ 0, 1`. |
| `strictConcaveOn_sin_Icc` | `StrictConcaveOn ℝ (Icc 0 π) sin` | Shows `sin` is strictly concave on `[0, π]`. |
| `strictConcaveOn_cos_Icc` | `StrictConcaveOn ℝ (Icc (-(π/2)) (π/2)) cos` | Shows `cos` is strictly concave on `[-π/2, π/2]`. |
| `deriv2_sqrt_mul_log` | `(x : ℝ) → deriv^[2] (fun x ↦ √x * log x) x = -log x / (4 * √x ^ 3)` | Computes second derivative of `√x * log x`. |
| `strictConcaveOn_sqrt_mul_log_Ioi` | `StrictConcaveOn ℝ (Ioi 1) (fun x ↦ √x * log x)` | Uses second derivative sign to prove strict concavity of `√x * log x` on `(1, ∞)`. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `strictConvexOn_`, `strictConcaveOn_`: denote strict convexity/concavity on a set.
  - `deriv`, `deriv2`: denote first and second derivatives.
  - `hasDerivAt_`: used for existence of derivative at a point.
- **Suffixes:**
  - `_pow`, `_zpow`: indicate power functions with natural or integer exponents.
  - `_Ici`, `_Ioi`, `_Icc`, `_Iic`: indicate intervals (`[a, ∞)`, `(a, ∞)`, `[a, b]`, `(-∞, a]`).
- **Other patterns:**
  - `mul`, `div`, `const_mul`, `const_add`: indicate operations on functions (e.g., product, quotient, scalar multiplication/addition).
  - `nonneg`, `pos`, `lt_of_ne`: indicate positivity/nonnegativity lemmas.

#### 3. **Tactic Stack**

- **Core tactics:**
  - `apply`, `rw`, `simp`, `exact`, `refine`, `convert`
- **Analysis-specific:**
  - `deriv_pow'`, `deriv_zpow`, `iter_deriv_zpow`, `deriv_sqrt_mul_log`, `deriv2_sqrt_mul_log`: rewrite rules for derivatives.
  - `continuous_pow`, `continuous_sqrt`, `continuousOn_log`, `continuousOn_sin`, etc.: continuity facts.
  - `convex_Ici`, `convex_Ioi`, `convex_Icc`: convexity of standard intervals.
  - `mul_pos`, `pow_pos`, `sqrt_pos`, `log_pos`, `neg_neg_of_pos`: positivity/negativity reasoning.
- **Algebraic simplification:**
  - `field_simp`, `ring`, `norm_cast`, `fin_cases`, `rcases`, `induction`
- **Set/interval reasoning:**
  - `mem_Ioi`, `mem_Icc`, `interior_Icc`, `interior_Ici`, `subset_univ`, `mono`

#### 4. **Proof Logic**

- **Strategy:** Most proofs follow a *second-derivative test* pattern:
  1. Show convexity/concavity of domain (e.g., `convex_Ioi 0`).
  2. Establish continuity of the function.
  3. Compute or bound the second derivative.
  4. Show the second derivative is positive (for convexity) or negative (for concavity) on the interior.
- **Inductive arguments** appear in auxiliary lemmas like `int_prod_range_nonneg`, using induction on `n` with parity assumptions (`Even n`).
- **Case analysis** on order (`le_or_lt`, `lt_or_le`) and membership (`mem_Ico`, `Finset.mem_range`) is common.
- **Rewriting via derivative lemmas** (`deriv_pow'`, `iter_deriv_zpow`, `deriv2_sqrt_mul_log`) is central to the main convexity/concavity proofs.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Deriv.ZPow`: derivatives of `x ^ m` for `m : ℤ`.
- `Mathlib.Analysis.SpecialFunctions.Sqrt`: properties of square root, including differentiability.
- `Mathlib.Analysis.SpecialFunctions.Log.Deriv`: derivative of `log`.
- `Mathlib.Analysis.SpecialFunctions.Trigonometric.Deriv`: derivatives of `sin`, `cos`.
- `Mathlib.Analysis.Convex.Deriv`: tools for proving convexity/concavity via derivatives (e.g., `strictConvexOn_of_deriv2_pos'`, `strictConcaveOn_of_deriv2_neg`).

---

This module focuses on *derivative-based convexity/concavity proofs* for elementary functions, leveraging Lean’s analysis library for smooth calculus and convex geometry.