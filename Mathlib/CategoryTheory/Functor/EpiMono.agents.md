Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Preservation and Reflection of Monos/Epis in Functors**

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `PreservesMonomorphisms` | `Functor C D → Prop` | Typeclass stating that a functor maps monos to monos. |
| `PreservesEpimorphisms` | `Functor C D → Prop` | Typeclass stating that a functor maps epis to epis. |
| `ReflectsMonomorphisms` | `Functor C D → Prop` | Typeclass stating that if `F f` is mono, then `f` is mono. |
| `ReflectsEpimorphisms` | `Functor C D → Prop` | Typeclass stating that if `F f` is epi, then `f` is epi. |
| `mono_of_mono_map` | `Mono (F.map f) → Mono f` | Proof that reflected monos are monos. |
| `epi_of_epi_map` | `Epi (F.map f) → Epi f` | Proof that reflected epis are epis. |
| `preservesMonomorphisms_comp` | `PreservesMonomorphisms F → PreservesMonomorphisms G → PreservesMonomorphisms (G ∘ F)` | Composition preserves the property. |
| `reflectsMonomorphisms_comp` | `ReflectsMonomorphisms F → ReflectsMonomorphisms G → ReflectsMonomorphisms (G ∘ F)` | Composition reflects the property. |
| `preservesEpimorphisms_of_preserves_of_reflects` | `PreservesEpis (F ⋙ G) → ReflectsEpis G → PreservesEpis F` | If composition preserves epis and `G` reflects them, then `F` preserves them. |
| `reflectsMonomorphisms_of_preserves_of_reflects` | `PreservesMonos G → ReflectsMonos (F ⋙ G) → ReflectsMonos F` | Dual to above for monos. |
| `preservesMonomorphisms.of_iso` / `iso_iff` | `F ≅ G → PreservesMonos F ↔ PreservesMonos G` | Preservation/Reflection is invariant under natural isomorphism of functors. |
| `preservesEpimorphsisms_of_adjunction` | `F ⊣ G → PreservesEpis F` | Left adjoints preserve epis. |
| `preservesMonomorphisms_of_adjunction` | `F ⊣ G → PreservesMonos G` | Right adjoints preserve monos. |
| `reflectsMonomorphisms_of_faithful` | `Faithful F → ReflectsMonos F` | Faithful functors reflect monos. |
| `reflectsEpimorphisms_of_faithful` | `Faithful F → ReflectsEpis F` | Faithful functors reflect epis. |
| `splitEpiEquiv` / `splitMonoEquiv` | `Full F → Faithful F → SplitEpi f ≃ SplitEpi (F f)` | Fully faithful functors preserve and reflect split epis/monos. |
| `epi_map_iff_epi` / `mono_map_iff_mono` | `Preserves + Reflects → Epi (F f) ↔ Epi f` | Under both preservation and reflection, `F f` is epi/mono iff `f` is. |
| `strongEpi_map_of_strongEpi` | `F ⊣ F' → F'.PreservesMonos → F.PreservesEpi → StrongEpi f → StrongEpi (F f)` | Strong epis are preserved under certain adjoint conditions. |
| `strongEpi_map_iff_strongEpi_of_isEquivalence` | `IsEquivalence F → StrongEpi (F f) ↔ StrongEpi f` | Equivalences preserve and reflect strong epis. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `preserves*`: Functors that *send* monos/epis to monos/epis.
  - `reflects*`: Functors that *pull back* monos/epis (i.e., if image is mono/epi, then source is).
  - `of_*`: Implication lemmas (e.g., `of_iso`, `of_adjunction`, `of_faithful`).
  - `*_iff_*`: Biconditional lemmas under combined assumptions.

- **Suffixes**:
  - `*_comp`: Behavior under composition.
  - `*_of_*`: Derived properties from other assumptions.
  - `*_iff_*`: Equivalence under two-sided conditions.

- **Helper theorems**:
  - `mono_of_mono_map`, `epi_of_epi_map`: Extractors from reflection typeclass.
  - `map_mono`, `map_epi`: Instances for preservation.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw`: Rewriting using naturality, associativity, iso properties.
- `simp only [...]`: Simplification with specific lemmas (e.g., `map_comp`, `map_preimage`).
- `aesop_cat`: Automated category-theoretic reasoning (used in `splitEpiEquiv` proofs).
- `intro`, `apply`, `exact`, `infer_instance`: Standard Lean intro/apply/instance tactics.
- `congr_arg`, `rwa`, `cancel_mono`, `cancel_epi`: For manipulating hom-sets and universal properties.
- `have`, `suffices`: Intermediate proof steps, especially for iso-based rewrites.

---

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs are direct applications of definitions and typeclass inference.
- **Iso-based reasoning**: Many proofs use natural isomorphisms to rewrite `G f` in terms of `F f`, then apply preservation/reflecting lemmas.
- **Adjoint-based reasoning**: Leverages hom-equivalence naturality and unit/counit identities.
- **Faithful functor reasoning**: Uses injectivity of `F.map` to lift mono/epi properties.
- **Equivalence reasoning**: Uses `IsEquivalence` to reduce to adjoint case or use unit/counit isos.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.EpiMono`: Core definitions of `Mono`, `Epi`, `SplitEpi`, `SplitMono`.
- `Mathlib.CategoryTheory.Limits.Shapes.StrongEpi`: Definition and properties of strong epis.
- `Mathlib.CategoryTheory.LiftingProperties.Adjunction`: Lifting properties and adjunction machinery.

---

This module formalizes foundational categorical properties of functors with respect to monos/epis, especially in relation to adjunctions, equivalences, and faithfulness. It is highly modular, leveraging typeclasses and Lean’s instance resolution for ergonomic usage.