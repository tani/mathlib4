### Technical Metadata Brief: Strong Epimorphisms and Monomorphisms in Lean 4 (CategoryTheory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `StrongEpi (f : P ⟶ Q)` | `Prop` | Class defining a *strong epimorphism*: an epimorphism with the **left lifting property (LLP)** w.r.t. all monomorphisms. |
| `StrongMono (f : P ⟶ Q)` | `Prop` | Class defining a *strong monomorphism*: a monomorphism with the **right lifting property (RLP)** w.r.t. all epimorphisms. |
| `StrongEpi.mk'` | `Epi f → (∀ X Y z [Mono z] u v sq, sq.HasLift) → StrongEpi f` | Constructor for `StrongEpi` using explicit lifting data. |
| `StrongMono.mk'` | `Mono f → (∀ X Y z [Epi z] u v sq, sq.HasLift) → StrongMono f` | Constructor for `StrongMono` using explicit lifting data. |
| `strongEpi_comp` | `[StrongEpi f] → [StrongEpi g] → StrongEpi (f ≫ g)` | Composition of strong epimorphisms is strong. |
| `strongMono_comp` | `[StrongMono f] → [StrongMono g] → StrongMono (f ≫ g)` | Composition of strong monomorphisms is strong. |
| `strongEpi_of_strongEpi` | `[StrongEpi (f ≫ g)] → StrongEpi g` | Right factor of a strong epi is strong. |
| `strongMono_of_strongMono` | `[StrongMono (f ≫ g)] → StrongMono f` | Left factor of a strong mono is strong. |
| `strongEpi_of_isIso` | `[IsIso f] → StrongEpi f` | Isomorphisms are strong epimorphisms. |
| `strongMono_of_isIso` | `[IsIso f] → StrongMono f` | Isomorphisms are strong monomorphisms. |
| `StrongEpi.of_arrow_iso` / `StrongMono.of_arrow_iso` | `Arrow.mk f ≅ Arrow.mk g → StrongEpi f → StrongEpi g` | Strongness is preserved under arrow isomorphism. |
| `isIso_of_mono_of_strongEpi` | `[Mono f] → [StrongEpi f] → IsIso f` | A mono + strong epi ⇒ iso (key for balancedness). |
| `isIso_of_epi_of_strongMono` | `[Epi f] → [StrongMono f] → IsIso f` | An epi + strong mono ⇒ iso. |
| `StrongEpiCategory` | `Prop` | Class for categories where **every epi is strong**. |
| `StrongMonoCategory` | `Prop` | Class for categories where **every mono is strong**. |
| `balanced_of_strongEpiCategory` | `[StrongEpiCategory C] → Balanced C` | Strong epi categories are balanced. |
| `balanced_of_strongMonoCategory` | `[StrongMonoCategory C] → Balanced C` | Strong mono categories are balanced. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `strongEpi_`, `strongMono_`: for theorems about strong epimorphisms/monomorphisms.
  - `isIso_of_`: characterizing isomorphisms via additional properties.
  - `of_`: constructing instances from weaker assumptions (e.g., `strongEpi_of_strongEpi`, `strongEpi_of_isIso`).
- **Suffixes**:
  - `_comp`: composition closure.
  - `_of_`: implication from a stronger property (e.g., `strongEpi_of_strongEpi`).
  - `_iff_of_arrow_iso`: equivalence under arrow isomorphism.
- **Class names**:
  - `StrongEpi`, `StrongMono`: properties of a single morphism.
  - `StrongEpiCategory`, `StrongMonoCategory`: global properties of a category.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `intros`: for introducing variables and hypotheses.
- `infer_instance`: to discharge typeclass goals (e.g., `Epi`, `Mono`, lifting properties).
- `simp`, `simp only`, `simp_rw`: simplification using definitional equalities and lemmas (e.g., `Category.assoc`, `sq.w`, `cancel_mono`, `cancel_epi`).
- `aesop_cat`: a custom tactic for categorical reasoning (used in `isIso_of_mono_of_strongEpi`).
- `constructor`: to split conjunctions or class goals.
- `rw`, `apply`, `exact`: basic rewriting and application.
- `by aesop_cat`: used for concise categorical reasoning where standard `aesop` may not suffice.

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Most proofs follow a pattern: *verify the defining property* (e.g., `epi`, `mono`, or lifting) and *invoke existing lifting data* via `infer_instance`.
- **Lifting property arguments**:
  - For `StrongEpi`, given a lifting square with a mono `z`, use `hf` (or `llp`) to get a lift.
  - For `StrongMono`, dual reasoning with `rlp`.
- **Factorization arguments**:
  - To show `g` is strong epi when `f ≫ g` is, construct a lift for `g` using the lift for `f ≫ g`, then use cancellation (mono/epi) to verify it works.
- **Arrow isomorphism invariance**:
  - Prove via `Arrow.iso_w'` and lifting preservation under isomorphism (`HasLiftingProperty.of_arrow_iso_left/right`).
- **Balancedness**:
  - Reduce to `isIso_of_mono_of_strongEpi` or `isIso_of_epi_of_strongMono`, using the global assumption that all epis/monos are strong.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Balanced`: Provides the `Balanced` class and related lemmas (e.g., definition of balanced categories).
- `Mathlib.CategoryTheory.LiftingProperties.Basic`: Core lifting property machinery (`HasLiftingProperty`, `CommSq`, `Arrow`, `Arrow.iso_w'`, etc.).

These imports indicate the module sits in the **category theory hierarchy**, building on lifting properties and categorical balance.

--- 

Let me know if you'd like a dualized version (strong monos ↔ strong epi duals) formalized or a summary of the dualization strategy.