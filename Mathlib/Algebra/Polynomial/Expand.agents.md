### Technical Brief: `Polynomial.expand` and `Polynomial.contract` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `expand R p f` | `R[X] →ₐ[R] R[X]` | Expands a polynomial by replacing each `Xⁿ` with `X^(n*p)`. Defined via `eval₂ C (X^p)`. |
| `contract p f` | `R[X] → R[X]` | Contracts a polynomial by extracting only coefficients at indices divisible by `p`, mapping `X^(n*p) ↦ Xⁿ`. |
| `coe_expand` | `(expand R p : R[X] → R[X]) = eval₂ C (X ^ p)` | Identifies `expand` with evaluation homomorphism. |
| `expand_eq_comp_X_pow` | `expand R p f = f.comp (X ^ p)` | Alternative definition: composition with `X^p`. |
| `expand_monomial` | `expand R p (monomial q r) = monomial (q * p) r` | Action on monomials. |
| `expand_expand` | `expand R p (expand R q f) = expand R (p * q) f` | Semigroup law for expansion. |
| `coeff_expand` | `(expand R p f).coeff n = if p ∣ n then f.coeff (n / p) else 0` | Coefficient-wise description. |
| `expand_injective` (for `p > 0`) | `Function.Injective (expand R p)` | Expansion is injective when `p ≠ 0`. |
| `expand_eq_zero` | `expand R p f = 0 ↔ f = 0` (for `p > 0`) | Expansion preserves nonzeroness. |
| `natDegree_expand` | `(expand R p f).natDegree = f.natDegree * p` | Degree scales by `p`. |
| `monic_expand_iff` | `(expand R p f).Monic ↔ f.Monic` (for `p > 0`) | Monicity preserved under expansion. |
| `contract_expand` | `contract p (expand R p f) = f` (for `p ≠ 0`) | Left-inverse property. |
| `expand_contract` (under `CharP R p`, `NoZeroDivisors R`, `f' = 0`) | `expand R p (contract p f) = f` | Right-inverse when derivative vanishes (e.g., inseparable polynomials). |
| `expand_char` | `map (frobenius R p) (expand R p f) = f ^ p` | Interaction with Frobenius endomorphism. |
| `rootMultiplicity_expand` | `rootMultiplicity r (expand R p f) = p * rootMultiplicity (r^p) f` | Root multiplicities scale by `p`. |
| `of_irreducible_expand` | `Irreducible (expand R p f) → Irreducible f` (for `p ≠ 0`) | Irreducibility descends along expansion. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `expand_`, `contract_`: for main operations.
  - `coeff_`: for coefficient lemmas.
  - `map_`: for interaction with ring homomorphisms.
  - `isLocalHom_`, `monic_`, `leadingCoeff_`: structural properties.
- **Suffixes**:
  - `_iff`: biconditional characterizations (e.g., `monic_expand_iff`).
  - `_pow`: for powers of `p` (e.g., `expand_pow`, `expand_contract'`).
  - `_mul`, `_add`: for algebraic compatibility (e.g., `expand_mul`, `contract_add`).
- **Special**:
  - `expand_one`, `expand_zero`: base cases.
  - `eval`, `aeval`: evaluation variants.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: simplification with definitional equalities and lemmas.
- `induction_on` / `induction`: structural induction on polynomials.
- `ext`: extensionality (equality of polynomials via coefficients).
- `split_ifs`: case analysis on `if ... then ... else ...`.
- `rw`: rewriting using equalities (especially `coeff_*`, `expand_*`, `contract_*`).
- `ring`: for commutative semiring/ring arithmetic (e.g., `pow_mul`, `mul_comm`).
- `aesop`: automated reasoning for simple goals (used implicitly in many `by` blocks).
- `convert`: for equational reasoning with holes (e.g., `degree_eq_natDegree`).
- `exact`, `apply`, `intro`, `cases'`: standard proof scripting.

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs use `Polynomial.induction_on` (or `induction_on'`) over polynomials:
  - Base case: constants (`C r`).
  - Additive step: `f + g`.
  - Monomial step: `X^n`.
- **Case analysis on `p`**: Many theorems split on `p = 0` vs `p > 0`, especially when divisibility or injectivity is involved.
- **Divisibility reasoning**: Central to `coeff_expand`, `contract_expand`, and `expand_injective`.
- **Derivative vanishing**: In `ExpChar` section, `derivative f = 0` implies `f` is a `p`-th power (inseparability), enabling `expand_contract`.
- **Frobenius compatibility**: Proofs use `frobenius_def`, `map_pow`, and `add_pow_expChar` to relate expansion to Frobenius.
- **Root multiplicity**: Uses `rootMultiplicity_mul_X_sub_C_pow`, `eval_comp`, and `isRoot_comp` to relate roots under expansion.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.CharP.Lemmas`: for characteristic `p` theory (e.g., `CharP`, `frobenius`).
- `Mathlib.Algebra.Polynomial.Derivative`: derivative calculus for polynomials.
- `Mathlib.Algebra.Polynomial.RingDivision`: division and Euclidean structure.
- `Mathlib.RingTheory.Polynomial.Basic`: foundational polynomial algebra.

**Domain scope**:
- **Algebraic**: Commutative semirings/rings, modules, algebras.
- **Polynomial theory**: coefficients, degree, leading coefficient, irreducibility, roots, multiplicities.
- **Characteristic `p` phenomena**: Frobenius endomorphism, inseparability, `derivative = 0` ⇒ `p`-th power.

**Key assumptions**:
- `CommSemiring R` / `CommRing R` / `IsDomain R`: varying levels of structure.
- `CharP R p`, `NoZeroDivisors R`, `ExpChar R p`: for Frobenius and contraction results.

---

### Summary

This module formalizes the *expansion* and *contraction* operations on polynomials, central to studying inseparability and Frobenius behavior in positive characteristic. It establishes foundational algebraic properties (injectivity, degree scaling, monicity), interacts with evaluation and ring homomorphisms, and connects to deeper concepts like root multiplicities and irreducibility descent. The proofs rely heavily on structural induction, coefficient-wise reasoning, and characteristic-`p` identities.