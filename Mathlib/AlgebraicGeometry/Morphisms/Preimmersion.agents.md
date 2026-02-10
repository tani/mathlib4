Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Preimmersions of Schemes in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPreimmersion` | `class IsPreimmersion (f : X ⟶ Y) extends SurjectiveOnStalks f : Prop` | Defines a *preimmersion* as a morphism of schemes whose underlying topological map is an embedding and whose stalk maps are all surjective. |
| `base_embedding` | `f.base_embedding : IsEmbedding f.base` | Witness that the base map of `f` is an embedding. |
| `surj_on_stalks` | `f.surj_on_stalks : ∀ x, Function.Surjective (f.stalkMap x)` | Witness that all stalk maps are surjective. |
| `isPreimmersion_iff` | `@IsPreimmersion f ↔ IsEmbedding f.base ∧ SurjectiveOnStalks f` | Equivalence defining `IsPreimmersion`. |
| `isPreimmersion_eq_inf` | `@IsPreimmersion = (@SurjectiveOnStalks ⊓ topologically IsEmbedding)` | Shows `IsPreimmersion` is the meet (infimum) of two morphism properties. |
| `isSurjectiveOnStalks_isLocalAtTarget` | `instance` | Proves surjectivity on stalks is local at the target. |
| `isOpenImmersion.isPreimmersion` | `instance` | Every open immersion is a preimmersion. |
| `comp_mem` / `comp` | `instance` | Preimmersions are closed under composition. |
| `Mono f` | `instance` | Every preimmersion is a monomorphism in the category of schemes. |
| `of_comp` | `theorem` | If `g` and `f ≫ g` are preimmersions, then `f` is a preimmersion. |
| `comp_iff` | `theorem` | Under `IsPreimmersion g`, `f ≫ g` is a preimmersion iff `f` is. |
| `Spec_map_iff` | `lemma` | Characterizes when `Spec.map f` is a preimmersion in terms of `PrimeSpectrum.comap f.hom`. |
| `mk_Spec_map` | `lemma` | Constructive version of `Spec_map_iff`. |
| `of_isLocalization` | `lemma` | Localization maps induce preimmersions on spectra. |
| `IsStableUnderBaseChange` | `instance` | Preimmersions are stable under base change (pullback). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Used for properties (e.g., `isEmbedding`, `isPreimmersion`).
  - `SurjectiveOnStalks`: Property name for stalkwise surjectivity.
- **Suffixes**:
  - `_embedding`: For embedding-related facts (`base_embedding`).
  - `_mem`: For membership in a morphism property (e.g., `comp_mem`).
  - `_iff`: For equivalence lemmas (`Spec_map_iff`, `comp_iff`).
- **Category-theoretic terms**:
  - `pullback_fst`, `pullback.fst`, `pullback.snd`: Standard pullback projections.
  - `stalkwise`, `stalkMap`, `stalkMap_surjective`: Stalk-level behavior.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw [isPreimmersion_iff]`: Rewriting using the definition.
- `exact`, `refine`, `apply`: For constructing instances and proofs.
- `simp only [...]`: Simplifying with precise lemmas (e.g., `Set.mem_setOf`, `pullback.condition`).
- `fun_prop`: For functoriality and continuity goals.
- `rwa [...]`: Rewrite + assumption.
- `have h := ...; rw ... at h`: Localizing and manipulating hypotheses.
- `topologically`, `continuous_subtype_val`: For topological embedding arguments.
- `inferInstance`: Automatically inferring class instances.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *decomposition* pattern: split `IsPreimmersion` into its two components (`IsEmbedding` and `SurjectiveOnStalks`) using `isPreimmersion_iff`.
  - Use known facts about embeddings (e.g., stability under composition, pullback) and stalk maps (e.g., surjectivity under localization, pullback).
  - For categorical properties (e.g., monomorphism, stability under pullback), reduce to properties of the base map and stalk maps via `SheafedSpace.mono_of_base_injective_of_stalk_epi` or similar lemmas.
  - For `Spec`-level results, use `Spec_map_iff` to reduce to statements about ring maps and their induced maps on prime spectra.

- **Common proof patterns**:
  - **Inductive/structural reasoning**: For stability under composition, base change, etc.
  - **Factorization arguments**: E.g., `of_comp` uses factorization of stalk maps and surjectivity lemmas.
  - **Homeomorphism + embedding composition**: For base change stability, construct a homeomorphism and compose embeddings.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.AlgebraicGeometry.Morphisms.UnderlyingMap`: For `base`, `stalkMap`, etc.
  - `Mathlib.AlgebraicGeometry.Morphisms.SurjectiveOnStalks`: For `SurjectiveOnStalks` class and related lemmas.

- **Domain scope**:
  - Formalizes a *non-standard* but useful notion of *preimmersion* in algebraic geometry.
  - Bridges classical concepts (open immersions, localizations) with categorical properties (monos, pullbacks).
  - Intended for generalizing results about immersions to broader classes of morphisms (e.g., structure sheaf inclusions, fiber inclusions).

---

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation, AI training, or proof planning).