Here's a structured technical metadata summary of the provided Lean 4 file on **quasi-compact morphisms of schemes**, extracted for use in building a domain-specific AI agent for algebraic geometry:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `QuasiCompact` | `class QuasiCompact (f : X ⟶ Y) : Prop` | Defines a morphism of schemes as *quasi-compact* if preimages of quasi-compact open subsets are quasi-compact. |
| `quasiCompact_iff_spectral` | `QuasiCompact f ↔ IsSpectralMap f.base` | Equivalence between quasi-compact morphisms and spectral maps on underlying topological spaces. |
| `quasiCompact_iff_forall_affine` | `QuasiCompact f ↔ ∀ U : Y.Opens, IsAffineOpen U → IsCompact (f ⁻¹ᵁ U)` | Reduces checking quasi-compactness to affine opens (key computational criterion). |
| `isCompactOpen_iff_eq_finset_affine_union` | `IsCompact U ∧ IsOpen U ↔ ∃ s : Set X.affineOpens, s.Finite ∧ U = ⋃ i ∈ s, i` | Characterizes quasi-compact open subsets as finite unions of affine opens. |
| `isCompact_basicOpen` | `IsCompact (U : Set X) → f : Γ(X, U) → IsCompact (X.basicOpen f)` | Basic opens in a scheme are quasi-compact if the ambient open is. |
| `quasiCompact_over_affine_iff` | `[IsAffine Y] → QuasiCompact f ↔ CompactSpace X` | Over an affine target, quasi-compactness ⇔ total space compact. |
| `compactSpace_iff_quasiCompact` | `CompactSpace X ↔ QuasiCompact (terminal.from X)` | Global compactness ⇔ terminal morphism is quasi-compact. |
| `isClosedMap_iff_specializingMap` | `[QuasiCompact f] → IsClosedMap f.base ↔ SpecializingMap f.base` | (Stacks Project 01K9) Closedness of underlying map ⇔ stability under generalization. |
| `exists_pow_mul_eq_zero_of_res_basicOpen_eq_zero_of_isCompact` | `IsCompact U → x|_{D(f)} = 0 → ∃ n, fⁿ·x = 0` | Generalized nilpotence criterion: vanishing on a basic open implies nilpotence modulo torsion. |
| `isNilpotent_iff_basicOpen_eq_bot_of_isCompact` | `IsCompact U → IsNilpotent f ↔ D(f) = ⊥` | Nilpotence of a section ⇔ its basic open is empty (for compact opens). |
| `zeroLocus_eq_top_iff_subset_nilradical_of_isCompact` | `IsCompact U → V(s) = ⊤ ↔ s ⊆ nilradical` | Zero locus is whole space ⇔ sections lie in nilradical (compact open case). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `quasiCompact_`: properties/instances of quasi-compact morphisms.
  - `isCompact_`: properties of quasi-compact subsets (e.g., `isCompact_basicOpen`, `isCompactOpen_iff_...`).
  - `isNilpotent_`, `zeroLocus_`: nilpotence and vanishing locus results.
  - `exists_pow_mul_eq_zero_`: nilpotence lemmas with explicit exponent.

- **Suffixes**:
  - `_iff`: characterizations (↔).
  - `_of_isCompact`, `_of_isAffine`: hypotheses on compactness or affineness.
  - `_iff_spec`: iff + specification (e.g., `zeroLocus_eq_top_iff_subset_nilradical`).
  - `_of_locally_eq`: local-to-global principles.

- **Other patterns**:
  - `pullback.fst`, `pullback.snd`: projections from fiber products.
  - `terminal.from X`: unique map to terminal object (Spec ℤ).
  - `X.basicOpen f`: standard distinguished open subset.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp only`, `simp_rw`: rewriting and simplification (especially with sheaf restrictions, preimages).
- `exact`, `apply`, `convert`: proof construction.
- `obtain ⟨...⟩`, `cases`, `choose`: destructuring existentials and finite sets.
- `ext`, `ext1`: extensionality for sets/functions.
- `convert ... using 1`: flexible congruence reasoning.
- `dsimp`, `erw`: definitional simplification and rewriting.
- `apply ... using`, `swap`: proof order control.
- `fun_prop`, `infer_instance`: typeclass inference and propositional reasoning.
- `ring`, `linarith`: algebraic simplifications (in ring-theoretic lemmas).
- `induction_on`, `finite_induction_on`: induction over finite sets (e.g., `compact_open_induction_on`).

---

### **4. Proof Logic Patterns**

- **Reduction to affine opens**: Most proofs reduce to checking affine opens via:
  - `isCompactOpen_iff_eq_finset_affine_union`
  - `quasiCompact_iff_forall_affine`
  - Finite unions → induction over finite sets (`Set.Finite.induction_on`, `compact_open_induction_on`).

- **Localization & sheaf theory**:
  - Use of `IsLocalization.Away.exists_of_eq` for nilpotence lemmas.
  - Sheaf condition (`Sheaf.eq_of_locally_eq`) to glue global sections from local data.

- **Stability properties**:
  - Prove morphism properties stable under composition/base change via `MorphismProperty.*` instances.
  - Use `HasAffineProperty` infrastructure for local-to-global arguments.

- **Spectral topology**:
  - `isClosedMap_iff_specializingMap` leverages stability under specialization and compactness.

- **Compactness ↔ finite affine cover**:
  - Central theme: compact open subsets ↔ finite unions of affine opens.
  - Enables reduction to Noetherian-like arguments.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.AlgebraicGeometry.Morphisms.UnderlyingMap`: morphism underlying maps.
- `Mathlib.Topology.Spectral.Hom`: spectral maps and topology.
- `Mathlib.AlgebraicGeometry.Limits`: limits, pullbacks, affine covers.

**Scope & universe**:
- `universe u`: single universe level for schemes.
- `open scoped AlgebraicGeometry`: scoped notation (e.g., `X.basicOpen`, `Γ(X, U)`).
- `open CategoryTheory CategoryTheory.Limits Opposite TopologicalSpace`: categorical & topological infrastructure.

**Domain**:
- **Algebraic geometry over schemes**, with emphasis on:
  - Topological properties (quasi-compactness, spectral maps).
  - Sheaf-theoretic behavior (sections, nilradicals, zero loci).
  - Stability under categorical constructions (composition, pullbacks).

---

Let me know if you'd like a **diagram of dependencies**, **proof automation suggestions**, or a **Lean 4 tactic cheat sheet** for this module.