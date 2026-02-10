### Technical Metadata Brief: Four and Five Lemmas in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `mono_of_epi_of_mono_of_mono'` | `∀ {R₁ R₂ : ComposableArrows C 3} (φ : R₁ ⟶ R₂), ... → Mono (app' φ 2)` | Proves that in a morphism of 3-term composable arrows (i.e., length-3 complexes), if the leftmost map is epi and the middle and rightmost maps are mono, then the middle map is mono — under exactness assumptions on the source and target diagrams. |
| `mono_of_epi_of_mono_of_mono` | `∀ {R₁ R₂ : ComposableArrows C 3}, R₁.Exact → R₂.Exact → Epi (app' φ 0) → Mono (app' φ 1) → Mono (app' φ 3) → Mono (app' φ 2)` | Standard "mono version of the four lemma" for full exact sequences of length 4 (i.e., 3 non-zero maps). |
| `epi_of_epi_of_epi_of_mono'` | `∀ {R₁ R₂ : ComposableArrows C 3}, ... → Epi (app' φ 1)` | Dual "epi version of the four lemma": if left and middle maps are epi and rightmost is mono, then middle map is epi. |
| `epi_of_epi_of_epi_of_mono` | `∀ {R₁ R₂ : ComposableArrows C 3}, R₁.Exact → R₂.Exact → Epi (app' φ 0) → Epi (app' φ 2) → Mono (app' φ 3) → Epi (app' φ 1)` | Standard "epi version of the four lemma". |
| `isIso_of_epi_of_isIso_of_isIso_of_mono` | `∀ {R₁ R₂ : ComposableArrows C 4}, R₁.Exact → R₂.Exact → Epi (app' φ 0) → IsIso (app' φ 1) → IsIso (app' φ 3) → Mono (app' φ 4) → IsIso (app' φ 2)` | The **five lemma**: if the first map is epi, second and fourth are isos, and fifth is mono, then the third is iso. |
| `mono_of_epi_of_epi_mono'`, `mono_of_epi_of_epi_of_mono`, etc. | Various variants for `ComposableArrows C 2` | "Three lemmas" — special cases of four lemmas where one end is zero (e.g., degenerate complexes). |

> **Note**: All theorems are stated in terms of `ComposableArrows C n`, where `n` is the number of objects (i.e., `n=3` gives 3 objects and 2 maps — a 3-term complex; `n=4` gives 4 objects and 3 maps — a 4-term complex). The `app' φ i` notation refers to the component of the natural transformation `φ` at object `i`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mono_of_...`: proves that a map is monic.
  - `epi_of_...`: proves that a map is epic.
  - `isIso_of_...`: proves that a map is an isomorphism.
- **Suffixes**:
  - `'` (prime): usually indicates a more technical or refined version (e.g., with weaker exactness hypotheses or auxiliary constructions).
  - No `'` version is the "clean" version for full exact sequences.
- **Structure**:
  - Arguments list properties of `φ` in order of indices: `h₀` for index 0, `h₁` for index 1, etc.
  - Exactness assumptions often use `hR₁`, `hR₂`, sometimes with primes or subscripts like `hR₁'`, `hR₂'`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting naturality, zero morphism laws, associativity, exactness conditions. |
| `simp` / `simp only [...]` | Simplifying hom-sets, zero morphisms, functoriality. |
| `intro`, `apply`, `refine` | Standard proof structure. |
| `obtain ⟨...⟩` | Extracting data from existential statements (e.g., from exactness or surjectivity/mono properties). |
| `dsimp` | Simplifying definitions (especially for `app'`, `map'`, `exact_toComposableArrows`, etc.). |
| `infer_instance` | Automatically inferring class instances (e.g., `Epi`, `Mono`, `IsIso`). |
| `cancel_mono`, `cancel_epi` | Cancellation lemmas for monos/epis. |
| `sub_comp`, `add_comp`, `comp_sub`, `add_sub_cancel` | Arithmetic in preadditive categories (used in epi proofs involving subtraction/addition). |
| `set_option simprocs false` | Temporarily disables problematic simplifier procedures (see adaptation note). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Use *exactness* to lift elements/morphisms through the diagram.
  - Apply *naturality* to commute squares.
  - Use *epi/mono cancellation* to reduce to simpler cases.
  - For the five lemma: combine the mono and epi versions of the four lemma via functors `δlastFunctor` and `δ₀Functor`, which truncate the 4-term complex to a 3-term one.

- **Typical Flow**:
  1. Assume hypotheses on exactness and (epi/mono/isIso) of endpoints.
  2. Use exactness to factor a morphism through intermediate objects.
  3. Use naturality to relate components of `φ`.
  4. Use epi/mono properties to cancel or lift morphisms.
  5. Conclude with `isIso_of_mono_of_epi` (if both mono and epi are shown).

- **Special Cases**:
  - For `ComposableArrows C 2`, the proofs embed the 2-term complex into a 3-term one with a zero object, then apply the 3-term lemmas.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Homology.ExactSequence` | Provides foundational definitions for exact sequences in homological algebra. |
| `Mathlib.CategoryTheory.Abelian.Refinements` | Supplies tools for working with exactness in abelian categories, including `exact_up_to_refinements`, `surjective_up_to_refinements_of_epi`, etc. |

> **Context**: The code assumes `C` is an **abelian category** (`[Category C] [Abelian C]`). It heavily uses:
> - `ComposableArrows C n`: the category of length-`n` composable arrows (i.e., diagrams `X₀ → X₁ → … → Xₙ₋₁`).
> - `app' φ i`: the `i`-th component of a morphism `φ` between such diagrams.
> - `map' i j`: the composite morphism from object `i` to `j` in a `ComposableArrows`.

---

### Summary

This file formalizes the classical **four and five lemmas** from homological algebra in the generality of abelian categories, using the `ComposableArrows` framework. It distinguishes between mono/epi versions of the four lemma and proves the five lemma as a corollary. The proofs rely on diagram-chasing techniques encoded via exactness, naturality, and categorical cancellation properties. The naming and structure reflect Lean’s emphasis on modularity and reuse of low-level exactness lemmas.