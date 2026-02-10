### Technical Brief: Tangent Cone and Unique Differentiability in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tangentConeAt` | `Set E → E → Set E` | Defines the set of tangent directions to a set `s` at a point `x`. Implemented via sequences scaling to infinity and converging to a direction. |
| `UniqueDiffWithinAt` | `Prop` (structure) | Ensures uniqueness of the derivative *within* `s` at `x`. Defined via density of the span of `tangentConeAt` and membership of `x` in `closure s`. |
| `UniqueDiffOn` | `Prop` (definition) | Ensures uniqueness of the derivative *along* `s` at all points of `s`. Universal quantification over points in `s` of `UniqueDiffWithinAt`. |
| `mem_tangentConeAt_of_pow_smul` | `r ≠ 0 ∧ ‖r‖ < 1 ∧ ∀ᶠ n, x + r^n • y ∈ s → y ∈ tangentConeAt s x` | Provides a practical criterion for membership in the tangent cone using geometric sequences. |
| `tangentCone_univ` | `tangentConeAt univ x = univ` | Tangent cone to the whole space is the whole space. |
| `tangentCone_mono` | `s ⊆ t → tangentConeAt s x ⊆ tangentConeAt t x` | Monotonicity of the tangent cone w.r.t. set inclusion. |
| `tangentCone_congr` | `𝓝[s] x = 𝓝[t] x → tangentConeAt s x = tangentConeAt t x` | Tangent cone depends only on the *restricted* neighborhood filter. |
| `tangentCone_inter_nhds` | `t ∈ 𝓝 x → tangentConeAt (s ∩ t) x = tangentConeAt s x` | Intersecting with a neighborhood doesn’t change the tangent cone. |
| `subset_tangentCone_prod_left/right` | Inclusions of left/right factor tangent cones into product tangent cone | Key for product structure analysis. |
| `mem_tangentCone_of_openSegment_subset` | `openSegment x y ⊆ s → y - x ∈ tangentConeAt s x` | Direction of an open segment in `s` lies in the tangent cone at endpoints. |
| `UniqueDiffWithinAt.prod` | `UniqueDiffWithinAt s x → UniqueDiffWithinAt t y → UniqueDiffWithinAt (s ×ˢ t) (x, y)` | Product stability of unique differentiability within sets. |
| `UniqueDiffWithinAt.univ_pi` / `pi` | Finite product stability | Generalizes product property to dependent products. |
| `uniqueDiffWithinAt_convex` | `Convex s → (interior s).Nonempty → x ∈ closure s → UniqueDiffWithinAt s x` | Convex sets with nonempty interior have unique differentiability on their closure. |
| `uniqueDiffOn_convex` | `Convex s → (interior s).Nonempty → UniqueDiffOn s` | Global version of the above. |
| `uniqueDiffOn_Icc`, `Ico`, `Ioc`, `Ioo`, etc. | Various interval types over `ℝ` | Concrete examples of `UniqueDiffOn` for standard subsets of `ℝ`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `tangentCone_`: properties of the tangent cone.
  - `uniqueDiffWithinAt_`, `uniqueDiffOn_`: properties of the uniqueness predicates.
  - `mem_`, `subset_`, `mapsTo_`: membership or inclusion lemmas.
  - `prod_`, `pi_`: product/dependent product behavior.

- **Suffixes**:
  - `_at`: pointwise (e.g., `tangentConeAt`, `UniqueDiffWithinAt`).
  - `_on`: global (e.g., `UniqueDiffOn`).
  - `_mono`: monotonicity.
  - `_congr`: congruence under equivalence of filters/sets.
  - `_inter`: behavior under intersection with neighborhoods.
  - `_nhds`: neighborhood-related.

- **Structure naming**:
  - `UniqueDiffWithinAt` uses `mk_iff` to enable `rw [uniqueDiffWithinAt_iff]`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify goals using definitional equalities and lemmas (e.g., `tangentCone_univ`, `closure_prod_eq`). |
| `filter_upwards` | Prove eventual statements by reducing to finite cases. |
| `tendsto_*` lemmas (`tendsto_pow_atTop_atTop`, `tendsto_pow_atTop_nhds_zero`, `squeeze_zero_norm`) | Handle convergence of sequences, especially with norms and scalar multiplication. |
| `eventually_*` (`eventually_nhds_norm_smul_sub_lt`, `eventually_ne_atTop`) | Work with neighborhoods and filters. |
| `rcases` / `cases` / `obtain` | Extract witnesses from existential quantifiers (e.g., from `mem_closure_iff_nhds`). |
| `choose` / `choose!` | Construct choice functions from ∀∃ statements. |
| `rw [← ...]` / `rw [...] at *` | Rewrite using equalities or equivalences (e.g., `uniqueDiffWithinAt_iff`). |
| `apply` / `exact` / `refine` | Construct proofs stepwise, often with holes filled later. |
| `aesop` / `linarith` / `norm_num` | Automate arithmetic and linear reasoning (e.g., `norm_num` for `1/2 < 1`). |
| `abel` | Simplify additive expressions involving scalar multiplication. |
| `eventually_of_forall` | Convert universal statements to filter-based eventual ones. |

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Proofs often construct sequences `(c, d)` to witness tangent cone membership.
- **Filter-based reasoning**: Heavy use of `Filter`, `Tendsto`, and `eventually` to handle asymptotic behavior.
- **Closure & interior arguments**: Many proofs rely on:
  - `mem_closure_iff_nhds`
  - `isOpen.mem_nhds`
  - `interior_mono`, `closure_mono`
- **Product decomposition**: Proofs for products use:
  - `closure_prod_eq`, `closure_pi_set`
  - `subset_tangentCone_prod_left/right`
  - `mapsTo_tangentCone_pi`
- **Convex geometry**: For convex sets:
  - Use `convex.openSegment_closure_interior_subset_interior`
  - Show nonempty interior of tangent cone → dense span.
- **Case analysis**: On equality (`em (j = i)`) or order (`if hab : a < b then ... else ...`).

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Convex.Topology`: Convex sets, interiors, closures.
- `Mathlib.Analysis.Normed.Module.Basic`: Normed vector spaces, scalar multiplication, linear maps.
- `Mathlib.Analysis.SpecificLimits.Basic`: Limits, `Tendsto`, `squeeze_zero_norm`, etc.

**Scope**:
- Context: Normed vector spaces over a `NontriviallyNormedField` `𝕜`.
- Main objects: Sets `s t : Set E`, points `x y : E`, tangent cones, derivatives (not yet defined here).
- Goal: Prepare foundational tools for *uniqueness of derivatives*, to be used in `Mathlib.Analysis.Calculus.FDeriv.Basic`.

**Note**: The definitions avoid universe-polymorphic quantification over function types by using intrinsic geometric conditions (tangent cone density), making them suitable for low-level formalization.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem (e.g., `uniqueDiffWithinAt_convex`).