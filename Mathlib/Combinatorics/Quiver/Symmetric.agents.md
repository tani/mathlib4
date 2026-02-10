### Technical Metadata Brief: Symmetric Quivers and Arrow Reversal in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Symmetrify V` | `Type u → Type u` | Type synonym for the symmetrized quiver: adds formal inverses to each arrow. |
| `symmetrifyQuiver` | `[Quiver V] → Quiver (Symmetrify V)` | Equips `Symmetrify V` with a quiver structure: `Hom a b = (a ⟶ b) ⊕ (b ⟶ a)`. |
| `HasReverse` | `Class` | Quivers where each arrow `f : a ⟶ b` has an assigned reverse `f.reverse : b ⟶ a`. |
| `reverse` | `(f : a ⟶ b) → (b ⟶ a)` | The reverse map, defined via `HasReverse.reverse'`. |
| `HasInvolutiveReverse` | `Class` extends `HasReverse` | Adds condition `reverse (reverse f) = f`. |
| `reverse_reverse` | `reverse (reverse f) = f` | Involutivity of `reverse`, under `HasInvolutiveReverse`. |
| `reverse_inj` | `reverse f = reverse g ↔ f = g` | `reverse` is injective under involutivity. |
| `eq_reverse_iff` | `f = reverse g ↔ reverse f = g` | Equivalence between being a reverse and being reversed. |
| `Prefunctor.MapReverse` | `Prop` | Class of prefunctors preserving reverses: `φ.map (reverse e) = reverse (φ.map e)`. |
| `Path.reverse` | `Path a b → Path b a` | Reverses a path using arrow reversal. |
| `Path.reverse_comp` | `(p.comp q).reverse = q.reverse.comp p.reverse` | Reverse of composite path is reverse of second followed by reverse of first. |
| `Path.reverse_reverse` | `p.reverse.reverse = p` | Path reversal is involutive under `HasInvolutiveReverse`. |
| `Symmetrify.of` | `V ⥤q Symmetrify V` | Inclusion functor sending each arrow to its "forward" copy (`Sum.inl`). |
| `Symmetrify.lift` | `V ⥤q V' → Symmetrify V ⥤q V'` | Universal lift of a prefunctor to a quiver with `HasReverse`. |
| `Symmetrify.lift_spec` | `of ⋙q lift φ = φ` | `lift φ` extends `φ` along `of`. |
| `Symmetrify.lift_reverse` | `lift φ` preserves reverses (under `HasInvolutiveReverse`). |
| `Symmetrify.lift_unique` | Uniqueness of lift preserving reverses. |
| `Prefunctor.symmetrify` | `U ⥤q V → Symmetrify U ⥤q Symmetrify V` | Canonical symmetrization of a prefunctor. |
| `Push.reverse'`, `Push.inv'` | Instances for pushout quiver | Extend reversal to pushouts of quivers. |
| `IsPreconnected` | `∀ X Y, Nonempty (Path X Y)` | Quiver is preconnected if there's a path between any two vertices. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `reverse_`: for properties/operations related to reversing arrows (`reverse`, `reverse_reverse`, `reverse_inj`, `eq_reverse_iff`, `of_reverse`).
  - `symmetrify_`: for constructions related to symmetrification (`symmetrifyQuiver`, `symmetrify_reverse`).
  - `lift_`: for universal properties of symmetrification (`lift_spec`, `lift_reverse`, `lift_unique`).
  - `mapReverse`: for prefunctor-level preservation (`MapReverse`, `map_reverse`, `mapReverseComp`, `mapReverseId`).
  - `toPos`, `toNeg`: for canonical embeddings of original arrows into `Symmetrify V`.

- **Suffixes**:
  - `'` (prime): often used for internal field names in classes (`reverse'`, `inv'`, `map_reverse'`).
  - `_spec`, `_unique`: for specification/uniqueness lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Reflexivity for definitional equalities (e.g., `symmetrify_reverse`, `lift_spec`). |
| `simp` / `simp only` | Simplification using `@[simp]` lemmas (e.g., `Path.reverse_toPath`, `lift_spec`). |
| `induction` | Structural induction on paths (`Path.reverse_comp`, `Path.reverse_reverse`). |
| `congr` | Congruence for functional extensionality or equality of arrows. |
| `cases` | Case analysis on `Sum` or `Path` constructors. |
| `subst_vars` | Substitution after `eq` hypotheses (e.g., in `lift_unique`). |
| `fapply` | Apply constructor with multiple goals (e.g., `Prefunctor.ext`). |
| `rw` | Rewrite using equivalences or equalities (e.g., `eq_reverse_iff`, `reverse_reverse`). |
| `intro` / `rintro` | Introduce hypotheses/variables. |
| `congr'` | For congruence proofs (e.g., in `Push.inv'`). |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs about paths (`Path.reverse_comp`, `Path.reverse_reverse`) use **induction on the path**, with base case `Path.nil` and inductive step `Path.cons`.
- **Case analysis**: Many proofs (e.g., `lift_unique`, `lift_reverse`) proceed by **case analysis on arrows** in `Symmetrify V`, i.e., whether they are `Sum.inl` or `Sum.inr`.
- **Definitional reasoning**: Many equalities (e.g., `symmetrify_reverse`, `lift_spec`) follow directly from definitions (`rfl`, `simp`).
- **Universal property reasoning**: `lift_unique` uses:
  - Substitution (`subst_vars`) to reduce to `lift φ`.
  - Extensionality (`Prefunctor.ext`) to compare functors on objects and morphisms.
  - Case analysis on morphisms to verify agreement on both `Sum.inl` and `Sum.inr`.
- **Involutive reversal**: Key lemmas (`reverse_reverse`, `reverse_inj`, `eq_reverse_iff`) rely on `HasInvolutiveReverse` and often use `simp` with `reverse_reverse`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.Quiver.Path` | Defines paths, composition, nil, cons, etc. |
| `Mathlib.Combinatorics.Quiver.Push` | Defines pushouts of quivers (used for `Push` section). |

These imports indicate the module builds on foundational quiver theory, especially path-based reasoning and categorical constructions (functors, prefunctors, pushouts).

--- 

Let me know if you'd like a diagrammatic summary or a formalization checklist for extending this module.