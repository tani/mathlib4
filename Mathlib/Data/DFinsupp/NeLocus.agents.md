### Technical Metadata Brief: `DFinsupp.neLocus`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `neLocus` | `def neLocus (f g : Π₀ a, N a) : Finset α` | Defines the finite set of indices where two finitely supported dependent functions differ. Generalizes `(f - g).support` to settings without subtraction. |
| `mem_neLocus` | `a ∈ f.neLocus g ↔ f a ≠ g a` | Membership characterization: an index is in the locus iff the functions differ there. |
| `not_mem_neLocus` | `a ∉ f.neLocus g ↔ f a = g a` | Complement of `mem_neLocus`. |
| `coe_neLocus` | `↑(f.neLocus g) = { x | f x ≠ g x }` | coercion to `Set α` matches pointwise inequality. |
| `neLocus_eq_empty` | `f.neLocus g = ∅ ↔ f = g` | Equality of functions corresponds to empty locus. |
| `nonempty_neLocus_iff` | `(f.neLocus g).Nonempty ↔ f ≠ g` | Non-emptiness of locus ↔ functions are distinct. |
| `neLocus_comm` | `f.neLocus g = g.neLocus f` | Symmetry of the locus. |
| `neLocus_zero_right` | `f.neLocus 0 = f.support` | Locus with zero function recovers support. |
| `neLocus_zero_left` | `0.neLocus f = f.support` | Symmetric version. |
| `subset_mapRange_neLocus` | `(f.mapRange F F0).neLocus (g.mapRange F F0) ⊆ f.neLocus g` | Image under `mapRange` does not increase the locus. |
| `zipWith_neLocus_eq_left/right` | Equality of loci under `zipWith` under injectivity assumptions. | Controls how `zipWith` affects the locus. |
| `mapRange_neLocus_eq` | Under injectivity, `mapRange` preserves the locus exactly. |
| `neLocus_add_left/right` | Under cancelativity, `neLocus` behaves nicely with addition. |
| `neLocus_neg_neg`, `neLocus_neg` | Behavior under negation. |
| `neLocus_eq_support_sub` | In additive groups: `f.neLocus g = (f - g).support`. |
| `neLocus_sub_left/right` | Analogues of `add_left/right` for subtraction. |
| `neLocus_self_add/sub_left/right` | Locus of `f` vs `f + g` (or `f - g`) is `g.support`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `neLocus_`: core prefix for all lemmas/defs about the locus.
  - `mapRange_`, `zipWith_`: for operations on `Π₀`.
- **Suffixes**:
  - `_left`, `_right`: indicate which argument is varied in binary operations (e.g., `add`, `sub`, `zipWith`).
  - `_eq`, `_subset`: indicate equality or inclusion results.
  - `_zero`, `_neg`, `_sub`: indicate special cases or operations.
- **Predicate-style names**:
  - `mem_`, `not_mem_`, `nonempty_`, `eq_empty`, `comm`: standard Lean conventions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with `simp`-friendly lemmas (e.g., `mem_neLocus`, `mapRange_apply`). |
| `simp only [...]` | Targeted simplification using specific lemmas. |
| `ext` | Extensionality for functions/sets (e.g., proving `f = g` or `s = t : Finset α`). |
| `rw [...]` | Direct rewriting using equalities (e.g., `sub_eq_add_neg`, `add_zero`). |
| `simpa [...] using ...` | Simplify goal using a given proof term. |
| `exact`, `apply`, `intro`, `cases` | Basic proof structure. |
| `aesop` | Not present — proofs are mostly manual and rely on `simp`-based automation. |

---

#### **4. Proof Logic Pattern**

- **Structure**: Most proofs follow this pattern:
  1. **Extensionality**: Use `ext a` to reduce to pointwise reasoning.
  2. **Rewrite membership**: Apply `mem_neLocus` to convert to `f a ≠ g a`.
  3. **Simplify using definitions**: e.g., `mapRange_apply`, `zipWith`, `add`, `sub`, `neg`.
  4. **Apply injectivity or cancellation**: e.g., `hF a).ne_iff`, `add_right_injective`.
  5. **Use logical equivalences**: `ne_comm`, `not_imp_not`, `not_ne_iff`, etc.

- **Induction**: Not used — all proofs are pointwise and algebraic.

- **Case analysis**: Minimal; mostly handled via `simp` and `rw`.

---

#### **5. Imports & Dependencies**

- **Core import**:
  ```lean
  import Mathlib.Data.DFinsupp.Defs
  ```
- **Assumptions used**:
  - `[DecidableEq α]`: needed to define `Finset.filter`.
  - `[∀ a, DecidableEq (N a)]`: for `neLocus` to be definable (to compare `f x ≠ g x`).
  - `[∀ a, Zero (N a)]`: required to compare with zero and define support.
  - `[∀ a, AddLeftCancelMonoid (N a)]`, `[∀ a, AddRightCancelMonoid (N a)]`, `[∀ a, AddGroup (N a)]`: for additive lemmas.

- **Related modules likely used**:
  - `Mathlib.Data.Finset.Basic`
  - `Mathlib.Data.DFinsupp.Supp` (for `support`, `mem_support_iff`)
  - `Mathlib.Data.DFinsupp.MapRange`, `zipWith` (for `mapRange`, `zipWith` lemmas)

---

### Summary

This file formalizes the **locus of inequality** between two finitely supported dependent functions — a central tool for reasoning about differences in `Π₀`-type spaces. It generalizes the familiar `support (f - g)` to contexts lacking subtraction, and establishes robust algebraic and logical properties under various structures (cancel monoids, groups, injective maps). The proofs are mostly pointwise and rely heavily on `simp`-based automation and extensionality.