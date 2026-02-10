### Technical Brief: `FinEnum` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FinEnum` | `class FinEnum (α : Sort*)` | Type class asserting `α` is finite *and* equipped with an explicit bijection to `Fin n` for some `n`. |
| `FinEnum.card` | `ℕ` | Cardinality of the type under the `FinEnum` structure. |
| `FinEnum.equiv` | `α ≃ Fin card` | Explicit equivalence (bijection) between `α` and `Fin (card α)`. |
| `FinEnum.ofEquiv` | `(β ≃ α) → FinEnum α → FinEnum β` | Transport `FinEnum` across equivalence. |
| `FinEnum.ofNodupList` | `(xs : List α) → (∀ x, x ∈ xs) → List.Nodup xs → FinEnum α` | Construct `FinEnum` from a duplicate-free exhaustive list. |
| `FinEnum.ofList` | `(xs : List α) → (∀ x, x ∈ xs) → FinEnum α` | Construct `FinEnum` from any exhaustive list (duplicates removed via `dedup`). |
| `FinEnum.toList` | `List α` | List of all elements of `α`, obtained via `equiv.symm` applied to `finRange (card α)`. |
| `FinEnum.toList_mem` | `x ∈ toList α` | Every element appears in `toList`. |
| `FinEnum.toList_nodup` | `List.Nodup (toList α)` | `toList` has no duplicates. |
| `FinEnum.ofSurjective` | `(f : β → α) → Surjective f → FinEnum β → FinEnum α` | Induce `FinEnum` on codomain from surjection. |
| `FinEnum.ofInjective` | `(f : α → β) → Injective f → FinEnum β → FinEnum α` | Induce `FinEnum` on domain from injection (uses `partialInv`). |
| `FinEnum.card_eq_fintypeCard` | `card α = Fintype.card α` | `FinEnum.card` coincides with `Fintype.card`. |
| `FinEnum.card_unique` | `e₁.card = e₂.card` | All `FinEnum` structures on same type have same cardinality. |
| `FinEnum.card_eq_zero_iff` | `card α = 0 ↔ IsEmpty α` | Zero cardinality iff type is empty. |
| `FinEnum.card_pos_iff` | `0 < card α ↔ Nonempty α` | Positive cardinality iff type is inhabited. |
| `FinEnum.card_eq_one` | `card α = 1` if `Unique α` | Unique inhabitant ⇒ cardinality 1. |
| `FinEnum.Finset.finEnum` | `FinEnum (Finset α)` | Finite sets over `α` are finitely enumerable. |
| `FinEnum.Subtype.finEnum` | `FinEnum {x // p x}` | Subtypes defined by decidable predicate are finitely enumerable. |
| `FinEnum.Sigma.finEnum` | `FinEnum (Sigma β)` | Dependent sums of finitely enumerable types are finitely enumerable. |
| `List.Pi.enum` | `List (∀ a, β a)` | Enumerates all dependent functions (i.e., `Π a, β a`). |
| `List.Pi.mem_enum` | `f ∈ Pi.enum β` | Every function appears in the enumeration. |
| `List.Pi.finEnum` | `FinEnum (∀ a, β a)` | Function space over finitely enumerable types is finitely enumerable. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of*`: Constructors for `FinEnum` from structural data (`ofEquiv`, `ofList`, `ofNodupList`, `ofSurjective`, `ofInjective`, `ofIsEmpty`, `ofUnique`).
  - `to*`: Conversions *to* standard forms (`toList`, `toFinset` not present, but `toList` is key).
  - `mem_*`, `nodup_*`, `card_*`: Properties of enumerations.
- **Suffixes**:
  - `_enum`: For definitions related to enumeration (`Pi.enum`, `Finset.enum`).
  - `_finEnum`: Instance names (`Pi.finEnum`, `Subtype.finEnum`, `PSigma.finEnum*`).
- **`*Equiv` / `*Equiv_*`**: Equivalences used in constructions (`equiv`, `equiv.up`, `equiv.down`, `equiv_symm`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Dominant tactic; simplifies using lemmas like `mem_toList`, `nodup_toList`, `equiv_symm_apply_apply`, etc. |
| `aesop` | Used in `Finset.mem_enum` and similar inductive proofs for automation. |
| `ext` | For extensionality (e.g., proving functions equal). |
| `cases` | On `x : α`, `⟨x, h⟩`, or `Sum`, `ULift`, `Sigma`, `PSigma`. |
| `rw`, `apply`, `intro`, `refine`, `induction` | Standard proof scripting. |
| `first | rfl | contradiction` | In uniqueness proofs for `Unique (FinEnum α)`. |
| `congr 1`, `heq_of_cast_eq`, `funext` | For proving equality of structures and functions. |
| `simp [*]`, `simp +contextual` | Advanced simplification with local hypotheses. |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  1. **Induction on lists** (e.g., `Finset.mem_enum`, `Pi.mem_enum`).
  2. **Cases on elements** (e.g., `Sum`, `ULift`, `Sigma`, `Subtype`).
  3. **Equivalence reasoning**: Use `equiv` to reduce to `Fin n`, then apply `Fin.equiv_iff_eq`.
  4. **Cardinality arguments**: Use `card_eq_fintypeCard` to relate to `Fintype.card`, then apply known facts about `Fintype.card`.
  5. **Uniqueness via subsingleton + inhabited**: For `Unique (FinEnum α)`, show `Subsingleton` + `Nonempty`.

- **Key proof pattern**:
  > To prove `P (α : FinEnum α)`, reduce to `P (Fin n)` via `equiv`, then use `Fin n`-specific lemmas.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Fintype.Basic` | Core `Fintype` theory (used for comparison & `Fintype.card`). |
| `Mathlib.Data.Fintype.Card` | Cardinal arithmetic and properties (`Fintype.card_eq_zero_iff`, etc.). |
| `Mathlib.Data.List.ProdSigma` | Definitions for `×ˢ`, `flatMap`, `filterMap`, etc., used in `prod`, `sum`, `Sigma` instances. |
| `Mathlib.Data.List.Pi` | Definitions for `pi`, `Pi.enum`, dependent function spaces. |

---

### Summary

The `FinEnum` type class provides a *constructive* notion of finiteness: not only is the type finite, but there is an explicit bijection with `Fin n`. This enables effective enumeration and reasoning about finite types in a way compatible with dependent types and constructive mathematics. The library provides robust infrastructure for constructing `FinEnum` instances via lists, equivalences, surjections/injections, and standard type constructors (`prod`, `sum`, `Pi`, `Sigma`, `Finset`, `Subtype`, `Quotient`, `ULift`). Proofs rely heavily on simplification, equivalence reasoning, and cardinality comparisons with `Fintype`.