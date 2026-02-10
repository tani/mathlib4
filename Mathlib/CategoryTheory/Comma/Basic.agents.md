Here's a structured **technical metadata brief** extracted from the provided Lean 4 file on *comma categories* (`Comma.lean`), suitable for building a domain-specific AI agent in category theory:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Comma L R` | `Type u`-valued structure: objects are triples `(left : A, right : B, hom : L.left ⟶ R.right)` — the **objects of the comma category**. |
| `CommaMorphism X Y` | Structure: morphisms are pairs `(left : X.left ⟶ Y.left, right : X.right ⟶ Y.right)` satisfying a commutativity condition `w`. |
| `commaCategory` | Instance: equips `Comma L R` with a category structure (`Hom`, `id`, `comp`). |
| `fst L R : Comma L R ⥤ A` | Projection functor sending `(X.left, X.right, hom) ↦ X.left`. |
| `snd L R : Comma L R ⥤ B` | Projection functor sending `(X.left, X.right, hom) ↦ X.right`. |
| `natTrans : fst ⋙ L ⟶ snd ⋙ R` | Natural transformation whose component at `X` is `X.hom`. |
| `map α β : Comma L R ⥤ Comma L' R'` | Functor induced by `F₁ : A ⥤ A'`, `F₂ : B ⥤ B'`, `F : T ⥤ T'`, and natural transformations `α : F₁ ⋙ L' ⟶ L ⋙ F`, `β : R ⋙ F ⟶ F₂ ⋙ R'`. |
| `mapLeft l : Comma L₂ R ⥤ Comma L₁ R` | Functor induced by a natural transformation `l : L₁ ⟶ L₂`. |
| `mapRight r : Comma L R₁ ⥤ Comma L R₂` | Functor induced by a natural transformation `r : R₁ ⟶ R₂`. |
| `preLeft F L R : Comma (F ⋙ L) R ⥤ Comma L R` | Base-change along `F : C ⥤ A` on the left argument. |
| `preRight L F R : Comma L (F ⋙ R) ⥤ Comma L R` | Base-change along `F : C ⥤ B` on the right argument. |
| `post L R F : Comma L R ⥤ Comma (L ⋙ F) (R ⋙ F)` | Post-composition with `F : T ⥤ C`. |
| `fromProd L R : A × B ⥤ Comma L R` | For `L, R` into `Discrete PUnit`, this is the canonical equivalence. |
| `equivProd L R : Comma L R ≌ A × B` | Equivalence between comma category over discrete terminal category and product. |
| `opFunctor : Comma L R ⥤ (Comma R.op L.op)ᵒᵖ` | Canonical functor implementing contravariance under op. |
| `opEquiv : Comma L R ≌ (Comma R.op L.op)ᵒᵖ` | Equivalence implementing duality of comma categories. |
| `isoMk` | Constructs an isomorphism in `Comma L R` from isos on left/right satisfying a coherence condition. |
| `leftIso`, `rightIso` | Extract left/right component isos from a comma-category iso. |
| `inv_left`, `inv_right` | Describe inverses in `Comma L R` componentwise. |

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `map`: induced functors from transformations between base functors (`map`, `mapLeft`, `mapRight`).
  - `pre`: base-change functors (e.g., `preLeft`, `preRight`).
  - `post`: post-composition functors (`post`).
  - `fromProd`, `toPUnitIdEquiv`, `toIdPUnitEquiv`: canonical equivalences in special cases.
  - `op`, `unop`: for dualizing constructions (`opFunctor`, `unopFunctor`).
- **Suffixes**:
  - `Iso`: natural isomorphisms (`mapLeftIso`, `mapRightIso`, `equivProd`, `opEquiv`).
  - `Equiv`: equivalences of categories (`equivProd`, `toPUnitIdEquiv`, `toIdPUnitEquiv`).
  - `Id`, `Comp`: for identities and compositions (`mapLeftId`, `mapLeftComp`, `mapRightId`, etc.).
- **Component selectors**:
  - `.left`, `.right`: projections of morphism components.
  - `.hom`: the mediating morphism in an object.

---

### ⚙️ **Tactic Stack**

- `aesop_cat`: used for category-theoretic simplification and solving commutative diagrams.
- `simp_rw`, `rw`, `erw`: rewriting with naturality, associativity, and unit laws.
- `cases H`: for equality induction on paths (e.g., `eqToHom_left`, `eqToHom_right`).
- `ext`: extensionality lemmas (`hom_ext`, `CommaMorphism.ext`).
- `apply IsIso.eq_inv_of_hom_inv_id`: to prove inverses.
- `simp only [...]`: fine-grained simplification, especially with `assoc`, `comp_id`, `Iso.hom_inv_id`, etc.
- `aesop_cat`, `simp`, `rw` in combination for diagram chasing.

---

### 🧠 **Proof Logic & Strategy**

- **Inductive/structural reasoning** on equality of paths (`eqToHom_*` lemmas).
- **Component-wise proofs**: many properties (e.g., `id`, `comp`, `inv`) are proven by reducing to `left` and `right` components.
- **Diagram chasing**: verifying naturality or commutativity of squares via `w` field, using `aesop_cat` and `simp`.
- **Equivalence construction**: often via `NatIso.ofComponents` with `Iso.refl _`, or by composing known isos/equivalences (`trans`, `≪≫`).
- **Faithful/Full/EssSurj proofs**: use `of_iso` to transfer properties along known isomorphisms of functors (e.g., `preLeftIso`, `postIso`).
- **Duality**: `opFunctor`/`unopFunctor` and their compositions are proven via direct computation on components.

---

### 📦 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Iso` | Isomorphisms, inverses, `IsIso`, `Iso.refl`, etc. |
| `Mathlib.CategoryTheory.Functor.Category` | Functor category structure, natural transformations. |
| `Mathlib.CategoryTheory.EqToHom` | Conversion from equality to homs (`eqToHom`). |
| `Mathlib.CategoryTheory.Products.Unitor` | Unitors for product category (`leftUnitor`, `rightUnitor`). |

Also uses:
- `CategoryTheory.Category` (universe management, `Category` class).
- `Opposite` (for `op`, `unop`, dual constructions).
- Standard `Category` namespace open.

---

Let me know if you'd like a **Lean-specific cheat sheet**, **proof automation suggestions**, or a **formalization roadmap** for comma categories!