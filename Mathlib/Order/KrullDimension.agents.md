### Technical Brief: Krull Dimension and Height in Preordered Sets (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `krullDim` | `α [Preorder] → WithBot ℕ∞` | Supremum of lengths of all strictly increasing finite series (`a₀ < a₁ < … < aₙ`) in `α`. Handles empty (`⊥ = -∞`) and unbounded (`⊤ = +∞`) cases. |
| `height` | `a : α → ℕ∞` | Supremum of lengths of series ending at or below `a`. |
| `coheight` | `a : α → ℕ∞` | Defined as `height` in the dual order (`αᵒᵈ`); equivalently, supremum of lengths of series starting at or above `a`. |
| `krullDim_orderDual` | `krullDim αᵒᵈ = krullDim α` | Krull dimension is invariant under order dual. |
| `krullDim_eq_iSup_height` | `krullDim α = ↑(⨆ a, height a)` (for nonempty `α`) | Krull dimension equals supremum of heights of all elements. |
| `krullDim_eq_iSup_coheight` | `krullDim α = ↑(⨆ a, coheight a)` | Krull dimension equals supremum of coheights. |
| `krullDim_eq_iSup_height_add_coheight_of_nonempty` | `krullDim α = ↑(⨆ a, height a + coheight a)` | Krull dimension equals supremum of `height + coheight`. |
| `height_eq_iSup_lt_height` | `height x = ⨆ y < x, height y + 1` | Recursive characterization of height via predecessors. |
| `coheight_eq_iSup_gt_coheight` | `coheight x = ⨆ y > x, coheight y + 1` | Dual recursive characterization. |
| `height_eq_zero` | `height x = 0 ↔ IsMin x` | Elements of height 0 are exactly the minimal elements. |
| `coheight_eq_zero` | `coheight x = 0 ↔ IsMax x` | Elements of coheight 0 are exactly the maximal elements. |
| `height_eq_coe_iff` | Characterizes when `height x = n` (finite) in terms of predecessors. | Enables induction on height. |
| `height_eq_coe_iff_minimal_le_height` | `height a = n ↔ Minimal (λ y, n ≤ height y) a` | Elements of finite height `n` are minimal among those with height ≥ `n`. |
| `height_strictMono` | `x < y ∧ height x < ⊤ ⇒ height x < height y` | Strict monotonicity of height for finite values. |
| `coheight_strictAnti` | `y < x ∧ coheight x < ⊤ ⇒ coheight x < coheight y` | Strict antitonicity of coheight for finite values. |
| `exists_series_of_le_height` | `n ≤ height a ⇒ ∃ p, p.last = a ∧ p.length = n` | Realizes any length ≤ height as an actual series ending at `a`. |
| `krullDim_le_one_iff` | `krullDim α ≤ 1 ↔ ∀ x, IsMin x ∨ IsMax x` | Characterizes Krull dimension ≤ 1. |
| `krullDim_eq_top_iff` | `krullDim α = ⊤ ↔ InfiniteDimensionalOrder α` | Connects infinite Krull dimension to existence of arbitrarily long chains. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `height_`, `coheight_`: Relating to element-specific measures.
  - `krullDim_`: Relating to global dimension.
  - `length_`: Relating to series length properties.
  - `index_`, `rev_index_`: Relating to positions in a series.
- **Suffixes**:
  - `_mono`, `_anti`: Monotonicity / antitonicity.
  - `_iff`: Biconditional characterizations.
  - `_eq`: Equality characterizations (often with conditions like `finite`, `zero`, `top`).
  - `_of_`: Conditional versions (e.g., `of_nonempty`, `of_strictMono`).
  - `_le_iff`, `_lt_iff`: Characterizations of inequalities.
- **Dual / Order-theoretic**:
  - `_toDual`, `_ofDual`: Conversion lemmas between `α` and `αᵒᵈ`.
  - `dual`, `OrderDual`: Used in definitions and proofs for symmetry.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `height_eq_iSup_last_eq`, `length_le_height_last`). |
