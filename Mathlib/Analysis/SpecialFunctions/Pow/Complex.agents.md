### Technical Metadata Brief: Complex Power Function (`Complex.cpow`) in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cpow` | `ℂ → ℂ → ℂ` | Definition of complex power: `x ^ y = if x = 0 then if y = 0 then 1 else 0 else exp (log x * y)` |
| `cpow_zero` | `x ^ (0 : ℂ) = 1` | Power with zero exponent yields 1 (including `0^0 = 1`) |
| `cpow_eq_zero_iff` | `x ^ y = 0 ↔ x = 0 ∧ y ≠ 0` | Characterizes when a complex power is zero |
| `zero_cpow` | `x ≠ 0 ⇒ 0 ^ x = 0` | Zero base with nonzero exponent |
| `cpow_one` | `x ^ 1 = x` | Power with exponent 1 |
| `one_cpow` | `1 ^ x = 1` | Power with base 1 |
| `cpow_add` | `x ≠ 0 ⇒ x^(y+z) = x^y * x^z` | Exponential law for addition in exponent (requires nonzero base) |
| `cpow_mul` | `x^(y*z) = (x^y)^z` under arg constraints | Power-of-power law; requires `log x * y` to have imaginary part in `(-π, π]` |
| `cpow_neg` | `x^(-y) = (x^y)⁻¹` | Negative exponent law |
| `cpow_sub` | `x ≠ 0 ⇒ x^(y−z) = x^y / x^z` | Division law for exponents |
| `cpow_int_mul`, `cpow_nat_mul`, `cpow_ofNat_mul` | Various integer/natural versions of `x^(n*y) = (x^y)^n` | Generalized power-of-power for integer/natural scalars |
| `cpow_intCast`, `cpow_natCast` | `(n : ℂ) ^ z = n ^ z` for `n : ℤ` or `ℕ` | Compatibility with coercion of naturals/integers to complexes |
| `cpow_nat_inv_pow` | `(x^(n⁻¹))^n = x` for `n ≠ 0` | Inverse law for rational exponents (e.g., square root) |
| `pow_cpow_nat_inv`, `pow_cpow_ofNat_inv`, `sq_cpow_two_inv` | `(x^n)^(1/n) = x` under arg constraints | Principal branch inverse law (e.g., `sqrt(x^2) = x` if `Re(x) > 0`) |
| `mul_cpow_ofReal_nonneg` | `(a * b)^r = a^r * b^r` for `a, b ≥ 0` | Multiplicative property for nonnegative reals embedded in ℂ |
| `inv_cpow_eq_ite`, `conj_cpow_eq_ite` | Conditional identities for `x⁻¹^y` and `conj(x)^y` | Handle branch cut at `arg(x) = π` (negative real axis) |
| `inv_cpow`, `conj_cpow`, `cpow_conj` | Simplified versions of above when `arg(x) ≠ π` | Practical simplifications avoiding `ite` |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cpow_`: Core complex power operations (`cpow_zero`, `cpow_add`, etc.)
  - `zero_`, `one_`: Special cases with base or exponent 0/1 (`zero_cpow`, `one_cpow`)
  - `natCast_`, `intCast_`, `ofNat_`: Coercion compatibility (`cpow_natCast`, `natCast_cpow_natCast_mul`)
  - `inv_`, `conj_`: Interaction with inversion/conjugation (`inv_cpow`, `conj_cpow`)
  - `mul_`, `add_`, `sub_`: Algebraic laws (`cpow_add`, `cpow_mul`, `cpow_sub`)
  - `pow_cpow_`: Inverse laws for rational exponents (`pow_cpow_nat_inv`, `sq_cpow_two_inv`)

- **Suffixes**:
  - `_eq_ite`: Conditional identities involving `ite` (if-then-else), often due to branch cut handling (`inv_cpow_eq_ite`, `conj_cpow_eq_ite`)
  - `_ne_zero`: Nonvanishing results (`natCast_add_one_cpow_ne_zero`)
  - `'` (prime): Alternative versions with different RHS matching (`cpow_int_mul'`, `cpow_nat_mul'`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_all` | Simplification using `cpow_def`, `exp_ne_zero`, `log_exp`, etc. |
| `split_ifs` | Eliminate nested `if` expressions in `cpow_def` |
| `rw` / `rwa` | Rewrite using lemmas (e.g., `cpow_def_of_ne_zero`, `log_exp`) |
| `rcases` / `by_cases` | Case analysis on equalities (`x = 0`, `n = 0`, `x.arg = π`) |
| `exact` / `assumption_mod_cast` | Finish proofs or apply assumptions after type coercion |
| `rwa` | Rewrite + apply assumption (e.g., in `pow_cpow_nat_inv`) |
| `norm_cast` | Normalize casts between `ℕ`, `ℤ`, `ℂ` |
| `rfl` | Reflexivity for definitional equalities (e.g., after `simp_rw`) |
| `congr'` / `congr` | Congruence for functional extensionality (rare, but used in `prove_rpow'`) |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **case analysis** on whether the base is zero (`x = 0` or `x ≠ 0`) or exponent is zero.
  - For nonzero base, reduce to `exp (log x * y)` and apply properties of `exp`, `log`, and complex arithmetic.
  - Branch cut handling (`arg(x) = π`) is isolated via `ite`-based lemmas (`inv_cpow_eq_ite`, `conj_cpow_eq_ite`), with simplified versions (`inv_cpow`, `conj_cpow`) when `arg(x) ≠ π`.
  - Integer/natural exponent laws often use induction or reduction to `exp_int_mul`/`exp_nat_mul`.
  - Inverse laws (`(x^n)^(1/n) = x`) require **argument bounds** (`-(π/n) < x.arg ≤ π/n`) to stay within principal branch.

- **Common Patterns**:
  - `rcases eq_or_ne x 0 with rfl | hx` → split on `x = 0`
  - `split_ifs <;> simp [*, exp_ne_zero]` → resolve `if` branches
  - `rw [cpow_def_of_ne_zero hx]` → simplify nonzero base case
  - `rwa [div_lt_iff₀', neg_div]` → manipulate inequalities involving real arguments

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Analysis.SpecialFunctions.Complex.Log
  ```
  - Provides `Complex.log`, `Complex.exp`, and their properties (e.g., `log_exp`, `exp_log`, `log_im`, `arg`).

- **Open namespaces**:
  ```lean
  open Real Topology Filter ComplexConjugate Finset Set
  ```
  - `Real`: For real embeddings (`ofReal`), inequalities, `arg`, `pi`, etc.
  - `ComplexConjugate`: For `conj`, `RCLike.conj_inv`, etc.
  - Others: Standard set/topological operations.

---

### Summary

This module formalizes the **principal branch complex power function** `x^y = exp(y log x)` in Lean 4, carefully handling:
- The branch cut along the negative real axis (`arg = π`)
- Special cases (`0^0 = 1`, `0^y = 0` for `y ≠ 0`)
- Compatibility with integer/natural coercion
- Algebraic laws (additive/multiplicative exponents, inverses, conjugation)

It is foundational for complex analysis in Mathlib, especially for fractional powers, roots, and analytic continuation. The proofs emphasize **case analysis**, **argument constraints**, and **branch cut awareness**, with extensive use of `exp`/`log` identities.