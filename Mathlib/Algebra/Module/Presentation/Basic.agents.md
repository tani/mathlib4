### Technical Brief: `Basic.lean` — Presentations of Modules in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Relations A` | `Type (u ⊔ w₀ ⊔ w₁)` | Encodes generators (`G`), relations (`R`), and coefficient maps `R → (G →₀ A)` for defining modules by generators and relations. |
| `Relations.Quotient` | `Type (u ⊔ w₀)` | The module presented by `relations : Relations A`: quotient of free module `G →₀ A` by submodule spanned by relations. |
| `Relations.toQuotient` | `(relations.G →₀ A) →ₗ[A] relations.Quotient` | Canonical surjection from free module to presented module. |
| `Relations.map` | `(relations.R →₀ A) →ₗ[A] (relations.G →₀ A)` | Linear map encoding all relations as linear combinations of generators. |
| `Relations.Solution M` | `Type (u ⊔ w₀ ⊔ v)` | Solutions to the system of linear equations defined by `relations` in module `M`: assignments of variables (`G → M`) satisfying all relations. |
| `Solution.π` | `(relations.G →₀ A) →ₗ[A] M` | Linear map induced by a solution (via linear combination). |
| `Solution.fromQuotient` | `relations.Quotient →ₗ[A] M` | Induced map from the presented module to `M`, factoring through the quotient. |
| `Solution.IsPresentation` | `Prop` | Predicate asserting that `solution.fromQuotient` is a linear isomorphism — i.e., `solution` gives a *universal* solution (presentation). |
| `Presentation A M` | `Type (u ⊔ w₀ ⊔ w₁ ⊔ v)` | A presentation of module `M`: data of `relations`, a solution, and proof it's a presentation. |
| `Presentation.ofIsPresentation` | Constructor | Builds a `Presentation` from a `relations` and a `solution.IsPresentation`. |
| `Presentation.ofLinearEquiv` | `Presentation A M → M ≃ₗ[A] N → Presentation A N` | Transport of presentations along linear equivalences. |
| `Solution.linearMapEquiv` | `(M →ₗ[A] N) ≃ relations.Solution N` | Universal property: linear maps out of `M` correspond bijectively to solutions in `N`. |
| `Solution.isPresentation_iff` | `↔` | Characterization: `solution.IsPresentation` iff `π` is surjective and `ker π = span relations`. |
| `Solution.ofQuotient_isPresentation` | `IsPresentation` | Canonical solution in `relations.Quotient` is a presentation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `to_`: canonical maps *to* a construction (`toQuotient`, `toLinearMap`).
  - `of_`: constructions *from* data (`ofQuotient`, `ofπ`, `ofπ'`, `ofLinearEquiv`).
  - `postcomp_`: post-composition with a linear map (`postcomp`, `postcomp_desc`, `postcomp_injective`).
  - `desc`: induced map from universal property (`desc`, `desc_var`).
  - `isPresentation`: predicate and core version (`IsPresentation`, `IsPresentationCore`).
  - `uniq`: uniqueness up to unique equivalence (`uniq`, `uniq_var`).

- **Suffixes**:
  - `_comp`: composition lemmas (`fromQuotient_comp_toQuotient`, `π_desc_apply`).
  - `_apply`: evaluation lemmas (`toQuotient_relation`, `map_single`).
  - `_ext`: extensionality lemmas (`Quotient.linearMap_ext`).
  - `_le_`, `_eq_`, `_span_`: submodule inclusion/equality/span lemmas.

- **Notable patterns**:
  - `π` for the linear map induced by a solution.
  - `var` for variable assignments in a solution.
  - `linearCombination_var_relation` for the relation satisfaction condition.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop` | Automated reasoning for linear algebra, module, and simplification goals (e.g., `toQuotient_map`, `π_comp_map`). |
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (`[ofπ]`, `[π_single]`, `[range_map]`, etc.). |
| `ext` | Extensionality for functions, linear maps, and Finsupp. |
| `rw` | Rewriting using equalities (e.g., `← ker_toQuotient`, `← range_map`). |
| `dsimp` / `unfold` | Delta-reduction for definitions (e.g., `dsimp only [toQuotient, Quotient]`). |
| `exact` / `assumption` | Closing goals with hypotheses or known facts. |
| `convert` / `congr` | Congruence reasoning (e.g., `congr_postcomp`, `congr_var`). |
| `have` / `suffices` | Intermediate lemma introduction. |
| `obtain` / `rcases` | Existential elimination (e.g., `⟨x, rfl⟩`). |
| `change` | Rewriting goal to match known lemmas. |
| `funext` / `ext` | Function extensionality (often implicit via `ext`). |

---

#### **4. Proof Logic**

Typical proof structure:

1. **Definitional unfolding**: `dsimp only [...]` to expose structure.
2. **Reduction to known lemmas**: `rw [← ..., ← ...]` to reduce to `ker`, `range`, or `span`.
3. **Use of Finsupp machinery**:
   - `Finsupp.linearCombination`, `Finsupp.range_linearCombination`, `Finsupp.lhom_ext'`.
