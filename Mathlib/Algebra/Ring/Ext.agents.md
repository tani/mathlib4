### Technical Brief: Extensionality Lemmas for Ring-Like Structures in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `local_hAdd[R, inst]` | `R → R → R` | Local macro for addition induced by instance `inst` on `R`. |
| `local_hMul[R, inst]` | `R → R → R` | Local macro for multiplication induced by instance `inst` on `R`. |
| `@[ext] Distrib.ext` | `inst₁ = inst₂` | Extensionality for `Distrib` structures: equality follows from equal `add` and `mul`. |
| `@[ext] NonUnitalNonAssocSemiring.ext` | `inst₁ = inst₂` | Extensionality for non-unital non-associative semirings. |
| `toDistrib_injective` | `Function.Injective (@toDistrib R)` | Injectivity of the forgetful functor to `Distrib`. |
| `@[ext] AddMonoidWithOne.ext` | `inst₁ = inst₂` | Extensionality for `AddMonoidWithOne`, using `add` and `one`. |
| `@[ext] AddCommMonoidWithOne.ext` | `inst₁ = inst₂` | Extensionality for `AddCommMonoidWithOne`. |
| `@[ext] NonAssocSemiring.ext` | `inst₁ = inst₂` | Extensionality for non-associative semirings; crucially uses `intCast` determined by `add`/`mul`. |
| `@[ext] AddGroupWithOne.ext` | `inst₁ = inst₂` | Extensionality for `AddGroupWithOne`, handling `intCast`. |
| `@[ext] AddCommGroupWithOne.ext` | `inst₁ = inst₂` | Extensionality for `AddCommGroupWithOne`. |
| `@[ext] NonAssocRing.ext` | `inst₁ = inst₂` | Extensionality for non-associative rings; uses `intCast` and `add`/`mul`. |
| `@[ext] Semiring.ext` | `inst₁ = inst₂` | Extensionality for semirings. |
| `@[ext] Ring.ext` | `inst₁ = inst₂` | Extensionality for rings; uses `SubNegMonoid` structure. |
| `@[ext] NonUnitalNonAssocCommSemiring.ext` | `inst₁ = inst₂` | Extensionality for commutative non-unital non-associative semirings. |
| `@[ext] NonUnitalCommSemiring.ext` | `inst₁ = inst₂` | Extensionality for commutative non-unital semirings. |
| `@[ext] NonUnitalNonAssocCommRing.ext` | `inst₁ = inst₂` | Extensionality for commutative non-unital non-associative rings. |
| `@[ext] NonUnitalCommRing.ext` | `inst₁ = inst₂` | Extensionality for commutative non-unital rings. |
| `@[ext] CommSemiring.ext` | `inst₁ = inst₂` | Extensionality for commutative semirings. |
| `@[ext] CommRing.ext` | `inst₁ = inst₂` | Extensionality for commutative rings. |

**Notable Proof Insight**:  
- For structures with `intCast` (e.g., `NonAssocRing`, `AddGroupWithOne`), the proof shows that `intCast` is *uniquely determined* by `add` and `mul`, which is mathematically nontrivial and essential for extensionality.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `to*`: Forgetful functors (e.g., `toDistrib`, `toSemiring`).
  - `local_hAdd`, `local_hMul`: Macros for extracting operations from instances.
- **Suffixes**:
  - `ext`: Extensionality theorems.
  - `injective`: Injectivity of forgetful maps (e.g., `toSemiring_injective`).
- **Structure Names**:
  - `NonUnital`, `NonAssoc`, `Comm` prefixes denote variants (e.g., `NonUnitalRing`, `NonAssocRing`, `CommRing`).
  - `WithOne`, `WithZero` suffixes denote structures with multiplicative identity or zero.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `ext` | Very High | Function/structure extensionality; often with `: 1` to specify argument. |
| `congr` | High | Prove equality of structured objects by congruence. |
| `injection` | Medium | From equality of constructors, extract equalities of components. |
| `rw` / `rewrite` | Medium | Rewriting using hypotheses or definitions. |
| `funext` | Medium | Function extensionality (e.g., for `natCast`, `intCast`). |
| `induction` | Low | For `natCast` proofs (e.g., base/succ cases). |
| `cases` | Medium | Destructuring instance records. |
| `solve|` | Medium | In `congr`-based proofs, solve subgoals with specific injections. |
| `exact`, `assumption` | Medium | Immediate proof steps. |

---

#### **4. Proof Logic**

- **General Pattern**:
  1. **Decompose** the structure into its constituent typeclass components (e.g., `AddMonoid`, `Mul`, `One`, `NatCast`, `IntCast`).
  2. **Show equality** of each component using:
     - `ext` + `assumption` for operations (`add`, `mul`).
     - `congrArg` to lift equality of structures to equality of fields.
     - `funext` + induction for `natCast`/`intCast`.
  3. **Reconstruct** the full structure using `congr` or `injection`.

- **Special Cases**:
  - **`intCast` Determination**: For rings/ring-like structures with additive inverses, `intCast` is uniquely determined by `add` and `mul`. This is proven via case analysis on `n : ℤ` (positive/negative).
  - **`SubNegMonoid` Handling**: In `Ring.ext`, equality of `SubNegMonoid` is derived from equality of `add`, enabling use of `injection` on `Sub`/`Neg`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Ring.Defs` | Defines all ring-like typeclasses (`Ring`, `Semiring`, `NonUnitalRing`, etc.). |
| `Mathlib.Algebra.Group.Ext` | Provides foundational extensionality lemmas for groups and monoids; serves as a template for this file. |

---

### Summary

This file formalizes **extensionality principles** for a wide spectrum of ring-like algebraic structures in Lean 4, following the pattern established in `Mathlib.Algebra.Group.Ext`. It demonstrates how equality of operations (`add`, `mul`) implies equality of the entire structure—even for complex cases involving `natCast`, `intCast`, or commutativity. The proofs rely heavily on Lean’s typeclass inference, `ext` attributes, and careful decomposition of algebraic structures into their constituent parts.