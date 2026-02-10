### Technical Brief: Boundedness in Normed Groups (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `comap_norm_atTop'` | `comap norm atTop = cobounded E` | Relates the filter of sets tending to infinity (`atTop`) under `norm` to the *cobounded* filter (sets whose complement is bounded). |
| `Filter.HasBasis.cobounded_of_norm'` | `HasBasis atTop p s → HasBasis (cobounded E) p (λ i ↦ norm ⁻¹' s i)` | Pulls back a basis for `atTop` via `norm` to get a basis for `cobounded E`. |
| `Filter.hasBasis_cobounded_norm'` | `HasBasis (cobounded E) (λ _ ↦ True) (λ x ↦ a ≤ ‖x‖)` | Explicit basis for `cobounded E`: sets `{x | a ≤ ‖x‖}` for all `a : ℝ`. |
| `tendsto_norm_atTop_iff_cobounded'` | `Tendsto (‖f ·‖) l atTop ↔ Tendso f l (cobounded E)` | Characterizes convergence to infinity in norm as convergence to the cobounded filter. |
| `tendsto_norm_cobounded_atTop'` | `Tendsto norm (cobounded E) atTop` | The norm function itself tends to infinity along the cobounded filter. |
| `eventually_cobounded_le_norm'` | `∀ᶠ x in cobounded E, a ≤ ‖x‖` | Eventually (in cobounded filter), norm exceeds any fixed real `a`. |
| `tendsto_norm_cocompact_atTop'` | `Tendsto norm (cocompact E) atTop` (under `ProperSpace E`) | Norm tends to infinity along the cocompact filter (equivalent to cobounded in proper spaces). |
| `Filter.inv_cobounded` | `(cobounded E)⁻¹ = cobounded E` | Inversion preserves the cobounded filter. |
| `Filter.tendsto_inv_cobounded` | `Tendsto Inv.inv (cobounded E) (cobounded E)` | Inversion tends to infinity at infinity. |
| `isBounded_iff_forall_norm_le'` | `IsBounded s ↔ ∃ C, ∀ x ∈ s, ‖x‖ ≤ C` | Boundedness of a set ⇔ norm is uniformly bounded above on it. |
| `Bornology.IsBounded.exists_norm_le'` | `IsBounded s → ∃ C, ∀ x ∈ s, ‖x‖ ≤ C` | Extracts a uniform bound on the norm for bounded sets. |
| `Bornology.IsBounded.exists_pos_norm_le'` | `IsBounded s → ∃ R > 0, ∀ x ∈ s, ‖x‖ ≤ R` | Refines the bound to be strictly positive. |
| `Bornology.IsBounded.exists_pos_norm_lt'` | `IsBounded s → ∃ R > 0, ∀ x ∈ s, ‖x‖ < R` | Strictly bounded norm for bounded sets. |
| `NormedCommGroup.cauchySeq_iff` | `CauchySeq u ↔ ∀ ε > 0, ∃ N, ∀ m,n ≥ N, ‖u m / u n‖ < ε` | Cauchy sequence criterion in multiplicative normed comm groups (via norm of quotient). |
| `IsCompact.exists_bound_of_continuousOn'` | `IsCompact s → ContinuousOn f s → ∃ C, ∀ x ∈ s, ‖f x‖ ≤ C` | Continuous functions on compact sets are norm-bounded. |
| `HasCompactMulSupport.exists_bound_of_continuous` | `HasCompactMulSupport f → Continuous f → ∃ C, ∀ x, ‖f x‖ ≤ C` | Functions with compact multiplicative support and continuity are globally norm-bounded. |
| `Filter.Tendsto.op_one_isBoundedUnder_le'` | Helper lemma for products tending to 1: if `f → 1` and `g` is norm-bounded under `op` with `‖op x y‖ ≤ A * ‖x‖ * ‖y‖`, then `op ∘ (f,g) → 1`. | Generalizes product convergence lemmas (e.g., for multiplication, scalar mult). |
| `Filter.Tendsto.op_one_isBoundedUnder_le` | Special case of above with `A = 1`. | Simplified version for operations satisfying `‖op x y‖ ≤ ‖x‖ * ‖y‖`. |
| `Continuous.bounded_above_of_compact_support` | `Continuous f → HasCompactSupport f → ∃ C, ∀ x, ‖f x‖ ≤ C` | Continuous functions with compact support are globally bounded. |
| `HasCompactMulSupport.exists_pos_le_norm` | `HasCompactMulSupport f → ∃ R > 0, R ≤ ‖x‖ → f x = 1` | Functions with compact *multiplicative* support are identically 1 outside a large ball. |

