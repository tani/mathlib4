Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Action of Bifunctors on Graded Objects**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mapBifunctor` | `GradedObject I C₁ ⥤ GradedObject J C₂ ⥤ GradedObject (I × J) C₃` | Constructs a functor from a bifunctor `F : C₁ ⥤ C₂ ⥤ C₃`, acting componentwise on graded objects over types `I`, `J`. |
| `mapBifunctorMapObj` | `GradedObject K C₃` (noncomputable) | Given `p : I × J → K`, constructs a `K`-graded object whose `k`-th component is the coproduct of `(F.obj (X i)).obj (Y j)` over all `⟨i, j⟩` with `p ⟨i, j⟩ = k`. Requires `HasMap` instance. |
| `ιMapBifunctorMapObj` | `(F.obj (X i)).obj (Y j) ⟶ mapBifunctorMapObj F p X Y k` | Canonical inclusion morphism into the coproduct component indexed by `⟨i, j⟩` where `p ⟨i, j⟩ = k`. |
| `mapBifunctorMapMap` | `mapBifunctorMapObj F p X₁ Y₁ ⟶ mapBifunctorMapObj F p X₂ Y₂` | Functorial action on morphisms: induced by `f : X₁ ⟶ X₂`, `g : Y₁ ⟶ Y₂`. |
| `mapBifunctorMapObjDesc` | `mapBifunctorMapObj F p X Y k ⟶ A` | Universal property of coproduct: constructs a morphism out of the `k`-th component by specifying components for each `⟨i, j⟩` with `p ⟨i, j⟩ = k`. |
| `mapBifunctorMapMapIso` | `mapBifunctorMapObj F p X₁ Y₁ ≅ mapBifunctorMapObj F p X₂ Y₂` | Isomorphism induced by isomorphisms `X₁ ≅ X₂`, `Y₁ ≅ Y₂`. |
| `mapBifunctorMap` | `GradedObject I C₁ ⥤ GradedObject J C₂ ⥤ GradedObject K C₃` | Full functorial extension of `mapBifunctorMapObj` over both arguments, assuming `HasMap` exists for all pairs. |
| `mapBifunctorMapObj_ext` | Extensionality lemma | Two morphisms out of `mapBifunctorMapObj F p X Y k` are equal if they agree on all inclusions `ιMapBifunctorMapObj`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `mapBifunctor*`: Core family of constructions related to mapping bifunctors through graded objects.
  - `ιMapBifunctorMapObj`: Canonical inclusion morphisms (Greek letter *ι* for injection/inclusion).
  - `mapBifunctorMap*`: Morphism-level actions (e.g., `map`, `iso`).
- **Suffixes**:
  - `Obj`: Refers to object-level construction (e.g., `mapBifunctorMapObj`).
  - `Map`: Refers to morphism-level construction (e.g., `mapBifunctorMapMap`).
  - `Desc`: Refers to universal property / descent morphism (e.g., `mapBifunctorMapObjDesc`).
- **`[HasMap ...]`**: Implicit argument class indicating existence of required coproducts / colimits.

#### **3. Tactic Stack**

- **`simp` / `reassoc`**: Heavily used for simplification and rewriting associativity of composition.
- **`ext`**: Used to prove equality of natural transformations / morphisms via extensionality.
- **`dsimp`**: Used in `mapBifunctorMap` to simplify definitions before `simp`.
- **`apply ...` / `intro` / `exact`**: Basic proof scripting for extensionality and universal properties.
- **`by ext; simp`**: Common pattern for proving isomorphism inverses.

#### **4. Proof Logic**

- **Structure**: Most proofs follow a standard pattern:
  1. **Extensionality**: Use `mapObj_ext` or `ext` to reduce to checking on components.
  2. **Component-wise verification**: Reduce to checking equations on each `ιMapBifunctorMapObj` (via `ι_mapBifunctorMapMap`, `ι_mapBifunctorMapObjDesc`, etc.).
  3. **Simplification**: Apply `simp` with `reassoc` attributes to handle naturality and associativity.
- **Key lemmas**:
  - `ι_mapBifunctorMapMap`: Commutativity of inclusion with morphism action.
  - `ι_mapBifunctorMapObjDesc`: Universal property of `descMapObj`.
  - `mapBifunctorMapObj_ext`: Extensionality for morphisms *into* the coproduct.

#### **5. Imports & Dependencies**

- **Core dependency**: `Mathlib.CategoryTheory.GradedObject`
- **Assumed structure**:
  - `Category C₁`, `Category C₂`, `Category C₃`
  - `HasMap` instances for coproducts (colimits over fibers of `p : I × J → K`)
  - Bifunctor `F : C₁ ⥤ C₂ ⥤ C₃`
- **Future use case**: Construction of monoidal structures on `GradedObject I C` when `p` is monoid multiplication and `F` is tensor product.

---

This module formalizes the categorical machinery needed to lift bifunctors to graded objects, especially for constructing monoidal structures on graded objects — a key step toward formalizing graded monoidal categories in Lean.