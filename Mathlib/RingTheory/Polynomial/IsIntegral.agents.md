**Technical Brief: `IsIntegral.lean` — Coefficient-wise Integrality in Polynomial and MvPolynomial Rings**

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isIntegral_coeff_prod` | `∀ s p, (∀ i ∈ s, j, IsIntegral R ((p i).coeff j)) → IsIntegral R ((s.prod p).coeff j)` | Shows integrality of coefficients of a product of polynomials follows from integrality of each factor’s coefficients. |
| `isIntegral_coeff_of_factors` | `p : S[X]`, `p.leadingCoeff` integral, `p` splits, all roots integral ⇒ all coefficients integral | Generalizes Vieta’s formulas: integrality of roots and leading coefficient ⇒ integrality of all coefficients. |
| `isIntegral_coeff_of_dvd` | `p, q` monic, `q ∣ p.map`, then `q.coeff i` integral over `R` | Core result: if a monic polynomial divides another monic with integral coefficients, then its coefficients are integral. |
| `IsAlmostIntegral.coeff` | `IsAlmostIntegral R[X] p ⇒ IsAlmostIntegral R (p.coeff i)` | Coefficients of an almost integral polynomial are almost integral. |
| `IsIntegral.coeff` | `IsIntegral R[X] p ⇒ IsIntegral R (p.coeff i)` | If a polynomial is integral over `R[X]`, then each coefficient is integral over `R`. |
| `Polynomial.isIntegral_iff_isIntegral_coeff` | `IsIntegral R[X] f ↔ ∀ n, IsIntegral R (f.coeff n)` | Equivalence: polynomial is integral over `R[X]` iff all its coefficients are integral over `R`. |
| `MvPolynomial.isIntegral_iff_isIntegral_coeff` | `IsIntegral (MvPolynomial σ R) f ↔ ∀ n, IsIntegral R (f.coeff n)` | Multivariate analog: integrality over `MvPolynomial σ R` iff all coefficients are integral over `R`. |
| `IsIntegrallyClosed R[X]` | Instance: if `R` is integrally closed domain, then `R[X]` is integrally closed | Extends integrally closed property to polynomial ring. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isIntegral_`: properties about integrality of elements (e.g., `isIntegral_coeff_of_dvd`, `isIntegral_coeff_prod`)
  - `coeff_`: operations or lemmas about coefficients (e.g., `coeff_C_mul`, `eraseLead_coeff_of_ne`)
  - `of_`: implication direction or source condition (e.g., `of_aeval_monic_of_isIntegral_coeff`, `of_isIntegrallyClosed`)
- **Suffixes**:
  - `_iff_`: biconditional statements (`isIntegral_iff_isIntegral_coeff`)
  - `_mem_`: membership in a set/structure (e.g., `mem_completeIntegralClosure`)
- **Other patterns**:
  - `algHom`, `map`, `eval`, `aeval`, `taylor`, `minpoly`, `rename`, `optionEquivLeft`, `killCompl`: standard multivariate polynomial/extension theory terms.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction ... using Finset.induction` | Structural induction over finite sets (e.g., products over multisets) |
| `aesop`, `grind`, `lia` | Automated reasoning for arithmetic, simplification, and linear arithmetic |
| `simp`, `simp_rw`, `rw`, `grw` | Rewriting using definitional equalities, especially for `coeff`, `map`, `eval`, `monomial` |
| `exact`, `refine`, `obtain`, `cases` | Proof construction and decomposition |
| `convert`, `congr`, `ext` | Equality proofs via congruence and extensionality |
| `nontriviality`, `classical`, `by_cases` | Handling trivial/nontrivial cases and classical reasoning |
| `have`, `suffices`, `intro` | Intermediate lemma introduction and goal restructuring |
| `algebraize`, `isIntegral_algHom_iff`, `FaithfulSMul.algebraMap_injective` | Advanced algebraic manipulations involving base change and faithfulness |

---

### **4. Proof Logic**

- **Inductive structure**: Many proofs use strong induction on `natDegree` or `Finset.induction` for products.
- **Reduction via splitting**: For `isIntegral_coeff_of_factors`, reduce to multiset product using `splits_iff_exists_multiset`.
- **Base change & localization**: Use `exists_splits_map` to pass to a splitting extension where roots exist, then descend integrality via faithful flatness or injectivity of algebra maps.
- **Equivalence via sum of monomials**: `isIntegral_iff_isIntegral_coeff` uses `f.sum_monomial_eq` and closure of integrality under finite sums and products.
- **Multivariate case**: Reduce to finite variable case via `Finite.induction_empty_option`, `rename`, `optionEquivLeft`, and `killCompl` to handle infinite index sets.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Data.Multiset.Fintype` | Multiset arithmetic, finiteness reasoning |
| `Mathlib.RingTheory.AdjoinRoot` | Splitting fields, roots, evaluation |
| `Mathlib.RingTheory.Polynomial.RationalRoot` | Rational root theorem, integrality of roots |
| `Mathlib.RingTheory.IntegralClosure.IsIntegral.AlmostIntegral` | Almost integrality, complete integral closure |

---

### **6. Mermaid Diagrams**

#### **Dependency Graph (Core Theory)**

```mermaid
graph TD
  A[CommRing R, S] --> B[Algebra R S]
  B --> C[Polynomial R[X], S[X]]
  B --> D[MvPolynomial σ R, σ S]
  C --> E[Integrality: IsIntegral R p]
  C --> F[Almost Integrality: IsAlmostIntegral R p]
  E --> G[IsIntegral.coeff]
  E --> H[isIntegral_coeff_of_dvd]
  E --> I[isIntegral_iff_isIntegral_coeff]
  F --> J[IsAlmostIntegral.coeff]
  D --> K[MvPolynomial.isIntegral_iff_isIntegral_coeff]
  G & H & I & J & K --> L[IsIntegrallyClosed R[X]]
```

#### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Setup
    A[Variables & Assumptions] --> B[Polynomial namespace]
  end

  subgraph Polynomial Results
    B --> C1[isIntegral_coeff_prod]
    B --> C2[isIntegral_coeff_of_factors]
    B --> C3[isIntegral_coeff_of_dvd]
    B --> C4[IsAlmostIntegral.coeff]
    B --> C5[IsIntegral.coeff]
    B --> C6[isIntegral_iff_isIntegral_coeff]
    B --> C7[IsIntegral.of_aeval_monic_of_isIntegral_coeff]
  end

  subgraph Application
    C6 --> D1[IsIntegrallyClosed R[X] instance]
  end

  subgraph Multivariate Extension
    E[MvPolynomial] --> F1[MvPolynomial.isIntegral_iff_isIntegral_coeff]
  end

  C3 --> D1
  C5 --> C6
  C6 --> D1
  F1 --> D1
```

---

### **7. Summary**

This file establishes foundational results linking integrality of polynomials to integrality of their coefficients. It provides:

- A clean equivalence `IsIntegral R[X] f ↔ ∀ n, IsIntegral R (f.coeff n)`.
- A powerful descent principle: integrality descends along monic divisibility (`isIntegral_coeff_of_dvd`).
- Extension to multivariate polynomials via structural induction and renaming.
- Application: `R` integrally closed ⇒ `R[X]` integrally closed.

These results are essential for building the theory of integral extensions in algebraic geometry and commutative algebra, especially in contexts like normalization, integral closures, and base change.

--- 

Let me know if you'd like a formalized dependency graph in `leanpkg` format or a proof outline for a specific theorem.
