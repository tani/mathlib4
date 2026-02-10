### Technical Metadata Brief: Complex Logarithm in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `log` | `ℂ → ℂ` | Principal branch of complex logarithm: `log x = log(|x|) + I * arg x`, with `log 0 = 0`. |
| `log_re` | `x.log.re = x.abs.log` | Real part of `log x` is real log of modulus. |
| `log_im` | `x.log.im = x.arg` | Imaginary part of `log x` is argument of `x`. |
| `neg_pi_lt_log_im` | `-π < (log x).im` | Implies principal branch lies in strip `(-π, π]`. |
| `log_im_le_pi` | `(log x).im ≤ π` | Upper bound on imaginary part. |
| `exp_log` | `x ≠ 0 → exp (log x) = x` | `log` is a right-inverse of `exp` on `ℂ \ {0}`. |
| `range_exp` | `Set.range exp = {0}ᶜ` | Image of `exp` is all nonzero complex numbers. |
| `log_exp` | `(-π < x.im ∧ x.im ≤ π) → log (exp x) = x` | `log` is left-inverse of `exp` on the principal strip. |
| `exp_inj_of_neg_pi_lt_of_le_pi` | Injectivity of `exp` on principal strip. |
| `ofReal_log` | `x ≥ 0 → (x.log : ℂ) = log x` | Compatibility with real log on nonnegative reals. |
| `natCast_log`, `ofNat_log` | `Real.log n = log n` for `n : ℕ`, `n ≥ 2`. | Extends real log to natural/OFNat embeddings. |
| `log_ofReal_mul`, `log_mul_ofReal` | `log(r * x) = Real.log r + log x` for `r > 0`, `x ≠ 0`. | Log of real multiple splits. |
| `log_mul_eq_add_log_iff` | `log(x * y) = log x + log y ↔ arg x + arg y ∈ (-π, π]` | When log respects multiplication. |
| `log_zero`, `log_one`, `log_neg_one`, `log_I`, `log_neg_I` | Explicit values: `log 0 = 0`, `log 1 = 0`, `log (-1) = π * I`, etc. | Special-case evaluations. |
| `log_conj_eq_ite`, `log_conj`, `log_inv_eq_ite`, `log_inv` | Behavior under conjugation and inversion, conditional on `arg x = π`. |
| `exp_eq_one_iff` | `exp x = 1 ↔ ∃ n : ℤ, x = n * (2 * π * I)` | Kernel of `exp` is integer multiples of `2πi`. |
| `exp_eq_exp_iff_exists_int` | `exp x = exp y ↔ ∃ n, x = y + n * (2 * π * I)` | Periodicity of `exp`. |
| `log_exp_exists` | `∃ n, log (exp z) = z + n * (2 * π * I)` | Log of exp differs by period. |
| `continuousAt_clog`, `clog` variants | Continuity of `log` on `slitPlane` (ℂ \ (-∞, 0]). | Ensures differentiability and calculus tools. |
| `tsum_tprod` lemmas | `exp (∑' n, log f n) = ∏' n, f n` under absolute convergence. | Infinite product–sum correspondence via log/exp. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `log_`: properties of `log` (e.g., `log_re`, `log_mul`, `log_conj`).
  - `exp_`: properties of `exp` (e.g., `exp_log`, `exp_eq_one_iff`).
  - `ofReal_`, `natCast_`, `ofNat_`: embeddings from `ℝ`, `ℕ`.
  - `continuousAt_`, `Tendsto_`, `ContinuousWithinAt_`, `ContinuousOn_`, `Continuous_`: continuity-related.
  - `HasSum_`, `HasProd_`, `summable_`, `tsum_`, `tprod_`: infinite sum/product convergence.

- **Suffixes**:
  - `_eq_ite`: conditional equality (e.g., `log_conj_eq_ite`).
  - `_iff`: equivalence (e.g., `log_mul_eq_add_log_iff`, `exp_eq_one_iff`).
  - `_of_`: assumptions (e.g., `log_exp`, `exp_inj_of_neg_pi_lt_of_le_pi`).
  - `_nhdsWithin`: local behavior near boundary (e.g., `tendsto_log_nhdsWithin_im_neg_of_re_neg_of_im_zero`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

- `simp` / `simp_rw`: Simplify using definitions (`log`, `arg`, `abs`, `exp`), especially with `ofReal_*`, `arg_*`, `exp_*` lemmas.
- `rw`: Rewrite using key theorems (`exp_log`, `log_exp`, `exp_eq_exp_iff_exists_int`, etc.).
- `exact`, `intro`, `cases`, `rcases`: Standard intro/case analysis.
- `norm_num`: Normalize numeric expressions (e.g., `norm_num` for `2 * π * I ≠ 0`).
- `convert`: For equational reasoning with partial unification (e.g., continuity proofs).
- `lift`: To reduce to real case when imaginary part is zero.
- `split_ifs`: Handle `if ... then ... else ...` cases (e.g., `log_conj_eq_ite`).
- `aesop`, `linarith`, `ring`: For algebraic simplifications (less frequent, but used in `exp_log`).
- `apply`, `exact`, `refine`: For applying lemmas with holes.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern:  
    `rw [log, exp_add_mul_I, ...] → simplify using trigonometric identities (e.g., `sin_arg`, `cos_arg`) → algebraic simplification → conclude`.
  - For continuity/differentiability:  
    Decompose `log x = log(|x|) + I * arg x`, then use continuity of `abs`, `log`, `arg`, and scalar multiplication.
  - For periodicity/kernel results:  
    Use `existsUnique_add_zsmul_mem_Ioc` to reduce to principal strip, then apply `log_exp`.
  - For infinite products:  
    Reduce to real case via `exp_log`, then lift to complex using `exp_log (hfn a x)`.

- **Induction**: Not used here (no inductive structures like `ℕ`-indexed sequences in core lemmas).
- **Case analysis**: On `x = 0`, `x.arg = π`, or `x.im ∈ (-π, π]`.
- **Equational reasoning**: Heavy use of `ext` (extensionality for ℂ), `ext_iff`, and `congr` for functional extensionality.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.SpecialFunctions.Complex.Arg`: Defines `arg`, its properties, continuity, and behavior near branch cut.
  - `Mathlib.Analysis.SpecialFunctions.Log.Basic`: Real logarithm (`Real.log`), continuity, monotonicity, etc.

- **Scope & assumptions**:
  - `noncomputable section`: `log` is noncomputable due to `arg`.
  - `open scoped Real Topology ComplexConjugate`: Uses `I`, `conj`, `abs`, `arg`, `ofReal`, etc.
  - `slitPlane`: Defined as `ℂ \ (-∞, 0]`, the domain where `log` is continuous.
  - **Branch cut**: Principal branch assumes `arg ∈ (-π, π]`; discontinuity at negative reals (`arg = π`).

- **Dependencies**:
  - `Complex`, `Real`, `Filter`, `Topology`, `Bornology`, `Set`.
  - `ContinuousAt`, `Tendsto`, `HasSum`, `HasProd`, `Multipliable` (for infinite products).

---

### Summary

This file formalizes the **principal branch of the complex logarithm**, emphasizing its relationship with `exp`, continuity on the slit plane, and behavior under algebraic operations. It supports calculus (continuity, differentiability), periodicity analysis, and infinite product representations via log/exp. The formalization is precise about branch cuts (`arg = π`) and carefully handles edge cases (`x = 0`, `x ∈ ℝ⁻`).