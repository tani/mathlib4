### Technical Metadata Brief: Lagrange’s Four Squares Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `euler_four_squares` | `{R : Type*} [CommRing R] → (a b c d x y z w : R) → ... = ...` | Euler’s four-square identity in a commutative ring: product of sums of four squares is itself a sum of four squares. |
| `Nat.euler_four_squares` | `(a b c d x y z w : ℕ) → ... = ...` | Natural-number version of Euler’s identity, using `natAbs` to handle subtraction in ℤ. |
| `Int.sq_add_sq_of_two_mul_sq_add_sq` | `(h : 2 * m = x^2 + y^2) → m = ((x - y)/2)^2 + ((x + y)/2)^2` | Shows that if `2m` is a sum of two squares, then so is `m`, assuming parity conditions. |
| `Int.lt_of_sum_four_squares_eq_mul` | `(h : a² + b² + c² + d² = k * m) ∧ (2a,2b,2c,2d < m) → k < m` | Bounding lemma used to derive contradiction when `m > 1`. |
| `Int.exists_sq_add_sq_add_one_eq_mul` | `(p : ℕ) [Fact p.Prime] → ∃ a b k, 0 < k < p ∧ a² + b² + 1 = k * p` | Key existence lemma for primes: constructs a small multiple of `p` as sum of three squares + 1. |
| `Int.sum_four_squares_of_two_mul_sum_four_squares` | `(h : a² + b² + c² + d² = 2 * m) → ∃ w x y z, w² + x² + y² + z² = m` | If twice a number is a sum of four squares, then so is the number itself. Uses `ZMod 2` parity arguments. |
| `Prime.sum_four_squares` | `(hp : p.Prime) → ∃ a b c d, a² + b² + c² + d² = p` | Lagrange’s theorem for prime numbers (core inductive step). |
| `Nat.sum_four_squares` | `(n : ℕ) → ∃ a b c d, a² + b² + c² + d² = n` | Main theorem: every natural number is a sum of four squares. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `euler_`: Euler’s identities.
  - `sq_add_sq_`, `sq_add_sq_add_one_`: Statements about sums of squares.
  - `sum_four_squares_`: Related to the main theorem or its lemmas.
  - `lt_of_sum_four_squares_`, `exists_sq_add_sq_`: Existence/bounding lemmas.

- **Suffixes**:
  - `_eq_mul`: Equations of the form `sum = k * m`.
  - `_of_two_mul_`: Implications from `2 * m` to `m`.
  - `__iff_`: Logical equivalences (e.g., `natAbs_iff`).

- **Variables**:
  - `a b c d x y z w`: typical coefficients in Euler identity.
  - `m k r`: multipliers or intermediate values.
  - `p`: prime.
  - `f`: function used for modular representatives (`valMinAbs`).

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `ring` | Simplifying polynomial identities (especially in `euler_four_squares`). |
| `simp` / `simp only` | Simplifying expressions, especially with `natAbs`, `sq`, `ZMod`, and casts. |
| `push_cast` | Moving between `ℕ` and `ℤ` via coercion. |
| `rw` / `conv` | Rewriting using equalities, especially modular ones. |
| `exact`, `refine`, `apply` | Goal-directed proof construction. |
| `have`, `obtain`, `rcases` | Introducing intermediate facts or decomposing existentials. |
| `exfalso` | Contradiction-based reasoning. |
| `by_cases`, `by_contra` | Case analysis (e.g., on divisibility by 2). |
| `decide` | Automated reasoning over finite structures (e.g., `ZMod 2` parity). |
| `norm_cast` | Normalizing casts between `ℕ`, `ℤ`, `ZMod`. |
| `fin_cases` | Case analysis on `Fin n`. |
| `ac_rfl` | Rewriting using associativity/commutativity + reflexivity. |

---

#### **4. Proof Logic**

The proof follows **Lagrange’s original strategy**, structured as:

1. **Base case (primes)**:
   - For any prime `p`, construct `a, b` such that `a² + b² + 1 ≡ 0 [p]` (via `sq_add_sq_zmodEq`).
   - Use this to get `a² + b² + 1 = k * p` with `0 < k < p`.
   - Minimize `k` and derive contradiction if `k > 1`:
     - If `k` even: reduce using `Int.sum_four_squares_of_two_mul_sum_four_squares`.
     - If `k` odd: lift `a, b, c, d` to small representatives mod `k`, show their squares sum to `r * k` with `r < k`, contradicting minimality.

2. **Inductive step (general `n`)**:
   - Use strong induction on `n` with multiplicative structure (`Nat.recOnMul`).
   - Prime case handled by `Prime.sum_four_squares`.
   - Composite case: apply `Nat.euler_four_squares` to combine representations of factors.

Key logical motifs:
- **Minimal counterexample**: Assume minimal `m` such that `m * p` is sum of four squares, derive `r < m` with same property.
- **Parity & modular arithmetic**: Heavy use of `ZMod 2`, `ZMod m`, and divisibility to ensure halves are integers.
- **Euler identity as closure**: Ensures product of sums of four squares is again a sum of four squares.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Ring.Int.Parity` | Parity lemmas for integers (`Even`, `Odd`, `div_two`, etc.). |
| `Mathlib.Algebra.Ring.Int.Units` | Units in `ℤ`, used implicitly in ring reasoning. |
| `Mathlib.Data.Fintype.BigOperators` | Summation over finite types (`Finset.sum`, `Fin.sum_univ_four`). |
| `Mathlib.Data.ZMod.Basic` | Modular arithmetic, `ZMod n`, `valMinAbs`, `cast`, `pow_card`. |
| `Mathlib.FieldTheory.Finite.Basic` | Finite fields, `FiniteField`, `CharP`, `ZMod` properties. |

Also uses:
- `Equiv.swap`, `Finset.sum_univ_succ`, `sq_abs`, `Int.natCast_inj`, `Nat.cast_pos`, etc.

---

### Summary

This file formalizes **Lagrange’s four-square theorem** in Lean 4 using a classical, constructive-inductive approach rooted in Euler’s identity and modular arithmetic. It leverages:
- **Ring-theoretic identities** (`euler_four_squares`),
- **Modular representation theory** (`ZMod`, `valMinAbs`),
- **Parity arguments** (`Even`, `Odd`, `div_two`),
- **Minimal counterexample + descent** for primes,
- **Multiplicative induction** for general naturals.

The formalization is highly structured, modular, and aligns closely with the classical proof strategy.