### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `FreeAbelianGroup.toFinsupp` | `FreeAbelianGroup X →+ X →₀ ℤ` — the canonical group homomorphism from the free abelian group to finitely supported functions (`Finsupp`) sending each generator `x` to `single x 1`. |
| `Finsupp.toFreeAbelianGroup` | `(X →₀ ℤ) →+ FreeAbelianGroup X` — the inverse homomorphism, extending linearly via `smulAddHom`. |
| `FreeAbelianGroup.equivFinsupp` | `FreeAbelianGroup X ≃+ (X →₀ ℤ)` — the additive equivalence (group isomorphism) between the free abelian group and `Finsupp`. |
| `FreeAbelianGroup.coeff` | `FreeAbelianGroup X →+ ℤ` — the multiplicity (coefficient) of a generator `x` in an element `a`, defined as `applyAddHom x ∘ toFinsupp`. |
| `FreeAbelianGroup.support` | `FreeAbelianGroup X → Finset X` — the finite support of `a`, pulled back from `Finsupp.support` via `toFinsupp`. |
| `FreeAbelianGroup.basis` | `Basis α ℤ (FreeAbelianGroup α)` — shows that `FreeAbelianGroup α` is a free ℤ-module with basis `α`. |
| `Equiv.ofFreeAbelianGroupLinearEquiv` | `(FreeAbelianGroup α ≃ₗ[ℤ] FreeAbelianGroup β) → α ≃ β` — equivalence of bases induced by a ℤ-linear isomorphism. |
| `Equiv.ofFreeAbelianGroupEquiv` | `(FreeAbelianGroup α ≃+ FreeAbelianGroup β) → α ≃ β` — same as above, but for additive group isomorphisms. |
| `Equiv.ofFreeGroupEquiv` | `(FreeGroup α ≃* FreeGroup β) → α ≃ β` — extends the previous result to free *groups* via abelianization. |
| `Equiv.ofIsFreeGroupEquiv` | `(G ≃* H) → Generators G ≃ Generators H` for `IsFreeGroup G`, `IsFreeGroup H` — basis equivalence for abstract free groups. |

**Key Theorems (Simp lemmas & properties):**
- `Finsupp.toFreeAbelianGroup_comp_toFinsupp`, `toFinsupp_comp_toFreeAbelianGroup`: mutual inverses.
- `mem_support_iff`, `not_mem_support_iff`: characterization of membership in support.
- `support_zero`, `support_of`, `support_neg`, `support_zsmul`, `support_nsmul`: behavior of support under basic operations.
- `support_add`: support of sum is contained in union of supports.

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `to*`: canonical maps *to* another structure (e.g., `toFinsupp`, `toFreeAbelianGroup`).
  - `coeff`, `support`: semantic operations derived from `Finsupp`.
  - `of*`: constructions from basis elements (e.g., `of x`, `ofIsFreeGroupEquiv`).
- **Suffixes:**
  - `Equiv`: indicates an equivalence/isomorphism (e.g., `equivFinsupp`, `ofFreeAbelianGroupEquiv`).
  - `Hom`: group/additive homomorphisms (e.g., `toFinsupp`, `coeff`, `toFreeAbelianGroup`).
  - `Equiv.of*`: constructions *from* an isomorphism to a basis equivalence.
- **Functional style:** `comp`, `flip`, `lift`, `applyAddHom`, `smulAddHom` — standard categorical/monoidal constructions.

---

#### 3. **Tactic Stack**

- **`simp only [...]`**: heavily used for simplification with explicit lemmas (e.g., `toFinsupp_of`, `Finsupp.support_single_ne_zero`).
- **`rw [...]`**: rewriting using homomorphism properties and `comp`/`id` laws.
- **`ext`**: extensionality for functions/homomorphisms (e.g., proving two homs equal).
- **`exact` / `apply`**: for immediate proof steps (e.g., `exact Iff.rfl`, `apply support_add`).
- **`simp only [h, ...]`**: often combined with `h : k ≠ 0` to eliminate degenerate cases.
- **`mod_cast`**: for coercing natural number nonzero proofs to integers.

No heavy automation (e.g., `ring`, `linarith`, `aesop`) — proofs are mostly structural and rely on `simp`-friendly lemmas.

---

#### 4. **Proof Logic**

- **Structural induction / universal property**: proofs of inverses (`left_inv`, `right_inv`) use the universal properties of `FreeAbelianGroup.lift` and `Finsupp.liftAddHom`.
- **Extensionality + simplification**: most equalities are proven by:
  1. Applying `ext` to reduce to pointwise equality.
  2. Rewriting using `comp`, `lift`, `flip`, `smul` definitions.
  3. Simplifying with `simp only` using `@[simp]` lemmas (e.g., `toFinsupp_of`, `Finsupp.singleAddHom_apply`).
- **Case analysis on nonzero scalars**: e.g., `support_zsmul` splits on `k ≠ 0` to avoid zero-multiplication collapse.
- **Set-theoretic reasoning**: for support lemmas, membership is reduced via `mem_support_iff` to coefficient nonzero-ness.

---

#### 5. **Imports & Scope**

- **Core dependencies:**
  - `Mathlib.Algebra.Group.Equiv.TypeTags`: for type-tagged equivalences.
  - `Mathlib.GroupTheory.FreeAbelianGroup`: foundational definitions of `FreeAbelianGroup`, `of`, `lift`.
  - `Mathlib.GroupTheory.FreeGroup.IsFreeGroup`: for `IsFreeGroup` and abelianization.
  - `Mathlib.LinearAlgebra.Dimension.StrongRankCondition`: for basis/module-theoretic context (e.g., `Basis.map`).
- **Module-theoretic perspective:** treats `FreeAbelianGroup X` as a ℤ-module (via `toIntLinearEquiv`), enabling basis arguments.
- **Finsupp-centric reasoning:** leverages `Finsupp` infrastructure (`single`, `support`, `applyAddHom`, `liftAddHom`) as the computational model.

--- 

This module exemplifies *transport of structure* via equivalences: defining `coeff` and `support` on `FreeAbelianGroup` by pulling back along `equivFinsupp`, and using module/basis theory to deduce structural properties (e.g., freeness, basis uniqueness up to equivalence).