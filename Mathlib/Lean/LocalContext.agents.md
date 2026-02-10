Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Metadata Brief**

#### **1. Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `firstDeclM` | `LocalContext → (LocalDecl → m β) → m β` | Applies `f` to local declarations in *forward* order and returns the first successful result (i.e., first `some b`). Fails if no declaration satisfies `f`. |
| `lastDeclM` | `LocalContext → (LocalDecl → m β) → m β` | Applies `f` to local declarations in *reverse* order and returns the first successful result (i.e., last declaration in original context that satisfies `f`). Fails if no such declaration exists. |

Both functions use `findDeclM?` / `findDeclRevM?` (monadic search over `LocalContext`) wrapped with `optional ∘ f` to convert partial success (`β → Option β`) into monadic success (`β → m β`) via `some`/`none`.

#### **2. Naming Conventions**
- **Prefix `firstDeclM` / `lastDeclM`**: Indicates directionality (`first` vs `last`) and monadic nature (`M` suffix).
- **Suffix `M`**: Standard Lean convention for monadic variants of operations (e.g., `findDeclM?`).
- **`decl`**: Short for *declaration*, consistent with `LocalDecl`.

#### **3. Tactic Stack**
- **No tactics used** in this file — it is purely definitional.
- Relies on **do-notation** (`do ...`) and monadic combinators (`←`, `match`, `pure`, `failure`).
- Uses `optional` (from `Mathlib.Init`) to lift `β → m β` to `β → m (Option β)` for compatibility with `findDeclM?`.

#### **4. Proof Logic / Implementation Strategy**
- **Functional composition**: `f` is composed with `optional` to produce a partial function returning `Option β`, which `findDeclM?`/`findDeclRevM?` can consume.
- **Pattern matching on `Option`**: Explicit handling of `none` (failure) and `some b` (success).
- **No proofs required** — definitions are computational and total (assuming `m` is a `Monad` and `Alternative`).

#### **5. Imports**
| Import | Role |
|--------|------|
| `Mathlib.Init` | Provides foundational types, `optional`, `Monad`, `Alternative`, and basic `LocalContext` infrastructure. |
| `Lean.LocalContext` | Defines `LocalContext`, `LocalDecl`, and the base search functions `findDeclM?`, `findDeclRevM?`. |

---

This module extends `Lean.LocalContext` with *monadic* search utilities for local declarations, enabling flexible, early-exit traversal patterns in tactic scripts or metaprogramming.