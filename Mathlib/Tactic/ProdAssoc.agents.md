### Technical Metadata Brief: `prod_assoc%` Term Elaborator in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ProdTree` | `inductive` | Encodes iterated products as a binary tree of types and universe levels. |
| `ProdTree.getType` | `ProdTree → Expr` | Recursively constructs the `Expr` representing the full product type. |
| `ProdTree.size` | `ProdTree → Nat` | Counts the number of atomic types (leaves) in the product tree. |
| `ProdTree.components` | `ProdTree → List Expr` | Returns the list of atomic types (leaves), in left-to-right order. |
| `mkProdTree` | `Expr → MetaM ProdTree` | Parses an expression (e.g., `(α × β) × γ`) into a `ProdTree`. |
| `ProdTree.unpack` | `Expr → ProdTree → MetaM (List Expr)` | Given a term `t` of type `P.getType`, returns the list of projections to each leaf component. |
| `ProdTree.pack` | `List Expr → ProdTree → MetaM Expr` | Constructs a term of type `P.getType` from a list of terms for each leaf. |
| `ProdTree.convertTo` | `ProdTree → ProdTree → Expr → MetaM Expr` | Converts a term from one product tree to another via unpack → pack. |
| `mkProdFun` | `Expr → Expr → MetaM Expr` | Constructs the function `a → b` between two iterated products of same components. |
| `mkProdEquiv` | `Expr → Expr → MetaM Expr` | Constructs the equivalence `a ≃ b` using `mkProdFun` in both directions and trivial homotopies. |
| `elabProdAssoc` | `TermElab` | Term elaborator for `prod_assoc_internal%`, used by `prod_assoc%`. |
| `prod_assoc%` | Macro | User-facing syntax for generating "obvious" equivalences between iterated products. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk*`: Construction functions (`mkProdTree`, `mkProdFun`, `mkProdEquiv`).
  - `ProdTree.*`: Methods on the `ProdTree` inductive type.
- **Suffixes**:
  - `*%`: Indicates macros or elaborators (`prod_assoc%`, `prod_assoc_internal%`).
  - `*?`: Optional/unification-aware variants (e.g., `expectedType?`, `type?`).
- **Internal naming**:
  - `internal%` suffix used for low-level elaborator syntax.
  - `isDefEq`, `whnfD`, `consumeMData`: Lean metaprogramming conventions.

---

#### **3. Tactic Stack (Metaprogramming)**

Frequently used Lean metaprogramming tactics/functions:

| Tactic / Function | Purpose |
|-------------------|---------|
| `whnfD` | Weak head normal form with definitional equality check. |
| `isDefEq` | Definitional equality test. |
| `withLocalDeclD` | Introduces a local variable with inferred type. |
| `mkAppN`, `.app`, `.const` | Building expressions via application and constants. |
| `throwError`, `tryPostponeIfHasMVars?` | Error handling and metavariable postponement. |
| `consumeMData` | Strips metadata from expressions (e.g., coercions). |
| `toArray[:n]`, `toArray[n:]` | List slicing for splitting component lists. |
| `zip` | Pairwise iteration over component lists. |

No high-level tactics like `simp`, `ring`, or `aesop` are used—this is purely metaprogramming logic.

---

#### **4. Proof Logic / Elaboration Flow**

The core logic follows this pattern:

1. **Parse input types**:
   - Extract `a`, `b` from expected type `a ≃ b`.
   - Convert both to `ProdTree`s via `mkProdTree`.

2. **Validate structure**:
   - Ensure same number of components (`components.length`).
   - Ensure each component type is definitionally equal (`isDefEq`).

3. **Construct function**:
   - Introduce a local variable `t : a`.
   - Unpack `t` into components using `P1.unpack`.
   - Pack those components into `P2` using `P2.pack`.
   - Lambda-abstract to get `a → b`.

4. **Construct inverse**:
   - Repeat steps 3 with `a` and `b` swapped.

5. **Construct equivalence**:
   - Use `Equiv.mk` with forward/backward maps and proofs of inverses (here, `rfl` since maps are definitional inverses).

6. **Elaborator behavior**:
   - Postpones elaboration if metavariables remain in expected type.
   - Requires expected type to be of the form `α ≃ β`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Lean.Expr.Basic` | Core expression utilities (e.g., `whnfD`, `type?`, `consumeMData`). |
| `Mathlib.Logic.Equiv.Defs` | Definitions for `Equiv`, including `Equiv.mk`, `rfl`, etc. |

**Scope**: This module is part of Lean’s metaprogramming infrastructure, specifically for *term elaboration* of product equivalences. It does not depend on `Mathlib` analysis or algebra libraries—only on low-level Lean internals.

---

#### **6. Example Use Cases**

```lean
-- Obvious associativity / rebracketing
example : (α × β) × (γ × δ) ≃ α × (β × γ) × δ :=
  prod_assoc%

-- Chaining with `Equiv.trans`
example : (α × β) × (γ × δ) ≃ α × β × γ × δ :=
  (prod_assoc% : _ ≃ α × β × γ × δ).trans prod_assoc%
```

The elaborator is *definitional* in the sense that the forward and inverse maps reduce definitionally to compositions of `Prod.fst`/`Prod.snd` and `Prod.mk`.

--- 

Let me know if you'd like a formalized version of this metadata in Lean or a diagram of the data flow.