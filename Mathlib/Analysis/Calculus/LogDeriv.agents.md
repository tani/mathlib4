### Technical Metadata Brief: Logarithmic Derivatives in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `logDeriv` | `logDeriv (f : 𝕜 → 𝕜') := deriv f / f` | Defines the logarithmic derivative of a function as `deriv f / f`. |
| `logDeriv_apply` | `logDeriv f x = deriv f x / f x` | Unfolds the definition at a point. |
| `logDeriv_eq_zero_of_not_differentiableAt` | `¬DifferentiableAt f x → logDeriv f x = 0` | Shows that if `f` is not differentiable at `x`, then `logDeriv f x = 0`. |
| `logDeriv_id` / `logDeriv_id'` | `logDeriv id x = 1 / x` | Logarithmic derivative of identity function. |
| `logDeriv_const` | `logDeriv (const a) = 0` | Logarithmic derivative of a constant function is zero. |
| `logDeriv_mul` | Under nonzero & differentiability assumptions: `logDeriv (f * g) x = logDeriv f x + logDeriv g x` | Logarithmic derivative turns multiplication into addition. |
| `logDeriv_div` | Under nonzero & differentiability assumptions: `logDeriv (f / g) x = logDeriv f x − logDeriv g x` | Logarithmic derivative turns division into subtraction. |
| `logDeriv_mul_const` / `logDeriv_const_mul` | `logDeriv (f * a) x = logDeriv f x` (for `a ≠ 0`) | Scaling by a nonzero constant doesn’t affect logarithmic derivative. |
| `logDeriv_prod` | `logDeriv (∏ i ∈ s, f i) x = ∑ i ∈ s, logDeriv (f i) x` | Logarithmic derivative of finite product is sum of logarithmic derivatives. |
| `logDeriv_fun_zpow` | `logDeriv (f ^ n) x = n • logDeriv f x` (for `n : ℤ`) | Chain rule for integer powers. |
| `logDeriv_fun_pow` | Same as above for `n : ℕ`. | Special case of `logDeriv_fun_zpow`. |
| `logDeriv_zpow` / `logDeriv_pow` | `logDeriv (· ^ n) x = n / x` | Logarithmic derivative of power function. |
| `logDeriv_inv` | `logDeriv (·⁻¹) x = -1 / x` | Logarithmic derivative of inversion. |
| `logDeriv_comp` | `logDeriv (f ∘ g) x = logDeriv f (g x) * deriv g x` | Chain rule for logarithmic derivative. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `logDeriv_`: Standard prefix for all logarithmic derivative–related definitions and lemmas.
  - `mul_`, `div_`, `const_`, `inv_`, `zpow_`, `pow_`: Reflect the operation being analyzed.
- **Suffixes**:
  - `_apply`: For pointwise evaluation lemmas.
  - `_id`, `_id'`: Identity function variants.
  - `_const`: Constant function case.
  - `_mul`, `_div`, `_prod`: Algebraic structure behavior.
  - `_fun_`: When the base function is arbitrary (e.g., `logDeriv_fun_zpow`).
  - `_zpow`, `_pow`: Integer vs natural exponent variants.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

- `simp` / `simp_rw`: Simplification with definitions and lemmas (especially `logDeriv_apply`, `deriv_*`, field arithmetic).
- `field_simp`: To simplify division expressions, especially with nonzero assumptions.
- `ring`: To handle algebraic simplifications after field simplification.
- `rw`: Rewriting using lemmas like `deriv_mul`, `deriv_div`, `deriv_comp`, `deriv_zpow`.
- `induction ... using Finset.cons_induction`: For finite product sum lemmas.
- `rcases eq_or_ne ... with rfl | hn`: Case analysis on equality or inequality (e.g., `n = 0`, `f x = 0`).
- `fun_prop`: Propagation of differentiability goals (used in `logDeriv_fun_zpow`).
- `mod_cast`: To cast between `ℕ` and `ℤ` versions of lemmas.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern: unfold `logDeriv_apply`, apply known derivative rules (`deriv_mul`, `deriv_div`, `deriv_comp`, `deriv_zpow`), then simplify using field arithmetic.
  - For algebraic properties (e.g., product, quotient), use induction (`Finset.cons_induction`) and combine base cases with `logDeriv_mul`/`logDeriv_div`.
  - For power rules (`zpow`, `pow`), case split on exponent (`n = 0` vs `n ≠ 0`) and on value at point (`f x = 0` vs `f x ≠ 0`).
  - Chain rule (`logDeriv_comp`) is proven directly via `deriv_comp` and ring simplification.

- **Key Logical Flow**:
  1. Unfold `logDeriv`.
  2. Apply derivative rules.
  3. Use `field_simp` to eliminate denominators under nonzero assumptions.
  4. Apply `ring` to finish algebraic simplifications.

---

#### **5. Imports**

- `Mathlib.Analysis.Calculus.Deriv.ZPow`: Provides derivative rules for integer powers (`deriv_zpow`, `differentiableAt_zpow`, etc.), essential for `logDeriv_fun_zpow` and `logDeriv_zpow`.

- Implicit dependencies (via `NontriviallyNormedField`, `NormedAlgebra`):
  - General calculus over normed fields (e.g., `ℝ`, `ℂ`).
  - Ensures `deriv` is well-defined and behaves as expected.

---

#### **Domain-Specific AI Agent Notes**

- **Target Domain**: Real/complex analysis, differential calculus, especially symbolic manipulation of derivatives.
- **Use Cases**:
  - Proving identities involving logarithmic derivatives.
  - Automating simplifications in calculus (e.g., in ODEs, complex analysis).
  - Supporting formalization of complex logarithms, argument principle, or residue calculus.
- **Strengths**:
  - Handles algebraic structure (multiplicative group, division, powers).
  - Robust under differentiability/nonzero assumptions.
- **Limitations**:
  - Assumes nonzero values at points (e.g., `f x ≠ 0`, `g x ≠ 0`) — no automatic handling of singularities.
  - No explicit logarithm function involved (despite the name “logarithmic derivative”).

--- 

Let me know if you'd like a tactic automation strategy or a tactic script generator for this module.