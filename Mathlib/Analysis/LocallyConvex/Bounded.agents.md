### Technical Metadata Brief: Von Neumann Boundedness in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsVonNBounded` | `def IsVonNBounded (s : Set E) : Prop := ∀ ⦃V⦄, V ∈ 𝓝 (0 : E) → Absorbs 𝕜 V s` | Defines a set `s` as *von Neumann bounded* if every neighborhood of 0 absorbs `s`. |
| `vonNBornology` | `abbrev vonNBornology : Bornology E := ...` | Constructs the bornology of von Neumann-bounded sets (not registered as instance to avoid diamonds). |
| `isVonNBounded_iff_tendsto_smallSets_nhds` | `IsVonNBounded 𝕜 S ↔ Tendsto (· • S) (𝓝 0) (𝓝 0).smallSets` | Characterizes von Neumann boundedness via convergence of scalar multiples to 0 in the small-sets filter. |
| `isVonNBounded_iff_smul_tendsto_zero` | `IsVonNBounded 𝕜 S ↔ ∀ x : ι → E, (∀ n, x n ∈ S) → Tendsto (ε • x) l (𝓝 0)` | Key sequential characterization: boundedness ⇔ for all sequences in `S`, scalar multiples by any sequence tending to `≠0` tend to 0. |
| `IsVonNBounded.image` | `{f : E →SL[σ] F} → IsVonNBounded 𝕜 s → IsVonNBounded 𝕜₂ (f '' s)` | Continuous linear images preserve von Neumann boundedness. |
| `isVonNBounded_iff` (in normed space) | `IsVonNBounded 𝕜 s ↔ Bornology.IsBounded s` | In normed spaces, von Neumann boundedness coincides with metric boundedness. |
| `vonNBornology_eq` | `vonNBornology 𝕜 E = PseudoMetricSpace.toBornology` | Equality of von Neumann and metric bornologies in normed spaces. |
| `IsVonNBounded.extend_scalars` | `IsVonNBounded 𝕜 s → IsVonNBounded 𝕝 s` (under scalar extension) | Extending scalars preserves boundedness. |
| `IsVonNBounded.restrict_scalars` | `IsVonNBounded 𝕜' s → IsVonNBounded 𝕜 s` (under scalar restriction) | Restricting scalars preserves boundedness. |

---

#### **2. Naming Conventions**

- **Predicates**: `isVonNBounded_*` (lowercase, often `@[simp]`-friendly), e.g., `isVonNBounded_empty`, `isVonNBounded_union`, `isVonNBounded_neg`.
- **Properties of sets**: `IsVonNBounded.*` (uppercase, for class-like operations), e.g., `IsVonNBounded.add`, `IsVonNBounded.sub`, `IsVonNBounded.image`.
- **Equivalences/Characterizations**: `isVonNBounded_iff_*`, e.g., `isVonNBounded_iff_tendsto_smallSets_nhds`.
- **Set operations**: `isVonNBounded_iUnion`, `isVonNBounded_biUnion`, `isVonNBounded_sUnion`, `isVonNBounded_union`, `isVonNBounded_insert`, `isVonNBounded_vadd`, `isVonNBounded_add`, `isVonNBounded_sub`.
- **Singletons & emptiness**: `isVonNBounded_singleton`, `isVonNBounded_empty`.
- **Topological properties**: `of_topologicalSpace_le`, `of_add_left/right`, `of_sub_left/right`, `of_neg`, `of_boundedSpace`, `of_subsingleton`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplifying definitions (`absorbs`, `smul_set`, `image_smul`, `nhds_basis_balanced`, etc.). |
| `rw` / `apply` | Rewriting using equivalences like `isVonNBounded_iff_tendsto_smallSets_nhds`. |
| `rcases` / `cases` | Extracting witnesses from existential hypotheses (e.g., from `absorbs_iff_norm`). |
| `filter_upwards` | Managing filter-based arguments (especially in `tendsto` proofs). |
| `exact` / `assumption` | Closing simple goals. |
| `push_neg` | Negating universal statements (e.g., in contradiction proofs). |
| `aesop` / `tauto` | Rare; mostly used for trivial logical steps. |
| `ring` / `linarith` | For norm inequalities (e.g., in `isVonNBounded_iff` proof in normed spaces). |
| `exact_mod_cast` / `norm_num` | Handling numeric coercions and inequalities. |
| `apply_fun`, `congr'`, `ext` | Set equality proofs (e.g., `vonNBornology_eq`). |

---

#### **4. Proof Logic & Strategy**

- **Absorption-based reasoning**: Most proofs start from the definition `∀ V ∈ 𝓝 0, Absorbs 𝕜 V s`, then use properties of neighborhoods (e.g., balancedness, openness) and absorption (e.g., `absorbs_union`, `absorbs_iUnion`, `absorbs.mono_right`).
- **Filter-theoretic approach**: Many equivalences are proven via `tendsto_smallSets_iff`, leveraging:
  - `nhds_basis_balanced`
  - `absorbs_iff_eventually_nhds_zero`
  - `tendsto_map'_iff`, `tendsto_comap_iff`
- **Sequential characterizations**: Proofs of `isVonNBounded_iff_smul_tendsto_zero` use:
  - `isVonNBounded.smul_tendsto_zero` (→): direct application of `tendsto_smallSets.comp`.
  - `isVonNBounded_of_smul_tendsto_zero` (←): contradiction + choice + `absorbs_iff_norm`.
- **Topological arguments**: 
  - Coarser topologies → more bounded sets (`of_topologicalSpace_le`).
  - Continuity + linearity → boundedness preservation (`image`).
- **Metric/normed space simplifications**: 
  - Use of `normSeminorm`, `ball_normSeminorm`, `Metric.isBounded_iff`.
  - Equivalence with metric boundedness (`isVonNBounded_iff`, `vonNBornology_eq`).
- **Scalar extension/restriction**: 
  - Use of `restrict_scalars`, `extend_scalars`, often via sequential criteria or norm estimates.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.GroupTheory.GroupAction.Pointwise` — for `smul_set`, `Absorbs`.
- `Mathlib.Analysis.LocallyConvex.Basic`, `BalancedCoreHull` — for balanced neighborhoods, absorption.
- `Mathlib.Analysis.Seminorm` — for seminorms, balls, absorption.
- `Mathlib.LinearAlgebra.Basis.VectorSpace` — for module/linear structure.
- `Mathlib.Topology.Bornology.Basic` — for bornologies, `Bornology.ofBounded`.
- `Mathlib.Topology.Algebra.UniformGroup.Basic`, `UniformSpace.Cauchy` — for uniform structure, total boundedness.
- `Mathlib.Topology.UniformSpace.Cauchy` — for Cauchy sequences, totally bounded sets.

**Domain Scope**:
- General topological vector spaces over seminormed rings.
- Normed spaces, normed fields, nontrivially normed fields.
- Locally convex spaces (via balanced neighborhoods).
- Bornological context: von Neumann bounded sets form a bornology.

**Notable Exclusions**:
- No direct use of `MetricSpace` or `PseudoMetricSpace` in the general theory (only in `VonNBornologyEqMetric` section).
- No reliance on completeness or completeness-related constructs (e.g., `CompleteSpace`).

---

This metadata captures the formal structure, proof methodology, and mathematical scope of the `VonNeumannBoundedness` module in Mathlib, suitable for building a domain-specific AI agent for Lean 4 formalization assistance.