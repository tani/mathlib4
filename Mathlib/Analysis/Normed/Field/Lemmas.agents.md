### Technical Metadata Brief: `Mathlib.Analysis.Normed.Field.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pi.nonUnitalSeminormedRing` | `[Fintype ι] → (∀ i, NonUnitalSeminormedRing (π i)) → NonUnitalSeminormedRing (∀ i, π i)` | Constructs product of finitely many non-unital seminormed rings with sup norm. |
| `Pi.seminormedRing`, `Pi.normedRing`, etc. | Similar to above | Extend product construction to unital/commutative variants (seminormed, normed rings/commutative rings). |
| `NonUnitalSeminormedRing.toContinuousMul` | `[NonUnitalSeminormedRing α] → ContinuousMul α` | Ensures multiplication is continuous in a non-unital seminormed ring. |
| `NonUnitalSeminormedRing.toTopologicalRing` | `[NonUnitalSeminormedRing α] → TopologicalRing α` |upgrade to topological ring structure. |
| `DilationEquiv.mulLeft`, `DilationEquiv.mulRight` | `a ≠ 0 → α ≃ᵈ α` | Left/right multiplication by nonzero element is a dilation equivalence. |
| `antilipschitzWith_mul_left`, `antilipschitzWith_mul_right` | `a ≠ 0 → AntilipschitzWith (‖a‖₊⁻¹) (a * ·)` | Quantifies how multiplication by nonzero `a` expands distances. |
| `NormedDivisionRing.to_hasContinuousInv₀` | `[NormedDivisionRing α] → HasContinuousInv₀ α` | Inversion is continuous away from zero. |
| `NormedDivisionRing.to_topologicalDivisionRing` | `[NormedDivisionRing α] → TopologicalDivisionRing α` | upgrade to topological division ring. |
| `discreteTopology_or_nontriviallyNormedField` | `[NormedField 𝕜] → DiscreteTopology 𝕜 ∨ NontriviallyNormedField 𝕜` | Dichotomy: field is discrete or nontrivially normed. |
| `discreteTopology_of_bddAbove_range_norm` | `[NormedField 𝕜] → BddAbove (range norm) → DiscreteTopology 𝕜` | If norms are bounded above, topology is discrete. |
| `NormedField.continuousAt_zpow` | `[NontriviallyNormedField 𝕜] → ContinuousAt (x ↦ x ^ n) x ↔ x ≠ 0 ∨ 0 ≤ n` | Characterizes continuity of integer powers. |
| `NormedField.completeSpace_iff_isComplete_closedBall` | `[NormedField K] → CompleteSpace K ↔ IsComplete (closedBall 0 1)` | Completeness equivalent to closed unit ball being complete. |
| `IsOfFinOrder.norm_eq_one` | `[NormedDivisionRing α] → IsOfFinOrder a → ‖a‖ = 1` | Elements of finite multiplicative order have norm 1. |
| `AddChar.norm_apply` | `[Finite G] → ψ : AddChar G α → ‖ψ x‖ = 1` | Additive characters into a normed field have unit norm. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nonUnital_`, `seminormed_`, `normed_`: indicate algebraic + normed structure levels.
  - `mulLeft`, `mulRight`: denote left/right multiplication maps.
  - `tendsto_`, `comap_`, `map_`: filter-theoretic behavior under maps.
  - `continuousAt_`, `continuous_`: continuity properties.
  - `antilipschitzWith_`, `lipschitzWith_`: metric expansion/contraction bounds.

- **Suffixes**:
  - `_le`, `_mono`, `_comp`: often used for inequalities or monotonicity.
  - `_of_`: often used for constructions from assumptions (e.g., `discreteTopology_of_...`).
  - `_or_`: for disjunctive dichotomies (e.g., `discreteTopology_or_nontriviallyNormedField`).
  - `_instance`: implicit (e.g., `toContinuousMul`, `toTopologicalRing`).

- **Special**:
  - `nnnorm`, `nnnorm_ne_zero_iff`: use of nonnegative reals (`ℝ≥0`) for norms.
  - `cobounded`, `𝓝[≠] 0`: filter notation for “tends to infinity” and “punctured neighborhood of 0”.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplification with norm identities, `norm_mul_le`, `norm_inv`, etc. |
| `rw` | Rewriting using lemmas like `dist_eq_norm`, `norm_div`, `zpow_neg`. |
| `gcongr` | For inequalities involving monotone functions (e.g., division). |
| `field_simp` | Simplify field expressions (especially with inverses). |
| `convert` / `congr` | Align goals with known lemmas (e.g., `tendsto` lemmas). |
| `squeeze_zero`, `squeeze_zero'` | Prove limits to 0 using sandwich arguments. |
| `filter_upwards` | For filter-based convergence proofs. |
| `rcases`, `obtain`, `cases'` | Extract witnesses from existential hypotheses. |
| `exact`, `refine`, `apply` | Direct proof steps, especially for instances. |
| `norm_num` | Normalize numeric expressions in `ℝ≥0`. |
| `rotate_right` | Reorder goals (used in `ContinuousMul` proof). |

