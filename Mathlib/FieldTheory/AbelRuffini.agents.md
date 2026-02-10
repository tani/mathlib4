Here's a structured technical metadata summary of the provided Lean 4 file, focusing on definitions, theorems, naming conventions, proof tactics, and dependencies:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `solvableByRad F E` | `IntermediateField F E` | Intermediate field of elements in `E` solvable by radicals over `F`. |
| `IsSolvableByRad F : E → Prop` | Inductive predicate | Defines elements of `E` constructible from `F` using field ops and radicals. |
| `P (α : solvableByRad F E)` | `Prop` | Predicate `IsSolvable (minpoly F α).Gal`, used in induction. |
| `gal_zero_isSolvable`, `gal_one_isSolvable`, `gal_C_isSolvable`, `gal_X_isSolvable`, `gal_X_sub_C_isSolvable`, `gal_X_pow_isSolvable` | `IsSolvable p.Gal` | Base cases: Galois groups of constant, linear, and monomial polynomials are solvable. |
| `gal_mul_isSolvable`, `gal_prod_isSolvable` | `IsSolvable (p * q).Gal`, `IsSolvable s.prod.Gal` | Closure under multiplication of polynomials with solvable Galois groups. |
| `gal_isSolvable_of_splits` | `p.Splits → IsSolvable q.Gal → IsSolvable p.Gal` | If `p` splits in a solvable extension of `q`’s splitting field, then `p.Gal` is solvable. |
| `gal_isSolvable_tower` | Tower law for solvability of Galois groups in compositum extensions. |
| `gal_X_pow_sub_one_isSolvable`, `gal_X_pow_sub_C_isSolvable` | `IsSolvable (X^n - 1).Gal`, `IsSolvable (X^n - a).Gal` | Key lemmas for radical extensions (cyclotomic and Kummer-type). |
| `splits_X_pow_sub_one_of_X_pow_sub_C` | Implication: if `X^n - a` splits, then `X^n - 1` splits (under `a ≠ 0`). | Used to reduce Kummer extensions to cyclotomic ones. |
| `isSolvable (α : solvableByRad F E)` | `IsSolvable (minpoly F α).Gal` | Main inductive result: elements solvable by radicals have solvable Galois groups. |
| `isSolvable'` | **Abel–Ruffini (one direction)**: If `q` is irreducible and has a solvable-by-radicals root, then `q.Gal` is solvable. | Main theorem of the file. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `gal_`: Pertains to Galois groups of polynomials (e.g., `gal_X_pow_isSolvable`).
  - `isSolvableByRad`, `IsSolvableByRad`: Predicate for radical solvability.
  - `splits_`: Statements about polynomial splitting (e.g., `splits_X_pow_sub_one_of_X_pow_sub_C`).
  - `induction[123]`: Auxiliary lemmas for structural induction on `solvableByRad`.
- **Suffixes**:
  - `_isSolvable`: Goal is to prove solvability of a Galois group.
  - `_aux`: Auxiliary helper lemmas (e.g., `gal_X_pow_sub_C_isSolvable_aux`).
- **Structure**:
  - `gal_` + polynomial description + `_isSolvable`: e.g., `gal_X_pow_sub_C_isSolvable`.
  - `inductionN`: Hierarchical induction steps for the main `isSolvable` proof.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `by infer_instance` | Proving `IsSolvable` goals via typeclass resolution. |
| `rw`, `rwa`, `erw` | Rewriting using equalities, especially minimal polynomial identities and evaluation maps. |
| `simp` / `simp only` | Simplifying goals using algebraic properties (e.g., `aeval`, `map`, `roots`). |
| `exact`, `convert`, `refine` | Constructing proofs term-by-term, often with partial application. |
| `obtain ⟨x, hx⟩ := ...` | Existential elimination (e.g., extracting roots or exponents). |
| `ext`, `funext` | Extensionality for functions/alg homomorphisms. |
| `apply`, `intro`, `cases'` | Standard natural deduction. |
| `have`, `suffices` | Introducing intermediate claims. |
| `ring`, `abel` | (Implicitly via `ring`-like simplifications in multiplicative groups of roots of unity.) |
| `aesop` | Not present — proofs are highly structured and manual. |
| `induction_on'`, `rec`, `induction` | Structural induction on inductive predicates (`IsSolvableByRad`, `Multiset`). |

---

### **4. Proof Logic**

- **Inductive structure**:
  - Proofs over `IsSolvableByRad` use its 7 constructors (`base`, `add`, `neg`, `mul`, `inv`, `rad`).
  - Main theorem `isSolvable` is proved by `solvableByRad.induction`, verifying each constructor case.
- **Tower & splitting arguments**:
  - Key lemmas (`gal_isSolvable_tower`, `gal_isSolvable_of_splits`) use field tower properties and splitting field universality.
- **Radical extensions**:
  - `gal_X_pow_sub_C_isSolvable` reduces to `gal_X_pow_sub_one_isSolvable` via `splits_X_pow_sub_one_of_X_pow_sub_C`.
  - Uses roots of unity and Kummer theory (e.g., `map_rootsOfUnity_eq_pow_self`).
- **Minimal polynomial handling**:
  - Relies on `minpoly.eq_of_irreducible`, `aeval`, `aeval_comp`, and `minpoly.dvd`.
  - `isSolvable'` lifts `isSolvable` from `solvableByRad` to arbitrary roots of irreducible polynomials.

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.GroupTheory.Solvable` | `IsSolvable` typeclass for groups and group homomorphisms. |
| `Mathlib.FieldTheory.PolynomialGaloisGroup` | Definition of Galois group of a polynomial (`p.Gal`), splitting fields, and basic properties. |
| `Mathlib.RingTheory.RootsOfUnity.Basic` | Roots of unity, cyclotomic polynomials, and Kummer theory tools (e.g., `rootsOfUnity`, `map_rootsOfUnity_eq_pow_self`). |

Additional implicit dependencies:
- `Mathlib.FieldTheory.SplittingField`
- `Mathlib.RingTheory.Minpoly`
- `Mathlib.FieldTheory.Adjoin`
- `Mathlib.LinearAlgebra.Determinant`
- `Mathlib.FieldTheory.Galois`

---

Let me know if you'd like a diagram of the proof structure or a formalized dependency graph.