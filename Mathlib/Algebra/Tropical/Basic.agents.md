### Technical Brief: Tropical Algebraic Structures in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Tropical R` | Type synonym: `Tropical R := R`. Represents the *min-tropicalization* of `R`. |
| `trop : R → Tropical R` | Identity function; reinterprets `x : R` as `trop x : Tropical R`. |
| `untrop : Tropical R → R` | Identity function; reinterprets `x : Tropical R` as `untrop x : R`. |
| `tropEquiv : R ≃ Tropical R` | Equivalence of types (bijection), with `trop` and `untrop` as forward/backward maps. |
| `tropOrderIso [Preorder R] : R ≃o Tropical R` | Order-isomorphism (preserves order via `untrop_le_iff`). |
| `instAddCommSemigroupTropical [LinearOrder R]` | Tropical addition = `min`, making `(Tropical R, +)` a commutative semigroup. |
| `instMulTropical [Add R]` | Tropical multiplication = underlying addition: `x * y = trop (untrop x + untrop y)`. |
| `instZeroTropical [Top R]` | `0 : Tropical R = trop ⊤`, i.e., tropical zero is the top element of `R`. |
| `instOneTropical [Zero R]` | `1 : Tropical R = trop 0`, i.e., tropical one is the additive zero of `R`. |
| `instDistribTropical [LinearOrder R] [Add R] [AddLeftMono R] [AddRightMono R]` | Distributivity: `x * (y + z) = x * y + x * z`, proven via `min_add_add_left/right`. |
| `instCommSemiring (Tropical R)` | Main result: if `R` is a `LinearOrderedAddCommMonoidWithTop`, then `Tropical R` is a *commutative semiring*. |
| `mul_eq_zero_iff` | `a * b = 0 ↔ a = 0 ∨ b = 0` in `Tropical (WithTop R)`, i.e., no zero divisors. |
| `add_pow` | In tropical semiring, `(x + y)^n = x^n + y^n`, reflecting idempotent addition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `trop_`: e.g., `trop`, `trop_inj`, `trop_min`, `trop_mul_def`, `trop_zero`, `trop_nsmul`, `trop_zsmul`.
  - `untrop_`: e.g., `untrop_add`, `untrop_mul`, `untrop_zero`, `untrop_one`, `untrop_pow`, `untrop_zpow`.
  - `inst...Tropical`: typeclass instances (e.g., `instAddCommSemigroupTropical`, `instDistribTropical`).
  - `tropOrderIso`, `tropEquiv`: order/type equivalences.

- **Suffixes**:
  - `_def`: definition lemmas (e.g., `trop_add_def`, `trop_mul_def`, `trop_min`).
  - `_iff`: biconditional characterizations (e.g., `trop_inj_iff`, `add_eq_left_iff`, `add_eq_zero_iff`).
  - `_mono`, `_strictMono`: monotonicity/strict monotonicity of operations.

- **Special**:
  - `trop_rec`, `tropRec`: recursion principle for `Tropical R`.
  - `trop_coe_ne_zero`, `zero_ne_trop_coe`: distinguishing `trop x` from `0` in `WithTop`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rfl` | Proving definitional equalities (e.g., `trop_untrop`, `untrop_add`). |
| `simp` / `simp only` | Simplifying using `@[simp]` lemmas (e.g., `untrop_add`, `trop_min`). |
| `untrop_injective` | Reducing equalities in `Tropical R` to equalities in `R`. |
| `le_antisymm` | Proving order equalities via antisymmetry. |
| `rcases le_total` | Case analysis on total order (e.g., `x ≤ y` or `y ≤ x`). |
| `rw [trop_eq_iff_eq_untrop]` | Rewriting using equivalence of `trop x = y ↔ x = untrop y`. |
| `induction` | Inductive proofs (e.g., on `n : ℕ` for `nsmul`, `pow`). |
| `split_ifs` | Handling `if ... then ... else ...` in definitions (e.g., `natCast`). |
| `aesop` / `linarith` | Not heavily used here; proofs are mostly algebraic and order-theoretic. |

---

#### **4. Proof Logic & Strategy**

- **Core Strategy**:  
  Prove properties *via* the equivalence `trop ↔ untrop`, lifting structures from `R` to `Tropical R`.  
  - Define operations pointwise via `trop ( ... )`, then prove laws using properties of `untrop`.
  - Use `untrop_injective` to reduce goals to `R`.
  - For order-theoretic properties, rely on `untrop_le_iff`, `untrop_lt_iff`.

- **Typical Proof Pattern**:
  ```lean
  theorem foo (x y z : Tropical R) : ...
  := by
    rw [untrop_inj_iff]
    -- Goal becomes in R
    simp only [untrop_*, ...]
    -- Use R's properties (e.g., min_assoc, add_comm)
    ...
  ```

- **Induction**: Used for `nsmul`, `zpow`, `pow`, especially when proving compatibility with `trop`/`untrop`.

- **Order Reasoning**: Heavy use of `le_total`, `min_eq_left_iff`, `min_eq_right_iff`, `min_assoc`, `min_comm`.

- **Distributivity**: Proven via `min_add_add_left/right`, which rely on `AddLeftMono`/`AddRightMono` assumptions.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Order.Monoid.Unbundled.Pow`  
- `Mathlib.Algebra.SMulWithZero`  
- `Mathlib.Order.Hom.Basic`  
- `Mathlib.Algebra.Order.Monoid.Unbundled.WithTop`  
- `Mathlib.Algebra.Order.AddGroupWithTop`  
- `Mathlib.Algebra.Ring.Nat`  
- `Mathlib.Algebra.Order.Monoid.Unbundled.MinMax`

**Scope**:  
This module formalizes the *min-tropical* semiring structure on a type `R`, assuming minimal algebraic and order-theoretic structure on `R` (e.g., `LinearOrderedAddCommMonoidWithTop`). It supports:
- Type synonym `Tropical R`
- Equivalences (`tropEquiv`, `tropOrderIso`)
- Addition (`min`), multiplication (`+`), zero (`top`), one (`0`)
- Monoid, group, semiring structures
- Monotonicity and strict monotonicity of operations
- Distributivity and idempotent addition

**Max-tropical variant**: Use `OrderDual R` instead of `R`.

---

### Summary

This file provides a foundational and highly structured formalization of *tropical algebra* in Lean 4, leveraging type synonyms and equivalence-based API design (à la `Additive`/`Multiplicative`). It emphasizes *minimal assumptions* and *clean API* (e.g., `@[simp]` lemmas, `trop`/`untrop` simplification), enabling downstream development of tropical geometry and related theories.