Here is a structured technical brief extracted from `AnalyticalPart.lean`, focusing on formal metadata for building a domain-specific Lean 4 AI agent.

---

## 🔍 **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasDerivAt_cexp_mul_sumIDeriv` | `(p : ℂ[X]) (s : ℂ) (x : ℝ) → HasDerivAt (fun x ↦ -(cexp (-(x • s)) * p.sumIDeriv.eval (x • s))) (s * (cexp (-(x • s)) * p.eval (x • s))) x` | Computes derivative of integrand in fundamental theorem argument; key for integral identity. |
| `integral_exp_mul_eval` | `(p : ℂ[X]) (s : ℂ) → s * ∫ x in 0..1, exp (-(x • s)) * p.eval (x • s) = -(exp (-s) * p.sumIDeriv.eval s) + p.sumIDeriv.eval 0` | Relates integral of exponential-polynomial to `sumIDeriv` at endpoints; core analytic identity. |
| `P` | `P f s := exp s * f.sumIDeriv.eval 0 - f.sumIDeriv.eval s` | Generalized version of $ I_i(s) $ in Wikipedia proof; central object in approximation argument. |
| `P_eq_integral_exp_mul_eval` | `P f s = exp s * (s * ∫ x in 0..1, exp (-(x • s)) * f.eval (x • s))` | Rewrites `P` as scaled exponential times integral; enables norm estimates. |
| `P_le_aux` | `(f : ℕ → ℂ[X]) (s : ℂ) (c : ℝ) → (∀ p x ∈ Ioc 0 1, ‖f p.eval (x • s)‖ ≤ c ^ p) → ∃ c' ≥ 0, ∀ p, ‖P (f p) s‖ ≤ exp(s.re) * (exp ‖s‖ * c' ^ p * ‖s‖)` | Intermediate bound on `P(fₚ, s)` using exponential growth control. |
| `P_le` | Same premise as `P_le_aux`, conclusion: `∃ c' ≥ 0, ∀ p ≠ 0, ‖P (f p) s‖ ≤ c' ^ p` | Final exponential bound for nonzero `p`, crucial for asymptotic argument. |
| `exp_polynomial_approx_aux` | `(f : ℤ[X]) (s : ℂ) → ∃ c ≥ 0, ∀ p ≠ 0, ‖P (map ℤ→ℂ (X^(p-1) * f^p)) s‖ ≤ c ^ p` | Constructs exponential bound for specially constructed polynomials `X^(p-1) * f^p`. |
| `exp_polynomial_approx` | `(f : ℤ[X]) (hf : f.eval 0 ≠ 0) → ∃ c, ∀ p > |f(0)|, p prime → ∃ n, ¬p ∣ n ∧ ∃ gp, deg(gp) < p·deg(f) ∧ ∀ r ∈ roots(f), ‖n·exp(r) - p·aeval r gp‖ ≤ c^p / (p-1)!` | Main approximation lemma: constructs integer combinations approximating `n·exp(r)` with factorial denominator control. |

---

## 📝 **2. Naming Conventions**

- **Prefixes**:
  - `hasDerivAt_`: asserts existence of derivative at a point.
  - `integral_`: relates integrals to antiderivatives.
  - `P_`: pertains to the auxiliary function `P`.
  - `exp_polynomial_approx_`: approximation lemmas for exponentials of algebraic numbers.
- **Suffixes**:
  - `_aux`: intermediate lemmas used in main proofs.
  - `_eq_`: equational characterizations.
  - `_le`: inequalities or bounds.
- **Variables**:
  - `f`, `p`, `gp`: polynomials (often `f : ℤ[X]`, `p : ℂ[X]`, `gp` for “good approximation”).
  - `s`: complex parameter (often algebraic number).
  - `c`, `c'`, `c₁`, `c₂`, `c₃`: real bounding constants.
  - `r`: complex root of `f`.
  - `p` (also prime): natural number index, often prime in number-theoretic context.

---

## ⚙️ **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` / `simp_rw` | High | Simplify expressions involving `eval`, `sumIDeriv`, `map`, `aeval`, `exp`, `norm`. |
| `rw` | Very High | Rewrite using lemmas like `integral_exp_mul_eval`, `P_eq_integral_exp_mul_eval`, `h'`, etc. |
| `convert` | Medium | Align goals with known derivative/integral identities. |
| `gcongr` | Medium | Handle inequalities with norms and exponentials. |
| `ring` | Medium | Simplify polynomial/algebraic expressions. |
| `have` / `obtain` | High | Introduce intermediate lemmas or decompose existential statements. |
| `exact` / `apply` | Medium | Apply lemmas like `norm_setIntegral_le_of_norm_le_const`. |
| `push_cast` | Low | Cast integers to reals for analysis. |
| `nth_rw` | Low | Precise rewriting at nth occurrence (e.g., `nth_rw 1 [sumIDeriv_eq_self_add]`). |
| `fun_prop` | Medium | Prove functorial properties (e.g., continuity, integrability). |

