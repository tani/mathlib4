### Technical Brief: Uniqueness of Adjoints in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `leftAdjointUniq` | `{F F' : C ⥤ D} {G : D ⥤ C} → (F ⊣ G) → (F' ⊣ G) → F ≅ F'` | Constructs a natural isomorphism between two left adjoints of the same functor `G`. |
| `rightAdjointUniq` | `{F : C ⥤ D} {G G' : D ⥤ C} → (F ⊣ G) → (F ⊣ G') → G ≅ G'` | Constructs a natural isomorphism between two right adjoints of the same functor `F`. |
| `homEquiv_leftAdjointUniq_hom_app` | `adj1.homEquiv _ _ ((leftAdjointUniq adj1 adj2).hom.app x) = adj2.unit.app x` | Relates the hom-adjunction isomorphism to the unit of the second adjunction. |
| `unit_leftAdjointUniq_hom` | `adj1.unit ≫ whiskerRight (leftAdjointUniq adj1 adj2).hom G = adj2.unit` | Naturality condition for units under the isomorphism of left adjoints. |
| `leftAdjointUniq_hom_counit` | `whiskerLeft G (leftAdjointUniq adj1 adj2).hom ≫ adj2.counit = adj1.counit` | Naturality condition for counits under the isomorphism of left adjoints. |
| `unit_rightAdjointUniq_hom` | `adj1.unit ≫ whiskerLeft F (rightAdjointUniq adj1 adj2).hom = adj2.unit` | Naturality condition for units under the isomorphism of right adjoints. |
| `rightAdjointUniq_hom_counit` | `whiskerRight (rightAdjointUniq adj1 adj2).hom F ≫ adj2.counit = adj1.counit` | Naturality condition for counits under the isomorphism of right adjoints. |
| `leftAdjointUniq_trans` | `(leftAdjointUniq adj1 adj2).hom ≫ (leftAdjointUniq adj2 adj3).hom = (leftAdjointUniq adj1 adj3).hom` | Transitivity of the natural isomorphisms between left adjoints. |
| `rightAdjointUniq_trans` | `(rightAdjointUniq adj1 adj2).hom ≫ (rightAdjointUniq adj2 adj3).hom = (rightAdjointUniq adj1 adj3).hom` | Transitivity of the natural isomorphisms between right adjoints. |
| `leftAdjointUniq_refl`, `rightAdjointUniq_refl` | `(leftAdjointUniq adj adj).hom = 𝟙 _`, `(rightAdjointUniq adj adj).hom = 𝟙 _` | Identity case: the isomorphism from an adjoint to itself is the identity. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `leftAdjointUniq_`, `rightAdjointUniq_`: denote lemmas about the uniqueness isomorphisms.
  - `homEquiv_`: relates hom-adjunction equivalences to components of the isomorphism.
  - `unit_`, `counit_`: relate units/counits to the isomorphism via whiskering.

- **Suffixes**:
  - `_app`: component-wise version of a natural transformation equation (applied at an object).
  - `_hom`: refers to the hom-component of the isomorphism (i.e., the forward map).
  - `_inv`: refers to the inverse component (though mostly implicit via `rfl`).
  - `_trans`: transitivity lemmas.
  - `_refl`: reflexivity lemmas.

- **Pattern**: `adj1` and `adj2` consistently denote the two adjunctions being compared.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`: heavily used, especially with `[reassoc (attr := simp)]` attributes.
  - `rw`: for rewriting using previously established equalities.
  - `ext`: extensionality for natural transformations (proving equality by evaluating at all objects).
  - `rfl`: for definitional equalities (e.g., `inv.app x = hom.app x` of the reversed adjunction).
  - `simp only [...]`: fine-grained simplification using explicit lists of lemmas.

- **Key lemmas used in simplification**:
  - `conjugateIsoEquiv_symm_apply_inv`, `conjugateEquiv_symm_apply_app`, etc.
  - `NatTrans.comp_app`, `whiskerLeft_app`, `Functor.map_comp`, `adj1.counit_naturality`, etc.

- **No heavy automation** (e.g., no `aesop`, `linarith`, `ring`), indicating this is a structured, manual proof relying on categorical identities.

---

#### **4. Proof Logic**

- **High-level strategy**:
  - Use the `conjugateIsoEquiv` (a.k.a. `natIsoEquiv`) to construct the isomorphism between adjoints.
    - For left adjoints: `((conjugateIsoEquiv adj1 adj2).symm (Iso.refl G)).symm`
    - For right adjoints: `conjugateIsoEquiv adj1 adj2 (Iso.refl _)`
  - Prove properties (e.g., unit/counit compatibility, transitivity) by:
    1. Extending to components (`ext x`).
    2. Rewriting using definitions (`rw [← ...]`).
    3. Applying naturality and functoriality.
    4. Simplifying with `simp` and known adjunction identities.

- **Inductive or case analysis?**  
  No induction or case analysis — purely equational reasoning in the 2-category of categories, functors, and natural transformations.

- **Key insight**: The uniqueness isomorphism is *canonical*, induced by the universal property encoded in the hom-equivalence.

---

#### **5. Imports & Dependencies**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Adjunction.Mates
  ```
  - Provides `conjugateEquiv`, `conjugateIsoEquiv`, and related machinery for constructing isomorphisms from adjunction data.

- **Context**:
  - Assumes `Category C`, `Category D`.
  - Uses `CategoryTheory` namespace and opens `homEquiv_unit`, `homEquiv_counit` as `simp` lemmas.

- **Related concepts**:
  - Adjunctions (`⊣`)
  - Natural isomorphisms (`≅`)
  - Units and counits (`unit`, `counit`)
  - Whiskering (`whiskerLeft`, `whiskerRight`)
  - Hom-equivalences (`homEquiv`)

---

#### **6. Deprecations**

- `natTransEquiv` and `natIsoEquiv` are deprecated in favor of `conjugateEquiv` and `conjugateIsoEquiv` (since 2024-10-07), indicating a refactoring toward more precise naming.

---

This file formalizes a foundational result in category theory: **adjoints are unique up to unique natural isomorphism**, with careful attention to coherence (units, counits, naturality). The proofs are explicit and rely on the internal structure of adjunctions, not abstract higher-categorical reasoning.