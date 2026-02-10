### Technical Brief: `bound` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `bound` | A tactic for proving inequalities via structural recursion, using `aesop` with custom rule sets. |
| `boundConfig` | `Aesop.Options` configuration: disables simplification (`enableSimp := false`) to preserve structure during proof search. |
| `boundNormNum` | Closing tactic: uses `norm_num` to close numerical goals. Registered as `tactic (rule_sets := [Bound])`. |
| `boundLinarith` | Closing tactic: uses `linarith` to close linear arithmetic goals. Registered similarly. |
| `mul_lt_mul_left_of_pos_of_lt`, `mul_lt_mul_right_of_pos_of_lt` | `.mpr` lemmas for strict monotonicity of multiplication; used as `@[bound]` apply rules. |
| `Nat.cast_pos_of_pos`, `Nat.one_le_cast_of_le` | Cast lemmas for naturals in ordered semirings/characteristic-zero types; tagged `@[bound]`. |
| `le_max_of_le_left_or_le_right`, `lt_max_of_lt_left_or_lt_right`, `min_le_of_left_le_or_right_le`, `min_lt_of_left_lt_or_right_lt` | *Guessing rules* for `min`/`max`: encode disjunctive branching when recursing on `min`/`max` expressions. Tagged `@[bound]` with high score penalty. |
| `le_refl` | Reflexivity rule for `≤`. Tagged `@[bound]`. |
| `sq_nonneg`, `abs_nonneg`, `pow_pos`, `mul_pos`, etc. | Basic nonnegativity/positivity lemmas. Tagged `@[bound]`. |
| `le_abs_self`, `neg_abs_le`, `mul_le_mul_of_nonneg_left`, etc. | Inequality lemmas for `≤`. Tagged `@[bound]`. |
| `le_of_lt` | Forward rule: converts strict inequalities to non-strict ones. Tagged `@[bound_forward]`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `le_`, `lt_`, `ge_`, `gt_`: standard inequality lemmas (`≤`, `<`, `≥`, `>`).
  - `nonneg`, `pos`, `neg`: sign-related lemmas (e.g., `sq_nonneg`, `mul_pos`).
  - `cast`: for coercion lemmas (e.g., `Nat.cast_pos_of_pos`).
  - `of_`: indicates dependency on a hypothesis (e.g., `le_max_of_le_left_or_le_right`).
  - `_left`, `_right`: indicates which argument is used in monotonicity (e.g., `mul_le_mul_of_nonneg_left`).
  - `_of_lt`, `_of_pos`: indicates strict premise used to derive non-strict conclusion.

- **Attribute Tags**:
  - `@[bound]`: apply rules for structural inequality proofs.
  - `@[bound_forward]`: forward rules to expose hidden inequalities (e.g., `le_of_lt`).
  - `@[aesop ... tactic (rule_sets := [Bound])]`: tactic rules for `aesop`.

---

#### **3. Tactic Stack**

- **Core Tactics Used**:
  - `aesop` — main engine, with custom rule set `[Bound]`.
  - `norm_num` — via `boundNormNum`.
  - `linarith` — via `boundLinarith`.
  - `have := h` — for hypothesis injection via macro expansion.
  - `calc` — used *externally* to structure proofs where `bound` is applied per step.

- **Macro Expansion**:
  - `bound [h₀, h₁]` → `have := h₀; have := h₁; bound`.

- **No simplification** (`enableSimp := false`) to preserve expression structure.

---

#### **4. Proof Logic**

- **Strategy**:
  1. Parse goal as inequality (`≤`, `<`, `≥`, `>`).
  2. Recursively decompose goal using registered `@[bound]` lemmas.
  3. Use `@[bound_forward]` lemmas to convert hypotheses (e.g., `a < b` → `a ≤ b`).
  4. For ambiguous cases (`min`, `max`, powers), use disjunctive guessing rules (`∨`-hypotheses) and let `aesop` branch.
  5. When subgoals become arithmetic, close with `norm_num` or `linarith`.

- **Typical Flow**:
  - Goal: `t₁ ≤ t₂`
  - Apply `mul_le_mul_of_nonneg_left` if `t₁`, `t₂` are products and a factor is known nonnegative.
  - If `t₁ = min a b`, use `min_le_of_left_le_or_right_le` to branch into `a ≤ t₂ ∨ b ≤ t₂`.
  - If `t₂ = a^n`, use monotonicity rules branching on `1 ≤ a` or `a ≤ 1`.
  - When numeric constants appear (e.g., `2`, `3`), use `zero_le_two`, `zero_lt_one`, etc., or `norm_num`.

- **Key Insight**: `bound` is *not* a general inequality prover — it succeeds only when the inequality structure matches a known lemma chain. Hence, `calc` + `rw`/`simp` + `bound` is common.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Aesop` | Core engine for `bound`. |
| `Mathlib.Tactic.Bound.Attribute` | Defines `@[bound]`, `@[bound_forward]`, scoring, and rule registration. |
| `Mathlib.Tactic.Lemma` | For `lemma` elaboration. |
| `Mathlib.Tactic.Linarith.Frontend` | For `boundLinarith`. |
| `Mathlib.Tactic.NormNum.Core` | For `boundNormNum`. |

---

### Summary

The `bound` tactic is a *structure-driven inequality prover* built atop `aesop`, specialized for inequalities where the proof follows the syntactic structure of terms (e.g., arithmetic expressions, `abs`, `min`, `max`, powers). It complements `positivity` and `gcongr`, but trades generality for automation in structured cases. Its power comes from:
- A rich set of `@[bound]` lemmas,
- Smart guessing via disjunctive rules,
- Integration with `norm_num`/`linarith` for closing arithmetic goals.

It is especially effective in `calc` blocks where intermediate steps are simplified before applying `bound`.