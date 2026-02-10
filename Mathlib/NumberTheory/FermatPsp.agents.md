### Technical Metadata Brief: Fermat Pseudoprimes in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ProbablePrime n b` | `Prop` | `n ∣ b^(n-1) - 1`: defines numbers passing Fermat primality test to base `b`. |
| `FermatPsp n b` | `Prop` | `ProbablePrime n b ∧ ¬n.Prime ∧ 1 < n`: composite numbers passing the test (i.e., Fermat pseudoprimes to base `b`). |
| `coprime_of_probablePrime` | `{n b : ℕ} → ProbablePrime n b → 1 ≤ n → 1 ≤ b → Coprime n b` | Shows that if `n` passes the test and is positive, then `n` and `b` are coprime. |
| `coprime_of_fermatPsp` | `{n b : ℕ} → FermatPsp n b → 1 ≤ b → Coprime n b` | Immediate corollary of above for pseudoprimes. |
| `probablePrime_iff_modEq` | `1 ≤ b → ProbablePrime n b ↔ b^(n-1) ≡ 1 [MOD n]` | Equivalence between divisibility and modular congruence formulation. |
| `fermatPsp_base_one` | `1 < n → ¬n.Prime → FermatPsp n 1` | All composite `n > 1` are pseudoprimes to base 1. |
| `psp_from_prime b p` | `ℕ` | Constructed number: `((b^p - 1)/(b - 1)) * ((b^p + 1)/(b + 1))`, used to generate pseudoprimes from primes. |
| `psp_from_prime_psp` | `2 ≤ b → p.Prime → 2 < p → ¬p ∣ b*(b^2 - 1) → FermatPsp (psp_from_prime b p) b` | Core construction: shows `psp_from_prime b p` is a pseudoprime under conditions. |
| `psp_from_prime_gt_p` | `2 ≤ b → p.Prime → 2 < p → p < psp_from_prime b p` | Ensures generated pseudoprime exceeds the prime used in construction. |
| `exists_infinite_pseudoprimes` | `1 ≤ b → ∀ m, ∃ n ≥ m, FermatPsp n b` | Main result: infinitely many pseudoprimes to any base `b ≥ 1`. |
| `frequently_atTop_fermatPsp` | `1 ≤ b → ∃ᶠ n in atTop, FermatPsp n b` | Filter-theoretic reformulation: pseudoprimes are cofinal in `ℕ`. |
| `infinite_setOf_pseudoprimes` | `1 ≤ b → Set.Infinite {n | FermatPsp n b}` | Set-theoretic infinitude of pseudoprimes. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `probablePrime_`: properties of `ProbablePrime`.
  - `fermatPsp_`: properties of `FermatPsp`.
  - `psp_from_prime_`: lemmas about the construction function `psp_from_prime`.
  - `coprime_of_`: implications from coprimality or related conditions.
- **Suffixes**:
  - `_iff_modEq`: equivalence with modular condition.
  - `_gt_p`, `_ge_two`, `_lt_...`: inequality-based lemmas.
  - `_helper`: internal technical lemmas (e.g., `a_id_helper`, `bp_helper`).
- **Function names**:
  - `psp_from_prime`: constructs pseudoprime from prime.
  - `psp_from_prime_psp`: proves pseudoprimality of the constructed number.

---

#### **3. Tactic Stack**

Frequent use of:
- `rw` / `rwa`: rewriting with equalities and assumptions.
- `simp` / `simp_rw`: simplification with arithmetic and divisibility lemmas.
- `exact`, `apply`, `refine`: proof construction.
- `have`, `suffices`: intermediate lemma introduction.
- `cases'`: case analysis on `Odd p`, `Nat.Prime`, etc.
- `omega`: handling arithmetic inequalities and linear arithmetic.
- `norm_num`: simplifying numeric expressions.
- `nlinarith`: nonlinear arithmetic (e.g., bounding powers).
- `convert`: equational reasoning with typeclass inference.
- `mod_cast`: lifting modular arithmetic from `ℕ` to `ℤ` and back.
- `div_lt_div_of_lt_of_dvd`, `mul_dvd_mul`, `dvd_trans`: divisibility reasoning.

---

#### **4. Proof Logic**

- **Structure**:
  - **Case split** on `2 ≤ b` (or `b = 1`) in `exists_infinite_pseudoprimes`.
  - For `b ≥ 2`: use infinitude of primes to pick `p > m` with `¬p ∣ b(b²−1)`, then apply `psp_from_prime_psp`.
  - For `b = 1`: construct explicit composite `2(m+2)`.
- **Core construction proof (`psp_from_prime_psp`)**:
  - Define `A`, `B`, and `AB = A * B`.
  - Show `AB > 1` and `¬AB.Prime`.
  - Reduce goal to `AB ∣ b^(AB−1) − 1`.
  - Use algebraic identities (`AB_id`, `bp_helper`) to relate `AB−1` to `b^(2p)−1`.
  - Prove divisibility chain:
    - `2p ∣ AB−1` via `ha₅`, `ha₆`.
    - `AB ∣ b^(2p)−1` via `ha₇`.
    - `b^(2p)−1 ∣ b^(AB−1)−1` via `ha₈`.
    - Conclude via `dvd_trans`.
- **Infinitude**:
  - Leverages `psp_from_prime_gt_p` to ensure unboundedness.
  - Uses `Filter.frequently_atTop_iff_infinite` to lift to filter/set infinitude.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.FieldTheory.Finite.Basic`: for finite field tools (e.g., `Int.ModEq.pow_card_sub_one_eq_one`, used in Fermat’s Little Theorem).
  - `Mathlib.Order.Filter.Cofinite`: for filter-based infinitude statements (`atTop`, `frequently_atTop`).
- **Domain scope**:
  - Elementary number theory: divisibility, primality, coprimality, modular arithmetic.
  - Constructive existence proofs for pseudoprimes.
  - No reliance on advanced algebraic number theory (e.g., no Carmichael numbers defined yet).

---

This metadata reflects a formalization focused on **constructive infinitude results** for Fermat pseudoprimes, with heavy use of arithmetic lemmas and careful handling of edge cases (e.g., base 1, small `n`). The structure is modular, with helper lemmas isolated in `HelperLemmas` section, and the main theorems built from reusable constructions.