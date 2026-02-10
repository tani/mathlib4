### Technical Brief: Induced Monoidal Structure on `Action V G`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `instMonoidalCategory` | Instance: `MonoidalCategory (Action V G)` when `V` is monoidal. Constructed via `Monoidal.transport` along the equivalence `Action.functorCategoryEquivalence`. |
| `tensorUnit_ρ`, `tensor_ρ` | Simplification lemmas for the action of `G` on tensor unit and tensor product in `Action V G`. |
| `tensorUnitIso` | Isomorphism `𝟙_ (Action V G) ≅ Action.mk X 1` when `X ≅ 𝟙_ V`. |
| `Action.forget` | Forgetful functor `Action V G ⥤ V`, made monoidal (lax, oplax, etc.) via `Functor.CoreMonoidal.toMonoidal`. |
| `braidedCategoryOfFaithful`, `symmetricCategoryOfFaithful` | Used to lift braided/symmetric structure from `V` to `Action V G` via the faithful forgetful functor. |
| `rightDual_v`, `leftDual_v`, `rightDual_ρ`, `leftDual_ρ` | Description of duals in `Action V G`: duals are computed objectwise in `V`, with action twisted by inversion in `G`. |
| `leftRegularTensorIso` | Isomorphism `leftRegular G ⊗ X ≅ leftRegular G ⊗ Action.mk X.V 1` for `X : Action (Type u) (MonCat.of G)`, given by `(g, x) ↦ (g, g⁻¹ • x)`. |
| `diagonalSucc` | Natural isomorphism `diagonal G (n + 1) ≅ leftRegular G ⊗ diagonal G n`, used in inductive constructions over `G`. |
| `mapAction` | Induced functor `F.mapAction G : Action V G ⥤ Action W G` for `F : V ⥤ W`. |
| `mapAction_ε_hom`, `mapAction_μ_hom`, etc. | Simplification lemmas for structure maps of induced monoidal functors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `tensor_ρ`, `tensorUnit_ρ`: denote action of `G` on tensor product/unit.
  - `leftRegular`, `diagonal`: standard group-action constructions.
  - `mapAction`: induced action along a functor.
  - `rightDual_ρ`, `leftDual_ρ`: duals in the action category.

- **Suffixes**:
  - `_ρ`: action morphism (i.e., the structure map `X.ρ : G → End(X.V)`).
  - `_hom`: hom-component of a natural transformation or iso.
  - `_iso`: isomorphism (e.g., `tensorUnitIso`, `leftRegularTensorIso`).

- **Other patterns**:
  - `ofEquivalence`, `ofFaithful`: lifting categorical structure along equivalences or faithful functors.
  - `transport`: transport of monoidal structure along equivalence.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Proving definitional equalities (e.g., `ρ` maps, hom-components). |
| `simp` / `simp_rw` | Simplifying using `@[simp]` lemmas (e.g., `tensor_ρ`, `leftRegular_ρ_apply`). |
| `aesop_cat` | Automated category-theoretic reasoning (e.g., verifying naturality or triangle identities). |
| `ext` + `funext` | Extensionality for morphisms and functions (especially in `Action` where morphisms are functions with commutativity conditions). |
| `erw` | Rewriting with definitional equality when `rw` fails (e.g., after Lean 4.4.0 PR #2644). |
| `dsimp` | Simplifying definitional content before rewriting. |
| `change` | Adjusting goal to match a known lemma. |

---

#### **4. Proof Logic**

- **Structure lifting**: Most instances (monoidal, braided, symmetric, rigid) are constructed via:
  - Transport along an equivalence (`Monoidal.transport`, `rightRigidCategoryOfEquivalence`, etc.).
  - Faithful functor reflection (`braidedCategoryOfFaithful`, `symmetricCategoryOfFaithful`).
- **Component-wise verification**: For lemmas like `rightDual_ρ`, proofs reduce to verifying component-wise behavior in `V`, often using:
  - `X.ρ.map_mul`, `X.ρ.map_inv`, `inv_mul_cancel`, etc.
- **Functorial induction**: For `mapAction`, structure maps are defined componentwise from those of `F`, and naturality/unitality follow from corresponding properties in `V`.
- **Explicit iso verification**: For concrete isomorphisms (`leftRegularTensorIso`, `diagonalSucc`), proofs involve:
  - Defining hom/inv components,
  - Checking equivariance (`comm` field),
  - Verifying `hom_inv_id`/`inv_hom_id` via extensionality and group axioms.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Monoidal.*`: core monoidal category theory (linear, rigid, braided, symmetric).
- `Mathlib.CategoryTheory.Action.*`: concrete and limit-based treatment of group actions in categories.
- `Mathlib.CategoryTheory.Transport`: for monoidal structure transport.

**Scope**:
- This file formalizes how monoidal, braided, symmetric, and rigid structures on `V` induce corresponding structures on the category of `G`-actions `Action V G`, for `G` a monoid/group object in `MonCat`.
- It also describes how monoidal functors `V ⥤ W` induce monoidal functors `Action V G ⥤ Action W G`.

---

Let me know if you'd like a diagrammatic summary or a formalized summary in Lean syntax.