---

## 🧠 **4. Proof Logic**

- **Structure**: Inductive/constructive analysis of `P(f, s)` via:
  1. **Differentiation**: Compute derivative of integrand (`hasDerivAt_cexp_mul_sumIDeriv`).
  2. **Fundamental Theorem of Calculus**: Derive integral identity (`integral_exp_mul_eval`).
  3. **Norm Estimation**: Use boundedness of `fₚ(x•s)` on `[0,1]` to bound `P(fₚ, s)` (`P_le_aux`, `P_le`).
  4. **Integer Polynomial Construction**: For `f ∈ ℤ[X]`, define `hₚ = X^(p-1)·f^p`, apply `P_le` to get exponential bound.
  5. **Number-Theoretic Refinement**: Use `eval_sumIDeriv_of_pos` (from `Mathlib.RingTheory.Int.Basic`) to relate `P` to integer combinations involving `p`, `nₚ`, `gₚ`.
  6. **Root-wise Approximation**: For each root `r`, bound `‖n·exp(r) - p·aeval r gp‖` using `P` and factorial denominator.

- **Key Logical Flow**:
  > *Differentiate → Integrate → Bound → Approximate → Diophantine control.*

- **Induction/Case Analysis**: Not explicit induction, but case analysis on `p > |f(0)|`, `p` prime, and `x ∈ Ioc 0 1`.

---

## 📦 **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.SumIteratedDerivative` | Defines `sumIDeriv`, its properties, and evaluation identities. |
| `Mathlib.Analysis.Calculus.Deriv.Polynomial` | Derivatives of polynomials over `ℝ`/`ℂ`. |
| `Mathlib.Analysis.SpecialFunctions.ExpDeriv` | Derivative and properties of `exp`. |
| `Mathlib.MeasureTheory.Integral.IntervalIntegral.FundThmCalculus` | Fundamental theorem of calculus for interval integrals. |
| `Mathlib.RingTheory.Int.Basic` | `eval_sumIDeriv_of_pos`, divisibility, factorial properties. |
| `Mathlib.Topology.Algebra.Polynomial` | Continuity, boundedness of polynomial evaluation. |

---

## 🧩 **6. Mermaid Diagrams**

### 📚 **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[AnalyticalPart.lean] --> B[Mathlib.Algebra.Polynomial.SumIteratedDerivative]
  A --> C[Mathlib.Analysis.Calculus.Deriv.Polynomial]
  A --> D[Mathlib.Analysis.SpecialFunctions.ExpDeriv]
  A --> E[Mathlib.MeasureTheory.Integral.IntervalIntegral.FundThmCalculus]
  A --> F[Mathlib.RingTheory.Int.Basic]
  A --> G[Mathlib.Topology.Algebra.Polynomial]

  B --> H[sumIDeriv, eval identities]
  C --> I[derivative of polynomials]
  D --> J[exp derivative, chain rule]
  E --> K[integral = F(b) - F(a)]
  F --> L[eval_sumIDeriv_of_pos, divisibility]
  G --> M[polynomial continuity, boundedness]
```

### 🧠 **Overview of Theoretical Flow**

```mermaid
flowchart LR
  A[Polynomials f ∈ ℤ[X]] --> B[Construct hₚ = X^(p-1)·f^p]
  B --> C[Apply P_le: bound ‖P(hₚ, s)‖ ≤ c^p]
  C --> D[Use eval_sumIDeriv_of_pos to relate to integer combinations]
  D --> E[For each root r of f, bound n·exp(r) - p·aeval(r, gp)]
  E --> F[Asymptotic control via c^p / (p-1)!]
  F --> G[Lindemann-Weierstrass theorem]
```

---

## ✅ **Summary for AI Agent**

- **Domain**: Analytic number theory, transcendence proofs (Lindemann–Weierstrass).
- **Core Objects**: `sumIDeriv`, `P(f, s)`, exponential integrals, integer polynomials.
- **Proof Strategy**: Analytic estimates + algebraic identities + number-theoretic divisibility.
- **Key Lemmas**: `P_le`, `exp_polynomial_approx`, `integral_exp_mul_eval`.
- **Tactics to Prioritize**: `simp`, `rw`, `gcongr`, `have`, `convert`.
- **Critical Imports**: `SumIteratedDerivative`, `FundThmCalculus`, `Int.Basic`.

Let me know if you'd like a ** tactic recommendation engine ** or **proof sketch generator** based on this metadata.
