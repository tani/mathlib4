Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formal metadata relevant for building a domain-specific AI agent (e.g., for theorem proving assistance or formal verification):

---

### 🔍 **Technical Brief: Inverse of Analytic Functions in Lean 4**

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `leftInv` | `FormalMultilinearSeries 𝕜 E F → (E ≃L[𝕜] F) → E → FormalMultilinearSeries 𝕜 F E` | Constructs the *formal left inverse* of a multilinear series `p`, assuming its linear part `p₁` is invertible (witnessed by `i`). Defined inductively to satisfy `(leftInv p i x) ∘ p = id`. |
| `rightInv` | Same type as `leftInv` | Constructs the *formal right inverse*, defined to satisfy `p ∘ (rightInv p i x) = id`. Uses a different recursive structure, better suited for convergence estimates. |
| `leftInv_comp` | `p.leftInv i x ∘ p = id` (under `p₁ = i`) | Proves `leftInv` is indeed a left inverse when `p₁ = i`. |
| `rightInv_comp` | `p ∘ p.rightInv i x = id` (under `p₁ = i`, `p₀ = 0`) | Proves `rightInv` is a right inverse under the same condition and vanishing constant term. |
| `leftInv_eq_rightInv` | `leftInv p i x = rightInv p i x` (under `p₁ = i`) | Shows both inverses coincide when `p₁` is invertible. |
| `radius_rightInv_pos_of_radius_pos` | `0 < p.radius → 0 < (p.rightInv i x).radius` | If `p` converges in a neighborhood (positive radius), so does its right inverse. |
| `radius_leftInv_pos_of_radius_pos` | Same as above, for `leftInv`. | Follows from `leftInv_eq_rightInv`. |
| `PartialHomeomorph.hasFPowerSeriesAt_symm` | (in later section) | If a partial homeomorphism `f` has an F-power series `p` at `x` with invertible linear part, then `f⁻¹` has FPS at `f x`, given by `p.leftInv`. |

> **Note**: All inverses are defined *formally* (i.e., as sequences of multilinear maps), and analyticity is deduced via convergence properties.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `leftInv`, `rightInv`: denote inverse constructions.
  - `coeff_zero`, `coeff_one`, `coeff_n`: refer to coefficient extraction at low degrees.
  - `removeZero`: indicates independence of constant term.
  - `comp_`: for composition lemmas (`leftInv_comp`, `comp_rightInv`, etc.).
  - `radius_`: for radius-of-convergence lemmas.

- **Suffixes**:
  - `_pos`: indicates positivity of a real/ENNReal quantity (e.g., `radius_pos`).
  - `_aux1`, `_aux2`: auxiliary technical lemmas (used in convergence proofs).
  - `_symm`: for symmetry or inverse-related properties.

- **Variable naming**:
  - `p`, `q`: formal multilinear series.
  - `i`: linear isomorphism (`E ≃L[𝕜] F`), intended to be `p₁`.
  - `x`: constant coefficient (element of `E`).
  - `n`, `k`, `j`: natural numbers indexing terms.
  - `c`: a `Composition n`, used in recursive definitions.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `induction' n using Nat.strongRec'` | Structural induction on `n` for recursive definitions (e.g., `leftInv_removeZero`, `rightInv_removeZero`). |
| `simp only [...]` | Simplification with precise control over rewrite rules (e.g., coefficient lemmas, `comp_coeff_*`, `leftInv_coeff_*`). |
| `congr` / `congr'` | Equality proofs via congruence closure (e.g., proving multilinear maps equal by extensionality). |
| `ext` / `ext1` | Extensionality for multilinear maps or functions. |
| `rw [← ..., -Set.toFinset_setOf]` | Rewriting using set-theoretic identities (e.g., partitioning compositions). |
| `gcongr` | Goal-directed congruence for inequalities (used heavily in convergence estimates). |
| `ring` / `linarith` | Algebraic simplification and linear arithmetic over reals. |
| ` positivity` | Proves non-negativity of expressions (e.g., norms, powers of nonnegative reals). |
| `filter_upwards` | Filter-based asymptotic reasoning (e.g., in `tendsto_partialSum_prod_of_comp`). |

---

#### 4. **Proof Logic & Strategy**

- **Inductive Definitions**: Both `leftInv` and `rightInv` are defined by strong induction on `n`, where the `n`-th coefficient is built from lower-degree terms to enforce the inverse law.
  
- **Composition Partitioning**: Proofs rely on decomposing the set of compositions `Composition n` into disjoint subsets (e.g., those with length `< n`, or `> 1`, or `= 1`). Key lemmas:
  - `A : Finset.univ = ... ∪ {ones n}` or `{single n}`
  - `B : Disjoint ...` ensures sums split cleanly.

- **Norm Estimates**: For convergence, the proof uses:
  - Bounding `‖p n‖ ≤ C rⁿ` (from `radius_pos`).
  - Inductive control on partial sums `Sₙ = ∑_{k=1}^n aᵏ ‖qₖ‖`.
  - A *bootstrap argument*: assuming `Sₙ₋₁ ≤ K a`, derive `Sₙ ≤ K a` for small `a`, via quadratic decay.

- **Key Insight**: The right-inverse formula is preferred for convergence because it bounds `qₙ` in terms of *fewer* lower-order terms (only `k=2` contributes `qₙ₋₁`), avoiding factorial growth.

---

#### 5. **Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Analytic.Composition` | Composition of analytic functions / FPS. |
| `Mathlib.Analysis.Analytic.Linear` | Linear algebra & multilinear maps in analytic context. |
| `Mathlib.Tactic.Positivity` | Tactics for proving nonnegativity/positivity. |

**Scope**:  
- Works in general Banach spaces over a nontrivially normed field `𝕜` (e.g., `ℝ`, `ℂ`).  
- Formal multilinear series (`FormalMultilinearSeries`) serve as abstract power series.  
- Goal: prove analyticity of inverses of local diffeomorphisms (via `PartialHomeomorph.hasFPowerSeriesAt_symm`).

---

Let me know if you'd like a **diagram of dependencies**, **proof sketch for `leftInv_eq_rightInv`**, or a **summary of the convergence argument** in more detail.