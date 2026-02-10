### Technical Brief: Taylor Expansions of Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `taylor r f` | `R[X] →ₗ[R] R[X]` | Taylor expansion of polynomial `f` at point `r`: `f(X + r)` |
| `taylorAlgHom r` | `R[X] →ₐ[R] R[X]` | Taylor expansion as an algebra homomorphism (for commutative semirings) |
| `taylor_coeff n` | `(taylor r f).coeff n = (hasseDeriv n f).eval r` | Relates coefficients of Taylor expansion to Hasse derivatives evaluated at `r` |
| `taylor_zero'` | `taylor 0 = LinearMap.id` | Identity property at zero shift |
| `taylor_mul` | `taylor r (p * q) = taylor r p * taylor r q` | Multiplicativity of Taylor expansion (commutative case) |
| `taylor_taylor` | `taylor r (taylor s f) = taylor (r + s) f` | Semigroup law for Taylor shifts |
| `taylor_eval` | `(taylor r f).eval s = f.eval (s + r)` | Evaluation of Taylor expansion corresponds to shift in argument |
| `taylor_injective` | `Function.Injective (taylor r)` | Injectivity of Taylor shift (over rings) |
| `eq_zero_of_hasseDeriv_eq_zero` | `(∀ k, (hasseDeriv k f).eval r = 0) → f = 0` | Identity principle: vanishing Hasse derivatives at a point imply zero polynomial |
| `sum_taylor_eq` | `∑ i, (taylor r f).coeff i • (X - r)^i = f` | Taylor’s formula: reconstruction of `f` from its Taylor expansion at `r` |
| `eval_add_of_sq_eq_zero` | `y² = 0 ⇒ p(x + y) = p(x) + p'(x)·y` | First-order Taylor approximation in nilpotent extensions |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `taylor_`: all definitions and lemmas related to Taylor expansion.
  - `hasseDeriv_`: related to Hasse derivatives (e.g., `hasseDeriv_zero`, `hasseDeriv_one`).
- **Suffixes**:
  - `_apply`: definition of application (e.g., `taylor_apply`).
  - `_coeff`: coefficient-level properties (e.g., `taylor_coeff`, `taylor_coeff_zero`).
  - `_eval`: interaction with evaluation map (e.g., `taylor_eval`, `taylor_eval_sub`).
  - `_injective`, `_zero`, `_one`: structural properties (e.g., `taylor_injective`, `taylor_zero`, `taylor_one`).
- **Special**:
  - `taylorAlgHom`: uses `simps!` to generate clean projections for algebra homomorphism.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Heavy use of `simp` with explicit lemmas (especially for `coeff`, `eval`, `comp`, `hasseDeriv`, `taylor`). |
| `rw [...]` | Rewriting using definitions and lemmas like `taylor_apply`, `eval_comp`, `hasseDeriv_zero`. |
| `ext` | Extensionality for functions/linear maps/algebra homomorphisms. |
| `congr 1` | Congruence to reduce to proving equality of function bodies. |
| `nontriviality R` | To handle trivial ring cases (e.g., in `natDegree_taylor`). |
| `split_ifs` / `push_neg` | Handling conditional expressions and negated inequalities. |
| `simp only [coeff_X_pow, Finset.sum_ite_eq]` | For coefficient computations involving monomials and finite sums. |
| `apply_fun` + `simpa` | Injectivity arguments (e.g., `taylor_injective`). |
| `ring` / `abel` | Implicitly used via `simp` for commutative semiring/ring simplifications. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Computational lemmas** (`taylor_coeff`, `taylor_eval`, `eval_add_of_sq_eq_zero`):  
    Expand definitions (`taylor_apply`, `eval_comp`, `hasseDeriv_monomial`, etc.), reduce to sums over monomials, and simplify using known identities (e.g., binomial expansion, `commute_X`, `coeff_mul_C`).
  - **Structural lemmas** (`taylor_mul`, `taylor_taylor`, `taylor_injective`):  
    Use `ext`, `congr`, or `apply_fun` + injectivity of `taylor (-r)`; often rely on `taylor_eval` or `taylor_taylor`.
  - **Identity principle** (`eq_zero_of_hasseDeriv_eq_zero`):  
    Show Taylor expansion is zero by showing all coefficients vanish (via `taylor_coeff`), then apply injectivity of `taylor r`.
  - **Taylor’s formula** (`sum_taylor_eq`):  
    Re-express `f` as composition with `X - r`, then use `taylor_taylor` and `taylor_zero`.

- **Induction**: Not explicitly used here—proofs are mostly computational and rely on structural properties of polynomial operations.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.AlgebraMap`: for `C`, `AlgHom`, and algebra maps.
- `Mathlib.Algebra.Polynomial.Degree.Lemmas`: for `natDegree`, `natDegree_pow_X_add_C`, etc.
- `Mathlib.Algebra.Polynomial.Eval.SMul`: for `eval`, `eval_comp`, `eval_C`, `eval_X`.
- `Mathlib.Algebra.Polynomial.HasseDeriv`: for `hasseDeriv`, `hasseDeriv_zero`, `hasseDeriv_one`, `hasseDeriv_monomial`.

**Domain**:  
Commutative semirings (`CommSemiring`) and rings (`CommRing`), with semirings (`Semiring`) for basic linear map definitions.

**Scope**:  
Focuses on *formalizing Taylor expansions* of univariate polynomials over arbitrary semirings/rings, emphasizing:
- Coefficient-wise characterization via Hasse derivatives,
- Functional properties (injectivity, multiplicativity, composition law),
- Applications (identity principle, Taylor’s formula, nilpotent perturbations).

--- 

Let me know if you'd like a diagram of dependencies or a summary of how this module integrates with other parts of Mathlib (e.g., formal calculus, differential graded structures, or p-adic analysis).