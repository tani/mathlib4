### Technical Metadata Brief: `PEquiv` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PEquiv α β` | `Type (u ⊔ v)` | Structure representing a *partial bijection* between subsets of `α` and `β`. Stored as `(toFun : α → Option β) × (invFun : β → Option α) × (inv : ∀ a b, a ∈ invFun b ↔ b ∈ toFun a)`. |
| `refl α` | `α ≃. α` | Identity partial equivalence: maps every element to itself (via `some`). |
| `symm f` | `β ≃. α` | Inverse of `f : α ≃. β`. Swaps `toFun` and `invFun`. |
| `trans f g` | `α ≃. γ` | Composition of `f : α ≃. β` and `g : β ≃. γ`, using `Option.bind`. |
| `ofSet s` | `α ≃. α` | Identity on set `s ⊆ α`, `none` elsewhere. Requires decidable membership. |
| `single a b` | `α ≃. β` | Partial equivalence swapping `a` and `b`, `none` elsewhere. Requires decidable equality. |
| `bot` / `⊥` | `α ≃. β` | Empty partial equivalence: maps everything to `none`. |
| `toPEquiv f` | `α ≃. β` | Embedding of a total equivalence `f : α ≃ β` into a partial equivalence. |
| `inj f` | `b ∈ f a₁ → b ∈ f a₂ → a₁ = a₂` | Injectivity of `f` on its domain. |
| `injective_of_forall_ne_isSome f a₂ h` | `∀ a₁ ≠ a₂, isSome (f a₁) → Injective f` | If `f` is defined everywhere except possibly `a₂`, then `f` is injective. |
| `injective_of_forall_isSome h` | `∀ a, isSome (f a) → Injective f` | If `f` is total (defined everywhere), then `f` is injective. |
| `self_trans_symm f` | `f.trans f.symm = ofSet {a | isSome (f a)}` | Composition of `f` with its inverse yields identity on domain of `f`. |
| `trans_symm_eq_iff_forall_isSome` | `f.trans f.symm = refl α ↔ ∀ a, isSome (f a)` | `f` is total iff `f ∘ f⁻¹ = id`. |
| `inf f g` | `α ≃. β` | Greatest lower bound (intersection) of two partial equivalences: agrees where `f = g`, else `none`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSome`: predicate for `Option` being non-empty (`isSome : Option α → Prop`).
  - `mem_`: membership in the graph of a partial equivalence (e.g., `mem_ofSet`, `mem_single`).
  - `ofSet`, `single`, `bot`: constructors for canonical examples.
  - `trans`, `symm`, `refl`: standard categorical operations.

- **Suffixes**:
  - `_iff`: characterizations involving logical equivalence (e.g., `ofSet_eq_some_iff`, `mem_single_iff`).
  - `_apply`: evaluation of the underlying function (e.g., `refl_apply`, `single_apply`).
  - `_rev`, `_self`: reversal or self-composition lemmas (e.g., `symm_trans_rev`, `self_trans_symm`).

- **Notation**:
  - `≃.` (infix `:25`) for `PEquiv` — distinct from `≃` (total equivalence).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_all`: simplification using `@[simp]` lemmas (e.g., `mem_def`, `eq_some_iff`, `Option.bind_eq_some'`).
- `rw`: rewriting using equivalences like `eq_some_iff`, `mem_iff_mem`.
- `split_ifs`: handling `if-then-else` cases (especially in `ofSet`, `single` definitions).
- `cases`: destructuring `Option` values (`h : f a = some b` or `none`).
- `ext`: extensionality for functions/structures (e.g., `PEquiv.ext`).
- `contrapose!`: for negated implications (e.g., proving `h2` from `¬h2 → ¬h1`).
- `push_neg`: moving negations inward (e.g., in `trans_eq_none`).
- `aesop` / `tauto`: not heavily used here — proofs are mostly manual and `simp`-driven.
- `dsimp`: simplifying definitions before `simp`.

---

#### **4. Proof Logic & Strategy**

- **Structure-based reasoning**: Proofs often proceed by:
  1. Extending to extensionality (`ext`) to reduce to pointwise equality.
  2. Unfolding definitions (`dsimp [PEquiv.trans]`, etc.).
  3. Using `Option` lemmas (`bind_eq_some'`, `eq_some_iff`, `eq_none_iff_forall_not_mem`).
  4. Leveraging the `inv` condition to swap membership between `f` and `f.symm`.

- **Induction / case analysis**:
  - On `Option` values (`cases h : f a`).
  - On decidability assumptions (e.g., `if h : a ∈ s then ... else ...`).
  - On equality (`split_ifs` for `if x = a then ...`).

- **Logical equivalences**:
  - Many lemmas are bidirectional (`↔`), proven via `constructor` and `simp`.
  - `mem_iff_mem` and `eq_some_iff` are central for bridging `f` and `f.symm`.

- **Injectivity proofs**:
  - Use `HasLeftInverse.injective` with explicit left inverse construction.
  - Rely on classical choice when needed (`Classical.em`, `Classical.choice`).

- **Order-theoretic properties**:
  - `≤` defined pointwise on graphs.
  - Antisymmetry via `ext` + `eq_none_iff_forall_not_mem`.
  - Infimum defined by agreement-on-domain + `none` elsewhere.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Data.Option.Basic` | Core `Option` operations (`bind`, `get`, `isSome`, `mem`, etc.). |
| `Batteries.Tactic.Congr` | `congr` tactic for functional extensionality. |
| `Mathlib.Data.Set.Basic` | Set membership, `Set.univ`, decidability of predicates. |
| `Mathlib.Tactic.Contrapose` | `contrapose!` for logical contrapositive reasoning. |

**Domain scope**: This module formalizes *partial equivalences* as a foundational structure for reasoning about partial bijections — useful in set theory, model theory, and formalization of computability (e.g., partial recursive functions). It interfaces with:
- `Equiv` (via `toPEquiv`)
- `Set` (via `ofSet`)
- `Option` (core data type for partiality)
- `PartialOrder` / `SemilatticeInf` (via `≤` and `inf`)

---

### Summary

This file provides a clean, extensible theory of *partial equivalences* (`≃.`), emphasizing:
- **Algebraic structure**: `refl`, `symm`, `trans` form a categoryoid.
- **Order structure**: pointwise inclusion gives a semilattice with bottom.
- **Constructors**: `ofSet`, `single`, `bot`, `toPEquiv`.
- **Key properties**: injectivity under totality, self-composition characterizations.

The style is highly `simp`-oriented, with heavy use of `Option` reasoning and decidability for concrete constructions.