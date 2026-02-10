Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Lifting Properties and Adjunctions in Category Theory**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CommSq.right_adjoint` | `CommSq u (G.map i) p v → G ⊣ F → CommSq (adj.homEquiv _ _ u) i (F.map p) (adj.homEquiv _ _ v)` | Constructs the *adjoint square* of a square with left leg `G.map i`, using the hom-equivalence of the adjunction `G ⊣ F`. |
| `CommSq.rightAdjointLiftStructEquiv` | `sq.LiftStruct ≃ (sq.right_adjoint adj).LiftStruct` | Shows a bijection between liftings of a square and its right-adjoint square. |
| `CommSq.right_adjoint_hasLift_iff` | `HasLift (sq.right_adjoint adj) ↔ HasLift sq` | Equivalence of having a lift in a square and its right-adjoint square. |
| `CommSq.left_adjoint` | `CommSq u i (F.map p) v → G ⊣ F → CommSq ((adj.homEquiv _ _).symm u) (G.map i) p ((adj.homEquiv _ _).symm v)` | Constructs the *adjoint square* of a square with right leg `F.map p`. |
| `CommSq.leftAdjointLiftStructEquiv` | `sq.LiftStruct ≃ (sq.left_adjoint adj).LiftStruct` | Bijection between liftings of a square and its left-adjoint square. |
| `CommSq.left_adjoint_hasLift_iff` | `HasLift (sq.left_adjoint adj) ↔ HasLift sq` | Equivalence of having a lift in a square and its left-adjoint square. |
| `Adjunction.hasLiftingProperty_iff` | `HasLiftingProperty (G.map i) p ↔ HasLiftingProperty i (F.map p)` | Main theorem: a morphism `G.map i` has the left lifting property w.r.t. `p` iff `i` has it w.r.t. `F.map p`, under `G ⊣ F`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `right_adjoint`, `left_adjoint`: denote constructions of adjoint squares.
  - `rightAdjointLiftStructEquiv`, `leftAdjointLiftStructEquiv`: denote equivalences of lifting structures.
- **Suffixes**:
  - `_iff`: used for biconditional statements (`↔`).
  - `_Equiv`: used for equivalences (bijective constructions).
- **Structure names**:
  - `LiftStruct`: type of liftings for a given square.
  - `CommSq`: type of commutative squares.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp only [...]`: heavily used to simplify using hom-equivalence and naturality laws.
  - `rw [...]`: rewrites using naturality, unit/counit, and adjunction laws.
  - `aesop_cat`: used for category-theoretic automation (e.g., proving inverses in equivalences).
  - `infer_instance`: used to propagate `HasLift` instances via equivalences.
  - `constructor`: used in bi-implication proofs to split into two directions.

---

#### **4. Proof Logic**

- **Structure**:
  - Prove equivalences of lifting structures via explicit bijections (`Equiv`).
  - Use naturality of unit/counit and functoriality to verify commutativity of adjoint squares.
  - For `hasLiftingProperty_iff`, apply the lifting equivalence twice:
    - One direction uses `right_adjoint_hasLift_iff`.
    - The other uses `left_adjoint_hasLift_iff`.
- **Pattern**:
  - For each square type, construct an adjoint square.
  - Show liftings correspond via hom-equivalence.
  - Conclude equivalence of `HasLift` and `HasLiftingProperty`.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.LiftingProperties.Basic`: defines `HasLiftingProperty`, `HasLift`, `LiftStruct`, etc.
- `Mathlib.CategoryTheory.Adjunction.Basic`: defines adjunctions (`G ⊣ F`), hom-equivalence (`homEquiv`), unit, counit, and naturality.

---

This file formalizes a foundational result in homotopical algebra: lifting properties are preserved under adjunctions, enabling transfer of weak factorization system data across adjoint pairs.