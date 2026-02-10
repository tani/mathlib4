### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exactPairingOfFaithful` | `{X Y : C} → (eval : Y ⊗ X ⟶ 𝟙_ C) → (coeval : 𝟙_ C ⟶ X ⊗ Y) → [ExactPairing (F.obj X) (F.obj Y)] → (map_eval : F.map eval = …) → (map_coeval : F.map coeval = …) → ExactPairing X Y` | Constructs an exact pairing in `C` from one in `D`, assuming `F` is faithful and preserves the required structure (via `map_eval`, `map_coeval`). Uses injectivity of `F` to lift equations. |
| `exactPairingOfFullyFaithful` | `[F.Full] → [F.Faithful] → (X Y : C) → [ExactPairing (F.obj X) (F.obj Y)] → ExactPairing X Y` | Lifts exact pairings along fully faithful monoidal functors using preimages of eval/coeval under `F`. |
| `hasLeftDualOfEquivalence` | `[F.IsEquivalence] → (X : C) → [HasLeftDual (F.obj X)] → HasLeftDual X` | Pulls back a left dual along an equivalence of monoidal categories. Uses `exactPairingOfFullyFaithful` after transporting the exact pairing via the unit/counit isomorphism. |
| `hasRightDualOfEquivalence` | `[F.IsEquivalence] → (X : C) → [HasRightDual (F.obj X)] → HasRightDual X` | Dual of above for right duals. |
| `leftRigidCategoryOfEquivalence` | `[LeftRigidCategory D] → LeftRigidCategory C` | Constructs a left rigid structure on `C` from one on `D` via equivalence. |
| `rightRigidCategoryOfEquivalence` | `[RightRigidCategory D] → RightRigidCategory C` | Constructs a right rigid structure on `C` from one on `D`. |
| `rigidCategoryOfEquivalence` | `[RigidCategory D] → RigidCategory C` | Constructs a rigid structure on `C` from one on `D`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `exactPairingOf*`: Constructs exact pairings under various assumptions (`Faithful`, `FullyFaithful`).
  - `has*DualOfEquivalence`: Pulls back duals along equivalences.
  - `*RigidCategoryOfEquivalence`: Lifts rigid structures along equivalences.

- **Suffixes**:
  - `OfFaithful`, `OfFullyFaithful`, `OfEquivalence`: Indicate the categorical property of the functor used in the construction.

- **Variables**:
  - `eval`, `coeval`: Standard notation for evaluation and coevaluation maps in dualities.
  - `F`, `G`: Functors; `F : C ⥤ D`, `G : D ⥤ C`.
  - `adj : F ⊣ G`: Adjoint equivalence data.
  - `X`, `Y`: Objects in `C`.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simp`: Used repeatedly to simplify expressions involving monoidal structure maps (`δ`, `η`, `μ`, `ε`, etc.).
  - `apply`: To apply lemmas like `exactPairingOfFullyFaithful`.
  - `letI`: To introduce instances (e.g., `exactPairingCongrLeft`, `exactPairingCongrRight`).
  - `by`: For inline tactic blocks.

- **Key lemmas used in `simp`**:
  - `Functor.Monoidal.map_whiskerLeft`, `Functor.Monoidal.map_whiskerRight`
  - `F.map_injective`, `F.map_surjective` (via `F.Full`, `F.Faithful`)
  - `F.preimage` for fully faithful functors.

#### 4. **Proof Logic**

- **General pattern**:
  1. Use faithfulness/full-faithfulness to reduce verification of duality axioms (zig-zag equations) to checking them after applying `F`.
  2. For `exactPairingOfFaithful`, verify the zig-zag equations in `D` (already assumed), then use `F.map_injective` to lift to `C`.
  3. For `exactPairingOfFullyFaithful`, construct candidate eval/coeval in `C` as preimages under `F`, then apply `exactPairingOfFaithful`.
  4. For equivalences, use the unit/counit isomorphisms to transport exact pairings across the equivalence, then apply the fully faithful case.

- **Inductive/structural reasoning**:
  - No explicit induction; relies on categorical properties (e.g., `IsEquivalence` implies fully faithful + essentially surjective, but only fully faithfulness is used here).
  - Uses `exactPairingCongrLeft`/`exactPairingCongrRight` to adjust exact pairings along isomorphisms.

#### 5. **Imports**

- **Primary dependency**:
  - `Mathlib.CategoryTheory.Monoidal.Rigid.Basic`: Provides foundational definitions like `ExactPairing`, `HasLeftDual`, `LeftRigidCategory`, etc.

- **Implicit dependencies**:
  - `CategoryTheory.Monoidal.Functor`: For `F.Monoidal`, `δ`, `η`, `μ`, `ε`, etc.
  - `CategoryTheory.Equivalence`: For `IsEquivalence`, `unitIso`, `counitIso`, etc.
  - `CategoryTheory.Functor.LaxMonoidal`, `Functor.OplaxMonoidal`: For monoidal structure on functors.

---

This module formalizes the *transport of rigid structures along monoidal equivalences*, a key result in higher categorical and representation-theoretic contexts (e.g., in the theory of tensor categories). It demonstrates how Lean’s typeclass inference and category-theoretic abstractions enable concise, high-level proofs.