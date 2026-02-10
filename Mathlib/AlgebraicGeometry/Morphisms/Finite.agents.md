### Technical Metadata Brief: Finite Morphisms of Schemes in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsFinite` | `class IsFinite {X Y : Scheme} (f : X ⟶ Y) extends IsAffineHom f : Prop` | Defines a *finite morphism* of schemes: `f` is affine and for every affine open `U ⊆ Y`, the induced ring map `f.app U .hom` is finite (i.e., makes the target a finitely generated module over the source). |
| `IsFinite.finite_app` | `(U : Y.Opens) → IsAffineOpen U → (f.app U).hom.Finite` | Witness that the ring map over any affine open is finite. |
| `IsFinite.iff_isIntegralHom_and_locallyOfFiniteType` | `IsFinite f ↔ IsIntegralHom f ∧ LocallyOfFiniteType f` | Equivalence showing finite morphisms are precisely those that are integral and locally of finite type. |
| `IsFinite.eq_inf` | `@IsFinite = (@IsIntegralHom ⊓ @LocallyOfFiniteType)` | Equality of morphism properties: finite = integral ∧ locally finite type (as meet in `MorphismProperty`). |
| `IsClosedImmersion.iff_isFinite_and_mono` | `IsClosedImmersion f ↔ IsFinite f ∧ Mono f` | Characterizes closed immersions as finite monomorphisms. |
| `IsClosedImmersion.eq_isFinite_inf_mono` | `@IsClosedImmersion = (@IsFinite ⊓ monomorphisms _)` | Equality of properties: closed immersions = finite ∧ monomorphisms. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isFinite_`, `isIntegralHom_`, `locallyOfFiniteType_`: for lemmas/instances about the respective properties.
  - `affineAnd_`: used in `HasAffineProperty` constructions (e.g., `HasAffineProperty.affineAnd_iff`).
  - `of_`, `mem_`, `comp_mem_`: for inclusion/compilation lemmas (e.g., `of_isIso`, `comp_mem`).
- **Suffixes**:
  - `_iff`: for biconditional lemmas (`iff_isIntegralHom_and_locallyOfFiniteType`).
  - `_eq_`: for equality of properties (`eq_inf`, `eq_isFinite_inf_mono`).
  - `_inst`: implicit via `instance` declarations (e.g., `instance [IsIso f] : IsFinite f`).
- **Property combinators**:
  - `⊓` (meet) used to express conjunction of morphism properties.
  - `HasAffineProperty.iff_of_isAffine`, `IsLocalAtTarget.iff_of_openCover`: standard patterns for reducing global properties to affine/local cases.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions (e.g., `IsFinite`, `RingHom.finite`, `IsAffine`) and simplifying with rewrite rules. |
| `wlog` | “Without loss of generality” to reduce to the case where `Y` is affine (via open cover arguments). |
| `exact` / `infer_instance` | Solving class instances (e.g., `IsFinite f` from `IsIso f`). |
| `refine` / `apply` | Constructing proofs stepwise, especially when using `and_congr_right`, `iff.trans`, etc. |
| `trans` | Chaining equivalences or implications (e.g., `trans Mono (f.app ⊤).op`). |
| `simp` | Simplifying goals using known lemmas (e.g., `RingHom.finite_respectsIso`). |
| `show` / `have` | Introducing intermediate goals or assumptions. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Reduction to affine case**: Most proofs use `wlog hY : IsAffine Y`, then apply `IsLocalAtTarget.iff_of_openCover` to reduce to checking the property on an affine open cover (here, `Y.affineCover`).
  - **Affine reduction**: For affine targets, use `HasAffineProperty.iff_of_isAffine` to reduce to ring-theoretic statements.
  - **Ring-theoretic equivalences**: Key lemmas like `RingHom.finite_iff_isIntegral_and_finiteType` and `RingHom.surjective_iff_epi_and_finite` bridge scheme-level and ring-level properties.
  - **Equality of properties**: Proven by extensionality (`ext`) and applying the corresponding `iff_*` lemma.

- **Common proof patterns**:
  - `and_congr_right` + `iff.trans` to align complex logical equivalences.
  - `Functor.mono_map_iff_mono` / `arrow_mk_iso_iff` to relate categorical monos/autos to ring-level maps.
  - `IsStableUnder...` instances (e.g., `stableUnderComposition`) to derive closure properties.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.Integral` | Provides `IsIntegralHom`, `LocallyOfFiniteType`, and related ring-theoretic characterizations. |
| `Mathlib.Algebra.Category.Ring.Epi` | Provides `Epi`-related lemmas, especially `RingHom.surjective_iff_epi_and_finite`. |
| `CategoryTheory`, `TopologicalSpace`, `Opposite`, `MorphismProperty` | Core infrastructure for scheme morphisms, open subsets, and categorical properties. |

**Domain scope**:  
This file formalizes *finite morphisms* in the category of schemes (`Scheme`), building on:
- Affine morphisms (`IsAffineHom`)
- Ring-theoretic finiteness (`RingHom.Finite`)
- Integral and finite-type conditions (`IsIntegralHom`, `LocallyOfFiniteType`)
- Categorical stability properties (composition, base change, identities, etc.)

It serves as a foundational module for further development (e.g., properness of finite morphisms — listed in TODO).

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `Mathlib` scheme theory hierarchy.