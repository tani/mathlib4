Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsExtreme 𝕜 A B` | `Set E → Set E → Prop` | States that `B` is an *extreme subset* of `A`: if a point in `B` lies on an open segment between two points in `A`, then both endpoints must lie in `B`. |
| `Set.extremePoints A` | `Set E` | The set of *extreme points* of `A`: points `x ∈ A` such that if `x` lies on an open segment between two points in `A`, then both endpoints equal `x`. |
| `IsExtreme.refl` | `IsExtreme 𝕜 A A` | Reflexivity: any set is extreme in itself. |
| `IsExtreme.trans` | `IsExtreme A B → IsExtreme B C → IsExtreme A C` | Transitivity of extremeness. |
| `IsExtreme.antisymm` | `AntiSymmetric (IsExtreme 𝕜)` | Antisymmetry: if `B` is extreme in `A` and vice versa, then `B = A`. |
| `IsExtreme.inter` | `IsExtreme A B → IsExtreme A C → IsExtreme A (B ∩ C)` | Intersection of extreme subsets (w.r.t. same `A`) is extreme. |
| `IsExtreme.mono` | `IsExtreme A C → B ⊆ A → C ⊆ B → IsExtreme B C` | Monotonicity: restricting the ambient set preserves extremeness. |
| `isExtreme_iInter` | `∀ i, IsExtreme A (F i) → IsExtreme A (⋂ i, F i)` | Arbitrary intersections of extreme subsets (w.r.t. same `A`) are extreme. |
| `isExtreme_singleton` | `IsExtreme A {x} ↔ x ∈ A.extremePoints` | A singleton is extreme iff its element is an extreme point. |
| `extremePoints_prod` | `(s ×ˢ t).extremePoints = s.extremePoints ×ˢ t.extremePoints` | Extreme points of a product are the product of extreme points. |
| `extremePoints_pi` | `(univ.pi s).extremePoints = univ.pi (λ i, (s i).extremePoints)` | Extreme points of a pi-type (dependent product) are pointwise extreme points. |
| `image_extremePoints` | `f '' extremePoints s = extremePoints (f '' s)` | Linear equivalences preserve extreme points. |
| `Convex.mem_extremePoints_iff_convex_diff` | `Convex A → (x ∈ A.extremePoints ↔ x ∈ A ∧ Convex (A \ {x}))` | For convex `A`, `x` is extreme iff removing `x` keeps the set convex. |
| `Convex.mem_extremePoints_iff_mem_diff_convexHull_diff` | `Convex A → (x ∈ A.extremePoints ↔ x ∈ A \ convexHull (A \ {x}))` | Alternative characterization using convex hulls. |
| `extremePoints_convexHull_subset` | `(convexHull A).extremePoints ⊆ A` | Extreme points of the convex hull lie in the original set. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isExtreme_`: for lemmas about `IsExtreme`.
  - `extremePoints_`: for lemmas about `Set.extremePoints`.
  - `mem_`: for membership characterizations (e.g., `mem_extremePoints`, `mem_extremePoints_iff_forall_segment`).
  - `convex_`: for convexity-related lemmas (e.g., `convex_diff`, `convex_remove_iff_not_mem_convexHull_remove`).

- **Suffixes**:
  - `_iff_`: for biconditional characterizations.
  - `_subset_`: for subset relations.
  - `_eq_`: for equality lemmas.

- **Structure**:
  - `IsExtreme` is a predicate on *pairs* of sets.
  - `Set.extremePoints` is a *function* from sets to sets.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `refine` / `exact` | Constructing proofs via pattern matching or known facts. |
| `rintro` / `intro` | Introducing hypotheses and variables. |
| `rw` / `simp_rw` | Rewriting using equalities or definitions. |
| `ext` | Extensionality for sets/functions. |
| `simp only [...]` | Simplifying using specific lemmas. |
| `cases` / `rcases` | Case analysis on existentials or conjunctions. |
| `convex_iff_openSegment_subset` / `convex_iff_segment_subset` | Convexity criteria via segments. |
| `subset.antisymm` | Proving set equality via double inclusion. |
| `by_contra!` | Proof by contradiction (with `!` for `not_not` simplification). |
| `iterate` | Repeating a tactic (e.g., `iterate 2` applies twice). |

---

### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *definition-first* approach: unpack definitions (`IsExtreme`, `extremePoints`) and apply logical reasoning.
  - **Induction** is not used (as extremeness is defined pointwise).
  - **Case analysis** on membership or segment conditions is common.
  - **Equational reasoning** via `rw`, `simp`, and `conv` is heavily used.
  - **Set-theoretic reasoning** (e.g., `subset.antisymm`, `ext`, `iInter_subset_of_subset`) dominates.

- **Typical flow**:
  1. Unpack definitions (`intro`, `rintro`).
  2. Use assumptions (e.g., `hAB : IsExtreme A B`) to derive endpoint membership.
  3. Apply lemmas like `convex_iff_openSegment_subset` or `convex_remove_iff_not_mem_convexHull_remove`.
  4. Use `subset.antisymm` or `ext` to conclude equality.

---

### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Analysis.Convex.Hull
  ```
  - Provides `convexHull`, `openSegment`, `segment`, and related convexity lemmas.

- **Other imports implied by context**:
  - `Mathlib.Algebra.Module` (via `Module`, `SMul`, `AddCommGroup`)
  - `Mathlib.Algebra.Order.Partial` (via `OrderedSemiring`, `OrderedRing`)
  - `Mathlib.Data.Set.Basic`, `Mathlib.Data.Set.Image`, `Mathlib.Data.Set.Pi`
  - `Mathlib.Data.Setoid.Basic` (for `EquivLike`, `LinearEquivClass`)
  - `Mathlib.Data.Set.Function` (for `image`, `pi`, `univ.pi`)
  - `Mathlib.Data.Set.Subset` (for `Subset`, `inter`, `diff`, `iInter`, etc.)

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Convex geometry in modules over ordered semirings/rings.
- **Key abstractions**: Extreme sets, extreme points, convex hulls, open/closed segments.
- **Typical tasks**:
  - Prove extremeness of a set using `IsExtreme` definition.
  - Characterize extreme points via convexity or segment conditions.
  - Transfer extremeness through set operations (intersection, product, image under linear equivalences).
- **Common pitfalls**:
  - Forgetting to assume convexity where needed (e.g., `Convex A` in `mem_extremePoints_iff_convex_diff`).
  - Overlooking non-emptiness assumptions for intersections (`isExtreme_iInter` requires `Nonempty ι`).

--- 

Let me know if you'd like a formalized tactic guide or a proof strategy generator for this domain.