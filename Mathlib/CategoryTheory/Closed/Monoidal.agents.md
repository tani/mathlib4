### Technical Metadata Brief: Closed Monoidal Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Closed X` | `Class` | States that object `X` is *right closed*, i.e., `tensorLeft X ⊣ rightAdj X`. Carries a *specific* choice of right adjoint. |
| `MonoidalClosed C` | `Class` | asserts *every* object in `C` is closed (via `closed X : Closed X`). |
| `ihom A` | `C ⥤ C` | The internal hom functor: `A ⟶[C] -`, defined as `Closed.rightAdj A`. |
| `ev A` | `ihom A ⋙ tensorLeft A ⟶ 𝟭 C` | Evaluation natural transformation (counit of the adjunction). |
| `coev A` | `𝟭 C ⟶ tensorLeft A ⋙ ihom A` | Coevaluation natural transformation (unit of the adjunction). |
| `A ⟶[C] B` | Notation for `ihom A .obj B` | Internal hom object. |
| `curry f` | `(A ⊗ Y ⟶ X) → (Y ⟶ A ⟶[C] X)` | Currying isomorphism (homEquiv of adjunction). |
| `uncurry f` | `(Y ⟶ A ⟶[C] X) → (A ⊗ Y ⟶ X)` | Uncurrying (inverse of curry). |
| `pre f` | `ihom A ⟶ ihom B` (for `f : B ⟶ A`) | Pre-composition with `f`, natural in `A`. |
| `internalHom` | `Cᵒᵖ ⥤ C ⥤ C` | Bifunctorial internal hom: `(X, Y) ↦ X ⟶[C] Y`. |
| `ofEquiv F adj` | `MonoidalClosed C` | Pulls back monoidal closed structure along monoidal equivalence `F : C ≌ D`. |
| `id x`, `comp x y z` | `C`-morphisms | Identity and composition for enrichment over `C`. |
| `compTranspose x y z` | `x ⊗ (x ⟶ y) ⊗ (y ⟶ z) ⟶ z` | Uncurried composition for enrichment. |

**Key Theorems:**
- `curry_uncurry`, `uncurry_curry`: `curry` and `uncurry` are inverses.
- `curry_natural_left/right`, `uncurry_natural_left/right`: Naturality of currying/uncurrying.
- `pre_id`, `pre_map`: `pre` is a contravariant functor.
- `id_comp`, `comp_id`, `assoc`: Verifies enriched category axioms (unitality, associativity).
- `ofEquiv_curry_def`, `ofEquiv_uncurry_def`: Explicit description of currying/uncurrying after transport across equivalence.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `ihom_`: Internal hom-related (e.g., `ihom`, `ihom.adjunction`, `ihom.ev`, `ihom.coev`).
  - `pre_`: Pre-composition in internal hom.
  - `comp_`, `compTranspose_`: Enriched composition and its uncurried version.
  - `curry_`, `uncurry_`: Currying/uncurrying maps and naturality lemmas.
  - `ev_`, `coev_`: Evaluation/coevaluation (counit/unit).
  - `MonoidalClosed.`: Namespace for global operations (e.g., `MonoidalClosed.curry`).
- **Suffixes:**
  - `_app`: Application at an object (e.g., `ev A .app X`).
  - `_naturality`: Naturality squares (e.g., `ev_naturality`).
  - `_eq`, `_def`: Definitions or unfoldings (e.g., `curry_eq`, `compTranspose_eq`).
  - `_assoc`, `_inv`: For associator/unitor components (e.g., `triangle_assoc_comp_right_assoc`).
- **Notation:**
  - `A ⟶[C] B`: Internal hom object.
  - `A ◁ f`: Left whiskering (`tensorLeft A .map f`).
  - `f ▷ X`: Right whiskering (`f ⊗ 𝟙 X`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rfl`, `simp`, `rw`: Basic rewriting and simplification.
- `apply uncurry_injective`: Injectivity of `uncurry` used repeatedly to reduce equalities.
- `uncurry_curry`, `curry_uncurry`: To eliminate currying/uncurrying.
- `dsimp`, `change`: For simplifying definitions (especially in `ofEquiv_*_def`).
- `adjunction_*` lemmas: `homEquiv_naturality_left/right`, `left_triangle_components`, `right_triangle_components`.
- `conjugateEquiv_*`, `unit_conjugateEquiv`, `counit_conjugateEquiv`: For manipulating adjoint equivalences.
- `tensorLeft_*`, `leftUnitor_*`, `associator_*`: Monoidal structure lemmas.
- `whisker_*`, `comp_whiskerRight`, `pentagon_*`: For manipulating whiskering and associators.
- `apply uncurry_injective; rw [...]`: Common proof pattern for enrichment axioms.

---

#### **4. Proof Logic**

- **Enrichment proofs** (e.g., `id_comp`, `comp_id`, `assoc`) follow a standard pattern:
  1. Apply `uncurry_injective` to reduce to external hom.
  2. Expand definitions (`comp_eq`, `compTranspose_eq`, `id_eq`).
  3. Use `uncurry_natural_left/right`, `uncurry_curry`, and monoidal naturality/symmetry.
  4. Simplify using triangle identities (`triangle_assoc_*`, `right_triangle_components`).
  5. Conclude with `simp`.

- **Transport across equivalence** (`ofEquiv_*`):
  - Uses `Adjunction.ofNatIsoLeft`, `Adjunction.comp_homEquiv`, and `Functor.Monoidal.commTensorLeft`.
  - Proofs are mostly `rfl`-style after unfolding definitions, but require careful manipulation of natural isomorphisms.

- **Currying/uncurrying naturality**:
  - Directly from `Adjunction.homEquiv_naturality_*`.
  - Often used with `reassoc` attribute for simplifier.

- **Internal hom bifunctoriality**:
  - `pre_map`, `pre_id`, `pre_comm_ihom_map` follow from properties of `conjugateEquiv`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Monoidal.Functor` | Monoidal functors, tensoring, `tensorLeft`, `tensorRight`. |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Preservation of colimits by left adjoints (`PreservesColimits`). |
| `Mathlib.CategoryTheory.Adjunction.Mates` | Mates, conjugate equivalences, `conjugateEquiv`, `unit_conjugateEquiv`. |

**Note**: The file assumes a monoidal category structure (`[MonoidalCategory C]`) and builds on adjunction theory. It does *not* assume cartesian structure — it works for general monoidal categories.

---

This module formalizes the foundational theory of (right) closed monoidal categories, internal homs, currying, and enrichment. It is designed to be used as a base for further development (e.g., enrichment, *-autonomous categories, compact closed categories).