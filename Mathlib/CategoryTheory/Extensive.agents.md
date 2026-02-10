### Technical Metadata Brief: Extensive Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasPullbacksOfInclusions` | `class` | Ensures pullbacks exist along coproduct injections (`inl`, `inr`). |
| `PreservesPullbacksOfInclusions` | `class` | Functor preserves pullbacks along coproduct injections. |
| `FinitaryPreExtensive` | `class` | Category has finite coproducts and binary coproducts are *universal* (i.e., stable under pullback). |
| `FinitaryExtensive` | `class` | Category has finite coproducts and binary coproducts are *van Kampen* (i.e., universal + colimit is preserved by pullback). |
| `FinitaryExtensive.vanKampen` | `theorem` | Instantiates van Kampen condition for binary coproducts. |
| `FinitaryExtensive.mono_inr_of_isColimit` | `theorem` | Coproduct injections are monomorphisms in extensive categories. |
| `FinitaryExtensive.isPullback_initial_to_binaryCofan` | `theorem` | Disjointness: pullback of `inl`, `inr` is initial object. |
| `hasStrictInitialObjects_of_finitaryPreExtensive` | `instance` | Initial object is *strict* in pre-extensive categories. |
| `finitaryExtensive_iff_of_isTerminal` | `theorem` | Characterization of finitary extensivity when a terminal object exists. |
| `types.finitaryExtensive` | `instance` | `Type u` is finitary extensive. |
| `finitaryExtensive_TopCat` | `instance` | `TopCat` is finitary extensive. |
| `finitaryExtensive_functor` | `instance` | Functor category `D ⥤ C` is extensive if `C` is extensive and has pullbacks. |
| `finitaryExtensive_of_reflective` | `theorem` | Reflective subcategory inherits extensivity under technical conditions. |
| `finitaryExtensive_of_preserves_and_reflects` | `theorem` | Extensivity descends along a functor that preserves/reflects limits/colimits. |
| `FinitaryExtensive.isVanKampen_finiteCoproducts` | `theorem` | All finite coproducts are van Kampen in finitary extensive categories. |
| `FinitaryExtensive.mono_ι` | `lemma` | Coproduct injections for finite families are monic. |
| `FinitaryExtensive.isPullback_initial_to` | `lemma` | Disjointness for arbitrary finite coproduct injections. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `finitaryExtensive_`: for results about `FinitaryExtensive`.
  - `hasPullbacksOfInclusions`, `preservesPullbacksOfInclusions`: for pullback stability along injections.
  - `mono_`, `isPullback_initial_to_`, `isVanKampen_`: descriptive of categorical properties.
  - `of_`: for equivalences/characterizations (e.g., `finitaryExtensive_iff_of_isTerminal`).
- **Suffixes**:
  - `_of_`: often used for implications or characterizations (e.g., `mono_inr_of_isColimit`).
  - `_iff_of_`: for biconditional characterizations.
  - `_finitary`: for finite versions (e.g., `finiteCoproducts_Fin`, `finiteCoproducts`).
- **Pattern**:
  - `X_of_Y`: property `X` derived from assumption `Y`.
  - `isX_of_Y`: `X` holds under condition `Y`.
  - `hasX_of_Y`: existence of structure `X` under condition `Y`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., for iso inverses). |
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `coprod.desc_comp`, `colimit.ι_desc`). |
| `rw` / `convert` | Rewriting using equalities or isomorphisms. |
| `ext` | Extensionality (e.g., for functions, natural transformations). |
| `cases'` / `rcases` | Case analysis on sums or existential data. |
| `delta` + `ExistsUnique` | Extract uniqueness data from `ExistsUnique`. |
| `choose` | Choice from `∃!` (used in `types.finitaryExtensive`). |
| `split_ifs` | Split `if-then-else` cases. |
| `apply ... using 1` | Apply lemma with controlled unification. |
| `infer_instance` | Auto-synthesis of typeclass instances. |
| `have`, `obtain`, `refine` | Intermediate proof steps and goal refinement. |
| `convert` + `using 1` | Partial unification for continuity/structure preservation. |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs often proceed by **induction on finite index sets** (`Fin n`) or use `Finite` typeclass to reduce to `Fin n`.
  - Binary case (`Fin 2`) is foundational; finite case built via `extendCofan`.
- **Van Kampen → universal → strict initial**:
  - `FinitaryExtensive` ⇒ `FinitaryPreExtensive` (via `van_kampen' ⇒ universal'`).
  - `FinitaryPreExtensive` ⇒ `HasStrictInitialObjects` (via universal property of initial object).
- **Disjointness & monicity**:
  - `IsVanKampenColimit` ⇒ `IsPullback_initial_to` (pullback of injections is initial).
  - `IsVanKampenColimit` ⇒ `Mono inl/inr` (via `BinaryCofan.mono_inr_of_isVanKampen`).
- **Preservation & reflection**:
  - Reflective subcategories inherit extensivity via adjunction + preservation/reflection of limits/colimits.
  - Functors that preserve/reflection limits/colimits reflect extensivity (`finitaryExtensive_of_preserves_and_reflects`).
- **Concrete categories**:
  - `Type` and `TopCat` proofs use explicit set-theoretic descriptions (e.g., `Sum`, preimages, homeomorphisms).
  - For `TopCat`, auxiliary lemmas (`finitaryExtensiveTopCatAux`) handle open/closed image conditions.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.CommSq`
- `Mathlib.CategoryTheory.Limits.Shapes.StrictInitial`
- `Mathlib.CategoryTheory.Limits.Shapes.Types`
- `Mathlib.Topology.Category.TopCat.Limits.Pullbacks`
- `Mathlib.CategoryTheory.Limits.FunctorCategory.Basic`
- `Mathlib.CategoryTheory.Limits.Constructions.FiniteProductsOfBinaryProducts`
- `Mathlib.CategoryTheory.Limits.VanKampen`

**Scope**:
- Focuses on **finitary extensivity** (finite coproducts only).
- Builds on van Kampen colimits, strict initial objects, and pullback stability.
- Applies to:
  - `Type`, `TopCat`, functor categories `D ⥤ C`.
  - Reflective subcategories (e.g., future work: `Scheme`, `AffineScheme`).

---

### Summary

This module formalizes **finitary extensive categories** in Lean 4, emphasizing:
- Equivalence of van Kampen and universal coproducts,
- Structural consequences (strict initial, monic injections, disjoint sums),
- Stability under functor categories and reflective subcategories,
- Concrete examples (`Type`, `TopCat`).

The formalization is highly structured, leveraging typeclasses, isomorphism-based reasoning, and finite induction. It sets the foundation for further work on geometric categories like `Scheme`.