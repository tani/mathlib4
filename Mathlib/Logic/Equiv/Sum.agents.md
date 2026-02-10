**Technical Brief: `Sum.lean` — Equivalences for Sum Types in Lean 4 / Mathlib**

---

### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `psumEquivSum α β` | `α ⊕' β ≃ α ⊕ β` | Equivalence between partial sum (`PSum`) and standard sum (`Sum`). |
| `sumCongr ea eb` | `α₁ ≃ α₂ → β₁ ≃ β₂ → α₁ ⊕ β₁ ≃ α₂ ⊕ β₂` | Congruence of equivalences over `Sum`; lifts `Equiv.map` to an equivalence. |
| `sumCongr_trans` | `(e.trans f) ≃ (e.trans g) → ...` | Compatibility of `sumCongr` with equivalence composition. |
| `sumCongr_symm` | `(sumCongr e f).symm = sumCongr e.symm f.symm` | Symmetry commutes with `sumCongr`. |
| `sumCongr_refl` | `sumCongr refl refl = refl` | Identity case for `sumCongr`. |
| `psumCongr e₁ e₂` | `α ≃ β → γ ≃ δ → α ⊕' γ ≃ β ⊕' δ` | Congruence for `PSum`. |
| `psumSum ea eb` | `α₁ ≃ α₂ → β₁ ≃ β₂ → α₁ ⊕' β₁ ≃ α₂ ⊕ β₂` | Bridge between `PSum` and `Sum` via `psumEquivSum`. |
| `sumPSum ea eb` | `α₁ ≃ α₂ → β₁ ≃ β₂ → α₁ ⊕ β₁ ≃ α₂ ⊕' β₂` | Dual of `psumSum`. |
| `subtypeSum p` | `{c // p c} ≃ {a // p (inl a)} ⊕ {b // p (inr b)}` | Subtype of a sum ≃ sum of subtypes. |
| `sumCongr` (in `Perm`) | `Perm α → Perm β → Perm (α ⊕ β)` | Lifts permutations to sum. |
| `boolEquivPUnitSumPUnit` | `Bool ≃ PUnit ⊕ PUnit` | `Bool` ≃ disjoint union of two unit types. |
| `sumComm α β` | `α ⊕ β ≃ β ⊕ α` | Commutativity of `Sum`, via `Sum.swap`. |
| `sumAssoc α β γ` | `(α ⊕ β) ⊕ γ ≃ α ⊕ (β ⊕ γ)` | Associativity of `Sum`. |
| `sumSumSumComm α β γ δ` | `(α ⊕ β) ⊕ γ ⊕ δ ≃ (α ⊕ γ) ⊕ β ⊕ δ` | Four-way reassociation (matches `add_add_add_comm`). |
| `sumEmpty α β [IsEmpty β]` | `α ⊕ β ≃ α` | Adding an empty type on the right does nothing. |
| `emptySum α β [IsEmpty α]` | `α ⊕ β ≃ β` | Adding an empty type on the left does nothing. |
| `sumEquivSigmaBool α β` | `α ⊕ β ≃ Σ b, bif b then β else α` | Sum ≃ sigma over `Bool`, encoding left/right as `false`/`true`. |
| `sigmaFiberEquiv f` | `(Σ y, {x // f x = y}) ≃ α` | Natural equivalence between total space and domain of a function. |
| `sigmaEquivOptionOfInhabited α` | `Σ β, α ≃ Option β` | Inhabited type ≃ `Option β` for some `β`. |
| `sumCompl p` | `{a // p a} ⊕ {a // ¬p a} ≃ α` | Decomposition of `α` into a predicate and its complement. |
| `prodSumDistrib α β γ` | `α × (β ⊕ γ) ≃ (α × β) ⊕ (α × γ)` | Left distributivity of product over sum. |
| `sigmaSumDistrib α β` | `(Σ i, α i ⊕ β i) ≃ (Σ i, α i) ⊕ (Σ i, β i)` | Distributivity of `Sigma` over `Sum` (index fixed, sum inside). |
| `sumSigmaDistrib t` | `(Σ i, t i) ≃ (Σ i, t (inl i)) ⊕ (Σ i, t (inr i))` | Distributivity of `Sigma` over `Sum` (sum in index). |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `sum`: for equivalences involving `Sum` (`α ⊕ β`).
  - `psum`: for `PSum` (`α ⊕' β`).
  - `prod`: for product-related equivalences.
  - `sigma`: for `Sigma`-type equivalences.
  - `congr`: for congruence lemmas (`sumCongr`, `psumCongr`).
  - `distrib`: for distributivity laws (`prodSumDistrib`, `sigmaSumDistrib`, `sumSigmaDistrib`).
  - `empty`: for equivalences involving `IsEmpty`.
  - `comm`/`assoc`: for commutativity/associativity.
  - `compl`: for complement-based decompositions (`sumCompl`).
  - `Equiv.` namespace prefix for all main definitions.

