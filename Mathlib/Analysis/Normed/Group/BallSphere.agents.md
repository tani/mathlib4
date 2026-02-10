### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `InvolutiveNeg (sphere (0 : E) r)` | Instance defining a formal negation (antipodal map) on the sphere of radius `r` centered at `0` in a seminormed additive commutative group `E`. It satisfies `neg (neg x) = x`. |
| `InvolutiveNeg (ball (0 : E) r)` | Same as above, but for the open ball. |
| `InvolutiveNeg (closedBall (0 : E) r)` | Same as above, but for the closed ball. |
| `coe_neg_sphere`, `coe_neg_ball`, `coe_neg_closedBall` | Simplification lemmas stating that coercion of the negated subtype element equals the negation in the ambient space `E`. |
| `continuousNeg` instances | Instances proving that negation is continuous on the sphere, open ball, and closed ball, using `IsInducing.subtypeVal.continuousNeg`. |

#### 2. **Naming Conventions**

- **Prefixes / Suffixes**:
  - `coe_neg_`: Coercion lemmas for negation on subtypes (`sphere`, `ball`, `closedBall`).
  - `InvolutiveNeg`: Standard Lean typeclass for structures with an involutive negation.
  - `ContinuousNeg`: Typeclass for spaces with continuous negation.
  - `Subtype.map Neg.neg`: Standard way to lift the negation map on `E` to subtypes defined by predicates preserved under negation (here, `‖x‖ = r` or `‖x‖ < r` or `‖x‖ ≤ r`).

#### 3. **Tactic Stack**

- `simp`: Used in `Subtype.map` proofs to show that the predicate is preserved under negation (e.g., `by simp` for `‖-x‖ = ‖x‖ = r`).
- `Subtype.ext`: Used to prove equality in subtypes by extending to equality in the ambient type.
- `rfl`: Used in `coe_neg_*` lemmas and as the proof argument to `continuousNeg` (since continuity follows from the inducing map structure).
- Implicit use of `norm_neg` (from `SeminormedAddCommGroup`) in simplifications.

#### 4. **Proof Logic**

- **Structure**: Each instance is defined uniformly:
  1. Define `neg` as `Subtype.map Neg.neg h`, where `h` is a proof that negation preserves the defining predicate of the subtype (sphere/ball/closed ball).
  2. Prove involution: `neg_neg x := Subtype.ext (neg_neg x.1)`.
  3. For continuity: Use `IsInducing.subtypeVal.continuousNeg`, which lifts continuity of negation on the ambient space to the subspace topology (since inclusion of subspaces is inducing).
- **Common pattern**: All three cases follow the same structure, differing only in the underlying set (`sphere`, `ball`, `closedBall`).

#### 5. **Imports**

- `Mathlib.Analysis.Normed.Group.Uniform`: Provides foundational results about seminormed groups, uniform structures, and continuity.
- `Metric`, `Set`, `Topology`: Standard libraries used for metric space constructions, set operations, and topology (e.g., `IsInducing`, continuity, subtypes).

---

This file formalizes that negation (antipodal map) is well-defined and continuous on spheres and balls in seminormed additive commutative groups, and that it is involutive. The proofs rely on basic properties of seminorms (`norm_neg`) and subspace topology constructions.