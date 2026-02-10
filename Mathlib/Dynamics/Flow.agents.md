### Technical Brief: Flows and Invariant Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsInvariant ϕ s` | `Prop` | `s ⊆ α` is invariant under flow `ϕ : τ → α → α` iff `∀ t, ϕ t '' s ⊆ s`. |
| `IsFwInvariant ϕ s` | `Prop` | Forward invariance: `∀ t ≥ 0, ϕ t '' s ⊆ s`. Requires `[Preorder τ] [Zero τ]`. |
| `Flow τ α` | `Structure` | A flow is a continuous action of an additive topological monoid `τ` on a space `α`. Fields: `toFun`, `cont'`, `map_add'`, `map_zero'`. |
| `Flow.fromIter g h` | `Flow ℕ α` | Constructs a semiflow from iterates of a continuous self-map `g : α → α`. |
| `Flow.restrict h` | `Flow τ (↥s)` | Restricts a flow to an invariant subset `s`, using `h : IsInvariant ϕ s`. |
| `Flow.reverse ϕ` | `Flow τ α` | Time-reversal of a flow over a topological group `τ`, defined by `t ↦ ϕ (-t)`. |
| `Flow.toHomeomorph t` | `α ≃ₜ α` | For each `t`, `ϕ t` is a homeomorphism with inverse `ϕ (-t)`. |
| `isInvariant_iff_image` | `↔` | Equivalence: `IsInvariant ϕ s ↔ ∀ t, ϕ t '' s ⊆ s`. |
| `isFwInvariant_iff_isInvariant` | `↔` | In canonically ordered additive commutative monoids (e.g., `ℕ`, `ℝ≥0`), forward invariance ⇔ invariance. |
| `isInvariant_iff_image_eq` | `↔` | For group-indexed flows, invariance ⇔ `ϕ t '' s = s` for all `t`. |
| `image_eq_preimage` | `ϕ t '' s = ϕ (-t) ⁻¹' s` | Image under `ϕ t` equals preimage under `ϕ (-t)`, via homeomorphism property. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isInvariant`, `isFwInvariant`: predicate-style naming for properties.
  - `fromIter`, `restrict`, `reverse`: action-oriented verbs for constructions.
  - `toHomeomorph`, `toFun`: `to_` prefix for coercion or projection-like functions.

- **Suffixes**:
  - `'` (prime): used for field names in structures (`cont'`, `map_add'`, `map_zero'`).
  - `_apply`: for application versions of lemmas (`map_zero_apply`, `map_add_apply`).
  - `_iff_`: for equivalence theorems (`isInvariant_iff_image`, `isFwInvariant_iff_isInvariant`).

- **Notable patterns**:
  - `continuous_*`: e.g., `continuous_toFun`, `continuous_prod_of_discrete_left.mpr`.
  - `iterate_*`: e.g., `iterate_add_apply`, used for `ℕ`-flows.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: for rewriting with definitional equivalences (e.g., `isInvariant_iff_image`).
- `rw`: standard rewriting, especially with group/monoid laws (`neg_add_cancel`, `add_neg_cancel`).
- `congr`: for extensionality proofs (`ext` theorem).
- `funext`: to prove function extensionality.
- `Subtype.ext`: to prove equality in subtype (e.g., restricted flow).
- `dsimp`: simplification in definitions involving negation or group operations.
- `apply`, `exact`, `intro`, `cases`: basic proof scripting.
- `continuous_*` lemmas (e.g., `continuous_fst`, `continuous_snd`, `continuous_curry`) for continuity arguments.
- `Subset.antisymm`: to prove set equality by double inclusion.

---

#### **4. Proof Logic**

- **Structure proofs** (e.g., `Flow.restrict`, `Flow.reverse`) follow a pattern:
  1. Define underlying function.
  2. Prove continuity using composition/currying lemmas.
  3. Verify algebraic laws (`map_add'`, `map_zero'`) using group/monoid axioms.
  4. For subtype constructions, lift properties via `Subtype.ext`.

- **Equivalence proofs** (`↔`):
  - Use `⟨forward, backward⟩` or `Iff.intro`.
  - Forward direction often uses assumptions directly.
  - Backward direction may require constructing preimages or using invertibility (e.g., `ϕ (-t)`).

- **Inductive/iterative reasoning**:
  - `fromIter` uses `iterate_add_apply`, which is likely proven by induction on `ℕ`.

- **Group-theoretic reasoning**:
  - Heavy use of additive group identities: `neg_add`, `add_neg_cancel`, `neg_zero`, `zero_le`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Topology.Algebra.Group.Basic`: provides topological group/monoid infrastructure.
  - `Mathlib.Logic.Function.Iterate`: for `iterate` and related lemmas (e.g., `iterate_add_apply`).

- **Scope**:
  - Topological spaces, continuous maps, monoid/group actions.
  - Ordered monoids (for forward invariance).
  - Subtypes (for invariant subset restriction).
  - Homeomorphisms (`≃ₜ`) and equivalences (`≃`).

- **Anticipated use cases**:
  - Flows indexed by `ℕ`, `ℤ`, `ℝ≥0`, `ℝ`.
  - Dynamical systems on topological spaces.
  - Invariant sets (e.g., attractors, repellers, conserved quantities).

--- 

This module formalizes foundational concepts in topological dynamics, with a focus on continuity, algebraic structure, and invariance — all in a reusable, extensible style consistent with Mathlib conventions.