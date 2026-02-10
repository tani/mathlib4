### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSeparatedMap` | `def IsSeparatedMap (f : X → Y) : Prop` | A function `f : X → Y` is *separated* if any two distinct points with the same image can be separated by disjoint open neighborhoods. |
| `IsLocallyInjective` | `def IsLocallyInjective (f : X → Y) : Prop` | A function `f` is *locally injective* if every point has a neighborhood on which `f` is injective. |
| `toPullbackDiag` | `f : X → Y ↦ x ↦ ⟨x, x, rfl⟩ : X → X ×_Y X` | The diagonal map into the pullback (fiber product) over `Y`. |
| `t2space_iff_isSeparatedMap` | `T2Space X ↔ IsSeparatedMap (const y)` | Characterizes Hausdorff spaces via separatedness of constant maps. |
| `discreteTopology_iff_locallyInjective` | `DiscreteTopology X ↔ IsLocallyInjective (const y)` | Characterizes discrete spaces via local injectivity of constant maps. |
| `isSeparatedMap_iff_isClosed_diagonal` | `IsSeparatedMap f ↔ IsClosed (pullbackDiagonal f)` | Separatedness ⇔ diagonal in pullback is closed. |
| `isLocallyInjective_iff_isOpen_diagonal` | `IsLocallyInjective f ↔ IsOpen (pullbackDiagonal f)` | Local injectivity ⇔ diagonal in pullback is open. |
| `isSeparatedMap_iff_isClosedEmbedding` | `IsSeparatedMap f ↔ IsClosedEmbedding (toPullbackDiag f)` | Separatedness ⇔ diagonal is a closed embedding. |
| `IsLocallyInjective_iff_isOpenEmbedding` | `IsLocallyInjective f ↔ IsOpenEmbedding (toPullbackDiag f)` | Local injectivity ⇔ diagonal is an open embedding. |
| `isSeparatedMap_iff_isClosedMap` / `isLocallyInjective_iff_isOpenMap` | Equivalent characterizations using image maps. | Links separated/local injective to mapping properties of the diagonal. |
| `IsSeparatedMap.pullback` | Pullback of a separated map along any map remains separated. | Stability of separated maps under base change. |
| `IsSeparatedMap.comp_left`, `IsSeparatedMap.comp_right` | Closure under composition with injective maps (left/right). | Stability under composition. |
| `IsLocallyInjective.comp_left`, `IsLocallyInjective.comp_right` | Analogous stability for local injectivity. | Stability under composition. |
| `IsSeparatedMap.isClosed_eqLocus` | If `f` is separated and `g₁, g₂` coequalized by `f`, then `{a | g₁ a = g₂ a}` is closed. | Equalizer locus is closed under separated maps. |
| `IsLocallyInjective.isOpen_eqLocus` | Same as above but open under locally injective maps. | Equalizer locus is open under locally injective maps. |
| `eq_of_comp_eq` | If `f` is both separated and locally injective, and `A` is connected, then lifts agreeing at one point are equal. | Uniqueness of lifts in connected spaces. |
| `eqOn_of_comp_eqOn`, `const_of_comp`, `constOn_of_comp` | Variants for subsets and constant compositions. | Generalizations of uniqueness to subspaces and constant maps. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `is_`: Predicate definitions (`IsSeparatedMap`, `IsLocallyInjective`)
  - `eq_`: Equalizer-related lemmas (`eqLocus`, `eq_of_comp_eq`, `eqOn_of_comp_eqOn`)
  - `const_`: Constant-map variants (`const_of_comp`, `constOn_of_comp`)
  - `pullback_`: Pullback-related constructions (`pullbackDiagonal`, `mapPullback`, `preimage_pullbackDiagonal`)
  - `nhds_`: Neighborhood-based characterizations (`isSeparatedMap_iff_nhds`, `isLocallyInjective_iff_nhds`)

- **Suffixes:**
  - `_map`: Refers to maps (e.g., `isSeparatedMap_iff_isClosed_map`)
  - `_embedding`: Refers to embedding properties (`isSeparatedMap_iff_isClosedEmbedding`)
  - `_diagonal`: Refers to diagonal maps in pullbacks (`isSeparatedMap_iff_isClosed_diagonal`)
  - `_iff_*`: Biconditional characterizations (`_iff_nhds`, `__iff_isClosed_diagonal`, etc.)

- **Aliases:**
  - Deprecated aliases use `alias` with `deprecated` annotation and date (e.g., `embedding_toPullbackDiag`, `isSeparatedMap_iff_closedEmbedding`)

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `erw`: Rewriting with definitions and equivalences.
- `simp_rw`, `simp only`: Simplification with rewrite rules, especially for quantifiers and filters.
- `apply_rules`: Applying multiple lemmas in sequence (e.g., `continuous_fst`, `continuous_snd`, `Continuous.comp`).
- `exact`, `refine`, `intro`, `cases`: Basic proof construction.
- `fun_prop`: Propagation of continuity goals (used in `eqLocus` lemmas).
- `mem_of_mem_nhds`, `interior_subset`, `Filter.mem_prod_iff`: Filter/topology-specific reasoning.
- `set_option linter.unusedVariables false`: Used to suppress linter warnings for type-directed variables.

---

#### 4. **Proof Logic**

- **Structure of proofs:**
  - Most equivalences (`↔`) are proven via double implication (`⟨fun h ↦ ?_, fun ⟨...⟩ ↦ ?_⟩`).
  - Many proofs reduce to manipulating neighborhoods or open/closed sets via:
    - `isSeparatedMap_iff_nhds`, `isLocallyInjective_iff_nhds`
    - `isOpen_iff_mem_nhds`, `isClosed_iff_compl_isOpen`
  - Pullback-based characterizations (`isSeparatedMap_iff_isClosed_diagonal`, etc.) are central.
  - Continuity and injectivity are often used to lift properties through pullbacks or compositions.
  - Connectedness arguments use `IsClopen.eq_univ` or `isPreconnected_iff_preconnectedSpace`.

- **Common proof patterns:**
  - *Reduction to diagonal*: Show a property holds for `f` iff it holds for `toPullbackDiag f`.
  - *Stability under pullback/composition*: Use preimage or mapPullback continuity lemmas.
  - *Equalizer arguments*: Combine closedness and openness to get clopen sets, then use connectedness.

---

#### 5. **Imports**

- `Mathlib.Topology.Connected.Basic`: For connectedness, preconnectedness, clopen sets.
- `Mathlib.Topology.Separation.Hausdorff`: For `T2Space`, `t2_separation`.

These imports indicate the module sits at the intersection of:
- **Separation axioms** (Hausdorff, disjoint neighborhoods),
- **Connectedness** (preconnected, clopen subsets),
- **Pullback/fiber product constructions** in topology,
- **Embedding theory** (open/closed embeddings, embeddings in general).

The module is foundational for categorical topology (e.g., analogues of separated/unramified morphisms in algebraic geometry), and is designed to support further development in homotopy theory or sheaf theory where unique lifting and local injectivity are essential.

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the larger `Mathlib` topology hierarchy.