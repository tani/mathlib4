### Technical Metadata Brief: Jacobian Coordinates for Weierstrass Curves (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WeierstrassCurve.Jacobian R` | Abbreviation for `WeierstrassCurve R`, representing a Weierstrass curve over a ring `R` in Jacobian coordinates. |
| `PointClass R` | Quotient of `(Fin 3 → R)` under the `Rˣ`-action `(u • P) = ![u² * P x, u³ * P y, u * P z]`. Represents equivalence classes of homogeneous coordinates `[x : y : z]`. |
| `polynomial W'` | `MvPolynomial (Fin 3) R`: the $(2,3,1)$-homogeneous Weierstrass polynomial $Y^2 + a_1XYZ + a_3YZ^3 - (X^3 + a_2X^2Z^2 + a_4XZ^4 + a_6Z^6)$. |
| `polynomialX`, `polynomialY`, `polynomialZ` | Partial derivatives of `polynomial` w.r.t. `X`, `Y`, `Z` (via `pderiv`). |
| `Equation P` | Proposition `eval P W'.polynomial = 0`: point `P` lies on the curve. |
| `Nonsingular P` | `Equation P ∧ (W_X ≠ 0 ∨ W_Y ≠ 0 ∨ W_Z ≠ 0)`: point satisfies curve equation and is nonsingular. |
| `NonsingularLift ⟦P⟧` | Lift of `Nonsingular P` to `PointClass`, defined via `lift` and `propext ∘ nonsingular_of_equiv`. |
| `negY P` | $-P_y - a_1 P_x P_z - a_3 P_z^3$: $Y$-coordinate of negation in Jacobian coords. |
| `dblU P` | $W_X(P)$: the unit scaling factor in doubling (when $P$ is 2-torsion). |
| `dblZ P` | $P_z (P_y - \text{negY } P)$: $Z$-coordinate in point doubling. |
| `add` (not fully shown) | Point addition on representatives, defined via secant/tangent formulas adapted to weighted homogeneous polynomials. |
| `nonsingular_smul`, `nonsingular_of_equiv` | The nonsingularity condition is preserved under the `Rˣ`-action and equivalence. |
| `nonsingular_iff_of_Z_ne_zero` | For $z \ne 0$, nonsingularity reduces to nonsingularity of the affine chart: `W.Nonsingular P ↔ W.Equation P ∧ (W_X ≠ 0 ∨ W_Y ≠ 0)`. |
| `equiv_of_Z_eq_zero` | All nonsingular points with $z = 0$ are equivalent (to `![1,1,0]`). |
| `nonsingularLift_zero`, `nonsingularLift_some` | Lifted nonsingularity for base points `![1,1,0]` and affine lifts `![X,Y,1]`. |

**Main Theorems (stated in file):**
- `nonsingularNeg`, `nonsingularAdd`: Negation and addition preserve nonsingularity (proofs likely in `Group.lean`).
- `equiv_some_of_Z_ne_zero`: Any point with $z \ne 0$ is equivalent to an affine point `[x/z², y/z³, 1]`.
- `nonsingular_of_Z_ne_zero`: Nonsingularity descends to the affine chart when $z \ne 0$.
- `equiv_of_Z_eq_zero`: Uniqueness of the point at infinity in Jacobian coords for nonsingular curves.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `polynomial*`: homogeneous Weierstrass polynomial and its partials (`polynomial`, `polynomialX`, `polynomialY`, `polynomialZ`).
  - `eval_*`: evaluation lemmas (`eval_polynomial`, `eval_polynomialX`, etc.).
  - `nonsingular*`: nonsingularity conditions and properties (`nonsingular_iff`, `nonsingular_smul`, `nonsingularLift_*`).
  - `dbl*`: doubling-related functions (`dblU`, `dblZ`).
  - `negY`: negation-related function (only $Y$-coord is nontrivial in Jacobian).
  - `equation_*`: membership in the curve (`equation_iff`, `equation_smul`, `equation_of_Z_eq_zero`).

- **Suffixes:**
  - `_smul`: behavior under scalar multiplication (`smul_fin3`, `smul_equiv`, `nonsingular_smul`).
  - `_of_Z_eq_zero`, `_of_Z_ne_zero`: case analysis on $z = 0$ or $z \ne 0$.
  - `_iff`: characterizations via equivalences (`equation_iff`, `nonsingular_iff`, `equiv_iff_eq_of_Z_eq'`).
  - `_ext`: extensionality lemmas for vectors (`fin3_def_ext`, `smul_fin3_ext`).

- **Notation:**
  - `x`, `y`, `z`: `Fin 3` indices `0`, `1`, `2`.
  - `matrix_simp`, `eval_simp`, `pderiv_simp`: custom tactic macros for simplification.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp only [...]`: heavily used with custom macros (`matrix_simp`, `eval_simp`, `pderiv_simp`).
- `ring1`, `ring`: for polynomial identities and homogeneity checks.
- `linear_combination`: for verifying weighted homogeneous identities (e.g., `eval_polynomial_of_Z_ne_zero`, `nonsingular_smul`).
- `rw [...]`: for rewriting definitions and equivalences.
- `fin_cases n`: case analysis on `Fin 3` indices.
- `contrapose!`: for negation-based arguments (e.g., `not_equiv_of_Z_eq_zero_left`).
- `convert`, `erw`: for definitional equality adjustments (e.g., `smul_smul`, `one_smul`).
- `div_eq_div_iff`, `mul_left_injective₀`: for manipulating fractions in field settings.

---

#### **4. Proof Logic**

- **Induction/Case Analysis:** Most proofs split on `z = 0` vs `z ≠ 0`, leveraging the weighted projective structure.
- **Homogeneity & Equivariance:** Key strategy: show a property holds for a representative, then prove it’s invariant under the `Rˣ`-action (e.g., `equation_smul`, `nonsingular_smul`).
- **Field Reduction:** For $z \ne 0$, reduce to affine case via `equiv_some_of_Z_ne_zero` and `nonsingular_of_Z_ne_zero`.
- **Uniqueness of Point at Infinity:** When $z = 0$, nonsingularity forces $x, y \ne 0$, and all such points are equivalent (`equiv_of_Z_eq_zero`).
- **Algebraic Verification:** Many lemmas (e.g., `Y_sub_Y_mul_Y_sub_negY`) use `linear_combination` to verify identities derived from the Weierstrass equation.

---

#### **5. Imports & Scope**

**Primary Dependencies:**
- `Mathlib.Algebra.MvPolynomial.CommRing`, `pderiv`: for multivariate polynomial algebra and differentiation.
- `Mathlib.AlgebraicGeometry.EllipticCurve.Affine`: affine coordinate theory (used for comparison and reduction).
- `Mathlib.Data.Fin.Tuple.Reflection`: for `Fin 3 → R` vector notation and lemmas (`fin3_def`, `smul_fin3`).
- `Mathlib.Tactic.LinearCombination'`: for weighted homogeneous identity proofs.

**Scope:**  
This module formalizes the *Jacobian coordinate model* for elliptic curves over fields (and more generally, commutative rings), focusing on:
- Homogeneous coordinate representation,
- Equivalence under weighted scaling,
- Nonsingularity conditions,
- Group operations (negation, addition, doubling) and their compatibility with the curve equation and nonsingularity.

It serves as the foundation for the group law proof in `Mathlib.AlgebraicGeometry.EllipticCurve.Group`.

--- 

Let me know if you'd like a summary of the group law or the `Point` type definition (not fully shown in input).