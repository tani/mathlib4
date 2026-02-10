**Technical Metadata Brief: `Mathlib.Tactic.Continuity`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `Function.comp` | `α → β → γ` (as a function) | Tagged with `[aesop (rule_sets := [Continuous]) unfold norm]` to enable automatic unfolding and use in continuity proofs via `aesop`. |
| `continuity` (attribute macro) | `attr` | Tags lemmas for use by the `continuity` tactic; expands to `aesop safe apply (rule_sets := [Continuous])`. |
| `continuity` (tactic macro) | `tactic` | Solves goals of the form `Continuous f` by applying lemmas in the `Continuous` rule set via `aesop`. |
| `continuity?` (tactic macro) | `tactic` | Same as `continuity`, but uses `aesop?` to show proof steps (non-terminal mode). |

> **Note**: No explicit theorems are defined in this file; it provides *infrastructure* (macros and attribute declarations) for a user-facing tactic.

---

### 2. **Naming Conventions**

- **Attribute naming**: `continuity` — used as a user-facing attribute to tag lemmas.
- **Tactic naming**: `continuity`, `continuity?` — follows Lean’s convention of `?` suffix for “show proof” variants.
- **Rule set naming**: `Continuous` — capitalized, used as an identifier in `rule_sets := [...]`.
- **AESOP integration**: Uses `unfold norm` and `safe apply` — standard `aesop` configuration patterns.

---

### 3. **Tactic Stack**

- **Primary tactic**: `aesop`
  - With `config := { terminal := true }` for deterministic, goal-closing behavior.
  - Uses `rule_sets := [Continuous]` to restrict search space.
- **Macro expansion relies on**:
  - `Lean.mkIdent` to construct identifiers (`Continuous`)
  - `attr` and `tactic` syntax constructors
- **No custom tactics** — fully built on top of `aesop`.

---

### 4. **Proof Logic / Strategy**

- **Goal form**: `Continuous f`
- **Strategy**:
  1. Use lemmas tagged with `@[continuity]` (i.e., added to the `Continuous` rule set).
  2. Apply them via `aesop`’s safe apply strategy.
  3. Rely on `Function.comp` being unfoldable and usable in the `Continuous` rule set.
- **No induction or case analysis** — purely *lemma application* and *typeclass inference* (via `aesop`).
- **Deterministic** (`terminal := true`) for `continuity`, non-deterministic (`aesop?`) for `continuity?`.

---

### 5. **Imports**

- `Mathlib.Tactic.Continuity.Init`  
  → Provides foundational continuity lemmas and infrastructure (e.g., lemmas like `continuous_id`, `continuous_const`, `continuous_comp`, etc., likely tagged `@[continuity]` elsewhere).

> **Scope**: This module is a *tactic layer* over existing continuity lemmas — it does not define new continuity theory, only the automation interface.

--- 

**Summary**: A minimal, `aesop`-based tactic infrastructure for automated `Continuous f` proofs, leveraging user attributes and rule sets. Designed for extensibility (e.g., future `continuity!` variants).