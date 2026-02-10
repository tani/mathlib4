### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `CompatibilityUnit` | `∀ (X : C), (adj.unit.app X)⟦a⟧' = adj.unit.app (X⟦a⟧) ≫ G.map (e₁.hom.app X) ≫ e₂.hom.app _`<br>Expresses compatibility of shift isomorphisms `e₁`, `e₂` with the unit of an adjunction. |
| `CompatibilityCounit` | `∀ (Y : D), adj.counit.app (Y⟦a⟧) = F.map (e₂.hom.app Y) ≫ e₁.hom.app _ ≫ (adj.counit.app Y)⟦a⟧'`<br>Expresses compatibility of shift isomorphisms with the counit. |
| `compatibilityCounit_of_compatibilityUnit` | Lemma: Compatibility with unit ⇒ compatibility with counit. |
| `compatibilityUnit_right` | Lemma: If compatible, `e₂.inv` is uniquely determined by `e₁`. |
| `compatibilityCounit_left` | Lemma: If compatible, `e₁.hom` is uniquely determined by `e₂`. |
| `compatibilityUnit_unique_right` / `left` | Lemmas: Uniqueness of `e₂` (resp. `e₁`) given `e₁` (resp. `e₂`) and compatibility. |
| `compatibilityUnit_isoZero` | Lemma: Zero-shift isomorphisms are compatible. |
| `compatibilityUnit_isoAdd` | Lemma: Compatibility is preserved under addition of shifts. |
| `CommShift` (class) | `adj.CommShift A` asserts that both `adj.unit` and `adj.counit` are `NatTrans.CommShift A`. |
| `mk'` | Constructor for `adj.CommShift A` using only unit compatibility. |
| `shift_unit_app`, `shift_counit_app` | Lemmas expressing how units/counits commute with shifts under `adj.CommShift A`. |
| `RightAdjointCommShift.iso` | Candidate isomorphism for `shiftFunctor D a ⋙ G ≅ G ⋙ shiftFunctor C a`, given `F.CommShift A`. |
| `RightAdjointCommShift.iso'` | Auxiliary definition used to define `iso`. |
| `RightAdjointCommShift.compatibilityUnit_iso` | Lemma: The candidate `iso` is compatible with `adj.unit`. |
| `rightAdjointCommShift` | Constructs `G.CommShift A` from `F.CommShift A` and `F ⊣ G`. |
| `commShift_of_leftAdjoint` | Lemma: If `F ⊣ G` and `F` has a `CommShift`, then `adj.CommShift A`. |
| `LeftAdjointCommShift.iso`, `iso'` | Dual constructions for `F` given `G.CommShift A`. |
| `leftAdjointCommShift` | Constructs `F.CommShift A` from `G.CommShift A`. |
| `commShift_of_rightAdjoint` | Dual of `commShift_of_leftAdjoint`. |
| `Equivalence.CommShift` | Compatibility of `CommShift` structures on both directions of an equivalence. |
| `commShiftInverse`, `commShiftFunctor` | Given equivalence `E : C ≌ D`, constructs `CommShift` on inverse/functor from the other. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `compatibilityUnit_`, `compatibilityCounit_`: Conditions for compatibility with unit/counit.
  - `iso`, `iso'`: Construction of candidate shift isomorphisms.
  - `commShift_`: Related to constructing or verifying `CommShift` structures.
  - `shift_`: Shift-related operations (e.g., `shift_unit_app`, `shift_counit_app`).
  - `leftAdjoint_`, `rightAdjoint_`: Direction-specific constructions (left/right adjoint).
  - `Functor.CommShift.isoZero`, `isoAdd`: Standard constructions for `CommShift` on functors.

- **Suffixes:**
  - `_app`: Component at an object (e.g., `iso_hom_app`, `shift_unit_app`).
  - `_unique_right/left`: Uniqueness lemmas.
  - `_of_`: Implication lemmas (e.g., `compatibilityCounit_of_compatibilityUnit`).
  - `mk'`: Constructor lemmas.

- **Notable patterns:**
  - `iso` is often defined via `iso'` + a cancellation condition (e.g., `neg_add_cancel`, `add_neg_cancel`).
  - `commShift_of_` lemmas show that compatibility of one adjoint implies full `adj.CommShift`.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplify using explicit lemmas, often with `Functor.map_comp`, `assoc`, `unit_naturality`, etc. |
| `rw [...]` | Rewrite using naturality, triangle identities, or definitions. |
| `dsimp` | Simplify definitional equalities (e.g., `comp_id`, `id_comp`). |
| `ext` | Extensionality for natural transformations / isomorphisms. |
| `apply ...injective` | Use injectivity of hom-sets or homEquiv. |
| `have := h ...` / `rw [...] at this` | Extract and manipulate intermediate equations. |
| `slice_rhs ... => rw [...]` | Local rewriting on subterms. |
| `erw [...]` | Rewrite using definitional equality (e.g., for `shiftFunctor` actions). |
| `cancel_mono`, `cancel_epi` | Cancel monos/epis in diagrams. |
| `rw [← assoc, ...]` | Reassociate compositions to match target form. |
| `simp only [Functor.comp_obj, Functor.id_obj, ...]` | Simplify functorial actions. |
| `apply (adj.homEquiv _ _).injective` | Use adjunction equivalence injectivity. |

---

#### 4. **Proof Logic**

- **Structure of proofs:**
  - **Step 1:** Define compatibility condition (`CompatibilityUnit`/`Counit`) for fixed `a`.
  - **Step 2:** Prove uniqueness: `e₁` ↔ `e₂` uniquely determine each other.
  - **Step 3:** Verify base case (`a = 0`) and closure under addition (`a + b`).
  - **Step 4:** Show candidate isomorphisms (`iso`, `iso'`) satisfy compatibility.
  - **Step 5:** Conclude via `mk'` or uniqueness lemmas that full `CommShift` structure exists.

- **Inductive/recursive flavor:**  
  Though not strictly inductive, the proofs mimic induction over the additive group structure (via `zero`, `add`, and inverses), especially in `RightAdjointCommShift`/`LeftAdjointCommShift` sections.

- **Diagrammatic reasoning:**  
  Heavy use of naturality, triangle identities (`unit_naturality`, `counit_naturality`), and functoriality (`Functor.map_comp`, `comp_obj`, etc.).

- **Duality:**  
  Many constructions are dual (e.g., `RightAdjointCommShift` ↔ `LeftAdjointCommShift`), with proofs mirrored via `iso.inv`/`hom` swaps.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Shift.CommShift` | Defines `HasShift`, `shiftFunctor`, `CommShift.isoZero`, `isoAdd`, etc. |
| `Mathlib.CategoryTheory.Adjunction.Mates` | Provides tools for adjunctions, mates, conjugation, and `conjugateIsoEquiv`. |

These imports define the foundational categorical and shift-theoretic infrastructure used throughout.

--- 

Let me know if you'd like a visual diagram of the compatibility condition or a summary of the `iso` construction in string diagram notation.