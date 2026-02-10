Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Locally Injective Morphisms of (Pre)sheaves**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `equalizerSieve {F} x y` | `Sieve X.unop` | For sections `x, y : F.obj X`, the sieve of morphisms `f` such that `F.map f.op x = F.map f.op y`. Captures where `x` and `y` become equal after restriction. |
| `IsLocallyInjective J φ` | `Prop` | A morphism `φ : F₁ ⟶ F₂` is *locally injective* if whenever `φ.app X x = φ.app X y`, then `x = y` *locally*, i.e., `equalizerSieve x y ∈ J X.unop`. |
| `equalizerSieve_self_eq_top` | `equalizerSieve x x = ⊤` | Sections equal to themselves agree on the maximal sieve. |
| `equalizerSieve_eq_top_iff` | `equalizerSieve x y = ⊤ ↔ x = y` | Characterizes global equality via the top sieve. |
| `isLocallyInjective_of_injective` | `(∀ X, Function.Injective (φ.app X)) → IsLocallyInjective J φ` | If `φ` is globally injective, then it is locally injective. |
| `instance [IsIso φ]` | `IsLocallyInjective J φ` | Isomorphisms are locally injective. |
| `isLocallyInjective_iff_equalizerSieve_mem_imp` | `IsLocallyInjective J φ ↔ ∀ x y, equalizerSieve (φ.app x) (φ.app y) ∈ J → equalizerSieve x y ∈ J` | Reformulation: local injectivity means the sieve where images agree refines the sieve where originals agree. |
| `equalizerSieve_mem_of_equalizerSieve_app_mem` | Under `IsLocallyInjective J φ`, if images agree locally, then originals agree locally. | Consequence of the above equivalence. |
| `isLocallyInjective_comp` | `[IsLocallyInjective J φ] → [IsLocallyInjective J ψ] → IsLocallyInjective J (φ ≫ ψ)` | Composition of locally injective morphisms is locally injective. |
| `isLocallyInjective_of_isLocallyInjective` | `IsLocallyInjective J (φ ≫ ψ) → IsLocallyInjective J φ` | If a composite is locally injective, so is the first map. |
| `isLocallyInjective_iff_of_fac` | With `φ ≫ ψ = φψ`, and `ψ` locally injective: `IsLocallyInjective J φψ ↔ IsLocallyInjective J φ` | Factorization lemma for local injectivity. |
| `isLocallyInjective_comp_iff` | If `ψ` is locally injective: `IsLocallyInjective J (φ ≫ ψ) ↔ IsLocallyInjective J φ` | Immediate corollary of previous. |
| `isLocallyInjective_iff_injective_of_separated` | If `F₁` is `J`-separated: `IsLocallyInjective J φ ↔ ∀ X, Function.Injective (φ.app X)` | For separated presheaves, local injectivity ⇔ injectivity on sections. |
| `instance imageSheafι` | `IsLocallyInjective J (GrothendieckTopology.imageSheafι f)` | The canonical map from image to codomain sheaf is locally injective. |
| `isLocallyInjective_toPlus`, `isLocallyInjective_toSheafify`, `isLocallyInjective_toSheafify'` | Various sheafification maps are locally injective | Key for sheafification properties. |
| `isLocallyInjective_sheafToPresheaf_map_iff` | `Presheaf.IsLocallyInjective J ((sheafToPresheaf _ _).map φ) ↔ IsLocallyInjective φ` | Compatibility of sheaf/local injectivity with forgetful functor. |
| `isLocallyInjective_iff_injective` (for sheaves) | Under `J.HasSheafCompose (forget D)`: `IsLocallyInjective φ ↔ ∀ X, Function.Injective (φ.val.app X)` | For sheaves, local injectivity ⇔ injectivity on sections (since sheaves are separated). |
| `mono_of_isLocallyInjective` | `IsLocallyInjective φ → Mono φ` | Locally injective morphisms of sheaves are monomorphisms. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `equalizerSieve_`: for constructions related to the sieve where two sections agree.
  - `isLocallyInjective_`: for lemmas/instances about the `IsLocallyInjective` predicate.
  - `mono_of_`: for implications from injectivity/local injectivity to monomorphism.
- **Suffixes**:
  - `_iff`: for biconditional characterizations.
  - `_mem`: for membership in a sieve (often in `J`).
  - `_app`: for statements about components at an object (e.g., `φ.app X`).
- **Abbreviations**:
  - `IsLocallyInjective` (in `Sheaf` namespace) abbreviates `Presheaf.IsLocallyInjective J φ.val`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop`: for automated reasoning (e.g., `equalizerSieve_self_eq_top`).
- `simp` / `simp only`: simplification with `simps`-generated lemmas and definitional equalities.
- `rw`: rewriting using naturality, sheaf axioms, or definitions.
- `convert`: for flexible equality proofs (e.g., `isLocallyInjective_of_injective`).
- `intro` / `apply` / `exact`: standard natural deduction.
- `ext`: extensionality for sieves or functions.
- `congr_fun`, `congr_arg`: for functional extensionality and congruence.
- `infer_instance`: to discharge typeclass goals.
- `dsimp`, `subst`: for definitional simplification and substitution.

---

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs proceed by unfolding definitions (`equalizerSieve`, `IsLocallyInjective`) and applying sieve properties (upward closure, transitivity, etc.).
- **Sieve reasoning**: Central technique: showing membership in a covering sieve via:
  - `J.top_mem`
  - `J.superset_covering`
  - `J.transitive`
  - `Sieve.bind` / `pullback_bind`
- **Logical flow**:
  1. Unfold `IsLocallyInjective` → goal: `equalizerSieve x y ∈ J`.
  2. Use hypothesis `φ.app x = φ.app y` to get `equalizerSieve (φ.app x) (φ.app y) ∈ J`.
  3. Apply `isLocallyInjective_iff_equalizerSieve_mem_imp` or `equalizerSieve_mem_of_equalizerSieve_app_mem`.
  4. Use naturality of `φ` to relate `F₁.map f.op x` and `F₂.map f.op (φ.app x)`.
- **Sheaf-specific arguments** rely on:
  - `Presieve.isSeparated_of_isSheaf`
  - `isSheaf_iff_isSheaf_of_type`
  - `sheafComposeIso_hom_fac`, `toSheafify_plusPlusIsoSheafify_hom`

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.CategoryTheory.Sites.LeftExact`
- `Mathlib.CategoryTheory.Sites.PreservesSheafification`
- `Mathlib.CategoryTheory.Sites.Subsheaf`
- `Mathlib.CategoryTheory.Sites.Whiskering`

**Domain**:
- Grothendieck topologies (`GrothendieckTopology`)
- Presheaves and sheaves valued in a concrete category (`ConcreteCategory`)
- Sheafification (`toPlus`, `toSheafify`)
- Monomorphisms, isomorphisms, and factorization systems

**Key Concepts**:
- Sieves, covering sieves, sheaf condition, separated presheaves
- Local injectivity as a weakening of injectivity adapted to Grothendieck topologies
- Compatibility with sheafification and forgetful functors

---

Let me know if you'd like a diagrammatic summary or a formalized summary in a specific format (e.g., for documentation or AI training).