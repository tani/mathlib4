Here's a structured technical metadata summary of the provided Lean 4 file on the **Maximum Modulus Principle**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `DiffContOnCl ℂ f s` | `f` is complex differentiable on `s` and continuous on `closure s`. |
| `IsMaxOn (norm ∘ f) s c` | `‖f‖` attains its maximum on `s` at `c`. |
| `EqOn f g s` | `f = g` on `s`. |
| `IsPreconnected s` | `s` is preconnected (its closure is connected). |
| `StrictConvexSpace ℝ F` | `F` is strictly convex over `ℝ`. |

#### **Main Theorems**

| Theorem | Statement |
|---------|-----------|
| `norm_eqOn_closedBall_of_isMaxOn` | If `f` is complex differentiable on `ball z r`, continuous on `closedBall z r`, and `‖f‖` has a maximum at `z` on the open ball, then `‖f x‖ = ‖f z‖` for all `x ∈ closedBall z r`. |
| `norm_eq_norm_of_isMaxOn_of_ball_subset` | If `ball z (dist w z) ⊆ s`, `f` diff. on `s`, cont. on `closure s`, and `‖f‖` max at `z ∈ s`, then `‖f w‖ = ‖f z‖`. |
| `norm_eqOn_of_isPreconnected_of_isMaxOn` | If `U` is open & preconnected, `f` diff. on `U`, and `‖f‖` max at `c ∈ U`, then `‖f x‖ = ‖f c‖` for all `x ∈ U`. |
| `norm_eqOn_closure_of_isPreconnected_of_isMaxOn` | Same as above, but conclusion holds on `closure U`. |
| `norm_eventually_eq_of_isLocalMax` | If `f` is diff. near `c` and `‖f‖` has a local max at `c`, then `‖f x‖` is locally constant near `c`. |
| `eqOn_of_isPreconnected_of_isMaxOn_norm` *(strictly convex codomain)* | Same as above, but `f x = f c` (not just norms equal). |
| `eq_of_isMaxOn_of_ball_subset` *(strictly convex codomain)* | Under same assumptions as `norm_eq_norm_of_isMaxOn_of_ball_subset`, conclude `f w = f z`. |
| `eqOn_closedBall_of_isMaxOn_norm` *(strictly convex codomain)* | Under same assumptions as `norm_eqOn_closedBall_of_isMaxOn`, conclude `f` is constant on the closed ball. |
| `exists_mem_frontier_isMaxOn_norm` | If `E` is finite-dimensional and `U` is nonempty & bounded, then `‖f‖` attains its max on `closure U` at some point in `frontier U`. |
| `norm_le_of_forall_mem_frontier_norm_le` | If `‖f z‖ ≤ C` on `frontier U`, then `‖f z‖ ≤ C` on `closure U`. |
| `eqOn_closure_of_eqOn_frontier` | If `f = g` on `frontier U`, then `f = g` on `closure U`. |
| `eqOn_of_eqOn_frontier` | Same as above, but on `U` itself. |

#### **Auxiliary Lemmas (private)**

| Name | Purpose |
|------|---------|
| `norm_max_aux₁` | Proves the principle for `f : ℂ → F` assuming `F` is complete, via Cauchy integral estimate. |
| `norm_max_aux₂` | Removes completeness assumption by embedding into completion. |
| `norm_max_aux₃` | Weakens `IsMaxOn (norm ∘ f) (closedBall z r) z` to `IsMaxOn (norm ∘ f) (ball z r) z`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `norm_`: Theorems about equality of norms.
  - `eq_`: Theorems about equality of function values (often under strict convexity).
  - `eventually_`: Local versions (up to neighborhoods).
  - `eqOn_`, `eqOn_closure_`: Global versions on sets or their closures.
  - `isMaxOn`, `isLocalMax`: Maxima conditions.
  - `isPreconnected`: Topological assumptions on domain.

