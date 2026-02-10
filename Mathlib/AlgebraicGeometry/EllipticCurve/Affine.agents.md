Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the key definitions, naming conventions, tactic usage, proof logic, and imports:

---

### 🔹 **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WeierstrassCurve.Affine R` | Abbreviation for `WeierstrassCurve R`, representing a Weierstrass curve in affine coordinates over a commutative ring `R`. |
| `W.polynomial` | `R[X][Y]`: bivariate polynomial $Y^2 + a_1XY + a_3Y - (X^3 + a_2X^2 + a_4X + a_6)$ encoding the Weierstrass equation. |
| `W.Equation x y` | Proposition: $W(x, y) = 0$, i.e., point $(x, y)$ lies on the curve. |
| `W.Nonsingular x y` | Proposition: $(x, y)$ lies on $W$ and at least one partial derivative $W_X$, $W_Y$ is nonzero. |
| `W.negY x y` | Function: $-y - a_1x - a_3$, computes the $Y$-coordinate of the negation of $(x, y)$. |
| `W.addX x₁ x₂ L` | Function: $L^2 + a_1L - a_2 - x_1 - x_2$, computes the $X$-coordinate of $P + Q$ given slope $L$. |
| `W.addY x₁ x₂ y₁ L` | Function: $-(\ell(x - x_1) + y_1) - a_1x - a_3$, computes the $Y$-coordinate of $P + Q$. |
| `W.slope x₁ x₂ y₁ y₂` | Function: slope of line through $(x_1, y_1)$ and $(x_2, y_2)$, with cases for vertical/tangent/secant. |
| `W.Point` | Inductive type: `zero` (point at infinity) or `some h` where `h : W.Nonsingular x y`. |
| `W.Point.neg` | Involutive negation on `Point`, defined by $(x, y) \mapsto (x, -y - a_1x - a_3)$. |
| `W.Point.add` | Group addition on `Point`, defined via secant/tangent law using `addX`, `addY`, and `slope`. |
| `equation_neg`, `equation_add` | Theorems: negation and addition preserve the Weierstrass equation. |
| `nonsingular_neg`, `nonsingular_add` | Theorems: negation and addition preserve nonsingularity. |
| `nonsingular_of_Δ_ne_zero` | Theorem: if discriminant $\Delta \ne 0$, then all rational points are nonsingular. |

---

### 🔹 **2. Naming Conventions**

- **Polynomials & Coefficients**:
  - `polynomial`, `polynomialX`, `polynomialY`: bivariate polynomials for curve and partial derivatives.
  - `negPolynomial`, `linePolynomial`, `addPolynomial`: polynomials encoding group operations.
- **Coordinate Functions**:
  - `negY`, `addX`, `addY`, `negAddY`: explicit formulas for coordinates in group law.
- **Slope & Evaluation**:
  - `slope`: conditional slope computation.
  - `evalEval_*`: evaluation of bivariate polynomials at points.
- **Predicates**:
  - `Equation`, `Nonsingular`: propositional predicates for curve membership and smoothness.
- **Point Type**:
  - `Point.zero`, `Point.some`: constructors for points.
  - `instAddPoint`, `instNegPoint`, `instInvolutiveNeg`: typeclass instances.

---

### 🔹 **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Purpose |
|--------|---------|
| `C_simp`, `derivative_simp`, `eval_simp`, `map_simp` | Custom macros for simplifying ring/map/derivative/evaluation lemmas. |
| `ring1`, `ring` | Simplifying polynomial identities and algebraic expressions. |
| `simp only [...]` | Precise simplification using named lemmas (e.g., `evalEval_polynomial`, `addX`). |
| `field_simp`, `linear_combination` | Field arithmetic and linear algebraic combinations (especially in `Field` section). |
| `contrapose!`, `rw [...] at *`, `apply ... at` | Logical manipulation and hypothesis transformation. |
| `ext`, `congr!`, `rfl` | Extensionality, congruence, and reflexivity for equality proofs. |
| `by_cases`, `rcases`, `induction` | Case analysis and structural induction. |

---

### 🔹 **4. Proof Logic**

- **Structure**:
  - Proofs are organized by **sections**: `Equation`, `Nonsingular`, `Ring`, `Field`, `Group`.
  - In each section, definitions are followed by lemmas about their behavior (e.g., preservation of equation/nonsingularity).
- **Common Proof Patterns**:
  - **Polynomial manipulation**: Use of `polynomial_eq`, `addPolynomial_eq`, and `Cubic.toPoly` to reduce to coefficient-level reasoning.
  - **Evaluation-based reasoning**: Prove properties by evaluating polynomials at points and simplifying.
  - **Case analysis on coordinates**: Especially in `Field` section, proofs split on whether $x_1 = x_2$, $y_1 = -y_2 - a_1x_2 - a_3$, etc.
  - **Derivative-based nonsingularity**: Use of `nonsingular_negAdd_of_eval_derivative_ne_zero` to deduce nonsingularity from nonzero derivative.
  - **Variable change**: Leveraging `variableChange` to reduce to base case (e.g., at origin).
- **Inductive proofs**: For `Point` type, induction on `zero` vs `some h`.

---

### 🔹 **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.Bivariate` | Bivariate polynomial ring `R[X][Y]`, used for `polynomial`, `polynomialX`, `polynomialY`. |
| `Mathlib.AlgebraicGeometry.EllipticCurve.Weierstrass` | Core definitions of Weierstrass curves, coefficients $a_i$, discriminant $\Delta$, `variableChange`. |
| `Mathlib.AlgebraicGeometry.EllipticCurve.VariableChange` | Tools for base change and coordinate transformations. |

---

### 📌 Summary

This file formalizes the **affine model of elliptic curves** over a base ring/field, including:
- The **Weierstrass equation** and its **partial derivatives**,
- The **nonsingularity condition**,
- Explicit **group law formulas** (negation, addition),
- **Preservation lemmas** for the equation and nonsingularity,
- And foundational properties needed for proving the full **abelian group structure** (in a companion file `Group.lean`).

It is a rigorous, constructive development with heavy use of polynomial algebra and case analysis, aligned with Silverman’s *The Arithmetic of Elliptic Curves*.

--- 

Let me know if you'd like a **dependency graph**, **proof outline**, or **export of tactic usage statistics**.