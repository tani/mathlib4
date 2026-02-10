### Technical Metadata Brief: Urysohn’s Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Urysohns.CU` | `Structure` | Auxiliary type: pairs `(C, U)` with `C` closed, `U` open, `C ⊆ U`, and `P C` for a predicate `P` (e.g., `True` or `IsCompact`). Includes a choice operator `hP` for intermediate open sets with closure in `U`. |
| `Urysohns.CU.left c`, `Urysohns.CU.right c` | `CU P` | Refinements of `c : CU P`: `left c = (C, u)`, `right c = (closure u, U)` where `u` is the open set from `hP`. |
| `Urysohns.CU.approx n c x` | `X → ℝ` | Recursive family of functions approximating the Urysohn function: <br>• `approx 0 c x = 1_{Uᶜ}(x)` <br>• `approx (n+1) c x = midpoint (approx n c.left x, approx n c.right x)` |
| `Urysohns.CU.lim c x` | `X → ℝ` | Pointwise supremum (limit) of `approx n c x`. Continuous, bounded in `[0,1]`, equals `0` on `C`, `1` on `Uᶜ`. |
| `Urysohns.CU.continuous_lim c` | `Continuous (lim c)` | Main regularity result: `lim c` is continuous. Proven via induction on `(3/4)^n` control of local oscillation. |
| `exists_continuous_zero_one_of_isClosed` | `NormalSpace X → ... → ∃ f : C(X, ℝ), ...` | Classical Urysohn’s lemma for disjoint closed sets in a normal space. |
| `exists_continuous_zero_one_of_isCompact` | `RegularSpace X → LocallyCompactSpace X → ...` | Urysohn’s lemma for `s` compact, `t` closed in a regular locally compact space. |
| `exists_continuous_one_zero_of_isCompact` | Same premises, stronger conclusion: `f` has **compact support**. |
| `exists_continuous_one_zero_of_isCompact_of_isGδ` | Same + `s` is Gδ: ensures `f⁻¹({1}) = s`. |
| `exists_tsupport_one_of_isOpen_isClosed` | `T2Space X`, `s` open with compact closure, `t ⊆ s` closed: `f` supported in `s`, `f = 1` on `t`. |
| `exists_continuous_nonneg_pos` | `RegularSpace X`, `LocallyCompactSpace X`: existence of a compactly supported continuous function nonzero at a point. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isClosed`, `isOpen`, `IsCompact`, `IsGδ` — typeclass/property predicates.
  - `has_`: e.g., `HasCompactSupport` — existence of a structure (support is compact).
  - `mem_`, `not_mem_`: membership/non-membership lemmas (e.g., `mem_compl_iff`).
  - `disjoint_`, `subset_`, `compl_`: set-theoretic relations.

- **Suffixes**:
  - `_of_`: e.g., `lim_of_mem_C`, `approx_of_nmem_U` — condition on input implies value.
  - `_mono`, `_le_`, `_nonneg`: monotonicity, inequality, nonnegativity.
  - `_right`, `_left`: structural components (`left`, `right` refinements).
  - `_succ`, `_zero`: base/step cases in induction.

- **Structure fields**:
  - `C`, `U`, `P_C`, `closed_C`, `open_U`, `subset`, `hP` — explicit naming for components.

- **Function names**:
  - `approx`, `lim`, `continuous_lim`, `tendsto_approx_atTop` — descriptive, aligned with mathematical intent.

---

#### **3. Tactic Stack**

| Tactic | Frequency / Role |
|--------|------------------|
| `induction'` / `induction ... generalizing` | Very high — core to recursive definitions (`approx`, `lim` properties), especially on `n : ℕ`. |
| `simp only [...]` | High — simplifies using explicit lemmas (e.g., `approx`, `lim`, `midpoint`, `ciSup`). |
| `rw [...]` | High — rewrites definitions, equalities (e.g., `lim_eq_midpoint`, `approx_of_mem_C`). |
| `exact`, `exacts` | High — completes goals using pre-proved lemmas. |
| `gcongr` | Medium — used in `continuous_lim` proof to handle inequalities involving powers of `3/4`. |
| `field_simp`, `ring` | Medium — simplifies arithmetic (e.g., `(3/4)^n / 2 ≤ (3/4)^(n+1)`). |
| `filter_upwards` | Medium — in continuity proof, handles neighborhood filters. |
| `norm_num`, ` positivity` | Low–medium — numeric verification (e.g., `0 < 1/2 < 3/4 < 1`). |
| `apply`, `refine`, `exact?` | Medium — constructing proofs with holes filled later. |
| `cases`, `rcases`, `obtain` | Medium — destructuring existential hypotheses (e.g., `hP`, `hscp`). |
| `set` | Low — introduces intermediate terms (e.g., `r := (3/4)^n`). |
| `aesop` | Not present — Lean 4 Mathlib avoids automation-heavy tactics in formal analysis. |

