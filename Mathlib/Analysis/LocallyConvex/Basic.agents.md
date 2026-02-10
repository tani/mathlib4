Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Local Convexity — Absorbent and Balanced Sets**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Balanced` | `Set E → Prop` | A set `A` is *balanced* if scaling it by any scalar of norm ≤ 1 keeps it within itself: `∀ a, ‖a‖ ≤ 1 → a • A ⊆ A`. |
| `Absorbs` | `Set E → Set E → Prop` | A set `A` *absorbs* `B` if all sufficiently large scalings of `A` contain `B`. Formally: `∃ r, ∀ c, r ≤ ‖c‖ → B ⊆ c • A`. |
| `Absorbent` | `Set E → Prop` | A set `A` is *absorbent* if it absorbs every singleton `{x}` — i.e., for all `x`, eventually `x ∈ r • A` for large `r`. |
| `absorbs_iff_norm` | `Absorbs A B ↔ ∃ r, ∀ c, r ≤ ‖c‖ → B ⊆ c • A` | Equivalence between the filter-based definition of absorption and a norm-based one. |
| `balanced_iff_smul_mem` | `Balanced s ↔ ∀ a x, ‖a‖ ≤ 1 → x ∈ s → a • x ∈ s` | Pointwise membership characterization of balanced sets. |
| `balanced_iff_closedBall_smul` | `Balanced s ↔ closedBall 0 1 • s ⊆ s` | Balancedness equivalent to invariance under multiplication by the closed unit ball in `𝕜`. |
| `Balanced.absorbs_self` | `Balanced A → Absorbs A A` | Every balanced set absorbs itself. |
| `Balanced.convexHull` | `Balanced s → Balanced (convexHull s)` | The convex hull of a balanced set is balanced (over `ℝ`). |
| `absorbent_nhds_zero` | `A ∈ 𝓝 0 → Absorbent A` | Any neighborhood of 0 is absorbent (requires continuity of scalar multiplication). |
| `Balanced.interior` | `Balanced A → 0 ∈ interior A → Balanced (interior A)` | Interior of a balanced set containing 0 is balanced. |
| `Balanced.closure` | `Balanced A → Balanced (closure A)` | Closure of a balanced set is balanced. |
| `balanced_iff_neg_mem` (real case) | `Convex s → Balanced s ↔ ∀ x ∈ s, -x ∈ s` | For convex sets over `ℝ`, balancedness is equivalent to symmetry about 0. |

---

#### **2. Naming Conventions**

- **Predicates**:  
  - `Balanced`, `Absorbent`, `Absorbs` — capitalized, descriptive.
- **Lemmas / Theorems**:  
  - `balanced_*`, `absorbent_*`, `absorbs_*` — lowercase, often prefixed with the property they relate to.
  - `*_iff_*` — equivalence lemmas (e.g., `balanced_iff_smul_mem`).
  - `*_mono`, `*_mem`, `*_subset`, `*_eq` — indicate monotonicity, membership, subset, or equality properties.
  - `*_zero`, `*_neg`, `*_interior`, `*_closure`, `*_convexHull` — indicate behavior under specific set operations.
- **Aliases**:  
  - `alias ⟨_, Absorbs.of_norm⟩ := absorbs_iff_norm` — provides forward/backward directions.
  - `@[deprecated ...]` — marks legacy names (e.g., `balanced_zero_union_interior`, `mem_smul_iff`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw` — for rewriting using definitional equalities and lemmas.
- `aesop` — for automated reasoning in simple goals (e.g., set inclusions).
- `rw` — for rewriting with equivalences or equalities.
- `exact`, `refine`, `apply` — for constructing proofs term-by-term.
- `cases` / `obtain` / `rcases` — for case analysis or destructuring existential/universal hypotheses.
- `set_ext` / `ext` — for extensionality proofs (e.g., `Set.ext`).
- `calc` — for chaining inequalities or subset relations.
- `norm_num`, `ring`, `linarith` — arithmetic simplifications (especially in `Real` section).
- `continuous_*`, `isOpenMap_*`, `tendsto_*` — analysis-specific tactics for topology.

---

#### **4. Proof Logic**

- **Structure**:  
  - Proofs often proceed by unfolding definitions (`balanced_iff_smul_mem`, `absorbs_iff_norm`) and reducing to scalar inequalities.
  - Many proofs use **case analysis on `a = 0` or `a ≠ 0`** (via `eq_or_ne`), especially when dividing or inverting scalars.
  - **Monotonicity arguments** dominate: e.g., `smul_set_mono`, `subset_trans`, `antisymm`.
  - **Topological arguments** (e.g., `absorbent_nhds_zero`) rely on continuity of scalar multiplication and filter convergence (`tendsto_inv₀_cobounded`).
  - **Convexity + symmetry ⇒ balancedness** (real case): uses convex combination decomposition of `a • x` via `(1−a)/2`, `(a+1)/2`.

- **Induction**: Not used here — mostly algebraic and topological reasoning.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Analysis.Convex.Basic` — convex sets, convex hulls.
- `Mathlib.Analysis.Convex.Hull` — properties of convex hulls.
- `Mathlib.Analysis.Normed.Module.Basic` — normed modules, scalar multiplication.
- `Mathlib.Topology.Bornology.Absorbs` — bornological concepts like absorption.

**Mathematical Context**:
- Works over **seminormed rings**, **normed division rings**, **normed fields**, and **nontrivially normed fields**.
- Extends to **real vector spaces** with convexity assumptions.
- Assumes `SMul`, `Module`, `AddCommGroup`, and often `ContinuousSMul` or `NormedSpace` structure.

**Tags**: `absorbent`, `balanced`, `locally convex`, `LCTVS`.

---

Let me know if you'd like a diagram of dependencies or a summary of how these definitions feed into locally convex topology (e.g., construction of seminorms from absorbent balanced neighborhoods).