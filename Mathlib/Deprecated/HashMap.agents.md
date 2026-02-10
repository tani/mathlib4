**Technical Metadata Brief: Batteries.HashMap & Batteries.RBSet API Extensions**

---

### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `keys` | `HashMap α β → List α` | Extracts the list of keys from a `HashMap` via `fold`. *Deprecated* (unused in Mathlib). |
| `values` | `HashMap α β → List β` | Extracts the list of values from a `HashMap` via `fold`. *Deprecated*. |
| `consVal` | `HashMap α (List β) → α → β → HashMap α (List β)` | Adds an element to the list value at a given key (multimap-style insertion). *Deprecated*. |
| `insertList` | `RBSet α cmp → List α → RBSet α cmp` | Inserts all elements of a list into an `RBSet` using left fold over `insert`. *Deprecated*. |

> **Note**: All four declarations are marked `@[deprecated]` with `since := "2024-06-12"` and explicitly flagged as *unused in Mathlib*.

---

### **2. Naming Conventions**

- **Prefixes**: None beyond module namespace (`Batteries.HashMap`, `Batteries.RBSet`).
- **Suffixes**: None (e.g., no `'_def'`, `'_eq'`, `'_prop'` suffixes).
- **Style**: Direct, descriptive names (`keys`, `values`, `consVal`, `insertList`) — consistent with Lean 3/4 data structure conventions.
- **Deprecation marker**: All definitions use the same `@[deprecated "..."]` attribute with structured message and `since` field.

---

### **3. Tactic Stack**

- **No tactics used in definitions** — all are pure functional definitions using pattern matching (`match`) and higher-order functions (`fold`, `foldl`, `insert`, `find?`).
- **Tactics appear only in proofs**, but **no proofs are included** in this file — only declarations and deprecation notices.

---

### **4. Proof Logic**

- **No proofs present** — this file contains only *interface declarations* (API stubs) and deprecation annotations.
- The absence of proofs aligns with the deprecation status: these are legacy or auxiliary definitions not intended for active use.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean 4 infrastructure (e.g., `Type*`, `BEq`, `Hashable`). |
| `Mathlib.Tactic.TypeStar` | Provides `Type*` universe polymorphism syntax. |
| `Batteries.Data.HashMap.Basic` | Defines the new `HashMap` implementation (replaces mathlib3 version). |
| `Batteries.Data.RBMap.Basic` | Provides `RBSet` (red-black tree sets), likely via `RBMap` with unit values. |

> **Scope**: This module extends the *new* `Batteries`-based `HashMap` and `RBSet` implementations with legacy-style convenience functions — now deprecated in favor of more idiomatic or efficient alternatives.

--- 

**Summary**: A minimal, deprecated API layer over `Batteries.HashMap` and `Batteries.RBSet`, preserving backward compatibility while discouraging future use. No proofs or advanced logic — purely interface documentation.