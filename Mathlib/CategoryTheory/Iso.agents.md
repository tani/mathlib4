### Technical Metadata Brief: Isomorphisms in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Iso` | `structure Iso {C : Type u} [Category C] (X Y : C)` | Bundled isomorphism: forward map `hom`, inverse `inv`, and proofs of inverses (`hom_inv_id`, `inv_hom_id`). |
| `IsIso` | `class IsIso (f : X ⟶ Y) : Prop` | Unbundled invertibility predicate: asserts existence of a two-sided inverse. |
| `inv` | `noncomputable def inv (f : X ⟶ Y) [IsIso f] : Y ⟶ X` | Retrieves the inverse morphism using choice. |
| `asIso` | `noncomputable def asIso (f : X ⟶ Y) [IsIso f] : X ≅ Y` | Converts unbundled `IsIso f` to bundled `Iso`. |
| `of_iso` *(deprecated)* | `alias of_iso := Iso.isIso_hom` | Converts bundled `Iso` to unbundled `IsIso`. |
| `Iso.refl` | `def refl (X : C) : X ≅ X` | Identity isomorphism. |
| `Iso.symm` | `def symm (I : X ≅ Y) : Y ≅ X` | Inverse isomorphism. |
| `Iso.trans` | `def trans (α : X ≅ Y) (β : Y ≅ Z) : X ≅ Z` | Composition of isomorphisms. |
| `Iso.homToEquiv` | `def homToEquiv (α : X ≅ Y) {Z : C} : (Z ⟶ X) ≃ (Z ⟶ Y)` | Bijection on hom-sets induced by precomposition with `α.hom`. |
| `Iso.homFromEquiv` | `def homFromEquiv (α : X ≅ Y) {Z : C} : (X ⟶ Z) ≃ (Y ⟶ Z)` | Bijection on hom-sets induced by postcomposition with `α.hom`. |
| `Iso.isIso_hom`, `Iso.isIso_inv` | `lemma` | `hom` and `inv` of an `Iso` are `IsIso`. |
| `IsIso.inv_isIso`, `IsIso.comp_isIso` | `instance` | Closure of `IsIso` under inverse and composition. |
| `IsIso.inv_comp` | `@[simp] theorem inv (f ≫ h) = inv h ≫ inv f` | Inverse of composite morphism. |
| `IsIso.inv_inv` | `@[simp] theorem inv (inv f) = f` | Double inverse law. |
| `Iso.cancel_iso_hom_left/right`, `Iso.cancel_iso_inv_left/right` | `@[simp] theorem` | Cancellation lemmas for monos/epis induced by isos. |
| `Functor.mapIso` | `def mapIso (F : C ⥤ D) (i : X ≅ Y) : F.obj X ≅ F.obj Y` | Functorial action on isomorphisms. |
| `Functor.map_inv` | `@[simp] theorem F.map (inv f) = inv (F.map f)` | Functor preserves inverses. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hom_`, `inv_`: refer to forward/backward maps (e.g., `hom_inv_id`, `inv_hom_id`).
  - `symm_`: symmetry of isomorphism (e.g., `symm_symm_eq`, `symm_hom`).
  - `trans_`: composition (e.g., `trans_assoc`, `trans_refl`).
  - `cancel_`: cancellation lemmas (e.g., `cancel_iso_hom_left`).
  - `eq_`, `inv_eq_`, `comp_inv_eq_`: equivalence lemmas for morphism equalities.

- **Suffixes**:
  - `_id`: identity laws (e.g., `hom_inv_id`, `inv_hom_id`).
  - `_assoc`: associativity variants (e.g., `trans_assoc`, `cancel_iso_hom_right_assoc`).
  - `_equiv`: bijections on hom-sets (e.g., `homToEquiv`, `homFromEquiv`).
  - `_of_`: implications (e.g., `inv_eq_of_hom_inv_id`, `of_isIso_comp_left`).

- **Notation**:
  - `X ≅ Y` ⇔ `Iso X Y`
  - `α ≪≫ β` ⇔ `Iso.trans α β`

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Custom `aesop` configuration for category theory; used in `Iso` definition and proofs of inverse identities.
- **`simp` / `simp only`**: Heavily used for rewriting identities, especially with `@[simp]` lemmas.
- **`ext`**: Extensionality for `Iso` (via `Iso.ext`).
- **`rw`**: Rewriting with lemmas like `assoc`, `id_comp`, `comp_id`.
- **`apply` / `exact`**: Used in instance proofs (e.g., `epi_of_iso`, `mono_of_iso`).
- **`aesop apply safe`**: For automated application of lemmas in `IsIso` reasoning.
- **`cancel_mono` / `cancel_epi`**: Tactics for monic/epic cancellation (used in `simp` via lemmas).
- **`reassoc`**: Custom attribute for rewriting associativity in complex compositions (e.g., `@[reassoc]` on `hom_inv_id`).

---

#### **4. Proof Logic**

- **Structure proofs**:
  - Use `ext` + `calc` for equality of `Iso`s (e.g., `Iso.ext`).
  - Use `rfl` for definitional equalities (e.g., `symm_symm_eq`, `trans_mk`).
- **Isomorphism properties**:
  - Prove `Iso` laws by unfolding definitions and applying category axioms (`assoc`, `id_comp`, `comp_id`).
  - Use `simp` with `hom_inv_id`, `inv_hom_id`, and `assoc` to reduce compositions.
- **`IsIso` reasoning**:
  - Use `Classical.choose_spec` to extract inverse properties.
  - Prove `IsIso` via constructing explicit inverses (e.g., `⟨f, hom_inv_id, inv_hom_id⟩`).
  - Use `cancel_mono`/`cancel_epi` for uniqueness of inverses (e.g., `inv_eq_of_hom_inv_id`).
- **Functoriality**:
  - Prove `mapIso` properties by unfolding and using `Functor.map_comp`, `Functor.map_id`.
  - Use `simp` with `map_comp`, `map_id`, and `inv_comp` to simplify.

---

#### **5. Imports**

- **Core dependency**: `Mathlib.Tactic.CategoryTheory.Reassoc`
  - Provides `reassoc` attribute for rewriting associativity in complex compositions.
- **Implicit imports** (via `CategoryTheory` namespace and `Category` typeclass):
  - `Mathlib.CategoryTheory.Category.Basic`: defines `Category`, `⟦X, Y⟧`, `comp`, `id`.
  - `Mathlib.CategoryTheory.Functor`: used for `Functor.mapIso`, `Functor.map`.
  - `Mathlib.CategoryTheory.EpiMono`: used for `Epi`, `Mono` instances (`epi_of_iso`, `mono_of_iso`).
  - `Mathlib.Classical`: used for `Classical.choose` in `inv`.

---

### Summary

This file formalizes the foundational theory of isomorphisms in category theory, distinguishing between **bundled** (`Iso`) and **unbundled** (`IsIso`) notions. It provides:
- A rich algebra of isomorphisms (identity, symmetry, composition).
- Equivalences of hom-sets induced by isomorphisms.
- Closure properties of `IsIso` under composition and inversion.
- Functorial behavior of isomorphisms.
- Tactics and attributes (`reassoc`, `aesop_cat`) tailored for categorical reasoning.

The design prioritizes usability in proofs via `simp`-friendly lemmas and typeclass inference, while carefully managing definitional equality and uniqueness of inverses.