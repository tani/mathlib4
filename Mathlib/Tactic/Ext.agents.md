**Technical Brief: `Ext.lean` (Mathlib)**  
*Domain: Lean 4 / Mathlib — Extensionality Tactics and Attributes*

---

### 1. **Key Definitions & Theorems**

| Name | Type / Attribute | Purpose |
|------|------------------|---------|
| `@[ext]` | Attribute | Marks a lemma as an *extensionality lemma* for use by the `ext` tactic. |
| `library_note «partially-applied ext lemmas»` | Documentation note | Explains design principle: prefer *partially-applied* `ext` lemmas (e.g., `f.comp of = g.comp of → f = g`) over fully quantified ones (e.g., `∀ x, f (of x) = g (of x) → f = g`) to enable chaining of type-specific extensionality principles. |

> **Note**: No formal theorems are *defined* in this file — it is purely a *library note* documenting best practices for `ext` lemmas.

---

### 2. **Naming Conventions**

- **Prefixes / Suffixes**:
  - `ext` — core naming pattern for extensionality lemmas (e.g., `funext`, `congr_arg`, `congr`, `ext`, `ext_iff`, `ext*`).
  - `is_` / `has_` — not used here; this file is meta-documentation.
  - `of`, `comp` — example morphism-related symbols used in illustrative lemmas.

- **Pattern**:  
  `ext` lemmas typically have the form:  
  `hypothesis → f = g`, where `f`, `g` are morphisms (e.g., functions, ring homs, monoid homs).

---

### 3. **Tactic Stack**

| Tactic | Role in `ext` ecosystem |
|--------|-------------------------|
| `ext` | Main tactic: applies `@[ext]` lemmas to reduce equality of morphisms to equality of their actions on arguments. |
| `simp` / `simp_rw` | Often used *after* `ext` to simplify resulting goals (e.g., reduce `⇑f x = ⇑g x` to structure-specific equalities). |
| `aesop` | May be used in automation around `ext` proofs (not directly in this file). |
| `rw` | Used to rewrite using `ext` lemmas or `ext_iff` variants. |

> The `ext` tactic itself is defined elsewhere (e.g., in `Mathlib.Tactic.Ext`), but this file documents *how* to write `ext` lemmas for optimal use.

---

### 4. **Proof Logic**

- **Logical Flow** (in proofs using `ext`):
  1. Apply `ext` → reduces goal `f = g` to `∀ x, ⇑f x = ⇑g x` (or a more specialized variant if `@[ext]` lemmas exist).
  2. Introduce `x` (via `intro x` or implicit in `ext x`).
  3. Apply type-specific `ext` lemmas (e.g., for `RingHom`, `MonoidHom`) to reduce to simpler equalities (e.g., `f (of 1) = g (of 1)`).
  4. Use `simp`, `ring`, `linarith`, etc., to finish.

- **Design Principle**:  
  Partially-applied `ext` lemmas (e.g., `f.comp of = g.comp of → f = g`) allow *layered* extensionality:  
  - First, apply `ext` to get `f.comp of = g.comp of`.  
  - Then apply a *second* `ext` lemma (e.g., for composition) to reduce further.

---

### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.Basic` | Provides foundational tactics (`intro`, `exact`, `assumption`, etc.) used by `ext`. |
| *(Implied)* `Mathlib.Tactic.Ext` | Contains the actual `ext` tactic implementation (not imported here — this file is documentation-only). |

> This module is **purely documentation**; no code is compiled beyond the `library_note`.

---

### 8. **Mermaid Diagrams**

#### Dependency Graph (This File)
```mermaid
graph TD
  A[Ext.lean] -->|imports| B[Mathlib.Tactic.Basic]
  A -->|documents| C[ext tactic]
  A -->|documents| D[@[ext] attribute]
  C -->|implemented in| E[Mathlib.Tactic.Ext]
  D -->|used by| E
  E -->|applies| F[ext lemmas (e.g., funext, congr_arg)]
```

#### Overview of `ext` Lemma Ecosystem
```mermaid
graph LR
  subgraph "User-facing"
    G[ext tactic] --> H[Apply @[ext] lemmas]
    H --> I[Reduce f = g to pointwise equality]
  end

  subgraph "Lemma Design"
    J[Partially-applied ext lemma] --> K[Enables chaining]
    L[Full quantified ext lemma] --> M[Less flexible]
    K --> N[Preferred in Mathlib]
  end

  subgraph "Examples"
    O[funext] --> P[(∀ x, f x = g x) → f = g]
    Q[RingHom.ext] --> R[(∀ x, ⇑f x = ⇑g x) → f = g]
    S[Comp ext] --> T[f ∘ h = g ∘ h → f = g]
  end

  G --> O & Q & S
```

---

**Summary**:  
`Ext.lean` is a *library note* guiding the design of extensionality lemmas in Mathlib. It emphasizes *partially-applied* lemmas for composability, especially for bundled morphisms. No executable code is present — only best-practice documentation for `@[ext]` lemma authors.
