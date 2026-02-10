### Technical Metadata Brief: `simp_rw` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `withSimpRWRulesSeq` | `Syntax → Syntax → (Bool → Syntax → TacticM Unit) → TacticM Unit` | Helper function to parse and iterate over rewrite rules in `simp_rw`, passing each rule (with symmetry flag and term) to a user-defined continuation `x`. Does *not* attempt to infer equation lemmas. |
| `simp_rw` (elaborator) | `elab s:"simp_rw " cfg:optConfig rws:rwRuleSeq g:(location)? : tactic` | Main tactic entry point: parses `simp_rw [r1, ..., rn] at h₁ ... hₙ`, configures `simp` with `failIfUnchanged := false`, then applies each rule via `withSimpRWRulesSeq`. |

> **Note**: No theorems are proven in this file — it is purely a *tactic implementation*.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `withSimpRWRulesSeq`: `with_` + domain-specific action (`SimpRW`) + pattern (`Seq`) — indicates a *scoped execution* over a sequence of rules.
- **Suffixes**:
  - `Seq`: Denotes sequential processing of a list (here, rewrite rules).
- **Rule syntax**:
  - `rwRuleSeq`: Parser-level type for `[r1, ..., rn]` syntax.
  - `optConfig`: Optional configuration (e.g., `←`, `at`, etc.).
  - `location`: For `at *` / `at h` annotations.

---

#### **3. Tactic Stack**

Frequently used tactics *within* the implementation:

| Tactic | Role |
|--------|------|
| `evalTactic` | Executes generated tactic syntax (e.g., `simp ... only [...]`). |
| `withTacticInfoContext` | Wraps tactic execution with info-tree logging (for IDE support). |
| `withRef` | Attaches source location to error messages for better diagnostics. |
| `match ... with | `(term| $e:term) => ...` | Pattern-matching on quoted syntax (quasi-quotation). |
| `pure ()`, `do`, `←` | Standard monadic control flow in `TacticM`. |

> **Notably absent**: `rw`, `simp`, `aesop`, `ring`, etc. — `simp_rw` *builds on* `simp`, but does not use them directly in its core logic.

---

#### **4. Proof Logic / Execution Flow**

The tactic follows this logic:

1. **Parse input**: Extract configuration (`cfg`), rewrite rules (`rws`), and target location (`g`).
2. **Initialize `simp` context**:
   - Calls `evalTactic` with a `simp` invocation:
     ```lean
     simp%$s $[$(getConfigItems cfg)]* (failIfUnchanged := false) only $(g)?
     ```
     This sets up the initial `simp` state (e.g., local context, target), but *does not yet apply rules*.
3. **Iterate over rules**:
   - Uses `withSimpRWRulesSeq` to traverse the rule list.
   - For each rule `e`:
     - Determines symmetry (`symm := !rule[0].isNone`) — i.e., if `← e` is used.
     - Generates a `simp only [...]` tactic:
       - Forward: `simp%$e $cfg only [$e:term] $g ?`
       - Reverse: `simp%$e $cfg only [← $e:term] $g ?`
     - Executes it via `evalTactic`.
4. **Repetition & binder support**:
   - Achieved *implicitly* by `simp`’s internal behavior (which `simp_rw` leverages), not by explicit looping.

> **Key insight**: `simp_rw` is *not* a custom rewriter — it is a *wrapper* that sequences `simp` calls with user-specified rules, preserving order and enabling binder-underneath rewriting.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Init` | Provides core Lean infrastructure: `Lean`, `Elab.Tactic`, `Parser.Tactic`, `TacticM`, syntax types (`Syntax`, `Term`), etc. |
| *(Implicit)* `Lean.Elab.Tactic` | Required for `evalTactic`, `withTacticInfoContext`, `withRef`. |
| *(Implicit)* `Lean.Parser.Tactic` | Provides `rwRuleSeq`, `optConfig`, `location`, `getConfigItems`. |

> **No external mathlib dependencies** — this is a *core tactic* in `Mathlib.Tactic`, built on Lean’s metaprogramming API.

---

### Summary

`simp_rw` is a **hybrid tactic** that combines the *rule-ordering* of `rw` with the *repeated/binder-aware rewriting* of `simp`. It is implemented by:
- Using `simp` as a backend,
- Sequencing user-provided rules via `withSimpRWRulesSeq`,
- Generating per-rule `simp only [...]` calls with symmetry handling.

It exemplifies Lean’s metaprogramming style: *compositional*, *declarative*, and *error-aware*.