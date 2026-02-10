**Technical Metadata Brief: Lean 4 `Combinator` Module**

---

### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `I` | `α → α` | Identity combinator: returns its argument unchanged. |
| `K` | `α → β → α` | Constant (or K) combinator: returns the first argument, ignoring the second. |
| `S` | `(α → β → γ) → (α → β) → α → γ` | Substitution (or S) combinator: applies a function to the result of another function applied to the same argument. |

> **Note**: All three are marked `@[deprecated]` with no deprecation message and a `since := "2024-07-27"` timestamp, indicating they are legacy definitions carried over from Lean 3.

---

### 2. **Naming Conventions**

- **Single-letter uppercase names**: `I`, `K`, `S` — standard combinatory logic notation.
- **No prefix/suffix pattern** beyond the combinator names themselves.
- All definitions are in the `Combinator` namespace.

---

### 3. **Tactic Stack**

- **None used** in this file.  
  The file contains only definitions (no proofs), so no tactics appear.

---

### 4. **Proof Logic**

- **Not applicable** — this file contains only *definitions*, not theorems or proofs.

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Provides foundational definitions and universe polymorphism support; required for universe variables `u v w` and type variables `α β γ`. |

> This module is part of the *deprecated* legacy combinators, likely retained for backward compatibility with older Lean 3 code or foundational experiments.

--- 

Let me know if you'd like a formalization of their algebraic properties (e.g., combinatory completeness) or migration guidance to modern equivalents (e.g., `id`, `const`).