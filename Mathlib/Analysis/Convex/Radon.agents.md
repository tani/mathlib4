### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `radon_partition` | `{f : ι → E} → ¬AffineIndependent 𝕜 f → ∃ I, (convexHull 𝕜 (f '' I) ∩ convexHull 𝕜 (f '' Iᶜ)).Nonempty` | Core result: any affine dependent family of points can be split into two subsets whose convex hulls intersect. |
| `helly_theorem'` | `{F : ι → Set E} {s : Finset ι} → (∀ i ∈ s, Convex 𝕜 (F i)) → (∀ I ⊆ s, #I ≤ d+1 → ⋂ I F ≠ ∅) → ⋂ s F ≠ ∅` | Finite-family Helly theorem for convex sets in finite-dimensional space. |
| `helly_theorem` | Same as above, but assumes `#s ≥ d+1` and only checks intersections of size exactly `d+1`. | Classical finite-family Helly theorem. |
| `helly_theorem_set'` | `F : Finset (Set E)` version of `helly_theorem'`. | Set-based finite Helly. |
| `helly_theorem_set` | Set-based classical Helly (size ≥ `d+1`, check `d+1`-subsets). |
| `helly_theorem_compact'` | Infinite-family Helly for compact convex sets, checking all subsets of size ≤ `d+1`. | Topological extension of Helly using finite intersection property. |
| `helly_theorem_compact` | Infinite-family classical Helly for compact convex sets. |
| `helly_theorem_set_compact'` / `helly_theorem_set_compact` | Set-based versions of compact Helly theorems. |

**Auxiliary definitions used:**
- `centerMass I w f`: weighted average over subset `I` with weights `w`.
- `affineIndependent_iff`: characterizes affine dependence via existence of nontrivial affine combination equal to zero.
- `vectorSpan`, `finrank`, `Submodule.finrank_le`: linear-algebraic tools for bounding dimension.

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `radon_`, `helly_`: main theorems.
  - `hel*'_`: "prime" variants (weaker assumptions, e.g., all subsets up to size `d+1`).
  - `hel*`: classical variants (assume `#s ≥ d+1`, only check subsets of size exactly `d+1`).
  - `hel*_set*`: set-based (rather than family-based) versions.
  - `hel*_compact*`: topological versions for compact sets.

- **Suffixes:**
  - `_corner`: trivial base case (small cardinality).
  - `_of_sum_add_sum_eq_zero`, `_of_nonpos`: helper lemmas for `centerMass_mem_convexHull*`.
  - `_mem_convexHull*`: membership lemmas for convex hulls via barycentric coordinates.

- **Variables:**
  - `I`, `J`: subsets (often filtered by sign of weights).
  - `s`: finite index set.
  - `a i`: a point in intersection of all sets except `F i`.
  - `w`: weight function used in affine dependence witness.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw`, `simp`, `simp_rw` | Rewriting definitions, simplifying sums, filters, images, intersections. |
| `rcases`, `obtain`, `cases'` | Extracting witnesses from existential hypotheses (e.g., from `affineIndependent_iff`). |
| `induction'` | Structural induction on natural numbers (e.g., on `#s`). |
| `exact`, `apply`, `refine` | Goal-directed proof construction. |
| `linarith`, `omega` | Solving linear arithmetic goals (e.g., inequalities on cardinalities). |
| `aesop` | Not explicitly used here, but `linarith`/`omega` cover arithmetic reasoning. |
| `convexHull_subset_iff`, `centerMass_mem_convexHull*` | Applied via `rw`/`apply` to reduce convex hull membership to weighted sums. |
| `biInter_subset_of_mem`, `sInter_mono` | Handling intersections over families/sets. |
| `isCompact.inter_iInter_nonempty` | Key for infinite compact case. |

---

#### 4. **Proof Logic**

- **Radon’s Theorem Proof Sketch:**
  1. From affine dependence, extract a nontrivial affine combination summing to zero.
  2. Partition indices by sign of weights (`I = {i ∈ s | w i ≥ 0}`, `J = s \ I`).
  3. Show the center of mass over `I` equals that over `J`, and lies in both convex hulls.

- **Helly’s Theorem Proof Sketch (finite case):**
  1. Induction on number of sets `n = #s`.
  2. Base case: `n ≤ d+1` handled by assumption.
  3. Inductive step:
     - Define `a i ∈ ⋂_{j ≠ i} F j` (possible by induction hypothesis).
     - Show `a` is affine dependent (since `n > d+1 = dim + 1`).
     - Apply Radon’s theorem to get partition `I`, point `p`.
     - Show `p ∈ ⋂ F i` by verifying `p ∈ F i` for each `i`, using convexity and definition of `a`.

- **Compact Helly Proof Sketch:**
  1. Use finite Helly to show every finite subfamily intersects.
  2. Apply finite intersection property for compact sets (closed subsets of compact space with FIP have nonempty intersection).

---

#### 5. **Imports & Scope**

**Primary imports:**
- `Mathlib.Analysis.Convex.Combination`: convex combinations, `centerMass`, `convexHull`.
- `Mathlib.Data.Set.Card`: cardinality of sets, `#s`, `encard`.
- `Mathlib.LinearAlgebra.AffineSpace.FiniteDimensional`: affine independence, `finrank`, `vectorSpan`.
- `Mathlib.Topology.Separation.Hausdorff`: Hausdorff spaces (needed for compact Helly: `T2Space E`).

**Domain scope:**
- Convex geometry in finite-dimensional vector spaces over linearly ordered fields (`𝕜`).
- Interplay between linear algebra (affine independence), topology (compactness), and combinatorics (cardinality bounds).
- Applications in discrete geometry (Helly-type theorems).

--- 

Let me know if you'd like a diagram of dependencies or a tactic-level proof trace.