### Technical Brief: Vandermonde Matrix in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `vandermonde` | `{n : ℕ} → (v : Fin n → R) → Matrix (Fin n) (Fin n) R` | Constructs the *Vandermonde matrix* where entry `(i, j)` is `v i ^ j`. |
| `vandermonde_apply` | `vandermonde v i j = v i ^ (j : ℕ)` | Simplifies application of `vandermonde`. |
| `vandermonde_cons` | Recursive structure for `vandermonde (Fin.cons v0 v)` | Enables inductive reasoning by prepending a row. |
| `vandermonde_succ` | Alternative recursive form using `Fin.tail v` | Useful for induction on matrix size. |
| `det_vandermonde` | `det (vandermonde v) = ∏ i, ∏ j ∈ Ioi i, (v j - v i)` | **Main result**: Determinant is product over all unordered pairs `(i, j)` with `i < j` of `(v j - v i)`. |
| `det_vandermonde_eq_zero_iff` | `[IsDomain R] ⇒ det = 0 ↔ ∃ i ≠ j, v i = v j` | Characterizes when the determinant vanishes (i.e., when `v` is not injective). |
| `det_vandermonde_ne_zero_iff` | `[IsDomain R] ⇒ det ≠ 0 ↔ Function.Injective v` | Equivalent condition for non-vanishing determinant. |
| `eq_zero_of_forall_index_sum_pow_mul_eq_zero` | Injectivity + linear combination of powers = 0 ⇒ vector = 0 | Key lemma for uniqueness of polynomial interpolation / linear independence of monomials. |
| `eval_matrixOfPolynomials_eq_vandermonde_mul_matrixOfPolynomials` | Relates evaluation of polynomials to matrix multiplication with Vandermonde | Used to connect polynomial evaluation matrices and Vandermonde structure. |
| `det_eval_matrixOfPolynomials_eq_det_vandermonde` | Under monic & degree conditions, det of eval matrix = det Vandermonde | Generalizes determinant formula to polynomial evaluation matrices. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `vandermonde_`: All definitions and lemmas related to the matrix.
  - `det_`: Determinant-related properties.
  - `eq_zero_of_...`: Implication lemmas concluding `v = 0`.
- **Suffixes**:
  - `_apply`: Simplification lemmas for function application.
  - `_cons`, `_succ`: Structural recursion lemmas.
  - `_mul_...`, `_transpose_...`: Matrix multiplication identities.
  - `_ne_zero_iff`: Logical equivalences for non-vanishing determinant.
- **Pattern**:
  - `vandermonde v i j = v i ^ j`
  - `Ioi i`: Set `{j | i < j}` — used in product over unordered pairs.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction' n with n ih` | Induction on matrix size `n`. |
| `simp only [...]` | Simplification with specific lemmas (e.g., `vandermonde_apply`, `pow_succ'`, `Fin.sum_univ_succ`). |
| `congr` / `congr_arg` | Equality of expressions via congruence. |
| `ext i j` | Extensionality for matrices (pointwise equality). |
| `rw [...]` | Rewriting using lemmas like `geom_sum₂_mul`, `det_mul_column`, `Fin.prod_Ioi_succ`. |
| `ring` | Simplifying polynomial expressions (especially in `vandermonde_cons`). |
| `aesop` / `linarith` | Not explicitly used here, but `ring` and `simp` suffice for arithmetic. |
| `exact`, `refine`, `apply` | Proof construction, especially in induction steps. |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Base case `n = 0`: Trivial (`det = 1` for empty matrix).
  - Inductive step:
    1. Use `det_eq_of_forall_row_eq_smul_add_const` to simplify determinant via row operations.
    2. Apply `det_succ_column_zero` to reduce to smaller matrix.
    3. Use geometric sum identity (`geom_sum₂_mul`) to factor out `(v i.succ - v 0)`.
    4. Factor determinant using `det_mul_column`.
    5. Apply induction hypothesis on the smaller matrix (via composition with `Fin.succ`).
    6. Reassemble using product identities over `Fin n.succ`.

- **Key logical flow**:
  - **Row/column operations** → **Factorization** → **Inductive hypothesis** → **Product reorganization**.

- **Injectivity ↔ non-vanishing det**:
  - Follows directly from `det_vandermonde` and `sub_eq_zero`.

- **Uniqueness lemmas** (`eq_zero_of_...`):
  - Use invertibility of Vandermonde matrix (via `det ≠ 0`) to deduce vector = 0 from linear system.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.BigOperators.Fin`: For finite products/sums over `Fin n`.
- `Mathlib.Algebra.GeomSum`: Geometric sum identities (`geom_sum₂_mul`).
- `Mathlib.LinearAlgebra.Matrix.Block`, `.Determinant.Basic`, `.Nondegenerate`: Matrix operations, determinant theory, and nondegeneracy.

**Domain Assumptions**:
- `CommRing R`: Commutative ring (for exponentiation, subtraction, etc.).
- `[IsDomain R]`: Integral domain (for zero-divisor-free arithmetic, crucial in `det_vandermonde_eq_zero_iff`).

**Scope**:
- Focuses on **square Vandermonde matrices** over arbitrary commutative rings/integral domains.
- Applications include polynomial interpolation, linear independence of monomials, and determinant evaluation.

--- 

Let me know if you'd like a diagram of the proof structure or a formalized summary for use in an AI agent.