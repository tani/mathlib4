### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LeftOrdContinuous` | `∀ {α β : Preorder}, (α → β) → Prop` | Defines a function preserving all least upper bounds (`IsLUB`), i.e., left order continuity. |
| `RightOrdContinuous` | `∀ {α β : Preorder}, (α → β) → Prop` | Defines a function preserving all greatest lower bounds (`IsGLB`), i.e., right order continuity. |
| `map_isGreatest` | `LeftOrdContinuous f → IsGreatest s x → IsGreatest (f '' s) (f x)` | Shows that left order continuous functions preserve greatest elements of sets. |
| `mono` | `LeftOrdContinuous f → Monotone f` | Proves that any left order continuous function is monotone. |
| `comp` | `LeftOrdContinuous g → LeftOrdContinuous f → LeftOrdContinuous (g ∘ f)` | Closure under composition for left order continuous functions. |
| `iterate` | `LeftOrdContinuous f → n : ℕ → LeftOrdContinuous f^[n]` | Iterates of a left order continuous function remain left order continuous. |
| `map_sup` | `LeftOrdContinuous f → f (x ⊔ y) = f x ⊔ f y` | Preserves binary suprema (joins) in semilattices with sup. |
| `le_iff`, `lt_iff` | Under injectivity, equivalence of order relations before/after applying `f`. | Characterizes order-embedding behavior of injective left/right order continuous maps. |
| `toOrderEmbedding` | `LeftOrdContinuous f → Injective f → α ↪o β` | Constructs an order embedding from an injective left order continuous function. |
| `map_sSup'`, `map_sSup`, `map_iSup` | `f (sSup s) = sSup (f '' s)`, etc. | Preservation of arbitrary suprema (sup, image sup, indexed sup) under left order continuity. |
| `map_csSup`, `map_ciSup` | Conditional completeness versions of above. | Preservation of conditionally complete suprema. |
| `map_inf`, `map_sInf`, `map_iInf`, `map_csInf`, `map_ciInf` | Duals of the above for right order continuity. | Preservation of infima (meets) under right order continuity. |
| `OrderIso.leftOrdContinuous`, `OrderIso.rightOrdContinuous` | `e : α ≃o β → LeftOrdContinuous e`, `RightOrdContinuous e` | Order isomorphisms are both left and right order continuous. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `map_`: Indicates preservation of a lattice operation or bound (e.g., `map_sup`, `map_sSup`, `map_isGreatest`).
  - `is_`: Refers to properties like `isLUB`, `isGLB`, `isGreatest`, `isLeast`.
  - `orderDual`: Indicates dualization via `OrderDual` (e.g., `order_dual`, `orderDual`).
  - `toOrderEmbedding`: Conversion to an order embedding.

- **Suffixes**:
  - `'` (prime): Often used for a more direct version of a theorem (e.g., `map_sSup'` vs `map_sSup`).
  - `iSup`, `iInf`: Indexed sup/inf (over `ι → α`).
  - `sSup`, `sInf`: Set-based sup/inf.
  - `csSup`, `ciSup`, `csInf`, `ciInf`: Conditionally complete versions.

- **Case & Style**:
  - `LeftOrdContinuous`, `RightOrdContinuous`, `OrderIso`: PascalCase for types/classes.
  - `map_sup`, `mono`, `id`: snake_case for functions/lemmas.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise control over rewrites (e.g., `image_id`, `image_pair`, `sup_eq_right`). |
| `simpa only [...] using ...` | Simplify goal using a hypothesis. |
| `by` / `intro` / `exact` | Basic tactic mode proofs. |
| `induction n with | zero | succ` | Induction on natural numbers. |
| `rw [...]` | Rewrite using equalities (e.g., `sSup_image`, `range_comp`). |
| `have : ... := ...` | Introduce intermediate facts. |
| `apply ...` / `exact ...` | Apply lemmas or hypotheses directly. |
| ` rfl` | Reflexivity for definitional equalities. |

No heavy automation like `linarith`, `ring`, or `norm_num` — proofs are mostly structural and rely on `simp` and `rw`.

---

#### 4. **Proof Logic**

- **Structure**:
  - Proofs are mostly **direct**: unfold definitions (`LeftOrdContinuous`, `IsLUB`, etc.), then apply assumptions.
  - **Duality** is heavily used: many results for `RightOrdContinuous` are derived via `orderDual` from the left case.
  - **Inductive proofs** appear for iteration (`iterate`).
  - **Equational reasoning** with `unique`, `sSup_eq`, `csSup_eq`, etc., to show equality of suprema.
  - **Order-theoretic reasoning**: use of `mem_upperBounds`, `isLUB_le_iff`, `rel_symm_apply`, etc., especially in `OrderIso.leftOrdContinuous`.

- **Common pattern**:
  ```lean
  have h₁ := hf h,
  have h₂ := h₁.1,
  have h₃ := h₁.2,
  -- then combine with other facts
  ```

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Order.ConditionallyCompleteLattice.Basic` | Provides conditionally complete lattices, `sSup`, `sInf`, `csSup`, `csInf`, etc. |
| `Mathlib.Order.RelIso.Basic` | Defines order isomorphisms (`α ≃o β`) and their basic properties (`map_rel_iff`, `rel_symm_apply`, etc.). |

These imports define the core order-theoretic context: preorders, lattices, sup/inf, completeness, and order isomorphisms.

---

### Summary

This file formalizes **order continuity** in the sense of preserving suprema (left) and infima (right), with a focus on:
- Basic closure properties (identity, composition, iteration),
- Monotonicity and order-embedding constructions,
- Preservation of suprema/infima in various completeness settings (complete, conditionally complete, semilattice),
- Duality via `OrderDual`,
- And showing that **order isomorphisms are both left and right order continuous**.

The style is clean, modular, and heavily exploits duality and definitional equality via `simp`.