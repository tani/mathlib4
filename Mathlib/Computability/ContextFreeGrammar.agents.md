### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ContextFreeRule T N` | `structure` | Represents a single rewriting rule: a nonterminal (`input : N`) → list of symbols (`output : List (Symbol T N)`). |
| `ContextFreeGrammar T` | `structure` | Defines a CFG: type of nonterminals `NT`, initial nonterminal `initial`, and finite set of rules `rules`. |
| `Rewrites r u v` | `inductive Prop` | Inductively defines one-step rewriting of string `u` to `v` using rule `r`. |
| `Produces g u v` | `def` | One-step derivation in grammar `g`: `u ⇒ v` via some rule in `g`. |
| `Derives g u v` | `abbrev` | Reflexive-transitive closure of `Produces g`, i.e., multi-step derivation. |
| `Generates g s` | `def` | `s` is generated from the initial nonterminal: `Derives g [init] s`. |
| `language g` | `def` | Language of grammar `g`: all terminal strings derivable from `initial`. |
| `IsContextFree L` | `def` | Language `L` is context-free iff ∃ CFG `g` s.t. `g.language = L`. |
| `reverse r` | `def` | Rule reversal: same input, reversed output list. |
| `reverse g` | `def` | Grammar reversal: apply `reverse` to each rule. |
| `Language.IsContextFree.reverse` | `theorem` | Closure of context-free languages under reversal: if `L` is CF, so is `L.reverse`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsContextFree` — property of a language.
  - `rewrites_`, `produces_`, `derives_`, `generates_`: relations/properties tied to derivation steps.
  - `append_left`, `append_right`: structural lemmas about adding context to strings.
- **Suffixes**:
  - `_iff`: characterizations as biconditionals (e.g., `rewrites_iff`, `mem_language_iff`).
  - `_reverse`, `_reverse_comm`: reversal-related lemmas; `_comm` variants express symmetry.
  - `_single`, `_trans`, `_refl`: properties of `Derives` as a relation.
- **Quantifier-style naming**:
  - `exists_parts`: existential decomposition of rewriting steps.
  - `reverse_involutive`, `reverse_bijective`: algebraic properties of reversal maps.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_all`: simplification using definitional equalities and lemmas (e.g., `rewrites_iff`, `reverse_reverse`).
- `induction`: structural induction on `Rewrites`, `Derives`, or lists.
- `rcases` / `cases'`: destruct existential or conjunction hypotheses.
- `exact`, `apply`, `convert`: for constructing proofs of equalities or propositions.
- `rw [← ...]`: rewriting using commutative/symmetric lemmas (e.g., `rewrites_reverse_comm`).
- `ext`: extensionality for set equality (e.g., `language_reverse`).
- `aesop`: likely used implicitly in routine automation (not explicit here, but common in similar files).
- ` rfl`: reflexivity for definitional equalities.

#### 4. **Proof Logic**

- **Inductive reasoning** on derivation steps (`Rewrites`, `Derives`) is central.
- **Structural decomposition**: proofs often decompose derivation paths using `cases_head`, `cases_tail`, or `exists_parts`.
- **Symmetry via involutions**: reversal is modeled as an involution; proofs leverage `reverse_involutive` to switch between `g` and `g.reverse`.
- **Equational reasoning**: many lemmas are biconditionals (`↔`) proven via `rw [rewrites_iff] at *` + `use ...`.
- **Closure proofs**: for closure under reversal, construct a new grammar (`g.reverse`) and show equivalence via `language_reverse`.

#### 5. **Imports**

- `Mathlib.Computability.Language`: Provides foundational definitions of languages, reversal, and related operations.
- Implicit reliance on:
  - `Mathlib.Data.List.Basic` (for `List.reverse`, `++`, etc.)
  - `Mathlib.Data.Finset.Basic` (for finite sets of rules)
  - `Mathlib.Logic.Relation` (for `Reflexive`, `Transitive`, `ReflTransGen`)
  - `Mathlib.Data.Equiv.Basic` (for bijective/injective/surjective reasoning)

---

This metadata reflects a formalization focused on *syntactic* and *algebraic* properties of context-free grammars, with heavy use of inductive definitions, structural induction, and symmetry arguments (especially via involutive reversal).