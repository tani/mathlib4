### Technical Brief: `seminormFromBounded` Construction in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `seminormFromBounded' f x` | `R → ℝ`, defined as `⨆ y, f (x * y) / f y`. Constructs a candidate seminorm from a multiplicatively bounded function `f`. |
| `seminormFromBounded f_zero f_nonneg f_mul f_add f_neg` | `RingSeminorm R`, constructs a *ring seminorm* from `f` under assumptions: `f(0)=0`, `f ≥ 0`, `f(x*y) ≤ c·f(x)·f(y)`, subadditive, and invariant under negation. |
| `normFromBounded f_zero f_nonneg f_mul f_add f_neg f_ker` | `RingNorm R`, upgrades `seminormFromBounded` to a *norm* when `f` has trivial kernel (`f⁻¹({0}) = {0}`). |
| `seminormFromBounded_isNonarchimedean` | If `f` is nonarchimedean, then `seminormFromBounded' f` is nonarchimedean. |
| `seminormFromBounded_of_mul_apply` | If `x` is *multiplicative* for `f` (i.e., `f(x*y) = f(x)·f(y)`), then `seminormFromBounded' f x = f x`. |
| `seminormFromBounded_of_mul_le` | If `x` is *submultiplicative* for `f` and `f(1) ≤ 1`, then `seminormFromBounded' f x = f x`. |
| `seminormFromBounded_eq_zero_iff` | `seminormFromBounded' f x = 0 ↔ f x = 0`. |
| `seminormFromBounded_ker` | `ker(seminormFromBounded' f) = ker(f)`. |
| `seminormFromBounded_of_mul_is_mul` | If `x` is multiplicative for `f`, then `x` is multiplicative for `seminormFromBounded' f`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `seminormFromBounded` / `seminormFromBounded'`: main construction.
  - `map_`: properties of `f` (e.g., `map_one_ne_zero`, `map_pow_ne_zero`, `map_mul_zero_of_map_zero`).
  - `seminormFromBounded_`: properties of the constructed seminorm (e.g., `seminormFromBounded_zero`, `seminormFromBounded_mul`, `seminormFromBounded_add`).
- **Suffixes**:
  - `_le`: upper bounds (e.g., `seminormFromBounded_le`, `seminormFromBounded_one_le`).
  - `_ge`: lower bounds (e.g., `seminormFromBounded_ge`).
  - `_iff`: equivalence statements (e.g., `seminormFromBounded_is_norm_iff`).
  - `_is_`: structural properties (e.g., `seminormFromBounded_isNonarchimedean`, `seminormFromBounded_of_mul_is_mul`).
- **Auxiliary predicates**:
  - `f_nonneg`, `f_mul`, `f_add`, `f_neg`, `f_zero`, `f_ker`: assumptions on `f`.
  - `f_ne_zero`: nonzero assumption on `f`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp_rw`: for rewriting with definitional equalities and simplifying expressions involving `div`, `mul`, `one`, `zero`.
- `rcases` / `obtain`: case analysis on `f y = 0` or `> 0`, often using `eq_or_gt`.
- `le_antisymm`: central for proving equalities by bounding above and below.
- `ciSup_le`, `le_ciSup`: for reasoning about suprema (used in defining and bounding `seminormFromBounded'`).
- `div_le_iff₀`, `div_le_div_iff_of_pos_right`, `div_self`: for manipulating inequalities involving division.
- ` positivity`: to discharge nonnegativity goals (e.g., `0 ≤ c`).
- `aesop` / `linarith`: for linear arithmetic over reals (especially in `map_one_ne_zero`, `seminormFromBounded_aux`).
- `conv_lhs`: for localized rewriting in complex expressions.
- `push_neg`: to handle negations of universal statements (e.g., `f ≠ 0`).

---

#### **4. Proof Logic**

The logical flow across most lemmas follows this pattern:

1. **Case split on `f y = 0` or `f y > 0`** — crucial for handling division by zero and applying multiplicative bounds.
2. **Bounding above/below** — using `le_antisymm`, often via:
   - Upper bound: `f(x*y) ≤ c·f(x)·f(y)` ⇒ `f(x*y)/f(y) ≤ c·f(x)`.
   - Lower bound: evaluate at `y = 1` ⇒ `f(x) ≤ f(1)·seminormFromBounded' f x`.
3. **Supremum reasoning** — using `ciSup_le` / `le_ciSup` with boundedness lemmas (`seminormFromBounded_bddAbove_range`).
4. **Kernel analysis** — via `seminormFromBounded_eq_zero_iff`, often reducing to `f x = 0`.
5. **Inductive or unit-based arguments** — e.g., `map_pow_ne_zero` uses units and powers to deduce `f(1) ≠ 0`.

The main construction (`seminormFromBounded`) is verified by checking the five ring seminorm axioms:
- `map_zero'`
- `add_le'`
- `mul_le'`
- `neg'`
- (implicitly) `toFun 0 = 0` via `seminormFromBounded_zero`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Normed.Ring.Seminorm`: defines `RingSeminorm`, `RingNorm`, and their axioms.
  - `Mathlib.Analysis.SpecialFunctions.Pow.Complex`: likely for complex powers (though not directly used here — possibly for future extensions or related lemmas).
- **Scope**:
  - `noncomputable section`: indicates reliance on classical choice (e.g., for suprema).
  - `open scoped Topology NNReal`: for `NNReal`-related notation (e.g., `ciSup`, `div` in `ℝ≥0` context).
- **Assumptions**:
  - `R : Type _ [CommRing R]`: commutative ring.
  - `f : R → ℝ`: real-valued function.
  - Multiplicative boundedness: `∀ x y, f(x*y) ≤ c·f(x)·f(y)`.

---

#### **Summary**

This file formalizes a classical construction from non-archimedean analysis: turning a multiplicatively bounded additive seminorm into a *ring seminorm* (or norm, under extra conditions). The Lean formalization is meticulous, with careful handling of division-by-zero cases, supremum properties, and equivalence of kernels. The naming and structure reflect Lean’s idiomatic style: descriptive names, modular assumptions, and heavy use of `simp_rw` and case analysis.