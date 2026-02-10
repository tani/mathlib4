### Technical Metadata Brief: `Rat` Module (Lean 4, Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `commRing` | `CommRing ℚ` | Establishes `ℚ` as a commutative ring via explicit construction from additive and multiplicative structure. |
| `commGroupWithZero` | `CommGroupWithZero ℚ` | Provides the `CommGroupWithZero` structure, including inverse on nonzero elements and `0⁻¹ = 0`. |
| `isDomain` | `IsDomain ℚ` | Shows `ℚ` is an integral domain (no zero divisors). |
| `instCharZero` | `CharZero ℚ` | Proves `ℚ` has characteristic zero via injectivity of `ℕ → ℚ`. |
| `mkRat_eq_div` | `mkRat n d = n / d` | Connects `mkRat` (constructor for rationals) to the field-theoretic division. |
| `num_div_den` | `(r.num : ℚ) / (r.den : ℚ) = r` | Every rational number equals its numerator divided by its denominator (cast to ℚ). |
| `mul_den_eq_num` | `q * q.den = q.num` | Fundamental property of numerator/denominator representation. |
| `divInt_pow`, `mkRat_pow` | `(n /. d)^k = n^k /. d^k`, `mkRat n d ^ k = mkRat (n^k) (d^k)` | Powers distribute over division and `mkRat`. |
| `natCast_eq_divInt` | `↑n = n /. 1` | Natural number coercion to ℚ equals integer division by 1. |
| `divInt_div_divInt_cancel_left/right` | Cancellation lemmas for division in ℤ (used in simplification). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isDomain`, `instCharZero` (typeclass instances).
  - `natCast_`, `intCast_`: coercion from `ℕ`/`ℤ` to `ℚ`.
  - `mul_`, `add_`, `zero_`: algebraic laws (e.g., `mul_zero`, `zero_mul`, `left_distrib`).
  - `num_`, `den_`: numerator/denominator-related lemmas (e.g., `num_div_den`, `mul_den_eq_num`).
  - `divInt_`: operations involving `/.` (integer division notation in Mathlib).
  - `mkRat_`: lemmas about the `mkRat` constructor.

- **Suffixes**:
  - `_eq_`: equality lemmas (e.g., `mkRat_eq_div`, `natCast_eq_divInt`).
  - `_cancel_`: cancellation lemmas (e.g., `divInt_div_divInt_cancel_left`).
  - `_pow`: power-related lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting using equalities (e.g., `num_divInt_den`, `divInt_eq_div`). |
| `simp only [...]` | Simplification with explicit lemmas (avoids over-simplification). |
| `conv` | Focused rewriting (e.g., pattern matching on `q`). |
| `have : ...` + `rw [...]` | Intermediate lemma introduction and rewriting. |
| `change` | Rewriting goal to match definition (e.g., `change Rat.inv 0 = 0`). |
| ` rfl` | Reflexivity proofs (e.g., for definitional equalities). |
| `by infer_instance` | Typeclass inference for derived instances. |
| `mod_cast` | Casts hypotheses modulo definitional equalities (e.g., `q.den ≠ 0`). |
| `simp_rw` (implicit via `simp only`) | Combined simplification + rewriting. |

---

#### **4. Proof Logic**

- **Instance construction** (`commRing`, `commGroupWithZero`, `isDomain`, `instCharZero`):
  - Use `:=` to directly define fields.
  - For `natCast_succ`, combine `simp` with known division lemmas (`divInt_add_divInt`, `divInt_one_one`).
- **Equality proofs** (e.g., `num_div_den`, `mul_den_eq_num`):
  - Reduce to known normal forms using `num_divInt_den`, `intCast_eq_divInt`, `natCast_eq_divInt`.
  - Use `have` + `rw` to handle nonzero denominators.
- **Cancellation lemmas**:
  - Convert division to `* inv` and apply `inv_divInt'`, `divInt_mul_divInt_cancel`.
- **Power lemmas**:
  - Reduce to integer/real division via `divInt_eq_div`, then apply `div_pow`, `natCast_pow`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.GroupWithZero.Units.Basic` | Provides `CommGroupWithZero` and unit-related infrastructure. |
| `Mathlib.Algebra.Ring.Basic` | Core ring theory (distributivity, zero/mul laws). |
| `Mathlib.Algebra.Ring.Int.Defs` | Integer arithmetic, `Int.cast`, `divInt`, `/.` notation. |
| `Mathlib.Data.Rat.Defs` | Definition of `ℚ`, `mkRat`, `num`, `den`, basic operations. |

> **Note**: The file avoids importing `OrderedCommMonoid`, `Field`, `PNat`, `Nat.dvd_mul`, and `IsDomain.toCancelMonoidWithZero` (via `assert_not_exists`), likely to prevent circular dependencies or non-computable paths.

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `Mathlib` hierarchy (e.g., `Field ℚ`, `LinearOrderedField ℚ`).