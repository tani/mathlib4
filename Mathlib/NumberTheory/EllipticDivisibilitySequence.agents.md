### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsEllSequence` | `Prop`: A sequence `W : ℤ → R` satisfies the elliptic identity: <br> `W(m+n)W(m−n)W(r)² = W(m+r)W(m−r)W(n)² − W(n+r)W(n−r)W(m)²` for all `m,n,r ∈ ℤ`. |
| `IsDivSequence` | `Prop`: A sequence `W : ℤ → R` satisfies `W m ∣ W n` whenever `m ∣ n` (for `m,n ∈ ℕ`). |
| `IsEllDivSequence` | `Prop`: `W` is both an elliptic and a divisibility sequence. |
| `preNormEDS'` | `ℕ → R`: Auxiliary sequence for normalized EDS with base values `W(0)=0, W(1)=1, W(2)=1, W(3)=c, W(4)=d`, and parameter `b`. Defined recursively using strong recursion on parity. |
| `preNormEDS` | `ℤ → R`: Extension of `preNormEDS'` to all integers via sign: `preNormEDS n = n.sign * preNormEDS' n.natAbs`. |
| `normEDS` | `ℤ → R`: Canonical normalized EDS: `normEDS b c d n = preNormEDS (b^4) c d n * (if Even n then b else 1)`. Ensures correct scaling for even indices. |
| `isEllDivSequence_id` | `IsEllDivSequence id`: Identity sequence is an EDS. |
| `IsEllSequence.smul`, `IsDivSequence.smul`, `IsEllDivSequence.smul` | Closure under scalar multiplication. |
| `normEDSRec'`, `normEDSRec` | Strong recursion principles for proving properties of `normEDS` over `ℕ`. |
| `preNormEDS_even`, `preNormEDS_odd`, `normEDS_even`, `normEDS_odd` | Recursive formulas for even/odd indices, crucial for inductive proofs. |
| `map_preNormEDS'`, `map_preNormEDS`, `map_normEDS` | Compatibility of EDS constructions with ring homomorphisms. |

---

#### 2. **Naming Conventions**

- **Predicates**: `is_`, `Is_`, `is_..._id`, `is_..._smul`, `is_..._mul` — e.g., `isEllSequence`, `isDivSequence`, `isEllDivSequence`.
- **Auxiliary/Canonical constructions**: `pre_`, `norm_`, `preNormEDS`, `normEDS`, `preNormEDS'`.
- **Index parity handling**: `even`, `odd`, `even_ofNat`, `odd_ofNat`, `even_neg`, `odd_neg`.
- **Index patterns**: `2 * (m + k)`, `2 * (m + k) + 1`, `m + i`, `m - i`.
- **Multiplicative scaling**: `* b`, `* b ^ 4`, `if Even n then b else 1`.
- **Sign symmetry**: `neg`, `sign`, `natAbs`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplify using known lemmas and `if`-cases. |
| `ring1` | Prove polynomial identities in commutative rings. |
| `linear_combination` | Prove linear identities (e.g., `smul` lemmas). |
| `aesop` | Not explicitly used here, but `linarith` and `ring1` cover most arithmetic needs. |
| `linarith only` | Solve linear arithmetic goals (e.g., index inequalities in recursion). |
| `split_ifs` | Handle `if ... then ... else ...` cases. |
| `rcases` / `cases` | Decompose inductive cases (especially for `ℕ`/`ℤ` induction). |
| `induction ... using Int.negInduction` | Prove properties over `ℤ` via induction on nonnegative and negative parts. |
| `rw [...]` | Rewrite using lemmas (e.g., `preNormEDS_even`, `normEDS_ofNat`). |
| `conv_lhs => rw [...]` | Rewrite left-hand side in conv mode (e.g., for `normEDS_odd`). |

---

#### 4. **Proof Logic**

- **Induction Strategy**:
  - For `ℕ`: Use `evenOddStrongRec` or `normEDSRec'`/`normEDSRec`, splitting on parity (`Even n` vs `Odd n`) and base cases `0,1,2,3,4`.
  - For `ℤ`: Use `Int.negInduction` to handle positive and negative integers separately.
- **Parity-based case analysis**:
  - Recursive definitions and lemmas distinguish `Even n` and `Odd n`.
  - `if Even m then b else 1` patterns are simplified using `if_pos`, `if_neg`, `even_two_mul`, `not_even_two_mul_add_one`.
- **Index manipulation**:
  - Arithmetic rewrites like `2 * (m + 3) = 2 * m + 6`, `2 * m + 1 = 2 * (m) + 1`, `m - 2 = m - 1 - 1`, etc., are used to align with recursive definitions.
- **Scaling and normalization**:
  - Key insight: `normEDS` differs from `preNormEDS` by a factor of `b` on even indices, enabling division-free recursion.
  - Lemmas like `normEDS_even_ofNat` include explicit `* b` factors to preserve structure.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Nat.EvenOddRec` | Provides `evenOddStrongRec`, enabling induction on `ℕ` split by parity. |
| `Mathlib.Tactic.Linarith` | Solves linear arithmetic goals (e.g., index inequalities). |
| `Mathlib.Tactic.LinearCombination` | Used for proving identities involving linear combinations (e.g., `smul` lemmas). |

These imports reflect the formalization’s focus on **inductive definitions over `ℕ`/`ℤ`**, **parity reasoning**, and **commutative ring arithmetic**.

--- 

Let me know if you'd like a diagram of the dependency graph or a summary of the TODOs.