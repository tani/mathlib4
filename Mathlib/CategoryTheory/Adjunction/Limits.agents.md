Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formal metadata relevant for building a domain-specific AI agent in category theory (specifically, Lean-based reasoning about adjunctions and (co)limits):

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `functorialityRightAdjoint` | `Cocone (K ⋙ F) ⥤ Cocone K` — right adjoint to `Cocones.functoriality K F`, used to prove left adjoints preserve colimits. |
| `functorialityUnit` | `𝟭 (Cocone K) ⟶ Cocones.functoriality _ F ⋙ functorialityRightAdjoint adj K` — unit of the adjunction for cocones. |
| `functorialityCounit` | `functorialityRightAdjoint adj K ⋙ Cocones.functoriality _ F ⟶ 𝟭 (Cocone (K ⋙ F))` — counit of the adjunction for cocones. |
| `functorialityAdjunction` | `Cocones.functoriality K F ⊣ functorialityRightAdjoint adj K` — establishes that `Cocones.functoriality K F` is a left adjoint. |
| `leftAdjoint_preservesColimits` | `PreservesColimitsOfSize.{v, u} F` — a left adjoint preserves colimits (standard result, Stacks Project tag 0038). |
| `rightAdjoint_preservesLimits` | `PreservesLimitsOfSize.{v, u} G` — a right adjoint preserves limits (dual of above). |
| `functorialityAdjunction'` | `functorialityLeftAdjoint adj K ⊣ Cones.functoriality K G` — right adjointness of `Cones.functoriality K G`. |
| `coconesIso` | `(cocones J D).obj (op (K ⋙ F)) ≅ G ⋙ (cocones J C).obj (op K)` — natural isomorphism between cocone functors induced by `F ⊣ G`. |
| `conesIso` | `F.op ⋙ (cones J D).obj K ≅ (cones J C).obj (K ⋙ G)` — natural isomorphism between cone functors induced by `F ⊣ G`. |
| `isEquivalence_preservesColimits` | Instance: `E.IsEquivalence ⇒ PreservesColimitsOfSize E` — equivalences preserve colimits (via left adjoint part). |
| `isEquivalenceReflectsColimits` | Instance: `E.IsEquivalence ⇒ ReflectsColimitsOfSize E` — equivalences reflect colimits. |
| `isEquivalenceCreatesColimits` | Instance: `H.IsEquivalence ⇒ CreatesColimitsOfSize H` — equivalences create colimits. |
| `hasColimitsOfShape_of_equivalence` | `HasColimitsOfShape J D ⇒ HasColimitsOfShape J C` — transport colimit existence across equivalence. |
| `hasLimitsOfShape_of_equivalence` | `HasLimitsOfShape J C ⇒ HasLimitsOfShape J D` — transport limit existence across equivalence. |

---

### 📝 **Naming Conventions**

- **Adjoint-related constructions**:
  - `functoriality*` — constructions related to pre/post-composition with functors in co/cone categories.
  - `adj.*` — uses of the adjunction `adj : F ⊣ G`, e.g., `adj.unit`, `adj.counit`, `adj.homEquiv`.
- **Preservation/creation/reflection**:
  - `preserves*`, `reflects*`, `creates*` — standard naming for properties of functors w.r.t. (co)limits.
  - `isEquivalence*` — instances derived from equivalence functors.
- **Iso constructions**:
  - `*Iso`, `*ComponentHom`, `*ComponentInv` — components of natural isomorphisms.
- **Deprecations**:
  - `*Preserves*` (camelCase) variants are deprecated in favor of `*preserves*` (snake_case), per 2024-11 deprecation dates.

---

### 🛠️ **Tactic Stack**

- **Core tactics**:
  - `simp` / `simp_rw` — heavily used for simplification, especially with `@[simp]` lemmas like `functorialityUnit`, `functorialityCounit`, etc.
  - `rw` / `erw` — for rewriting using naturality and adjunction properties.
  - `dsimp` — used in naturality proofs to simplify definitions.
  - `rfl` — for definitional equalities.
  - `exact`, `apply`, `intro`, `cases` — basic proof scripting.
  - `isoUnique*` lemmas — used to prove uniqueness of (co)limit morphisms.
- **Category-theoretic automation**:
  - `whiskerLeft`, `whiskerRight`, `associator`, `rightUnitor`, `leftUnitor` — structural isomorphisms in functor categories.
  - `mapCocone`, `mapCone`, `mapCoconeInv`, `mapConeInv` — used in equivalence-based constructions.

---

### 🧠 **Proof Logic & Strategy**

- **Inductive/structural proofs**:
  - Many proofs proceed by constructing explicit (co)limit data and verifying universal properties via `isoUniqueCoconeMorphism` / `isoUniqueConeMorphism`.
- **Adjoint-based reasoning**:
  - Use of `homEquiv` to translate between morphisms in `C` and `D`.
  - Naturality of unit/counit and `homEquiv` is key in verifying naturality of cone/cocone morphisms.
- **Equivalence arguments**:
  - Leverage that an equivalence is both a left and right adjoint, hence inherits preservation/creation/reflection properties.
  - Transport of (co)limit existence across equivalences via `hasColimit_of_comp_equivalence`, `hasLimit_of_comp_equivalence`, etc.
- **Instance synthesis**:
  - Noncomputable instances are defined for `Preserves*`, `Reflects*`, `Creates*` based on adjointness or equivalence.

---

### 📦 **Imports & Dependencies**

- **Core imports**:
  - `Mathlib.CategoryTheory.Adjunction.Basic` — basic adjunction theory (unit, counit, hom-iso).
  - `Mathlib.CategoryTheory.Limits.Creates` — definitions of `Preserves*`, `Reflects*`, `Creates*`, and related lemmas.
- **Implicit dependencies**:
  - `CategoryTheory.Functor` — functor composition, precomposition, mapping of (co)cones.
  - `CategoryTheory.Limits.Shapes` — shape-based (co)limits (e.g., `HasColimit`, `IsColimit`).
  - `CategoryTheory.NaturalTransformation`, `CategoryTheory.NatIso` — for naturality and isomorphisms.
  - `CategoryTheory.Opposite` — via `open Opposite`, used for cocones as cones in opposite category.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch templates**, or **AI-agent prompting strategies** based on this metadata.