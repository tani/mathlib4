**Technical Brief: `Submodule.lean` — Invariant Submodules of a Group Representation**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `invtSubmodule` | `ρ : Representation k G V → Sublattice (Submodule k V)` | Constructs the *lattice* of all submodules of `V` invariant under the action of `ρ(g)` for all `g : G`. Defined as the infimum (`⨅`) of pointwise invariant submodules. |
| `mem_invtSubmodule` | `p ∈ ρ.invtSubmodule ↔ ∀ g, p ∈ Module.End.invtSubmodule (ρ g)` | Characterizes membership in the invariant sublattice: a submodule `p` is invariant iff it is invariant under each `ρ(g)`. |
| `top_mem`, `bot_mem` | `⊤ ∈ ρ.invtSubmodule`, `⊥ ∈ ρ.invtSubmodule` | Trivial invariant submodules (whole space and zero) are always invariant. |
| `invtSubmodule.nontrivial_iff` | `Nontrivial ρ.invtSubmodule ↔ Nontrivial V` | The invariant sublattice is nontrivial iff the underlying module `V` is nontrivial. |
| `asAlgebraHom_mem_of_forall_mem` | `(∀ g v ∈ p, ρ g v ∈ p) → v ∈ p → x : k[G] ⇒ ρ.asAlgebraHom x v ∈ p` | Extends invariance under group elements to invariance under the entire group algebra `k[G]`. |
| `mapSubmodule` | `ρ.invtSubmodule ≃o Submodule k[G] ρ.asModule` | **Main theorem**: an order isomorphism between `ρ`-invariant submodules (as a sublattice of `Submodule k V`) and submodules of the induced `k[G]`-module structure (`ρ.asModule`). |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `invt_`: for properties/objects related to *invariance* (e.g., `invtSubmodule`, `mem_invtSubmodule`).
  - `coe_`: for coercion lemmas (e.g., `coe_top`, `coe_bot`).
  - `map_`/`comap_`: used in `Submodule.orderIsoMapComap`, indicating pullback/pushforward along an equivalence.
- **Suffixes**:
  - `_mem`: membership lemmas (e.g., `top_mem`, `bot_mem`, `asAlgebraHom_mem_of_forall_mem`).
  - `_iff`: logical equivalences (e.g., `nontrivial_iff`).
- **Structure**:
  - `ρ.invtSubmodule`: field notation for a definition depending on a representation `ρ`.
  - `ρ.asAlgebraHom`, `ρ.asModule`, `ρ.asModuleEquiv`: standard constructions from `Representation` (imported from `Mathlib.RepresentationTheory.Basic`).

---

### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: for simplifying goals using definitional equalities and lemmas (e.g., `simp [invtSubmodule]`, `simp only [Submodule.mem_comap]`).
- `rw`: rewriting using equivalences or equalities (e.g., `rw [← Subtype.coe_ne_coe]`).
- `aesop`: for automated reasoning in algebraic contexts (e.g., `aesop` in `right_inv`, `bot_ne_top`).
- `induction_on`: structural induction on `MonoidAlgebra` elements (used in `asAlgebraHom_mem_of_forall_mem`).
- `ext`: extensionality for subtype/equality proofs (e.g., `ext; simp`).
- `convert`: for flexible equality proofs with unification (e.g., `convert q.smul_mem ... using 1`).
- `refine`: constructing proofs with holes filled later (e.g., `refine ⟨⊥, ⊤, ?_⟩`).

---

### 4. **Proof Logic**

- **Structure of proofs**:
  - **Membership characterizations** (`mem_invtSubmodule`) use `rw` + `Sublattice.mem_iInf`.
  - **Bounded order instance** uses `intro` + `simp` to verify bounds.
  - **Nontriviality equivalence** uses `contrapose!` + `infer_instance` for one direction, and explicit witness construction (`⟨⊥, ⊤, ...⟩`) for the other.
  - **Main isomorphism `mapSubmodule`**:
    - `toFun`: constructs a `k[G]`-submodule from an invariant `k`-submodule using image under `ρ.asModuleEquiv` and verifies `smul_mem'` via `asAlgebraHom_mem_of_forall_mem`.
    - `invFun`: pulls back a `k[G]`-submodule along `ρ.asModuleEquiv` and checks invariance under `ρ(g)` using `MonoidAlgebra.of` and `asModuleEquiv_symm_map_rho`.
    - `left_inv`, `right_inv`: use `ext` + `simp` / `aesop`.
    - `map_rel_iff'`: shows order-preservation via双向 inclusion.

- **Inductive reasoning** appears in `asAlgebraHom_mem_of_forall_mem`, where induction on `x : k[G]` (as a `MonoidAlgebra`) reduces to verifying base cases (zero, unit, multiplication, addition).

---

### 5. **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Module.Submodule.Invariant` | Provides `Module.End.invtSubmodule`, the lattice of submodules invariant under a single endomorphism. |
| `Mathlib.RepresentationTheory.Basic` | Defines `Representation`, `asAlgebraHom`, `asModule`, `asModuleEquiv`, and related constructions. |
| `MonoidAlgebra` (scoped) | Enables notation and theory for group algebras `k[G]`. |

**Scope**: This file sits at the interface of module theory, representation theory, and lattice theory — formalizing the equivalence between representations of `G` over `k` and modules over the group algebra `k[G]`, *via* invariant submodules.

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[Submodule.lean] --> B[Mathlib.Algebra.Module.Submodule.Invariant]
  A --> C[Mathlib.RepresentationTheory.Basic]
  B --> D[Module.End.invtSubmodule]
  C --> E[Representation k G V]
  C --> F[k[G]-module structure]
  C --> G[asAlgebraHom, asModule, asModuleEquiv]
  A --> H[Sublattice (Submodule k V)]
  A --> I[Submodule k[G] ρ.asModule]
  H --> J[BoundedOrder]
  I --> K[Submodule lattice over k[G]]
  A -.->|order iso| J & K
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  subgraph Input
    R[ρ : Representation k G V]
  end

  subgraph Construction
    I[invtSubmodule ρ]
    M[Submodule k[G] ρ.asModule]
  end

  subgraph Equivalence
    ≃[mapSubmodule : ρ.invtSubmodule ≃o Submodule k[G] ρ.asModule]
  end

  R --> I
  R --> M
  I -- order-isomorphism --> M

  I --> B[bounded order]
  I --> N[nontriviality iff V]
```

---

### Summary

This file formalizes the foundational equivalence between $G$-invariant submodules of a representation $\rho$ and submodules of the associated $k[G]$-module. It leverages:
- the lattice-theoretic view of invariant submodules (`Sublattice`),
- the algebraic translation via the group algebra (`MonoidAlgebra`),
- and structural properties (bounded order, nontriviality) to support further representation-theoretic development (e.g., irreducibility, decomposition).
