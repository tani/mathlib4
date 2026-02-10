### Technical Metadata Brief: Newton-Raphson Method in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `newtonMap` | `def newtonMap (x : S) : S` | Defines the Newton-Raphson iteration map: `x ↦ x − P(x)/P'(x)`, with junk-value fallback when `P'(x)` is not a unit. |
| `newtonMap_apply` | `P.newtonMap x = x − (Ring.inverse (aeval x (derivative P))) * aeval x P` | Unfolds the definition of `newtonMap`. |
| `newtonMap_apply_of_isUnit` | `IsUnit (aeval x (derivative P)) → P.newtonMap x = x − h.unit⁻¹ * aeval x P` | Simplifies `newtonMap` when derivative is invertible. |
| `newtonMap_apply_of_not_isUnit` | `¬IsUnit (aeval x (derivative P)) → P.newtonMap x = x` | Simplifies `newtonMap` when derivative is not invertible (junk-value behavior). |
| `isFixedPt_newtonMap_of_aeval_eq_zero` | `aeval x P = 0 → IsFixedPt P.newtonMap x` | Roots of `P` are fixed points of Newton iteration. |
| `isFixedPt_newtonMap_of_isUnit_iff` | `IsUnit (aeval x (derivative P)) → (IsFixedPt P.newtonMap x ↔ aeval x P = 0)` | Equivalence between fixed points and roots, assuming invertible derivative. |
| `isNilpotent_iterate_newtonMap_sub_of_isNilpotent` | `IsNilpotent (aeval x P) → IsNilpotent (P.newtonMap^[n] x − x)` | Shows that nilpotency of `P(x)` is preserved under Newton iteration (up to subtraction from original `x`). |
| `aeval_pow_two_pow_dvd_aeval_iterate_newtonMap` | `(IsNilpotent (aeval x P)) → (IsUnit (aeval x (derivative P))) → (aeval x P)^(2^n) ∣ aeval (P.newtonMap^[n] x) P` | Key divisibility result: high powers of `P(x)` divide `P` evaluated at the `n`-th Newton iterate. |
| `existsUnique_nilpotent_sub_and_aeval_eq_zero` | `(IsNilpotent (aeval x P)) → (IsUnit (aeval x (derivative P))) → ∃! r, IsNilpotent (x − r) ∧ aeval r P = 0` | Main structural result: if `P(x)` is nilpotent and `P'(x)` is invertible, then `x` splits uniquely as `x = n + r`, with `n` nilpotent and `r` a root. Used for Jordan–Chevalley decomposition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isFixedPt_`: predicates about fixed points.
  - `isNilpotent_`, `isUnit_`: predicates about algebraic properties (nilpotency, invertibility).
  - `aeval_`: evaluation of polynomials at elements via algebra map.
  - `newtonMap_`: related to Newton iteration map.
- **Suffixes**:
  - `_apply`: definition unfolding lemmas.
  - `_iff`: biconditional characterizations.
  - `_of_`: conditional versions (e.g., `of_isUnit`, `of_not_isUnit`).
  - `_sub`: statements about differences (often nilpotent or central to decomposition).
- **Other patterns**:
  - `pow_two_pow_`: exponentiation by powers of two.
  - `divisible/dvd_`: divisibility lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` | Simplification using definitional equalities and lemmas (e.g., `newtonMap_apply`, `Ring.inverse`, `mul_zero`). |
| `rw` | Rewriting using equalities, especially to unfold definitions or apply lemmas like `binomExpansion`. |
| `induction` | Structural induction on natural numbers (e.g., for `isNilpotent_iterate_...`, `aeval_pow_two_pow_...`). |
| `exact`, `refine`, `convert` | Goal-directed proof construction, especially with divisibility or uniqueness. |
| `have` / `suffices` | Intermediate lemma introduction, often to isolate key algebraic facts (e.g., `IsUnit` of derivative at iterate). |
| `simpa` | Simplify and discharge goal using assumptions (e.g., after `Ring.inverse_cancel`). |
| `ring` / `comm_ring` (implicit) | Used implicitly via `CommRing` context and `Commute.all` to justify algebraic manipulations. |
| `aesop` (not present) | Not used here — proofs are mostly manual and algebraically explicit. |

---

#### **4. Proof Logic**

- **Inductive structure**: Many proofs (e.g., `isNilpotent_iterate_...`, `aeval_pow_two_pow_...`) proceed by induction on `n : ℕ`.
- **Case analysis on units**: Lemmas like `newtonMap_apply_of_isUnit` / `of_not_isUnit` split on invertibility of derivative.
- **Binomial expansion (`binomExpansion`)**: Central to divisibility and uniqueness arguments — used to relate `P(r₁)` and `P(r₂)` via expansion around `r₁`.
- **Nilpotent/unit interplay**: Key logical flow:
  - Assume `P(x)` nilpotent, `P'(x)` unit.
  - Show Newton iterates stay close to `x` (nilpotent difference).
  - Use divisibility to show `P` vanishes at some iterate (or limit).
  - Prove uniqueness via binomial expansion and unit preservation.
- **Uniqueness via `existsUnique_of_exists_of_unique`**: Standard pattern: prove existence and then show any two candidates must be equal.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Polynomial.AlgebraMap` | Evaluation of polynomials via algebra maps (`aeval`). |
| `Mathlib.Algebra.Polynomial.Identities` | General polynomial identities (e.g., `binomExpansion`). |
| `Mathlib.RingTheory.Nilpotent.Lemmas` | Basic nilpotent element lemmas (e.g., `isNilpotent_neg_iff`, `isNilpotent_sub`). |
| `Mathlib.RingTheory.Polynomial.Nilpotent` | Nilpotency of coefficients vs. evaluation. |
| `Mathlib.RingTheory.Polynomial.Tower` | Compatibility of polynomial evaluation with algebra towers. |

**Domain**: Commutative ring theory, especially nilpotent elements, units, and polynomial root lifting.  
**Applications**: Hensel’s lemma, Jordan–Chevalley decomposition (semisimple + nilpotent splitting).  
**Assumptions**: `R`, `S` are commutative rings with algebra map `R → S`; `P ∈ R[X]`.

--- 

Let me know if you'd like a diagram of the logical dependencies or a formalized summary for use in a domain-specific AI agent.