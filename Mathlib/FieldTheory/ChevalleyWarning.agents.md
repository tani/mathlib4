### Technical Metadata Brief: Chevalley–Warning Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `q` | `Fintype.card K` | Notation for the cardinality of the finite field `K`. |
| `sum_eval_eq_zero` | `f : MvPolynomial σ K → f.totalDegree < (q - 1) * Fintype.card σ → ∑ x, eval x f = 0` | Main technical lemma: sum of evaluations of a low-degree multivariate polynomial over all points in `K^σ` is zero. |
| `char_dvd_card_solutions_of_sum_lt` | `{s : Finset ι} {f : ι → MvPolynomial σ K} → (∑ i ∈ s, (f i).totalDegree < Fintype.card σ) → p ∣ Fintype.card {x // ∀ i ∈ s, eval x (f i) = 0}` | Chevalley–Warning theorem (finitary family version): number of common zeros divisible by characteristic `p`. |
| `char_dvd_card_solutions_of_fintype_sum_lt` | `[Fintype ι] → (∑ i, (f i).totalDegree < Fintype.card σ) → p ∣ Fintype.card {x // ∀ i, eval x (f i) = 0}` | Chevalley–Warning for families indexed by a finite type. |
| `char_dvd_card_solutions` | `f : MvPolynomial σ K → f.totalDegree < Fintype.card σ → p ∣ Fintype.card {x // eval x f = 0}` | Unary version: single polynomial case. |
| `char_dvd_card_solutions_of_add_lt` | `f₁ f₂ : MvPolynomial σ K → f₁.tdeg + f₂.tdeg < Fintype.card σ → p ∣ Fintype.card {x // eval x f₁ = 0 ∧ eval x f₂ = 0}` | Binary version: two polynomials. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `char_dvd_card_solutions_...`: indicates divisibility of solution count by characteristic.
  - `sum_eval_eq_zero`: sum of evaluations equals zero.
- **Suffixes**:
  - `_of_sum_lt`: condition on sum of total degrees.
  - `_of_add_lt`: condition on sum of two degrees.
  - `_of_fintype_sum_lt`: indexed over finite type.
- **Variables**:
  - `K`: finite field.
  - `q`: `Fintype.card K`.
  - `σ`: indexing type for variables (`X s`, `s : σ`).
  - `ι`: index type for families of polynomials.
  - `p`: characteristic of `K`, assumed via `[CharP K p]`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with specific lemmas (e.g., `eval_eq'`, `eval_prod`, `mul_sum`). |
| `rw [...]` | Rewriting using equalities (e.g., `mul_sum`, `sum_pow_lt_card_sub_one`). |
| `calc` | Chain of equalities/inequalities (used heavily in `sum_eval_eq_zero`). |
| `apply ...` | Goal introduction (e.g., `apply F.sum_eval_eq_zero`). |
| `aesop` | Automated reasoning (used in `char_dvd_card_solutions`). |
| `convert ...` | Goal conversion with proof irrelevance (e.g., `convert char_dvd_card_solutions_of_sum_lt`). |
| `congr_arg _` | Congruence for function application. |
| `Fintype.sum_congr`, `Fintype.prod_congr` | Change summation/product domain via bijections. |
| `sum_eq_zero`, `mul_eq_zero.mpr` | Zero-sum/zero-product reasoning. |
| `split_ifs` | Case analysis on `if ... then ... else ...`. |
| `rw [← CharP.cast_eq_zero_iff K]` | Translate divisibility to vanishing in `K`. |

---

#### **4. Proof Logic**

- **Structure of `sum_eval_eq_zero`**:
  1. Expand `eval x f` using `eval_eq'`.
  2. Swap sums: `∑_x ∑_d = ∑_d ∑_x`.
  3. Show each inner sum `∑_x ∏_i x i ^ d i = 0` by:
     - Finding a coordinate `i` where `d i < q - 1` (via `f.exists_degree_lt`).
     - Fiberwise decomposition over `x₀ : {j ≠ i} → K`.
     - Reducing to `∑_{a ∈ K} a^{d i} = 0`, using `sum_pow_lt_card_sub_one`.

- **Structure of `char_dvd_card_solutions_of_sum_lt`**:
  1. Define auxiliary polynomial `F = ∏_{i ∈ s} (1 - f_i^{q-1})`.
  2. Show `eval x F = 1` iff `x` is a common zero, else `0`.
  3. Conclude `∑_x eval x F = #solutions mod p`.
  4. Apply `sum_eval_eq_zero` to `F`, verifying `F.totalDegree < (q-1)·|σ|` via:
     - `totalDegree_finset_prod`
     - `totalDegree_sub`, `totalDegree_pow`
     - Inequality manipulation using `mul_lt_mul_left`.

- **General proof pattern**:
  - Reduce to `sum_eval_eq_zero` via clever polynomial construction.
  - Use finite field arithmetic (`a^{q-1} = 1` for `a ≠ 0`).
  - Leverage combinatorial properties of sums over finite fields.

---

#### **5. Imports & Dependencies**

- **Primary import**:
  ```lean
  import Mathlib.FieldTheory.Finite.Basic
  ```
  Provides:
  - `Fintype.card`, `FiniteField`, `CharP`, `pow_card_sub_one_eq_one`, `sum_pow_lt_card_sub_one`.

- **Key internal imports used**:
  - `MvPolynomial`: multivariate polynomials, `totalDegree`, `eval`, `coeff`, `support`.
  - `Function`: `eval`, `prod`, `sum`, `Equiv`.
  - `Finset`: finite sums/products, `sum_le_sum`, `prod_congr`.
  - `Classical`: `decEq`, `not_imp`, etc.

- **Domain scope**:  
  Finite field arithmetic, multivariate polynomial algebra, combinatorial number theory.

--- 

Let me know if you'd like a diagram of the proof dependencies or a tactic-level trace of `sum_eval_eq_zero`.