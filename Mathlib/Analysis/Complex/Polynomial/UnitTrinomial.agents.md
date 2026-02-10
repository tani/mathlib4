### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
- **`Polynomial.IsUnitTrinomial`**  
  *Typeclass/property*: A predicate on polynomials `p : ℤ[X]` indicating that `p` is a *unit trinomial* — i.e., a trinomial whose coefficients are units in `ℤ` (so coefficients are ±1), and which has exactly three nonzero terms.  
  *Purpose*: Captures a class of sparse integer polynomials (e.g., `X^n ± X^m ± 1`) for which special irreducibility criteria apply.

- **`mirror p`**  
  *Definition*: The *reciprocal polynomial* (or *mirror*) of `p`, defined as `X^deg p * p.eval⁻¹ X⁻¹`, or equivalently `∑ i, p.coeff i • X^(n - i)` where `n = p.degree`.  
  *Purpose*: Used to detect self-reciprocal factors; common in irreducibility arguments for trinomials.

- **`irreducible_of_coprime'`**  
  *Theorem*:  
  ```lean
  ∀ p : ℤ[X], IsUnitTrinomial p →
    (∀ z : ℂ, ¬(aeval z p = 0 ∧ aeval z (mirror p) = 0)) → Irreducible p
  ```  
  *Purpose*: Provides a sufficient condition for irreducibility of a unit trinomial over `ℤ`: if `p` and its mirror share no common complex root, then `p` is irreducible in `ℤ[X]`.  
  *Proof strategy*: Reduces to showing any nontrivial factorization would yield a common root of `p` and `mirror p`, contradicting the hypothesis.

#### 2. **Naming Conventions**
- **Prefixes**:
  - `is_` — for typeclass predicates/properties (e.g., `IsUnitTrinomial`).
  - `aeval` — for *analytic evaluation* at complex numbers (`ℂ`), distinguishing it from syntactic `eval`.
  - `mirror` — for reciprocal polynomial.
- **Suffixes**:
  - `'` (prime) — for variants of existing lemmas (e.g., `irreducible_of_coprime'` vs. a prior `irreducible_of_coprime`).
- **Other**:
  - `natDegree` — used instead of `degree` for non-zero polynomials to avoid `⊥` issues.
  - `eval_map`, `aeval_def` — standard notations for evaluation under ring maps.

#### 3. **Tactic Stack**
- **Core tactics**:
  - `refine` — to construct proofs by filling holes (`?_`).
  - `rw` — rewriting using equalities/definitions (e.g., `aeval_mul`, `leadingCoeff_mul`).
  - `cases'` — destructuring existential or conjunction hypotheses (e.g., `cases' hq with g' hg'`).
  - `replace` — strengthening hypotheses via deduction.
  - `rwa` — rewrite + assumption.
  - `intro` / `intro h` — for introducing variables/hypotheses.
- **Specialized**:
  - `Complex.exists_root` — from `degree > 0` to existence of a complex root (Fundamental Theorem of Algebra).
  - `isUnit_of_mul_isUnit_left` — algebraic lemma about units in rings.
  - `eq_C_of_natDegree_eq_zero` — characterizes degree-0 polynomials as constants.

#### 4. **Proof Logic**
- **High-level structure**:
  1. Assume `p` is a unit trinomial (`hp`) and has no common complex root with `mirror p` (`h`).
  2. To prove `Irreducible p`, assume a factorization `p = q * r` and aim to show one factor is a unit.
  3. Use `hp.irreducible_of_coprime` (a prior lemma) to reduce to showing `q` or `r` is a unit.
  4. Suppose `0 < q.natDegree`; derive contradiction:
     - Lift degree to `ℂ` via injectivity of `ℤ ↪ ℂ`.
     - Extract a complex root `z` of `q` (via `Complex.exists_root`).
     - Show `z` is also a root of `p` (since `p = q * r`) and of `mirror p` (via properties of mirror and factorization).
     - Contradict `h`.
  5. Conclude `q.natDegree = 0`, so `q` is constant; then use unit conditions on leading coefficient to show `q` is a unit in `ℤ[X]`.

#### 5. **Imports**
- **`Mathlib.Algebra.Polynomial.UnitTrinomial`**  
  Defines `IsUnitTrinomial`, basic properties (e.g., `leadingCoeff_isUnit`, `irreducible_of_coprime`).
- **`Mathlib.Analysis.Complex.Polynomial.Basic`**  
  Provides:
  - `aeval` (evaluation at complex numbers),
  - `mirror` (reciprocal polynomial),
  - `eval_map`, `aeval_def`, and tools for complex root existence (`Complex.exists_root`).

---

This module contributes to the formalization of *explicit irreducibility criteria* for sparse integer polynomials, with a focus on leveraging complex analysis (via `ℂ`) to detect factorization. The result `irreducible_of_coprime'` is a key step toward algorithmic irreducibility testing for trinomials like `X^n ± X^m ± 1`.