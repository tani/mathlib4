### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MulHom.noncommCoprod` | `∀ {M N P} [Mul M] [Mul N] [Semigroup P], (f : M →ₙ* P) → (g : N →ₙ* P) → (∀ m n, Commute (f m) (g n)) → M × N →ₙ* P` | Constructs the *noncommutative coproduct* of two multiplicative homomorphisms `f`, `g` into a common semigroup codomain, assuming their images commute pointwise. |
| `MonoidHom.noncommCoprod` | `∀ {M N P} [MulOneClass M] [MulOneClass N] [Monoid P], (f : M →* P) → (g : N →* P) → (∀ m n, Commute (f m) (g n)) → M × N →* P` | Same as above, but for *unital* monoid homomorphisms (i.e., `MonoidHom`s). |
| `noncommCoprod_apply` | `(f.noncommCoprod g comm) (m, n) = f m * g n` | Describes the action of the constructed homomorphism on pairs. *(Implicitly used via `noncommCoprod` definition; not explicitly stated but standard.)* |
| `noncommCoprod_apply'` | `(f.noncommCoprod g comm) (m, n) = g n * f m` | Alternate form using commutativity to reverse order. |
| `comp_noncommCoprod` (for `MulHom`) | `h.comp (f.noncommCoprod g comm) = (h.comp f).noncommCoprod (h.comp g) _` | Functoriality: precomposing with `h` commutes with forming the noncommutative coproduct. |
| `comp_noncommCoprod` (for `MonoidHom`) | Same as above, but for `MonoidHom`. | Same as above, but for unital maps. |
| `noncommCoprod_comp_inl` | `(f.noncommCoprod g comm).comp (inl M N) = f` | The coproduct recovers `f` when restricted to the left factor. |
| `noncommCoprod_comp_inr` | `(f.noncommCoprod g comm).comp (inr M N) = g` | The coproduct recovers `g` when restricted to the right factor. |
| `noncommCoprod_unique` | `(f.comp inl).noncommCoprod (f.comp inr) _ = f` | Universal property: any map out of `M × N` is uniquely determined by its components via the coproduct construction. |
| `noncommCoprod_inl_inr` | `(inl).noncommCoprod (inr) commute_inl_inr = id` | Special case: the canonical coproduct of the canonical injections is the identity on `M × N`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `noncommCoprod_`: for definitions and theorems about the noncommutative coproduct.
  - `comp_`: for theorems about composition with another homomorphism.
  - `inl`, `inr`: for canonical injections into product type.
- **Suffixes**:
  - `_apply`: standard for function extensionality lemmas (e.g., `noncommCoprod_apply`).
  - `_apply'`: variant with reversed order (due to commutativity).
  - `_unique`: for uniqueness statements.
  - `_inl_inr`: for canonical cases involving injections.
- **General pattern**: `noncommCoprod` is used for both `MulHom` and `MonoidHom`, with namespace disambiguation.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `ext`: extensionality (used heavily to prove equality of homomorphisms).
  - `simp` / `simp only`: simplification, especially with `Prod` and homomorphism properties.
  - `rw`: rewriting using equalities (e.g., commutativity assumptions).
  - `simpa`: simplification with a specific lemma (`[using]` pattern).
- **Algebraic reasoning**:
  - `map_mul`, `map_one`: properties of homomorphisms.
  - `mul_mul_mul_comm`, `Commute.mul_mul_mul_comm`: used to justify reordering under commutativity.
- **Typeclass inference**:
  - Implicit use of `[Semigroup P]`, `[Monoid P]`, etc., to ensure algebraic structure.

---

#### 4. **Proof Logic**

- **Structure**:
  - **Definition**: Constructed via `def` with `toFun` and `map_*'` fields; proofs of homomorphism laws rely on the `Commute` assumption.
  - **Theorems**:
    - Most proofs are short and use `ext` + `simp` or `simpa`.
    - For `comp_noncommCoprod`, the proof is `ext fun x => by simp`, leveraging homomorphism property of `h`.
    - For `noncommCoprod_unique`, the proof uses `ext` + `simp` with definitions of `inl`, `inr`, and `coprod_apply`.
    - `noncommCoprod_inl_inr` is a direct corollary of `noncommCoprod_unique`.
- **Induction**: Not used — all proofs are pointwise and rely on algebraic properties and simplification.

---

#### 5. **Imports**

- `Mathlib.Algebra.Group.Commute.Hom`: Provides `Commute`, `MulHom`, `MonoidHom`, and related lemmas (e.g., `map`, `commute_inl_inr`).
- `Mathlib.Algebra.Group.Prod`: Provides product types `M × N`, projections, and canonical injections `inl`, `inr`.

> **Note**: The file does *not* import `Mathlib.Algebra.Group.Commute` directly — only the hom-specific parts (`Commute.Hom`) are used.

--- 

This module formalizes the universal property of the *noncommutative* product (coproduct in the category of monoids with commuting images), serving as a building block for more general constructions like `noncommPiCoprod`.