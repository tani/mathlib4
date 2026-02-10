### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSubfield` | `structure IsSubfield extends IsSubring S : Prop` | Predicate stating that a subset `S ⊆ F` of a field `F` is the underlying set of a subfield (deprecated in favor of bundled `Subfield F`). |
| `inv_mem` | `∀ {x : F}, x ∈ S → x⁻¹ ∈ S` | Axiom of `IsSubfield`: closed under multiplicative inverses. |
| `IsSubfield.div_mem` | `x / y ∈ S` | Closure under division, derived from closure under multiplication and inverses. |
| `IsSubfield.pow_mem` | `a ^ n ∈ s` for `n : ℤ` | Closure under integer powers (uses `zpow`). |
| `closure` | `Set F := { x | ∃ y, z ∈ Ring.closure S, y / z = x }` | Minimal subfield containing `S`, defined as ratios of elements in the ring closure. |
| `closure.isSubfield` | `IsSubfield (closure S)` | Proof that `closure S` is indeed a subfield. |
| `mem_closure` | `a ∈ S → a ∈ closure S` | Inclusion of `S` into its closure. |
| `closure_mono` | `s ⊆ t → closure s ⊆ closure t` | Monotonicity of closure. |
| `closure_subset_iff` | `closure s ⊆ t ↔ s ⊆ t` (for `t` a subfield) | Universal property of closure. |
| `isSubfield_iUnion_of_directed` | Directed union of subfields is a subfield | Closure under directed unions. |
| `IsSubfield.inter`, `IsSubfield.iInter` | Intersection of subfields is a subfield | Closure under arbitrary intersections. |

---

#### 2. **Naming Conventions**

- **Predicate prefix**: `IsSubfield`, `IsSubring` — standard Lean pattern for *unbundled* algebraic structures.
- **Structure extension**: `extends IsSubring S` — inherits ring-theoretic closure properties.
- **Property suffixes**:
  - `_mem`: membership closure (e.g., `inv_mem`, `div_mem`, `pow_mem`, `zero_mem`, `neg_mem`, `mul_mem`).
  - `_preimage`, `_image`, `_range`: behavior under ring homomorphisms.
  - `closure_`: minimal subfield containing a set.
- **Helper lemmas**:
  - `subset_closure`, `ring_closure_subset`, `closure_subset`, `closure_subset_iff`, `closure_mono`: closure-related inclusion lemmas.
  - `isSubfield_iUnion_of_directed`, `IsSubfield.inter`, `IsSubfield.iInter`: closure under set-theoretic operations.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rw` — rewriting definitions (e.g., `div_eq_mul_inv`, `zpow_natCast`, `map_inv₀`, `div_one`, `neg_div`, `inv_div`, `div_add_div`, `div_mul_div_comm`).
- `exact`, `apply`, `intro`, `rcases`, `cases'` — basic proof construction.
- `by_cases` — case analysis on equalities (e.g., `hq0 : q = 0`).
- `ring` / `simp` (implied via `simp_rw` or `simp only`) — for field/ring identities (e.g., `div_add_div`, `inv_div`).
- `Set.Subset.trans` — transitivity of subset inclusion.
- `Set.mem_iUnion.1 / .2`, `Set.mem_iInter.1 / .2` — set-theoretic reasoning for unions/intersections.

No heavy automation (e.g., `aesop`, `linarith`) is used — proofs are mostly direct and structural.

---

#### 4. **Proof Logic**

- **Inductive/constructive style**: Proofs often proceed by unpacking definitions (e.g., `rcases ha with ⟨p, hp, q, hq, rfl⟩`) and constructing witnesses.
- **Case analysis on zero**: For division-based arguments (e.g., `by_cases hq0 : q = 0`), handling zero separately avoids division-by-zero issues.
- **Leveraging bundled structures**: Uses `Ring.closure`, `IsSubring`, `IsSubmonoid`, etc., as building blocks.
- **Universal property reasoning**: For closure lemmas (`closure_subset`, `closure_subset_iff`), uses the minimality of `closure S`.
- **Directed/intersection arguments**: Standard lattice-theoretic closure properties (directed unions, finite/infinitary intersections).

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Field.Basic` | Core field theory (division, inverses, field axioms). |
| `Mathlib.Deprecated.Subring` | Provides `IsSubring`, `Ring.closure`, and related deprecated unbundled subring machinery. |
| `Mathlib.Algebra.GroupWithZero.Units.Lemmas` | Tools for `inv_mem`, `map_inv₀`, and zero-compatible group operations (e.g., `map_inv₀`). |

> **Note**: This file is explicitly **deprecated**. The bundled `Subfield F` (from `FieldTheory.Subfield`) is the recommended replacement.

--- 

Let me know if you'd like a migration guide to `Subfield F` or formalization suggestions for modern usage.