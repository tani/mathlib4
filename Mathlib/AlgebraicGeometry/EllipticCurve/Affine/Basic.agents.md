Here is the **technical metadata extraction** for the provided Lean 4 file `Basic.lean`, structured as requested:

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Affine` | `abbrev Affine (R) := WeierstrassCurve R` | Abbreviation for a Weierstrass curve in affine coordinates over `R`. |
| `toAffine` | `abbrev toAffine (W : WeierstrassCurve R) : Affine R := W` | Identity conversion from general Weierstrass curve to affine form. |
| `polynomial` | `def polynomial (W : Affine R) : R[X][Y]` | Represents the Weierstrass equation $Y^2 + a_1XY + a_3Y - (X^3 + a_2X^2 + a_4X + a_6)$ as a bivariate polynomial. |
| `polynomialX` | `def polynomialX (W : Affine R) : R[X][Y]` | Partial derivative $\frac{\partial W}{\partial X}$. |
| `polynomialY` | `def polynomialY (W : Affine R) : R[X][Y]` | Partial derivative $\frac{\partial W}{\partial Y}$. |
| `Equation` | `def Equation (x y : R) : Prop := W.polynomial.evalEval x y = 0` | Proposition that $(x, y)$ lies on the curve $W$. |
| `Nonsingular` | `def Nonsingular (x y : R) : Prop := Equation x y ∧ (polynomialX ≠ 0 ∨ polynomialY ≠ 0)` | Nonsingularity condition: point lies on curve and not both partials vanish. |
| `polynomial_eq` | `lemma polynomial_eq : W.polynomial = Cubic.toPoly ...` | Equates `polynomial` with a canonical cubic representation. |
| `irreducible_polynomial` | `lemma irreducible_polynomial [IsDomain R] : Irreducible W.polynomial` | Proves irreducibility of the Weierstrass polynomial over domains. |
| `equation_iff_nonsingular_of_Δ_ne_zero` | `lemma equation_iff_nonsingular_of_Δ_ne_zero {x y} (hΔ : W.Δ ≠ 0)` | Key equivalence: on an elliptic curve (nonzero discriminant), every affine point satisfying the equation is nonsingular. |
| `equation_iff_nonsingular` | `lemma equation_iff_nonsingular [Nontrivial R] [W.IsElliptic]` | Main theorem: for elliptic curves, $W(x,y)=0 \iff W$ is nonsingular at $(x,y)$. |
| `map_polynomial`, `map_polynomialX`, `map_polynomialY` | `lemma map_polynomial`, etc. | Compatibility of polynomial definitions with ring homomorphisms. |
| `baseChange_polynomial`, etc. | Similar lemmas for base change (algebra maps). | Ensures polynomial constructions behave well under scalar extension. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `polynomial`, `polynomialX`, `polynomialY`: denote defining polynomials and their partials.
  - `Equation`, `Nonsingular`: predicate definitions.
  - `map_`, `baseChange_`: for behavior under ring/algebra maps.
- **Suffixes**:
  - `_eq`: definitions or equalities.
  - `_iff`: characterizations (biconditionals).
  - `_zero`: special case when evaluating at $(0,0)$.
  - `_variableChange`: behavior under change of variables.
- **Notation**:
  - `eval_simp`, `map_simp`: custom macros for simplifying evaluations and maps.
  - `C` and `X` used in bivariate polynomial ring `R[X][Y]`.

---

### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: heavily used with custom lemmas (`eval_simp`, `map_simp`).
- `rw [...]`: rewriting using definitions and lemmas.
- `ring1`: for polynomial/ring identities.
- `congr!`: for congruence reasoning over multiple arguments.
- `by_contra`, `contrapose!`: for negation-based arguments.
- `apply_fun degree`: for degree-based reasoning.
- `rcases ... with ...`: destructuring existential/universal hypotheses.
- `decide`: for automated decision procedures on simple algebraic facts.

---

### 4. **Proof Logic**

- **Structure**:
  - Definitions are first introduced, often via explicit polynomial expressions.
  - Lemmas about evaluation (`evalEval_*`) are proven using `eval_simp` and ring simplifications.
  - Irreducibility and degree properties rely on `Cubic.*` lemmas and degree arithmetic.
  - Main theorems (`equation_iff_nonsingular_of_Δ_ne_zero`, `equation_iff_nonsingular`) use:
    - Reduction to the origin via `variableChange` (change of coordinates).
    - Discriminant nonzero hypothesis to ensure nonsingularity.
    - Equivalence of conditions under injective maps (`map_equation`, `baseChange_equation`).
- **Common pattern**:
  > *Reduce to a canonical case (e.g., $(0,0)$) using variable change, prove equivalence there, then lift back.*

---

### 5. **Imports**

- `Mathlib.Algebra.Polynomial.Bivariate`: for bivariate polynomial ring `R[X][Y]`, evaluation, and operations.
- `Mathlib.AlgebraicGeometry.EllipticCurve.VariableChange`: for coordinate changes and their effect on coefficients (`variableChange_a₃`, `variableChange_Δ`, etc.).

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (File-Level)**

```mermaid
graph TD
  Basic[Basic.lean] --> Mathlib.PolyBiv[Mathlib.Algebra.Polynomial.Bivariate]
  Basic --> Mathlib.EllipticVarChange[Mathlib.AlgebraicGeometry.EllipticCurve.VariableChange]
  Basic --> Basic'[Affine/Point.lean]  %% future: group law
  Basic --> Basic''[Affine/Formula.lean] %% future: formulas
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  A[WeierstrassCurve R] --> B[Affine R]
  B --> C[polynomial : R[X][Y]]
  C --> D[Equation x y]
  C --> E[polynomialX]
  C --> F[polynomialY]
  D & E & F --> G[Nonsingular x y]
  G --> H[Main Thm: Equation ↔ Nonsingular if Δ ≠ 0]
  H --> I[Group Law on Nonsingular Points]
```

---

Let me know if you'd like a formalized module dependency graph or a proof sketch of `equation_iff_nonsingular`.
