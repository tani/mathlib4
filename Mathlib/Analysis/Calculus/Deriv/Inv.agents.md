### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasStrictDerivAt_inv` | `x ≠ 0 → HasStrictDerivAt Inv.inv (-(x ^ 2)⁻¹) x` | Proves strict differentiability of inversion at nonzero points, with derivative `-1/x²`. |
| `hasDerivAt_inv` | `x ≠ 0 → HasDerivAt (fun y => y⁻¹) (-(x ^ 2)⁻¹) x` | Derives standard (Fréchet) differentiability of inversion. |
| `hasDerivWithinAt_inv` | `x ≠ 0 → HasDerivWithinAt (fun x => x⁻¹) (-(x ^ 2)⁻¹) s x` | Extends derivative to within a set `s`. |
| `differentiableAt_inv_iff` | `DifferentiableAt 𝕜 (fun x => x⁻¹) x ↔ x ≠ 0` | Characterizes differentiability of inversion: holds iff point is nonzero. |
| `deriv_inv` | `deriv (fun x => x⁻¹) x = -(x ^ 2)⁻¹` | Computes derivative of inversion function. |
| `deriv_inv'` | `(deriv fun x : 𝕜 => x⁻¹) = fun x => -(x ^ 2)⁻¹` | Global form of derivative of inversion. |
| `derivWithin_inv` | Under `UniqueDiffWithinAt`, computes derivative within set. |
| `hasFDerivAt_inv`, `hasStrictFDerivAt_inv`, `hasFDerivWithinAt_inv` | `𝕜 →L[𝕜] 𝕜`-valued versions using `smulRight`. | Generalizes derivative to Fréchet derivative in normed algebra setting. |
| `fderiv_inv`, `fderivWithin_inv` | Expresses actual Fréchet derivative (`fderiv`) in terms of `smulRight`. | Connects `fderiv` with scalar multiplication operator. |
| `HasDerivWithinAt.inv` | `HasDerivWithinAt c c' s x → c x ≠ 0 → HasDerivWithinAt (c⁻¹) (-c' / c x ^ 2) s x` | Chain rule for inversion of a function. |
| `HasDerivAt.inv` | Analogous to above for `HasDerivAt`. | Chain rule for inversion. |
| `deriv_inv''`, `derivWithin_inv'` | Chain rule versions for derivatives of composite inverses. | Computes derivative of `(c x)⁻¹`. |
| `HasDerivWithinAt.div` | `HasDerivWithinAt c c' s x → HasDerivWithinAt d d' s x → d x ≠ 0 → HasDerivWithinAt (c / d) ((c' * d x - c x * d') / d x ^ 2) s x` | Quotient rule for derivatives within a set. |
| `HasStrictDerivAt.div` | Strict derivative version of quotient rule. |
| `HasDerivAt.div` | Standard derivative version of quotient rule. |
| `DifferentiableWithinAt.div`, `DifferentiableAt.div`, `DifferentiableOn.div`, `Differentiable.div` | Closure properties under division. | Ensures differentiability of quotient under nonzero denominator. |
| `derivWithin_div`, `deriv_div` | Explicit formulas for derivatives of quotients. | General Leibniz-style quotient rule. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `has*DerivAt`: asserts existence of derivative (Fréchet or strict) at a point.
  - `has*DerivWithinAt`: same, but within a subset.
  - `deriv*`: computes actual derivative value.
  - `fderiv*`: Fréchet derivative (as a continuous linear map).
  - `differentiable*`: asserts differentiability (not just existence of derivative).
- **Suffixes:**
  - `_inv`, `_div`: indicate application to inversion or division.
  - `'` (prime) variants (`deriv_inv'`, `deriv_inv''`) often denote global or chain-rule versions.
- **Function names:**
  - `Inv.inv`: standard notation for inversion map `x ↦ x⁻¹`.
  - `div_eq_mul_inv`: used to rewrite division as multiplication by inverse.

---

#### 3. **Tactic Stack**

- **Core tactics:**
  - `field_simp`: simplifies field expressions (especially inverses, divisions).
  - `ring`: simplifies polynomial/rational expressions.
  - `simp_rw`: not explicitly used, but `simp only [...]` appears in some proofs.
  - `convert ... using 1`: used to align goals modulo definitional equality.
  - `exact`, `refine`, `rw`, `rcases`, `cases`: standard proof construction.
- **Analysis-specific:**
  - `isBigO_refl`, `mul_isLittleO`, `tendsto_const_nhds`, `continuous_mul`, `inv₀`: used in asymptotic analysis (little-o, big-O).
  - `isOpen_ne`, `prod`, `mem_nhds`: topology/neighborhood reasoning.
  - `differentiableAt.derivWithin`, `DifferentiableAt.fderivWithin`: apply known differentiability to compute derivatives.

---

#### 4. **Proof Logic**

- **Structure:**
  - Most proofs follow a pattern:
    1. Reduce to known derivative rules (e.g., chain rule, product rule).
    2. Use `field_simp` + `ring` to simplify algebraic expressions.
    3. For strict derivatives, use asymptotic estimates (`isLittleO`, `isBigO`) and continuity arguments.
    4. For chain rules (e.g., `HasDerivWithinAt.inv`), apply composition lemmas like `comp_hasDerivWithinAt`.
  - **Induction is not used** — all proofs are direct or rely on pre-established lemmas (e.g., `hasStrictDerivAt_inv` is proven via asymptotic expansion).
  - **Case analysis** on `x = 0 ∨ x ≠ 0` (`eq_or_ne`) is common (e.g., in `deriv_inv`).
  - **Uniqueness of limit** is implicit via `hasDerivAt` → `deriv` uniqueness.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Mul` | Provides product rule and related lemmas (`mul`, `hasDerivAt_mul`, etc.). |
| `Mathlib.Analysis.Calculus.Deriv.Comp` | Provides chain rule lemmas (`comp`, `hasDerivAt_comp`, etc.). |

These imports are foundational: all derivative rules in this file build on product and chain rules already established.

---

### Summary

This file formalizes the derivative rules for inversion and division in the context of normed fields and normed algebras over them. It covers:
- Pointwise, within-set, and global derivatives.
- Strict and non-strict derivatives.
- Fréchet derivatives (`fderiv`).
- Chain rules for composite functions (e.g., `(c x)⁻¹`, `c x / d x`).

The proofs rely heavily on algebraic simplification (`field_simp`, `ring`) and asymptotic analysis (`isLittleO`, `tendsto`), with a clear modular structure mirroring standard calculus development.