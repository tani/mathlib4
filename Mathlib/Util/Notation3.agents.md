### Technical Metadata Brief: `notation3` Macro in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `expand_binders%` | Syntax macro that expands binder lists into nested `fun` abstractions (e.g., simulating `∃ x y, P x y`). Used to support scoped binder notation. |
| `expand_foldl`, `expand_foldr` | Macros implementing left/right fold expansion over a list of terms, substituting `x` (accumulator) and `y` (element) in a given body. |
| `MatchState` | Structure holding state during pattern matching/delaboration: variable assignments (`vars`), scoped binder accumulation (`scopeState`), and fold arrays (`foldState`). |
| `Matcher` | Type alias for `MatchState → DelabM MatchState`, representing delaboration functions used in pattern matching. |
| `matchVar`, `matchExpr`, `matchFVar`, `matchTypeOf`, `natLitMatcher`, `matchApp`, `matchForall`, `matchLambda` | Primitive matcher combinators for constructing delaborators. Each corresponds to a syntactic or semantic feature (e.g., variable binding, application, lambda, pi). |
| `matchScoped`, `matchFoldl`, `matchFoldr` | Composite matchers for handling `scoped`, `foldl`, and `foldr` notation constructs. |
| `exprToMatcher`, `mkExprMatcher`, `mkScopedMatcher`, `mkFoldlMatcher`, `mkFoldrMatcher` | Functions that generate `Matcher` terms from Lean expressions or syntax trees, used to build delaborators for `notation3`. |
| `notation3` | Main command that declares Lean-3-style notation, generating a `syntax`, `macro_rules`, and optionally a `delaborator`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `match*`: Matcher combinators (`matchVar`, `matchApp`, `matchLambda`, etc.)
  - `mk*`: Functions constructing matchers or syntax (`mkExprMatcher`, `mkScopedMatcher`, `mkNameFromSyntax`)
  - `expand_*`: Expansion macros for binder/fold handling (`expand_binders%`, `expand_foldl%`, `expand_foldr%`)
- **Suffixes**:
  - `%`: Indicates macros (e.g., `expand_binders%`, `expand_foldl%`)
  - `Opt`: Optional variant (e.g., `prettyPrintOpt`)
  - `Item`: Syntactic element in `notation3Item`
- **Variables**:
  - `lit`, `x`, `y`, `scopeId`: Conventional names for pattern variables in matchers.
  - `s`: Standard variable for `MatchState`.

---

#### **3. Tactic Stack**

Frequent tactics used in macro elaboration and matcher construction:

| Tactic / Function | Role |
|-------------------|------|
| `replaceM` | Substitutes identifiers in syntax/expressions with stored values (e.g., for binder/fold substitution). |
| `withAppFn`, `withAppArg`, `withBindingDomain`, `withBindingBodyUnusedName'` | Helpers for destructuring and traversing expressions (apps, lambdas, pis). |
| `guard`, `failure`, `pure` | Control flow in `DelabM`/`TermElabM`. |
| `withLCtx`, `withTheReader SubExpr`, `withType` | Context management during delaboration. |
| `mkFreshFVarId`, `mkLocalDecl`, `instantiateMVars`, `inferType` | Meta-level term construction and type inference. |
| `logException`, `trace[notation3]` | Debugging and error reporting. |
| `liftMacroM`, `liftTermElabM`, `runTermElabM` | Monad lifting for cross-stage operations. |

---

#### **4. Proof Logic / Elaboration Flow**

The `notation3` command follows this high-level logic:

1. **Parse `notation3Item`s**:
   - Distinguish string literals, binder placeholders (`(...)`), scoped binders (`scoped`), and fold actions (`foldl`/`foldr`).
   - Build:
     - `syntaxArgs`: for the generated `syntax` declaration.
     - `pattArgs`: for the `macro_rules` pattern.
     - `boundIdents`, `boundValues`, `boundNames`, `boundType`: metadata for delaboration.

2. **Generate `syntax` declaration**:
   - Uses `mkNameFromSyntax` to derive a unique name.
   - Elaborates a `syntax` command with precedence, priority, and attributes.

3. **Generate `macro_rules`**:
   - Constructs a macro pattern (`pat`) from `pattArgs`.
   - Substitutes bound identifiers in the RHS (`val`) using `boundValues`.
   - Wraps in `section` if local notation.

4. **Generate delaborator (if `prettyPrint := true`)**:
   - Builds matchers for each `notation3Item`:
     - `mkExprMatcher` for the RHS.
     - `mkScopedMatcher`, `mkFoldlMatcher`, `mkFoldrMatcher` for special constructs.
   - Assembles matchers in reverse order using `>=>`.
   - Constructs the final delaborator term:
     - For normal vars: `MatchState.delabVar s n (some e) >>= fun x => ...`
     - For folds: `let x := (getFoldArray s n).reverse; ...`
     - For binders: `extBinders| $$(getBinders s)*`
   - Registers the delaborator via `delab` attribute.

---

#### **5. Imports & Scope**

**Primary Imports**:
```lean
import Lean.Elab.BuiltinCommand
import Lean.Elab.MacroArgUtil
import Mathlib.Lean.Elab.Term
import Mathlib.Lean.PrettyPrinter.Delaborator
import Mathlib.Tactic.ScopedNS
import Batteries.Linter.UnreachableTactic
import Batteries.Util.ExtendedBinder
import Batteries.Lean.Syntax
```

**Scope & Dependencies**:
- Built on top of Lean’s elaboration monads (`TermElabM`, `DelabM`, `CommandElabM`).
- Uses `Mathlib.Lean.PrettyPrinter.Delaborator` for custom delaboration.
- Leverages `Batteries.ExtendedBinder` for binder syntax (`extBinder`, `extBinderParenthesized`).
- Designed for backward compatibility with Lean 3 notation; **not recommended for new code**.

---

### Summary

The `notation3` command is a **domain-specific macro system** for Lean 4 that emulates Lean 3-style notation, including scoped binders, folds, and custom delaborators. It is built around a **matcher-based delaboration engine**, where patterns are matched against expressions using a custom state monad (`MatchState`). While powerful, it is marked as experimental and legacy in Mathlib.