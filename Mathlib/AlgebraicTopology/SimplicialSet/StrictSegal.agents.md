### Technical Brief: `StrictSegal` Simplicial Sets in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `StrictSegal` | `class` | Defines a simplicial set `X` where simplices are uniquely determined by their *spine*; i.e., the map `spine X n : X[_[n]] → Path X n` is an equivalence. |
| `spineToSimplex` | `{n : ℕ} → Path X n → X _[n]` | Inverse to `spine X n`. |
| `spineEquiv` | `X _[n] ≃ Path X n` | Equivalence induced by `spine` and `spineToSimplex`. |
| `spine_spineToSimplex` | `X.spine n (spineToSimplex f) = f` | Right-inverse property. |
| `spineToSimplex_spine` | `spineToSimplex (X.spine n Δ) = Δ` | Left-inverse property. |
| `spineToDiagonal` | `Path X n → X _[1]` | Composes a path via the diagonal edge of the associated `n`-simplex. |
| `spineToSimplex_interval` | `X.map (subinterval j l hjl).op (spineToSimplex f) = spineToSimplex (Path.interval f j l hjl)` | Compatibility of `spineToSimplex` with subintervals. |
| `spineToSimplex_edge` | `X.map (intervalEdge j l hjl).op (spineToSimplex f) = spineToDiagonal (Path.interval f j l hjl)` | Relates edge maps to diagonal composition. |
| `spineToSimplex_map` | `spineToSimplex (f.map σ) = σ.app _ (spineToSimplex f)` | Naturality of `spineToSimplex` under maps between `StrictSegal` simplicial sets. |
| `spine_δ_vertex_lt`, `spine_δ_vertex_ge`, `spine_δ_arrow_lt`, `spine_δ_arrow_gt`, `spine_δ_arrow_eq` | Various lemmas | Describe how faces of `spineToSimplex f` relate to `f`, especially regarding vertices/arrows and their positions relative to the deleted vertex `j`. |
| `strictSegal` | `instance` | Shows nerves of categories satisfy `StrictSegal`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `spine_`: Properties involving the spine map or its inverse.
  - `spineToSimplex_`: Properties of the inverse to the spine map.
  - `spineToDiagonal`: Composition of paths via diagonal edge.
- **Suffixes**:
  - `_vertex_lt`, `_vertex_ge`, `_arrow_lt`, `_arrow_gt`, `_arrow_eq`: Distinguish cases based on index comparisons (`i < j`, `i ≥ j`, etc.).
  - `_interval`, `_edge`: Refer to subinterval or edge maps.
- **General**:
  - `Equiv`-based names like `spineEquiv` indicate equivalence constructions.
  - `map`, `naturality`, `congr_obj`, `eqToHom`: Standard categorical terminology.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using equalities (especially `spine_spineToSimplex`, `spineToSimplex_spine`, naturality).
- `simp only [...]`: Simplification with precise lemmas (e.g., `spineToSimplex_arrow`, `spineToSimplex_vertex`, `FunctorToTypes.map_comp_apply`).
- `apply spineInjective`: Leveraging injectivity of equivalences.
- `ext i`: Extensionality for functions or natural transformations.
- `fapply ... ext`: Used in `strictSegal` instance to prove equality of `ComposableArrows`.
- `omega`: For arithmetic goals (e.g., `j + l ≤ n`).
- `convert ... exact Eq.symm ...`: For equational reasoning with symmetric equalities.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a pattern:  
    **(i)** Reduce to showing equality of components (vertices/arrows),  
    **(ii)** Use `spineToSimplex_spine` / `spine_spineToSimplex` to eliminate inverses,  
    **(iii)** Apply naturality or simplicial identities (e.g., `spine_map_subinterval`, `const_comp`, `op_comp`),  
    **(iv)** Use `Fin` arithmetic lemmas (e.g., `Fin.succAbove_of_castSucc_lt`) to handle indexing.
- **Inductive/Case-based reasoning**:
  - Lemmas like `spine_δ_*` split on whether indices are less than/greater than/equal to `j`.
  - Arithmetic lemmas (`omega`, `le_of_lt`, `lt_of_le_of_lt`) resolve ordering constraints.
- **Naturality arguments**:
  - `spineToSimplex_map` uses naturality of `σ` and simplification of `Path.map`.
- **Instance construction** (`strictSegal`):
  - Constructs `spineToSimplex` explicitly using `ComposableArrows.mkOfObjOfMapSucc`.
  - Proves inverses using `ComposableArrows.ext` and `ext₀`/`ext₁`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.AlgebraicTopology.SimplicialSet.Nerve`: Defines nerve of categories and basic simplicial set theory.
- `Mathlib.AlgebraicTopology.SimplicialSet.Path`: Defines paths (spine-compatible sequences of edges/vertices).
- `Mathlib.CategoryTheory.Functor.KanExtension.Adjunction`, `Basic`: For categorical machinery (e.g., adjunctions, Kan extensions), though not directly used in this file.

**Domain scope**:
- **Simplicial sets** (`SSet`), specifically those satisfying the *strict Segal condition*.
- **Nerve of categories**, shown to be strict Segal.
- **Homotopy-theoretic properties**: Though not yet formalized here, the comment notes that `StrictSegal` ⇒ `2`-coskeletal (proven elsewhere).

---

#### **6. Future Work / TODO**

- Prove that *every* `StrictSegal` simplicial set is isomorphic to the nerve of its homotopy category.
- Use this to characterize the essential image of the nerve functor.

--- 

This module formalizes foundational properties of strict Segal simplicial sets, emphasizing the equivalence between simplices and paths, and sets up the stage for deeper structural results (e.g., coskeletality, classification via homotopy categories).