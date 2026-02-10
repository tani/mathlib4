### Technical Brief: Polynomial Degree Analysis in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eq_X_add_C_of_degree_le_one` | `degree p ≤ 1 → p = C (p.coeff 1) * X + C (p.coeff 0)` | Characterizes polynomials of degree ≤ 1 as linear expressions `a·X + b`. |
| `eq_X_add_C_of_degree_eq_one` | `degree p = 1 → p = C p.leadingCoeff * X + C (p.coeff 0)` | Refines the above for *exact* degree 1, using leading coefficient. |
| `eq_X_add_C_of_natDegree_le_one` | `natDegree p ≤ 1 → p = C (p.coeff 1) * X + C (p.coeff 0)` | Same as first, but uses `natDegree` (finite degree, 0 for zero poly). |
| `Monic.eq_X_add_C` | `p.Monic → p.natDegree = 1 → p = X + C (p.coeff 0)` | Monic degree-1 polynomials are exactly `X + b`. |
| `exists_eq_X_add_C_of_natDegree_le_one` | `natDegree p ≤ 1 → ∃ a b, p = C a * X + C b` | Existential form of linear polynomial representation. |
| `degree_linear_le`, `degree_linear_lt` | `degree (C a * X + C b) ≤ 1`, `< 2` | Upper bounds on degree of linear polynomials. |
| `degree_linear` | `a ≠ 0 → degree (C a * X + C b) = 1` | Exact degree when leading coefficient nonzero. |
| `natDegree_linear`, `leadingCoeff_linear` | `a ≠ 0 → natDegree = 1`, `leadingCoeff = a` | Companion facts for natDegree and leading coefficient. |
| `degree_quadratic_le`, `degree_quadratic_lt` | `≤ 2`, `< 3` for quadratic | Bounds for degree-2 polynomials. |
| `degree_quadratic` | `a ≠ 0 → degree = 2` | Exact degree for quadratic with nonzero `a`. |
| `natDegree_quadratic`, `leadingCoeff_quadratic` | `a ≠ 0 → natDegree = 2`, `leadingCoeff = a` | Nat degree & leading coefficient for quadratics. |
| `degree_cubic_le`, `degree_cubic_lt` | `≤ 3`, `< 4` for cubic | Bounds for degree-3 polynomials. |
| `degree_cubic` | `a ≠ 0 → degree = 3` | Exact degree for cubic with nonzero `a`. |
| `natDegree_cubic`, `leadingCoeff_cubic` | `a ≠ 0 → natDegree = 3`, `leadingCoeff = a` | Nat degree & leading coefficient for cubics. |
| `zero_le_degree_iff` | `0 ≤ degree p ↔ p ≠ 0` | Connects degree non-negativity to non-zero-ness. |
| `ne_zero_of_coe_le_degree` | `↑n ≤ degree p → p ≠ 0` | If a natural number ≤ degree, polynomial is nonzero. |
| `le_natDegree_of_coe_le_degree` | `↑n ≤ degree p → n ≤ natDegree p` | Relates degree and natDegree bounds. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `degree_` / `natDegree_` / `leadingCoeff_`: Indicates focus on degree-related invariants.
  - `eq_X_add_C_`: Polynomials equal to `C a * X + C b` (linear form).
  - `linear`, `quadratic`, `cubic`: Degree-specific structure theorems.
- **Suffixes**:
  - `_le`, `_lt`: Upper bounds (`≤ n`, `< n+1`).
  - `_eq`: Exact degree (`= n`) under nonzero leading coefficient.
  - `_iff`: Biconditional characterizations (e.g., `zero_le_degree_iff`).
- **Pattern**: `degree_<type>[_<cond>]` — e.g., `degree_linear`, `degree_quadratic (ha : a ≠ 0)`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `ext`: Extensionality for polynomial equality (coefficient-wise).
  - `simp` / `simp_rw`: Simplification using `coeff_C`, `coeff_X`, `coeff_eq_zero_of_degree_lt`, etc.
  - `rw`: Rewriting with lemmas like `degree_add_eq_left_of_degree_lt`, `natDegree_eq_of_degree_eq_some`.
  - `exact`, `refine`, `apply`: For direct proof steps.
- **Advanced/auxiliary**:
  - `Nat.casesOn`: Structural induction on naturals (used in `eq_X_add_C_of_degree_le_one`).
  - `lt_of_le_of_lt`, `le_trans`: Transitivity of order.
  - `WithBot.coe_lt_coe`, `WithBot.coe_le_coe`: Manipulation of `ℕ∞` (bot-inclusive naturals).
  - `rwa`: Rewrite + assumption (used in porting notes).
- **No heavy automation** (e.g., `aesop`, `ring`, `linarith`) — proofs are mostly manual, leveraging degree lemmas.

---

#### **4. Proof Logic & Strategy**

- **Structure**:
  - **Case analysis** on degree/natDegree (e.g., `Nat.casesOn` for low degrees).
  - **Inductive decomposition** of polynomials via coefficients (`ext` + `coeff` lemmas).
  - **Degree comparison** via `degree_add_eq_left_of_degree_lt` — key for exact degree proofs (e.g., cubic = 3 because `X³` term dominates).
  - **Leading coefficient analysis**: Nonzero leading coefficient ensures degree is attained.
- **Common pattern**:
  1. Bound degree from above (`≤ n`).
  2. Show strict inequality for lower-degree terms (`< n`).
  3. Apply `degree_add_eq_left_of_degree_lt` to get exact degree `n`.
  4. Derive `natDegree` and `leadingCoeff` via `natDegree_eq_of_degree_eq_some` / `leadingCoeff_add_of_degree_lt`.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Algebra.Polynomial.Degree.Operations`: Core degree arithmetic (addition, multiplication, bounds).
  - `Mathlib.Data.Nat.WithBot`: Enables `degree : R[X] → ℕ∞` (with `⊥` for zero polynomial).
- **Scope**:
  - **Semiring context**: All results hold for `Semiring R` (no need for `Ring` or `Field`).
  - **Polynomial ring `R[X]`** over arbitrary semiring `R`.
  - Focus on **low-degree polynomials** (≤ 3), especially linear, quadratic, cubic forms.

---

### Summary

This module formalizes foundational structural results for low-degree polynomials over semirings. It emphasizes:
- Exact characterization of degree-≤1 polynomials as `aX + b`.
- Exact degree computation for linear/quadratic/cubic polynomials under nonzero leading coefficient.
- Systematic use of degree comparison lemmas (`degree_add_eq_left_of_degree_lt`) and `WithBot` order reasoning.

The proofs are constructive and rely on coefficient-level reasoning and degree inequalities — typical of Mathlib’s “computable” style.