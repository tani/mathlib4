### Technical Metadata Brief: Preservation of Finite (Co)limits in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `PreservesFiniteLimits` | `class (F : C ⥤ D) : Prop` | States that a functor `F` preserves all limits over finite categories (`FinCategory J`). |
| `PreservesFiniteProducts` | `class (F : C ⥤ D) : Prop` | Special case: `F` preserves limits over discrete diagrams indexed by finite types (`Fintype J`). |
| `ReflectsFiniteLimits` | `class (F : C ⥤ D) : Prop` | `F` reflects all limits over finite categories. |
| `ReflectsFiniteProducts` | `class (F : C ⥤ D) : Prop` | `F` reflects limits over discrete finite diagrams. |
| `PreservesFiniteColimits` | `class (F : C ⥤ D) : Prop` | `F` preserves all colimits over finite categories. |
| `PreservesFiniteCoproducts` | `class (F : C ⥤ D) : Prop` | `F` preserves colimits over discrete finite diagrams (i.e., finite coproducts). |
| `ReflectsFiniteColimits` | `class (F : C ⥤ D) : Prop` | `F` reflects all colimits over finite categories. |
| `ReflectsFiniteCoproducts` | `class (F : C ⥤ D) : Prop` | `F` reflects colimits over discrete finite diagrams. |

**Key Lemmas / Instances:**

| Name | Type | Purpose |
|------|------|---------|
| `comp_preservesFiniteLimits` | `lemma` | Composition of left-exact functors is left-exact. |
| `preservesFiniteLimits_of_natIso` | `lemma` | Preservation is preserved under natural isomorphism. |
| `preservesFiniteLimits_of_reflects_of_preserves` | `lemma` | If `F ⋙ G` preserves finite limits and `G` reflects them, then `F` preserves them. |
| `preservesFiniteLimits_of_preservesFiniteLimitsOfSize` | `lemma` | Derive `PreservesFiniteLimits` from preservation at arbitrary universe level. |
| `preservesFiniteProducts_of_reflects_of_preserves` | `lemma` | Analogous for finite products. |
| `comp_preservesFiniteCoproducts`, `comp_preservesFiniteColimits` | `lemma` | Closure under composition for right-exact functors. |
| `reflectsFiniteLimits_of_reflectsIsomorphisms` | `instance` | If `F` reflects isos, has finite limits, and preserves them, then it reflects finite limits. |
| `preservesLimitsOfShape_of_equiv` / `preservesColimitsOfShape_of_equiv` | `lemma` | Transfer preservation along categorical equivalences. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `preservesFinite*`: for functors *preserving* finite (co)limits.
  - `reflectsFinite*`: for functors *reflecting* finite (co)limits.
  - `comp_*`: for closure under composition.
  - `of_*`: for implications or transfers (e.g., `of_natIso`, `of_reflects_of_preserves`).
- **Suffixes:**
  - `*Limits`: for limits.
  - `*Colimits`: for colimits.
  - `*Products`: for finite products (limits over discrete diagrams).
  - `*Coproducts`: for finite coproducts (colimits over discrete diagrams).
- **Class names:** `PreservesFinite*`, `ReflectsFinite*`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `inferInstance` | To automatically construct instances (e.g., for class proofs). |
| `congr` | To prove subsingleton instances (uniqueness of class proofs). |
| `exact` / `apply` | To apply known lemmas or instances. |
| `letI`, `haveI` | To introduce local instances (especially for universe lifting). |
| `preservesLimitsOfShape_of_equiv` / `preservesColimitsOfShape_of_equiv` | To transfer preservation across equivalences. |
| `Nonempty.some` | To extract witnesses from `Finite`/`Fintype` existence. |
| `obtain ⟨n, ⟨e⟩⟩ := ...` | To use `Finite.exists_equiv_fin` for finite types. |
| `symm` | To reverse equivalences (e.g., `ULiftHomULiftCategory.equiv J).symm`). |

---

#### **4. Proof Logic**

- **Inductive/structural reasoning** is minimal; most proofs are *instance-based* or *lemma-chaining*.
- **Common proof patterns:**
  - **Universe lifting**: Use `FinCategory.equivAsType J` or `ULiftHom` to reduce to smaller universes.
  - **Equivalence transfer**: Use `preservesLimitsOfShape_of_equiv` to move between equivalent indexing categories.
  - **Natural isomorphism transfer**: Use `preservesLimitsOfShape_of_natIso`.
  - **Reflection + preservation ⇒ preservation**: Use `preservesLimitsOfShape_of_reflects_of_preserves`.
  - **Finite type reduction**: Use `Finite.exists_equiv_fin` to reduce to `Fin n`.
- **Subsingleton proofs**: Standard `congr`-based uniqueness of class instances.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Preserves.Basic` | Core definitions: `PreservesLimitsOfShape`, `ReflectsLimitsOfShape`, etc. |
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Definitions and basic facts about finite products as limits over discrete finite diagrams. |

**Related files (cited in docstring):**
- `CategoryTheory/Limits/Constructions/LimitsOfProductsAndEqualizers.lean`  
  → For `preservesFiniteLimitsOfPreservesEqualizersAndFiniteProducts`.
- `CategoryTheory/Functor/Flat.lean`  
  → For `preservesFiniteLimitsIffFlat`.

---

### Summary

This file formalizes the theory of **finite limit/colimit preservation and reflection** in category theory, with careful attention to universe management and class inference. It introduces 8 core classes (preservation/reflection of finite limits, products, colimits, coproducts), provides closure properties (composition, natural isomorphism), and connects them to broader notions like flatness and exactness. The proofs rely heavily on equivalence-based transfer and universe lifting, with minimal inductive reasoning.