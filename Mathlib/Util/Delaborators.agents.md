### Technical Metadata Brief: `PiNotation.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|----------------|---------|
| `piNotation` | `Term.Parser` | Parser for `Π x : α, β x` notation (dependent function type), using `Π` instead of `∀`. |
| `Π x:ident binderPred, term` | Syntax rule | Extended binder syntax for `Π x ∈ s, β x`, desugaring to `Π x, x ∈ s → β x`. |
| `replacePiNotation` | `Lean.Macro` | Macro that rewrites parsed `Π`-notation into Lean 4’s built-in `∀`-notation parser (since they’re semantically equivalent). |
| `delabPi` | `Delab` | Delaborator override for `forallE` that pretty-prints `Π`-types with cute binders (e.g., `∀ ε > 0`, `∀ x ∈ s`) and preserves `Π` syntax. |
| `delabPi'` | `Delab` | Scoped delaborator that ensures *all* function types (including non-propositional ones) pretty-print as `Π`, merging nested `Π`s. |
| `exists_delab` | `Delab` | Delaborator for `∃`, supporting extended binders (e.g., `∃ x ∈ s, P x`) and cute binders (e.g., `∃ x > 0, ...`). |
| `delab_not_in` | `Delab` | Delaborator for `∉`, pretty-printing `x ∉ s` from `¬ (x ∈ s)` (via `Not` and `Membership.mem`). |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `delab*`: Delaborator functions (`delabPi`, `delabPi'`, `exists_delab`, `delab_not_in`).
  - `piNotation`, `PiNotation`: Module and parser names.
  - `binderPred`: Used in syntax rules for extended binders (`∈`, `>`, `≤`, etc.).
  - `satisfies_binder_pred%`: Internal macro helper for extended binder desugaring.
- **Symbolic Notation**:
  - `Π` for dependent function types (vs. `∀` for propositions).
  - `∃` for existential quantification.
  - `∈`, `∉`, `⊆`, `⊂`, `≥`, `≤`, `>`, `<`, `∧`, `→` used in binder predicates.

---

#### **3. Tactic / Macro Stack**

- **Parser macros**:
  - `binderIdent`, `bracketedBinder`, `ppSpace`, `optType`, `termParser`
  - `many1`, `leading_parser`
- **Macro rules**:
  - `macro_rules` with pattern matching on syntax trees (`(Π $x:ident $pred, $p)`)
- **Delaborator stack**:
  - `whenPPOption Lean.getPPNotation`: Guarded by pretty-printing options.
  - `delabForall`, `delab`, `SubExpr.withAppArg`, `SubExpr.withBindingDomain`, `withBindingBodyUnusedName`
  - `Meta.isProp`, `Term.hasLooseBVar`, `getPPOption getPPFunBinderTypes`
- **Syntax rewriting**:
  - Pattern matching and reconstruction using backtick quasi-quotation (e.g., `` `(Π $i:ident ∈ $s, $body) ``)

---

#### **4. Proof Logic / Implementation Strategy**

- **Parsing**:
  - `piNotation` defines a custom parser for `Π`-notation, mirroring Lean’s `forall` parser but using `Π`.
  - Extended binders (`x ∈ s`) are desugared via `macro_rules` into implications (`x ∈ s → ...`).
- **Macro substitution**:
  - `replacePiNotation` converts parsed `Π`-syntax into the standard `∀` parser (since Lean internally treats both identically).
- **Pretty-printing (delaboration)**:
  - `delabPi` and `delabPi'` override Lean’s default `forallE` delaborator.
  - They detect common patterns (e.g., `∀ x, x > 0 → P x`) and rewrite them as `∀ x > 0, P x`.
  - `delabPi'` further ensures *all* function types use `Π`, not just propositions.
  - `exists_delab` similarly rewrites `∃` with extended binders and merges nested quantifiers.
- **Membership negation**:
  - `delab_not_in` recognizes `¬ (x ∈ s)` and pretty-prints as `x ∉ s`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean 4 initialization (required for basic types/macros). |
| `Lean.PrettyPrinter.Delaborator.Builtins` | Provides delaborator infrastructure (`delab`, `SubExpr`, `whenPPOption`, etc.). |

> **Note**: No external mathlib libraries are imported beyond core Lean infrastructure — this is a *core pretty-printing utility*, not a mathematical theory.

---

### Summary

This file extends Lean 4’s syntax and pretty-printing for dependent function (`Π`) and existential (`∃`) quantifiers, with support for **extended binders** (e.g., `x ∈ s`, `x > 0`) and **cute binder syntax** (e.g., `∀ ε > 0`). It leverages Lean’s delaborator framework to override default pretty-printing behavior, ensuring mathematical idioms like `∀ x ∈ s, P x` and `∃ x > 0, P x` render naturally. The implementation is minimal, focused, and avoids duplication by reusing existing `∀`/`∃` infrastructure.