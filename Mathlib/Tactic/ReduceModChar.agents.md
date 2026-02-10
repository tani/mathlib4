### Technical Metadata Brief: `reduce_mod_char` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `ReduceModChar.derive` | Main entry point: traverses an expression using `simp`, calls `matchAndNorm` on subexpressions to reduce numerals modulo characteristic. |
| `ReduceModChar.matchAndNorm` | Matches expression type for ring of positive characteristic (via `typeToCharP`) and reduces numerals if possible. |
| `ReduceModChar.typeToCharP` | Syntactically infers characteristic `p` of a type `α` (e.g., `ZMod n`, `Polynomial R`) — avoids expensive instance search unless `expensive := true`. |
| `ReduceModChar.normIntNumeral` | Reduces an integer numeral `e : α` modulo `p`, where `α` has `CharP α p`. Uses `normBareNumeral` or `normPow`. |
| `ReduceModChar.normPow` | Handles exponentiation `a ^ b` in characteristic `p` via fast modular exponentiation (`evalNatPowMod`). |
| `ReduceModChar.normBareNumeral` | Reduces a plain integer numeral using `norm_num` + `evalIntMod`. |
| `ReduceModChar.normNeg` | Rewrites `-e` as `(p - 1) * e` when `e` is not a numeral (fallback when `normIntNumeral` fails). |
| `ReduceModChar.normNegCoeffMul` | Rewrites `-(a * b)` as `((p - 1) * a) * b` when `a` is a numeral. |
| `CharP.isInt_of_mod` | Justifies that reducing an integer representative modulo `p` yields a valid representative in the ring. |
| `CharP.isNat_pow` | Justifies modular reduction of exponentiation in semirings of characteristic `p`. |
| `CharP.intCast_eq_mod` | Key lemma: `(k : α) = (k % p : ℤ)` in a ring `α` of char `p`. |
| `CharP.neg_eq_sub_one_mul` | Justifies `-b = (p - 1) * b`. |
| `CharP.neg_mul_eq_sub_one_mul` | Justifies `-(a * b) = ((p - 1) * a) * b`. |
| `TypeToCharPResult` | Inductive result type: either `.intLike n ...` (ring of char `n`) or `.failure`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm*`: Functions that normalize/reduce expressions (e.g., `normIntNumeral`, `normPow`, `normNeg`).
  - `typeTo*`: Functions that infer structural properties from types (e.g., `typeToCharP`).
  - `is*`: Proof-relevant predicates (e.g., `isInt`, `isNat`).
- **Suffixes**:
  - `'` (prime): Variants of main functions (e.g., `normIntNumeral'` is a wrapper around `normPow`/`normBareNumeral`).
  - `*Coeff*`: For coefficient-level operations (e.g., `normNegCoeffMul`).
- **Other**:
  - `*Mul`, `*Neg`: Operations involving multiplication or negation.
  - `*Result`: Result types (e.g., `TypeToCharPResult`, `Result`).

---

#### **3. Tactic Stack**

Frequently used tactics and utilities:

| Tactic / Utility | Role |
|------------------|------|
| `simp` | Core traversal mechanism; uses `reduce_mod_char`-tagged lemmas. |
| `norm_num` | Underlies `normBareNumeral`; used for integer normalization. |
| `evalIntMod.go`, `evalNatPowMod` | Low-level modular arithmetic helpers (from `Mathlib.Meta.NormNum`). |
| `whnfR`, `isDefEq`, `trySynthInstanceQ` | Meta-level term manipulation and type inference. |
| `mkOfNat`, `derive` (for nat literals) | Construct natural numerals in target type. |
| `withNewMCtxDepth`, `instantiateMVars` | Manage metavariable context and type instantiation. |
| `getSimpCongrTheorems`, `getSimpExtension?` | Retrieve `simp` infrastructure for `reduce_mod_char`. |

---

#### **4. Proof Logic / Reduction Strategy**

- **High-level flow**:
  1. `derive` calls `simp` with a custom `pre` hook: `matchAndNorm`.
  2. `matchAndNorm`:
     - Infers type `α` of expression `e`.
     - Uses `typeToCharP` to find `p` such that `CharP α p`.
     - If successful, applies reduction rules in order:
       - `normIntNumeral` (handles numerals, powers, etc.)
       - `normNegCoeffMul` (handles `-(a * b)`)
       - `normNeg` (handles `-e`)
  3. Reductions are justified by lemmas like `CharP.intCast_eq_mod`, `CharP.neg_eq_sub_one_mul`, etc.
- **Key logic**:
  - **Syntactic matching** on types (`ZMod n`, `Polynomial R`) avoids expensive `CharP` search.
  - **Fallback** (`expensive := true`) uses local context to find `CharP` instances.
  - **Negation/subtraction** are rewritten to multiplication by `p - 1` to keep expressions in "positive" normal form.
  - **Exponentiation** uses fast modular exponentiation (`evalNatPowMod`) to avoid overflow.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Data.ZMod.Basic` | Provides `ZMod`, `charP`, and basic arithmetic. |
| `Mathlib.RingTheory.Polynomial.Basic` | Provides `Polynomial` ring structure and `CharP` instance. |
| `Mathlib.Tactic.NormNum.DivMod` | Provides `evalIntMod`, modular division. |
| `Mathlib.Tactic.NormNum.PowMod` | Provides `evalNatPowMod`, fast modular exponentiation. |
| `Mathlib.Tactic.ReduceModChar.Ext` | Registers `reduce_mod_char` as a `simp` extension. |

---

### Summary

The `reduce_mod_char` tactic is a **type-driven**, **performance-optimized** simplifier for rings of positive characteristic. It avoids costly typeclass inference by syntactically recognizing common characteristic rings (`ZMod`, `Polynomial`) and uses modular arithmetic primitives (from `norm_num`) to reduce numerals. It supports exponentiation, negation, and coefficient-wise simplification, making it suitable for use inside `ring`-like tactics or manual simplification in modular arithmetic contexts.