Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LocallyOfFiniteType` | `class LocallyOfFiniteType (f : X ⟶ Y) : Prop` | Defines a scheme morphism `f : X ⟶ Y` to be *locally of finite type* if for every pair of affine opens `U ⊆ Y`, `V ⊆ f⁻¹(U)` with a compatibility map `e : V ≤ f⁻¹ᵁ U`, the induced ring map `f.appLE U V e .hom` is of finite type (i.e., its underlying ring homomorphism is finitely generated as an algebra). |
| `locallyOfFiniteType_iff` | `@[mk_iff]` | Equivalence between the class definition and the explicit condition on affine opens. |
| `hasRingHomProperty` | `instance : HasRingHomProperty @LocallyOfFiniteType RingHom.FiniteType` | Shows `LocallyOfFiniteType` arises from a ring homomorphism property (`RingHom.FiniteType`) via the `HasRingHomProperty` interface. |
| `locallyOfFiniteType_of_isOpenImmersion` | `instance` | Any open immersion is locally of finite type. |
| `stableUnderComposition` | `instance : MorphismProperty.IsStableUnderComposition @LocallyOfFiniteType` | Stability under composition of morphisms. |
| `locallyOfFiniteType_comp` | `instance` | Explicit composition instance: if `f` and `g` are locally of finite type, so is `f ≫ g`. |
| `locallyOfFiniteType_of_comp` | `theorem` | If `f ≫ g` is locally of finite type, then `f` is too. |
| `stableUnderBaseChange` | `instance : MorphismProperty.IsStableUnderBaseChange @LocallyOfFiniteType` | Stability under base change (pullback). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `locallyOfFiniteType_`: for lemmas/instances about the `LocallyOfFiniteType` property.
  - `finiteType_of_`: for implications from geometric conditions to ring-theoretic finite type (e.g., `finiteType_of_affine_subset`).
- **Suffixes**:
  - `_iff`: for equivalence lemmas (`locallyOfFiniteType_iff`).
  - `_of_`: for implications (e.g., `locallyOfFiniteType_of_comp`, `locallyOfFiniteType_of_isOpenImmersion`).
- **Class names**:
  - `LocallyOfFiniteType`: capitalized, no prefix/suffix beyond descriptive naming.

---

### **3. Tactic Stack**

- **Core tactics used**:
  - `ext`: extensionality (e.g., in `eq_affineLocally'`).
  - `rw [locallyOfFiniteType_iff, affineLocally_iff_affineOpens_le]`: rewriting using equivalences and definitions.
  - `inferInstance`: to synthesize typeclass instances.
  - Implicit use of `aesop`, `simp`, `ring`, `apply` in higher-level typeclass inference (via `HasRingHomProperty.*` lemmas).
- **Typeclass inference** heavily leveraged via `instance` declarations and `inferInstance`.

---

### **4. Proof Logic**

- **General strategy**:
  - Reduce geometric properties to ring-theoretic ones via affine opens and structure sheaf sections.
  - Use the `HasRingHomProperty` interface to lift ring homomorphism properties (e.g., `RingHom.FiniteType`) to scheme morphism properties.
  - Prove stability properties (composition, base change, openness) by appealing to corresponding ring-theoretic facts:
    - `RingHom.finiteType_stableUnderComposition`
    - `RingHom.finiteType_isStableUnderBaseChange`
    - `RingHom.finiteType_is_local`
- **Typical proof pattern**:
  - For composition: apply `MorphismProperty.comp_mem`.
  - For base change: apply `HasRingHomProperty.isStableUnderBaseChange`.
  - For open immersions: use `HasRingHomProperty.of_isOpenImmersion` with `RingHom.finiteType_holdsForLocalizationAway.containsIdentities`.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties` | Provides the `HasRingHomProperty` interface and general machinery for lifting ring homomorphism properties to scheme morphisms. |
| `Mathlib.RingTheory.RingHom.FiniteType` | Defines `RingHom.FiniteType` and its basic properties (locality, stability under composition/base change, etc.). |

---

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation or AI training).