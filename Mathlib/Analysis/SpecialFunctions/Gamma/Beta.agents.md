Here is a **structured technical brief** extracted from the provided Lean 4 file, focusing on key definitions, theorems, naming conventions, tactic usage, proof logic, and imports.

---

## 🔹 **1. Key Definitions & Theorems**

### **Beta Function**
- **`Complex.betaIntegral (u v : ℂ)`**  
  *Definition*:  
  `∫ x : ℝ in (0)..1, (x : ℂ) ^ (u - 1) * (1 - (x : ℂ)) ^ (v - 1)`  
  *Purpose*: Defines the complex Beta integral for `u, v` with positive real part.

- **`Complex.Gamma_mul_Gamma_eq_betaIntegral`**  
  *Statement*:  
  `Γ(u) * Γ(v) = Γ(u + v) * β(u, v)`  
  *Purpose*: Relates Beta and Gamma functions via an integral identity.

- **`Complex.betaIntegral_symm`**  
  *Statement*: `β(u, v) = β(v, u)`  
  *Purpose*: Proves symmetry of the Beta integral.

- **`Complex.betaIntegral_eval_one_right`**  
  *Statement*: `β(u, 1) = 1 / u` for `Re(u) > 0`  
  *Purpose*: Evaluates Beta at second argument = 1.

- **`Complex.betaIntegral_eval_nat_add_one_right`**  
  *Statement*:  
  `β(u, n+1) = n! / ∏_{j=0}^n (u + j)`  
  *Purpose*: Closed-form for Beta when second argument is a natural number +1.

- **`Complex.betaIntegral_recurrence`**  
  *Statement*: `u * β(u, v+1) = v * β(u+1, v)`  
  *Purpose*: Recurrence relation for Beta, used in proofs before Gamma non-vanishing is known.

---

### **Gamma Function Properties**
- **`Complex.GammaSeq (s : ℂ) (n : ℕ)`**  
  *Definition*:  
  `n^s * n! / ∏_{j=0}^n (s + j)`  
  *Purpose*: Euler’s sequence approximating `Γ(s)`.

- **`Complex.GammaSeq_tendsto_Gamma`**  
  *Statement*: `ΓSeq s n → Γ(s)` as `n → ∞`  
  *Purpose*: Proves Euler’s limit formula for `Γ(s)` for all `s ∈ ℂ`.

- **`Complex.Gamma_mul_Gamma_one_sub` (Euler’s reflection formula)**  
  *Statement*:  
  `Γ(s) * Γ(1 - s) = π / sin(π s)`  
  *Purpose*: Fundamental identity connecting `Γ` and trigonometric functions.

