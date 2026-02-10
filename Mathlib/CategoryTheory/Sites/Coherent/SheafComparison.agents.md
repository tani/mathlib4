Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `coherentTopology` | A coverage (site structure) on a category `C`, defined via finite effective epi families. Used to model *coherent sheaves*. |
| `regularTopology` | A coverage on `C`, defined via single effective epimorphisms. Used to model *regular sheaves*. |
| `extensiveTopology` | A coverage defined from finite coproducts and pullbacks; used for *extensive sheaves*. |
| `equivalence` (in `coherentTopology`) | `Sheaf (coherentTopology C) A ≌ Sheaf (coherentTopology D) A`, under conditions on `F : C ⥤ D` (fully faithful, preserves/reflects finite effective epi families, `EffectivelyEnough`, `Precoherent D`). |
| `equivalence'` (in `regularTopology`) | Same as above but for *regular* sheaves, under weaker assumptions: `F` preserves/reflects effective epimorphisms, `FinitaryExtensive D`, `Preregular D`, `FinitaryPreExtensive C`, `PreservesFiniteCoproducts F`. |
| `eq_induced` (coherent) | `coherentTopology C = F.inducedTopology (coherentTopology D)` under the same hypotheses as `equivalence`. |
| `eq_induced` (regular) | `regularTopology C = F.inducedTopology (regularTopology D)` under analogous hypotheses. |
| `isSheaf_coherent_iff_regular_and_extensive` | For preregular, finitary extensive `C`, a presheaf is a coherent sheaf iff it is both an extensive and a regular sheaf. |
| `isSheaf_iff_preservesFiniteProducts_and_equalizerCondition` | Characterization of coherent sheaves as presheaves preserving finite products and satisfying the equalizer condition (requires pullbacks along effective epimorphisms). |
| `coherentExtensiveEquivalence` | Equivalence `Sheaf (coherentTopology C) A ≌ Sheaf (extensiveTopology C) A` when `C` is preregular, finitary extensive, and all objects are projective. |
| `isCoverDense` instances | `F` is cover-dense for both `coherentTopology` and `regularTopology`, under respective assumptions. |
| `IsDenseSubsite` instances | `F` is a dense subsite embedding for both topologies, enabling sheaf equivalence via `Functor.IsDenseSubsite.sheafEquiv`. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `isSheaf_`: predicates on presheaves (e.g., `isSheaf_coherent`, `isSheaf_iff_...`).
  - `equivalence` / `equivalence'`: named equivalences of sheaf categories.
  - `reflects_` / `preserves_`: typeclass properties of functors (e.g., `F.ReflectsFiniteEffectiveEpiFamilies`).
  - `EffectivelyEnough`: a property ensuring every object has an effective epi from an object in the image of `F`.
  - `inducedTopology`: induced site structure along a functor.
  - `coverPreserving`: a derived property of dense subsite embeddings.
  - `mem_sieves_iff_hasEffectiveEpiFamily` / `hasEffectiveEpi`: characterizations of coverage membership.

- **Suffixes**:
  - `_iff_`: biconditional theorems (e.g., `eq_induced`, `isSheaf_coherent_iff_regular_and_extensive`).
  - `_of_`: derived results from assumptions (e.g., `isSheaf_coherent_of_projective_comp`).
  - `Functor.` prefix for site-theoretic constructions (e.g., `Functor.IsDenseSubsite.sheafEquiv`).

---

### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `refine` | Structured proof construction, especially for existential or equivalence goals. |
| `rw` | Rewriting using lemmas (e.g., `eq_induced`, `mem_sieves_iff_hasEffectiveEpi`). |
| `simp` / `simp only` | Simplification of hom-sets, functors, and unit types. |
| `ext` + `funext` | Extensionality for functions and natural transformations. |
| `infer_instance` | Solving typeclass goals (e.g., finiteness, effectiveness). |
| `convert` + `exact` | Adjusting goals using downward-closedness of sieves. |
| `exact Iff.rfl` | For trivial equivalences (currently marked as needing future fix). |
| `obtain` / `have` | Intermediate lemma extraction. |
| `#adaptation_note` | Comments indicating temporary breakage due to Lean changes. |

---

### **4. Proof Logic**

- **General Strategy**:
  - Prove that `F` is *cover-dense* (i.e., induces an equivalence of sites) by constructing effective epi families in `C` from those in `D`, using `EffectivelyEnough`.
  - Show that the site structures (`coherentTopology`, `regularTopology`) on `C` coincide with the *induced* topology from `D` via `F`.
  - Apply `Functor.IsDenseSubsite.sheafEquiv` to get the equivalence of sheaf categories.
- **Key Logical Steps**:
  - Use `mem_sieves_iff_hasEffectiveEpiFamily` / `hasEffectiveEpi` to translate sieve membership into existence of effective epi families/morphisms.
  - Use `F.map_finite_effectiveEpiFamily`, `F.effectiveEpi_of_map`, and `F.map_injective` to lift/lower effective epimorphisms.
  - For projective cases, reduce to finite product preservation via `isSheaf_iff_preservesFiniteProducts_of_projective`.
  - For extensive + preregular cases, decompose coherent sheaves into regular + extensive sheaves.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Sites.Coherent.Comparison` | Comparison map for coherent sheaves. |
| `Mathlib.CategoryTheory.Sites.Coherent.ExtensiveSheaves` | Sheaves for the extensive topology. |
| `Mathlib.CategoryTheory.Sites.Coherent.ReflectsPrecoherent` | Ensures `C` is precoherent if `D` is, under `F`. |
| `Mathlib.CategoryTheory.Sites.Coherent.ReflectsPreregular` | Ensures `C` is preregular if `D` is. |
| `Mathlib.CategoryTheory.Sites.DenseSubsite.InducedTopology` | Induced site structure along a functor. |
| `Mathlib.CategoryTheory.Sites.Whiskering` | Composition of presheaves with functors. |

---

### **Domain-Specific AI Agent Notes**

- **Primary Domain**: *Category theory*, especially *site theory*, *sheaf theory*, and *coherent/regular/extensive topologies*.
- **Key Objects**: Categories, functors, sieves, effective epimorphisms/families, sheaves, limits/colimits.
- **Critical Assumptions**: `EffectivelyEnough`, `Preserves/Reflects Effective Epis`, `Precoherent`, `Preregular`, `Finitary Extensive`, `Projective objects`.
- **Typical Tasks for Agent**:
  - Prove site equivalences via dense subsite criteria.
  - Translate sheaf conditions across topologies (coherent ↔ regular + extensive).
  - Construct/verify equivalences of sheaf categories using `sheafEquiv`.
  - Handle projective or extensive simplifications.

Let me know if you'd like a formalized tactic guide or a summary of the `coherentExtensiveEquivalence` proof in natural language.