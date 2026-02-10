### Technical Metadata Brief: `Conjugation-Negation Operator` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `conjneg` | `def conjneg (f : G → R) : G → R := conj fun x ↦ f (-x)` | Defines the *conjugation-negation* operator: `x ↦ conj(f(-x))`. Central to adjoints of convolution operators. |
| `conjneg_apply` | `conjneg f x = conj (f (-x))` | Simplifies application of `conjneg`. |
| `conjneg_conjneg` | `conjneg (conjneg f) = f` | Shows `conjneg` is an involution (its own inverse). |
| `conjneg_involutive` | `Involutive (conjneg)` | Formalizes that `conjneg ∘ conjneg = id`. |
| `conjneg_bijective`, `conjneg_injective`, `conjneg_surjective` | Consequences of involutivity | Guarantees `conjneg` is a bijection/injection/surjection. |
| `conjneg_inj`, `conjneg_ne_conjneg` | `conjneg f = conjneg g ↔ f = g`, `conjneg f ≠ conjneg g ↔ f ≠ g` | Injectivity and its contrapositive form. |
| `conjneg_conj` | `conjneg (conj f) = conj (conjneg f)` | Commutativity of `conjneg` with pointwise complex conjugation. |
| `conjneg_zero`, `conjneg_one`, `conjneg_add`, `conjneg_mul` | Preservation of `0`, `1`, `+`, `*` | Shows `conjneg` is a *ring homomorphism* (in `CommSemiring` case). |
| `conjneg_sum`, `conjneg_prod` | `conjneg (∑ i ∈ s, f i) = ∑ i ∈ s, conjneg (f i)` etc. | Extends homomorphic behavior to finite sums/products. |
| `conjneg_eq_zero`, `conjneg_eq_one`, `conjneg_ne_zero`, `conjneg_ne_one` | Equivalences for zero/one preservation | Useful for reasoning about support and invertibility. |
| `sum_conjneg` | `∑ a, conjneg f a = ∑ a, conj (f a)` | Relates total sum under `conjneg` to sum of conjugates (uses `Equiv.neg`). |
| `support_conjneg` | `support (conjneg f) = -support f` | Describes how support transforms under `conjneg`. |
| `conjnegRingHom` | `def conjnegRingHom : (G → R) →+* (G → R)` | Bundled ring homomorphism version of `conjneg`. |
| `conjneg_sub`, `conjneg_neg` | In `CommRing` setting: preserves subtraction and negation | Extends ring homomorphism to full ring structure. |

---

#### **2. Naming Conventions**

- **Prefix `conjneg_`**: All definitions/lemmas related to the operator start with `conjneg_`.
- **`_apply`**: For evaluation at a point (`conjneg_apply`).
- **`_involutive`, `_bijective`, `_injective`, `_surjective`**: Properties derived from involutivity.
- **`_eq_zero`, `_eq_one`, `_ne_zero`, `_ne_one`**: Characterizations of when `conjneg f` equals/≠ `0`/`1`.
- **`_sum`, `_prod`**: Behavior over finite sums/products.
- **`_RingHom`**: Bundled homomorphism version.
- **`_sub`, `_neg`**: Additional structure in `CommRing` context.

---

#### **3. Tactic Stack**

- **`ext`**: Used repeatedly to prove function extensionality (e.g., `by ext; simp`).
- **`simp`**: Heavily used to simplify using `@[simp]` lemmas and definitions.
- **`rw`**: For rewriting using equivalences (e.g., `← conjneg_inj`).
- **` rfl`**: For trivial equalities (e.g., `rfl` in `conjneg_conj`).
- **`Fintype.sum_equiv`**: Used in `sum_conjneg` to apply equivalence-based summation rewrite.

---

#### **4. Proof Logic**

- **Function Extensionality**: Most proofs use `ext` to reduce to pointwise equality.
- **Simplification + Rewriting**: After `ext`, `simp` discharges goals using:
  - `conjneg_apply`
  - `starRingEnd_apply`
  - Properties of `conj`, `neg`, and arithmetic.
- **Involutive ⇒ Bijective**: General categorical principle used to derive injectivity/surjectivity/bijectivity.
- **Homomorphism proofs**: Verified by checking preservation of `0`, `1`, `+`, `*` (and `-`, `-` in `CommRing`), then applying `ext; simp`.
- **Support transformation**: Uses `ext` + `simp [starRingEnd_apply]` to reduce to membership equivalence.

---

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.Algebra.BigOperators.Pi`: For `∑`, `∏` over finite sets/functions.
  - `Mathlib.Algebra.Group.Pointwise.Set.Basic`: For set negation (`-s`) and related operations.
  - `Mathlib.Algebra.Star.Pi`: For `conj` (star ring endomorphism) on function spaces.

- **Type Class Assumptions**:
  - `[AddGroup G]`: Allows negation on `G`.
  - `[CommSemiring R] [StarRing R]`: For `conj : R → R` and ring operations.
  - `[CommRing R] [StarRing R]`: Extends to subtraction/negation.

- **Scope**:
  - `open Function`: For function extensionality and composition.
  - `open scoped ComplexConjugate`: For `conj` notation.

---

### Summary

This file formalizes the *conjugation-negation* operator `conjneg`, a key tool in harmonic analysis (e.g., adjoints of convolution). It establishes that `conjneg` is an involutive ring automorphism on function spaces `G → R`, with explicit behavior on algebraic operations, support, and sums. The proofs rely heavily on function extensionality and simplification, leveraging Lean’s `@[simp]` infrastructure and bundled homomorphism patterns.