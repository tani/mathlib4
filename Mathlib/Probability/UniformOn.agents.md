### Technical Metadata Brief: Classical Probability via `uniformOn`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `uniformOn` | `Set Ω → Measure Ω` | Defines the uniform (counting) measure on a set `s`, i.e., `Measure.count[|s]`. Models uniform probability over finite nonempty `s`. |
| `uniformOn_isProbabilityMeasure` | `s.Finite → s.Nonempty → IsProbabilityMeasure (uniformOn s)` | Shows `uniformOn s` is a probability measure when `s` is finite and nonempty. |
| `uniformOn_singleton` | `{ω} → Set Ω → ENNReal` | Evaluates `uniformOn {ω}` on a set `t`: returns `1` if `ω ∈ t`, else `0`. |
| `uniformOn_self` | `s.Finite → s.Nonempty → uniformOn s s = 1` | Normalization: total probability over `s` is 1. |
| `uniformOn_eq_zero_iff` | `s.Finite → (uniformOn s t = 0 ↔ s ∩ t = ∅)` | Characterizes when a set has zero probability under `uniformOn s`. |
| `pred_true_of_uniformOn_eq_one` | `uniformOn s t = 1 → s ⊆ t` | If `t` has full probability under `uniformOn s`, then `t` contains all of `s`. |
| `uniformOn_inter` | `s.Finite → uniformOn s (t ∩ u) = uniformOn (s ∩ t) u * uniformOn s t` | Chain rule / multiplication rule for conditional uniform probability. |
| `uniformOn_union` | `s.Finite → Disjoint t u → uniformOn s (t ∪ u) = uniformOn s t + uniformOn s u` | Additivity over disjoint unions. |
| `uniformOn_add_compl_eq` | `s.Finite → uniformOn (s ∩ u) t * uniformOn s u + uniformOn (s ∩ uᶜ) t * uniformOn s uᶜ = uniformOn s t` | Law of total probability for `uniformOn`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `uniformOn_`: Core definitions and lemmas about `uniformOn`.
  - `condCount_` (deprecated): Legacy alias prefix (since 2024-10-09), replaced by `uniformOn_`.
- **Suffixes**:
  - `_meas`: For lemmas about the measure itself being zero or a probability measure.
  - `_eq_zero`, `_eq_one`: For characterizations of when a measure evaluates to 0 or 1.
  - `_self`: For properties involving `s` intersected or applied to itself.
  - `_inter`, `_union`, `_compl`: For set-theoretic operations (intersection, union, complement).
  - `_of`, `_iff`: For implications or equivalences with set-theoretic conditions (`⊆`, `= ∅`, etc.).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification using definitional equalities and lemmas (e.g., `uniformOn`, `cond_apply`, `Measure.count_apply`).
- `rw`: Rewriting with lemmas like `Set.inter_self`, `Set.inter_assoc`, `ENNReal.mul_inv_cancel`.
- `by_cases`: Splitting on whether a set is empty (`s ∩ t = ∅`) or not.
- `rcases ... with (rfl | h)`: Case analysis on `eq_empty_or_nonempty`.
- `exacts [...]`: Supplying multiple goals in sequence.
- `conv_lhs => ...`: Rewriting in left-hand side of equation (used in `uniformOn_disjoint_union`).
- `infer_instance`: Automatically infers class instances like `IsZeroOrProbabilityMeasure`.
- `aesop` not used — proofs are mostly manual and measure-theoretic.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern:  
    1. Unfold `uniformOn` as `Measure.count[|s]`.  
    2. Apply `cond_apply` (or `cond_inter_self`, etc.) to reduce to counting measure expressions.  
    3. Use properties of `Measure.count` (e.g., `count_apply_finite`, `count_singleton`, `count_empty`).  
    4. Simplify using `ENNReal` arithmetic (e.g., `inv_mul_cancel`, `mul_inv_cancel`, `one_mul`).  
    5. Convert set-theoretic identities (e.g., `Set.inter_assoc`, `Set.union_compl_self`) to finish.

- **Induction**: Not used — all proofs are direct, leveraging measure-theoretic properties and finite set arithmetic.

- **Case splits**: Common on emptiness/nonemptiness of sets (via `eq_empty_or_nonempty`) and disjointness.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Probability.ConditionalProbability`: Provides `cond`, `IsProbabilityMeasure`, and related infrastructure.
  - `Mathlib.MeasureTheory.Measure.Count`: Defines `Measure.count`, essential for counting measure and its conditional version.

- **Domain**:
  - Classical (finite) probability theory formalized via measure theory.
  - Targets combinatorial probability: uniform distribution over finite sets.
  - Assumes `MeasurableSingletonClass Ω` for singleton measurability (used in many lemmas).
  - Works in `noncomputable section`, indicating no computational content expected.

- **Notable conventions**:
  - Uses `Set Ω` to represent events (abusing definitional equality with predicates, though discouraged).
  - Leverages `Fintype Ω` for global sample space finiteness (e.g., in `uniformOn_univ`).

--- 

Let me know if you'd like a dependency graph or a list of lemmas sorted by use in combinatorial applications (e.g., hypergeometric, birthday paradox).