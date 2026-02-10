### Technical Metadata Brief: Congruence Closure (`cc`) Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CCState.mkCore` | `CCConfig → CCState` | Initializes a fresh `CCState` with `True` and `False` pre-internalized. |
| `CCState.mkUsingHsCore` | `CCConfig → MetaM CCState` | Builds a `CCState` from the current goal’s hypotheses (excluding implementation details). |
| `CCState.add` | `CCState → Expr → MetaM CCState` | Adds a proof term (of type `Eq`, `HEq`, `Iff`, or negation thereof) to the equality graph. |
| `CCState.internalize` | `CCState → Expr → MetaM CCState` | Adds a term (expression) to the equality graph as a node. |
| `CCState.isEqv` | `CCState → Expr → Expr → MetaM Bool` | Checks if two terms are in the same equivalence class (i.e., provably equal via closure). |
| `CCState.isNotEqv` | `CCState → Expr → Expr → MetaM Bool` | Checks if two terms are *not* in the same equivalence class. |
| `CCState.eqvProof` | `CCState → Expr → Expr → MetaM Expr` | Constructs a proof term witnessing equality of two terms in the same class. |
| `CCState.proofFor` | `CCState → Expr → MetaM Expr` | Constructs a proof of `True` if the term is equivalent to `True`. |
| `CCState.refutationFor` | `CCState → Expr → MetaM Expr` | Constructs a proof of `False` if the term is equivalent to `False`. |
| `CCState.proofForFalse` | `CCState → MetaM Expr` | Returns a proof of `False` if the state is inconsistent. |
| `CCState.rootsCore` | `CCState → Bool → List Expr` | Returns representative (root) terms for equivalence classes; optionally only non-singleton ones. |
| `CCState.eqcOf` | `CCState → Expr → List Expr` | Returns all terms in the equivalence class of a given term. |
| `CCState.foldEqc` / `foldEqcM` | `CCState → Expr → α → (α → Expr → α) → α` | Folds over all elements in an equivalence class. |
| `_root_.Lean.MVarId.cc` | `MVarId → CCConfig → MetaM Unit` | Main entry point: applies congruence closure to solve the goal. |
| `elabCCConfig` | `ConfigElab CCConfig` | Elaborates configuration arguments for `cc`. |
| `tactic cc` | Elaborated tactic syntax | User-facing tactic: `cc` or `cc { ... }`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk*`: constructors / initializers (`mkCore`, `mkUsingHs`, `mkUsingHsCore`)
  - `is*`: boolean queries (`isEqv`, `isNotEqv`)
  - `eqc*`: equivalence class operations (`eqcOf`, `eqcSize`, `eqcOfCore`)
  - `foldEqc*`: traversal over equivalence classes
  - `proofFor*`, `refutationFor*`: proof construction for `True`/`False`
  - `internalize`: term insertion into graph
  - `incGMT`: state mutation (increment global modification time)

- **Suffixes**:
  - `Core`: internal/helper versions (e.g., `mkCore`, `rootsCore`, `eqcOfCore`)
  - `M`: monadic variants (e.g., `foldEqcM`)
  - `H`: hypothesis-related (e.g., `mkUsingHs`, `mkUsingHsCore`)

---

#### **3. Tactic Stack**

- **Core tactics used internally**:
  - `instantiateLCtxMVars`, `instantiateMVars`: for resolving metavariables in context/terms.
  - `withMainContext`, `liftMetaFinishingTactic`: for tactic composition and context management.
  - `mkAppM`, `mkAppOptM`: for constructing application terms (proof terms).
  - `throwError`, `unless`: for error handling and conditional logic.
  - `do`-notation monadic chaining.

- **No external tactic invocations** — `cc` is implemented *entirely* in the `MetaM` monad using low-level Lean metaprogramming.

- **No use of `simp`, `ring`, `aesop`, etc.** — it is a *self-contained* decision procedure.

---

#### **4. Proof Logic / Algorithm Flow**

1. **Context Extraction**:
   - Introduce all local hypotheses (`intros`).
   - Instantiate metavariables in the local context and goal.

2. **Graph Initialization**:
   - Initialize `CCState` with `True` and `False` internalized.
   - For each hypothesis `h : Prop`, internalize `h` and add it as an equality constraint (via `add`).

3. **Goal Internalization**:
   - Internalize the goal term `t` into the equality graph.

4. **Consistency Check**:
   - If inconsistent (`s.inconsistent`), extract a proof of `False` and apply `False.elim`.

5. **Goal Equivalence to `True`**:
   - Check if `t` ≡ `True` in the closure.
   - If yes, extract proof of `t = True`, apply `of_eq_true`.

6. **Failure**:
   - If neither `True` nor inconsistent, fail with optional debug info (equivalence classes).

- **Internally**, the equality graph uses:
  - Union-find (via `CCM` monad) for equivalence classes.
  - Congruence closure: if `a = b`, then `f(a) = f(b)` for all function symbols `f`.
  - Special reasoning for `Nat` (e.g., injectivity of `succ`, disjointness of `zero`/`succ`).

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.CC.Addition` | Provides auxiliary definitions (e.g., `CCM`, `CCState`, `CCConfig`, internal graph structures). |
| `Lean Meta Elab Tactic Std` | Core Lean metaprogramming infrastructure: `MetaM`, `MVarId`, elaboration, tactic combinators. |
| `open Lean Meta Elab Tactic Std` | Brings key modules into scope for internal use. |

- **No external libraries** beyond Lean’s metaprogramming framework and internal `CCM`/`CCState` modules.
- The `CCM` monad (Congruence Closure Machine) is defined in `Mathlib.Tactic.CC.Addition`.

---

### Summary

The `cc` tactic is a **finishing decision procedure** based on **congruence closure**, implemented via a custom equality graph with union-find and congruence closure rules. It is highly specialized, self-contained, and optimized for solving goals built from equalities and propositional reasoning. Its correctness relies on foundational work by Nelson–Oppen and de Moura–Selsam.