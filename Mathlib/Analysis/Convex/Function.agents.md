Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Convex and Concave Functions in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `ConvexOn 𝕜 s f` | `Prop` | `f` is convex on convex set `s`: epigraph is convex; inequality `f(a•x + b•y) ≤ a•f x + b•f y` for `a,b ≥ 0, a+b=1`. |
| `ConcaveOn 𝕜 s f` | `Prop` | `f` is concave on `s`: hypograph is convex; inequality `a•f x + b•f y ≤ f(a•x + b•y)`. |
| `StrictConvexOn 𝕜 s f` | `Prop` | Strict version: inequality `<` for `x ≠ y`, `a,b > 0`. |
| `StrictConcaveOn 𝕜 s f` | `Prop` | Strict concavity analog. |
| `ConvexOn.dual` | `ConvexOn 𝕜 s f → ConcaveOn 𝕜 s (toDual ∘ f)` | Duality via order dual: convex ↔ concave under `toDual`. |
| `convexOn_id` | `Convex 𝕜 s → ConvexOn 𝕜 s id` | Identity function is convex on convex sets. |
| `convexOn_const` | `Convex 𝕜 s → ConvexOn 𝕜 s (fun _ ↦ c)` | Constant functions are convex. |
| `LinearMap.convexOn` | `Convex 𝕜 s → ConvexOn 𝕜 s f` for linear `f` | Linear maps are convex (and concave). |
| `ConvexOn.convex_epigraph` | `ConvexOn 𝕜 s f → Convex 𝕜 {p | p.1 ∈ s ∧ f p.1 ≤ p.2}` | Epigraph characterization. |
| `convexOn_iff_convex_epigraph` | `↔` | Equivalence between convexity and convex epigraph. |
| `ConvexOn.sup` | `ConvexOn 𝕜 s f → ConvexOn 𝕜 s g → ConvexOn 𝕜 s (f ⊔ g)` | Pointwise max of convex functions is convex. |
| `StrictConvexOn.sup` | Strict version of above. |
| `ConvexOn.le_on_segment` | Bounds convex functions on segments by endpoint maxima. |
| `StrictConvexOn.lt_on_openSegment` | Strict bound on open segments. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `convexOn_`, `concaveOn_`, `strictConvexOn_`, `strictConcaveOn_`: for definitions and basic properties.
  - `dual`: for order-dual equivalences (e.g., `ConvexOn.dual`, `StrictConcaveOn.dual`).
  - `translate_`: for translation invariance (`translate_right`, `translate_left`).
  - `comp_`, `comp_linearMap`: for composition with monotone/linear maps.
  - `convex_`, `concave_`: for derived convex/concave sets (e.g., `convex_le`, `convex_epigraph`).

- **Suffixes**:
  - `_of_lt`: for characterizations using only `x < y`.
  - `_iff_*`: for equivalence lemmas.
  - `_pairwise_pos`: for pairwise positivity variants.

#### **3. Tactic Stack**

Frequently used tactics:
- `rfl`, `rw`, `simp_rw`, `refine`, `exact`
- `gcongr`: for monotonicity in inequalities (e.g., `smul_le_smul`, `add_le_add`)
- `calc`: for chaining inequalities/equalities
- `wlog`: for symmetry arguments (e.g., assuming `x < y`)
- `obtain rfl | ha'`: case analysis on equality/non-equality
- `convex_iff_*`: to switch between definitions (e.g., `convex_iff_openSegment_subset`)
- `aesop`, `linarith`, `norm_num`: for arithmetic goals (implied by imports)

#### **4. Proof Logic**

- **Structure**: Most proofs follow a pattern:
  1. Split `ConvexOn` into `⟨convex_s, inequality⟩`.
  2. Prove convexity of domain set (often `assumption` or `hf.1`).
  3. Prove inequality using:
     - Induction or case analysis on `a = 0` or `b = 0`.
     - Monotonicity (`gcongr`, `smul_le_smul`).
     - Hypotheses (`hf.2`, `hg.2`, etc.).
     - Algebraic simplifications (`rw [smul_add, add_add_add_comm]`).
- **Symmetry & Duality**:
  - Many theorems come in dual pairs via `toDual`/`ofDual`.
  - Proofs often reduce to dual case (e.g., `hf.dual.convexOn`).
- **Segment-based reasoning**:
  - Use `openSegment`, `segment`, or explicit convex combinations.
  - Often rely on `convex_iff_openSegment_subset` or `convex_iff_pairwise_pos`.

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Analysis.Convex.Basic`: foundational convexity.
  - `Mathlib.Order.Filter.Extr`: extremal points/filters (used for epigraph/hypograph).
  - `Mathlib.Tactic.NormNum`: numeric normalization (for `norm_num` in proofs).
- **Type Class Assumptions**:
  - `OrderedSemiring 𝕜`, `AddCommMonoid E`, `OrderedAddCommMonoid α`, `SMul 𝕜 E`, `Module 𝕜 β`, `OrderedSMul 𝕜 β`, `LinearOrder E`, etc.
- **Scope**: General vector-space setting over ordered semirings/modules; includes real analysis (via `OrderedSMul`, `LinearOrderedAddCommMonoid`), but not restricted to `ℝ`.

---

Let me know if you'd like a diagram of dependencies or a summary of the Jensen inequality development.