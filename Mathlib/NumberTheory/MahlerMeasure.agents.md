**Technical Brief: `MahlerMeasure.lean`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mahlerMeasure` | `Polynomial ℂ → ℝ≥0` | Standard Mahler measure: $M(p) = |a_d| \prod_{i} \max(1, |z_i|)$ for roots $z_i$ and leading coefficient $a_d$. |
| `one_le_mahlerMeasure_of_ne_zero` | `p ≠ 0 → 1 ≤ M(p.map ℂ)` | Lower bound: nonzero integer polynomials have Mahler measure ≥ 1. |
| `finite_mahlerMeasure_le` | `Set.Finite {p : ℤ[X] | p.natDegree ≤ n ∧ M(p) ≤ B}` | **Northcott’s Theorem**: finiteness of integer polynomials bounded in degree and Mahler measure. |
| `card_mahlerMeasure_le_prod` | `ncard ≤ ∏_{i=0}^n (2⌊\binom{n}{i}B⌋₊ + 1)` | Explicit upper bound on cardinality of such polynomials. |
| `cyclotomic_mahlerMeasure_eq_one` | `M(Φₙ) = 1` | Mahler measure of cyclotomic polynomials is exactly 1. |
| `norm_leadingCoeff_eq_one_of_mahlerMeasure_eq_one` | `M(p) = 1 → |lc(p)| = 1` | Leading coefficient of integer polynomial with $M(p)=1$ has norm 1. |
| `isIntegral_of_mahlerMeasure_eq_one` | `z ∈ aroots p → IsIntegral ℤ z` | Roots of such polynomials are algebraic integers. |
| `norm_root_le_one_of_mahlerMeasure_eq_one` | `z ∈ aroots p → ‖z‖ ≤ 1` | All complex roots lie in closed unit disk. |
| `pow_eq_one_of_mahlerMeasure_eq_one` | `z ≠ 0 ∧ z ∈ aroots p → ∃ n>0, zⁿ = 1` | Nonzero roots are roots of unity. |
| `isPrimitiveRoot_of_mahlerMeasure_eq_one` | `∃ n>0, IsPrimitiveRoot z n` | Every nonzero root is a *primitive* root of unity. |
| `cyclotomic_dvd_of_mahlerMeasure_eq_one` | `M(p)=1, p$ nonconstant, $X ∤ p → ∃ n>0, Φₙ ∣ p$` | Structure theorem: such polynomials are divisible by some cyclotomic polynomial. |

---

### 2. **Naming Conventions**

- **Predicates / properties**:  
  - `is_...`: e.g., `isIntegral`, `isPrimitiveRoot`  
  - `norm_...`, `abs_...`: e.g., `norm_root_le_one`, `abs_leadingCoeff_eq_one`  
  - `..._eq_one`: for equalities to 1, especially structural consequences of Mahler measure = 1  
- **Bounds / finiteness**:  
  - `finite_...`, `card_...`, `le_...`, `prod_...`  
- **Polynomial operations**:  
  - `map`, `coeff`, `natDegree`, `degree`, `leadingCoeff`, `aroots`, `roots`  
- **Cyclotomic-specific**:  
  - `cyclotomic_mahlerMeasure`, `cyclotomic_dvd`, `pow_eq_one`, `isPrimitiveRoot_of_...`  
- **Box notation**:  
  - `BoxPoly`: set of polynomials with bounded coefficients and degree.

---

### 3. **Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `grind` | Custom automation (likely `grind` = `aesop` + `simp` + `linarith` + `norm_num` + `omega` + `zify` + `ring`). Used heavily for routine algebraic simplifications. |
| `aesop` | Automated reasoning for first-order logic + arithmetic. |
| `simp` / `simp only` | Simplification with definitional equalities and lemmas. |
| `rw` | Rewriting using equalities (e.g., `← map_id`, `← H`). |
| `gcongr` | Generalized congruence for inequalities (used in subset proofs). |
| `zify` | Lift integers to reals for arithmetic reasoning. |
| `norm_cast` | Move inequalities across type coercions (e.g., ℤ → ℝ). |
| `rcases` / `obtain` | Case analysis / existential elimination. |
| `conv` | Focused rewriting (e.g., `enter [1,1,1,p,2,i]`). |
| `apply`, `exact`, `refine` | Proof construction. |
| `ext` | Extensionality for functions/structures. |

---

### 4. **Proof Logic**

The logical flow is modular and layered:

1. **Preliminary bounds**  
   - Prove `1 ≤ M(p)` for nonzero integer polynomials.  
   - Derive coefficient bounds from Mahler measure via `norm_coeff_le_choose_mul_mahlerMeasure`.

2. **Northcott’s Theorem**  
   - Define `BoxPoly`: polynomials with bounded coefficients and degree.  
   - Show bijection between `BoxPoly` and product of integer intervals → compute cardinality.  
   - Show Mahler-bounded set ⊆ coefficient-bounded set → apply finiteness + cardinality bound.

3. **Mahler measure = 1 case analysis**  
   - Use factorization over ℂ: $M(p) = |a_d| \prod \max(1, |z_i|) = 1$  
   - Deduce:  
     - $|a_d| = 1$  
     - $\forall z_i$, $\max(1, |z_i|) = 1$ ⇒ $|z_i| ≤ 1$  
     - Since $M(p) = \prod \max(1,|z_i|)$, equality forces $|z_i| = 1$ for all nonzero roots.  
   - Combine with algebraic integer property → roots are algebraic integers on unit circle ⇒ roots of unity (via Kronecker’s theorem style argument).  
   - Use `NumberField.Embeddings.pow_eq_one_of_norm_le_one` after constructing $K = ℚ(z)$.  
   - Finally, use minimal polynomial of primitive root of unity = cyclotomic polynomial ⇒ divisibility.

---

### 5. **Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.BigOperators.Ring.Multiset` | Products over finite sets/multisets, especially for Mahler measure definition. |
| `Mathlib.Algebra.Polynomial.OfFn` | Construct polynomials from functions on indices (`ofFn`). |
| `Mathlib.Analysis.CStarAlgebra.Classes` | Normed algebras, complex numbers as C*-algebra. |
| `Mathlib.Analysis.Polynomial.MahlerMeasure` | Core definitions and basic lemmas about Mahler measure. |
| `Mathlib.Data.Pi.Interval` | Cardinality of product of intervals (`Pi.card_Icc`). |
| `Mathlib.NumberTheory.NumberField.InfinitePlace.Embeddings` | Embeddings of number fields into ℂ, used for norm arguments. |
| `Mathlib.RingTheory.Polynomial.Cyclotomic.Roots` | Roots of cyclotomic polynomials = primitive roots of unity. |
| `Mathlib.RingTheory.SimpleRing.Principal` | Principal ideal domain / Bézout properties (used in divisibility arguments). |

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Top-Level Imports)**

