Here's a structured technical metadata summary of the provided Lean 4 file `BoxIntegral.lean`, extracted for use in building a domain-specific AI agent focused on analysis of rectangular boxes in `ℝⁿ` within the Lean 4 ecosystem.

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Box ι` | `Structure` | Represents a nonempty rectangular box in `ι → ℝ` as a pair of functions `lower, upper : ι → ℝ` with `lower i < upper i` for all `i`. Interpreted as the product of half-open intervals `(lower i, upper i]`. |
| `toSet I` | `Set (ι → ℝ)` | Coercion of a box `I` to its underlying set: `{x | ∀ i, x i ∈ Ioc (I.lower i) (I.upper i)}`. |
| `Icc I` | `Box ι ↪o Set (ι → ℝ)` | Bundled monotone embedding of a box into the corresponding **closed** box `Icc I.lower I.upper`. |
| `face I i` | `Box (Fin n)` | Hyperface of a box `I : Box (Fin (n+1))` at coordinate `i`, obtained by restricting to the complement of `i` via `Fin.succAbove`. |
| `distortion I` | `ℝ≥0` | Maximal ratio of total diameter to edge length: `sup i, nndist lower upper / nndist (lower i) (upper i)`. Measures anisotropy of the box. |
| `mk' l u` | `WithBot (Box ι)` | Convenience constructor returning `⟨l, u, h⟩` if `l < u` pointwise, else `⊥`. Ensures coercion to set is always `{x | ∀ i, x i ∈ Ioc (l i) (u i)}`. |
| `Ioo I` | `Box ι →o Set (ι → ℝ)` | Interior of a box: product of open intervals `(lower i, upper i)`. |
| `le_TFAE` | `List.TFAE [...]` | Equivalence of 4 characterizations of box inclusion: pointwise inclusion, set inclusion, closed-box inclusion, and bounds comparison. |
| `Ioo_subset_coe` | `Box.Ioo I ⊆ I` | Interior lies inside the box (as a set). |
| `iUnion_Ioo_of_tendsto` | `⋃ n, Box.Ioo (J n) = Box.Ioo I` | Interior of a box is the union of interiors of a monotone sequence of boxes converging to it (under suitable convergence of bounds). |
| `nndist_le_distortion_mul` | `nndist lower upper ≤ distortion * nndist (lower i) (upper i)` | Fundamental inequality bounding total diameter by edge length scaled by distortion. |
| `disjoint_withBotCoe` | `Disjoint (I : Set _) J ↔ Disjoint I J` | Relates disjointness of sets to disjointness of boxes in `WithBot`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `lower_`, `upper_`: refer to coordinate-wise bounds.
  - `coe_`, `withBotCoe_`: coercion-related lemmas.
  - `mem_`, `disjoint_`, `Icc_`, `Ioo_`: membership, disjointness, closed/open interval variants.
  - `face_`, `distortion_`: geometric operations.
- **Suffixes**:
  - `_def`: definition simplification lemmas (e.g., `Icc_def`, `distortion_eq_of_sub_eq_div`).
  - `_mono`, `_antitone`: monotonicity/antitonicity lemmas (e.g., `monotone_upper`, `antitone_lower`).
  - `_subset_`, `_inj`, `_ext`: set-theoretic properties.
  - `_TFAE`: "The Following Are Equivalent" lemmas.
- **Structure/Type Names**:
  - `Box ι`, `WithBot (Box ι)`: core types.
  - `Icc`, `Ioo`: bundled monotone maps for closed/open interiors.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `tfae_have`, `tfae_finish` | Proving equivalence of multiple conditions (TFAE). |
| `simp`, `simp_rw`, `simp only` | Simplification, especially with `@[simp]` lemmas like `mem_def`, `coe_eq_pi`, `Icc_def`. |
| `rw`, `congr`, `ext` | Rewriting, congruence, and extensionality (e.g., `ext` for box equality via membership). |
| `apply`, `exact`, `intro`, `intro h` | Basic proof construction. |
| `gcongr` | Goal-directed congruence reasoning (e.g., for inequalities involving `*`, `≤`). |
| `induction`, `cases'` | Structural induction on `WithBot`, `Box`, or `Fin`. |
| `ring`, `linarith` | Arithmetic reasoning (used implicitly via `simp` or `linarith` in `tfae_have` steps). |
| `erw`, `convert` | Eta-expansion-aware rewriting and conversion. |
| `set_tac` (via `Set.ext`, `pi_univ_Icc`, etc.) | Set-theoretic reasoning, especially for products over `ι`. |

---

### **4. Proof Logic & Strategy**

- **Structure-based reasoning**: Most proofs proceed by destructuring `Box` into `lower`, `upper`, and `lower_lt_upper`, then reasoning pointwise over `ι`.
- **Equivalence chaining**: Many lemmas (e.g., `le_TFAE`) use `tfae_have` to establish equivalences between set-theoretic, order-theoretic, and coordinate-wise conditions.
- **Monotonicity & continuity**: Proofs often rely on monotonicity of `lower`, `upper`, and `face`, and continuity of `insertNth` maps.
- **Convergence arguments**: For sequences of boxes, convergence of bounds (`Tendsto`) is used to lift to convergence of sets (e.g., `iUnion_Ioo_of_tendsto`).
- **Bundled embeddings**: `Icc`, `Ioo` are defined as `→o` (monotone maps), enabling use of `OrderEmbedding` machinery.
- **`WithBot` handling**: Induction on `WithBot` (via `elim`, `recBotCoe`) is standard for reasoning about possibly empty boxes.

---

### **5. Imports & Scope**

**Core Imports**:
```lean
import Mathlib.Order.Fin.Tuple
import Mathlib.Order.Interval.Set.Monotone
import Mathlib.Topology.MetricSpace.Basic
import Mathlib.Topology.MetricSpace.Bounded
import Mathlib.Topology.Order.MonotoneConvergence
import Mathlib.Topology.MetricSpace.Pseudo.Real
```

**Domain Scope**:
- **Order theory**: intervals, monotone maps, lattices, `WithBot`, partial orders.
- **Topology**: metric/distance (`nndist`, `dist`), boundedness, compactness, continuity, convergence.
- **Measure theory context**: Boxes are used for Riemann-style integrals (Riemann, HK, McShane), though integration itself is not defined here.
- **Finite-dimensional Euclidean space**: Represented as `ι → ℝ`, with `ι = Fin n` typical.

**Key Libraries Leveraged**:
- `Mathlib.Order.Interval.Set.Monotone`: for `Icc`, `Ioo`, `Ioc`, monotonicity lemmas.
- `Mathlib.Topology.Order.MonotoneConvergence`: for convergence of monotone sequences of sets/functions.
- `Mathlib.Topology.MetricSpace.Pseudo.Real`: for `nndist`, `dist`, and related lemmas.

---

Let me know if you'd like a **dependency graph**, **proof automation suggestions**, or a **Lean 4 AI agent prompt template** based on this metadata.