4. **Quotient/module lifting**:
   - `Submodule.liftQ`, `Submodule.linearMap_qext`, `Submodule.mkQ_surjective`.
5. **Universal property arguments**:
   - Show `fromQuotient` is injective/surjective via `ker_π` and `span_eq_top`.
   - Use `isPresentation_iff` to reduce to two submodule equalities.
6. **Uniqueness via universal property**:
   - Construct `desc` using `IsPresentationCore.desc`.
   - Prove uniqueness via `postcomp_injective`.
7. **Universe management**:
   - Use `ULift` and `down` to shrink universe levels in `IsPresentationCore`.

Induction is *not* used — this is purely homological/algebraic reasoning.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Exact` | `Function.Exact` and related lemmas. |
| `Mathlib.Algebra.Module.ULift` | Universe shifting via `ULift`. |
| `Mathlib.LinearAlgebra.Quotient.Basic` | Quotient modules, `Submodule.mkQ`, `liftQ`. |
| `Mathlib.LinearAlgebra.Finsupp.LinearCombination` | `Finsupp.linearCombination`, `range_linearCombination`, `lhom_ext'`. |

These imports define the foundational algebraic infrastructure for modules, quotients, and linear combinations over `Finsupp`.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module Theory Scope)**

```mermaid
graph TD
  A[Ring A] --> B[Module A]
  B --> C[Free Module G →₀ A]
  B --> D[Submodule span]
  C --> E[Relations.G →₀ A]
  D --> F[Submodule span relations]
  E --> G[Quotient E / F]
  G --> H[Module presented by relations]
  C --> I[Map (R →₀ A) → (G →₀ A)]
  I --> J[Exact sequence: R→G→M→0]
  H --> K[Presentation A M]
  K --> L[Universal property: M ≃ Quotient]
```

##### **Overview of `Basic.lean` Structure**

```mermaid
flowchart LR
  subgraph Relations
    R[Relations A] --> G[Generators G]
    R --> Rels[Relations R]
    R --> Map[Map: R→₀A → G→₀A]
    R --> Quot[Quotient = (G→₀A)/span(range Map)]
  end

  subgraph Solutions
    Quot --> Sols[Solution M]
    Sols --> Var[var: G → M]
    Sols --> Pi[π: G→₀A → M]
    Sols --> FromQ[fromQuotient: Quotient → M]
  end

  subgraph Presentations
    Sols --> Pres[IsPresentation]
    Pres --> Bijective[fromQuotient bijective]
    Pres --> Equiv[Quotient ≃ₗ M]
    Pres --> LinMapEquiv[(M→N) ≃ Solution N]
  end

  subgraph Presentation Type
    Pres --> P[Presentation A M]
    P -->|Constructor| Pres
    P -->|Transport| P'[Presentation A N via e: M≃ₗN]
  end

  style Relations fill:#f9f,stroke:#333
  style Solutions fill:#bbf,stroke:#333
  style Presentations fill:#bfb,stroke:#333
  style Presentation Type fill:#f96,stroke:#333
```

---

#### **7. Summary**

This file formalizes the classical notion of *modules defined by generators and relations* in homological algebra, with full attention to:
- Constructing the presented module as a quotient of a free module.
- Characterizing solutions to linear systems over modules.
- Proving the universal property of presentations (via `IsPresentation`).
- Enabling transport of presentations along linear equivalences.

It serves as a foundational module for future work on finite presentations (`Module.FinitePresentation`) and behavior under extension/restriction of scalars (as noted in the `TODO`).

The formalization is highly structured, leveraging `Finsupp`, `Quotient`, and `Submodule` infrastructure, with a clean separation of data (`Relations`, `Solution`) and properties (`IsPresentation`).
