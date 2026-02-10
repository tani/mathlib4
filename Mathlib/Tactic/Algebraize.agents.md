### Technical Metadata Brief: `Mathlib.Tactic.Algebraize`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Lean.Attr.algebraizeGetParam` | `Name → Syntax → AttrM Name`<br>Extracts the corresponding `Algebra` property name from a `RingHom` property tagged with `@[algebraize]`. Handles both explicit parameter and implicit naming (`RingHom.P` → `Algebra.P`). |
| `Lean.Attr.algebraizeAttr` | `ParametricAttribute Name`<br>User-defined parametric attribute used to tag `RingHom` properties that can be converted to `Algebra` properties. |
| `Mathlib.Tactic.Algebraize.addAlgebraInstanceFromRingHom` | `Expr → Expr → TacticM Unit`<br>Adds `Algebra A B` instance for a given `RingHom f : A →+* B`, if not already present. |
| `Mathlib.Tactic.Algebraize.addIsScalarTowerInstanceFromRingHomComp` | `Expr → TacticM Unit`<br>Attempts to add `IsScalarTower A B C` for a composition `g.comp f : A →+* C`. |
| `Mathlib.Tactic.Algebraize.addProperties` | `Array Expr → TacticM Unit`<br>Searches local context for hypotheses tagged with `@[algebraize]`, and adds corresponding `Algebra` properties (e.g., `Algebra.FiniteType A B`) if possible. |
| `Mathlib.Tactic.Algebraize.Config` | `Structure`<br>Configuration for `algebraize`, currently only `properties : Bool` (default `true`). |
| `Mathlib.Tactic.algebraize` | `Tactic`<br>Main tactic: given `RingHom`s, adds `Algebra` and `IsScalarTower` instances, and optionally `Algebra`-properties derived from `RingHom`-properties. |
| `Mathlib.Tactic.algebraize_only` | `Macro`<br>Syntactic sugar for `algebraize -properties [...]`, i.e., only adds algebra/scalar tower instances. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `add*InstanceFromRingHom*`: Functions that introduce `Algebra` or `IsScalarTower` instances from `RingHom`s.
  - `algebraize*`: All tactic-related definitions/macros use this prefix.
  - `RingHom.*` / `Algebra.*`: Property names follow this pattern (e.g., `RingHom.Finite`, `Algebra.Finite`).
  - `out` suffix: Used in constructors (e.g., `RingHom.Flat.out`) to project the underlying algebra property.

- **Attribute naming**:
  - `@[algebraize]`: Tags `RingHom` properties.
  - Optional parameter: `@[algebraize Module.Finite]` allows specifying the corresponding `Algebra` property explicitly.

---

#### **3. Tactic Stack**

Frequently used tactics in implementation:

| Tactic | Usage |
|--------|-------|
| `withMainContext` | Wraps tactic logic to operate in the main goal context. |
| `liftMetaTactic` | Embeds metavariable-based construction into tactic monad (e.g., introducing definitions). |
| `synthInstance?` | Checks if an instance exists before adding it (avoids duplication). |
| `mkAppM`, `mkAppOptM` | Constructs applications of constants (e.g., `Algebra`, `RingHom.toAlgebra`). |
| `inferType` | Infers type of an expression (used to validate constructed terms). |
| `isDefEq` | Checks definitional equality (used to match `RingHom`s in `addProperties`). |
| `getConstInfo`, `isInductive` | Inspects declarations to determine if the `algebraize` attribute points to a type or a lemma/constructor. |
| `note` / `define` + `intro1P` | Introduces new local definitions/lemmas in the context. |
| `elabTerm` | Elaborates syntax terms to expressions. |
| `logWarningAt` | Emits warnings (e.g., for empty `algebraize []`). |

---

#### **4. Proof Logic / Tactic Flow**

The `algebraize` tactic proceeds in three phases:

1. **Add `Algebra` instances**:
   - For each term `f` in the input list:
     - Check `f` has type `RingHom A B`.
     - If `Algebra A B` does not exist, construct and introduce it via `RingHom.toAlgebra f`.

2. **Add `IsScalarTower` instances**:
   - For each term `g.comp f` in the input list:
     - Try to construct `IsScalarTower A B C` using `IsScalarTower.of_algebraMap_eq'`.
     - Uses metavariables and `refl` to prove equality of algebra maps.

3. **Add `Algebra`-properties (if `cfg.properties = true`)**:
   - Iterate over local context hypotheses.
   - For each hypothesis `h : RingHom.Property f`:
     - Check if `f` is among the input `RingHom`s.
     - Look up `@[algebraize]` attribute to get corresponding `Algebra.Property`.
     - If the attribute points to an inductive type (defeq), reuse `h`’s type.
     - If it points to a lemma/constructor, apply it to `h` to get the `Algebra` property.
     - Introduce the new `Algebra.Property` instance if not already present.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Algebra.Algebra.Tower
  ```
  - Provides `IsScalarTower`, `algebraMap`, and related infrastructure.

- **Lean/Elab infrastructure**:
  ```lean
  open Lean Elab Tactic Term Meta
  ```
  - Used for tactic elaboration, metavariable manipulation, and environment introspection.

- **No direct imports of `Mathlib.Algebra.Algebra` or `Module`**, but the tactic *assumes* their existence (e.g., `Algebra`, `Module.Finite`, `RingHom.toAlgebra`).

---

### Summary

The `algebraize` tactic automates the introduction of algebraic structure from ring homomorphisms, leveraging Lean’s typeclass resolution and attribute system. It is designed for ergonomic use in algebraic proofs involving towers of rings and module-finiteness, integrality, flatness, etc. Its extensibility via the `@[algebraize]` attribute makes it adaptable to new algebraic properties.