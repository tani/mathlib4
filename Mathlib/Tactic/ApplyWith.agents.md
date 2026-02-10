**Technical Metadata Brief: `Mathlib.Tactic.applyWith`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `applyWith` | `tactic` (elaborator) | A custom tactic that wraps `apply`, allowing users to supply an `ApplyConfig` via `config := cfg`. Enables fine-grained control over the behavior of `apply`. |

- **`ApplyConfig`**: An inductive/structure type (imported from `Lean.Meta`) that configures how `apply` behaves (e.g., whether to infer implicit arguments, use eta-expansion, etc.).
- **`evalApplyLikeTactic`**: A helper function (from `Lean.Elab.Tactic`) used to execute tactic-like `apply`-style operations with a given configuration.

---

### 2. **Naming Conventions**

- **Prefix**: `applyWith` — follows Lean’s convention of appending `With` to indicate extensibility via configuration (e.g., `simpWith`, `rwWith`).
- **Syntax keyword**: `config :=` — aligns with Lean’s standard config syntax (e.g., `simp (config := { ... })`).
- **Internal naming**: `cfg:term`, `e:term` — standard for term arguments in tactic elaborators.

---

### 3. **Tactic Stack / Tactics Used**

- `unsafe evalTerm` — to evaluate the user-provided configuration term into an `ApplyConfig` value.
- `mkConst ``ApplyConfig` — constructs a constant reference to `ApplyConfig`.
- `evalApplyLikeTactic` — the core execution engine for `apply`-style tactics with config.
- Lambda application: `(·.apply · cfg)` — applies the `apply` method of the tactic monad with the config.

> *Note*: No high-level tactics (`simp`, `rw`, `induction`, etc.) appear here — this is a low-level tactic *elaborator*, not a composed tactic.

---

### 4. **Proof Logic / Elaboration Flow**

1. **Parse** the syntax: `"apply (config := " cfg:term ") " e:term`.
2. **Evaluate** `cfg` as a term of type `ApplyConfig` using `unsafe evalTerm`.
3. **Evaluate** `e` as a term to be applied (implicitly via `evalApplyLikeTactic`).
4. **Invoke** the underlying `apply` tactic with the provided config:  
   `evalApplyLikeTactic (fun f a => f a cfg) e`.

> This is a *metaprogramming* pattern: the tactic elaborator translates user syntax into a call to a lower-level tactic engine with extra parameters.

---

### 5. **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Base definitions (likely for compatibility with older Lean 4 versions). |
| `Lean.Elab.Eval` | Provides `unsafe evalTerm`, used to evaluate user terms at elaboration time. |
| `Lean.Elab.Tactic.ElabTerm` | Supplies `evalApplyLikeTactic`, the core engine for `apply`-like tactics. |

> **Scope**: This module is part of `Mathlib.Tactic`, indicating it extends Lean’s built-in tactic language with Mathlib-specific enhancements.

---

### Summary

`applyWith` is a **metaprogrammed tactic** that extends `apply` with configurability via `ApplyConfig`. It exemplifies Lean’s extensible tactic framework: low-level elaboration + reuse of core tactic infrastructure. Its design is minimal, safe (aside from `unsafe evalTerm`), and consistent with Lean’s config-based extensibility patterns.