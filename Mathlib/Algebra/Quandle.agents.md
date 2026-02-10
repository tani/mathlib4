### Technical Metadata Brief: Racks and Quandles in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `Shelf` | `Type u → Prop` | A type with a self-distributive binary operation `act : α → α → α`. |
| `UnitalShelf` | `Type u → Prop` | A shelf with a two-sided unit `1` satisfying `act 1 a = a` and `act a 1 = a`. |
| `Rack` | `Type u → Prop` | A shelf where each `act x` is invertible via `invAct x`, forming equivalences `R ≃ R`. |
| `Quandle` | `Type u → Prop` | A rack where `act x x = x` for all `x` (idempotent action). |
| `ShelfHom` | `Type u → Type v → Type (max u v)` | Homomorphisms preserving the shelf action: `f(x ◃ y) = f(x) ◃ f(y)`. |
| `Conj` | `Type u → Type u` | The *conjugation quandle* of a group `G`, where `x ◃ y = x * y * x⁻¹`. |
| `Dihedral n` | `Type` | The dihedral quandle on `ZMod n`, with action `b ↦ 2*a - b`. |
| `EnvelGroup` | `Rack R → Group` | Universal enveloping group of a rack `R`; left adjoint to `Conj`. |
| `toConj` | `R →◃ Conj (R ≃ R)` | Natural rack homomorphism sending `x ↦ act' x`. |
| `selfApplyEquiv` | `R ≃ R` | Bijection `x ↦ x ◃ x`, used in knot theory (Reidemeister I). |
| `ad_conj` | `act' (x ◃ y) = act' x * act' y * (act' x)⁻¹` | Encodes self-distributivity as conjugation in `R ≃ R`. |
| `toEnvelGroup.map` | `(R →◃ Conj G) ≃ (EnvelGroup R →* G)` | Universality of `EnvelGroup`: adjunction isomorphism. |
| `toEnvelGroup.univ` | `(Quandle.Conj.map (toEnvelGroup.map f)).comp (toEnvelGroup R) = f` | Factorization of rack maps through `EnvelGroup`. |
| `toEnvelGroup.univ_uniq` | Uniqueness of factorization: if `f = Conj.map g ∘ toEnvelGroup`, then `g = toEnvelGroup.map f`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `act_`, `invAct_`: operations in racks/shelves (`act x y`, `invAct x y`).
  - `self_`, `op_`, `conj_`, `dihedral_`: specific constructions or properties.
  - `envelAction_`, `toEnvelGroup_`: related to universal enveloping group.
- **Suffixes**:
  - `_Equiv`, `_hom`, `_map`: bijections, homomorphisms, or induced maps.
  - `_rel`, `_rel'`: relations used in construction of `EnvelGroup`.
- **Infix Notation** (localized in `quandles`):
  - `x ◃ y` → `Shelf.act x y`
  - `x ◃⁻¹ y` → `Rack.invAct x y`
  - `S →◃ S'` → `ShelfHom S S'`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplify using `@[simp]` lemmas (e.g., `act'_apply`, `fix`, `left_inv`).
- `rw`: Rewrite using definitions or lemmas (e.g., `self_distrib`, `act_one`, `ad_conj`).
- `ext`: Extensionality for functions/equivalences (e.g., proving `act' (x ◃ y) = ...`).
- `induction` / `induction x using ...`: Structural induction on inductive types (`PreEnvelGroup`, `PreEnvelGroupRel'`).
- `ring` / `ring_nf`: Simplify arithmetic in `ZMod n` (e.g., dihedral quandle proofs).
- `aesop`: Automated reasoning for simple goals (e.g., `left_cancel`, `self_act_eq_iff_eq`).
- `Quotient.sound`, `Quotient.liftOn`, `Quotient.inductionOn`: Reasoning about quotients (especially in `EnvelGroup`).
- `MonoidHom.ext`: Extensionality for group homomorphisms.

---

#### **4. Proof Logic**

- **Inductive constructions** dominate the `EnvelGroup` section:
  - Prove properties by induction on `PreEnvelGroupRel'` (e.g., `well_def`).
  - Use well-founded recursion on type-valued relations to define maps out of quotients.
- **Algebraic reasoning**:
  - Self-distributivity is often rewritten via `self_distrib`, sometimes combined with inverses (`left_inv`, `right_inv`).
  - Conjugation identities (`ad_conj`) translate rack axioms into group-theoretic conjugation.
- **Equivalence proofs**:
  - Bijections (e.g., `selfApplyEquiv`) are proven by constructing explicit inverses and verifying `left_inv`/`right_inv`.
- **Universality arguments**:
  - Adjointness (`toEnvelGroup.map`) is proven via explicit construction of lift and verification of uniqueness (`univ_uniq`).
- **Symmetry arguments**:
  - Opposite rack/quandle (`oppositeRack`, `oppositeQuandle`) often use `MulOpposite` and `op_inj`.

---

#### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Algebra.Group.Equiv.Basic`: For `Equiv`, `Function.LeftInverse`, etc.
- `Mathlib.Algebra.Group.Aut`: For `MulAut`, automorphism groups.
- `Mathlib.Data.ZMod.Defs`: For `ZMod n`, used in dihedral quandle.
- `Mathlib.Tactic.Ring`: For ring proofs in `ZMod`.

> **Note**: The file is self-contained for rack/quandle theory, but relies on standard algebraic infrastructure (groups, equivalences, quotients).

---

Let me know if you'd like a diagram of the adjunction or a summary of knot-theoretic applications.