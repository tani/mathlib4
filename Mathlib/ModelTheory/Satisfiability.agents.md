### Technical Metadata Brief: First-Order Satisfiability in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSatisfiable` | `T.IsSatisfiable : Prop` | Indicates that `T` has a nonempty model (i.e., `∃ M ⊨ T`). |
| `IsFinitelySatisfiable` | `T.IsFinitelySatisfiable : Prop` | Every finite subset of `T` is satisfiable. |
| `IsComplete` | `T.IsComplete : Prop` | `T` is satisfiable and decides every sentence: `∀ φ, T ⊨ φ ∨ T ⊨ ¬φ`. |
| `Categorical` | `κ.Categorical T : Prop` | All models of `T` of cardinality `κ` are isomorphic. |
| `IsMaximal` | `T.IsMaximal : Prop` | `T` is satisfiable and contains for each sentence either it or its negation *as an axiom*. |
| `ModelsBoundedFormula` | `T ⊨ᵇ φ : Prop` | `T` models the bounded formula `φ` in all its nonempty models. |
| `isSatisfiable_iff_isFinitelySatisfiable` | `T.IsSatisfiable ↔ T.IsFinitelySatisfiable` | **Compactness Theorem**: satisfiability ⇔ finite satisfiability. |
| `exists_large_model_of_infinite_model` | `∃ N ⊨ T, κ ≤ #N` | Any theory with an infinite model has arbitrarily large models. |
| `exists_elementaryEmbedding_card_eq` | `∃ N, (N ↪ₑ M ∨ M ↪ₑ N) ∧ #N = κ` | **Löwenheim–Skolem Theorem**: for infinite `M`, there is an elementary embedding into/from a structure of size `κ`. |
| `exists_elementarilyEquivalent_card_eq` | `∃ N, M ≅ N ∧ #N = κ` | For infinite `M`, there is an elementarily equivalent structure of size `κ`. |
| `Categorical.isComplete` | `κ.Categorical T → ℵ₀ ≤ κ → ... → T.IsComplete` | **Łoś–Vaught Test**: if `T` is `κ`-categorical and has no finite models, then `T` is complete. |
| `completeTheory.isComplete` | `(L.completeTheory M).IsComplete` | The complete theory of a structure is complete. |
| `models_iff_finset_models` | `T ⊨ φ ↔ ∃ T₀ ⊆ T, T₀ ⊨ φ` | Alternative compactness formulation: a sentence is modeled iff finitely axiomatized. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: predicate definitions (`isSatisfiable`, `isFinitelySatisfiable`, `isComplete`, `isMaximal`)
  - `models_`: modeling relations (`modelsBoundedFormula`, `models_sentence_iff`, `models_iff_not_satisfiable`)
  - `elementary_`: elementary embeddings/extensions (`exists_elementaryEmbedding_card_eq`, `elementaryDiagram`)
  - `distinctConstants_`: for adding constants to language (`distinctConstantsTheory`, `lhomWithConstants`)
  - `completeTheory_`: theory of a structure (`completeTheory`, `isComplete`, `isMaximal`)

- **Suffixes**:
  - `_iff`: equivalence statements (`isSatisfiable_iff_isFinitelySatisfiable`, `models_iff_finset_models`)
  - `_of_`: implications or constructions from assumptions (`exists_large_model_of_infinite_model`, `exists_elementaryEmbedding_card_eq_of_le`)
  - `_directed_union_iff`: for unions over directed families
  - `_theory`: theory-level constructions (`onTheory`, `distinctConstantsTheory`, `elementaryDiagram`)

