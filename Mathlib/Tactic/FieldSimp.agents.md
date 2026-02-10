### Technical Brief: `field_simp` Tactic (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `dischargerTraceMessage` | `Expr → Except ε (Option Expr) → SimpM MessageData`<br>Constructs trace messages for the discharger, used in `withTraceNode`. |
| `discharge` | `Expr → SimpM (Option Expr)`<br>Core discharger for `field_simp`. Implements a 4-step strategy: (1) assumptions, (2) `norm_num` for inequalities, (3) `Positivity.solve`, (4) recursive `simp`. |
| `field_simp_discharge` | Elaborated tactic token (`tactic`)<br>Wraps `discharge` as a configurable simp discharger via `wrapSimpDischarger`. |
| `field_simps` | `SimpTheorems` (global extension)<br>Simpset extension containing lemmas tailored for field simplification (e.g., `inv_eq_div`, `div_eq_mul_inv`, `div_div_eq_mul_div`, etc.). |
| `one_div`, `one_divp`, `mul_eq_zero` | Lemmas *removed* from simpset during `field_simp`:<br>- `one_div`: `1 / x = x⁻¹` — conflicts with right-associative division normalization.<br>- `mul_eq_zero`: `x * y = 0 ↔ x = 0 ∨ y = 0` — disjunctive form blocks `norm_num`.<br>Replaced by `mul_ne_zero` (constructive). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `field_`: Module- and tactic-specific (`field_simp`, `field_simps`, `field_simp_discharge`).
  - `discharge*`: Discharge-related helpers (`dischargerTraceMessage`, `discharge`).
- **Suffixes**:
  - `_discharge`: Discharger functions (`field_simp_discharge`).
  - `_p` variants: For *partial* division (`one_divp`, `divp_eq_mul`, etc.) — used for `IsUnit`-based division.
- **Case style**: `snake_case` for functions/tactics (`field_simp`, `discharge`, `dischargerTraceMessage`).

---

#### **3. Tactic Stack**

Frequently used tactics & utilities in `discharge` and `field_simp`:

| Tactic / Utility | Role |
|------------------|------|
| `simp` | Core simplifier, called recursively in discharge step 4. |
| `norm_num` | Used via `Mathlib.Meta.NormNum.derive` to prove numeric inequalities (`e ≠ b`). |
| `Positivity.solve` | Proves positivity/nonzero goals (e.g., `x + y ≠ 0` under positivity assumptions). |
| `Simp.dischargeUsingAssumption?` | Tries to discharge using local hypotheses. |
| `mkOfEqTrue` | Converts proof of `simplified_expr = True` to proof of `True`. |
| `withTraceNode` | Wraps discharger steps in traceable nodes (`traceClass = `Tactic.field_simp`). |
| `wrapSimpDischarger` | Integrates custom discharger into `simp`’s framework. |

---

#### **4. Proof Logic / Discharge Strategy**

The `discharge` function follows a **hierarchical fallback strategy**:

1. **Assumption-based discharge**  
   Try `Simp.dischargeUsingAssumption? prop` — if a hypothesis directly implies `prop`, discharge.

2. **Numerical inequality discharge**  
   For goals of the form `e ≠ b`, try `norm_num` to prove it constructively.

3. **Positivity discharge**  
   Use `Mathlib.Meta.Positivity.solve prop` for goals like `x ≠ 0`, `x + y ≠ 0`, etc., under positivity assumptions.

4. **Recursive `simp` discharge**  
   - Calls `simp` recursively on `prop` with full simpset (including simprocs).
   - If result is `True`, extract proof via `mkOfEqTrue`.
   - Otherwise, fail.

> **Note**: This recursive fallback is a Lean 4 adaptation — the comment notes uncertainty whether Lean 3’s discharger did this implicitly.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Lean.Elab.Tactic.Basic`, `Lean.Meta.Tactic.Simp.Main` | Core tactic infrastructure & simp engine. |
| `Mathlib.Algebra.Group.Units.Basic` | For `IsUnit`, units `Rˣ`, and partial division `/ₚ`. |
| `Mathlib.Tactic.Positivity.Core` | Provides `Positivity.solve`. |
| `Mathlib.Tactic.NormNum.Core` | Provides `Mathlib.Meta.NormNum.derive`. |
| `Mathlib.Util.DischargerAsTactic` | For `tacticToDischarge`, `wrapSimpDischarger`. |
| `Qq` | Quotation machinery (`Q(Prop)`, `q(...)`, antiquotation `~q(...)`). |

---

#### **6. Key Design Notes**

- **Goal**: Normalize expressions in fields to `n / d` with no nested divisions.
- **Algorithmic steps** (iterative):
  1. Convert `x⁻¹` → `1 / x`
  2. Move divisions right in products
  3. Group divisions: `a / x * b / y = (a * b) / (x * y)`
  4. Combine sums over common denominators
- **Denominator checking**: Relies on:
  - Local hypotheses (`x ≠ 0`, etc.)
  - `norm_num` for numerals
  - `Positivity.solve` for structured nonzero proofs
- **Excluded lemmas**:
  - `one_div`, `one_divp`: Prevent backtracking into inverse form.
  - `mul_eq_zero`: Replaced by `mul_ne_zero` to avoid disjunctions.

---

#### **7. Example Use Case**

```lean
example (a b c d x y : ℂ) (hx : x ≠ 0) (hy : y ≠ 0) :
    a + b / x + c / x^2 + d / x^3 = a + x⁻¹ * (y * b / y + (d / x + c) / x) := by
  field_simp
  ring
```

- `field_simp` rewrites to common denominator form.
- `ring` finishes equality proof.

---

This summary captures the **formal structure**, **implementation logic**, and **domain-specific behavior** of `field_simp`, suitable for building or extending a domain-specific AI agent for Lean theorem proving.