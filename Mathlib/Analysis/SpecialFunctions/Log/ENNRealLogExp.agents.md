### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `EReal.log_exp` | `∀ x : EReal, log (exp x) = x` | Proves `log ∘ exp = id` on `EReal`. |
| `ENNReal.exp_log` | `∀ x : ℝ≥0∞, exp (log x) = x` | Proves `exp ∘ log = id` on `ℝ≥0∞`. |
| `EReal.exp_nmul` | `∀ x : EReal, n : ℕ, exp (n * x) = (exp x) ^ n` | Shows compatibility of `exp` with natural scalar multiplication. |
| `EReal.exp_mul` | `∀ x : EReal, y : ℝ, exp (x * y) = (exp x) ^ y` | Generalizes power identity to real exponents. |
| `ENNReal.logOrderIso` | `ℝ≥0∞ ≃o EReal` | Order isomorphism via `log` and `exp`. |
| `EReal.expOrderIso` | `EReal ≃o ℝ≥0∞` | Inverse order isomorphism (defined as `logOrderIso.symm`). |
| `ENNReal.logHomeomorph` | `ℝ≥0∞ ≃ₜ EReal` | Topological homeomorphism induced by `log`. |
| `EReal.expHomeomorph` | `EReal ≃ₜ ℝ≥0∞` | Inverse homeomorphism (induced by `exp`). |
| `continuous_log`, `continuous_exp` | `Continuous log`, `Continuous exp` | Continuity of `log` and `exp`. |
| `measurable_log`, `measurable_exp` | `Measurable log`, `Measurable exp` | Measurability of `log` and `exp`. |
| `PolishSpace EReal` | `PolishSpace EReal` | `EReal` is a Polish space (separable completely metrizable). |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `log_`, `exp_`: For functions and properties involving logarithm/exponential.
  - `is_`, `measurable_`, `continuous_`: For typeclass instances or properties (e.g., `measurable_log`, `continuous_exp`).
  - `_root_`: Used to define lemmas/defs in a different namespace (e.g., `EReal.expOrderIso` defined in `ENNReal` section).
- **Suffixes**:
  - `_apply`: For projection lemmas (e.g., `logOrderIso_apply`).
  - `_symm`: For symmetry lemmas (e.g., `logOrderIso_symm`).
  - `_homeomorph`, `_orderIso`: For structural equivalences (homeomorphisms, order isomorphisms).
- **Structure**:
  - `logOrderIso`, `expOrderIso`, `logHomeomorph`, `expHomeomorph`: Named after the map and the structure preserved.

---

#### 3. **Tactic Stack**

- `simp` / `simp_rw`: Dominant tactic for simplification and rewriting using lemmas like `log_exp`, `exp_log`.
- `rw`: Used for targeted rewriting (e.g., `rw [← log_eq_iff, log_pow, log_exp]`).
- `induction`: Used in `EReal.log_exp` to handle `EReal`’s inductive definition (`-∞`, `real r`, `+∞`).
- `by_cases`: To split on equality to `0` or `∞` (e.g., in `ENNReal.exp_log`).
- `have`: Introduce intermediate facts (e.g., positivity of `x.toReal`).
- ` rfl`: For definitional equalities (e.g., `logOrderIso_apply`).
- `measurable`, `continuous`, `fun_prop`: Custom attributes for automatic introduction of measurable/continuous functions.

---

#### 4. **Proof Logic**

- **Inductive structure**: Proofs over `EReal` use induction on its three constructors (`-∞`, `real r`, `+∞`).
- **Case analysis**: For `ℝ≥0∞`, proofs often split on whether the element is `0`, `∞`, or strictly positive finite.
- **Equivalence-based reasoning**: Many proofs rely on showing that two functions are mutual inverses (`left_inv`, `right_inv`) and then use properties of equivalences (e.g., `Equiv.coe_fn_mk`, `map_rel_iff'`).
- **Leveraging existing lemmas**: Heavy use of `log_eq_iff`, `log_pow`, `log_rpow`, `Real.log_exp`, etc., often via `simp_rw`.
- **Topological/measurable structure transfer**: Homeomorphism/order isomorphism definitions are used to inherit continuity/measurability and Polishness.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Log.ERealExp` | Core definitions and basic properties of `log`/`exp` on `EReal`. |
| `Mathlib.Analysis.SpecialFunctions.Log.ENNRealLog` | Core definitions and basic properties of `log` on `ℝ≥0∞`. |
| `Mathlib.MeasureTheory.Constructions.BorelSpace.Basic` | Provides measurability tools and Borel space structure. |
| `Mathlib.Topology.MetricSpace.Polish` | Supplies the `PolishSpace` typeclass and related lemmas (e.g., `isClosedEmbedding.polishSpace`). |

---

### Summary

This file formalizes the foundational analytic and topological properties of `log` and `exp` between `ℝ≥0∞` and `EReal`, establishing:
- Mutual inverses (`log_exp`, `exp_log`),
- Algebraic identities (`exp_nmul`, `exp_mul`),
- Structural equivalences (order isomorphisms, homeomorphisms),
- Continuity and measurability,
- Polishness of `EReal`.

The proofs follow a clean, modular style, leveraging Lean’s equivalence and typeclass infrastructure to transfer structure and properties.