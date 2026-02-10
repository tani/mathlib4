### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `hasDerivWithinAt_of_bilinear` | Proves chain rule for bilinear maps: derivative of `x ↦ B (u x) (v x)` is `B (u x) v' + B u' (v x)` under `HasDerivWithinAt` assumptions. |
| `hasDerivAt_of_bilinear` | Same as above but for `HasDerivAt`. |
| `hasStrictDerivAt_of_bilinear` | Same for `HasStrictDerivAt`. |
| `derivWithin_of_bilinear`, `deriv_of_bilinear` | Derivative formulas for bilinear compositions under differentiability assumptions. |
| `smul` family (`HasDerivWithinAt.smul`, `deriv_smul`, etc.) | Product rule for scalar multiplication (`c • f`). |
| `mul` family (`HasDerivWithinAt.mul`, `deriv_mul`, etc.) | Classical Leibniz rule for multiplication of functions (`c * d`). |
| `const_smul`, `smul_const` | Special cases: derivative of constant scalar multiple of a function, and vice versa. |
| `finset_prod` family | Generalized product rule over finite products: derivative of `∏ i ∈ u, f i` is sum over `i` of product of all `f j` (j ≠ i) times `f' i`. |
| `clm_comp`, `clm_apply` | Chain rule for composition and evaluation of continuous linear maps: derivative of `(c y).comp (d y)` or `(c y) (u y)`. |
| `div_const` family | Derivative of division by a constant: `(c / d)' = c' / d`. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `hasDerivWithinAt_`, `hasDerivAt_`, `hasStrictDerivAt_`: for derivative existence statements.
  - `derivWithin_`, `deriv_`: for actual derivative expressions.
  - `smul_`, `mul_`, `const_smul_`, `mul_const_`, `const_mul_`: indicate operation type.
  - `clm_`: for continuous linear map operations.
- **Suffixes:**
  - `_const`: when one operand is constant.
  - `_field`: when working over normed fields (e.g., `deriv_mul_const_field`).
  - `_within`: for `derivWithin` variants.
- **Pattern:** `theorem [deriv/hasDeriv][Within/At/Strict][operation]_[variant]`.

#### 3. **Tactic Stack**

- **Core tactics used repeatedly:**
  - `simpa using`: to simplify goals using lemmas (especially for lifting FDeriv to Deriv).
  - `rw [...] at *`: rewriting hypotheses using algebraic simplifications (e.g., `mul_zero`, `zero_add`, `one_smul`).
  - `convert ... using 1`: to align goals modulo definitional equality.
  - `rwa [...]`: rewrite + assumption.
  - `simp only [...]`: for precise simplification (e.g., `smul_zero`, `mul_inv_cancel_right₀`).
  - `by_cases`, `rcases eq_or_ne`: case analysis on equality (especially for zero/nonzero scalars).
  - `funext`: to prove function extensionality.
  - `contrapose!`: for contrapositive reasoning (e.g., to show non-differentiability).
  - `exact`, `refine`: for direct proof construction.

#### 4. **Proof Logic**

- **General pattern:**
  1. Lift to Fréchet derivative (`FDeriv`) using known lemmas (e.g., `hasFDerivWithinAt.smul`, `mul'`).
  2. Convert back to Gâteaux derivative (`Deriv`) via `.hasDerivWithinAt` / `.hasDerivAt`.
  3. Simplify using algebraic properties of `ContinuousLinearMap` (e.g., `add_apply`, `smul_apply`, `one_smul`).
  4. For `deriv_*` lemmas, apply `.deriv` or `.derivWithin` after establishing derivative existence.
  5. For field-specific variants, handle zero/nonzero cases separately using field inverses.
  6. For product rules over finite sets, use induction or `finset_prod` lemmas built on bilinear/mul rules.

- **Inductive structure:** Many proofs are structured as:
  - Base case: bilinear or scalar multiplication.
  - Inductive step: finite product via `finset_prod`.
  - Special cases: constants, inverses, division.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Deriv.Basic`: foundational derivative theory.
- `Mathlib.Analysis.Calculus.FDeriv.Mul`: Fréchet derivative product rules.
- `Mathlib.Analysis.Calculus.FDeriv.Add`: Fréchet derivative addition rules.

These imports indicate the file builds on top of Fréchet derivative calculus in normed spaces over nontrivially normed fields, extending to Gâteaux derivatives and specific algebraic operations (scalar mult, multiplication, composition).