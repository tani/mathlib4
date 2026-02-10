### Technical Brief: Coverings of Quivers in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Quiver.Star u` | `Σ v : U, u ⟶ v` | Type of arrows with source `u` (outgoing edges). |
| `Quiver.Costar u` | `Σ v : U, v ⟶ u` | Type of arrows with target `u` (incoming edges). |
| `Prefunctor.star φ u` | `Star u → Star (φ.obj u)` | Induced map on stars via `φ.map`. |
| `Prefunctor.costar φ u` | `Costar u → Costar (φ.obj u)` | Induced map on costars via `φ.map`. |
| `Prefunctor.IsCovering φ` | `Prop` | `φ` is a *covering* iff `star φ u` and `costar φ u` are bijections for all `u`. |
| `Quiver.PathStar u` | `Σ v : U, Path u v` | Type of paths starting at `u`. |
| `Prefunctor.pathStar φ u` | `PathStar u → PathStar (φ.obj u)` | Induced map on path stars via `φ.mapPath`. |
| `Prefunctor.pathStar_bijective` | `∀ u, Bijective (φ.star u) → Bijective (φ.pathStar u)` | If `φ` induces bijections on stars, then it induces bijections on path stars — i.e., *unique path lifting*. |
| `Prefunctor.IsCovering.pathStar_bijective` | `φ.IsCovering → Bijective (φ.pathStar u)` | Corollary: coverings lift paths uniquely. |
| `Quiver.starEquivCostar u` | `Star u ≃ Costar u` | Equivalence in quivers with involutive reverse (`reverse : e ↦ e⁻¹`). |
| `Prefunctor.bijective_costar_iff_bijective_star u` | `Bijective (costar φ u) ↔ Bijective (star φ u)` | In involutive quivers, checking bijectivity on stars suffices. |
| `Prefunctor.isCovering_of_bijective_star` | `(∀ u, Bijective (star φ u)) → φ.IsCovering` | Simplifies verification of covering condition in involutive setting. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `star_`, `costar_`, `pathStar_`: denote induced maps on stars/costars/path stars.
  - `isCovering`: predicate for covering prefunctors.
  - `symmetrify_`: for symmetrified quivers (e.g., `symmetrifyStar`, `symmetrifyCostar`).
- **Suffixes**:
  - `_apply`: simp lemmas for application of induced maps.
  - `_comp`: composition compatibility (e.g., `star_comp`, `costar_comp`).
  - `_bij`, `_inj`, `_sur`: properties of induced maps (bijective/injective/surjective).
- **Structure names**:
  - `Quiver.Star`, `Quiver.Costar`, `Quiver.PathStar`: data types.
  - `Prefunctor.IsCovering`: inductive property (structure with two proofs).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: for targeted simplification (especially with `σ`-types and `Equiv`).
- `erw [...]`: rewrite using definitional equality (needed after Lean 4 PR #2644).
- `induction' p with ...`: structural induction on paths (`Path` inductive type).
- `cases' h with ...`: case analysis on equalities or `Σ`-types.
- `rw [← Path.eq_cast_iff_heq ...]`: handle path equality via cast/heq.
- `simp [hφ.star_bijective u, hφ.costar_bijective u]`: combine bijection facts.
- `exacts [...]`: sequential `exact` application.
- `ext ⟨v, f | g⟩`: extensionality for `Σ`-types or `Sum` types.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs about paths use induction on `Path`:
  - Base case: `Path.nil` (identity path).
  - Step case: `Path.cons` (prepend an edge to a path).
- **Key logical flow**:
  1. **Injectivity of `pathStar`**:
     - Induct on paths.
     - Reduce to injectivity of `star` using `Sigma.mk.inj_iff`.
     - Handle edge cases (`nil` vs `cons`) via path inequality lemmas (`Path.nil_ne_cons`, `Path.cons_ne_nil`).
  2. **Surjectivity of `pathStar`**:
     - Induct on target path.
     - Use surjectivity of `star` to lift the first edge.
     - Build lifted path inductively.
  3. **Covering ⇒ path lifting**:
     - Combine injectivity & surjectivity via `Bijective.iff`.
  4. **Involutive quivers**:
     - Use `starEquivCostar` to reduce costar bijectivity to star bijectivity.
     - Prove equivalence via conjugation: `costar = equiv ∘ star ∘ equiv⁻¹`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Combinatorics.Quiver.Cast`: path casting & equality lemmas.
- `Mathlib.Combinatorics.Quiver.Symmetric`: symmetrification & involutive reverse.
- `Mathlib.Data.Sigma.Basic`: `Σ`-types, `Sigma.mk`, `sigmaSumDistrib`.
- `Mathlib.Logic.Equiv.Basic`: equivalences, `EquivLike`, `bijective_comp`.
- `Mathlib.Tactic.Common`: common tactics (`induction'`, `exacts`, etc.).

**Universe & Variable Setup**:
- Universes `u v w` for quivers `U, V, W`.
- Variables: `φ : U ⥤q V`, `ψ : V ⥤q W` (prefunctors).
- `HasInvolutiveReverse U`, `Prefunctor.MapReverse φ`: for symmetry results.

---

#### **6. Summary**

This file formalizes *covering theory for quivers* in Lean 4, extending classical graph covering ideas to categorical quivers. It defines:
- Local structure (`Star`, `Costar`, `PathStar`),
- Covering condition (bijectivity on stars/costars),
- Path lifting property (unique lift ⇔ covering),
- Symmetry simplifications (in involutive quivers).

The formalization is highly structured, leveraging Lean’s `Σ`-types and inductive paths, with proofs relying on careful manipulation of equality, induction, and equivalence conjugation. It sets the foundation for further work on quiver coverings, e.g., universal covers or covering space theory in combinatorics.