- **Suffixes**:
  - `_norm`: For strictly convex codomain (equality of values, not just norms).
  - `_aux₁`, `_aux₂`, `_aux₃`: Private intermediate lemmas.

- **Pattern**:
  - `Complex.<name>_<condition>_<conclusion>`  
    e.g., `norm_eqOn_closedBall_of_isMaxOn`, `eq_of_isMaxOn_of_ball_subset`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify goals using definitions and lemmas. |
| `rw` / `rwa` | Rewrite using equalities, with assumptions. |
| `exact`, `refine`, `apply` | Construct proofs term-by-term. |
| `cases'` | Case analysis on disjunctions or unions. |
| `rcases` | Destruct existential or conjunctions. |
| `have`, `suffices`, `replace` | Introduce intermediate claims. |
| `filter_upwards` | Work with filters (e.g., `𝓝 c`, `eventually`). |
| `aesop` / `linarith` | Not explicitly used here — proofs are mostly manual. |
| `ring`, `norm_num` | Not used — complex analysis avoids arithmetic simplification. |
| `exact?`, `tauto`, `interval_cases` | Not used. |

Most proofs are **constructive and manual**, relying on:
- Cauchy integral estimates (`circleIntegral.norm_integral_lt_of_norm_le_const_of_lt`)
- Topological properties (`isPreconnected`, `isOpen`, `closure`)
- Embedding into completion (`UniformSpace.Completion.toComplL`)
- Linearity and differentiability lemmas (`DifferentiableOn`, `diffContOnCl`)

---

### **4. Proof Logic**

#### **General Proof Strategy**
1. **Reduction to 1D case** (`f : ℂ → F`) via:
   - Embedding into completion (to avoid completeness assumption).
   - Restricting to lines: `e = lineMap z w : ℂ → E`.
2. **Cauchy integral estimate** (for `norm_max_aux₁`):
   - Assume strict inequality `‖f w‖ < ‖f z‖`.
   - Derive contradiction via integral bound:  
     `‖∮ (ζ - z)⁻¹ • f ζ‖ < 2π‖f z‖`, but Cauchy formula gives equality.
3. **Generalization**:
   - Lift from `ℂ → F` to `E → F` using `lineMap`.
   - Extend from balls to connected sets via openness + preconnectedness.
   - Use `eventually` for local versions.

#### **Strictly Convex Case**
- Apply non-strict version to `f` and `f + f c`.
- Use `eq_of_norm_eq_of_norm_add_eq`:  
  If `‖x‖ = ‖y‖` and `‖x + y‖ = ‖x‖ + ‖y‖`, then `x = y`.

#### **Frontier Versions**
- Use compactness (`isCompact_closure`) to get max on `closure U`.
- Show max cannot be in interior (via openness + max principle), so must be on `frontier`.
- For `norm_le_of_forall_mem_frontier_norm_le`, reduce to 1D via `lineMap` to avoid finite-dimensionality.

---

### **5. Imports & Scope**

#### **Primary Imports**
| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Complex.CauchyIntegral` | Cauchy integral formula, contour integrals. |
| `Mathlib.Analysis.NormedSpace.Extr` | Extreme value theory in normed spaces. |
| `Mathlib.Data.Complex.FiniteDimensional` | Finite-dimensional complex normed spaces. |
| `Mathlib.Topology.Order.ExtrClosure` | Maxima on closures, topology of extrema. |

#### **Scope**
- **Domain**: Complex normed spaces `E`, `F`.
- **Functions**: `f : E → F`, complex differentiable on open sets, continuous on closures.
- **Assumptions**:
  - `E` nontrivial (for frontier results).
  - `E` finite-dimensional (for `exists_mem_frontier_isMaxOn_norm`).
  - `F` strictly convex (for `eq_`-style theorems).
- **Topological assumptions**: openness, preconnectedness, boundedness.

---

Let me know if you'd like a dependency graph or a formalization roadmap for extending this file.