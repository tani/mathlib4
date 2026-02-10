### Technical Brief: `Mathlib.Data.ENat.Lattice`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `CompleteLinearOrder ENat` | `instance` | Equips extended naturals (`ℕ∞`) with a complete linear order structure via `WithTop ℕ`. |
| `CompleteLinearOrder (WithBot ENat)` | `instance` | Extends the order to include bottom element (`⊥`), forming a complete linear order on `WithBot ENat`. |
| `iSup_coe_eq_top` | `⨆ i, (f i : ℕ∞) = ⊤ ↔ ¬ BddAbove (range f)` | Relates supremum of coerced naturals to boundedness. |
| `iInf_coe_lt_top` | `⨅ i, (f i : ℕ∞) < ⊤ ↔ Nonempty ι` | Characterizes when an infimum of naturals is finite. |
| `coe_sSup` | `BddAbove s → ↑(sSup s) = ⨆ a ∈ s, (a : ℕ∞)` | Commutativity of supremum and coercion for bounded sets. |
| `coe_iInf` | `[Nonempty ι] → ↑(⨅ i, f i) = ⨅ i, (f i : ℕ∞)` | Commutativity of infimum and coercion for nonempty index types. |
| `iInf_toNat` | `(⨅ i, (f i : ℕ∞)).toNat = ⨅ i, f i` | Interaction between `toNat` and infimum. |
| `iInf_eq_zero` | `⨅ i, (f i : ℕ∞) = 0 ↔ ∃ i, f i = 0` | Infimum is zero iff some value is zero. |
| `sSup_eq_zero` | `sSup s = 0 ↔ ∀ a ∈ s, a = 0` | Supremum zero iff all elements zero. |
| `sInf_eq_zero` | `sInf s = 0 ↔ 0 ∈ s` | Infimum zero iff zero is in the set. |
| `sSup_eq_top_of_infinite` | `s.Infinite → sSup s = ⊤` | Infinite sets have top supremum. |
| `finite_of_sSup_lt_top` | `sSup s < ⊤ → s.Finite` | Converse: finite sets have finite supremum. |
| `sSup_mem_of_nonempty_of_lt_top` | `[Nonempty s] → sSup s < ⊤ → sSup s ∈ s` | Supremum is attained if finite and nonempty. |
| `exists_eq_iSup_of_lt_top` | `[Nonempty ι] → ⨆ i, f i < ⊤ → ∃ i, f i = ⨆ i, f i` | Supremum attained for finite-indexed families. |
| `add_iSup` | `[Nonempty ι] → a + ⨆ i, f i = ⨆ i, a + f i` | Addition distributes over supremum. |
| `iSup_add` | `[Nonempty ι] → (⨆ i, f i) + a = ⨆ i, f i + a` | Right addition distributes over supremum. |
| `iSup_add_iSup` | `∀ i j, ∃ k, f i + g j ≤ f k + g k → iSup f + iSup g = ⨆ i, f i + g i` | Equality of sum of suprema and supremum of sums under directedness-like condition. |
| `iSup_add_iSup_of_monotone` | `[Preorder ι] [IsDirected ι] [Monotone f] [Monotone g] → iSup f + iSup g = ⨆ a, f a + g a` | Special case of above for monotone functions on directed types. |
| `sub_iSup` | `a ≠ ⊤ → a - ⨆ i, f i = ⨅ i, a - f i` | Subtraction distributes over supremum (as infimum) when `a` is finite. |

**Proof-wanted lemmas** (to be formalized):
- `mul_iSup`, `iSup_mul`, `mul_sSup`, `sSup_mul`
- `mul_iInf'`, `iInf_mul'`, `mul_iInf_of_ne`, `iInf_mul_of_ne`, `mul_iInf`, `iInf_mul`
- `smul_iSup`, `smul_sSup`

These are analogues of additive distributivity for multiplication and scalar multiplication.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `iSup_`, `iInf_`: indexed supremum/infimum over ι → ENat.
  - `sSup_`, `sInf_`: set-based supremum/infimum.
  - `coe_`: coercion-related lemmas (`↑`).
  - `biSup_`, `biSup'_`: binary indexed suprema over predicates.
- **Suffixes**:
  - `_eq_top`, `_lt_top`, `_ne_top`: characterizations of top/finite behavior.
  - `_of_ne`, `_of_isEmpty`: conditional variants (e.g., `a ≠ 0`, `a ≠ ⊤`, `IsEmpty ι`).
  - `_le`, `_ge`: inequality-based lemmas.
- **Special patterns**:
  - `add_`, `sub_`, `mul_`, `smul_`: indicate operation involved.
  - `'_` suffix: often used for variants with extra assumptions (e.g., `add_biSup'` vs `add_biSup`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: rewriting and simplification, especially with `iSup`, `sSup`, coercion lemmas.
- `cases`: on `eq_or_ne`, `isEmpty_or_nonempty`, `em`, `coe`/`top` cases.
- `exact`, `apply`, `refine`: for constructing proofs stepwise.
- `apply_rules`: in monotonicity arguments (`iSup_add_iSup_of_monotone`).
- `gcongr`: for congruence reasoning in monotone contexts.
- `contrapose!`: for contrapositive reasoning (e.g., `sSup_eq_top_of_infinite`).
- `norm_cast`: for coercions involving `ℕ → ℕ∞`.
- `aesop`: likely used implicitly in `proof_wanted` lemmas (not yet proven).
- `linarith`, `ring`: not explicitly seen, but may be used in future proofs.

---

#### **4. Proof Logic**

- **Induction / case analysis**:
  - Many proofs split on `IsEmpty ι` vs `Nonempty ι`, or `a = ⊤` vs `a ≠ ⊤`.
  - Use of `isEmpty_or_nonempty`, `eq_or_ne`, `em (∃ i, a < f i)` for case splits.
- **Order-theoretic reasoning**:
  - Leverage `CompleteLinearOrder` structure on `ENat`.
  - Use `le_antisymm` to prove equalities by bounding both sides.
  - Use `iSup_le`, `le_iSup`, `iInf_le`, `le_iInf` for bounding suprema/infima.
- **Set-theoretic arguments**:
  - `sSup_eq_top_of_infinite` uses finiteness arguments and image preservation.
  - `finite_of_sSup_lt_top` uses contrapositive + `infinite` characterization.
- **Coercion handling**:
  - Many lemmas relate `↑(sSup s)` to `⨆ a ∈ s, (a : ℕ∞)` via `WithTop` lemmas.
  - `coe_iSup`, `coe_sSup`, `coe_iInf`, `coe_sInf` are key bridges.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Data.Nat.Lattice` | Provides lattice/complete lattice structure on `ℕ`. |
| `Mathlib.Data.ENat.Basic` | Defines `ENat = WithTop ℕ`, basic order, algebraic ops. |
| `Mathlib.Algebra.Group.Action.Defs` | Required for `SMul`, scalar multiplication definitions (used in `smul_*` lemmas). |

> **Note**: The import of `Mathlib.Algebra.Group.Action.Defs` is flagged as temporary due to `shake` tool limitations; it should be removed once `proof_wanted` handling is fixed.

---

#### **Summary**

This file establishes foundational order-theoretic properties of `ENat` (extended naturals), especially regarding suprema/infima, their interaction with arithmetic operations (`+`, `-`, `*`, scalar mult), and top/finite behavior. It leverages `WithTop` infrastructure and `CompleteLinearOrder` to derive results in a clean, reusable way. Many multiplicative analogues remain as `proof_wanted`, indicating future work to complete the algebraic theory.