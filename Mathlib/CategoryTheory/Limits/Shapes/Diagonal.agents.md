### Technical Brief: Diagonal Object and Pullback Isomorphisms in Lean 4 (CategoryTheory.Limits)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `diagonalObj f` | `C` | The pullback `pullback f f`, i.e., the *diagonal object* of `f : X ⟶ Y`. |
| `diagonal f` | `X ⟶ diagonalObj f` | The canonical map induced by the universal property of the pullback `X → X ×_Y X`. |
| `diagonal_isKernelPair f` | `IsKernelPair f (fst f f) (snd f f)` | States that the two projections from `Δ_{X/Y}` form a kernel pair of `f`. |
| `isIso_diagonal_iff` | `IsIso (diagonal f) ↔ Mono f` | Characterizes monomorphisms via split mono/iso of the diagonal. |
| `pullbackDiagonalMapIso f i i₁ i₂` | `≅` | An isomorphism identifying a pullback over `Δ_{X/Y}` with a pullback over `X ×_Y U`. |
| `pullbackDiagonalMapIdIso f g i` | `≅` | Isomorphism witnessing that `X ×_T Y ≅ (T ×_S T) ×_{T ×_S T} (X ×_S Y)`. |
| `diagonalObjPullbackFstIso f g` | `≅` | Isomorphism: `Δ_{X ×_Z Y → X} ≅ Δ_{Y → Z} ×_Z X`. |
| `diagonal_pullback_fst f g` | Equality | Explicit description of `diagonal (pullback.fst f g)` in terms of other diagonals and isos. |
| `pullbackFstFstIso ... [Mono i₃]` | `≅` | Isomorphism for a nested pullback square under a monomorphism `S → S'`. |
| `pullback_map_eq_pullbackFstFstIso_inv` | Equality | Relates the standard pullback map to the inverse of `pullbackFstFstIso`. |
| `pullback_lift_map_isPullback` | `IsPullback` | A pullback square constructed via universal property and `pullbackFstFstIso`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `diagonal_`: for constructions involving the diagonal object `X → X ×_Y X`.
  - `pullbackDiagonalMap_`: for isos involving pullbacks over diagonal objects.
  - `pullbackFstFst_`: for isos involving double pullbacks over projections.
  - `pullback_..._Iso`: standard for isomorphisms between pullbacks.

- **Suffixes**:
  - `_hom`, `_inv`: for components of an isomorphism.
  - `_fst`, `_snd`: for projections from pullbacks.
  - `_assoc`, `_symmetry`, `_congrHom`: for standard pullback reassociations/conjugations.

- **Pattern**:
  - `pullback.map f g f' g' i₁ i₂ i₃ e₁ e₂`: pullback of a commutative cube.
  - `pullback.lift ... (h₁ : _ ≫ f = _ ≫ g) (h₂ : _ ≫ g = _ ≫ g)`: universal cone map.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | To reduce equality of morphisms to equality of composites with projections. |
| `simp` / `simp only [...]` | To simplify using `reassoc`, `condition`, `diagonal_fst`, `diagonal_snd`, etc. |
| `rw [...]` | Rewriting using lemmas like `diagonal_fst`, `condition`, `assoc`, `inv_hom_id`. |
| `conv_rhs => rw [...]` | To rewrite only the right-hand side in equations. |
| `aesop_cat` | For automated category-theoretic reasoning (e.g., verifying pullback conditions). |
| `delta` | To unfold definitions (e.g., `delta pullbackDiagonalMapIso`) before `simp`. |
| `infer_instance` | To discharge typeclass constraints (e.g., `IsSplitMono`, `IsIso`). |
| `cancel_mono`, `cancel_epi` | To cancel monos/epis in equalities. |
| `apply ...; ext <;> simp [...]` | Common pattern for proving `IsPullback` or `IsKernelPair`. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *computational* style: unfold definitions (`delta`), simplify (`simp`), and use projection lemmas (`lift_fst`, `lift_snd`, `condition`).
  - For isomorphism proofs: construct `hom` and `inv`, then prove `hom_inv_id` and `inv_hom_id` using `pullback.hom_ext` and nested `hom_ext`s.
  - For `IsPullback`/`IsKernelPair`: use `IsPullback.of_iso_pullback` or `of_hasPullback`, often with pre-established isos.

- **Inductive/structural reasoning**:
  - No explicit induction; reasoning is mostly *diagrammatic* and *universal property*-based.
  - Key lemmas like `diagonal_fst`, `diagonal_snd`, and `pullback.condition` are used repeatedly to reduce goals.

- **Monomorphism handling**:
  - `Mono f` is often used via `cancel_mono`, or via `isIso_diagonal_iff`.
  - `Mono i₃` in `pullbackFstFstIso` is used to cancel on the right in equalities.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Adjunction.Over`: for `Over` category and pullbacks over morphisms.
- `Mathlib.CategoryTheory.Limits.Shapes.KernelPair`: for `IsKernelPair`.
- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.*`: for pullback infrastructure (`CommSq`, `Assoc`, etc.).

**Scope**:
- `CategoryTheory.Limits` namespace.
- Noncomputable section (due to `HasPullback` typeclasses).
- Relies heavily on `reassoc` attributes for `simp`-friendly associativity.

---

#### **6. Summary**

This file formalizes the *diagonal object* `X ×_Y X` and its universal properties in a category with pullbacks. It provides:
- Basic API (`diagonal`, `diagonal_isKernelPair`, `isIso_diagonal_iff`).
- Key isomorphisms for manipulating nested pullbacks over diagonals.
- Applications to pullback squares (e.g., `pullback_map_diagonal_isPullback`, `pullback_lift_map_isPullback`).
- A robust set of projection lemmas (`_fst`, `_snd`, `_hom`, `_inv`) for simplification.

The formalization is highly structured, with a strong emphasis on *computational content* and *reassoc*-friendly lemmas, enabling efficient reasoning about pullback diagrams in general categories.