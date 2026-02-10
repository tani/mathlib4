### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `doublyStochastic` | `Matrix n n R → Prop` | Predicate for doubly stochastic matrices (non-negative entries, all row/column sums = 1) — imported from `Mathlib.Data.Matrix.DoublyStochastic`. |
| `permMatrix` | `Equiv.Perm n → Matrix n n R` | Maps a permutation σ to its permutation matrix (1 at (i, σ(i)), 0 elsewhere). |
| `exists_perm_eq_zero_implies_eq_zero` | `lemma` | If `M = s • M'` with `s > 0` and `M'` doubly stochastic, then there exists a permutation σ whose support is contained in that of `M`. Key step for Hall’s marriage theorem application. |
| `doublyStochastic_sum_perm_aux` | `lemma` | If `M = s • M'` with `M'` doubly stochastic and `s ≥ 0`, then `M` is a conical (non-negative) combination of permutation matrices. Enables induction on number of non-zero entries. |
| `exists_eq_sum_perm_of_mem_doublyStochastic` | `lemma` | If `M` is doubly stochastic, then `M` is a **convex** combination of permutation matrices: coefficients `w σ ≥ 0`, `∑ w σ = 1`, and `M = ∑ w σ • σ.permMatrix`. |
| `doublyStochastic_eq_convexHull_permMatrix` | `theorem` (**Birkhoff’s theorem**) | The set of doubly stochastic matrices equals the convex hull of permutation matrices. Main result of the file. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `exists_..._implies_...`: Existential lemmas with implication structure.
  - `doublyStochastic_...`: Lemmas/auxiliaries directly about doubly stochastic matrices.
  - `permMatrix`: Refers to permutation matrices.
- **Suffixes**:
  - `_aux`: Auxiliary lemmas used in the main inductive proof.
  - `_of_mem_...`: Lemmas assuming membership in a set (e.g., `of_mem_doublyStochastic`).
- **Variables**:
  - `M`, `N`: Generic matrices.
  - `σ`, `g`, `h`: Permutations or bijections.
  - `s`, `s'`: Scalars (often scaling factors).
  - `w`: Weight function on permutations.

---

#### 3. **Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities, especially for `sum`, `smul`, `permMatrix`, `filter`, `biUnion`. |
| `rw` | Rewriting using equivalences, definitions, and lemmas (e.g., `exists_mem_doublyStochastic_eq_smul_iff`). |
| `induction ... using Nat.strongRecOn` | Strong induction on the number of non-zero entries (`d = #{(i,j) | M i j ≠ 0}`). |
| `obtain ⟨...⟩` / `rcases` | Destructuring existential/universal hypotheses. |
| `refine` / `exact` | Constructing proofs with holes filled later (`?_`). |
| `linarith` | Solving linear inequalities over ordered fields (e.g., positivity, strictness). |
| `congr'` / `ext` / `funext` | Extensionality for functions/matrices. |
| `sum_le_sum_of_subset_of_nonneg`, `sum_le_sum` | Bounding sums via subset inclusion and non-negativity. |
| `card_lt_card`, `all_card_le_biUnion_card_iff_exists_injective` | Combinatorial cardinality arguments (Hall’s condition). |

---

#### 4. **Proof Logic**

- **High-level strategy**: Induction on the *number of non-zero entries* in `M`.
  - Base case (`d = 0`): Trivial (zero matrix).
  - Inductive step:
    1. Use `exists_perm_eq_zero_implies_eq_zero` (via Hall’s marriage theorem) to find a permutation σ whose support lies in `supp(M)`.
    2. Pick a minimal non-zero entry `M i (σ i)` along this permutation.
    3. Subtract a scalar multiple (`M i (σ i) • σ.permMatrix`) from `M` to get `N`, which has *fewer* non-zero entries.
    4. Apply induction hypothesis to `N`, then extend the weight function by adding `M i (σ i)` at σ.
- **Key ingredients**:
  - Linear order + semifield/field structure for scaling and inequality reasoning.
  - Combinatorial lemmas (`all_card_le_biUnion_card_iff_exists_injective`) to guarantee a permutation within support.
  - Properties of doubly stochastic matrices (row/column sums = 1, non-negativity).

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Convex.Combination` | Convex combinations, `convexHull`, basic convex analysis. |
| `Mathlib.Combinatorics.Hall.Basic` | Hall’s marriage theorem (`all_card_le_biUnion_card_iff_exists_injective`). |
| `Mathlib.Data.Matrix.DoublyStochastic` | Definition of `doublyStochastic`, basic properties (e.g., `sum_row_of_mem_doublyStochastic`, `permMatrix_mem_doublyStochastic`). |
| `Mathlib.Tactic.Linarith` | Solving linear arithmetic goals over ordered fields. |

---

### Summary

This file formalizes **Birkhoff’s theorem** (also known as the Birkhoff–von Neumann theorem) in Lean 4: every doubly stochastic matrix is a convex combination of permutation matrices. The proof is constructive and inductive, leveraging Hall’s marriage theorem to extract a permutation within the support of `M`, then iteratively peeling off permutation components. The formalization is modular, with auxiliary lemmas (`doublyStochastic_sum_perm_aux`, `exists_perm_eq_zero_implies_eq_zero`) enabling clean inductive reasoning.