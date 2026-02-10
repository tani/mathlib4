### Technical Brief: Subcanonical Grothendieck Topologies — Yoneda Embedding into Sheaf Categories

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `yonedaEquiv` | `{X : C} → {F : Sheaf J (Type v)} → (J.yoneda.obj X ⟶ F) ≃ F.val.obj (op X)` | Establishes an equivalence between natural transformations from the Yoneda embedding (into sheaves) and elements of the underlying presheaf at `op X`. Central to Yoneda lemma for sheaves. |
| `yonedaEquiv_apply` | `f : J.yoneda.obj X ⟶ F` ↦ `f.val.app (op X) (𝟙 X)` | Describes how `yonedaEquiv` acts on morphisms. |
| `yonedaEquiv_symm_app_apply` | `x : F.val.obj (op X)` ↦ `(J.yonedaEquiv.symm x).val.app Y f = F.val.map f.op x` | Describes the action of the inverse equivalence on components. |
| `yonedaEquiv_naturality` | `F.val.map g.op (J.yonedaEquiv f) = J.yonedaEquiv (J.yoneda.map g ≫ f)` | Naturality of `yonedaEquiv` w.r.t. morphisms in `C`. |
| `yonedaEquiv_naturality'` | Generalized version over `Cᵒᵖ`. | More flexible naturality statement; avoids motive errors in some cases. |
| `yonedaEquiv_comp` | `J.yonedaEquiv (α ≫ β) = β.val.app _ (J.yonedaEquiv α)` | Compatibility of `yonedaEquiv` with composition of sheaf morphisms. |
| `yonedaEquiv_yoneda_map` | `J.yonedaEquiv (J.yoneda.map f) = f` | Evaluates `yonedaEquiv` on Yoneda image of a morphism. |
| `yonedaEquiv_symm_naturality_left/right` | Naturality of `yonedaEquiv.symm` w.r.t. pre- and post-composition. | Used to manipulate expressions involving `yonedaEquiv.symm`. |
| `map_yonedaEquiv / map_yonedaEquiv'` | `F.val.map g.op (J.yonedaEquiv f) = f.val.app (op Y) g` | Relates action of sheaf morphism on elements to component-wise application. |
| `yonedaEquiv_symm_map` | `J.yonedaEquiv.symm (F.val.map f t) = J.yoneda.map f.unop ≫ J.yonedaEquiv.symm t` | Interchange law between sheaf map and `yonedaEquiv.symm`. |
| `hom_ext_yoneda` | `(∀ X p, p ≫ f = p ≫ g) ⇒ f = g` | Extensionality principle: morphisms of sheaves are determined by their action on Yoneda generators. |
| `yonedaULift` | `C ⥤ Sheaf J (Type (max v v'))` | Yoneda embedding into sheaves with values in a universe-lifted type. |
| `yonedaULiftEquiv` | Analog of `yonedaEquiv` for `yonedaULift`. | Extends Yoneda equivalence to lifted universe setting. |
| `yonedaULiftEquiv_apply`, `yonedaULiftEquiv_symm_app_apply`, etc. | Analogues of above lemmas for `yonedaULift`. | API for working with `yonedaULift`. |
| `hom_ext_yonedaULift` | Extensionality for `yonedaULift`. | Ensures morphism equality from agreement on all `yonedaULift`-generators. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `yonedaEquiv_` / `yonedaULiftEquiv_`: API for the Yoneda equivalence (standard / lifted).
  - `map_`: Lemmas about how sheaf morphisms act on elements via the equivalence.
  - `naturality`: Naturality statements (often with variants `naturality'` for generality).
  - `symm_`: Properties of the inverse equivalence.
  - `hom_ext_`: Hom-extensionality lemmas.

- **Suffixes**:
  - `_apply`: Action of equivalence on morphisms.
  - `_symm_app_apply`: Action of inverse on components.
  - `_naturality[_']`: Naturality (standard / general).
  - `_comp`: Behavior under composition.
  - `_map`: Interaction with sheaf morphism maps.
  - `_ULift`: Variants for universe-lifted Yoneda.

- **Notable patterns**:
  - `op`, `unop`, `⟨·⟩`: Used to switch between `C` and `Cᵒᵖ`, and to inject into lifted types.
  - `𝟙 X`, `⟨f⟩`: Identity and lifted morphisms.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`, `simp`, `rw`, `ext`, `apply`, `obtain ⟨u, rfl⟩`, `congr_arg`
- **Simplification & rewriting**:
  - `simp only [...] using ...`: For precise control over simplification.
  - `rw [...]`: Especially for unfolding definitions like `yonedaEquiv`, `yonedaEquiv_apply`, etc.
- **Category-theoretic automation**:
  - `change ...`: To align goal with known lemmas.
  - `obtain ⟨u, rfl⟩ := ...`: Surjectivity of equivalence used to reduce to image case.
- **Hom-extensionality**:
  - `ext X x`: Extend equality of sheaf morphisms to elements.
  - `simpa [...] using ...`: Final simplification after applying extensionality.

No heavy automation (e.g., `aesop`, `ring`, `linarith`) is used — proofs are mostly structural and rely on definitional equalities and naturality.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-step pattern**:
    1. Reduce to a simpler form using `simp` or `rw` with definitions (`yonedaEquiv`, `yonedaEquiv_apply`, etc.).
    2. Use naturality or extensionality lemmas to conclude.
  - **Surjectivity + congruence**: For lemmas like `yonedaEquiv_symm_map`, use `obtain ⟨u, rfl⟩` to lift to a representative, then apply naturality and simplify.
  - **Extensionality proofs** (`hom_ext_*`):
    - Extend to elements (`ext X x`)
    - Use `congr_arg (J.yonedaEquiv)` and hypothesis to reduce to `p ≫ f = p ≫ g`
    - Simplify using `yonedaEquiv_comp`, `Equiv.apply_symm_apply`.

- **Induction**: Not used — all arguments are categorical and definitional.

- **Universe management**: Explicit universe parameters (`v'`, `v`, `u`, `max v v'`) handled via `uliftFunctor`, `Sheaf J (Type ...)`, and `yonedaULift`.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Limits.Preserves.Ulift`: For universe lifting functors.
  - `Mathlib.CategoryTheory.Sites.Canonical`: For canonical Grothendieck topology and sheaf theory.
  - `Mathlib.CategoryTheory.Sites.Whiskering`: For whiskering and composition of natural transformations.

- **Scope**:
  - Focuses on **subcanonical Grothendieck topologies** (`[Subcanonical J]`).
  - Develops the **Yoneda embedding into sheaves**, including:
    - Equivalence with elements of sheaves (`yonedaEquiv`)
    - Naturality, composition, extensionality
    - Universe-lifted variant (`yonedaULift`, `yonedaULiftEquiv`)
  - Designed for use in sheaf theory, descent, and topos theory.

---

### Summary

This file formalizes the **Yoneda lemma for sheaves over a subcanonical site**, providing a robust API for the equivalence between sheaf morphisms from the Yoneda embedding and elements of the sheaf. It includes both standard and universe-lifted versions, with careful attention to naturality, extensionality, and definitional behavior. The naming and structure follow Lean/CategoryTheory conventions, prioritizing clarity and reusability in formalized category theory.