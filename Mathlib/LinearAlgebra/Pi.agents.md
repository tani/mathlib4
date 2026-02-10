### Technical Brief: Pi Types of Modules in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `pi` | `pi (f : (i : ι) → M₂ →ₗ[R] φ i) : M₂ →ₗ[R] (i : ι) → φ i`<br>Constructs a linear map into a dependent function space from a family of linear maps. |
| `proj` | `proj (i : ι) : ((i : ι) → φ i) →ₗ[R] φ i`<br>Projection onto the `i`-th component of a pi-type module. |
| `single` | `single (i : ι) : φ i →ₗ[R] (i : ι) → φ i`<br>Embeds a module element into the `i`-th coordinate (canonical basis embedding). |
| `diag` | `diag (i j : ι) : φ i →ₗ[R] φ j`<br>Identity if `i = j`, zero otherwise; used to express `single` as `pi (diag i)`. |
| `lsum` | `lsum (S) : ((i : ι) → φ i →ₗ[R] M) ≃ₗ[S] ((i : ι) → φ i) →ₗ[R] M`<br>Linear equivalence for finite index sets: linear maps from a product to `M` ↔ families of linear maps from each factor to `M`. |
| `piCongrRight` | `piCongrRight (e : (i : ι) → φ i ≃ₗ[R] ψ i) : ((i : ι) → φ i) ≃ₗ[R] (i : ι) → ψ i`<br>Pointwise application of a family of linear equivalences. |
| `piRing` | `piRing : ((ι → R) →ₗ[R] M) ≃ₗ[S] ι → M`<br>Linear equivalence between linear maps `Rⁿ → M` and `Mⁿ`, for finite `ι`. |
| `vecCons`, `vecEmpty` | `vecCons : M →ₗ[R] M₂ → Fin n.succ → M₂`, `vecEmpty : M →ₗ[R] Fin 0 → M₃`<br>Bundled versions of `Matrix.vecCons`/`vecEmpty`, definitionally compatible with `Fin` recursion. |
| `ker_pi` | `ker (pi f) = ⨅ i, ker (f i)`<br>Kernel of a `pi` map is the infimum of kernels. |
| `proj_comp_single_same` | `(proj i).comp (single i) = id`<br>Projection after embedding recovers identity. |
| `proj_comp_single_ne` | `i ≠ j ⇒ (proj i).comp (single j) = 0`<br>Projection after embedding into a different coordinate is zero. |
| `iSup_range_single_eq_iInf_ker_proj` | Under disjointness and covering assumptions, the sum of ranges of `single`s equals the intersection of kernels of `proj`s. |
| `pi_ext`, `pi_ext'` | Extensionality lemmas: a linear map is determined by its values on `Pi.single i x` or on `single i`. |
| `piCongrLeft'`, `piCongrLeft` | Transport along equivalences of the index type. |
| `funUnique` | `(ι → M) ≃ₗ[R] M` when `ι` is a singleton. |
| `piFinTwo` | `((i : Fin 2) → M i) ≃ₗ[R] M 0 × M 1`<br>Equivalence for binary products. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `pi_`: operations on pi-types in codomain or domain (`pi`, `pi_comp`, `pi_eq_zero`, `pi_ext`, `piRing`, `piCongrRight`, etc.)
  - `proj`: projections from pi-types (`proj`, `proj_apply`, `proj_pi`, `iInf_ker_proj`, etc.)
  - `single`: embeddings into pi-types (`single`, `single_apply`, `single_eq_pi_diag`, etc.)
  - `diag`: diagonal maps (`diag`, `update_apply`)
  - `vecCons`/`vecEmpty`: vector construction via `Fin` recursion.

- **Suffixes**:
  - `_apply`: evaluation of bundled maps (`pi_apply`, `proj_apply`, `single_apply`, `vecCons_apply`)
  - `_eq_zero`, `_same`, `_ne`: case distinctions (`proj_comp_single_same`, `proj_comp_single_ne`)
  - `_le_`, `_eq_`, `_antisymm`: order/equality statements in submodule lattices (`iSup_range_single_le_iInf_ker_proj`, `iInf_ker_proj_le_iSup_range_single`)
  - `_congr`, `_trans`, `_refl`: equivalence composition properties (`piCongrRight_trans`, etc.)

