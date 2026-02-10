### Technical Brief: Derivatives of Integer Powers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasStrictDerivAt_zpow` | `∀ m : ℤ, ∀ x : 𝕜, x ≠ 0 ∨ 0 ≤ m → HasStrictDerivAt (· ^ m) (m • x ^ (m - 1)) x` | Proves strict differentiability of `x ↦ x^m` for integer `m`, with derivative `m * x^(m-1)`, under condition `x ≠ 0 ∨ 0 ≤ m`. Handles negative exponents via chain rule with `inv`. |
| `hasDerivAt_zpow` | `∀ m x, x ≠ 0 ∨ 0 ≤ m → HasDerivAt (· ^ m) (m • x ^ (m - 1)) x` | Derives standard (non-strict) differentiability from strict differentiability. |
| `hasDerivWithinAt_zpow` | `∀ m x s, x ≠ 0 ∨ 0 ≤ m → HasDerivWithinAt (· ^ m) (m • x ^ (m - 1)) s x` | Extends derivative to within a set `s`. |
| `differentiableAt_zpow` | `DifferentiableAt 𝕜 (· ^ m) x ↔ x ≠ 0 ∨ 0 ≤ m` | Characterizes differentiability at a point for `x^m`. |
| `differentiableWithinAt_zpow`, `differentiableOn_zpow`, `Differentiable.zpow` | Various forms of differentiability for `f^m` given differentiability of `f`. | Chain rule-style composition lemmas for integer powers. |
| `deriv_zpow` | `deriv (· ^ m) x = m * x^(m-1)` | Computes the derivative explicitly (pointwise). |
| `deriv_zpow'` | `deriv (· ^ m) = fun x ↦ m * x^(m-1)` | Global derivative function form. |
| `derivWithin_zpow` | Under `UniqueDiffWithinAt`, gives derivative within a set. | Generalizes derivative to subsets. |
| `iter_deriv_zpow'` | `deriv^[k] (· ^ m) = fun x ↦ (∏_{i < k} (m - i)) * x^(m - k)` | *k*-th iterated derivative of `x^m`. |
| `iter_deriv_zpow` | Pointwise version of `iter_deriv_zpow'`. | Same as above, evaluated at `x`. |
| `iter_deriv_pow` | Special case for `n : ℕ` (natural exponent). | Simplifies product when `k > n` (becomes zero). |
| `iter_deriv_inv` | `deriv^[k] Inv.inv = fun x ↦ (∏_{i < k} (-1 - i)) * x^(-1 - k)` | *k*-th derivative of reciprocal function (`x⁻¹`). |
| `DifferentiableWithinAt.zpow`, `DifferentiableAt.zpow`, etc. | Chain rule lemmas for composition with `f^m`. | Enables differentiation of composite expressions like `f(x)^m`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasStrictDerivAt_`, `hasDerivAt_`, `hasDerivWithinAt_`: For existence of derivatives (strict, standard, within set).
  - `differentiableAt_`, `differentiableWithinAt_`, `differentiableOn_`, `Differentiable_`: For differentiability properties.
  - `deriv_`, `derivWithin_`: For explicit derivative values.
  - `iter_deriv_`: For *k*-th iterated derivatives.
  - `zpow_`: For integer power (`z` for *z*ahlen / integers).
  - `pow_`: For natural power (`nat`).
  - `inv_`: For reciprocal (`x⁻¹`).

- **Suffixes**:
  - `'` (prime): Often denotes the *function-level* version (e.g., `deriv_zpow'` vs `deriv_zpow`).
  - `WithinAt`, `On`, bare `At`: Distinguish between local, set-based, and global differentiability.

- **Variables**:
  - `m : ℤ`: Integer exponent.
  - `n : ℕ`: Natural exponent.
  - `k : ℕ`: Iteration index.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases lt_trichotomy m 0` | Case analysis on sign of integer `m`. |
| `convert ... using 1` | Refines equality via definitional equality or lemmas. |
| `simp only [...] at *` | Simplifies using precise lemmas (e.g., `zpow_neg`, `mul_inv`, `inv_inv`). |
| `rw [...]` | Rewrites using algebraic identities (e.g., `zpow_add₀`, `Int.cast_neg`). |
| `abel` | Solves commutative group/ring equalities (e.g., simplifying integer arithmetic). |
| `push_neg` | Converts negated quantifiers/implications (e.g., `¬(x ≠ 0 ∨ 0 ≤ m)` → `x = 0 ∧ m < 0`). |
| `Finset.prod_range_succ`, `Finset.prod_eq_zero` | Handles products over ranges, especially zero cases. |
| `congr`, `funext` | Proves function extensionality. |
| `have`, `exact`, `skip` | Local proof construction and tactic control. |
| `lift m to ℕ` | Converts integer to natural when `m > 0`. |

---

#### **4. Proof Logic**

- **Structure**:
  - **Case analysis on `m`**: For `hasStrictDerivAt_zpow`, split into `m < 0`, `m = 0`, `m > 0`.
    - `m > 0`: Reduce to natural power case (`hasStrictDerivAt_pow`).
    - `m = 0`: Constant function → derivative zero.
    - `m < 0`: Use `x^m = (x⁻¹)^(-m)` and chain rule with `inv`.
  - **Differentiability ↔ condition**: Prove both directions:
    - `→`: Use continuity of `x^m` (requires `x ≠ 0 ∨ 0 ≤ m`).
    - `←`: Use `hasDerivAt_zpow` ⇒ `differentiableAt`.
  - **Iterated derivatives**:
    - Induction on `k`.
    - Base case `k = 0`: Identity.
    - Step: Apply `deriv_const_mul_field'` and `deriv_zpow'`.
  - **Composition lemmas** (`Differentiable.zpow`, etc.):
    - Use `comp_differentiableWithinAt` / `comp` with `differentiableAt_zpow`.

- **Key Insight**:
  - For `m < 0`, differentiability fails at `x = 0`, hence condition `x ≠ 0 ∨ 0 ≤ m`.
  - For `k > n` in natural powers, the *k*-th derivative vanishes (product includes `n - n = 0`).

---

#### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.Analysis.Calculus.Deriv.Pow
  import Mathlib.Analysis.Calculus.Deriv.Inv
  ```
- **Dependencies**:
  - `Mathlib.Analysis.Normed.Field.Basic` (via `NontriviallyNormedField`, `NormedSpace`)
  - `Mathlib.Analysis.Calculus.Deriv.Basic` (via `deriv`, `differentiableAt`, etc.)
  - `Mathlib.Data.Int.Basic`, `Mathlib.Data.ZPow.Basic` (for `zpow`, `Int.cast`, etc.)
  - `Mathlib.Topology.Basic`, `Mathlib.MeasureTheory.Measure.Space` (via `Filter`, `TopologicalSpace`)
  - `Mathlib.Data.Real.Basic`, `Mathlib.Data.Nat.Basic` (implicitly via `ℕ`, `ℤ`)

- **Domain Scope**:
  - One-dimensional calculus over nontrivially normed fields (`𝕜`), e.g., `ℝ`, `ℂ`.
  - Handles both local (`At`) and global (`On`) differentiability.
  - Extends to composite functions via chain rule lemmas.

---

### Summary

This file formalizes the full calculus of integer-power functions `x ↦ x^m` over normed fields, including:
- Derivative formulas (first and higher-order),
- Differentiability characterizations,
- Chain rule variants for compositions,
- Special handling of negative exponents (via `inv`),
- Zero-exponent and zero-input edge cases.

It exemplifies Lean’s ability to unify discrete (`ℤ`) and continuous (`𝕜`) reasoning in analysis.