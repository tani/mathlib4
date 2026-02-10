Here's a structured technical metadata summary of the provided Lean 4 file, extracted for use in building a Domain-Specific AI Agent (e.g., for formal verification, proof search, or synthesis in algebraic geometry):

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `residueField` | `X : Scheme → X → CommRingCat` | Defines the residue field `κ(x)` of a scheme `X` at a point `x` as the residue field of the stalk `𝒪_{X,x}`. |
| `residue` | `X.residue x : 𝒪_{X,x} → κ(x)` | The canonical surjective map from the stalk to its residue field. |
| `evaluation` | `Γ(X, U) → κ(x)` (for `x ∈ U`) | Evaluation map: sends a section over `U` to its value at `x` in the residue field. |
| `Γevaluation` | `Γ(X, X) → κ(x)` | Global evaluation map (sections over whole space). |
| `descResidueField` | `(𝒪_{X,x} → K) [IsLocalHom] → κ(x) → K` | Universal property: factorization of a local map to a field through the residue field. |
| `Hom.residueFieldMap` | `f : X → Y ⇒ f.base x : X ⇒ κ(f*x) → κ(x)` | Induced map on residue fields contravariantly from a morphism of schemes. |
| `fromSpecResidueField` | `Spec κ(x) → X` | Canonical morphism from the spectrum of the residue field into the scheme. |
| `SpecToEquivOfField` | `(Spec K → X) ≃ Σ x, κ(x) → K` | Equivalence between morphisms from `Spec K` and pairs `(x, κ(x) ↪ K)` (for `K` a field). |
| `Spec_map_residue_apply` | `base (Spec.map (residue x)) s = closedPoint(𝒪_{X,x})` | Describes the underlying continuous map of `Spec κ(x) → X`. |
| `evaluation_eq_zero_iff_not_mem_basicOpen` | `eval(f) = 0 ↔ x ∉ D⁺(f)` | Connects vanishing in residue field with membership in basic open sets. |
| `residue_surjective`, `instance Epi` | `Function.Surjective (residue x)` / `Epi (residue x)` | Confirms `residue` is an epimorphism (surjective on underlying rings). |
| `residueFieldCongr` | `x = y ⇒ κ(x) ≅ κ(y)` | Isomorphism of residue fields induced by equality of points. |
| `Hom.residueFieldMap_congr` | `f = g ⇒ f.residueFieldMap x = g.residueFieldMap x` up to `residueFieldCongr` | Naturality of residue field maps under congruence of morphisms. |

**Theorems (non-exhaustive):**
- `residue_residueFieldMap`: compatibility of `residue` and `residueFieldMap`.
- `residueFieldMap_id`, `residueFieldMap_comp`: categorical behavior of residue field maps.
- `evaluation_naturality`, `Γevaluation_naturality`: naturality of evaluation w.r.t. morphisms.
- `range_fromSpecResidueField`: image of `Spec κ(x) → X` is `{x}`.
- `SpecToEquivOfField`: main equivalence (bijection) statement.

---

### **2. Naming Conventions**

- **Prefixes:**
  - `residue_`: maps/objects related to residue fields (`residue`, `residueField`, `residueFieldMap`, `residueFieldCongr`).
  - `evaluation_`: evaluation maps (`evaluation`, `Γevaluation`).
  - `fromSpecResidueField`: canonical maps *from* spectra of residue fields.
  - `descResidueField`: descent/lifting through residue field.
  - `SpecToEquivOfField`: equivalence involving `Spec K`.

- **Suffixes:**
  - `_map`: morphism-level constructions (`residueFieldMap`, `Spec_map_residueFieldMap_fromSpecResidueField`).
  - `_congr`: congruence/isomorphism from equality (`residueFieldCongr`).
  - `_fromSpecResidueField`: maps factoring through `Spec κ(x)`.
  - `_naturality`: naturality squares.

- **Stalk-related:**
  - `stalkMap`, `stalkClosedPointTo`, `fromSpecStalk`, `stalkCongr`.

- **Categorical:**
  - `of`, `ofHom`, `hom`, `base`, `app`, `c.app`, `over`, `CanonicallyOver`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` / `simp_rw`: simplification, especially with `reassoc` lemmas.
- `rw`: rewriting using lemmas like `residue_residueFieldMap`, `evaluation_naturality`.
- `subst`: for handling equality proofs (e.g., `h : x = y`).
- `rfl`: reflexivity, especially in `reassoc` lemmas.
- `ext`: extensionality (e.g., for ring homs or set equality).
- `constructor`: for biimplications or product types.
- `dsimp`: definitional simplification (e.g., in `fromSpecResidueField`).
- `infer_instance`: typeclass inference (e.g., `IsPreimmersion`, `Epi`, `IsIso`).
- `erw`: rewrite with equational reasoning (e.g., `erw [descResidueField_stalkClosedPointTo_fromSpecResidueField]`).
- `cancel_mono`: cancellation of monomorphisms (used in `SpecToEquivOfField` proof).

---

### **4. Proof Logic & Strategy**

- **Inductive/structural reasoning** on equality of points (`x = y`) via `subst`.
- **Factorization arguments**: using universal properties (e.g., `descResidueField`).
- **Naturality checks**: verifying diagrams commute via `simp` + `rw`.
- **Set-theoretic reasoning**: e.g., proving `range = {x}` via `ext` + `simp`.
- **Categorical reasoning**: using `Spec.map_comp`, `assoc`, `cancel_mono`, `Iso` properties.
- **Equivalence proofs**: constructing bijections via `left_inv`/`right_inv` (e.g., `SpecToEquivOfField`).
- **Typeclass inference**: leveraging `IsLocalRing`, `Field`, `Epi`, `IsPreimmersion`, `IsIso`.

---

### **5. Imports & Scope**

**Primary imports:**
- `Mathlib.AlgebraicGeometry.Stalk`: stalks of sheaves on schemes.
- `Mathlib.Geometry.RingedSpace.LocallyRingedSpace.ResidueField`: residue fields in LRS context.

**Scope:**
- Formalizes **residue fields** and their interaction with:
  - sections and evaluation,
  - morphisms of schemes,
  - spectra of fields,
  - open immersions,
  - congruences of points.

**Domain:**  
Algebraic geometry over schemes, especially the local structure (stalks, residue fields), and the relationship between points and maps from `Spec K`.

---

Let me know if you'd like this exported as JSON/YAML or adapted for a specific downstream task (e.g., proof mining, tactic recommendation, or model building).