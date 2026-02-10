Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Normed (Semi)groups in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Norm` | `class Norm (E : Type*) where norm : E → ℝ` | Auxiliary class adding a real-valued norm function `‖x‖`. |
| `NNNorm` | `class NNNorm (E : Type*) where nnnorm : E → ℝ≥0` | Auxiliary class adding a nonnegative real-valued norm `‖x‖₊`. |
| `ENorm` | `class ENorm (E : Type*) where enorm : E → ℝ≥0∞` | Auxiliary class adding an extended nonnegative real-valued norm `‖x‖ₑ`. |
| `SeminormedAddGroup` | `class SeminormedAddGroup (E : Type*) extends Norm E, AddGroup E, PseudoMetricSpace E` | Additive group with a seminorm inducing the pseudometric via `dist x y = ‖x - y‖`. |
| `SeminormedGroup` | `class SeminormedGroup (E : Type*) extends Norm E, Group E, PseudoMetricSpace E` | Multiplicative group with a seminorm inducing the pseudometric via `dist x y = ‖x / y‖`. |
| `NormedAddGroup` | `class NormedAddGroup (E : Type*) extends Norm E, AddGroup E, MetricSpace E` | Additive group with a norm inducing a *metric* via `dist x y = ‖x - y‖`. |
| `NormedGroup` | `class NormedGroup (E : Type*) extends Norm E, Group E, MetricSpace E` | Multiplicative group with a norm inducing a *metric* via `dist x y = ‖x / y‖`. |
| `SeminormedAddCommGroup`, `SeminormedCommGroup`, `NormedAddCommGroup`, `NormedCommGroup` | Similar to above, but for *commutative* groups. | Extend hierarchy to abelian groups. |
| `NormedGroup.ofSeparation` | `[SeminormedGroup E] → (∀ x, ‖x‖ = 0 → x = 1) → NormedGroup E` | Constructs a normed group from a seminormed group satisfying separation (`‖x‖ = 0 ⇒ x = 1`). |
| `SeminormedGroup.ofMulDist`, `SeminormedGroup.ofMulDist'` | `[Norm E] [Group E] [PseudoMetricSpace E] → (h₁, h₂) → SeminormedGroup E` | Constructs a seminormed group from a left/right-multiplication-invariant pseudodistance. |
| `GroupSeminorm.toSeminormedGroup` | `(f : GroupSeminorm E) → SeminormedGroup E` | Induces a seminormed group structure from a group seminorm. |
| `GroupNorm.toNormedGroup` | `(f : GroupNorm E) → NormedGroup E` | Induces a normed group structure from a group norm. |
| `dist_eq_norm_div` | `dist a b = ‖a / b‖` | Core property of seminormed groups (multiplicative case). |
| `norm_mul_le'` | `‖a * b‖ ≤ ‖a‖ + ‖b‖` | Triangle inequality for the norm. |
| `norm_inv'` | `‖a⁻¹‖ = ‖a‖` | Invariance of norm under inversion. |
| `norm_zpow_abs` | `‖a ^ |n|‖ = ‖a ^ n‖` | Norm of integer powers depends only on absolute value. |
| `tendsto_nhds_one` | `Tendsto f l (𝓝 1) ↔ ∀ ε > 0, ∀ᶠ x in l, ‖f x‖ < ε` | Convergence to identity characterized by norm tending to 0. |
| `normGroupSeminorm` | `def normGroupSeminorm : GroupSeminorm E` | The norm of a seminormed group is a group seminorm. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm_`: properties of the norm function (e.g., `norm_mul_le'`, `norm_inv'`, `norm_nonneg'`).
  - `dist_`: properties of the induced distance (e.g., `dist_eq_norm_div`, `dist_one_right`, `dist_mulIndicator`).
  - `nndist_`, `edist_`: for nonnegative/extended distance variants.
  - `of_`: constructors (e.g., `ofMulDist`, `ofSeparation`).
  - `to_`: coercion/induction lemmas (e.g., `toSeminormedGroup`, `toNormedGroup`).
- **Suffixes**:
  - `'`: variant of a theorem for multiplicative groups (vs. additive `norm_add_le`).
  - `''`, `'''`: further variants (e.g., `mem_ball_iff_norm''`, `'''`).
  - `left`, `right`: directional properties (e.g., `norm_le_mul_norm_add'`, `norm_mul_eq_norm_left`).
  - `comm`: for commutative variants (e.g., `SeminormedCommGroup`, `norm_mul_eq_norm_right`).
- **Notation**:
  - `‖x‖`, `‖x‖₊`, `‖x‖ₑ` for `norm`, `nnnorm`, `enorm`.
  - `dist`, `nndist`, `edist` for distances.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: for simple automation (e.g., `dist_eq` fields).
- `simp` / `simp only`: simplification with rewrite lemmas (e.g., `norm_one'`, `dist_one_right`).
- `rw`: rewriting using `dist_eq_norm_div`, `norm_inv'`, etc.
- `apply le_antisymm`: proving equality of reals via double inequality.
- `simpa`: simplifying and applying a lemma (e.g., `simpa [dist_eq_norm_div] using ...`).
- `convert`: for flexible unification (e.g., `convert Metric.uniformity_basis_dist`).
- `rcases`, `cases'`: case analysis (e.g., on `le_total 0 n`).
- ` positivity`: for proving strict inequalities of reals.

#### **4. Proof Logic**

- **Structure**: Proofs often follow a pattern:
  1. Reduce to known metric/distance properties via `dist_eq_norm_div`.
  2. Apply metric space lemmas (e.g., triangle inequality, commutativity).
  3. Simplify using group identities (`div_mul_cancel`, `inv_mul_cancel`, etc.).
  4. Use `le_antisymm` to prove equalities of norms/distances.
  5. For constructions (`of_` lemmas), verify separation or invariance conditions.
- **Induction**: Rarely used directly; most arguments are algebraic or metric-theoretic.
- **Case analysis**: On sign of integers (`rcases le_total 0 n`) or equality (`div_ne_one.2 hne`).
- **Rewrite strategy**: Heavy use of `dist_eq_norm_div` to translate between metric and norm expressions.

#### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Algebra.CharP.Defs`: Characteristic-related definitions (likely for future use).
- `Mathlib.Algebra.Group.Subgroup.Ker`: Kernel constructions (possibly for homomorphism theory).
- `Mathlib.Analysis.Normed.Group.Seminorm`: Group seminorms (`GroupSeminorm`, `GroupNorm`).
- `Mathlib.Topology.Metrizable.Uniformity`: Uniform space structures.
- `Mathlib.Topology.Sequences`: Filter-based topology (e.g., `Tendsto`, `nhds_basis`).

---

This metadata captures the formal structure, conventions, and proof patterns of the `NormedGroup` hierarchy in Lean 4, suitable for building a domain-specific AI agent for normed group reasoning.