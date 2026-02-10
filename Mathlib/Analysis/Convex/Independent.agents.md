### Technical Metadata Brief: Convex Independence in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexIndependent` | `p : ι → E → Prop` | Defines convex independence: no point `p x` lies in the convex hull of `p '' s` unless `x ∈ s`. |
| `Subsingleton.convexIndependent` | `[Subsingleton ι] → ConvexIndependent 𝕜 p` | Any family with at most one index is convex independent. |
| `ConvexIndependent.injective` | `ConvexIndependent 𝕜 p → Function.Injective p` | Convex independent families are injective. |
| `ConvexIndependent.comp_embedding` | `(f : ι' ↪ ι) → ConvexIndependent 𝕜 p → ConvexIndependent 𝕜 (p ∘ f)` | Convex independence is preserved under precomposition with embeddings. |
| `ConvexIndependent.subtype` | `ConvexIndependent 𝕜 p → ConvexIndependent 𝕜 (fun i : s => p i)` | Subfamilies indexed by subtypes inherit convex independence. |
| `ConvexIndependent.range` | `ConvexIndependent 𝕜 p → ConvexIndependent 𝕜 ((↑) : Set.range p → E)` | The range of an indexed convex independent family is convex independent. |
| `ConvexIndependent.mono` | `s ⊆ t → ConvexIndependent 𝕜 ((↑) : t → E) → ConvexIndependent 𝕜 ((↑) : s → E)` | Subsets of convex independent sets are convex independent. |
| `Function.Injective.convexIndependent_iff_set` | `Function.Injective p → (ConvexIndependent 𝕜 ((↑) : Set.range p → E) ↔ ConvexIndependent 𝕜 p)` | For injective families, convex independence of the family ↔ convex independence of its range. |
| `ConvexIndependent.mem_convexHull_iff` | `hc : ConvexIndependent 𝕜 p → (p i ∈ convexHull 𝕜 (p '' s) ↔ i ∈ s)` | Characterization: membership in convex hull corresponds exactly to index membership. |
| `convexIndependent_iff_not_mem_convexHull_diff` | `ConvexIndependent 𝕜 p ↔ ∀ i s, p i ∉ convexHull 𝕜 (p '' (s \ {i}))` | Equivalent formulation: no point lies in the convex hull of the others. |
| `convexIndependent_set_iff_inter_convexHull_subset` | `ConvexIndependent 𝕜 ((↑) : s → E) ↔ ∀ t, t ⊆ s → s ∩ convexHull 𝕜 t ⊆ t` | Set-theoretic characterization: intersection with convex hull of subset stays within subset. |
| `convexIndependent_set_iff_not_mem_convexHull_diff` | `ConvexIndependent 𝕜 ((↑) : s → E) ↔ ∀ x ∈ s, x ∉ convexHull 𝕜 (s \ {x})` | Set version of “no point lies in convex hull of others”. |
| `convexIndependent_iff_finset` | `[LinearOrderedField 𝕜] → (ConvexIndependent 𝕜 p ↔ ∀ s : Finset ι, p x ∈ convexHull(s.image p) → x ∈ s)` | Carathéodory’s theorem allows checking only finite subsets. |
| `Convex.convexIndependent_extremePoints` | `Convex 𝕜 s → ConvexIndependent 𝕜 ((↑) : s.extremePoints 𝕜 → E)` | Extreme points of a convex set are convex independent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `convexIndependent_...`: predicates or equivalences involving convex independence.
  - `..._iff_...`: logical equivalences (↔).
  - `..._iff_not_mem_convexHull_...`: characterizations via non-membership in convex hulls.
- **Suffixes**:
  - `_iff_set`: when the statement is about sets (i.e., `((↑) : s → E)`).
  - `_iff_finset`: when finite subsets suffice (requires `LinearOrderedField`).
  - `_iff_inter_convexHull_subset`: intersection-based characterization.
- **Modifiers**:
  - `comp_embedding`, `subtype`, `range`, `mono`: structural closure properties.
  - `injective`, `Subsingleton`: basic properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `intro` / `introv` | Introduce hypotheses and variables. |
| `rw [← ...]` / `rwa [...]` | Rewrite using equivalences or lemmas with assumptions. |
| `convert` / `ext` | Prove equality of functions/structures by extensionality. |
| `simp_rw [...]` | Simplify with rewrite rules (especially for `Finset`/`Set` operations). |
| `exact`, `assumption` | Close goals directly. |
| `by_contra` | Proof by contradiction. |
| `rwa [...]` | Rewrite + assumption (used heavily in `mem_convexHull_iff` proofs). |
| `rfl` | Reflexivity for definitional equalities. |
| `subset_convexHull`, `convexHull_mono`, `convexHull_min` | Convex hull monotonicity/minimality lemmas. |
| `extremePoints_subset`, `extremePoints_convexHull_subset` | Properties of extreme points. |
| `Subtype.mk_eq_mk.1`, `Subtype.ext` | Reasoning about subtype equality. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs follow a *characterization → equivalence → closure* pattern.
  - Prove basic properties (injectivity, subsingleton) first.
  - Use `mem_convexHull_iff` to reduce membership questions to index-set membership.
  - For equivalences (`↔`), prove both directions separately using:
    - `hc _ _ hx` to apply convex independence,
    - `subset_convexHull` or `Set.mem_image_of_mem` to build forward implications.
- **Carathéodory-based finiteness**:
  - Uses `convexHull_eq_union_convexHull_finite_subsets` to reduce to finite subsets.
  - Requires injectivity of `p` (proven separately) to relate finite subsets of indices and points.
- **Extreme points**:
  - Uses `extremePoints_convexHull_subset` and `inter_extremePoints_subset_extremePoints_of_subset`.
  - Shows that if `x ∈ s` lies in `convexHull(s \ {x})`, then it cannot be extreme.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Combination` | Provides definitions and lemmas about convex combinations, convex hulls, etc. |
| `Mathlib.Analysis.Convex.Extreme` | Defines extreme points and their basic properties. |
| `Affine`, `Finset`, `Function` | Standard libraries for affine geometry, finite sets, and function theory. |
| `Classical` (scoped) | Used for classical logic in `convexIndependent_iff_finset`. |

---

#### **6. Open Questions / TODOs**

- **Pending**: `AffineIndependent.convexIndependent` — needs glue between `affineCombination` and `Finset.centerMass`.
- **Potential future work**:
  - Relate convex independence to matroid theory (e.g., convex geometry).
  - Explore algorithmic aspects (e.g., checking convex independence in finite-dimensional spaces).

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation, AI training, or proof planning).