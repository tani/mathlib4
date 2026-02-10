### Technical Metadata Brief: Derangements on Types (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `derangements α` | `Set (Perm α)` | Defines the set of permutations on `α` with **no fixed points**. |
| `mem_derangements_iff_fixedPoints_eq_empty` | `f ∈ derangements α ↔ fixedPoints f = ∅` | Connects membership in `derangements` to empty fixed-point set. |
| `Equiv.derangementsCongr` | `(e : α ≃ β) → derangements α ≃ derangements β` | Shows derangements are preserved under type equivalence. |
| `derangements.subtypeEquiv` | `derangements (Subtype p) ≃ { f : Perm α // ∀ a, ¬p a ↔ a ∈ fixedPoints f }` | Relates derangements on a subtype to permutations on the original type with controlled fixed points. |
| `atMostOneFixedPointEquivSum_derangements` | `{ f : Perm α // fixedPoints f ⊆ {a} } ≃ derangements ({a}ᶜ) ⊕ derangements α` | Decomposes permutations fixing at most `a` into derangements on complement or full type. |
| `RemoveNone.fiber` | `Set (Perm α)` | Fiber of `decomposeOption` over an `Option α`, used to analyze how derangements project down. |
| `RemoveNone.fiber_none` | `fiber none = ∅` | No derangement on `Option α` maps to `none` under `removeNone`. |
| `RemoveNone.fiber_some` | `fiber (some a) = { f | fixedPoints f ⊆ {a} }` | Fiber over `some a` corresponds to permutations fixing at most `a`. |
| `derangementsOptionEquivSigmaAtMostOneFixedPoint` | `derangements (Option α) ≃ Σ a : α, { f : Perm α | fixedPoints f ⊆ {a} }` | Key equivalence for recursive counting: derangements on `Option α` ↔ sigma of permutations with at most one fixed point. |
| `derangementsRecursionEquiv` | `derangements (Option α) ≃ Σ a : α, derangements ({a}ᶜ) ⊕ derangements α` | Recursive decomposition used for counting derangements inductively. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `derangements_`: Module-level definitions and equivalences involving derangements.
  - `RemoveNone.`: Related to the `decomposeOption`/`removeNone` map and its fibers.
  - `atMostOneFixedPoint_`: Pertains to permutations with at most one fixed point.

- **Suffixes:**
  - `_Equiv`: Indicates an equivalence (bijective function with inverse).
  - `_Equiv_sum`: Equivalence involving a sum (`⊕`) or sigma type.
  - `_subtypeEquiv`: Equivalence involving subtypes (e.g., `Subtype p`, `{a}ᶜ`).

- **Predicates:**
  - `fixedPoints f`: Set of points fixed by `f`.
  - `mem_derangements_iff_...`: Characterization lemmas for membership in `derangements`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with simplification (especially for `mem_fixedPoints`, `derangements`, etc.). |
| `rw` | Rewriting using lemmas like `Set.ext_iff`, `mem_fixedPoints_iff`, etc. |
| `cases'` | Case analysis on `Option` or existential hypotheses. |
| `apply_fun` | Applies a function to both sides of an equality (e.g., `apply_fun some`). |
| `intro`, `rintro`, `rcases` | Standard intro/case analysis for quantifiers and existentials. |
| `refine` | Constructing proofs/equivalences with holes filled later. |
| `convert` / `congr` (implicit in `Equiv.sumCongr`, `sigmaCongrRight`) | Congruence reasoning for equivalences. |
| `aesop` (not present here, but likely in related files) | Not used in this file — proofs are mostly manual and structural. |
| `dsimp`, `simp only` | Simplifying definitions (e.g., `IsFixedPt`, `permCongr_apply`). |

---

#### **4. Proof Logic**

- **Structural Equivalence Proofs:** Most proofs construct equivalences via chains (`calc`) of known equivalences (`subtypeEquiv`, `sumCongr`, `sigmaCongrRight`, etc.).
- **Case Analysis on `Option`:** Central to analyzing `derangements (Option α)` — splits into `none` and `some a`.
- **Fixed Point Analysis:** Proofs often reduce to reasoning about `fixedPoints f ⊆ {a}` or `fixedPoints f = ∅`.
- **Inductive Decomposition:** The core idea is to decompose derangements on `Option α` by:
  - Whether the derangement sends `none` to `none` (impossible — `fiber_none = ∅`), or
  - Whether it sends `none` to `some a`, and then classifies the induced permutation on `α`.
- **Subtype ↔ Complement:** Use of `({a}ᶜ : Set α)` to model permutations fixing `a` or not.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Dynamics.FixedPoints.Basic` | Definitions of `fixedPoints`, `IsFixedPt`, etc. |
| `Mathlib.GroupTheory.Perm.Option` | `decomposeOption`, `removeNone`, and related permutation machinery on `Option`. |
| `Mathlib.Logic.Equiv.Defs` | Basic equivalence (`≃`) and related operations. |
| `Mathlib.Logic.Equiv.Option` | Equivalences involving `Option`, e.g., `optionCongr`, `swap`. |
| `Mathlib.Tactic.ApplyFun` | For applying functions to equalities. |

**Domain Scope:**  
This file formalizes combinatorial properties of derangements (permutations with no fixed points) in dependent type theory, with a focus on recursive structure over `Option α`. It serves as a foundation for counting derangements (e.g., via `derangementsRecursionEquiv`) and understanding their behavior under type extensions.

--- 

Let me know if you'd like a diagram of the equivalences or a summary of how `derangementsRecursionEquiv` enables counting.