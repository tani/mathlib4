### Technical Brief: `Mathlib.Analysis.Convex.ConvexHull`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `convexHull` | `ClosureOperator (Set E)` | Defines the convex hull as the *smallest convex set* containing a given set `s`. Implemented via `ofCompletePred`, using intersection of all convex supersets. |
| `subset_convexHull` | `s ⊆ convexHull 𝕜 s` | Every set is contained in its convex hull. |
| `convex_convexHull` | `Convex 𝕜 (convexHull 𝕜 s)` | Convex hull is convex. |
| `convexHull_eq_iInter` | `convexHull 𝕜 s = ⋂ (t : Set E) (_ : s ⊆ t) (_ : Convex 𝕜 t), t` | Explicit description as intersection of all convex supersets. |
| `mem_convexHull_iff` | `x ∈ convexHull 𝕜 s ↔ ∀ t, s ⊆ t → Convex 𝕜 t → x ∈ t` | Membership characterization: point lies in convex hull iff it lies in every convex superset of `s`. |
| `convexHull_min` | `s ⊆ t → Convex 𝕜 t → convexHull 𝕜 s ⊆ t` | Minimality: convex hull is smallest convex superset. |
| `Convex.convexHull_subset_iff` | `Convex 𝕜 t → (convexHull 𝕜 s ⊆ t ↔ s ⊆ t)` | Universal property of convex hull in terms of inclusion. |
| `convexHull_mono` | `s ⊆ t → convexHull 𝕜 s ⊆ convexHull 𝕜 t` | Monotonicity of convex hull. |
| `convexHull_eq_self` | `convexHull 𝕜 s = s ↔ Convex 𝕜 s` | Characterizes sets equal to their convex hull (i.e., convex sets). |
| `segment_subset_convexHull` | `x ∈ s → y ∈ s → segment 𝕜 x y ⊆ convexHull 𝕜 s` | Segments between points in `s` lie in the convex hull. |
| `convexHull_pair` | `convexHull 𝕜 {x, y} = segment 𝕜 x y` | Convex hull of two points is the segment between them. |
| `convexHull_convexHull_union_left/right` | `convexHull(s ∪ convexHull t) = convexHull(s ∪ t)` | Idempotence-like property: adding convex hulls inside unions doesn’t change result. |
| `IsLinearMap.image_convexHull` | `f '' convexHull s = convexHull (f '' s)` for linear `f` | Linear maps preserve convex hulls. |
| `AffineMap.image_convexHull` | Same as above for affine maps. |
| `convexHull_smul` | `convexHull(a • s) = a • convexHull s` | Scalar multiplication commutes with convex hull (requires `OrderedCommSemiring`). |
| `convexHull_neg` | `convexHull(-s) = -convexHull s` | Negation commutes with convex hull (requires `OrderedRing`). |
| `convexHull_vadd` | `convexHull(x +ᵥ s) = x +ᵥ convexHull s` | Vector addition commutes with convex hull. |
| `convexHull_subset_affineSpan` | `convexHull s ⊆ affineSpan s` | Convex hull lies inside affine span. |
| `affineSpan_convexHull` | `affineSpan(convexHull s) = affineSpan s` | Affine span is unchanged by taking convex hull. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `convexHull_`: for definitions and theorems about convex hull.
  - `is_`, `isLinear`, `is_linear`: used for properties like `isLinearMap`, `is_linear_preimage`, `is_linear_image`.
  - `affine_`: for affine-related operations (`affineSpan`, `affine_preimage`, `affine_image`).
- **Suffixes**:
  - `_iff`: for biconditional characterizations (`mem_convexHull_iff`, `convexHull_empty_iff`, etc.).
  - `_mono`, `_subset`, `_eq`: for monotonicity, inclusion, and equality lemmas.
  - `_left`, `_right`: for symmetric properties (e.g., union with convex hull on either side).
- **Special**:
  - `ofCompletePred`: internal construction pattern for closure operators.
  - `closure_`: prefix for properties inherited from `ClosureOperator`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with definitional equalities and `iff`-based lemmas (e.g., `mem_convexHull_iff`). |
| `simp` | Simplifying goals using `@[simp]` lemmas (e.g., `convexHull_empty`, `convexHull_singleton`). |
| `exact` / `assumption` | Closing goals directly from hypotheses. |
| `apply` / `refine` | Applying lemmas with holes (e.g., `refine convexHull_min ?_ ...`). |
| `antisymm` | Proving set equality via mutual inclusion. |
| `rw [Set.image_subset_iff]` | Rewriting image inclusion using standard set-theoretic lemmas. |
| `convexHull_min ...` | Core proof pattern: apply minimality of convex hull. |
| `convex_convexHull ...` | Use convexity of convex hull in segment/affine/linear image arguments. |
| `subset_convexHull` | Inserting elements into convex hull via inclusion. |
| `aesop` / `linarith` | Not explicitly used here, but likely in downstream developments. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs rely on the **closure operator API** (`ClosureOperator`), leveraging:
    - `closure_min`, `closure_le_iff`, `closure_sup_closure_left/right`, `isClosed_iff`, etc.
  - For set equalities: use `antisymm` + `convexHull_min` + convexity of target set.
  - For image lemmas: combine `image_subset_iff`, `convexHull_min`, and stability of convexity under linear/affine maps (`is_linear_image`, `affine_image`).
  - For equivalences (`↔`): split into `→` and `←`, often using `mem_convexHull_iff` or `convexHull_eq_self`.
  - For idempotence-like properties: use `convexHull_sup_closure_left/right` (from `ClosureOperator`).
  - For scalar/vector operations: reduce to linear/affine maps (e.g., `smul`, `neg`, `vadd`) and apply `image_convexHull`.

- **Induction / Cases**: Not prominent here—proofs are mostly algebraic/set-theoretic.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Basic` | Core convexity definitions: `Convex`, `segment`, `affineSpan`, `affineMap`, etc. |
| `Mathlib.Order.Closure` | Provides `ClosureOperator` API used to define `convexHull`. |

**Domain Scope**:
- Works over `OrderedSemiring`, `OrderedCommSemiring`, and `OrderedRing` `𝕜`.
- Module `E` over `𝕜`, with additive structure (`AddCommMonoid`, `AddCommGroup`).
- Extends to linear/affine maps between modules `E → F`.

**Key Mathematical Context**:
- Convex geometry over ordered semirings/rings.
- Convex hull as a Kuratowski closure operator.
- Compatibility with linear/affine operations and set-theoretic constructions (unions, images, preimages).

--- 

Let me know if you'd like a diagram of dependencies or a summary of how this file integrates with other convexity files in Mathlib.