### Technical Metadata Brief: `Mathlib.FieldTheory.NormalClosure`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsNormalClosure` | `class IsNormalClosure : Prop` | Predicate stating that `L/F` is a *normal closure* of `K/F`: (1) all minimal polynomials of elements of `K` over `F` split in `L`, and (2) `L` is generated over `F` by the roots of such minimal polynomials. |
| `normalClosure` | `def normalClosure : IntermediateField F L` | Explicit construction of the smallest intermediate field of `L/F` containing the image of every `F`-algebra embedding `K →ₐ[F] L`. |
| `IsNormalClosure.normal` | `lemma` | If `L/F` is a normal closure of `K/F`, then `L/F` is normal. |
| `normalClosure_le_iff` | `lemma` | Characterizes the inclusion `normalClosure F K L ≤ K'` via embeddings: holds iff all `F`-algebra maps `K →ₐ[F] L` have range in `K'`. |
| `AlgHom.fieldRange_le_normalClosure` | `lemma` | Every embedding `K →ₐ[F] L` has its field range contained in `normalClosure F K L`. |
| `normalClosure_eq_iSup_adjoin_of_splits` | `lemma` | When all minimal polynomials of `K/F` split in `L/F`, `normalClosure F K L` equals the join of `adjoin F ((minpoly F x).rootSet L)` over `x ∈ K`. |
| `isNormalClosure_iff` | `lemma` | For algebraic `K/F`, `IsNormalClosure F K L` iff all minimal polynomials split in `L/F` and `normalClosure F K L = ⊤`. |
| `isNormalClosure_normalClosure` | `lemma` | Under algebraicity and splitting, `normalClosure F K L` itself satisfies `IsNormalClosure F K (normalClosure F K L)`. |
| `IsNormalClosure.lift` | `def` | Given `IsNormalClosure F K L`, constructs an `F`-algebra map `L →ₐ[F] L'` for any `L'/F` where minimal polynomials of `K/F` split. |
| `IsNormalClosure.equiv` | `def` | Uniqueness up to `F`-algebra isomorphism: any two normal closures of `K/F` are `F`-isomorphic. |
| `normalClosure.algHomEquiv` | `def` | Bijection between embeddings `K →ₐ[F] normalClosure F K L` and `K →ₐ[F] L`. |
| `normalClosure.closureOperator` | `def` | `normalClosure` as a closure operator on `IntermediateField F L`. |
| `normal_iff_normalClosure_eq` | `lemma` | `K/F` is normal iff `normalClosure F K L = K`. |
| `normal_iff_forall_fieldRange_eq` | `lemma` | `K/F` is normal iff for all `σ : K →ₐ[F] L`, `σ.fieldRange = K`. |
| `Algebra.IsAlgebraic.algHomEmbeddingOfSplits` | `def` | Injective map `(K →ₐ[F] L') ↪ (K →ₐ[F] L)` when all minimal polynomials of `K/F` split in `L/F`. |

---

#### **2. Naming Conventions**

- **Predicates / properties**:  
  - `isNormalClosure_*`: e.g., `isNormalClosure_iff`, `isNormalClosure_normalClosure`  
  - `normal_iff_*`: characterizations of normality via `normalClosure`.

- **Construction / explicit definitions**:  
  - `normalClosure_*`: e.g., `normalClosure`, `normalClosure_def`, `normalClosure_eq_iSup_adjoin`, `normalClosure_map_eq`.

- **Embeddings / maps**:  
  - `AlgHom.fieldRange_*`, `AlgHom.liftNormal_*`, `AlgHom.comp`, `codRestrict`.

- **Equivalences / uniqueness**:  
  - `IsNormalClosure.equiv`, `IsNormalClosure.lift`.

- **Closure operator**:  
  - `closureOperator`, with `normalClosure_*` variants for its properties.

- **Splits / root sets**:  
  - `splits_of_splits`, `splits_of_splits_of_dvd`, `mem_rootSet`, `rootSet`.

- **Intermediate fields**:  
  - `adjoin`, `fieldRange`, `map`, `restrictScalars`, `algebra'`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (`normalClosure`, `fieldRange`, `adjoin`, etc.) and simplifying with rewrite rules. |
| `exact`, `refine`, `apply` | Constructing proofs using lemmas like `normalClosure_eq_iSup_adjoin_of_splits`, `isNormalClosure_iff`. |
| `iSup_le`, `le_iSup`, `antisymm` | Handling joins (`⨆`) over embeddings or root sets. |
| `cases`, `obtain`, `by_cases` | Decomposing existential or conditional hypotheses (e.g., `by_cases iy : IsIntegral F y`). |
| `simpa`, `simp only` | Simplifying goals using known equivalences or lemmas. |
| `ext`, `funext`, `DFunLike.ext'_iff` | Extensionality for functions, algebra maps, and subtype-valued objects. |
| `apply_fun`, `map_mono`, `map_map` | Manipulating images of maps on intermediate fields. |
| `nonempty.some`, `nonempty_algHom_*` | Using nonemptiness to pick witnesses (e.g., algebra homs from splitting). |
| `field_simp`, `ring`, `aesop` | Basic simplifications in field/ring contexts (implied by imports). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction / case analysis** is rare; instead, proofs rely heavily on:
    - **Universal properties** (e.g., `normalClosure` as a join of field ranges).
    - **Splitting conditions** (e.g., using `splits_of_splits`, `minpoly.dvd`).
    - **Embedding factorization** (e.g., `algHomEquiv`, `codRestrict`).
    - **Uniqueness via bijectivity** (e.g., `AlgEquiv.ofBijective`).
  - **Equality proofs** often use `antisymm` on inclusions derived from:
    - `normalClosure_le_iff`
    - `normalClosure_eq_iSup_adjoin_of_splits`
    - `iSup_le_iff`
  - **Normality characterizations** are proven via equivalence chains:
    - `normal_iff_normalClosure_eq` ↔ `normal_iff_forall_fieldRange_eq` ↔ `normal_iff_forall_map_eq`.

- **Key logical flow**:
  1. Define `normalClosure` as a join over embeddings.
  2. Show it satisfies `IsNormalClosure` under algebraicity + splitting.
  3. Prove uniqueness via `IsNormalClosure.lift` and bijectivity.
  4. Derive closure operator properties and normality equivalences.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.RingTheory.SimpleRing.Basic` | Basic ring theory (e.g., simple rings, used for structural lemmas). |
| `Mathlib.FieldTheory.Normal` | Core theory of normal extensions (`Normal`, `splits`, `isSplittingField`). |
| `Mathlib.Order.Closure` | Closure operators and Galois connections (`gc.l_iSup`, `ClosureOperator`). |
| `Mathlib.LinearAlgebra.FreeModule.Finite.Matrix` | Finite-dimensional vector space tools (e.g., `finiteDimensional_range`). |

> **Note**: The file builds on `IntermediateField`, `Algebra`, `Polynomial`, and `IsScalarTower` (from `Mathlib.FieldTheory.Tower`), which are implicitly imported via the above.

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `Mathlib` field theory hierarchy.