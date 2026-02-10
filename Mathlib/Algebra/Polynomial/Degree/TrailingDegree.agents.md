### Technical Brief: Trailing Degree in Univariate Polynomials (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `trailingDegree` | `R[X] → ℕ∞` | Returns the smallest exponent of `X` with nonzero coefficient; `⊤` for zero polynomial. |
| `natTrailingDegree` | `R[X] → ℕ` | Natural-number variant: `ENat.toNat ∘ trailingDegree`; maps `⊤` to `0`. |
| `trailingCoeff` | `R[X] → R` | Coefficient at index `natTrailingDegree p`. |
| `TrailingMonic` | `R[X] → Prop` | `trailingCoeff p = 1`. |
| `nextCoeffUp` | `R[X] → R` | Second-lowest coefficient (0 if `natTrailingDegree = 0`). |

**Key Theorems:**

| Name | Statement | Significance |
|------|-----------|--------------|
| `trailingDegree_eq_zero` | `trailingDegree p = 0 ↔ coeff p 0 ≠ 0` | Connects trailing degree to constant term. |
| `coeff_natTrailingDegree_ne_zero` | `coeff p (natTrailingDegree p) ≠ 0 ↔ p ≠ 0` | Nonzero trailing coefficient iff polynomial nonzero. |
| `natTrailingDegree_mul'` | `p.trailingCoeff * q.trailingCoeff ≠ 0 ⇒ (p*q).natTrailingDegree = p.natTrailingDegree + q.natTrailingDegree` | Additivity of trailing degree under multiplication (when leading terms don’t cancel). |
| `natTrailingDegree_mul` | `[NoZeroDivisors R] ⇒ (p*q).natTrailingDegree = p.natTrailingDegree + q.natTrailingDegree` | Full additivity in domains. |
| `trailingDegree_mul'` | Same hypothesis as above ⇒ equality of `trailingDegree`. | Analogous for `trailingDegree`. |
| `eq_X_pow_iff_natTrailingDegree_eq_natDegree` | For monic `p`: `p = X^n ↔ natTrailingDegree p = natDegree p` | Characterizes powers of `X` among monic polynomials. |
| `coeff_eq_zero_of_lt_natTrailingDegree` | `n < natTrailingDegree p ⇒ coeff p n = 0` | All lower coefficients vanish. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `trailingDegree_`, `natTrailingDegree_`, `trailingCoeff_`, `nextCoeffUp_`: Standard prefix for definitions.
  - `TrailingMonic`: Capitalized predicate (not a prefix).
- **Suffixes:**
  - `_eq_zero`, `_ne_zero`: Characterization of when value is zero/nonzero.
  - `_le_`, `_lt_`: Inequality lemmas.
  - `_mul_`, `_add_`: Behavior under ring operations.
  - `_of_`: Conditional versions (e.g., `natTrailingDegree_le_of_ne_zero`).
  - `_pred_eq_zero`: For predecessor index (e.g., `coeff_natTrailingDegree_pred_eq_zero`).
- **Special:**
  - `def`: For definitional lemmas (`TrailingMonic.def`).
  - `aux1`, `aux2`: Internal lemmas for coercion handling (porting notes).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification of definitions (`trailingDegree`, `coeff`, `support`, `ENat.toNat`). |
| `rw` | Rewriting using equivalences (`↔`), equalities, and lemmas like `trailingDegree_eq_natTrailingDegree`. |
| `apply` / `exact` | Goal-directed proof construction (e.g., `apply le_antisymm`). |
| `le_antisymm` | Proving equality via double inequality (common for degree equalities). |
| `by_cases` / `if_pos` / `if_neg` | Handling `if`-expressions (e.g., in `nextCoeffUp`, `monomial`). |
| `mem_support_iff` / `support_monomial` | Working with support sets. |
| `Finset.min_eq_top`, `min_mem_image_coe`, `Finset.le_min'` | Reasoning about minima in finite sets. |
| `ENat.toNat_le_toNat`, `WithTop.coe_le_coe` | Coercion reasoning between `ℕ`, `ℕ∞`, and `WithTop`. |
| `nontriviality R` | For `Nontrivial R` assumptions (e.g., in `eq_X_pow_iff_natDegree_le_natTrailingDegree`). |
| `ext n` | Extensionality for polynomials (coefficient-wise equality). |

---

#### **4. Proof Logic**

- **Structure:** Most proofs follow a *case analysis* + *support/minimality* pattern:
  1. **Zero vs. nonzero case split** (e.g., `by_cases hp : p = 0`).
  2. Use `support.min_mem` or `min_mem_image_coe` to extract minimal exponent.
  3. Apply `trailingDegree_le_of_ne_zero` or `coeff_eq_zero_of_lt_natTrailingDegree` to control coefficients.
  4. For multiplicative properties:
     - Use `coeff_mul` expansion.
     - Isolate the minimal term via `Finset.sum_eq_single`.
     - Eliminate other terms using `coeff_eq_zero_of_lt_natTrailingDegree`.
  5. For equality of degrees:
     - Prove `≤` and `≥` separately (often via `le_antisymm`).
     - Use `trailingDegree_eq_natTrailingDegree` to switch between `ℕ∞` and `ℕ`.
- **Induction:** Not used here—proofs rely on *support minimality* and *coefficient analysis*.

---

#### **5. Imports & Scope**

- **Core Imports:**
  - `Mathlib.Algebra.Polynomial.Degree.Support`: Defines `support`, `degree`, `min`, etc.
  - `Mathlib.Data.ENat.Basic`: For `ℕ∞` (`WithTop ℕ`) and `ENat.toNat`.
- **Scoped Notations:**
  - `open scoped Polynomial`: Enables `X`, `C`, `coeff`, `support`, etc.
- **Universe Parameters:**
  - `universe u v`, `variable {R : Type u} {S : Type v}`: Generalizes over semirings/rings.
- **Assumptions per Section:**
  - `[Semiring R]`: Default for most lemmas.
  - `[Ring R]`: For negation properties (`trailingDegree_neg`).
  - `[Nontrivial R]`: For `trailingDegree_one`, `trailingDegree_X`, etc.

---

#### **6. Domain-Specific AI Agent Notes**

- **Focus Areas for Automation:**
  - Recognize patterns like `coeff p n ≠ 0 ⇒ trailingDegree p ≤ n`.
  - Apply `natTrailingDegree_mul'` when `trailingCoeff p * trailingCoeff q ≠ 0`.
  - Use `eq_X_pow_iff_natTrailingDegree_eq_natDegree` for monic polynomial recognition.
- **Common Pitfalls:**
  - Confusing `trailingDegree` (`ℕ∞`) with `natTrailingDegree` (`ℕ`).
  - Forgetting `p ≠ 0` hypotheses in `trailingDegree_eq_natTrailingDegree`.
  - Overlooking `WithTop` coercion subtleties (e.g., `↑n < ⊤` always holds).
- **Suggested Tactics for Agent:**
  - `simp [trailingDegree, natTrailingDegree, coeff]` for normalization.
  - `apply natTrailingDegree_le_of_ne_zero` when `coeff p n ≠ 0` is visible.
  - `rw [trailingDegree_eq_natTrailingDegree hp]` after `by_cases hp : p = 0`.

--- 

Let me know if you'd like a visualization of the dependency graph or a tactic suggestion engine for this module.