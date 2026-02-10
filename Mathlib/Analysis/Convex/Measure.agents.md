### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `addHaar_frontier` | `Convex ℝ s → μ (frontier s) = 0` | Proves that the frontier (boundary) of a convex set has Haar measure zero in finite-dimensional real normed spaces. |
| `nullMeasurableSet` | `Convex ℝ s → NullMeasurableSet s μ` | Concludes that any convex set is null-measurable w.r.t. an additive Haar measure, using the previous theorem. |
| `homothety` | Implicitly used (via `hs.closure_subset_image_homothety_interior_of_one_lt`) | A scaling transformation centered at a point; key in approximating closure by dilated interiors. |
| `interior`, `closure`, `frontier` | Standard topological operations | Used to decompose sets and analyze boundaries. |
| `affineSpan`, `isBounded`, `finrank` | Module/geometry-theoretic notions | Used to reduce to hyperplane or full-space cases and handle boundedness. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `addHaar_`: Relates to properties of additive Haar measures (`addHaar_frontier`, `addHaar_image_homothety`).
  - `is_`: Predicate-style properties (`isBounded`, `nullMeasurableSet`).
- **Suffixes:**
  - `_frontier`, `_closure`, `_interior`: Indicate application to specific set operations.
  - `_of_`: Indicates conditions or assumptions (`closure_subset_image_homothety_interior_of_one_lt`).
- **Functional style:** Theorems often take convexity (`hs : Convex ℝ s`) as a hypothesis.

#### 3. **Tactic Stack**

- **Core tactics:**
  - `rw`, `rwa`, `refine`, `exact`, `apply`, `cases'`, `rcases`
  - `simp`, `simp_rw`, `aesop`, `ring`, `linarith`
- **Measure-theoretic:**
  - `measure_mono_null`, `measure_iUnion_null`, `measure_mono`, `tsub_eq_zero_iff_le`
  - `nullMeasurableSet_of_null_frontier`
- **Analysis/Topology:**
  - `closure_minimal`, `interior_inter`, `isOpen_ball.interior_eq`
  - `mem_ball_self`, `mem_iUnion.2`, `mem_of_superset`
- **Limit/continuity:**
  - `ge_of_tendsto`, `tendsto'`, `continuous_pow`, `ENNReal.continuous_coe`, `nhdsWithin_le_nhds`

#### 4. **Proof Logic / Strategy**

- **High-level structure:**
  1. **Case split on affine span:** Either `affineSpan ℝ s ≠ ⊤` (lies in a hyperplane ⇒ measure zero), or `affineSpan ℝ s = ⊤` (full space).
  2. **Reduction to bounded case:** Use countable union of intersections with balls to reduce to bounded convex sets.
  3. **Bounded case:**
     - Show `μ(closure s) ≤ μ(interior s)` via homothety-based inclusion:  
       `closure s ⊆ homothety x r '' interior s` for all `r > 1`.
     - Apply change-of-variables formula for Haar measure under homothety:  
       `μ(homothety x r '' A) = r^d * μ(A)`, where `d = finrank ℝ E`.
     - Take limit as `r → 1⁺` to conclude `μ(closure s) ≤ μ(interior s)`.
  4. **Conclude frontier has measure zero** using `frontier = closure \ interior`.

- **Inductive or constructive?** No induction; relies on topological and measure-theoretic continuity arguments.

#### 5. **Imports & Dependencies**

- **Core libraries:**
  - `Mathlib.Analysis.Convex.Topology` — convex set topology (interior, closure, affine span).
  - `Mathlib.Analysis.Normed.Affine.AddTorsorBases` — affine geometry and torsors.
  - `Mathlib.MeasureTheory.Measure.Lebesgue.EqHaar` — equivalence of Haar measures and properties like scaling.

- **Key typeclass assumptions:**
  - `[NormedAddCommGroup E]`, `[NormedSpace ℝ E]`, `[MeasurableSpace E]`, `[BorelSpace E]`, `[FiniteDimensional ℝ E]`
  - `[IsAddHaarMeasure μ]` — ensures `μ` is a (nonzero, regular, Borel) Haar measure.

- **Domain scope:** Real finite-dimensional normed vector spaces, with Borel σ-algebra and Haar measure.

--- 

This metadata reflects a *measure-theoretic geometry* proof pattern, leveraging homothety scaling, continuity of measure, and finite-dimensionality to reduce geometric regularity (convexity) to null-measurability.