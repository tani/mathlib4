### Technical Metadata Brief: `Mathlib.Data.ENat.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ENat` | `ℕ∞ := WithTop ℕ` | Extended natural numbers: naturals plus a top element `⊤` (∞). |
| `lift` | `x : ℕ∞ → x < ⊤ → ℕ` | Extracts the finite part of a non-top `ENat`. |
| `toNat` | `ℕ∞ → ℕ` | Total function sending `⊤` to `0`. |
| `toNatHom` | `MonoidWithZeroHom ℕ∞ ℕ` | Monoid homomorphism version of `toNat`. |
| `map` | `(f : ℕ → α) → ℕ∞ → WithTop α` | Lifts a function on `ℕ` to `ENat`. |
| `ENatMap` (for various homs) | e.g., `AddHom.ENatMap`, `RingHom.ENatMap` | Canonical extensions of structure-preserving maps to `ENat`. |
| `some_eq_coe` | `(WithTop.some : ℕ → ℕ∞) = Nat.cast` | Equates the two coercions `ℕ → ℕ∞`. |
| `coe_inj` | `(a : ℕ∞) = b ↔ a = b` | Injectivity of coercion `ℕ → ℕ∞`. |
| `add_lt_top` | `a + b < ⊤ ↔ a < ⊤ ∧ b < ⊤` | Sum is finite iff both summands are. |
| `lift_add` | `lift (a + b) h = lift a h₁ + lift b h₂` | `lift` preserves addition on finite sums. |
| `toNat_add` | `m ≠ ⊤ → n ≠ ⊤ → toNat (m + n) = toNat m + toNat n` | `toNat` preserves addition on finite elements. |
| `toNat_le_of_le_coe` | `m ≤ n → toNat m ≤ n` | Monotonicity of `toNat` w.r.t. finite bounds. |
| `nat_induction` | Induction principle over `ENat` | Structural induction: base `0`, step `n → n+1`, limit `⊤`. |
| `addLECancellable_of_ne_top` | `a ≠ ⊤ → AddLECancellable a` | Finite elements are left-cancellable for addition. |
| `sub_sub_cancel` | `a ≠ ⊤ → b ≤ a → a - (a - b) = b` | Subtraction cancellation for finite `a`. |
| `mul_top`, `top_mul`, `top_pow` | `m * ⊤ = ⊤`, etc. | Multiplication with `⊤` yields `⊤` (if nonzero). |
| `top_sub_coe`, `sub_top` | `⊤ - n = ⊤`, `n - ⊤ = 0` | Subtraction involving `⊤`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `coe_`: Coercion from `ℕ` to `ℕ∞`.
  - `lift_`: Extraction of finite part.
  - `toNat_`: Totalization of `lift`.
  - `map_`: Extension of functions to `ENat`.
  - `ENatMap`: Homomorphism-specific extensions (e.g., `AddHom.ENatMap`).
  - `mul_top`, `top_mul`, `top_sub`, `sub_top`: Interaction with `⊤`.

- **Suffixes:**
  - `_iff`: Characterizations involving `↔`.
  - `_le_iff`, `_lt_iff`: Order-theoretic characterizations.
  - `_ne_top`, `_top_ne`: Properties distinguishing finite vs infinite.

- **Special:**
  - `recTopCoe_`: Recursor for `ENat` (inductive definition).
  - `no_index (OfNat.ofNat _)`: Avoids ambiguity in overloaded numerals.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification with many `@[simp]` lemmas.
- `rw`: Rewriting using equalities like `coe_inj`, `add_lt_top`, etc.
- `induction'` / `cases`: Structural induction on `ENat` (finite vs `⊤`).
- `lift ... using ...`: Use `CanLift` instance to reduce to `ℕ`.
- `apply coe_inj.1`: Prove equality in `ENat` by pulling back to `ℕ`.
- `norm_cast`: Normalize casts between `ℕ` and `ℕ∞`.
- `aesop`, `linarith`: For order reasoning (less frequent).
- ` rfl`: Many lemmas are definitional.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  1. **Case analysis** on whether the element is finite (`n : ℕ`) or `⊤`.
  2. **Lifting** finite elements to `ℕ` via `CanLift` or `lift`.
  3. Applying known lemmas about `WithTop` (e.g., `WithTop.add_lt_top`, `WithTop.mul_top`).
  4. Using `coe_inj` to reduce equality goals to `ℕ`.
  5. For homomorphism extensions (e.g., `RingHom.ENatMap`), verifying compatibility on finite and infinite cases separately.

- **Key logical pattern**:
  > *Finite case*: reduce to `ℕ`, apply classical arithmetic lemmas.  
  > *Infinite case*: use `top_*` lemmas (absorbing behavior).  
  > *Mixed case*: use `ne_top_of_le_ne_top`, `add_lt_top`, etc., to split conditions.

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.Algebra.CharZero.Lemmas`: For `CharZero` instance on `ENat`.
- `Mathlib.Algebra.Order.Ring.WithTop`: Order-theoretic structure on `WithTop`.
- `Mathlib.Algebra.Order.Sub.WithTop`: Subtraction behavior in `WithTop`.
- `Mathlib.Data.ENat.Defs`: Basic definitions (likely re-exported here).
- `Mathlib.Data.Nat.Cast.Order.Basic`: Interaction of `Nat.cast` with order.
- `Mathlib.Data.Nat.SuccPred`: Successor/predecessor lemmas.
- `Mathlib.Order.Nat`: Order-theoretic facts about `ℕ`.

> **Note**: `ENat` is defined as `WithTop ℕ`, so most properties are inherited from `WithTop`. The file focuses on:
> - Coercion unification (`WithTop.some = Nat.cast`)
> - Finite/infinite case analysis
> - Homomorphic extensions (`map`, `ENatMap`)
> - Cancellation and absorbance properties (key for reasoning about arithmetic in `ENat`).

--- 

Let me know if you'd like a dependency graph or a summary of how `ENat` relates to `ENNReal`.