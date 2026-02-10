### Technical Brief: `ComposableArrows` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ComposableArrows (n : ℕ)` | `Type u → [Category C] → Type u` | Type of functors `Fin (n + 1) ⥤ C`, i.e., sequences of `n` composable arrows. |
| `obj' i hi` | `F.obj' i : C` | The `i`-th object in the diagram `F : ComposableArrows C n`, for `i ≤ n`. |
| `map' i j hij hjn` | `F.map' i j : F.obj' i ⟶ F.obj' j` | The structure map between `i`-th and `j`-th objects, for `i ≤ j ≤ n`. |
| `left`, `right`, `hom` | `F.left`, `F.right`, `F.hom : F.left ⟶ F.right` | Leftmost, rightmost objects and the canonical composite map. |
| `mk₀ X` | `ComposableArrows C 0` | Singleton diagram (one object). |
| `mk₁ f` | `X₀ ⟶ X₁ → ComposableArrows C 1` | Diagram of one arrow `f`. |
| `mk₂ f g`, `mk₃ f g h`, ..., `mk₅ ...` | `ComposableArrows C n` for `n = 2..5` | Explicit constructors for small `n`, defined recursively via `precomp`. |
| `precomp f` | `f : X ⟶ F.left → ComposableArrows C (n + 1)` | Inserts `f` on the left, shifting `F` right — key definitional constructor. |
| `whiskerLeft F Φ` | `F : ComposableArrows C m, Φ : Fin (n+1) ⥤ Fin (m+1) → ComposableArrows C n` | Precomposition with a functor between indexing categories. |
| `δ₀Functor`, `δlastFunctor` | `ComposableArrows C (n+1) ⥤ ComposableArrows C n` | Face functors: forget first/last object. |
| `homMk`, `isoMk`, `homMkSucc`, `isoMkSucc`, `homMk₁`, `isoMk₁`, ..., `homMk₅`, `isoMk₅` | Constructors for morphisms / isomorphisms | Inductive construction using only adjacent naturality squares. |
| `ext`, `ext₁`, `ext₂`, ..., `ext₅`, `ext_succ` | Extensionality lemmas | Equality of diagrams determined by object equalities + compatibility of maps. |
| `precomp_surjective`, `mk₁_surjective`, ..., `mk₅_surjective` | Existence of precomp decomposition | Every `F : ComposableArrows C (n+1)` is `F₀.precomp f` for some `F₀, f`. |

**Notable Theorems (definitional properties):**
- `precomp_δ₀`: `(F.precomp f).δ₀ = F` — *definitional* (rfl).
- `map' (mk₂ f g) 0 1 = f`, `map' (mk₂ f g) 0 2 = f ≫ g`, etc. — verified by `dsimp`.
- `homMkSucc_app_zero`, `homMkSucc_app_succ`, etc. — definitional on constructors.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `obj'`, `map'`, `app'`: primed versions for natural-number-indexed objects/maps (vs. `Fin`-indexed).
  - `mk₀`, `mk₁`, `mk₂`, ..., `mk₅`: constructors for small `n`.
  - `homMk`, `isoMk`, `homMkSucc`, `homMk₁`, `homMk₂`, ..., `homMk₅`: morphism/isomorphism constructors.
  - `δ₀`, `δlast`: face maps (standard simplicial notation).
  - `whiskerLeft`: precomposition with a functor.

- **Suffixes:**
  - `'` (prime): indexing by `ℕ` (e.g., `obj'`, `map'`, `app'`).
  - `Succ`: inductive step over `n → n+1` (e.g., `homMkSucc`, `ext_succ`).
  - `Functor`: when constructing a functor (e.g., `δ₀Functor`, `whiskerLeftFunctor`).

- **Variables:**
  - `F, G`: generic diagrams.
  - `f, g, h, i, j`: arrows in `C`.
  - `α, β`: components of morphisms.
  - `app₀`, `app₁`, ..., `app₅`: components of morphisms in `mkₙ`-style constructors.

---

#### **3. Tactic Stack**

- **`valid` macro**: custom tactic for quick proofs of `i ≤ n` goals using `assumption`, `zero_le`, `le_rfl`, `transitivity`, and `omega`.
- **`aesop_cat`**: used in default arguments for naturality conditions (e.g., `w : ... := by aesop_cat`).
- **`fin_cases`**: for case analysis on `Fin` indices.
- **`dsimp`**: heavily relied upon — hence `set_option simprocs false` to avoid breakage from aggressive simplification.
- **`omega`**: for arithmetic reasoning on `i ≤ n`, `i < n`.
- **`rfl`, `congr_app`, `Functor.ext_of_iso`**: for equality proofs.
- **`rw`, `simp`, `assoc`, `id_comp`, `comp_id`**: standard category-theoretic rewrites.
- **`induction'`**: for inductive proofs (e.g., `homMk` naturality).

---

#### **4. Proof Logic**

- **Inductive structure on `n`**: many lemmas (e.g., `homMk`, `isoMk`, `ext`, `hom_ext`) are proved by induction on `n`, often reducing to smaller `n` via `δ₀` or `δlast`.
- **Naturality reduction**: morphism/isomorphism constructors (`homMk`, `isoMk`, `homMkSucc`, etc.) only require naturality for *adjacent* maps (`i ≤ i+1`), then prove full naturality by induction.
- **Extensionality via isomorphism**: `ext` lemmas often construct an isomorphism using `isoMk` and apply `Functor.ext_of_iso`.
- **Definitional reasoning**: many equalities (e.g., `map' (mk₂ f g) 0 1 = f`) hold *definitionally* (`rfl` or `dsimp`), a key design goal.
- **Surjectivity proofs**: every `F : ComposableArrows C (n+1)` decomposes as `F₀.precomp f`, proved via `ext_succ`/`extₙ` using `δ₀` and `F.map' 0 1`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Category.Preorder` | For `homOfLE`, ordering on `Fin`. |
| `Mathlib.CategoryTheory.EqToHom` | For `eqToHom`, `eqToIso`, used in extensionality lemmas. |
| `Mathlib.CategoryTheory.Functor.Const` | For `mk₀`, constant functor. |
| `Mathlib.Order.Fin.Basic` | For `Fin`, `homOfLE`, `leOfHom`, arithmetic on `Fin`. |
| `Mathlib.Tactic.FinCases` | For case analysis on `Fin` indices. |
| `Mathlib.Tactic.SuppressCompilation` | To suppress compilation warnings (likely for `set_option simprocs false`). |

---

### Summary

This file formalizes the category of **`n`-fold composable arrows** in a category `C`, identified with functors `Fin (n+1) ⥤ C`. Its design emphasizes **definitional properties** (e.g., `precomp_δ₀ = rfl`) and **inductive construction** of diagrams and morphisms. The `precomp` operation is central, enabling recursive building of diagrams and face maps (`δ₀`, `δlast`). The library provides explicit constructors (`mk₁`–`mk₅`) and extensionality principles (`ext₁`–`ext₅`) tailored for practical use in higher categorical constructions (e.g., spectral sequences, simplicial operations). The heavy use of `dsimp`-friendly definitions necessitated disabling simprocs, but the long-term goal is to refactor to avoid such workarounds.