### Technical Brief: Split Coequalizers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `IsSplitCoequalizer π` | `structure` | Encodes a *split coequalizer diagram*: morphisms `f, g : X ⟶ Y`, `π : Y ⟶ Z`, with sections `s : Z ⟶ Y`, `t : Y ⟶ X` satisfying: <br>• `f ≫ π = g ≫ π` <br>• `s ≫ π = 𝟙 Z` <br>• `t ≫ g = 𝟙 Y` <br>• `t ≫ f = π ≫ s` |
| `IsSplitCoequalizer.map q F` | `def` | Shows *absoluteness*: any functor `F : C ⥤ D` preserves split coequalizers. Constructs `IsSplitCoequalizer (F.map f) (F.map g) (F.map π)` from `q` and `F`. |
| `IsSplitCoequalizer.asCofork t` | `def` | Converts a split coequalizer `t` into a cofork over `f, g`. Uses `Cofork.ofπ h t.condition`. |
| `IsSplitCoequalizer.isCoequalizer t` | `def` | Proves that any split coequalizer is a *coequalizer*: constructs `IsColimit (asCofork t)`. Justifies the name. |
| `HasSplitCoequalizer` | `class Prop` | States that pair `f, g` has *some* split coequalizer: `∃ Z, h : Y ⟶ Z, Nonempty (IsSplitCoequalizer f g h)`. |
| `Functor.IsSplitPair G f g` | `abbrev` | Says `G f, G g` has a split coequalizer in `D`. |
| `HasSplitCoequalizer.coequalizerOfSplit` | `noncomputable def` | Extracts the coequalizer object from the typeclass. |
| `HasSplitCoequalizer.coequalizerπ` | `noncomputable def` | Extracts the coequalizer morphism `Y ⟶ Z`. |
| `HasSplitCoequalizer.isSplitCoequalizer` | `noncomputable def` | Extracts a concrete split coequalizer structure from the typeclass. |
| `hasCoequalizer_of_hasSplitCoequalizer` | `instance` | Shows existence of coequalizers when split coequalizers exist. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `IsSplitCoequalizer.`: for properties/constructors related to a *specific* split coequalizer diagram.
  - `HasSplitCoequalizer.`: for typeclass-based existence and extraction.
  - `Functor.`: for functorial conditions (`IsSplitPair`).
- **Suffixes**:
  - `_π`: for the coequalizer morphism (`coequalizerπ`).
  - `_bottom`, `_top`: for section conditions involving `g` and `f` (`leftSection_bottom`, `leftSection_top`).
  - `_assoc`: used in `rw` lemmas for associativity normalization (e.g., `leftSection_top_assoc`).
- **Structure fields**:
  - `rightSection`, `leftSection`: named for their role as sections of `π` and `g`, respectively.
  - `condition`: the coequalizing equation `f ≫ π = g ≫ π`.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: heavily used in `structure` proofs to discharge simple categorical equalities (e.g., `condition`, `rightSection_π`, etc.).
- **`rw [...]`**: standard for rewriting using lemmas like `map_comp`, `map_id`, and structure field equalities.
- **`simp` / `dsimp`**: used in `isCoequalizer` to simplify expressions using `leftSection_top`, `leftSection_bottom`, etc.
- **` Classical.choice`**: used in noncomputable definitions to extract witnesses from existential proofs.
- **`by aesop_cat`**: default tactic for structure field proofs — indicates heavy reliance on category-theoretic simplification.

---

#### **4. Proof Logic**

- **Structure proofs**: rely on `aesop_cat` to verify all commuting diagrams automatically.
- **Main theorem (`isCoequalizer`)**:
  - Constructs a cocone morphism using `rightSection ≫ s.π`.
  - Uses `leftSection_top_assoc` and `leftSection_bottom_assoc` to verify commutativity.
  - Uses `simp` to show uniqueness (via `← hm`).
- **Absoluteness (`map`)**:
  - Applies `F.map` to all structure fields.
  - Uses `← F.map_comp`, `F.map_id`, and original equalities to reprove conditions.
- **Typeclass reasoning**:
  - `HasSplitCoequalizer` → existential witness → ` Classical.choice` → concrete structure.
  - `map_is_split_pair` instance: lifts split coequalizerness along functors via `IsSplitCoequalizer.map`.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Equalizers
  ```
  - Indicates this file builds on general limit/colimit infrastructure.
  - Uses `Limits` namespace (e.g., `Cofork`, `IsColimit`, `HasCoequalizer`).

- **Scope**:
  - Works in a general category `C` (locally small, implicitly).
  - Relies on universe polymorphism (`universe v v₂ u u₂`).
  - Designed for application to **monadicity theorems**, especially Beck’s monadicity criterion.

---

### Summary

This file formalizes *split coequalizers* — a robust, functor-preserving variant of coequalizers — and shows they are absolute and imply ordinary coequalizers. It provides both *constructive* (via `IsSplitCoequalizer`) and *typeclass-based* (`HasSplitCoequalizer`) interfaces, with proofs automated using `aesop_cat`. The structure is aligned with `Mathlib`’s categorical limits infrastructure and supports higher-level applications like monadicity.