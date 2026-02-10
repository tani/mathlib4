### Technical Metadata Brief: `Mathlib.Analysis.Normed.Field.PolarSet` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `polar` | `polar (s : Set E) : Set F` | Defines the *absolute polar* of a subset `s ⊆ E` w.r.t. bilinear form `B`: `{ y ∈ F | ∀ x ∈ s, ‖B x y‖ ≤ 1 }`. |
| `polar_mem_iff` | `y ∈ B.polar s ↔ ∀ x ∈ s, ‖B x y‖ ≤ 1` | Characterizes membership in the polar. |
| `polar_eq_iInter` | `B.polar s = ⋂ x ∈ s, { y | ‖B x y‖ ≤ 1 }` | Expresses the polar as an intersection of sublevel sets. |
| `polar_gc` | `GalCon (OrderDual.toDual ∘ polar) (flip.polar ∘ OrderDual.ofDual)` | Establishes a Galois connection (order-reversing) between polar maps of `B` and `B.flip`. |
| `polar_antitone` | `Antitone (polar : Set E → Set F)` | Follows from the Galois connection: larger sets have smaller polars. |
| `subset_bipolar` | `s ⊆ B.flip.polar (B.polar s)` | Every element of `s` lies in the bipolar of `s`. |
| `tripolar_eq_polar` | `polar (flip.polar (polar s)) = polar s` | Tripolar reduces to polar — idempotence up to flip. |
| `polar_weak_closed` | `IsClosed[WeakBilin...] (polar s)` | Polar sets are closed in the weak topology induced by `B.flip`. |
| `polar_univ` | `SeparatingRight B → polar univ = {0}` | If `B` is right-separating, the polar of the whole space is just `{0}`. |
| `polar_subMulAction` | `polar m = { y | ∀ x ∈ m, B x y = 0 }` | For sets `m` closed under scalar multiplication, the polar coincides with the annihilator. |
| `polarSubmodule` | `Submodule 𝕜 F` | Defines the polar of an `SMulMemClass`-set as a submodule (kernel intersection). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `polar_`: All definitions and theorems related to the polar set.
  - `mem_`, `zero_mem_`, `subset_`, `antitone`, `gc`: Standard mathematical properties.
- **Suffixes**:
  - `_iff`, `_mem`, `_eq_iInter`, `_closed`, `_univ`, `_subMulAction`, `_Submodule`: Indicate logical equivalence, membership, structural representation, topological property, or algebraic refinement.
- **Functional patterns**:
  - `polar_iUnion`, `polar_union`, `polar_empty`, `polar_singleton`, `polar_zero`: Behavior under set operations.
  - `polar_gc`: Galois connection; uses `OrderDual` to encode antitone behavior.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise lemmas (e.g., `polar_mem_iff`, `map_zero`, `norm_zero`). |
| `rw [...]` | Rewriting using definitions or equalities (e.g., `B.flip_apply`, `Set.mem_setOf_eq`). |
| `exact`, `refine`, `intro`, `apply` | Standard natural-deduction style proof construction. |
| `gcongr` | Used in `polar_univ` to handle inequalities involving norms and scalars. |
| `ext` | Extensionality for sets, submodules, functions. |
| `isClosed_iInter`, `isClosed_le`, `continuous_const` | Topological arguments (closedness via continuity). |
| `normed_field_tac` (implicit): `NormedField.exists_lt_norm`, `norm_inv`, `mul_inv_cancel` | Normed field arithmetic and estimation. |
| `antisymm` | Proving equality of sets via mutual inclusion. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *definition-first* approach: expand definitions (`polar`, `iInter`, `mem`), then apply basic logic (`intro`, `apply`, `rw`).
  - **Galois connection** (`polar_gc`) is proven directly via curried implications — no heavy machinery.
  - **Set-theoretic properties** (`polar_union`, `polar_iUnion`, `antitone`) derive from the Galois connection (`polar_gc.l_sup`, `l_iSup`, `monotone_l`).
  - **Topological results** (`polar_weak_closed`) use continuity of evaluation maps in `WeakBilin` and standard closed-set operations (`isClosed_le`, `isClosed_iInter`).
  - **Algebraic refinements** (`polar_subMulAction`, `polarSubmodule`) rely on norm estimates and scalar-closure assumptions (`SMulMemClass`), often using contradiction (`contrapose!`) and density arguments.

- **Induction/Recursion**: Not used — mostly algebraic/topological reasoning.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Field.Basic` | Provides `NormedCommRing`, `NontriviallyNormedField`, norm properties. |
| `Mathlib.LinearAlgebra.SesquilinearForm` | Background on bilinear forms, flips, and evaluation. |
| `Mathlib.Topology.Algebra.Module.WeakBilin` | Defines the weak topology induced by a bilinear form (`WeakBilin.instTopologicalSpace`). |

**Domain Scope**:  
- Functional analysis in normed vector spaces over normed commutative rings / nontrivially normed fields.  
- Duality theory via bilinear forms, with emphasis on *absolute polars* (complex or real).  
- Applications to locally convex spaces, annihilators, and weak topologies.

**Tags**: `polar`, `duality`, `weak topology`, `annihilator`, `Galois connection`, `closed set`.

--- 

Let me know if you'd like a diagram of the Galois connection or a summary of how `polarSubmodule` relates to annihilators.