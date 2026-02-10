Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `irreducible_def` Implementation**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `delta% t` | Elaborates to a *head-delta-reduced* version of `t`. Used to normalize terms up to definitional equality at the head. |
| `eta_helper f = (· + 3)` | Elaborates to `∀ x, f x = x + 3`. Converts an equation involving a function into an eta-expanded universal statement. |
| `val_proj x` | Elaborates to `@x.val`, the primitive projection from a `Subtype`. Used to extract the underlying value from a subtype witness. |
| `stop_at_first_error` | Command combinator: executes a sequence of commands and stops after the first error. Ensures safe incremental elaboration. |
| `irreducible_def` | **Main macro**: introduces a definition that does *not* reduce definitionally, but provides a `_def` lemma for rewriting. Generates: <br> • A constant `n : τ` <br> • A theorem `n_def : n = rhs` (via `eta_helper`) <br> • Wraps the definition in a `Subtype` to enforce irreducibility via `attribute [irreducible]`. |

#### **2. Naming Conventions**

- **`_def` suffix**: Used for the generated definitional lemma (e.g., `frobnicate_def`).
- **`wrapped`**: Internal constant naming for the `Subtype`-wrapped definition.
- **`definition`**: Internal constant name for the underlying reducible definition.
- **`val_proj`**: Prefix for projection from `Subtype`.
- **`eta_helper` / `delta%`**: Macro-specific prefixes for auxiliary elaborators.

#### **3. Tactic Stack**

Frequently used tactics & elaboration primitives:
- `delta` — used in proofs to reduce the definitionally irreducible constant.
- `rw [...]` — rewriting using the `Subtype.ext` lemma.
- `rfl` — for reflexivity after rewriting.
- `intros` — to introduce variables before delta/rewriting.
- `mkForallFVars`, `mkEq`, `mkAppN`, `headBeta`, `instantiateMVars`, `synthesizeSyntheticMVars` — internal meta-programming utilities.
- `eqns` attribute — used to register the `_def` lemma for equation compiler usage.

#### **4. Proof Logic / Strategy**

- **Definition Phase**:
  - Elaborate the user-provided definition as a *normal* `def` (named `definition`).
  - Introduce an `opaque wrapped : Subtype (Eq @definition)` and define `n := val_proj @wrapped`.
- **Irreducibility Enforcement**:
  - Mark both `n` and `definition` as `[irreducible]` to prevent reduction.
  - Prove `n_def : n = rhs` using:
    - `intros`
    - `delta n` (which reduces `n` to `val_proj wrapped`)
    - Rewrite using `Subtype.ext` to show `wrapped = ⟨definition, rfl⟩`
    - Conclude with `rfl`.
- **Equation Registration**:
  - Attach `eqns` attribute to `n` using `n_def`, enabling equation compiler support (e.g., for `simp`, `induction`, etc.).

#### **5. Imports & Dependencies**

- `Mathlib.Tactic.Eqns` — for `eqns` attribute and equation compiler integration.
- `Mathlib.Data.Subtype` — for `Subtype`, projections (`val`), and extensionality (`Subtype.ext`).

---

This file implements a *metaprogramming pattern* for *definitional abstraction*: definitions that behave like constants (non-reducing) but retain equational reasoning support via a generated lemma. It leverages Lean’s elaboration and tactic monad to orchestrate safe, incremental command elaboration and proof generation.