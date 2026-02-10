### Technical Brief: Chebyshev Polynomials and Trigonometric Identities in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `T ℂ n` | `Polynomial ℂ` | `n`-th Chebyshev polynomial of the first kind over `ℂ` |
| `U ℂ n` | `Polynomial ℂ` | `n`-th Chebyshev polynomial of the second kind over `ℂ` |
| `C ℂ n` | `Polynomial ℂ` | Rescaled (Vieta–Lucas) Chebyshev polynomial of the first kind: `C = 2 * T ∘ (X / 2)` |
| `S ℂ n` | `Polynomial ℂ` | Rescaled (Vieta–Fibonacci) Chebyshev polynomial of the second kind: `S = U ∘ (X / 2)` |
| `T_complex_cos` | `(n : ℤ) → (T ℂ n).eval (cos θ) = cos (n * θ)` | Core identity: `T_n(cos θ) = cos(nθ)` for complex `θ` |
| `U_complex_cos` | `(n : ℤ) → (U ℂ n).eval (cos θ) * sin θ = sin((n+1)θ)` | Identity for `U_n`: `U_n(cos θ)·sin θ = sin((n+1)θ)` |
| `C_two_mul_complex_cos` | `(n : ℤ) → (C ℂ n).eval (2 * cos θ) = 2 * cos(nθ)` | Rescaled version: `C_n(2 cos θ) = 2 cos(nθ)` |
| `S_two_mul_complex_cos` | `(n : ℤ) → (S ℂ n).eval (2 * cos θ) * sin θ = sin((n+1)θ)` | Rescaled `U_n` identity |
| `T_complex_cosh` | `(n : ℤ) → (T ℂ n).eval (cosh θ) = cosh(nθ)` | Hyperbolic analog: `T_n(cosh θ) = cosh(nθ)` |
| `U_complex_cosh` | `(n : ℤ) → (U ℂ n).eval (cosh θ)·sinh θ = sinh((n+1)θ)` | Hyperbolic analog for `U_n` |
| `C_two_mul_complex_cosh`, `S_two_mul_complex_cosh` | Similar to above, for `cosh` | Rescaled hyperbolic identities |
| `T_real_cos`, `U_real_cos`, etc. | Real versions of above theorems | Derived via `mod_cast` from complex versions |

> **Note**: All theorems are stated for `n : ℤ`, not just `ℕ`, indicating extension to negative indices via recurrence.

---

#### **2. Naming Conventions**

- **Polynomial families**:
  - `T`, `U`: Standard Chebyshev polynomials of first/second kind.
  - `C`, `S`: Rescaled versions (Vieta–Lucas / Vieta–Fibonacci), often defined via composition:  
    - `C = 2 * T ∘ (X / 2)`  
    - `S = U ∘ (X / 2)`

- **Theorems**:
  - `*_complex_*`: Complex cosine/hyperbolic cosine identities.
  - `*_real_*`: Real versions, obtained via `mod_cast`.
  - `*_two_mul_*`: Rescaled versions evaluated at `2 * cos θ` or `2 * cosh θ`.
  - `eval_` prefix: Used in helper lemmas like `algebraMap_eval_T`, `algebraMap_eval_U`, etc.

- **Suffixes**:
  - `_cos`, `_cosh`: Distinguish trigonometric vs hyperbolic contexts.
  - `_real`, `_complex`: Scope of the theorem.

---

#### **3. Tactic Stack**

- **Induction**: `induction n using Polynomial.Chebyshev.induct`  
  → Uses a specialized induction principle for integer-indexed Chebyshev polynomials (handles `0`, `1`, `n+2`, `-(n+1)`).

- **Simplification**:
  - `simp only [...]`: Exploits recurrence relations (`T_add_two`, `T_sub_one`, `U_add_two`, `U_sub_one`), evaluation rules (`eval_X`, `eval_mul`, `eval_ofNat`, `eval_sub`), andIHs.
  - `simp [def]`: For definitions like `C_eq_two_mul_T_comp_half_mul_X`, `S_eq_U_comp_half_mul_X`.

- **Algebraic manipulation**:
  - `ring_nf`: Normalizes polynomial expressions after simplification.
  - `push_cast`: Lifts real expressions to complex for uniform reasoning.

- **Trigonometric identities**:
  - `cos_add_cos`, `sin_add_sin`: Used to verify recurrence matches angle addition formulas.

- **Complex analysis**:
  - `cos_mul_I`, `sin_mul_I`: Relate trigonometric and hyperbolic functions via `I`.

- **Casting**:
  - `mod_cast`: Propagates complex identities to real ones.

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs proceed by **integer induction** using `Polynomial.Chebyshev.induct`, which covers:
    - Base cases: `n = 0`, `n = 1`
    - Positive step: `n ≥ 0 ⇒ n+2`
    - Negative step: `n ≤ -1 ⇒ -(n+1)`
  - Each case reduces to verifying that the recurrence relation for Chebyshev polynomials matches the corresponding trigonometric/hyperbolic identity (e.g., `cos((n+2)θ) = 2 cos θ cos((n+1)θ) − cos(nθ)`).

- **Hyperbolic proofs**:
  - Use analytic continuation via `cos(iθ) = cosh θ`, `sin(iθ) = i sinh θ`.
  - Chain of equalities:  
    `T_n(cosh θ) = T_n(cos(iθ)) = cos(n·iθ) = cosh(nθ)`.

- **Rescaled versions**:
  - Follow immediately from definitions and substitution (e.g., `C_n(2x) = 2 T_n(x)` ⇒ `C_n(2 cos θ) = 2 cos(nθ)`).

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Data.Complex.Exponential`: Provides `cos`, `sin`, `cosh`, `sinh`, and identities like `cos_mul_I`.
  - `Mathlib.Data.Complex.Module`: Enables algebraic reasoning over `ℂ` as an `ℝ`-algebra.
  - `Mathlib.RingTheory.Polynomial.Chebyshev`: Defines `T`, `U`, `C`, `S` and their recurrence relations.

- **Scope**:
  - Focuses on **evaluation identities** of Chebyshev polynomials at trigonometric/hyperbolic arguments.
  - Works uniformly over `ℝ` and `ℂ`, with `ℂ` as the primary setting and `ℝ` derived via restriction/casting.
  - Handles **integer indices**, not just natural numbers.

---

### Summary

This file formalizes the classical **multiple-angle formulas** for Chebyshev polynomials, establishing that:
- `T_n(cos θ) = cos(nθ)`,  
- `U_n(cos θ)·sin θ = sin((n+1)θ)`,  
- and analogous identities for `cosh`, with rescaled variants.

The proofs rely on **recurrence-based induction**, **complex-analytic connections** between trigonometric and hyperbolic functions, and **Lean’s algebraic infrastructure** for polynomial evaluation and field extensions. The structure is clean, modular, and leverages `mod_cast` to avoid duplication between real and complex cases.