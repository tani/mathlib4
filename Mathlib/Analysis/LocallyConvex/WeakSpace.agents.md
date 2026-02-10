Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Convex.toWeakSpace_closure` | `{s : Set E} → Convex ℝ s → (toWeakSpace 𝕜 E) '' closure s = closure (toWeakSpace 𝕜 E '' s)` | Shows that for an `ℝ`-convex set `s` in a locally convex space `E`, its topological closure coincides with its weak closure under the canonical map `toWeakSpace 𝕜 E`. |
| `LinearMap.image_closure_of_convex` | `{s : Set E} → Convex ℝ s → (e : E →ₗ[𝕜] F) → (∀ f : F →L[𝕜] 𝕜, Continuous (e.dualMap f)) → e '' closure s ⊆ closure (e '' s)` | Generalizes the above: if a linear map `e : E → F` pulls back continuous linear functionals to continuous ones, then it preserves closures of convex sets (one inclusion). |
| `LinearEquiv.image_closure_of_convex` | `{s : Set E} → Convex ℝ s → (e : E ≃ₗ[𝕜] F) → (∀ f : F →L[𝕜] 𝕜, Continuous (e.dualMap f)) → (∀ f : E →L[𝕜] 𝕜, Continuous (e.symm.dualMap f)) → e '' closure s = closure (e '' s)` | Full equivalence version: if both `e` and `e⁻¹` preserve continuity of linear functionals, then `e` commutes with closure on convex sets. |
| `LinearEquiv.image_closure_of_convex'` | `{s : Set E} → Convex ℝ s → (e : E ≃ₗ[𝕜] F) → ((F →L[𝕜] 𝕜) ≃ (E →L[𝕜] 𝕜)) → (∀ f, e_dual f = e.dualMap f) → e '' closure s = closure (e '' s)` | Variant using an explicit dual isomorphism `e_dual`, avoiding reference to `e.symm.dualMap`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `toWeakSpace`: canonical map from `E` to its weak space.
  - `dualMap`: induced map on continuous duals via precomposition.
  - `image_`, `closure`: standard set-theoretic operations.
  - `linear_`, `convex`: indicates convexity or linearity assumptions.

- **Suffixes**:
  - `_closure`: indicates a theorem about interaction of maps with closure.
  - `_of_convex`: condition on convexity of the input set.
  - `_continuous`: continuity of dual maps is central.

- **Other patterns**:
  - `he₁`, `he₂`: hypotheses for continuity of dual maps in both directions.
  - `hs`: hypothesis that `s` is convex (`Convex ℝ s`).
  - `f'`, `f''`: auxiliary continuous linear functionals constructed during proofs.

---

### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `refine` / `exact` | Structuring proofs with goals and subgoals. |
| `rw` / `simp` / `simp_rw` | Rewriting using equalities, simplifying expressions. |
| `ext` / `ext x` | Extensionality for functions/sets. |
| `have`, `obtain`, `let` | Introducing intermediate results or definitions. |
| `simpa` | Simplify using a lemma and discharge remaining goals. |
| `fun_prop` | Proving continuity of functionals in topological vector spaces. |
| `isClosed_...` (e.g., `isClosed_closure`) | Applying known facts about closed sets. |
| `closure_minimal`, `image_closure`, `continuousOn.image_closure` | Core lemmas about closure under continuous maps. |
| `geometric_hahn_banach_closed_point` | A geometric Hahn–Banach separation result used to separate points from closed convex sets. |
| `le_antisymm` | Proving equality by double inequality. |

---

### **4. Proof Logic**

- **General Strategy**:
  - Use **Hahn–Banach separation** to separate a point outside the closure from a convex set.
  - Lift functionals from `E` to `WeakSpace 𝕜 E` via the universal property of the weak topology.
  - Show that the separating functional descends to the weak space and separates the image of the set.
  - For equivalences, apply the one-direction result to both `e` and `e⁻¹`.

- **Typical Flow**:
  1. Assume convexity `hs : Convex ℝ s`.
  2. Use `geometric_hahn_banach_closed_point` to get a continuous linear functional `f` and real `u` separating a point `x ∉ closure s` from `s`.
  3. Construct a functional `f'` on the weak space using `f` and the universal property.
  4. Show that the inequality defining the half-space transfers to the weak setting.
  5. Conclude via closure minimality or complement arguments.

- **Key Lemmas Used**:
  - `RCLike.geometric_hahn_banach_closed_point`: geometric separation in locally convex spaces.
  - `toWeakSpaceCLM.continuous`: continuity of the canonical map to the weak space.
  - `WeakBilin.eval_continuous`: continuity of evaluation pairing.
  - `Set.image_subset_image_iff`: for injective maps.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.LinearAlgebra.Dual` | Basic theory of dual spaces and linear maps. |
| `Mathlib.Analysis.NormedSpace.HahnBanach.Separation` | Hahn–Banach separation theorems (used in `geometric_hahn_banach_closed_point`). |
| `Mathlib.Topology.Algebra.Module.WeakDual` | Definition and properties of the weak topology and `WeakSpace`, including `toWeakSpace`. |

---

### **Domain-Specific AI Agent Notes**

- **Core Domain**: Functional analysis, specifically locally convex topological vector spaces and convex geometry.
- **Key Concepts**: Weak topology, continuous dual, Hahn–Banach separation, convex sets, closure operators.
- **Proof Style**: Constructive use of separation theorems; heavy reliance on categorical properties of the weak topology and duality.
- **Automation Potential**: Many steps (e.g., continuity checks, functional lifting) are routine and could be automated with `fun_prop`, `simp`, and custom tactics.

Let me know if you'd like a tactic-level trace of one of the proofs or a visualization of the logical dependencies.