### Technical Metadata Brief: `higher_order` Attribute in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mkComp (v : Expr) : Expr → MetaM Expr` | Constructs a composition expression `f ∘ g ∘ h` from a nested application `f (g (h v))`. Returns `id` if the term is just `v`. Used to abstract variable occurrences into function composition. |
| `mkHigherOrderType (e : Expr) : MetaM Expr` | From a universally quantified equality `∀ x, f (g x) = h x`, derives the pointfree form `f ∘ g = h`. Recursively handles multiple quantifiers (e.g., `∀ x y, f (g x y) = h x y` → `λ x y, f (g x y) = h x y` becomes `f ∘ g = h` under η-expansion). |
| `higherOrderGetParam (thm : Name) (stx : Syntax) : AttrM Name` | Attribute handler for `@[higher_order]`. Instantiates the derived theorem (e.g., `f ∘ g = h`) and registers it as a new declaration with optional user-specified name. Also registers it in `simp` and `functor_norm` if the original lemma is in those sets. |
| `higherOrderAttr : ParametricAttribute Name` | Registered attribute `higher_order`, enabling use like `@[higher_order]` or `@[higher_order my_comp_lemma]`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `mk*`: Construction functions (`mkComp`, `mkHigherOrderType`) — standard Lean convention for meta-level term construction.
  - `higherOrder*`: Attribute and helper names follow the `higher_order` theme.
  - `thm`, `hot`, `prf`, `fvar`: Typical Lean meta-programming variable names (e.g., `thm` = theorem name, `prf` = proof term).
- **Syntax**:
  - `higher_order` is the keyword in syntax and attribute name.
  - Optional user-given name via `ident` in syntax: `higher_order ident`.

---

#### **3. Tactic Stack**

The implementation uses **meta-level tactics** (via `MetaM`, `TermElabM`) rather than user-facing tactics, but the core tactics involved are:

| Tactic / Utility | Usage |
|------------------|-------|
| `intros`, `intro1`, `apply`, `assumption` | Used in constructing the proof term for the derived lemma (e.g., `funext` + intro + apply original theorem + assumption). |
| `mkAppM`, `mkAppOptM`, `mkForallFVars`, `mkEq` | Term construction utilities for building compositions, lambdas, and equalities. |
| `instantiateMVars`, `inferType`, `getConstInfo` | Meta-level type inference and environment introspection. |
| `matchEq?` | Pattern-matching on equalities (from `Lean.Meta.MatchUtil`). |
| `addSimpTheorem`, `addDeclarationRangesFromSyntax`, `addTermInfo` | Registration utilities for derived theorems in `simp` and IDE info. |

---

#### **4. Proof Logic**

The derivation logic follows this flow:

1. **Input validation**:
   - Ensure the input theorem `e` is a `forall` (possibly nested).
2. **Introduce local variable(s)**:
   - Use `withLocalDecl` / `intros` to bind the quantified variable(s) (e.g., `x`).
3. **Extract equality**:
   - Instantiate body and check it’s an equality via `matchEq?`.
4. **Convert LHS and RHS**:
   - Apply `mkComp` to both sides to transform `f (g x)` → `f ∘ g` and `h x` → `h`.
5. **Construct proof**:
   - Introduce a fresh metavariable for the target type `f ∘ g = h`.
   - Apply `funext` to reduce to pointwise equality.
   - Introduce the variable, apply the original theorem, and discharge remaining goals via `assumption`.
6. **Register derived theorem**:
   - Add as a new theorem declaration.
   - Optionally register in `simp` or `functor_norm` if the original was registered there.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Lean.Elab.Term` | Term elaboration utilities (e.g., `TermElabM`, `inferType`). |
| `Lean.Meta.Tactic.Apply`, `.Assumption`, `.Intro` | Tactics used in proof construction. |
| `Lean.Meta.MatchUtil` | For `matchEq?`, pattern-matching on equalities. |
| `Lean.Elab.DeclarationRange` | For `addDeclarationRangesFromSyntax`, linking syntax to declarations. |
| `Mathlib.Tactic.Attr.Register` | For registering user attributes (`registerParametricAttribute`). |

---

### Summary

This file defines a **Lean 4 attribute** (`@[higher_order]`) that automatically transforms lemmas of the form  
`∀ x, f (g x) = h x`  
into pointfree lemmas  
`f ∘ g = h`,  
facilitating reasoning about higher-order functions. It leverages Lean’s meta-programming capabilities to parse, transform, and register derived theorems, including integration with simplification and normalization extensions.