Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Bundled Exact Functors in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LeftExactFunctor C D` | `FullSubcategory (fun F : C ⥤ D ↦ PreservesFiniteLimits F)` — category of left exact functors (i.e., those preserving finite limits). |
| `RightExactFunctor C D` | `FullSubcategory (fun F : C ⥤ D ↦ PreservesFiniteColimits F)` — category of right exact functors (i.e., those preserving finite colimits). |
| `ExactFunctor C D` | `FullSubcategory (fun F : C ⥤ D ↦ PreservesFiniteLimits F ∧ PreservesFiniteColimits F)` — category of exact functors (both left and right exact). |
| `LeftExactFunctor.forget`, `RightExactFunctor.forget`, `ExactFunctor.forget` | Forgetful functors to the un-bundled functor category `C ⥤ D`; all are full and faithful. |
| `LeftExactFunctor.ofExact`, `RightExactFunctor.ofExact` | Functors from `ExactFunctor C D` to `LeftExactFunctor C D` / `RightExactFunctor C D`, projecting the left/right exactness witness. |
| `LeftExactFunctor.of`, `RightExactFunctor.of`, `ExactFunctor.of` | Constructors turning an unbundled functor with proof of exactness into a bundled object. |
| `LeftExactFunctor.whiskeringLeft`, `RightExactFunctor.whiskeringLeft`, `ExactFunctor.whiskeringLeft` | Bifunctorial whiskering on the left, preserving left/right/exactness. |
| `LeftExactFunctor.whiskeringRight`, etc. | Bifunctorial whiskering on the right, preserving left/right/exactness. |

**Key lemmas (simplified):**
- `LeftExactFunctor.ofExact_obj`, `RightExactFunctor.ofExact_obj`: Projection of exactness data.
- `LeftExactFunctor.forget_obj_of`, `RightExactFunctor.forget_obj_of`, `ExactFunctor.forget_obj_of`: Forgetful functor applied to bundled object recovers original functor.
- Noncomputable instances: `PreservesFiniteLimits F.obj` / `PreservesFiniteColimits F.obj` for bundled functors.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `LeftExactFunctor.`, `RightExactFunctor.`, `ExactFunctor.` — module prefixes for bundled categories.
  - `of`, `ofExact` — constructors / projections between bundled and unbundled forms.
  - `forget` — forgetful functors.
  - `whiskeringLeft`, `whiskeringRight` — bifunctorial action of composition.

- **Infix notation:**
  - `C ⥤ₗ D` for `LeftExactFunctor C D`
  - `C ⥤ᵣ D` for `RightExactFunctor C D`
  - `C ⥤ₑ D` for `ExactFunctor C D`

- **Suffixes:**
  - `obj`, `map` — standard for functor components.
  - `_of`, `_ofExact` — distinguish between `of` (constructor) and `ofExact` (projection from exact to left/right).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rfl` — for definitional equalities (e.g., `obj`, `map` components).
- `aesop_cat` — automated category theory reasoning (used in `map_id`, `map_comp`).
- `dsimp` — simplification of definitional reductions (e.g., in `whiskeringLeft.obj`).
- `exact` — to apply lemmas like `comp_preservesFiniteLimits`.
- `rw [FullSubcategory.*]` — rewriting using structure of full subcategories.
- `aesop` — general-purpose automation (implied by `aesop_cat` usage).

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - Most proofs are definitional (`rfl`) due to bundling via `FullSubcategory`.
  - For whiskering constructions:
    - Use `FullSubcategory.lift` to lift unbundled whiskering to the subcategory.
    - Prove preservation property using `comp_preservesFiniteLimits` / `comp_preservesFiniteColimits`.
    - Use `aesop_cat` to discharge functoriality (`map_id`, `map_comp`).
  - Projections (`ofExact`) use `And.left` / `And.right` to extract components.

- **Inductive/structural reasoning:** Minimal — relies on definitional equality and typeclass inference (`inferInstance`).

---

#### **5. Imports & Dependencies**

- **Primary import:**
  ```lean
  import Mathlib.CategoryTheory.Limits.Preserves.Finite
  ```
  - Provides `PreservesFiniteLimits`, `PreservesFiniteColimits`, and related lemmas like `comp_preservesFiniteLimits`.

- **Implicit dependencies:**
  - `CategoryTheory.FullSubcategory` — for `FullSubcategory`, `fullSubcategoryInclusion`, etc.
  - `CategoryTheory.NaturalTransformation`, `CategoryTheory.Functor` — for whiskering and functor composition.
  - `CategoryTheory.Limits.Preserves` — for preservation lemmas.

---

### **Summary**

This file formalizes the *bundled* categories of left exact, right exact, and exact functors between categories `C` and `D`, leveraging `FullSubcategory` to embed the unbundled notion (defined via preservation properties) into a well-behaved category. It provides forgetful functors, projection functors between the three classes, and bifunctorial whiskering operations, all with proofs of correctness via typeclass inference and `FullSubcategory` machinery.

Let me know if you'd like a diagram of the relationships or a formalization roadmap for extending this (e.g., to derived functors or abelian categories).