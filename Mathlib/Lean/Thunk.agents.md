**Technical Metadata Brief: Thunk Library (Lean 4)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `get_pure` | `∀ {α} (x : α), (Thunk.pure x).get = x` | States that extracting the value from a pure thunk yields the original value. |
| `get_mk` | `∀ {α} (f : Unit → α), (Thunk.mk f).get = f ()` | States that extracting from a thunk built via `mk` applies the function to `()`. |
| `prod` | `Thunk α → Thunk β → Thunk (α × β)` | Constructs a thunk of a pair from two thunks, evaluating both and pairing results. |
| `prod_get_fst` | `(prod a b).get.1 = a.get` | Projection of first component of a product thunk. |
| `prod_get_snd` | `(prod a b).get.2 = b.get` | Projection of second component of a product thunk. |
| `add` | `[Add α] → Thunk α → Thunk α → Thunk α` | Pointwise addition of thunks (via underlying addition). |
| `add_get` | `[Add α] → (a + b).get = a.get + b.get` | Extraction of sum of thunks equals sum of extractions. |
| `DecidableEq (Thunk α)` | `[DecidableEq α] → DecidableEq (Thunk α)` | Provides decidability of equality for thunks if base type has it; reduces to equality of `.get`. |

---

### 2. **Naming Conventions**

- **`get_` prefix**: Used for the canonical elimination (destructor) operation on `Thunk` (e.g., `get_pure`, `get_mk`, `prod_get_fst`, `add_get`).
- **`_get` suffix**: Indicates a simplification lemma about how `get` interacts with a constructor or operation (e.g., `prod_get_fst`, `add_get`).
- **`prod`, `add`**: Standard algebraic operation names, overloaded via typeclass instances (`Add`).
- **`[Add α]` context**: Typeclass constraints appear in definitions/lemmas where operations depend on algebraic structure.

---

### 3. **Tactic Stack**

- **`rfl`**: Dominant tactic — used in all `@[simp]` lemmas to prove definitional equalities.
- **`ext`**: Used in proof of `DecidableEq` instance to extend extensionality over `get`.
- **`rw [this]`**: Rewriting using an equivalence proven just before.
- **`infer_instance`**: Automatically synthesizes `DecidableEq` for `Thunk α` from base type.

No heavy automation (e.g., `aesop`, `ring`, `simp_rw`) is used — proofs are mostly definitional.

---

### 4. **Proof Logic**

- **Definitional reasoning**: Most lemmas are immediate from definition of `Thunk.mk` and `get`.
- **Extensionality + rewriting**: For `DecidableEq`, the proof:
  1. Shows `a = b ↔ a.get = b.get`.
  2. Rewrites equality of thunks to equality of their values.
  3. Uses `infer_instance` to inherit decidability from `α`.
- **No induction or case analysis** beyond basic `rfl`/`ext` — the structure of `Thunk` is simple (a delayed computation modeled as `Unit → α`).

---

### 5. **Imports**

- **`Mathlib.Init`**: Provides foundational definitions, including:
  - `Thunk` type (likely defined in `Init` or imported from core).
  - `DecidableEq`, `Add`, and basic typeclass machinery.
  - `rfl`, `ext`, and basic tactics used.

> **Note**: This is a minimal, low-level library focused on equational properties of `Thunk`. It does not depend on advanced `Mathlib` modules (e.g., `Data.Thunk`, `Algebra.GroupDef`), suggesting it may be part of a core or early-stage formalization.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a comparison with `Data.Thunk` in Mathlib.