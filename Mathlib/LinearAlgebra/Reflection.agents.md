### Technical Brief: Reflections in Linear Algebra (Lean 4 Module)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `preReflection` | `def preReflection : End R M` | Endomorphism `y ↦ y - f y • x`, defined *without* assuming `f x = 2`. Allows deferring proof obligations. |
| `reflection` | `def reflection (h : f x = 2) : M ≃ₗ[R] M` | Involutive linear equivalence (automorphism) `y ↦ y - f y • x`, defined *with* `f x = 2`. Produces invertible map. |
| `reflection_mul_reflection_pow_apply` | `lemma ... (m : ℕ) (z : M)` | Closed-form expression for `(r₁ ∘ r₂)^m z`, using Chebyshev *S*-polynomials evaluated at `t = f y * g x - 2`. Holds over any commutative ring. |
| `reflection_mul_reflection_zpow_apply` | `lemma ... (m : ℤ) (z : M)` | Extension of above to integer powers `m ∈ ℤ`. |
| `reflection_mul_reflection_zpow_apply_self` | `lemma ... (m : ℤ)` | Special case of above with `z = x`, simplifies to combination of `x` and `y`. |
| `Dual.eq_of_preReflection_mapsTo` | `lemma ... {f g : Dual R M}` | Uniqueness: if two linear forms `f, g` both satisfy `f(x)=g(x)=2` and preserve a *finite spanning set* `Φ` under `preReflection x (-)`, then `f = g`. Crucial for root data uniqueness. |
| `Dual.eq_of_preReflection_mapsTo'` | `lemma ...` | Variant of above when `x ∈ span Φ` (not necessarily spanning whole module). Uses dual map on submodule. |
| `reflection_reflection_iterate` | `lemma ... (n : ℕ)` | Computes `n`-fold iterate of composite of two reflections when `f y * g x = 4` (i.e., hyperplanes parallel). Yields shear: `y + n • (f y • x - 2 • y)`. |
| `injOn_dualMap_subtype_span_range_range` | `lemma ...` | Injectivity result for dual maps on spans of root-like systems: if `c i (r i) = 2` and `preReflection (r i) (c i)` permutes `range r`, then `c i = c j` implies `i = j`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `preReflection_`: properties of the *pre*-reflection (no `f x = 2` assumption).
  - `reflection_`: properties of the *reflection* (with `f x = 2`).
  - `involutive_`, `bijOn_`, `invOn_`, `MapsTo_`: structural/functional properties.
  - `eq_of_`, `injOn_`, `surjOn_`: uniqueness/injectivity/surjectivity lemmas.
- **Suffixes**:
  - `_apply`: action on an element `y`.
  - `_self`: action on the special vector `x`.
  - `_pow`, `_zpow`: behavior under powers (natural / integer).
  - `_mapsTo`: preservation of a set under the map.
- **Other**:
  - `Dual.*`: lemmas involving linear forms (`Dual R M`).
  - `preReflection`, `reflection`: core definitions; no prefix/suffix beyond naming.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp` / `simp only`: simplification with many lemmas (e.g., `reflection_apply`, `preReflection_apply`, `map_sub`, `smul_sub`, `mul_comm`, `two_smul`).
- `abel` / `abel_congr`: solving linear equations over additive groups/modules.
- `ring` / `ring_nf`: polynomial/ring simplifications (especially in Chebyshev proofs).
- `match_scalars`: used to equate coefficients in linear combinations (e.g., in `reflection_mul_reflection_pow_apply`).
- `linear_combination`: for verifying identities by linear algebra over rings.
- `omega`: for integer arithmetic (e.g., handling `m % 2`, `m / 2`, `e = 0 ∨ e = 1`).
- `rw`, `apply`, `ext`, `induction`: standard proof scripting.
- `mod_cast`: casting between `ℕ` and `ℤ` in lemmas like `mod_cast reflection_mul_reflection_zpow_apply_self`.
- `obtain rfl | rfl : e = 0 ∨ e = 1 := he`: case analysis on parity.

---

#### **4. Proof Logic**

- **Structure of main reflection lemmas**:
  - Define `preReflection` → prove `preReflection_apply`, `involutive_preReflection`, then lift to `reflection` (as equivalence).
  - Use `fun y ↦ ...` + `simp` + `abel` to verify involutivity and fixed-point properties.
- **Chebyshev-based power formulas**:
  - Induction on `m ∈ ℕ` or `m ∈ ℤ`.
  - For `ℕ`: base case `m = 0`, step uses `pow_succ'`, expands `(r₁ r₂)^(m+1) = r₁ r₂ (r₁ r₂)^m`, applies IH, simplifies using `hf`, `hg`, and Chebyshev identities (`S_sub_two`, `S_sq_add_S_sq`).
  - For `ℤ`: reduce to `ℕ` case via `zpow_neg`, `inv`, and symmetry (`t = f y g x - 2 = g x f y - 2`).
  - Coefficient matching via `match_scalars` + `linear_combination` (often with `ring_nf`).
- **Uniqueness lemmas**:
  - Define `u = reflection hg₁ * reflection hf₁`.
  - Show `u = id + (f - g).smulRight x`.
  - Prove `u^n = id + n • (f - g).smulRight x` by induction.
  - Use `isOfFinOrder_of_finite_of_span_eq_top_of_mapsTo` (from torsion theory) to deduce `u` has finite order ⇒ `f = g`.
- **Shear / parallel hyperplane lemmas**:
  - Use `iterate_succ'`, `reflection_apply`, `reflection_apply_self`, and `smul_smul` with `f y * g x = 4`.
  - Induction on `n`, simplify using `hz : f y • g x • z = 4 • z`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Module.LinearMap.Basic`: linear maps, `End`, `smulRight`.
- `Mathlib.GroupTheory.OrderOfElement`: finiteness of order, torsion.
- `Mathlib.LinearAlgebra.Dual`: dual module, `Dual R M`, `dualMap`.
- `Mathlib.LinearAlgebra.FiniteSpan`: finite spanning sets, `span`, `subtype`.
- `Mathlib.RingTheory.Polynomial.Chebyshev`: Chebyshev polynomials `S R k`, identities like `S_sub_two`, `S_sq_add_S_sq`.
- `Mathlib.Algebra.Module.Torsion`: torsion modules, finiteness conditions.

**Scope**:
- General module theory over *commutative rings* (`CommRing R`).
- No inner product assumed — fully algebraic.
- Designed for application to *Coxeter groups* (via reflection representations) and *root data/systems* (uniqueness lemmas).

---

#### **6. Notable Design Choices**

- **`preReflection` vs `reflection`**: Separation allows flexibility: `preReflection` avoids `f x = 2` until needed; `reflection` gives invertibility.
- **Chebyshev `S`-polynomials**: Chosen over `T`-polynomials due to better behavior for `S_k(2 cos θ) = sin((k+1)θ)/sin θ`, matching reflection composition angles.
- **`MapsTo` + `Finite` + `span = ⊤`**: Key for uniqueness — finite spanning sets enforce rigidity of linear forms under reflection action.
- **No `InnerProductSpace`**: Avoids analytic assumptions; works in arbitrary characteristic (e.g., `R = ℤ`, `𝔽_p`).

---

This module forms a foundational algebraic backbone for Coxeter group representations and root system theory in Lean, emphasizing *purely linear-algebraic* reflection properties.