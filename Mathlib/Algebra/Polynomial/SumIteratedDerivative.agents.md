### Technical Metadata Brief: `Polynomial.sumIDeriv` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sumIDeriv` | `R[X] →ₗ[R] R[X]` | Linear map defined as the sum of all iterated derivatives of a polynomial (up to its degree). |
| `sumIDeriv_apply` | `sumIDeriv p = ∑ i ∈ range (p.natDegree + 1), derivative^[i] p` | Explicit expression of `sumIDeriv` as a finite sum of iterated derivatives. |
| `sumIDeriv_apply_of_lt` | `p.natDegree < n ⇒ sumIDeriv p = ∑ i ∈ range n, derivative^[i] p` | Allows truncating the sum at any `n > deg(p)`. |
| `sumIDeriv_apply_of_le` | `p.natDegree ≤ n ⇒ sumIDeriv p = ∑ i ∈ range (n + 1), derivative^[i] p` | Allows extending the sum to any `n ≥ deg(p)`. |
| `sumIDeriv_C` | `sumIDeriv (C a) = C a` | Evaluates `sumIDeriv` on constant polynomials. |
| `sumIDeriv_X` | `sumIDeriv X = X + C 1` | Evaluates `sumIDeriv` on the identity polynomial. |
| `sumIDeriv_map` | `sumIDeriv (p.map f) = (sumIDeriv p).map f` | Commutes with base-ring morphisms (`map`). |
| `sumIDeriv_derivative` | `sumIDeriv (derivative p) = derivative (sumIDeriv p)` | Commutes with the derivative operator. |
| `sumIDeriv_eq_self_add` | `sumIDeriv p = p + derivative (sumIDeriv p)` | Functional equation: `sumIDeriv` satisfies a discrete analog of the ODE `f = p + f'`. |
| `exists_iterate_derivative_eq_factorial_smul` | `∃ gp, gp.natDegree ≤ p.natDegree - k ∧ derivative^[k] p = k! • gp` | Every `k`-th derivative has a factor of `k!`. |
| `aeval_iterate_derivative_of_lt` | If `(X - r)^q ∣ p`, then `aeval r (derivative^[k] p) = 0` for `k < q`. | Vanishing of low-order derivatives at roots of multiplicity `q`. |
| `aeval_iterate_derivative_self` | If `(X - r)^q ∣ p`, then `aeval r (derivative^[q] p) = q! • p'.eval r`. | Exact value of the `q`-th derivative at a root of multiplicity `q`. |
| `aeval_iterate_derivative_of_ge` | For `k ≥ q`, `derivative^[k] p = q! • gp` for some `gp`. | Higher derivatives are divisible by `q!`. |
| `aeval_sumIDeriv_eq_eval` | `aeval r (sumIDeriv p) = eval r (sumIDeriv (map p))` | Compatibility of `sumIDeriv` with evaluation. |
| `aeval_sumIDeriv` | If `(X - r)^q ∣ p`, then `aeval r (sumIDeriv p) = q! • aeval r gp` for some `gp`. | Evaluation of `sumIDeriv` at a root of multiplicity `q` is divisible by `q!`. |
| `aeval_sumIDeriv_of_pos` | Refinement of `aeval_sumIDeriv` when `q > 0`, splitting off the `(q-1)`-th derivative term. | Key for integration-by-parts in Lindemann–Weierstrass. |
| `eval_sumIDeriv_of_pos` | Special case of `aeval_sumIDeriv_of_pos` for `R = A`. | Used in concrete coefficient rings. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sumIDeriv_`: All definitions and lemmas related to the sum of iterated derivatives.
  - `aeval_`: Evaluation-specific properties (e.g., `aeval_iterate_derivative_*`, `aeval_sumIDeriv_*`).
  - `exists_`: Existential lemmas (e.g., `exists_iterate_derivative_eq_factorial_smul`).
- **Suffixes**:
  - `_apply`: Application of a map to a term.
  - `_of_lt`, `_of_le`, `_of_pos`: Conditional variants based on inequalities or positivity.
  - `_self`: Special case where the derivative order equals the multiplicity.
  - `_C`, `_X`: Evaluation on canonical generators.
  - `_map`, `_derivative`: Commutation properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions and simplifying with rewrite rules (especially for `iterate_derivative`, `map`, `sum`). |
| `simp` | Simplifying goals using lemmas like `natDegree_C`, `iterate_derivative_eq_zero`, `sum_range_one`. |
| `exact` / `refine` | Constructing proofs term-by-term or with holes (`?_`). |
| `cases` / `obtain` / `rcases` | Decomposing existential or disjunctive hypotheses (e.g., `lt_or_ge`, `eq_or_ne`). |
| `convert` | Matching goals up to definitional equality (e.g., `zero_add _`). |
| `congr` | Splitting equalities over sums or products. |
| `apply` / `intro` | Standard intro/apply for implication chains. |
| `aesop` (implied) | Likely used in background automation (not explicit here, but common in Mathlib). |
| `ring` / `norm_num` | Not used explicitly here, but likely in auxiliary simplifications. |

---

#### **4. Proof Logic**

- **Inductive/structural style**: Proofs often proceed by:
  1. Unfolding definitions (`dsimp [sumIDeriv]`).
  2. Applying `Finsupp.sum_of_support_subset` to reduce to finite sums.
  3. Using lemmas about `natDegree`, `iterate_derivative`, and `derivative`.
  4. Leveraging `simp`-friendly rewrite rules (e.g., `iterate_derivative_eq_zero`, `natDegree_iterate_derivative`).
- **Case analysis**: Common on `k < q` vs `k ≥ q`, or `p = 0` vs `p ≠ 0`.
- **Existential witnesses**: Constructed explicitly (e.g., `gp := ...`), often using `choose` or `obtain`.
- **Divisibility arguments**: Use of `aeval_iterate_derivative_*` lemmas to show vanishing or factorial divisibility.
- **Sum splitting**: Partitioning `range (n+1)` into `range q ∪ Ico q (n+1)` for refined control.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Polynomial.AlgebraMap`
- `Mathlib.Algebra.Polynomial.BigOperators`
- `Mathlib.Algebra.Polynomial.Degree.Lemmas`
- `Mathlib.Algebra.Polynomial.Derivative`
- `Mathlib.Algebra.Polynomial.Eval.SMul`

**Domain scope**:
- **Semiring level**: General definitions and basic properties (`sumIDeriv`, `sumIDeriv_map`, `sumIDeriv_derivative`, etc.).
- **CommSemiring + Algebra**: Evaluation-theoretic properties (`aeval_*` lemmas), especially for use in transcendence proofs (e.g., Lindemann–Weierstrass).
- **NoZeroDivisors / Nontrivial**: Required for injectivity arguments and factorial non-vanishing.

**Intended use case**:
- Formalization of the **Lindemann–Weierstrass theorem**, particularly handling integrals like `I_i = ∫ e^{rx} p(x) dx` via integration by parts, where `sumIDeriv` encodes repeated integration by parts as a sum of derivatives.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem (e.g., `sumIDeriv_eq_self_add`).