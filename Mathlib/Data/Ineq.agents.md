### Technical Metadata Brief: `Mathlib.Lean.Expr.Ineq`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Ineq` | `inductive Ineq : Type` | Represents comparison strength: `eq`, `le`, `lt`. Used internally by `linarith` and `linear_combination`. |
| `max : Ineq → Ineq → Ineq` | `max R1 R2` | Computes the strongest inequality compatible with summing two inequalities: if `t1 R1 0` and `t2 R2 0`, then `t1 + t2 (max R1 R2) 0`. |
| `cmp : Ineq → Ineq → Ordering` | `cmp R1 R2` | Compares two `Ineq`s under the ordering `eq < le < lt`. Returns `lt`, `eq`, or `gt`. |
| `toString : Ineq → String` | `toString R` | Converts `Ineq` to its string representation (`"="`, `"≤"`, `"<"`). |
| `ineq? : Expr → MetaM (Ineq × Expr × Expr × Expr)` | Parses an expression as `=`, `≤`, or `<`, returning the relation, type, and two sides. |
| `ineqOrNotIneq? : Expr → MetaM (Bool × Ineq × Expr × Expr × Expr)` | Parses an expression or its negation (`¬`) as an inequality, returning a flag for negation, relation, type, and sides. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ineq?`, `ineqOrNotIneq?`: Suffix `?` indicates *partial* (i.e., may fail) parsing functions returning `MetaM`.
  - `max`, `cmp`, `toString`: Standard functional names for operations on the datatype.
- **Suffixes**:
  - `?`: Indicates optional/failable behavior (convention in Lean 4 for parsing functions).
- **Case Style**:
  - `Ineq`, `eq`, `le`, `lt`: PascalCase for inductive type and constructors.
  - `toString`, `ineq?`: camelCase for functions.

---

#### **3. Tactic Stack**

- **Tactics Used**:
  - `whnfR`: Reduces expressions to weak head normal form (used in parsing).
  - `instantiateMVars`: Instantiates metavariables in expressions.
  - `match ... with ... => ...`: Pattern matching on `Expr` constructors (`eq?`, `le?`, `lt?`, `not?`).
  - `do`-notation: For monadic composition in `MetaM`.
  - `throwError`: For error reporting on invalid input.
  - `try ... catch _ => ...`: For handling parsing failures (e.g., for `¬` cases).

> *Note*: No high-level tactics like `aesop`, `ring`, or `simp` appear—this is a low-level utility module.

---

#### **4. Proof Logic / Implementation Strategy**

- **Parsing Logic**:
  - `ineq?`:
    - First reduces the expression using `whnfR`.
    - Attempts to match against equality (`eq?`), then `≤` (`le?`), then `<` (`lt?`).
    - Fails with `throwError` if none match.
  - `ineqOrNotIneq?`:
    - Tries to parse directly as an inequality.
    - If that fails, tries to parse the negation (`not?`) and flips a boolean flag.
- **Logic of `max` and `cmp`**:
  - `max`: Implements lattice-like behavior: `lt` dominates `le` and `eq`; `le` dominates `eq`.
  - `cmp`: Implements total ordering `eq < le < lt`, used for sorting or prioritizing inequalities.

---

#### **5. Imports & Dependencies**

- **Primary Import**:
  - `Mathlib.Lean.Expr.Basic`: Provides core expression utilities (`Expr`, `whnfR`, `instantiateMVars`, and pattern-matching helpers like `eq?`, `le?`, `lt?`, `not?`).
- **Open Statements**:
  - `open Lean Elab Tactic Meta`: Brings core Lean metaprogramming environment into scope.
- **Derivations**:
  - `deriving DecidableEq, Inhabited, Repr`: Auto-generates instances for equality checking, default values, and pretty-printing.

---

#### **6. Role in Larger System**

- **Purpose**: Provides foundational infrastructure for `linarith` and `linear_combination` tactics.
- **Usage Context**:
  - `Ineq` serves as the *relation type* for linear arithmetic constraints.
  - `ineq?` and `ineqOrNotIneq?` are used to extract relational structure from goal or hypothesis expressions.

--- 

Let me know if you'd like a formalization of `max`/`cmp` properties (e.g., monotonicity, idempotence) or a tactic-level usage example.