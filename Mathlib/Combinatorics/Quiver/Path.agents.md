### Technical Metadata Brief: Paths in Quivers (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Path` | `inductive Path {V : Type u} [Quiver V] (a : V) : V → Sort max (u + 1) v` | Inductive family of paths from `a` to `b` in quiver `V`. |
| `nil` | `Path a a` | Identity path (length 0). |
| `cons` | `Path a b → (b ⟶ c) → Path a c` | Extend path by one arrow. |
| `Hom.toPath` | `(e : a ⟶ b) → Path a b` | Embed arrow as length-1 path. |
| `length` | `Path a b → ℕ` | Counts number of arrows in a path. |
| `comp` | `Path a b → Path b c → Path a c` | Concatenation/composition of paths. |
| `toList` | `Path a b → List V` | Converts path to list of vertices (excluding target `b`). |
| `mapPath` | `F : V ⥤q W → Path a b → Path (F.obj a) (F.obj b)` | Action of prefunctor on paths. |

| Theorem | Type | Purpose |
|---------|------|---------|
| `comp_assoc` | `(p.comp q).comp r = p.comp (q.comp r)` | Associativity of path composition. |
| `length_comp` | `(p.comp q).length = p.length + q.length` | Length additive under composition. |
| `comp_inj` / `comp_inj'` | `p₁.comp q₁ = p₂.comp q₂ ↔ p₁ = p₂ ∧ q₁ = q₂` (under length conditions) | Injectivity of composition in both arguments. |
| `toList_inj` | `p.toList = q.toList ↔ p = q` (under subsingleton homs) | Paths inject into lists when homs are subsingletons. |
| `toList_comp` | `(p.comp q).toList = q.toList ++ p.toList` | `toList` reverses composition → contravariant. |
| `mapPath_comp` | `F.mapPath (p.comp q) = F.mapPath p.comp F.mapPath q` | `mapPath` preserves composition (functoriality). |
| `eq_toPath_comp_of_length_eq_succ` | `p.length = n + 1 ⇒ ∃ c, f, q, p = f.toPath.comp q` | Decomposition of non-nil paths into head arrow + tail path. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nil_`, `cons_`: for properties of the inductive constructors.
  - `length_`: for length-related lemmas.
  - `comp_`: for composition lemmas (`comp_assoc`, `comp_inj`, `comp_injective_left`, etc.).
  - `toList_`: for list conversion lemmas.
  - `mapPath_`: for prefunctor action lemmas.

- **Suffixes**:
  - `_left`, `_right`: indicate which argument is varied in injectivity (e.g., `comp_injective_left`, `comp_inj_right`).
  - `_eq_iff`: for equivalence statements (e.g., `comp_inj_left`, `toList_inj`).
  - `_ne`: for inequality lemmas (`nil_ne_cons`, `cons_ne_nil`).

- **General pattern**: `verb_object_property` (e.g., `comp_injective_right`, `toList_chain_nonempty`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction` | Structural induction on paths (e.g., `induction p`, `induction q`). |
| `cases` | Case analysis on paths or natural numbers (e.g., `rcases q₂ with _ | ⟨q₂, f₂⟩`). |
| `simp` | Simplification using `@[simp]` lemmas (`length_nil`, `comp_nil`, `toList_comp`, etc.). |
| `rw` | Rewriting using equalities (often after `simp` or `induction`). |
| `congr_arg` | To propagate equalities through constructors (e.g., `congr_arg Nat.succ`). |
| `injection` | From `inj`-style lemmas (e.g., `nil_ne_cons`, `heq_of_cons_eq_cons`). |
| `exact` / `rfl` | For trivial equalities. |
| `aesop` | Not present in this file — proofs are mostly manual/structural. |
| `dsimp` | Used in `mapPath_comp` to simplify definitional equalities. |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs over `Path` follow standard structural induction on the path:
  - Base case: `nil`.
  - Inductive step: `cons p e`, reducing to hypothesis on `p`.

- **Equality reasoning**:
  - Use `injection` on `cons`-equalities to extract equalities of components (`b = c`, `HEq p p'`, `HEq e e'`).
  - Use `cases` on paths or naturals to eliminate impossible cases (e.g., `succ ≠ zero`).

- **Length-based arguments**:
  - Often combine `length` with `induction` and `Nat` arithmetic lemmas (`Nat.succ.inj`, `Nat.add_left_cancel`).
  - `comp_inj` uses double induction on `q₁`, `q₂` with length equality to enforce structural equality.

- **Functoriality**:
  - `mapPath` lemmas proved by induction on path, using `mapPath_comp` to show compatibility with composition.

- **Subsingleton assumptions**:
  - Key for `toList_injective`: when hom-sets are subsingletons, paths are determined by their vertex list.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.Quiver.Prefunctor` | Defines quivers and prefunctors (`V ⥤q W`). |
| `Mathlib.Logic.Lemmas` | General logic lemmas (e.g., subsingleton reasoning, HEq). |
| `Batteries.Data.List.Basic` | Basic list operations (`++`, `Chain`, `injEq`, etc.). |

**Scope**: This module formalizes the *syntax* of paths in a quiver (as an inductive family), their composition, length, and interaction with prefunctors — foundational for higher-dimensional path structures (e.g., free category on a quiver, fundamental groupoid).

---

Let me know if you'd like a formalized summary in a specific format (e.g., for a documentation generator or AI agent training).