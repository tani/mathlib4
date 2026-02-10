### Technical Metadata Brief: Comonadicity Theorems in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `main_pair_coreflexive` | `IsCoreflexivePair (G.map A.a) (adj.unit.app (G.obj A.A))` | Shows the “main pair” for a coalgebra is coreflexive — used to construct comparison functor adjoints. |
| `main_pair_F_cosplit` | `F.IsCosplitPair (G.map A.a) (adj.unit.app (G.obj A.A))` | Shows the same pair is `F`-cosplit — key for Beck-type arguments. |
| `comparisonRightAdjointObj` | `C` (object) | Object part of the right adjoint to the comparison functor, defined via equalizer of the main pair. |
| `comparisonRightAdjointHomEquiv` | `(comparison adj).obj B ⟶ A ≃ B ⟶ comparisonRightAdjointObj A` | Hom-set bijection used to define the right adjoint to the comparison functor. |
| `rightAdjointComparison` | `adj.toComonad.Coalgebra ⥤ C` | Right adjoint to the comparison functor, constructed using the above equivalence. |
| `comparisonAdjunction` | `comparison adj ⊣ rightAdjointComparison adj` | The adjunction between comparison functor and its right adjoint. |
| `counitFork` | `Fork (F.map (G.map A.a)) (F.map (adj.unit.app _))` | Fork used to relate the counit of the comparison adjunction to Beck equalizers. |
| `unitFork` | `Fork (G.map (F.map (adj.unit.app B))) (adj.unit.app (G.obj (F.obj B)))` | Fork describing the unit of the comparison adjunction. |
| `counitLimitOfPreservesEqualizer` | `IsLimit (counitFork A)` | Shows the counit fork is a limit if `F` preserves the equalizer of the main pair. |
| `unitEqualizerOfCoreflectsEqualizer` | `IsLimit (unitFork B)` | Shows the unit fork is a limit if `F` coreflects the unit pair. |
| `comonadicOfHasPreservesReflectsFSplitEqualizers` | `ComonadicLeftAdjoint F` | First Beck-style comonadicity theorem: if `C` has, `F` preserves & reflects `F`-cosplit equalizers, then `F` is comonadic. |
| `createsFSplitEqualizersOfComonadic` | `CreatesLimit (parallelPair f g) F` | “Boring” direction: if `F` is comonadic, it creates `F`-cosplit equalizers. |
| `comonadicOfCreatesFSplitEqualizers` | `ComonadicLeftAdjoint F` | Converse of above: if `F` creates `F`-cosplit equalizers, it is comonadic (Beck’s theorem). |
| `comonadicOfHasPreservesFSplitEqualizersOfReflectsIsomorphisms` | `ComonadicLeftAdjoint F` | Alternate Beck version: if `F` reflects isos, preserves & `C` has `F`-cosplit equalizers, then `F` is comonadic. |
| `comonadicOfHasPreservesCoreflexiveEqualizersOfReflectsIsomorphisms` | `ComonadicLeftAdjoint F` | Coreflexive (crude) version: if `C` has coreflexive equalizers, `F` preserves them & reflects isos, then `F` is comonadic. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `main_pair_`: For properties of the canonical pair `(Gα, ηGA)` associated to a coalgebra.
  - `comparison_`: For constructions related to the comparison functor (e.g., `comparisonRightAdjointObj`, `comparisonAdjunction`).
  - `counit_`, `unit_`: For forks/constructions tied to the unit/counit of the comparison adjunction.
  - ` BeckComonadicity / CoreflexiveComonadicity`: Section-based grouping of theorems.

- **Suffixes**:
  - `_obj`, `_homEquiv`, `_fork`, `_limit`: Denote object, hom-equivalence, fork, or limit-related components.
  - `_of_`: Indicates conditions or assumptions (e.g., `comonadicOfHasPreservesReflectsFSplitEqualizers`).
  - `_aux`, `_f`: For auxiliary lemmas or component projections (e.g., `comparisonAdjunction_counit_f_aux`).

- **Class names**:
  - `HasEqualizerOfIsCosplitPair`, `PreservesLimitOfIsCosplitPair`, `ReflectsLimitOfIsCosplitPair`, `CreatesLimitOfIsCosplitPair`, `PreservesLimitOfIsCoreflexivePair`: Follow pattern `XOfY`, where `Y` is a structural property (e.g., `IsCosplitPair`) and `X` is a categorical property (e.g., existence, preservation).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Automated reasoning for simple goals (e.g., `left_inv`, `right_inv`). |
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `Adjunction.homEquiv_unit`, `equalizer.condition`). |
| `rw` | Rewriting using equations (especially naturality, triangle identities, functoriality). |
| `congr` / `congr'` | For proving equality of morphisms via universal properties (e.g., `equalizer.hom_ext`). |
| `apply` / `exact` | For applying lemmas or constructing terms (e.g., `isIso_of_reflects_iso`, `isLimit_of_hasEqualizer_of_preservesLimit`). |
| `change` | To rewrite goal into a more convenient form (e.g., unfolding `IsLimit.conePointUniqueUpToIso`). |
| `infer_instance` | For typeclass resolution (e.g., `HasEqualizer`, `PreservesLimit`). |
| `dsimp` | Simplifying definitional content (e.g., in `createsFSplitEqualizersOfComonadic`). |
| `all_goals` | Applied uniformly across subgoals (e.g., in `createsFSplitEqualizersOfComonadic`). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Construct an adjunction `comparison adj ⊣ R` (via hom-equivalence or `rightAdjointComparison`).
  - Prove this adjunction is an equivalence by showing:
    - Its **unit** is natural isomorphism (`unitEqualizerOfCoreflectsEqualizer` + `reflectsLimit_of_reflectsIsomorphisms`).
    - Its **counit** is natural isomorphism (`counitLimitOfPreservesEqualizer` + `isIso_of_reflects_iso` via `Comonad.forget`).
  - Use universal properties (equalizers, limits) and preservation/reflection assumptions to lift structure.

- **Inductive/Structural Reasoning**:
  - **Equalizer-based**: Most proofs reduce to showing certain forks are limits or that maps between them are iso.
  - **Case analysis on coalgebra structure**: The main pair `(Gα, ηGA)` is central; many lemmas are parameterized over `A : Coalgebra`.
  - **Leverage Beck equalizers**: `beckEqualizer A` is used to relate equalizers in `C` to those in `D`.

- **Key Lemmas**:
  - `comparisonAdjunction_counit_f`: Identifies the counit component as a lift through the Beck equalizer.
  - `comparisonAdjunction_unit_app`: Describes the unit in terms of a limit lift.
  - `isIso_of_reflects_iso`: Used repeatedly to deduce isomorphism from reflection.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Equalizers` | For `PreservesLimit` over equalizer diagrams. |
| `Mathlib.CategoryTheory.Limits.Shapes.Reflexive` | For `IsCoreflexivePair`, `HasCoreflexiveEqualizers`. |
| `Mathlib.CategoryTheory.Monad.Equalizer` | For Beck equalizers (`beckEqualizer`, `beckSplitEqualizer`). |
| `Mathlib.CategoryTheory.Monad.Limits` | For `ComonadicLeftAdjoint`, coalgebra category limits. |

- **Domain**: Higher category theory, specifically monadicity/descent theory for comonads.
- **Scope**: Dualizes `Mathlib.CategoryTheory.Monad.Monadicity` to the comonadic setting.
- **Universe levels**: `v₁ v₂ u₁ u₂` — handles hom-sets in possibly large categories.

--- 

Let me know if you'd like a diagrammatic summary or a proof sketch of a specific theorem.