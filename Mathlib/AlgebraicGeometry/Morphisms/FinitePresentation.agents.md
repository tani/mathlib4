Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `LocallyOfFinitePresentation` | `class Prop` | Defines that a scheme morphism `f : X ⟶ Y` is *locally of finite presentation*: for every pair of affine opens `U ⊆ Y`, `V ⊆ f⁻¹(U)` with a compatibility map `e : V ≤ f⁻¹ᵁ U`, the induced ring map `f.appLE U V e .hom` is of finite presentation. |
| `HasRingHomProperty @LocallyOfFinitePresentation RingHom.FinitePresentation` | `instance` | Shows that `LocallyOfFinitePresentation` arises from a `RingHomProperty`, using `RingHom.FinitePresentation`. |
| `finitePresentation_of_affine_subset` | `LocallyOfFinitePresentation.finitePresentation_of_affine_subset` | The core witness: for affine `U`, `V`, and `e`, the induced ring homomorphism is finitely presented. |
| `locallyOfFinitePresentation_iff` | `mk_iff`-generated lemma | Equivalence: `LocallyOfFinitePresentation f ↔ ∀ U V e, ...` (used to unfold the class). |
| `affineLocally_iff_affineOpens_le` | Lemma | Connects `affineLocally` with affine open inclusions. |
| `locallyOfFinitePresentation_of_isOpenImmersion` | `instance` | Any open immersion is locally of finite presentation. |
| `locallyOfFinitePresentation_comp` | `instance` | Composition of locally finitely presented morphisms is locally finitely presented. |
| `locallyOfFinitePresentation_isStableUnderBaseChange` | `lemma` | Stability under base change. |

---

### **2. Naming Conventions**

- **Class**: `LocallyOfFinitePresentation` — uses camelCase with descriptive suffix `Presentation`.
- **Instance/lemma prefixes**:
  - `locallyOfFinitePresentation_...`: for instances and lemmas about the property.
  - `finitePresentation_...`: for ring-level properties (e.g., `finitePresentation_of_affine_subset`).
- **Suffixes**:
  - `_of_...`: e.g., `locallyOfFinitePresentation_of_isOpenImmersion`.
  - `_comp`: for composition stability.
  - `_isStableUnder_...`: for categorical stability properties.

---

### **3. Tactic Stack**

Frequently used tactics in proofs (inferred from context and imports):

- `ext` — extensionality (e.g., in `eq_affineLocally'`).
- `rw [...]` — rewriting using equivalences/lemmas.
- `simp_rw` — simplification + rewriting (implied by `mk_iff` and `rw` usage).
- `apply` / `exact` — for instance proofs (e.g., via `HasRingHomProperty.of_*`).
- Implicit use of `aesop`, `ring`, `simp` — likely in underlying `RingHom.FinitePresentation` lemmas (not shown here but standard in Mathlib).

---

### **4. Proof Logic**

- **Structure**: Relies heavily on the `HasRingHomProperty` interface to lift ring-theoretic properties to scheme morphisms.
- **Typical proof pattern**:
  1. Reduce to affine case using `locallyOfFinitePresentation_iff`.
  2. Apply known ring-theoretic facts (e.g., `RingHom.finitePresentation_stableUnderComposition`).
  3. Use categorical stability lemmas (`stableUnderComposition`, `isStableUnderBaseChange`) via `HasRingHomProperty.*`.
- **Key reasoning**:
  - *Local*: Verified on affine opens.
  - *Stability*: Inherited from ring-level properties via `HasRingHomProperty` infrastructure.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties` | Provides `HasRingHomProperty`, `MorphismProperty`, and stability interfaces. |
| `Mathlib.RingTheory.RingHom.FinitePresentation` | Defines `RingHom.FinitePresentation` and its properties (local, stable under composition/base change). |

---

Let me know if you'd like a formalized summary in Lean comment style or a diagram of the stability properties.