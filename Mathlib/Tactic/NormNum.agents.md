**Technical Metadata Brief: Lean 4 Module — `Mathlib.Tactic.NormNum.*` + `Rat.Cast.Order`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `norm_num` (tactic family) | A collection of tactics (`norm_num`, `norm_num1`, `norm_num?`, etc.) for *deciding* equalities and inequalities over concrete numeric expressions in `ℝ`, `ℚ`, `ℤ`, `ℕ`, etc., using *rational arithmetic* and *field simplification*. |
| `norm_num_of_scientific` | Converts scientific notation literals (e.g., `1.2e3`) into rational/real expressions and normalizes them. |
| `norm_num_eq` | Handles equality proofs by reducing both sides to canonical rational/real forms and comparing. |
| `norm_num_ineq` | Handles inequality proofs (`≤`, `<`, `≥`, `>`) over ordered fields (e.g., `ℚ`, `ℝ`) via sign analysis and rational arithmetic. |
| `norm_num_pow` | Optimizes normalization of powers (e.g., `2^10`, `(3/4)^2`) using integer exponentiation rules. |
| `norm_num_inv` | Simplifies inverses (e.g., `1 / 3`, `(2/5)⁻¹`) using field inversion laws. |
| `norm_num_div_mod` | Normalizes division and modulo expressions over `ℤ` or `ℚ`, e.g., `17 / 5`, `17 % 5`. |
| `rat.cast_order` (instance) | Provides the *ordered field* structure on `ℚ` induced by its embedding into `ℝ` (or any ordered field), ensuring monotonicity of cast: `a ≤ b ↔ (a : ℝ) ≤ (b : ℝ)`. |

> **Note**: These are not standalone theorems but *tactic infrastructure*; correctness relies on underlying lemmas (e.g., `rat.cast_le`, `rat.cast_add`, `rat.cast_mul`) from `Mathlib.Data.Rat.Cast.Order`.

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `norm_num_` — core normalization tactics (e.g., `norm_num_eq`, `norm_num_ineq`)
  - `of_` — conversion helpers (e.g., `of_scientific`)
- **Suffixes**:
  - `_eq`, `_ineq`, `_pow`, `_inv`, `_div_mod` — indicate *subtask specialization* (e.g., `norm_num_pow` handles exponentiation).
- **General pattern**: `norm_num_[subdomain]` for modular tactic components.

---

### 3. **Tactic Stack**

Frequently used tactics *within* the `norm_num` infrastructure:

| Tactic | Role |
|--------|------|
| `aesop` | For background reasoning (e.g., applying order axioms, linear arithmetic) |
| `ring` / `field_simp` | Simplify polynomial/rational expressions before normalization |
| `simp_rw` / `simp` | Rewrite using algebraic identities (e.g., `mul_comm`, `inv_mul_cancel`) |
| `exact` / `assumption` | Final proof step after normalization |
| `decide` | For decidable propositions (e.g., `0 < 1`) |
| `rfl` | Reflexivity after full normalization |

> Internally, `norm_num` composes these in a *pipeline*: parse → simplify → normalize → compare.

---

### 4. **Proof Logic**

- **Core strategy**:  
  1. **Parse** the numeric expression (e.g., `2/3 + 5/7`) into a syntactic tree.  
  2. **Normalize** subterms using field/ring simplifications (`ring`, `field_simp`).  
  3. **Evaluate** rational/integer subexpressions to canonical form (e.g., `49/21 ↦ 7/3`).  
  4. **Compare** terms using decidability of equality/inequality in `ℚ`/`ℝ`.  
- **Induction**: Not typically used — `norm_num` is *automated* and *non-inductive*; it avoids structural induction by leveraging *decidability* and *canonical forms*.  
- **Case analysis**: Limited; mostly used in `norm_num_ineq` for sign cases (e.g., `a < 0 ∨ a ≥ 0`), but hidden from user.

---

### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.NormNum.*` (7 modules) | Core normalization infrastructure for arithmetic |
| `Mathlib.Data.Rat.Cast.Order` | Provides ordered field structure on `ℚ`, enabling comparison of rationals via real embedding; critical for `norm_num` to reason about `≤`, `<` over `ℚ` |

> **Scope**: This module targets *concrete numeric reasoning* in *ordered fields*, especially `ℚ` and `ℝ`, with full automation for ground terms.

--- 

Let me know if you'd like a formalized tactic signature or a trace of `norm_num` on a sample goal.