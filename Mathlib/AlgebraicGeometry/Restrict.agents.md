Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Restriction of Schemes and Morphisms in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Scheme.restrict` | `X.restrict f` (via `U : X.Opens`) | Restricts a scheme `X` along an open embedding `f : U ↪ X`. Implemented as `X.ofRestrict _`. |
| `Scheme.Opens.toScheme` | `U : X.Opens ↦ U.toScheme : Scheme` | Coercion from open subsets of `X` to schemes (open subschemes). |
| `Scheme.Opens.ι` | `U.ι : U ⟶ X` | Canonical open immersion from the open subscheme `U` into `X`. |
| `morphismRestrict` (`f ∣_ U`) | `f : X ⟶ Y`, `U : Y.Opens` ↦ `f ∣_ U : (f ⁻¹ᵁ U).toScheme ⟶ U` | Restricts a morphism `f` to the preimage open subscheme over `U`. |
| `Scheme.restrictFunctor` | `X.Opens ⥤ Over X` | Functor sending open subsets to their inclusion morphisms in the over-category. |
| `Scheme.topIso` | `↑(⊤ : X.Opens) ≅ X` | Isomorphism between the total space and the open subscheme of the whole space. |
| `Scheme.isoOfEq` | `U = V ⇒ U ≅ V` | Isomorphism of open subschemes induced by equality of open sets. |
| `pullbackRestrictIsoRestrict` | `pullback f (U.ι) ≅ f ⁻¹ᵁ U` | Universal property: pullback along open immersion is isomorphic to restriction. |
| `morphismRestrictRestrict` | `f ∣_ U ∣_ V ≅ f ∣_ (U.ι ''ᵁ V)` | Compatibility of double restriction with single restriction along image. |
| `morphismRestrictStalkMap` | `(f ∣_ U).stalkMap x ≅ f.stalkMap x.1` | Compatibility of stalk maps with restriction. |
| `Scheme.restrictFunctorΓ` | `X.restrictFunctor.op ⋙ (Over.forget X).op ⋙ Scheme.Γ ≅ X.presheaf` | Global sections of restriction functor recovers structure sheaf. |

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: e.g., `IsOpenImmersion`, `IsIso` — typeclass properties.
  - `homOfLE`: morphisms induced by inclusion of open sets (`U ≤ V`).
  - `stalkIso`, `germ_stalkIso_*`: stalk-level isomorphisms and relations.
  - `topIso`, `restrictRestrict*`, `restrictFunctor*`: canonical isomorphisms involving top element or repeated restriction.
  - `preimageIso`, `isoImage`: isomorphisms induced by open immersions.

- **Suffixes:**
  - `_app`, `_appTop`, `_appLE`: components of natural transformations or sheaf maps.
  - `_hom`, `_inv`: hom/inv parts of isomorphisms.
  - `_assoc`: associativity variants for composition.
  - `_le`, `_inf`, `_sup`: for lemmas involving lattice operations on opens.

- **Notation:**
  - `∣_` for `morphismRestrict`: infix operator `f ∣_ U`.
  - `↑U` or `(U : Scheme)` for coercion of open subset to scheme.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` / `simp_rw`: simplification with many `@[simp]` lemmas.
- `rw`: rewriting using equations and naturality squares.
- `ext`: extensionality for morphisms or functions (often `Subtype.ext`).
- `erw`: e-rewrite for rewriting under binders or when defeq issues arise.
- `infer_instance`: for typeclass resolution (e.g., `IsOpenImmersion`, `IsIso`).
- `delta`: unfolding definitions before simplification.
- `congr`: congruence reasoning (e.g., for `eqToHom` equalities).
- `exact`, `refine`, `apply`: for constructing morphisms or isomorphisms.
- `cases`, `induction`: for structural reasoning on opens or morphisms.

#### **4. Proof Logic**

- **Inductive/structural reasoning** on open subsets (`U : X.Opens`) and morphisms.
- **Naturality arguments**: many lemmas (e.g., `morphismRestrict_app`, `ι_app`) rely on naturality of sheaf maps and pullbacks.
- **Isomorphism construction** via:
  - `IsOpenImmersion.isoOfRangeEq`: proving two open immersions have same image.
  - `eqToIso`: converting equalities to isomorphisms.
  - `Iso.refl`, `Iso.trans`, `Iso.comp_inv_eq`: standard iso algebra.
- **Pullback-based reasoning**: many constructions (e.g., `morphismRestrict`, `pullbackRestrictIsoRestrict`) use universal properties of pullbacks.
- **Sheaf-theoretic reasoning**: stalks, germs, sections over opens, and their compatibility with restriction.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.AlgebraicGeometry.Cover.Open`: open covers and open embeddings.
  - `Mathlib.AlgebraicGeometry.Over`: over-categories and morphisms in over-categories.

- **Scope**:
  - Formalizes **open subschemes** and their morphisms.
  - Handles **restriction functors**, **stalks**, **sections**, and **pullbacks**.
  - Designed for **scheme-theoretic constructions** in the context of **presheafed spaces**.

---

This file serves as a foundational module for working with open immersions and restrictions in algebraic geometry within Lean 4, especially in preparation for gluing, covering, and descent arguments.