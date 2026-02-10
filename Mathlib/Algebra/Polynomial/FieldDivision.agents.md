Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Polynomial Root Multiplicity Theory in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rootMultiplicity` | `p.rootMultiplicity t : ℕ` | Counts multiplicity of root `t` in polynomial `p`. |
| `derivative` | `derivative : R[X] → R[X]` | Formal derivative of a univariate polynomial. |
| `IsRoot` | `p.IsRoot t ↔ (X - C t) ∣ p` | `t` is a root of `p` iff `X - t` divides `p`. |
| `iterate_derivative` | `derivative^[n] p` | `n`-th iterate of derivative operator. |
| `normalize` | `normalize p = normUnit p • p` | Normalizes polynomial to monic form (up to unit). |
| `div`, `mod` | `p / q`, `p % q` | Polynomial division and remainder over a field. |
| `gcd` | `EuclideanDomain.gcd p q` | Greatest common divisor in Euclidean domain `R[X]`. |
| `roots`, `rootSet` | `p.roots : Multiset R`, `p.rootSet S : Set S` | Multiset / set of roots (with multiplicity / without). |

##### **Key Theorems**
| Name | Statement (informal) |
|------|----------------------|
| `derivative_rootMultiplicity_of_root_of_mem_nonZeroDivisors` | If `t` is a root of `p` and its multiplicity is a non-zero-divisor, then multiplicity in `p'` is exactly one less. |
| `lt_rootMultiplicity_iff_isRoot_iterate_derivative_of_mem_nonZeroDivisors` | `n < mult_t(p)` iff all derivatives up to order `n` vanish at `t`, assuming factorial is a non-zero-divisor. |
| `one_lt_rootMultiplicity_iff_isRoot` | `mult_t(p) > 1` iff `t` is a root of both `p` and `p'`. |
| `one_lt_rootMultiplicity_iff_isRoot_gcd` | Over a GCD monoid, `mult_t(p) > 1` iff `t` is a root of `gcd(p, p')`. |
| `isRoot_of_isRoot_of_dvd_derivative_mul` | If `p ∣ p'·g` and `t` is a root of `p`, then `t` is a root of `g` (char 0). |
| `eval_iterate_derivative_rootMultiplicity` | Evaluating the `m`-th derivative at `t` gives `m! • (p / (X - t)^m)(t)`. |
| `lt_rootMultiplicity_of_isRoot_iterate_derivative` | In characteristic zero, if all derivatives up to `n` vanish at `t`, then `mult_t(p) > n`. |
| `gcd_map` | GCD commutes with ring homomorphisms (in char 0 / field case). |
| `isCoprime_of_is_root_of_eval_derivative_ne_zero` | If `f'(a) ≠ 0`, then `(X - a)` and `f /ₘ (X - a)` are coprime. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isRoot_`: properties about roots (`isRoot_iterate_derivative`, `isRoot_of_isRoot_of_dvd_derivative_mul`)
  - `derivative_`: properties about derivatives (`derivative_rootMultiplicity`, `derivative_X_sub_C_pow`)
  - `rootMultiplicity_`: multiplicity-related lemmas (`rootMultiplicity_sub_one_le_derivative_rootMultiplicity`)
  - `eval_`: evaluation-related (`eval_iterate_derivative_rootMultiplicity`, `eval_gcd_eq_zero`)
  - `mem_roots_`, `roots_`: root set properties (`mem_roots_map`, `roots_degree_eq_one`)
  - `normalize_`, `normUnit_`: normalization (`normalize_monic`, `coe_normUnit`)
  - `div_`, `mod_`: division algorithm (`div_def`, `mod_def`, `div_eq_zero_iff`)
  - `degree_`: degree properties (`degree_pos_of_irreducible`, `degree_add_div`)
  - `isUnit_`, `irreducible_`, `prime_`: algebraic properties (`isUnit_iff_degree_eq_zero`, `prime_of_degree_eq_one`)

- **Suffixes**:
  - `_iff_`: equivalence characterizations (`lt_rootMultiplicity_iff_isRoot_iterate_derivative`)
  - `_of_`: conditional versions (`derivative_rootMultiplicity_of_root`, `isRoot_of_isRoot_of_dvd_derivative_mul`)
  - `_mul_`, `_div_`, `_add_`: operations involved (`X_sub_C_mul_divByMonic_eq_sub_modByMonic`)
  - `_map_`: behavior under ring homomorphisms (`gcd_map`, `map_dvd_map'`)

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: simplification and rewriting with lemmas.
- `rw`: rewriting using equalities and equivalences.
- `exact`, `assumption`, `intro`, `cases'`: basic proof structure.
- `by_cases`: case analysis on equalities or propositions.
- `conv`: equational reasoning in subexpressions.
- `ring`: simplifying polynomial arithmetic.
- `omega`: reasoning about natural number inequalities.
- `exact?`, `aesop`: automated reasoning (especially in later sections).
- `apply`, `have`, `obtain`: intermediate lemma introduction.
- `convert`, `congr'`: congruence-based unification.

---

#### **4. Proof Logic**

- **Inductive / iterative reasoning**: Many proofs use induction on `n` (e.g., `lt_rootMultiplicity_of_isRoot_iterate_derivative_of_mem_nonZeroDivisors'`).
- **Case analysis on zero/nonzero**: Frequent `by_cases h : p = 0` or `p.IsRoot t`.
- **Factorization arguments**: Use of `p.pow_rootMultiplicity_dvd`, `exists_eq_pow_rootMultiplicity_mul_and_not_dvd`.
- **Dvd-based reasoning**: Many proofs rely on divisibility (`dvd_iff_isRoot`, `dvd_gcd_iff`, `gcd_dvd_left/right`).
- **Evaluation-based reasoning**: Use of `eval_iterate_derivative_rootMultiplicity` to connect algebraic and analytic properties.
- **Normalization & unit handling**: Use of `normalize`, `normUnit`, and `monic_normalize` to reduce to monic cases.
- **Field-specific simplifications**: Over fields, division algorithm and Euclidean domain structure simplify many arguments (`div_def`, `mod_def`, `EuclideanDomain` instance).
- **Characteristic zero assumptions**: Often used to ensure factorials are non-zero-divisors or invertible.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Polynomial.Derivative`: derivative theory.
- `Mathlib.Algebra.Polynomial.Eval.SMul`: evaluation and scalar multiplication.
- `Mathlib.Algebra.Polynomial.Roots`: root multiplicity and root sets.
- `Mathlib.RingTheory.EuclideanDomain`: Euclidean domain structure on `R[X]`.
- `Mathlib.RingTheory.UniqueFactorizationDomain.NormalizedFactors`: normalization and UFD properties.

**Scope**:
- Focuses on **univariate polynomials over commutative rings/fields**, especially:
  - Root multiplicity and derivative interaction.
  - Polynomial division and Euclidean structure.
  - GCD and coprimality.
  - Behavior under ring homomorphisms and field extensions.
- Assumes `CommRing R`, `[IsDomain R]`, `[CharZero R]`, or `[Field R]` as needed.
- Uses `NormalizationMonoid` for monic normalization.

---

Let me know if you'd like a dependency graph, a summary of the main development path, or formalization recommendations for extending this theory.