Here's a structured technical brief extracted from the provided Lean 4 file, focusing on definitions, naming conventions, tactics, proof logic, and imports relevant for building a domain-specific AI agent for formalized mathematics (specifically, Szemerédi’s Regularity Lemma):

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `stepBound` | `ℕ → ℕ`, `stepBound n = n * 4 ^ n` | Upper bound on partition size after one blow-up step in the regularity lemma induction. |
| `le_stepBound` | `id ≤ stepBound` | Shows `stepBound` dominates identity. |
| `stepBound_mono` | `Monotone stepBound` | `stepBound` is monotone increasing. |
| `stepBound_pos_iff` | `0 < stepBound n ↔ 0 < n` | Positivity equivalence for `stepBound`. |
| `coe_stepBound` | `(stepBound n : α) = n * 4 ^ n` | Casts `stepBound` into any semiring. |
| `m` (notation) | `m = card α / stepBound #P.parts` | Average block size after partition blow-up. |
| `a` (notation) | `a = card α / #P.parts - m * 4 ^ #P.parts` | Remainder offset in block sizes. |
| `initialBound ε l` | `max 7 (max l (⌊log(100/ε⁵)/log 4⌋₊ + 1))` | Initial partition size for the iterative process. |
| `bound ε l` | `stepBound^[k] (initialBound ε l) * 16 ^ (stepBound^[k] (initialBound ε l))`, where `k = ⌊4/ε⁵⌋₊` | Final explicit bound on partition size in Szemerédi’s lemma. |
| `hundred_lt_pow_initialBound_mul` | `100 < 4 ^ initialBound * ε⁵` | Ensures ε is small enough for key inequalities. |
| `hundred_div_ε_pow_five_le_m` | `100 / ε⁵ ≤ m` | Relates ε and m in positivity arguments. |
| `hundred_le_m` | `100 ≤ m` (under ε ≤ 1) | Stronger bound on m under mild assumptions. |
| `a_add_one_le_four_pow_parts_card` | `a + 1 ≤ 4 ^ #P.parts` | Controls remainder `a` relative to exponential term. |
| `card_aux₁`, `card_aux₂` | Equations for `#u` in terms of `m`, `a`, and powers of 4 | Used to compute sizes of refined parts. |
| `pow_mul_m_le_card_part` | `4 ^ #P.parts * m ≤ #u` | Lower bound on part size in equipartition. |
| `mul_sq_le_sum_sq`, `add_div_le_sum_sq_div_card` | Inequalities for sums and averages | Technical lemmas for analytic estimates in regularity proofs. |

---

### **2. Naming Conventions**

- **Prefixes & Suffixes**:
  - `stepBound`, `initialBound`, `bound`: Named after their role in bounding partition sizes.
  - `m`, `a`: Short, context-specific notation for auxiliary variables (block size and remainder).
  - `coe_`, `le_`, `pos_`, `mono_`, `aux₁`, `aux₂`: Standard Lean naming patterns for coercion, monotonicity, positivity, and auxiliary lemmas.
  - `hundred_`, `eps_`: Reflect constants used in the analysis (e.g., `100`, `ε⁵`).
  - `SzemerediRegularity.Positivity`: Module for positivity proofs; uses scoped macro `sz_positivity`.

- **Macro & Tactic Names**:
  - `sz_positivity`: Scoped macro for automated positivity reasoning.
  - `evalInitialBound`, `evalBound`: Positivity tactic extensions.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| ` positivity` | Automated positivity proofs (e.g., `0 < ε`, `0 < m`). |
| ` norm_num` | Simplifies numeric expressions (e.g., `100 < 4 ^ n * ε ^ 5`). |
| ` simp_rw` | Rewriting with simplification (used in `add_div_le_sum_sq_div_card`). |
| ` ring` / `ring_nf` | Algebraic simplification (e.g., verifying polynomial identities). |
| ` gcongr` | Used in monotonicity proofs (e.g., `stepBound_mono`). |
| ` exact`, ` apply`, ` refine` | Direct proof construction. |
| ` have`, ` suffices` | Intermediate lemma introduction. |
| ` rwa`, ` rw` | Rewriting with assumptions. |
| ` push_cast`, ` cast_nonneg` | Handling type coercions (ℕ → ℝ). |
| ` aesop` (implied) | Likely used in `sz_positivity` or `positivity` extensions (not explicit but standard in modern Mathlib). |

---

### **4. Proof Logic**

- **Inductive Structure**: The proof of Szemerédi’s regularity lemma proceeds via iterative partition refinement. Each step uses `stepBound` to bound growth.
- **Positivity Reasoning**: Many lemmas require verifying positivity of `ε`, `m`, `initialBound`, `bound`. This is handled via:
  - `eps_pos`, `m_pos`, `initialBound_pos`, `bound_pos`.
  - `sz_positivity` macro automates this by extracting assumptions like `100 ≤ 4 ^ n * ε ^ 5` or `#P.parts * 16 ^ #P.parts ≤ card α`.
- **Arithmetic & Inequalities**:
  - Use of `Nat.div_le_iff_mul_le`, `Nat.le_div_iff_mul_le`, `div_le_iff₀`, etc., to manipulate inequalities involving division.
  - `a_add_one_le_four_pow_parts_card` ensures `a` is bounded, enabling `card_aux₁`/`card_aux₂`.
- **Analytic Estimates**:
  - Lemmas like `mul_sq_le_sum_sq` and `add_div_le_sum_sq_div_card` combine subset relations (`s ⊆ t`) with convexity/mean inequalities to bound quadratic forms.

---

### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Chebyshev` | Chebyshev’s inequality for ordered structures (used in sum inequalities). |
| `Mathlib.Analysis.SpecialFunctions.Pow.Real` | Real exponentiation and logarithm (used in `initialBound`, `bound`). |
| `Mathlib.Order.Partition.Equipartition` | Formalization of partitions and equipartitions (core data structure for regularity lemma). |

**Scope & Notation**:
- `open Finset Fintype Function Real`: Standard opens for combinatorics and analysis.
- `local notation3 "m"`, `"a"`: Local abbreviations for readability.
- `scoped macro "sz_positivity"`: Custom tactic for domain-specific positivity.

---

### **Domain-Specific AI Agent Notes**

- **Key Domain**: Extremal combinatorics, specifically Szemerédi’s Regularity Lemma and its quantitative bounds.
- **Core Challenges**:
  - Managing nested exponentials (`4 ^ n`, `16 ^ n`) and floor/log expressions.
  - Bridging discrete (`ℕ`) and continuous (`ℝ`) arithmetic.
  - Automating positivity and inequality reasoning under constraints (e.g., ε ≤ 1).
- **Suggested AI Capabilities**:
  - Pattern recognition for `stepBound`-like blow-up functions.
  - Guidance on choosing `initialBound` parameters (e.g., `7`, `log(100/ε⁵)/log 4`).
  - Support for tactic synthesis (e.g., `sz_positivity`-style macros).
  - Integration with `Mathlib.Meta.Positivity` for extensible positivity checking.

--- 

Let me know if you'd like a visual dependency graph or a formalization roadmap for Szemerédi’s lemma based on this file.