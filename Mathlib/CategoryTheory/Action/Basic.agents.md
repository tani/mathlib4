### Technical Metadata Brief: `Action V G` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Action V G` | `structure` | Bundled action of monoid `G` on an object `V : V`, via a monoid hom `ρ : G ⟶ End V`. |
| `Hom M N` | `structure` | Morphism between actions: a morphism `h : M.V ⟶ N.V` commuting with the `G`-action. |
| `Category (Action V G)` | `instance` | Defines the category of `G`-actions in `V`, with `Hom`s as above. |
| `ρAut` | `def` | Lifts a group action to automorphisms: `G ⟶ Aut(V)`. |
| `functor` | `def` | From `Action V G` to `SingleObj G ⥤ V`, sending an action to the corresponding functor. |
| `inverse` | `def` | From `SingleObj G ⥤ V` to `Action V G`, reconstructing an action from a functor. |
| `functorCategoryEquivalence` | `def` | Equivalence `Action V G ≌ SingleObj G ⥤ V`. |
| `forget` | `def` | Forgetful functor `Action V G ⥤ V`, sending `(V, ρ)` to `V`. |
| `res f` | `def` | Restriction along monoid hom `f : G ⟶ H`: `Action V H ⥤ Action V G`. |
| `resId`, `resComp` | `def` | Natural isomorphisms expressing functoriality of `res`. |
| `actionPunitEquivalence` | `def` | Equivalence `Action V (MonCat.of PUnit) ≌ V`. |
| `mapAction F G` | `def` | Induced functor `Action V G ⥤ Action W G` from `F : V ⥤ W`. |

**Theorems / Instances (selected):**
- `ρ_one`: `ρ 1 = 𝟙`.
- `hom_ext`: Extensionality for `Hom`s.
- `isIso_of_hom_isIso`: If underlying map is iso, then so is the action morphism.
- `preservesLimits_forget`, `preservesColimits_forget`: Forgetful functor preserves (co)limits.
- `Iso.conj_ρ`: Conjugation formula for isos in `Action V G`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `ρ_`: related to the action homomorphism (e.g., `ρ_one`, `ρAut`).
  - `res_`: restriction functors (`res`, `resId`, `resComp`).
  - `functor_`, `inverse_`, `unitIso`, `counitIso`: parts of equivalence construction.
  - `forget_`: forgetful constructions (`forget`, `hasForgetToV`, `functorCategoryEquivalenceCompEvaluation`).
  - `mapAction`: induced action functor from a base functor.

- **Suffixes:**
  - `_hom`: underlying morphism in `V` (e.g., `id_hom`, `comp_hom`, `hom_inv_hom`).
  - `_ext`: extensionality lemmas (`hom_ext`).
  - `_def`: definitional equalities (e.g., `functorCategoryEquivalence.functor_def` — now redundant due to `@[simps]`).

- **Other patterns:**
  - `mkIso`: constructor for isos in `Action V G` from iso in `V`.
  - `trivial`: trivial action (on terminal object).
  - `inhabited'`, `inhabited`: instances for inhabitedness.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs and `simp`-friendly definitions:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Used in `comm` field of `Hom` and `mkIso` to discharge naturality/commutativity goals automatically. |
| `simp` / `simp only` | Extensively used for simplification, especially with `@[simps]` and `@[simps!]`. |
| `rw`, `trans`, `refl` | Basic rewriting and equality chaining. |
| `ext` | Extensionality for morphisms (e.g., `hom_ext`, `Aut.ext`). |
| `dsimp` | Used in `mapAction` to simplify definitions before rewriting. |
| `have`, `have w := ...; simp at w` | Intermediate reasoning (e.g., in `ρAut`). |
| `exact`, ` rfl` | For trivial proofs. |

---

#### **4. Proof Logic & Strategy**

- **Equivalence proofs (`functorCategoryEquivalence`, `actionPunitEquivalence`)**:
  - Construct functors `functor` and `inverse`.
  - Build unit/counit natural isos via `NatIso.ofComponents` and `Iso.refl`.
  - Use `@[simps!]` to ensure definitional behavior on components.

- **Morphism extensionality (`hom_ext`)**:
  - Reduce to equality of underlying morphisms in `V`.

- **Isomorphism lifting**:
  - Use `mkIso` to lift iso in `V` to iso in `Action V G`, provided naturality condition holds.
  - Prove `IsIso` instances via `mkIso ... .isIso_hom`.

- **Forgetful functor properties**:
  - Show `forget ≅ evaluation ⋙ functor`, then lift (co)limit preservation via `preservesLimits_of_natIso`.

- **Group actions → automorphisms (`ρAut`)**:
  - Define inverse using inversion in group.
  - Prove hom/inv identities using `map_mul`, `map_one`, and group axioms.

- **Inductive/structural reasoning**:
  - Mostly *definition-driven*; proofs are mostly `simp` + `ext` + `aesop_cat`.
  - No heavy induction — structure is categorical and definitional.

---

#### **5. Imports & Scope**

**Primary Dependencies:**
- `Mathlib.Algebra.Category.Grp.Basic`: Group and monoid category basics.
- `Mathlib.CategoryTheory.SingleObj`: Construction of `SingleObj G`.
- `Mathlib.CategoryTheory.Limits.FunctorCategory.Basic`: Functor categories, evaluation.
- `Mathlib.CategoryTheory.Limits.Preserves.Basic`: (Co)limit preservation.
- `Mathlib.CategoryTheory.Adjunction.Limits`: Tools for limit/colimit preservation via natural isos.
- `Mathlib.CategoryTheory.Conj`: Conjugation of morphisms by isos.

**Scope:**
- Works in a *large* ambient category `V : Type (u + 1)` with `LargeCategory V`.
- Designed for `V = ModuleCat R` (representations), `V = Type` (set-theoretic actions), or any concrete category.
- Supports both monoid and group actions (via `MonCat.of G` and `Grp`).

---

### Summary

This file formalizes the **category of actions** of a monoid/group in a category `V`, establishing:
- A concrete categorical structure (`Action V G`).
- An equivalence with functor categories (`SingleObj G ⥤ V`).
- A forgetful functor with (co)limit preservation.
- Restriction functors along monoid homomorphisms.
- Induced functors from base-category functors.

It exemplifies *structured categorical reasoning* in Lean 4, with heavy use of `@[simps]`, `aesop_cat`, and naturality-based isomorphisms.