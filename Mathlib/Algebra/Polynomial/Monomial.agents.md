### Technical Metadata Brief: Univariate Monomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `monomial_one_eq_iff` | `{i j : ℕ} → (monomial i 1 = monomial j 1) ↔ i = j` | Establishes injectivity of `monomial i 1` in `R[X]` under `Nontrivial R`. |
| `infinite` | `[Nontrivial R] → Infinite R[X]` | Proves polynomial ring over nontrivial semiring is infinite, via injective map `i ↦ monomial i 1`. |
| `card_support_le_one_iff_monomial` | `Finset.card f.support ≤ 1 ↔ ∃ n a, f = monomial n a` | Characterizes polynomials with support size ≤ 1 as exactly the monomials (including zero polynomial when `n` arbitrary, `a = 0`). |
| `ringHom_ext` | `(∀ a, f (C a) = g (C a)) → f X = g X → f = g` | Extensionality for ring homomorphisms out of `R[X]`: determined by action on constants (`C a`) and `X`. |
| `ringHom_ext'` | `f.comp C = g.comp C → f X = g X → f = g` | Equivalent formulation of `ringHom_ext`, using composition with `C`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `monomial_`: Relates to the `monomial` function (e.g., `monomial_one_eq_iff`, `card_support_le_one_iff_monomial`).
  - `ringHom_ext` / `ringHom_ext'`: Extensionality lemmas for ring homomorphisms.
- **Suffixes**:
  - `_eq_iff`: Used for biconditional characterizations involving equality (e.g., `monomial_one_eq_iff`, `card_support_le_one_iff_monomial`).
  - `'` (prime): Denotes alternate or refined versions (e.g., `ringHom_ext'` is a variant of `ringHom_ext`).
- **Structure**:
  - `card_support_le_one_iff_monomial`: Descriptive, combining `card`, `support`, `le_one`, `iff`, and `monomial`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp_rw`: Used for rewriting with simplification (e.g., `simp_rw [← ofFinsupp_single]`).
  - `ext`: Extensionality for function/structure equality.
  - `rw`: Rewriting using equalities/definitions.
  - `simp`: Simplification, especially for coefficients and support.
  - `exact`, `intro`, `rcases`, `refine`: Standard proof construction.
  - `by_cases`: Case analysis on decidable propositions (e.g., `i = n`).
  - `have`, `set`: Introduce intermediate facts/definitions.
  - `simpa`: Simplify and discharge goal using assumptions.

- **Domain-specific tactics**:
  - `ofFinsupp.injEq` (via `simp_rw`): Leverages injectivity in `AddMonoidAlgebra`.

---

#### **4. Proof Logic**

- **Structure**:
  - **Biconditional proofs** (`↔`) are handled via `constructor` → two subgoals.
  - **Existential elimination/introduction** via `rcases`/`refine ⟨…⟩`.
  - **Equality proofs** often reduce to coefficient comparison (`ext i`, then `simp`/`by_cases` on membership in support).
  - **Injectivity arguments** (e.g., for `infinite`) use `Infinite.of_injective` with a witness map and proof of injectivity.
  - **Ring homomorphism extensionality** uses:
    - Transport via `toFinsuppIso` to reduce to `AddMonoidAlgebra` (finsupp) setting.
    - Prove equality on the transformed maps (`f' = g'`), then lift back via composition.

- **Common pattern**:
  > *Decompose → reduce to coefficient-level reasoning → use support properties → reassemble.*

---

#### **5. Imports**

- **Primary dependency**:
  - `Mathlib.Algebra.Polynomial.Basic`: Core definitions and basic properties of univariate polynomials (`R[X]`), including:
    - `monomial`, `coeff`, `support`, `X`, `C` (constant polynomial),
    - `toFinsuppIso`, `ofFinsupp`, `AddMonoidAlgebra`.

- **Implicit dependencies** (via `Basic` and context):
  - `Mathlib.Algebra.Semiring.Basic`
  - `Mathlib.Data.Finsupp.Basic` (for `AddMonoidAlgebra`, `of_injective`, `injEq`)
  - `Mathlib.SetTheory.Cardinal.Infinite` (for `Infinite` typeclass)
  - `Mathlib.Data.Finset.Basic` (for `Finset.card`, `support`, `mem_singleton`)

---

### Summary

This module provides foundational lemmas for reasoning about **univariate monomials** and **ring homomorphisms** from `R[X]`. It emphasizes:
- Injectivity of monomials with unit coefficient,
- Structural characterization of low-support polynomials,
- Extensionality principles for ring maps out of `R[X]`.

The proofs rely heavily on the **finsupp representation** of polynomials and standard tactics for equality reasoning in algebraic structures.