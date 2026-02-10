**Technical Metadata Brief: Degree of Univariate Monomials (Lean 4)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `natDegree_le_pred` | `∀ {p : R[X]}, p.natDegree ≤ n → p.coeff n = 0 → p.natDegree ≤ n - 1` | Shows that if the coefficient at degree `n` is zero and the degree is ≤ `n`, then the degree is actually ≤ `n−1`. Used to refine degree bounds when a top coefficient vanishes. |
| `monomial_natDegree_leadingCoeff_eq_self` | `∀ {p : R[X]}, #p.support ≤ 1 → monomial p.natDegree p.leadingCoeff = p` | Characterizes polynomials with support size ≤ 1: they equal the monomial built from their natural degree and leading coefficient. |
| `C_mul_X_pow_eq_self` | `∀ {p : R[X]}, #p.support ≤ 1 → C p.leadingCoeff * X ^ p.natDegree = p` | Reformulates the above in terms of `C` (constant embedding) and `X ^ n`, i.e., standard monomial form `a * X^n`. |

---

### 2. **Naming Conventions**

- **`natDegree_` prefix**: Used for lemmas involving `natDegree` (e.g., `natDegree_le_pred`).
- **`leadingCoeff`**: Standard name for the coefficient of the highest-degree nonzero term.
- **`monomial`**: Refers to the `Polynomial.monomial n a` constructor (`a • X^n`), used in structural characterizations.
- **`C_mul_X_pow_`**: Composite naming for expressions involving `C a * X ^ n`, where `C` embeds scalars.
- **`card_support_le_one_iff_monomial`**: Implicitly used via `card_support_le_one_iff_monomial.1`; indicates equivalence between support size ≤ 1 and being a monomial.

---

### 3. **Tactic Stack**

- **`aesop`**: Used for automated reasoning in `natDegree_le_pred`, especially for handling disjunctions and contradictions.
- **`rcases` / `obtain`**: For destructuring hypotheses (e.g., `n` as `0` or `k+1`, or `h` as existence of `n, a`).
- **`simp [ha]`**: Simplification with case analysis on `a = 0`.
- **`rw [...]`**: Rewriting using lemmas like `C_mul_X_pow_eq_monomial` and the previously proved `monomial_natDegree_leadingCoeff_eq_self`.
- **`classical`**: Enables classical reasoning (e.g., for case analysis on existence).
- **`resolve_left`**: Used to eliminate one branch of a disjunction in `natDegree_le_pred`.

---

### 4. **Proof Logic**

- **Inductive/Case Analysis on `n`**: In `natDegree_le_pred`, `n` is destructed as `0` or `k+1` to handle subtraction.
- **Case analysis on `a = 0`**: In `monomial_natDegree_leadingCoeff_eq_self`, after extracting `⟨n, a, rfl⟩`, the proof splits on whether the coefficient is zero.
- **Rewriting via equivalence**: Uses `card_support_le_one_iff_monomial` to reduce the hypothesis `#p.support ≤ 1` to an explicit monomial form.
- **Transitivity via rewriting**: In `C_mul_X_pow_eq_self`, the proof chains two rewrites: first to monomial form, then to the polynomial itself.

---

### 5. **Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.Polynomial.Degree.Definitions`: Provides `natDegree`, `leadingCoeff`, `coeff`, `support`.
  - `Mathlib.Algebra.Polynomial.Monomial`: Defines `monomial`, `C`, `X`, and basic identities like `C_mul_X_pow_eq_monomial`.
  - `Mathlib.Data.Nat.SuccPred`: Supplies arithmetic lemmas for `nat` subtraction and successor/predecessor reasoning.

- **Algebraic context**: Works over a `Semiring R`, with no requirement for commutativity or division.
- **Noncomputable section**: Indicates that definitions/lemmas may involve classical choice (e.g., `leadingCoeff` may be undefined constructively for zero polynomial).

---

**Domain Summary**: This module formalizes foundational properties of univariate polynomials with at most one nonzero coefficient (i.e., monomials including the zero polynomial), focusing on degree and coefficient reconstruction. It serves as a building block for more advanced degree theory in `Mathlib`.