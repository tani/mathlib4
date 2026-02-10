Here's a structured technical metadata extraction for the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tendsto_tsum_of_dominated_convergence` | `{α β G : Type*} {𝓕 : Filter α} [NormedAddCommGroup G] [CompleteSpace G] → (f : α → β → G) → (g : β → G) → (bound : β → ℝ) → Summable bound → (∀ k, Tendsto (f · k) 𝓕 (𝓝 (g k))) → (∀ᶠ n in 𝓕, ∀ k, ‖f n k‖ ≤ bound k) → Tendsto (∑' k, f · k) 𝓕 (𝓝 (∑' k, g k))` | Main theorem: under uniform domination by a summable function, termwise limits commute with infinite sums (i.e., limit and sum can be interchanged). |
| `h_g_le` | `∀ k, ‖g k‖ ≤ bound k` | Auxiliary lemma: pointwise limit `g` is bounded by the dominating function `bound`. |
| `h_sumg` | `Summable (‖g ·‖)` | Consequence of domination: the norms of `g` are summable. |
| `h_suma` | `∀ᶠ n in 𝓕, Summable (‖f n ·‖)` | Eventually, each `f n` is absolutely summable. |

---

### **2. Naming Conventions**

- **Predicates / properties**:  
  - `is_`-style not used here; instead, properties are named descriptively (`Summable`, `Tendsto`, `dist`, `norm`).
- **Quantifiers & bounds**:  
  - `h_` prefix for hypotheses (e.g., `h_sum`, `h_bound`, `h_g_le`, `h_sumg`, `h_suma`).
- **Logical structure**:  
  - `hab`, `h_bound`, `h_sum`: short, mnemonic names for key assumptions.
  - `h1`, `h2`, `hn`: intermediate goals or steps in the proof.
- **Set/finite sum notation**:  
  - `T.sum`, `∑ b ∈ T`, `∑' k`: finite vs. infinite sums distinguished via `∑` vs `∑'`.

---

### **3. Tactic Stack**

| Tactic | Usage |
|--------|-------|
| `rcases` / `obtain` | To split cases (`isEmpty_or_nonempty`, `eq_or_neBot`) and extract finite sets from convergence assumptions. |
| `filter_upwards` | To handle filter-based arguments (especially for “eventually” statements). |
| `rw [Metric.tendsto_nhds]` | To unfold metric-space convergence in terms of `ε`-balls. |
| `simp only [...]` | Simplification with precise rewrites (e.g., `tsum_empty`, `sum_add_tsum_compl`). |
| `refine` / `exact` | To construct proofs step-by-step, often after breaking into subgoals. |
| `calc` | For chaining inequalities (e.g., bounding tail of sum). |
| `ring` | To rearrange algebraic expressions (e.g., splitting `ε = ε/3 + ε/3 + ε/3`). |
| `norm_add_le`, `norm_sub_le`, `norm_tsum_le_tsum_norm` | Norm inequalities for estimation. |
| `tsum_le_tsum` | To compare infinite sums termwise. |

---

### **4. Proof Logic**

- **High-level strategy**:  
  - **Case analysis** on emptiness of `β` and non-emptiness of filter `𝓕`.
  - **Reduction to ε/3 argument**: standard technique in analysis for controlling error in three parts:
    1. Tail of the dominating series (`h1`).
    2. Convergence on a finite subset `T` (`h2`).
    3. Tail of the difference `f n - g`.
  - **Bounding intermediate terms** using:
    - Dominating function `bound`,
    - Summability of `bound`,
    - Norm inequalities (`norm_tsum_le_tsum_norm`, `norm_sub_le`, etc.).
- **Key logical flow**:
  1. Show `g` is dominated and summable.
  2. Fix `ε > 0`, choose finite `T` approximating the total sum of `bound`.
  3. Use convergence on finite `T` and uniform boundedness to control error.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.RCLike.Basic` | Provides `ℝ`-like structure (e.g., `NormedAddCommGroup`, `CompleteSpace`, `dist`, `norm`). |
| `Mathlib.Analysis.Normed.Group.InfiniteSum` | Defines `tsum`, `Summable`, and basic properties of infinite sums in normed groups (e.g., `tsum_sub`, `norm_tsum_le_tsum_norm`, `sum_add_tsum_compl`). |

---

### **Summary**

This file formalizes **Tannery’s theorem** in Lean 4 — a convergence result for infinite sums depending on a parameter — using only basic analysis in normed complete additive commutative groups. It avoids measure-theoretic machinery by giving a direct, elementary proof via an ε/3 argument, while still being more general than the classical statement (e.g., arbitrary filters, no vector space or second-countability assumptions). The naming and structure follow Lean/Mathlib conventions, with clear separation of hypotheses, auxiliary lemmas, and main proof steps.

Let me know if you'd like a dependency graph or a comparison with the measure-theoretic dominated convergence theorem in Mathlib.