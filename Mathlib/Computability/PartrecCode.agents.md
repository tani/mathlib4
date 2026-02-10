### Technical Brief: Gödel Numbering for Partial Recursive Functions in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Code` | `inductive Code : Type` | Inductive datatype encoding partial recursive function constructors (`zero`, `succ`, `left`, `right`, `pair`, `comp`, `prec`, `rfind'`). |
| `encodeCode : Code → ℕ` | `Code → ℕ` | Injective encoding of `Code` into natural numbers (Gödel numbering). |
| `ofNatCode : ℕ → Code` | `ℕ → Code` | Decoding function: reconstructs a `Code` from a natural number (inverse of `encodeCode`). |
| `eval : Code → ℕ →. ℕ` | `Code → ℕ →. ℕ` | Interpretation of a code as a partial function (`Part ℕ`). |
| `evaln : ℕ → Code → ℕ → Option ℕ` | `ℕ → Code → ℕ → Option ℕ` | Bounded evaluation returning `Option ℕ`, used to avoid undecidability in proofs. |
| `const : ℕ → Code` | `ℕ → Code` | Returns a code for the constant function outputting a given natural number. |
| `id : Code` | `Code` | Code for the identity function: `pair left right`. |
| `curry : Code → ℕ → Code` | `Code → ℕ → Code` | Partially applies a code with a constant first argument. |
| `rec_prim` | `Primrec c → … → Primrec (fun a => F a (c a))` | Recursion on `Code` is primitive recursive. |
| `rec_computable` | `Computable c → … → Computable (fun a => F a (c a))` | Recursion on `Code` is computable. |
| `smn` | `∃ f, Computable₂ f ∧ ∀ c n x, eval (f c n) x = eval c (pair n x)` | $S_n^m$ theorem: `curry` is a computable currying operator. |
| `exists_code` | `Partrec f ↔ ∃ c, eval c = f` | Fundamental equivalence: a function is partial recursive iff it is the evaluation of some code. |
| `evaln_prim` | *(implied)* | `evaln` is primitive recursive (used in proofs of bounded evaluation properties). |
| `fixed_point` | *(implied)* | Roger’s fixed point theorem (existence of self-referential programs). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `encode*`, `ofNat*`: Encoding/decoding functions.
  - `eval*`: Interpretation of codes as functions.
  - `rec*`: Recursion principles over `Code`.
  - `prim`, `comp*`: Properties related to primitive recursiveness / computability.
  - `const`, `id`, `curry`: Standard combinators.

- **Suffixes**:
  - `Code`: Namespaced under `Nat.Partrec.Code`.
  - `'` (prime): Often denotes variants (e.g., `rfind'` vs `rfind`).
  - `n`: For bounded versions (e.g., `evaln`).

- **Structure**:
  - `pair`, `comp`, `prec`, `rfind'`: Directly mirror standard partial recursive function constructors.
  - `ofNatCode`, `encodeCode`: Mutual inverses (see `encode_ofNatCode`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp!` | Simplification with definitional equalities, especially for `eval`, `encodeCode`, `ofNatCode`. |
| `induction` | Structural induction on `Code`, or natural number induction (often `nat_strong_rec`). |
| `cases'` / `cases` | Case analysis on `n.bodd`, `n.div2.bodd`, or inductive constructors. |
| `rw` / `conv` | Rewriting using lemmas like `encode_ofNatCode`, `eval_prec_zero`, `eval_curry`. |
| `exact`, `refine`, `apply` | Goal-directed proof construction, especially for `Primrec`/`Computable`. |
| `have`, `suffices` | Intermediate lemma introduction. |
| `option_*`, `list_*` | Tactics for reasoning about `Option`/`List` operations (e.g., `list_get?`, `Option.bind`). |
| `nat_*` | Tactics for arithmetic reasoning (`nat_div2`, `nat_bodd`, `nat_pair`, etc.). |
| `injection` | Injectivity of constructors (e.g., `const_inj`). |
| `lt_of_le_of_lt`, `le_trans` | Arithmetic inequalities (common in bounding `m < n + 4`). |

---

#### **4. Proof Logic**

- **Inductive Structure**: Proofs over `Code` use structural induction on the inductive type.
- **Bounded Evaluation (`evaln`)**: Used to avoid non-termination issues; proofs often proceed by induction on `k` (the bound), with monotonicity (`evaln_mono`) and soundness (`evaln_sound`) lemmas.
- **Gödel Numbering**: Key lemmas like `encode_ofNatCode` use case analysis on `n.bodd` and `n.div2.bodd`, leveraging `bit_decomp`.
- **Primrec/Computable Proofs**:
  - Use `Primrec.ofNat_iff`, `Computable.ofNat_iff` to reduce to arithmetic.
  - Leverage `Primrec₂`/`Computable₂` combinators (`pair`, `comp`, `cond`, `nat_casesOn`, `list_get?`, etc.).
  - Heavy use of `nat_strong_rec` for recursion over codes via bounded evaluation.
- **Equivalence Proofs**:
  - `exists_code`: Two-directional proof:  
    - `→`: Induction on `Partrec` derivation.  
    - `←`: Induction on `Code`.
- **Currying & $S_n^m$**: Proven via `curry` and `eval_curry`, with `Primrec₂`/`Computable₂` witnesses.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Computability.Partrec` | Core theory of partial recursive functions (`Partrec`, `PFun`, `Primrec`, `Computable`). |
| `Mathlib.Data.Option.Basic` | Basic operations on `Option`, including `bind`, `map`, `get?`. |
| `Encodable`, `Denumable` | Used for `Denumerable Code` instance via `mk'`. |

---

#### **Summary**

This file formalizes Gödel numbering for partial recursive functions in Lean 4, providing:
- A concrete inductive representation (`Code`) of partial recursive functions.
- A computable encoding/decoding scheme (`encodeCode`/`ofNatCode`).
- A semantics (`eval`) linking codes to partial functions.
- Meta-theoretic results (e.g., `rec_prim`, `smn`, `exists_code`) foundational to computability theory.

The proofs rely heavily on structural induction, bounded evaluation (`evaln`), and arithmetic reasoning over Gödel numbers, with tactics like `simp`, `induction`, and `injection` dominating the proof scripts.