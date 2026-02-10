### Technical Metadata Brief: `CategoryTheory.Functor` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Functor` | `Functor C D` (structure) | Represents a functor between categories `C` and `D`, extending a `Prefunctor` with proofs of identity and composition preservation. |
| `Functor.map_id` | `∀ X, map (𝟙 X) = 𝟙 (obj X)` | Axiom ensuring identity morphisms are preserved. |
| `Functor.map_comp` | `∀ f g, map (f ≫ g) = map f ≫ map g` | Axiom ensuring composition is preserved. |
| `Functor.id` | `C ⥤ C` | Identity functor on category `C`. |
| `Functor.comp` | `C ⥤ D → D ⥤ E → C ⥤ E` | Composition of functors (right-to-left: `F ⋙ G` applies `F` then `G`). |
| `Functor.map_comp_assoc` | `(F.map (f ≫ g)) ≫ h = F.map f ≫ F.map g ≫ h` | Helper lemma for associating compositions after applying a functor. |
| `Functor.comp_id`, `Functor.id_comp` | `F ⋙ 𝟭 D = F`, `𝟭 C ⋙ F = F` | Unit laws for functor composition. |
| `Functor.map_dite` | `F.map (if P then f else g) = if P then F.map f else F.map g` | Functor preserves dependent `if`-expressions (with decidable predicate). |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `map_`: for morphism-level actions (`map_id`, `map_comp`, `map_dite`, `comp_map`).
  - `obj`: for object-level action (`id_obj`, `comp` uses `obj` in `@[simps obj]`).
  - `comp_`: for composition-related lemmas (`comp_map`, `toPrefunctor_comp`).
  - `id_`: for identity-related lemmas (`id_obj`, `id_map`).
- **Notation**:
  - `C ⥤ D`: infix for `Functor C D` (precedence 26, like `→`).
  - `𝟭 C`: identity functor (subscript 1, `\sb1`).
  - `F ⋙ G`: functor composition (right-to-left, precedence 80).

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in `map_id`, `map_comp`, and `map_dite` to discharge category-theoretic goals automatically.
- **`rfl`**: Used in definitions and proofs where equality is definitional (e.g., `id_obj`, `id_map`, `comp_map`, `comp_id`, `id_comp`).
- **`rw [...]`**: Used in `map_comp_assoc` to rewrite using `map_comp`.
- **`dsimp`**: Used in `comp` definition to simplify definitions before rewriting.
- **`cases F`**: Used in unit laws to destruct the functor structure.

---

#### **4. Proof Logic**

- **Definitional proofs**: Most lemmas (e.g., `id_obj`, `id_map`, `comp_map`) are definitional (`rfl`) because the structure is designed to match the underlying operations.
- **Axiomatic verification**: `map_id` and `map_comp` are proven by `aesop_cat`, leveraging category axioms and simplifiers.
- **Structural reasoning**: Proofs like `comp_id`, `id_comp` use `cases F; rfl`, relying on extensionality of functors (i.e., equality is determined by `obj` and `map`).
- **Rewriting + associativity**: `map_comp_assoc` combines `map_comp` with `Category.assoc` to reassociate morphism chains.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Category.Basic` | Provides basic category theory infrastructure: `Category`, `obj`, `hom`, `𝟙`, `≫`, `assoc`, etc. |
| `Mathlib.Combinatorics.Quiver.Prefunctor` | Provides `Prefunctor`, which `Functor` extends. Defines prefunctorial `obj` and `map` without preservation axioms. |

---

### Summary

This file formalizes **functors between categories** in Lean 4 as *extended prefunctors* with proofs of identity and composition preservation. It introduces standard notation (`⥤`, `𝟭`, `⋙`), defines identity and composition, and proves basic algebraic laws (unit, associativity-like, and behavior under `if`). The proofs rely heavily on `aesop_cat` for automatic category reasoning and `rfl` for definitional equalities. The design aligns with the Stacks Project definition of functors and is foundational for higher-level constructions (e.g., natural transformations, adjunctions).