- **Infixes**:
  - `⊨ᵇ`: `ModelsBoundedFormula`
  - `≈[L]`, `↪ₑ[L]`: elementary equivalence/embedding

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` / `simp only` | Rewriting with definitional equalities and lemmas (e.g., `realize_not`, `model_iff`) |
| `aesop` / `tauto` | Automated reasoning for propositional logic, especially in `isComplete`/`isMaximal` proofs |
| `exact` / `refine` | Constructing witnesses (e.g., models, embeddings) |
| `rw [← lift_inj]`, `lift_lift`, `lift_le` | Cardinal arithmetic manipulations (key for Löwenheim–Skolem) |
| `cases'` / `obtain ⟨...⟩` | Destructuring existential/universal hypotheses |
| `push_neg` | Negation normal form for compactness-style proofs |
| `filter_up` / `Ultrafilter.of` | Nonprincipal ultrafilter construction in compactness proof |
| `rw [Set.iUnion_eq_iUnion_finset]` | Reducing infinite unions to finite ones |
| `ext` / `subtype.ext` | Extensionality for subtypes (e.g., constants added) |
| `rw [Cardinal.mk_out]`, `mk_univ`, `card_le_of_model_distinctConstantsTheory` | Cardinal arithmetic lemmas for model size |

---

#### **4. Proof Logic Patterns**

- **Compactness Proof** (`isSatisfiable_iff_isFinitelySatisfiable`):
  - *Forward direction*: trivial (a model satisfies all finite subsets).
  - *Reverse direction*:
    - Construct a family of finite subsets `M : Finset T → Type`.
    - Use `Filter.Product` over `Ultrafilter.of Filter.atTop` to build an ultraproduct `M'`.
    - Show `M' ⊨ T` by verifying each sentence using `Filter.Eventually.filter_mono`.
    - Conclude via `ModelType.of`.

- **Löwenheim–Skolem Proofs**:
  - Use `exists_elementarySubstructure_card_eq` (Downward) or `exists_large_model_of_infinite_model` (Upward).
  - Key steps:
    - Add constants via `distinctConstantsTheory` or `lhomWithConstants`.
    - Apply compactness or ultraproducts to get large models.
    - Use `card_le_of_model_distinctConstantsTheory` to bound cardinality.

- **Łoś–Vaught Test**:
  - Assume `T` is `κ`-categorical and has no finite models.
  - For any sentence `φ`, suppose neither `T ⊨ φ` nor `T ⊨ ¬φ`.
  - Build two models `M`, `N` of size `κ` where `M ⊨ φ`, `N ⊨ ¬φ`.
  - Use elementary equivalence + categoricity to get contradiction.

- **General Flow**:
  - Reduce to finite subsets (via `isFinitelySatisfiable`).
  - Use model-theoretic constructions (ultraproducts, reducts, expansions).
  - Translate between `Theory.ModelType`, `Bundled L.Structure`, and raw types via `shrink`, `of`, `reduct`, `elementarySkolem₁Reduct`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.ModelTheory.Ultraproducts` | Provides ultraproducts, Łoś’s theorem, and ultrafilter machinery (used in compactness). |
| `Mathlib.ModelTheory.Bundled` | Defines `Bundled L.Structure`, `Bundled L.Theory`, and morphisms (essential for category-theoretic style). |
| `Mathlib.ModelTheory.Skolem` | Supplies Skolemization, elementary Skolem reducts, and `elementarySkolem₁Reduct`. |

**Scope**: This file formalizes core results in classical first-order model theory, especially:
- Satisfiability and compactness,
- Löwenheim–Skolem theorems (upward/downward),
- Completeness and categoricity (Łoś–Vaught test),
- Model size control via cardinal arithmetic.

It relies heavily on:
- **Cardinal arithmetic** (`Cardinal` namespace, `lift`, `mk`, `ℵ₀`),
- **Category-theoretic bundling** (`Bundled`, `Equiv`, `ElementaryEmbedding`),
- **Model theory infrastructure** (`ModelType`, `Theory.Model`, `Sentence`, `BoundedFormula`).

---

Let me know if you'd like a dependency graph, tactic usage heatmap, or a summary of how this integrates with other model theory files (e.g., `Skolem.lean`, `Ultraproducts.lean`).