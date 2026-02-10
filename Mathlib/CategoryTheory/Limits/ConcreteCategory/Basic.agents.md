### Technical Brief: `CategoryTheory.Limits.Concrete` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `small_sections_of_hasLimit` | `{C : Type u} [Category C] [ConcreteCategory C] [(forget C).IsCorepresentable] {J : Type w} [Category J] (G : J ⥤ C) [HasLimit G] → Small (G ⋙ forget C).sections` | Shows that sections of a diagram into a concrete category are small when the forgetful functor is corepresentable and the limit exists. |
| `to_product_injective_of_isLimit` | `{F : J ⥤ C} [PreservesLimit F (forget C)] {D : Cone F} (hD : IsLimit D) → Function.Injective (fun x j ↦ D.π.app j x)` | Injectivity of the cone point into the product over the diagram, under preservation of limits by `forget`. |
| `isLimit_ext` | `(hD : IsLimit D) → (∀ j, D.π.app j x = D.π.app j y) → x = y` | Extensionality of cone points: equal projections imply equal points. |
| `limit_ext` | `[HasLimit F] → (∀ j, limit.π F j x = limit.π F j y) → x = y` | Extensionality for limits: equality of all components implies equality of limit elements. |
| `surjective_π_app_zero_of_surjective_map` | `[PreservesLimitsOfShape ℕᵒᵖ (forget C)] → IsLimit c → (∀ n, Surjective (F.map (homOfLE (Nat.le_succ n)).op)) → Surjective (c.π.app ⟨0⟩)` | Surjectivity of the 0-th projection in a sequential limit of surjections. |
| `from_union_surjective_of_isColimit` | `[PreservesColimit F (forget C)] → IsColimit D → Surjective (fun ⟨j, y⟩ ↦ D.ι.app j y)` | Surjectivity of the colimit cocone injection from the disjoint union. |
| `isColimit_exists_rep` | `IsColimit D → ∃ j y, D.ι.app j y = x` | Every point in a colimit cocone has a representative in some component. |
| `colimit_exists_rep` | `[HasColimit F] → ∃ j y, colimit.ι F j y = x` | Same as above, for colimits. |
| `isColimit_rep_eq_of_exists` | `∃ k f g, F.map f x = F.map g y → D.ι.app i x = D.ι.app j y` | Equality in colimit cocone follows from eventual equality in the diagram. |
| `colimit_rep_eq_of_exists` | `[HasColimit F] → same as above for colimit.ι` | Same as above, for colimits. |
| `isColimit_exists_of_rep_eq` *(Filtered)* | `IsColimit D → D.ι.app i x = D.ι.app j y → ∃ k f g, F.map f x = F.map g y` | Converse of `isColimit_rep_eq_of_exists` in filtered case. |
| `isColimit_rep_eq_iff_exists` *(Filtered)* | Equivalence between equality in cocone and eventual equality in diagram. | Characterizes equality in filtered colimits in concrete categories. |
| `colimit_exists_of_rep_eq`, `colimit_rep_eq_iff_exists` *(Filtered)* | Same as above for colimits. | Colimit analogues of filtered colimit characterizations. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit_`, `isColimit_`: Properties of (co)limits.
  - `limit_`, `colimit_`: Properties of actual (co)limit objects/cones.
  - `small_`, `surjective_`, `injective_`, `exists_`, `rep_eq_`: Describes the nature of the result.
- **Suffixes**:
  - `_of_hasLimit`, `_of_isLimit`, `_of_preserves`: Conditions or assumptions.
  - `_iff_exists`, `_ext`: Logical equivalences or extensionality principles.
- **`Concrete.` prefix**: All lemmas are in the `Concrete` namespace, indicating they relate to concrete categories.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `intro`, `exact`, `rw`, `refl`, `congrFun`, `congrArg`
  - `apply`, `have`, `suffices`, `obtain`, `let`, `change`
- **Category-theoretic automation**:
  - `infer_instance`: For typeclass resolution.
  - `simp_rw`: For rewriting using definitional equalities and naturality.
  - `funext`: For extensionality of functions.
  - `Subtype.ext`: For equality in subtypes (e.g., underlying type of a limit object).
  - `congrFun`: For extensionality of natural transformations / functions.
- **Typeclass-based reasoning**:
  - `isLimitOfPreserves`, `isColimitOfPreserves`: Leverage preservation assumptions.
  - `Types.*`: Refers to lemmas in `Mathlib.CategoryTheory.Limits.Types`, used to reduce to `Type`-valued diagrams.

---

#### **4. Proof Logic**

- **General pattern**:
  1. **Lift to `Type`** via `forget C`, using `mapCone`, `mapCocone`.
  2. **Preservation assumption** (`PreservesLimit`, `PreservesColimit`) gives equivalence of (co)limit structures.
  3. **Apply known lemmas** from `Mathlib.CategoryTheory.Limits.Types`, which handles limits/colimits in `Type`.
  4. **Transfer back** to `C` using isomorphisms (`conePointUniqueUpToIso`, etc.) and properties of `forget` (e.g., faithful, conservative).
- **Inductive/filtered cases**:
  - Use filteredness to connect equality in colimit to eventual equality in diagram.
  - Often rely on `Types.FilteredColimit.isColimit_eq_iff`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.ConcreteCategory.Basic` | Core definitions of concrete categories, `forget`, `coerce`, etc. |
| `Mathlib.CategoryTheory.Limits.Preserves.Basic` | Preservation of (co)limits by functors. |
| `Mathlib.CategoryTheory.Limits.TypesFiltered` | Limits/colimits in `Type`, especially filtered colimits. |
| `Mathlib.CategoryTheory.Limits.Yoneda` | Possibly used for corepresentability arguments (e.g., in `small_sections_of_hasLimit`). |

---

#### **Domain-Specific AI Agent Notes**

- **Focus area**: Formalization of categorical limits/colimits in concrete categories, especially interaction with forgetful functors.
- **Key reasoning patterns**:
  - Reduction to `Type` via `forget`.
  - Use of preservation assumptions to transfer (co)limit properties.
  - Extensionality and representation theorems for limits/colimits.
- **Common proof obligations**:
  - Prove injectivity/surjectivity of canonical maps.
  - Show equality of elements via projections/injections.
  - Use filteredness to connect equality to diagrammed witnesses.

Let me know if you'd like a tactic-level summary or a visualization of the proof dependencies.