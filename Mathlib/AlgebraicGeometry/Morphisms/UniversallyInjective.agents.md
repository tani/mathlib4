Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `UniversallyInjective` | `class UniversallyInjective (f : X ⟶ Y) : Prop` | Defines a scheme morphism `f` as *universally injective* if all base changes `X ×[Y] Y' → Y'` are injective on points. |
| `universallyInjective_iff` | `@[mk_iff]` | Equivalence introduced by `mk_iff`: `UniversallyInjective f ↔ universally (topologically (Injective ·)) f` |
| `Scheme.Hom.injective` | `f : X ⟶ Y → [UniversallyInjective f] → Function.Injective f.base` | Shows that a universally injective morphism has injective underlying continuous map on the base spaces. |
| `universallyInjective_eq` | `@UniversallyInjective = universally (topologically (Injective ·))` | Identifies the class with a universal property over topological injectivity. |
| `universallyInjective_eq_diagonal` | `@UniversallyInjective = diagonal @Surjective` | Equates universal injectivity with surjectivity of the diagonal morphism. |
| `UniversallyInjective.iff_diagonal` | `UniversallyInjective f ↔ Surjective (pullback.diagonal f)` | Core equivalence: `f` is universally injective iff its diagonal is surjective. |
| `instance [Mono f] : UniversallyInjective f` | `Mono f → UniversallyInjective f` | Monomorphisms are universally injective (via diagonal being iso ⇒ surjective). |
| `UniversallyInjective.respectsIso` | `RespectsIso @UniversallyInjective` | Universal injectivity is invariant under isomorphisms of morphisms. |
| `instance universallyInjective_isStableUnderBaseChange` | `IsStableUnderBaseChange @UniversallyInjective` | Stable under base change (pullback). |
| `instance universallyInjective_isStableUnderComposition` | `IsStableUnderComposition @UniversallyInjective` | Stable under composition. |
| `instance : MorphismProperty.IsMultiplicative @UniversallyInjective` | `id_mem` included | Forms a multiplicative class of morphism properties (closed under composition, contains identities). |
| `instance universallyInjective_isLocalAtTarget` | `IsLocalAtTarget @UniversallyInjective` | Locality at the target: `f` is universally injective iff covered by universally injective opens in the target. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `universally_`: e.g., `universallyInjective_eq`, `universallyInjective_isStableUnderBaseChange`
  - `isLocalAtTarget`: e.g., `universallyInjective_isLocalAtTarget`
  - `isStableUnder...`: e.g., `isStableUnderBaseChange`, `isStableUnderComposition`
- **Suffixes**:
  - `_eq`: for definitional equalities or equivalences (e.g., `universallyInjective_eq`)
  - `_iff`: for logical equivalences (e.g., `iff_diagonal`)
  - `_fst`, `_snd`, `_diagonal`: for pullback components and diagonal maps
- **Class names**:
  - `UniversallyInjective` (capitalized, noun-like)
  - `Mono`, `Surjective`, `Injective`: standard categorical/topological predicates

---

### **3. Tactic Stack**

Frequent tactics used in proofs (inferred from context and style):

- `rw [...]`: rewriting using equivalences/definitions (e.g., `rw [← universally_eq_iff.mpr ...]`)
- `apply ...`: applying lemmas or instances (e.g., `apply universally_mono`)
- `obtain ⟨t, ht₁, ht₂⟩ := ...`: destructing existential statements
- `rfl`: reflexivity for definitional equalities
- `ext ...`: extensionality for function/class equality
- `simp_rw [...]`: simplification + rewriting (implied by `mk_iff` and `rw` usage)
- `exact ...`, `refine ...`: for constructing proofs with holes
- `inferInstance`: auto-filling class instances (e.g., `[Mono f]`, `[IsPullback ...]`)

No heavy automation like `aesop` or `linarith` is used—proofs are mostly structural and rely on categorical properties.

---

### **4. Proof Logic**

- **Core strategy**: Reduce properties of `UniversallyInjective` to properties of the **diagonal morphism** via `universallyInjective_eq_diagonal`.
- **Equivalence proofs** (`iff_diagonal`, `universallyInjective_eq_diagonal`) use:
  - `le_antisymm` to prove equality of predicates.
  - `pullback.diagonal_fst`, `pullback.diagonal_snd` to relate diagonal to pullback projections.
  - `Scheme.Pullback.exists_preimage_pullback` to lift pointwise equalities.
- **Instance proofs** (stability, locality):
  - Use `universallyInjective_eq_diagonal.symm ▸ inferInstance` to transfer known stability/locality of `Surjective (pullback.diagonal f)` (e.g., diagonals are stable under pullback, etc.).
- **Monomorphism case**:
  - Uses `pullback.isIso_diagonal_iff` to show diagonal is iso ⇒ surjective ⇒ universally injective.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.PullbackCarrier` | Provides pullback constructions, diagonal morphisms, and properties of pullbacks in `Scheme`. |
| `Mathlib.Topology.LocalAtTarget` | Supplies `IsLocalAtTarget` and related locality machinery for morphism properties. |

**Additional context**:
- Uses `CategoryTheory`, `CategoryTheory.Limits`, `Opposite`, `TopologicalSpace`.
- Universe polymorphism: `universe v u` (for `Scheme.{u}`).
- `CategoryTheory.MorphismProperty` provides the framework for `IsStableUnder...`, `IsLocalAtTarget`, `IsMultiplicative`.

---

Let me know if you'd like a formalized version of the TODO item (radicial morphisms equivalence) or a diagrammatic summary.