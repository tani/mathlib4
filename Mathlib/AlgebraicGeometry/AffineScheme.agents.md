Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Affine Schemes in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `AffineScheme` | `Scheme.Spec.EssImageSubcategory` — the essential image of `Spec`, i.e., full subcategory of schemes consisting of objects isomorphic to some `Spec R`. |
| `IsAffine (X : Scheme)` | `Prop` — asserts that the canonical map `X ⟶ Spec Γ(X)` is an isomorphism. |
| `Scheme.isoSpec (X : Scheme) [IsAffine X]` | `X ≅ Spec Γ(X)` — the canonical isomorphism for affine schemes. |
| `AffineScheme.mk`, `AffineScheme.of` | Constructors of `AffineScheme` from a scheme and proof of affinity. |
| `AffineScheme.Spec : CommRingCatᵒᵖ ⥤ AffineScheme` | Full, faithful, essentially surjective functor embedding commutative rings into affine schemes. |
| `AffineScheme.Γ : AffineSchemeᵒᵖ ⥤ CommRingCat` | Global sections functor; part of equivalence `AffineScheme ≌ CommRingCatᵒᵖ`. |
| `AffineScheme.equivCommRingCat` | `AffineScheme ≌ CommRingCatᵒᵖ` — the fundamental equivalence of categories. |
| `IsAffineOpen {X : Scheme} (U : X.Opens)` | `Prop` — `U` is affine iff the open subscheme `U` is affine. |
| `IsAffineOpen.fromSpec (hU : IsAffineOpen U)` | `Spec Γ(X, U) ⟶ X` — the canonical open immersion from the spectrum of sections over `U`. |
| `Scheme.Opens.toSpecΓ (U : X.Opens)` | `U.toScheme ⟶ Spec Γ(X, U)` — the canonical map from an open subscheme to the spectrum of its sections. |
| `isBasis_basicOpen (X : Scheme) [IsAffine X]` | `Opens.IsBasis (Set.range (X.basicOpen : Γ(X, ⊤) → X.Opens))` — basic opens form a basis in affine schemes. |
| `isLocalization_basicOpen (hU : IsAffineOpen U) (f : Γ(X, U))` | `IsLocalization.Away f Γ(X, X.basicOpen f)` — sections over basic opens are localizations. |
| `appBasicOpenIsoAwayMap` | Isomorphism between `f.app (Y.basicOpen r)` and the localization map induced by `f.app U`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isAffine`, `isAffineOpen`: predicates for affinity.
  - `fromSpec`, `toSpecΓ`: maps involving `Spec` and global sections.
  - `basicOpen`: for opens defined by a section.
  - `affineOpens`: set of affine opens.
- **Suffixes**:
  - `_hom`, `_inv`: components of isomorphisms.
  - `_naturality`, `_assoc`: naturality or associativity lemmas.
  - `_app`, `_base`: for components of morphisms in sheafed spaces.
  - `_preimage`, `_image`: for preimage/image lemmas.
- **`isoSpec`**: canonical isomorphism for affine objects.
- **`arrowIsoSpecΓOfIsAffine`, `arrowIsoΓSpecOfIsAffine`**: isomorphisms between arrows in arrow categories.

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `exact`, `refine`, `convert`, `ext`, `congr`
- **Category-theoretic automation**:
  - `aesop`, `infer_instance`, `dsimp`, `erw`, `conv_rhs`
- **Ring/Algebra**:
  - `ring`, `comm_ring`, `algebra`, `IsLocalization.ringHom_ext`
- **Sheaf/Topology**:
  - `Opens.ext`, `Set.ext`, `Set.image_preimage_eq_of_subset`, `Set.range_comp`
- **Iso reasoning**:
  - `Iso.ext`, `Iso.inv_hom_id`, `Iso.hom_inv_id`, `Iso.eq_inv_comp`, `Iso.comp_isIso'`
- **Specialized**:
  - `PresheafedSpace.IsOpenImmersion.base_open.injective`, `Functor.map_comp`, `Spec.map_comp`

#### **4. Proof Logic & Strategy**

- **Induction & cases**:
  - Rare; most proofs are direct manipulations using categorical properties.
- **Common patterns**:
  - **Naturality + simplification**: e.g., `Scheme.toSpecΓ_naturality`, `isoSpec_hom_naturality`.
  - **Iso manipulation**: use `asIso`, `isoSpec`, `ΓSpecIso`, `Spec.mapIso`.
  - **Sheaf/section calculus**: use `basicOpen`, `germ`, `localization`, `preimage_basicOpen`.
  - **Basis arguments**: use `isBasis_basicOpen`, `isBasis_affine_open`, `iSup_affineOpens_eq_top`.
  - **Equivalence of categories**: rely on `equivCommRingCat`, `essImage`, `unit_isIso`.
- **Key lemmas**:
  - `Scheme.isoSpec_Spec`: compatibility of `isoSpec` with `Spec`.
  - `fromSpec_preimage_basicOpen`: basic opens pull back to basic opens.
  - `isLocalization_basicOpen`: basic opens are localizations — central for affine geometry.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.AlgebraicGeometry.*`: `Cover.Open`, `GammaSpecAdjunction`, `Restrict`
  - `Mathlib.CategoryTheory.*`: `Limits.Opposites`
  - `Mathlib.RingTheory.*`: `Localization.InvSubmonoid`, `RingHom.Surjective`
  - `Mathlib.Topology.Sheaves.CommRingCat`
- **Scope**:
  - Formalizes **affine schemes**, **affine opens**, and their categorical equivalence with commutative rings.
  - Supports sheaf-theoretic constructions (stalks, germs, sections), localization, and open immersions.
  - Designed for **performance** via explicit universe annotations.

---

This brief captures the formal structure, naming discipline, and proof methodology of the `AffineScheme` module in Mathlib, suitable for training or querying a domain-specific AI agent in algebraic geometry.