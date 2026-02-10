### Technical Metadata Brief: Stone’s Separation Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `segment` | `segment 𝕜 x y = { z | ∃ a b : 𝕜, 0 ≤ a ∧ 0 ≤ b ∧ a + b = 1 ∧ z = a • x + b • y }` | Represents the closed line segment between `x` and `y` over a linearly ordered field `𝕜`. |
| `convexHull` | `convexHull 𝕜 s` | Smallest convex set containing `s`. Defined via finite convex combinations. |
| `Convex` | `Convex 𝕜 s ↔ ∀ ⦃x y⦄, x ∈ s → y ∈ s → segment 𝕜 x y ⊆ s` | Standard convexity predicate. |
| `not_disjoint_segment_convexHull_triple` | `segment 𝕜 u v ∩ convexHull {p, q, z} ≠ ∅` under geometric conditions | Technical lemma about intersections in tetrahedral geometry; used to derive contradiction in separation proof. |
| `exists_convex_convex_compl_subset` | `∃ C, Convex C ∧ Convex Cᶜ ∧ s ⊆ C ∧ t ⊆ Cᶜ` | **Stone’s Separation Theorem**: disjoint convex sets can be separated by a convex set whose complement is also convex. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `mem_`, `subset_`, `disjoint_`, `convex_`, `segment_`, `convexHull_`: standard Mathlib naming for predicates and operations.
  - `left_`, `right_`: e.g., `left_mem_segment`, `right_mem_segment`.
- **Suffixes**:
  - `_mem_`: membership in a constructed set (e.g., `centerMass_mem_convexHull`).
  - `_subset_`: subset relation (e.g., `segment_subset_convexHull`).
  - `_left`, `_right`: for binary operations or inclusions (e.g., `disjoint_sUnion_left`).
- **Logical constructs**:
  - `_iff_`, `_eq_of_subset`, `_symm.mono`: for equivalence and monotonicity reasoning.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `obtain` / `rcases` | Extract existential witnesses or decompose conjunctions/disjunctions. |
| `rw` | Rewrite using equalities or definitions (e.g., `hz`, `habz`, `hav`). |
| `simp` / `simp_rw` | Simplify goals using definitional equalities and lemmas (e.g., `zero_smul`, `one_smul`). |
| `convexHull_min`, `segment_subset_convexHull` | Apply known inclusion lemmas for convex hulls and segments. |
| ` positivity` | Prove non-negativity of expressions built from ordered field operations. |
| `linear_combination` | Solve linear arithmetic over ordered fields (used in `hw` proof). |
| `module` | Simplify module/scalar multiplication identities (e.g., distributivity, associativity). |
| `congr` | Reduce equality goals by congruence (e.g., `congr 3`). |
| `fin_cases`, `Finset.univ`, `Fin.sum_univ_*` | Handle finite index reasoning (e.g., `Fin 3`). |
| `zorn_subset_nonempty` | Apply Zorn’s Lemma for maximal element construction. |
| `rw [hmax.eq_of_subset ...]` | Use maximality condition to derive equalities. |

---

#### **4. Proof Logic**

The proof follows a **maximal construction + geometric contradiction** strategy:

1. **Setup**:
   - Define a family `S` of sets disjoint from `t` and convex.
   - Use Zorn’s Lemma to get a maximal element `C ∈ S`.

2. **Goal**: Show `Cᶜ` is convex.
   - Equivalent to: for any `x ∈ C`, `y ∈ C`, and `z ∈ segment x y`, we have `z ∈ C`.
   - Assume `z ∉ C` (i.e., `z ∈ Cᶜ`) and aim for contradiction.

3. **Key Lemma**:
   - Prove that for any `c ∈ Cᶜ`, there exists `a ∈ C` such that `segment c a` meets `t`.
   - Use this to construct points `p, q ∈ C` and segments `[x, p]`, `[y, q]`, `[u, v]` meeting `t`.

4. **Contradiction via `not_disjoint_segment_convexHull_triple`**:
   - Show that `segment u v` must intersect `convexHull {p, q, z}`.
   - Since `p, q ∈ C`, `z ∈ Cᶜ`, and `C` is convex, this intersection lies in `C`, contradicting disjointness with `t`.

5. **Geometric core**:
   - The tetrahedron lemma (`not_disjoint_segment_convexHull_triple`) is proven by explicit convex combination construction using barycentric coordinates over `Fin 3`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Combination` | Defines convex combinations, convex hulls, and basic properties. |
| `Mathlib.Analysis.Convex.Join` | Defines `convexJoin`, used in `convexHull_insert` rewriting. |

**Domain**: Real (or more generally, linearly ordered field) topological vector spaces — though this theorem is *purely algebraic-geometric*, no topology is assumed in the proof itself.

**Scope**: Foundational convex geometry; weaker than Hahn–Banach separation (no continuity/local convexity needed), but gives a *set-theoretic* separation (convex + co-convex separator).

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., for a domain model or AI agent prompt).