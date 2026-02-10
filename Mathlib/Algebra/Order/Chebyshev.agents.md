### Technical Metadata Brief: Chebyshev’s Sum Inequality in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MonovaryOn f g s` | `Prop` | `f` and `g` *monovary* on `s`: for all `i, j ∈ s`, `(f i - f j) • (g i - g j) ≥ 0`. Captures same-direction variation (e.g., both monotone or both antitone). |
| `AntivaryOn f g s` | `Prop` | `f` and `g` *antivary* on `s`: `(f i - f j) • (g i - g j) ≤ 0`. Captures opposite-direction variation (e.g., one monotone, one antitone). |
| `MonovaryOn.sum_smul_sum_le_card_smul_sum` | `hfg : MonovaryOn f g s → (∑ i ∈ s, f i) • ∑ i ∈ s, g i ≤ #s • ∑ i ∈ s, f i • g i` | Scalar-multiplication version of Chebyshev’s inequality (monovary case). |
| `AntivaryOn.card_smul_sum_le_sum_smul_sum` | `hfg : AntivaryOn f g s → #s • ∑ i ∈ s, f i • g i ≤ (∑ i ∈ s, f i) • ∑ i ∈ s, g i` | Dual (antivary) version of Chebyshev’s inequality in scalar-multiplication setting. |
| `MonovaryOn.sum_mul_sum_le_card_mul_sum` | `hfg : MonovaryOn f g s → (∑ i ∈ s, f i) * ∑ i ∈ s, g i ≤ #s * ∑ i ∈ s, f i * g i` | Multiplication version (special case of scalar version when `• = *`). |
| `AntivaryOn.card_mul_sum_le_sum_mul_sum` | `hfg : AntivaryOn f g s → #s * ∑ i ∈ s, f i * g i ≤ (∑ i ∈ s, f i) * ∑ i ∈ s, g i` | Dual multiplication version. |
| `sq_sum_le_card_mul_sum_sq` | `(∑ i ∈ s, f i) ^ 2 ≤ #s * ∑ i ∈ s, f i ^ 2` | Special case where `f = g`, i.e., Cauchy–Schwarz / Jensen for `x ↦ x²`. |
| `pow_sum_le_card_mul_sum_pow` | `(∑ f)^(n+1) ≤ #s^n * ∑ f^(n+1)` (under `0 ≤ f`) | Generalized power inequality (Jensen for `x ↦ x^{n+1}`), proved by induction + Chebyshev. |
| `pow_sum_div_card_le_sum_pow` | `(∑ f)^(n+1) / #s^n ≤ ∑ f^(n+1)` | Divisibility version of the above (requires semifield structure). |
| `sum_div_card_sq_le_sum_sq_div_card` | `((∑ f) / #s)^2 ≤ (∑ f²) / #s` | Variance non-negativity / RMS ≥ AM inequality. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sum_..._le_card_...`: Inequality where left side is product of sums, right side is `card * sum of products`.
  - `card_..._le_sum_...`: Reverse inequality (antivary case).
  - `pow_sum_...`: Power-sum inequalities (Jensen-type).
  - `sq_...`: Quadratic case (`n = 1`).
- **Suffixes**:
  - `_smul_sum`: Scalar multiplication version.
  - `_mul_sum`: Multiplication version (when `• = *`).
  - `_div_card`: Division-normalized version (semifield setting).
- **Predicate naming**:
  - `MonovaryOn`, `AntivaryOn`: Variation conditions.
  - `Monovary`, `Antivary`: Global versions (over `Fintype ι`).

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `rw` | High | Rewriting definitions (`sum_smul_sum_eq_sum_perm`, `nsmul_eq_mul`, `pow_succ`, etc.). |
| `gcongr` | Medium | Congruence for inequalities under monotone operations (e.g., multiplying by nonnegatives). |
| `simp` / `simp_rw` | Medium | Simplifying sums over empty sets, powers, `nsmul`, etc. |
| `exact` | Medium | Applying lemmas with precise hypotheses. |
| `obtain` / `cases` | Medium | Extracting cycle decomposition (`exists_cycleOn`) or splitting `eq_empty_or_nonempty`. |
| `pos` / ` positivity` (via `Tactic.Positivity`) | Low–Medium | Proving positivity of card, sums, etc., needed for division lemmas. |
| `calc` | Medium | Structured chain of inequalities (e.g., in `pow_sum_le_card_mul_sum`). |

---

#### **4. Proof Logic**

- **Core idea**: Reduce to a *cyclic rearrangement* inequality via permutation decomposition.
  - Use `s.countable_toSet.exists_cycleOn` to get a permutation `σ` whose cycles cover `s`.
  - Apply `sum_smul_sum_eq_sum_perm` to rewrite `∑_{i ∈ s} f(i) • ∑_{j ∈ s} g(j)` as `∑_{k < n} f(σ^k i) • g(σ^k i)` (up to reordering).
  - Then apply `hfg.sum_smul_comp_perm_le_sum` (a lemma about monovary functions under permutations), which follows from pairwise comparisons using `MonovaryOn`.
- **Inductive structure** (for power inequalities):
  - Base case `n = 0`: trivial (`simp`).
  - Inductive step: use `gcongr` to lift induction hypothesis, then apply `sum_mul_sum_le_card_mul_sum` to the inner product `(∑ f^{n+1}) * (∑ f)`.
- **Duality**: Antivary case follows by applying the monovary case to `f` and `g^[op]` (i.e., using `OrderDual` or `dual_right`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Monovary` | Core definitions: `MonovaryOn`, `AntivaryOn`, basic properties. |
| `Mathlib.Algebra.Order.Rearrangement` | Rearrangement inequality tools (used implicitly via `sum_smul_comp_perm_le_sum`). |
| `Mathlib.GroupTheory.Perm.Cycle.Basic` | Cycle decomposition of permutations (key for `exists_cycleOn`). |
| `Mathlib.Tactic.GCongr` | For congruence rules in ordered semirings (e.g., `gcongr` for `*`, `^`). |
| `Mathlib.Tactic.Positivity` | To discharge positivity goals (e.g., `#s > 0`, `∑ f ≥ 0`). |

**Typeclass assumptions** (core):
- `LinearOrderedSemiring α`: Ensures `≤` is compatible with `+`, `*`, and `nsmul`.
- `ExistsAddOfLE α`: Allows solving `a ≤ b → ∃ c, b = a + c` (used in some order manipulations).
- `LinearOrderedCancelAddCommMonoid β`, `Module α β`, `OrderedSMul α β`: For scalar-multiplication version.
- `Fintype ι`: For global versions (sums over all `ι`).
- `LinearOrderedSemifield α`: For division-based corollaries.

---

#### **Summary**

This file formalizes **Chebyshev’s sum inequality** in full generality, first in a *scalar-multiplication* setting (decoupling addition and multiplication), then specializing to multiplication. It leverages:
- **Permutation-based rearrangement arguments** (via cycle decomposition),
- **Monovary/antivary** as the minimal structural condition (weaker than monotonicity),
- **Induction + `gcongr`** for power inequalities (Jensen-type),
- **Duality** (via `OrderDual`) to avoid redundant proofs.

The structure reflects Lean 4’s emphasis on *modularity* and *reuse*—e.g., multiplication versions are derived from scalar ones via `nsmul_eq_mul`, and antivary cases via duality.