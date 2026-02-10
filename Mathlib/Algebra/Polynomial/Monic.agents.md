### Technical Brief: Theory of Monic Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Monic` | `R[X] → Prop` | Predicate for monic polynomials: `p.Monic ↔ p.leadingCoeff = 1` |
| `monic_zero_iff_subsingleton` | `Monic (0 : R[X]) ↔ Subsingleton R` | Characterizes when the zero polynomial is monic (only in trivial ring). |
| `monic_C_mul_of_mul_leadingCoeff_eq_one` | `b * p.leadingCoeff = 1 → Monic (C b * p)` | Sufficient condition for scalar multiple of polynomial to be monic. |
| `monic_mul_C_of_leadingCoeff_mul_eq_one` | `p.leadingCoeff * b = 1 → Monic (p * C b)` | Dual of above for right multiplication. |
| `monic_X_pow_add` | `degree p < n → Monic (X^n + p)` | Adding lower-degree polynomial to `X^n` yields monic. |
| `monic_X_add_C` | `Monic (X + C x)` | Linear polynomial `X + x` is always monic. |
| `Monic.mul` | `Monic p → Monic q → Monic (p * q)` | Product of monic polynomials is monic. |
| `Monic.pow` | `Monic p → ∀ n, Monic (p ^ n)` | Powers of monic polynomials are monic. |
| `Monic.map` | `(f : R →+* S) → Monic p → Monic (p.map f)` | Monicity preserved under ring homomorphisms. |
| `Monic.add_of_left` / `add_of_right` | `degree q < degree p → Monic (p + q)` | Sum is monic if one summand dominates in degree. |
| `Monic.of_mul_monic_left` / `of_mul_monic_right` | `p * q` monic + `p` monic ⇒ `q` monic | Monicity can be "cancelled" in products. |
| `Monic.comp` | `p.Monic → q.Monic → q.natDegree ≠ 0 → (p.comp q).Monic` | Composition of monic polynomials is monic (if inner degree ≠ 0). |
| `Monic.nextCoeff_mul` | `nextCoeff (p * q) = nextCoeff p + nextCoeff q` | Linear behavior of next coefficient (coefficient of `X^(n-1)`) under multiplication. |
| `Monic.nextCoeff_pow` | `(p ^ n).nextCoeff = n • p.nextCoeff` | Next coefficient scales linearly with exponent. |
| `eq_one_of_map_eq_one` | `p.map f = 1 → p = 1` (under nontriviality) | If a monic polynomial maps to 1, it was already 1. |
| `irreducible_of_monic` | Characterization of irreducibility for monic polynomials in `CommSemiring` with `NoZeroDivisors`. | Enables reduction of irreducibility to factorization by monic polynomials. |
| `monic_X_pow_sub_C` | `n ≠ 0 → Monic (X^n - C a)` | `X^n - a` is monic for nonzero `n`. |
| `monic_of_isUnit_leadingCoeff_inv_smul` | `IsUnit p.leadingCoeff → Monic (h.unit⁻¹ • p)` | Scaling by inverse of leading coefficient yields monic polynomial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `monic_`: standalone lemmas about constructing monic polynomials (`monic_X_add_C`, `monic_mul_C_of_mul_leadingCoeff_eq_one`).
  - `Monic.`: methods on the `Monic` typeclass/structure (`Monic.mul`, `Monic.map`, `Monic.nextCoeff_mul`).
  - `not_monic_`: negative results (`not_monic_zero`, `not_isUnit_X_pow_sub_one`).
- **Suffixes**:
  - `_left` / `_right`: indicate left/right action or cancellation (`of_mul_monic_left`, `mul_left_ne_zero`).
  - `_iff`: biconditional characterizations (`natDegree_eq_zero_iff_eq_one`, `monic_map_iff`).
  - `_eq_zero_iff`: equivalence with zero condition (`mul_right_eq_zero_iff`, `mul_left_eq_zero_iff`).
  - `_smul_regular`: for scalar multiplication regularity (`degree_smul_of_smul_regular`).
