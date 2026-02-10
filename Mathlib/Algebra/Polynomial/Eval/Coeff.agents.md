### Technical Metadata Brief: Polynomial Evaluation and Coefficient Interaction (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eval₂` | `p.eval₂ f x : S` | Evaluates polynomial `p` at `x` under ring homomorphism `f : R →+* S`. Generalizes `eval` (which is `eval₂ C x`). |
| `coeff` | `coeff p n : R` | Returns the coefficient of `Xⁿ` in polynomial `p`. |
| `map` | `p.map f : S[X]` | Pushforward of polynomial along ring homomorphism `f : R →+* S`. |
| `eval` | `p.eval x : R` | Special case of `eval₂` with `f = C : R →+* R[X]`. |
| `coeff_zero_eq_eval_zero` | `coeff p 0 = p.eval 0` | Connects constant term with evaluation at 0. |
| `eval₂_at_zero` | `p.eval₂ f 0 = f (coeff p 0)` | Evaluates `eval₂` at 0 yields image of constant term under `f`. |
| `eval₂_C_X` | `eval₂ C X p = p` | Identity: evaluating polynomial at `X` via canonical map recovers `p`. |
| `coeff_map` | `coeff (p.map f) n = f (coeff p n)` | Coefficients commute with `map`. |
| `map_injective` / `map_surjective` | Injective/surjective `f` ⇒ same for `map f` | Preservation of injectivity/surjectivity under polynomial mapping. |
| `map_eq_zero_iff` | `p.map f = 0 ↔ p = 0` (if `f` injective) | Kernel triviality of `map f`. |
| `IsRoot.map` | `IsRoot p x ⇒ IsRoot (p.map f) (f x)` | Roots map forward under ring homomorphisms. |
| `IsRoot.of_map` | `IsRoot (p.map f) (f x)` & `f` injective ⇒ `IsRoot p x` | Roots lift backward under injective `f`. |
| `isRoot_map_iff` | Equivalence of root preservation under injective `f`. | Full characterization of root behavior under injective base change. |
| `eval₂_hom` | `g (p.eval₂ f x) = p.eval₂ (g ∘ f) (g x)` | Naturality of `eval₂` w.r.t. composition of ring homomorphisms. |
| `evalRingHom_zero` | `evalRingHom 0 = constantCoeff` | Evaluation at 0 equals constant coefficient map. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eval₂_`: properties of generalized evaluation (`eval₂`).
  - `eval_`: properties of standard evaluation (`eval`).
  - `coeff_`: coefficient-related lemmas.
  - `map_`: behavior of `map` (e.g., `map_injective`, `coeff_map`).
  - `isRoot_`: root-related properties under mapping.

- **Suffixes**:
  - `_eq_`: equality lemmas (e.g., `coeff_zero_eq_eval_zero`).
  - `_iff`: biconditional characterizations (e.g., `isRoot_map_iff`).
  - `_subset` / `_of_injective`: set-theoretic or injective refinement lemmas.

- **Functional style**:
  - `map_map`, `map_id`, `mapRingHom_id`, `mapRingHom_comp`: compositionality of `map`/`mapRingHom`.
  - `hom_eval₂`: homomorphism interaction with `eval₂`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` | Simplification using `@[simp]` lemmas (e.g., `eval₂_at_zero`, `coeff_map`). |
| `rw` | Rewriting using equalities (especially `eval_eq_sum`, `coeff_sum`, `map_sum`). |
| `induction ... using Polynomial.induction_on'` | Structural induction on polynomials (basis: monomials; step: additivity). |
| `ext` | Extensionality for polynomials or functions (e.g., `Polynomial.ext`, `DFunLike.ext`). |
| `conv_rhs => rw [...]` | Right-hand side rewriting in congruence contexts. |
| `split_ifs` | Case analysis on `if-then-else` expressions (common in `sum_ite_eq'`-style simplifications). |
| `simp only [...]` | Targeted simplification with explicit lemmas. |
| `ring` / `ring1` | Implicitly used via `simp` for commutative semiring arithmetic. |
| `contrapose!` | Logical transformation for injectivity/surjectivity arguments. |
| `exact`, `refine`, `apply` | Proof construction with lemmas like `Finset.sum_eq_single`. |

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs use `Polynomial.induction_on'`, reducing to:
  - **Base case**: Monomials (`monomial n r`), handled via explicit coefficient/evaluation formulas.
  - **Inductive step**: Additivity (`p + q`), using linearity of `eval`, `coeff`, `map`.

- **Coefficient-centric reasoning**:
  - Many proofs reduce to equality of coefficients (via `Polynomial.ext` or `coeff_ext`).
  - Use of `coeff_sum`, `coeff_C_mul_X_pow`, `sum_ite_eq'`, and `mem_support_iff`.

- **Naturality & functoriality**:
  - Lemmas like `map_map`, `eval₂_map`, `hom_eval₂` express functorial behavior of `map` and `eval₂`.
  - Proofs often chain `eval₂_eq_eval_map`, `eval_map`, and ring homomorphism properties.

- **Injectivity/surjectivity arguments**:
  - Leverage `hf.ne_iff`, `hf.injective_iff_map_eq_zero'`, and `coeff_map` to lift properties from base to polynomial ring.

- **Root analysis**:
  - `IsRoot` defined as `p.eval x = 0`; proofs use `eval_map`, `eval₂_hom`, and injectivity to transfer root status.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Polynomial.Coeff`: Coefficient definitions and basic properties.
- `Mathlib.Algebra.Polynomial.Eval.Defs`: Definitions of `eval`, `eval₂`, `map`, and `constantCoeff`.

**Domain scope**:
- **Algebraic structures**: Semirings, rings, commutative semirings/rings.
- **Polynomial ring theory**: Support, coefficients, evaluation, roots, mapping along ring homomorphisms.
- **Finite products**: `piEquiv` connects `∀ i, R i)[X]` with `∀ i, (R i)[X]`.

**Key algebraic concepts**:
- Ring homomorphisms (`→+*`)
- Monomial and polynomial expansion (`X_pow`, `C_mul_X_pow`)
- Support and finite sums (`Finset`, `AddMonoidAlgebra`)
- Roots (`IsRoot`)

---

This metadata captures the formal structure, proof methodology, and design principles of the `Polynomial` evaluation/coefficient interaction module in Mathlib — essential for building domain-specific reasoning agents in algebraic domains.