Here's a structured technical brief extracted from the provided Lean 4 file on **additive functors** in the context of preadditive categories:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Functor.Additive` | `class (F : C ⥤ D) : Prop` | A functor `F` is *additive* if `F.map` preserves addition: `F.map (f + g) = F.map f + F.map g`. |
| `F.mapAddHom` | `(X ⟶ Y) →+ (F.obj X ⟶ F.obj Y)` | Bundled additive homomorphism underlying `F.map`. |
| `preservesZeroMorphisms_of_additive` | `instance` | Every additive functor preserves zero morphisms. |
| `map_add`, `map_neg`, `map_sub`, `map_nsmul`, `map_zsmul`, `map_sum` | `theorem` | Standard properties of additive functors: preservation of addition, negation, subtraction, scalar multiplication by `ℕ`/`ℤ`, and finite sums. |
| `additive_of_iso` | `lemma` | Isomorphic functors share additivity. |
| `additive_of_full_essSurj_comp` | `lemma` | If `F` is full and essentially surjective and `F ⋙ G` is additive, then `G` is additive. |
| `additive_of_comp_faithful` | `lemma` | If `G` and `F ⋙ G` are additive and `G` is faithful, then `F` is additive. |
| `hasZeroObject_of_additive` | `lemma` | Additive functors reflect existence of zero objects. |
| `preservesFiniteBiproductsOfAdditive` | `instance` | Additive functors preserve all finite biproducts. |
| `additive_of_preservesBinaryBiproducts` | `lemma` | If `F` preserves binary biproducts and zero morphisms, then `F` is additive. |
| `additive_of_preserves_binary_products` | `lemma` | If `F` preserves binary products (and zero morphisms), then `F` is additive (since binary products = biproducts in preadditive cats). |
| `AdditiveFunctor` | `def` | Category of *bundled* additive functors `C ⥤ D`, i.e., full subcategory of `C ⥤ D` spanned by additive functors. |
| `AdditiveFunctor.forget` | `def` | Forgetful functor `C ⥤+ D → C ⥤ D`. |
| `AdditiveFunctor.of` | `def` | Inclusion of additive functors into `AdditiveFunctor C D`. |
| `AdditiveFunctor.ofLeftExact`, `ofRightExact`, `ofExact` | `def` | Embeddings of left/right/exact functors into additive functors (using that exact ⇒ additive). |

---

### 🔹 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `map_` + operation: `map_add`, `map_neg`, `map_sub`, `map_nsmul`, `map_zsmul`, `map_sum`
  - `additive_of_`: lemmas showing *sufficient conditions* for additivity.
  - `preserves_` + structure: `preservesZeroMorphisms_of_additive`, `preservesFiniteBiproductsOfAdditive`
  - `of_` + class: `ofLeftExact`, `ofRightExact`, `ofExact`, `of` (for bundling)
  - `induced_`: `inducedFunctor_additive`, `fullSubcategoryInclusion_additive`

- **Category of additive functors**:
  - Infix notation: `C ⥤+ D`
  - Bundled version: `AdditiveFunctor C D`

---

### 🔹 **Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat` (in class definition)
- `simp` / `simp_rw` (especially with `← F.map_comp`, `F.map_id`, biproduct universal properties)
- `rw`, `erw` (for rewriting using naturality, additivity, biproduct laws)
- `obtain ⟨f', hf'⟩` (for surjectivity arguments)
- `cancel_mono`, `cancel_epi` (cancellation lemmas in preadditive categories)
- `dsimp`, `exact`, `intro`, `constructor`, `apply`, `assumption`

---

### 🔹 **Proof Logic & Strategy**

- **Additivity proofs** often reduce to:
  - Showing `F.map` preserves addition (via `Functor.Additive.map_add`)
  - Using that `F.mapAddHom` is an `AddMonoidHom`, hence inherits all additive structure (negation, subtraction, scalar mult).
- **Preservation of biproducts**:
  - Uses universal property: shows that the image of a biproduct cone under `F` is again a bilimit via `isBilimitOfTotal`.
  - Relies on `F.map_sum` and `F.map_comp` to verify the required equations.
- **Converse direction** (`preserves binary biproducts ⇒ additive`):
  - Uses biproduct characterisation: `f + g = lift (id, id) (f, g)`, then applies `F` and uses preservation of biproducts.
- **Embedding exact functors**:
  - Uses that left/right/exact functors preserve binary (co)products ⇒ preserve biproducts ⇒ are additive.

---

### 🔹 **Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Limits.ExactFunctor`
- `Mathlib.CategoryTheory.Limits.Preserves.Finite`
- `Mathlib.CategoryTheory.Preadditive.Biproducts`
- `Mathlib.CategoryTheory.Preadditive.FunctorCategory`

**Scope**:
- Works in the setting of **preadditive categories** (`Preadditive C`, `Preadditive D`)
- Assumes existence of biproducts, zero objects, finite limits/colimits where needed.
- Defines the **2-category-like** structure of additive functors and natural transformations.

---

Let me know if you'd like a diagrammatic summary or a formalized summary in a specific format (e.g., for documentation or AI training).