- **`Complex.Gamma_ne_zero`**  
  *Statement*: `Γ(s) ≠ 0` if `s ≠ -n` for all `n ∈ ℕ`  
  *Purpose*: Shows Gamma has no zeros except at non-positive integers (where it's defined as 0 by convention).

- **`Complex.differentiable_one_div_Gamma`**  
  *Statement*: `s ↦ 1 / Γ(s)` is differentiable (entire)  
  *Purpose*: Key for analytic continuation arguments; uses recurrence and induction.

- **`Complex.Gamma_mul_Gamma_add_half` (Legendre’s duplication formula)**  
  *Statement*:  
  `Γ(s) * Γ(s + 1/2) = Γ(2s) * 2^{1 - 2s} * √π`  
  *Purpose*: Relates `Γ` at `s`, `s + 1/2`, and `2s`.

- **Real analogues** (`Real.Gamma_ne_zero`, `Real.GammaSeq_tendsto_Gamma`, etc.)  
  *Purpose*: Transfer complex results to real arguments via `ofReal` embedding.

---

## 🔹 **2. Naming Conventions**

- **Prefixes**:
  - `betaIntegral_`: for Beta integral lemmas.
  - `GammaSeq_`: for Euler sequence lemmas.
  - `Gamma_`: for core Gamma function properties.
  - `one_div_Gamma_`: for reciprocal Gamma lemmas.
  - `InvGamma`, `Doubling`, `LimitFormula`, `BetaIntegral`, `GammaReflection`: section names.

- **Suffixes**:
  - `_eq_`: equality theorems (e.g., `Gamma_mul_Gamma_eq_betaIntegral`).
  - `_tendsto_`: convergence statements (e.g., `GammaSeq_tendsto_Gamma`).
  - `_of_`: conditional versions (e.g., `Gamma_ne_zero_of_re_pos`).
  - `_left`, `_right`, `_symm`, `_recurrence`: structural properties.

- **Type qualifiers**:
  - `Complex.` vs `Real.`: distinguishes complex vs real versions.

---

## 🔹 **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Purpose |
|--------|---------|
| `simp_rw` | Simplify with rewrite rules (especially for `Finset.prod`, `Finset.range`, `Nat.cast`). |
| `conv` | Deep structural rewriting (e.g., `conv_lhs => arg 1; intro x; rw [...]`). |
| `rw` / `rwa` | Rewrite using equalities, often with assumptions (`a` for apply). |
| `have` / `suffices` | Introduce intermediate lemmas or goals. |
| `induction'` | Induction on natural numbers (e.g., for `betaIntegral_eval_nat_add_one_right`, `GammaSeq_tendsto_Gamma`). |
| `convert` | Match goals up to definitional equality (used heavily in convergence proofs). |
| `field_simp`, `ring`, `abel` | Algebraic simplification in fields/rings. |
| `filter_upwards`, `eventually` | Filter-based arguments (e.g., for `Tendsto`). |
| `aesop` (implied) | Likely used in routine goals (e.g., positivity, inequalities). |
| `norm_cast`, `push_cast` | Move between `ℝ` and `ℂ`. |
| `exact`, `refine`, `apply` | Goal completion and partial proof construction. |
| `contrapose!` | Turn implications into contrapositive form for contradiction. |

---

## 🔹 **4. Proof Logic & Strategy**

- **Induction + Cases**:  
  Used for finite sums/products (e.g., `betaIntegral_eval_nat_add_one_right`, `GammaSeq_mul`).

- **Analytic Continuation**:  
  For duplication formula: prove identity on a dense subset (`ℝ_{>0}`), then extend using analyticity of `1/Γ`.

- **Dominated Convergence**:  
  In `approx_Gamma_integral_tendsto_Gamma_integral`, apply measure-theoretic convergence theorems to pass limit under integral.

- **Recurrence-based Induction**:  
  For `GammaSeq_tendsto_Gamma`, use recurrence `Γ(s+1) = sΓ(s)` and `GammaSeq(s+1)/s = ...` to reduce to base case.

- **Symmetry & Substitution**:  
  Beta symmetry via change of variables `x ↦ 1 - x`; scaling via substitution `x ↦ x/a`.

- **Contrapositive + Positivity**:  
  Many non-vanishing results (`Gamma_ne_zero`, `Gamma_ne_zero_of_re_pos`) rely on contradiction with positivity of real part.

---

## 🔹 **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Convolution` | For convolution-based Gamma integral representation (`integral_posConvolution`). |
| `Mathlib.Analysis.SpecialFunctions.Trigonometric.EulerSineProd` | For `tendsto_euler_sin_prod`, used in reflection formula. |
| `Mathlib.Analysis.SpecialFunctions.Gamma.BohrMollerup` | Foundational Gamma properties (e.g., recurrence, positivity). |
| `Mathlib.Analysis.Analytic.IsolatedZeros` | Implicitly used via analyticity of `1/Γ`. |
| `Mathlib.Analysis.Complex.CauchyIntegral` | For complex analysis tools (e.g., differentiability, analyticity). |
| `Mathlib.MeasureTheory.Integral.IntervalIntegral` | For `intervalIntegral`, `setIntegral`, integrability. |
| `Mathlib.Analysis.NormedSpace.Basic`, `RCLike`, etc. | Implicit via `ℂ`-valued functions, continuity, norms. |

---

## ✅ Summary

This file formalizes deep connections between the **Beta and Gamma functions**, including:
- Integral representations,
- Limit formulas (Euler),
- Functional identities (reflection, duplication),
- Analytic properties (non-vanishing, differentiability of reciprocal).

It leverages:
- Measure-theoretic convergence theorems,
- Complex analytic continuation,
- Inductive and algebraic manipulations of products/sums.

The formalization is highly structured, with careful handling of convergence, domain restrictions (`Re > 0`), and extension by continuity/analyticity.

Let me know if you'd like a **dependency graph**, **proof outline**, or **Lean tactic glossary** for this file.