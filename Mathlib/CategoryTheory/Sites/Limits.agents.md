Here's a structured technical metadata summary of the provided Lean 4 file, extracted for use in building a Domain-Specific AI Agent focused on category theory (especially sheaf theory and limits/colimits):

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `multiforkEvaluationCone` | `Π (F : K ⥤ Sheaf J D) (E : Cone (F ⋙ sheafToPresheaf J D)) (X : C) (W : J.Cover X) (S : Multifork (W.index E.pt)), Cone (F ⋙ sheafToPresheaf J D ⋙ evaluation Cᵒᵖ D (op X))`<br>Constructs a cone in `D` from a multifork over a covering, used to relate sheaf conditions to limits in `D`. |
| `isLimitMultiforkOfIsLimit` | `Π (F : K ⥤ Sheaf J D) (E : Cone (F ⋙ sheafToPresheaf J D)) (hE : IsLimit E) (X : C) (W : J.Cover X), IsLimit (W.multifork E.pt)`<br>Shows that if a cone is a limit at the presheaf level, then it satisfies the multifork sheaf condition. |
| `isSheaf_of_isLimit` | `Π (F : K ⥤ Sheaf J D) (E : Cone (F ⋙ sheafToPresheaf J D)) (hE : IsLimit E), Presheaf.IsSheaf J E.pt`<br>Proves that a limit presheaf of sheaves is again a sheaf. |
| `createsLimitOfReflectsIso` (instance) | `CreatesLimit F (sheafToPresheaf J D)`<br>Shows the forgetful functor `sheafToPresheaf` creates limits by verifying the lifting condition via `isSheaf_of_isLimit`. |
| `createsLimitsOfShape` (instance) | `CreatesLimitsOfShape K (sheafToPresheaf J D)`<br>Extends the above to all shapes `K`. |
| `hasLimitsOfShape` (instance) | `HasLimitsOfShape K (Sheaf J D)`<br>Consequence: `Sheaf J D` has limits of shape `K` if `D` does. |
| `sheafifyCocone` | `Π (F : K ⥤ Sheaf J D) (E : Cocone (F ⋙ sheafToPresheaf J D)), Cocone F`<br>Constructs a cocone of sheaves by sheafifying the cocone point of a presheaf cocone. |
| `isColimitSheafifyCocone` | `Π (F : K ⥤ Sheaf J D) (E : Cocone (F ⋙ sheafToPresheaf J D)) (hE : IsColimit E), IsColimit (sheafifyCocone E)`<br>Shows that sheafifying a colimit cocone of presheaves yields a colimit cocone of sheaves. |
| `hasColimitsOfShape` (instance) | `HasColimitsOfShape K (Sheaf J D)`<br>Consequence: `Sheaf J D` has colimits of shape `K` if `D` does. |
| `createsColimitOfIsSheaf` | `(∀ c, IsColimit c → Presheaf.IsSheaf J c.pt) → CreatesColimit F (sheafToPresheaf J D)`<br>A conditional creation result: if colimits of presheaves over sheaves are sheaves, then the forgetful functor creates those colimits. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit*`, `isColimit*`: Prove that a (co)cone is (co)limit.
  - `multifork*`, `sheafify*`: Related to sheaf condition and sheafification.
  - `creates*`: Prove that a functor creates (co)limits.
  - `has*`: Prove existence of (co)limits.

- **Suffixes**:
  - `OfShape`: Parameterized by diagram shape `K`.
  - `OfSize`: Parameterized by universe bounds (`u₁, u₂`).
  - `OfIsSheaf`, `OfIsLimit`: Derived from assumptions about sheafness or (co)limitness.

- **Other patterns**:
  - `presheafToSheaf`, `sheafToPresheaf`: Forgetful and inclusion functors.
  - `evaluation Cᵒᵖ D`: Evaluation functor at an object.
  - `asIso (sheafificationAdjunction ...).counit`: Uses adjunction unit/counit isomorphisms.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat`: For categorical reasoning (commutativity, naturality).
- `rw`, `erw`: Rewriting with definitional equalities and naturality squares.
- `dsimp`, `simp`: Simplification, especially for hom-valued components.
- `ext1`, `ext`: Extensionality for morphisms (e.g., sheaf morphisms).
- `congr 1`: Congruence for function extensionality.
- `apply ... hom_ext`: Sheaf morphism extensionality (via `Presheaf.IsSheaf.hom_ext`).
- `rfl`: Reflexivity for definitional equalities.
- `intro`, `cases`, `exact`: Basic proof structure.

---

### **4. Proof Logic**

- **Limits**:
  1. Assume `E` is a limit cone of presheaves over a diagram of sheaves.
  2. Show `E.pt` satisfies the sheaf condition (via multiforks).
  3. Conclude `E.pt` is a sheaf → lift the cone to `Sheaf J D`.
  4. Verify the lifted cone is a limit using `createsLimitOfReflectsIso`.

- **Colimits**:
  1. Start with a colimit cocone `E` of presheaves over sheaves.
  2. Sheafify the cocone point: `sheafifyCocone E`.
  3. Use preservation of colimits by sheafification (`isColimitSheafifyCocone`).
  4. Conclude existence of colimits in `Sheaf J D`.

- **General pattern**:
  - Use forgetful functor `sheafToPresheaf` to reduce to `D`.
  - Lift or reflect structure (limits/colimits) using universal properties.
  - Leverage adjunctions (`sheafificationAdjunction`) and universal properties of multiforks.

---

### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Creates` | Formalism for “creates (co)limits” (`CreatesLimit`, `CreatesColimit`). |
| `Mathlib.CategoryTheory.Sites.Sheafification` | Sheafification functor and its adjunction with inclusion. |
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Finite products as a special case of limits. |

**Core infrastructure used**:
- `Presheaf`, `Sheaf`, `GrothendieckTopology`, `Multifork`, `IsSheaf`.
- `evaluation`, `sheafificationAdjunction`, `presheafToSheaf`, `sheafToPresheaf`.
- `HasLimitsOfShape`, `HasColimitsOfShape`, `CreatesLimitsOfSize`.

---

Let me know if you'd like this exported as JSON or YAML for ingestion into an AI agent pipeline.