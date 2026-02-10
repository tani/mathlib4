### Technical Metadata Brief: Darboux’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exists_hasDerivWithinAt_eq_of_gt_of_lt` | `a ≤ b → (∀ x ∈ Icc a b, HasDerivWithinAt f (f' x) (Icc a b) x) → f' a < m → m < f' b → ∃ c ∈ Ioo a b, f' c = m` | Intermediate Value Property for derivatives on open interval when `f' a < m < f' b`. |
| `exists_hasDerivWithinAt_eq_of_lt_of_gt` | Similar to above, but for `f' b < m < f' a`. | Handles reversed inequality case via negation. |
| `Set.OrdConnected.image_hasDerivWithinAt` | `OrdConnected s → (∀ x ∈ s, HasDerivWithinAt f (f' x) s x) → OrdConnected (f' '' s)` | Derivative image of an ord-connected set is ord-connected (i.e., interval). |
| `Set.OrdConnected.image_derivWithin` | `OrdConnected s → DifferentiableOn ℝ f s → OrdConnected (derivWithin f s '' s)` | Special case using `derivWithin`. |
| `Set.OrdConnected.image_deriv` | `OrdConnected s → (∀ x ∈ s, DifferentiableAt ℝ f x) → OrdConnected (deriv f '' s)` | Special case using `deriv`. |
| `Convex.image_hasDerivWithinAt` | `Convex ℝ s → (∀ x ∈ s, HasDerivWithinAt f (f' x) s x) → Convex ℝ (f' '' s)` | Convexity preserved under derivative image. |
| `Convex.image_derivWithin`, `Convex.image_deriv` | Analogous to above for `derivWithin` / `deriv`. | Corollaries of ord-connected version + convex ⇔ ord-connected in ℝ. |
| `exists_hasDerivWithinAt_eq_of_ge_of_le`, `exists_hasDerivWithinAt_eq_of_le_of_ge` | Handle closed interval endpoints (`[a, b]`) for `f' a ≤ m ≤ f' b`. | Extends IVT to include endpoints. |
| `hasDerivWithinAt_forall_lt_or_forall_gt_of_forall_ne` | `Convex s → (∀ x ∈ s, HasDerivWithinAt f (f' x) s x) → (∀ x ∈ s, f' x ≠ m) → (∀ x ∈ s, f' x < m) ∨ (∀ x ∈ s, m < f' x)` | If derivative never hits `m`, it's globally > or < `m` on convex domain. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exists_hasDerivWithinAt_eq_...`: Existence of point where derivative equals a value.
  - `hasDerivWithinAt_forall_...`: Universal quantification over derivative behavior.
- **Suffixes**:
  - `_of_gt_of_lt`, `_of_lt_of_gt`, `_of_ge_of_le`, `_of_le_of_ge`: Indicate ordering of endpoint derivatives relative to `m`.
  - `_hasDerivWithinAt`, `_derivWithin`, `_deriv`: Distinguish based on derivative notion used.
- **Helper patterns**:
  - `neg_lt_neg`, `sub_nonneg`, `sub_pos`, `sub_nonpos`, `sub_lt_zero`: Arithmetic manipulations of inequalities.
  - `Icc`, `Ioo`: Standard notation for closed/open intervals.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `rintro` | Decompose existential/universal hypotheses and disjunctive cases (`eq_or_lt`, `eq_or_gt`). |
| `have`, `set`, `obtain` | Introduce intermediate lemmas or definitions (e.g., `g := f - m * x`). |
| `simpa` / `simp only` | Simplify goals using known equalities or definitions (e.g., `hf x hx).neg`, `sub_mem_posTangentConeAt`). |
| `exact`, `refine` | Apply lemmas or construct proofs with holes filled later. |
| `rw`, `rwa` | Rewrite using equalities, often with `mem_nhds_iff`, `interior_Icc`, etc. |
| `aesop` / `linarith` | Likely used implicitly for linear arithmetic (not explicit here, but standard in such contexts). |
| `mono` | Monotonicity of sets (e.g., `this hx` for subset inclusion). |
| `nonneg_of_mul_nonneg_right`, `not_le_of_lt`, `lt_asymm` | Classical real analysis reasoning. |

---

#### **4. Proof Logic**

- **Core Strategy**: Reduce Darboux’s theorem to finding a local extremum of a modified function `g(x) = f(x) − m·x`.
- **Structure**:
  1. Assume `a < b` (else contradiction via `lt_asymm`).
  2. Define `g` so that `g' = f' − m`.
  3. Use compactness + continuity (from differentiability) to get a minimum of `g` on `Icc a b`.
  4. Show the minimizer `c` lies in the *interior* `Ioo a b` by contradiction:
     - If `c = a`, then `g' ≥ 0` at `a` ⇒ `f'(a) ≥ m`, contradicting `f'(a) < m`.
     - Similarly for `c = b`.
  5. Apply Fermat’s theorem on stationary points: `g'(c) = 0` ⇒ `f'(c) = m`.
- **Generalizations**:
  - Use ord-connectedness (interval property) to lift pointwise IVT to global image preservation.
  - Convex ⇒ ord-connected in ℝ, so convex versions follow immediately.
- **Contrapositive reasoning** appears in `hasDerivWithinAt_forall_lt_or_forall_gt_of_forall_ne`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Calculus.Deriv.Add` | Derivative rules for addition. |
| `Mathlib.Analysis.Calculus.Deriv.Mul` | Derivative rules for multiplication (used in `g' = f' − m`). |
| `Mathlib.Analysis.Calculus.LocalExtr.Basic` | Local extrema properties, Fermat’s theorem (`hasDerivAt_eq_zero`), tangent cones, etc. |

> **Note**: The proof relies heavily on:
> - `HasDerivWithinAt` calculus (chain rule, sum, scalar mult),
> - Compactness of `Icc a b`,
> - Continuity from differentiability (`continuousWithinAt`),
> - Tangent cone calculus for endpoint analysis.

--- 

Let me know if you'd like a diagram of the proof tree or a formalized summary in tactic-comment style.