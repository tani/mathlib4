### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasStrictDerivAt` | `HasStrictDerivAt f (f.linear 1) x` | Shows that an affine map `f : 𝕜 →ᵃ[𝕜] E` has strict derivative `f.linear 1` at any point `x`. |
| `hasDerivAtFilter` | `HasDerivAtFilter f (f.linear 1) x L` | Generalizes derivative existence to filter-based convergence. |
| `hasDerivWithinAt` | `HasDerivWithinAt f (f.linear 1) s x` | Derivative within a set `s` at `x`. |
| `hasDerivAt` | `HasDerivAt f (f.linear 1) x` | Standard (global) derivative existence. |
| `derivWithin` | `derivWithin f s x = f.linear 1` | Computes the derivative within a set under unique differentiability condition. |
| `deriv` | `deriv f x = f.linear 1` | Computes the (unrestricted) derivative of `f` at `x`. |
| `differentiableAt`, `differentiable`, `differentiableWithinAt`, `differentiableOn` | Various differentiability statements | Establish full differentiability of affine maps (everywhere, on subsets, etc.). |
| `hasStrictDerivAt_lineMap`, `hasDerivAt_lineMap`, `hasDerivWithinAt_lineMap` | Specialized versions for `lineMap a b` | Apply general derivative results to the specific affine line map `t ↦ a + t • (b - a)`, whose derivative is `b - a`. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `has*Deriv*`: asserts existence of a derivative in various senses (`hasStrictDerivAt`, `hasDerivAt`, `hasDerivWithinAt`, `hasDerivAtFilter`).
  - `deriv*`: computes or characterizes the derivative (`deriv`, `derivWithin`).
  - `differentiable*`: asserts differentiability (`differentiableAt`, `differentiable`, etc.).
- **Suffixes**:
  - `_lineMap`: indicates specialization to `AffineMap.lineMap`.
- **Structure**:
  - `f.linear 1` is used uniformly as the derivative — reflects that the derivative of an affine map is its linear part applied to `1 ∈ 𝕜`.

#### 3. **Tactic Stack**
- `rw [f.decomp]`: Rewrites using the decomposition `f = f.linear + f 0`.
- `exact ...`: Directly applies previously established lemmas (e.g., `f.linear.hasStrictDerivAt.add_const (f 0)`).
- `simpa using ...`: Simplifies and reuses existing lemmas (e.g., `simpa using (lineMap a b : 𝕜 →ᵃ[𝕜] E).hasStrictDerivAt`).
- Implicit use of `aesop`, `simp`, and `ring` likely occurs in underlying lemmas (e.g., in `LinearMap.hasStrictDerivAt`, `add_const` lemmas), though not explicitly shown here.

#### 4. **Proof Logic**
- **Core Strategy**: Decompose affine map into linear part + constant, then apply known derivative rules for linear maps and constant functions.
- **Pattern**:
  1. Use `f.decomp` to write `f = f.linear + f 0`.
  2. Apply `hasStrictDerivAt`/`hasDerivAt` for linear maps (imported from `Mathlib.Analysis.Calculus.Deriv.Linear`).
  3. Use `add_const` lemmas (from `Mathlib.Analysis.Calculus.Deriv.Add`) to handle the constant shift.
  4. Derive corollaries (e.g., `deriv`, `differentiable`) via standard implications (e.g., `hasDerivAt.deriv`, `hasDerivAt.differentiableAt`).
- For `lineMap`, reuse the general result by casting `lineMap` to an `AffineMap`.

#### 5. **Imports**
| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Add` | Provides derivative rules for sums/constant additions. |
| `Mathlib.Analysis.Calculus.Deriv.Linear` | Provides derivative facts for linear maps (e.g., `linear.hasStrictDerivAt`). |
| `Mathlib.LinearAlgebra.AffineSpace.AffineMap` | Defines `AffineMap`, `linear`, `decomp`, `lineMap`, etc. |

This module formalizes foundational calculus of affine maps over normed fields, emphasizing the fact that their derivative is constant and equal to the action of their linear part on `1`. It sets up tools for transferring 1D analysis (e.g., MVT) to higher dimensions via `lineMap`.