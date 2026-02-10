### Technical Brief: Named Commutative Ring Identities in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type Signature | Purpose |
|------|----------------|---------|
| `sq_add_sq_mul_sq_add_sq` | `(x₁² + x₂²) * (y₁² + y₂²) = (x₁y₁ - x₂y₂)² + (x₁y₂ + x₂y₁)²` | Brahmagupta–Fibonacci identity: product of sums of two squares is a sum of two squares (complex numbers norm multiplicativity). |
| `sq_add_mul_sq_mul_sq_add_mul_sq` | `(x₁² + n·x₂²) * (y₁² + n·y₂²) = (x₁y₁ - n·x₂y₂)² + n·(x₁y₂ + x₂y₁)²` | Generalized Brahmagupta identity for quadratic forms with parameter `n`. |
| `pow_four_add_four_mul_pow_four` | `a⁴ + 4b⁴ = ((a - b)² + b²) * ((a + b)² + b²)` | Sophie Germain identity in factored form (sum of fourth powers + 4×fourth power). |
| `pow_four_add_four_mul_pow_four'` | `a⁴ + 4b⁴ = (a² - 2ab + 2b²) * (a² + 2ab + 2b²)` | Equivalent factorization of Sophie Germain identity into irreducible quadratics over ℤ. |
| `sum_four_sq_mul_sum_four_sq` | Product of two sums of four squares = sum of four squares (explicit formula) | Euler’s four-square identity (quaternion norm multiplicativity). |
| `sum_eight_sq_mul_sum_eight_sq` | Product of two sums of eight squares = sum of eight squares (explicit 8-term formula) | Degen’s eight-square identity (octonion norm multiplicativity). |

All theorems are stated in a general `CommRing R`, making them universally valid in any commutative ring.

---

#### **2. Naming Conventions**

- **Prefixes**:  
  - `sq_` / `pow_four_`: indicate squares or fourth powers.  
  - `sum_` / `sum_` + `_sq`: indicates sum of squares (e.g., `sum_four_sq`, `sum_eight_sq`).  
  - `mul_`: used when expressing multiplication of expressions (e.g., `sq_add_sq_mul_sq_add_sq`).  

- **Suffixes**:  
  - `_mul_`: separates operands in product identities.  
  - `'` (prime): alternate version of a theorem (e.g., `pow_four_add_four_mul_pow_four` vs `pow_four_add_four_mul_pow_four'`).  

- **Descriptive names**: Named after historical mathematicians (Brahmagupta, Fibonacci, Sophie Germain, Euler, Degen), reflecting mathematical heritage.

---

#### **3. Tactic Stack**

- **Primary tactic**: `ring`  
  - Used in *every* proof.  
  - Automatically proves polynomial identities in commutative rings by normalizing both sides.

- **No additional tactics** are used beyond `ring`.  
  - No `simp`, `rw`, `induction`, or `linarith` — the identities are purely equational and handled by ring normalization.

---

#### **4. Proof Logic**

- **Uniform structure**:  
  - All proofs follow the same pattern:  
    1. State the identity as an equality of two ring expressions.  
    2. Apply `ring`, which expands, rewrites, and simplifies using commutative ring axioms (associativity, commutativity, distributivity, etc.) to verify equality.  
- **No case analysis or induction** — all identities are *polynomial identities*, valid in any commutative ring, and thus decidable by ring normalization.

---

#### **5. Imports**

- **Core dependency**:  
  ```lean
  import Mathlib.Tactic.Ring
  ```
  - Provides the `ring` tactic for proving equalities in commutative rings.

- **No other imports** — minimal and focused on the task of verifying polynomial identities.

---

### Summary

This module formalizes a suite of classical algebraic identities in the generality of `CommRing R`. All proofs are automated via `ring`, leveraging Lean’s built-in polynomial simplification. The naming conventions reflect both mathematical content and historical provenance, while the structure emphasizes reusability and clarity in formalized algebra.