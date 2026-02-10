**Technical Metadata Brief: Polynomial Degree ≤ 3 Irreducibility Criterion**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Monic.irreducible_iff_roots_eq_zero_of_degree_le_three` | `{R : Type*} [CommRing R] [IsDomain R] (p : R[X]) (hp : p.Monic) (hp2 : 2 ≤ p.natDegree) (hp3 : p.natDegree ≤ 3) : Irreducible p ↔ p.roots = 0` | For monic polynomials over an integral domain of degree 2 or 3, irreducibility is equivalent to having no roots (i.e., trivial root multiset). |
| `irreducible_iff_roots_eq_zero_of_degree_le_three` | `{K : Type*} [Field K] (p : K[X]) (hp2 : 2 ≤ p.natDegree) (hp3 : p.natDegree ≤ 3) : Irreducible p ↔ p.roots = 0` | Extends the above to arbitrary (not necessarily monic) polynomials over a field, using normalization by the leading coefficient. |

**Auxiliary facts used (implicit):**
- `hp.irreducible_iff_lt_natDegree_lt`: Characterization of irreducibility for monic polynomials via factor degrees.
- `natDegree_X_sub_C`: Degree of `X - c` is 1.
- `monic_X_sub_C`: `X - c` is monic.
- `dvd_iff_isRoot`: A linear factor `X - r` divides `p` iff `r` is a root.
- `roots_C_mul`: Roots of `c • p` (for `c ≠ 0`) equal roots of `p`.
- `natDegree_mul_leadingCoeff_inv`: Degree unchanged after multiplying by inverse of leading coefficient.

---

### 2. **Naming Conventions**

- **Prefixes:**
  - `irreducible_iff_...`: Logical equivalence with irreducibility.
  - `..._of_degree_le_three`: Specifies degree bound (≤ 3, ≥ 2).
- **Suffixes:**
  - `_iff_roots_eq_zero`: Equivalence with trivial root set.
- **Contextual qualifiers:**
  - `Monic.` prefix for the monic case (inside `IsDomain` section).
  - No prefix for the general field case (inside `Field` section).

---

### 3. **Tactic Stack**

- `intro`, `rw`, `simp_rw`, `refine`, `exact`, `rwa`, `apply`, `cases`
- `aesop` not used (explicit manual reasoning).
- `ring` not used (no arithmetic simplification needed beyond `nat` division).
- `interval_cases` imported but not used here (likely for `nat` bounds).
- Heavy use of `simp_rw` with `show ... from ...` to simplify expressions like `p.natDegree / 2 = 1`.

---

### 4. **Proof Logic**

- **Monic case (`IsDomain` section):**
  1. Reduce irreducibility to degree constraints using `irreducible_iff_lt_natDegree_lt`.
  2. Simplify using `simp_rw` on `p.natDegree / 2`, interval sets, and membership.
  3. Prove both directions:
     - *⇒*: If reducible, factorization yields a linear factor ⇒ a root exists.
     - *⇐*: If no roots, assume factorization `p = q * r`; degrees must be 1 and ≥2, but degree-1 factors imply roots — contradiction.

- **General field case (`Field` section):**
  1. Reduce to monic case via normalization: `p = lc(p) • (p / lc(p))`, where `p / lc(p)` is monic.
  2. Use `irreducible_mul_leadingCoeff_inv` to transfer irreducibility.
  3. Apply monic result and adjust roots via `roots_C_mul`.

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.Roots` | Core definitions: `roots`, `isRoot`, `dvd_iff_isRoot`, `mem_roots`, `roots_C_mul`, etc. |
| `Mathlib.Tactic.IntervalCases` | For case analysis on natural number bounds (not used directly in this snippet, but likely for related lemmas). |

**Domain context:** Commutative rings with no zero divisors (`IsDomain`) and fields (`Field`). Central algebraic structure is `Polynomial R`.

--- 

Let me know if you'd like a formalized summary in Lean doc-string format or a diagram of the proof structure.