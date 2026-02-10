### Technical Brief: Complete Lattice Theory in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sSup`, `sInf` | `Set α → α` | Supremum / infimum of a *set* of elements in a complete (semi)lattice |
| `iSup`, `iInf` | `(ι → α) → α` | Indexed supremum / infimum (sup/inf over the *range* of a function) |
| `iSup₂`, `iInf₂` | `(∀ i, κ i → α) → α` | Double indexed sup/inf (sup of sups / inf of infs) |
| `biSup`, `biInf` | `(i : ι) → p i → α → α` | Bounded indexed sup/inf over a predicate `p : ι → Prop` |
| `CompleteSemilatticeSup` | `Type u → Type u` | Class for types with a partial order and `sSup` satisfying lattice-like axioms (least upper bound) |
| `CompleteSemilatticeInf` | `Type u → Type u` | Class for types with a partial order and `sInf` satisfying dual lattice-like axioms (greatest lower bound) |
| `CompleteLattice` | `Type u → Type u` | Bounded lattice where every subset has both sup and inf |
| `CompleteLinearOrder` | `Type u → Type u` | Linearly ordered complete lattices (e.g., `ℝ`, `ℕ`, `Bool`) |
| `completeLatticeOfInf`, `completeLatticeOfSup` | Constructors | Build `CompleteLattice` from `InfSet`/`SupSet` + correctness proof |
| `isLUB_sSup`, `isGLB_sInf` | `IsLUB s (sSup s)`, `IsGLB s (sInf s)` | Core properties: `sSup` is least upper bound, `sInf` is greatest lower bound |
| `sSup_le_iff`, `le_sInf_iff` | `sSup s ≤ a ↔ ∀ b ∈ s, b ≤ a`, etc. | Characterizations of sup/inf via universal properties |
| `sSup_union`, `sInf_union` | `sSup (s ∪ t) = sSup s ⊔ sSup t`, etc. | Distributivity over finite unions |
| `sSup_insert`, `sInf_insert` | `sSup (insert a s) = a ⊔ sSup s`, etc. | Recursive behavior over finite sets |
| `lt_sSup_iff`, `sInf_lt_iff` (in `CompleteLinearOrder`) | `b < sSup s ↔ ∃ a ∈ s, b < a`, etc. | Strict order characterizations in linear orders |
| `iSup_le_iInf`, `iSup_iInf_le_iInf_iSup` | Inequalities between nested sup/inf | Generalized distributivity laws (e.g., `∃∀ ≤ ∀∃`) |
| `Monotone.le_map_iSup`, `Antitone.le_map_iInf` | Preservation under monotone/antitone maps | Functors preserve sup/inf structure |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sSup`, `sInf`: *set* sup/inf (over a `Set α`)
  - `iSup`, `iInf`: *indexed* sup/inf (over a function `ι → α`)
  - `biSup`, `biInf`: *bounded* indexed sup/inf (over a predicate)
  - `iSup₂`, `iInf₂`: *double* indexed sup/inf (nested `iSup`/`iInf`)
- **Suffixes**:
  - `_iff`: iff-characterization of universal property (e.g., `sSup_le_iff`)
  - `_singleton`: behavior on singleton sets (e.g., `sSup_singleton`)
  - `_empty`, `_univ`: behavior on empty/universal sets
  - `_insert`: behavior on `insert a s`
  - `_mono`, `_congr`: monotonicity / congruence lemmas
- **Duals**:
  - Lemmas in `OrderDual` often have symmetric names (e.g., `toDual_sSup`, `ofDual_sInf`)
  - `αᵒᵈ` swaps `sSup` ↔ `sInf`, `≤` ↔ `≥`

---

#### **3. Tactic Stack**

- **Core simplification & rewriting**:
  - `simp`, `simp_rw`, `congr`, `ext`
- **Order reasoning**:
  - `apply`, `exact`, `refine`, `assumption`
  - `le_antisymm`, `le_trans`, `lt_trans`
- **Set-theoretic reasoning**:
  - `subset_insert_diff_singleton`, `diff_subset`, `mem_insert`, `mem_singleton`
- **Universal property automation**:
  - `isLUB_sSup`, `isGLB_sInf` used via `isLUB_le_iff`, `le_isGLB_iff`, etc.
- **Index manipulation**:
  - `exists_range_iff`, `range_comp`, `image_eq_range`
- **Specialized automation**:
  - `aesop` (implicit in many proofs), `ring` (for lattice operations), `omega` (for decidable orders)

---

#### **4. Proof Logic**

- **Standard pattern**:
  1. **Unfold definitions** (`iSup`, `sSup`, `le_sSup`, etc.)
  2. **Apply universal property** (e.g., `sSup_le_iff`, `le_sInf_iff`)
  3. **Reduce to element-wise reasoning** using `forall_mem_range`, `exists_range_iff`
  4. **Use monotonicity/congruence** lemmas (`iSup_mono`, `iSup_congr`, etc.)
  5. **Duality via `OrderDual`** to avoid repetition (e.g., prove one direction, dualize for the other)

- **Common proof structures**:
  - **Equality proofs**: `le_antisymm` + two applications of `sSup_le`/`le_sSup`
  - **Existence in linear orders**: `lt_sSup_iff` → construct witness via `∃ intro`
  - **Monotonicity**: `iSup_le` + `le_iSup_of_le` or `le_iInf` + `iInf_le_of_le`
  - **Construction of `CompleteLattice`**: `completeLatticeOfInf`/`completeLatticeOfSup` + `isGLB_sInf`/`isLUB_sSup`

---

#### **5. Imports & Scope**

- **Core dependencies**:
  ```lean
  Mathlib.Data.Bool.Set
  Mathlib.Data.Nat.Set
  Mathlib.Data.Set.NAry
  Mathlib.Data.Set.Prod
  Mathlib.Data.ULift
  Mathlib.Order.Bounds.Basic
  Mathlib.Order.Hom.Set
  Mathlib.Order.SetNotation
  ```
- **Scope**:
  - Formalizes *complete lattices* and *complete linear orders* in full generality.
  - Supports both *set-based* (`sSup`, `sInf`) and *indexed* (`iSup`, `iInf`) suprema/infima.
  - Includes dualities via `OrderDual`, `ULift`, `PLift`.
  - Provides constructors for building instances from minimal data (`completeLatticeOfInf`, etc.).
  - Designed for use in analysis, measure theory, and domain theory (e.g., `ℝ`, `ENNReal`, function spaces).

--- 

This module serves as the foundational infrastructure for reasoning about suprema/infima in ordered structures across Mathlib.