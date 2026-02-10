Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isLocallyInjective_whisker` | `[H.IsCocontinuous J K] → [IsLocallyInjective K f] → IsLocallyInjective J (whiskerLeft H.op f)` | Shows that *precomposition* with a cocontinuous functor **preserves** local injectivity. |
| `isLocallyInjective_of_whisker` | `CoverPreserving J K H → H.IsCoverDense K → IsLocallyInjective J (whiskerLeft H.op f) → IsLocallyInjective K f` | Shows that if `H` is cover-preserving and cover-dense, then local injectivity of the whiskered morphism **reflects** to the original. |
| `isLocallyInjective_whisker_iff` | `CoverPreserving J K H → H.IsCocontinuous J K → H.IsCoverDense K → (IsLocallyInjective J (whiskerLeft H.op f) ↔ IsLocallyInjective K f)` | Equivalence: under suitable conditions, local injectivity is preserved *and* reflected by whiskering. |
| `isLocallySurjective_whisker` | `[H.IsCocontinuous J K] → [IsLocallySurjective K f] → IsLocallySurjective J (whiskerLeft H.op f)` | Preserves local surjectivity under cocontinuity. |
| `isLocallySurjective_of_whisker` | `CoverPreserving J K H → H.IsCoverDense K → IsLocallySurjective J (whiskerLeft H.op f) → IsLocallySurjective K f` | Reflects local surjectivity under cover-preserving + cover-dense assumptions. |
| `isLocallySurjective_whisker_iff` | Same hypotheses as injective version, but for surjectivity. | Equivalence for local surjectivity. |

> **Notation**:  
> - `whiskerLeft H.op f` = precomposition of `f : F ⇒ G` with `H.op : Cᵒᵖ ⥤ Dᵒᵖ`, yielding `H.op ⋙ F ⇒ H.op ⋙ G`.  
> - `IsLocallyInjective` / `IsLocallySurjective` refer to sheaf-theoretic notions defined via sieves (equalizer/image sieves).

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isLocallyInjective_` / `isLocallySurjective_`: predicate-based naming for properties.
  - `whisker_`: indicates whiskering (precomposition with a functor).
- **Suffixes**:
  - `_iff`: for biconditional lemmas.
  - `_of_whisker`: direction from whiskered → original (reflection).
  - `_whisker`: direction from original → whiskered (preservation).
- **Variable naming**:
  - `H : C ⥤ D`: the functor.
  - `f : F ⟶ G`: morphism of presheaves on `D`.
  - `J`, `K`: Grothendieck topologies on `C`, `D`.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `apply` | To apply lemmas about sieves or topologies. |
| `rw` / `erw` | Rewriting using naturality, pullback, and functoriality identities. |
| `simp only [...]` | Simplifying using explicit lemmas (e.g., `op_obj`, `whiskerLeft_app`). |
| `refine` | Building structured proofs with holes to be filled later. |
| `intro` / `intro ⟨⟨...⟩⟩` | Introducing existential witnesses (e.g., lifts in dense subsite). |
| `have` / `set` | Introducing intermediate facts (e.g., `hh := ...`). |
| `simpa` | Simplifying using assumptions (e.g., `simpa using hq`). |
| `exact` | Finalizing trivial goals. |

No heavy automation like `aesop` or `linarith` — proofs are mostly manual, leveraging category-theoretic structure.

---

### **4. Proof Logic**

- **Structure**: All proofs follow a common pattern:
  1. **Unfold definitions** of `IsLocallyInjective` / `IsLocallySurjective` (via `equalizerSieve_mem` / `imageSieve_mem`).
  2. Use properties of Grothendieck topologies:  
     - `transitive`, `pullback_stable`, `superset_covering`.
  3. Use assumptions on `H`:  
     - `H.IsCocontinuous` → `cover_lift` to lift covering sieves.  
     - `CoverPreserving` → `cover_preserve`.  
     - `H.IsCoverDense` → `is_cover_of_isCoverDense`.
  4. Manipulate sieves using lemmas:  
     - `Sieve.pullback_comp`, `Sieve.functorPullback_pushforward_le`, `Sieve.functorPushforward_monotone`.
  5. For reflection (`_of_whisker`), construct a lift using density:  
     - Given `Y → X` in `K`, use density to find `Z → Y` factoring through a cover in `J`.
  6. For preservation (`_whisker`), directly lift covering sieves via cocontinuity.

- **Inductive/structural reasoning**: No explicit induction; relies on categorical universal properties (e.g., equalizers, pullbacks).

---

### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Sites.DenseSubsite.Basic` | Provides definitions and lemmas about dense subsites, cover-dense functors (`H.IsCoverDense`), and related sieve constructions. |
| `Mathlib.CategoryTheory.Sites.LocallySurjective` | Defines `IsLocallySurjective` and related sieve-based notions. *(Note: likely also imports `LocallyInjective` via shared module.)* |

> **Domain**:  
> - **Category theory** (especially presheaves, Grothendieck topologies).  
> - **Sheaf theory** (local injectivity/surjectivity as local properties).  
> - **Site theory**: dense subsites, cover-preserving/dense functors.

---

Let me know if you'd like a diagrammatic summary or a formalization of the underlying mathematical intuition.