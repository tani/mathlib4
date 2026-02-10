### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LinearMap.stdBasis` *(deprecated)* | `∀ i : ι, φ i →ₗ[R] ∀ i, φ i` — the deprecated name for `LinearMap.single`, mapping a vector in component `i` to the function with that vector at `i` and zero elsewhere. |
| `Pi.basis` | `Basis (Σj, ιs j) R (∀ j, Ms j)` — the standard basis on the product space `Π j, Ms j`, induced by a family of bases `s j` on each component `Ms j`. |
| `Pi.basisFun` | `Basis η R (η → R)` — the standard basis on the function space `η → R`, where each basis vector is `Pi.single i 1`. |
| `Pi.basis_repr_single` | `(Pi.basis s).repr (Pi.single j (s j i)) = Finsupp.single ⟨j, i⟩ 1` — describes the coordinate representation of a basis vector under `Pi.basis s`. |
| `Pi.basis_apply` | `Pi.basis s ji = Pi.single ji.1 (s ji.1 ji.2)` — the explicit form of basis vectors in `Pi.basis s`. |
| `Pi.basis_repr` | `(Pi.basis s).repr x ji = (s ji.1).repr (x ji.1) ji.2` — coordinate extraction under `Pi.basis s`. |
| `Pi.basisFun_apply` | `basisFun R η i = Pi.single i 1` — basis vectors of `Pi.basisFun`. |
| `Pi.basisFun_repr` | `(Pi.basisFun R η).repr x i = x i` — coordinates w.r.t. `Pi.basisFun` are just function values. |
| `Module.piEquiv` | `(ι → M) ≃ₗ[R] ((ι → R) →ₗ[R] M)` — natural linear equivalence between tuples in `M` and linear maps from `R^ι` to `M`. |
| `Module.piEquiv_apply_apply` | `piEquiv v w = ∑ i, w i • v i` — explicit formula for the equivalence. |
| `Module.range_piEquiv` | `LinearMap.range (piEquiv v) = span R (range v)` — characterizes the image of `piEquiv v`. |
| `Module.surjective_piEquiv_apply_iff` | `Surjective (piEquiv v) ↔ span R (range v) = ⊤` — surjectivity criterion. |
| `Pi.linearIndependent_single` | `LinearIndependent R (fun ji ↦ Pi.single ji.1 (v ji.1 ji.2))` — proves linear independence of generalized standard basis vectors. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `stdBasis_` / `stdBasis`: deprecated aliases for `single` (now in `LinearMap`).
  - `basis_`: used for basis-related definitions (`Pi.basis`, `Pi.basisFun`, `Matrix.stdBasis` — though not in this file).
  - `repr_`: for coordinate representations w.r.t. a basis.
  - `proj_`, `diag_`, `single_`: standard linear map operations on product spaces.

- **Suffixes**:
  - `_apply`: for lemmas about application of maps.
  - `_repr`: for lemmas about coordinate functions.
  - `_same`, `_ne`: for cases where indices are equal or unequal.
  - `_eq_`: for equalities involving standard basis vectors.

- **Pattern**:
  - `stdBasis R φ i b` → deprecated; now `LinearMap.single R φ i b`.
  - `Pi.single j (v j i)` → canonical basis vector in component `j`.
  - `Pi.basis s ⟨j, i⟩ j' = Pi.single j' (s j i)` → full basis vector definition.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`, `dsimp`, `rw`
  - `ext`, `intro`, `cases`, `subst`, `by_cases`
  - `convert`, `apply`, `exact`, `refl`
  - `congr`, `funext`, `symm`
  - `classical`, `have`, `set`

- **Domain-specific tactics**:
  - `linearIndependent_iUnion_finite` — used in `linearIndependent_single`.
  - `span_le`, `range_comp_subset_range`, `iSup₂_mono`, `disjoint_single_single` — for submodule reasoning.
  - `Basis.ofRepr`, `Basis.ofEquivFun`, `Basis.constr`, `Basis.equivFun_ofEquivFun` — basis construction/elimination.

#### 4. **Proof Logic**

- **Structure**:
  - Proofs often proceed by:
    1. **Extensionality** (`ext`) for function equality.
    2. **Case analysis** on index equality (`by_cases hj : j = j'`).
    3. **Substitution** (`subst hj`) or `Ne.symm hj` for inequality cases.
    4. **Simplification** using `Pi.single_eq_same`, `Pi.single_eq_of_ne`, `Finsupp.single_apply`, etc.
  - For basis properties:
    - Use `Basis.ofRepr`/`Basis.ofEquivFun` to define bases.
    - Prove `repr` and `apply` lemmas via `Basis.apply_eq_iff` and `Basis.repr`.
  - For linear independence:
    - Reduce to component-wise independence via `linearIndependent_iUnion_finite`.
    - Use `hs.map'` and `ker_single` to lift independence through `single`.
  - For equivalences:
    - Use `Basis.constr` to define maps from a basis.
    - Prove properties via `Basis.constr_apply_fintype`, `Basis.equivFun_apply`.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.LinearAlgebra.Basis.Defs` | Core basis definitions (`Basis`, `repr`, `equivFun`, etc.). |
| `Mathlib.LinearAlgebra.Finsupp.SumProd` | `Finsupp.sigmaFinsuppLEquivPiFinsupp`, linking `Σ`-indexed `Finsupp` to `Π`. |
| `Mathlib.LinearAlgebra.LinearIndependent` | `LinearIndependent`, `linearIndependent_iUnion_finite`, `disjoint_single_single`. |
| `Mathlib.LinearAlgebra.Pi` | `Pi.single`, `Pi.basisFun`, `LinearMap.single`, `proj`, `diag`, `pi`, etc. |

---

This metadata reflects a module focused on **standard bases in product spaces**, with heavy use of `Pi.single`, `Finsupp`, and basis machinery. The deprecated `stdBasis` names indicate recent refactoring toward `LinearMap.single`, and the proofs rely on a combination of extensionality, case analysis, and module-theoretic lemmas about ranges, kernels, and spans.