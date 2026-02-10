### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ineq` | `lemma {a₀ a₁ b₀ b₁ c₀ c₁ d₀ d₁ : β} ...` | Core inequality for the `n = 1` case of Ahlswede–Daykin; used to inductively lift pointwise bounds to sums. |
| `collapse` | `def (𝒜 : Finset (Finset α)) → α → (Finset α → β) → Finset α → β` | A summation operator that aggregates values over families of sets differing only by a fixed element `a`. Central to induction on `α`. |
| `collapse_eq` | `lemma` | Describes `collapse` explicitly as a sum of at most two terms (`f s` and `f (insert a s)`), depending on membership. |
| `collapse_modular` | `lemma` | Shows that the modular inequality `f₁ * f₂ ≤ f₃ * f₄` lifts under `collapse`, crucial for the inductive step. |
| `sum_collapse` | `lemma` | Relates summing over `collapse` to summing over the original family; used to preserve total sums during induction. |
| `Finset.four_functions_theorem` | `lemma` | Four Functions Theorem for powerset algebras (`Finset α`), proved by induction on `α`. |
| `four_functions_theorem` | `lemma` | General Four Functions Theorem for any finite distributive lattice, via Birkhoff’s representation theorem. |
| `Finset.le_card_infs_mul_card_sups` | `lemma` | Daykin inequality: `|s| * |t| ≤ |s ⊼ t| * |s ⊻ t|`. Special case of the Four Functions Theorem with all `fᵢ = 1`. |
| `holley` | `lemma` | Holley inequality: under monotonicity and normalization assumptions, `∑ μ f ≤ ∑ μ g`. |
| `fkg` | `lemma` | Fortuin–Kasteleyn–Ginibre (FKG) inequality: positive correlation of monotone functions under log-supermodular measure. |
| `Finset.card_le_card_diffs` | `lemma` | Marica–Schönheim inequality: `|s| ≤ |{a \ b | a, b ∈ s}|`. Derived via Booleanisation. |
| `Finset.le_card_diffs_mul_card_diffs` | `lemma` | Generalized Marica–Schönheim for two sets: `#s * #t ≤ #(s \\ t) * #(t \\ s)`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `collapse_`: operations involving the `collapse` construction.
  - `ineq`: auxiliary inequalities used in proofs (e.g., `ineq`, `le_collapse_*`).
  - `le_`, `card_`, `holley`, `fkg`, `four_functions_`: standard mathematical naming for inequalities and theorems.
- **Suffixes**:
  - `_eq`: definitions or lemmas giving explicit forms (e.g., `collapse_eq`, `erase_eq_iff`).
  - `_mem`, `_nonneg`, `_modular`: indicate membership, nonnegativity, or modular-type assumptions.
  - `_aux`: auxiliary lemmas (e.g., `four_functions_theorem_aux`).
- **Operators**:
  - `s ⊼ t`, `s ⊻ t`: notation for `infs s t` and `sups s t` (pairwise `∩`, `∪`).
  - `\\`: set difference in `GeneralizedBooleanAlgebra`.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simp_rw`, `simp`, `rw`: heavy use of rewriting with lemmas like `collapse_eq`, `erase_eq_iff`, `insert_inter_of_not_mem`, etc.
  - `ring`: for algebraic manipulations of products/sums.
  - `aesop`: for automated reasoning in set-theoretic and order-theoretic contexts (e.g., `filter_collapse_eq`, `erase_eq_iff`).
  - `cases`/`obtain`/`match`: especially with `em`, `eq_or_lt`, `eq_or_gt`, `subset_insert_iff`.
  - `exact`, `refine`, `apply`: for applying lemmas with missing hypotheses filled via `simpa`, `suffices`, or `have`.
  - ` positivity`: to discharge nonnegativity goals (e.g., from `hf : 0 ≤ f`).
  - `induction' ... using Finset.induction`: structural induction on finite sets.

---

#### 4. **Proof Logic**

- **Inductive structure**:
  - **Base case**: `u = ∅`, reduces to trivial verification using `subset_singleton_iff`.
  - **Inductive step**: Add element `a ∉ u`, use `collapse` to reduce the statement for `insert a u` to one for `u`, applying `collapse_modular` and `ineq`.
- **General lattice case**:
  - Reduce to powerset case via **Birkhoff’s representation theorem**: embed finite distributive lattice `L` into a powerset algebra `Finset α`.
  - Pull back functions via embedding, apply `Finset.four_functions_theorem`, then push forward using `sum_map`, `map_infs`, `map_sups`.
- **Corollaries**:
  - Derived by specializing `f₁, f₂, f₃, f₄` to constant functions (e.g., `1`) or using monotonicity/positivity assumptions.
  - Holley and FKG use `four_functions_theorem_univ` with cleverly chosen `fᵢ` (e.g., `μ * f`, `μ * g`).
- **Booleanisation**:
  - For Marica–Schönheim, use `GeneralizedBooleanAlgebra` structure and `liftLatticeHom` to embed into a Boolean algebra, then apply Daykin inequality on complements.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.BigOperators.Group.Finset` | Summation over finite sets, especially with additive structure. |
| `Mathlib.Algebra.Order.Pi` | Product orders and functions spaces (e.g., monotonicity, pointwise operations). |
| `Mathlib.Data.Finset.Sups` | Definitions and properties of `infs`/`sups` (pairwise `∩`/`∪`). |
| `Mathlib.Order.Birkhoff` | Birkhoff’s representation theorem for finite distributive lattices. |
| `Mathlib.Order.Booleanisation` | Embedding into Boolean algebras (used for Marica–Schönheim). |
| `Mathlib.Order.Sublattice` | Sublattices and lattice closures (used in `four_functions_theorem`). |
| `Mathlib.Tactic.Positivity.Basic` | Tactics for proving nonnegativity (e.g., `positivity`). |
| `Mathlib.Tactic.Ring` | Polynomial/ring simplifications (e.g., expanding products). |

---

### Summary

This file formalizes the **Four Functions Theorem** (Ahlswede–Daykin inequality) in two settings:  
1. **Powerset algebras** (`Finset α`) via induction on the base set, using the novel `collapse` construction.  
2. **Finite distributive lattices** via Birkhoff’s representation, reducing to the powerset case.  

It then derives major corollaries in order theory and probability (Daykin, Holley, FKG, Marica–Schönheim), showcasing deep connections between lattice structure, inequalities, and combinatorics. The proofs rely heavily on order-theoretic reasoning, summation manipulations, and tactic automation (`aesop`, `simp`, `ring`, `positivity`).