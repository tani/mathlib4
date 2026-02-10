### Technical Brief: `Basic.lean` — Tensor Powers of a Semimodule

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TensorPower R n M` | `Type _` | The $n$-th tensor power of $M$ over $R$, defined as $\bigotimes_{i : \text{Fin}\ n} M$ |
| `⨂[R]^n M` | Notation | Shorthand for `TensorPower R n M` |
| `gOne` | `GradedMonoid.GOne (fun i => ⨂[R]^i M)` | Provides unit element $1 \in \bigotimes^0 M$ |
| `ₜ1` | Local notation | Denotes the unit in the graded monoid of tensor powers |
| `gMul` | `GradedMonoid.GMul (fun i => ⨂[R]^i M)` | Defines graded multiplication: $\bigotimes^i M \times \bigotimes^j M \to \bigotimes^{i+j} M$ |
| `ₜ*` | Local infix notation | Graded multiplication operation |
| `mulEquiv {n m}` | `⨂^n M ⊗ ⨂^m M ≃ₗ ⨂^{n+m} M` | Linear equivalence implementing multiplication via reindexing over `Fin (n+m)` |
| `cast h` | `⨂^i M ≃ₗ ⨂^j M` | Linear equivalence for equal indices $i = j$, via reindexing |
| `gmonoid` | `GradedMonoid.GMonoid (fun i => ⨂^i M)` | Tensor powers form a graded monoid |
| `algebraMap₀` | `R ≃ₗ ⨂^0 M` | Canonical linear equivalence from base ring to degree-0 tensor power |
| `gsemiring` | `DirectSum.GSemiring (fun i => ⨂^i M)` | Tensor powers form a graded semiring; induces a semiring on $\bigoplus_n \bigotimes^n M$ |
| `galgebra` | `DirectSum.GAlgebra R (fun i => ⨂^i M)` | Tensor powers form a graded algebra over $R$; induces an $R$-algebra structure on the direct sum |

**Key Theorems**:
- `tprod_mul_tprod`: Multiplication of pure tensors corresponds to concatenation of index functions:  
  $$
  \text{tprod}\ a \ ₜ* \ \text{tprod}\ b = \text{tprod}\ (\text{Fin.append}\ a\ b)
  $$
- `one_mul`, `mul_one`, `mul_assoc`: Graded monoid laws up to `cast` (coherence via `gradedMonoid_eq_of_cast`)
- `algebraMap₀_mul`, `mul_algebraMap₀`, `algebraMap₀_mul_algebraMap₀`: Compatibility of degree-0 embedding with multiplication
- `galgebra`: Full graded algebra structure, including commutativity of $R$-action and scalar multiplication compatibility

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `g*`: Graded structure (e.g., `gOne`, `gMul`, `gmonoid`, `gsemiring`, `galgebra`)
  - `cast*`: Index-casting equivalences (`cast`, `cast_tprod`, `cast_refl`, etc.)
  - `algebraMap*`: Algebra structure maps (`algebraMap₀`, `algebraMap₀_eq_smul_one`, etc.)

- **Suffixes**:
  - `_def`: Definition lemmas (e.g., `gOne_def`, `gMul_def`)
  - `_eq_*`: Equality lemmas involving canonical maps (`gradedMonoid_eq_of_cast`, `cast_eq_cast`)
  - `_*_tprod`: Behavior on pure tensors (`tprod_mul_tprod`, `cast_tprod`)

- **Notation**:
  - `ₜ1`, `ₜ*`: Local notation for graded unit and multiplication (to avoid ambiguity with global `1`, `*`)
  - `⨂[R]^n M`: Standard tensor power notation

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `induction ... using PiTensorProduct.induction_on`: Structural induction on tensor products (pure tensors + addition + scalar multiplication)
- `rw [...]`: Rewriting using definitions (`gMul_def`, `gOne_def`, `cast_tprod`, etc.)
- `congr`: Congruence reasoning (especially for function extensionality)
- `simp only [...]`: Simplification with precise lemmas (avoids over-simplification)
- `apply funext`, `Fin.ext`: Extensionality for functions and finite types
- `dsimp`, `simp`: Simplification of definitions and computations
- `refine`, `exact`: Proof construction with holes or direct application
- `have`, `suffices`: Intermediate lemma introduction
- `subst`, `cases`: Handling equality hypotheses

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs proceed by induction on tensor elements using `PiTensorProduct.induction_on`, reducing to pure tensors (`smul_tprod`) and sums (`add`).
- **Coherence via `cast`**: Since multiplication is defined only up to reindexing (e.g., `Fin (n+m)` vs `Fin (m+n)`), associativity/unitality are proven *up to* `cast`, then finalized using `gradedMonoid_eq_of_cast`.
- **Reindexing lemmas**: Core lemmas like `reindex_tprod`, `reindex_trans`, `reindex_symm` are used to manipulate tensor products under index changes.
- **Linearity**: All constructions are linear equivalences or linear maps; proofs often reduce to verifying behavior on pure tensors and extending by linearity.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.LinearAlgebra.PiTensorProduct` | Core theory of indexed tensor products (`PiTensorProduct`), including `tprod`, `tmulEquiv`, `reindex` |
| `Mathlib.Logic.Equiv.Fin.Basic` | Finite type equivalences (`finSumFinEquiv`, `finCongr`, `Fin.cast`, `Fin.append`) |
| `Mathlib.Algebra.DirectSum.Algebra` | Graded structures (`GradedMonoid`, `DirectSum.GSemiring`, `DirectSum.GAlgebra`) |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  Basic --> PiTensorProduct
  Basic --> FinEquiv
  Basic --> DirectSumAlgebra

  PiTensorProduct --> "LinearAlgebra.TensorProduct"
  PiTensorProduct --> "Logic.Equiv.Basic"
  PiTensorProduct --> "Algebra.DirectSum"

  FinEquiv --> "Data.Fin.Basic"
  FinEquiv --> "Data.Fin.Interval"

  DirectSumAlgebra --> "Algebra.DirectSum.Basic"
  DirectSumAlgebra --> "Algebra.Algebra.Basic"
