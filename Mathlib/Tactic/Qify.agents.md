### Technical Brief: `qify` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `qify` | **Tactic syntax** (`tactic`): Shifts goals and hypotheses from `ℕ` or `ℤ` to `ℚ` using cast lemmas and simplification. Enables reasoning in `ℚ`, where division behaves nicely. |
| `intCast_eq` | `∀ a b : ℤ, a = b ↔ (a : ℚ) = (b : ℚ)` |  
| `intCast_le` | `∀ a b : ℤ, a ≤ b ↔ (a : ℚ) ≤ (b : ℚ)` |  
| `intCast_lt` | `∀ a b : ℤ, a < b ↔ (a : ℚ) < (b : ℚ)` |  
| `intCast_ne` | `∀ a b : ℤ, a ≠ b ↔ (a : ℚ) ≠ (b : ℚ)` |  
| `int_cast_ne` | **Deprecated alias** for `intCast_ne` (since 2024-04-17). |

> **Purpose of lemmas**: These `@[qify_simps]` lemmas encode *equivalence* between relational predicates over integers and their embeddings into ℚ. They allow `simp` (via `push_cast`) to rewrite relations over `ℤ` into equivalent ones over `ℚ`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `intCast_`: Relates integer predicates to their rational embeddings (`eq`, `le`, `lt`, `ne`).
- **Suffixes**:
  - `_eq`, `_le`, `_lt`, `_ne`: Standard relational predicate naming.
- **Tactic name**:
  - `qify`: Short for *“quantify over ℚ”* or *“lift to ℚ”* — reflects its purpose of embedding into ℚ.

---

#### **3. Tactic Stack**

The `qify` tactic is implemented as a macro expanding to:

```lean
simp -decide only [zify_simps, qify_simps, push_cast, $args,*] $[at $location]?
```

- **Core tactics used**:
  - `simp`: Primary simplifier, with `-decide` to avoid decidability issues.
  - `push_cast`: Used internally (via `only [...]`) to push casts through arithmetic operations.
  - `zify_simps`, `qify_simps`: Custom simp sets (see below).
  - Optional user-provided lemmas (`$args`) are added to the simp set.

> **Note**: `zify_simps` handles `ℕ → ℤ` embeddings (via `zify` tactic), while `qify_simps` handles `ℤ → ℚ` embeddings.

---

#### **4. Proof Logic / Strategy**

- **High-level flow**:
  1. **Simplify** the goal/hypothesis using:
     - `qify_simps`: Rewrites relations over `ℤ` to `ℚ`.
     - `zify_simps`: Handles `ℕ` → `ℤ` → `ℚ` chains (if needed).
     - `push_cast`: Pushes casts through `+`, `*`, `-`, etc., to normalize expressions.
  2. **Optional user lemmas** (`$args`) are used to help `push_cast` simplify further (e.g., divisibility hypotheses like `b ∣ a` help rewrite `a / b`).
  3. Result: All terms are cast to `ℚ`, and relations are expressed in terms of `↑a`, `↑b`, etc.

- **Typical usage pattern**:
  - `qify` → lifts the goal to ℚ.
  - `qify at h` → lifts hypothesis `h`.
  - Often followed by `ring`, `linarith`, or `norm_num` to finish.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Ring.Cast` | Provides general cast infrastructure (`cast`, `cast_inj`, etc.). |
| `Mathlib.Algebra.Order.Ring.Rat` | Defines ℚ as an ordered field, with `Int.cast` and `Nat.cast` into ℚ. |
| `Mathlib.Data.Int.Cast.Lemmas` | Contains lemmas like `Int.cast_le`, `Int.cast_lt`, used in `qify_simps`. |
| `Mathlib.Tactic.Basic`, `Mathlib.Tactic.Zify` | `zify` infrastructure and basic tactic utilities. |

> **Scope**: This module is part of `Mathlib.Tactic`, and is designed to integrate with the broader `cast` and `zify` ecosystem for moving between number types (`ℕ`, `ℤ`, `ℚ`, `ℝ`, etc.).

---

### Summary

The `qify` tactic is a **high-level, user-facing tool** that leverages `simp` with a curated set of `qify_simps` and `push_cast` to automatically lift propositions from `ℤ` (and transitively `ℕ`) to `ℚ`. Its design reflects Lean’s emphasis on *reusability* and *modularity* — by relying on existing cast infrastructure and simp sets, it avoids ad-hoc rewrites and integrates cleanly with other tactics like `ring`, `linarith`, and `norm_num`.