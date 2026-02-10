### Technical Metadata Brief: `Action.Limits`, `Action.Preservation`, `Action.Forget`, etc.

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Action.functorCategoryEquivalence V G` | Equivalence `Action V G ≌ SingleObj G ⥤ V`. Central to transferring categorical structure. |
| `Action.forget V G` | Forgetful functor `Action V G ⥤ V`, evaluating at `SingleObj.star G`. |
| `HasFiniteProducts (Action V G)` | Instance: if `V` has finite products, so does `Action V G`. |
| `HasFiniteLimits (Action V G)` | Instance: limits of finite diagrams transfer. |
| `HasLimitsOfShape J (Action V G)` | Instance: limits of shape `J` transfer if `V` has them. |
| `PreservesLimit K F` → `PreservesLimit K (F ⋙ forget)` | Lemma: preservation of a limit by a functor `F : C ⥤ Action V G` is detected by the forgetful functor. |
| `PreservesLimitsOfShape J (Action.forget V G)` | Instance: the forgetful functor preserves limits of shape `J` if `V` does. |
| `ReflectsLimit F (Action.forget V G)` | Instance: the forgetful functor reflects limits of diagrams `F : J ⥤ Action V G`. |
| `Preadditive (Action V G)` | Instance: if `V` is preadditive, so is `Action V G`, with pointwise addition/negation on morphisms. |
| `Linear R (Action V G)` | Instance: if `V` is `R`-linear, so is `Action V G`, with pointwise scalar multiplication. |
| `Abelian (Action V G)` | Instance: if `V` is abelian, so is `Action V G`, via equivalence with a functor category. |
| `abelianAux` | Equivalence `Action V G ≌ ULift (SingleObj G) ⥤ V`, used to transfer abelianness. |
| `mapAction_preadditive`, `mapAction_linear` | Instances: `F.mapAction G` preserves additive/linear structure when `F` does. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `has*`: for instances asserting existence of (co)limits (e.g., `hasLimitsOfShape`, `hasFiniteProducts`).
  - `preserves*`: for lemmas/instances about preservation of (co)limits (e.g., `preservesLimit_of_preserves`, `preservesLimitsOfSize_of_preserves`).
  - `reflects*`: for reflection properties (e.g., `ReflectsLimit`, `ReflectsColimits`).
  - `forget_*`: for properties of the forgetful functor (e.g., `forget_additive`, `forget_preservesZeroMorphisms`).
  - `functorCategoryEquivalence_*`: for properties of the equivalence (e.g., `functorCategoryEquivalence_additive`).
  - `res_*`: for restriction functors along monoid homomorphisms (e.g., `res_additive`, `res_linear`).
  - `mapAction_*`: for induced functors on action categories.

- **Suffixes**:
  - `OfShape`: for shape-specific (co)limit properties.
  - `OfSize`: for size-based (co)limit properties.
  - `Hom`: for hom-set operations (e.g., `zero_hom`, `add_hom`, `neg_hom`, `smul_hom`, `sum_hom`).

---

#### **3. Tactic Stack**

- **Core automation**:
  - `aesop_cat`: used in `zero_hom` instance to discharge category-theoretic goals.
  - `ext`: extensively used to prove morphism equality by extensionality (i.e., equality of underlying homs in `V`).
  - `simp [f.comm, g.comm]`: simplifies using commutativity of the action square.
  - `infer_instance`: used to discharge typeclass constraints.
  - `apply preservesLimit_of_evaluation`, `apply comp_preservesFiniteLimits`, etc.: standard category-theoretic lemmas.

- **Equivalence-based reasoning**:
  - `apply preservesLimit_of_reflects_of_preserves`, `apply isLimitOfReflects`, etc.
  - `equivalence.trans`, `Equivalence.congrLeft`: for manipulating equivalences.

- **Linear algebraic simplifications**:
  - `one_smul`, `smul_zero`, `add_smul`, etc., used in `Linear` section.

---

#### **4. Proof Logic**

- **General pattern**:
  - Use the equivalence `Action V G ≌ SingleObj G ⥤ V` to reduce properties of `Action V G` to those of functor categories.
  - For (co)limits: apply `Adjunction.hasLimitsOfShape_of_equivalence` or its colimit variant.
  - For preservation/reflection: reduce to the evaluation functor at `SingleObj.star G`, then use:
    - `preservesLimit_of_evaluation` / `preservesColimit_of_evaluation`
    - `evaluationJointlyReflectsLimits` / `evaluationJointlyReflectsColimits`
  - For additive/linear/abelian structure: define pointwise operations on morphisms, then verify axioms by unfolding and using `V`’s properties.

- **Inductive/structural reasoning**:
  - Most proofs are *non-inductive*; they rely on universal properties and equivalence-based transfer.
  - Instances are typically `noncomputable` due to reliance on equivalences and limits/colimits.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Abelian.FunctorCategory` | Abelianness of functor categories. |
| `Mathlib.CategoryTheory.Abelian.Transfer` | Tools for transferring abelianness along equivalences. |
| `Mathlib.CategoryTheory.Linear.LinearFunctor` | Linear functors and their properties. |
| `Mathlib.CategoryTheory.Linear.FunctorCategory` | Linear structure on functor categories. |
| `Mathlib.CategoryTheory.Preadditive.AdditiveFunctor` | Additive/linear functors and instances. |
| `Mathlib.CategoryTheory.Action.Basic` | Basic definitions of `Action V G`, `forget`, `functorCategoryEquivalence`. |

---

### Summary

This file establishes that the category of internal actions `Action V G` inherits a rich suite of categorical properties from `V`, via the equivalence with the functor category `SingleObj G ⥤ V`. The proofs are largely uniform: reduce to the functor category setting, use evaluation at the unique object of `SingleObj G`, and apply known transfer lemmas. The naming and structure follow Lean’s category theory conventions, with heavy use of typeclass inference and equivalence-based reasoning.