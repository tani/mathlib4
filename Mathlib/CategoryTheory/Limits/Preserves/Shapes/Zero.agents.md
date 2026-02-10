### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PreservesZeroMorphisms` | `class PreservesZeroMorphisms (F : C ⥤ D) : Prop` | Defines that a functor sends all zero morphisms to zero morphisms. |
| `map_zero` | `∀ X Y, F.map (0 : X ⟶ Y) = 0` | Core property of `PreservesZeroMorphisms`; simplifies to `F.map 0 = 0`. |
| `map_isZero` | `{X : C} → IsZero X → IsZero (F.obj X)` | If `F` preserves zero morphisms and `X` is zero, then `F(X)` is zero. |
| `zero_of_map_zero` | `{f : X ⟶ Y} → F.map f = 0 → f = 0` | For faithful `F`, vanishing image implies original morphism is zero. |
| `map_eq_zero_iff` | `F.map f = 0 ↔ f = 0` | Equivalence for faithful functors preserving zero morphisms. |
| `preservesZeroMorphisms_of_isLeftAdjoint` | Instance | Left adjoints preserve zero morphisms. |
| `preservesZeroMorphisms_of_isRightAdjoint` | Instance | Right adjoints preserve zero morphisms. |
| `preservesZeroMorphisms_of_full` | Instance | Full functors preserve zero morphisms. |
| `mapZeroObject` | `[PreservesZeroMorphisms F] ⇒ F.obj 0 ≅ 0` | Constructs an isomorphism from `F(0)` to the zero object in `D`. |
| `preservesZeroMorphisms_of_map_zero_object` | `F.obj 0 ≅ 0 ⇒ PreservesZeroMorphisms F` | Converse: if `F` maps zero object to zero object (up to iso), then it preserves zero morphisms. |
| `preservesZeroMorphisms_of_preserves_initial_object` | Instance | If `F` preserves initial object, then it preserves zero morphisms. |
| `preservesZeroMorphisms_of_preserves_terminal_object` | Instance | If `F` preserves terminal object, then it preserves zero morphisms. |
| `preservesTerminalObject_of_preservesZeroMorphisms` | Lemma | If `F` preserves zero morphisms, then it preserves terminal objects. |
| `preservesInitialObject_of_preservesZeroMorphisms` | Lemma | If `F` preserves zero morphisms, then it preserves initial objects. |
| `preservesLimitsOfShape_of_isZero` / `preservesColimitsOfShape_of_isZero` | Lemmas | A zero functor (i.e., `IsZero F`) preserves all limits/colimits of any shape. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `preservesZeroMorphisms_of_...`: Instances proving preservation under certain conditions.
  - `mapZeroObject`: Constructs canonical iso from `F(0) ≅ 0`.
  - `zero_of_...`, `map_isZero`, `map_eq_zero_iff`: Properties about zero morphisms and objects.
- **Suffixes**:
  - `_of_...`: Derives a property from a stronger assumption (e.g., `preservesZeroMorphisms_of_map_zero_object`).
  - `_of_isZero`: Applies when the functor itself is zero (i.e., `IsZero F`).
- **`map_` prefix**: Used for lemmas about `F.map` acting on zero morphisms or objects.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: Simplification with explicit lemmas (e.g., `zero_comp`, `comp_zero`, `F.map_zero`, `Iso.hom_inv_id`).
- `rw [...]`: Rewriting using naturality, triangle identities, and functoriality.
- `calc`: Chain of equalities for structured calculations (especially in adjoint/zero object proofs).
- `exact`, `apply`, `intro`, `cases`: Basic proof scripting.
- `aesop`: Used in class definition for `map_zero` (automated reasoning).
- `simp`: For quick simplifications (e.g., in `preservesZeroMorphisms_comp`).
- `iso`-related simplifications: `Iso.hom_inv_id`, `Iso.inv_hom_id`, `Iso.symm`, `Iso.trans`.

---

#### 4. **Proof Logic**

- **Inductive/structural reasoning**:
  - Proofs often rely on **naturality** of unit/counit for adjoints.
  - Use of **zero morphism properties**: `zero_comp`, `comp_zero`, `zero_of_to_zero`.
- **Adjoint proofs**:
  - Use triangle identities (`left_triangle_components`, `right_triangle_components_assoc`) to reduce to zero morphism compositions.
- **Zero object ↔ zero morphism equivalence**:
  - Two directions:
    1. `PreservesZeroMorphisms F ⇒ F.obj 0 ≅ 0` (`mapZeroObject`)
    2. `F.obj 0 ≅ 0 ⇒ PreservesZeroMorphisms F` (`preservesZeroMorphisms_of_map_zero_object`)
- **Faithful functors**:
  - Leverage injectivity of `F.map` to lift zero-ness from image to domain.
- **Zero functor (`IsZero F`)**:
  - Exploits `IsZero` ⇒ `id = 0`, then uses `F.map_id = id`, `F.map_zero`, etc., to show preservation of all (co)limits.

---

#### 5. **Imports**

- `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Terminal`: For preservation of terminal objects.
- `Mathlib.CategoryTheory.Limits.Shapes.ZeroMorphisms`: Core definitions of `HasZeroMorphisms`, `HasZeroObject`, zero morphisms, and related lemmas.

These imports indicate the module sits in the **limits and zero-structure** part of `CategoryTheory`, especially around **zero objects**, **zero morphisms**, and their preservation under functors.

--- 

Let me know if you'd like a diagrammatic summary or a formalized summary in Lean style.