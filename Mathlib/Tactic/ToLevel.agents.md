### Technical Metadata Brief: `Lean.ToLevel` Class (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ToLevel.{u}` | `class ToLevel.{u} where toLevel : Level` | A typeclass to construct `Level` terms representing universe levels `u`. Enables universe-polymorphic level construction. |
| `toLevel` | `toLevel.{u} [ToLevel.{u}] : Level` | Projection of the class; yields a `Level` term denoting the universe level `u`. |
| `instance : ToLevel.{0}` | `ToLevel zero` | Base case: universe level `0`. |
| `instance [ToLevel.{u}] : ToLevel.{u+1}` | `ToLevel (succ u)` | Inductive step: successor level construction. |
| `def ToLevel.max [ToLevel.{u}] [ToLevel.{v}] : ToLevel.{max u v}` | `ToLevel (max u v)` | Constructs level for `max u v`; *not* an instance to avoid divergence. |
| `def ToLevel.imax [ToLevel.{u}] [ToLevel.{v}] : ToLevel.{imax u v}` | `ToLevel (imax u v)` | Constructs level for `imax u v`; *not* an instance to avoid divergence. |

> **Note**: `imax` is Lean’s internal *implicit max* (used for universe polymorphism in inductive types), distinct from `max`.

---

#### **2. Naming Conventions**

- **Class name**: `ToLevel` — follows Lean’s `To*` pattern (e.g., `ToExpr`, `ToFunctor`) for typeclasses that *convert* a meta-level concept (universe level) into a syntax term.
- **Field name**: `toLevel` — standard getter for the constructed term.
- **Instance/def prefixes**: `ToLevel.` — namespaced under `Lean.ToLevel`.
- **No `is_` or `has_` prefix**: Reflects that this is a *constructive* typeclass, not a predicate.

---

#### **3. Tactic Stack**

- **`pp_with_univ` attribute**: Used on:
  - The `ToLevel` class definition
  - The `toLevel` projection  
  → Ensures pretty-printing of `toLevel` terms includes universe parameters (e.g., `toLevel.{u}`), crucial for debugging universe polymorphism.

- **No heavy tactic usage in proofs**: This file is *definitionally* focused (no proofs beyond instance declarations).  
  → Tactics like `aesop`, `simp`, `ring` are *not used* here.

---

#### **4. Proof Logic / Construction Strategy**

- **No proofs required**: All definitions are *computational* and rely on Lean’s `Level` constructors (`zero`, `succ`, `max`, `imax`).
- **Instance resolution strategy**:
  - `ToLevel 0` is explicit.
  - `ToLevel (u+1)` is derived recursively via `succ`.
  - `ToLevel (max u v)` / `imax u v` are *manual* helpers (not instances) to prevent infinite loops during typeclass search (e.g., `ToLevel (max u (u+1))` could diverge if auto-derived).
- **Universe polymorphism**: Achieved via universe parameters `u v` and explicit `.{u}` annotations on `toLevel`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.PPWithUniv` | Provides the `pp_with_univ` attribute for pretty-printing universe parameters in `toLevel`. |

> **Note**: This module is *low-level* and intended for internal use. Users should import `Mathlib.Tactic.ToExpr` instead for `ToExpr`-related work.

---

### Summary

`Lean.ToLevel` is a foundational universe-polymorphic typeclass for constructing `Level` syntax terms, mirroring `ToExpr` for expressions. It avoids automatic inference for `max`/`imax` to prevent divergence, and relies on Lean’s built-in `Level` constructors. Designed for internal use in metaprogramming and library infrastructure, not end-user tactics.