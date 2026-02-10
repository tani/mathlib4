Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for domain-specific AI agent training:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `W` | `P : C → Prop → MorphismProperty C` | Defines the class of morphisms `f : X ⟶ Y` such that precomposition with `f` induces bijections on hom-sets into all `P`-local objects. |
| `W.homEquiv` | `W P f → P Z → (Y ⟶ Z) ≃ (X ⟶ Z)` | Constructs the explicit equivalence of hom-sets induced by `f` when `f ∈ W P` and `Z` is `P`-local. |
| `W_isoClosure` | `W (isoClosure P) = W P` | Shows that `W` is invariant under taking isomorphism closures of the predicate `P`. |
| `W_of_isIso` | `[IsIso f] → W P f` | Every isomorphism lies in `W P`, regardless of `P`. |
| `W_iff_isIso` | `P X → P Y → (W P f ↔ IsIso f)` | When both domain and codomain are `P`-local, `f ∈ W P` iff `f` is an isomorphism. |
| `W_adj_unit_app` | `W (· ∈ Set.range F.obj) (adj.unit.app X)` | The unit of an adjunction `G ⊣ F` (with `F` fully faithful) lies in `W` for the predicate “being in the essential image of `F`”. |
| `W_iff_isIso_map` | `W (· ∈ Set.range F.obj) f ↔ IsIso (G.map f)` | Characterizes `W`-morphisms via their image under `G`. |
| `W_eq_inverseImage_isomorphisms` | `W (· ∈ Set.range F.obj) = isomorphisms⁻¹[G]` | The `W`-class equals the inverse image under `G` of the class of isomorphisms in `C`. |
| `isLocalization` | `G.IsLocalization (W (· ∈ Set.range F.obj))` | `G` is a localization functor for the class `W` defined from the essential image of `F`. |

---

### 🔹 **Naming Conventions**

- **Predicate-based classes**: `W P` — `W` is parameterized by a predicate `P`.
- **Property names**:
  - `W_isoClosure`: property of being closed under isomorphism closure.
  - `W_of_isIso`: inclusion of isomorphisms in `W`.
  - `W_iff_isIso`: equivalence under local objects.
- **Adjoint-related lemmas**:
  - `W_adj_unit_app`: unit of adjunction lies in `W`.
  - `W_iff_isIso_map`: relation between `W` and `G`-image being iso.
  - `W_eq_inverseImage_isomorphisms`: equality of `W` with inverse image of isos.
- **Suffixes**:
  - `_app`: for components of natural transformations (e.g., `unit.app X`).
  - `_iff_`: for biconditional characterizations.
  - `_inverseImage`: for morphism property pullbacks.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: for automated reasoning with rewrite rules and simplification.
- `simp only [...]`: precise simplification using `reassoc_of%`, `comp_id`, etc.
- `rw [...]`: rewriting using naturality, adjunction laws, and definitions.
- `convert ... using 1`: for flexible congruence-based proof construction.
- `intro`, `constructor`, `apply`, `exact`: standard intro/elimination.
- `dsimp`: definitional simplification (especially in adjunction contexts).
- `infer_instance`: to discharge typeclass goals.

---

### 🔹 **Proof Logic**

- **Structure of proofs**:
  - Most lemmas follow a **two-way implication** (`↔`) or **equality of morphism properties** pattern.
  - Proofs often reduce to:
    - Verifying bijectivity of precomposition maps.
    - Using properties of adjunctions (unit, hom-equiv, naturality).
    - Leveraging fully faithfulness of `F` (e.g., `IsIso (G.map f)` ↔ `f` in `W`).
  - Key logical steps:
    - Use `W_iff_isIso` to reduce to isomorphism checking when objects are `P`-local.
    - Use `W_isoClosure` to ignore isomorphism-closed variants of `P`.
    - Use `Functor.FullyFaithful.ofFullyFaithful F` to lift equivalences.

- **Inductive or structural?**  
  Not inductive — mostly algebraic/category-theoretic reasoning using universal properties and adjunctions.

---

### 🔹 **Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.ClosedUnderIsomorphisms`: for `isoClosure`.
- `Mathlib.CategoryTheory.MorphismProperty.Composition`: for `MorphismProperty`, multiplicative, 2-out-of-3.
- `Mathlib.CategoryTheory.Localization.Adjunction`: for `IsLocalization`, adjunction-based localization.

**Scope**:
- Formalizes **left Bousfield localization** in the categorical setting (not model categories yet).
- Focuses on **localization functors** induced by adjunctions with fully faithful left adjoints.
- Connects `W`-classes (local equivalences) to inverse images of isomorphisms.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch for `isLocalization`**, or a **mapping to nLab references**.