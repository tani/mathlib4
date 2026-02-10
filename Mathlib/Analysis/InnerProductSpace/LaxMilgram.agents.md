### Technical Metadata Brief: Lax-Milgram Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsCoercive` | `B : V →L[ℝ] V →L[ℝ] ℝ → Prop` | Predicate stating that bilinear form `B` is coercive: `∃ C > 0, ∀ u, C * ‖u‖² ≤ B u u`. |
| `bounded_below` | `IsCoercive B → ∃ C > 0, ∀ v, C * ‖v‖ ≤ ‖B♯ v‖` | Shows that the associated operator `B♯` is bounded below (i.e., injective with closed range). |
| `antilipschitz` | `IsCoercive B → ∃ C > 0, AntilipschitzWith C B♯` | Derives antilipschitz property of `B♯`, implying injectivity and quantitative lower bound on norm growth. |
| `ker_eq_bot` | `IsCoercive B → ker B♯ = ⊥` | Proves injectivity of `B♯` via antilipschitz. |
| `isClosed_range` | `IsCoercive B → IsClosed (range B♯)` | Shows the range of `B♯` is closed (via uniform continuity + antilipschitz). |
| `range_eq_top` | `IsCoercive B → range B♯ = ⊤` | Proves surjectivity of `B♯`, using orthogonal complement argument and coercivity. |
| `continuousLinearEquivOfBilin` | `IsCoercive B → V ≃L[ℝ] V` | The main object: the Lax-Milgram equivalence, a continuous linear isomorphism. |
| `continuousLinearEquivOfBilin_apply` | `⟪coercive.continuousLinearEquivOfBilin v, w⟫ = B v w` | Characterizes the action of the equivalence via the Riesz representation. |
| `unique_continuousLinearEquivOfBilin` | Uniqueness of the Riesz representative satisfying `⟪f, w⟫ = B v w`. | Ensures the equivalence is uniquely determined by the bilinear form. |

> **Notation**: `B♯` is shorthand for `continuousLinearMapOfBilin B`, mapping `v ↦ (w ↦ B v w)` viewed as an element of `V` via Riesz representation.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isClosed_range`, `is_lax_milgram` — indicates a property or predicate.
  - `bounded_below`, `antilipschitz`, `ker_eq_bot`, `range_eq_top`: descriptive of structural properties of operators.
- **Suffixes**:
  - `_eq_bot`, `_eq_top`: denote equality to bottom/top submodule (i.e., `{0}` or whole space).
  - `continuousLinearEquivOfBilin`: pattern `X_ofBilin` for constructions derived from bilinear forms.
- **Shorthands**:
  - `♯` (postfix): `B♯` = `continuousLinearMapOfBilin B`.
  - `⟨C, C_pos, coercivity⟩`: destructuring coercivity hypothesis.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rcases` | Destruct existential/universal hypotheses (e.g., coercivity, antilipschitz). |
| `by_cases` | Split on whether `‖v‖ > 0`. |
| `calc` | Chain inequalities (e.g., in `bounded_below`). |
| `simp_rw` | Simplify with rewrite rules (e.g., converting `C⁻¹` to `NNReal`). |
| `rw` / `apply` / `exact` | Standard rewriting and application of lemmas. |
| `linarith` / `nlinarith` | Likely used implicitly (e.g., for positivity arguments like `C * ‖w‖² ≤ 0 ⇒ w = 0`). |
| ` positivity` | To discharge trivial positivity goals (e.g., `0 ≤ ‖w‖²`). |
| `subsingleton.elim` / `rfl` | For equality of zero vectors. |
| `orthogonal_orthogonal` | Used in `range_eq_top` to reduce to orthogonal complement argument. |

---

#### **4. Proof Logic**

- **Structure of main proof (`range_eq_top`)**:
  1. Use `isClosed_range` to know `range B♯` is closed.
  2. Apply orthogonal complement identity: `range B♯ = (range B♯)^^⊥⊥`.
  3. To show `range B♯ = ⊤`, it suffices to show `(range B♯)^⊥ = {0}`.
  4. Let `w ∈ (range B♯)^⊥`. Then `⟪B♯ v, w⟫ = 0` for all `v`.
  5. By definition of `B♯`, this means `B v w = 0` for all `v`.
  6. In particular, `B w w = 0`.
  7. Coercivity: `C ‖w‖² ≤ B w w = 0 ⇒ ‖w‖ = 0 ⇒ w = 0`.
  8. Hence orthogonal complement is trivial ⇒ range is dense and closed ⇒ whole space.

- **Overall flow**:
  - Coercivity ⇒ `B♯` bounded below ⇒ injective + closed range.
  - Closed range + trivial orthogonal complement ⇒ surjective.
  - Bijective bounded linear operator between Banach spaces ⇒ continuous equivalence (via `ContinuousLinearEquiv.ofBijective`).

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Analysis.InnerProductSpace.Dual
  ```
  - Provides `continuousLinearMapOfBilin`, Riesz representation, and dual space machinery.

- **Key typeclass assumptions**:
  - `NormedAddCommGroup V`, `InnerProductSpace ℝ V`, `CompleteSpace V`: ensures `V` is a real Hilbert space.

- **Namespace & context**:
  - `noncomputable section`: allows noncomputable definitions (e.g., inverse norms).
  - `open RCLike LinearMap ContinuousLinearMap InnerProductSpace`: brings relevant operations into scope.
  - `universe u`: polymorphism over types in universe `u`.

- **Dependencies**:
  - Relies on `Mathlib.Analysis.InnerProductSpace.Dual` for Riesz representation.
  - Uses `NNReal`, `Real`, `norm`, `inner`, `antilipschitz`, `uniformContinuous`, `Submodule.orthogonal`.

---

### Summary

This file formalizes the **Lax-Milgram theorem** in the setting of real Hilbert spaces, establishing that a coercive bounded bilinear form induces a continuous linear equivalence `V ≃L[ℝ] V`. The proof leverages functional-analytic tools: antilipschitz bounds, closed range, orthogonal complements, and Riesz representation. The naming and structure follow Lean 4’s `Mathlib` conventions, with heavy use of `rcases`, `calc`, and `simp_rw`, and a clear separation of intermediate lemmas (`bounded_below`, `antilipschitz`, `ker_eq_bot`, `range_eq_top`) leading to the main equivalence.