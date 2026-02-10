### Technical Metadata Brief: Scott Topological Spaces in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsωSup` | `Chain α → α → Prop` | Defines that `x` is the least upper bound (LUB) of the range of chain `c`. |
| `isωSup_iff_isLUB` | `IsωSup c x ↔ IsLUB (range c) x` | Equates `IsωSup` with the standard LUB definition. |
| `IsOpen` | `Set α → Prop` | Characterizes open sets as those whose membership predicate is `ωScottContinuous`. |
| `ωScottContinuous` | `(α → Prop) → Prop` | A predicate asserting that a function preserves ω-chains' suprema and is monotone. |
| `scottContinuous_iff_continuous` | `ωScottContinuous f ↔ Continuous f` | Under Scott topology assumptions, Scott-continuity coincides with topological continuity. |
| `notBelow` | `α → Set α` | `{ x | ¬x ≤ y }`, an open set used to enforce monotonicity of continuous maps. |
| `notBelow_isOpen` | `IsOpen (notBelow y)` | Proves `notBelow y` is open in the Scott topology. |
| `isωSup_ωSup` | `IsωSup c (ωSup c)` | States that `ωSup c` is indeed the ω-supremum of chain `c`. |
| `scottContinuous_of_continuous` | `Continuous f → ωScottContinuous f` | Shows that topologically continuous functions are Scott-continuous. |
| `continuous_of_scottContinuous` | `ωScottContinuous f → Continuous f` | Shows that Scott-continuous functions are topologically continuous. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isωSup`: Predicate naming for properties involving ω-suprema.
  - `notBelow`: Descriptive name for a specific open set.
  - `ωScottContinuous`: Combines "ω" (for ω-chains) and "Scott" (for Scott-continuity).
- **Suffixes**:
  - `_iff_isLUB`: Logical equivalence with a standard notion (`isLUB`).
  - `_isUpperSet`: Property of being an upper set.
  - `_isOpen`: Membership in the Scott topology.
- **Module/namespace usage**:
  - `Scott` namespace groups core definitions and properties.
  - `Topology.IsScott` and `OmegaCompletePartialOrder` imported modules provide foundational infrastructure.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using equivalences like `isωSup_iff_isLUB`, `ωScottContinuous_iff_monotone_map_ωSup`.
- `simp` / `simp_rw`: Simplification with definitional equalities and lemmas.
- `aesop`: Automated reasoning for propositional logic and order-theoretic goals.
- `convert`: To align goals modulo definitional equality (e.g., in `isOpen_sUnion`).
- `tauto`: Tactic for propositional tautologies, especially in negation/implication reasoning.
- `rcases`: To destruct existential or conjunction hypotheses (e.g., `rcases (notBelow_isOpen z).preimage hf`).
- `refine`: To construct proofs with holes to be filled later (e.g., in `notBelow_isOpen`).
- `ext`: Extensionality for set equality (used in `scott_eq_Scott`).

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a pattern of:
    1. **Unfolding definitions** (`dsimp`, `simp only`, `rw`).
    2. **Applying known equivalences** (e.g., `ωScottContinuous_iff_monotone_map_ωSup`).
    3. **Splitting into monotonicity + ω-sup preservation** (via `ωScottContinuous_iff_monotone_map_ωSup`).
    4. **Using order-theoretic lemmas** (e.g., `ωSup_le_iff`, `le_ωSup`).
    5. **Logical manipulation** (e.g., `not_iff_not`, `exists_imp`, `tauto`).
- **Common proof techniques**:
  - **Monotonicity derivation** via openness of `notBelow y` and preimage preservation.
  - **Equivalence of Scott-continuity and topological continuity** via mutual implication (`scottContinuous_of_continuous`, `continuous_of_scottContinuous`).
  - **Set-theoretic arguments** for topology axioms (`isOpen_univ`, `isOpen_inter`, `isOpen_sUnion`) using `CompleteLattice.ωScottContinuous.*` lemmas.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Topology.Basic` | General topology (continuity, open sets, preimages). |
| `Mathlib.Order.UpperLower.Basic` | Upper/lower sets, monotonicity, closure properties. |
| `Mathlib.Order.OmegaCompletePartialOrder` | ωCPOs, ω-suprema, monotone maps preserving ω-limits. |
| `Mathlib.Topology.Order.ScottTopology` | Scott topology definitions and basic properties (used for `Topology.scott`, `Topology.IsScott`). |

---

### Summary

This file formalizes **Scott topological spaces** over ωCPOs, establishing a bridge between domain-theoretic continuity (ω-Scott continuity) and topological continuity. It leverages Lean’s order-theoretic libraries to define open sets via ω-Scott continuity, prove key properties (e.g., openness of `notBelow`, Scott topology axioms), and show equivalence of Scott- and topological continuity. The proofs rely heavily on monotonicity, lattice-theoretic reasoning, and automation via `aesop`/`tauto`.