| `rw` / `convert` | Rewriting using equalities, often with `←` or `symm`. |
| `apply` / `exact` | Applying lemmas or hypotheses. |
| `cases` / `induction` | Structural or inductive reasoning (e.g., on `p.length`, `n`, or `height a`). |
| `omega` | Solving linear arithmetic over `ℕ`, `ℕ∞`, `WithBot`, `WithTop`. |
| `fin_cases` | Case analysis on `Fin n` indices (used in `krullDim_le_one_iff`). |
| `aesop` / `tauto` | Logical reasoning (less frequent, but used in some `iff` proofs). |
| `convert` / `congr!` | Congruence reasoning, especially for `iSup`-based definitions. |
| `bddDefault`, `bddDefault_tac` | Boundedness assumptions for suprema in `WithBot`/`WithTop`. |
| `norm_cast` | Normalizing casts between `ℕ`, `ℕ∞`, `WithBot`, `WithTop`. |
| `wlog` | Without loss of generality (e.g., assuming finiteness of height/coheight). |

---

#### **4. Proof Logic**

- **Inductive / Recursive Structure**:
  - Proofs often proceed by induction on `height x`, `coheight x`, or series length.
  - Key lemmas like `height_eq_iSup_lt_height` and `coheight_eq_iSup_gt_coheight` enable recursive reasoning.

- **Series Manipulation**:
  - Standard operations on `LTSeries`: `snoc`, `eraseLast`, `take`, `drop`, `reverse`, `map`, `comap`.
  - Many proofs construct or decompose series to relate `height`, `coheight`, and `krullDim`.

- **Order-Duality Strategy**:
  - Many results for `coheight` are derived by dualizing the corresponding `height` result (e.g., via `αᵒᵈ`).
  - `coheight_eq` and `coheight_le_iff` provide direct series-based definitions for verification.

- **Supremum Reasoning**:
  - `iSup₂_le_iff`, `le_iSup₂_of_le`, `iSup_congr`, `ciSup_mono` are heavily used.
  - `WithBot`/`WithTop` arithmetic handled via `coe_lt_coe`, `coe_le_coe`, `add_one_le_iff`, etc.

- **Characterization via Minimality/Maximality**:
  - `height_eq_coe_iff_minimal_le_height` and `coheight_eq_coe_iff_maximal_le_coheight` link finite heights to extremal elements.

- **Case Analysis on Infinity**:
  - Many proofs split on `height x = ⊤`, `coheight x = ⊤`, or `krullDim α = ⊤`, using lemmas like `height_eq_top_iff`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Group.Int` | For `Int`-related order properties (used in examples). |
| `Mathlib.Data.ENat.Lattice` | `ℕ∞` (extended naturals) as a complete lattice; arithmetic and order. |
| `Mathlib.Order.Minimal` | Definitions and lemmas about minimal/maximal elements. |
| `Mathlib.Order.RelSeries` | `LTSeries` (length-indexed strictly increasing sequences) and related operations (`snoc`, `reverse`, `map`, `comap`, `take`, `drop`). |
| `Mathlib.Tactic.FinCases` | For case analysis on `Fin n`. |

---

### Summary

This file formalizes **Krull dimension** and **height/coheight** for preordered sets in a robust, order-theoretic manner. It leverages:
- **Duality** (`α` ↔ `αᵒᵈ`) to unify height/coheight,
- **Series-based definitions** for concrete reasoning,
- **Extended naturals (`ℕ∞`)** and **`WithBot`** to handle infinities and empty cases,
- **Supremum-based characterizations** for abstract properties.

The structure is highly modular, with many lemmas designed for reuse (e.g., monotonicity, recursive definitions, series existence), and is well-suited for applications in algebraic geometry or domain theory where chain-length measures matter.