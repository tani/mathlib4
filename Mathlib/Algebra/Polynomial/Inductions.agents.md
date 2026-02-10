### Technical Metadata Brief: Induction Principles for Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `divX` | `R[X] → R[X]` | Extracts the "quotient" when dividing a polynomial by `X`, i.e., shifts coefficients down by one degree: `(divX p).coeff n = p.coeff (n+1)`. Used for structural induction on polynomials. |
| `divX_hom` | `R[X] →+ R[X]` | Additive group homomorphism version of `divX`. |
| `divX_mul_X_add` | `divX p * X + C (p.coeff 0) = p` | Fundamental identity: reconstructs `p` from `divX p` and its constant term. |
| `X_mul_divX_add` | `X * divX p + C (p.coeff 0) = p` | Left-multiplication variant of above. |
| `divX_eq_zero_iff` | `divX p = 0 ↔ p = C (p.coeff 0)` | Characterizes when `divX p` vanishes. |
| `natDegree_divX_eq_natDegree_tsub_one` | `p.divX.natDegree = p.natDegree - 1` | Relates natural degrees under `divX`. |
| `degree_divX_lt` | `p ≠ 0 ⇒ (divX p).degree < p.degree` | Strict decrease of degree under `divX`, key for well-founded induction. |
| `recOnHorner` | Induction principle (Sort-valued) | Structural induction on polynomials using `divX` and constant-term decomposition (Horner form). |
| `degree_pos_induction_on` | Prop-valued induction | Induction on polynomials of positive degree, using multiplication by `X`, addition of constants, and base cases `a * X`. |
| `natDegree_ne_zero_induction_on` | Prop-valued induction | Induction on polynomials with nonzero *natural* degree, avoiding explicit multiplication: uses monomials, addition, and constant addition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `divX_`: All lemmas about the `divX` operation.
  - `recOnHorner`, `degree_pos_induction_on`, `natDegree_ne_zero_induction_on`: Standard `recOn`/`induction_on` naming for elimination principles.
- **Suffixes**:
  - `_hom`: Homomorphic version of a function (`divX_hom`).
  - `_le`, `_lt`, `_eq`: Comparison lemmas (`natDegree_divX_le`, `degree_divX_lt`, `divX_eq_zero_iff`).
- **Functional patterns**:
  - `C a`, `X ^ n`, `monomial n a`: Standard polynomial constructors.
  - `coeff p 0`, `natDegree p`, `degree p`: Standard polynomial invariants.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Proving polynomial equality by extensionality (coefficient-wise). |
| `simp` / `simp only` | Simplifying using `@[simp]` lemmas (e.g., `coeff_divX`, `divX_C`, `divX_X_pow`). |
| `rw` | Rewriting using equalities (e.g., `divX_mul_X_add`, `C_mul_X_pow_eq_monomial`). |
| `split_ifs` | Handling `if-then-else` cases (e.g., in `divX_X_pow`, `divX_C_mul_X_pow`). |
| `cases` / `rcases` | Structural decomposition of polynomials or naturals (e.g., `cases n`, `rcases p`). |
| `rwa` | Rewrite + assumption (e.g., `rwa [← eq_C_of_degree_le_zero h]`). |
| `exact`, `intro`, `intro h` | Basic proof term construction. |
| `congr_arg` | Congruence for function application (e.g., `congr_arg _ (divX_mul_X_add _)`). |
| `calc` | Chain of equalities/inequalities (e.g., in `degree_divX_lt`). |
| `aesop` / `linarith` | Not explicitly used here — proofs are mostly `simp`/`rw`-driven. |

---

#### **4. Proof Logic / Strategy**

- **Well-founded induction** on `degree p` (or `natDegree p`) via `divX`, which strictly reduces degree (for nonzero polynomials).
- **Decomposition strategy**:
  - Use `divX_mul_X_add` to write `p = divX p * X + C (p.coeff 0)`.
  - Handle cases based on:
    - Whether `p = 0` (base case).
    - Whether `coeff p 0 = 0` (purely divisible by `X`).
    - Whether `degree p > 0` or `natDegree p ≠ 0`.
- **Induction principles**:
  - `recOnHorner`: General elimination for *any* predicate over polynomials, using:
    - Base case `p = 0`.
    - Step for adding a nonzero constant.
    - Step for multiplying by `X`.
  - `degree_pos_induction_on`: Specialized for positive degree, with explicit handling of `a * X`, `p * X`, and `p + a`.
  - `natDegree_ne_zero_induction_on`: Specialized for nonzero *natural* degree, avoiding explicit multiplication — uses monomials and addition only.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.MonoidAlgebra.Division` | Provides `divOf` used in `divX` definition (via `AddMonoidAlgebra`). |
| `Mathlib.Algebra.Polynomial.Degree.Operations` | Degree/natDegree arithmetic lemmas (e.g., `degree_mul'`, `natDegree_divX_eq_natDegree_tsub_one`). |
| `Mathlib.Algebra.Polynomial.EraseLead` | Related to `divX` — `divX` is essentially "erase leading term" in coefficient form. |
| `Mathlib.Order.Interval.Finset.Nat` | Used for indexing coefficients over finite ranges (e.g., `Finset.range`). |

**Domain**: Commutative semiring `R` (no need for ring or field structure).  
**Main abstraction**: Structural decomposition of polynomials via `X`-division, enabling induction without requiring division algorithm or invertibility of `X`.

--- 

Let me know if you'd like a diagram of the induction strategy or formalization notes for porting to another system.