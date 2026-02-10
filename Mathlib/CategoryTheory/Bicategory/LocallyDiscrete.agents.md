### Technical Metadata Brief: `LocallyDiscrete` Bicategory Construction in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LocallyDiscrete C` | `structure LocallyDiscrete (C : Type u) where as : C` | Wraps a category `C` as a new type whose elements are objects of `C`, used to construct a bicategory with only identity 2-morphisms. |
| `locallyDiscreteEquiv` | `LocallyDiscrete C ≃ C` | Shows equivalence between `LocallyDiscrete C` and `C`. Used for reasoning and simplification. |
| `CategoryStruct (LocallyDiscrete C)` | `CategoryStruct (LocallyDiscrete C)` | Equips `LocallyDiscrete C` with a category structure where homs are discrete categories over `a.as ⟶ b.as`. |
| `homSmallCategory` | `SmallCategory (a ⟶ b)` | Ensures each hom-category in `LocallyDiscrete C` is small (via `discreteCategory`). |
| `subsingleton2Hom` | `Subsingleton (f ⟶ g)` | States that any two 2-morphisms between same 1-morphisms are equal — key for locally discrete behavior. |
| `eq_of_hom` | `(η : f ⟶ g) → f = g` | Extracts equality of 1-morphisms from existence of a 2-morphism. |
| `locallyDiscreteBicategory` | `Bicategory (LocallyDiscrete C)` | Constructs a bicategory structure on `LocallyDiscrete C`, where all coherence cells are identity 2-morphisms. |
| `locallyDiscreteBicategory.strict` | `Strict (LocallyDiscrete C)` | Shows the constructed bicategory is *strict*, i.e., unitors and associators are identities. |
| `IsLocallyDiscrete B` | `∀ b c, IsDiscrete (b ⟶ c)` | Predicate stating a bicategory has discrete hom-categories. |
| `PrelaxFunctor.map₂_eqToHom` | `F.map₂ (eqToHom h) = eqToHom (F.congr_map h)` | Describes how lax functors act on equality-based 2-morphisms. |
| `toLoc` | `f : a ⟶ b ↦ ⟨f⟩ : LocallyDiscrete.mk a ⟶ LocallyDiscrete.mk b` | Embeds morphisms of `C` as 1-morphisms in `LocallyDiscrete C`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes:**
  - `locallyDiscrete*`: e.g., `locallyDiscreteEquiv`, `locallyDiscreteBicategory`
  - `is*`: e.g., `IsLocallyDiscrete`
  - `*Ext`: e.g., `eq_of_hom` (extracts equality from a 2-cell)
  - `to*`: e.g., `toLoc` (maps from original category to the locally discrete version)
  - `*as`: e.g., `id_as`, `comp_as` — projections to underlying category structure
  - `eqToHom`, `eqToIso`: standard Mathlib utilities for converting equalities to isomorphisms/homs in categories with subsingleton homs.

- **Structure naming:** `LocallyDiscrete` is both a type constructor and a namespace.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs within this file:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | For category-theoretic reasoning, especially in proving inverses of equivalences (`left_inv`, `right_inv`). |
| `simp` / `simp only [...]` | Simplifying goals using `@[simp]` lemmas like `id_as`, `comp_as`, `toLoc`, etc. |
| `subst` | When eliminating equalities via substitution (e.g., in `eqToHom_toLoc`). |
| `congr_arg`, `congr_arg₂` | To lift equalities through function applications (e.g., in `whiskerLeft`, `whiskerRight`). |
| `apply Discrete.ext` | Proving equality of morphisms in discrete categories. |
| `ext` | General extensionality tactic (used in `@[ext]` attribute on `LocallyDiscrete`). |
| `rfl` | Reflexivity proofs, especially for definitional equalities. |

---

#### **4. Proof Logic**

- **Construction Strategy:**
  - First define `LocallyDiscrete C` as a wrapper type.
  - Define a category structure on it using `Discrete (a.as ⟶ b.as)` for homs.
  - Prove hom-categories are small and subsingletons (ensuring uniqueness of 2-morphisms).
  - Construct bicategory structure:
    - Whiskering uses `eqToHom` since only equalities exist between 1-morphisms.
    - Coherence cells (`associator`, `leftUnitor`, `rightUnitor`) are defined via `eqToIso` and `Discrete.ext`.
  - Show strictness by appealing to category axioms (`assoc`, `id_comp`, `comp_id`) and `Discrete.ext`.
  - Define `IsLocallyDiscrete` as a predicate and prove that `LocallyDiscrete C` satisfies it.
  - Prove any *locally discrete* bicategory is strict.

- **Common Proof Pattern:**
  - Use `Discrete.ext` to reduce equality of 1-morphisms (or 2-cells) to equality of underlying components.
  - Use `eq_of_hom` to go from a 2-cell to an equality of 1-cells.
  - Leverage `eqToHom`/`eqToIso` to convert equalities into morphisms/isomorphisms where needed.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.DiscreteCategory` | Provides `Discrete C`, `isDiscrete`, `instSubsingletonDiscreteHom`, `discreteCategory`. |
| `Mathlib.CategoryTheory.Bicategory.Functor.Prelax` | Needed for `PrelaxFunctor.map₂_eqToHom` lemma. |
| `Mathlib.CategoryTheory.Bicategory.Strict` | Provides `Strict` class and related lemmas. |

These imports indicate the module sits at the intersection of:
- **Category theory** (hom-categories, whiskering, coherence),
- **Bicategory theory** (strictness, local discreteness),
- **Type theory** (subsingletons, decidability, equivalence reasoning).

---

### Summary

This file formalizes the canonical way to turn any category `C` into a *strict locally discrete bicategory* `LocallyDiscrete C`, where:
- Objects = objects of `C`,
- 1-morphisms = morphisms of `C`,
- 2-morphisms = equalities between 1-morphisms.

It also introduces the abstract notion of *locally discrete bicategories* and proves that any such bicategory must be strict. The formalization is highly structured, leveraging subsingleton homs and discrete categories to simplify coherence reasoning.