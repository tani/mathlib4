### Technical Metadata Brief: Cauchy’s Bound on Polynomial Roots (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cauchyBound` | `Polynomial K → ℝ≥0` | Defines Cauchy’s bound: `sup_{0 ≤ i < n} |a_i| / |a_n| + 1`, where `n = natDegree p`, `a_n = leadingCoeff p`. |
| `IsRoot.norm_lt_cauchyBound` | `{p : Polynomial K} → p ≠ 0 → p.IsRoot a → ‖a‖₊ < cauchyBound p` | Main theorem: any root `a` of nonzero polynomial `p` satisfies `‖a‖₊ < cauchyBound p`. |
| `one_le_cauchyBound` | `1 ≤ cauchyBound p` | Lower bound on `cauchyBound`. |
| `cauchyBound_zero`, `cauchyBound_C`, `cauchyBound_one`, `cauchyBound_X`, `cauchyBound_X_add_C`, `cauchyBound_X_sub_C` | Various simplifications for special polynomials | Compute `cauchyBound` explicitly for constants, `X`, linear polynomials. |
| `cauchyBound_smul` | `x ≠ 0 → cauchyBound (x • p) = cauchyBound p` | Invariance under nonzero scalar multiplication. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cauchyBound_`: for definitions/lemmas about the bound itself.
  - `one_le_`, `IsRoot.`: for properties of the bound or its relation to roots.
- **Suffixes**:
  - `_zero`, `_C`, `_one`, `_X`, `_X_add_C`, `_X_sub_C`: denote special cases (zero poly, constant, etc.).
  - `_smul`: for behavior under scalar multiplication.
- **Internal notation**:
  - `range p.natDegree`: finite set `{0, ..., n-1}`.
  - `sup (range p.natDegree) (‖p.coeff ·‖₊)`: supremum of coefficients’ norms over degrees `< n`.
  - `nnnorm` / `‖·‖₊`: nonnegative norm (used for `ℝ≥0`-valued norms).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify definitions (`cauchyBound`, `IsRoot`, `eval_eq_sum_range`, etc.). |
| `rw` / `apply_fun` | Rewrite using hypotheses (e.g., `h : p.IsRoot a`), apply functions to equalities. |
| `gcongr` | Prove inequalities by congruence (e.g., bounding sums, powers). |
| `field_simp` | Simplify division expressions, especially with nonzero denominators. |
| `ring` | Normalize polynomial/ring expressions after simplifications. |
| `rcases` / `cases` | Split disjunctions (`eq_or_ne`, `lt_or_gt_of_ne`) for case analysis. |
| `apply lt_of_le_of_ne` | Prove strict inequality from nonstrict + inequality of terms. |
| `have` / `suffices` | Introduce intermediate claims (e.g., key inequality for geometric sum). |
| `trans` / `trans_le` | Chain inequalities. |

---

#### **4. Proof Logic**

The proof of `IsRoot.norm_lt_cauchyBound` proceeds as follows:

1. **Unfold definitions**:
   - Use `IsRoot.def` → `p.eval a = 0`.
   - Expand `eval_eq_sum_range` to get `a^n = -∑_{i < n} (a_i / a_n) a^i`.

2. **Apply norm**:
   - Apply `nnnorm` to both sides, simplify using `nnnorm_mul`, `nnnorm_pow`, `nnnorm_neg`.

3. **Derive key inequality**:
   - Show `‖a‖₊^n ≤ (cauchyBound p - 1) * ∑_{i < n} ‖a‖₊^i`.
   - This is done via bounding each coefficient term using `sup ≤ cauchyBound p - 1`.

4. **Handle cases on `‖a‖₊`**:
   - If `‖a‖₊ = 1`: trivial bound.
   - If `‖a‖₊ < 1`: use geometric series formula.
   - If `‖a‖₊ > 1`: manipulate inequality using geometric sum identity.

5. **Conclude**:
   - Simplify to get `‖a‖₊ < cauchyBound p`.

The proof heavily relies on:
- Properties of geometric sums (`geom_sum_of_one_lt`).
- Supremum bounds over finite sets (`le_sup`).
- Norm properties in `NormedDivisionRing`.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.GeomSum` | Geometric sum lemmas (e.g., `geom_sum_of_one_lt`). |
| `Mathlib.Algebra.Polynomial.Monic` | Polynomial basics (coeff, leadingCoeff, natDegree, etc.). |
| `Mathlib.Analysis.Normed.Field.Basic` | Normed division ring structure, `nnnorm`, `ℝ≥0` arithmetic. |

**Scope**: This module formalizes **Cauchy’s root bound** in the context of polynomials over a **normed division ring** (e.g., `ℂ`, `ℝ`, `ℚ_p`). It does *not* assume commutativity or algebraically closed fields — only the normed ring structure.

---

Let me know if you'd like a diagram of the proof structure or a summary of lemmas for reuse in other formalizations.