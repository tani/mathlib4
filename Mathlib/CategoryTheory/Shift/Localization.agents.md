Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsCompatibleWithShift` | `class` — A morphism property `W` is *compatible with shift* by monoid `A` if for all `a : A`, `W` is invariant under precomposition with `shiftFunctor C a`. Formally: `∀ a, W.inverseImage (shiftFunctor C a) = W`. |
| `IsCompatibleWithShift.iff` | `lemma` — Equivalence: `W (f⟦a⟧') ↔ W f` under compatibility. |
| `IsCompatibleWithShift.shiftFunctor_comp_inverts` | `lemma` — If `W` is compatible with shift, then `shiftFunctor C a ⋙ L` inverts `W`, i.e., `W.IsInvertedBy (shiftFunctor C a ⋙ L)`. |
| `MorphismProperty.shift` | `lemma` — If `W f`, then `W (f⟦a⟧')` under compatibility. |
| `MorphismProperty.shiftLocalizerMorphism` | `abbrev` — The localizer morphism induced by shift: `LocalizerMorphism W W`, using `shiftFunctor C a`. |
| `HasShift.localized` | `noncomputable def` — Induces a shift on the localized category `D` along localization `L : C ⥤ D`, assuming `W` is compatible with shift. Uses `HasShift.induced`. |
| `Functor.CommShift.localized` | `noncomputable def` — Shows that the localization functor `L` commutes with shift (i.e., `L.CommShift A`) under compatibility. |
| `HasShift.localization` | `noncomputable instance` — Induced shift on `W.Localization` (the canonical localization). |
| `MorphismProperty.commShift_Q` | `noncomputable instance` — `Q : C ⥤ W.Localization` commutes with shift. |
| `HasShift.localization'` / `MorphismProperty.commShift_Q'` | Analogous to above, for `W.Localization'`. |
| `Functor.commShiftOfLocalization.iso` | `noncomputible def` — Natural isomorphism `shiftFunctor D a ⋙ F' ≅ F' ⋙ shiftFunctor E a`, used to lift shift compatibility through localization. |
| `Functor.commShiftOfLocalization` | `noncomputable def` — If `F = F' ∘ L` and `F` commutes with shift, then `F'` also commutes with shift. |
| `Functor.commShiftOfLocalization_iso_hom_app` / `iso_inv_app` | `lemma`s — Explicit formulas for components of the natural isomorphism. |
| `NatTrans.commShift_iso_hom_of_localization` | `instance` — The unit/counit isomorphism `Lifting.iso L W F F'.hom` commutes with shift. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `shift_`: e.g., `shiftFunctor`, `shiftLocalizerMorphism`, `shift`.
  - `commShift_`: e.g., `commShiftIso`, `commShiftOfLocalization`, `commShift_Q`.
  - `localized`: e.g., `HasShift.localized`, `Functor.CommShift.localized`.
  - `inverseImage`: used in compatibility condition.

- **Suffixes**:
  - `_app`: for components of natural transformations/isos at objects.
  - `_hom` / `_inv`: for hom/inv parts of isomorphisms.
  - `_ofLocalization`: for constructions factoring through localization.

- **Pattern**:
  - `X⟦a⟧` or `X⟦a⟧'`: denotes action of shift functor on object/morphism `X` by `a`.
  - `L.commShiftIso a`: the coherence isomorphism for `L` commuting with shift.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `conv_rhs => rw [...]` | Rewriting using definitions, especially `condition`, `iff`, `iso_hom_app`. |
| `simp only [...]` | Simplification with specific lemmas (e.g., `commShiftOfLocalization.iso_hom_app`, `map_comp`, `Category.assoc`). |
| `ext` / `ext1` / `natTrans_ext` | Extensionality for natural transformations; uses localization universal property (`natTrans_ext L W`). |
| `apply natTrans_ext L W` | Prove equality of natural transformations out of localized category. |
| `dsimp` | Simplify definitional equalities before `simp`. |
| `congr 1` + `rw [...]` | For proving equality of composites (e.g., in `add` case). |
| `erw [...]` | Rewrite using equations up to definitional equality (e.g., naturality). |
| `cancel_epi`, `cancel_monic` | Cancellation lemmas for morphisms (used in `add` proof). |
| `reassoc` / `simp [reassoc]` | Reassociation of compositions (used in `@[reassoc]` lemmas). |

---

### 🔹 **Proof Logic**

- **Structure of proofs**:
  - **Step 1**: Reduce to checking naturality or equality on objects in the image of `L` (via `natTrans_ext L W`).
  - **Step 2**: Use `simp` with `iso_hom_app`/`iso_inv_app` to expand definitions.
  - **Step 3**: Apply coherence laws for shift (e.g., `commShiftIso_zero`, `commShiftIso_add`), naturality, and associativity.
  - **Step 4**: Use categorical identities (`map_id`, `Category.id_comp`, `Iso.hom_inv_id_app`, etc.) to simplify.
  - **Induction-like reasoning**: For `add`, the proof uses a diagram chase with multiple applications of naturality and cancellation.

- **Key idea**:
  - Compatibility of `W` with shift ensures that shift functors descend to the localization.
  - Localization universal property allows lifting of shift structures and coherence data.

---

### 🔹 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Shift.Induced` | Defines `HasShift.induced`, `Functor.CommShift.ofInduced`, and related machinery. |
| `Mathlib.CategoryTheory.Localization.HasLocalization` | Provides `W.HasLocalization`, `W.Localization`, `W.Localization'`, and universal properties. |
| `Mathlib.CategoryTheory.Localization.LocalizerMorphism` | Defines `LocalizerMorphism`, used in `shiftLocalizerMorphism`. |

---

### 🔹 **Domain Summary**

This file formalizes the **compatibility of localization with shift functors** in category theory. It shows that if a morphism property `W` is invariant under shift (i.e., `W` is compatible with shift by monoid `A`), then:
- The localized category inherits a shift,
- The localization functor commutes with shift,
- Functors factoring through localization inherit shift compatibility.

This is foundational for homological algebra and derived categories, where localization (e.g., at quasi-isomorphisms) must respect shifts (e.g., cohomological degree).

--- 

Let me know if you'd like a **diagrammatic summary**, **proof sketch in natural language**, or **export to a DSL schema** for AI agent training.