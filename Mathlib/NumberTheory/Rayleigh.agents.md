### Technical Metadata Brief: Rayleigh’s Theorem on Beatty Sequences (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `beattySeq` | `beattySeq : ℝ → ℤ → ℤ`, `beattySeq r k = ⌊k * r⌋` | Standard Beatty sequence (floor-based). |
| `beattySeq'` | `beattySeq' : ℝ → ℤ → ℤ`, `beattySeq' r k = ⌈k * r⌉ - 1` | Complementary variant (ceil-based minus 1). |
| `no_collision` | `r.IsConjExponent s → Disjoint (range (beattySeq r)) (range (beattySeq' s))` | Proves disjointness of Beatty sets under conjugate exponents. |
| `no_anticollision` | `r.IsConjExponent s → ¬∃ j k m, ...` | Shows no “anti-collision” (i.e., both sequences skipping same integer) possible. |
| `hit_or_miss` | `r > 0 → j ∈ range (beattySeq r) ∨ ∃ k, k < j/r ∧ (j+1)/r ≤ k+1` | For any integer `j`, either hit or skipped by `B_r`. |
| `hit_or_miss'` | `r > 0 → j ∈ range (beattySeq' r) ∨ ∃ k, k ≤ j/r ∧ (j+1)/r < k+1` | Analogous for `B'_r`. |
| `compl_beattySeq` | `r.IsConjExponent s → (range (beattySeq r))ᶜ = range (beattySeq' s)` | Main generalization: complement of `B_r` is `B'_s`. |
| `beattySeq_symmDiff_beattySeq'_pos` | `r.IsConjExponent s → B⁺_r ∆ B⁺'_s = ℕ⁺` | Positive Beatty sets partition ℕ⁺ with complementary variant. |
| `Irrational.beattySeq'_pos_eq` | `Irrational r → B⁺'_r = B⁺_r` | For irrational `r`, `B_r` and `B'_r` coincide on positive indices. |
| `Irrational.beattySeq_symmDiff_beattySeq_pos` *(Rayleigh’s Theorem)* | `r.IsConjExponent s → Irrational r → B⁺_r ∆ B⁺_s = ℕ⁺` | Final statement: irrational Beatty sequences partition ℕ⁺. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `beattySeq`, `beattySeq'`: core definitions.
  - `no_`, `hit_or_miss`, `hit_or_miss'`: descriptive lemmas about behavior (collision, skipping).
- **Suffixes**:
  - `'` (prime): variant definition (`beattySeq'`).
  - `_pos`: restriction to positive indices (`k > 0`).
  - `_symmDiff`: symmetric difference usage.
- **Logical structure**:
  - `compl_`: complement relation.
  - `symmDiff_`: symmetric difference partitioning.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions (`beattySeq`, `beattySeq'`, floor/ceil characterizations). |
| `intro`, `cases`, `exact`, `contradiction` | Basic proof structure. |
| `have`, `set` | Intermediate lemma introduction. |
| `apply`, `refine` | Goal-directed construction (e.g., witness for existential). |
| `norm_cast` | Cast inequalities between `ℤ` and `ℝ`. |
| `div_le_iff₀`, `lt_div_iff₀`, `le_div_iff₀`, `div_lt_iff₀` | Manipulate inequalities involving division (requires positivity). |
| `Int.floor_eq_iff`, `Int.ceil_eq_iff`, `Int.floor_le`, `Int.lt_floor_add_one`, `Int.ceil_lt_add_one` | Core floor/ceil arithmetic lemmas. |
| `add_lt_add_of_le_of_lt`, `add_lt_add_of_lt_of_le` | Combine inequalities. |
| `congr!` / `congr` | Congruence reasoning (used in `Irrational.beattySeq'_pos_eq`). |
| `ext` | Extensionality for set equality. |
| `by_cases` | Case split on membership. |
| `symmDiff_comm`, `compl_compl`, `Set.mem_compl_iff`, etc. | Set-theoretic rewrites. |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Disjointness** (`no_collision`): Assume `j` in both `B_r` and `B'_s`, derive contradiction via inequality chaining using `1/r + 1/s = 1`.
  2. **No anti-collision** (`no_anticollision`): Assume `j` skipped by both sequences, derive contradiction similarly.
  3. **Hit-or-miss** (`hit_or_miss`, `hit_or_miss'`): For any `j`, either `j ∈ B_r` or `B_r` skips `j`, using candidate `k = ⌈(j+1)/r⌉ - 1` or `⌊(j+1)/r⌋`.
  4. **Complement theorem** (`compl_beattySeq`): Use `ext`, case-split on membership, apply `no_collision` and `no_anticollision` + `hit_or_miss`/`hit_or_miss'`.
  5. **Partition of ℕ⁺** (`beattySeq_symmDiff_beattySeq'_pos`): Show inclusion both ways; use equivalence of positive-indexed sets with full-indexed ones (`hb₁`, `hb₂`) and `compl_beattySeq`.
  6. **Irrational case** (`Irrational.beattySeq'_pos_eq`): Show `⌊k r⌋ = ⌈k r⌉ - 1` for irrational `r`, using that `k r ∉ ℤ` ⇒ floor = ceil − 1.
  7. **Rayleigh’s theorem**: Combine irrational equality (`beattySeq'_pos_eq`) with previous partition result.

- **Inductive/constructive flavor**: Not inductive; mostly algebraic inequality reasoning + case analysis.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Real.ConjExponents` | Defines `IsConjExponent r s` (i.e., `r > 1`, `s > 1`, `1/r + 1/s = 1`). |
| `Mathlib.Data.Real.Irrational` | Provides `Irrational` typeclass and key lemmas (e.g., `irrational_mul_int_iff`, `int_mul_ne_int`). |

---

#### **Domain-Specific AI Agent Notes**

- **Core domain**: Number theory (Diophantine approximation, Beatty sequences).
- **Key mathematical objects**: Floor/ceil functions, conjugate exponents, irrationality.
- **Common proof patterns**:
  - Use of `IsConjExponent` to encode `1/r + 1/s = 1`.
  - Translation between floor/ceil via inequalities.
  - Symmetric difference for partitioning.
- **Critical lemmas for automation**: `hit_or_miss`, `no_collision`, `no_anticollision`, `Irrational.beattySeq'_pos_eq`.

Let me know if you'd like a tactic-level trace or a proof sketch generator for this file.