- **Special**:
  - `nextCoeff`: coefficient of `X^(n-1)` in degree-`n` polynomial.
  - `natDegree`: degree as natural number (with `natDegree 0 = 0`).
  - `comp`: polynomial composition.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`Monic.def`, `leadingCoeff`, `coeff_map`, etc.). |
| `simp` | Simplifying using `@[simp]` lemmas (e.g., `natDegree_X_add_C`, `coeff_X_pow`). |
| `nontriviality` | Introducing nontriviality assumption for rings (needed for `Monic` to be meaningful). |
| `conv_lhs` | Focusing on left-hand side for equational reasoning. |
| `rwa` | `rw` + `assumption` (common in `Monic.*` proofs). |
| `exact` / `refine` | Direct proof construction, especially with `⟨...⟩` for existential goals. |
| `by_cases` | Splitting on equality/inequality (e.g., `p = 0`, `q = 0`, `n = 0`). |
| `contrapose!` | Turning implications into contrapositive form (e.g., for divisibility). |
| `aesop` / `linarith` | Not heavily used here; mostly manual reasoning. |
| `ring` | For polynomial ring identities (e.g., in `eq_of_monic_of_associated`). |
| `induction` | Structural induction on `n : ℕ` (e.g., for `pow`, `natDegree_pow`). |
| `ext` | Extensionality for function equality (e.g., in `smul_eq_zero_iff_eq`). |

---

#### **4. Proof Logic**

- **Inductive structure**: Many proofs proceed by induction on natural numbers (`n`) or multiset/finiteness structures (`Finset`, `Multiset`).
- **Case analysis**: Heavy use of `by_cases` on whether polynomials are zero, units, or equal to `1`.
- **Degree-based reasoning**:
  - Use `degree_le_iff_coeff_zero`, `natDegree_eq_zero_iff_degree_le_zero`, `degree_map_eq_of_leadingCoeff_ne_zero`.
  - Compare degrees of sum/product/composition via lemmas like `degree_add_le`, `degree_mul'`, `natDegree_comp_eq_of_mul_ne_zero`.
- **Cancellation & regularity**:
  - Leverage `IsRegular`, `IsSMulRegular`, and `NoZeroDivisors` assumptions to cancel factors or deduce zero-divisor freeness.
- **Equational reasoning**:
  - Often reduce to coefficient-level equalities using `coeff_map`, `coeff_mul`, `coeff_comp_degree_mul_degree`.
  - Use `nextCoeff` lemmas to simplify expressions involving the second-highest coefficient.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Algebra.Associated.Basic`: For `Associated` relation (used in `eq_of_monic_of_associated`).
- `Mathlib.Algebra.Polynomial.Reverse`: For `reverse`, used in `nextCoeff_mul`.
- `Mathlib.Algebra.Regular.SMul`: For `IsSMulRegular`, `IsRegular`, scalar multiplication regularity.

**Scope**:
- **Algebraic**: Focus on polynomial rings over semirings/rings, especially monic polynomials.
- **Logical**: Classical logic assumed (via `Classical.decEq R`).
- **Domain**: General semirings → rings → commutative semirings/rings → no zero divisors → nontrivial rings.
- **Noncomputable**: Section declared `noncomputable section`, indicating reliance on classical reasoning (e.g., subsingleton elimination).

---

### Summary

This module formalizes foundational properties of **monic polynomials** in Lean 4’s Mathlib. It emphasizes:
- Constructive criteria for monicity (`monic_X_add_C`, `monic_mul_C_of_mul_leadingCoeff_eq_one`),
- Stability under operations (`mul`, `pow`, `map`, `comp`),
- Structural consequences (`irreducibility`, `isUnit`, `associated`),
- Behavior of coefficients (`nextCoeff_mul`, `nextCoeff_pow`),
- Interactions with ring-theoretic notions (`regularity`, `zero-divisors`, `injective maps`).

The proofs rely heavily on degree/coefficient reasoning, case analysis, and induction, with a strong emphasis on *exact* coefficient-level control.