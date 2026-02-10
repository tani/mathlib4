### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `argPartialEquiv` | `PartialEquiv Circle ℝ` — defines a partial equivalence between the unit circle and `ℝ`, with source `univ` and target `(-π, π]`. |
| `argEquiv` | `Circle ≃ Ioc (-π) π` — an equivalence between the unit circle and the interval `(-π, π]`, induced by `arg`. |
| `toCircle` (in `Real.Angle`) | `Angle → Circle` — maps a real angle to a point on the unit circle via `exp`. |
| `toCircle` (in `AddCircle`) | `AddCircle T → Circle` — canonical map from the additive circle group `ℝ / (Tℤ)` to the unit circle, defined as `x ↦ exp(2πi x / T)`. |
| `homeomorphCircle'` | `AddCircle (2 * π) ≃ₜ Circle` — a homeomorphism between the additive circle of period `2π` and the unit circle. |
| `homeomorphCircle` | `AddCircle T ≃ₜ Circle` (for `T ≠ 0`) — generalization of `homeomorphCircle'` for arbitrary nonzero period `T`. |
| `injective_arg` | `Injective arg` — `arg` is injective on the unit circle. |
| `exp_arg`, `arg_exp` | `exp (arg z) = z`, `arg (exp x) = x` (under bounds on `x`) — mutual inverses on appropriate domains. |
| `exp_eq_one`, `exp_eq_exp`, `exp_inj` | Characterizations of when exponentials are equal or equal to 1, modulo `2πiℤ`. |
| `periodic_exp` | `Periodic exp (2 * π)` — complex exponential is `2π`-periodic. |
| `isLocalHomeomorph_circleExp` | `IsLocalHomeomorph Circle.exp` — the exponential map is a local homeomorphism. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `arg_`: properties of `Complex.arg` restricted to the circle.
  - `exp_`: properties of `exp` (especially on `ℝ` or `ℂ`).
  - `toCircle_`: properties of the canonical maps from angles/additive circles to the unit circle.
  - `homeomorphCircle_`: properties of homeomorphisms between additive circles and the unit circle.

- **Suffixes**:
  - `_equiv`, `_partialEquiv`: indicate equivalence / partial equivalence constructions.
  - `_homeomorph`: indicates a topological equivalence (homeomorphism).
  - `_apply_mk`: for functions defined via quotient lifting, describes behavior on representatives.

- **Aliases**:
  - Many deprecated aliases (e.g., `expMapCircle`, `arg_expMapCircle`) point to newer names (`toCircle`, `arg_toCircle`), indicating a refactoring toward clearer naming in `Real.Angle` and `AddCircle`.

#### 3. **Tactic Stack**

Frequently used tactics:
- `induction ... using ..._induction_on`: for reasoning about angles and additive circle elements via quotient induction.
- `rw`, `simp_rw`: for rewriting using definitions and simplifying with rewrite rules.
- `simp`: especially for simplifying `arg`, `exp`, and `toCircle` on canonical forms.
- `field_simp`, `linarith`, `ring_nf`: for algebraic simplifications and solving linear/field goals.
- `exact`, `refine`, `use`: for constructing witnesses in existential goals (e.g., for periodicity or `exp_eq_one`).
- `ext`, `Subtype.ext`: for extensionality arguments on complex numbers and subtype elements (e.g., circle points).
- `continuous_*`, `isLocalHomeomorph_*`: for topological properties.

#### 4. **Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  - Induction on angles or additive circle elements using `induction_on`.
  - Reducing to the concrete representative case (e.g., `x : ℝ`) where definitions simplify.
  - Applying algebraic or analytic lemmas (e.g., `exp_eq_exp_iff_exists_int`, `arg_cos_add_sin_mul_I`).
- **Equivalence arguments**: Many results are proven by showing mutual inverses (e.g., `left_inv'`, `right_inv'` in `PartialEquiv`/`Equiv` definitions).
- **Topological reasoning**: Uses `continuous_iff_continuousAt`, `isLocalHomeomorph`, and `Homeomorph` constructions to lift local properties (e.g., via `homeomorphCircle'`).
- **Periodicity handling**: Leverages `Periodic` and `exp_eq_exp` to reduce modulo `2π`.

#### 5. **Imports**

- `Mathlib.Analysis.Complex.Circle`: foundational results about the unit circle in `ℂ`, including `Circle.exp`, `Circle.arg`.
- `Mathlib.Analysis.SpecialFunctions.Complex.Log`: used for properties of `Complex.arg`, especially its range and continuity.

These imports indicate the module sits at the intersection of complex analysis and topology, focusing on the interplay between the exponential map, argument function, and quotient structures (`Angle`, `AddCircle`).