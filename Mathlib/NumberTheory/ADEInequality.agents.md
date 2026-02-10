### Technical Metadata Brief: `ADEInequality` Module in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `A' q r` | `ℕ+ → ℕ+ → Multiset ℕ+` | Multiset `{1, q, r}` — family of admissible solutions parameterized by `q, r`. |
| `A r` | `ℕ+ → Multiset ℕ+` | Special case `A' 1 r`, i.e., `{1,1,r}`. |
| `D' r` | `ℕ+ → Multiset ℕ+` | Multiset `{2, 2, r}` — another family of admissible solutions. |
| `E' r` | `ℕ+ → Multiset ℕ+` | Multiset `{2, 3, r}`; only admissible for `r = 3, 4, 5`. |
| `E6`, `E7`, `E8` | `Multiset ℕ+` | Concrete admissible multisets `{2,3,3}`, `{2,3,4}`, `{2,3,5}`. |
| `sumInv pqr` | `Multiset ℕ+ → ℚ` | Computes sum of inverses of elements in `pqr` as rational number. |
| `Admissible pqr` | `Prop` | Predicate stating `pqr` is one of the classified forms (`A'`, `D'`, `E6`, `E7`, `E8`). |
| `admissible_*` (e.g., `admissible_A'`, `admissible_D'`, etc.) | `Admissible (...)` | Proofs that specific multisets are admissible. |
| `Admissible.one_lt_sumInv` | `Admissible pqr → 1 < sumInv pqr` | Soundness: all admissible multisets satisfy the inequality. |
| `lt_three`, `lt_four`, `lt_six` | Bounds on components under inequality | Lemmas bounding `p`, `q`, `r` assuming `1 < sumInv {p,q,r}`. |
| `admissible_of_one_lt_sumInv_aux'` | Main classification step | Shows any sorted triple satisfying the inequality is admissible. |
| `admissible_of_one_lt_sumInv_aux` | Extension to lists | Handles sorted lists of length 3. |
| `admissible_of_one_lt_sumInv` | `1 < sumInv {p,q,r} → Admissible {p,q,r}` | Completeness: any solution is admissible. |
| `classification` | `1 < sumInv {p,q,r} ↔ Admissible {p,q,r}` | Full equivalence: classification theorem. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `A'`, `D'`, `E'`: families of solutions (prime indicates parameterized versions).
  - `admissible_`: proofs of admissibility for specific cases.
  - `lt_`: lemmas bounding variables using inequality.
- **Suffixes**:
  - `_aux`, `_aux'`: internal auxiliary lemmas.
  - `_pqr`: lemmas specialized to 3-element multisets `{p,q,r}`.
- **Other patterns**:
  - `sumInv_*`: lemmas about `sumInv`.
  - `classification`: final equivalence theorem.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise lemmas (e.g., `sumInv_pqr`, `add_assoc`, `inv_pos`). |
| `norm_num` | Numerical verification (e.g., `3⁻¹ + 3⁻¹ + 3⁻¹ = 1`). |
| `contrapose!` | Turning inequality proofs into contrapositive forms. |
| `rw [...]` | Rewriting using equalities (e.g., `← H`, `hpqr`). |
| `calc` | Chain of inequalities (used in bounding arguments). |
| `interval_cases`, `fin_cases` | Exhaustive case analysis on small finite domains (e.g., `p ∈ {1,2}`). |
| `apply`, `exact`, `assumption_mod_cast` | Proof automation and type coercion handling. |
| `conv` | Focused rewriting (e.g., `change p ∈ ({1, 2} : Multiset ℕ+)`). |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Soundness**: Show all `Admissible` multisets satisfy `1 < sumInv`.
     - Done by case analysis on the disjunction in `Admissible`, simplifying `sumInv`, and verifying numerically.
  2. **Completeness**:
     - Assume `1 < sumInv {p,q,r}`.
     - Sort the multiset to get a non-decreasing triple `p ≤ q ≤ r`.
     - Use bounding lemmas (`lt_three`, `lt_four`, `lt_six`) to restrict possible values:
       - `p ∈ {1,2}`
       - `q ∈ {2,3}` (if `p = 2`)
       - `r ∈ {3,4,5}` (if `p = 2, q = 3`)
     - Exhaustively check each case via `fin_cases`/`interval_cases`, mapping each to a known admissible form.
  3. **Equivalence**:
     - Combine soundness and completeness into `classification`.

- **Key Insight**: The inequality strongly restricts the search space due to rapid decay of reciprocals; only small integers satisfy it.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Ring.Rat` | Rational numbers as an ordered field; needed for `inv_pos`, `inv_le_inv₀`, `norm_num`. |
| `Mathlib.Data.Multiset.Sort` | Sorting multisets; used in `sort_eq`, `sort_sorted`. |
| `Mathlib.Data.PNat.Basic`, `Mathlib.Data.PNat.Interval` | Positive naturals (`ℕ+`), interval reasoning, casting to `ℕ`. |
| `Mathlib.Tactic.NormNum` | Numerical normalization (e.g., verifying `2⁻¹ + 3⁻¹ + 6⁻¹ = 1`). |
| `Mathlib.Tactic.IntervalCases` | Case analysis on bounded integer variables (e.g., `p < 3 ⇒ p = 1 ∨ 2`). |

---

### Summary

This module formalizes a classical result from Lie theory: the classification of positive integer triples `(p,q,r)` satisfying `p⁻¹ + q⁻¹ + r⁻¹ > 1`. It leverages Lean’s multiset and ordered field infrastructure to encode and verify the finite list of solutions, mirroring the ADE classification of Dynkin diagrams. The proof strategy combines bounding arguments, case analysis, and numerical verification — all formalized with high precision.