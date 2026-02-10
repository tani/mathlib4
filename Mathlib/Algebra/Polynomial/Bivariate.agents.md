### Technical Metadata Brief: Bivariate Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Y` | `notation3:max "Y" => Polynomial.X (R := Polynomial _)` | Notation for the second indeterminate in `R[X][Y]`. |
| `R[X][Y]` | `notation3:max R "[X][Y]" => Polynomial (Polynomial R)` | Notation for bivariate polynomial ring over `R`. |
| `evalEval` | `evalEval (x y : R) (p : R[X][Y]) : R` | Evaluation of bivariate polynomial `p` at `(x, y)`. |
| `CC` | `CC (r : R) : R[X][Y]` | Embedding of base ring `R` into bivariate polynomials as constants. |
| `evalEvalRingHom` | `evalEvalRingHom (x y : R) : R[X][Y] →+* R` | Ring homomorphism induced by evaluation at `(x, y)`. |
| `evalEval_C`, `evalEval_CC`, `evalEval_zero`, `evalEval_one`, etc. | `[simp]` lemmas | Simplification rules for `evalEval` on basic terms. |
| `evalEval_add`, `evalEval_mul`, `evalEval_neg`, `evalEval_sub`, `evalEval_pow`, etc. | Lemmas | Show `evalEval` preserves ring operations (addition, multiplication, negation, subtraction, powers). |
| `evalEval_sum`, `evalEval_prod`, `evalEval_finset_sum`, `evalEval_list_prod`, `evalEval_multiset_prod` | Lemmas | Compatibility of `evalEval` with finitary sums/products. |
| `evalEval_surjective` | `Function.Surjective (evalEval x y)` | Evaluation map is surjective (onto `R`). |
| `eval₂RingHom_eval₂RingHom` | Equality of two ways to compose evaluation maps | Shows compatibility of `eval₂RingHom` with `evalEvalRingHom`. |
| `eval₂_eval₂RingHom_apply` | Application form of above | Evaluates bivariate polynomial after base change. |
| `eval_C_X_eval₂_map_C_X` | Identity on `R[X][Y]` | Substitution lemma: evaluating `p(Y, X')` at `Y ↦ X`, then `X' ↦ X`, recovers `p`. |
| `evalEval` (in `AdjoinRoot`) | `AdjoinRoot p →+* R` | Factorization of evaluation through the quotient by `p` when `p(x, y) = 0`. |
| `evalEval_mk` | `evalEval h (mk p g) = g.evalEval x y` | Action of `AdjoinRoot.evalEval` on generators. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `evalEval_`: for lemmas about `evalEval`.
  - `map_`: for lemmas about `mapRingHom`.
  - `coe_`: for coercion-related equalities (e.g., `coe_evalEvalRingHom`).
  - `eval₂_`, `evalRingHom_`: for lemmas involving `eval₂RingHom` and `evalRingHom`.

- **Suffixes**:
  - `_ringHom`: indicates a ring homomorphism version (e.g., `evalEvalRingHom`).
  - `_apply`: for application forms of equalities (e.g., `eval₂_eval₂RingHom_apply`).
  - `_hom`: occasionally used for homomorphism lemmas (e.g., `map_mapRingHom_eval_map`).

- **Abbreviations**:
  - `CC`: constant embedding.
  - `Y`: second variable.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Dominant tactic; simplifies using `[simp]` lemmas and explicit rewrite lists. |
| `rw [...]` | Rewriting using definitions or lemmas (e.g., `evalEval`, `eval_C`, `eval₂_hom`). |
| `ext` | Extensionality for ring homomorphisms or functions. |
| `congr` | Congruence to reduce goals to simpler subgoals (often with `$` to apply to specific terms). |
| `simpa [...] using ...` | Simplifies using given lemmas and matches the goal. |
| `rfl` | Reflexivity for definitional equalities. |
| `aesop` | Not present in this file — Lean 4 Mathlib style avoids heavy automation here. |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *definition → simplification* pattern:
  1. Expand definitions (`evalEval`, `CC`, `mapRingHom`, etc.).
  2. Apply known lemmas (`eval_C`, `eval_X`, `eval_add`, `eval_mul`, etc.).
  3. Use `simp only` with `[simp]` lemmas to reduce to trivial equalities.
- **Ring homomorphism proofs**:
  - Use `ext` to reduce to pointwise equality.
  - Then simplify using `simp` and lemmas like `eval₂_hom`, `eval_map`, `eval₂_evalRingHom`.
- **Inductive/structural reasoning**:
  - For `sum`, `prod`, `list_prod`, `multiset_prod`, rely on `eval₂_sum`, `eval_prod`, etc., and `List.map_map`/`Multiset.map_map`.
- **AdjoinRoot construction**:
  - Uses `lift` from `AdjoinRoot` universal property, with `eval₂_evalRingHom` to match the kernel condition.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.RingTheory.AdjoinRoot` | Provides `AdjoinRoot` and its universal property (`lift`, `mk`, etc.). Essential for the final lemma defining `evalEval` on `AdjoinRoot`. |

No other imports are listed — this module is self-contained within the ring theory and polynomial hierarchy of Mathlib.

---

### Summary

This file formalizes the foundational theory of bivariate polynomials over a semiring/ring/commutative ring `R`, using the representation `R[X][Y] ≅ R[X,Y]`. It defines evaluation at a point, shows it is a ring homomorphism, and connects it with base change and quotient constructions (`AdjoinRoot`). The style is highly computational and proof-oriented, leveraging Lean’s `simp`-based automation and explicit rewriting.