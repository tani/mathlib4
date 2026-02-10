Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mono_of_injective` | `∀ {X Y : C} (f : X ⟶ Y), Function.Injective f → Mono f`<br>Injective morphisms in a concrete category are monomorphisms. |
| `epi_of_surjective` | `∀ {X Y : C} (f : X ⟶ Y), Function.Surjective f → Epi f`<br>Surjective morphisms in a concrete category are epimorphisms. |
| `mono_iff_injective` | `Mono f ↔ Function.Injective f`<br>Equivalence between monomorphisms and injective maps under `forget C`. |
| `epi_iff_surjective` | `Epi f ↔ Function.Surjective f`<br>Equivalence between epimorphisms and surjective maps under `forget C`. |
| `surjective_le_epimorphisms` | `MorphismProperty.surjective C ≤ epimorphisms C`<br>Surjective morphisms are contained in epimorphisms. |
| `injective_le_monomorphisms` | `MorphismProperty.injective C ≤ monomorphisms C`<br>Injective morphisms are contained in monomorphisms. |
| `surjective_eq_epimorphisms_iff` | `surjective C = epimorphisms C ↔ (forget C).PreservesEpimorphisms`<br>Characterizes when surjectivity coincides with epimorphism. |
| `injective_eq_monomorphisms_iff` | `injective C = monomorphisms C ↔ (forget C).PreservesMonomorphisms`<br>Characterizes when injectivity coincides with monomorphism. |
| `functorialSurjectiveInjectiveFactorizationData` | Constructs a functorial factorization of any morphism as surjective followed by injective, assuming strong epi-mono factorizations and that `forget C` preserves both epis and monos. |
| `isIso_iff_bijective` | Under `forget C` reflecting isomorphisms: `IsIso f ↔ Function.Bijective ((forget C).map f)`<br>Characterizes isomorphisms via bijectivity on underlying maps. |
| `injective_of_mono_of_preservesPullback` | If `f` is mono and `forget C` preserves pullbacks (i.e., limits over `WalkingCospan`), then `f` is injective. |
| `surjective_of_epi_of_preservesPushout` | If `f` is epi and `forget C` preserves pushouts (i.e., colimits over `WalkingSpan`), then `f` is surjective. |
| `mono_iff_injective_of_preservesPullback`, `epi_iff_surjective_of_preservesPushout` | Refinements of `mono_iff_injective` / `epi_iff_surjective` under limit/colimit preservation assumptions. |

---

### **2. Naming Conventions**

- **Property predicates**:  
  - `surjective`, `injective`, `bijective`, `mono`, `epi`, `isIso` — standard morphism properties.
- **Morphism property classes**:  
  - `MorphismProperty.surjective C`, `MorphismProperty.injective C` — represent sets of morphisms with given property.
- **Forgetful functor actions**:  
  - `(forget C).map f`, `(forget C).PreservesMonomorphisms`, `(forget C).ReflectsIsomorphisms`
- **Factorization data**:  
  - `functorialEpiMonoFactorizationData`, `functorialSurjectiveInjectiveFactorizationData`
- **Limit/colimit preservation**:  
  - `PreservesLimitsOfShape WalkingCospan (forget C)`, `PreservesColimitsOfShape WalkingSpan (forget C)`

Prefixes/suffixes:
- `mono_`, `epi_`, `injective_`, `surjective_`, `bijective_`, `isIso_`
- `_of_`: implication direction (e.g., `mono_of_injective`)
- `_iff_`: equivalence (e.g., `mono_iff_injective`)
- `_le_`: inclusion of morphism properties (e.g., `surjective_le_epimorphisms`)
- `_of_preserves_`: under additional preservation assumptions (e.g., `injective_of_mono_of_preservesPullback`)

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` — rewriting using equivalences/definitions (e.g., `rw [epi_iff_surjective]`)
- `infer_instance` — filling typeclass arguments automatically
- `simp only [...]` — simplification with specific lemmas
- `apply le_antisymm ...` — proving equality of sets via mutual inclusion
- `constructor` — splitting iff goals
- `have : ... := ...` — intermediate lemma introduction
- `change ... at ...` — changing goal or hypothesis type
- `exact inferInstance` — often used after `change` to finish

No heavy automation like `aesop` or `ring`; relies on Lean’s typeclass inference and basic rewriting.

---

### **4. Proof Logic**

- **Structure of main results**:
  - First establish inclusions (`surjective ≤ epi`, `injective ≤ mono`) using `forget C`.
  - Then prove equivalences under preservation assumptions (`forget C` preserves epis/monos).
  - Use `le_antisymm` to upgrade inclusions to equalities.
  - For factorization: lift the known `functorialEpiMonoFactorizationData` using the equivalences to get surjective/injective factorization.

- **Typical proof pattern**:
  1. Reduce to statements about `forget C.map f`.
  2. Apply known characterizations (`mono_iff_injective`, `epi_iff_surjective`).
  3. Use preservation/reflection assumptions to lift properties back to `C`.

- **Limit/colimit-based characterizations**:
  - Use universal properties (`WalkingCospan`, `WalkingSpan`) to relate monos/epis to injectivity/surjectivity.
  - E.g., monos ↔ injective if `forget C` preserves pullbacks (since mono ⇔ injective in **Set**, and pullbacks detect injectivity).

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Images` | For image factorizations (used implicitly in strong epi-mono factorizations). |
| `Mathlib.CategoryTheory.MorphismProperty.Concrete` | Defines `surjective`, `injective`, etc., as morphism properties. |
| `Mathlib.CategoryTheory.Types` | Basic category theory infrastructure. |
| `Mathlib.CategoryTheory.Limits.Preserves.Basic` | For `PreservesLimitsOfShape`, `PreservesColimitsOfShape`, etc. |
| `Mathlib.CategoryTheory.Limits.Constructions.EpiMono` | For `functorialEpiMonoFactorizationData`, strong epi-mono factorizations. |

---

Let me know if you'd like a diagrammatic summary or a formalized summary in Lean comment style.