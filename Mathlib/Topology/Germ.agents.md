### Technical Brief: Germs of Functions Between Topological Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `value` | `φ : Germ (𝓝 x) α ↦ α` | Extracts the common value at `x` shared by all representatives of the germ `φ`. |
| `value_smul` | `(φ • ψ).value = φ.value • ψ.value` | Shows compatibility of `value` with scalar multiplication (for `SMul`-typed structures). |
| `valueMulHom` | `Germ (𝓝 x) E →* E` | Monoid homomorphism from germs to the monoid `E`, induced by evaluation at `x`. |
| `valueₗ` | `Germ (𝓝 x) E →ₗ[𝕜] E` | `𝕜`-linear map from germs to a `𝕜`-module `E`. |
| `valueRingHom` | `Germ (𝓝 x) E →+* E` | Ring homomorphism (combines additive and multiplicative structure). |
| `valueOrderRingHom` | `Germ (𝓝 x) E →+*o E` | Monotone ring homomorphism when `E` is an ordered semiring. |
| `RestrictGermPredicate` | `(P : ∀ x, Germ (𝓝 x) Y → Prop) → A : Set X → ∀ x, Germ (𝓝 x) Y → Prop` | Builds a predicate on germs localized to a set `A`, satisfying `∀ x, RestrictGermPredicate P A x f ↔ ∀ᶠ x ∈ A, P x f`. |
| `sliceLeft` | `Germ (𝓝 (x, y)) Z → Germ (𝓝 x) Z` | Restricts a germ on `X × Y` to a germ on `X` by fixing the `Y`-coordinate. |
| `sliceRight` | `Germ (𝓝 (x, y)) Z → Germ (𝓝 y) Z` | Restricts a germ on `X × Y` to a germ on `Y` by fixing the `X`-coordinate. |
| `IsLocallyConstant.of_germ_isConstant` | `(∀ x, (f : Germ (𝓝 x) Y).IsConstant) → IsLocallyConstant f` | If all germs of `f` are constant, then `f` is locally constant. |
| `eq_of_germ_isConstant` | `[PreconnectedSpace X] → (∀ x, (f : Germ (𝓝 x) Y).IsConstant) → f x = f x'` | On a preconnected space, if all germs of `f` are constant, then `f` is globally constant. |
| `eq_of_germ_isConstant_on` | `∀ x ∈ s, (f : Germ (𝓝 x) Y).IsConstant → IsPreconnected s → f x = f x'` | Local constancy on a preconnected subset implies global constancy on that subset. |
| `Germ.coe_prod` | `((∏ i ∈ s, f i) : Germ l R) = ∏ i ∈ s, (f i : Germ l R)` | Coercion of a finite product of functions to germs commutes with product in the germ. |

---

#### **2. Naming Conventions**

- **`value_` prefix**: Evaluation maps from germs to values (`value`, `valueMulHom`, `valueₗ`, `valueRingHom`, `valueOrderRingHom`).
- **`sliceLeft` / `sliceRight`**: Currying operations on germs over product spaces.
- **`RestrictGermPredicate`**: Predicate construction for localized behavior.
- **`isConstant` suffix**: Properties of germs being constant (`IsConstant`, `isConstant_comp_subtype`).
- **`of_germ_` prefix**: Implications from germ-level properties to global ones (`of_germ_isConstant`).
- **`eq_of_germ_` prefix**: Equality conclusions from germ-level constancy.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `Germ.inductionOn`: Elimination principle for germs (used repeatedly to reduce to functions).
- `rfl`, `rw`, `simp_rw`: Rewriting and simplification, especially around `Germ.coe_eq`, `EventuallyEq`, and `Germ.liftOn`.
- `dsimp only`: Used in `value` definition to simplify dependent equalities.
- `eventually_nhds`, `eventually_nhdsSet_iff_forall`: For reasoning about filters and neighborhoods.
- `propext`, `forall_congr'`: Logical manipulations in predicate lifting.
- `apply`, `convert`, `rwa`: Standard proof scripting.
- `mono`: Monotonicity reasoning (e.g., in `valueOrderRingHom.monotone'`).
- `aesop`: Likely used implicitly in automation-heavy lemmas (not explicit here, but common in Mathlib).

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs about germs use `Germ.inductionOn` to reduce to functions, then apply filter-based reasoning (e.g., `EventuallyEq`, `Eventually.self_of_nhds`).
- **Filter-based reasoning**: Central to definitions like `value`, `sliceLeft`, `sliceRight`, and `RestrictGermPredicate`.
- **Continuity & Tendsto**: `sliceLeft`/`sliceRight` rely on `compTendsto` and `ContinuousAt` properties of product projections.
- **Logical equivalence**: `forall_restrictGermPredicate_iff` uses `eventually_nhdsSet_iff_forall` and `rfl` to show equivalence between local and germ-based predicates.
- **Connectedness arguments**: `eq_of_germ_isConstant` leverages `IsLocallyConstant.of_germ_isConstant` and `preconnectedSpace_iff_univ`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Order.Filter.Germ.Basic`: Core germ theory.
- `Mathlib.Topology.NhdsSet`: Neighborhood filters on sets (`𝓝ˢ A`).
- `Mathlib.Topology.LocallyConstant.Basic`: Locally constant functions and related lemmas.
- `Mathlib.Analysis.Normed.Module.Basic`: For module/ring structures on codomains (e.g., `SMul`, `Module`, `OrderedSemiring`).

**Scope**:
- Topological spaces, germs at a point w.r.t. neighborhood filter `𝓝 x`.
- Codomains with algebraic structure (monoids, semirings, modules, ordered semirings).
- Interactions between germs, neighborhoods, and subsets (via `𝓝ˢ A`).
- Product spaces and currying of germs.

---

This module formalizes foundational properties of germs in topology and analysis, emphasizing their role as *local* objects that reflect pointwise behavior and algebraic structure. It serves as a basis for further development in sheaf theory, differential calculus on topological spaces, and related areas.