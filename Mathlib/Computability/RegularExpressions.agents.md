### Technical Metadata Brief: `Mathlib.Computability.RegularExpression`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RegularExpression α` | `Type u → Type u` (inductive) | Formal definition of regular expressions over alphabet `α`, mirroring Kleene algebra syntax: `0`, `1`, `char`, `plus`, `comp`, `star`. |
| `matches' : RegularExpression α → Language α` | Function | Semantics: maps each regex to the formal language it denotes (set of strings). |
| `matchEpsilon : RegularExpression α → Bool` | Function | Decides whether the regex matches the empty string (ε). |
| `deriv : RegularExpression α → α → RegularExpression α` | Function | Brzozowski derivative: `deriv P a` matches strings `x` where `a :: x` is matched by `P`. |
| `rmatch : RegularExpression α → List α → Bool` | Function | Decidable matching: `rmatch P x` computes whether `P` matches list `x`. |
| `map (f : α → β) : RegularExpression α → RegularExpression β` | Function | Functorial map of regexes along a function on alphabets. |
| `rmatch_iff_matches'` | `P.rmatch x ↔ x ∈ P.matches'` | Fundamental correctness theorem: `rmatch` correctly decides `matches'`. |
| `matches'_map` | `(P.map f).matches' = Language.map f P.matches'` | `map` commutes with semantics: semantics of mapped regex = mapped semantics. |
| `deriv_star`, `deriv_add`, `deriv_char_*` | `[simp]` lemmas | Structural properties of Brzozowski derivatives. |
| `mul_rmatch_iff` | `(P * Q).rmatch x ↔ ∃ t u, x = t ++ u ∧ P.rmatch t ∧ Q.rmatch u` | Characterizes matching of concatenation. |
| `star_rmatch_iff` | `(star P).rmatch x ↔ ∃ S, x = S.flatten ∧ ∀ t ∈ S, t ≠ [] ∧ P.rmatch t` | Characterizes matching of Kleene star. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `deriv_`, `matchEpsilon`, `rmatch`, `matches'_`, `map_`, `zero_`, `one_`, `plus_`, `comp_`, `star_`, `mul_`, `add_`, `char_`
- **Suffixes**:
  - `_def`: definitional equalities (e.g., `zero_def`, `comp_def`)
  - `_iff`: logical equivalences (e.g., `rmatch_iff_matches'`, `mul_rmatch_iff`)
  - `_self`, `_of_ne`: for case distinctions (e.g., `deriv_char_self`, `deriv_char_of_ne`)
- **Operator overloading**:
  - `0`, `1`, `+`, `*`, `^` used for `zero`, `epsilon`, `plus`, `comp`, `pow` via typeclass instances.
  - `Mul.mul`, `Add.add`, `Pow.pow` are *not* pattern-matched directly; instead, `comp`, `plus`, `npowRec` are used in patterns (see adaptation notes).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `induction` (on lists, natural numbers, regexes)
- `simp` / `simp_rw` (especially with `*` lemmas like `matches'_mul`, `deriv_add`)
- `rw` / `erw` (for rewriting using lemmas; `erw` used for higher-order unification in `matches'_map`)
- `tauto`, `exact`, `refine`, `cases'`, `split_ifs`
- `omega` (for arithmetic reasoning on list lengths)
- `decidable_of_iff` (to lift decidability via equivalence)
- `rwa`, `convert`, `congr_arg`, `congrFun`

> **Note**: `aesop` is *not* used — proofs are largely manual and structural.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs over `RegularExpression` follow its inductive constructors (`zero`, `epsilon`, `char`, `plus`, `comp`, `star`).
- **List induction**: For `rmatch`-related theorems, induction on `x : List α` is standard.
- **Case analysis**:
  - On `x = []` vs `x = a :: as`
  - On `P.matchEpsilon` (boolean case split in `deriv`)
  - On `a = b` in `deriv (char a) b`
- **Termination**: `star_rmatch_iff` uses `termination_by t => (P, t.length)` to ensure well-founded recursion on list length.
- **Equivalence-based reasoning**: Many theorems prove `↔` (e.g., `rmatch_iff_matches'`) and use `decidable_of_iff` to derive decidability.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Computability.Language`: Defines formal languages, concatenation, Kleene star, map, etc.
  - `Mathlib.Tactic.AdaptationNote`: For version-specific notes (e.g., pattern syntax changes).
- **Open scopes**:
  - `List`, `Set`, `Computability`
- **Universe polymorphism**: `universe u` and `variable {α β γ : Type*}` indicate generic, universe-polymorphic treatment.
- **Decidable equality assumption**: Many results (e.g., `deriv`, `rmatch`, decidability of membership) require `[DecidableEq α]`.

---

#### **6. Notable Design Notes**

- **No `pattern` attribute** for `Mul.mul`/`Add.mul` — instead, direct constructor names (`comp`, `plus`) used in patterns (due to `simpNF` issues).
- **`matches'` vs `matches`**: `matches` is reserved; `matches'` is used for semantics.
- **Computability focus**: `rmatch` is defined to be *computable* and proven equivalent to `matches'`, enabling decidability.
- **Kleene algebra alignment**: Names (`zero`, `epsilon`, `plus`, `comp`, `star`) reflect algebraic structure.

--- 

This metadata captures the formalization’s structure, intent, and implementation style for use in domain-specific AI agent training or library analysis.