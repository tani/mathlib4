### Technical Metadata Brief: `Mathlib.Data.Ordering.Comparison`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cmpLE` | `{α} [LE α] [DecidableRel (· ≤ ·)] → α → α → Ordering` | Three-way comparison using `≤` instead of `<`. |
| `Ordering.Compares` | `Ordering → α → α → Prop` | Relates an `Ordering` to strict/ equality relations: `lt` ↔ `<`, `eq` ↔ `=`, `gt` ↔ `>`. |
| `linearOrderOfCompares` | `[Preorder α] → (α → α → Ordering) → (∀ a b, cmp a b .Compares a b) → LinearOrder α` | Constructs a `LinearOrder` instance from a preorder and a `cmp`-like function satisfying comparison properties. |
| `cmp` | `[LinearOrder α] → α → α → Ordering` | Standard three-way comparison function for linear orders (defined elsewhere, used here). |
| `cmp_swap` | `(cmp a b).swap = cmp b a` | Symmetry of `cmp` under argument swap. |
| `cmp_compares` | `(cmp a b).Compares a b` | `cmp` always produces a comparison that matches the actual relation between `a` and `b`. |
| `cmp_eq_cmp_symm` | `cmp x y = cmp x' y' ↔ cmp y x = cmp y' x'` | Symmetry of equality of comparisons. |
| `lt_iff_lt_of_cmp_eq_cmp`, `le_iff_le_of_cmp_eq_cmp`, `eq_iff_eq_of_cmp_eq_cmp` | Imply that equal comparisons preserve `<`, `≤`, and `=`. | Core reasoning principles for comparing elements via `cmp`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cmp`: for comparison functions (`cmp`, `cmpLE`, `cmp_swap`, `cmp_toDual`, etc.)
  - `Compares.`: for lemmas about the `Compares` predicate.
  - `swap_`: for properties involving `Ordering.swap`.
  - `orElse_`, `then_`: deprecated aliases (marked with `@[deprecated]`).

- **Suffixes**:
  - `_eq_lt`, `_eq_eq`, `_eq_gt`: relate equality of `cmp` result to `<`, `=`, `>` respectively.
  - `_iff_`: biconditional characterizations (e.g., `cmp_eq_lt_iff`).
  - `_of_`: e.g., `cmp_eq_cmp_symm`, `lt_iff_lt_of_cmp_eq_cmp`.

- **Dual-related**:
  - `toDual_`, `ofDual_`: for behavior under order duality.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage Pattern |
|--------|---------------|
| `by_cases` | To split on decidability of `x ≤ y`, `x < y`, etc. |
| `simp` | Simplification using `cmpLE`, `cmp`, `swap`, `Compares` definitions and lemmas. |
| `cases` | On `Ordering` or `lt_trichotomy` results (`lt`, `eq`, `gt`). |
| `rwa` | Rewrite + assumption (e.g., after applying injectivity or equivalence). |
| `exact`, `intro`, `apply`, `refine` | Standard proof construction. |
| `swap_inj`, `swap_swap`, `eq_comm` | Rewriting with ordering symmetry. |
| `decidable_of_iff` | To derive decidability from equivalence. |
| `lt_trichotomy` | Used to case-split on strict order relations. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Case analysis** on `lt`, `eq`, `gt` via `lt_trichotomy` or `Ordering.cases_on`.
  - **Decidable reasoning**: many proofs assume decidability of `≤` or `<`, then use `by_cases`.
  - **Equational reasoning**: heavy use of `simp` with lemmas like `cmp_eq_lt_iff`, `swap_swap`, `eq_comm`.
  - **Injectivity of `Compares`**: `Compares.inj` is used to equate two `Ordering`s from shared comparison evidence.
  - **Duality handling**: proofs often reduce to dual cases via `toDual`/`ofDual` lemmas (`toDual_compares_toDual`, etc.).

- **Typical flow**:
  1. Unfold definitions (`cmp`, `cmpLE`, `Compares`).
  2. Case split on order relations (`≤`, `<`) using decidability.
  3. Simplify using known equivalences (`cmp_eq_lt_iff`, etc.).
  4. Apply injectivity or antisymmetry to conclude.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Data.Ordering.Basic` | Core definitions: `Ordering`, `swap`, `Compares`, `cmp`, `cmpLE`. |
| `Mathlib.Order.Synonym` | Provides synonyms and utilities for order theory (e.g., `toDual`, `ofDual`, dual order constructions). |

> **Scope**: This module formalizes foundational properties of three-way comparison in linear orders, especially how `cmp` and `cmpLE` relate to `<`, `≤`, and `=`, and how to reconstruct linear orders from comparison functions.

--- 

Let me know if you'd like a dependency graph or a summary of how this module integrates with `Mathlib.Order.LinearOrder`.