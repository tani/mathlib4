### Technical Brief: Polynomial Division in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `divByMonic` | `R[X] → R[X] → R[X]` | Computes quotient of polynomial division by a **monic** polynomial. |
| `modByMonic` | `R[X] → R[X] → R[X]` | Computes remainder of polynomial division by a **monic** polynomial. |
| `modByMonic_add_div` | `p %ₘ q + q * (p /ₘ q) = p` | Fundamental identity: dividend = divisor × quotient + remainder. |
| `degree_modByMonic_lt` | `degree (p %ₘ q) < degree q` | Ensures remainder has strictly smaller degree than divisor. |
| `divByMonic_eq_zero_iff` | `p /ₘ q = 0 ↔ degree p < degree q` | Characterizes when quotient is zero. |
| `modByMonic_eq_zero_iff_dvd` | `p %ₘ q = 0 ↔ q ∣ p` | Connects divisibility to zero remainder. |
| `rootMultiplicity` | `R → R[X] → ℕ` | Largest `n` such that `(X - a)^n ∣ p`. Defined via `Nat.find` on finite multiplicity. |
| `finiteMultiplicity_X_sub_C` | `FiniteMultiplicity (X - C a) p` (for `p ≠ 0`) | Guarantees existence of maximal power of linear factor dividing `p`. |
| `mul_divByMonic_cancel_left` | `q * p /ₘ q = p` | Left-cancellation for monic divisor. |
| `eval_divByMonic_pow_rootMultiplicity_ne_zero` | `eval a (p /ₘ (X - C a)^n) ≠ 0` | Quotient after factoring out all `(X - a)` factors has nonzero evaluation at `a`. |
| `dvd_iff_isRoot` | `X - C a ∣ p ↔ IsRoot p a` | Links divisibility by linear polynomial to root property. |
| `modByMonic_X_sub_C_eq_C_eval` | `p %ₘ (X - C a) = C (p.eval a)` | Remainder modulo linear polynomial is constant polynomial of evaluation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `divByMonic`, `modByMonic`: indicate division/modulo by monic polynomials.
  - `rootMultiplicity`: standard mathematical term.
  - `finiteMultiplicity`, `multiplicity_*`: multiplicity-related concepts.
- **Suffixes**:
  - `_eq_of_*`: characterizations or simplifications under conditions (e.g., `modByMonic_eq_self_iff`).
  - `_iff_*`: biconditional theorems (e.g., `dvd_iff_isRoot`, `divByMonic_eq_zero_iff`).
  - `_le`, `_lt`: degree/natDegree inequalities (e.g., `degree_modByMonic_lt`, `natDegree_divByMonic`).
- **Infixes**:
  - `/ₘ`, `%ₘ`: custom infixes for `divByMonic` and `modByMonic`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities (e.g., `modByMonic_add_div`, `degree_eq_natDegree`). |
| `simp` / `simp_rw` | Simplification with lemmas (especially `@[simp]` theorems like `zero_modByMonic`, `modByMonic_one`). |
| `cases` / `obtain` / `rcases` | Case analysis on hypotheses (e.g., `h : degree q ≤ degree p ∧ p ≠ 0`). |
| `exact` / `apply` | Direct proof steps, often after `have` or `obtain`. |
| `calc` | Chain of inequalities/equalities (e.g., degree comparisons). |
| `nontriviality R` | Ensures ring is nontrivial (needed for degree arguments). |
| `by_cases` | Splitting on decidability or boolean conditions (e.g., `hq : Monic q`). |
| `aesop` / `linarith` | Not explicitly used here, but `ring`, `linarith`, and `omega` may appear in related files. |
| `induction` | Used in `X_pow_dvd_iff`, `finiteMultiplicity_of_degree_pos_of_monic`. |
| `termination_by` | For recursive definitions (`divModByMonicAux`). |

---

#### **4. Proof Logic**

- **Inductive/Recursive Structure**:
  - `divModByMonicAux` is defined recursively on `p`, with termination measure `p`.
  - Induction on `n` in `X_pow_dvd_iff`.
  - Induction on multiplicity in `finiteMultiplicity_of_degree_pos_of_monic`.

- **Common Proof Patterns**:
  - **Degree-based reasoning**: comparing degrees of polynomials via `degree_mul'`, `degree_add_eq_right_of_degree_lt`, `degree_sub_le`.
  - **Leading coefficient analysis**: using `Monic.def`, `leadingCoeff_pow'`, `leadingCoeff_eq_zero`.
  - **Uniqueness of division**: `div_modByMonic_unique` is repeatedly used to prove correctness of quotient/remainder.
  - **Evaluation-based arguments**: especially for linear divisors (`X - C a`), via `eval₂_modByMonic_eq_self_of_root`, `modByMonic_X_sub_C_eq_C_eval`.
  - **Multiplicativity & commutativity**: used in `CommRing` section for `mul_self_modByMonic`, `map_mod_divByMonic`.

- **Classical vs Constructive**:
  - `rootMultiplicity` uses `Classical.decEq R` and `Classical.find`, but `rootMultiplicity_eq_nat_find_of_nonzero` shows it’s computable if `DecidableEq R` is provided.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Field.IsField` | For `IsField`, used in `not_isField`. |
| `Mathlib.Algebra.Polynomial.Inductions` | For induction principles on polynomials. |
| `Mathlib.Algebra.Polynomial.Monic` | Definitions and properties of monic polynomials. |
| `Mathlib.Algebra.Ring.Regular` | Regular elements, used in multiplicity context. |
| `Mathlib.RingTheory.Multiplicity` | General multiplicity theory (`multiplicity`, `finiteMultiplicity`). |
| `Mathlib.Data.Nat.Lattice` | Natural number lattice operations (e.g., `Nat.find`). |

---

### Summary

This file formalizes **division with remainder for univariate polynomials over semirings/rings**, focusing on **monic divisors** to ensure well-definedness. It introduces:
- Algorithmic definitions (`divByMonic`, `modByMonic`) with correctness theorems.
- Degree and coefficient analysis.
- Application to **root multiplicity**, linking algebraic divisibility to evaluation roots.
- Mapping properties under ring homomorphisms.

The structure reflects Lean’s modular design: core definitions in `Semiring`, extended in `Ring`, and specialized in `CommRing`.