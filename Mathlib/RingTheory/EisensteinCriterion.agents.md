### Technical Metadata Brief: Eisenstein’s Criterion in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `map_eq_C_mul_X_pow_of_forall_coeff_mem` | `{f : R[X]} {P : Ideal R} → (∀ n < f.degree, f.coeff n ∈ P) → map (mk P) f = C (mk P f.leadingCoeff) * X ^ f.natDegree` | Shows that if all non-leading coefficients of `f` lie in a prime ideal `P`, then the image of `f` under the quotient map `R → R/P` is a monomial `c * X^d`. |
| `le_natDegree_of_map_eq_mul_X_pow` | `{P : Ideal R} (hP : P.IsPrime) → map (mk P) q = c * X^n ∧ c.degree = 0 → n ≤ q.natDegree` | Lower bounds the natural degree of `q` by the exponent `n` in its image as a monomial over `R/P`. |
| `eval_zero_mem_ideal_of_eq_mul_X_pow` | `map (mk P) q = c * X^n ∧ n ≠ 0 → eval 0 q ∈ P` | If the constant term of `q` maps to zero in `R/P`, and the image has positive power of `X`, then the constant term lies in `P`. |
| `isUnit_of_natDegree_eq_zero_of_isPrimitive` | `IsPrimitive (p * q) ∧ p.natDegree = 0 → IsUnit p` | A primitive polynomial of degree 0 is a unit. Used to handle degree-zero factors. |
| `irreducible_of_eisenstein_criterion` | `{f : R[X]} {P : Ideal R} → P.IsPrime ∧ f.leadingCoeff ∉ P ∧ (∀ n < degree f, f.coeff n ∈ P) ∧ 0 < degree f ∧ f.coeff 0 ∉ P^2 ∧ f.IsPrimitive → Irreducible f` | Main theorem: Eisenstein’s criterion for irreducibility over an integral domain `R`, assuming primitivity and a prime ideal condition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isUnit_`, `isPrimitive_`: Properties of polynomials (e.g., `isUnit_of_natDegree_eq_zero...`)
  - `map_`: Relating to the ring homomorphism `map (mk P)` (e.g., `map_eq_C_mul_X_pow...`)
  - `eval_`: Evaluation at 0 (e.g., `eval_zero_mem_ideal_of_eq_mul_X_pow`)
  - `le_natDegree_`, `degree_`: Degree-related lemmas.

- **Suffixes**:
  - `_of_...`: Indicates the hypothesis structure (e.g., `eq_mul_X_pow_of_forall_coeff_mem`)
  - `_mem_ideal`: Membership in an ideal (e.g., `eval_zero_mem_ideal_of_...`)
  - `_ne_zero`, `_ne_zero_iff`: Logical negations of zero.

- **Notable patterns**:
  - `natDegree_eq_zero_iff_degree_le_zero`: Equivalence between natural degree zero and degree ≤ 0.
  - `degree_C_mul_X_pow_le`: Degree bounds for monomials.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `ext` / `Polynomial.ext` | Extensionality for polynomials (coefficient-wise equality). |
| `by_cases`, `rcases`, `cases'` | Case analysis on trichotomy (`lt_trichotomy`), disjunctions, existential quantifiers. |
| `rw [*, *, *]` | Rewriting using lemmas, definitions, and equivalences (e.g., `coeff_map`, `degree_mul`, `eval_mul`). |
| `simp_all only [...]` | Simplification with precise control over rewrite set. |
| `rwa` | Rewrite + assumption; used to apply equivalences like `pos_iff_ne_zero`. |
| `contrapose` | Logical contrapositive introduction. |
| `apply_fun` | Apply a function to both sides of an equation (e.g., `degree` to both sides of `hbc`). |
| `exact`, `refine`, `intro` | Basic proof construction. |
| `ring`, `aesop` | Not explicitly used here — Lean’s `ring` is often implicit in `simp`/`rw` for commutative rings. |
| `rfl` | Reflexivity for definitional equalities. |

---

#### **4. Proof Logic**

The proof of `irreducible_of_eisenstein_criterion` follows this logical flow:

1. **Setup & Assumptions**:
   - Assume `f` satisfies Eisenstein conditions w.r.t. prime ideal `P`.
   - Show `f ≠ 0`, and compute its image under `R → R/P` as a monomial.

2. **Contrapositive for Irreducibility**:
   - To prove `Irreducible f`, assume `f = p * q` and aim to show one factor is a unit.

3. **Map to Quotient Ring**:
   - Use `map_mul` to get `f.map = p.map * q.map`.
   - Since `f.map = c * X^d`, apply unique factorization in `R/P[X]` (via `mul_eq_mul_prime_pow`, using `X` is prime).

4. **Degree Analysis**:
   - Show exponents `m, n` in `p.map = b * X^m`, `q.map = c * X^n` satisfy `m + n = d`.
   - Use `le_natDegree_of_map_eq_mul_X_pow` to bound `m ≤ deg p`, `n ≤ deg q`.
   - Combine with `deg f = deg p + deg q` to deduce `deg p = m`, `deg q = n`.

5. **Constant Term Argument**:
   - If both `m, n > 0`, then constant terms of `p`, `q` lie in `P`, so their product lies in `P^2`, contradicting `f.coeff 0 ∉ P^2`.

6. **Conclude One Factor is Unit**:
   - So one of `m = 0` or `n = 0`, implying one factor has `natDegree = 0`.
   - Use `isUnit_of_natDegree_eq_zero_of_isPrimitive` (with primitivity of `f`) to conclude that factor is a unit.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Data.Nat.Cast.WithTop` | For `WithBot`/`WithTop` encodings of `ℕ ∪ {∞}` (used in degree/natDegree handling). |
| `Mathlib.RingTheory.Ideal.Quotient.Basic` | Quotient rings, canonical map `mk P`, and basic properties. |
| `Mathlib.RingTheory.Polynomial.Content` | Primitivity (`IsPrimitive`) and content-related lemmas. |
| `Mathlib.RingTheory.Prime` | Prime ideals, prime elements (e.g., `monic_X.prime_of_degree_eq_one`). |

**Scope**: This module formalizes a generalized version of **Eisenstein’s irreducibility criterion** for polynomials over an *integral domain* `R`, using ideal-theoretic methods and properties of polynomial rings over quotients.

--- 

Let me know if you'd like a dependency graph or a tactic trace for the main theorem.