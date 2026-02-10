Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `average` | `MonoidAlgebra k G` | The normalized sum of all group elements: `⅟|G| • ∑ g : G, of g`. Used to project onto invariants. |
| `mul_average_left` | `∀ g : G, (single g 1) * average = average` | Shows left-invariance of `average` under group algebra multiplication. |
| `mul_average_right` | `∀ g : G, average * (single g 1) = average` | Shows right-invariance of `average`. |
| `invariants` | `Submodule k V` | Subspace of vectors fixed by all `ρ g`. Defined via `∀ g, ρ g v = v`. |
| `mem_invariants` | `v ∈ invariants ρ ↔ ∀ g, ρ g v = v` | Membership criterion for the invariant subspace. |
| `invariants_eq_inter` | `carrier = ⋂ g, fixedPoints (ρ g)` | Equates invariants with intersection of fixed-point sets. |
| `invariants_eq_top` | `[ρ.IsTrivial] ⇒ invariants ρ = ⊤` | Trivial representation has full space of invariants. |
| `averageMap` | `V →ₗ[k] V` | Linear map given by action of `average k G` via representation algebra homomorphism. |
| `averageMap_invariant` | `averageMap ρ v ∈ invariants ρ` | Image of `averageMap` lies in invariant subspace. |
| `averageMap_id` | `v ∈ invariants ρ ⇒ averageMap ρ v = v` | Acts as identity on invariants. |
| `isProj_averageMap` | `LinearMap.IsProj invariants averageMap` | `averageMap` is a projection onto invariants. |
| `mem_invariants_iff_comm` | `(linHom ρ σ) g f = f ↔ f ∘ ρ g = σ g ∘ f` | Characterizes invariants in `linHom` as intertwiners. |
| `invariantsEquivRepHom` | `(linHom ρ σ).invariants ≃ₗ[k] ρ ⟶ σ` | Linear isomorphism between intertwiners and invariants of `linHom`. |
| `invariantsEquivFDRepHom` | `(linHom X.ρ Y.ρ).invariants ≃ₗ[k] X ⟶ Y` | Same as above, specialized to finite-dimensional representations (`FDRep`). |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `invariants_`: for definitions/theorems about invariant subspaces.
  - `average_`: for constructions and properties of the group average.
  - `mem_`: for membership characterizations (e.g., `mem_invariants`).
  - `isProj_`: for projection properties (e.g., `isProj_averageMap`).
- **Suffixes**:
  - `_left`, `_right`: for left/right invariance under multiplication.
  - `_iff`: for biconditional characterizations (e.g., `mem_invariants_iff_comm`).
  - `_eq_top`, `_eq_inter`: for equality with top or intersection.
- **Function names**:
  - `averageMap`, `invariantsEquivRepHom`, `invariantsEquivFDRepHom`: use camelCase and descriptive verbs (`map`, `equiv`, `hom`).

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: heavily used to simplify using lemmas and definitions.
- `rw [...]`: rewriting with group-theoretic or algebraic identities.
- `set f := ...`: local definition for clarity in summation arguments.
- `Function.Bijective.sum_comp [...]`: leverages bijectivity of multiplication maps to reindex sums.
- `ext`: extensionality for equality of functions/relations/submodules.
- `exact`, ` rfl`, `by aesop`, `ring`, `simp_rw`: for routine algebraic manipulations.

---

### 🔹 **Proof Logic**

- **Structure of proofs**:
  - **Inductive or case-based reasoning** is minimal; most proofs are direct algebraic manipulations.
  - **Summation reindexing** via bijectivity of left/right multiplication (e.g., `mulLeft_bijective`, `mulRight_bijective`) is central.
  - **Projection property** of `averageMap` is shown in two steps:
    1. Image lies in invariants (`averageMap_invariant`).
    2. Identity on invariants (`averageMap_id`).
  - **Equivalence proofs** (e.g., `invariantsEquivRepHom`) use `ext` and `hom_ext` to reduce to element-wise verification.

---

### 🔹 **Imports & Scope**

- **Core imports**:
  - `Mathlib.RepresentationTheory.Basic`
  - `Mathlib.RepresentationTheory.FDRep`
- **Key mathematical structures**:
  - `MonoidAlgebra k G`, `Representation k G V`, `Submodule k V`, `Module k V`, `AddCommMonoid V`.
  - `Fintype G`, `Invertible (Fintype.card G : k)` (assumes `|G|` invertible in `k`).
- **Category-theoretic machinery**:
  - `CategoryTheory`, `Action`, `Rep k G`, `FDRep k G`, `linHom`, `forget₂`, `hom`, ` ⟶`.

---

### 🔹 **Domain Summary**

This file formalizes the classical **averaging trick** in representation theory:
- Constructs the **invariant subspace** of a representation.
- Uses the **group algebra average** to define a canonical projection onto invariants.
- Relates **intertwiners** to **invariants of the internal hom representation**.
- Applies in contexts where `|G|` is invertible (e.g., characteristic 0), foundational for Maschke’s theorem and semisimplicity.

Let me know if you'd like a **dependency graph**, **proof outline**, or **automated lemma classification**.