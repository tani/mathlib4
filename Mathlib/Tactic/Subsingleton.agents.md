### Technical Metadata Brief: `subsingleton` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Lean.Meta.mkSubsingleton` | `Expr → MetaM Expr` | Constructs the expression `Subsingleton ty` for a given type `ty`. |
| `Lean.Meta.synthSubsingletonInst` | `Expr → Array (Term × AbstractMVarsResult) → MetaM Expr` | Synthesizes a `Subsingleton ty` instance using provided local instances and fresh metavariables. |
| `Lean.MVarId.subsingleton` | `MVarId → Array (Term × AbstractMVarsResult) → MetaM Unit` | Closes equality (`Eq`) or heterogeneous equality (`HEq`) goals using subsingleton reasoning. |
| `Mathlib.Tactic.elabSubsingletonInsts` | `Option (Array Term) → TermElabM (Array (Term × AbstractMVarsResult))` | Elaborates user-provided instance terms into a structured list of `(term, abstracted metavariables)` pairs. |
| `proof_irrel` | `∀ {α : Prop} (x y : α), x = y` | Proof irrelevance for propositions. |
| `proof_irrel_heq` | `∀ {α β : Prop} (x : α) (y : β), HEq x y` | Heterogeneous proof irrelevance for propositions. |
| `Subsingleton.elim` | `∀ {α : Sort u} [h : Subsingleton α] (x y : α), x = y` | Elimination principle for subsingletons. |
| `lawful_beq_subsingleton` | `∀ {α : Sort u} [BEq α] [LawfulBEq α] (x y : α), x = y` | Equality of lawful `BEq` instances. |

---

#### **2. Naming Conventions**

- **Predicates / Properties**:  
  - `Subsingleton`, `LawfulBEq`, `BEq` — standard typeclass names.
- **Instance Synthesis Helpers**:  
  - `mkSubsingleton`, `synthSubsingletonInst` — follow Lean’s `mk*` / `synth*` naming pattern.
- **Tactic Logic Helpers**:  
  - `subsingleton` — main tactic name.
  - `elabSubsingletonInsts`, `elabSubsingletonInsts.go` — elaboration helpers.
- **Internal Helpers**:  
  - `recover`, `withNewMCtxDepth`, `withLocalDeclsD`, `instantiateLevelMVars`, `abstract`, `beta` — standard Lean metaprogramming utilities.

---

#### **3. Tactic Stack**

Frequently used tactics and metaprogramming utilities:

| Tactic / Utility | Usage |
|------------------|-------|
| `intros` | Intro all variables before applying reasoning. |
| `whnfR` | Weak head normal form reduction on the goal type. |
| `synthInstance` | Typeclass synthesis for `Subsingleton`, `LawfulBEq`. |
| `mkApp*` / `mkApp3`, `mkApp4`, `mkApp5` | Construct application terms for theorems like `Subsingleton.elim`, `lawful_beq_subsingleton`. |
| `abstract`, `instantiateRev`, `instantiateLevelMVars` | Handle metavariables and local context abstraction. |
| `withNewMCtxDepth`, `withLocalDeclsD`, `withNewLocalInstances` | Manage metavariable scoping and local instances. |
| `commitIfNoEx`, `try`, `catch`, `failure` | Control flow and error handling. |
| `isProp`, `isAppOfArity`, `eq?`, `heq?` | Goal analysis and type introspection. |
| `refl`, `hrefl` | Fallback tactics when `subsingleton` fails. |

---

#### **4. Proof Logic / Strategy**

The `subsingleton` tactic follows this logical flow:

1. **Normalize Goal**:  
   - Converts `x = y` to `HEq x y` (via `heqOfEq`) for uniform handling.
   - Reduces the goal type to weak head normal form.

2. **Case Analysis**:
   - **Equality (`Eq`)**:
     - If the type is a proposition (`isProp`), use `proof_irrel`.
     - Else, try `Subsingleton.elim` with synthesized instance.
     - If the type is `BEq α`, try `lawful_beq_subsingleton` with `LawfulBEq` instances for both sides.
   - **Heterogeneous Equality (`HEq`)**:
     - If both types are propositions, use `proof_irrel_heq`.
     - Otherwise, fail.

3. **Fallback**:
   - If all else fails and recovery is enabled, try `refl`/`hrefl`, and suggest a tactic like `intros; rfl`.

4. **Instance Handling**:
   - Elaborates user-provided instances, abstracts metavariables, and ensures they are well-typed typeclass instances.
   - Uses `withNewMCtxDepth` to avoid specializing universe levels (e.g., `Sort _` → `Prop`).

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Logic.Basic` | Provides core logic utilities (e.g., `Subsingleton`, `BEq`, `LawfulBEq`, `HEq`, `proof_irrel`, etc.). |
| `Lean.Meta` | Core metaprogramming utilities (`synthInstance`, `whnfR`, `mkApp`, etc.). |
| `Lean.Elab.Tactic` | Elaboration and tactic infrastructure (`elabTerm`, `TermElabM`, `Tactic.liftMetaTactic1`, etc.). |

---

### Summary

The `subsingleton` tactic is a **high-level, goal-directed reasoning tool** for proving equalities in types with at most one element. It intelligently combines:
- **Proof irrelevance** (for propositions),
- **Subsingleton elimination** (via typeclass synthesis),
- **Lawful `BEq` reasoning**, and
- **Heterogeneous equality handling**.

It avoids common pitfalls (e.g., accidental universe specialization) and provides helpful fallback suggestions. Its design reflects Lean’s metaprogramming best practices: robust error handling, metavariable scoping, and instance abstraction.