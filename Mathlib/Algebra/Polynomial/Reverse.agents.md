### Technical Brief: Polynomial Reverse in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `revAtFun N i` | `ℕ → ℕ → ℕ` | Unbundled map: `i ↦ N - i` if `i ≤ N`, else `i`. Used internally; not injective unless restricted. |
| `revAt N` | `ℕ ↪ ℕ` | Bounded embedding (involution): reverses indices ≤ `N`. Key for coefficient reversal. |
| `reflect N f` | `R[X] → R[X]` | Reverses coefficients of `f` up to degree `N`: `coeff (reflect N f) i = f.coeff (revAt N i)`. Acts like `X^N * f(1/X)` truncated. |
| `reverse f` | `R[X] → R[X]` | Main definition: `reflect f.natDegree f`. Satisfies `reverse f = X^deg(f) * f(1/X)` formally. |
| `coeff_reverse` | `f.reverse.coeff n = f.coeff (revAt f.natDegree n)` | Coefficient-wise description of `reverse`. |
| `reverse_natDegree` | `f.reverse.natDegree = f.natDegree - f.natTrailingDegree` | Relates degrees of `f` and `reverse f`. |
| `reverse_leadingCoeff` | `f.reverse.leadingCoeff = f.trailingCoeff` | Leading coefficient of reverse = trailing coefficient of original. |
| `reverse_trailingCoeff` | `f.reverse.trailingCoeff = f.leadingCoeff` | Trailing coefficient of reverse = leading coefficient of original. |
| `reverse_mul` | `f.leadingCoeff * g.leadingCoeff ≠ 0 → reverse (f * g) = reverse f * reverse g` | Multiplicativity of `reverse` under non-vanishing leading product. |
| `reverse_mul_of_domain` | `[NoZeroDivisors R] ⇒ reverse (f * g) = reverse f * reverse g` | Multiplicativity in integral domains (no zero-divisors). |
| `eval₂_reverse_mul_pow` | `eval₂ i (⅟x) (reverse f) * x^deg(f) = eval₂ i x f` | Evaluation identity: `reverse f` encodes `f(1/x)` scaled by `x^deg(f)`. |
| `eval₂_reverse_eq_zero_iff` | `eval₂ i (⅟x) (reverse f) = 0 ↔ eval₂ i x f = 0` | Zeros of `reverse f` at `⅟x` correspond to zeros of `f` at `x` (for invertible `x`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `revAt*`: Embedding/involution on indices (e.g., `revAt`, `revAtFun`, `revAt_invol`, `revAt_le`).
  - `reflect*`: Polynomial transformation (e.g., `reflect`, `reflect_add`, `reflect_C_mul_X_pow`).
  - `reverse*`: Main operation (e.g., `reverse`, `reverse_mul`, `reverse_natDegree`).
- **Suffixes**:
  - `_invol`: Involution property (`revAt_invol`, `revAtFun_invol`).
  - `_le`, `_lt`: Inequality lemmas (`revAt_le`, `reverse_natDegree_le`).
  - `_eq_zero_iff`: Equivalence with zero (`reverse_eq_zero`, `eval₂_reverse_eq_zero_iff`).
  - `_mul_pow`, `_eq_zero_iff`: Evaluation-related lemmas.
- **Special**:
  - `nextCoeff`: Defined as `coeff f 1` when `natDegree f = 1`, else 0 (used in `coeff_one_reverse`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (e.g., `coeff_reverse`, `revAt_le`), often with conditional simplification. |
| `simp` / `simp only` | Simplifying goals using lemmas like `revAt_invol`, `revAt_le`, `coeff_reflect`. |
| `split_ifs` | Handling `ite` (if-then-else) expressions in definitions (`revAtFun`, `revAt`). |
| `rcases` / `cases` | Decomposing existential/inequality hypotheses (e.g., `Nat.le.dest`). |
| `induction'` | Nested induction on support size/cardinality (e.g., `reflect_mul_induction`). |
| `ext` | Extensionality for polynomials (proving equality by coefficients). |
| `conv` | Focusing on subterms for rewriting (e.g., `conv in x ^ N => rw [...]`). |
| `nontriviality` | Ensuring ring is nontrivial (needed for some lemmas like `reverse_mul_X`). |
| `exact`, `assumption`, `try assumption` | Closing trivial subgoals. |
| `tsub_tsub_cancel_of_le`, `add_tsub_cancel_left`, etc. | Arithmetic lemmas for natural number subtraction. |

---

#### **4. Proof Logic**

- **Structure of `reflect_mul_induction`**:
  - Double induction on `cf = #f.support`, `cg = #g.support`.
  - Base case (`cf = 0`, `cg = 0`): Polynomials are monomials `C c * X^n`; use `revAt_add` and `X_pow_mul`.
  - Inductive steps: Decompose `f` or `g` via `eraseLead_add_C_mul_X_pow`, apply induction hypothesis, and simplify using `reflect_add`, `mul_add`, etc.
- **Proof of `reverse_mul`**:
  - Uses `natDegree_mul'` (degree of product under nonzero leading coeff condition).
  - Reduces to `reflect_mul` with `N = f.natDegree`, `O = g.natDegree`.
- **Evaluation lemmas**:
  - Prove `eval₂_reflect_mul_pow` by induction on `natDegree_le`.
  - Base case: monomials (`C c * X^n`), use `invOf_mul_self`.
  - Inductive step: linearity and induction hypothesis.
- **Degree/trailing-degree relations**:
  - Use `le_antisymm` with `natTrailingDegree_le_of_ne_zero` and `trailingCoeff_nonzero_iff_nonzero`.
  - Key lemma: `natDegree_eq_reverse_natDegree_add_natTrailingDegree`.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Algebra.Polynomial.Degree.TrailingDegree
  import Mathlib.Algebra.Polynomial.EraseLead
  ```
- **Scope**:
  - `Polynomial` namespace.
  - Works over `Semiring R` (additive monoid + scalar multiplication), extended to `Ring R` for negation/subtraction.
  - Evaluation lemmas require `CommSemiring S` and `Invertible x`.
  - Multiplicativity in domains uses `[NoZeroDivisors R]`.

---

#### **6. Summary**

This file formalizes the *reverse* of a univariate polynomial over a semiring, defined as `X^deg(f) * f(1/X)`. It establishes:
- Structural properties (`coeff`, `natDegree`, `leadingCoeff`, `trailingCoeff`).
- Multiplicativity under mild conditions (nonzero leading product).
- Evaluation correspondence with `f(1/x)` via scaling.
- Applications in algebraic reasoning (e.g., `reverse_mul_of_domain` in integral domains).

The design leverages `revAt` (an involution on indices) and `reflect` (a flexible coefficient reversal tool), with proofs relying heavily on induction and arithmetic simplifications.