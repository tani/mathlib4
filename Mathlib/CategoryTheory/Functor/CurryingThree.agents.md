Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `currying₃` | `def currying₃ : (C₁ ⥤ C₂ ⥤ C₃ ⥤ E) ≌ C₁ × C₂ × C₃ ⥤ E`<br>Equivalence of categories induced by currying functors in three variables. Built via `currying.trans` and `prod.associativity`. |
| `uncurry₃` | `abbrev uncurry₃ : (C₁ ⥤ C₂ ⥤ C₃ ⥤ E) ⥤ C₁ × C₂ × C₃ ⥤ E`<br>The forward direction (functor) of `currying₃`. |
| `curry₃` | `abbrev curry₃ : (C₁ × C₂ × C₃ ⥤ E) ⥤ C₁ ⥤ C₂ ⥤ C₃ ⥤ E`<br>The inverse direction (functor) of `currying₃`. |
| `fullyFaithfulUncurry₃` | `def fullyFaithfulUncurry₃ : ... .FullyFaithful`<br>States that `uncurry₃` is fully faithful (follows from `currying₃.fullyFaithfulFunctor`). |
| `curry₃_obj_map_app_app`, `curry₃_obj_obj_map_app`, `curry₃_obj_obj_obj_map` | `@[simp]` lemmas describing how `curry₃.obj F` acts on morphisms in each variable. |
| `curry₃_map_app_app_app` | `@[simp]` lemma describing action of `curry₃.map f` on components. |
| `currying₃_unitIso_hom_app_app_app_app`, `currying₃_unitIso_inv_app_app_app_app` | `@[simp]` lemmas for unit isomorphism components of the equivalence `currying₃`. |
| `curry₃ObjProdComp` | `def curry₃ObjProdComp ... : curry₃.obj (...) ≅ ...`<br>Isomorphism expressing compatibility of `curry₃` with product of functors and composition. |
| `bifunctorComp₁₂Iso` | `def bifunctorComp₁₂Iso ... : bifunctorComp₁₂ F₁₂ G ≅ ...`<br>Relates `bifunctorComp₁₂` to currying/uncurrying. |
| `bifunctorComp₂₃Iso` | `def bifunctorComp₂₃Iso ... : bifunctorComp₂₃ F G₂₃ ≅ ...`<br>Relates `bifunctorComp₂₃` to currying/uncurrying with associator. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `curry₃_`, `uncurry₃_`: for 3-ary currying/uncurrying operations.
  - `currying₃_`: for components of the equivalence `currying₃`.
  - `bifunctorComp₁₂`, `bifunctorComp₂₃`: for binary composition of bifunctors (used in higher-order settings).
- **Suffixes**:
  - `_obj`, `_map`, `_app`, `_hom`, `_inv`: standard for functor/category-theoretic components.
  - `_Iso`: for natural isomorphisms.
- **Underscored variables** like `X₁`, `X₂`, `X₃`, `f`, `F`, `G` follow standard Lean category theory conventions.

---

### 🔹 **Tactic Stack**

- **`simp` / `@[simp]`**: heavily used for simplification of component-wise definitions.
- **`rfl`**: used in `@[simp]` lemmas where equality is definitional.
- **`by simp [currying₃, Equivalence.unit]`**: for reasoning about unit isomorphisms.
- **`NatIso.ofComponents`**: used repeatedly to construct natural isomorphisms pointwise (often nested).
- **`congrLeft`**: used in `currying₃` definition to apply equivalence on left factor.

---

### 🔹 **Proof Logic**

- **Definitional reasoning**: Most lemmas are proven by `rfl`, indicating that the definitions are set up so that the required equalities hold *by definition* (e.g., action of `curry₃.obj F` on morphisms).
- **Component-wise construction**: Isomorphisms like `curry₃ObjProdComp`, `bifunctorComp₁₂Iso`, etc., are built using `NatIso.ofComponents`, reducing proofs to pointwise identities.
- **Equivalence-based reasoning**: The main theorem (`currying₃`) is built from existing equivalences (`currying`, `prod.associativity`), leveraging `trans` and `congrLeft`.
- **No induction or case analysis** appears—proofs rely on simplification and definitional equality.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Functor.Currying` | Core definitions and lemmas for currying of functors in 2 variables. |
| `Mathlib.CategoryTheory.Functor.Trifunctor` | (Not directly used in this file, but likely related to context.) |
| `Mathlib.CategoryTheory.Products.Associator` | Provides `prod.associativity`, used to adjust parentheses in product categories. |

> **Scope**: This file formalizes the categorical equivalence between trifunctors and 3-ary curried functors, building on existing 2-ary currying and product associativity.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch**, or **export to JSON/CSV** for ingestion into a domain-specific AI agent.