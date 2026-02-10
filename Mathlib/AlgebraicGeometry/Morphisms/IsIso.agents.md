Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `isomorphisms_eq_isOpenImmersion_inf_surjective` | `isomorphisms Scheme = (@IsOpenImmersion ⊓ @Surjective : MorphismProperty Scheme)` | Characterizes scheme isomorphisms as the meet (intersection) of open immersions and surjective morphisms. |
| `isomorphisms_eq_stalkwise` | `isomorphisms Scheme = (isomorphisms TopCat).inverseImage Scheme.forgetToTop ⊓ stalkwise (fun f ↦ Function.Bijective f)` | Shows isomorphisms in `Scheme` are equivalent to those morphisms whose underlying continuous map is a homeomorphism *and* whose stalk maps are bijective. |
| `instance : IsLocalAtTarget (isomorphisms Scheme)` | `IsLocalAtTarget (isomorphisms Scheme)` | Proves that being an isomorphism is local at the target (i.e., can be checked after base change along open covers of the target). |
| `instance : HasAffineProperty (isomorphisms Scheme) ...` | `HasAffineProperty ...` | Establishes that isomorphisms satisfy an affine-local property: a morphism is an isomorphism iff its pullback to an affine cover of the source is an isomorphism *and* the induced map on global sections is an isomorphism. |
| `instance : IsLocalAtTarget (monomorphisms Scheme)` | `IsLocalAtTarget (monomorphisms Scheme)` | Derives that monomorphisms in `Scheme` are local at the target, using the diagonal isomorphism characterization. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `isomorphisms _`: Refers to the `MorphismProperty` of isomorphisms in a category.
  - `isOpenImmersion`, `surjective`, `stalkwise`, `IsLocalAtTarget`, `HasAffineProperty`: Standardized names from `Mathlib` for morphism properties.
  - `inverseImage`, `inf`, `⊓`: Used for constructing composite morphism properties via pullback and intersection.
  - `arrow_mk_iso_iff`, `arrowIsoSpecΓOfIsAffine`: Internal helper lemmas involving arrow categories and affine schemes.

- **Suffixes**:
  - `_eq_...`: Used for equality lemmas characterizing a morphism property.
  - `_of_...`: Used for implications or constructions from assumptions (e.g., `isAffine_of_isIso`).

---

### **3. Tactic Stack**

- **Core tactics used**:
  - `ext`: Extensionality (to prove equality of morphism properties by extensional equality).
  - `rw`: Rewriting using previously proven equalities.
  - `congr`: Congruence (to reduce goals by congruence closure).
  - `exact`: Directly solve goals using a given term.
  - `let ... in ...`: Local definitions for clarity.
  - `inferInstance`: Automatically infer typeclass instances (e.g., `IsIso`, `IsOpenImmersion`).
  - `trans`: Transitivity of equality/implication.
  - `and_congr`: To split and prove conjunctive goals.

- **No heavy automation** (e.g., `aesop`, `ring`, `simp_rw`) — proof is mostly algebraic and categorical reasoning.

---

### **4. Proof Logic**

- **General Strategy**:
  - Prove equalities between morphism properties by extensionality (`ext`), then reduce each direction using known equivalences.
  - Use categorical characterizations (e.g., `isIso_iff_isOpenImmersion`, `TopCat.epi_iff_surjective`) to translate between scheme-theoretic and topological properties.
  - For `isomorphisms_eq_stalkwise`, combine:
    - The previous lemma (`isOpenImmersion ⊓ surjective`)
    - Known representations: `isOpenImmersion_eq_inf`, `surjective_eq_topologically`
    - A manual equivalence between `IsIso` in `Scheme` and pairs of `IsIso` in `TopCat` + stalkwise bijectivity.

- **Inductive / Case Analysis**: Not used directly; proofs rely on categorical equivalences and typeclass inference.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.Morphisms.OpenImmersion` | Provides definitions and lemmas about open immersions in `Scheme`, including `isOpenImmersion_eq_inf`. |
| `Mathlib.Topology.IsLocalHomeomorph` | Supplies tools for local homeomorphisms and related properties (used implicitly via `TopCat` and stalkwise reasoning). |

- **Domain**: Algebraic geometry (specifically, the category of schemes `Scheme`), with heavy use of categorical logic and sheaf-theoretic properties.

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation or AI agent training).