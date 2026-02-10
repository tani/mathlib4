Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Structure Sheaf on `ProjectiveSpectrum 𝒜`**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsFraction {U} f` | Predicate: `f : ∀ x : U, at x` is globally a fixed fraction `r/s` of *same grading* on `U`. |
| `isFractionPrelocal` | Shows `IsFraction` is prelocal (i.e., local on restriction to open subsets). |
| `isLocallyFraction` | Local predicate: `f` is *locally* expressible as `r/s` with `r,s ∈ 𝒜 i` for some `i`. Defined as sheafification of `isFractionPrelocal`. |
| `sectionsSubring U` | Subring of `Π x : U.unop, at x` consisting of functions satisfying `isLocallyFraction`. Closed under `0,1,+,-,*`. |
| `structureSheafInType` | Sheaf of types (valued in `Type`) defined as the subsheaf of `isLocallyFraction`. |
| `structurePresheafInCommRing` | Presheaf in `CommRingCat` induced by `structureSheafInType`. |
| `Proj.structureSheaf` | Final sheaf in `CommRingCat`, constructed by verifying sheaf condition via `forget CommRing`. |
| `openToLocalization U x hx` | Evaluation map: section over `U` ↦ value at `x ∈ U`, landing in `at x`. |
| `stalkToFiberRingHom x` | Colimit map from stalk of structure sheaf at `x` to `at x`. |
| `sectionInBasicOpen x f` | Canonical section over `basicOpen f.den` associated to `f : NumDenSameDeg 𝒜 x`. |
| `homogeneousLocalizationToStalk x y` | Inverse to `stalkToFiberRingHom x`, constructed via germs of `sectionInBasicOpen`. |
| `Proj.stalkIso' x` | Ring isomorphism: stalk of `Proj.structureSheaf` at `x` ≅ `HomogeneousLocalization 𝒜 x`. |
| `Proj.toLocallyRingedSpace` | `Proj 𝒜` as a *locally ringed space*, using that `HomogeneousLocalization 𝒜 x` is local and `stalkIso'` is a ring iso. |

---

#### **2. Naming Conventions**

- **Predicates**: `is_` prefix (`isFractionPrelocal`, `isLocallyFraction`).
- **Subobjects**: `sectionsSubring`, `structureSheafInType`, `structurePresheafInCommRing`.
- **Maps / Homomorphisms**:
  - `stalkToFiberRingHom`, `homogeneousLocalizationToStalk`, `openToLocalization`
  - `stalkIso'`, `sectionInBasicOpen`
- **Properties / Instances**:
  - `zero_mem'`, `one_mem'`, `add_mem'`, `neg_mem'`, `mul_mem'`
  - `Proj.res_apply`, `Proj.ext`, `Proj.add_apply`, etc.
- **Sheaf-theoretic constructions**:
  - `sheafify`, `subsheafToTypes`, `isSheaf_iff_isSheaf_comp`
- **Grading & localization**:
  - `NumDenSameDeg`, `mk`, `mem_basicOpen_den`, `basicOpen`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat`, `simp`, `rfl`, `ext`, `apply Subtype.ext`
- `rcases`, `obtain`, `cases`
- `ring`, `linarith`, `exact`, `refine`
- `simp only [...] at`, `simp only [...]`, `rw [...]`
- `apply_fun`, `change`, `show`, `have h : ... := ...`
- `apply (Proj.structureSheaf 𝒜).presheaf.germ_ext ...`
- `apply RingHom.ext_iff.1`, `CommRingCat.hom_ext_iff.mp`

---

#### **4. Proof Logic**

- **Structure sheaf construction**:
  1. Define `IsFraction` (global fraction condition).
  2. Show it’s prelocal → sheafify to get `isLocallyFraction`.
  3. Prove closure under ring operations (`zero_mem'`, `one_mem'`, `add_mem'`, `neg_mem'`, `mul_mem'`) → define `sectionsSubring`.
  4. Use `subsheafToTypes` to get sheaf of types; upgrade to `CommRing`-valued sheaf.

- **Stalk isomorphism**:
  1. Define `stalkToFiberRingHom` via colimit universal property.
  2. Construct inverse `homogeneousLocalizationToStalk` using `sectionInBasicOpen` and germs.
  3. Prove mutual inverses using:
     - `germ_ext`, `Proj.res_apply`, `sectionInBasicOpen` definition,
     - properties of localization (`mk_eq_mk'`, `map_units`, etc.).
  4. Conclude `Proj.stalkIso'` is a ring iso.

- **Locally ringed space**:
  - Use that `HomogeneousLocalization 𝒜 x` is local (by `inferInstance`).
  - Transport local ring structure via `stalkIso'`.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.ProjectiveSpectrum.Topology` | Topology on `ProjectiveSpectrum`. |
| `Mathlib.Topology.Sheaves.LocalPredicate` | Local/presheaf/sheaf machinery (e.g., `sheafify`, `PrelocalPredicate`). |
| `Mathlib.RingTheory.GradedAlgebra.HomogeneousLocalization` | Graded localization, `NumDenSameDeg`, `mk`, etc. |
| `Mathlib.Geometry.RingedSpace.LocallyRingedSpace` | Definitions of sheafed/locally ringed spaces. |

---

#### **6. Notation & Conventions**

- `𝒜 : ℕ → Submodule R A` — grading of `A`.
- `at x` = `HomogeneousLocalization.AtPrime 𝒜 x.asHomogeneousIdeal.toIdeal.primeCompl`.
- `U : Opens (ProjectiveSpectrum.top 𝒜)ᵒᵖ` — open subsets as opposite objects.
- `f : ∀ x : U, at x` — dependent functions on `U`.
- `basicOpen 𝒜 f.den` — standard open subset in projective spectrum.
- `sectionInBasicOpen x f` — section over `basicOpen f.den` associated to `f`.

---

This file formalizes the construction of the structure sheaf on the projective spectrum of a graded ring, culminating in the proof that `Proj 𝒜` is a *locally ringed space*, following Hartshorne’s approach.