### Technical Brief: `Mathlib.Data.TypeVec.MvFunctor`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `MvFunctor n F` | `TypeVec n → Type* → Type (u+1)` | Typeclass for *multivariate functors* from type vectors to types; provides `map : α ⟹ β → F α → F β`. |
| `f <$$> x` | Notation for `MvFunctor.map f x` | Action of `MvFunctor` on morphisms (arrows between type vectors). |
| `LiftP P x` | `Prop` | Relational lifting of a predicate family `P : ∀ i, α i → Prop` to `F α`. Expresses that `x : F α` is “supported” by a lift through subtypes. |
| `LiftR R x y` | `Prop` | Relational lifting of a binary relation family `R` to pairs `x, y : F α`. Generalizes relational parametricity. |
| `supp x i` | `Set (α i)` | Support of `x : F α` at index `i : Fin2 n`: elements `y : α i` such that any predicate `P` with `LiftP P x` must satisfy `P i y`. |
| `of_mem_supp` | Theorem | If `LiftP P x` holds and `y ∈ supp x i`, then `P i y`. |
| `LawfulMvFunctor F` | Class | Ensures `map` behaves like a functor: preserves identities and composition. |
| `id_map`, `comp_map` | Theorems | Consequences of `LawfulMvFunctor`: `id <$$> x = x`, `(h ⊚ g) <$$> x = h <$$> g <$$> x`. |
| `LiftP' P x`, `LiftR' R x y` | Definitions | Adapted versions of `LiftP`/`LiftR` for predicates/relations encoded as arrows via `PredLast`/`RelLast`. |
| `LiftP_def`, `LiftR_def` | Theorems | Equivalence between `LiftP'`/`LiftR'` and the original `LiftP`/`LiftR`, using `Subtype_` and `subtypeVal`. |
| `LiftP_PredLast_iff`, `LiftR_RelLast_iff` | Theorems | Show that lifting via `PredLast'`/`RelLast'` (indexed version) coincides with `PredLast`/`RelLast` (concrete version), using `exists_iff_exists_of_mono`. |
| `ofEquiv` | Definition | Transfers `MvFunctor` structure along equivalence of type families: if `F'` is a functor and `F ≃ F'`, then `F` is a functor. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `LiftP`, `LiftR`: predicate/relational lifting.
  - `supp`: support.
  - `of_`: conversion or adaptation (e.g., `ofEquiv`, `of_mem_supp`).
  - `id_map`, `comp_map`: functor laws.
- **Suffixes**:
  - `'` (prime): variant or adapted version (e.g., `LiftP'`, `LiftR'`).
  - `'_iff`: equivalence with another definition (e.g., `LiftP_PredLast_iff`).
- **Operators**:
  - `<$$>`: infix for `map`.
  - `⊚`: composition of type vector morphisms (`TypeVec.comp`).
  - `:::`: cons for `TypeVec` (prepend a type to a vector).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

- `simp` / `simp only` / `simp (config := { ... })`: simplification with custom unfoldings (`unfoldPartialApp := true`).
- `rw`: rewriting using equalities (e.g., `map_map`, `id_map`, `comp_assoc`).
- `ext`: extensionality to prove equality of functions/relations.
- `cases`: case analysis on `Fin2` indices (`Fin2.fz`, `Fin2.fs`).
- `convert`, `congr`: for congruence closure and partial equality.
- `apply`, `intro`, `rintro`, `refine`: standard intro/apply reasoning.
- `dsimp`: definitional simplification (especially for `LiftP'`, `LiftR'`).
- `exists_iff_exists_of_mono`: key lemma for equivalence of existential statements via monic/section pairs.

---

#### **4. Proof Logic**

- **Inductive structure on `n`** (vector length) is common, especially in `LiftP_PredLast_iff` and `LiftR_RelLast_iff`, where `n + 1` is handled by splitting on `Fin2.fz` (first index) and `Fin2.fs i` (rest).
- **Case analysis on `Fin2 n` indices** to handle vector structure.
- **Equivalence-based reasoning** via `exists_iff_exists_of_mono`, which leverages a retraction pair `(f, g)` with `f ⊚ g = id` to transfer existence across maps.
- **Definitional simplification + extensionality** to show equality of complex projections (e.g., `fst`, `snd`) after lifting.
- **Functor law usage**: `map_map`, `id_map` used to reduce compositions and identities in proofs.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Data.Fin.Fin2`: finite index types (`Fin2 n`).
  - `Mathlib.Data.TypeVec`: type vectors, morphisms (`α ⟹ β`), composition (`⊚`), identity (`TypeVec.id`), cons (`:::`), projections (`prod.fst`, `prod.snd`), etc.
  - `Mathlib.Logic.Equiv.Defs`: equivalences (`≃`), used in `ofEquiv`.

- **Scope**:
  - `MvFunctor` namespace defines multivariate functors over type vectors.
  - Focus on *relational parametricity*, *support*, and *lifting* for reasoning about polymorphic behavior.
  - Designed for formalizing parametricity and abstraction theorems in dependent type theory.

--- 

This module provides foundational machinery for reasoning about *indexed* or *multivariate* functors in Lean, especially in the context of parametricity and relational lifting over dependent type vectors.