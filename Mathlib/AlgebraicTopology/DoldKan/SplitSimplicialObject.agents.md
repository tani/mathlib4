Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `πSummand` | `πSummand A : X.obj Δ ⟶ s.N A.1.unop.len` — projection onto the summand indexed by `A` in the splitting cofan. |
| `cofan_inj_πSummand_eq_id` | `(s.cofan Δ).inj A ≫ s.πSummand A = 𝟙 _` — left-inverse property of the splitting. |
| `cofan_inj_πSummand_eq_zero` | `(s.cofan Δ).inj A ≫ s.πSummand B = 0` when `B ≠ A`. |
| `decomposition_id` | `𝟙 (X.obj Δ) = ∑ A, s.πSummand A ≫ (s.cofan Δ).inj A` — identity decomposes over the splitting. |
| `σ_comp_πSummand_id_eq_zero` | `X.σ i ≫ s.πSummand (id [n+1]) = 0` — degeneracy maps kill the identity-indexed summand. |
| `cofan_inj_comp_PInfty_eq_zero` | If `A ≠ id`, then `(s.cofan).inj A ≫ PInfty.f n = 0`. |
| `comp_PInfty_eq_zero_iff` | `f ≫ PInfty.f n = 0 ↔ f ≫ s.πSummand (id [n]) = 0` — characterizes the image of `PInfty`. |
| `PInfty_comp_πSummand_id` | `PInfty.f n ≫ s.πSummand (id [n]) = s.πSummand (id [n])` — `PInfty` acts as identity on the nondegenerate part. |
| `d` | `d i j : s.N i ⟶ s.N j` — differential on nondegenerate simplices, induced from `K[X].d`. |
| `ιSummand_comp_d_comp_πSummand_eq_zero` | Degenerate summands map to zero under the differential. |
| `nondegComplex` | `ChainComplex C ℕ` — chain complex of nondegenerate simplices of a split simplicial object. |
| `toKaroubiNondegComplexIsoN₁` | `(toKaroubi _).obj s.nondegComplex ≅ N₁.obj X` — isomorphism in the Karoubi envelope between nondegenerate complex and normalized Moore complex. |
| `nondegComplexFunctor` | `Split C ⥤ ChainComplex C ℕ` — functor from split simplicial objects to chain complexes. |
| `toKaroubiNondegComplexFunctorIsoN₁` | `nondegComplexFunctor ⋙ toKaroubi ≅ forget ⋙ DoldKan.N₁` — natural isomorphism of functors. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `πSummand`, `cofan_inj`, `ιSummand` — projections and inclusions from splitting cofan.
  - `PInfty`, `QInfty` — alternating face map components (`PInfty` = projection onto nondegenerate part).
  - `σ` — degeneracy maps (`SimplicialObject.σ`).
  - `d` — differentials on nondegenerate complexes.
- **Suffixes**:
  - `_eq_id`, `_eq_zero`, `_assoc` — indicate simplification or associativity lemmas.
  - `naturality`, `comm`, `comm'` — naturality and commutativity conditions.
  - `f` — component at degree `n` (e.g., `PInfty.f n`).
- **Pattern**:
  - `s.πSummand A`, `s.cofan Δ`, `s.decomposition_id`, `s.d i j` — all depend on the splitting `s`.
  - `IndexSet.id (op [n])` — canonical index for nondegenerate `n`-simplices.

---

### 🔹 **Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `erw`, `dsimp`, `change`, `conv_rhs`
  - `apply`, `intro`, `ext`, `cases`, `rcases`
- **Algebraic simplifications**:
  - `Preadditive.sum_comp`, `Preadditive.comp_sum`, `Finset.sum_eq_single`, `Finset.sum_eq_zero`
  - `assoc`, `reassoc_of%`, `id_comp`, `zero_comp`, `comp_zero`, `sub_eq_zero`, `sub_comp`
- **Homological algebra**:
  - `HomologicalComplex.Hom.comm`, `HomologicalComplex.d_comp_d_assoc`
  - `Karoubi.comp_f`, `Karoubi.id_f`, `N₁_obj_p`
- **Category-theoretic reasoning**:
  - `hom_ext'`, `cofan_inj_epi_naturality_assoc`, `cofan_inj_naturality_symm_assoc`
  - `Fintype.sum_eq_add_sum_compl`, `ne_comm`, `eqId_iff_len_eq`, `eqId_iff_mono`

---

### 🔹 **Proof Logic**

- **Inductive / structural decomposition**:
  - Proofs often decompose morphisms using `decomposition_id` and sum over `IndexSet`.
- **Case analysis on indices**:
  - Many lemmas split on whether an index `A` equals `IndexSet.id`, using `eqId_iff_*`.
- **Zero-morphism arguments**:
  - Degenerate components vanish via `σ_comp_πSummand_id_eq_zero`, `cofan_inj_comp_PInfty_eq_zero`, etc.
- **Karoubi envelope reasoning**:
  - Isomorphisms are constructed via explicit `hom`/`inv` components (`f`), verified using `hom_ext`, `ext`, and simplifications.
- **Functoriality checks**:
  - Map on morphisms uses naturality of `cofan.inj` and `πSummand`, and properties of `PInfty`.

---

### 🔹 **Imports & Scope**

- **Core dependencies**:
  - `Mathlib.AlgebraicTopology.SplitSimplicialObject` — definition of split simplicial objects.
  - `Mathlib.AlgebraicTopology.DoldKan.Degeneracies` — degeneracy maps and their properties.
  - `Mathlib.AlgebraicTopology.DoldKan.FunctorN` — definition of `N₁`, the normalized Moore complex.
- **Category-theoretic infrastructure**:
  - `CategoryTheory.Preadditive`, `CategoryTheory.Idempotents`, `CategoryTheory.Karoubi`
  - `CategoryTheory.Limits` (for finite coproducts)
- **Algebraic topology layer**:
  - `Simplicial`, `DoldKan`, `AlgebraicTopology` namespaces
  - `AlternatingFaceMapComplex`, `PInfty`, `QInfty`, `K[X]`

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch of the main theorem**, or **export to JSON/YAML** for ingestion into an AI agent.