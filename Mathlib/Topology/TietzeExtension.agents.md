### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TietzeExtension` | `class TietzeExtension (Y : Type v) [TopologicalSpace Y] : Prop` | Encodes the *Tietze extension property*: any continuous map from a closed subset of a normal space into `Y` extends continuously to the whole space. |
| `TietzeExtension.exists_restrict_eq'` | `∀ {X} [TopologicalSpace X] [NormalSpace X] (s : Set X) (hs : IsClosed s) (f : C(s, Y)), ∃ g : C(X, Y), g.restrict s = f` | Core extension property for the class. |
| `BoundedContinuousFunction.tietze_extension_step` | `∀ f : X →ᵇ ℝ, e : C(X, Y), IsClosedEmbedding e → ∃ g : Y →ᵇ ℝ, ‖g‖ ≤ ‖f‖ / 3 ∧ dist (g ∘ e) f ≤ 2 / 3 * ‖f‖` | One iterative step in constructing the bounded Tietze extension (key constructive lemma). |
| `BoundedContinuousFunction.exists_extension_norm_eq_of_isClosedEmbedding'` | `∃ g : Y →ᵇ ℝ, ‖g‖ = ‖f‖ ∧ g ∘ e = f` | Bounded Tietze extension preserving the sup-norm (bundled version). |
| `BoundedContinuousFunction.exists_extension_forall_mem_Icc_of_isClosedEmbedding` | `∀ f : X →ᵇ ℝ, (∀ x, f x ∈ Icc a b) → a ≤ b → ∃ g : Y →ᵇ ℝ, (∀ y, g y ∈ Icc a b) ∧ g ∘ e = f` | Interval-preserving extension for closed intervals. |
| `BoundedContinuousFunction.exists_extension_forall_exists_le_ge_of_isClosedEmbedding` | `∃ g : Y →ᵇ ℝ, (∀ y, ∃ x₁ x₂, g y ∈ Icc (f x₁) (f x₂)) ∧ g ∘ e = f` | Extension where each value lies in the *convex hull* of the original range (handles unbounded case via convex hull). |
| `BoundedContinuousFunction.exists_extension_forall_mem_of_isClosedEmbedding` | `∀ f : X →ᵇ ℝ, OrdConnected t → (∀ x, f x ∈ t) → t.Nonempty → ∃ g : Y →ᵇ ℝ, (∀ y, g y ∈ t) ∧ g ∘ e = f` | General interval-preserving extension for *any* nonempty convex (i.e., `OrdConnected`) set `t`. |
| `ContinuousMap.exists_extension_forall_mem_of_isClosedEmbedding` | `∀ f : C(X, ℝ), OrdConnected t → (∀ x, f x ∈ t) → t.Nonempty → ∃ g : C(Y, ℝ), (∀ y, g y ∈ t) ∧ g ∘ e = f` | Unbounded (but continuous) version via reduction to bounded case using `orderIsoIooNegOneOne`. |
| `Pi.instTietzeExtension`, `Prod.instTietzeExtension`, `Unique.instTietzeExtension` | Instances of `TietzeExtension` for products, pointwise functions, and singletons. | Enables automatic inference for common target spaces. |
| `TietzeExtension.of_retract`, `TietzeExtension.of_homeo` | Closure properties of the class under retracts and homeomorphisms. | Structural robustness of the class. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `exists_`: Existential extension theorems.
  - `tietze_extension_`: Core lemmas in the constructive proof.
  - `of_`: Closure properties or derived instances (e.g., `of_retract`, `of_homeo`).
  - `inst_`: Typeclass instances (e.g., `Pi.instTietzeExtension`).
- **Suffixes**:
  - `_of_isClosedEmbedding`: Statement for a closed embedding `e : X₁ → X`.
  - `_of_closed`: Specialization to `s : Set X`, `e = subtype.val`.
  - `_forall_mem_Icc`, `_forall_mem`: Interval-preserving variants.
  - `_norm_eq`: Norm-preserving (for bounded maps).
  - `_forall_exists_le_ge`: Convex hull-preserving (unbounded case).
