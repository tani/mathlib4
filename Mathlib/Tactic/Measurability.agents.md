**Technical Metadata Brief: `Mathlib.Tactic.Measurability`**

---

### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `measurability` (attribute) | `attr` | Tags lemmas for use by the `measurability` tactic; expands to `aesop safe apply (rule_sets := [Measurable])`. |
| `measurability` (tactic) | `tactic` | Solves goals of the form `Measurable f`, `AEMeasurable f`, `StronglyMeasurable f`, `AEStronglyMeasurable f μ`, or `MeasurableSet s` via `aesop` using the `Measurable` rule set. |
| `measurability?` (tactic) | `tactic` | Same as `measurability`, but returns a suggested proof script on success (via `aesop?`). |
| `npowRec` | internal definition (in `Mathlib.Algebra.Group.Defs`) | Used internally for power recursion; currently tagged with `aesop` for `Measurable` rule set (marked as a FIXME). |
| `Function.comp` | `β → γ → α → β → γ` | Function composition; tagged with `aesop` for `Measurable` rule set (for unfolding). |

> **Note**: No named theorems are defined in this file; it only provides *tactic infrastructure* and *user attributes*.

---

### **2. Naming Conventions**

- **Attribute macro**: `measurability` — consistent with tactic name.
- **Tactic macros**: `measurability`, `measurability?`, with planned variants `measurability!`, `measurability!?`.
- **Rule set identifier**: `Measurable` (capitalized, used as a Lean identifier).
- **AESOP integration**: Uses `rule_sets := [Measurable]` — suggests a domain-specific rule set for measurability reasoning.
- **Internal tagging**: `npowRec` and `Function.comp` are annotated with `aesop (rule_sets := [Measurable])`.

---

### **3. Tactic Stack**

- **Primary tactic**: `aesop` (with `terminal := true`)
- **Variant**: `aesop?` (for proof suggestion)
- **Supporting macros**:
  - `attr` macro for defining `measurability` attribute.
  - `Lean.mkIdent` to construct identifiers (`Measurable`).
- **No explicit use of `simp`, `rw`, `induction`, etc.** — the tactic delegates entirely to `aesop`.

---

### **4. Proof Logic**

- **Goal types targeted**:
  - `Measurable f`
  - `AEMeasurable f`
  - `StronglyMeasurable f`
  - `AEStronglyMeasurable f μ`
  - `MeasurableSet s`
- **Strategy**:
  - Uses `aesop` in *terminal mode* (i.e., stops after first successful branch).
  - Applies lemmas tagged with `measurability` (i.e., those marked with the `measurability` attribute).
  - Relies on pre-defined `Measurable` rule set (a collection of intro/elim rules for measurability).
- **No user-written proof scripts** — fully automated via `aesop`.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.Measurability.Init` | Initialization of measurability-related infrastructure (e.g., definitions of `Measurable`, `AEMeasurable`, etc.). |
| `Mathlib.Algebra.Group.Defs` | Provides `npowRec`, which is tagged for `aesop` (though noted as a temporary workaround). |

> **Note**: This file does *not* import core measure theory (e.g., `MeasureTheory.Measure.Basic`), indicating it is a *tactic-level* module, not a content module.

---

### **Observations & FIXMEs**

- `npowRec` is an internal implementation detail; its inclusion in the `Measurable` rule set is flagged as a hack.
- The `measurability!` and `measurability!?` variants are *declared but not implemented* (only syntax stubs present).
- The design follows Lean’s `aesop`-based extensible tactic pattern, enabling user customization via attributes.

--- 

Let me know if you'd like a formalized summary for use in a domain-specific AI agent (e.g., for proof planning or tactic recommendation).