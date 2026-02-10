### Technical Metadata Brief: Polynomial Evaluation in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eval₂` | `R[X] → (R →+* S) → S → S` | Generalized polynomial evaluation: evaluates `p` at `x ∈ S` via ring hom `f : R →+* S`. |
| `eval` | `R → R[X] → R` | Special case of `eval₂` where `f = id_R`. Evaluates `p` at `x ∈ R`. |
| `IsRoot` | `R[X] → R → Prop` | `IsRoot p a ↔ p.eval a = 0`. Defines when `a` is a root of `p`. |
| `comp` | `R[X] → R[X] → R[X]` | Composition: `p.comp q = eval₂ C q p`. Substitutes `q` for `X` in `p`. |
| `map` | `(R →+* S) → R[X] → S[X]` | Coefficient-wise application of ring hom `f`. |
| `eval₂AddMonoidHom` | `(R →+* S) → S → R[X] →+ S` | Bundled additive monoid hom version of `eval₂`. |
| `eval₂RingHom'` | `(R →+* S) → S → (∀ a, Commute (f a) x) → R[X] →+* S` | Bundled ring hom version of `eval₂` for possibly noncommutative `S`. |
| `eval₂RingHom` | `(R →+* S) → S → R[X] →+* S` | Bundled ring hom version of `eval₂` (assumes `S` commutative). |
| `evalRingHom` | `R → R[X] →+* R` | Bundled ring hom `p ↦ p.eval x`. |
| `compRingHom` | `R[X] → R[X] →+* R[X]` | Bundled ring hom `p ↦ p.comp q`. |
| `mapRingHom` | `(R →+* S) → R[X] →+* S[X]` | Bundled ring hom `p ↦ p.map f`. |

**Key Theorems**:
- `eval₂_mul` / `eval_mul`: Multiplicativity of evaluation (under commutativity).
- `eval₂_sum` / `eval_sum`: Compatibility with finite sums.
- `eval₂_pow` / `eval_pow`: Compatibility with powers.
- `eval_comp`: `p.comp q` evaluated at `x` equals `p` evaluated at `q.eval x`.
- `comp_assoc`: Composition is associative (for commutative rings).
- `root_mul`: In integral domains, `p * q` has root `a` iff `p` or `q` does.
- `eval₂_eq_eval_map`: `p.eval₂ f x = (p.map f).eval x`.
- `isRoot_prod`: Product has root `a` iff some factor does (in domains).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eval₂_`: Generalized evaluation (with `f : R →+* S`).
  - `eval_`: Special case where `f = id`.
  - `comp_`: Composition-related.
  - `map_`: Coefficient-wise map.
  - `isRoot_`: Root-related properties.

- **Suffixes**:
  - `_RingHom` / `_AddMonoidHom`: Bundled homomorphism versions.
  - `_noncomm`: For variants valid in noncommutative settings (e.g., `eval₂_mul_noncomm`).
  - `_eq_zero_of_*`: Implication lemmas about zero evaluations.
  - `_dvd`: Divisibility-related lemmas.

- **Special patterns**:
  - `*_at_*`: Evaluation at image of ring hom (e.g., `eval₂_at_apply`).
  - `*_natCast` / `*_intCast`: For natural/integer scalars (deprecated aliases use `_nat_cast`, `_int_cast`).
  - `*_ofNat`: For `OfNat.ofNat` (noncomputable, with `AtLeastTwo`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Dominant tactic for simplifying definitions (`eval₂_eq_sum`, `eval`, `comp`, etc.).
- `rw`: Rewriting using lemmas (e.g., `eval₂_mul`, `comp`, `map`).
- `induction ... using Polynomial.induction_on'`: Structural induction on polynomials (basis: `C a`, `X`, closed under `+`, `*`).
- `convert`: Used to align goals with known lemmas (e.g., `eval₂_at_apply`).
- `exact`, `refine`, `apply`: For direct proof steps.
- `cases`: For case analysis (e.g., on `k = 0`, `k = 1`, integers).
- `ring`: For commutative ring identities (e.g., in `eval₂_mul` proofs).
- `aesop`: Likely used in later sections (not explicit here, but common in Mathlib).
- `ext`: For extensionality (e.g., in `mapRingHom_comp_C`).

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs over polynomials use `Polynomial.induction_on'`, with cases:
  - Base: constants (`C a`) and `X`.
  - Inductive steps: closure under `+`, `*`.
- **Case analysis**: On coefficients (e.g., `k = 0`, `k = 1`) or on structure (e.g., `p = 0`, `p = C a`, `p = X`, etc.).
- **Bundled homomorphisms**: Many properties are lifted via bundled homs (`eval₂RingHom`, `mapRingHom`, etc.), leveraging `map_*` lemmas (e.g., `map_sum`, `map_prod`, `map_pow`).
- **Noncommutative vs. commutative**: Distinction is explicit:
  - `eval₂_mul_noncomm` for general `S`.
  - `eval₂_mul` (simpler) when `S` is commutative (`CommSemiring`).
- **Root lemmas**: Often reduce to `eval` properties + `mul_eq_zero` (in domains).
- **Composition**: Proved via induction, using `comp = eval₂ C` and properties of `eval₂`.

---

#### **5. Imports & Scope**

- **Primary import**: `Mathlib.Algebra.Polynomial.Basic`
- **Key algebraic structures used**:
  - `Semiring`, `CommSemiring`, `Ring`, `CommRing`, `NoZeroDivisors`, `IsDomain`.
  - `AddMonoidAlgebra`, `Finset`, `List`, `Multiset`.
- **Bundled homomorphisms**: `→+*` (ring homs), `→+` (additive monoid homs).
- **Noncomputable section**: Required due to use of `sum` over arbitrary index types.

---

### Summary

This module formalizes polynomial evaluation, composition, and coefficient mapping in full generality — from semirings to rings, commutative to noncommutative targets — with careful attention to bundling (to support typeclass inference and efficient notation). The design emphasizes modularity: definitions are first given as functions, then upgraded to bundled homs, with lemmas phrased to support both perspectives. The heavy use of `induction_on'` and `simp` reflects Lean 4’s reliance on structural induction and automation for algebraic reasoning.