- **Other**:
  - `restrict_eq`, `extension`: Distinguish between restriction equality vs. extension.
  - `'` (prime): Alternate version (often unbundled composition or convenience).

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `obtain` | Extract witnesses from existential hypotheses (e.g., from Urysohn’s lemma). |
| `rw`, `congrm`, `ext`, `funext` | Equality reasoning, especially for functions and compositions. |
| `simp`, `simp only`, `simp_rw` | Simplify using definitions (e.g., `norm_eq_abs`, `dist_eq_norm'`, `Icc_eq_closedBall`). |
| `linarith`, `field_simp`, `ring` | Arithmetic manipulations (especially in norm/interval bounds). |
| `norm_num1`, `norm_num` | Normalize numeric expressions (e.g., `2/3`, `3 - 2 = 1`). |
| `exact`, `refine`, `apply` | Construct proofs stepwise, often with `?_` holes. |
| `induction` | Inductive construction in iterative extension proofs (e.g., `tietze_extension_step` iteration). |
| `cauchySeq_of_le_geometric`, `tendsto_iff_dist_tendsto_zero`, `squeeze_zero` | Convergence arguments for limit-based constructions. |
| `isClosedMap`, `isClosed_range`, `isClosed_singleton.preimage` | Topological closure reasoning (via embeddings, continuity). |
| `disjoint_image_of_injective`, `disjoint_union_left` | Disjointness arguments (used in Urysohn’s lemma application). |

---

#### 4. **Proof Logic**

- **High-level strategy**:
  1. **Bounded case**:
     - Use `tietze_extension_step` iteratively to build a Cauchy sequence of approximations.
     - Show convergence in sup-norm to an extension preserving norm and interval constraints.
     - Key tools: geometric series bounds, completeness of `ℝ`, continuity of limit.
  2. **Unbounded case**:
     - Reduce to bounded case via order isomorphism `ℝ ≃o Ioo(-1, 1)` (e.g., `orderIsoIooNegOneOne`).
     - Apply bounded extension to the bounded function `h ∘ f`, then pull back via `h.symm`.
  3. **Interval preservation**:
     - For `Icc`, shift/scale to center at 0, apply norm-preserving extension, shift back.
     - For general convex `t`, use `OrdConnected` to reduce to existence of bounds (`a = ⨅ f`, `b = ⨆ f`) and apply `exists_extension_forall_exists_le_ge`.
     - Handle edge cases where endpoints are not attained via perturbation with auxiliary functions (Urysohn’s lemma again).
- **Inductive/iterative structure**:
  - The bounded extension proof constructs `g : ℕ → Y →ᵇ ℝ` via iteration of `tietze_extension_step`.
  - Convergence is shown via geometric decay of errors (`(2/3)^n`).
- **Topological reasoning**:
  - Closedness of images under closed embeddings.
  - Disjointness of preimages under injective maps.
  - Application of `exists_bounded_mem_Icc_of_closed_of_le` (Urysohn-type lemma for bounded functions).

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecificLimits.Basic` | Basic limit theory, e.g., convergence, continuity. |
| `Mathlib.Order.Interval.Set.IsoIoo` | Order isomorphisms between `ℝ` and open intervals (e.g., `orderIsoIooNegOneOne`). |
| `Mathlib.Topology.Order.MonotoneContinuity` | Continuity of monotone functions, related order-topology interactions. |
| `Mathlib.Topology.UrysohnsBounded` | Bounded Urysohn lemma: separation of disjoint closed sets by bounded continuous functions. |

> **Note**: The file builds on `UrysohnsBounded` for the key separation lemma used in `tietze_extension_step`, and leverages `IsoIoo` to reduce unbounded to bounded cases.

--- 

Let me know if you'd like a diagram of the proof dependencies or a summary of how the `TietzeExtension` class enables polymorphic extension theorems (e.g., for `ℂ`, `ι → ℝ`, etc.).