```mermaid
graph TD
  A[MahlerMeasure.lean] --> B[Mathlib.Analysis.Polynomial.MahlerMeasure]
  A --> C[Mathlib.NumberTheory.NumberField.InfinitePlace.Embeddings]
  A --> D[Mathlib.RingTheory.Polynomial.Cyclotomic.Roots]
  A --> E[Mathlib.Algebra.Polynomial.OfFn]
  A --> F[Mathlib.Algebra.Order.BigOperators.Ring.Multiset]
  A --> G[Mathlib.Data.Pi.Interval]
  A --> H[Mathlib.Analysis.CStarAlgebra.Classes]
  A --> I[Mathlib.RingTheory.SimpleRing.Principal]
```

#### **Overview of File Structure**

```mermaid
flowchart TD
  Start --> Prelim[Basic lemmas: 1 ≤ M(p)]
  Prelim --> Northcott[Northcott’s Theorem]
  Northcott --> Finite[finite_mahlerMeasure_le]
  Northcott --> CardBound[card_mahlerMeasure_le_prod]

  Prelim --> Cyclotomic[Cyclotomic case M(p) = 1]
  Cyclotomic --> LC[Leading coeff = ±1]
  Cyclotomic --> Integral[Roots are algebraic integers]
  Cyclotomic --> UnitDisk[Roots have norm ≤ 1]
  UnitDisk --> RootsUnity[Roots are roots of unity]
  RootsUnity --> PrimitiveRoot[Roots are primitive roots of unity]
  PrimitiveRoot --> Divisibility[Divisible by some cyclotomic]

  Cyclotomic --> cyclotomic_mahlerMeasure_eq_one
  Cyclotomic --> pow_eq_one_of_mahlerMeasure_eq_one
  Cyclotomic --> cyclotomic_dvd_of_mahlerMeasure_eq_one
```

---

### 7. **Summary**

This file formalizes deep arithmetic properties of integer polynomials via the Mahler measure. It bridges analysis (complex roots, norms), algebra (integrality, divisibility), and combinatorics (finite sets, counting bounds). The central results are:

- **Northcott’s Theorem** for Mahler measure (finiteness + explicit bound).
- **Kronecker-type characterization**: $M(p) = 1$ ⇔ $p$ is product of cyclotomic polynomials and monomials $X^k$.

The proofs rely on:
- Coefficient bounds via binomial coefficients,
- Complex analysis (maximum modulus, roots on unit circle),
- Algebraic number theory (number fields, embeddings, integrality),
- Cyclotomic polynomial theory (minimal polynomials of roots of unity).

This is a foundational step toward arithmetic dynamics and Diophantine geometry formalizations.
