### Technical Metadata Brief: `FreeAbelianGroup` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FreeAbelianGroup α` | `Type u` | Free abelian group on type `α`, defined as `Additive (Abelianization (FreeGroup α))`. |
| `of : α → FreeAbelianGroup α` | `α → FreeAbelianGroup α` | Canonical inclusion of generators into the free abelian group. |
| `lift {β} [AddCommGroup β] : (α → β) ≃ (FreeAbelianGroup α →+ β)` | Equivalence of functions and additive homomorphisms | Universal property: any function `α → β` (to an abelian group) extends uniquely to a group homomorphism. |
| `map (f : α → β) : FreeAbelianGroup α →+ FreeAbelianGroup β` | `FreeAbelianGroup α →+ FreeAbelianGroup β` | Functorial lift of a function `f : α → β` to a group homomorphism. |
| `liftAddGroupHom β a : (α → β) →+ β` | `(α → β) →+ β` | Evaluation homomorphism: sends `f` to `lift f a`. |
| `seqAddGroupHom f : FreeAbelianGroup α →+ FreeAbelianGroup β` | `FreeAbelianGroup α →+ FreeAbelianGroup β` | For `f : FreeAbelianGroup (α → β)`, `f <*> ·` is an additive homomorphism. |
| `ofMulHom [Monoid α] : α →* FreeAbelianGroup α` | Monoid homomorphism | `of` as a monoid homomorphism when `α` has multiplication. |
| `liftMonoid [Monoid α] [Ring R] : (α →* R) ≃+* (FreeAbelianGroup α →+* R)` | Equivalence of monoid homs and ring homs | Universal property for monoid homs into rings. |
| `punitEquiv [Unique T] : FreeAbelianGroup T ≃+ ℤ` | Additive group isomorphism | Free abelian group on a singleton is `ℤ`. |
| `equivOfEquiv (f : α ≃ β) : FreeAbelianGroup α ≃+ FreeAbelianGroup β` | Additive group isomorphism | Induced isomorphism from equivalence of base types. |

**Key Theorems (with purpose):**
- `lift.of`: `lift f (of x) = f x` — coherence of `lift` with `of`.
- `of_injective`: `of` is injective.
- `of_ne_zero`: `of x ≠ 0` (nontriviality).
- `map_add`, `map_neg`, `map_zero`: `map f` is an additive homomorphism.
- `map_id`, `map_comp`: `map` preserves identities and composition.
- `induction_on`, `induction_on'`: Structural induction on `FreeAbelianGroup`.
- `mul_assoc`, `mul_comm`, `distrib`: Ring/semiring structure when `α` has algebraic structure.
- `ring`, `commRing`: `FreeAbelianGroup α` inherits ring/commutative ring structure from `α`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `of_`: canonical generator inclusion (`of`, `of_mul`, `of_one`, `ofMulHom`).
  - `lift_`: universal extension (`lift`, `liftAddGroupHom`, `liftMonoid`).
  - `map_`: functorial action (`map`, `map_id`, `map_comp`, `map_of_apply`, `map_pure`, etc.).
  - `seq_`: sequencing operations in monad structure (`seq_zero`, `seq_add`, `seq_neg`, `seq_sub`).
  - `pure_`, `bind_`: monadic operations (`pure_bind`, `zero_bind`, `add_bind`, etc.).

- **Suffixes:**
  - `_hom`: homomorphism versions (`ofMulHom`, `liftMonoid`, `seqAddGroupHom`).
  - `_apply`: applied versions of lemmas (`map_id_apply`, `map_comp_apply`, `map_of_apply`).
  - `'` (prime): variants for operations on functions (e.g., `lift.add'`, `lift_neg'`, `lift.add'`).
  - `unique`, `nonUnital`, `nonAssoc`: for ring-theoretic instances (`nonUnitalNonAssocRing`, `nonUnitalRing`, `ring`, `commRing`).

- **Notable patterns:**
  - `map_*` lemmas often use `lift (of ∘ f)` internally.
  - `induction_on` variants use `C0`, `C1`, `Cn`, `Cp` for base, generator, negation, addition cases.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: heavily used for rewriting with specific lemmas (e.g., `lift.of`, `map_add`, `map_zero`).
- `induction_on`, `induction_on'`: structural induction on group elements.
- `rw [...]`: rewriting using equalities (especially `map_*`, `lift.*`, `of_*` lemmas).
- `congr 1`: for proving equality of group elements via generator equality.
- `exact`, `refine`, `apply`: for constructing proofs step-by-step.
- `intro`, `intro x`, `intro h`: for introducing hypotheses/variables.
- `convert ... using 1`: for partial unification (e.g., in `lift.of`).
- `iterate n rw [...]`: repeated rewriting (e.g., in `LawfulMonad` proofs).
- `funext`: extensionality for functions.
- `dsimp only [...]`: simplification with definitional equalities.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by induction on the group element using `induction_on` or `induction_on'`, with cases for:
  - `0` (zero),
  - `of x` (generators),
  - `-x` (negation),
  - `x + y` (addition).
- **Uniqueness via universal property**: Many proofs (e.g., `lift.unique`, `ext`, `map_id`, `map_comp`) use `lift.unique` or `lift.ext` to reduce to checking behavior on generators (`of x`).
- **Functoriality**: `map` is shown to preserve identities and composition via `map_id`, `map_comp`, and their `apply` variants.
- **Ring/monoid lifting**: When `α` has algebraic structure (e.g., `Monoid`, `Semigroup`), ring/monoid homomorphism instances are built by:
  - Defining multiplication via `lift` (e.g., `mul_def`),
  - Proving distributivity and associativity via induction,
  - Using `liftMonoid` to lift monoid homs to ring homs.
- **Monadic structure**:Monad and applicative laws are proven via induction and simplification using `map_*` lemmas.

---

#### **5. Imports**

- `Mathlib.Algebra.Module.NatInt`: For `ℤ`-module structure and scalar multiplication.
- `Mathlib.GroupTheory.Abelianization`: For `Abelianization` and its universal property.
- `Mathlib.GroupTheory.FreeGroup.Basic`: For `FreeGroup`, `FreeGroup.lift`, and `FreeGroup.of`.

These imports define the foundational building blocks: free groups, abelianization, and additive structures over `ℤ`.

---

### Summary

This file formalizes the **free abelian group** construction in Lean 4 using abelianization of free groups. It establishes:
- The universal property (`lift`),
- Functoriality (`map`),
- Monadic structure (`pure`, `bind`, `seq`),
- Ring/monoid lifting when `α` has algebraic structure,
- Structural properties (injectivity of `of`, nontriviality, induction principles),
- Isomorphisms (e.g., `FreeAbelianGroup (Unit) ≃ ℤ`, `equivOfEquiv`).

The proofs rely heavily on induction, simplification, and the universal property of `lift`. The design is optimized for algebraic manipulation and compatibility with Mathlib’s typeclass infrastructure.