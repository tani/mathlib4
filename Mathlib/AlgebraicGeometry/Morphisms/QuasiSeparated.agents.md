Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `QuasiSeparated` | `class QuasiSeparated (f : X ⟶ Y) : Prop` | Defines a morphism `f : X → Y` to be *quasi-separated* if its diagonal morphism is quasi-compact. |
| `quasiSeparatedSpace_iff_affine` | `QuasiSeparatedSpace X ↔ ∀ U V : X.affineOpens, IsCompact (U ∩ V)` | Characterizes quasi-separated *spaces* via compactness of intersections of affine opens. |
| `quasiCompact_affineProperty_iff_quasiSeparatedSpace` | `AffineTargetMorphismProperty.diagonal (fun X _ _ _ ↦ CompactSpace X) f ↔ QuasiSeparatedSpace X` | Relates quasi-separatedness of `X` to a diagonal morphism property over affine targets. |
| `quasiSeparated_eq_diagonal_is_quasiCompact` | `@QuasiSeparated = MorphismProperty.diagonal @QuasiCompact` | Identifies the `QuasiSeparated` property as the diagonal of `QuasiCompact`. |
| `quasiSeparated_over_affine_iff` | `QuasiSeparated f ↔ QuasiSeparatedSpace X` (when `Y` affine) | Reduces quasi-separatedness of a morphism to quasi-separatedness of the source when the target is affine. |
| `quasiSeparatedSpace_iff_quasiSeparated` | `QuasiSeparatedSpace X ↔ QuasiSeparated (terminal.from X)` | Connects space-level and morphism-level quasi-separatedness via the terminal morphism. |
| `is_localization_basicOpen_of_qcqs` (**Qcqs lemma**) | `IsLocalization.Away f (Γ(X, X.basicOpen f))` (under `hU : IsCompact U.1`, `hU' : IsQuasiSeparated U.1`) | Core result: for qcqs open `U ⊆ X`, sections over `D(f) ⊆ U` localize as `Γ(X, U)_f`. |
| `exists_eq_pow_mul_of_isCompact_of_isQuasiSeparated` | `∃ n, y|_U = f^n * x` | Technical gluing lemma used in proof of Qcqs lemma: under qcqs assumptions, local sections extend after multiplying by a power of `f`. |
| `exists_of_res_eq_of_qcqs` | `f|_D(s) = g|_D(s) ⇒ ∃ n, s^n·f = s^n·g` | Cancellation lemma for sections agreeing on a basic open, under qcqs. |
| `isIso_ΓSpec_adjunction_unit_app_basicOpen` | `IsIso(...)` | Shows unit of `Γ ⊣ Spec` adjunction is iso on basic opens under global qcqs assumptions. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `quasiSeparated`: for properties of morphisms/spaces.
  - `is_`: e.g., `isCompact`, `isAffineOpen`, `isQuasiSeparated`, `isLocalization`.
  - `exists_`: for existence lemmas (e.g., `exists_eq_pow_mul_...`, `exists_of_res_eq_...`).
  - `of_`: e.g., `of_mono`, `of_comp`, `of_isAffineOpen`, `of_qcqs`.
- **Suffixes**:
  - `_iff`: for biconditional characterizations.
  - `_aux`, `_aux_aux`: intermediate technical lemmas.
  - `_of_`: e.g., `of_qcqs`, `of_isAffineOpen`, `of_comp`, `of_isPullback`.
- **Morphism properties**:
  - `isStableUnder...`: stability under composition/base change.
  - `pullback_fst`, `pullback_snd`: projections from pullbacks.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `erw`: rewriting with equivalences/defeqs.
- `simp`, `simp_rw`, `dsimp`: simplification, especially with sheaf restrictions and ring homs.
- `apply`, `exact`, `refine`: constructing proofs term-by-term.
- `obtain`, `cases`, `choose`: destructing existential quantifiers.
- `ext`: extensionality for morphisms/sets.
- `apply_fun`: applying a function to both sides of an equation.
- `fapply`: focused application (e.g., with `config`).
- `convert`: for converting proofs up to definitional equality.
- `ring`, `abel`: for commutative ring identities (implicit in `simp`/`ring`-like behavior).
- `aesop`: not explicitly used here — Lean’s `simp`/`rw`-heavy style dominates.

---

### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Many proofs use **induction on compact opens** (`compact_open_induction_on`), especially for sheaf-theoretic gluing.
- **Covering arguments**:
  - Use of finite affine covers for quasi-separated intersections (`isCompactOpen_iff_eq_finset_affine_union`).
- **Localization techniques**:
  - Key step: reduce to localization via `IsLocalization.eq_iff_exists` or `is_localization_basicOpen_of_qcqs`.
- **Sheaf gluing**:
  - `sheaf.eq_of_locally_eq'` used to glue sections over finite covers.
- **Homotopical/categorical reasoning**:
  - Pullback diagrams, universal properties, and isomorphisms (e.g., `Homeomorph.ofIsEmbedding`, `Pullback.fst_iso`).
- **Reduction to affine case**:
  - Many properties (e.g., quasi-separatedness) reduced via `HasAffineProperty.iff_of_isAffine` or affine covers.

---

### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.AlgebraicGeometry.Morphisms.Constructors`: basic morphism constructions.
- `Mathlib.AlgebraicGeometry.Morphisms.QuasiCompact`: quasi-compact morphisms.
- `Mathlib.Topology.QuasiSeparated`: topological quasi-separatedness.
- `Mathlib.Topology.Sheaves.CommRingCat`: sheaves of commutative rings.

**Domain scope**:
- **Algebraic geometry over schemes**, with emphasis on:
  - Morphism properties (quasi-separated, quasi-compact).
  - Sheaf cohomology / section behavior on basic opens.
  - Interactions between topology (compactness) and algebra (localization).
- **Key objects**: schemes, opens, affine opens, sections, basic opens `D(f)`, pullbacks, sheaves.

---

Let me know if you'd like a diagram of the main logical dependencies or a summary of how the Qcqs lemma fits into the broader theory (e.g., in proving valuative criteria or properness).