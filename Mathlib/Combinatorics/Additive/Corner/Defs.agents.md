### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsCorner` | `structure IsCorner (A : Set (G × G)) (x₁ y₁ x₂ y₂ : G) : Prop` | Defines a *corner* in a set `A ⊆ G × G` as a quadruple of points satisfying membership and additive consistency (`x₁ + y₂ = x₂ + y₁`). |
| `IsCornerFree` | `def IsCornerFree (A : Set (G × G)) : Prop` | A set `A` is *corner-free* if every corner in `A` is trivial, i.e., `x₁ = x₂`. |
| `isCornerFree_iff` | `lemma isCornerFree_iff (hAs : A ⊆ s ×ˢ s)` | Equivalence between corner-freeness of `A` and the condition that no nontrivial corner lies in the ambient product `s ×ˢ s`. |
| `IsCorner.mono` | `lemma IsCorner.mono (hAB : A ⊆ B)` | Monotonicity of corners: if `A ⊆ B`, then any corner in `A` is also a corner in `B`. |
| `IsCornerFree.mono` | `lemma IsCornerFree.mono (hAB : A ⊆ B)` | Monotonicity of corner-freeness: if `B` is corner-free, then so is any subset `A ⊆ B`. |
| `not_isCorner_empty` | `@[simp] lemma not_isCorner_empty` | The empty set contains no corners. |
| `Set.Subsingleton.isCornerFree` | `lemma Set.Subsingleton.isCornerFree (hA : A.Subsingleton)` | Any subsingleton set is corner-free. |
| `isCornerFree_empty`, `isCornerFree_singleton` | `lemma`s | Immediate corollaries: `∅` and singletons are corner-free. |
| `IsCorner.image` | `lemma IsCorner.image (hf : IsAddFreimanHom 2 s t f)` | Corners are preserved under `2`-Freiman homomorphisms (via image). |
| `IsCornerFree.of_image` | `lemma IsCornerFree.of_image (hf : IsAddFreimanHom 2 s t f)` | If the image under a `2`-Freiman homomorphism is corner-free and `f` is injective on `s`, then the original set is corner-free. |
| `isCorner_image` | `lemma isCorner_image (hf : IsAddFreimanIso 2 s t f)` | Equivalence of corner existence under `2`-Freiman isomorphisms (bijective homomorphisms). |
| `isCornerFree_image` | `lemma isCornerFree_image (hf : IsAddFreimanIso 2 s t f)` | Equivalence of corner-freeness under `2`-Freiman isomorphisms. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isCornerFree_`: for properties/lemmas about corner-free sets.
  - `isCorner_`: for lemmas about the `IsCorner` predicate.
  - `not_isCorner_`: for negated corner existence.
- **Suffixes**:
  - `_iff`: for equivalences (↔).
  - `_image`: for behavior under image maps.
  - `_mono`: for monotonicity lemmas.
- **Structure naming**:
  - `IsCorner`: predicate structure (not a proposition, but a structure with fields).
  - `IsCornerFree`: predicate definition.

#### 3. **Tactic Stack**

- `simp +contextual only [...]`: used in `isCornerFree_image` for localized simplification with contextual knowledge.
- `rw [...]`: rewriting using equivalences.
- `congr!`: used to reduce congruence goals to subgoals on components.
- `exact ...`: direct proof construction.
- `by simpa using ...`: simplifying using a hypothesis.
- `obtain ⟨...⟩ := hA`: destructuring conjunctions/structures.
- `subset`/`mem_image_of_mem`: basic set-theoretic reasoning.

#### 4. **Proof Logic**

- **Structure-based reasoning**: proofs often destruct `IsCorner` into its four components (`fst_fst_mem`, `fst_snd_mem`, `snd_fst_mem`, `add_eq_add`).
- **Monotonicity arguments**: rely on lifting membership and equality via subset inclusions.
- **Image-based reasoning**: leverages properties of `IsAddFreimanHom`/`IsAddFreimanIso`, especially:
  - Preservation of sums (`add_eq_add`)
  - Injectivity/surjectivity for equivalence of corner existence.
- **Equivalence proofs** (`isCornerFree_image`, `isCornerFree_iff`):
  - Use `isCornerFree_iff` to reduce to element-wise reasoning.
  - Apply `isCorner_image` to translate corner existence across isomorphisms.
  - Use injectivity to lift equality back to the domain.

#### 5. **Imports**

- `Mathlib.Combinatorics.Additive.FreimanHom`: provides the core theory of Freiman homomorphisms and isomorphisms (`IsAddFreimanHom`, `IsAddFreimanIso`, their properties like `add_eq_add`, `bijOn`, `injOn`, `mapsTo`).

This module sits at the intersection of additive combinatorics and formalized set theory, with heavy reliance on structure-based reasoning and homomorphism preservation properties.