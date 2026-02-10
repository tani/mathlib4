### Technical Metadata Brief: `Mathlib.Logic.ExistsUnique`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ExistsUnique` | `def ExistsUnique (p : α → Prop) := ∃ x, p x ∧ ∀ y, p y → y = x` | Formalizes uniqueness: there exists an `x` satisfying `p`, and any `y` satisfying `p` equals `x`. |
| `isExplicitBinderSingular` | `def isExplicitBinderSingular (xs : TSyntax ``explicitBinders) : Bool` | Checks that a binder list contains exactly one binder (used to prevent ambiguous multi-binder `∃!` usage). |
| `ExistsUnique.intro` | `(w : α) → p w → (∀ y, p y → y = w) → ∃! x, p x` | Introduces a uniqueness statement by exhibiting a witness and proving uniqueness. |
| `ExistsUnique.elim` | `(∃! x, p x) → (∀ x, p x → (∀ y, p y → y = x) → b) → b` | Eliminates a uniqueness quantifier: from uniqueness of `x`, derive a proposition `b`. |
| `existsUnique_of_exists_of_unique` | `(∃ x, p x) → (∀ y₁ y₂, p y₁ → p y₂ → y₁ = y₂) → ∃! x, p x` | Combines existence and pairwise uniqueness into a uniqueness statement. |
| `ExistsUnique.exists` | `(∃! x, p x) → ∃ x, p x` | Forgets uniqueness to get existence. |
| `ExistsUnique.unique` | `(∃! x, p x) → p y₁ → p y₂ → y₁ = y₂` | Any two elements satisfying `p` are equal, given uniqueness. |
| `existsUnique_congr` | `(∀ a, p a ↔ q a) → (∃! a, p a) ↔ ∃! a, q a` | Congruence: if `p` and `q` are pointwise equivalent, then their uniqueness quantifications are equivalent. |
| `existsUnique_iff_exists` | `[Subsingleton α] → (∃! x, p x) ↔ ∃ x, p x` | In a subsingleton type, uniqueness is equivalent to existence. |
| `existsUnique_const` | `[Nonempty α] → [Subsingleton α] → (∃! (_ : α), b) ↔ b` | Uniqueness over a type with exactly one element reduces to the proposition itself. |
| `existsUnique_eq` | `∃! a, a = a'` | There is a unique element equal to a given `a'`. |
| `existsUnique_eq'` | `∃! a, a' = a` | Same as above, but equality reversed (simplified using symmetry). |
| `existsUnique_prop` | `(∃! (_ : p), q) ↔ p ∧ q` | Uniqueness over a proposition `p` (viewed as a type) reduces to `p ∧ q`. |
| `existsUnique_false` | `¬∃! (_ : α), False` | No unique element satisfies `False`. |
| `existsUnique_prop_of_true` | `p → (∃! h' : p, q h') ↔ q h` | If `p` holds, uniqueness over `p` reduces to evaluating `q` at the proof `h`. |
| `ExistsUnique.intro₂` / `elim₂` / `exists₂` / `unique₂` | Variants for nested uniqueness over dependent types (with `Subsingleton` fibers) | Handle uniqueness in dependent contexts (e.g., `∃! x, ∃! h : p x, q x h`). |

> **Note**: All theorems with `exists_unique_*` names are deprecated aliases (since 2024-12-17) in favor of `existsUnique_*`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ExistsUnique.*`: for definitions and theorems about the predicate itself.
  - `existsUnique_*`: deprecated alias names (legacy).
- **Suffixes**:
  - `intro`, `elim`, `exists`, `unique`: standard for introduction/elimination and projection lemmas.
  - `congr`: for congruence lemmas.
  - `₂`: for “second-order” or dependent versions (e.g., `intro₂`, `elim₂`).
- **Notation**:
  - `∃!` is the primary notation, with syntax extensions for:
    - `∃! x : α, p x`
    - `∃! x ∈ s, p x` (via `binderPred`)
  - Multi-binder `∃!` is explicitly disallowed (enforced by `isExplicitBinderSingular`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: heavily used for simplification (especially with `existsUnique_iff_exists`, `existsUnique_eq`, etc.).
- `exact`, `intro`, `apply`: basic proof construction.
- `symm`, `trans`: for equality reasoning.
- `Exists.elim`, `Exists.intro`: for unwrapping/constructing `∃`.
- `and_congr`, `forall_congr'`, `imp_congr_left`: for logical equivalence manipulations.
- `Subsingleton.elim`: to conclude equality from subsingleton property.
- `by simp only [...]`: dominant pattern in proofs of `@[simp]` lemmas.

No heavy automation (e.g., `aesop`, `linarith`) — proofs are mostly direct and structural.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *constructive* pattern: unpack `∃!` as `⟨x, hx, hx_unique⟩`, then reconstruct or reason.
  - For `intro`-style lemmas: exhibit a witness, prove membership, then prove uniqueness.
  - For `elim`-style: use `Exists.elim` to unpack the existential, then apply the given hypothesis.
  - For `congr`/`iff` lemmas: use `and_congr`, `forall_congr'`, and `imp_congr_left` to decompose logical structure.
  - For `Subsingleton`-based simplifications: rely on `Subsingleton.elim` to equate any two elements.

- **Induction**: Not used — this is a foundational logic file, not inductive data.

- **Dependent case handling** (`intro₂`, `elim₂`, etc.): reduce to the non-dependent case using `existsUnique_iff_exists` (which requires `Subsingleton` fibers), then apply the base lemmas.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.TypeStar` | Provides `Type*` and related utilities (e.g., universe polymorphism). |
| `Batteries.Tactic.Alias` | Enables `@[deprecated]` and `alias` declarations for backward compatibility. |

> **Scope**: This module is part of `Mathlib.Logic`, focusing on *propositional logic* and *uniqueness quantification*. It does not depend on analysis, algebra, or topology — it is foundational.

--- 

✅ **Summary**: A core logic module formalizing `∃!` with careful syntax enforcement, canonical elimination/introduction rules, and simplification lemmas — especially optimized for use in dependent type theory with subsingletons.