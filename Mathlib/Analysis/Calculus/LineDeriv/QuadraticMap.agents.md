### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasLineDerivAt` | `f : QuadraticMap 𝕜 E F → a b : E → HasLineDerivAt 𝕜 f (polar f a b) a b` | Proves that a quadratic map `f` is line differentiable at `a` in direction `b`, with line derivative given by the polar form `polar f a b`. |
| `lineDifferentiableAt` | `f : QuadraticMap 𝕜 E F → a b : E → LineDifferentiableAt 𝕜 f a b` | Immediate corollary of `hasLineDerivAt`: existence of line derivative implies line differentiability. |
| `lineDeriv` | `f : QuadraticMap 𝕜 E F → lineDeriv 𝕜 f = polar f` | Identifies the global line derivative operator of `f` with its polar bilinear form. |

- **`polar f`**: The *polar bilinear form* associated to the quadratic map `f`, defined in `Mathlib.LinearAlgebra.QuadraticForm.Basic`. For a quadratic map `f`, `polar f : E → E → F` is the unique symmetric bilinear form satisfying `polar f a a = f a` (in characteristic ≠ 2; in general, it's defined via `polar f a b = f (a + b) - f a - f b`).

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasLineDerivAt`, `lineDifferentiableAt`, `lineDeriv`: follow Lean/Lean Mathlib convention for derivative-related properties (`has*`, `lineDifferentiableAt`, `lineDeriv`).
  - `polar f`: standard notation for the polar form of a quadratic map/form.

- **Suffixes**:
  - `At` suffix in `hasLineDerivAt`, `lineDifferentiableAt`: indicates pointwise (at a point) differentiability.

- **Structure**:
  - Theorems are named descriptively and align with Mathlib’s calculus API (`HasLineDerivAt`, `LineDifferentiableAt`, `lineDeriv`).

#### 3. **Tactic Stack**

- **Core tactics used**:
  - `simpa`: Simplifies using a lemma and the current goal.
  - `ext`: Extensionality (to prove equality of functions by extension).
  - `exact`: Directly applies a hypothesis/lemma.
  - Implicit use of:
    - `hasDerivAt_const`, `hasDerivAt_id`: basic derivative facts for constant and identity functions.
    - `.add`, `.mul`, `.smul`: field/module operation combinators for derivative existence (from `Mathlib.Analysis.Calculus.Deriv.*`).
    - `f.map_add`, `f.map_smul`: quadratic map properties (homogeneity and additivity of the associated bilinear form).

#### 4. **Proof Logic**

- **Strategy**:
  - For `hasLineDerivAt`: Express the line derivative definition (limit of `(f(a + t b) - f a)/t` as `t → 0`) via algebraic expansion using `f(a + t b) = f a + t·polar f a b + t²·f b`, then verify the derivative exists by reducing to known derivative rules (sum, product, scalar multiple of differentiable functions).
  - The proof uses the identity:
    ```
    f(a + t • b) = f a + t • polar f a b + t^2 • f b
    ```
    which follows from the definition of the polar form and quadratic map axioms.
  - The derivative w.r.t. `t` at `t = 0` is then `polar f a b`, as the `t^2` term vanishes in the derivative.
  - The tactic script leverages `simpa` with rewrites of `QuadraticMap.map_add` and `f.map_smul`, and builds the derivative using combinators on basic derivative facts.

- **Logical flow**:
  1. Expand `f(a + t b)` using quadratic map properties.
  2. Recognize the expression as a polynomial in `t` of degree ≤ 2.
  3. Use known derivative rules for polynomials (constant, identity, multiplication, scalar mult).
  4. Conclude the derivative at `t = 0` is `polar f a b`.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.LineDeriv.Basic` | Defines `HasLineDerivAt`, `LineDifferentiableAt`, `lineDeriv`, and basic calculus of line (Gateaux) derivatives. |
| `Mathlib.Analysis.Calculus.Deriv.Mul` | Provides derivative rules for multiplication and scalar multiplication (used in constructing composite derivatives). |
| `Mathlib.LinearAlgebra.QuadraticForm.Basic` | Defines `QuadraticMap`, `polar`, and foundational properties (e.g., `map_add`, `map_smul`). |

> **Note**: The file operates in a purely algebraic setting (no topology on `E` required), reflecting the generality of line (Gateaux) differentiability without continuity assumptions.

--- 

This module formalizes a foundational result in infinite-dimensional calculus: *quadratic maps are always line differentiable*, with derivative given by their polar form — a key ingredient for calculus of variations, optimization on manifolds, and infinite-dimensional analysis.