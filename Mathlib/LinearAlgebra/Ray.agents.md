### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SameRay` | `M → M → Prop` | Defines when two vectors lie on the same ray: zero vectors are trivially equivalent; otherwise, positive multiples are equal. |
| `RayVector R M` | `{v : M // v ≠ 0}` | Type of nonzero vectors in module `M`, used as a subtype for constructing rays. |
| `RayVector.Setoid` | `Setoid (RayVector R M)` | Equivalence relation induced by `SameRay` on nonzero vectors. |
| `Module.Ray R M` | `Quotient (RayVector.Setoid R M)` | Type of rays: equivalence classes of nonzero vectors under `SameRay`. |
| `rayOfNeZero` | `v ≠ 0 → Module.Ray R M` | Constructs a ray from a nonzero vector. |
| `Module.Ray.map` | `(M ≃ₗ[R] N) → Module.Ray R M ≃ Module.Ray R N` | Induced equivalence on rays from a linear equivalence. |
| `units_smul_of_pos` | `u : Rˣ`, `0 < u.1`, `v : Module.Ray R M` ⇒ `u • v = v` | Scaling by a *positive* unit acts trivially on rays. |
| `units_smul_of_neg` | `u : Rˣ`, `u.1 < 0`, `v : Module.Ray R M` ⇒ `u • v = -v` | Scaling by a *negative* unit acts as negation on rays. |
| `sameRay_or_sameRay_neg_iff_not_linearIndependent` | `SameRay x y ∨ SameRay x (-y) ↔ ¬LinearIndependent ![x, y]` | Characterizes linear dependence of two vectors via ray/negated-ray equivalence. |
| `exists_eq_smul_add` | `SameRay v₁ v₂ ⇒ ∃ a,b ≥ 0, a+b=1, v₁ = a•(v₁+v₂), v₂ = b•(v₁+v₂)` | Decomposes co-ray vectors as convex combinations of their sum. |

#### 2. **Naming Conventions**

- **Predicates**: `SameRay`, `sameRay_*`, `equiv_*`, `ne_*`, `eq_*`, `map_*`, `smul_*`, `units_smul_*`
- **Constructors**: `rayOfNeZero`, `someRayVector`, `someVector`
- **Equivalence properties**: `refl`, `symm`, `trans`, `is_eqv`
- **Multiplicative behavior**: `nonneg_smul_*`, `pos_smul_*`, `neg_*`, `smul_*`
- **Field-specific lemmas**: `exists_pos_*`, `exists_nonneg_*`, `sameRay_*_iff`
- **Module/Ring-specific suffixes**: `mapLinearEquiv`, `linearEquiv_smul_eq_map`

Prefixes like `sameRay_`, `units_smul_`, `exists_*`, `equiv_*`, `neg_*`, `smul_*` indicate the core operation or relation.

#### 3. **Tactic Stack**

Frequently used tactics:
- `rcases` / `obtain` — for case analysis on disjunctions and existential witnesses.
- `simp` / `simp_rw` — especially with `sameRay_*`, `smul_*`, `ray_*`, `equiv_*`.
- `linear_combination` — for solving linear dependence equations (e.g., in `sameRay_or_sameRay_neg_iff_not_linearIndependent`).
- `possession` / ` positivity` — for verifying positivity of expressions.
- `rw`, `convert`, `congr_arg`, `ext` — for structural reasoning and equality manipulation.
- `induction' ... using ...` — for induction on `Module.Ray` via `Module.Ray.ind`.
- `aesop` / `ring` — less frequent, but used in `module` tactic (custom alias for `simp [smul_add, smul_zero, ...]`).

#### 4. **Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  - Case analysis on zero/nonzero (`eq_or_ne x 0`).
  - Using `exists_pos` to extract positive scalars when vectors are nonzero.
  - Applying transitivity of `SameRay` with auxiliary lemmas (e.g., `trans`, `add_left`, `add_right`).
  - Leveraging field properties (e.g., invertibility of positive elements in `LinearOrderedField`) to convert between `r₁ • x = r₂ • y` and `y = r • x`.
- **Equivalence reasoning**: Many results are phrased as `↔`, proven via `⟨fun h => ..., fun h => ...⟩`.
- **Quotient induction**: For properties of `Module.Ray`, use `Module.Ray.ind` (induction on representatives).
- **Linear algebraic reasoning**: In `LinearOrderedField`, proofs often reduce to scalar positivity/negativity via `lt_trichotomy`, `mul_pos`, `inv_pos`, etc.

#### 5. **Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Algebra.Order.Module.Algebra` — ordered modules, scalar multiplication monotonicity, algebra maps.
- `Mathlib.LinearAlgebra.LinearIndependent` — linear independence, matrix-based characterizations.
- `Mathlib.Algebra.Ring.Subring.Units` — units in rings, especially ordered rings.
- `Mathlib.Tactic.Positivity.Basic` — tactics for proving positivity (e.g., ` positivity`).

These imports indicate the file sits at the intersection of:
- **Ordered algebra** (strictly ordered semirings/rings/fields),
- **Module theory** (especially over ordered rings),
- **Equivalence relations and quotients** (for ray construction),
- **Linear algebra** (linear independence, linear maps, equivalences).

--- 

This metadata reflects a formalization focused on *geometric* structure in modules over ordered rings/fields, where rays generalize direction (up to positive scaling), and key results relate ray equivalence to linear dependence, convexity, and group actions (e.g., units).