Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Pseudofunctors from Locally Discrete Bicategories**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pseudofunctorOfIsLocallyDiscrete` | `{B C : Type*} [Bicategory B] [IsLocallyDiscrete B] [Bicategory C] → (obj : B → C) → (map : ∀ {b b'}, b ⟶ b' → obj b ⟶ obj b') → (mapId : ∀ b, map (𝟙 b) ≅ 𝟙 _) → (mapComp : ∀ f g, map (f ≫ g) ≅ map f ≫ map g) → (3 coherence laws) → Pseudofunctor B C` | Constructs a pseudofunctor from a *locally discrete* bicategory `B`, where all 2-cells are identities, so the `map₂` component is uniquely determined and need not be supplied. |
| `oplaxFunctorOfIsLocallyDiscrete` | Similar to above, but outputs `OplaxFunctor B C` | Same as above, but for oplax functors (weaker than pseudofunctors: structure maps are not required to be isos). |
| `Functor.toPseudofunctor` | `(F : I ⥤ B) [Category I] [Bicategory B] [Strict B] → Pseudofunctor (LocallyDiscrete I) B` | Promotes a 1-categorical functor `F : I → B` (with `B` strict) to a pseudofunctor on the locally discrete bicategory associated to `I`. |
| `Functor.toOplaxFunctor` | Same context, outputs `OplaxFunctor (LocallyDiscrete I) B` | Same as above, but for oplax functors. |
| `LocallyDiscrete.mkPseudofunctor` | `{B₀ C : Type*} [Category B₀] [Bicategory C] → (obj : B₀ → C) → (map : ∀ f, obj _ ⟶ obj _) → coherence data → Pseudofunctor (LocallyDiscrete B₀) C` | Specialized constructor when the source is explicitly `LocallyDiscrete B₀`, avoiding the need to pass `IsLocallyDiscrete` explicitly. |

All constructors rely on the fact that in a locally discrete bicategory, **every 2-cell is an identity**, so:
- `map₂` (the coherence map for composition of 1-cells) is uniquely determined as `eqToHom` of a trivial equality.
- Coherence axioms reduce to equalities provable by `aesop_cat` (a tactic for bicategorical reasoning).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `pseudofunctorOfIsLocallyDiscrete`, `oplaxFunctorOfIsLocallyDiscrete`: indicate construction *from* a locally discrete source.
  - `mkPseudofunctor`: “maker” pattern for constructing pseudofunctors in the `LocallyDiscrete` namespace.
  - `toPseudofunctor`, `toOplaxFunctor`: “promotion” pattern (functor → pseudofunctor/oplax functor).

- **Suffixes**:
  - `mapId`, `mapComp`: standard for structure maps (identity, composition).
  - `map₂_associator`, `map₂_left_unitor`, `map₂_right_unitor`: coherence conditions for pseudofunctors/oplax functors (named after bicategorical unitors/associator).

- **Notable patterns**:
  - Use of `eqToHom`, `eqToIso`: to convert equalities to isomorphisms/homs in bicategories.
  - Use of `.hom`, `.inv`: for components of isomorphisms.
  - Use of `△` (`▸`) and `◁` (`◁`) for horizontal whiskering.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Dominant tactic used in all coherence proofs — a specialized tactic for bicategorical/simplicial reasoning, combining `aesop` with category-theoretic simplifiers.
- **`simp`**: Used in `by simp` goals (e.g., to simplify identities like `map (𝟙 b) = 𝟙`).
- **`obtain rfl := obj_ext_of_isDiscrete φ`**: Pattern to exploit local discreteness: any 2-cell `φ` is equal to `𝟙`, so `rfl`-elimination simplifies goals.
- **`dsimp`**: Used in `map₂` definitions to simplify definitional equalities.

---

#### **4. Proof Logic**

- **Core strategy**:
  1. **Exploit local discreteness**: Any 2-cell `φ : f ⇒ g` satisfies `f = g` and `φ = 𝟙_f`, so `obtain rfl := obj_ext_of_isDiscrete φ` reduces goals to trivial equalities.
  2. **Reduce coherence laws to equalities**: Since all 2-cells are identities, the pentagon/triangle identities become equalities of 1-cells (up to `eqToHom`), provable by simplification.
  3. **Use `eqToHom`/`eqToIso`**: Convert trivial equalities (e.g., `f = f`) into required isomorphisms/homs in bicategories.

- **Typical proof flow**:
  ```lean
  obtain rfl := obj_ext_of_isDiscrete η
  simp
  ```
  or for coherence:
  ```lean
  aesop_cat  -- automatically discharges all bicategorical coherence conditions
  ```

- **Induction is not used** — the arguments are purely definitional and rely on extensionality of 2-cells.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Bicategory.Functor.Pseudofunctor`: defines `Pseudofunctor`, `OplaxFunctor`, and their structure.
  - `Mathlib.CategoryTheory.Bicategory.LocallyDiscrete`: defines `IsLocallyDiscrete`, `LocallyDiscrete B₀`, and related lemmas.

- **Domain scope**:
  - Bicategorical category theory (strict and non-strict bicategories).
  - Interaction between 1-category theory (`Category I`) and 2-category theory (`Bicategory B`).
  - Special focus on *locally discrete* bicategories (i.e., bicategories with no non-identity 2-cells), which are essentially categories viewed as bicategories.

---

Let me know if you'd like a diagrammatic summary or a formalized lemma list for downstream AI agent training.