### Technical Metadata Brief: Rays in the Complex Numbers (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `sameRay_iff` | `SameRay ℝ x y ↔ x = 0 ∨ y = 0 ∨ x.arg = y.arg` | Characterizes same-ray relation in `ℂ` via vanishing or equal arguments. |
| `sameRay_iff_arg_div_eq_zero` | `SameRay ℝ x y ↔ arg (x / y) = 0` | Alternative characterization using argument of quotient (nonzero case). |
| `abs_add_eq_iff` | `‖x + y‖ = ‖x‖ + ‖y‖ ↔ x = 0 ∨ y = 0 ∨ x.arg = y.arg` | Equality case of triangle inequality ⇔ same ray (via `sameRay_iff_norm_add`). |
| `abs_sub_eq_iff` | `‖x - y‖ = |‖x‖ - ‖y‖| ↔ x = 0 ∨ y = 0 ∨ x.arg = y.arg` | Equality case of reverse triangle inequality ⇔ same ray (via `sameRay_iff_norm_sub`). |
| `sameRay_of_arg_eq` | `x.arg = y.arg → SameRay ℝ x y` | Direct implication from equal arguments (nonzero case). |
| `abs_add_eq` | `x.arg = y.arg → ‖x + y‖ = ‖x‖ + ‖y‖` | Triangle inequality becomes equality under same argument. |
| `abs_sub_eq` | `x.arg = y.arg → ‖x - y‖ = |‖x‖ - ‖y‖|` | Reverse triangle inequality becomes equality under same argument. |

> **Note**: `abs` is `‖·‖` (norm on `ℂ` as a real inner product space), and `arg` is the principal argument function (`Complex.arg`), taking values in `(-π, π]`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sameRay_`: Relates to `SameRay ℝ` relation.
  - `abs_`: Relates to norm/absolute value equalities (`abs_add_eq`, `abs_sub_eq`).
- **Suffixes**:
  - `_iff`: Biconditional characterizations.
  - `_eq`: Equality statements (often corollaries of `_iff`).
- **Pattern**: `abs_*` theorems derive from `sameRay_*` via `sameRay_iff_norm_add`/`norm_sub`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rcases`: To split on `eq_or_ne` cases (`x = 0` / `x ≠ 0`, etc.).
- `simp` / `simp only`: Simplification with lemmas like `arg_eq_arg_iff`, `sameRay_iff_norm_smul_eq`.
- `field_simp`: For simplifying expressions involving division (e.g., `x / y`).
- `rw`: Rewriting using equivalences (`sameRay_iff_norm_add.symm`, `eq_comm`, `mul_comm`).
- `by_cases`: To handle zero/nonzero cases explicitly.
- `sub_eq_zero`, `mul_comm`: Basic algebraic rewrites.

> No heavy automation (e.g., `linarith`, `nlinarith`) — relies on structured simplification and known lemmas.

---

#### **4. Proof Logic**

- **Structure**: Case analysis on whether `x = 0` or `y = 0`, reducing to nonzero case.
- **Core idea**:
  - In nonzero case, `SameRay ℝ x y` ⇔ `x = r • y` for `r > 0` ⇔ `x / y ∈ ℝ>0` ⇔ `arg(x / y) = 0` ⇔ `arg x = arg y`.
- **Equality cases**:
  - Use `sameRay_iff_norm_add` / `norm_sub` (from `InnerProductSpace.Basic`) to link same-ray to norm equalities.
  - Then apply `sameRay_iff` to translate back to argument condition.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.InnerProductSpace.Basic` | Provides `SameRay`, `norm_add`, `norm_sub`, and related lemmas (e.g., `sameRay_iff_norm_add`). |
| `Mathlib.Analysis.SpecialFunctions.Complex.Arg` | Defines `Complex.arg`, `arg_div_coe_angle`, `arg_eq_arg_iff`, and continuity/angle properties. |

> **Domain**: Complex analysis, specifically metric geometry of `ℂ` as a real inner product space, with emphasis on angular geometry.

--- 

Let me know if you'd like a formalized summary for an AI agent’s knowledge base or a visualization of the proof dependencies.