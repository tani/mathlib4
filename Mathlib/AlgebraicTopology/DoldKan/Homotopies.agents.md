### Technical Metadata Brief: `Homotopies.lean` (Dold-Kan Correspondence)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `c` | `abbrev c := ComplexShape.down ℕ` | Encodes the indexing shape for chain complexes over `ℕ`: `c.Rel m n ↔ n + 1 = m`. |
| `c_mk` | `∀ i j, j + 1 = i → c.Rel i j` | Constructs a witness of `c.Rel` from an equality. |
| `cs_down_0_not_rel_left` | `∀ j, ¬c.Rel 0 j` | States that `0` has no incoming edge in `c`; used to apply `nullHomotopicMap'_f_of_not_rel_left`. |
| `hσ` | `hσ (q n) : X _[n] ⟶ X _[n+1]` | A family of “homotopy operators” depending on `q`, defined piecewise: zero if `n < q`, else a signed degeneracy map. |
| `hσ'` | `hσ' q n m hnm : K[X].X n ⟶ K[X].X m` | Lifts `hσ` to a datum for `nullHomotopicMap'`, using `eqToHom` to adjust for the chain complex grading. |
| `hσ'_eq_zero` | `n < q ⇒ hσ' q n m hnm = 0` | Simplifies `hσ'` in low degrees. |
| `hσ'_eq`, `hσ'_eq'` | Explicit formulas for `hσ'` when `n = a + q`. | Used to compute `hσ'` in non-zero degrees. |
| `Hσ` | `Hσ q : K[X] ⟶ K[X]` | The **null homotopic endomorphism** of the alternating face map complex, constructed via `nullHomotopicMap' (hσ' q)`. |
| `homotopyHσToZero` | `Homotopy (Hσ q) 0` | Witness that `Hσ q` is null homotopic (i.e., homotopic to zero). |
| `Hσ_eq_zero` | `(Hσ q).f 0 = 0` | Shows `Hσ q` vanishes in degree `0`. |
| `hσ'_naturality` | Naturality of `hσ'` w.r.t. simplicial maps. | Ensures compatibility with morphisms in `SimplicialObject C`. |
| `natTransHσ` | `natTransHσ q : alternatingFaceMapComplex C ⟶ alternatingFaceMapComplex C` | Promotes `Hσ q` to a natural transformation (i.e., a chain map). |
| `map_hσ'` | Compatibility of `hσ'` with additive functors. | Key for functoriality of the construction. |
| `map_Hσ` | Compatibility of `Hσ` with additive functors. | Follows from `map_hσ'` and functoriality of `nullHomotopicMap'`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hσ`: base homotopy data (degree-wise maps).
  - `hσ'`: lifted version for chain complexes.
  - `Hσ`: induced chain map (null homotopic).
  - `homotopyHσToZero`: homotopy data witnessing null-homotopy.
- **Suffixes**:
  - `_eq`, `_eq_zero`, `_eq'`: lemmas giving explicit equalities.
  - `_naturality`: naturality squares.
  - `map_`: compatibility with additive functors.
- **Structure**:
  - `def` for constructions (`hσ`, `hσ'`, `Hσ`, `natTransHσ`).
  - `theorem` for properties (`hσ'_eq_zero`, `Hσ_eq_zero`, `map_Hσ`, etc.).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp only [...]`: heavily used to simplify definitions and apply lemmas.
  - `rw [...]`: rewriting using equalities (e.g., `ha`, `hnm`).
  - `split_ifs`: handles `if ... then ... else ...` definitions (`hσ`, `hσ'`).
  - `congr`: for proving equality of morphisms or functors.
  - `ext`: extensionality for natural transformations or maps.
  - `omega`: solves arithmetic goals (e.g., `n < q`, `n = a + q`).
  - `erw`: rewriting with definitional equality (e.g., for `eqToHom_refl`).
  - `rcases q with (_|q)`: induction on natural numbers.

- **Homological algebra-specific**:
  - `nullHomotopicMap'`, `nullHomotopy'`: from `Homotopy` library.
  - `ChainComplex.of_d`, `eqToHom_map`, `Functor.map_zsmul`: for manipulating chain complexes and functors.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  - **Case analysis** on `q` (e.g., `q = 0` vs `q > 0`) or `n`.
  - **Rewriting** using definitions (`hσ`, `hσ'`, `Hσ`) and simplifying with `simp`.
  - **Naturality** and **functoriality** are shown via:
    - `ext` + `naturality` of `X.σ`, `f`, or `G`.
    - `congr` + `Functor.map_*` lemmas.
- **Null-homotopy verification**:
  - Uses `nullHomotopicMap'` and `nullHomotopy'` to automatically generate chain maps and homotopies from `hσ'`.
  - Degree-specific properties (e.g., `Hσ_eq_zero`) rely on `nullHomotopicMap'_f_of_not_rel_left` and `cs_down_0_not_rel_left`.
- **Functor compatibility**:
  - `map_hσ'` and `map_Hσ` are proven by unfolding definitions and applying `Functor.map_*` lemmas, often with `congr` and `ext`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.Homology.Homotopy`: provides `nullHomotopicMap'`, `Homotopy`, etc.
  - `Mathlib.AlgebraicTopology.DoldKan.Notations`: notations for Dold–Kan constructions (e.g., `K[X]`, `alternatingFaceMapComplex`).
- **Open namespaces**:
  - `CategoryTheory`, `Homotopy`, `Simplicial`, `DoldKan`, etc.
- **Context**:
  - `C`: preadditive category.
  - `X`: simplicial object in `C`.
  - `K[X]`: alternating face map complex associated to `X`.
- **Goal**:
  - Construct null homotopic endomorphisms `Hσ q` of `K[X]`, natural and functorial, as building blocks for the idempotent `P∞` in `PInfty.lean`.

---

This file is a **foundational technical component** of the Dold–Kan correspondence in Lean, focusing on the homotopical control of degeneracy maps via null homotopic corrections. Its structure reflects the strategy outlined in the docstring: avoid direct chain-map verification by encoding corrections as null homotopies.