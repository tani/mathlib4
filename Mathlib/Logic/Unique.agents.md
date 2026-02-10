### Technical Metadata Brief: `Mathlib.Logic.Unique`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Unique α` | `Type u → Type u` (structure) | Typeclass expressing that `α` has a *unique* term (i.e., is inhabited and a subsingleton). Implemented as a structure extending `Inhabited`. |
| `uniq` | `∀ a : α, a = default` | Axiom of `Unique`: all elements equal the default. |
| `Unique.mk'` | `[Inhabited α] → [Subsingleton α] → Unique α` | Constructs `Unique α` from inhabited + subsingleton. Not an instance to avoid typeclass loops. |
| `unique_iff_existsUnique` | `Nonempty (Unique α) ↔ ∃! _ : α, True` | Equivalence between existence of a `Unique` instance and uniqueness of an element. |
| `unique_subtype_iff_existsUnique` | `Nonempty (Unique (Subtype p)) ↔ ∃! a, p a` | Characterizes uniqueness of a subtype via unique witness satisfying a predicate. |
| `uniqueOfSubsingleton` | `[Subsingleton α] → α → Unique α` | Constructs `Unique α` from a specific element in a subsingleton. Reducible, not an instance. |
| `PUnit.instUnique` | `Unique PUnit` | Canonical instance for the unit type. |
| `uniqueProp` | `p : Prop → p → Unique p` | Any provable proposition is unique (all proofs equal). |
| `Pi.unique` | `[∀ a, Unique (β a)] → Unique (∀ a, β a)` | Dependent product of unique types is unique. |
| `Pi.uniqueOfIsEmpty` | `[IsEmpty α] → Unique (∀ a, β a)` | Functions from empty domain form a unique type. |
| `Function.Injective.subsingleton` | `[Injective f] → [Subsingleton β] → Subsingleton α` | Injective map into subsingleton ⇒ domain is subsingleton. |
| `Function.Surjective.subsingleton` | `[Subsingleton α] → [Surjective f] → Subsingleton β` | Surjective map from subsingleton ⇒ codomain is subsingleton. |
| `Function.Injective.unique` | `[Inhabited α] → [Subsingleton β] → [Injective f] → Unique α` | Injective map into subsingleton + inhabited domain ⇒ domain is unique. |
| `Function.Surjective.unique` | `[Unique α] → [Surjective f] → Unique β` | Surjective map from unique domain ⇒ codomain is unique. |
| `Unique.subsingleton_unique` | `Subsingleton (Unique α)` | Uniqueness of the `Unique` instance itself (up to equality). |
| `eq_const_of_unique` | `[Unique α] → (f : α → β) → f = const (f default)` | Any function from a unique type is constant. |
| `heq_const_of_unique` | `[Unique α] → (f : ∀ i, β i) → HEq f (const (f default))` | Dependent version of above. |
| `uniqueElim` | `[Unique ι] → α default → ∀ i, α i` | Eliminator for unique index types: extend a value at `default` to a function. |
| `Option.subsingleton_iff_isEmpty` | `Subsingleton (Option α) ↔ IsEmpty α` | `Option α` is a subsingleton iff `α` is empty. |
| `Option.instUnique` | `[IsEmpty α] → Unique (Option α)` | `Option α` is unique when `α` is empty. |
| `Fin.instUnique` | `Unique (Fin 1)` | `Fin 1` has a unique element. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `unique*`: e.g., `uniqueOfSubsingleton`, `uniqueProp`, `uniqueElim`, `unique_iff_*`.
  - `subsingleton*`: e.g., `subsingleton_of_forall_eq`, `subsingleton_unique`.
  - `eq_*`: e.g., `eq_default`, `default_eq`, `eq_const_of_unique`.
  - `Pi.*`: e.g., `Pi.unique`, `Pi.default_def`, `Pi.default_apply`.

- **Suffixes**:
  - `*OfSubsingleton`, `*OfUnique`, `*OfIsEmpty`: indicate construction from structural assumptions.
  - `*_iff_*`: logical equivalences.
  - `inst*`: instance declarations (e.g., `instUnique`, `instSubsingleton`).

- **Structure fields**:
  - `default`, `uniq`: standard components of `Unique`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Proving definitional equalities (e.g., `default = default`). |
| `congr` | Proving equality of structured terms (e.g., `Unique.mk` values). |
| `rw [uniq _]` | Rewriting arbitrary terms to `default`. |
| `subsingleton_of_forall_eq` | Deriving subsingleton from “all elements equal”. |
| `Subsingleton.elim _ _` | Eliminating equality in subsingletons. |
| `funext` | Extensionality for functions (especially in `Pi.unique`, `eq_const_of_unique`). |
| `rwa` / `simp` | Rewriting with `uniq`, `eq_default`, etc. |
| `inhabitant` / `inhabit` | Used in `nonempty_unique` to get a witness. |
| `aesop`, `simp_rw` | Not explicitly used here, but `simp` is heavily leveraged via `@[simp]`. |
| `intro`, `cases`, `congr'` | Basic proof structure. |

---

#### **4. Proof Logic**

- **General pattern**:
  - **Uniqueness proofs**: Show `a = b` by reducing both to `default` via `uniq`.
  - **Subsingleton proofs**: Use `Subsingleton.elim` or `subsingleton_of_forall_eq`.
  - **Constructing `Unique`**: Either via `mk'` (inhabited + subsingleton) or directly (e.g., `PUnit`, `Fin 1`, `Unique.subtypeEq`).
  - **Dependent eliminations**: Use `uniqueElim` + `funext` to lift values at `default` to full dependent functions.
  - **Function properties**:
    - Injectivity + subsingleton codomain ⇒ subsingleton domain.
    - Surjectivity + unique domain ⇒ unique codomain.
    - Injectivity + inhabited domain + subsingleton codomain ⇒ unique domain.

- **Induction / cases**: Minimal; mostly structural reasoning (e.g., `Option.casesOn`, `Subtype.val` congruence).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Logic.IsEmpty` | Provides `IsEmpty`, used in `Pi.uniqueOfIsEmpty`, `Option` lemmas. |
| `Mathlib.Tactic.Inhabit` | Provides `inhabit` tactic, used in `nonempty_unique`. |

> **Note**: No heavy dependencies — this is a foundational logic module. Core logic (`Prop`, `Subsingleton`, `Inhabited`, `Function`) is assumed.

---

### Summary

This file formalizes the theory of *uniqueness* in dependent type theory: types with exactly one element. It emphasizes:
- **Definitional clarity**: `Unique` is a *type*, not a proposition, to preserve definitional behavior of `default`.
- **Constructive reasoning**: All constructions are explicit (e.g., `mk'`, `uniqueOfSubsingleton`).
- **Functional interactions**: How uniqueness interacts with function spaces, subtypes, and dependent products.

It serves as a foundational building block for higher-level structures (e.g., contractible types in homotopy type theory, or singleton classes in algebra).