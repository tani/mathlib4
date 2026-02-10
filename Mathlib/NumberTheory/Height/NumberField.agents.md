### Technical Brief: `NumberField.lean` — Heights over Number Fields

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `multisetInfinitePlace K` | `Multiset (AbsoluteValue K ℝ)` | Encodes all infinite places of a number field `K` as absolute values, weighted by their multiplicity (`v.mult`). |
| `mem_multisetInfinitePlace` | `v ∈ multisetInfinitePlace K ↔ IsInfinitePlace v` | Characterizes membership in the multiset of infinite places. |
| `count_multisetInfinitePlace_eq_mult` | `(multisetInfinitePlace K).count v.val = v.mult` | Relates multiset count to place multiplicity. |
| `prod_multisetInfinitePlace_eq` | `((multisetInfinitePlace K).map f).prod = ∏ v : InfinitePlace K, f v.val ^ v.mult` | Converts product over multiset to indexed product over places. |
| `instAdmissibleAbsValues` | `AdmissibleAbsValues K` | Constructs the admissible absolute values structure for number fields (required for height theory). |
| `prod_archAbsVal_eq` | `(archAbsVal.map f).prod = ∏ v : InfinitePlace K, f v.val ^ v.mult` | User-facing version of `prod_multisetInfinitePlace_eq`. |
| `prod_nonarchAbsVal_eq` | `(∏ᶠ v : nonarchAbsVal, f v.val) = ∏ᶠ v : FinitePlace K, f v.val` | Equates finite (non-archimedean) product over `nonarchAbsVal` with finite places. |
| `mulHeight₁_eq` | `mulHeight₁ x = (∏ v : InfinitePlace K, max (v x) 1 ^ v.mult) * ∏ᶠ v : FinitePlace K, max (v x) 1` | Recovers the classical multiplicative height on a single element. |
| `mulHeight_eq` | `mulHeight x = (∏ v : InfinitePlace K, (⨆ i, v (x i)) ^ v.mult) * ∏ᶠ v : FinitePlace K, ⨆ i, v (x i)` | Classical height on tuples (nonzero), using suprema over coordinates. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `multisetInfinitePlace`, `prod_multisetInfinitePlace_eq`: emphasize construction from infinite places.
  - `archAbsVal`, `nonarchAbsVal`: standard for archimedean/non-archimedean parts.
  - `mulHeight₁`, `mulHeight`: multiplicative height variants (single vs tuple).
- **Suffixes**:
  - `_eq`: lemmas equating two expressions (often simplifying or expanding definitions).
  - `_mem`, `_count`: membership and counting lemmas for multisets.
- **Variables**:
  - `K` is always a `Field K` + `[NumberField K]`.
  - `v` ranges over places (infinite or finite), often as `InfinitePlace K` or `FinitePlace K`.
  - `x`, `x i` denote elements or tuples in `K`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` / `simp only`: heavily used to unfold definitions (`Height.mulHeight₁_eq`, `prod_archAbsVal_eq`, etc.).
  - `rw`: rewriting with lemmas like `prod_multisetInfinitePlace_eq`, `count_multisetInfinitePlace_eq_mult`.
  - `exact`, `intro`, `intro v`, `intro hx`: standard intro/apply flow.
  - `classical`: used in `prod_multisetInfinitePlace_eq` to enable classical reasoning (e.g., for multiset deduplication).
  - `Finset.prod_multiset_map_count`, `Finset.prod_bij'`: advanced finset/multiset product lemmas.
  - `rfl`, `rfl`: for definitional equalities.

No heavy automation (e.g., `aesop`, `linarith`) is used—proofs are mostly definitional and structural.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Construct multiset of infinite places** (`multisetInfinitePlace`) from `InfinitePlace K` with multiplicities.
  2. **Establish basic properties** (`mem_`, `count_`) via `simp` and `decidable` reasoning.
  3. **Convert multiset product to indexed product** (`prod_multisetInfinitePlace_eq`) using bijection lemmas (`Finset.prod_bij'`) and counting.
  4. **Instantiate `AdmissibleAbsValues`**:
     - `archAbsVal := multisetInfinitePlace K`
     - `nonarchAbsVal := {v | IsFinitePlace v}`
     - Verify axioms: `isNonarchimedean`, `mulSupport_finite`, and crucially `product_formula` via `prod_multisetInfinitePlace_eq`.
  5. **Derive height formulas** (`mulHeight₁_eq`, `mulHeight_eq`) by unfolding definitions and applying `prod_archAbsVal_eq`, `prod_nonarchAbsVal_eq`.

- **Induction**: Not used—proofs rely on algebraic properties of places and multisets.

---

#### **5. Imports**

- `Mathlib.NumberTheory.NumberField.ProductFormula`: Provides `prod_abs_eq_one` (product formula for nonzero elements).
- `Mathlib.NumberTheory.Height.Basic`: Defines `Height.AdmissibleAbsValues`, `mulHeight₁`, `mulHeight`, and related API.

These imports fix the ambient context: height theory over admissible absolute values, and number field place theory.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[NumberField.lean] --> B[Mathlib.NumberTheory.NumberField.ProductFormula]
  A --> C[Mathlib.NumberTheory.Height.Basic]
  C --> D[Height.AdmissibleAbsValues]
  B --> E[Product Formula: ∏_v |x|_v = 1]
```

##### **Overview of Theory Flow**

```mermaid
flowchart LR
  NumberField[K] --> InfinitePlace[K] --> multisetInfinitePlace[K]
  NumberField[K] --> FinitePlace[K] --> nonarchAbsVal[K]
  multisetInfinitePlace[K] --> archAbsVal --> instAdmissibleAbsValues
  FinitePlace[K] --> nonarchAbsVal --> instAdmissibleAbsValues
  instAdmissibleAbsValues -->|axiom| product_formula
  product_formula --> mulHeight₁_eq & mulHeight_eq
```

##### **Height Construction Pipeline**

```mermaid
flowchart LR
  x:K -->|apply| v:AbsoluteValue --> max(v x) 1
  InfinitePlace -->^mult^--> exponentiate
  FinitePlace -->^finite product^--> ∏ᶠ
  InfinitePlace & FinitePlace --> mulHeight₁ x
```

---

#### **7. Summary**

This module formalizes the archimedean and non-archimedean absolute value structures on a number field `K`, verifies the admissibility conditions required for height theory, and derives the standard multiplicative height formulas (for single elements and tuples). It bridges abstract height theory (`Height.AdmissibleAbsValues`) with concrete number field arithmetic via infinite/finite places and their multiplicities. The proofs are largely definitional, leveraging Lean’s multiset and finset libraries, and rely on the product formula from `ProductFormula`.
