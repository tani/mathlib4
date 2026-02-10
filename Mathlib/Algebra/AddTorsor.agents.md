### Technical Metadata Brief: `Mathlib.Algebra.Group.Action.Torsor`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AddTorsor G P` | `class AddTorsor (G : Type*) (P : Type*) [AddGroup G] extends AddAction G P, VSub G P` | Defines a *principal homogeneous space* (torsor) of an additive group `G` acting freely and transitively on a nonempty type `P`. |
| `vsub_vadd'` | `∀ p₁ p₂ : P, (p₁ -ᵥ p₂) +ᵥ p₂ = p₁` | Ensures subtraction followed by addition recovers the original point. |
| `vadd_vsub'` | `∀ g : G, p : P, (g +ᵥ p) -ᵥ p = g` | Ensures addition followed by subtraction recovers the original group element. |
| `vsub_vadd`, `vadd_vsub` | `[simp]` lemmas derived from `vsub_vadd'`, `vadd_vsub'` | Simplification lemmas for cancellation. |
| `vadd_right_cancel`, `vsub_left/right_cancel` | Cancellation laws for `+ᵥ` and `-ᵥ` | Injectivity of action and subtraction maps. |
| `vsub_add_vsub_cancel` | `p₁ -ᵥ p₂ + (p₂ -ᵥ p₃) = p₁ -ᵥ p₃` | Transitivity of displacement vectors. |
| `neg_vsub_eq_vsub_rev` | `-(p₁ -ᵥ p₂) = p₂ -ᵥ p₁` | Antisymmetry of displacement. |
| `eq_vadd_iff_vsub_eq` | `p₁ = g +ᵥ p₂ ↔ p₁ -ᵥ p₂ = g` | Equivalence between point translation and displacement. |
| `vadd_eq_vadd_iff_neg_add_eq_vsub` | `v₁ +ᵥ p₁ = v₂ +ᵥ p₂ ↔ -v₁ + v₂ = p₁ -ᵥ p₂` | Relates equality of translated points to group element differences. |
| `vaddConst p` | `G ≃ P` | Equivalence between group and torsor via translation by `p`. |
| `constVSub p` | `P ≃ G` | Equivalence between torsor and group via subtraction from `p`. |
| `constVAdd v` | `Equiv.Perm P` | Permutation of `P` induced by adding `v`. |
| `pointReflection x` | `Perm P` | Point reflection about `x`: `y ↦ (x -ᵥ y) +ᵥ x`. |
| `AddTorsor.subsingleton_iff` | `Subsingleton G ↔ Subsingleton P` | Torsor is a subsingleton iff the group is. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `vsub_`: operations involving subtraction (`-ᵥ`)
  - `vadd_`: operations involving addition (`+ᵥ`)
  - `constV_`: constant-action equivalences (e.g., `constVAdd`, `constVSub`)
  - `pointReflection_`: properties of point reflections

- **Suffixes**:
  - `_cancel`: cancellation lemmas
  - `_iff`: biconditional characterizations
  - `_assoc`: associativity variants
  - `_rev`: reversal/anti-symmetry (e.g., `neg_vsub_eq_vsub_rev`)
  - `_left`, `_right`: direction of cancellation or action

- **Notation**:
  - `+ᵥ` for `VAdd.vadd`
  - `-ᵥ` for `VSub.vsub`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting using `vsub_vadd`, `vadd_vsub`, `eq_vadd_iff_vsub_eq`, etc. |
| `simp` | Simplifying using `[simp]` lemmas, especially cancellation and equiv lemmas |
| `apply ... cancel` | Applying cancellation lemmas (`vadd_right_cancel`, `vsub_left_cancel`, etc.) |
| `ext` | Proving equality of functions/permutations |
| `funext` | Extending equality pointwise for function spaces (e.g., in `Pi` instance) |
| `rwa` | Rewrite + assumption, often in cancellation proofs |
| `exact` / `refine` | For concise proof steps, especially in `vsub_vadd_comm`, `vadd_vsub_vadd_cancel_left`, etc. |
| `neg_injective` | Used to deduce equality from equality of negated terms |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs rely on **cancellation properties** (`vadd_right_cancel`, `vsub_left/right_cancel`) to reduce goals to known identities.
  - Many results are proven by applying `vadd_right_cancel` or `vsub_left_cancel` to both sides of an equation, reducing to `vsub_vadd` or `vadd_vsub`.
  - Equivalences (`≃`) are constructed via `Equiv.mk` with explicit inverses (`vaddConst`, `constVSub`), verified using cancellation lemmas.
  - For `Pi`/`Prod` instances, proofs are componentwise via `Prod.ext` or `funext`.
  - In the commutative case (`AddCommGroup`), additional symmetries (e.g., `vsub_vadd_comm`) are provable.

- **Inductive/Recursive Structure**:
  - Not used directly; structure is algebraic and based on axiomatic properties of torsors.
  - Proofs often proceed by **algebraic manipulation** using group and torsor axioms.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Action.Basic` | Provides `AddAction`, `VAdd`, foundational action theory |
| `Mathlib.Algebra.Group.Pointwise.Set.Basic` | Provides `Set.vsub`, used in `singleton_vsub_self` and set-level operations |

---

### Summary

This file formalizes the theory of **additive torsors**, generalizing affine spaces. It defines the core operations (`+ᵥ`, `-ᵥ`) and their algebraic properties, constructs equivalences between group and torsor, and studies induced permutations (e.g., point reflections). The development is highly structured, with extensive use of cancellation, symmetry, and equivalence-based reasoning. The naming and proof style reflect Lean 4’s emphasis on reusable, composable algebraic structures.