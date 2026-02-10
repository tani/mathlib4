**Technical Brief: HahnEmbedding.lean**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HahnEmbedding.Seed ℚ M ℝ` | `Type` | A seed data structure for constructing the Hahn embedding; includes Archimedean strata and embeddings into `ℝ`. |
| `ArchimedeanClass M` | `Type` | The type of finite Archimedean classes of the ordered additive group `M`. |
| `FiniteArchimedeanClass M` | `Type*` | Alias for `ArchimedeanClass M` (finite part only). |
| `Lex ℝ⟦Ω⟧` | `Type` | Lexicographically ordered Hahn series over `ℝ` with well-ordered support in `Ω`. |
| `DivisibleHull M` | `Type` | The divisible hull of `M` as an ordered abelian group. |
| `hahnEmbedding_isOrderedModule_rat` | `∃ f : M →ₗ[ℚ] Lex ℝ⟦FiniteArchimedeanClass M⟧, StrictMono f ∧ …` | Constructs a strictly monotone ℚ-linear embedding of `M` into a Hahn series module, respecting Archimedean class structure. |
| `hahnEmbedding_isOrderedAddMonoid` | `∃ f : M →+o Lex ℝ⟦FiniteArchimedeanClass M⟧, Function.Injective f ∧ …` | **Main theorem**: Hahn embedding — every linearly ordered abelian group embeds as an ordered subgroup of a Hahn series group over `ℝ`, indexed by its own finite Archimedean classes. |
| `DivisibleHull.coeOrderAddMonoidHom M` | `M →+o DivisibleHull M` | Canonical order-preserving additive monoid homomorphism from `M` to its divisible hull. |
| `HahnSeries.embDomainOrderAddMonoidHom` | `Lex ℝ⟦Ω₁⟧ →+o Lex ℝ⟦Ω₂⟧` | Induced embedding of Hahn series domains via an order isomorphism `Ω₁ ≃o Ω₂`. |

---

### 2. NAMING CONVENTIONS

- **`isOrdered…`**: Predicate or construction for ordered algebraic structures (e.g., `IsOrderedAddMonoid`, `IsOrderedModule`).
- **`hahnEmbedding_…`**: Core theorems related to the Hahn embedding.
- **`ofLex` / `mk`**: Projection / inclusion maps between `Lex ℝ⟦Ω⟧` and its `orderTop`-based representation.
- **`withTopOrderIso` / `withTopCongr`**: Isomorphisms involving `WithTop` (adding a top element).
- **`embDomain…`**: Embeddings induced by domain isomorphisms in Hahn series.
- **`DivisibleHull…`**: Functions and isomorphisms related to divisible hulls.
- **`ArchimedeanClass…` / `FiniteArchimedeanClass…`**: Notation for Archimedean class constructions.

---

### 3. TACTIC STACK

- `obtain`, `choose`, `refine`, `simp`, `simp_rw`, `cases`, `apply`, `intro`, `rw`, `exact`, `inferInstance`, `monotone`, `strictMono_of_injective`, `OrderHomClass.monotone`, `Monotone`, `injective`, `OrderIso`, `withTopCongr`, `DivisibleHull`, `HahnSeries`.

Most proofs use:
- **`simp` / `simp_rw`** for rewriting definitions and simplifying structure maps.
- **`obtain` + `choose`** to extract witnesses from existence statements (e.g., Archimedean homs into `ℝ`).
- **`refine`** to construct composite morphisms step-by-step.
- **`cases`** on `ofLex a).orderTop` to handle top vs. coe cases.

---

### 4. PROOF LOGIC

The proof of `hahnEmbedding_isOrderedAddMonoid` proceeds via a **three-stage factorization**:

1. **Embed `M` into its divisible hull `D-Hull M`** via `f₁ = DivisibleHull.coeOrderAddMonoidHom`.  
   - This is injective and order-preserving.
   - Archimedean classes are preserved via `DivisibleHull.archimedeanClassOrderIso`.

2. **Apply the rational-linear Hahn embedding** (`hahnEmbedding_isOrderedModule_rat`) to `D-Hull M`, yielding `f₂`.  
   - This uses the fact that divisible ordered ℚ-modules admit strictly monotone ℚ-linear embeddings into `Lex ℝ⟦Ω⟧`.
   - Again, Archimedean class compatibility is ensured.

3. **Transport the index set** from `FiniteArchimedeanClass (D-Hull M)` to `FiniteArchimedeanClass M` via the Archimedean class isomorphism, using `f₃ = HahnSeries.embDomainOrderAddMonoidHom`.  
   - This preserves order and injectivity.

The final embedding is the composition `f₃ ∘ f₂ ∘ f₁`, and the Archimedean class condition is verified by unfolding definitions and simplifying with the isomorphisms.

---

### 5. IMPORTS (PRIMARY DEPENDENCIES)

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Module.HahnEmbedding` | Core definitions and lemmas about Hahn embeddings and Archimedean strata. |
| `Mathlib.Algebra.Module.LinearMap.Rat` | ℚ-linear maps and their properties. |
| `Mathlib.Algebra.Field.Rat` | Field structure of `ℚ`. |
| `Mathlib.Analysis.RCLike.Basic` | Real-closed-like structures (used for `ℝ`-valued embeddings). |
| `Mathlib.Data.Real.Embedding` | Embeddings into `ℝ`. |
| `Mathlib.GroupTheory.DivisibleHull` | Construction and properties of divisible hulls of ordered groups. |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[Ordered Additive Group M] --> B[DivisibleHull M]
  B --> C[Lex ℝ⟦FiniteArchimedeanClass (DivisibleHull M)⟧]
  C --> D[Lex ℝ⟦FiniteArchimedeanClass M⟧]
  A -->|f₁| B
  B -->|f₂| C
  C -->|f₃| D
  D -->|final embedding| E[Lex ℝ⟦FiniteArchimedeanClass M⟧]
```

#### Overview of Theoretical Flow

```mermaid
flowchart LR
  subgraph Setup
    M[Ordered Additive Group M]
    Arch[FiniteArchimedeanClass M]
  end

  subgraph Step1
    D[Hull M]
    f1[M →+o Hull M]
  end

  subgraph Step2
    L1[Lex ℝ⟦Arch (Hull M)⟧]
    f2[Hull M →+o L1]
  end

  subgraph Step3
    L2[Lex ℝ⟦Arch M⟧]
    f3[L1 →+o L2]
  end

  M -- f₁ --> D
  D -- f₂ --> L1
  L1 -- f₃ --> L2
  M -.->|f₃ ∘ f₂ ∘ f₁| L2

  Arch <-->|withTopOrderIso| L2
```

---

### 7. SUMMARY

This file formalizes the **Hahn embedding theorem** for linearly ordered abelian groups: any such group `M` embeds order-additively and injectively into a lexicographically ordered Hahn series group over `ℝ`, with exponents indexed by `M`’s finite Archimedean classes. The proof leverages:
- Divisible hulls to reduce to the ℚ-module case,
- A rational-linear Hahn embedding (already formalized),
- Domain transport via Hahn series embeddings.

The formalization is highly structured, with careful tracking of Archimedean class behavior at each stage, and uses Lean’s `OrderAddMonoidHom`, `Lex`, and `HahnSeries` infrastructure extensively.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.lean` file-level), or a breakdown of auxiliary lemmas used.
