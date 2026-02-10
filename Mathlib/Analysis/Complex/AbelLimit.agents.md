### Technical Brief: Abel’s Limit Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `stolzSet (M : ℝ)` | `Set ℂ` | Defines the *Stolz set*: points `z` in the open unit disc satisfying `‖1 - z‖ < M * (1 - ‖z‖)`. Used to model non-tangential approach to `1`. |
| `stolzCone (s : ℝ)` | `Set ℂ` | Defines a left-opening cone at `1` with slope `s`: `{z : ℂ | |z.im| < s * (1 - z.re)}`. Models angular approach to `1`. |
| `abel_aux` | `(h : Tendsto (fun n ↦ ∑ i ∈ range n, f i) atTop (𝓝 l)) → {z : ℂ} → ‖z‖ < 1 → ...` | Rewrites the error `l - g(z)` (where `g(z)` is the power series) as `(1 - z)` times a convergent power series of tail sums. Crucial for estimating the difference. |
| `tendsto_tsum_powerSeries_nhdsWithin_stolzSet` | `(h : Tendsto (fun n ↦ ∑ i ∈ range n, f i) atTop (𝓝 l)) → Tendsto (fun z ↦ ∑' n, f n * z ^ n) (𝓝[stolzSet M] 1) (𝓝 l)` | **Complex Abel’s limit theorem**: continuity of the power series at `1` within any Stolz set. |
| `tendsto_tsum_powerSeries_nhdsWithin_stolzCone` | `(h : ...) → 0 < s → Tendsto (fun z ↦ ∑' n, f n * z ^ n) (𝓝[stolzCone s] 1) (𝓝 l)` | Refinement: continuity within any fixed Stolz cone (non-tangential limit). |
| `tendsto_tsum_powerSeries_nhdsWithin_lt` (Real) | `(h : ...) → Tendsto (fun x ↦ ∑' n, f n * x ^ n) (𝓝[<] 1) (𝓝 l)` | **Real Abel’s limit theorem**: continuity from the left at `1`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `stolz*`: for geometric sets/cones modeling non-tangential approach.
  - `abel_*`: auxiliary lemmas for Abel’s theorem.
  - `tendsto_tsum_powerSeries_*`: main theorems about continuity of power series.
- **Suffixes**:
  - `_aux`: technical lemmas used in proofs (e.g., `abel_aux`, `stolzCone_subset_stolzSet_aux`).
  - `_le_nhdsWithin_*`, `_nhdsWithin_*`: filter-based continuity statements.
  - `_iff`, `_mono_left`, `_mono_right`: used for filter morphism properties.
- **Other patterns**:
  - `ofReal`, `push_cast`, `norm_cast`: for embedding real to complex.
  - `max B₁ B₂`, `Ico`, `range`: standard finite sum decompositions.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp_rw`, `simp only`: for rewriting with definitional equalities and simplifying expressions.
- `gcongr`: for monotonicity arguments involving norms and inequalities (e.g., bounding sums).
- `calc`: for chaining inequalities in analysis proofs.
- `rw [← ...]`: for algebraic rearrangements (e.g., geometric sum identities).
- `exact`, `apply`, `convert`: for constructing proofs step-by-step.
- `have`, `suffices`: to introduce intermediate claims.
- `cases' le_or_lt`: case analysis on order (e.g., `M ≤ 1` vs `M > 1`).
- `tendsto_*` tactics: `tendsto_nhdsWithin_of_tendsto_nhds`, `tendsto_map'`, `tendsto_sub_nhds_zero_iff`.
- `field_simp`, `ring`, `norm_num`: for algebraic simplifications.
- ` positivity`: to discharge trivial positivity goals.

---

#### **4. Proof Logic**

The proof follows a classical ε–δ style analysis with filter-theoretic abstraction:

1. **Decomposition of error**:
   - Use `abel_aux` to express `l - g(z)` as `(1 - z) * (power series of tail sums)`.
2. **Splitting sums**:
   - Split the finite sum in `abel_aux` into *head* (`range B₁`) and *tail* (`Ico B₁ (max B₁ B₂)`).
3. **Bounding each part**:
   - **Head**: Controlled by uniform convergence of partial sums (`h` gives Cauchy condition).
   - **Tail**: Controlled by geometric decay (`‖z‖ < 1`) and Stolz condition (`‖1 - z‖ < M(1 - ‖z‖)`).
4. **Filter-based continuity**:
   - Use `nhdsWithin_le_iff` and subset relations (`stolzCone ⊆ stolzSet`) to lift results from Stolz sets to cones.
5. **Real case reduction**:
   - Embed real variable `x` as `ofReal x`, apply complex theorem, then descend via `tendsto_map'_iff`.

Induction is not used; instead, the proof is analytic: leveraging convergence of partial sums, geometric series, and norm estimates.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Analysis.Complex.Basic`: basic complex analysis (norm, real/imag parts).
  - `Mathlib.Analysis.SpecificLimits.Normed`: convergence in normed spaces, geometric series.
  - `Mathlib.Tactic.Peel`: for destructing existential quantifiers.
  - `Mathlib.Tactic.Positivity`: for discharging positivity goals.

- **Mathematical scope**:
  - Power series convergence, radius of convergence, Abel summability.
  - Non-tangential limits in ℂ (Stolz sets/cones).
  - Real one-sided limits (`x → 1⁻`).

- **Formalization style**:
  - Uses `tendsto` filters for limit statements.
  - Leverages `dist_eq_norm`, `norm_sub_rev`, `norm_mul`, `norm_sum_le`.
  - Integrates real and complex analysis via `ofRealCLM`.

--- 

This module formalizes a deep result in analysis with careful attention to geometric constraints (non-tangential approach), and demonstrates Lean’s strength in handling nuanced limit arguments in complex and real settings.