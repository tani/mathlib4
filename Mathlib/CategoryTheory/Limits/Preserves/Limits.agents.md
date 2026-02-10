### Technical Brief: Isomorphisms for Functors Preserving (Co)limits in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `preserves_lift_mapCone` | `(c₁ c₂ : Cone F) → (t : IsLimit c₁) → (isLimitOfPreserves G t).lift (G.mapCone c₂) = G.map (t.lift c₂)` | Shows that the lift of a preserved limit cone commutes with functor mapping of cones. |
| `preservesLimitIso` | `G.obj (limit F) ≅ limit (F ⋙ G)` | Canonical isomorphism between the image of a limit under `G` and the limit of the composite diagram `F ⋙ G`, assuming `G` preserves limits. |
| `preservesLimitIso_hom_π` | `(preservesLimitIso G F).hom ≫ limit.π _ j = G.map (limit.π F j)` | Describes how the hom-component of `preservesLimitIso` interacts with limit projections. |
| `preservesLimitIso_inv_π` | `(preservesLimitIso G F).inv ≫ G.map (limit.π F j) = limit.π _ j` | Dual to above: describes interaction of inverse with projections. |
| `lift_comp_preservesLimitIso_hom` | `G.map (limit.lift _ t) ≫ (preservesLimitIso G F).hom = limit.lift (F ⋙ G) (G.mapCone _)` | Commutativity of lift with `preservesLimitIso`. |
| `preservesLimitNatIso` | `lim ⋙ G ≅ (whiskeringRight J C D).obj G ⋙ lim` | Natural isomorphism expressing functoriality of `preservesLimitIso` in `F`, when all limits of shape `J` exist and are preserved. |
| `preservesLimit_of_isIso_post` | `[IsIso (limit.post F G)] → PreservesLimit F G` | Converse: if the comparison map is an iso, then `G` preserves limits of `F`. |
| `preserves_desc_mapCocone` | `(c₁ c₂ : Cocone F) → (t : IsColimit c₁) → (isColimitOfPreserves G t).desc (G.mapCocone _) = G.map (t.desc c₂)` | Dual of `preserves_lift_mapCone`, for colimits. |
| `preservesColimitIso` | `G.obj (colimit F) ≅ colimit (F ⋙ G)` | Canonical iso for colimits under preservation. |
| `ι_preservesColimitIso_hom`, `ι_preservesColimitIso_inv` | `G.map (colimit.ι F j) ≫ ... = colimit.ι _ j` and dual | Describe interaction of colimit injections with `preservesColimitIso`. |
| `preservesColimitIso_inv_comp_desc` | `(preservesColimitIso G F).inv ≫ G.map (colimit.desc _ t) = colimit.desc _ (G.mapCocone t)` | Commutativity of colimit descent with `preservesColimitIso`. |
| `preservesColimitNatIso` | `colim ⋙ G ≅ (whiskeringRight J C D).obj G ⋙ colim` | Natural isomorphism expressing functoriality of `preservesColimitIso`. |
| `preservesColimit_of_isIso_post` | `[IsIso (colimit.post F G)] → PreservesColimit F G` | Converse for colimits. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `preserves_`: Indicates constructions or properties tied to preservation of (co)limits.
  - `isLimitOfPreserves`, `isColimitOfPreserves`: Constructors for (co)limit cones under preservation.
- **Suffixes**:
  - `_hom_π`, `_inv_π`: Hom/inverse of iso composed with (co)limit projections/injections.
  - `_comp_desc`, `_comp_lift`: Interaction with descent/lift maps.
  - `_natIso`: Natural isomorphisms between composite functors.
- **Aliases**:
  - Deprecated aliases like `preservesLimitsIso_*` exist for backward compatibility (marked with `@[deprecated]`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp only`, `dsimp`: Simplification using definitional equalities and lemmas (especially `reassoc` attributes).
  - `ext`: Extensionality for morphisms (e.g., cones/cocones).
  - `apply limit.hom_ext`, `apply colimit.hom_ext`: Hom-extensionality for (co)limits.
  - `convert`: Used to reduce goals via isomorphisms or equivalences.
  - `rw`, `apply`, `assumption`: Standard rewriting and application.
  - `symm`: To reverse equalities (often used after uniqueness arguments).
- **Advanced**:
  - `IsLimit.conePointUniqueUpToIso_*`, `IsColimit.comp_coconePointUniqueUpToIso_*`: Leverage uniqueness of (co)limit cones.
  - `whiskerRight_app`, `limMap_π`, `ι_colimMap`: Simplify whiskering and mapping of (co)limits.

---

#### **4. Proof Logic**

- **General pattern**:
  1. Use `PreservesLimit F G` to get a cone `isLimitOfPreserves G t` over `F ⋙ G`.
  2. Apply `conePointUniqueUpToIso` (or cocone variant) to get the canonical iso.
  3. Prove component-wise properties (e.g., with `hom_ext`, `ext`) using `simp` and known lemmas like `G.map_comp`.
  4. For naturality, show component-wise commutativity using `simp only [...]` with projection/injection lemmas.
  5. For converses (`preservesLimit_of_isIso_post`), use `IsLimit.ofPointIso` / `IsColimit.ofPointIso` to lift isomorphism to preservation.

- **Uniqueness-based reasoning**:
  - Many proofs rely on uniqueness of (co)limit morphisms: e.g., `uniq _ _ _ (by simp [...])`.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Preserves.Basic
  ```
  - Provides foundational notions: `PreservesLimit`, `PreservesColimit`, `PreservesLimitsOfShape`, etc.

- **Implicit dependencies** (via `Mathlib.CategoryTheory.Limits.Preserves.Basic`):
  - `Limits.Basic`, `Preserves.Basic`, `Cones`, `Cocones`, `Iso`, `NatIso`, `Whiskering`, `Functor`.

- **Universe polymorphism**:
  - Explicit universe variables (`w' w v₁ v₂ u₁ u₂`) indicate handling of large categories and diagram shapes.

---

### Summary

This file formalizes the canonical isomorphisms between `G(lim F)` and `lim(G ∘ F)` (and dually for colimits), under the assumption that `G` preserves (co)limits. It includes:
- Component-wise behavior of the iso with respect to (co)limit structure maps,
- Functoriality in the diagram `F`,
- Converse characterizations (iso ⇒ preservation),
- A rich set of `simp`-friendly lemmas (`reassoc`-annotated) for automation.

It serves as a foundational module for reasoning about limit/colimit preservation in category theory, especially in contexts like monadicity, adjoint functor theorems, or Grothendieck constructions.