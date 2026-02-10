Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Cartesian and Strongly Cartesian Morphisms in `CategoryTheory.FiberedCategory`**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsCartesian p f φ` | `Class` extending `IsHomLift p f φ` | Expresses that `φ : a ⟶ b` is *cartesian* over `f : R ⟶ S` w.r.t. `p : 𝒳 ⥤ 𝒮`: for any `φ' : a' ⟶ b` lifting `f`, there exists a unique lift `χ : a' ⟶ a` of `𝟙 R` with `χ ≫ φ = φ'`. |
| `IsStronglyCartesian p f φ` | `Class` extending `IsHomLift p f φ` | Expresses *strongly cartesian*: for any `g : R' ⟶ R` and `φ' : a' ⟶ b` lifting `g ≫ f`, there exists a unique lift `χ : a' ⟶ a` of `g` with `χ ≫ φ = φ'`. |
| `IsCartesian.map p f φ φ'` | `a' ⟶ a` | The unique morphism induced by the universal property of `φ`. |
| `IsCartesian.fac` | `map ≫ φ = φ'` | Factorization property of `map`. |
| `IsCartesian.map_uniq` | Uniqueness of `map` | Any other lift `ψ` with `ψ ≫ φ = φ'` must equal `map`. |
| `IsCartesian.ext` | `(ψ ≫ φ = ψ' ≫ φ) → ψ = ψ'` | Left-cancellation for morphisms lifting `𝟙 R` through a cartesian morphism. |
| `IsCartesian.domainUniqueUpToIso` | `a' ≅ a` | Canonical iso between domains of two cartesian morphisms over same `f`. |
| `IsStronglyCartesian.universal_property` | `∃! χ : a' ⟶ a, IsHomLift p g χ ∧ χ ≫ φ = φ'` | Flexible version of the universal property (handles non-defeq equalities). |
| `IsStronglyCartesian.map p f φ hf' φ'` | `a' ⟶ a` | Universal lift over `g : R' ⟶ R` for `φ'` lifting `f' = g ≫ f`. |
| `IsStronglyCartesian.map_comp_map` | `map ≫ map = map` | Compatibility of `map` with composition of diagrams. |
| `IsStronglyCartesian.comp` | Instance | Composite of two strongly cartesian morphisms is strongly cartesian. |
| `IsStronglyCartesian.of_comp` | Instance | If `φ ≫ ψ` and `ψ` are strongly cartesian, then so is `φ`. |
| `IsStronglyCartesian.isIso_of_base_isIso` | `IsIso φ` | A strongly cartesian morphism over an isomorphism is itself an isomorphism. |
| `IsStronglyCartesian.domainIsoOfBaseIso` | `a' ≅ a` | Canonical iso between domains of strongly cartesian morphisms over *isomorphic* bases. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isCartesian_`, `isStronglyCartesian_`: for instances/lemmas about the classes.
  - `map_`: for morphisms induced by universal properties.
  - `domainUniqueUpToIso`, `domainIsoOfBaseIso`: for canonical isomorphisms between domains.
- **Suffixes**:
  - `_hom`, `_inv`: for components of isomorphisms.
  - `_isHomLift`: for proof instances that a morphism is a hom-lift.
- **Other patterns**:
  - `fac`: short for *factorization*.
  - `ext`: extensionality / uniqueness.
  - `of_`, `comp`: for closure properties (e.g., `of_iso`, `of_comp`, `comp`).
  - `self`: for special cases like `map_self`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop_cat`: for automated category-theoretic reasoning (e.g., diagram chasing).
- `simp only [...]`: heavily used with `assoc`, `id_comp`, `fac`, `map_uniq`, etc.
- `rw [...]`: especially for rewriting equalities like `hf'`, `assoc`, `inv_hom_id`.
- `apply map_uniq`, `apply IsCartesian.ext`, `apply IsStronglyCartesian.ext`: for uniqueness arguments.
- `subst_hom_lift`: to simplify hypotheses of the form `IsHomLift`.
- `classical`: implicit via `Classical.choose`/` Classical.choose_spec`.
- `symm`, `rfl`, `intro`, `refine`, `use`: standard proof scripting.

---

#### **4. Proof Logic & Strategy**

- **Inductive/constructive style**: Definitions are typeclasses with `universal_property`/`universal_property'` fields, implemented via `Classical.choose`.
- **Uniqueness via extensionality**: Most proofs reduce to showing two morphisms agree by applying `map_uniq` or `ext`.
- **Diagram chasing**: Proofs often involve constructing a lift via the universal property, then verifying it satisfies required properties (e.g., `fac`, `IsHomLift`).
- **Isomorphism handling**:
  - Use `domainUniqueUpToIso` / `domainIsoOfBaseIso` to transport structure.
  - Prove inverse laws via `ext` and `fac`.
- **Closure properties**:
  - `comp`: compose two universal lifts.
  - `of_comp`: deduce cartesian-ness of a factor from cartesian-ness of composite and codomain.
- **Isomorphism lifting**:
  - `isIso_of_base_isIso`: construct inverse via `map` applied to identity over `f⁻¹`.

---

#### **5. Imports & Dependencies**

- **Core dependency**: `Mathlib.CategoryTheory.FiberedCategory.HomLift`
  - Provides `IsHomLift p f φ`, the foundational notion of a morphism `φ` lying over `f`.
- **Implicit dependencies**:
  - `CategoryTheory.Category`: for category structure.
  - `CategoryTheory.Functor`: for functors `p : 𝒳 ⥤ 𝒮`.
  - `Classical`: for choice (used in `choose`).
  - `Mathlib.CategoryTheory.Iso`: for isomorphisms (`Iso`, `asIso`, etc.).
  - `Mathlib.CategoryTheory.NaturalTransformation`: not directly used, but `CategoryTheory` namespace implies broader context.

---

#### **6. Notes on Formalization Choices**

- **`universal_property` vs `universal_property'`**:
  - `universal_property'` is the raw field, less flexible with definitional equalities.
  - `universal_property` is a lemma that adapts to non-defeq equalities (e.g., `f' = g ≫ f`).
- **`map` definitions** are noncomputable (due to `Classical.choose`), but used constructively in proofs.
- **`[IsHomLift p f φ]` instances** are often inferred via `inferInstance` or `simpa using ...`.
- **`reassoc` attribute** on `fac` and `map_comp_map` enables `simp` to rewrite associativity automatically.

---

Let me know if you'd like a visual diagram summary or a comparison table with cocartesian morphisms (as mentioned in the header).