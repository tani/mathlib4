### Technical Brief: Rearrangement Inequality in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MonovaryOn f g s` | `ι → α → ι → β → Finset ι → Prop` | `f` and `g` *monovary together* on `s`: for all `x, y ∈ s`, `(x ≤ y) → (f x ≤ f y → g x ≤ g y)` (i.e., same monotonic direction). |
| `AntivaryOn f g s` | `ι → α → ι → β → Finset ι → Prop` | `f` and `g` *antivary together* on `s`: `(x ≤ y) → (f x ≤ f y → g y ≤ g x)` (opposite monotonic direction). |
| `Monovary f g` | `ι → α → ι → β → Prop` | Global version of `MonovaryOn` over the entire domain (`s = univ`). |
| `Antivary f g` | `ι → α → ι → β → Prop` | Global version of `AntivaryOn`. |
| `sum_smul_comp_perm_le_sum_smul` | `MonovaryOn f g s → {x | σ x ≠ x} ⊆ s → ∑ i ∈ s, f i • g (σ i) ≤ ∑ i ∈ s, f i • g i` | **Weak inequality**: scalar-multiplication sum is maximized when `g ∘ σ` monovaries with `f`. |
| `sum_smul_le_sum_smul_comp_perm` | `AntivaryOn f g s → {x | σ x ≠ x} ⊆ s → ∑ i ∈ s, f i • g i ≤ ∑ i ∈ s, f i • g (σ i)` | **Weak inequality** for antivarying case (minimization). |
| `sum_smul_comp_perm_eq_sum_smul_iff` | `MonovaryOn f g s → {x | σ x ≠ x} ⊆ s → (∑ f i • g (σ i) = ∑ f i • g i) ↔ MonovaryOn f (g ∘ σ) s` | **Equality case**: equality holds iff `g ∘ σ` still monovaries with `f`. |
| `sum_smul_comp_perm_lt_sum_smul_iff` | `MonovaryOn f g s → {x | σ x ≠ x} ⊆ s → (∑ f i • g (σ i) < ∑ f i • g i) ↔ ¬MonovaryOn f (g ∘ σ) s` | **Strict inequality case**: strict decrease iff monovariance is broken. |
| `sum_mul_comp_perm_le_sum_mul` | `MonovaryOn f g s → {x | σ x ≠ x} ⊆ s → ∑ f i * g (σ i) ≤ ∑ f i * g i` | Multiplication version of weak inequality (special case of scalar multiplication). |

> **Note**: All theorems have dual versions for permuting `f` instead of `g`, and for antivarying cases.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `MonovaryOn` / `AntivaryOn`: relational properties on a set.
  - `Monovary` / `Antivary`: global relational properties.
  - `sum_..._le_sum_...`: weak inequality (≤).
  - `sum_..._eq_sum_..._iff`: equality characterization.
  - `sum_..._lt_sum_..._iff`: strict inequality (<).
- **Suffixes**:
  - `_comp_perm`: permutation applied to second function (`g ∘ σ`).
  - `_perm_comp`: permutation applied to first function (`f ∘ σ`).
  - `_smul`: scalar multiplication version.
  - `_mul`: multiplication version (when `β = α` and `• = *`).
- **Helper patterns**:
  - `dual_right`: uses order duality to derive antivarying versions from monovarying ones.
  - `toLex`, `Prod.Lex.le_iff`: used in induction on lexicographic order of `(g i, f i)`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `induction_on_max_value`: induction on maximum value of `toLex (g i, f i)` over `s`.
  - `rw`, `simp_rw`, `simp only`: heavy use of rewriting and simplification, especially with `Finset.sum_congr`, `sum_erase`, `swap`, `Equiv` actions.
  - `convert`: for equational reasoning with flexible unification.
  - `apply ... using n`: to control which premise is applied.
  - `push_neg`, `not_imp_not`: for negation handling in equality/strictness equivalences.
  - `cases' ... with ...`: destruct lexicographic order hypotheses.
  - `set_support_*`: lemmas about support of permutations (e.g., `set_support_inv_eq`, `set_support_mul_subset`).
  - `abel`: used implicitly via `PosSMulStrictMono`/`PosSMulMono` assumptions (abelian group/ring reasoning).
  - `aesop`: likely used in background (not explicit here, but standard in Mathlib).

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs proceed by **induction on the maximum lexicographic value** of `(g i, f i)` over the finite set `s`.
  - Base case: empty set (trivial).
  - Inductive step: pick `a ∈ s` with max `(g a, f a)` (lex), define a transposition `τ = σ ∘ swap(a, σ a)`, reduce to smaller set `s \ {a}`.
- **Key ideas**:
  - Use of **transposition decomposition** of permutations: any permutation differs from identity by swaps.
  - **Monovariance preservation under swaps** is central: if `f, g` monovary, swapping `g`-values out of order strictly increases the sum.
  - Equality case: equality iff no such "bad" swap exists → `g ∘ σ` still monovaries.
  - Strictness: strict inequality iff monovariance is violated.
- **Duality**:
  - Antivarying cases derived via `order_dual` (`dual_right`, `toDual`).
- **Generalization**:
  - Scalar multiplication (`•`) instead of multiplication (`*`) allows `f : ι → α`, `g : ι → β`, with `α` acting on `β`.
  - Enables dual statements (e.g., swapping roles of `f` and `g`) trivially.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Group.Finset` | Summation over finite sets, `Finset.sum`, properties. |
| `Mathlib.Algebra.Order.Module.OrderedSMul` | Ordered module structure: `PosSMulMono`, `PosSMulStrictMono`. |
| `Mathlib.Algebra.Order.Module.Synonym` | Type synonyms and conversions (e.g., for duals). |
| `Mathlib.Data.Prod.Lex` | Lexicographic order on `α × β`, used for induction. |
| `Mathlib.Data.Set.Image` | Set image under functions, used in permutation reasoning. |
| `Mathlib.Data.Finset.Max` | Max element in finite sets, used in induction. |
| `Mathlib.GroupTheory.Perm.Support` | Permutation support (`{x | σ x ≠ x}`), transpositions, `swap`. |
| `Mathlib.Order.Monotone.Monovary` | Core theory of `MonovaryOn`, `AntivaryOn`, `Monotone`, `Antitone`. |
| `Mathlib.Tactic.Abel` | Abelian group/ring reasoning (e.g., for additive manipulations). |

---

### Summary

This file formalizes the **rearrangement inequality** in full generality using:
- **Scalar multiplication** over ordered modules (not just multiplication in a ring),
- **Monovariance/antivariance** as the key structural condition,
- **Inductive proofs** over finite sets via lexicographic max-value induction,
- **Duality** to unify monotone/antitone cases.

It provides:
- Weak inequality (max/min),
- Equality characterization (iff monovariance preserved),
- Strict inequality (iff monovariance broken).

The implementation is highly modular, leveraging Mathlib’s rich order-theoretic and algebraic infrastructure.