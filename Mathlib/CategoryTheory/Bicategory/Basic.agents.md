### Technical Metadata Brief: Bicategory Formalization in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Bicategory` | `class Bicategory (B : Type u) extends CategoryStruct.{v} B` | Core typeclass defining a bicategory: objects, 1-morphisms, 2-morphisms, whiskering, associators, unitors, and coherence axioms. |
| `whiskerLeft` | `f ◁ η : f ≫ g ⟶ f ≫ h` | Left whiskering of a 2-morphism `η : g ⟶ h` along a 1-morphism `f`. |
| `whiskerRight` | `η ▷ h : f ≫ h ⟶ g ≫ h` | Right whiskering of a 2-morphism `η : f ⟶ g` along a 1-morphism `h`. |
| `associator` | `α_ f g h : (f ≫ g) ≫ h ≅ f ≫ g ≫ h` | Associativity constraint isomorphism for 1-morphism composition. |
| `leftUnitor` | `λ_ f : 𝟙 a ≫ f ≅ f` | Left unit constraint isomorphism. |
| `rightUnitor` | `ρ_ f : f ≫ 𝟙 b ≅ f` | Right unit constraint isomorphism. |
| `whiskerLeftIso`, `whiskerRightIso` | `g ≅ h ⇒ f ◁ g ≅ f ◁ h`, `f ≅ g ⇒ f ▷ h ≅ g ▷ h` | Whiskering preserves 2-isomorphisms. |
| `precomp`, `postcomp` | Functors `(b ⟶ c) ⥤ (a ⟶ c)`, `(a ⟶ b) ⥤ (a ⟶ c)` | Represent pre- and post-composition as functors. |
| `precomposing`, `postcomposing` | Functors `(a ⟶ b) ⥤ (b ⟶ c) ⥤ (a ⟶ c)`, `(b ⟶ c) ⥤ (a ⟶ b) ⥤ (a ⟶ c)` | Curried versions of pre-/post-composition. |
| `associatorNatIso*`, `leftUnitorNatIso`, `rightUnitorNatIso` | Natural isomorphisms between composite functors | Express coherence isomorphisms as natural isomorphisms of functors. |
| `pentagon`, `triangle` | Axioms for associator/unitors | Coherence conditions ensuring consistency of higher associativity/unitors. |
| `whisker_exchange` | `f ◁ θ ≫ η ▷ i = η ▷ h ≫ g ◁ θ` | Exchange law for left/right whiskering (interchange law). |
| `whiskerLeft_id`, `whiskerRight_id`, etc. | Idempotence of whiskering with identities | Ensures whiskering behaves correctly with identity 2-morphisms. |
| `unitors_equal`, `unitors_inv_equal` | `(λ_ (𝟙 a)).hom = (ρ_ (𝟙 a)).hom` | Compatibility of left/right unitors at identity 1-morphism. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `whiskerLeft_`, `whiskerRight_`: for whiskering lemmas.
  - `associator_`, `leftUnitor_`, `rightUnitor_`: for coherence isomorphism lemmas.
  - `precomp_`, `postcomp_`, `precomposing_`, `postcomposing_`: for functoriality constructions.
  - `inv_`, `hom_`: for inverses and components of isomorphisms (e.g., `inv_whiskerLeft`, `hom_inv_whiskerRight`).
- **Suffixes**:
  - `_symm`: symmetric versions of equations (often derived via `eq_of_inv_eq_inv`).
  - `_assoc`, `_assoc_inv`: variants involving associators in composition.
  - `_naturality`: naturality of associators/unitors w.r.t. 2-morphisms.
- **Infix Notation**:
  - `f ◁ η` for `whiskerLeft f η`
  - `η ▷ h` for `whiskerRight η h`
- **Notation Shorthands**:
  - `α_`, `λ_`, `ρ_` for `associator`, `leftUnitor`, `rightUnitor`.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used extensively in `by aesop_cat` proofs for category-theoretic simplification and rewriting (a custom tactic for categories/bicategories).
- **`simp` / `simp only [...]`**: For rewriting using `simp` lemmas (e.g., `whiskerLeft_id`, `triangle`, `pentagon`).
- **`rw [...]`**: Rewriting with specific lemmas (e.g., `triangle`, `pentagon`, naturality).
- **`eq_of_inv_eq_inv`**: To prove equality of morphisms by showing their inverses are equal.
- **`cancel_epi`, `cancel_mono`**: Cancellation lemmas for monos/epis in proofs involving associators.
- **`apply IsIso.inv_eq_of_hom_inv_id`**: To prove inverses of isomorphisms.
- **`simp only [← ...]`**: Reverse rewriting to simplify expressions with associators/unitors.

---

#### **4. Proof Logic & Strategy**

- **Inductive/Structural Reasoning**: Most proofs proceed by structural induction on the shape of 2-morphisms (especially in `simp-normal form` context).
- **Coherence via Axioms**: Proofs often reduce complex whiskering/unitors/associators using:
  - Pentagon/triangle identities,
  - Naturality of associators/unitors,
  - Exchange law (`whisker_exchange`),
  - Whiskering compatibility with composition/identities.
- **Simp-normal Form**: Rewriting into a canonical form (minimal parentheses, non-structural 2-morphisms outermost) is a key goal, especially for automation (e.g., future `coherence` tactic).
- **Functoriality Proofs**: For `precomp`, `postcomp`, etc., proofs verify functor axioms (`map_id`, `map_comp`) using whiskering lemmas.
- **Natural Isomorphism Proofs**: Use `NatIso.ofComponents` with component-wise isomorphisms (e.g., `α_ f g ·`), then verify naturality via `simp`.

---

#### **5. Imports & Dependencies**

- **Core**:
  - `Mathlib.CategoryTheory.NatIso`: For natural isomorphisms (`NatIso.ofComponents`, `Iso` machinery).
- **Implicit Dependencies** (via `CategoryTheory.CategoryStruct`, `CategoryTheory.Category`):
  - `Mathlib.CategoryTheory.Category.Basic`
  - `Mathlib.CategoryTheory.Functor`
  - `Mathlib.CategoryTheory.NaturalTransformation`
  - `Mathlib.CategoryTheory.Iso`
  - `Mathlib.CategoryTheory.Preadditive` (indirectly via `IsIso`, `Mono`, `Epi`)
- **Universe Management**:
  - Explicit universe variables `w v u` for 2-morphisms, 1-morphisms, objects.
  - `CategoryStruct.{v} B` ensures hom-sets live in universe `v`.

---

### Summary

This formalization provides a **fully axiomatic, coherence-aware definition of bicategories** in Lean 4, with:
- Explicit whiskering operations,
- Full coherence data (associator, unitors, pentagon/triangle),
- Robust infrastructure for manipulating 2-morphisms (including isomorphisms, naturality, simp-normal forms),
- Functorial encodings of pre-/post-composition and their coherence isomorphisms.

It is designed for **automation-friendly rewriting**, with many lemmas tagged `[simp]`, `[reassoc]`, and `@[simps]`, preparing the ground for future tactics like `coherence`.