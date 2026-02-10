### Technical Brief: Semiconjugacy via `sSup` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsOrderRightAdjoint` | `IsOrderRightAdjoint [Preorder α] [Preorder β] (f : α → β) (g : β → α) := ∀ y, IsLUB {x | f x ≤ y} (g y)` | Defines when `g` is a *right adjoint* to `f`: for each `y`, `g y` is the least upper bound of `{x | f x ≤ y}`. |
| `isOrderRightAdjoint_sSup` | `[CompleteLattice α] → [Preorder β] → (f : α → β) → IsOrderRightAdjoint f (λ y ↦ sSup {x | f x ≤ y})` | Shows that in a complete lattice, `y ↦ sSup {x | f x ≤ y}` is always an order right adjoint of `f`. |
| `isOrderRightAdjoint_csSup` | `[ConditionallyCompleteLattice α] → [Preorder β] → (f : α → β) → (∀ y, ∃ x, f x ≤ y) → (∀ y, BddAbove {x | f x ≤ y}) → IsOrderRightAdjoint f (λ y ↦ sSup {x | f x ≤ y})` | Same as above, but for conditionally complete lattices, requiring non-emptiness and boundedness of the preimage sets. |
| `IsOrderRightAdjoint.unique` | `[PartialOrder α] → [Preorder β] → (h₁ h₂ : IsOrderRightAdjoint f g) → g₁ = g₂` | Uniqueness of order right adjoints under partial orders. |
| `IsOrderRightAdjoint.right_mono` | `[Preorder α] → [Preorder β] → (h : IsOrderRightAdjoint f g) → Monotone g` | Right adjoints are monotone. |
| `IsOrderRightAdjoint.orderIso_comp` / `comp_orderIso` | Compatibilities of right adjoints with composition by order isomorphisms. | Ensures stability under change of coordinates via order isomorphisms. |
| `Semiconj.symm_adjoint` | `[PartialOrder α] → [Preorder β] → {fa : α ≃o α} → {fb : β ↪o β} → {g : α → β} → Function.Semiconj g fa fb → IsOrderRightAdjoint g g' → Function.Semiconj g' fb fa` | *Main result*: If `g` semiconjugates `fa` to `fb`, then its order right adjoint `g'` semiconjugates `fb` to `fa`. Generalizes Ghys Prop. 2.1. |
| `Function.semiconj_of_isLUB` | `[PartialOrder α] → [Group G] → (f₁ f₂ : G →* α ≃o α) → {h : α → α} → (∀ x, IsLUB (range (g ↦ (f₁ g)⁻¹ (f₂ g x))) (h x)) → (g : G) → Function.Semiconj h (f₂ g) (f₁ g)` | General lemma: if `h(x)` is the LUB of a certain `G`-orbit set, then `h` semiconjugates `f₂ g` to `f₁ g`. |
| `Function.sSup_div_semiconj` | `[CompleteLattice α] → [Group G] → (f₁ f₂ : G →* α ≃o α) → (g : G) → Function.Semiconj (λ x ↦ ⨆ g', (f₁ g')⁻¹ (f₂ g' x)) (f₂ g) (f₁ g)` | In a complete lattice, the map `x ↦ ⨆_g (f₁ g)⁻¹ (f₂ g x)` semiconjugates each `f₁ g` to `f₂ g`. Ghys Prop. 5.4 (complete case). |
| `Function.csSup_div_semiconj` | `[ConditionallyCompleteLattice α] → [Group G] → (f₁ f₂ : G →* α ≃o α) → (∀ x, BddAbove (range (g ↦ (f₁ g)⁻¹ (f₂ g x)))) → (g : G) → Function.Semiconj (λ x ↦ ⨆ g', (f₁ g')⁻¹ (f₂ g' x)) (f₂ g) (f₁ g)` | Same as above, but for conditionally complete lattices, assuming boundedness of the relevant sets. Ghys Prop. 5.4 (conditionally complete case). |

---

#### **2. Naming Conventions**

- **`isOrderRightAdjoint_*`**: Prefix `isOrderRightAdjoint_` for lemmas about existence/uniqueness/properties of right adjoints.
- **`_*_comp` / `comp_*`**: For composition with order isomorphisms (e.g., `orderIso_comp`, `comp_orderIso`).
- **`_*_div_semiconj`**: For semiconjugacy results involving group actions and division-like expressions (e.g., `sSup_div_semiconj`, `csSup_div_semiconj`).
- **`_*_adjoint`**: For adjoint-based constructions (e.g., `symm_adjoint`).
- **`_*_of_isLUB`**: For lemmas where semiconjugacy follows from an `IsLUB` assumption.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw` / `simp only`: To rewrite using definitional equalities and simplification lemmas.
- `exact`, `refine`, `apply`: For constructing proofs via higher-order unification.
- `change`, `rw`: To manipulate goals and hypotheses (especially with `preimage_setOf_eq`, `range_comp`, etc.).
- `simpa`: To discharge goals using simplification and assumptions.
- `intro`, `funext`: For extensionality arguments (especially in uniqueness proofs).
- `mono`: To prove monotonicity (used implicitly via `h₁ y).mono (h₂ y)`).
- `leftOrdContinuous`, `right_mono`: Leveraging properties of order isomorphisms/embeddings.

---

#### **4. Proof Logic**

- **Structure of main proofs**:
  - **Uniqueness**: Use `IsLUB.unique` to show two candidates are equal.
  - **Semiconjugacy**: Reduce to showing `g'(fb y) = fa(g'(y))` by proving both sides are LUBs of the same set — typically via:
    - Applying `leftOrdContinuous` of an order isomorphism to transport LUBs through maps.
    - Using `range_comp`, `Equiv.mulRight`, and `preimage_setOf_eq` to rewrite the set over which the LUB is taken.
  - **Adjoint symmetry (`symm_adjoint`)**:
    - Use `fa.leftOrdContinuous` to pull back the LUB property through `fa`.
    - Apply `fb.le_iff_le` to relate order structure on `β`.
  - **Group action semiconjugacy (`sSup_div_semiconj`, `csSup_div_semiconj`)**:
    - Apply `semiconj_of_isLUB` with `h(x) = ⨆_g (f₁ g)⁻¹ (f₂ g x)`.
    - Use `isLUB_iSup` (or `isLUB_csSup`) to verify the LUB condition.
    - Use `Equiv.mulRight g` to reindex the supremum under group multiplication.

- **Inductive/structural pattern**: Most proofs follow a *LUB-uniqueness + continuity* pattern:
  > Show both sides of the desired equality are LUBs of the same set ⇒ equality by uniqueness.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Group.Units.Equiv`: For group actions via order isomorphisms (`α ≃o α`).
  - `Mathlib.Logic.Function.Conjugate`: For `Semiconj` and related notions.
  - `Mathlib.Order.Bounds.OrderIso`: For order isomorphisms and their properties.
  - `Mathlib.Order.OrdContinuous`: For `leftOrdContinuous`, `rightOrdContinuous`.
  - `Mathlib.Order.RelIso.Group`: For group actions by order isomorphisms.

- **Lattice theory**:
  - `CompleteLattice`, `ConditionallyCompleteLattice`: For `sSup`, `csSup`, `iSup`.
  - `Preorder`, `PartialOrder`: For order-theoretic reasoning.

- **Domain**: Order theory on lattices, group actions by order automorphisms, and semiconjugacy — motivated by Ghys’ work on circle homeomorphisms and bounded cohomology.

--- 

Let me know if you'd like a diagrammatic summary or a formalized summary in `leanpkg` format.