```

##### **Overview of Theory Flow**

```mermaid
flowchart LR
  A[Indexed Tensor Product ⨂[R] i:ι, M] --> B[Tensor Power ⨂[R]^n M]
  B --> C[Graded Monoid (ₜ1, ₜ*)]
  C --> D[Graded Semiring gsemiring]
  D --> E[Graded Algebra galgebra]
  E --> F[Algebra R (⨁ n, ⨂^n M)]

  subgraph "Core Equivalences"
    G[mulEquiv] --> C
    H[cast] --> C
    I[algebraMap₀] --> E
  end

  subgraph "Proof Strategy"
    J[Induction on tensors] --> K[Coherence via cast]
    K --> L[gradedMonoid_eq_of_cast]
  end
```

---

#### **7. Summary**

This file establishes the foundational graded algebraic structure on tensor powers of a semimodule over a commutative semiring. It constructs:
- A **graded monoid** structure on $\bigotimes^n M$,
- A **graded semiring** on the direct sum $\bigoplus_n \bigotimes^n M$,
- A **graded algebra** structure over $R$, yielding the full tensor algebra.

The implementation leverages:
- `PiTensorProduct` for flexible indexed tensor products,
- `Fin`-based indexing for natural-number grading,
- `cast` and `reindex` to manage index-shifting coherences,
- `gradedMonoid_eq_of_cast` to lift pointwise equalities to graded equalities.

This is the core module for building the **tensor algebra** in Mathlib, with `Basic.lean` serving as the low-level graded structure, and higher-level constructions (e.g., tensor algebra as a monoid object in graded modules) built on top.

--- 

Let me know if you'd like a formalization of the tensor algebra as a monoid or Hopf algebra structure next.
