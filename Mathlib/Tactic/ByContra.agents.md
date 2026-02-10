### Technical Metadata Brief: `by_contra!` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name / Syntax | Type / Purpose |
|---------------|----------------|
| `by_contra!` tactic | A variant of `by_contra` that introduces a hypothesis `¬ p` (normalized via `push_neg`) to prove `False`. Used for classical contradiction proofs. |
| `syntax (name := byContra!) "by_contra!" ...` | Lean parser syntax declaration for the tactic. Supports optional name (`h`) and optional type annotation (`: q`). |
| `macro_rules` | Defines expansion logic for `by_contra!` into core tactics: `by_contra`, `push_neg`, and `exact`. |

**Purpose Summary**:  
The `by_contra!` tactic automates classical contradiction proofs by:
- Introducing `¬ p` as a hypothesis,
- Normalizing negations in both the goal and the hypothesis (via `push_neg`),
- Optionally checking consistency between a user-specified type `q` and `¬ p`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `by_contra!`: Indicates a *negation-normalizing* variant of `by_contra`.
  - `this`: Default name for the introduced hypothesis when none is given.
- **Suffixes**:
  - `!`: Denotes *enhanced* behavior — specifically, negation normalization.
- **Identifier patterns**:
  - `h`, `e`: Used for hypothesis identifiers in macro rules.
  - `under`: Internal variable for parsing optional binder syntax.

---

#### **3. Tactic Stack**

Frequently used tactics in `by_contra!` expansion:

| Tactic | Role |
|--------|------|
| `by_contra` | Core contradiction tactic: introduces `¬ p` and flips goal to `False`. |
| `push_neg` | Normalizes negated propositions (e.g., `¬ a < b` → `b ≤ a`). |
| `try push_neg at h` | Applies `push_neg` *at* hypothesis `h` if possible. |
| `have ... := by { ...; exact h }` | Introduces a new hypothesis with type `q`, derived from `h` after normalization. |
| `clear h` | Removes temporary hypothesis `h` after extracting `q`. |
| `exact` | Used to verify definitional equality of normalized forms. |

---

#### **4. Proof Logic / Strategy**

The tactic follows this logical flow:

1. **Assume negation**: Apply `by_contra h` to get hypothesis `h : ¬ p`.
2. **Normalize**: Apply `push_neg` to `h` (and optionally to user-given `q`) to bring into canonical negation-normal form.
3. **Validate / Rebind**:
   - If no type `q` is given: keep `h` (now normalized) as `this : ¬ p`.
   - If `q` is given: check that `push_neg ¬p ≡ push_neg q`; if so, bind `q` to user-given name `e`.
4. **Fail gracefully**: If normalization yields mismatched types, tactic fails with a definitional equality error.

**Classical reasoning**: Relies on `by_contra`, which uses the law of excluded middle (LEM) implicitly.

---

#### **5. Imports**

| Module | Reason |
|--------|--------|
| `Batteries.Tactic.Init` | Provides foundational tactic infrastructure and macros. |
| `Mathlib.Tactic.PushNeg` | Supplies `push_neg` tactic for negation normalization. |
| `Lean`, `Lean.Parser`, `Parser.Tactic`, `Elab`, `Command`, `Elab.Tactic`, `Meta` | Core Lean metaprogramming APIs for tactic syntax, elaboration, and meta-level operations. |

---

### Summary

`by_contra!` is a *user-friendly*, *negation-aware* contradiction tactic for classical reasoning. It extends `by_contra` by integrating `push_neg` to simplify working with inequalities and other negated structures, making it especially useful in analysis, order theory, and real-closed fields. Its macro rules ensure robust handling of optional naming and type annotations, with clear failure modes for type mismatches.