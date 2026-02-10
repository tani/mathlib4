### Technical Brief: `FinVec` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `seq` | `∀ {m}, (Fin m → α → β) → (Fin m → α) → Fin m → β` | Applies a vector of functions pointwise to a vector of arguments; definitionally expands to `![f 0 (v 0), f 1 (v 1), ...]` when applied to `![]`. |
| `seq_eq` | `seq f v = fun i => f i (v i)` | Core lemma: `seq` is extensionally equal to pointwise application. Enables reflection-style proofs. |
| `map` | `seq fun _ => f` | Maps a function `f : α → β` over a vector; definitionally `![f (v 0), f (v 1), ...]`. |
| `map_eq` | `map f v = f ∘ v` | Shows `map` is extensionally equal to function composition. Used to rewrite `f ∘ ![a₀, a₁] = ![f a₀, f a₁]`. |
| `etaExpand` | `map id v` | Reifies a function `v : Fin m → α` as a literal vector `![v 0, v 1, ...]`. |
| `etaExpand_eq` | `etaExpand v = v` | Proves `v = ![v 0, v 1, ...]` definitionally via `etaExpand`. Enables *proof by reflection* for vector equalities. |
| `Forall` | `(Fin m → α) → Prop → Prop` | Quantifier over vectors with definitional behavior matching `∀ x, P x` when expanded over `![]`. |
| `forall_iff` | `Forall P ↔ ∀ x, P x` | Equates `Forall` with standard universal quantification; used to convert `∀ f, P f` ↔ `∀ a₀ a₁, P ![a₀, a₁]`. |
| `Exists` | `(Fin m → α) → Prop → Prop` | Existential quantifier over vectors, definitional on `![]`. |
| `exists_iff` | `Exists P ↔ ∃ x, P x` | Equates `Exists` with standard existential quantification. |
| `sum` | `[Add α] [Zero α] ⇒ (Fin m → α) → α` | Sum over a vector, with definitional behavior matching `∑ i, a i`. |
| `sum_eq` | `[AddCommMonoid α] ⇒ sum a = ∑ i, a i` | Relates `sum` to the standard big operator sum; e.g., `∑ i, a i = a 0 + a 1 + a 2` for `m = 3`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `seq_`, `map_`, `etaExpand_`, `forall_`, `exists_`, `sum_`: Standard prefix for definitions and their equational lemmas.
- **Suffixes**:
  - `_eq`: Indicates a definitional or extensional equality lemma (e.g., `seq_eq`, `map_eq`, `etaExpand_eq`, `sum_eq`).
  - `_iff`: Used for logical equivalence lemmas (`forall_iff`, `exists_iff`).
- **No explicit `is_` or `prop_` prefixes** — this module focuses on *computational* rewrites, not propositional properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: Rewriting with simplification rules (e.g., unfolding `seq`, `seq_eq`).
- `refine ... i.cases ...`: Case analysis on `i : Fin (n+1)` (via `Fin.cases` or `i.cases`).
- `rfl`: For definitional equalities (e.g., base cases, `seq` on `![]`).
- `rw [...]`: Rewriting using lemmas like `Matrix.cons_val_succ`, `Fin.sum_univ_castSucc`.
- `simp only [...]`: Simplifying with precise lemmas (e.g., `Fin.forall_fin_succ_pi`, `Matrix.vecCons`).
- `Subsingleton.elim`: For `m = 0` case, leveraging that `Fin 0 → α` is a subsingleton.

No heavy automation (e.g., `linarith`, `ring`, `aesop`) — proofs are mostly structural and definitional.

---

#### **4. Proof Logic**

- **Inductive structure on `m : ℕ`**:
  - Base case `m = 0`: Use `Subsingleton.elim` or `Fin.forall_fin_zero_pi`/`Fin.exists_fin_zero_pi`.
  - Inductive step `m = n + 1` or `n + 2`:
    - Use `Fin.cases` or `i.cases` to split on index `i = 0` vs `i > 0`.
    - Apply `Matrix.cons_val_succ` to handle successor indices.
    - Leverage `sum_eq` inductively for `sum`, using `Fin.sum_univ_castSucc`.
- **Reflection-style reasoning**:
  - Prove `f = ![f 0, f 1]` by showing `f = etaExpand f`, then `etaExpand f = ![f 0, f 1]` definitionally.
  - All definitions are crafted to *definitionally* match `![]` notation when applied to vectors built via `Matrix.vecCons`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Data.Fin.VecNotation`: Provides `![]` notation and `Matrix.vecCons`/`vecTail`.
  - `Mathlib.Algebra.BigOperators.Fin`: Provides `∑ i, a i` over `Fin m`.
- **Scope**: Formalization of *finite vectors as functions* `Fin m → α`, with emphasis on:
  - Definitional equality with `![]` notation.
  - Enabling *proof by reflection* (e.g., simplifying vector equalities/quantifiers).
- **No typeclass assumptions** in definitions (only in `sum`/`sum_eq`: `Add α`, `Zero α`, `AddCommMonoid α`).

---

### Summary

This module provides a *computational interface* for reasoning about finite vectors (`Fin m → α`) in Lean, where definitions are engineered to match `![]` notation *definitionally*. It enables efficient "proof by reflection" by ensuring:
- `seq`, `map`, `etaExpand`, `sum`, `Forall`, `Exists` unfold to expected syntax on `![]`.
- Corresponding `_eq`/`_iff` lemmas bridge them to standard mathematical operations.

Ideal for tactic authoring or metaprogramming where definitional behavior matters (e.g., simplifying vector expressions automatically).