Here's a structured technical metadata summary of the provided Lean 4 file **`CategoryTheory.NatIso`**, extracted for use in building a domain-specific AI agent for category theory formalization:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Iso.app` | `{F G : C ⥤ D} → F ≅ G → C → F.obj X ≅ G.obj X` | Extracts the component isomorphism at an object `X` from a natural isomorphism. |
| `Iso.hom_inv_id_app` / `Iso.inv_hom_id_app` | `α.hom.app X ≫ α.inv.app X = 𝟙 _` | Verifies that component morphisms are inverses. |
| `Iso.hom_inv_id_app_app` / `Iso.inv_hom_id_app_app` | Higher-order naturality for 2-functors (e.g., `C ⥤ D ⥤ E`) | Ensures invertibility holds at higher categorical levels. |
| `NatIso.trans_app` | `(α ≪≫ β).app X = α.app X ≪≫ β.app X` | Compatibility of composition with component-wise application. |
| `NatIso.isIso_app_of_isIso` | `[IsIso α] → IsIso (α.app X)` | If a natural transformation is an iso, so are its components. |
| `NatIso.isIso_of_isIso_app` | `[∀ X, IsIso (α.app X)] → IsIso α` | Converse: if all components are isos, the nat. transformation is an iso. |
| `NatIso.ofComponents` | `(∀ X, F.obj X ≅ G.obj X) → naturality → F ≅ G` | Constructs a natural isomorphism from object-level isos, checking only one direction of naturality. |
| `NatIso.hcomp` | `F ≅ G → H ≅ I → F ⋙ H ≅ G ⋙ I` | Horizontal composition of natural isomorphisms. |
| `Functor.copyObj` | `F : C ⥤ D`, `obj : C → D`, `e : ∀ X, F.obj X ≅ obj X` ⇒ `C ⥤ D` | Constructs a new functor equal on objects to `obj`, isomorphic to `F`. |
| `Functor.isoCopyObj` | `F ≅ F.copyObj obj e` | The canonical iso between `F` and its copy. |
| `NatTrans.isIso_iff_isIso_app` | `IsIso τ ↔ ∀ X, IsIso (τ.app X)` | Equivalence between natural transformation invertibility and component-wise invertibility. |

---

### 📝 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `app`: Component-wise application (`α.app X`, `e.app X`)
  - `hom` / `inv`: Hom/inv parts of an iso (`α.hom`, `α.inv`, `(α.app X).hom`)
  - `isIso_`: Properties about invertibility (`isIso_app_of_isIso`, `isIso_of_isIso_app`)
  - `cancel_natIso_*`: Cancellation lemmas for morphisms pre/post-composed with iso components.
  - `naturality_*`: Naturality conditions for natural isos (e.g., `naturality_1`, `naturality_2'`)
  - `ofComponents`: Construction pattern for natural isos from components.
  - `assoc` / `assoc_assoc`: Reassociation lemmas for associators in higher categories.

- **Suffixes**:
  - `_app`, `_app_app`, `_app_app_app`: For iterated application (e.g., 2-functors, 3-functors).
  - `_assoc`: For associativity variants used in simplification.

---

### 🧠 **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: Dominant simplifier usage, especially with `NatTrans.comp_app`, `Iso.*_id`, `assoc`, `comp_id`.
- `rw`: Rewriting using naturality, `hom_inv_id`, `inv_hom_id`.
- `aesop_cat`: Custom Aesop tactic for category theory (used in `inv_inv_app`, `ofComponents`, etc.).
- `ext`: Extensionality for natural transformations (used in `hcomp`).
- `congr_fun`, `congr_arg`: For applying extensionality to function/natural transformation equality.
- `refl`, ` rfl`: Reflexivity and definitional equality.

---

### 🧩 **Proof Logic & Strategy**

- **Component-wise reasoning**: Most proofs reduce to checking properties at each object `X : C`, using `congr_fun` or `simp`.
- **Induction / case analysis**: Not typical here; instead, proofs rely on:
  - **Definitional equality** (`rfl`, `simp` on `rfl` definitions like `app`, `hom`, `inv`)
  - **Naturality** of transformations (`naturality`, `naturality_assoc`)
  - **Iso cancellation lemmas** (`cancel_epi`, `cancel_mono`)
- **Bidirectional naturality**: Often proves one direction (e.g., `naturality_1`) and derives the other (`naturality_2`) via inversion.
- **Construction via `ofComponents`**: A common pattern: define object-level isos, verify naturality in one direction, then apply `ofComponents`.

---

### 📦 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Functor.Category` | Defines functor categories (`C ⥤ D`) and natural transformations. |
| `Mathlib.CategoryTheory.Iso` | Core isomorphism infrastructure (e.g., `IsIso`, `inv`, `hom_inv_id`). |

> **Note**: This file extends `CategoryTheory.Iso` with natural-isomorphism-specific lemmas and utilities, especially for component-wise reasoning.

---

Let me know if you'd like a **dependency graph**, **proof automation suggestions**, or **Lean 4 tactic coverage stats** for this module.