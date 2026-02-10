### Technical Metadata Brief: Pigeonhole Principles in Lean 4 (`Mathlib.Algebra.Order.Pigeonhole`)

---

#### **1. Key Definitions & Theorems**

| Name | Type Signature (simplified) | Purpose |
|------|-----------------------------|---------|
| `exists_lt_sum_fiber_of_maps_to_of_nsmul_lt_sum` | `(∀ a ∈ s, f a ∈ t) → #t • b < ∑ x ∈ s, w x → ∃ y ∈ t, b < ∑ x ∈ s with f x = y, w x` | Strict inequality weight-based pigeonhole: if total weight > `n•b`, some fiber weight > `b`. |
| `exists_sum_fiber_lt_of_maps_to_of_sum_lt_nsmul` | `(∀ a ∈ s, f a ∈ t) → ∑ w < #t • b → ∃ y ∈ t, ∑ fiber < b` | Reverse strict inequality version (via `Mᵒᵈ`). |
| `exists_lt_sum_fiber_of_sum_fiber_nonpos_of_nsmul_lt_sum` | `(∀ y ∉ t, fiber_weight ≤ 0) → #t • b < total_weight → ∃ y ∈ t, b < fiber_weight` | Weighted version without `f(s) ⊆ t`, assuming nonpositive weight outside `t`. |
| `exists_le_sum_fiber_of_maps_to_of_nsmul_le_sum` | `(∀ a ∈ s, f a ∈ t) → t.Nonempty → #t • b ≤ total_weight → ∃ y ∈ t, b ≤ fiber_weight` | Non-strict inequality version (requires `t ≠ ∅`). |
| `exists_lt_card_fiber_of_mul_lt_card_of_maps_to` | `(∀ a ∈ s, f a ∈ t) → #t * n < #s → ∃ y ∈ t, n < fiber_card` | Head-count version: if `#t·n < #s`, some fiber has > `n` pigeons. |
| `exists_card_fiber_lt_of_card_lt_mul` | `#s < #t * n → ∃ y ∈ t, fiber_card < n` | Head-count version: if `#s < #t·n`, some fiber has < `n` pigeons (no `f(s) ⊆ t` needed). |
| `exists_lt_card_fiber_of_nsmul_lt_card` | `card β • b < card α → ∃ y, b < #{x | f x = y}` | Fintype version of head-count strict inequality. |
| `exists_lt_modEq_of_infinite` | `s.Infinite → 0 < k → ∃ m,n ∈ s, m < n ∧ m ≡ n [MOD k]` | Infinite pigeonhole for naturals modulo `k`. |

> **Note**: All theorems follow a naming convention encoding:
> - inequality direction (`lt`/`le`)
> - counting method (`sum` for weight, `card` for heads)
> - fiber condition (`maps_to`, `sum_fiber_nonpos`, etc.)
> - context (`Finset`, `Fintype`, `Nat`)

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exists_..._of_...`: indicates existence of a fiber satisfying a bound.
  - `sum_fiber` / `card_fiber`: distinguishes weight vs. cardinality counting.
- **Infixes**:
  - `lt` / `le`: strict vs. non-strict inequality.
  - `nsmul` / `mul`: `nsmul` uses scalar multiplication (`n • b`), `mul` uses natural multiplication (`n * b`).
  - `of_maps_to`: assumes `f(s) ⊆ t`.
  - `of_sum_fiber_nonpos` / `of_sum_fiber_nonneg`: assumes sign condition on fibers outside `t`.
- **Suffixes**:
  - `_of_nsmul_lt_sum`, `_of_mul_lt_card`, etc.: encode the premise inequality.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp_rw [cast_card]`: converts between `↑n` and `n` in arithmetic contexts (e.g., `#s` vs. `↑#s`).
  - `simpa`: simplifies using target goal or provided lemmas.
  - `calc`: chains inequalities (used in proofs involving `sum_le_sum_fiberwise`).
  - `exact`, `refine`: for direct proof construction.
  - `sum_nonneg`, `zero_le_one`: arithmetic lemmas for nonnegativity.
  - `mem_univ _`: trivial membership in universal finset.
  - `univ_nonempty`: proof that `univ : Finset α` is nonempty when `α` is inhabited.

- **Pattern**:
  - Proofs often reduce to known lemmas via `simpa` or `calc`, especially leveraging:
    - `sum_fiberwise_of_maps_to`
    - `sum_le_sum_fiberwise_of_sum_fiber_nonpos`
    - `cast_card` lemmas for `Finset.card` ↔ `ℕ`.

---

#### **4. Proof Logic**

- **General structure**:
  1. **Reduction**: Use `simpa` or `calc` to rewrite the premise into a form matching a known lemma (e.g., `∑ b < ∑ fiber`).
  2. **Application**: Apply a core pigeonhole lemma (e.g., `exists_lt_sum_fiber_of_maps_to_of_nsmul_lt_sum`).
  3. **Projection**: Extract the witness `y` and membership proof from `Finset.exists ...` to `∃ y, ...`.
- **Variations**:
  - **Weight vs. head-count**: Head-count versions reduce to weight versions via `cast_card` and `zero_le_one`.
  - **Non-strict → strict**: Often handled via `Mᵒᵈ` (opposite monoid) to flip inequalities.
  - **Fintype specialization**: Uses `mem_univ _` to discharge `f(s) ⊆ t`, and `univ_nonempty` for nonemptiness.
- **Infinite case (`Nat`)**:
  - Uses `infinite.exists_lt_map_eq_of_mapsTo` with `n ↦ n % k` mapping into `Iio k` (finite set).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Module.BigOperators` | Provides `∑`, `sum_fiberwise`, `sum_le_sum_fiberwise`, etc. |
| `Mathlib.Algebra.Order.Ring.Nat` | `cast_card`, `nsmul`, `LinearOrderedCancelAddCommMonoid`, `LinearOrderedCommSemiring`. |
| `Mathlib.Data.Nat.ModEq` | Modular arithmetic (`modEq`, `%`), used in `Nat.exists_lt_modEq_of_infinite`. |

> **Key algebraic structures assumed**:
> - `LinearOrderedCancelAddCommMonoid M`: for weight sums with order & cancellation.
> - `LinearOrderedCommSemiring M`: for head-count versions (via `cast_card` and `nsmul` = `mul`).
> - `DecidableEq β`: required for `Finset.filter`/`with` (fiberwise sums).

---

### Summary

This module formalizes a comprehensive suite of pigeonhole principles across finite sets (`Finset`), finite types (`Fintype`), and infinite naturals (`Nat`). The design emphasizes **modularity** (8 variants per core idea), **naming consistency**, and **proof reuse** (via `Mᵒᵈ`, `cast_card`, and fiberwise sum lemmas). It serves as a foundational toolkit for combinatorial reasoning in `mathlib`.