- **Suffixes**:
  - `_symm`: for symmetry lemmas.
  - `_apply`: for function application lemmas (e.g., `sumCompl_apply_inl`).
  - `_trans`, `_refl`: for structural properties.

- **`[simps]` / `[simps! symm_apply]`**: auto-generate simplification lemmas for projections and symmetry.

---

### 3. **Tactic Stack**

- **Core tactics**:
  - `cases`, `rcases`, `intro`, `rintro`
  - `rfl`, `simp`, `dsimp`
  - `split_ifs`, `dif_neg`, `dif_pos`
  - `ext`, `apply`, `exact`
  - `congr` (for `congr_arg`-style reasoning)
  - `calc` (for chain of equivalences, e.g., `prodSumDistrib`)

- **Simplifier usage**:
  - Heavy use of `@[simp]`, `@[grind =]`, `@[simps]`, `@[simps! symm_apply]`.
  - `grind` tactic (from `Grind` library) for automated simplification of equivalence proofs.

- **No heavy automation** (e.g., no `aesop`, `linarith`, `omega`) — proofs are mostly structural and case-based.

---

### 4. **Proof Logic**

- **Induction / case analysis** on sum types (`inl`, `inr`) or `PSum`.
- **Definitional equality** (`rfl`) used heavily due to `@[simps]` and definitional behavior of `Sum.elim`, `Sum.map`, etc.
- **Equivalence chaining** via `.trans`, `.symm`, and `calc` blocks (e.g., `prodSumDistrib`).
- **Decidable reasoning** in `sumCompl` (uses `if ... then ... else` and `DecidablePred`).
- **Dependent elimination** in `sumSigmaDistrib`, `sigmaSumDistrib`, `sigmaFiberEquiv`.

**Typical proof pattern**:
```lean
by rintro (x | y) <;> rfl
```
or
```lean
by rcases x with (⟨a, h⟩ | ⟨b, h⟩) <;> rfl
```

---

### 5. **Imports**

- `Mathlib.Data.Option.Defs`
- `Mathlib.Data.Sigma.Basic`
- `Mathlib.Logic.Equiv.Prod`
- `Mathlib.Tactic.Coe`

→ Indicates this file builds on foundational equivalences (`Equiv`), sigma types, option types, and coercion tactics.

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Sum.lean] --> B[Mathlib.Data.Option.Defs]
  A --> C[Mathlib.Data.Sigma.Basic]
  A --> D[Mathlib.Logic.Equiv.Prod]
  A --> E[Mathlib.Tactic.Coe]

  D --> F[Mathlib.Logic.Equiv.Defs]  %% implied
  C --> G[Mathlib.Data.Sigma.Defs]
  B --> H[Mathlib.Data.Option.Basic]

  A --> I[Mathlib.Data.Sum.Basic] %% implicit via `open Sum`
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  Equiv[Equivalence Theory] --> SumEquiv[Sum Equivalences]
  SumEquiv --> Congr[Congruence Laws]
  SumEquiv --> Distrib[Distributivity]
  SumEquiv --> Decomposition[Decomposition: Complement, Empty, Sigma]
  Decomposition --> SubtypeSum
  Decomposition --> sumCompl
  Decomposition --> sumEmpty / emptySum
  Distrib --> prodSumDistrib
  Distrib --> sigmaSumDistrib
  Distrib --> sumSigmaDistrib
  Congr --> sumCongr
  Congr --> psumCongr
  Decomposition --> sumEquivSigmaBool
```

#### **Relationship to Other Files**

- `Equiv.Defs`: defines basic `Equiv` typeclass and operations (`refl`, `trans`, `symm`, `congr`).
- `Equiv.Prod`: defines product-based equivalences (`prodComm`, `prodAssoc`, `prodCongr`).
- `Equiv.Sum` (this file): extends `Equiv` to `Sum`, with distributivity, associativity, and sigma encoding.
- `Equiv.Set.sumCompl`: set-theoretic version of `sumCompl`.
- `Algebra.Group.TransferInstance.lean`, `Module.TransferInstance.lean`: apply `Equiv` machinery to algebraic structures.

---

### 7. **Summary**

This file formalizes a rich algebra of equivalences for `Sum` (and `PSum`) types, enabling *type-theoretic* reasoning about disjoint unions up to canonical isomorphism. It supports:

- Structural properties (commutativity, associativity, identity with `IsEmpty`)
- Congruence lifting (`sumCongr`, `psumCongr`)
- Distributivity over product and sigma
- Decomposition via predicates (`sumCompl`) and inhabitedness (`sigmaEquivOptionOfInhabited`)
- Encoding sums as sigma over `Bool` (`sumEquivSigmaBool`)

All definitions are *canonical* (i.e., definitional up to symmetry), making them suitable for transport and transfer proofs in algebra and logic.

--- 

Let me know if you'd like a **dependency graph of the `Equiv` hierarchy** or a **proof automation sketch** for `sumCongr`-style lemmas.
