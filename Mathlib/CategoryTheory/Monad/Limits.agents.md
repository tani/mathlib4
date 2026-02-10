### Technical Brief: Limits and Colimits in (Co)algebra Categories

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `γ` (for monads) | Natural transformation `D ⋙ T.forget ⋙ T ⟶ D ⋙ T.forget`, defined by algebra structure maps `a : T A → A`. Used to construct new cones/cocones. |
| `newCone` (monad) | Cone over `D ⋙ forget T` with apex `T.obj c.pt`, built using `c.π`, `γ`, and `Functor.constComp`. |
| `conePoint` (monad) | Eilenberg–Moore algebra structure on `c.pt`, with structure map `t.lift (newCone D c)`. Proves algebra laws via `t.lift` uniqueness. |
| `liftedCone` (monad) | Cone in `Algebra T` lifting a cone in `C`, with morphisms as underlying maps `c.π.app j`. |
| `liftedConeIsLimit` (monad) | Shows `liftedCone` is limiting: uses `t.lift` and algebra hom condition `h`. |
| `forgetCreatesLimits` | Instance: `CreatesLimitsOfSize (forget T)`. Proves forgetful functor creates all limits. |
| `hasLimit_of_comp_forget_hasLimit` | If `D ⋙ forget T` has a limit, then `D` has a limit. |
| `γ` (colimit case, monad) | Natural transformation `(D ⋙ forget T) ⋙ T ⟶ D ⋙ forget T`, again via algebra maps. |
| `newCocone` (monad colimit) | Cocone for `(D ⋙ forget T) ⋙ T`, via `γ ≫ c.ι`. |
| `lambda` (monad colimit) | Structure map `T L → L` for colimit algebra, constructed using colimit universality and preservation assumptions. |
| `coconePoint` (monad colimit) | Algebra on colimit carrier `c.pt`, with structure `lambda`. Algebra laws follow from `commuting` and image algebra laws. |
| `liftedCocone` / `liftedCoconeIsColimit` (monad) | Lifted cocone and proof it’s colimiting in `Algebra T`. |
| `forgetCreatesColimit` | Instance: `CreatesColimit D (forget T)` when `T` preserves relevant colimits. |
| `monadicCreatesLimits` | Any monadic functor creates limits (via `comparisonForget` iso). |
| `monadicCreatesColimitOfPreservesColimit` | Monadic functor creates colimits if it preserves them (uses `comparisonForget` iso + `forgetCreatesColimit`). |
| `leftAdjoint_preservesTerminal_of_reflective` | Reflector preserves terminal objects (only limit preserved in general). |
| `γ` (comonad duals) | Natural transformation `D ⋙ T.forget ⟶ D ⋙ T.forget ⋙ T`, via coalgebra structure `a : A → T A`. |
| `coconePoint` (comonad) | Coalgebra structure on colimit carrier, via `t.desc (newCocone)`. |
| `liftedCoconeIsColimit` (comonad) | Dual to monad case: proves colimiting property. |
| `forgetCreatesColimit` (comonad) | Instance: `CreatesColimitsOfSize (forget T)` — forgetful functor creates all colimits. |
| `comonadicCreatesColimits` | Any comonadic functor creates colimits. |
| `comonadicCreatesLimitOfPreservesLimit` | Comonadic functor creates limits if it preserves them. |
| `hasColimitsOfShape_of_coreflective`, `hasLimitsOfShape_of_coreflective` | Coreflective subcategories inherit (co)limits from ambient category. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lifted_`: Cone/cocone lifted to algebra/coalgebra category.
  - `new_`: Intermediate cone/cocone used to define algebra/coalgebra structure.
  - `γ`: Natural transformation encoding (co)algebra structure maps.
  - `lambda` / `λ`: Structure map for (co)algebra on (co)limit carrier.
  - `commuting`: Key property of `λ`/`λ'` (e.g., `λ ≫ T f = f ≫ a`).
- **Suffixes**:
  - `IsLimit` / `IsColimit`: Proof of (co)limit universality.
  - `CreatesLimitsOfShape` / `CreatesColimitsOfSize`: Instance naming for creation properties.