---

#### **4. Proof Logic**

- **Structure**:
  - **Instance constructions** (e.g., `Pi.*`) are typically *definitionally* built by combining existing structures (`with`) and verifying the normed ring axiom (`norm_mul`) via `Finset.sup_mono_fun`, `norm_mul_le`, and `Finset.sup_mul_le_mul_sup_of_nonneg`.
  - **Continuity/Topological properties** (e.g., `toContinuousMul`, `toTopologicalRing`) rely on:
    - `tendsto_iff_norm_sub_tendsto_zero`
    - Algebraic identities (`mul_sub`, `sub_mul`)
    - `norm_mul_le`, `norm_add_le`, `norm_sub_le`
    - `squeeze_zero` or `squeeze_zero'` for convergence.
  - **Filter arguments** (e.g., `tendsto_mul_left_cobounded`) use:
    - `DilationEquiv` and `Dilation.comap_cobounded`
    - `map_cobounded`, `comap_cobounded`
  - **Dichotomy proofs** (`discreteTopology_or_...`) use:
    - Classical reasoning (`by_cases`)
    - Contrapositive reasoning (`contrapose!`)
    - `simp` with `discreteTopology_iff_isOpen_singleton_zero`
  - **Completeness proofs** (e.g., `completeSpace_iff_isComplete_closedBall`) use:
    - Reduction to discrete vs. nontrivially normed case
    - Scaling argument: `u n ↦ u n / x` to fit into unit ball
    - `cauchySeq_tendsto_of_isComplete` + `Metric.complete_of_cauchySeq_tendsto`

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.AddChar` | Additive characters, finite-order elements. |
| `Mathlib.Algebra.Group.TypeTags.Finite` | Finite types, finite order. |
| `Mathlib.Algebra.Order.GroupWithZero.Finset` | Ordered groups with zero, finset sup/inf. |
| `Mathlib.Analysis.Normed.Field.Basic` | *This file* — core normed field theory. |
| `Mathlib.Analysis.Normed.Group.Bounded` | Bounded sets, bornology, `IsBoundedUnder`. |
| `Mathlib.Analysis.Normed.Group.Rat` | Normed additive groups over ℚ. |
| `Mathlib.Analysis.Normed.Group.Uniform` | Uniform continuity, uniform structures. |
| `Mathlib.Topology.Instances.NNReal` | Topology on `ℝ≥0`. |
| `Mathlib.Topology.MetricSpace.DilationEquiv` | Dilation equivalences (metric space isometries up to scaling). |

---

### Summary

This file formalizes foundational results about **normed fields and division rings**, emphasizing:
- **Product constructions** with sup norm,
- **Topological algebra** (continuity of operations, topological rings/fields),
- **Metric geometry** (dilation equivalences, antilipschitz behavior),
- **Filter-theoretic convergence** (toward 0, infinity, punctured neighborhoods),
- **Dichotomy theorems** (discrete vs. nontrivially normed),
- **Completeness criteria**.

It builds on prior `NormedGroup` and `NormedRing` infrastructure, and is essential for further analysis over ℚ, ℝ, ℂ, and local fields.