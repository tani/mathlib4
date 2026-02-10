### Technical Metadata Brief: `RCLike` Typeclass in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RCLike` | `class RCLike (K : Type*) extends ...` | Typeclass capturing structure shared by `ℝ` and `ℂ`, including real/imaginary parts, conjugation, norm, and order. |
| `re`, `im` | `K →+ ℝ` | Additive monoid homomorphisms extracting real and imaginary parts. |
| `I` | `K` | Imaginary unit; `I = 0` for `ℝ`, `I * I = -1` for `ℂ`. |
| `ofReal` | `ℝ → K` | Coercion from `ℝ` to `K`, defined as `algebraMap ℝ K`. |
| `conj` | `K → K` | Complex conjugation; ring automorphism with `conj z = re z - im z * I`. |
| `normSq` | `K →*₀ ℝ` | Multiplicative monoid homomorphism: `normSq z = re z² + im z²`. |
| `ext` / `ext_iff` | `z = w ↔ re z = re w ∧ im z = im w` | Extensionality principle: equality determined by real/imaginary parts. |
| `mul_conj` | `z * conj z = ‖z‖²` | Fundamental identity linking multiplication with conjugation and norm. |
| `inv_def` | `z⁻¹ = conj z * (‖z‖²)⁻¹` | Explicit formula for inverse using conjugation and norm. |
| `is_real_TFAE` | `TFAE [conj z = z, ∃ r : ℝ, (r : K) = z, ↑(re z) = z, im z = 0]` | Equivalent characterizations of real elements in `K`. |
| `Real.instRCLike` | `RCLike ℝ` | Instance for real numbers: `re = id`, `im = 0`, `I = 0`. |
| `normSq_eq_def'` | `normSq z = ‖z‖²` | Equivalence of `normSq` and squared norm. |
| `norm_conj` | `‖conj z‖ = ‖z‖` | Norm is invariant under conjugation. |
| `CStarRing K` | Instance | `K` is a C*-ring: `‖x * x‖ ≤ ‖x‖²`, proved via `norm_mul_self_le`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofReal_`: coercions from `ℝ` to `K`.
  - `re_`, `im_`: properties of real/imaginary parts.
  - `conj_`: properties of conjugation.
  - `normSq_`, `norm_`: norm-related lemmas.
  - `mul_`, `add_`, `sub_`, `div_`: algebraic operation properties.
  - `star_`: star-ring operations (`star = conj`).
- **Suffixes**:
  - `_ax`: axioms from the `RCLike` class definition.
  - `_def`, `_def'`: definitions or their symmetric variants.
  - `_iff`: characterizations via biconditionals.
  - `_TFAE`: "The Following Are Equivalent" lemmas.
- **Special**:
  - `rclike_simps`: custom simp-attribute for frequently used simplification lemmas.
  - `norm_cast`: for lemmas enabling `norm_cast` tactic (coercion simplification).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]` — heavily used with `rclike_simps`, `norm_cast`, and custom lemmas.
- `rw [...]` — rewriting using axioms, definitions, and lemmas.
- `ring` — for algebraic simplifications (especially in `normSq_mul`, `normSq_add`, etc.).
- `aesop` — automated reasoning for order and existential goals (e.g., `is_real_TFAE`, order lemmas).
- `tfae_have`, `tfae_finish` — for proving equivalence chains.
- `field_simp`, `simp_rw` — for field operations and inverses.
- `conv_rhs => rw [...]` — for targeted rewriting in complex expressions.
- `apply ext <;> simp [...]` — proving equality via extensionality + simplification.

---

#### **4. Proof Logic**

- **Structure**: Proofs typically follow a modular pattern:
  1. **Unfold definitions** (`re_add_im`, `conj_eq_re_sub_im`, `normSq_apply`, etc.).
  2. **Apply axioms** (`mul_re_ax`, `conj_re_ax`, etc.) to reduce to `ℝ` arithmetic.
  3. **Simplify using `rclike_simps`** and `norm_cast` lemmas.
  4. **Use extensionality (`ext`)** to reduce equality to real/imaginary parts.
  5. **Leverage order properties** (`le_iff_re_im`) for inequalities.
- **Induction**: Rare; most proofs are direct algebraic manipulations.
- **Case analysis**: Used for `I_mul_I_ax` (`I = 0 ∨ I * I = -1`) and `eq_or_ne z 0`.
- **Equivalence chaining**: `tfae` for multiple equivalent conditions (e.g., realness).
- **Norm arguments**: Often reduce to `normSq` and use `sqrt_normSq_eq_norm`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Algebra.Field` | Field algebra, scalar multiplication, `algebraMap`. |
| `Mathlib.Algebra.BigOperators.Balance` | `balance`, `expect`, used in `ofReal_balance`, `ofReal_expect`. |
| `Mathlib.Algebra.Order.BigOperators.Expect` | Expectation over finite sets. |
| `Mathlib.Algebra.Order.Star.Basic` | Star rings, `conj`, `star`. |
| `Mathlib.Analysis.CStarAlgebra.Basic` | C*-ring structure, norm properties. |
| `Mathlib.Analysis.Normed.Operator.ContinuousLinearMap` | Normed spaces, scalar multiplication. |
| `Mathlib.Data.Real.Sqrt` | Square root, used in `sqrt_normSq_eq_norm`. |
| `Mathlib.LinearAlgebra.Basis.VectorSpace` | Vector space structure over `K`. |

---

### Summary

The `RCLike` typeclass provides a unified framework for real and complex analysis in Lean 4. Its design emphasizes:
- **API compatibility** with `ℂ` (e.g., `re`, `im`, `conj`, `I`, `normSq`).
- **Coercion safety** via `CoeTC` with priority 900 to avoid circular coercions.
- **Modularity**: proofs for `K : RCLike` automatically apply to both `ℝ` and `ℂ`.
- **Simplicity**: most lemmas are `@[simp]` or `@[rclike_simps]`, enabling automation.

This module is foundational for higher-level developments like inner product spaces and Hilbert spaces over `ℝ`/`ℂ`.