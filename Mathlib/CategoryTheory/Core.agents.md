Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Core (C : Type u₁)` | `Type u₁` | Underlying type of the core groupoid; same as `C`, but equipped with a `Groupoid` structure where morphisms are isomorphisms in `C`. |
| `coreCategory` | `Groupoid (Core C)` | Constructs the groupoid structure on `Core C`: `Hom X Y := X ≅ Y`, identity = `Iso.refl`, composition = `Iso.trans`, inverse = `Iso.symm`. |
| `inclusion (C)` | `Core C ⥤ C` | Faithful functor embedding the core groupoid into the original category; acts as identity on objects, and sends an isomorphism to its underlying morphism. |
| `functorToCore (F)` | `G ⥤ C → G ⥤ Core C` | Factors a functor `F` from a groupoid `G` through the core of `C`. Not functorial in `F`. |
| `forgetFunctorToCore` | `(G ⥤ Core C) ⥤ G ⥤ C` | Functorial version of post-composition with `inclusion C`. |
| `ofEquivFunctor (m)` | `Core (Type u₁) ⥤ Core (Type u₂)` | Lifts a type-level `EquivFunctor` `m` to a functor between cores of `Type` categories. |

**Simp lemmas:**
- `id_hom`: The hom-component of the identity morphism in `Core C` equals the identity morphism in `C`.
- `comp_hom`: The hom-component of composition in `Core C` equals composition in `C`.

**Instance:**
- `inclusion C`.Faithful: The inclusion functor is faithful (proven via `Iso.ext`).

---

### **2. Naming Conventions**

- **Prefixes:**
  - `core_`: e.g., `coreCategory`, `Core.id_hom`, `Core.comp_hom`
  - `inclusion`: e.g., `inclusion C`
  - `functorToCore`, `forgetFunctorToCore`: indicate factoring through the core.
  - `ofEquivFunctor`: lifts a type-level construction to a categorical one.

- **Suffixes:**
  - `_hom`: refers to the underlying morphism in the ambient category (e.g., `id_hom`, `comp_hom`).
  - `toCore`: indicates mapping *into* the core.
  - `forget_`: indicates forgetting structure (here, via composition with `inclusion`).

- **Notable pattern:** `Iso.ext` used to prove equality of isomorphisms (extensionality for isos).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`: for definitional equalities (e.g., `comp_hom`, `id_hom`).
- `funext`: for extensionality of functions (used in `ofEquivFunctor.map_id`, `map_comp`).
- `congr_fun`: to apply extensionality after `funext`.
- `rw`, `erw`: rewriting using lemmas like `Iso.toEquiv_comp`, `EquivFunctor.map_trans'`.
- `apply Iso.ext`: to prove morphism equality in groupoids (e.g., faithfulness of `inclusion`).
- `dsimp`: simplification in `map_comp` proof.

No heavy automation (e.g., `aesop`, `linarith`) — proofs are mostly direct and rely on definitional structure.

---

### **4. Proof Logic**

- **Structure of proofs:**
  - Most proofs are *definitional* or *extensionality-based*.
  - For `inclusion` faithfulness: reduce to `Iso.ext`, then apply extensionality.
  - For `ofEquivFunctor`: use properties of `EquivFunctor` (`map_refl'`, `map_trans'`) and rewrite using `Iso.toEquiv_comp`.
  - Use `funext` + `congr_fun` to prove pointwise equality of morphisms (i.e., functions on elements).
  - `erw` used for rewriting up to definitional equality (e.g., in `map_comp`).

- **Induction / cases:** Not used — no inductive types or dependent elimination.

- **Key reasoning pattern:**  
  Prove equality of isomorphisms by proving equality of their underlying hom-components (via `Iso.ext`), and prove equality of hom-components pointwise (via `funext` + `congr_fun`).

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Control.EquivFunctor` | Provides `EquivFunctor` typeclass, used in `ofEquivFunctor`. |
| `Mathlib.CategoryTheory.Groupoid` | Defines `Groupoid` and `Iso`, essential for `Core`. |
| `Mathlib.CategoryTheory.Whiskering` | Used to define `forgetFunctorToCore` via `whiskeringRight`. |
| `Mathlib.CategoryTheory.Types` | Basic category theory in `Type`, including `Category`, `Functor`, etc. |

**Domain scope:** Category theory in univalent settings (groupoids, cores, faithfulness), with connections to equivariant constructions (`EquivFunctor`).

--- 

Let me know if you'd like a diagrammatic summary or a formalized lemma list.