### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rtendsto_nhds` | `RTendsto r l (𝓝 x) ↔ ∀ s, IsOpen s → x ∈ s → r.core s ∈ l` | Characterizes right-tendsto (for relations) at a neighborhood filter via open sets and cores. |
| `rtendsto'_nhds` | `RTendsto' r l (𝓝 x) ↔ ∀ s, IsOpen s → x ∈ s → r.preimage s ∈ l` | Same as above but for the primed version (`RTendsto'`), using preimages instead of cores. |
| `ptendsto_nhds` | `PTendsto f l (𝓝 x) ↔ ∀ s, IsOpen s → x ∈ s → f.core s ∈ l` | Specialization of `rtendsto_nhds` to partial functions (`→.`). |
| `ptendsto'_nhds` | `PTendsto' f l (𝓝 x) ↔ ∀ s, IsOpen s → x ∈ s → f.preimage s ∈ l` | Specialization of `rtendsto'_nhds` to partial functions. |
| `PContinuous` | `def PContinuous (f : X →. Y) := ∀ s, IsOpen s → IsOpen (f.preimage s)` | Defines continuity for partial functions: preimage of open sets is open (within domain). |
| `open_dom_of_pcontinuous` | `PContinuous f → IsOpen f.Dom` | Shows that the domain of a partially continuous function is open. |
| `pcontinuous_iff'` | `PContinuous f ↔ ∀ {x y}, y ∈ f x → PTendsto' f (𝓝 x) (𝓝 y)` | Equivalence between partial continuity and local convergence (via `PTendsto'`) at all points in the graph. |
| `continuousWithinAt_iff_ptendsto_res` | `ContinuousWithinAt f s x ↔ PTendsto (PFun.res f s) (𝓝 x) (𝓝 (f x))` | Relates classical continuity on a subset to partial function continuity via restriction (`PFun.res`). |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `p*`: Pertains to *partial* functions (`PContinuous`, `PTendsto`, `ptendsto'_nhds`, etc.)
  - `r*`: Pertains to *relations* (`rtendsto`, `rtendsto'`, `r.core`, `r.preimage`)
  - `open_*`: Properties about openness (`open_dom_of_pcontinuous`)
- **Suffixes:**
  - `_nhds`: Characterizations involving neighborhood filters (`_nhds`, `_nhds'`)
  - `_def`: Definitions or equivalences derived from definitions (`ptendsto'_def` used internally)
- **Functional style:**
  - `preimage`: Used for pullback of sets under partial functions/relations.
  - `core`: Used for the *core* of a relation — the set of points where the relation is defined and single-valued.

---

#### 3. **Tactic Stack**

Frequently used tactics in this file:
- `rw`: Rewriting using equivalences and definitions (e.g., `rtendsto'_def`, `ptendsto'_def`, `isOpen_iff_nhds`)
- `simp only [...]`: Simplification with specific lemmas (e.g., `mem_nhds_iff`, `PFun.preimage_univ`)
- `intro` / `rintro`: Introducing hypotheses and destructuring existentials/conjunctions
- `apply`: Applying lemmas or implications
- `exact`: Finishing subgoals directly
- `set_tac` / `subset`-related reasoning (e.g., `PFun.preimage_mono`, `Set.Subset.refl`)
- `all_goals aesop` or similar automation is *not* used here — proofs are mostly manual and rely on `simp` + `rw` + `intro` + `apply`.

---

#### 4. **Proof Logic**

- **Structure**: Proofs are typically structured as bidirectional implications (`↔`), proven via two directions (`constructor`).
- **Common pattern**:
  1. Unfold definitions (`rw [ptendsto'_def]`, `rtendsto'_def`, `PContinuous`, etc.)
  2. Use neighborhood filter characterizations (`mem_nhds_iff`, `isOpen_iff_nhds`)
  3. Apply monotonicity lemmas (`preimage_mono`, `core_mono`)
  4. Use set-theoretic reasoning (`subset`, `mem_of_superset`)
- **Induction is not used** — this is mostly point-set topology reasoning.
- **Key logical flow**:
  - From openness condition → neighborhood filter membership
  - From local convergence (`PTendsto'`) → openness of preimages (and vice versa)

---

#### 5. **Imports**

- `Mathlib.Order.Filter.Partial`: Provides `Rel`, `PTendsto`, `PTendsto'`, `PFun`, `core`, `preimage`, etc.
- `Mathlib.Topology.Basic`: Provides basic topology concepts: `TopologicalSpace`, `IsOpen`, `𝓝`, `ContinuousWithinAt`, `mem_nhds_iff`, `isOpen_iff_nhds`.

These imports define the foundational objects: partial functions/relations, filters, and topological notions.

--- 

Let me know if you'd like a formalized summary in Lean style or a dependency graph.