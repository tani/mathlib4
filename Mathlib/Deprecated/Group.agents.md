### Technical Metadata Brief: `Mathlib.Algebra.Group.Units.Hom` (Deprecated)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `IsAddHom` | `Prop`-valued predicate on `α → β` | Predicate for maps preserving addition (`f(x + y) = f x + f y`) |
| `IsMulHom` | `Prop`-valued predicate on `α → β` | Predicate for maps preserving multiplication (`f(x * y) = f x * f y`) |
| `IsAddMonoidHom` | Extends `IsAddHom` | Predicate for additive monoid homomorphisms (preserves `0` and `+`) |
| `IsMonoidHom` | Extends `IsMulHom` | Predicate for monoid homomorphisms (preserves `1` and `*`) |
| `IsAddGroupHom` | Extends `IsAddHom` | Predicate for additive group homomorphisms |
| `IsGroupHom` | Extends `IsMulHom` | Predicate for group homomorphisms |
| `MonoidHom.of` | `IsMonoidHom f → M →* N` | Bundling constructor: converts unbundled hom to bundled `MonoidHom` |
| `MonoidHom.isMonoidHom_coe` | `f : M →* N → IsMonoidHom (f : M → N)` | Unbundling: coerced function of a `MonoidHom` satisfies `IsMonoidHom` |
| `IsMulHom.to_isMonoidHom` | `IsMulHom f → IsMonoidHom f` (in groups) | Shows that a multiplicative hom into a group automatically preserves `1` |
| `IsGroupHom.to_isMonoidHom` | `IsGroupHom f → IsMonoidHom f` | Group homomorphisms are monoid homomorphisms |
| `IsGroupHom.map_one`, `map_inv`, `map_div` | `f 1 = 1`, `f a⁻¹ = (f a)⁻¹`, `f(a / b) = f a / f b` | Standard properties of group homomorphisms |
| `IsGroupHom.injective_iff` | `Function.Injective f ↔ ∀ a, f a = 1 → a = 1` | Kernel triviality ⇔ injectivity for group homs |
| `Inv.isGroupHom` | `[CommGroup α] → IsGroupHom Inv.inv` | Inversion is a group hom iff group is commutative |
| `Units.map'` | `IsMonoidHom f → Mˣ →* Nˣ` | Induced homomorphism on units |
| `Units.coe_isMonoidHom` | `IsMonoidHom (coe : Mˣ → M)` | Coercion from units is a monoid hom |

> ⚠️ **Deprecation Note**: All `Is*Hom` predicates are deprecated; use bundled homs (`→*`, `→+*`, `→+`) instead.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is*Hom`: Predicate names (`IsAddHom`, `IsMonoidHom`, `IsGroupHom`, etc.)
  - `map_*`: Properties about preservation (`map_add`, `map_mul`, `map_one`, `map_zero`, `map_inv`, `map_div`)
- **Suffixes**:
  - `'` (prime): Derived version of a map property (`map_mul'`, `map_one'`)
  - `comp`, `id`, `inv`, `mul`: Standard algebraic operations on homs
- **`to_*`**: Conversion functions (`to_isMonoidHom`, `to_isMulHom`, `to_isAddHom`)
- **`of`**: Bundling constructor (`MonoidHom.of`)
- **`coe_*`**: Coercion-related lemmas (`coe_of`, `coe_map'`, `coe_isMonoidHom`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`, `simp`, `simp_rw`: For definitional equalities and simplification
- `rw`: Rewriting using hypotheses/lemmas (e.g., `hf.map_mul`, `hf.map_one`)
- `exact`, `apply`, `intro`: Basic proof construction
- `symm ▸`: For applying symmetry of equality to rewrite
- `mul_right_eq_self`, `eq_of_div_eq_one`, `eq_inv_of_mul_eq_one_left`: Group-specific algebraic reasoning
- `simpa only [...] using`: For concise rewriting and application (e.g., in `IsAddGroupHom.sub`)
- `aesop`: Not used here — proofs are mostly manual algebraic manipulation

---

#### **4. Proof Logic**

- **Structure**: Predicates are defined as `structure`s with propositional fields (`map_*`), enabling typeclass-style reasoning.
- **Inductive/Recursive Reasoning**: Rare — mostly direct algebraic verification.
- **Common Proof Pattern**:
  1. Unfold predicate definition (e.g., `rw [IsMulHom.map_mul]`)
  2. Use `simp` or `rw` with known lemmas (`hf.map_mul`, `mul_comm`, etc.)
  3. Apply group/ring identities (`inv_mul_cancel`, `mul_zero`, `div_eq_mul_inv`)
  4. For injectivity/kernel lemmas: use equivalence proofs (`↔`) with two-directional `rw` + `intro`/`exact`
- **Leveraging Bundled Homs**: Many unbundled proofs reduce to bundled versions via `MonoidHom.of`, `coe_hom`, etc.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Equiv.Basic` | For `MulEquiv`, `Equiv` basics |
| `Mathlib.Algebra.Group.Units.Hom` | For `Units.map'`, `IsUnit.map'` |
| `Mathlib.Algebra.Ring.Hom.Defs` | For `RingHom`, `→+*` definitions |
| `Mathlib.Algebra.Group.TypeTags.Basic` | For `Additive`, `Multiplicative` type tags and conversions |

> 📌 **Scope**: This module formalizes *unbundled* homomorphism predicates for monoids, groups, and rings — a legacy pattern superseded by bundled homs (`MonoidHom`, `AddMonoidHom`, `RingHom`). It serves as a bridge for older code and internal conversions (e.g., `Multiplicative`/`Additive` adjunctions).

--- 

Let me know if you'd like a migration guide from `IsGroupHom` to `→*`, or a formalization of the bundled counterpart.