Here's a structured technical metadata summary of the provided Lean 4 file (`Complex/Arg.lean`), extracted for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `arg : ℂ → ℝ` | `def arg (x : ℂ) : ℝ` | Returns the *principal argument* of a complex number, lying in `(-π, π]`. Defaults to `0` at `0`. |
| `sin_arg` | `∀ x, sin (arg x) = x.im / abs x` | Relates sine of argument to imaginary part over modulus. |
| `cos_arg` | `∀ x ≠ 0, cos (arg x) = x.re / abs x` | Relates cosine of argument to real part over modulus. |
| `abs_mul_exp_arg_mul_I` | `abs x * exp (arg x * I) = x` | Polar decomposition of a complex number using `arg`. |
| `arg_mul_cos_add_sin_mul_I` | `arg (r * (cos θ + sin θ * I)) = θ` for `r > 0`, `θ ∈ (-π, π]` | Inverse of polar form: recovers angle from point on ray. |
| `arg_exp_mul_I` | `arg (exp (θ * I)) = toIocMod (2π) (-π) θ` | Argument of unit complex exponential, normalized to `(-π, π]`. |
| `ext_abs_arg` | `abs x = abs y ∧ arg x = arg y → x = y` | Uniqueness of complex number from modulus and argument. |
| `arg_mem_Ioc` | `arg z ∈ (-π, π]` | Ensures `arg` always returns a value in the principal branch. |
| `arg_eq_zero_iff` | `arg z = 0 ↔ 0 ≤ re z ∧ im z = 0` | Characterizes nonnegative reals via argument. |
| `arg_eq_pi_iff` | `arg z = π ↔ re z < 0 ∧ im z = 0` | Characterizes negative reals via argument. |
| `arg_conj` | `arg (conj x) = if arg x = π then π else -arg x` | Argument of complex conjugate. |
| `arg_inv` | `arg x⁻¹ = if arg x = π then π else -arg x` | Argument of inverse. |
| `arg_mul_coe_angle` | `(arg (x * y) : ℝ) = arg x + arg y` (mod `2π`) | Additivity of argument modulo `2π`, cast to `Real.Angle`. |
| `arg_div_coe_angle` | `(arg (x / y) : ℝ) = arg x - arg y` | Subtraction law for argument. |
| `continuousAt_arg` | `x ∈ slitPlane → ContinuousAt arg x` | Continuity of `arg` away from the nonpositive real axis. |
| `mem_slitPlane_iff_arg` | `z ∈ slitPlane ↔ z ≠ 0 ∧ arg z ≠ π` | Alternative description of slit plane via argument. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `arg_`: All definitions and theorems related to `arg`.
  - `is_`, `mem_`, `range_`, `abs_`, `sin_`, `cos_`, `tan_`: Standard mathematical properties.
  - `neg_`, `conj_`, `inv_`, `mul_`, `div_`: Algebraic operations.
  - `ofReal_`, `natCast_`, `ofNat_`: Coercions from `ℝ`, `ℕ`.
  - `toIocMod_`: Modular reduction to interval `(-π, π]`.

- **Suffixes**:
  - `_iff`: Logical equivalences (`↔`).
  - `_le`, `_lt`, `_ge`, `_gt`: Inequalities.
  - `_nonneg`, `_pos`, `_neg`: Sign conditions.
  - `_iff`: Biconditional characterizations.
  - `_eventuallyEq`, `_within`, `_nhds`: Topological/limit-related lemmas.

- **Pattern**:
  - `arg_of_…`: Lemmas describing `arg` under conditions on `re`/`im`.
  - `arg_…_iff`: iff-characterizations of `arg z = …`.
  - `arg_…_eq_…`: Equalities involving `arg`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities and lemmas (e.g., `sin_arg`, `cos_arg`). |
| `split_ifs` | Eliminate `if`-expressions in definitions (e.g., `arg`). |
| `field_simp` | Simplify division by nonzero elements (e.g., `abs x ≠ 0`). |
| `rw` / `rwa` | Rewrite using equalities, often with `at` or assumptions. |
| `rcases` / `cases'` | Case analysis on `eq_or_ne`, `lt_trichotomy`, `le_or_lt`. |
| `convert` / `exacts` | Construct proofs via unification and tactic sequences. |
| `push_cast` | Push coercions (e.g., `ℝ → ℂ`) through expressions. |
| `filter_upwards` | Work with filter-based eventual equalities (`=ᶠ`). |
| `continuous_*` | Apply continuity lemmas (e.g., `continuous_arcsin`, `continuous_arccos`). |
| `ring` / `linarith` | Algebraic simplification and linear arithmetic. |
| `ext` | Extensionality for complex numbers (`Complex.ext`). |

---

### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *case analysis* pattern on sign conditions of `re z`, `im z`, and equality to `0`.
  - Use of `if`-splitting (`split_ifs`) to handle piecewise definition of `arg`.
  - Many proofs rely on trigonometric identities (`sin_arcsin`, `cos_arcsin`, `sin_add`, `cos_sub_pi`, etc.).
  - For continuity proofs: use `eventuallyEq` and `ContinuousWithinAt.congr_of_eventuallyEq`.
  - For angle additivity: lift to `Real.Angle`, use periodicity of `exp`, and reduce to modular arithmetic (`toIocMod`).
  - For uniqueness: `ext_abs_arg` and `ext_abs_arg_iff` are central.

- **Induction / Modular Reduction**:
  - `toIocMod` used to normalize angles modulo `2π`.
  - `arg_exp_mul_I` and `arg_mul_cos_add_sin_mul_I_eq_toIocMod` rely on floor-based modular reduction.

- **Topological Reasoning**:
  - Continuity of `arg` is proven piecewise on open subsets of `ℂ` (e.g., `re > 0`, `re < 0 ∧ im > 0`, etc.).
  - Discontinuities at `ℝ≤0` are handled via one-sided limits (`tendsto_arg_nhdsWithin_…`).

---

### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.Analysis.SpecialFunctions.Trigonometric.Angle
  import Mathlib.Analysis.SpecialFunctions.Trigonometric.Inverse
  ```

- **Domain**:
  - Complex analysis (especially polar form, argument function).
  - Real analysis (arcsin, arccos, continuity, limits).
  - Topology (filters, continuity, slit plane).
  - Ordered fields and coercions (`ℝ`, `ℂ`, `ℕ`, `ℤ`, `Real.Angle`).

- **Key Libraries Used**:
  - `Mathlib.Analysis.SpecialFunctions.Trigonometric.*`
  - `Mathlib.Topology.Basic` (filters, continuity)
  - `Mathlib.Algebra.Group.Basic`, `Mathlib.Data.Complex.Basic`
  - `Mathlib.Data.Real.Basic`, `Mathlib.Data.Real.Angle`
  - `Mathlib.Data.Set.Basic`, `Mathlib.Data.Set.Image`

---

Let me know if you'd like a visual dependency graph, a list of lemmas by usage frequency, or a formalization roadmap for extending this module.