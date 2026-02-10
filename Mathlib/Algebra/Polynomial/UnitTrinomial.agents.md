### Technical Brief: Unit Trinomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `trinomial` | `ℕ → ℕ → ℕ → R → R → R → Polynomial R` | Shorthand for a trinomial: `u·X^k + v·X^m + w·X^n` with `k < m < n`. |
| `IsUnitTrinomial` | `Polynomial ℤ → Prop` | A trinomial with *unit* (±1) integer coefficients. Formally: `∃ k<m<n, u,v,w ∈ ℤˣ, p = u·X^k + v·X^m + w·X^n`. |
| `trinomial_leading_coeff'`, `trinomial_middle_coeff`, `trinomial_trailing_coeff'` | `coeff n = w`, `coeff m = v`, `coeff k = u` | Extract coefficients under strict ordering `k < m < n`. |
| `trinomial_natDegree`, `trinomial_natTrailingDegree` | `natDegree = n`, `natTrailingDegree = k` | Compute degree extremes when outer coefficients are nonzero. |
| `trinomial_mirror` | `p.mirror = trinomial k (n−m+k) n w v u` | Describes the mirror (reciprocal) polynomial of a trinomial. |
| `isUnitTrinomial_iff` | `p.IsUnitTrinomial ↔ (#p.support = 3 ∧ ∀ k ∈ p.support, IsUnit (p.coeff k))` | Characterizes unit trinomials by support size and unit coefficients. |
| `isUnitTrinomial_iff'` | `p.IsUnitTrinomial ↔ (p * p.mirror).coeff ((deg + tdeg)/2) = 3` | Alternative characterization via middle coefficient of `p·p.mirror`. |
| `irreducible_of_coprime` | `p.IsUnitTrinomial → IsRelPrime p p.mirror → Irreducible p` | **Main result**: A unit trinomial is irreducible if coprime with its mirror. |
| `irreducible_of_isCoprime` | `p.IsUnitTrinomial → IsCoprime p p.mirror → Irreducible p` | Strengthened version using `IsCoprime` (i.e., ideal sum = 1). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `trinomial_`: Properties of the `trinomial` definition.
  - `isUnitTrinomial_`: Properties of the `IsUnitTrinomial` predicate.
  - `coeff_`, `leadingCoeff_`, `trailingCoeff_`, `natDegree_`, `natTrailingDegree_`: Coefficient/degree-related lemmas.
- **Suffixes**:
  - `'` (prime): Often used for variants (e.g., `trinomial_trailing_coeff'` vs `trinomial_trailing_coeff`).
  - `'_iff` / `'_iff'` / `'_iff''`: Logical equivalences (multiple forms).
  - `'_auxN`: Intermediate lemmas in the irreducibility proof (`irreducible_aux1`, `aux2`, `aux3`).
- **`is_` prefix**: Used in `IsUnitTrinomial`, `IsRelPrime`, `IsCoprime`, `Irreducible`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw` / `simp_rw`: Rewriting definitions and simplifying with rewrite rules.
- `rcases` / `cases'`: Decomposing existential/universal hypotheses (e.g., `mem_insert`/`mem_singleton`).
- `have`, `replace`, `exact`: Structuring intermediate claims.
- `aesop` / `decide`: Automated reasoning for arithmetic and propositional logic (e.g., `decide` in `irreducible_aux1`).
- `omega`: Solving linear arithmetic in `ℤ` (e.g., in `irreducible_aux2`).
- `simp only [...]`: Fine-grained simplification with explicit lemmas.
- `apply`, `refine`, `exact`: Proof construction.
- `congr_arg`: Applying functors to equalities (e.g., `congr_arg leadingCoeff h`).
- `eval`, `mul_right_inj'`, `add_right_inj`: Algebraic simplifications.

---

#### **4. Proof Logic**

The core proof of `irreducible_of_coprime` follows this structure:

1. **Reduction to mirror-coprime case**: Uses `irreducible_of_mirror`, reducing to showing:  
   *If `p = q·r`, then `q` or `r` is a unit.*  
   Here, `r = p.mirror / q` (via `hpq : p * p.mirror = q * q.mirror`).

2. **Unit trinomial closure**:  
   - `IsUnitTrinomial q` follows from `isUnitTrinomial_iff'' hpq` and `hp`.

3. **Parameter alignment**:  
   - Show `k = k'` and `n = n'` using `natTrailingDegree`/`natDegree` of `p·p.mirror = q·q.mirror`.

4. **Case analysis on middle coefficient**:  
   - Use `eq_or_eq_neg_of_sq_eq_sq` on `v, y ∈ ℤˣ` (from `eval 1` of both sides).
   - Reduce to `irreducible_aux3`, which handles sign variations.

5. **Key auxiliary lemmas**:
   - `irreducible_aux1`: Identifies the *filter* of `p·p.mirror` over `Ioo(k+n, 2n)` as a scaled monomial.
   - `irreducible_aux2`: Uniqueness of trinomial form with fixed `k,n,u,v,w`.
   - `irreducible_aux3`: Handles sign differences (`u ↔ x`, `w ↔ z`) and mirror symmetry.

6. **Final disjunction**:  
   Concludes `q = p` or `q = p.mirror` (up to sign), implying one factor is a unit.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.Mirror`: Defines `mirror`, `reverse`, `reflect`.
- `Mathlib.Algebra.Ring.Regular`: For `IsRelPrime`, `IsCoprime`.
- `Mathlib.Data.Int.Order.Units`: Structure of `ℤˣ` (±1).
- `Mathlib.RingTheory.Coprime.Basic`: Coprimality in rings.

**Domain**:  
- Focuses on *univariate polynomials over ℤ* (`ℤ[X]`).
- Central objects: **trinomials** with unit coefficients (`±1`), especially their **irreducibility**.
- Tools: coefficient analysis, degree/trailing-degree computation, mirror symmetry, and coprimality.

--- 

This module formalizes a nontrivial irreducibility criterion for a structured class of polynomials, leveraging symmetry (mirror) and arithmetic properties of ℤ. The proof is highly technical, relying on careful case analysis and Finsupp-based coefficient filtering.