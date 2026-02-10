### Technical Metadata Brief: Grothendieck Axioms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `HasExactColimitsOfShape J C` | `class` | States that colimits of shape `J` exist and preserve finite limits (i.e., are *exact*). |
| `HasExactLimitsOfShape J C` | `class` | Dual: limits of shape `J` exist and preserve finite colimits. |
| `AB4OfSize [HasCoproducts.{w} C]` | `class` | Coproducts of size `w` are exact (`AB4` = *coproducts exact*). |
| `AB4StarOfSize [HasProducts.{w} C]` | `class` | Products are exact (`AB4*`). |
| `AB5OfSize [HasFilteredColimitsOfSize.{w, w'} C]` | `class` | Filtered colimits are exact (`AB5`). |
| `AB5StarOfSize [HasCofilteredLimitsOfSize.{w, w'} C]` | `class` | Cofiltered limits are exact (`AB5*`). |
| `CountableAB4`, `CountableAB4Star` | `class` | Countable versions of `AB4` / `AB4*`. |
| `AB4.of_AB5` | `lemma` | `AB5 ⇒ AB4` (in presence of finite biproducts & finite limits). |
| `AB4Star.of_AB5Star` | `lemma` | `AB5* ⇒ AB4*`. |
| `hasExactColimitsOfShape_of_preservesMono` | `lemma` | In abelian categories, if `colim` preserves monos, then it's exact (`AB`-type). |
| `hasExactLimitsOfShape_of_preservesEpi` | `lemma` | Dually, if `lim` preserves epis, then it's exact (`AB*`-type). |
| `HasExactColimitsOfShape.of_domain_equivalence`, `of_codomain_equivalence` | `lemma` | Invariance of exactness under equivalences in shape or codomain. |
| `hasExactColimitsOfShape_of_final`, `hasExactLimitsOfShape_of_initial` | `lemma` | Exactness descends along final/initial functors. |
| `hasExactColimitsOfShape_discrete_of_hasExactColimitsOfShape_finset_discrete` | `lemma` | Reduces discrete-shaped colimits to finite-discrete (Finset) case. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasExact...`: Indicates existence + exactness of (co)limits.
  - `AB4`, `AB5`, `AB4Star`, `AB5Star`: Grothendieck axioms.
  - `CountableAB4`, `CountableAB4Star`: Countable variants.
- **Suffixes**:
  - `OfSize`: Explicitly parameterizes by universe sizes (`w`, `w'`).
  - `of_...`: Implication or transport lemmas (e.g., `of_AB5`, `of_domain_equivalence`).
  - `preserves...`: Properties of functors (e.g., `preservesFiniteLimits`, `preservesMono`).
- **Functorial constructions**:
  - `colim`, `lim`: Colimit/limit functors.
  - `whiskeringLeft`, `whiskeringRight`, `isoWhiskerLeft`: Standard 2-categorical operations.
  - `liftToFinset`, `ProductsFromFiniteCofiltered.liftToFinset`: Technical functors for reduction lemmas.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `constructor` | To introduce class/structure instances (e.g., `preservesFiniteLimits`). |
| `exact`, `apply`, `refine` | Core proof construction, especially with naturality/isomorphisms. |
| `simp only [...]` | Simplification using explicit lemmas (e.g., whiskering, functor actions). |
| `rw [...]` | Rewriting using naturality, iso properties, or definitions. |
| `iso_whisker_*`, `Functor.associator`, `colimIso`, `limIso` | Manual construction of natural isomorphisms. |
| `preservesFiniteLimits_of_natIso`, `preservesColimits_of_natIso` | Key lemmas to deduce preservation from iso. |
| `by_cases h : Finite J` / `by_cases h : Infinite J` | Case analysis on finiteness (used in countable AB4 proofs). |
| `infer_instance` | Automatic typeclass resolution (e.g., for biproducts, filteredness). |
| `apply (config := { allowSynthFailures := true }) ...` | Allows partial synthesis (e.g., when some instances are not yet available). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs reduce exactness to *preservation of finite (co)limits* via known isomorphisms:
    - `colimIsoLim`, `limIsoColim` for biproducts.
    - `preservesColimitNatIso`, `preservesLimitNatIso` for adjunctions.
  - **Transport lemmas** (`of_domain_equivalence`, `of_codomain_equivalence`, `domain_of_functor`) use:
    - `preservesFiniteLimits_of_natIso` + naturality of isomorphisms.
    - `isLimitOfReflects`, `isColimitOfReflects` when reflecting structure.
- **AB4 from AB5**:
  - Uses reduction: discrete colimits ⇝ finite-discrete colimits ⇝ filtered colimits.
  - Key tools: `hasExactColimitsOfShape_of_final` (via `sequentialFunctor`), `liftToFinset`, `liftToFinsetColimIso`.
- **Abelian category shortcuts**:
  - If `colim` preserves monos (or `lim` preserves epis), then exactness follows via homology preservation (`preservesHomology_of_preservesMonos_and_cokernels`).
- **Universe shrinking**:
  - `AB4OfSize_shrink`, `AB5OfSize_shrink`, etc., use `ShrinkHoms.equivalence`, `Shrink.equivalence`, and `of_equivalence`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
```lean
import Mathlib.Algebra.Homology.ShortComplex.ExactFunctor
import Mathlib.CategoryTheory.Abelian.FunctorCategory
import Mathlib.CategoryTheory.Limits.Constructions.Filtered
import Mathlib.CategoryTheory.Limits.Preserves.FunctorCategory
import Mathlib.CategoryTheory.Limits.Shapes.Countable
import Mathlib.Logic.Equiv.List
```

**Scope**:
- Focuses on **abelian categories**, **exactness of (co)limits**, and **Grothendieck axioms**.
- Heavily uses:
  - `Limits` (colimits, limits, filtered, discrete, countable).
  - `FunctorCategory`, `Preserves*`, `ExactFunctor`.
  - `Homology` (for abelian criteria).
  - `Equiv.List`, `ULift`, `Encodable`, `Denumerable` (for universe & countability tricks).

---

### Summary

This file formalizes foundational aspects of Grothendieck’s AB axioms in the context of abelian categories, with a focus on *exactness of (co)limits* and *universe-sensitive formulations*. It leverages:
- **Functoriality & naturality** for transport,
- **Equivalences & final/initial functors** for shape reduction,
- **Homological criteria** (mono/epi preservation ⇒ exactness) in abelian settings,
- **Countability & universe tricks** for practical automation.

The structure is modular and reusable, with many lemmas designed for typeclass inference and universe flexibility.