### Technical Brief: `Polynomial.mirror` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mirror` | `p.mirror = p.reverse * X ^ p.natTrailingDegree` | Reverses coefficients *while preserving* `natDegree`, unlike `reverse`, which may drop degree if divisible by `X`. |
| `mirror_zero` | `0.mirror = 0` | Base case for zero polynomial. |
| `mirror_monomial` | `(monomial n a).mirror = monomial n a` | `mirror` fixes monomials (including `C a`, `X`). |
| `mirror_natDegree` | `p.mirror.natDegree = p.natDegree` | Degree is preserved under `mirror`. |
| `mirror_natTrailingDegree` | `p.mirror.natTrailingDegree = p.natTrailingDegree` | Trailing degree is preserved. |
| `coeff_mirror` | `p.mirror.coeff n = p.coeff (revAt (p.natDegree + p.natTrailingDegree) n)` | Coefficient-wise description via `revAt`. |
| `mirror_eval_one` | `p.mirror.eval 1 = p.eval 1` | Evaluation at 1 is invariant under `mirror`. |
| `mirror_mirror` | `p.mirror.mirror = p` | `mirror` is an involution. |
| `mirror_involutive` | `Function.Involutive mirror` | Formalizes involution property. |
| `mirror_trailingCoeff` / `mirror_leadingCoeff` | `p.mirror.trailingCoeff = p.leadingCoeff`, etc. | Swaps leading and trailing coefficients. |
| `coeff_mul_mirror` | `(p * p.mirror).coeff (p.natDegree + p.natTrailingDegree) = p.sum fun _ => (· ^ 2)` | Central coefficient of `p * mirror p` is sum of squares of coefficients. |
| `natDegree_mul_mirror` | `(p * p.mirror).natDegree = 2 * p.natDegree` | Degree doubles under multiplication with mirror (in domain). |
| `mirror_mul_of_domain` | `(p * q).mirror = p.mirror * q.mirror` | `mirror` preserves multiplication in domains (`[NoZeroDivisors R]`). |
| `irreducible_of_mirror` | `¬IsUnit f → (∀ k, f * f.mirror = k * k.mirror → …) → IsRelPrime f f.mirror → Irreducible f` | Irreducibility criterion using `mirror`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `mirror_`: All definitions and theorems involving the `mirror` operation.
  - `coeff_`, `natDegree_`, `natTrailingDegree_`: Standard polynomial metadata.
  - `mul_`, `smul_`, `neg_`: Algebraic operation compatibility.
  - `involutive`, `eq_iff`, `inj`, `eq_zero`: Logical properties (involution, injectivity, equivalence).
- **No special suffixes** beyond standard Mathlib conventions (`_zero`, `_one`, `_mul`, `_add`, `_neg`, `_smul`, `_inj`, `_eq_zero`, etc.).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`mirror`, `coeff`, `reverse`, `natDegree`, etc.). |
| `simp` / `simp_rw` | Simplifying using `@[simp]` lemmas (e.g., `mirror_zero`, `mirror_monomial`). |
| `by_cases` | Splitting on `p = 0` or `a = 0`. |
| `exact`, `rwa`, `apply` | Direct proof steps, especially after `rw`. |
| `Finset.sum_congr`, `Finset.sum_bij_ne_zero` | For coefficient-level manipulations and bijections (e.g., `mirror_eval_one`). |
| `revAt_invol`, `revAt_le` | Leveraging properties of `revAt` (reversal index function). |
| `ring`, `linarith` | Implicitly used in arithmetic manipulations (e.g., `two_mul`, `tsub_add_cancel`). |
| `nontriviality` | To assume nontriviality of ring when needed. |
| `rcases` / `cases` | Decomposing disjunctions (e.g., in `irreducible_of_mirror`). |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **case analysis on `p = 0`**, then use structural properties of `reverse`, `natDegree`, `natTrailingDegree`, and `coeff`.
  - Key technique: **coefficient-wise equality** via `Polynomial.ext` (extensionality), especially for involution proofs (`mirror_mirror`).
  - For multiplicative properties (`mirror_mul_of_domain`), rely on:
    - `reverse_mul_of_domain` (from `Mathlib.Algebra.Polynomial.Reverse`)
    - `natTrailingDegree_mul` (in domains)
    - Power laws (`pow_add`, `X_pow_mul`)
  - For `irreducible_of_mirror`, the logic is:
    1. Assume factorization `f = g * h`.
    2. Define `k := g * h.mirror`.
    3. Show `f * f.mirror = k * k.mirror`.
    4. Apply hypothesis `h2` to restrict possible `k`.
    5. Use `IsRelPrime f f.mirror` to eliminate extraneous cases.
    6. Conclude `g` or `h` is a unit.

- **Induction**: Not used directly; proofs are mostly algebraic and coefficient-level.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.NatAntidiagonal` | For sum manipulations over antidiagonals (used in `coeff_mul_mirror`). |
| `Mathlib.Algebra.Polynomial.Reverse` | Provides `reverse`, `reflect`, `revAt`, and key lemmas like `reverse_mul_of_domain`, `reverse_natDegree`. |

**Scope**:  
- Works over **semirings** (for basic properties), **rings** (for `mirror_neg`, `mirror_smul`), and **commutative rings with no zero divisors** (for multiplicative preservation and irreducibility criterion).
- Designed for **univariate polynomials** (`R[X]`).

---

### Summary

`Polynomial.mirror` is a refined version of `reverse` that preserves degree by compensating with a power of `X`. It is an involution, swaps leading/trailing coefficients, and behaves well under multiplication in domains. Its main application is an irreducibility criterion (`irreducible_of_mirror`) that leverages symmetry between `f` and `f.mirror`. The formalization is clean, modular, and leverages existing `reverse` infrastructure in Mathlib.