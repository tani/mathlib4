Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsNaturalSMul` | `class` | States that the `G`-action on fibers is compatible with morphisms in `C`. |
| `isoOnObj` | `g : G → X : C ↦ F.obj X ≅ F.obj X` | Constructs an isomorphism on each fiber induced by `g`. |
| `toAut` | `G →* Aut F` | Canonical group homomorphism from `G` to automorphisms of the fiber functor `F`. |
| `toAut_hom_app_apply` | `(toAut g).hom.app X x = g • x` | Describes the action of `toAut g` on a fiber element. |
| `toAut_injective_of_non_trivial` | `(∀ g, (∀ X x, g • x = x) → g = 1) → Function.Injective (toAut g)` | Injectivity of `toAut` under trivial-action condition. |
| `toAut_continuous` | `[TopologicalGroup G] → [∀ X, ContinuousSMul G (F.obj X)] → Continuous (toAut F G)` | Continuity of `toAut` under continuity of action. |
| `action_ext_of_isGalois` | Extends equality of `g • x = t.app X x` for one `x` to all `y`, for Galois objects. |
| `toAut_surjective_isGalois` | Surjectivity on one Galois object under transitivity. |
| `toAut_surjective_isGalois_finite_family` | Extends surjectivity to finite families of Galois objects. |
| `toAut_surjective_of_isPretransitive` | Surjectivity of `toAut` under compactness + continuity + transitivity on Galois objects. |
| `isPretransitive_of_surjective` | Converse: surjectivity of `toAut` implies transitivity on connected objects. |
| `IsFundamentalGroup` | `class` | A compact topological group `G` with natural, continuous, transitive (on Galois objects), and faithful action on fibers. |
| `toAut_bijective` | `Function.Bijective (toAut F G)` | Under `IsFundamentalGroup`, `toAut` is bijective. |
| `toAutMulEquiv` | `G ≃* Aut F` | Group isomorphism induced by `toAut`. |
| `toAut_isHomeomorph` | `IsHomeomorph (toAut F G)` | `toAut` is a homeomorphism under `IsFundamentalGroup`. |
| `toAutHomeo` | `G ≃ₜ Aut F` | Canonical topological group isomorphism. |

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `is_`: for properties (e.g., `IsNaturalSMul`, `IsFundamentalGroup`)
  - `toAut`: for canonical maps into `Aut F`
  - `action_ext_`: for extension lemmas over Galois objects
- **Suffixes**:
  - `_of_`: for constructions from assumptions (e.g., `toAut_injective_of_non_trivial`)
  - `_apply`: for evaluation lemmas (e.g., `toAut_hom_app_apply`)
  - `_bijective`, `_homeomorph`: for structural properties of maps
- **Abbreviations**:
  - `SMul` = scalar multiplication / group action
  - `FintypeCat` = category of finite types
  - `pt` = point (often basepoint in pointed objects)

---

### 🛠️ **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with definitional equalities and lemmas
- `ext`: extensionality for functions/natural transformations
- `rw`: rewriting using equalities or definitions
- `exact`, `refine`, `obtain`: proof construction
- `intro`, `cases`: destructuring hypotheses
- `apply`, `have`, `let`: intermediate lemma introduction
- `rw [← ...]`: reverse rewriting for naturality or action compatibility
- `congr'`: congruence reasoning (e.g., for `Iso.ext`)
- `nontriviality`-style reasoning via `non_trivial'` and `stabilizer_isOpen`
- `compactness` arguments: `CompactSpace.isCompact_univ`, `iInter_nonempty`

---

### 🧠 **Proof Logic & Strategy**

- **Inductive/structural reasoning** on Galois objects and their morphisms.
- **Two-way implications** between group-theoretic properties (e.g., transitivity, continuity, faithfulness) and categorical properties (e.g., surjectivity/injectivity of `toAut`).
- **Key proof patterns**:
  - Use of `action_ext_of_isGalois` to reduce verification on one point to all points for Galois objects.
  - Use of compactness to extract a global `g ∈ G` from a family of cosets (`⋂ i, cl i ≠ ∅`).
  - Reduction to finite families via `toAut_surjective_isGalois_finite_family`.
  - Faithfulness (`non_trivial'`) ↔ injectivity of `toAut`.
  - Transitivity on Galois objects + compactness + continuity ↔ surjectivity of `toAut`.
- **Equivalence of structures**:
  - `IsFundamentalGroup F G` ↔ `toAut F G` is a bijective continuous map ↔ `G ≃ₜ Aut F`.

---

### 📦 **Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Galois.Basic` | Core definitions: Galois objects, Galois categories |
| `Mathlib.CategoryTheory.Galois.Topology` | Topological aspects of Galois categories |
| `Mathlib.CategoryTheory.Galois.Prorepresentability` | Pro-representability and fiber functors |
| `Mathlib.Topology.Algebra.OpenSubgroup` | Open subgroups, stabilizers, continuity of actions |

**Core abstractions used**:
- `GaloisCategory`, `FiberFunctor`, `Aut F`, `FintypeCat`
- `MulAction`, `ContinuousSMul`, `TopologicalGroup`, `CompactSpace`
- `PointedGaloisObject`, `stabilizer`, `leftCoset`, `nhds_one_has_basis_stabilizers`

---

Let me know if you'd like a **diagrammatic summary** of the main equivalences or a **proof sketch generator** for key theorems like `toAut_bijective`.