- **General**:
  - `forget`: Refers to `forget T : Algebra T → C` or `Coalgebra T → C`.
  - `comparison`: Refers to comparison functor `D → C^T` or `C_T → D`.
  - `monadic` / `comonadic`: Relates to monadic/comonadic adjunctions.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `dsimp`: Extensive use for rewriting naturality, algebra laws, and simplifying compositions.
  - `ext1`, `ext`: Extensionality for morphisms and natural transformations.
  - `apply`, `exact`: For applying lemmas and constructing morphisms.
  - `funext`: Occasionally used for natural transformation equality.
- **Category-theoretic helpers**:
  - `erw`: Rewriting with definitional equality (e.g., for `comp_id`, `id_comp`).
  - `convert`: Implicitly used via `hom_ext` and `congr_arg`.
  - `infer_instance`: For filling in typeclass instances.
  - `dsimp; simp`: Common pattern for simplifying definitions (see library note).
- **Limit/colimit machinery**:
  - `t.fac`, `t.lift`, `t.desc`: Use of (co)limit universality.
  - `isColimitOfPreserves`, `isLimitOfPreserves`: Construct (co)limits under preservation assumptions.
  - `Functor.map_comp`, `Functor.mapCocone_ι_app`, `NatTrans.naturality`: Standard functoriality lemmas.

---

#### **4. Proof Logic**

- **General pattern for limits (monads)**:
  1. Given cone `c` over `D ⋙ forget T`, construct `newCone` over `D ⋙ forget T ⋙ T`.
  2. Use `t : IsLimit c` to define algebra structure `a := t.lift (newCone)`.
  3. Prove algebra laws using naturality of `η`, `μ`, and image algebra laws.
  4. Lift cone to `Algebra T`, then show it’s limiting via `t.lift` and `h` condition.

- **General pattern for colimits (monads)**:
  1. Assume `T` preserves colimits of shape `J`.
  2. Given colimit `c` of `D ⋙ forget T`, construct `newCocone` over `(D ⋙ forget T) ⋙ T`.
  3. Use preservation to get `λ : T L → L`.
  4. Verify algebra laws using `commuting` lemma and image algebra laws.
  5. Lift cocone and prove colimiting via `t.desc` and `h`.

- **Monadic/comonadic generalization**:
  - Use natural isomorphism `comparisonForget : (F ⋙ R) ≅ (F ⋙ comparison) ⋙ forget`.
  - Transfer (co)limit creation from `forget` to `R` via `createsLimitsOfNatIso` / `createsColimitsOfNatIso`.

- **Reflective/coreflective subcategories**:
  - Limits: Use `monadicCreatesLimits` + `hasLimit_of_created`.
  - Colimits: Use `comonadicCreatesColimits` + `hasColimit_of_created`.
  - Terminal objects: Special case via `leftAdjoint_preservesTerminal_of_reflective`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Monad.Adjunction` | Monadic adjunctions, comparison functors, monadicity criteria. |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Preservation/creation of (co)limits by adjoints. |
| `Mathlib.CategoryTheory.Limits.Shapes.IsTerminal` | Terminal objects and related lemmas (e.g., preservation by reflectors). |

---

### Summary

This file establishes foundational results about (co)limit creation by forgetful functors from Eilenberg–Moore (co)algebras, and generalizes to monadic/comonadic functors. Key ideas:
- **Monads**: Forgetful functor creates *all* limits; creates colimits iff monad preserves them.
- **Comonads**: Forgetful functor creates *all* colimits; creates limits iff comonad preserves them.
- **Monadicity/Comonadicity**: Any monadic (resp. comonadic) functor inherits (co)limit creation from the forgetful functor, via natural isomorphism.
- **Reflectivity/Coreflectivity**: Reflective subcategories inherit limits; coreflective subcategories inherit colimits.

The proofs rely heavily on the interplay between (co)limit universality, preservation assumptions, and the algebra/coalgebra structure maps encoded in `γ`.