---

#### **4. Proof Logic & Strategy**

- **Inductive Construction**:
  - Build a family of open/closed approximations `(Cₙ, Uₙ)` via `left`/`right` refinements.
  - Define `approx n` recursively using midpoint averaging — ensures dyadic rational interpolation.

- **Monotonicity & Boundedness**:
  - Prove `approx n x` is monotone in `n` and bounded in `[0,1]`.
  - Use `ciSup` to define `lim`, leveraging monotone convergence.

- **Continuity via Local Oscillation Control**:
  - Prove by induction on `n` that `|lim y - lim x| ≤ (3/4)^n` in a neighborhood of `x`.
  - Two cases:
    1. `x ∈ left.U`: then `right.lim = 0` nearby → reduces to `left` case.
    2. `x ∉ left.right.C`: then `left.left.lim = 1` nearby → reduces to `right` and `left.right` cases.
  - Triangle inequality + midpoint recurrence yield the contraction factor `3/4`.

- **Generalization via Predicate `P`**:
  - Same proof works for:
    - Normal spaces (`P = True`)
    - Locally compact spaces (`P = IsCompact`) — uses `exists_compact_closed_between`.

- **Derivatives & Variants**:
  - `1 - f` swaps zero/one sets.
  - `∑ uₙ fₙ` constructs compactly supported functions with prescribed level sets (Gδ case).
  - `tsupport` handled via support containment arguments.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Affine.AddTorsor` | Provides `midpoint` and affine structure over `ℝ`. |
| `Mathlib.Analysis.NormedSpace.FunctionSeries` | For `tsum`, `continuous_tsum`, series convergence lemmas. |
| `Mathlib.Analysis.SpecificLimits.Basic` | Basic limit theory (e.g., `tendsto_atTop_ciSup`). |
| `Mathlib.LinearAlgebra.AffineSpace.Ordered` | Ordered vector space structure (used for `midpoint` algebra). |
| `Mathlib.Topology.ContinuousMap.Algebra` | Continuous functions as topological algebra (`C(X, ℝ)`). |
| `Mathlib.Topology.GDelta.Basic` | Gδ sets (`IsGδ`) and their representation as countable intersections of opens. |

**Domain Scope**:  
- **Topology**: normal, regular, locally compact, T2 spaces.  
- **Analysis**: continuity, compact support, uniform boundedness, series of functions.  
- **Set Theory**: closed/open sets, closures, interiors, complements, disjointness.  
- **Order Theory**: `Icc`, `BddAbove`, monotone sequences, suprema.

---

### Summary

This formalization presents a **robust, reusable framework** for Urysohn’s lemma, leveraging:
- A **generic inductive construction** over `CU P` to unify normal and locally compact cases.
- **Midpoint-based recursion** to avoid dyadic rational indexing.
- **Explicit oscillation control** for continuity, avoiding measure-theoretic or Baire-category arguments.
- **Lean 4’s dependent type system** to carry structural assumptions (`P`, `IsClosed`, `IsCompact`) through the proof.

The code exemplifies modern Mathlib style: precise naming, minimal automation, and deep integration with topology/analysis libraries.