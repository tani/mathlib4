### Technical Metadata Brief: `Mathlib.Logic.Bool`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `true_eq_false_eq_False` | `¬true = false` | Proves `true ≠ false` via decidability. |
| `false_eq_true_eq_False` | `¬false = true` | Symmetric counterpart to above. |
| `eq_false_eq_not_eq_true` | `(¬b = true) = (b = false)` | Logical equivalence between negated equality and equality to `false`. |
| `eq_true_eq_not_eq_false` | `(¬b = false) = (b = true)` | Dual of above. |
| `and_eq_true_eq_eq_true_and_eq_true` | `((a && b) = true) = (a = true ∧ b = true)` | Connects conjunction with logical AND. |
| `or_eq_true_eq_eq_true_or_eq_true` | `((a || b) = true) = (a = true ∨ b = true)` | Connects disjunction with logical OR. |
| `not_eq_true_eq_eq_false` | `(not a = true) = (a = false)` | Connects negation with equality to `false`. |
| `decide_iff` | `decide p = true ↔ p` | Links `decide` (computable decision) with truth of decidable propositions. |
| `bool_iff_false` | `¬b ↔ b = false` | Characterizes falsity of a boolean as equality to `false`. |
| `xor_iff_ne` | `xor x y = true ↔ x ≠ y` | Connects XOR with inequality. |
| `bne_eq_xor` | `bne = xor` | Identifies `bne` (boolean not-equal) with `xor`. |
| `linearOrder` | `LinearOrder Bool` | Constructs a linear order on `Bool` (`false < true`). |
| `lt_iff` | `x < y ↔ x = false ∧ y = true` | Explicit description of strict order. |
| `le_iff_imp` | `x ≤ y ↔ x → y` | Connects order with implication (as propositions). |
| `ofNat` | `Nat → Bool`, `ofNat n := decide (n ≠ 0)` | Converts natural numbers to booleans (`0 ↦ false`, else `true`). |
| `toNat` | `Bool → Nat` (implicit via coercion) | Converts `false ↦ 0`, `true ↦ 1`. |
| `ofNat_toNat` | `ofNat (toNat b) = b` | Left-inverse property of `ofNat` and `toNat`. |
| `apply_apply_apply` (Kaminski’s Equation) | `f (f (f x)) = f x` | A structural property of all functions `Bool → Bool`. |
| `xor3`, `carry` | `Bool → Bool → Bool → Bool` | Helper definitions for binary addition (sum and carry). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eq_*`: Equality lemmas (e.g., `eq_false_eq_not_eq_true`)
  - `*_eq_*`: Equivalences involving equality (e.g., `and_eq_true_eq_eq_true_and_eq_true`)
  - `*_iff_*`: Logical equivalences (e.g., `xor_iff_ne`, `decide_iff`)
  - `coe_*`: Coercion lemmas (e.g., `coe_true`, `coe_or_iff` — deprecated)
  - `bool_*`: Boolean-specific lemmas (e.g., `bool_iff_false`)
  - `decide_*`: Decision procedure lemmas (e.g., `decide_true`, `decide_false_iff`)
  - `not_*`: Negation-related (e.g., `not_eq_true_eq_eq_false`)
  - `and_*`, `or_*`, `xor_*`: Boolean operations

- **Suffixes**:
  - `_eq_true`, `_eq_false`: When equating result of operation to `true`/`false`
  - `_iff_*`: When stating biconditional equivalences
  - `_ne_*`: When involving inequality (`≠`)

- **Aliases & Deprecations**:
  - Many lemmas are marked `@[deprecated]` with `alias` to newer names (e.g., `coe_or_iff` → `or_eq_true_iff`), indicating evolving naming conventions.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` — heavily used for simplification using definitional equalities and lemmas.
  - `cases` — especially `cases a <;> cases b <;> simp`, for exhaustive boolean case analysis.
  - `decide` — for automated proofs of decidable propositions (e.g., `by decide`).
  - `intro`, `apply`, `exact`, `rw`, `refl`, `contradiction`, `contradiction`, `exfalso`, `swap`, `have`, `suffices`.
  - `funext` — used in extensionality proofs (e.g., `bne_eq_xor`).
  - `simp only [...]` — for precise control over simplification.

- **Pattern**:
  - Most proofs follow: `by cases a <;> cases b <;> simp` or `by cases b <;> decide`.
  - For equivalences: `by simp` or `by apply and_iff_intro <;> simp`.

---

#### **4. Proof Logic**

- **Inductive/Case-based reasoning**:
  - Almost all proofs are *case splits* on boolean variables (`a`, `b`, `x`, `y`, etc.), leveraging the fact that `Bool` has only two constructors: `false`, `true`.
  - After case analysis, `simp` or `decide` finishes the proof by reducing to definitional equalities.

- **Equational reasoning**:
  - Many lemmas are equivalences (`↔`, `=`), proven by showing both directions via `simp` or `decide`.
  - Some proofs use `congrFun`, `congrArg`, or `funext` for function extensionality.

- **Decidability exploitation**:
  - `decide` is used extensively for propositions with `[Decidable _]`, especially in `decide_iff`, `decide_true`, etc.

- **Order-theoretic reasoning**:
  - For `LinearOrder Bool`, proofs are automated via `decide`, and order properties (`≤`, `<`) are tied to logical implication (`x ≤ y ↔ x → y`).

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Logic.Basic` | Core logic utilities (e.g., `decidable`, `ne_eq`, `not_congr`) |
| `Mathlib.Logic.Function.Defs` | Function definitions and basic properties (e.g., `Function.Injective`) |
| `Mathlib.Order.Defs.LinearOrder` | Definitions and basic properties of linear orders (used to define `LinearOrder Bool`) |

> **Note**: This file is foundational — it builds on basic logic and order theory to formalize boolean algebra and its interaction with decidability and propositions-as-types.

---

### Summary

This module formalizes elementary but crucial properties of booleans in Lean 4, especially their relationship with decidability, logical connectives, and order-theoretic structure. It emphasizes case analysis, simplification, and decidability automation, with a clear evolution in naming conventions (e.g., deprecation of older aliases like `coe_or_iff`). The file serves as a basis for higher-level boolean reasoning (e.g., in circuit verification, logic synthesis, or type-theoretic foundations).