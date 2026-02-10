### Technical Metadata Brief: Incidence Algebras in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IncidenceAlgebra 𝕜 α` | `Type*` (structure) | Type of functions `α → α → 𝕜` vanishing off comparable pairs (`a ≤ b`). |
| `instFunLike` | `FunLike (IncidenceAlgebra 𝕜 α) α (α → 𝕜)` | Enables coercion `f : IncidenceAlgebra → α → α → 𝕜`. |
| `one : IncidenceAlgebra 𝕜 α` | `δ_{a,b} = if a = b then 1 else 0` | Identity element (delta function), like identity matrix. |
| `mul : IncidenceAlgebra → IncidenceAlgebra → IncidenceAlgebra` | `(f * g) a b = ∑_{x ∈ [a,b]} f a x * g x b` | Convolution multiplication (like matrix multiplication). |
| `zeta : IncidenceAlgebra 𝕜 α` | `ζ(a,b) = if a ≤ b then 1 else 0` | Zeta function: constant 1 on intervals; convolution sums over intervals. |
| `mu : IncidenceAlgebra 𝕜 α` | `μ(a,b) = if a = b then 1 else -∑_{x ∈ (a,b)} μ(a,x)` | Möbius function: left inverse of `zeta`, defined recursively. |
| `mu_mul_zeta` | `μ * ζ = 1` | Core property: Möbius function is a left inverse of zeta. |
| `zeta_mul_mu` | `ζ * μ = 1` | Proven later: `μ` is also a right inverse (via `mu'`). |
| `moebius_inversion_top` | `g x = ∑_{y ≥ x} f y ⇒ f x = ∑_{y ≥ x} μ(x,y) g y` | General Möbius inversion over upper sets (with top). |
| `moebius_inversion_bot` | `g x = ∑_{y ≤ x} f y ⇒ f x = ∑_{y ≤ x} μ(y,x) g y` | Dual inversion over lower sets (with bottom). |
| `mu_prod_mu` | `μ_{α×β} = μ_α ⊗ μ_β` | Möbius function on product poset factors. |
| `zeta_prod_zeta` | `ζ_{α×β} = ζ_α ⊗ ζ_β` | Zeta function on product poset factors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mu`, `zeta`, `lambda`: Named after standard incidence algebra functions.
  - `coe_`, `mk_`, `apply_`: Coercion/constructor/evaluation lemmas.
  - `inst_`: Instance declarations (`instZero`, `instMul`, etc.).
  - `prod_`, `smul_`, `mul_`, `add_`: Structure operations.
- **Suffixes**:
  - `_apply`: Lemmas about action on points (`f a b`).
  - `_self`, `_of_le`, `_of_ne`: Special cases (diagonal, comparable, incomparable).
  - `_left`, `_right`: For left/right inverse properties (`mu_mul_zeta`, `zeta_mul_mu'`).
  - `_top`, `_bot`: For inversion theorems assuming top/bottom elements.
  - `'_` (prime): Alternate constructions (`mu'` = right inverse version of `mu`).
- **`ite_`, `if_pos`, `if_neg`**: Used heavily for `if-then-else` simplifications.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `ext` | Extensionality for functions/structures. |
| `simp` / `simp_rw` | Simplification using `@[simp]` lemmas (e.g., `mul_apply`, `zeta_apply`). |
| `aesop` | Automated reasoning for order/inequality goals (especially in `mul_assoc`, `smul_assoc`). |
| `congr!` / `congr` | Congruence for function equality; often with `with x hx` to refine. |
| `sum_congr`, `sum_eq_zero`, `sum_add_distrib`, `sum_sigma'` | Manipulating finite sums over intervals (`Icc`, `Ico`, `Ioc`). |
| `rw [mem_Icc]`, `rw [Icc_eq_empty]`, `Icc_ssubset_Icc_*` | Interval membership and subset reasoning. |
| `card_lt_card`, `Icc_ssubset_*` | Termination proofs for recursive definitions (`muFun`, `muFun'`). |
| `left_inv_eq_right_inv` | Key lemma to prove `μ` is two-sided inverse (via `mu'`). |
| `ring`, `linarith` | For algebraic simplifications (less frequent due to `simp`-heavy style). |

---

#### **4. Proof Logic**

- **Recursive definitions** (`muFun`, `muFun'`) use `termination_by` with cardinality of intervals (`(Icc a b).card`), leveraging `card_lt_card` for well-foundedness.
- **Inverse proofs** (`mu_mul_zeta`, `zeta_mul_mu'`) reduce to interval sum identities:
  - `sum_Icc_mu_right`: `∑_{x ∈ [a,b]} μ(a,x) = δ_{a=b}`
  - `sum_Icc_mu'_left`: `∑_{x ∈ [a,b]} μ'(x,b) = δ_{a=b}`
- **Equality of `mu` and `mu'`** uses `left_inv_eq_right_inv` on `μ * ζ = 1` and `ζ * μ' = 1`.
- **Möbius inversion**:
  - Expands `g = ζ * f` (pointwise), then rewrites using associativity and `μ * ζ = 1`.
  - Uses `sum_sigma'` and bijection `(x,y) ↦ (y,x)` to swap summation order.
- **Product poset lemmas**:
  - Factorization of `zeta`, `mu`, and multiplication via `prod` construction.
  - `mu_prod_mu` uses `left_inv_eq_right_inv` again, relying on `zeta_prod_zeta` and `prod_mul_prod`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Algebra.Defs` — Base algebraic structures.
- `Mathlib.Algebra.BigOperators.Intervals` — Interval notation (`Icc`, `Ico`, `Ioc`) and sum lemmas.
- `Mathlib.Algebra.BigOperators.Ring` — Summation over rings/monoids.
- `Mathlib.Algebra.Module.BigOperators` — Module-valued sums.
- `Mathlib.Algebra.Module.Pi` — Product/module structures.

**Key Typeclass Constraints**:
- `[Zero 𝕜]`, `[One 𝕜]`, `[AddCommMonoid 𝕜]`, `[AddCommGroup 𝕜]`, `[Ring 𝕜]`, `[Semiring 𝕜]`
- `[LE α]`, `[Preorder α]`, `[PartialOrder α]`, `[LocallyFiniteOrder α]`, `[DecidableEq α]`, `[DecidableRel (≤)]`
- `[OrderTop α]`, `[OrderBot α]` for inversion theorems.

**Scope**:  
This module formalizes incidence algebras over *locally finite posets*, with full algebraic structure (ring, module, algebra), and proves foundational results: Möbius inversion, product behavior, and duality via order duals.

--- 

Let me know if you'd like a diagram of the hierarchy or a summary of the `mu`/`mu'` construction logic.