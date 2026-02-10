### Technical Brief: Bounded and Unbounded Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Bounded r s` | `∃ a, ∀ b ∈ s, r b a` | Set `s` is bounded above w.r.t. relation `r`. |
| `Unbounded r s` | `∀ a, ∃ b ∈ s, ¬r b a` | Set `s` is *not* bounded above w.r.t. `r`. |
| `Bounded.mono` | `s ⊆ t → Bounded r t → Bounded r s` | Subsets of bounded sets are bounded. |
| `Unbounded.mono` | `s ⊆ t → Unbounded r s → Unbounded r t` | Supersets of unbounded sets are unbounded. |
| `unbounded_le_iff` | `Unbounded (· ≤ ·) s ↔ ∀ a, ∃ b ∈ s, a < b` | Characterizes unboundedness for `≤` in linear orders. |
| `unbounded_lt_iff` | `Unbounded (· < ·) s ↔ ∀ a, ∃ b ∈ s, a ≤ b` | Characterizes unboundedness for `<` in linear orders. |
| `bounded_le_iff_bounded_lt` | `Bounded (· ≤ ·) s ↔ Bounded (· < ·) s` | Equivalence of boundedness under `≤` and `<` in `NoMaxOrder`. |
| `unbounded_lt_iff_unbounded_le` | `Unbounded (· < ·) s ↔ Unbounded (· ≤ ·) s` | Dual of above for unboundedness. |
| `bounded_ge_iff_bounded_gt` | `Bounded (· ≥ ·) s ↔ Bounded (· > ·) s` | Same as above for lower bounds (via order dual). |
| `unbounded_le_univ` | `Unbounded (· ≤ ·) univ` | Universal set is unbounded above in `NoTopOrder`. |
| `bounded_self` | `Bounded r { b | r b a }` | Down-set `{ b | r b a }` is bounded by `a`. |
| `bounded_lt_Iio`, `bounded_le_Iic`, etc. | Various interval boundedness lemmas | Intervals like `Iio a`, `Iic a`, `Ioi a`, `Ici a`, `Ioo a b`, etc., are bounded. |
| `unbounded_le_Ioi`, `unbounded_lt_Ici`, etc. | Various interval unboundedness lemmas | Intervals like `Ioi a`, `Ici a` are unbounded above in appropriate structures. |
| `bounded_inter_not` | `Bounded r (s ∩ { b | ¬r b a }) ↔ Bounded r s` | Boundedness preserved when intersecting with complement of a principal up-set (under `H`). |
| `bounded_le_inter_lt`, `bounded_lt_inter_le`, etc. | Equivalences for boundedness under order-theoretic intersections | E.g., `Bounded (· ≤ ·) (s ∩ { b | a < b }) ↔ Bounded (· ≤ ·) s`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bounded_` / `unbounded_`: Indicates bounded/unbounded status.
  - `rel_mono`: Monotonicity of boundedness/unboundedness under relation refinement (`r ≤ r'` or `r' ≤ r`).
  - `inter_not`: Intersections with complements of principal up/down-sets.
  - `of_forall_exists_`: Implication from a `∀ ∃` condition to unboundedness.

- **Suffixes**:
  - `_le`, `_lt`, `_ge`, `_gt`: Specifies the relation (`≤`, `<`, `≥`, `>`).
  - `_Iio`, `_Iic`, `_Ioi`, `_Ici`, `_Ioo`, `_Ioc`, `_Ico`, `_Icc`: Interval types.
  - `_univ`: Universal set (`univ`).
  - `_self`: Subset relation like `Ioo a b ⊆ Iio b`.

- **Duals via `αᵒᵈ`**: Theorems for `≥`/`>` are often duals of those for `≤`/`<`, using `αᵒᵈ`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp only [...]`: Used heavily to simplify goals using equivalence lemmas (e.g., `not_le`, `lt_iff_not_le`).
  - `rw [...]`: Rewriting with equivalences or definitions.
  - `convert`: To reuse existing lemmas with minor adjustments (e.g., swapping `<` and `≤` via `not_lt.symm`).
  - `exact`, `intro`, `cases`, `obtain`, `let`: Standard proof construction.
  - `mono`: For monotonicity arguments (e.g., `mono Set.Ioo_subset_Iio_self`).
  - `aesop`: Not explicitly used here, but `simp` + `linarith`-style reasoning dominates.

- **Pattern**:
  - Prove one direction directly (often via `let ⟨b, hb, hb'⟩ := h a`).
  - Use `simp_rw` or `convert` + symmetry to get the other direction.
  - Use `bounded_inter_not`/`unbounded_inter_not` as reusable lemmas for intersection-based reductions.

---

#### **4. Proof Logic**

- **Induction**: Not used — this is mostly *direct* order-theoretic reasoning.
- **Case analysis**: On order properties (`Preorder`, `LinearOrder`, `SemilatticeSup`, etc.).
- **Equational reasoning**: Heavy use of `↔`-elimination (`simp_rw`, `rw`, `convert`) to reduce to known lemmas.
- **Duality**: Many theorems for `≥`/`>` are proven by lifting to the dual order (`αᵒᵈ`), reusing `≤`/`<` lemmas.
- **Structure assumptions**:
  - `NoTopOrder`, `NoBotOrder`: Ensure existence of elements above/below any bound.
  - `NoMaxOrder`, `NoMinOrder`: Ensure strict/non-strict boundedness equivalence.
  - `SemilatticeSup`, `SemilatticeInf`: Used to construct joins/meets for bounding elements.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Order.RelClasses` | Defines `Preorder`, `LinearOrder`, `Bounded`, `Unbounded`, and relation classes. |
| `Mathlib.Order.Interval.Set.Basic` | Defines intervals (`Iio`, `Iic`, `Ioi`, `Ici`, `Ioo`, etc.) and basic set operations. |

---

### Summary

This file formalizes a comprehensive suite of lemmas about boundedness and unboundedness of sets in ordered types, with emphasis on:
- Equivalence between strict/non-strict boundedness under `NoMaxOrder`/`NoMinOrder`.
- Interval-specific boundedness/unboundedness.
- Preservation under subset/superset operations.
- Intersections with complements of principal up/down-sets.

The proofs rely on order-theoretic properties, duality, and equivalence-based simplification — typical of modern Mathlib style.