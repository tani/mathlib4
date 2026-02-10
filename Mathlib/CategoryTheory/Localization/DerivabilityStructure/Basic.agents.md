Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LocalizerMorphism.IsRightDerivabilityStructure` | A class asserting that a localizer morphism `Φ : W₁ ⟶ W₂` has right resolutions and induces a Guitart-exact square with respect to localizations `L₁, L₂`. |
| `isRightDerivabilityStructure_iff` | Equivalence: `Φ` is a right derivability structure iff the square induced by *any* localization functors `L₁, L₂` and induced `F` is Guitart exact. Shows independence of the choice of localization. |
| `guitartExact_of_isRightDerivabilityStructure'` | Extracts Guitart exactness of the square for arbitrary `L₁, L₂, F` from the structure. |
| `guitartExact_of_isRightDerivabilityStructure` | Special case of the above for the canonical localization functors `W₁.Q`, `W₂.Q`. |
| `LocalizerMorphism.id.hasRightResolutions` | Instance: identity localizer morphism has right resolutions when `W₁` contains identities. |
| `LocalizerMorphism.id.isRightDerivabilityStructure` | Instance: identity localizer morphism is a right derivability structure under same assumption. |

---

### **2. Naming Conventions**

- **Class names**: `IsRightDerivabilityStructure` — follows Lean/Mathlib convention of `IsX` for properties/structures.
- **Lemma names**:
  - `isRightDerivabilityStructure_iff`: uses `_iff` for equivalence lemmas.
  - `guitartExact_of_…`: uses `of_…` to indicate derivation *from* a hypothesis.
  - `catCommSq`: short for “commuting square of functors”.
  - `localizedFunctor`: induced functor on localized categories.
  - `liftNatIso`, `compUniqFunctor`, `uniq`: from `Localization` module — standard localization machinery.
- **Variable names**:
  - `Φ`, `e`, `e'`, `e''`, `e'''`: typical for morphisms and isomorphisms in category theory.
  - `L₁`, `L₂`, `F`: standard for localization and induced functors.

---

### **3. Tactic Stack**

- **`rw`**: heavily used for rewriting using equivalences and definitions.
- **`simp` / `simp only`**: simplification with specific lemmas (e.g., `Functor.comp_obj`, `Iso.inv_hom_id_app`, `NatTrans.comp_app`).
- **`ext`**: extensionality for natural transformations / functors.
- **`dsimp`**: definitional simplification (e.g., unfolding `catCommSq`, `liftNatIso`, etc.).
- **`erw`**: rewriting with definitional equality (used for subtle rewrites involving `rfl` proofs).
- **`exact` / `inferInstance`**: for applying instances or constructing proofs directly.

---

### **4. Proof Logic**

- **Main proof strategy**:
  - Reduce the definition (using canonical localizations `W₁.Q`, `W₂.Q`) to arbitrary localizations via uniqueness of localization (`uniq`, `compUniqFunctor`).
  - Use naturality and coherence of isomorphisms (`isoWhiskerLeft`, `isoWhiskerRight`, `Functor.associator`) to relate different incarnations of the square.
  - Apply known characterizations of Guitart exactness (e.g., `TwoSquare.guitartExact_id`, `TwoSquare.GuitartExact.vComp'_iff_of_equivalences`).
- **Inductive/structural reasoning**:
  - No explicit induction; relies on universal properties of localization and pasting of natural isomorphisms.
  - Proof of `isRightDerivabilityStructure_iff` is a chain of equivalences using:
    - Definition of the class,
    - Uniqueness of localization up to equivalence,
    - Compatibility of isomorphisms under composition (`vComp'`).

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Localization.Resolution` | Provides resolution machinery (e.g., `RightResolution`, `HasRightResolutions`, `localizedFunctor`). |
| `Mathlib.CategoryTheory.GuitartExact.VerticalComposition` | Provides `TwoSquare.GuitartExact`, vertical composition (`vComp'`), and exactness criteria. |

**Core theory areas involved**:
- Localization of categories at morphism classes.
- Guitart exact squares (a 2-categorical exactness condition).
- Derivability structures (Kahn–Maltsiniotis framework).

---

Let me know if you'd like a diagrammatic rendering of the Guitart exact square or a formalized summary of the TODO items.