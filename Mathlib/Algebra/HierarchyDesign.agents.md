### Technical Metadata Brief: `Mathlib.Algebra.Hierarchy`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `library_note "the algebraic hierarchy"` | Module-level documentation note outlining design principles and developer guidelines for extending the algebraic hierarchy in Mathlib. Not a formal definition or theorem, but a *meta-level specification*. |
| `library_note "reducible non-instances"` | Documentation note explaining when definitions that construct class instances should be marked `@[reducible]` to aid type-class inference (e.g., `Preorder.lift`, `PartialOrder.lift`). |
| `library_note "implicit instance arguments"` | Guidance on using `{}` vs `[]` for implicit arguments: `{}` when instances are inferable from other arguments (e.g., `Semiring α` for `f : α →+* β`). |
| `library_note "lower instance priority"` | Policy for assigning low priority (e.g., `100`) to *universal* instances (e.g., `AddCommGroup.toAddGroup`) to avoid performance degradation during type-class resolution. |

> **Note**: No formal theorems or definitions *within* the hierarchy (e.g., `Ring`, `CommRing`, `Submonoid`) appear in this file — it is purely a *developer-facing documentation module*.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `Sub` + class name → subobjects (e.g., `Submonoid`, `Subring`, `Subalgebra`)
  - `MulOpposite`, `ULift`, `Finsupp`, `Pi`, `Prod` → standard type constructors for transferring structures
  - `Equiv.Z`, `Equiv.ZEquiv` → equivalence-based structure transfer
  - `Function.Injective.Z`, `Function.Surjective.Z` → structure transfer along maps
  - `ZCat` → bundled categorical versions (e.g., `AddCommGrp`, `TopCommRingCat`)
  - `toZ` → coercion of structure from ambient type to subobject (e.g., `Submonoid.toCommMonoid`)

- **Abbreviations**:
  - `Z` used as a metavariable for arbitrary algebraic typeclasses (e.g., `Z`, `Monoid`, `Ring`, `CommRing`)

---

#### **3. Tactic Stack**

While this file contains no proofs, it references or implies use of the following tactics in *related* files (e.g., `Mathlib.Algebra.Group.Prod`, `Mathlib.Data.Equiv.TransferInstance`):

| Tactic | Use Case |
|--------|----------|
| `aesop` | Automated proof search for simple algebraic identities |
| `simp_rw` | Rewriting using definitional equalities (e.g., for structure transfers) |
| `ext` | Extensionality for functions, products, pi types |
| `funext` | Extensionality for function spaces |
| `congr` | Congruence closure for definitional equality checks |
| `transport` | (Deprecated/legacy) for transferring structures along equivalences; now superseded by `Equiv.Z` + `transfer_instance` |
| `apply_fun`, `change`, `rw [coe_mul]` | Common in subobject and coercion reasoning |

---

#### **4. Proof Logic**

This file contains **no proofs**, only *guidelines*. However, the *patterns* it describes follow a consistent logical flow in practice:

- **Structure transfer**:
  - *Step 1*: Define a function (e.g., `coe : Submonoid R → R`) or equivalence (`e : α ≃ β`)
  - *Step 2*: Prove coherence lemmas (e.g., `f (x * y) = f x * f y`, `f 1 = 1`)
  - *Step 3*: Use `Function.Injective.Z` / `Equiv.Z` to lift structure
  - *Step 4*: Mark as `abbrev` and optionally `@[reducible]` for inference efficiency

- **Instance design**:
  - Prioritize *local* (shape-specific) instances over *global* ones
  - Use `instance ... := ...` with explicit `where` blocks for uniformity
  - For bundled categories: define `Hom`, `Iso`, `Subobject`, and coercion maps (`of`, `to_type`)

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean infrastructure (e.g., `Prop`, `Type`, `eq`, `funext`) |
| `Batteries.Util.LibraryNote` | Infrastructure for `library_note` declarations (custom attribute for doc-string annotations) |

> **Note**: No algebraic typeclasses (e.g., `Group`, `Ring`) are imported here — this file is *meta-level* and assumes the hierarchy is already defined elsewhere.

---

### Summary

This module is a **developer-facing design note**, not a formalization of algebraic structures. Its purpose is to standardize *how* new algebraic typeclasses and their APIs (instances, subobjects, morphisms, equivalences, categorical enhancements) should be added to Mathlib — with emphasis on modularity, performance, and consistency. It reflects the *engineering culture* of the mathlib project rather than its mathematical content.