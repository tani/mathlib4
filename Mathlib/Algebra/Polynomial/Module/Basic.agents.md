### Technical Metadata Brief: `PolynomialModule` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PolynomialModule R M` | `Type*` (alias `ℕ →₀ M`) | Represents the `R[X]`-module of polynomials with coefficients in an `R`-module `M`. |
| `single i m` | `M →+ PolynomialModule R M` | Monomial embedding: `m * X^i`. Additive group homomorphism. |
| `lsingle i m` | `M →ₗ[R] PolynomialModule R M` | Linear version of `single`. |
| `polynomialModule` | `Module R[X] (PolynomialModule R M)` | Defines the `R[X]`-module structure on `PolynomialModule R M`. |
| `smul_def` | `f • m = aeval (lmapDomain M R succ) f m` | Explicit definition of scalar multiplication via `aeval`. |
| `monomial_smul_single` | `monomial i r • single j m = single (i + j) (r • m)` | Action of monomials on singletons. |
| `monomial_smul_apply` | `(monomial i r • g) n = if i ≤ n then r • g (n - i) else 0` | Coefficient-wise action of monomials. |
| `smul_single_apply` | `(f • single i m) n = if i ≤ n then f.coeff (n - i) • m else 0` | General scalar multiplication on singletons. |
| `smul_apply` | `(f • g) n = ∑_{(i,j) ∈ antidiagonal n} f.coeff i • g j` | Convolution-style coefficient formula for scalar multiplication. |
| `equivPolynomialSelf` | `PolynomialModule R R ≃ₗ[R[X]] R[X]` | Isomorphism between `R[X]` as a module over itself and `PolynomialModule R R`. |
| `equivPolynomial` | `PolynomialModule R S ≃ₗ[R] S[X]` | Isomorphism between `PolynomialModule R S` and `S[X]` as `R`-modules (when `S` is an `R`-algebra). |
| `map f` | `M →ₗ[R] M' ⇒ PolynomialModule R M →ₗ[R] PolynomialModule R' M'` | Induced map on polynomial modules via `Finsupp.mapRange`. |
| `eval r` | `PolynomialModule R M →ₗ[R] M` | Evaluation at `r ∈ R`: `∑ r^i • m_i`. |
| `comp p` | `PolynomialModule R M →ₗ[R] PolynomialModule R M` | Composition operator: `q ↦ q(p(x))`. |
| `comp_single` | `comp p (single i m) = p^i • single 0 m` | Composition on monomials. |
| `comp_eval` | `eval r (comp p q) = eval (p.eval r) q` | Compatibility of composition and evaluation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `single_`, `lsingle_`: for monomial embeddings.
  - `eval_`, `comp_`, `map_`: for operations (evaluation, composition, mapping).
  - `smul_`, `monomial_smul_`: for scalar multiplication behavior.
  - `equivPolynomial_`: for isomorphisms involving polynomial rings/modules.

- **Suffixes**:
  - `_apply`: for lemmas about application to arguments (e.g., `single_apply`, `eval_apply`).
  - `_def`: for definitions (e.g., `smul_def`, `comp_def`).
  - `_self`: for self-referential constructions (e.g., `equivPolynomialSelf`).
  - `_linear`: for linear maps (e.g., `induction_linear`, `lsingle`).

- **Module/Algebra-related**:
  - `isScalarTower`, `algebraMap`, `IsScalarTower`: used to manage compatibility of module structures.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction_linear` | Structural induction on `PolynomialModule` (via `Finsupp.induction_linear`). |
| `induction' ... using Polynomial.induction_on'` | Polynomial induction (monomials + sums). |
| `simp only [...]` | Simplification with specific lemmas (e.g., `single_apply`, `eval_single`). |
| `split_ifs` | Handling `ite` expressions. |
| `congr 2`, `congr'` | Congruence for equality of functions/expressions. |
| `rw [...]` | Rewriting using lemmas (especially `smul_apply`, `coeff_mul`, etc.). |
| `module` | Custom tactic for module-theoretic simplifications (e.g., `smul_comm`, `smul_zero`). |
| `omega` | For arithmetic reasoning (e.g., inequalities like `i ≤ n`). |
| `ext` | Extensionality for functions/finsets. |
| `aesop` | Not explicitly used here, but `module` and `omega` cover most automation needs. |

---

#### **4. Proof Logic**

- **Inductive Structure**: Proofs over `PolynomialModule R M` typically use:
  - `induction_linear` (for `Finsupp`-based induction: zero, add, single).
  - `Polynomial.induction_on'` (for `R[X]`-side: zero, add, monomial).
- **Structure of Key Proofs**:
  - **Scalar multiplication lemmas**: Prove for monomials, then extend via induction on `f ∈ R[X]` and `g ∈ PolynomialModule R M`.
  - **Evaluation lemmas**: Use `induction_linear` on `q`, reduce to `single` case, then apply `eval_single`.
  - **Composition lemmas**: Combine `comp_apply`, `map_single`, `eval_single`, and `eval_smul`.
- **Module Compatibility**: Proofs often verify `IsScalarTower` or `smul_assoc` conditions using algebra maps and `aeval`.

---

#### **5. Imports**

- **Core**:
  ```lean
  import Mathlib.Algebra.Polynomial.Module.AEval
  ```
  - Provides `Module.AEval'`, used to define the `R[X]`-module structure on `PolynomialModule R M`.

- **Implicit Dependencies** (via `Mathlib.Algebra.Polynomial.Module.AEval` and `Finsupp`):
  - `Mathlib.Algebra.Polynomial.Basic`
  - `Mathlib.Algebra.Module.Finsupp`
  - `Mathlib.Algebra.Module.Algebra`
  - `Mathlib.Algebra.Module.IsScalarTower`
  - `Mathlib.Data.Finsupp.Basic`
  - `Mathlib.Data.Finsupp.Sum`
  - `Mathlib.Data.Finsupp.Module`

- **Key Concepts Leveraged**:
  - `Finsupp` (finitely supported functions) as the underlying representation.
  - `aeval` (evaluation of polynomials at module elements).
  - `IsScalarTower` for coherence of scalar actions.

---

### Summary

This file formalizes the **polynomial module** `M[X]` over an `R`-module `M`, using `ℕ →₀ M` as the underlying type. It defines scalar multiplication via `aeval`, proves key properties (e.g., convolution formula for `smul_apply`, monomial action), and constructs important isomorphisms (`equivPolynomial`, `equivPolynomialSelf`). The proofs rely heavily on `Finsupp` induction and polynomial induction, with heavy use of `simp`, `rw`, and `module` tactics. The design carefully manages multiple module structures (e.g., `R`, `R[X]`, `S`) using `IsScalarTower` to avoid diamonds.