---

#### **2. Naming Conventions**

- **`'` (prime)** suffix: Additive analogs of multiplicative lemmas (e.g., `comap_norm_atTop'` vs. additive `comap_norm_atTop`).  
- **`isBounded_` / `isBounded_iff_`**: Relates boundedness of sets to norm bounds.
- **`tendsto_norm_`**: Tendency of norm to infinity under various filters.
- **`cobounded`**: Filter of sets with bounded complement.
- **`op_` / `op_one_`**: Binary operations used in convergence lemmas (e.g., multiplication, scalar multiplication).
- **`exists_norm_`**: Existence of uniform norm bounds.
- **`cauchySeq_iff`**: Characterization of Cauchy sequences via norm estimates.

---

#### **3. Tactic Stack**

- **`simp` / `simp only`**: Simplification using definitional equalities and lemmas (e.g., `dist_one_right`, `norm_inv'`, `one_mul`).
- **`rw` / `rwa`**: Rewriting using equalities (e.g., `← comap_norm_atTop'`, `mul_right_comm`).
- **`filter_upwards`**: Standard tactic for proving filter convergence statements.
- **`gcongr`**: Used to lift inequalities under monotone operations (e.g., `gcongr; exact hg`).
- **`rcases` / `cases'`**: Destructuring existential/universal hypotheses.
- **`contrapose!`**: Logical contrapositive with simplification.
- **`calc`**: Chain of inequalities/equalities (e.g., in `op_one_isBoundedUnder_le'`).
- **` positivity`**: Proves inequalities involving positive reals.

---

#### **4. Proof Logic**

- **Filter-based reasoning**: Most proofs rely on equivalence of filters (`comap`, `tendsto_comap_iff`, `tendsto_iff_eventually`).
- **Norm-based boundedness**: Bounded sets ↔ uniformly bounded norm; unbounded behavior ↔ cobounded/cocompact filters.
- **Case analysis on reals**: Often splits on `A ≤ 0` or `A > 0` to handle sign in inequalities.
- **Refinement of bounds**: From `≤ C` to `≤ R` with `R > 0`, then to `< R` via `R + 1`.
- **Use of compactness/compact support**: To derive global boundedness from local control (via `isBounded_range`, `isBounded_iff_forall_norm_le'`).
- **Multiplicative vs additive**: Systematic use of `to_additive` attributes to derive additive versions from multiplicative ones.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Group.Basic` | Core theory of seminormed/normed groups, norms, inversion, multiplication. |
| `Mathlib.Topology.MetricSpace.Bounded` | Bounded subsets in metric spaces, relation to bornology. |
| `Mathlib.Order.Filter.Pointwise` | Filter operations (e.g., `comap`, `tendsto`, `cobounded`, `cocompact`). |

---

#### **Domain-Specific AI Agent Notes**

- **Focus area**: Functional analysis in normed groups, especially convergence and boundedness.
- **Key abstractions**: Filters (`cobounded`, `cocompact`), norm estimates, compact/multiplicative support.
- **Common proof patterns**:
  - Translate metric/bornological boundedness into norm bounds.
  - Use `tendsto_norm_atTop_iff_cobounded'` to switch between norm convergence and filter convergence.
  - Apply `op_one_isBoundedUnder_le` for product convergence lemmas.
- **Critical lemmas for automation**:
  - `isBounded_iff_forall_norm_le'`
  - `tendsto_norm_atTop_iff_cobounded'`
  - `Filter.Tendsto.op_one_isBoundedUnder_le`
  - `eventually_cobounded_le_norm'`

Let me know if you'd like a tactic automation profile or a proof sketch generator for this module.