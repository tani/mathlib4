### Technical Metadata Brief: Ample Sets in Real Vector Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AmpleSet` | `def AmpleSet (s : Set F) : Prop` | Defines a subset `s` as *ample* if the convex hull of every connected component of `s` equals the whole space. |
| `ampleSet_univ` | `AmpleSet (univ : Set F)` | Shows the entire space is ample. |
| `ampleSet_empty` | `AmpleSet (∅ : Set F)` | Shows the empty set is ample (vacuously). |
| `AmpleSet.union` | `AmpleSet s → AmpleSet t → AmpleSet (s ∪ t)` | Closure under finite unions (specifically binary). |
| `AmpleSet.image` | `AmpleSet s → (L : E ≃ᵃL[ℝ] F) → AmpleSet (L '' s)` | Invariance of ampleness under continuous affine isomorphisms (`≃ᵃL`). |
| `AmpleSet.image_iff` | `AmpleSet (L '' s) ↔ AmpleSet s` | Equivalence version of image invariance. |
| `AmpleSet.preimage` | `AmpleSet s → (L : E ≃ᵃL[ℝ] F) → AmpleSet (L ⁻¹' s)` | Invariance under preimage of continuous affine isomorphisms. |
| `AmpleSet.preimage_iff` | `AmpleSet (L ⁻¹' s) ↔ AmpleSet s` | Equivalence version of preimage invariance. |
| `AmpleSet.vadd` | `AmpleSet s → AmpleSet (y +ᵥ s)` | Invariance under affine translation (a special case of `image`). |
| `AmpleSet.vadd_iff` | `AmpleSet (y +ᵥ s) ↔ AmpleSet s` | Equivalence version of translation invariance. |
| `AmpleSet.of_one_lt_codim` | `1 < Module.rank ℝ (F ⧸ E) → AmpleSet Eᶜ` | Crucial geometric lemma: complement of a subspace of codimension ≥ 2 is ample. |

---

#### **2. Naming Conventions**

- **Predicate prefix**: `AmpleSet` used as a predicate (e.g., `h : AmpleSet s`).
- **Theorem prefixes**:
  - `ampleSet_*`: top-level lemmas about specific sets (`empty`, `univ`).
  - `AmpleSet.*`: lemmas about closure/invariance properties (e.g., `union`, `image`, `vadd`).
- **Equivalence lemmas**: end with `_iff`, e.g., `image_iff`, `preimage_iff`, `vadd_iff`.
- **Affine-linear maps**: notation `≃ᵃL[ℝ]` for continuous affine linear equivalences over `ℝ`.
- **Set operations**: standard `''` (image), `⁻¹'` (preimage), `+ᵥ` (vector addition on sets), `ᶜ` (complement).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `intro` / `intro x hx` | Introduce elements and membership hypotheses. |
| `rcases` / `cases` | Decompose disjunctions (`hx : x ∈ s ∪ t`) or existential quantifiers. |
| `rw [...]` | Rewrite using known equalities (e.g., `connectedComponentIn_univ`, `image_univ`). |
| `apply ...` / `apply_convexHull_mono`, `apply_connectedComponentIn_mono` | Apply monotonicity lemmas for convex hulls and connected components. |
| `simp` / `simpa` | Simplify goals using algebraic identities (e.g., `sub_eq_add_neg`, `mem_segment_sub_add`). |
| `congrArg _` | Congruence for function application (used with `L.toHomeomorph.image_connectedComponentIn`). |
| `by_cases h : y ∈ E` | Case split on membership in a subspace. |
| `obtain ⟨z, hz⟩` | Extract witnesses from existential statements. |
| `refine ... <;> ...` | Structured proof refinement with sequential tactic chaining. |

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a standard pattern:
  1. **Unfold definition**: Start by unfolding `AmpleSet` → `∀ x ∈ s, convexHull ℝ (connectedComponentIn s x) = univ`.
  2. **Introduce arbitrary point**: `intro x hx`.
  3. **Case analysis** (e.g., on `x ∈ s ∪ t` or `x ∈ E`).
  4. **Use monotonicity**: Show inclusion of connected components or convex hulls via `connectedComponentIn_mono`, `convexHull_mono`.
  5. **Leverage structure-preserving maps**: Use properties of `≃ᵃL[ℝ]` (e.g., `image_connectedComponentIn`, `image_convexHull`).
  6. **Geometric argument** (for `of_one_lt_codim`):
     - Use `connectedComponentIn_eq_self_of_one_lt_codim` to reduce to showing path-connectedness.
     - Construct paths via segments (`segment_subset_convexHull`) avoiding the subspace using existence of points outside it.

- **Inductive/structural reasoning**: Not induction-heavy; mostly case analysis + monotonicity + algebraic simplification.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Normed` | Provides convex hull, normed space convex analysis. |
| `Mathlib.Analysis.NormedSpace.Connected` | Connected components, path-connectedness in normed spaces. |
| `Mathlib.LinearAlgebra.AffineSpace.ContinuousAffineEquiv` | Defines `≃ᵃL[ℝ]`, continuous affine equivalences, their properties (e.g., image of convex hulls, connected components). |

**Additional assumptions** (via typeclass inference):
- `[AddCommGroup F]`, `[Module ℝ F]`, `[TopologicalSpace F]`: ambient real topological vector space.
- `[NormedAddCommGroup F]`, `[NormedSpace ℝ F]`, `[TopologicalAddGroup F]`, `[ContinuousSMul ℝ F]`: for specific lemmas (e.g., `vadd`, `of_one_lt_codim`).

---

Let me know if you'd like a diagram of the logical dependencies or a summary of how `of_one_lt_codim` fits into the broader convex integration framework.