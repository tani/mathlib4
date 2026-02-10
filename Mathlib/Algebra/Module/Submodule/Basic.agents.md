**Technical Brief: `Basic.lean` — Submodule Theory in Lean 4 (Mathlib)**  
*Domain: Formalized Module Theory (Linear Algebra over Semirings/Rings)*  
*Scope: Foundational properties of submodules, with emphasis on monotonicity, closure under operations, and interaction with scalar actions.*

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Submodule R M` | `Type u → Type v → Type v` | Bundled additive submonoids closed under scalar multiplication by `R` |
| `toAddSubmonoid : Submodule R M → AddSubmonoid M` | Function | Forgets scalar action, retains additive monoid structure |
| `toAddSubgroup : Submodule R M → AddSubgroup M` | Function (when `R` is a ring) | Forgets scalar action, retains additive group structure |
| `toSubMulAction : Submodule R M → SubMulAction R M` | Function | Forgets additive structure, retains multiplicative action |
| `sum_mem` | `∀ t : Finset ι, (∀ c ∈ t, f c ∈ p) → ∑ i ∈ t, f i ∈ p` | Closure under finite sums |
| `sum_smul_mem` | `∀ t, r : ι → R, (∀ c ∈ t, f c ∈ p) → ∑ i ∈ t, r i • f i ∈ p` | Closure under linear combinations |
| `isCentralScalar` | Instance | Central scalar action descends to submodule |
| `instIsTorsionFree` | Instance | Torsion-freeness descends to submodule |
| `vadd_def` | `g +ᵥ m = (g : M) +ᵥ m` | Compatibility of `VAdd` on submodule with ambient action |
| `neg_coe` | `-(p : Set M) = p` | Submodule is symmetric under negation (ring case) |
| `notMem_of_ortho` | `(∀ c y, c • x + y = 0 → c = 0) → x ∉ p` | Orthogonality criterion for non-membership |
| `ne_zero_of_orth` | Same hypothesis ⇒ `x ≠ 0` | Nonzero from orthogonality condition |
| `smul_mem_iff` | `s ≠ 0 ⇒ (s • x ∈ p ↔ x ∈ p)` | Invertible scalar action preserves membership |
| `Subspace R M` | Abbreviation | `Submodule R M` when `R` is a division ring (i.e., vector space) |

---

### 2. NAMING CONVENTIONS

- **`to*`**: Forgetful functors from `Submodule` to simpler structures (`toAddSubmonoid`, `toAddSubgroup`, `toSubMulAction`)
- **`_*_mem`**: Membership closure properties (`sum_mem`, `smul_mem`, `neg_coe` — note `neg_coe` is about set equality, not element membership)
- **`_*_iff`**: Equivalence statements involving membership (`smul_mem_iff`)
- **`_*_mono` / `_*_strictMono`**: Monotonicity/strict monotonicity of forgetful maps
- **`_*_le`**: Equivalence between inclusion in submodule and inclusion of underlying structures (`toAddSubmonoid_le`, `toAddSubgroup_le`)
- **`inst*` / `is*`**: Typeclass instances (`instIsTorsionFree`, `isCentralScalar`)
- **`vadd_*`**: Additive action transfer (`vaddCommClass`, `FaithfulVAdd`, `vadd_def`)

---

### 3. TACTIC STACK

- `rfl`: Used in definitional equalities (`vadd_def`, `neg_coe`, `toAddSubgroup_toAddSubmonoid`)
- `id`: For trivial `StrictMono` proofs (`toAddSubmonoid_strictMono`, `toAddSubgroup_strictMono`)
- `simp`: In `notMem_of_ortho`, `ne_zero_of_ortho` to simplify `zero_mem`
- `intro`, `simpa`, `mt`: Standard natural-deduction style in orthogonality lemmas
- `Set.ext`, `Subtype.ext`: Extensionality for sets and subtypes
- `mono`: Implicitly via `@[mono]` attribute and `monotone` lemmas

No heavy automation (e.g., `aesop`, `ring`, `simp_rw`) appears — proofs are mostly definitional or rely on `simp` + basic logic.

---

### 4. PROOF LOGIC

- **Definitional reasoning**: Most theorems (e.g., `toAddSubmonoid_le`, `vadd_def`) follow by `rfl` or `Iff.rfl`.
- **Monotonicity via identity**: `StrictMono` proofs are `fun _ _ => id`, i.e., the underlying map is literally inclusion of sets.
- **Instance derivation**: Typeclass instances (`isCentralScalar`, `instIsTorsionFree`) lift properties via forgetful maps (`p.toSubMulAction.isCentralScalar`, `Subtype.coe_injective.moduleIsTorsionFree`).
- **Contrapositive + simplification**: Orthogonality lemmas use `mt` (contrapositive) and `simpa` to reduce to `zero_mem`.
- **Set equality via extensionality**: `neg_coe` uses `Set.ext` and `p.neg_mem_iff`.

---

### 5. IMPORTS (PRIMARY DEPENDENCIES)

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Field.Defs` | Definitions of fields, division rings (for `Subspace`) |
| `Mathlib.Algebra.Group.Pointwise.Set.Basic` | Set operations like `neg`, `smul` on subsets |
| `Mathlib.Algebra.Group.Submonoid.BigOperators` | `sum_mem` and finite sum closure |
| `Mathlib.Algebra.Module.Submodule.Defs` | Core definition of `Submodule` (not shown here, but imported) |
| `Mathlib.Algebra.Module.Torsion.Free` | `Module.IsTorsionFree` and related facts |

---

### 6. DEPENDENCY & THEORY OVERVIEW (Mermaid Diagrams)

#### A. Module Hierarchy (Conceptual)

```mermaid
graph TD
    A[Semiring R] --> B[AddCommMonoid M]
    B --> C[Module R M]
    C --> D[Submodule R M]
    D --> E[toAddSubmonoid : AddSubmonoid M]
    D --> F[toAddSubgroup : AddSubgroup M]  %% if Ring R
    D --> G[toSubMulAction : SubMulAction R M]
    D --> H[Subspace R M]  %% if DivisionRing R
```

#### B. File `Basic.lean` Internal Structure

```mermaid
graph LR
    A[Submodule] --> B[Monotonicity lemmas]
    A --> C[Additive action instances]
    A --> D[Torsion-free & central scalar instances]
    A --> E[Orthogonality lemmas (IsDomain)]
    A --> F[Invertible scalar action (smul_mem_iff)]
    A --> G[Subspace abbreviation]
```

#### C. Theory Context in Mathlib

- `Basic.lean` is a *foundational* submodule file: it assumes `Submodule` is already defined (in `Submodule.Defs`), and adds *derived* properties.
- It feeds into:
  - `Submodule.Basic` (likely extended in later files)
  - `LinearMap` (via `Submodule.ker`, `Submodule.map`)
  - `Module.Basic` (via torsion-free, central scalar, etc.)
  - `VectorSpace.Basic` (via `Subspace` abbreviation)

---

### 7. SUMMARY

This file formalizes the *elementary algebraic structure* of submodules: closure under sums and scalar multiplication, monotonicity of forgetful maps, and compatibility with derived actions (`VAdd`, `SMul`). It bridges the gap between the core `Submodule` definition and richer constructions (quotients, duals, tensor products), while also setting up vector spaces (`Subspace`) as a special case. The proofs are minimal and definitional — typical of foundational files in Mathlib — ensuring robust typeclass inference and modularity.
