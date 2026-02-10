Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `IsOpenImmersion` | A predicate on morphisms `f : X ⟶ Y` of schemes | Characterizes open immersions: underlying map is an open embedding, and sheaf maps are isomorphisms on opens of the image. |
| `isOpenImmersion_iff_stalk` | `IsOpenImmersion f ↔ IsOpenEmbedding f.base ∧ ∀ x, IsIso (f.stalkMap x)` | Equivalence between the global definition of open immersion and a stalkwise criterion (base map open embedding + stalk maps isomorphisms). |
| `isOpenImmersion_eq_inf` | `@IsOpenImmersion = (topologically IsOpenEmbedding) ⊓ stalkwise (fun f ↦ Function.Bijective f)` | Shows `IsOpenImmersion` is the meet (infimum) of two properties: topological (open embedding) and stalkwise (bijective stalk maps). |
| `isOpenImmersion_isLocalAtTarget` | Instance | Proves `IsOpenImmersion` is *local at the target*, i.e., can be checked on open covers of the target. |

---

### **2. Naming Conventions**

- **Predicates**: `IsOpenImmersion`, `IsOpenEmbedding`, `IsLocalAtTarget` — follow Lean/Mathlib convention of `Is<Property>` for properties of morphisms.
- **Stalk-related**: `stalkMap`, `stalkwise` — prefix `stalk` for constructions involving stalks of sheaves.
- **Logical operators**: `⊓` (infimum), `topologically`, `stalkwise` — used to combine properties pointwise or topologically.
- **Instance names**: `isOpenImmersion_isLocalAtTarget` — derived from the predicate name + property (`isLocalAtTarget`).

---

### **3. Tactic Stack**

- `intro`, `rintro`, `exact`, `convert`, `ext`, `rw`, `apply`, `symm`, `inferInstance`, `forall_congr'`, `and_congr`
- **Key automation**: `aesop` is *not* used here; proofs are mostly manual or rely on `simp_rw`-style rewrites via `rw`.
- **Category theory helpers**: `inferInstance`, `ConcreteCategory.isIso_iff_bijective`, `RingHom.toMorphismProperty_respectsIso_iff`

---

### **4. Proof Logic**

- **Structure**: Proofs proceed by unfolding definitions and applying known equivalences:
  - `isOpenImmersion_iff_stalk`: Two-way implication; forward direction uses `h.1` (open embedding) and `inferInstance` (stalk maps are iso by definition); reverse uses `IsOpenImmersion.of_stalk_iso`.
  - `isOpenImmersion_eq_inf`: Extensionality (`ext`) + logical equivalence (`and_congr`, `forall_congr'`) + `isOpenImmersion_iff_stalk` + `ConcreteCategory.isIso_iff_bijective`.
- **Instance proofs**: Use `apply ..._of_respectsIso` + rewriting with known facts about isomorphisms in `CommRingCat`.

---

### **5. Imports**

- `Mathlib.AlgebraicGeometry.Morphisms.UnderlyingMap` — provides foundational morphism infrastructure (e.g., `base`, `stalkMap`, underlying topological maps).
- **Implicit imports** (via `CategoryTheory.*`, `TopologicalSpace`, `Topology`, `CategoryTheory.Limits`, `Opposite`): Standard categorical and topological infrastructure.
- **Universe polymorphism**: Uses `universe u` and `Scheme.{u}` — standard for handling size issues.

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Algebraic geometry, specifically morphism properties (open immersions, stalk behavior).
- **Key abstractions**: Sheaf-theoretic conditions (stalk maps), categorical limits/colimits, local properties.
- **Pattern**: Prove equivalence between global and local (stalkwise/topological) conditions; verify stability under base change or localization via `IsLocalAtTarget`.

Let me know if you'd like a formalized summary or a tactic-level trace of the proofs.