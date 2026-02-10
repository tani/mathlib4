Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Properties of Scheme Morphisms via Underlying Topological Maps**

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `topologically P` | `MorphismProperty` | Lifts a property `P` on continuous maps to a property on scheme morphisms via the base map. |
| `Surjective` | `Class` | A scheme morphism is *surjective* if its underlying continuous map is surjective. |
| `IsDominant` | `Class` | A scheme morphism is *dominant* if its underlying map has dense range. |
| `Injective`, `IsOpenMap`, `IsClosedMap`, `IsEmbedding`, `IsOpenEmbedding`, `IsClosedEmbedding` | `MorphismProperty` instances | Lifted via `topologically` from topology to schemes. |
| `specializingMap` | `TopologicalSpace.SpecializingMap` | A continuous map preserving specialization order; defined via closure of singletons. |
| `surjective_eq_topologically` | `lemma` | Equates `Surjective` with `topologically Function.Surjective`. |
| `dominant_eq_topologically` | `lemma` | Equates `IsDominant` with `topologically DenseRange`. |
| `surjective_of_isDominant_of_isClosed_range` | `lemma` | If a dominant morphism has closed range, then it is surjective. |
| `IsDominant.of_comp_of_isOpenImmersion` | `lemma` | If `f ≫ g` is dominant and `g` is an open immersion, then `f` is dominant. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` / `isLocalAtTarget`: e.g., `isEmbedding_isLocalAtTarget`, `isOpenMap_isLocalAtTarget`.
  - `surjective_`, `dominant_`, `injective_`, `specializingMap_`: module-specific prefixes.
- **Suffixes**:
  - `_isLocalAtTarget`: for properties local on the target.
  - `_respectsIso`: for properties stable under isomorphism.
  - `_comp_iff`, `_of_comp`: for composition-related lemmas.
- **General pattern**: `P_isLocalAtTarget`, `P_respectsIso`, `P.comp_iff`, `P.of_comp`.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: for rewriting and simplification (especially with `mk_iff`, `eq_top_iff`, `closure_subtype`, etc.).
- `obtain ⟨i, hxi⟩`, `obtain ⟨⟨y, _⟩, hy⟩`: existential destructuring.
- `convert ... using 1`: for flexible proof refinement.
- `apply_fun Subtype.val`: for manipulating subtype terms.
- `aesop`, `ring`, `linarith`: not explicitly used here — proofs are mostly algebraic-topological and rely on `simp`-based automation.
- `exact`, `intro`, `refine`, `apply`: standard proof construction.

#### **4. Proof Logic**

- **Structure**: Most proofs follow a modular pattern:
  1. **Lift property to morphisms** via `topologically_respectsIso` or `topologically_isLocalAtTarget`.
  2. **Verify stability under isomorphisms** (e.g., `RespectsIso`).
  3. **Verify locality on target** (e.g., `IsLocalAtTarget`) using open covers and gluing lemmas like `isOpenMap_iff_isOpenMap_of_iSup_eq_top`.
  4. **Composition lemmas** use:
     - `Function.Surjective.of_comp`, `DenseRange.comp`, etc.
     - `comp_mem` for `IsStableUnderComposition`.
- **Key reasoning patterns**:
  - **Induction on open covers** for locality proofs.
  - **Specialization/closure arguments** for `specializingMap`.
  - **Subtype manipulation** (e.g., `closure_subtype`, `Set.restrictPreimage_mk`) to handle open subsets.

#### **5. Imports**

- `Mathlib.Topology.LocalAtTarget`: Provides infrastructure for `topologically`, `IsLocalAtTarget`, `MorphismProperty`.
- `Mathlib.AlgebraicGeometry.Morphisms.Constructors`: Defines basic scheme morphism constructors and interfaces.

---

This file formalizes foundational categorical-topological properties of scheme morphisms, emphasizing how topological properties of the underlying map reflect scheme-theoretic behavior. It is highly structured, leveraging Lean’s `MorphismProperty` framework for modularity and reuse.