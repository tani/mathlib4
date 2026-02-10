### Technical Metadata Brief: Erdős–Ginzburg–Ziv Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `f₁ s a` | `MvPolynomial s (ZMod p)` | First auxiliary multivariate polynomial: `∑ i, X i ^ (p - 1)`; used to enforce that the support of a solution has size divisible by `p`. |
| `f₂ s a` | `MvPolynomial s (ZMod p)` | Second auxiliary polynomial: `∑ i : s, a i • X i ^ (p - 1)`; encodes the condition that the weighted sum is zero mod `p`. |
| `totalDegree_f₁_add_totalDegree_f₂` | Lemma | Bounds the sum of total degrees: `< 2 * p - 1`, crucial for applying Chevalley–Warning. |
| `ZMod.erdos_ginzburg_ziv_prime` | Theorem | Prime-case EGZ: For `#s = 2 * p - 1`, ∃ `t ⊆ s`, `#t = p`, `∑ t = 0` in `ZMod p`. |
| `Int.erdos_ginzburg_ziv_prime` | Theorem | Prime-case EGZ over `ℤ`: ∃ `t ⊆ s`, `#t = p`, `p ∣ ∑ t`. |
| `Int.erdos_ginzburg_ziv` | Theorem | General EGZ over `ℤ`: For `2 * n - 1 ≤ #s`, ∃ `t ⊆ s`, `#t = n`, `n ∣ ∑ t`. |
| `ZMod.erdos_ginzburg_ziv` | Theorem | General EGZ over `ZMod n`: For `2 * n - 1 ≤ #s`, ∃ `t ⊆ s`, `#t = n`, `∑ t = 0`. |
| `Int.erdos_ginzburg_ziv_multiset` | Theorem | Multiset version over `ℤ`. |
| `ZMod.erdos_ginzburg_ziv_multiset` | Theorem | Multiset version over `ZMod n`. |

---

#### **2. Naming Conventions**

- **Polynomials**: `f₁`, `f₂` — low-arity, private, named by order of use.
- **Theorems**:
  - `*_prime`: Proved for prime modulus (`p`).
  - `*_composite`: Proved for general `n` via induction on prime factorization.
  - `*_multiset`: Multiset variants (via `toEnumFinset` encoding).
- **Subproofs / Lemmas**:
  - `*_le`, `*_lt`, `*_dvd`, `*_card`, `*_sum`: Indicate inequality, divisibility, cardinality, or sum-related goals.
  - `*_eq_zero_iff_*`: Equivalence lemmas linking algebraic conditions to zero (e.g., `ZMod.intCast_zmod_eq_zero_iff_dvd`).
- **Variables**:
  - `s`: Finite set (domain of indices).
  - `a`: Sequence (function `ι → R`).
  - `t`: Subsequence/subset (often constructed via filtering or `Finset.filter`).
  - `𝒜`, `ℬ`: Families of subsets (used in composite case).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `refine`, `exact`, `cases`, `induction`, `obtain`, `exists`, `suffices`
- **Algebraic simplification**:
  - `ring`, `omega`, `gcongr`, `linarith`
- **Multiset/Finset reasoning**:
  - `card_map`, `card_attach`, `card_biUnion`, `sum_const_nat`, `sum_biUnion`, `biUnion_subset`
- **Polynomial & Chevalley–Warning**:
  - `eval_X`, `totalDegree_X_pow`, `totalDegree_finsetSum_le`, `totalDegree_smul_le`
  - `char_dvd_card_solutions_of_add_lt` (Chevalley–Warning application)
- **Logical & set-theoretic**:
  - `subset_iff`, `mem_filter`, `mem_coe`, `ne_eq`, `symmetric_disjoint`, `sdiff_disjoint`

---

#### **4. Proof Logic**

- **Prime case**:
  - Construct two polynomials `f₁`, `f₂` over `ZMod p`.
  - Use Chevalley–Warning: if number of variables > sum of degrees, then number of common roots is divisible by `p`.
  - Show `0` is a root ⇒ `N > 0`, and `p ∣ N` ⇒ `N ≥ p` ⇒ ∃ nonzero common root `x`.
  - Define `t = {i ∈ s | x i ≠ 0}`; show `#t = p` (via `f₁(x) = 0`) and `∑_{i ∈ t} a i = 0` (via `f₂(x) = 0`).

- **Composite case**:
  - Induction on `n` using `Nat.prime_composite_induction`.
  - Base cases: `n = 0`, `1`, `p` (prime) handled directly.
  - Composite step `n = m * k`:
    - Use IH on `n` to find `2m - 1` disjoint subsets of size `n` with sums divisible by `n`.
    - Apply IH on `m` to pick `m` of those subsets whose *average sum* (divided by `n`) is divisible by `m`.
    - Union of those `m` subsets gives desired subsequence of size `n = m * k` with sum divisible by `n`.

- **Multiset versions**:
  - Reduce to set version via `toEnumFinset` encoding of multisets as finite sets of indices.
  - Map back using `map Prod.fst`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Ring` | Summation over finite sets, properties of `∑`, `card`, etc. |
| `Mathlib.Data.Multiset.Fintype` | Multiset ↔ finite set encodings (`toEnumFinset`, `card`, `map`). |
| `Mathlib.FieldTheory.ChevalleyWarning` | Chevalley–Warning theorem: `char_dvd_card_solutions_of_add_lt`. |

**Key ambient structures**:
- `ZMod p` for prime `p` (field of char `p`)
- `MvPolynomial s R` for multivariate polynomials over finite index set `s`
- `CharP R p` (via `ZMod p`) for characteristic `p`
- `NeZero p`, `Fact p.Prime` for prime arithmetic

---

This module demonstrates a sophisticated blend of algebraic geometry (Chevalley–Warning), combinatorics (finite sets, disjoint families), and number theory (divisibility, modular arithmetic), formalized with high precision in Lean 4.