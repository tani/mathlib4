### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `isCauSeq_abs_exp` | Shows the sequence of partial sums of `∑ |z|^n / n!` is Cauchy (via ratio test). |
| `isCauSeq_exp` | Derives that the complex exponential series is Cauchy (from `isCauSeq_abs_exp`). |
| `exp'` | Cauchy sequence of partial sums of complex exponential series. |
| `exp` | Complex exponential function defined as limit of `exp'`. |
| `sin`, `cos`, `tan`, `cot`, `sinh`, `cosh`, `tanh` | Definitions via `exp` (e.g., `sin z = (exp(-z*I) - exp(z*I)) * I / 2`). |
| `exp_zero`, `exp_add`, `exp_ne_zero`, `exp_neg`, `exp_sub` | Fundamental algebraic properties of `exp`. |
| `expMonoidHom` | `exp` as a monoid homomorphism from `Multiplicative ℂ` to `ℂ`. |
| `exp_list_sum`, `exp_sum`, `exp_nsmul`, `exp_nat_mul`, `exp_int_mul` | Generalizations of `exp_add` to sums over lists, multisets, finite sums, natural/integer multiples. |
| `exp_conj`, `exp_ofReal`, `exp_ofReal_re`, `exp_ofReal_im` | Interaction of `exp` with conjugation, real embedding, real/imag parts. |
| `sin_add`, `cos_add`, `sinh_add`, `cosh_add`, etc. | Addition formulas for trig/hyperbolic functions. |
| `sin_sq_add_cos_sq`, `cosh_sq_sub_sinh_sq` | Pythagorean identities. |
| `exp_mul_I`, `exp_add_mul_I`, `exp_eq_exp_re_mul_sin_add_cos` | Euler’s formula and its generalizations. |
| `cos_add_sin_mul_I_pow` | De Moivre’s formula: `(cos z + sin z * I)^n = cos(nz) + sin(nz)*I`. |
| `ofReal_exp`, `ofReal_sin`, `ofReal_cos`, `ofReal_tan`, `ofReal_sinh`, `ofReal_cosh`, `ofReal_tanh` | Embedding real trig/hyperbolic functions into complex ones. |
| `exp_ofReal_mul_I_re`, `exp_ofReal_mul_I_im` | Real/imag parts of `exp(i*x)` for real `x`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isCauSeq_`: Proves a sequence is Cauchy.
  - `ofReal_`: Embeds real-valued functions into complex domain.
  - `exp_`, `sin_`, `cos_`, `sinh_`, `cosh_`, `tanh_`, `tan_`, `cot_`: Function-specific lemmas.
  - `mul_`, `div_`, `add_`, `sub_`: Operate on sums/products/differences.
  - `sq_`, `pow_`, `nsmul_`, `int_mul_`: Power/multiplication variants.
  - `neg_`, `inv_`, `conjugate_`: Symmetry/involution properties.
- **Suffixes**:
  - `_aux`: Internal auxiliary lemmas (e.g., `sinh_add_aux`, `cosh_add_aux`).
  - `_re`, `_im`: Real/imaginary part lemmas.
  - `_ofReal_`: Real-to-complex coercion lemmas.
  - `_conj`: Behavior under complex conjugation.
  - `_mul_I`: Behavior under multiplication by `I`.
- **Notable patterns**:
  - `two_`, `three_mul_`: Double/triple angle formulas.
  - `sub_`, `add_`: Sum-to-product or product-to-sum identities.
  - `sq_`: Squared identities.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `refine`, `convert`, `congr`, `ext`, `cases`, `induction`
- **Algebraic simplification**:
  - `ring`, `field_simp`, `norm_cast`, `divisors_class`, `mul_inv_cancel₀`, `div_mul_cancel₀`
- **Analysis/limits**:
  - `lim_eq_of_equiv_const`, `cauchy_product`, `series_ratio_test`
- **Order/inequality**:
  - `gcongr`, `abs_le`, `le_add_of_nonneg_right/left`, `sq_nonneg`
- **Specialized**:
  - `Finset.sum_congr`, `sum_range_succ`, `pow_succ`, `Nat.cast_*`
  - `conj_eq_iff_re`, `ofReal_injective`, `ofReal_inj`
  - `mul_left_inj'`, `mul_right_inj'`, `div_eq_mul_inv`, `sub_eq_iff_eq_add`

#### 4. **Proof Logic**

- **Structure**:
  - **Series convergence proofs**: Use ratio test (`series_ratio_test`) or comparison (`of_abv`).
  - **Functional identities**: Often reduce to algebraic manipulation of `exp`, using:
    - `exp_add` as the core identity.
    - `exp_neg`, `exp_sub`, `exp_mul_I`, `exp_conj` to handle signs, imaginary units, conjugates.
    - `lim_mul_lim`, `lim_conj`, `lim_eq_lim_of_equiv` for limits.
  - **Real vs complex**: Use `ofReal_*` lemmas and `ofReal_injective` to lift real identities.
  - **Trigonometric/hyperbolic identities**: Derive from exponential definitions + algebraic lemmas (`sinh_add_aux`, `cosh_add_aux`, etc.).
  - **De Moivre / Euler**: Prove via induction using `exp_mul_I` and `exp_add`.
- **Common flow**:
  1. Reduce to exponential form.
  2. Apply `exp_add` or its variants.
  3. Simplify using ring/field tactics.
  4. Use injectivity (`ofReal_injective`, `lim_injective`) to lift equalities.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.CauSeq.BigOperators` | Cauchy sequences, series convergence, big operators. |
| `Mathlib.Algebra.Order.Star.Basic` | Star operations (e.g., complex conjugation). |
| `Mathlib.Data.Complex.Abs` | Absolute value on ℂ, used in Cauchy analysis. |
| `Mathlib.Data.Complex.BigOperators` | Summation over finite sets in ℂ. |
| `Mathlib.Data.Nat.Choose.Sum` | Binomial identities (used in `exp_add` proof). |
| `Mathlib.Tactic.Bound.Attribute` | Bounded quantifier tactics (e.g., `gcongr`). |

---

This module formalizes the *foundational theory* of complex and real exponential, trigonometric, and hyperbolic functions in Lean 4, using power series definitions and deriving all standard identities. It emphasizes algebraic structure (monoid homomorphism), analytic properties (Cauchy convergence), and interaction between real/complex domains.