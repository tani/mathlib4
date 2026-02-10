**Technical Brief: `Monomorphisms.lean`**

---

### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `monomorphisms C` | `MorphismProperty C` | The class of monomorphisms in category `C`. Defined via `hf : ∀ ⦃X⦄ (g h : X ⟶ _) , f ∘ g = f ∘ h → g = h`. |
| `epimorphisms C` | `MorphismProperty C` | The class of epimorphisms in `C`. Dual to monos: `f ∘ g = f ∘ h → g = h`. |
| `IsStableUnderCobaseChange` | `MorphismProperty C → Prop` | Property stating that if `f` has the property, then any cobase change (pushout along `f`) also has it. |
| `IsStableUnderBaseChange` | `MorphismProperty C → Prop` | Dual: stability under base change (pullback along `f`). |
| `instance : (monomorphisms C).IsStableUnderCobaseChange` | `Prop` | **Theorem**: In an abelian category, monos are stable under cobase change (i.e., pushouts of monos are monos). |
| `instance : (epimorphisms C).IsStableUnderBaseChange` | `Prop` | **Theorem**: In an abelian category, epis are stable under base change (i.e., pullbacks of epis are epis). |

> **Note**: These are *instances*, not named theorems — they are used implicitly by typeclass resolution.

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `monomorphisms`, `epimorphisms`: Standard class names for morphism properties.
  - `IsStableUnderCobaseChange`, `IsStableUnderBaseChange`: Property names for stability under (co)base change.
- **Suffixes**:
  - `mk'`: Constructor for `IsStableUnderCobaseChange`/`IsStableUnderBaseChange`, taking a proof of stability for a single morphism.
- **No custom abbreviations** — uses standard `MorphismProperty` infrastructure.

---

### 3. **Tactic Stack**

- `simp only [monomorphisms.iff] at hf ⊢`: Simplifies using the definition of monomorphism (`hf` is the hypothesis that `f` is mono).
- `infer_instance`: Fills remaining goals by typeclass inference (e.g., using abelian category axioms).
- `by` (tactic block): Minimal tactic script — relies on `simp` + `infer_instance`.

No heavy automation (e.g., `aesop`, `ring`, `conv`) — the proofs are *declarative* and rely on pre-proved lemmas in `MorphismProperty.Limits`.

---

### 4. **Proof Logic**

- **Structure**: Direct application of `mk'`, which reduces stability to verifying the property for a *single* morphism in a pushout/pullback square.
- **Monos under pushout**:
  1. Assume `f : A ⟶ B` is mono.
  2. Consider a pushout square:
     ```
     A ──f──► B
     │        │
     g        h
     ▼        ▼
     C ──k──► D
     ```
  3. Goal: Show `k` is mono.
  4. Use `simp only [monomorphisms.iff]` to reduce to diagrammatic condition.
  5. Apply abelian category properties (e.g., pushouts of monos are monos — already encoded in `MorphismProperty.Limits`).
  6. `infer_instance` discharges the goal via existing instance for `abelian` categories.

- **Epis under pullback**: Dual argument.

> **Key insight**: The proof is *not* constructive — it leverages the fact that `Abelian C` already implies the required stability (via `Limits` imports).

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.MorphismProperty.Limits` | Provides definitions and lemmas about stability under (co)base change, especially for abelian categories. |
| `Mathlib.CategoryTheory.Abelian.Basic` | Defines abelian categories and basic properties (e.g., existence of kernels/cokernels, factorization, exactness). |

> These imports encode the *categorical homological algebra* needed to justify stability.

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph**
```mermaid
graph TD
  A[Monomorphisms.lean] --> B[Mathlib.CategoryTheory.MorphismProperty.Limits]
  A --> C[Mathlib.CategoryTheory.Abelian.Basic]
  B --> D[MorphismProperty]
  B --> E[Limits in Categories]
  C --> F[Abelian Categories]
  D --> G[Stability under (co)base change]
  E --> G
  F --> G
```

#### **Overview of File & Theory Context**
```mermaid
flowchart LR
  subgraph Theory
    A[Abelian Categories] --> B[Morphism Properties]
    B --> C[Stability under (co)base change]
    C --> D[Monos stable under pushout]
    C --> E[Epis stable under pullback]
  end

  subgraph File
    A -->|imported| Monomorphisms[Monomorphisms.lean]
    Monomorphisms --> D
    Monomorphisms --> E
  end
```

> **Summary**: This file formalizes a foundational result in homological algebra: in an abelian category, monomorphisms (resp. epimorphisms) are preserved under pushouts (resp. pullbacks). It leverages the `MorphismProperty` framework to express and prove stability as typeclass instances.

--- 

Let me know if you'd like the corresponding dual file (`Epimorphisms.lean`) or a formalization of the underlying diagram lemmas.
