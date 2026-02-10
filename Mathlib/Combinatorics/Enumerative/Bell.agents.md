### Technical Metadata Brief: Bell Numbers for Multisets (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Multiset.bell` | `Multiset ℕ → ℕ` | Counts partitions of a set of size `m.sum` whose block sizes are given by multiset `m`. Defined via multinomial coefficients and binomial products. |
| `Nat.uniformBell` | `ℕ → ℕ → ℕ` | Short for `Multiset.bell (replicate m n)`: number of ways to partition a set of `m·n` elements into `m` blocks of size `n`. |
| `bell_mul_eq` | `∀ m, m.bell * (∏ j ∈ m.map factorial) * ∏ j ∈ (m.toFinset.erase 0), (m.count j)! = m.sum !` | Fundamental identity linking `bell m` to factorials; key to deriving closed forms. |
| `uniformBell_mul_eq` | `∀ m n ≠ 0, uniformBell m n * n!^m * m! = (m·n)!` | Specialization of `bell_mul_eq` for uniform block sizes; foundational for combinatorial interpretation. |
| `bell_eq` | `∀ m, m.bell = m.sum ! / ((∏ j ∈ m.map factorial) * ∏ j ∈ (m.toFinset.erase 0), (m.count j)!)` | Explicit formula for `bell m` as a quotient (integer division justified by `bell_mul_eq`). |
| `uniformBell_eq` | `∀ m n, uniformBell m n = ∏ p ∈ range m, choose (p·n + n - 1) (n - 1)` | Product formula for uniform Bell numbers; derived from definition and simplifications. |
| `uniformBell_succ_left` | `uniformBell (m+1) n = choose (m·n + n - 1) (n - 1) * uniformBell m n` | Recursive computation of uniform Bell numbers. |
| `bell_mul_eq_lemma` | `∀ x ≠ 0 c, x!^c * c! * ∏_{j < c} binom(j·x + x - 1, x - 1) = (x·c)!` | Core inductive lemma used to prove `bell_mul_eq`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bell_`: for multiset-based Bell numbers (`bell`, `bell_mul_eq`, `bell_eq`, `bell_mul_eq_lemma`)
  - `uniformBell_`: for uniform (equal-block-size) case (`uniformBell`, `uniformBell_mul_eq`, `uniformBell_succ_left`, etc.)
- **Suffixes**:
  - `_eq`: identities equating expressions (`bell_mul_eq`, `uniformBell_mul_eq`)
  - `_left`/`_right`: when varying left/right argument in binary function (`uniformBell_succ_left`, `uniformBell_zero_left`, `uniformBell_one_right`)
- **Helper patterns**:
  - `Finset.prod_range_succ`, `Finset.prod_singleton`, `Finset.erase_eq_of_not_mem`: recurring simplifications over finite sets.
  - `count_replicate`, `toFinset_replicate`, `prod_replicate`: used to simplify multiset-to-Finset conversions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities (especially `bell_mul_eq`, `uniformBell_mul_eq`, factorial/successor lemmas) |
| `simp` | Simplification with `simp` lemmas (`factorial_succ`, `choose_self`, `prod_range_succ`, etc.) |
| `ring` | Algebraic manipulation of arithmetic expressions (especially in `bell_mul_eq_lemma` induction step) |
| `apply congr_arg₂` / `congr_arg` | Proving equality of products/sums by congruence |
| `by_cases` | Splitting on whether `0 ∈ m.toFinset` or `n = 0` |
| `nth_rewrite` | Repeated rewriting at specific positions (e.g., to align erased subsets) |
| ` positivity` | Justifying positivity assumptions (e.g., for division cancellation) |
| `exact` / `convert` | Finishing proofs via direct evidence or conversion to known theorems (`bell_mul_eq`) |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - `bell_mul_eq_lemma` is proven by induction on `c`, with base case `c = 0` trivial and step using factorial/choose identities.
  - `bell_mul_eq` uses `bell_mul_eq_lemma` to reduce to multinomial expansion.
- **Multiset-to-Finset handling**:
  - Heavy use of `Finset` operations (`erase`, `range`, `prod`, `sum`) and lemmas like `Finset.prod_multiset_map_count`, `Finset.sum_multiset_count`.
  - Cases on membership of `0` in support (`0 ∈ m.toFinset`) to simplify products involving `0! = 1`.
- **Quotient derivation**:
  - `bell_eq` and `uniformBell_eq_div` derived via `Nat.div_eq_of_eq_mul_left`, requiring positivity of denominator (via `Nat.factorial_pos`).
- **Recursive simplification**:
  - `uniformBell_succ_left` follows directly from `uniformBell_eq` and `Finset.prod_range_succ`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Nat.Choose.Multinomial` | Provides `Nat.multinomial`, `multinomial_spec`, and related lemmas for multinomial coefficients. |
| `Mathlib.Data.Nat.Choose.Mul` | Supplies lemmas like `Nat.choose_mul_add`, `Nat.add_choose_mul_factorial_mul_factorial`, used in `bell_mul_eq_lemma`. |

These imports define the combinatorial toolkit required for factorial/choose arithmetic and multinomial expansions.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagram of dependencies.