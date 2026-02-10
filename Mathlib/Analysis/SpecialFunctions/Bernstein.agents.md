### Technical Metadata Brief: Bernstein Approximations and Weierstrass’ Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `bernstein` | `ℕ → ℕ → C(I, ℝ)` | The *Bernstein basis polynomials* as continuous functions on the unit interval `I = [0,1]`. |
| `bernstein_apply` | `∀ n ν x, bernstein n ν x = (n.choose ν) * x^ν * (1 - x)^(n - ν)` | Explicit evaluation formula for `bernstein`. |
| `bernstein_nonneg` | `∀ n ν x, 0 ≤ bernstein n ν x` | Positivity of Bernstein basis functions. |
| `bernstein.probability` | `∀ n x, ∑ k, bernstein n k x = 1` | Normalization: the Bernstein basis forms a probability distribution over `k` for fixed `x`. |
| `bernstein.variance` | `∀ n > 0 x, ∑ k, (x - k/n)^2 * bernstein n k x = x(1 - x)/n` | Variance identity for the binomial-like distribution induced by `bernstein`. |
| `z` / `k/ₙ` | `Fin (n+1) → I` | Embedding `k ↦ k/n` into the unit interval. |
| `δ` | `C(I, ℝ) → ℝ⁺ → ℝ⁺ → ℝ` | Modulus of uniform continuity: chosen so `|f(x) - f(y)| < ε/2` when `|x - y| < δ`. |
| `S` | `C(I, ℝ) → ℝ⁺ → ℝ⁺ → ℕ → I → Finset (Fin (n+1))` | Index set of `k` such that `k/n` is within `δ` of `x`. |
| `lt_of_mem_S` | `k ∈ S ⇒ |f(k/n) - f x| < ε/2` | Uniform continuity control on the “good” set `S`. |
| `le_of_mem_S_compl` | `k ∉ S ⇒ 1 ≤ δ⁻²·(x - k/n)²` | Tail control via Chebyshev-type inequality on `Sᶜ`. |
| `bernsteinApproximation` | `ℕ → C(I, ℝ) → C(I, ℝ)` | `n`-th Bernstein approximation: `∑ k, f(k/n)·bernstein n k`. |
| `bernsteinApproximation_uniform` | `∀ f, tendsto (bernsteinApproximation n f) atTop (𝓝 f)` | Main theorem: uniform convergence of Bernstein approximants to `f`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bernstein*`: all core objects related to Bernstein polynomials/approximations.
  - `δ`, `S`, `z`: short, context-specific identifiers for auxiliary constructions.
- **Suffixes**:
  - `_apply`: evaluation lemma.
  - `_nonneg`, `_pos`: positivity properties.
  - `_compl`: complement set reasoning.
  - `_uniform`: convergence statement.
- **Notation**:
  - `k/ₙ`: postfix notation for `z k`, i.e., `k/n ∈ I`.
  - `δ f ε h`, `S f ε h n x`: dependent on function `f`, tolerance `ε`, and point `x`.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification of sums, evaluations, and algebraic expressions. |
| `gcongr` | Goal-directed congruence for inequalities (especially in `calc` blocks). |
| `unit_interval` | Proves basic facts about `x ∈ [0,1]` (e.g., `0 ≤ x`, `0 ≤ 1 - x`). |
| `field_simp`, `ring`, `linarith` | Algebraic manipulation and inequality solving. |
| `filter_upwards` | Handling filter-based convergence (`Tendsto` proofs). |
| `convert` / `congr 1` | Matching up expressions with minor syntactic differences. |
| ` positivity` (custom extension) | Proves non-negativity of `bernstein` terms via `PositivityExt`. |
| `rw [Finset.sum_add_sum_compl]` | Splitting sums over subsets and complements. |

---

#### **4. Proof Logic**

The proof of `bernsteinApproximation_uniform` follows a standard *ε/2* argument with a **probabilistic intuition**:

1. **Setup**:
   - Fix `ε > 0`, define `δ` via uniform continuity of `f`.
   - Define `S = {k : |k/n - x| < δ}` and its complement.

2. **Decomposition**:
   - Write the error `|(Bₙf)(x) - f(x)|` as a sum over `S` and `Sᶜ`.

3. **On `S`**:
   - Use uniform continuity: `|f(k/n) - f(x)| < ε/2`.
   - Use `∑ bernstein = 1` to bound the sum by `ε/2`.

4. **On `Sᶜ`**:
   - Use `|f(k/n) - f(x)| ≤ 2‖f‖`.
   - Insert the factor `δ⁻²(x - k/n)² ≥ 1` (by definition of `Sᶜ`).
   - Apply `variance` identity to get a bound `≤ 2‖f‖·δ⁻²·x(1-x)/n`.
   - Since `x(1-x) ≤ 1`, this is `≤ 2‖f‖·δ⁻² / n`.
   - Choose `n` large enough so this `< ε/2`.

5. **Conclusion**:
   - Combine both bounds: total error `< ε`.
   - Uniformity follows because bounds depend only on `‖f‖`, `ε`, and continuity modulus — not on `x`.

The proof is written as a single large `calc` block, with sub-blocks for `S` and `Sᶜ`.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Field.Power` | For powers, positivity, and field arithmetic in `ℝ`. |
| `Mathlib.Analysis.SpecificLimits.Basic` | For `tendsto`, `atTop`, and metric convergence tools. |
| `Mathlib.RingTheory.Polynomial.Bernstein` | Underlying algebraic definitions: `bernsteinPolynomial`, its sum and variance. |
| `Mathlib.Topology.ContinuousMap.Polynomial` | Extension of polynomials to continuous maps on `I`. |
| `Mathlib.Topology.ContinuousMap.Compact` | For compactness of `I`, norm properties, and uniform continuity. |

Also uses:
- `BoundedContinuousFunction` (as `‖f‖`).
- `unitInterval` scope for `I`.
- Custom `positivity` tactic extension.

---

### Summary

This file formalizes a *constructive*, *elementary* proof of the **Weierstrass Approximation Theorem** via **Bernstein polynomials**, avoiding measure-theoretic machinery while preserving the probabilistic intuition. It showcases Lean’s strength in handling uniform convergence, continuity, and positivity in analysis, with heavy reliance on `calc`-style reasoning and structured auxiliary definitions (`δ`, `S`, `z`).