### Technical Metadata Brief: Sober Spaces in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsGenericPoint x S` | `Prop` | `x` is a *generic point* of `S` iff `S = closure({x})`. |
| `QuasiSober α` | `Class` | Every nonempty irreducible closed subset of `α` has *some* generic point. |
| `genericPoint [QuasiSober α] [IrreducibleSpace α]` | `α` | A canonical generic point of the whole space (since `univ` is irreducible). |
| `IsIrreducible.genericPoint` | `α` | Generic point of the *closure* of an irreducible set `S`, using `QuasiSober` choice. |
| `genericPoints α` | `Set α` | Set of all points `x` such that `closure({x})` is an *irreducible component*. |
| `equiv [T0Space α] [QuasiSober α]` | `genericPoints α ≃ irreducibleComponents α` | Bijection between generic points and irreducible components in sober spaces. |
| `irreducibleSetEquivPoints [QuasiSober α] [T0Space α]` | `TopologicalSpace.IrreducibleCloseds α ≃o α` | Order-isomorphism between irreducible closed sets and points in a sober T₀ space. |

**Key Theorems:**
- `isGenericPoint_iff_specializes`: `x` is generic in `S` iff `S` is the set of points specializing to `x`.
- `IsGenericPoint.eq [T0Space α]`: In T₀ spaces, generic points are unique.
- `genericPoint_spec`: `closure({genericPoint α}) = univ`.
- `genericPoint_specializes`: `genericPoint α ⤳ x` for all `x`, in irreducible sober spaces.
- `quasiSober_of_open_cover`: Quasi-soberness is local (w.r.t. open covers).
- `T2Space.quasiSober`: All Hausdorff spaces are quasi-sober (irreducible subsets are singletons).
- `closure (genericPoints α) = univ`: Generic points are dense in sober spaces.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isGenericPoint_`: Properties of `IsGenericPoint`.
  - `genericPoint_`: Properties of the canonical generic point (in irreducible/quasi-sober contexts).
  - `component_`, `ofComponent_`: For bijection between components and generic points.
- **Suffixes:**
  - `_closure`: Relates to closure of singleton or set.
  - `_spec`: Specification property (e.g., `genericPoint_spec`).
  - `_def`: Definition equivalence (e.g., `isGenericPoint_def`).
- **Class names:**
  - `QuasiSober`, `IrreducibleSpace`, `T0Space`, `T2Space`: Standard topological separation axioms.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplify using definitions (`isGenericPoint_def`, `closure`, etc.).
- `rw`: Rewrite using equalities (e.g., `closure_eq_iff_isClosed`, `specializes_iff_mem_closure`).
- `exact`, `refine`, `convert`: Construct proofs term-by-term or with holes.
- `apply`: Apply lemmas (e.g., `closure_mono`, `subset_antisymm`).
- `cases`: Eliminate existential hypotheses (`obtain ⟨x, hx⟩ := ...`).
- `ext`: Extensionality for sets/functions.
- `aesop`: For routine topological reasoning (e.g., closure, openness, continuity).
- ` rfl`, `refl_`, `symm`, `trans`: Equational reasoning helpers.

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Use of `choose` (from `QuasiSober.sober`) to pick generic points.
- **Equational reasoning**: Many proofs proceed by chaining equalities involving `closure`, `specializes`, and `subset`.
- **Case analysis on separation axioms**:
  - T₀ → uniqueness of generic points.
  - T₂ → irreducible sets are singletons → quasi-sober.
- **Local-to-global arguments**:
  - `quasiSober_of_open_cover`: Prove property on open subsets, lift to whole space.
- **Order-theoretic reasoning**:
  - `irreducibleSetEquivPoints` uses `specializes` to relate specialization order and inclusion.

---

#### **5. Imports**

- `Mathlib.Topology.Sets.Closeds`: Core definitions about closed sets, closures, irreducibility.
- Implicit imports (via `TopologicalSpace`, `specializes`, etc.):
  - `Mathlib.Topology.Basic`
  - `Mathlib.Topology.Spaces.T0`
  - `Mathlib.Topology.Spaces.T2`
  - `Mathlib.OrderTheory.Closure.Operator` (for closure operators, irreducibility)

---

### Summary

This file formalizes the theory of *sober* and *quasi-sober* topological spaces in Lean 4, emphasizing the correspondence between points and irreducible closed subsets. It leverages:
- The specialization preorder (`⤳`) to characterize generic points.
- Choice (via `QuasiSober.sober`) to define generic points nonconstructively.
- Separation axioms (T₀, T₂) to ensure uniqueness or triviality of irreducible sets.

The development is foundational for schemes and Stone duality, where sober spaces play a central role.