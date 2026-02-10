### Technical Brief: Lattice Structure Copying in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `OrderTop.copy` | Constructs a provably equal copy of a top order with new `≤` and `top` definitions, using `eq_top` and `le_eq` to justify equality. |
| `OrderBot.copy` | Analogous to `OrderTop.copy`, but for bottom elements (`bot`). |
| `BoundedOrder.copy` | Combines `OrderTop.copy` and `OrderBot.copy` to copy bounded orders. |
| `Lattice.copy` | Copies a lattice structure (`le`, `sup`, `inf`) while preserving all lattice axioms via definitional equalities. |
| `DistribLattice.copy` | Extends `Lattice.copy` to distributive lattices, using `le_sup_inf` to verify distributivity. |
| `GeneralizedHeytingAlgebra.copy` | Copies Heyting implication (`himp`) and top element, using `le_himp_iff`. |
| `GeneralizedCoheytingAlgebra.copy` | Copies subtraction (`sdiff`) and bottom element, using `sdiff_le_iff`. |
| `HeytingAlgebra.copy` | Combines Heyting algebra structure: top, bottom, lattice, implication, and complement, using `himp_bot`. |
| `CoheytingAlgebra.copy` | Combines co-Heyting algebra structure: top, bottom, lattice, subtraction, and co-negation, using `top_sdiff`. |
| `BiheytingAlgebra.copy` | Combines both Heyting and co-Heyting algebra structures. |
| `CompleteLattice.copy` | Copies complete lattices, including arbitrary sup/inf (`sSup`, `sInf`), with proofs of their universal properties. |
| `Frame.copy` | Copies frames (frames = complete Heyting algebras), using `inf_sSup_le_iSup_inf` and `HeytingAlgebra.copy`. |
| `Coframe.copy` | Copies coframes (dual of frames), using `iInf_sup_le_sup_sInf` and `CoheytingAlgebra.copy`. |
| `CompleteDistribLattice.copy` | Copies complete distributive lattices via `Frame.copy` and `Coframe.copy`. |
| `ConditionallyCompleteLattice.copy` | Copies conditionally complete lattices (sup/inf only when bounded), using `le_csSup`, `csSup_le`, etc. |

All `copy` functions follow the same pattern:  
- Take an existing structure `c : α → Structure`  
- Replace underlying data (`le`, `sup`, `inf`, `top`, `bot`, etc.) with new definitions provably equal to the old ones  
- Reconstruct the structure using those new definitions, verifying axioms via `simp` and rewriting using `eq_*` hypotheses.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` is *not* used here — instead, structures are named after their algebraic properties (`Lattice`, `HeytingAlgebra`, etc.).
  - `copy` suffix is used uniformly for all structure-copying functions.
- **Suffixes**:
  - `copy`: Indicates a structure-preserving “copy” with new definitional representatives.
- **Variable naming**:
  - `le`, `sup`, `inf`, `top`, `bot`, `himp`, `sdiff`, `compl`, `hnot`, `sSup`, `sInf`: Standard algebraic operations.
  - `eq_*`: Proof that new operation = old operation (e.g., `eq_le : le = (by infer_instance : LE α).le`).
  - `c`: The original structure being copied.

---

#### **3. Tactic Stack**

- **`simp`**: Dominant tactic — used to simplify goals using definitional equalities (`eq_*`) and structure axioms.
- **`rw`**: Used to rewrite equalities (e.g., `rw [← eq_le]`).
- **`subst_vars`**: Used in `ConditionallyCompleteLattice.copy` to eliminate substituted variables after `eq_*` equalities.
- **`exact` / `intro`**: Minimal use — mostly for straightforward axioms (e.g., `exact le_trans hab hbc`).
- **`simpa`**: Used in `CompleteLattice.copy`, `Frame.copy`, `Coframe.copy` to discharge goals by simplifying with a lemma and the `eq_*` equalities.

> **No automation-heavy tactics** like `aesop`, `linarith`, or `interval_cases` — proofs are mostly definitional or rely on existing lemmas from `Order` and `Lattice`.

---

#### **4. Proof Logic**

- **Pattern**: All proofs follow a *uniform definitional replacement strategy*:
  1. **Introduce new operations** (`le`, `sup`, etc.) with proofs of equality to old ones (`eq_*`).
  2. **Rewrite axioms** using `eq_*` to reduce to known facts about the original structure.
  3. **Apply `simp`** with `eq_*` and existing lemmas (e.g., `le_sup_inf`, `le_sSup`, `himp_bot`).
  4. For lattice/Heyting/co-Heyting structures:  
     - Use `Lattice.copy` as a building block.  
     - Prove additional axioms (e.g., `le_himp_iff`) by `simp [eq_le, eq_himp, eq_inf]`.
  5. For complete structures:  
     - Use `CompleteLattice.copy` as base.  
     - Prove `le_sSup`, `sSup_le`, etc., by rewriting with `eq_*` and applying original lemmas.

- **No induction or case analysis** — all proofs are *algebraic rewrites* based on definitional equality.

---

#### **5. Imports**

- **Primary dependency**:  
  ```lean
  import Mathlib.Order.ConditionallyCompleteLattice.Basic
  ```
- **Implicit imports** (via `Mathlib.Order.*`):
  - `Mathlib.Order.Lattice`
  - `Mathlib.Order.BoundedOrder`
  - `Mathlib.Order.Heyting`
  - `Mathlib.Order.Coheyting`
  - `Mathlib.Order.Frame`
  - `Mathlib.Order.CompleteLattice`
  - `Mathlib.Order.Basic` (via `Order` namespace)

> This module is part of the **order theory infrastructure** in Mathlib, specifically for *structure transport* along definitional equalities — a common pattern in Lean for improving definitional behavior of algebraic structures.

--- 

Let me know if you'd like a diagram of the inheritance hierarchy or a tactic-level proof sketch for a specific `copy` function.