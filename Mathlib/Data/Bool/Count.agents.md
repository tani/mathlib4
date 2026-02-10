### Technical Metadata Brief: `List Bool` Counting Lemmas in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `count_not_add_count` | `∀ (l : List Bool) (b : Bool), count (!b) l + count b l = length l` | Total count of `b` and its negation equals list length. |
| `count_add_count_not` | `∀ (l : List Bool) (b : Bool), count b l + count (!b) l = length l` | Commutative variant of above. |
| `count_false_add_count_true` | `∀ (l : List Bool), count false l + count true l = length l` | Special case for `false`/`true`. |
| `count_true_add_count_false` | `∀ (l : List Bool), count true l + count false l = length l` | Commutative variant of above. |
| `Chain.count_not` | `Chain (· ≠ ·) b l → count (!b) l = count b l + length l % 2` | For alternating lists starting with `b`, count of `!b` differs by parity. |
| `Chain'.count_not_eq_count` | `Chain' (· ≠ ·) l → Even (length l) → count (!b) l = count b l` | In even-length alternating lists, counts of `b` and `!b` are equal. |
| `Chain'.count_false_eq_count_true` | `Chain' (· ≠ ·) l → Even (length l) → count false l = count true l` | Special case of above for booleans. |
| `Chain'.count_not_le_count_add_one` | `Chain' (· ≠ ·) l → count (!b) l ≤ count b l + 1` | General bound on count difference in alternating lists. |
| `Chain'.count_false_le_count_true_add_one` / `count_true_le_count_false_add_one` | Specializations of above for `false`/`true`. |
| `Chain'.two_mul_count_bool_of_even` | `Chain' (· ≠ ·) l → Even (length l) → 2 * count b l = length l` | In even-length alternating lists, count of any bit is exactly half the length. |
| `Chain'.two_mul_count_bool_eq_ite` | `Chain' (· ≠ ·) l → 2 * count b l = if Even (length l) then length l else if b == head? l then length l + 1 else length l - 1` | Precise formula for `2 * count b l` depending on parity and first element. |
| `length_sub_one_le_two_mul_count_bool` | `2 * count b l ≥ length l - 1` | Lower bound on `2 * count b l`. |
| `length_div_two_le_count_bool` | `length l / 2 ≤ count b l` | Count is at least half the length (integer division). |
| `two_mul_count_bool_le_length_add_one` | `2 * count b l ≤ length l + 1` | Upper bound on `2 * count b l`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `count_`: Relates to counting occurrences (`count_false`, `count_true`, `count_not`).
  - `two_mul_`: Expresses relationships involving `2 * count`.
  - `length_`: Relates to length-based bounds or equalities.

- **Suffixes**:
  - `_add_count`: Sum of counts.
  - `_eq_count`: Equality of counts.
  - `_le_count_add_one`: Upper bound by `+1`.
  - `_of_even`: Conditional on even length.
  - `_ite`: Uses `if-then-else` (ternary) logic.

- **Structure**:
  - `Chain` lemmas assume `Chain (· ≠ ·) b l` (list starts with `b` and alternates).
  - `Chain'` lemmas assume `Chain' (· ≠ ·) l` (list alternates, no fixed start).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with specific lemmas, especially `count`, `length`, `Nat.mod_two_add_succ_mod_two`, `Bool.not_*`. |
| `cases` | On booleans (`b`, `x`) or lists (`l`) to split into cases. |
| `rw [...]` | Rewriting using previously proven equalities or definitions. |
| `obtain rfl : ...` | Extract equality from `Bool.eq_not_iff` or similar. |
| `exact` / `exact this.symm` | Direct proof completion or symmetry use. |
| `split_ifs` | Simplify `if ... then ... else ...` expressions. |
| `contradiction` | Close goals derived from inconsistent assumptions. |
| `intro`, `revert`, `ext` | Standard proof structuring and extensionality. |
| `ring`, `linarith` | Implicitly used (e.g., in `Nat.mod_lt`, `add_le_add_left`), though not explicitly named. |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs over `Chain`/`Chain'` use **induction on list structure** (`[]`, `x :: l`).
  - Base case `[]` trivial (`rfl`).
  - Inductive step uses:
    - `rel_of_chain_cons` to extract `b ≠ x`.
    - `Bool.eq_not_iff` to get `b = !x`.
    - `count_cons_*` lemmas to simplify counts.
    - `Chain.count_not` (or `hl.count_not`) recursively.

- **Parity reasoning**:
  - `Even (length l)` and `Odd (length l)` cases handled via `Nat.even_add_one`, `Nat.mod_two_add_succ_mod_two`, etc.
  - `% 2` used to encode parity in equalities.

- **Case analysis**:
  - On `b : Bool` (`true`/`false`) and `x : Bool` (head of list).
  - On whether `b = x` or `b = !x` (via `em` or `Bool.eq_not_iff`).

- **Bounding arguments**:
  - Use `Nat.mod_lt`, `add_le_add_*`, `tsub_le_iff_right`, `div_le_iff_le_mul_add_pred` for arithmetic bounds.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Ring.Nat` | Provides arithmetic on `ℕ`, including `mod`, `even`, `div`, inequalities. |
| `Mathlib.Data.List.Chain` | Defines `Chain` and `Chain'` for alternating lists (via binary relation `· ≠ ·`). |

---

### Summary

This module formalizes foundational counting properties of alternating boolean lists. It distinguishes between general alternating lists (`Chain'`) and those starting with a specific value (`Chain`). Key results include:
- Exact count formulas for alternating lists (dependent on parity and head).
- Tight bounds (`±1`) on count differences.
- Half-length equalities in even-length alternating lists.

The proofs rely heavily on:
- Structural induction,
- Boolean algebra (`not`, `eq_not_iff`),
- Natural number arithmetic (parity, division, mod),
- List recursion (`count`, `length`, `head?`).

This is typical of Lean’s `Mathlib` style: precise, modular, and heavily automated via `simp` and case analysis.