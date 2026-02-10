### Technical Brief: Fibered Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPreFibered p` | `Class` | Defines a *prefibered category*: for any morphism `f : R ⟶ p.obj a`, there exists a cartesian lift `φ : b ⟶ a` over `f`. |
| `IsFibered p` | `Class` extending `IsPreFibered p` | Defines a *fibered category*: prefibered + closed under composition of cartesian morphisms. |
| `exists_isCartesian'` | `∀ {a : 𝒳} {R : 𝒮} (f : R ⟶ p.obj a), ∃ (b : 𝒳) (φ : b ⟶ a), IsCartesian p f φ` | Core existence condition for prefibered categories (prime variant for definitional use). |
| `exists_isCartesian` | `∀ {a : 𝒳} {R S : 𝒮} (ha : p.obj a = S) (f : R ⟶ S), ∃ (b : 𝒳) (φ : b ⟶ a), IsCartesian p f φ` | More usable version: uses equality `p.obj a = S` to simplify target. |
| `pullbackObj ha f` | `𝒳` | Choice of domain object for a cartesian lift of `f : R ⟶ S` over `a` with `p.obj a = S`. |
| `pullbackMap ha f` | `pullbackObj ha f ⟶ a` | Choice of cartesian morphism lying over `f`. |
| `pullbackMap.IsCartesian` | `IsCartesian p f (pullbackMap ha f)` | Proof that `pullbackMap` is cartesian. |
| `isStronglyCartesian_of_isCartesian` | Instance | In a fibered category, every cartesian morphism is strongly cartesian. |
| `isStronglyCartesian_of_exists_isCartesian` | Lemma | If *every* morphism has a *strongly* cartesian lift, then any cartesian lift is strongly cartesian. |
| `of_exists_isStronglyCartesian` | Lemma | Alternate constructor for `IsFibered`: if every morphism has a *strongly* cartesian lift, then `p` is fibered. |
| `pullbackPullbackIso` | `pullbackObj ha (g ≫ f) ≅ pullbackObj (pullbackObj_proj ha f) g` | Associativity of pullbacks in a fibered category: iterated pullbacks are isomorphic. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isCartesian_`, `isStronglyCartesian_`: predicates on morphisms.
  - `pullback_`: refers to chosen lifts in prefibered/fibered categories.
  - `exists_`: existential witnesses (e.g., `exists_isCartesian'`).
- **Suffixes**:
  - `'` (prime): used for base definitions where non-definitional equalities may arise (e.g., `exists_isCartesian'`).
  - `proj`: projection of an object via `p` (e.g., `pullbackObj_proj`).
- **Variables**:
  - `ha : p.obj a = S`: used to align target of `p` with codomain of `f`.
  - `f : R ⟶ S`, `g : T ⟶ R`, etc.: base morphisms.
  - `φ`, `ψ`: lifts of `f`, `g`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `classical` / `Classical.choose` | To extract witnesses from existential quantifiers (e.g., `pullbackObj`, `pullbackMap`). |
| `simp only [...]` | Simplify using definitional equalities and lemmas like `IsCartesian.fac`, `assoc`. |
| `rw [← fac p ...]`, `congr 1`, `apply map_uniq` | Standard reasoning in cartesian/universal property contexts. |
| `intro π ⟨hπ, hπ_comp⟩` | Unpack lift conditions (commuting triangle + projection condition). |
| `subst_hom_lift p f φ` | Simplify using hom-lift equality in strongly cartesian contexts. |
| `rwa [...]` | Rewrite and then apply assumption. |
| `inferInstance` | Automatically infer class instances (e.g., `IsCartesian`). |

---

#### **4. Proof Logic**

- **Existential construction**: Use `Classical.choose` to pick a cartesian lift; `Classical.choose_spec` ensures it satisfies the cartesian condition.
- **Uniqueness arguments**: Often rely on the universal property of cartesian morphisms (`IsCartesian.map`, `IsCartesian.fac`, `map_uniq`).
- **Strong cartesian ⇒ cartesian**: Trivial (instance), but the reverse direction (`cartesian ⇒ strongly cartesian`) requires fiberedness (`comp` axiom) or existence of *all* strongly cartesian lifts.
- **Iso construction**: Use `domainUniqueUpToIso` to show two cartesian lifts over the same morphism are isomorphic.
- **Associativity of pullbacks**: Construct iso via universal property of pullbacks and uniqueness up to iso.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.FiberedCategory.Cartesian
  ```
  This module builds on definitions and lemmas about *cartesian morphisms* (`IsCartesian`), their universal properties, and hom-lifts.

- **Universe polymorphism**:
  ```lean
  universe v₁ v₂ u₁ u₂
  ```
  Supports categories in arbitrary universes.

- **Core dependencies**:
  - `CategoryTheory.Category`
  - `CategoryTheory.Functor`
  - `CategoryTheory.IsHomLift`
  - `Classical` (for choice-based constructions)

---

#### **6. Summary**

This file formalizes the foundational theory of (pre)fibered categories as in SGA 1, VI.6.1. It distinguishes between:
- **Prefibered**: existence of cartesian lifts,
- **Fibered**: existence + closure under composition,
- **Strongly cartesian**: universal property stronger than cartesian.

It provides:
- Concrete constructions (`pullbackObj`, `pullbackMap`) using choice,
- Equivalence between “cartesian + fibered” and “all morphisms have strongly cartesian lifts”,
- Structural lemmas like associativity of pullbacks in fibered categories.

The formalization is designed for practical use: lemmas like `exists_isCartesian` avoid definitional issues, and helper lemmas (`isStronglyCartesian_of_exists_isCartesian`, `of_exists_isStronglyCartesian`) support modular proofs.