### Technical Brief: Morphism Properties in Lean 4 (CategoryTheory.MorphismProperty)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MorphismProperty C` | `∀ ⦃X Y : C⦄ (_ : X ⟶ Y), Prop` | A class of morphisms in category `C`. |
| `RespectsLeft P Q` | `class` | `P` is stable under precomposition with `Q`-morphisms: `P f ∧ Q i ⇒ P (i ≫ f)`. |
| `RespectsRight P Q` | `class` | `P` is stable under postcomposition with `Q`-morphisms: `P f ∧ Q i ⇒ P (f ≫ i)`. |
| `Respects P Q` | `class` | `P` respects `Q` on both sides (extends `RespectsLeft` and `RespectsRight`). |
| `RespectsIso P` | `abbrev` | `P.Respects (isomorphisms C)` — stability under isomorphisms. |
| `isoClosure P` | `def` | Smallest `RespectsIso`-property containing `P`: `∃ f' ∈ P, Arrow.mk f' ≅ Arrow.mk f`. |
| `isomorphisms C` | `def` | Morphism property of isomorphisms: `IsIso f`. |
| `monomorphisms C` | `def` | Morphism property of monomorphisms: `Mono f`. |
| `epimorphisms C` | `def` | Morphism property of epimorphisms: `Epi f`. |
| `inverseImage P F` | `def` | Pullback of `P` along functor `F`: `P (F.map f)`. |
| `map P F` | `def` | Pushforward of `P` along `F`, up to arrow isomorphism: `∃ f' ∈ P, F.map f' ≅ f`. |
| `prod W₁ W₂` | `def` | Product morphism property on `C₁ × C₂`. |
| `pi W` | `def` | Pointwise morphism property on `∀ j, C j`. |
| `functorCategory W J` | `def` | Objectwise morphism property on functor category `J ⥤ C`. |
| `arrow W` | `def` | Morphism property on `Arrow C`: `W f.left ∧ W f.right`. |

**Key Theorems:**
- `isoClosure_eq_iff`: `P.isoClosure = P ↔ P.RespectsIso`.
- `cancel_left_of_respectsIso`: If `P.RespectsIso`, then `P (f ≫ g) ↔ P g` when `f` is iso.
- `arrow_mk_iso_iff`: For `RespectsIso P`, `P f ↔ P g` if `Arrow.mk f ≅ Arrow.mk g`.
- `map_id_eq_isoClosure`: `P.map (𝟭 _) = P.isoClosure`.
- `map_inverseImage_eq_of_isEquivalence`: If `F` is an equivalence, `(P.inverseImage F).map F = P`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: Denotes standard categorical properties (`isomorphisms`, `monomorphisms`, `epimorphisms`).
  - `Respects[Left|Right]`: Stability under composition.
  - `isoClosure`: Closure under isomorphism of arrows.
  - `inverseImage`, `map`: Functorial operations on morphism properties.
  - `prod`, `pi`, `functorCategory`, `arrow`: Construction of new properties from existing ones.

- **Suffixes:**
  - `_iff`: Equivalence lemmas (e.g., `isomorphisms.iff`, `arrow_mk_iso_iff`).
  - `_app`: For natural transformations (e.g., `isIso_app_iff_of_iso`).
  - `op`, `unop`: Duality operations on morphism properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplify using definitional equalities and lemmas (e.g., `simp only [top_eq]`, `simp only [monomorphisms.iff]`).
- `rw`: Rewrite using equivalences or definitions.
- `exact`, `refine`: Construct proofs directly or with holes.
- `apply`: Apply lemmas or instances (e.g., `apply mono_comp`, `apply epi_comp`).
- `intro`, `cases`, `obtain`: Intro assumptions, decompose conjunctions, extract witnesses.
- `funext`: Extensionality for functions (e.g., in `ext` lemma).
- `apply le_antisymm`: Prove equality by double inequality.
- `erw`: Rewrite using definitional equalities (e.g., in equivalence-based lemmas).
- `aesop`: Used implicitly in many `instance` proofs (e.g., `RespectsIso.isomorphisms`).

---

#### **4. Proof Logic**

- **Inductive/Structural Reasoning**: Proofs often proceed by:
  - Unfolding definitions (`rw`, `simp`).
  - Constructing witnesses for existential statements (e.g., `isoClosure`).
  - Using universal properties (e.g., `ext`, `le_antisymm`).
- **Duality**: Many lemmas come in dual pairs (`op`/`unop`), with proofs mirroring each other.
- **Equivalence Handling**: When functors are equivalences, proofs use unit/counit isomorphisms and `Functor.mapArrowFunctor`.
- **Stability Properties**: `RespectsIso` proofs often use `RespectsIso.mk` with two subgoals (pre/post composition), or `of_respects_arrow_iso` for arrow-based stability.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Comma.Arrow`: Provides `Arrow`, `Comma`, and related isomorphism machinery.
- `Mathlib.Order.CompleteBooleanAlgebra`: Enables `CompleteBooleanAlgebra` instance for `MorphismProperty`, supporting lattice operations (`⊤`, `⊓`, etc.).

---

This module formalizes a foundational framework for reasoning about *classes of morphisms* and their *stability under composition*, especially with respect to isomorphisms. It is designed for reuse across categorical constructions (e.g., factorization systems, weak factorization systems, model structures), where stability under isomorphism and composition is essential.