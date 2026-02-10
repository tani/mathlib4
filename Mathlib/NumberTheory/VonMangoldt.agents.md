### Technical Metadata Brief: `ArithmeticFunction.vonMangoldt` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `log : ArithmeticFunction ℝ` | `⟨fun n ↦ Real.log n, ...⟩` | Bundled real logarithm as an arithmetic function. |
| `vonMangoldt : ArithmeticFunction ℝ` | `⟨fun n ↦ if IsPrimePow n then Real.log (minFac n) else 0, ...⟩` | The von Mangoldt function Λ: returns `log p` if `n = p^k`, else `0`. |
| `Λ` (notation) | `ArithmeticFunction.vonMangoldt` | Standard notation for von Mangoldt function in `ArithmeticFunction` and `vonMangoldt` locales. |
| `vonMangoldt_apply` | `Λ n = if IsPrimePow n then Real.log (minFac n) else 0` | Explicit evaluation of Λ at `n`. |
| `vonMangoldt_sum` | `∑ i ∈ n.divisors, Λ i = Real.log n` | **Fundamental identity**: sum of Λ over divisors equals log of `n`. |
| `vonMangoldt_mul_zeta` | `Λ * ζ = log` | Convolution identity: Λ convolved with zeta gives log. |
| `log_mul_moebius_eq_vonMangoldt` | `log * μ = Λ` | Möbius inversion of the above: Λ = log * μ. |
| `sum_moebius_mul_log_eq` | `∑ d ∈ n.divisors, μ d * Real.log d = -Λ n` | Explicit Möbius inversion formula for Λ. |
| `vonMangoldt_ne_zero_iff` | `Λ n ≠ 0 ↔ IsPrimePow n` | Characterizes non-vanishing of Λ. |
| `vonMangoldt_pos_iff` | `0 < Λ n ↔ IsPrimePow n` | Positivity characterization. |
| `vonMangoldt_le_log` | `Λ n ≤ Real.log n` | Upper bound of Λ by log. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `vonMangoldt_`: for properties of the von Mangoldt function (e.g., `vonMangoldt_apply`, `vonMangoldt_sum`).
  - `log_`: for properties of the bundled `log` arithmetic function (e.g., `log_apply`).
- **Suffixes**:
  - `_apply`: definition of function application.
  - `_iff`: biconditional characterizations (e.g., `ne_zero_iff`, `pos_iff`, `eq_zero_iff`).
  - `_mul_zeta`, `_mul_moebius`: convolution identities.
- **Notation**:
  - `Λ`: overloaded notation for von Mangoldt function, scoped to `ArithmeticFunction` and `ArithmeticFunction.vonMangoldt`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification of `if`-expressions, `IsPrimePow`, `minFac`, `divisors`, `sum`, etc. |
| `rw` | Rewriting using lemmas (especially convolution definitions, `mul_apply`, `sum_divisors_*`). |
| `exact` / `refine` | Especially in induction proofs (`recOnPrimeCoprime`). |
| `split_ifs` | Handling `if ... then ... else ...` cases. |
| `apply sum_congr` / `sum_divisors_*` | Summation manipulations over divisors. |
| `ring` / `linarith` | Implicitly used in algebraic simplifications (e.g., `Real.log_pow`, `Real.log_mul`). |
| `rcases eq_or_ne n 1` | Case analysis on whether `n = 1`. |
| `disjoint_divisors_filter_isPrimePow` | Set-theoretic decomposition of divisor sets. |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs of `vonMangoldt_sum` use `recOnPrimeCoprime`, an induction principle over natural numbers based on prime power and coprime factorization.
  - Base case: `n = 1`.
  - Prime power case: `n = p^k`, using `sum_divisors_prime_pow`.
  - Coprime multiplication case: `n = a * b` with `(a,b) = 1`, using multiplicativity of Λ and log.
- **Möbius inversion**: Derived via convolution identities:
  - `Λ * ζ = log` ⇒ convolve both sides with `μ` ⇒ `Λ = log * μ`.
- **Summation identities**: Often reduce to:
  - Decomposing divisor sums via `sum_filter`, `sum_union`, `sum_divisorsAntidiagonal`.
  - Using properties of `minFac`, `IsPrimePow`, and `Real.log`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.IsPrimePow` | Defines `IsPrimePow`, `minFac`, and key lemmas (e.g., `isPrimePow_pow_iff`, `minFac_prime`). |
| `Mathlib.NumberTheory.ArithmeticFunction` | Core arithmetic function theory: convolution `*`, `ζ`, `μ`, `divisors`, `sum_divisors_*`. |
| `Mathlib.Analysis.SpecialFunctions.Log.Basic` | Real logarithm properties: `Real.log_pow`, `Real.log_mul`, `Real.log_nonneg`, `Real.log_pos`. |

---

#### **6. Domain-Specific AI Agent Insights**

- **Typical queries**:
  - “What is Λ(n) for n = 12?” → `Λ 12 = 0` since 12 is not a prime power.
  - “Prove Λ * ζ = log” → Use `vonMangoldt_mul_zeta`.
  - “How to compute Λ(n) from μ and log?” → Use `sum_moebius_mul_log_eq`.
- **Common proof patterns**:
  - Case analysis on `IsPrimePow n`.
  - Use of `vonMangoldt_apply_pow` to reduce prime power arguments.
  - Convolution-based reasoning via `mul_apply`, `sum_mul`, `moebius_mul_coe_zeta`.
- **Key lemmas to surface**:
  - `vonMangoldt_sum`, `log_mul_moebius_eq_vonMangoldt`, `vonMangoldt_ne_zero_iff`, `vonMangoldt_le_log`.

--- 

Let me know if you'd like a formalized tactic guide or a proof assistant prompt template for this domain.