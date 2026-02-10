Here is a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Rigid (Autonomous) Monoidal Categories in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ExactPairing X Y` | `Type u₁ → Type u₁ → Prop` | Defines a pairing between objects `X`, `Y` with coevaluation `η_ : 𝟙 → X ⊗ Y` and evaluation `ε_ : Y ⊗ X → 𝟙` satisfying two triangle identities. |
| `HasRightDual X` | `Type u₁ → Prop` | Class asserting existence of a right dual object `Xᘁ` with `ExactPairing X Xᘁ`. |
| `HasLeftDual Y` | `Type u₁ → Prop` | Class asserting existence of a left dual object `ᘁY` with `ExactPairing ᘁY Y`. |
| `rightAdjointMate f` | `f : X ⟶ Y ↦ fᘁ : Yᘁ ⟶ Xᘁ` | Constructs the right adjoint mate of `f` using co/evaluation and associators. |
| `leftAdjointMate f` | `f : X ⟶ Y ↦ ᘁf : ᘁY ⟶ ᘁX` | Constructs the left adjoint mate of `f`. |
| `tensorLeftHomEquiv X Y Y' Z` | `(Y' ⊗ X ⟶ Z) ≃ (X ⟶ Y ⊗ Z)` | Hom-set bijection induced by an exact pairing `Y ⊣ Y'`, i.e., Frobenius reciprocity. |
| `tensorLeftAdjunction Y Y'` | `tensorLeft Y' ⊣ tensorLeft Y` | Adjointness of left tensoring functors induced by exact pairing. |
| `closedOfHasLeftDual Y` | `Closed Y` | Shows that objects with left duals are closed (internal hom = left tensor by dual). |
| `comp_rightAdjointMate` | `(f ≫ g)ᘁ = gᘁ ≫ fᘁ` | Adjoint mates reverse composition — key property of duals. |
| `comp_leftAdjointMate` | `(ᘁf ≫ g) = (ᘁg) ≫ ᘁf` | Analogous property for left adjoint mates. |
| `rightDualIso p₁ p₂` | `Y₁ ≅ Y₂` | Uniqueness (up to iso) of right duals for fixed `X`. |
| `leftDualIso p₁ p₂` | `X₁ ≅ X₂` | Uniqueness (up to iso) of left duals for fixed `Y`. |
| `RightRigidCategory`, `LeftRigidCategory`, `RigidCategory` | Type classes | Assert that *every* object has a right/left/rigid dual. |

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `coevaluation'`, `evaluation'`: internal fields (prime notation for internal use).
  - `coevaluation`, `evaluation`: public accessors (non-prime).
  - `η_`, `ε_`: notations for coevaluation and evaluation.
  - `Xᘁ`, `ᘁX`: postfix/prefix notations for right/left dual objects.
  - `fᘁ`, `ᘁf`: notation for right/left adjoint mates.
  - `homEquiv`, `adjunction`, `closedOf…`: standard categorical constructions.
  - `congrLeft`, `congrRight`: transport of structure along isomorphisms.

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop_cat`: for category-theoretic simplification and coherence.
  - `monoidal_coherence`: solves monoidal diagrammatic equalities.
  - `simp`, `simp_rw`, `dsimp`: heavily used for rewriting definitions.
  - `rw`, `convert`, `congr`: for equality reasoning.
  - `apply_fun`: to push morphisms through equivalences.
  - `calc`: for multi-step equational reasoning.
  - `monoidal`: for simplifying tensor expressions and whiskering.
  - `rw [whisker_exchange, tensorHom_def]`: frequent for rearranging tensor whiskering.

#### **4. Proof Logic**

- **Inductive/structural style**:
  - Most proofs proceed by unfolding definitions (`dsimp`), then applying monoidal coherence or string-diagram-style equational reasoning.
  - Key technique: use `homEquiv` to reduce morphism equalities to simpler ones via naturality and triangle identities.
  - For `comp_rightAdjointMate`/`comp_leftAdjointMate`: expand both sides, apply `whisker_exchange`, then use `evaluation_coevaluation''` to collapse to identity.
  - Uniqueness of duals (`rightDualIso`, `leftDualIso`) uses `comp_rightAdjointMate`/`comp_leftAdjointMate` and identity preservation.

#### **5. Imports**

- `Mathlib.Tactic.CategoryTheory.Monoidal.Basic`: foundational monoidal category tactics.
- `Mathlib.CategoryTheory.Closed.Monoidal`: internal hom and closed structure.
- `Mathlib.Tactic.ApplyFun`: for applying functions to both sides of an equality.

---

### **Summary**

This file formalizes the theory of rigid (autonomous) monoidal categories in Lean 4, building on monoidal categories and closed structures. It introduces exact pairings, duals, adjoint mates, and demonstrates key properties like composition reversal and Frobenius reciprocity. The formalization is highly structured, with careful attention to notation (`η_`, `ε_`, `Xᘁ`, `ᘁf`) and coherence via monoidal tactics. It sets the stage for future work on pivotal structures, equivalences between `C` and `(Cᵒᵖ)ᴹᵒᵖ`, and simplifications in braided/symmetric settings.

--- 

Let me know if you'd like a diagrammatic summary or a dependency graph of definitions.