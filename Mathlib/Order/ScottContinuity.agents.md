### Technical Brief: Scott Continuity in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ScottContinuousOn D f` | `Set (Set α) → (α → β) → Prop` | Defines *relative Scott continuity*: `f` preserves `IsLUB` over all directed sets in `D`. |
| `ScottContinuous f` | `(α → β) → Prop` | Absolute Scott continuity: `f` preserves `IsLUB` over *all* nonempty directed sets. |
| `ScottContinuousOn.mono` | `D₁ ⊆ D₂ → ScottContinuousOn D₂ f → ScottContinuousOn D₁ f` | Monotonicity of the `ScottContinuousOn` predicate w.r.t. set inclusion. |
| `ScottContinuousOn.monotone` | `∀ a b, a ≤ b → {a,b} ∈ D → ScottContinuousOn D f → Monotone f` | Any Scott-continuous function (on a suitable `D`) is monotone. |
| `ScottContinuousOn.prodMk` | `ScottContinuousOn D f → ScottContinuousOn D g → ScottContinuousOn D (λ x ↦ (f x, g x))` | Pairing of Scott-continuous functions is Scott-continuous (requires `{a,b} ∈ D` for all comparable `a,b`). |
| `scottContinuousOn_univ` | `ScottContinuousOn univ f ↔ ScottContinuous f` | Equivalence between absolute and relative continuity when `D = univ`. |
| `ScottContinuous.scottContinuousOn` | `ScottContinuous f → ScottContinuousOn D f` | Absolute continuity implies relative continuity for any `D`. |
| `ScottContinuous.monotone` | `ScottContinuous f → Monotone f` | Absolute Scott-continuous functions are monotone. |
| `ScottContinuousOn.sup₂` | `ScottContinuousOn D (λ (a,b) ↦ a ⊔ b)` | Binary supremum operation is Scott-continuous (requires `β` to be a `SemilatticeSup`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ScottContinuousOn`: Relative version (parameterized by a collection `D` of directed sets).
  - `ScottContinuous`: Absolute version (no parameter `D`, defaults to all directed sets).
- **Suffixes**:
  - `On`: Used for relative notions (`ScottContinuousOn`, `scottContinuousOn_univ`).
  - `prodMk`, `sup₂`: Descriptive suffixes indicating construction (product of functions, binary operation).
- **Predicates**:
  - `isLUB`, `IsLUB`, `IsGLB`, `DirectedOn`, `upperBounds`, `lowerBounds`: Standard order-theoretic predicates from `Mathlib.Order.Bounds.Basic`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp` / `simp only`: Extensive use of simplification with `mem_image`, `Prod.mk_le_mk`, `upperBounds`, `lowerBounds`, etc.
- `rw`: Rewriting using definitions like `IsLUB`, `Monotone`, `sup_le_iff`.
- `constructor`: Splitting biconditionals/conjunctions (e.g., proving `IsLUB` requires two directions).
- `intro` / `exact`: Standard intro-style reasoning.
- `apply`, `have`, `exact`: For intermediate lemma application.
- `aesop` is *not* used — proofs are largely manual and definition-driven.
- `rw [isLUB_le_iff ...]`: Key for reasoning about least upper bounds.

---

#### **4. Proof Logic / Strategy**

- **Structure**: Proofs are largely *definition-chasing*:
  - Unfold `ScottContinuousOn`, `IsLUB`, `Monotone`, etc.
  - Use properties of `DirectedOn`, `upperBounds`, `lowerBounds`.
- **Common pattern**:
  1. Introduce assumptions (`intro d hd hd₁ hd₂ a hda`).
  2. Unfold `IsLUB` → prove two directions:
     - `IsLUB (f '' d) (f a) →` show `f a` is an upper bound and least.
  3. Use monotonicity (already proven or derived) to handle bounds.
  4. For product/sup operations: reduce to component-wise reasoning using `Prod.mk_le_mk`, `sup_le_iff`.
- **Induction**: Not used — all arguments are direct and rely on order-theoretic properties.

---

#### **5. Imports & Dependencies**

- **Core imports**:
  ```lean
  import Mathlib.Order.Bounds.Basic
  ```
  Provides:
  - `IsLUB`, `IsGLB`, `DirectedOn`, `upperBounds`, `lowerBounds`, `Ici`, etc.

- **Implicit dependencies** (via `Preorder`, `SemilatticeSup`, `Set`):
  - `Mathlib.Order.Preorder`
  - `Mathlib.Order.Directed`
  - `Mathlib.Order.SupSemilattice`
  - `Mathlib.Data.Set.Basic`
  - `Mathlib.Data.Product.Basic`

- **Future/related files** (mentioned in docstring):
  - `Mathlib.Topology.Order.ScottTopology.lean`: Connects Scott continuity to topological continuity.
  - `Mathlib.Order.OmegaCompletePartialOrder.lean`: Introduces ω-Scott continuity (for chains).

---

### Summary

This file formalizes **Scott continuity** in the context of preorders, distinguishing between *relative* (`ScottContinuousOn D`) and *absolute* (`ScottContinuous`) versions. It establishes foundational properties: monotonicity, closure under products, and continuity of binary suprema (in `SemilatticeSup`). The proofs are constructive and rely on careful manipulation of order-theoretic definitions, with no heavy automation. The design anticipates future connections to topology and domain theory (e.g., Scott topology, cpos, ω-cpos).