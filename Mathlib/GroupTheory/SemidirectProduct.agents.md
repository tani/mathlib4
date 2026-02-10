### Technical Brief: Semidirect Product in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SemidirectProduct φ` | `Structure` | Underlying type of the semidirect product: pairs `(n, g)` with multiplication `⟨n₁ * φ g₁ n₂, g₁ * g₂⟩` |
| `inl : N →* N ⋊[φ] G` | `MonoidHom` | Canonical inclusion of `N` into the semidirect product: `n ↦ ⟨n, 1⟩` |
| `inr : G →* N ⋊[φ] G` | `MonoidHom` | Canonical inclusion of `G` into the semidirect product: `g ↦ ⟨1, g⟩` |
| `rightHom : N ⋊[φ] G →* G` | `MonoidHom` | Canonical projection onto `G`: `⟨n, g⟩ ↦ g` |
| `lift fn fg h` | `MonoidHom` | Universal property: constructs `N ⋊[φ] G →* H` from compatible maps `fn : N →* H`, `fg : G →* H` satisfying `fn ∘ φ g = conj(fg g) ∘ fn` |
| `map fn fg h` | `MonoidHom` | Functoriality: constructs `N₁ ⋊[φ₁] G₁ →* N₂ ⋊[φ₂] G₂` from compatible maps `fn`, `fg` satisfying `fn ∘ φ₁ g = φ₂ (fg g) ∘ fn` |
| `congr fn fg h` | `MulEquiv` | Isomorphism between semidirect products induced by isomorphisms `fn : N₁ ≃* N₂`, `fg : G₁ ≃* G₂` satisfying compatibility with actions |
| `equivProd` | `N ⋊[φ] G ≃ N × G` | Bijection (not group iso unless φ is trivial) between semidirect product and Cartesian product |
| `range_inl_eq_ker_rightHom` | `inl.range = rightHom.ker` | Exactness: image of `inl` equals kernel of projection `rightHom` |
| `inl_aut`, `inl_aut_inv` | `inl (φ g n) = inr g * inl n * inr g⁻¹` | Conjugation action: `G` acts on `N` via inner automorphisms in the semidirect product |
| `mk_eq_inl_mul_inr` | `⟨n, g⟩ = inl n * inr g` | Every element factors uniquely as `inl(n) * inr(g)` |
| `hom_ext` | `{f g : N ⋊[φ] G →* H} → f.comp inl = g.comp inl → f.comp inr = g.comp inr → f = g` | Extensionality: homs out of semidirect product are determined by their restrictions to `N` and `G` |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `inl_`, `inr_`: canonical injections from `N` and `G`
  - `rightHom_`, `left_` (implicit): projections/factors
  - `lift_`, `map_`, `congr_`: universal constructions
  - `mul_`, `inv_`, `one_`: basic group operations
- **Suffixes**:
  - `_left`, `_right`: projections to components
  - `_inl`, `_inr`: behavior on canonical injections
  - `_comp`: composition with canonical maps
- **Notation**:
  - `N ⋊[φ] G` for `SemidirectProduct N G φ`
  - `⟨n, g⟩` for elements (constructor `mk`)

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for structure equality (proving two pairs equal by component equality) |
| `simp` / `simp only [...]` | Simplification using `@[simp]` lemmas (e.g., `mul_left`, `inl_inj`, `lift_inl`) |
| `rw [...]` | Rewriting using equalities like `inl_aut`, `mk_eq_inl_mul_inr` |
| `intros` / `intro` | Introducing variables/hypotheses |
| `have := ...` / `replace` | Extracting intermediate facts (especially from `DFunLike.ext_iff`) |
| `by simp` / `by aesop` | Trivial goals (e.g., group axioms, inhabitedness) |
| `exact` / `assumption` | Closing goals via hypotheses |
| `left` / `right` (in `Function.Injective` proofs) | Constructing left/right inverses |

> **Note**: Most proofs are highly structured and rely on `ext` + `simp` after unfolding definitions.

---

#### **4. Proof Logic**

- **Structure proofs**: Use `ext` to reduce to component-wise equalities.
- **Group homomorphism proofs**: Show `map_one'`, `map_mul'` separately; often use `simp` with `@[simp]` lemmas.
- **Universal properties (`lift`, `map`, `congr`)**:
  - Define function on pairs.
  - Prove it's a homomorphism using the compatibility condition `h`.
  - Verify behavior on `inl`, `inr` via `simp`.
- **Exact sequence reasoning**:
  - Prove inclusion of subgroups via `le_antisymm`.
  - Use `MonoidHom.mem_ker` and `range` characterizations.
- **Isomorphism proofs**:
  - Define inverse explicitly.
  - Prove left/right inverses via `simp`.
- **Functoriality & naturality**:
  - Prove commutativity of diagrams using `simp` and `ext`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Group.Aut`: Automorphism groups (`MulAut`)
- `Mathlib.Algebra.Group.Subgroup.Ker`: Kernels of monoid homs
- `Mathlib.GroupTheory.Complement`: Complementary subgroups (used in `mulEquivSubgroup`)
- `Mathlib.GroupTheory.Subgroup.Centralizer`: Centralizers (not directly used here, but related)

**Scope**:
- Purely group-theoretic: no topology, topology, or module structure assumed.
- Works in the category of groups (`Group` typeclass).
- Designed for internal use in group theory (e.g., internal semidirect products via `monoidHomSubgroup`, `mulEquivSubgroup`).

---

#### **6. Notable Design Choices**

- **`φ : G →* MulAut N`** encodes the action of `G` on `N` as monoid homomorphism to automorphisms.
- **`lift` condition** `fn ∘ φ g = conj(fg g) ∘ fn` encodes the required compatibility for `N` and `G` to map into a common group `H`.
- **`equivProd` is not a group isomorphism** unless `φ` is trivial — reflects that semidirect product is only a direct product as sets.
- **`inl_aut`** shows that the action `φ` is realized by conjugation in the semidirect product — key for geometric intuition.

--- 

Let me know if you'd like a diagrammatic summary of the universal property or a formalization checklist for verifying a semidirect product in practice.