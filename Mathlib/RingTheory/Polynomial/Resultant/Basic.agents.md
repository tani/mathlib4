Here is the structured technical metadata extracted from `Basic.lean`:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sylvester f g m n` | `Matrix (Fin (m + n)) (Fin (m + n)) R` | Sylvester matrix of `f`, `g` with formal degrees `m`, `n`. |
| `sylvesterDeriv f` | `Matrix (Fin (2 * f.natDegree - 1)) (Fin (2 * f.natDegree - 1)) R` | Modified Sylvester matrix for `f` and `f.derivative`, used to define discriminant. |
| `resultant f g m n` | `R` | Determinant of `sylvester f g m n`; default `m = f.natDegree`, `n = g.natDegree`. |
| `discr f` | *Not defined in this file* | Intended to be `(-1)^{n(n-1)/2} * resultant f f.derivative / leadingCoeff f^{n-1}` (TODO). |
| `resultant_comm` | `resultant f g m n = (-1)^{m*n} * resultant g f n m` | Symmetry of resultant up to sign. |
| `resultant_add_mul_right` | `resultant f (g + f * p) m n = resultant f g m n` (if `deg p + m ≤ n`) | Invariance under adding multiples of `f`. |
| `resultant_mul_right` | `resultant f (g₁ * g₂) = resultant f g₁ * resultant f g₂` | Multiplicativity in second argument. |
| `resultant_self` | `resultant f f = 0 ^ f.natDegree` | Resultant of a polynomial with itself vanishes unless constant. |
| `resultant_X_sub_C_left` | `(X - r).resultant g 1 n = eval r g` | Evaluates `g` at root `r`. |
| `resultant_eq_prod_eval` | `resultant f g = f.leadingCoeff^n * ∏_{α ∈ roots f} g(α)` (under splitting & domain assumptions) | Fundamental product formula for resultant. |
| `induction_of_Splits_of_injective_of_surjective` | Induction principle | Reduces proofs over arbitrary commutative rings to fields where polynomials split. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `sylvester*`: Sylvester matrix variants.
  - `resultant*`: Resultant properties and lemmas.
  - `resultant_C_*`: Resultants with constant polynomials.
  - `resultant_*_left` / `resultant_*_right`: Asymmetry in arguments (e.g., `resultant_X_sub_C_left`).
- **Suffixes**:
  - `_deg`: Involves degree bounds or degree-specific simplifications.
  - `_mul_*`: Multiplicativity lemmas.
  - `_self`: Resultant of a polynomial with itself.
  - `_prod_*`: Product formulas over roots.
- **Pattern**:
  - `resultant_*_left` / `resultant_*_right` encode argument position.
  - `*_left`, `*_right` often correspond to left/right multiplication in Sylvester map.

---

### **3. Tactic Stack**

Frequently used tactics:
- `simp` / `simp only` / `simp_rw`: Simplification with many lemmas.
- `induction`: Structural and strong induction (e.g., `Nat.strong_induction_on`, custom `induction_of_Splits_of_injective_of_surjective`).
- `rw`: Rewriting with lemmas like `resultant_comm`, `resultant_add_mul_right`.
- `congr 1` / `congr`: Congruence reasoning for equality of expressions.
- `ext`: Extensionality for matrices, functions, polynomials.
- `split_ifs`, `dsimp`, `grind`: Handling conditional definitions (`if ... then ... else ...`).
- `ring`, `ring_nf`: Polynomial ring simplifications.
- `aesop`: Automated reasoning for arithmetic and algebraic goals.
- `have`, `suffices`, `by_cases`: Proof structuring.
- `nontriviality`, `obtain`, `cases'`: Handling nontriviality and case splits.

---

### **4. Proof Logic**

- **Inductive structure**:
  - Many proofs use `induction f using induction_of_Splits_of_injective_of_surjective`, reducing to:
    1. `R` a field and `f` splits (base case).
    2. Injective base change (extension).
    3. Surjective base change (descent).
- **Core strategy**:
  - Reduce to field case where splitting fields exist.
  - Use product formula `resultant_eq_prod_eval` or `resultant_eq_prod_roots_sub`.
  - Leverage Sylvester matrix properties: column/row operations, determinant updates (`Matrix.det_updateCol_*`, `Matrix.det_succ_row`).
  - Exploit degree bounds to apply `resultant_add_mul_right/left` (eliminate higher-degree terms).
  - Use `resultant_comm` to swap arguments and apply symmetry.
- **Common subproofs**:
  - Show certain columns/rows are zero → determinant zero.
  - Show Sylvester matrix of `f` and `g₁ + f * p` differs by column operations from Sylvester matrix of `f` and `g₁`.
  - Use `modByMonic_add_div` to reduce `f` modulo `g` in Euclidean-style arguments.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Polynomial.Derivative` | Derivative of polynomials, used in discriminant. |
| `Mathlib.Algebra.Polynomial.Div` | Division algorithm, `modByMonic`, `divByMonic`. |
| `Mathlib.FieldTheory.SplittingField.Construction` | Existence of splitting fields (for product formulas). |
| `Mathlib.RingTheory.Polynomial.DegreeLT` | Degree theory, `degreeLT`, monomial operations. |
| `Mathlib.LinearAlgebra.Matrix.Determinant.Basic` | Determinant, Sylvester matrix as square matrix, reindexing. |

---

### **6. Mermaid Diagrams**

#### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  Basic --> Mathlib.Algebra.Polynomial.Derivative
  Basic --> Mathlib.Algebra.Polynomial.Div
  Basic --> Mathlib.FieldTheory.SplittingField.Construction
  Basic --> Mathlib.RingTheory.Polynomial.DegreeLT
  Basic --> Mathlib.LinearAlgebra.Matrix.Determinant.Basic

  subgraph Theory
    Basic --> ResultantTheory[Future: ResultantTheory.lean]
    Basic --> Discriminant[Future: Discriminant.lean]
  end

  Basic -->|TODO| ProductFormula[Goal: resultant (∏ (X - a)) f = ∏ f(a)]
  Basic -->|TODO| SylvesterMap[Goal: Sylvester matrix ↔ linear map (p,q) ↦ fp + gq]
  Basic -->|TODO| BinaryForms[Goal: Resultant of binary forms]
```

#### **File Overview (Conceptual Flow)**

```mermaid
flowchart LR
  A[Define Sylvester Matrix] --> B[Define Resultant = det Sylvester]
  B --> C[Basic Properties: comm, zero, add-mul]
  C --> D[Degree Manipulation lemmas]
  D --> E[Product formulas over roots]
  E --> F[Induction principle for general rings]
  F --> G[Multiplicativity: resultant(f, g₁g₂) = ...]
  G --> H[Resultant with itself = 0 unless constant]
  H --> I[Divisibility: resultant | leadingCoeff^k]
  I --> J[Future: discriminant, binary forms]
```

---

### **7. Summary**

This file formalizes the **Sylvester matrix** and **resultant** over arbitrary commutative semirings/rings, establishing foundational algebraic properties (symmetry, degree behavior, invariance under addition of multiples, multiplicativity). It culminates in the **product formula** over roots (under splitting and domain assumptions), supported by a powerful induction principle that reduces proofs to the case of fields where polynomials split. The structure is highly modular, with many lemmas parameterized by formal degrees (`m`, `n`) to support flexible degree manipulations. The ultimate goal is to build toward discriminants and binary form resultants.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.dot` format) or a deeper analysis of a specific lemma.
