### Technical Metadata Brief: Continuous Functional Calculus in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ContinuousFunctionalCalculus R p` | `Class` | Bundles existence of a *closed-embedding* star algebra homomorphism `C(spectrum R a, R) →⋆ₐ[R] A` for all `a` satisfying predicate `p`, satisfying spectral mapping and preservation of `p`. |
| `cfcHom ha` | `C(spectrum R a, R) →⋆ₐ[R] A` | The *bundled* star algebra homomorphism for `a` with `ha : p a`. Used internally; not for direct user use. |
| `cfc f a` | `A` | *Unbundled* functional calculus: returns `cfcHom ha ⟨f, hf⟩` if `p a ∧ ContinuousOn f (spectrum R a)`, else `0`. Primary API for users. |
| `cfcL ha` | `C(spectrum R a, R) →L[R] A` | `cfcHom` viewed as a continuous linear map (bundled). |
| `UniqueContinuousFunctionalCalculus R A` | `Class` | Ensures uniqueness of the functional calculus: any two continuous star algebra homomorphisms mapping `id` to `a` are equal. Enables proofs like `cfc_comp`. |
| `cfcHom_id` | `cfcHom ha (id.restrict _) = a` | The functional calculus sends the identity function to `a`. |
| `cfcHom_map_spectrum` | `spectrum R (cfcHom ha f) = range f` | **Spectral mapping theorem** for `cfcHom`. |
| `cfc_map_spectrum` | `spectrum R (cfc f a) = f '' spectrum R a` | Spectral mapping theorem for `cfc`. |
| `cfc_comp` | `cfc (g ∘ f) a = cfc g (cfc f a)` | **Composition property** — core feature enabling functional calculus power. |
| `cfc_polynomial` | `cfc q.eval a = aeval a q` | Extends polynomial functional calculus (`aeval`) to continuous functional calculus. |
| `cfc_predicate` | `p (cfc f a)` | Predicate `p` is preserved under `cfc`. |
| `cfc_congr` / `eqOn_of_cfc_eq_cfc` | `cfc f a = cfc g a ↔ EqOn f g on spectrum R a` | Functional calculus respects equality on the spectrum. |

---

#### **2. Naming Conventions**

- **Predicate prefix `is_` / `0 ≤` / `IsStarNormal` / `IsSelfAdjoint`**  
  Used for the predicate `p` in `ContinuousFunctionalCalculus R p`.  
  Examples: `IsStarNormal`, `IsSelfAdjoint`, `0 ≤ ·`.

- **`cfc`** — *continuous functional calculus*  
  Core function: `cfc : (R → R) → A → A`.

- **`cfcHom`** — *bundled homomorphism*  
  Used when `p a` is given explicitly.

- **`cfcL`** — *continuous linear map version*  
  Bundled as `→L[R]`.

- **`cfc_` prefix for lemmas**  
  E.g., `cfc_add`, `cfc_mul`, `cfc_star`, `cfc_pow`, `cfc_const`, `cfc_zero`, `cfc_one`.

- **`cfcHom_` prefix for homomorphism lemmas**  
  E.g., `cfcHom_id`, `cfcHom_predicate`, `cfcHom_map_spectrum`.

- **`eqOn`, `EqOn`**  
  Used for equality on a subset (here: spectrum).

- **`restrict` / `.restrict`**  
  Restriction of functions to spectrum.

- **`extend` / `Function.extend`**  
  Tietze-style extension of functions from spectrum to full space.

- **`map_`, `commutes`, `commute`**  
  Standard algebra homomorphism properties.

---

#### **3. Tactic Stack**

