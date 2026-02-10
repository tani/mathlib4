### Technical Brief: `Mathlib.Analysis.Convex.Cone`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexCone 𝕜 E` | `Structure` | Bundled convex cone: a subset `s ⊆ E` closed under positive scalar multiplication and addition. |
| `smul_mem'`, `add_mem'` | `∀ {c > 0}, x ∈ S → c • x ∈ S`, `x, y ∈ S → x + y ∈ S` | Defining closure properties of a convex cone. |
| `ext` | `(∀ x, x ∈ S ↔ x ∈ T) → S = T` | Extensionality for convex cones. |
| `coe_inf`, `coe_sInf`, `coe_iInf` | `↑(S ⊓ T) = S ∩ T`, `↑(sInf S) = ⋂ s ∈ S, s`, etc. | Coercion of lattice operations to set-theoretic intersections. |
| `CompleteLattice (ConvexCone 𝕜 E)` | `Instance` | Convex cones form a complete lattice under inclusion. |
| `map f S` | `ConvexCone 𝕜 F` | Image of cone `S` under linear map `f`. |
| `comap f S` | `ConvexCone 𝕜 E` | Preimage of cone `S` under linear map `f`. |
| `Pointed S`, `Blunt S` | `Prop` | `0 ∈ S` vs `0 ∉ S`. |
| `Flat S`, `Salient S` | `Prop` | Contains nonzero `x` and `-x` vs. no such pair. |
| `toPreorder`, `toPartialOrder`, `toOrderedAddCommGroup` | `Instance` | Construct ordered algebraic structures from pointed/salient cones. |
| `positive 𝕜 E` | `ConvexCone 𝕜 E` | Positive cone: `{ x | 0 ≤ x }` in an ordered module. |
| `strictlyPositive 𝕜 E` | `ConvexCone 𝕜 E` | Strictly positive cone: `{ x | 0 < x }`. |
| `toCone hs s` | `ConvexCone 𝕜 E` | Minimal convex cone containing a convex set `s`. |
| `mem_toCone'` | `x ∈ hs.toCone s ↔ ∃ c > 0, c • x ∈ s` | Membership characterization for `toCone`. |
| `toCone_isLeast` | `IsLeast { t | s ⊆ t } (hs.toCone s)` | `toCone` is the least cone extending `s`. |
| `Submodule.toConvexCone` | `Submodule 𝕜 E → ConvexCone 𝕜 E` | Every submodule is a convex cone. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` (e.g., `pointed`, `blunt`, `flat`, `salient`) — unary properties of cones.
  - `to_` (e.g., `toPreorder`, `toConvexCone`, `toCone`) — constructions *from* algebraic structures to cones.
  - `mem_`, `coe_` — lemmas about membership or coercion.
  - `map_`, `comap_` — behavior of maps/preimages.

- **Suffixes**:
  - `_mem` — membership in a cone under given conditions.
  - `_iff` — equivalence characterizations (e.g., `mem_toCone'`).
  - `_le`, `_inf`, `_sup` — lattice-theoretic operations.

- **Notable patterns**:
  - `pointed_iff_not_blunt`, `salient_iff_not_flat`: logical dualities.
  - `mono`, `anti`: monotonicity/antitonicity under inclusion.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying membership, coercion, and lattice definitions. |
| `rw` | Rewriting using lemmas like `mem_toCone'`, `coe_map`, `smul_mem'`. |
| `exact` / `apply` | Applying closure properties (`smul_mem`, `add_mem`). |
| `cases` | Destructuring `ConvexCone.mk` or existential hypotheses. |
| `ext` | Proving equality of cones via extensionality. |
| `aesop` | Automated reasoning for safe goals (e.g., `SetLike` instances). |
| `abel` | Simplifying additive expressions (e.g., in `toOrderedAddCommGroup`). |
| `convert` / `use` | Constructing witnesses in existential goals (e.g., `toCone`). |
| `linarith` / ` positivity` | Handling inequalities (e.g., `0 < c`, `0 ≤ x`). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Construction**: Define a cone via `ConvexCone.mk` and verify closure properties (`smul_mem'`, `add_mem'`).
  - **Equality**: Use `ext` + `simp` to reduce to element-wise equivalence.
  - **Lattice properties**: Prove lattice operations preserve cone structure (e.g., intersection, infimum).
  - **Order-theoretic constructions**: From `Pointed` + `Salient`, derive partial orders via `y - x ∈ S`.
  - **Minimality**: Show `toCone s` is least cone containing `s` via `IsLeast` + `subset_toCone` + `toCone_isLeast`.

- **Common proof patterns**:
  - *Induction on structure*: Rare (cones are sets, not inductive).
  - *Cases on positivity*: E.g., `0 < c` vs `c = 0`.
  - *Duality*: `pointed ↔ ¬blunt`, `salient ↔ ¬flat`.
  - *Transfer along maps*: `map`/`comap` lemmas often reduce to set-theoretic image/preimage properties.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Hull` | Provides `convexHull`, `convex_convexHull`, foundational convexity. |
| `Mathlib.Algebra.Order.Module` (via `OrderedSMul`, `OrderedAddCommGroup`) | Ordered module theory. |
| `Mathlib.Algebra.Module.Submodule` | For `Submodule.toConvexCone`. |
| `Mathlib.Data.Set.Pointwise` | For `smul_set`, `image`, `preimage`. |
| `Mathlib.Data.Set.Lattice` | For `SetLike`, `InfSet`, `CompleteLattice` instances. |

**Key typeclass assumptions**:
- `[OrderedSemiring 𝕜]`, `[AddCommMonoid E]`, `[SMul 𝕜 E]` — basic cone setup.
- `[LinearOrderedField 𝕜]`, `[AddCommGroup E]`, `[Module 𝕜 E]` — for `toCone`, `positive`, etc.
- `[OrderedSMul 𝕜 E]` — for `positive` cone to be well-defined.

---

#### **6. Notes on Formalization Strategy**

- **Bundled vs. unbundled**: `ConvexCone` is bundled (carrier + proofs), unlike `Convex 𝕜`, which is a predicate.
- **Lattice structure**: Complete lattice via `SetLike` infrastructure — intersections define infima, and suprema via upper bounds.
- **Duality**: Pointed/blunt and flat/salient are defined via `0 ∈ S` and `±x ∈ S`, with logical dualities proven.
- **Order correspondence**: Central theme: convex cones ↔ positive cones of preorders/partial orders (via `toPreorder`, `toPartialOrder`).
- **Minimality**: `toCone` is defined as a union over positive scalings, and shown to be the *least* cone containing a convex set.

--- 

Let me know if you'd like a diagram of the lattice structure or a summary of the M. Riesz/Hahn-Banach extensions in the companion files.