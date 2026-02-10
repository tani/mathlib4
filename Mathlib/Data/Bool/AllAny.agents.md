### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `all_iff_forall_prop` | `(all l (fun a ↦ p a)) ↔ ∀ a ∈ l, p a` | Equivalence between `List.all` and universal quantification over list elements. |
| `any_iff_exists_prop` | `(any l (fun a ↦ p a)) ↔ ∃ a ∈ l, p a` | Equivalence between `List.any` and existential quantification over list elements. |
| `any_of_mem` | `a ∈ l → p a → any l p` | If an element `a` is in list `l` and satisfies predicate `p`, then `any l p` holds. |

> **Note**: The theorems `all_iff_forall` and `any_iff_exists` are deprecated aliases for `all_eq_true` and `any_eq_true`, respectively.

#### 2. **Naming Conventions**
- **Predicate-based naming**: `all` and `any` are used for boolean universal/existential quantifiers over lists.
- **Propositional variants**: Suffix `_prop` indicates equivalence with logical quantifiers over propositions (`∀`, `∃`).
- **Deprecated aliases**: Use `all_iff_forall` / `any_iff_exists` (deprecated) vs. `all_iff_forall_prop` / `any_iff_exists_prop` (current).
- **Predicate as function**: `p : α → Bool` (boolean predicate) vs. `p : α → Prop` (propositional predicate); theorems distinguish accordingly.

#### 3. **Tactic Stack**
- `simp`: Used in proofs of `all_iff_forall_prop` and `any_iff_exists_prop`.
- `aesop`: Not present in this snippet, but likely used in broader context (not here).
- `constructor`, `exact`, `intro`, `cases`: Implicit in `simp`-based proofs; `any_of_mem` uses `any_eq_true.2` (i.e., `iff.elim` or `iff.mp` style).
- `TypeStar`-related tactics: Enabled via `import Mathlib.Tactic.TypeStar`, but not directly used here.

#### 4. **Proof Logic**
- **Equivalence proofs** (`all_iff_forall_prop`, `any_iff_exists_prop`):  
  → Use `simp` to reduce `all`/`any` to their definitions (via `all_eq_true`, `any_eq_true`) and apply `decidable` instance to simplify `∀ a ∈ l, p a` / `∃ a ∈ l, p a`.
- **`any_of_mem` proof**:  
  → Construct witness using `⟨a, h₁, h₂⟩`, then apply `any_eq_true.2` (i.e., `iff.elim₂` or `iff.intro` direction).

#### 5. **Imports**
| Import | Role |
|--------|------|
| `Batteries.Tactic.Alias` | Provides `alias` command for defining deprecated aliases. |
| `Mathlib.Tactic.TypeStar` | Enables `Type*` universe polymorphism syntax (e.g., `{α : Type*}`). |

---

### Summary
This file formalizes foundational connections between Lean’s boolean list quantifiers (`List.all`, `List.any`) and standard logical quantifiers (`∀`, `∃`). It emphasizes clarity via naming (`_prop` suffix), deprecation of older aliases, and relies on `simp`-based automation leveraging decidability. The core logic is straightforward: reduce boolean quantifiers to logical ones via definitional equality and decidability.