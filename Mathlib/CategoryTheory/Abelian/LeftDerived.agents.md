### Technical Metadata Brief: Left-Derived Functors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Functor.leftDerivedToHomotopyCategory` | `C ⥤ HomotopyCategory D (ComplexShape.down ℕ)` | Sends an object `X` to `F` applied to a projective resolution of `X`, viewed in the homotopy category. |
| `ProjectiveResolution.isoLeftDerivedToHomotopyCategoryObj` | `F.leftDerivedToHomotopyCategory.obj X ≅ (F.mapHomologicalComplex _ ⋙ HomotopyCategory.quotient _ _).obj P.complex` | Shows that applying `F` to a projective resolution and projecting to the homotopy category is isomorphic to the image under `F.leftDerivedToHomotopyCategory`. |
| `Functor.leftDerived` | `(n : ℕ) → C ⥤ D` | The *n*-th left-derived functor of `F`, defined as composition with the *n*-th homology functor. |
| `ProjectiveResolution.isoLeftDerivedObj` | `(F.leftDerived n).obj X ≅ HomologicalComplex.homologyFunctor D _ n .obj (F.mapHomologicalComplex _ .obj P.complex)` | Computes the *n*-th left-derived functor using a chosen projective resolution. |
| `Functor.isZero_leftDerived_obj_projective_succ` | `(n : ℕ) → [Projective X] → IsZero ((F.leftDerived (n + 1)).obj X)` | Higher left-derived functors vanish on projective objects. |
| `NatTrans.leftDerivedToHomotopyCategory` | `(α : F ⟶ G) → F.leftDerivedToHomotopyCategory ⟶ G.leftDerivedToHomotopyCategory` | Induces a natural transformation between homotopy-category-level constructions from a natural transformation between functors. |
| `NatTrans.leftDerived` | `(α : F ⟶ G) → (n : ℕ) → F.leftDerived n ⟶ G.leftDerived n` | Induces a natural transformation between left-derived functors. |
| `Functor.fromLeftDerivedZero` | `F.leftDerived 0 ⟶ F` | Canonical comparison map from degree-0 left-derived functor to original functor. |
| `Functor.leftDerivedZeroIsoSelf` | `F.leftDerived 0 ≅ F` | Isomorphism when `F` preserves finite colimits (i.e., is right exact). |
| `ProjectiveResolution.fromLeftDerivedZero'` | `opcycles 0 → F.obj X` | Maps opcycles in degree 0 of `F(P.complex)` to `F(X)`, used to define `fromLeftDerivedZero`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `leftDerived`: Indicates left-derived functors.
  - `fromLeftDerived`: Refers to canonical maps *from* degree-0 derived functors.
  - `isoLeftDerived`: Isomorphisms relating derived functors to explicit constructions via resolutions.
  - `mapHomotopyCategory`, `mapHomologicalComplex`: Functors induced by `F` on homotopy/homological complexes.
  - `opcycles`, `homologyFunctor`: Homological algebra constructions.

- **Suffixes:**
  - `Obj`: Applied to objects (e.g., `isoLeftDerivedObj`).
  - `app`: Component of a natural transformation at an object.
  - `naturality`: Naturality lemmas for isomorphisms/natural transformations.
  - `assoc`: Reassoc lemmas for associativity of composition (used with `rw [assoc]`, `rw [assoc]`).

- **Other patterns:**
  - `self`: For canonical projective resolution of a projective object (`ProjectiveResolution.self X`).
  - `lift`: For lifts of morphisms between resolutions.

---

#### **3. Tactic Stack**

- **Core tactics used repeatedly:**
  - `rw [assoc, ← Functor.map_comp, ...]`: Rewriting using associativity and functoriality.
  - `dsimp`: Simplifying definitions (especially for `leftDerived`, `isoLeftDerivedObj`, etc.).
  - `simp only [...]`: Fine-grained simplification using specific lemmas.
  - `erw [...]`: Eager rewriting (used for naturality of homology functors/factors).
  - `rfl`: Reflexivity for definitional equalities.
  - `apply`, `exact`, `refine`: For constructing proofs, especially for `IsZero`, `IsIso`.
  - `cancel_mono`, `cancel_epi`: Cancellation lemmas for monos/epis.
  - `infer_instance`: For typeclass resolution (e.g., `IsIso` instances).
  - `simp only [comp_id, id_comp]`: Simplifying identity morphisms.

- **Homological algebra-specific:**
  - `HomologicalComplex.*`: Tactics involving homology, opcycles, mapping cones.
  - `HomotopyCategory.*`: Quotienting chain maps up to homotopy.

---

#### **4. Proof Logic**

- **Inductive/constructive style:**
  - Proofs often proceed by:
    1. Unfolding definitions (`dsimp [leftDerived, isoLeftDerivedObj]`).
    2. Applying naturality or functoriality lemmas (`Functor.map_comp`, `NatTrans.naturality`).
    3. Using isomorphism properties (`Iso.inv_hom_id`, `cancel_mono`, `cancel_epi`).
    4. Leveraging homological algebra facts (e.g., `HomologicalComplex.homologyι_naturality`, `ShortComplex.exact_of_isZero_X₂`).

- **Common proof patterns:**
  - **Naturality of derived constructions**: Prove naturality squares by reducing to naturality of underlying maps (e.g., via `isoLeftDerivedToHomotopyCategoryObj_hom_naturality`).
  - **Vanishing on projectives**: Use that projective resolutions of projectives are acyclic in positive degrees.
  - **Isomorphism criteria**: Show maps are split monos/epis or use `isIso_of_isIso_app`.
  - **Descent to homology**: Lift morphisms to chain maps between resolutions, then apply homology.

- **Leveraging existing infrastructure:**
  - Heavy use of `HomologicalComplex`, `HomotopyCategory`, and `Abelian` category structure.
  - Reliance on `HasProjectiveResolutions` to ensure existence of resolutions.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Homology.Additive` | Homological algebra over additive categories; chain complexes, homology, mapping cones. |
| `Mathlib.CategoryTheory.Abelian.ProjectiveResolution` | Projective resolutions, their properties, and universal constructions (e.g., lifts, mapping cones). |

- **Key typeclasses assumed:**
  - `[Category C]`, `[Abelian C]`, `[HasProjectiveResolutions C]`
  - `[Category D]`, `[Abelian D]`
  - `[F.Additive]`, `[PreservesFiniteColimits F]` (for isomorphism results)

- **No derived categories yet**: As noted in the TODO, this formalization avoids full derived categories and works in the homotopy category + homology.

---

### Summary

This file formalizes **left-derived functors** in an abelian setting with projective resolutions, using only the homotopy category and homology functors. It includes:
- Construction of derived functors and their naturality,
- Explicit computation via resolutions,
- Vanishing on projectives,
- Comparison with the original functor in degree 0,
- Isomorphism when the functor is right exact.

The style is highly constructive, leveraging Lean’s typeclass inference and homological algebra infrastructure in Mathlib.