- **`coe_` prefix**: coercion lemmas (`coe_proj`, `coe_single`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `ext` | Extensionality (for functions, linear maps, submodules) |
| `simp` / `simp only` | Simplification using `@[simp]` lemmas (e.g., `pi_apply`, `proj_apply`, `single_apply`) |
| `rw` | Rewriting using equalities (often with `pi_apply`, `proj_pi`, `Finset.sum_apply`) |
| `convert` | Partial unification, especially with definitional equalities (e.g., `single_eq_pi_diag`) |
| `Finset.sum_congr`, `Finset.sum_add_distrib`, `Finset.smul_sum` | Summation manipulations over finite types |
| `by_cases`, `classical` | Case analysis on membership or equality |
| `exact`, `refine`, `apply` | Goal-directed proof construction |
| `aesop` / `ring` | Not heavily used here; proofs are mostly structural and rely on `simp` + `ext` |
| `convert` + `rfl` | For definitional equalities (e.g., `single_eq_pi_diag`) |

---

#### **4. Proof Logic**

- **Structural Induction / Extensionality**:
  - Proofs of equality of linear maps rely on `LinearMap.ext` (extensionality) and `pi_ext`/`pi_ext'`.
  - Submodule equalities use `Subtype.ext` and `SetLike.ext` (i.e., `ext x`).

- **Decomposition over Finite Index Sets**:
  - Many proofs (e.g., `lsum`, `piRing`, `iSup_range_single_eq_iInf_ker_proj`) use finite summation over `Finset.univ` and properties like:
    - `Finset.univ_sum_single`: every function is a sum of its values on basis vectors.
    - `Finset.sum_apply`: evaluation of finite sums pointwise.

- **Disjointness & Covering Arguments**:
  - Key lemmas like `iSup_range_single_le_iInf_ker_proj` and `disjoint_single_single` use:
    - `Disjoint` and `Set.disjoint_iff_inf_le`
    - `mem_iInf`, `mem_ker`, `mem_range`, `range_le_iff_comap`
    - `resolve_left`, `le_bot` for contradiction in disjoint sets.

- **Equivalence Construction**:
  - `LinearEquiv.ofLinear` used to build equivalences from linear maps with explicit inverses.
  - `lsum` and `piRing` use `lsum_apply` and `piRing_symm_apply` to verify inverses.

- **Definitional Reasoning**:
  - `vecCons`/`vecEmpty` avoid definitional mismatches of `pi` with `Fin` recursion by using `Matrix` constructors directly.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.Fin.Tuple` — finite types and tuples.
- `Mathlib.Algebra.BigOperators.GroupWithZero.Action` — big operators over actions.
- `Mathlib.Algebra.BigOperators.Pi` — big operators over pi-types.
- `Mathlib.Algebra.Module.Prod`, `Submodule.Ker`, `Submodule.Range`, `Equiv.Basic` — module theory foundations.
- `Mathlib.Logic.Equiv.Fin` — equivalences involving `Fin`.

**Scope**:
- Focuses on **linear maps between pi-types of modules**, especially over arbitrary index types `ι`.
- Central theme: interplay between:
  - `pi` (product construction),
  - `proj` (projections),
  - `single` (canonical basis embeddings),
  - `diag` (diagonal maps),
  - and their interactions (e.g., `proj ∘ single = id` or `0`, `ker(pi f) = ⋂ ker(f i)`).
- Includes finite-index equivalences (`lsum`, `piRing`) and structural lemmas for submodule lattices (`iSup`/`iInf` over `range(single)` and `ker(proj)`).

--- 

This module serves as a foundational toolkit for manipulating linear maps involving dependent function spaces, especially in contexts like matrix representations, module decompositions, and finite-dimensional linear algebra in dependent type theory.