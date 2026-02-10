Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `p_comp_d` | `P.p.f n ≫ f.f.f n = f.f.f n` — Commutativity of the projection `P.p` with a morphism `f`. |
| `comp_p_d` | `f.f.f n ≫ Q.p.f n = f.f.f n` — Commutativity of `f` with the projection `Q.p`. |
| `p_comm_f` | `P.p.f n ≫ f.f.f n = f.f.f n ≫ Q.p.f n` — Compatibility of `f` with the idempotents `P.p`, `Q.p`. |
| `p_idem` | `P.p.f n ≫ P.p.f n = P.p.f n` — Idempotency of the projection `P.p` at each degree `n`. |
| `Functor.obj` | Constructs an object in `HomologicalComplex (Karoubi C) c` from `P : Karoubi (HomologicalComplex C c)`, using the image of the idempotent `P.p`. |
| `Functor.map` | Maps a morphism `f : P ⟶ Q` in `Karoubi (HomologicalComplex C c)` to a morphism in `HomologicalComplex (Karoubi C) c`. |
| `Functor` | The forward functor `Karoubi (HomologicalComplex C c) ⥤ HomologicalComplex (Karoubi C) c`. |
| `Inverse.obj` | Constructs an object in `Karoubi (HomologicalComplex C c)` from `K : HomologicalComplex (Karoubi C) c`, by “unfolding” the Karoubi objects. |
| `Inverse.map` | Maps a morphism `f : K ⟶ L` in `HomologicalComplex (Karoubi C) c` to a morphism in `Karoubi (HomologicalComplex C c)`. |
| `Inverse` | The inverse functor `HomologicalComplex (Karoubi C) c ⥤ Karoubi (HomologicalComplex C c)`. |
| `counitIso` | Isomorphism `inverse ⋙ functor ≅ 𝟭`, part of the equivalence. |
| `unitIso` | Isomorphism `𝟭 ≅ functor ⋙ inverse`, part of the equivalence. |
| `karoubiHomologicalComplexEquivalence` | The main equivalence of categories: `Karoubi (HomologicalComplex C c) ≌ HomologicalComplex (Karoubi C) c`. |
| `karoubiChainComplexEquivalence` | Specialization to chain complexes: `Karoubi (ChainComplex C α) ≌ ChainComplex (Karoubi C) α`. |
| `karoubiCochainComplexEquivalence` | Specialization to cochain complexes: `Karoubi (CochainComplex C α) ≌ CochainComplex (Karoubi C) α`. |
| `instance [IsIdempotentComplete C]` | Proves that if `C` is idempotent complete, then so is `HomologicalComplex C c`, via the equivalence. |

---

### 🔹 **Naming Conventions**

- **Prefixes:**
  - `p_`: refers to the projection morphism of an idempotent in the Karoubi completion (e.g., `p_comp`, `p_idem`, `p_comm`).
  - `comp_`: composition-related properties (e.g., `comp_p_d`, `comp_f`).
  - `d_`: differential in homological complexes (e.g., `d_comp_d`, `d i j`).
  - `shape`: encodes the shape condition of a complex (e.g., `shape`, `d_comp_d'`).
- **Suffixes:**
  - `_f`: refers to the underlying morphism in the base category (e.g., `P.p.f n`, `f.f.f n`).
  - `_n`: degree-wise component at index `n : ι`.
  - `_iso`: for isomorphisms in unit/counit of adjunctions/equivalences.
- **Structure fields:**
  - `X`, `d`, `p`, `idem`, `shape`: standard for homological complexes and Karoubi objects.

---

### 🔹 **Tactic Stack**

- **`aesop_cat`**: Used heavily for categorical reasoning (naturality, associativity, unit laws).
- **`simp only [...]`**: Extensive use of `simp` with explicit lemmas to avoid unfolding too much.
- **`dsimp`**: Used to simplify definitional equalities before `simp`.
- **`ext`**: Extensionality for morphisms (e.g., in `HomologicalComplex.Hom`).
- **`simpa only [...] using ...`**: To discharge goals by simplifying with a specific lemma.
- **`hom_eq_zero_iff.mp`**: Extracting equality to zero from a hypothesis.
- **`infer_instance`**: For typeclass resolution (e.g., idempotent completeness).

---

### 🔹 **Proof Logic**

- **Structure of proofs:**
  - **Object-level constructions** (`obj`) are verified by:
    - Showing the differential squares to zero (`shape`, `d_comp_d'`).
    - Showing idempotency of projections (`idem`).
  - **Morphism-level constructions** (`map`) verify:
    - Compatibility with differentials (`comm'`).
    - Naturality of the Karoubi morphism.
  - **Equivalence proof**:
    - Construct unit and counit natural isomorphisms.
    - Prove triangle identities using `simp` and `ext`, leveraging idempotency (`p_idem`) and compatibility lemmas (`p_comp_d`, `comp_p_d`).
  - **Idempotent completeness**:
    - Uses `isIdempotentComplete_iff_of_equivalence` to transfer completeness along equivalences.

- **Common pattern**:  
  `ext n` → `dsimp` → `simp only [p_idem, comp_f, ...]` → `aesop_cat`.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Homology.Additive` | Provides background on additive categories, homological complexes, and differentials. |
| `Mathlib.CategoryTheory.Idempotents.Karoubi` | Defines the Karoubi completion and its universal property. |

**Key typeclasses used:**
- `[Category C]`, `[Preadditive C]`: Base category assumptions.
- `[IsIdempotentComplete C]`: For the final instance.
- `ComplexShape ι`: Shape of the complex.
- `[AddRightCancelSemigroup α]`, `[One α]`: For chain/cochain complex specializations.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch**, or **automation suggestions** for this file.