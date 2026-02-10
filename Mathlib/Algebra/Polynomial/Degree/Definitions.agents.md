### Technical Brief: Polynomial Degree Formalization in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `degree` | `R[X] → WithBot ℕ` | Returns the highest exponent with nonzero coefficient; `0` maps to `⊥` (bottom element). |
| `natDegree` | `R[X] → ℕ` | Same as `degree`, but forces result to `ℕ` by defining `natDegree 0 = 0`. |
| `leadingCoeff` | `R[X] → R` | Returns the coefficient of the highest-degree term. |
| `Monic` | `R[X] → Prop` | Predicate: `p.Monic ↔ leadingCoeff p = 1`. |
| `nextCoeff` | `R[X] → R` | Returns the coefficient just below the leading term (or `0` if degree is `0`). |
| `degree_eq_natDegree` | `p ≠ 0 → degree p = (natDegree p : WithBot ℕ)` | Shows `degree` and `natDegree` agree on nonzero polynomials. |
| `degree_zero` | `degree (0 : R[X]) = ⊥` | Degree of zero polynomial is bottom. |
| `natDegree_zero` | `natDegree (0 : R[X]) = 0` | Natural degree of zero polynomial is `0`. |
| `degree_C` | `a ≠ 0 → degree (C a) = 0` | Degree of nonzero constant polynomial is `0`. |
| `degree_X` | `degree X = 1` | Degree of indeterminate `X` is `1`. |
| `degree_mul_le` | `degree (p * q) ≤ degree p + degree q` | Subadditivity of degree under multiplication. |
| `degree_add_le` | `degree (p + q) ≤ max (degree p) (degree q)` | Degree of sum is bounded by max of degrees. |
| `degree_sub_lt` | Under conditions (`p ≠ q`, equal leading coeffs, equal degrees), `degree (p - q) < degree p` | Used to prove cancellation in subtraction when leading terms cancel. |
| `monic_X`, `monic_X_pow` | `Monic X`, `Monic (X ^ n)` | `X` and its powers are monic. |
| `leadingCoeff_X_pow` | `leadingCoeff (X ^ n) = 1` | Leading coefficient of `X^n` is `1`. |

---

#### **2. Naming Conventions**

- **Predicates**: `Monic`, `nextCoeff` (noun-style), `leadingCoeff` (noun phrase).
- **Properties/relations**:
  - `degree_*`, `natDegree_*`, `leadingCoeff_*`: e.g., `degree_zero`, `natDegree_C`, `leadingCoeff_eq_zero`.
  - `*_le`, `*_lt`, `*_eq`: e.g., `degree_le_natDegree`, `degree_lt_iff_coeff_zero`, `natDegree_eq_zero_iff_degree_le_zero`.
- **Equivalence lemmas**:
  - `*_iff_*`: e.g., `degree_eq_bot ↔ p = 0`, `leadingCoeff_eq_zero ↔ p = 0`.
- **Special cases**:
  - `*_C`, `*_X`, `*_X_pow`, `*_monomial`: e.g., `degree_C`, `natDegree_X`, `leadingCoeff_monomial`.
- **Quantifier-style**:
  - `*_of_*`, `*_of_*_le`: e.g., `degree_add_le_of_degree_le`, `natDegree_mul_le_of_le`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplify using `@[simp]` lemmas (e.g., `degree_zero`, `natDegree_C`, `leadingCoeff_C`). |
| `rw` / `conv` | Rewrite using equalities (e.g., `degree_eq_natDegree`, `C_mul_X_pow_eq_monomial`). |
| `cases'` / `rcases` | Case analysis on `WithBot`, `ne`, `eq`, or `Finset` structures. |
| `exact`, `apply`, `calc` | Chain proofs using transitivity (e.g., `degree_add_le`, `degree_mul_le`). |
| `aesop` | Automated reasoning for propositional logic and simple arithmetic. |
| `unfold`, `intro`, `contrapose!` | Manual proof structure (e.g., `degree_eq_bot`, `leadingCoeff_eq_zero`). |
| `split_ifs` | Handle `if ... then ... else ...` definitions (e.g., `nextCoeff`, `natDegree_monomial`). |
| `nontriviality` | Prove `Nontrivial R` from assumptions like `0 ≠ 1`. |
| `with_bot`-specific lemmas | `WithBot.coe_eq_coe`, `WithBot.unbot'_le_iff`, `bot_le`, `lt_of_le_of_ne`. |

---

#### **4. Proof Logic Patterns**

- **Induction**: Used for `degree_pow_le`, `natDegree_pow_le`, `degree_sum_le`.
- **Case analysis on `p = 0` / `p ≠ 0`**: Critical for distinguishing `⊥` vs. `some n` in `degree`.
- **Support-based reasoning**: Leverages `support`, `mem_support_iff`, `Finset.max`, `sup`:
  - E.g., `degree_eq_bot ↔ p = 0`, `degree_le_iff_coeff_zero`.
- **`WithBot`-based comparisons**:
  - Use `WithBot.giUnbot'Bot.gc.le_u_l`, `unbot'_le_iff`, `coe_lt_coe`, etc., to bridge `WithBot ℕ` and `ℕ`.
- **Cancellation arguments**:
  - `degree_sub_lt` uses decomposition `p = monomial + erase`, then bounds degree of difference.
- **Monic-specific reasoning**:
  - `Monic p → p ≠ 0` via `leadingCoeff p = 1 ≠ 0` (requires `Nontrivial R`).

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.MonoidAlgebra.Degree`: General degree theory for `Σ`-supported functions.
- `Mathlib.Algebra.Order.Ring.WithTop`: `WithBot`/`WithTop` order theory.
- `Mathlib.Algebra.Polynomial.Basic`: Core polynomial definitions (`coeff`, `support`, `C`, `X`, `monomial`, etc.).
- `Mathlib.Data.Nat.Cast.WithTop`: Casting `ℕ` into `WithBot`.

**Scope**:
- **Algebraic**: Semirings, rings, nontriviality assumptions.
- **Order-theoretic**: Use of `WithBot ℕ` with `⊥`, `≤`, `<`.
- **Polynomial-specific**: Degree, natDegree, leading coefficient, monic, multiplication/addition/subtraction behavior.

---

#### **6. Notable Design Choices**

- **Noncomputable section**: `degree` is noncomputable due to use of `max` on finite sets.
- **`WithBot ℕ` encoding**: Allows uniform treatment of zero polynomial (`⊥`) and nonzero (`some n`).
- **`natDegree` as `unbot' 0`**: Ensures total function to `ℕ`, convenient for induction.
- **`nextCoeff` as conditional**: Handles constants separately (`natDegree = 0 → nextCoeff = 0`).
- **`degree_le_iff_coeff_zero`**: Characterizes degree via vanishing of higher coefficients — key for reasoning about degree bounds.

--- 

This formalization is a canonical example of *structured algebraic reasoning* in Lean, balancing generality (semirings/rings), order-theoretic precision (`WithBot`), and usability (many `@[simp]` lemmas).