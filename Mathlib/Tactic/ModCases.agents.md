### Technical Brief: `mod_cases` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `OnModCases` (Int/Nat) | `ℕ → ℤ/ℕ → ℕ → Sort* → Prop` | Encodes a *partial proof by cases*: assuming existence of a residue `z` in `[lb, n)` with `a ≡ z [MOD n]`, implies goal `p`. |
| `onModCases_start` | `p → a → n → (1 ≤ n) → OnModCases n a 0 p → p` | Initializes the case split using the division algorithm: `a % n` gives a witness `z ∈ [0, n)`. |
| `onModCases_stop` | `p → n → a → OnModCases n a n p` | Handles termination: no `z` satisfies `n ≤ z < n`. |
| `onModCases_succ` | `b → (a ≡ b [MOD n] → p) → OnModCases n a (b+1) p → OnModCases n a b p` | Inductive step: splits `∃ z ≥ b` into `a ≡ b [MOD n]` (new subgoal) or `∃ z ≥ b+1`. |
| `proveOnModCases` | `Q(ℕ) → Q(ℤ/ℕ) → Q(ℕ) → Q(Sort u) → MetaM (Q(OnModCases ...) × List MVarId)` | Constructs the proof term for `OnModCases n a 0 p` recursively, generating subgoals for each residue `i ∈ [0, n)`. |
| `modCases` (Int/Nat) | `binderIdent → Q(ℤ/ℕ) → ℕ → TacticM Unit` | Main tactic entry point: applies `onModCases_start`, then uses `proveOnModCases` to decompose the goal into `n` subgoals. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `onModCases_`: Internal proof-term constructors for the `OnModCases` predicate.
  - `modCases`: Tactic entry points (per type: `IntMod`, `NatMod`).
- **Suffixes**:
  - `_start`, `_stop`, `_succ`: Reflect the structure of the inductive proof by cases (base case, termination, inductive step).
- **Variables**:
  - `n`: modulus (natural number, > 0).
  - `a`: expression being reduced modulo `n` (`ℤ` or `ℕ`).
  - `b`, `lb`: lower bound on candidate residues (natural number).
  - `p`: current goal (or proof goal type).
  - `z`, `m`: residue variable (bound in `OnModCases`).

---

#### **3. Tactic Stack**

- **Core Tactics Used**:
  - `intro`, `withContext`, `addLocalVarInfoForBinderIdent`: for introducing hypotheses and managing local contexts.
  - `mkFreshExprMVarQ`, `inferTypeQ`, `mkRawNatLit`: low-level elaboration utilities.
  - `replaceMainGoal`, `assign`: for goal management and proof term assignment.
- **Proof Automation**:
  - `have`, `refine`, `rw`, `exact`: used in `onModCases_start` proofs (e.g., `emod_nonneg`, `emod_emod`, `mod_mod`).
  - `if e : b = z then ... else ...`: conditional reasoning in `onModCases_succ`.
- **No external automation** (e.g., `aesop`, `ring`, `simp`): relies on explicit construction and `MetaM`-level reasoning.

---

#### **4. Proof Logic**

- **High-Level Strategy**:  
  The tactic implements a *constructive division algorithm* to decompose a goal into `n` subgoals, one for each residue class modulo `n`.  
  - **Step 1**: Prove existence of `z ∈ [0, n)` with `a ≡ z [MOD n]` (via `onModCases_start`, using `Int.emod_lt_of_pos` / `Nat.mod_lt`).
  - **Step 2**: Recursively decompose the existential statement:
    - If `b = n`, stop (no solutions).
    - Else, split `∃ z ≥ b` into `a ≡ b [MOD n]` (new subgoal) or `∃ z ≥ b+1` (recursive call).
  - **Step 3**: Assign the constructed proof term to the main goal, replacing it with `n` subgoals (one per residue `i ∈ [0, n)`), each with hypothesis `h : a ≡ i [MOD n]`.

- **Inductive Structure**:
  ```text
  proveOnModCases(n, a, 0, p)
    = if 0 ≥ n then stop
      else (a ≡ 0 [MOD n] → p) :: proveOnModCases(n, a, 1, p)
  ```

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Data.Int.ModEq` | Provides `Int.ModEq`, `Int.emod`, `ofNat_pos`, `emod_nonneg`, `emod_emod`, etc. |
| `Mathlib.Tactic.HaveI` | Enables `haveI'` syntax for implicit instance insertion during elaboration. |
| `Lean Meta Elab Tactic Term Qq` | Core elaboration infrastructure (`MetaM`, `Q(...)`, tactic combinators). |

- **Key Mathlib Concepts Used**:
  - `Int.ModEq`, `Nat.ModEq`: modular congruence.
  - `Int.toNat`, `Int.emod`, `Nat.mod`: division and remainder.
  - `Nat.ble`, `Nat.le_of_ble_eq_true`: comparison and positivity reasoning.

---

### Summary

The `mod_cases` tactic is a **constructive case analysis tool** for modular arithmetic, leveraging Lean’s metaprogramming to generate subgoals for each residue class modulo `n`. It is type-specific (`Int` vs `ℕ`), uses a recursive proof-term construction (`proveOnModCases`), and relies on foundational lemmas about modular arithmetic (e.g., division algorithm properties). Its design prioritizes *explicitness* and *reproducibility* over automation, making it suitable for formal verification where control over case splits is critical.