| Tactic | Role |
|--------|------|
| `cfc_tac` | Auto-generates `ha : p a` (e.g., `IsStarNormal a`, `IsSelfAdjoint a`, `0 ≤ a`). |
| `cfc_cont_tac` | Auto-generates `ContinuousOn f (spectrum R a)`. |
| `fun_prop` | Wrapper for `fun_prop` tactic (used in `@[fun_prop]` lemmas for continuity goals). |
| `aesop`, `simp`, `rw`, `congr`, `ext` | Standard proof automation and simplification. |
| `induction ... using Polynomial.induction_on` | For polynomial lemmas (`cfc_map_polynomial`, `cfc_polynomial`). |
| `by_cases`, `obtain`, `rw [not_and_or]` | Case analysis on `p a ∧ ContinuousOn f (spectrum R a)`. |
| `simp only [cfc_apply, cfc_def]` | Core simplification for `cfc`. |

---

#### **4. Proof Logic & Strategy**

- **Case split on `p a ∧ ContinuousOn f (spectrum R a)`**  
  Almost every `cfc` lemma starts with `by_cases h : p a ∧ ContinuousOn f (spectrum R a)`, then:
  - *If true*: reduce to `cfcHom` and use algebra homomorphism properties (`map_add`, `map_mul`, `map_star`, etc.).
  - *If false*: simplify using `cfc_apply_of_not_predicate` / `cfc_apply_of_not_continuousOn`.

- **Induction on polynomials**  
  For `cfc_polynomial` and `cfc_map_polynomial`, use `Polynomial.induction_on` (base: constants, step: sums, monomials).

- **Uniqueness via `UniqueContinuousFunctionalCalculus`**  
  To prove `cfcHom ha = φ`, show both are continuous, map `id.restrict` to `a`, then apply `UniqueContinuousFunctionalCalculus.eq_of_continuous_of_map_id`.

- **Composition property (`cfc_comp`)**  
  Proven by:
  1. Defining `φ := cfcHom ha ∘ compStarAlgHom' f'`.
  2. Showing `φ` and `cfcHom (cfcHom_predicate ha f)` both map `id.restrict` to `cfcHom ha f`.
  3. Applying uniqueness.

- **Spectral mapping**  
  Directly from `cfcHom_map_spectrum` and definition of `cfc`.

- **Predicate preservation**  
  Proven by `cfc_cases` + `cfcHom_predicate`.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Algebra.Quasispectrum` | Spectrum definitions (quasispectrum, spectrum). |
| `Mathlib.Algebra.Algebra.Spectrum` | Spectrum theory (compactness, nonempty, etc.). |
| `Mathlib.Algebra.Order.Star.Basic` | Star-ordered structures (e.g., `IsSelfAdjoint`, `0 ≤ a`). |
| `Mathlib.Topology.Algebra.Polynomial` | Polynomial evaluation and continuity. |
| `Mathlib.Topology.ContinuousMap.Star` | Star structure on `C(X, R)`. |
| `Mathlib.Tactic.ContinuousFunctionalCalculus` | Tactics (`cfc_tac`, `cfc_cont_tac`). |
| `Mathlib.Topology.ContinuousMap.Ordered` | Ordered structure on `C(X, ℝ)`, needed for lattice operations (e.g., `·⁺`, `·⁻`). |

**Scope**:  
- `scoped[ContinuousFunctionalCalculus]` for `compactSpace_spectrum` instance.  
- Designed for **non-C\*-algebraic** settings (e.g., `Matrix n n ℝ`, where norm/C\*-structure is absent).  
- Separate calculi for `ℝ≥0`, `ℝ`, `ℂ` to support natural function algebras (e.g., `NNReal.sqrt`, `·⁺`, `·⁻`).

---

### Summary

This module provides a **highly abstract, flexible, and user-friendly** continuous functional calculus API, optimized for **practical formalization** in Lean 4. It avoids over-constraining the ambient algebra (e.g., no C\*-algebra assumption), supports multiple scalars (`ℝ≥0`, `ℝ`, `ℂ`), and uses an **unbundled `cfc`** to maximize usability and rewriteability. The design prioritizes the **composition property**, **spectral mapping**, and **predicate preservation**, with automation (`cfc_tac`, `cfc_cont_tac`) reducing proof burden.