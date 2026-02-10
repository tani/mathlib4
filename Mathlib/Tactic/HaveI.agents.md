**Technical Metadata Brief: Lean 4 File — `Mathlib.Tactic.HaveI`**

---

### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `haveIDummy` | Local syntax macro (`haveDecl → term`) | Internal dummy syntax used to bridge `haveI'` into term-mode `haveI` via `assert!`. |
| `letIDummy` | Local syntax macro (`haveDecl → term`) | Internal dummy syntax used to bridge `letI'` into term-mode `letI` via `assert!`. |
| `haveI'` | Macro (`haveDecl → doElem`) | Do-notation variant of `haveI`; inserts an assertion that expands to `haveI` in term mode. |
| `letI'` | Macro (`haveDecl → doElem`) | Do-notation variant of `letI`; inserts an assertion that expands to `letI` in term mode. |

> **Note**: Both `haveI'` and `letI'` are *macros* that expand to `assert! haveIDummy ...` / `assert! letIDummy ...`, which in turn rewrite to `haveI` / `letI` via `haveIDummy` / `letIDummy` rules.

---

### **2. Naming Conventions**

- **Apostrophe suffix (`'`)**: Used to disambiguate do-elem variants (`haveI'`, `letI'`) from their term-mode counterparts (`haveI`, `letI`), which are reserved keywords in do-notation.
- **`Dummy` suffix**: Internal dummy syntax (`haveIDummy`, `letIDummy`) signals placeholder syntax used solely for macro expansion.
- **Prefix `haveI` / `letI`**: Indicates inlining behavior (as opposed to `let_fun`/`have` which produce functional abstractions).

---

### **3. Tactic Stack**

- **`assert!`**: Core tactic used to inject assumptions/definitions in term mode; leveraged here in macro expansion.
- **Macro expansion via `` `( … ) ``**: Template-based syntax quoting used to generate term-mode `haveI`/`letI` from do-elem syntax.
- **No explicit tactics** (e.g., `simp`, `rw`, `induction`) appear in this file — it is purely syntactic.

---

### **4. Proof Logic / Expansion Flow**

- **Macro expansion pattern**:
  1. User writes `haveI' h : P := t` in do-notation.
  2. Macro rewrites to `` `(doElem| assert! haveIDummy h : P := t) ``.
  3. `haveIDummy` rule rewrites `assert! haveIDummy h : P := t; body` → `haveI h : P := t; body`.
  4. Resulting term is type-checked as a standard `haveI` declaration.

- **Same pattern applies to `letI'`** with `letIDummy`.

- **No logical reasoning** occurs — this is purely a *syntax sugar layer* for do-notation compatibility.

---

### **5. Imports**

- **`Mathlib.Init`**: Provides foundational syntax and tactic infrastructure (including `assert!`, `haveI`, `letI`, and do-notation support).

> **Scope**: This module is part of the *tactic infrastructure* in Mathlib, specifically enabling use of `haveI`/`letI`-style inlining inside `do` blocks.

--- 

Let me know if you'd like a formalized summary (e.g., for a domain model or AI agent training).