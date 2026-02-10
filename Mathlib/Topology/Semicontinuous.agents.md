Here's a structured technical metadata summary extracted from the provided Lean 4 file on **semicontinuous maps**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LowerSemicontinuousWithinAt f s x` | `∀ y < f x, ∀ᶠ x' ∈ 𝓝[s] x, y < f x'` — lower semicontinuity at `x` *within* set `s`. |
| `LowerSemicontinuousAt f x` | `∀ y < f x, ∀ᶠ x' ∈ 𝓝 x, y < f x'` — lower semicontinuity at `x`. |
| `LowerSemicontinuousOn f s` | `∀ x ∈ s, LowerSemicontinuousWithinAt f s x` — lower semicontinuity *on* set `s`. |
| `LowerSemicontinuous f` | `∀ x, LowerSemicontinuousAt f x` — globally lower semicontinuous. |
| `UpperSemicontinuousWithinAt f s x` | `∀ y, f x < y → ∀ᶠ x' ∈ 𝓝[s] x, f x' < y` — upper semicontinuity within `s`. |
| `UpperSemicontinuousAt f x` | `∀ y, f x < y → ∀ᶠ x' ∈ 𝓝 x, f x' < y` — upper semicontinuity at `x`. |
| `UpperSemicontinuousOn f s` | `∀ x ∈ s, UpperSemicontinuousWithinAt f s x` — upper semicontinuity on `s`. |
| `UpperSemicontinuous f` | `∀ x, UpperSemicontinuousAt f x` — globally upper semicontinuous. |

#### Key Theorems (selected highlights):
- `lowerSemicontinuous_iff_isOpen_preimage`:  
  `LowerSemicontinuous f ↔ ∀ y, IsOpen (f ⁻¹' Ioi y)` — characterizes lower semicontinuity via openness of strict upper level sets.
- `lowerSemicontinuous_iff_isClosed_preimage` (in linear order):  
  `LowerSemicontinuous f ↔ ∀ y, IsClosed (f ⁻¹' Iic y)` — dual characterization using closed lower level sets.
- `lowerSemicontinuous_iff_isClosed_epigraph` (in dense complete linear order with order topology):  
  `LowerSemicontinuous f ↔ IsClosed {p | f p.1 ≤ p.2}` — epigraph characterization.
- `lowerSemicontinuousWithinAt_iff_le_liminf` (in dense complete linear order):  
  `LowerSemicontinuousWithinAt f s x ↔ f x ≤ liminf f (𝓝[s] x)` — liminf-based characterization.
- `Continuous.lowerSemicontinuous`: Continuous ⇒ lower semicontinuous.
- `lowerSemicontinuous_const`, `lowerSemicontinuous_indicator`, `lowerSemicontinuous_add`, `lowerSemicontinuous_sum`, `lowerSemicontinuous_iSup`, `lowerSemicontinuous_ciSup` — closure properties.
- `Continuous.comp_lowerSemicontinuous` (monotone `g`): composition preserves lower semicontinuity.
- `Continuous.comp_lowerSemicontinuous_antitone` (antitone `g`): maps lower semicontinuous to *upper* semicontinuous.
- `LowerSemicontinuous.isClosed_epigraph`: epigraph closed iff function is lower semicontinuous (under conditions).
- `lowerSemicontinuous_iff_le_liminf`: pointwise liminf condition.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `lowerSemicontinuous*`: for lower semicontinuity variants (`WithinAt`, `At`, `On`, plain).
  - `upperSemicontinuous*`: for upper semicontinuity variants.
  - `is*`: e.g., `IsOpen`, `IsClosed` (used in assumptions like `hs : IsOpen s`).
- **Suffixes**:
  - `*_withinAt`, `*_at`, `*_on`, `*_const`, `*_indicator`, `*_add`, `*_sum`, `*_iSup`, `*_ciSup`, `*_comp`, `*_epigraph`.
- **Dot notation interface**:
  - Methods like `LowerSemicontinuousWithinAt.mono`, `LowerSemicontinuous.lowerSemicontinuousAt`, etc., follow Lean’s dot-notation conventions.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw` — simplification, especially with definitions and equivalences.
- `intro`, `intro h`, `intro y hy`, etc. — standard intro-style reasoning.
- `by_cases` — case analysis on membership (`x ∈ s`) or existence (`∃ l, l < f x`).
- `filter_upwards` — for working with filter-based definitions (`∀ᶠ`).
- `exact`, `refine`, `apply` — proof construction.
- `calc` — chain of inequalities/equalities.
- `isBoundedDefault` — in liminf-related arguments.
- `contrapose!` — contrapositive reasoning.
- `exists_between`, `exists_Ioc_subset_of_mem_nhds` — order-theoretic lemmas.
- `le_liminf_of_le`, `eventually_lt_of_lt_liminf` — liminf lemmas.
- `rw`, `convert`, `symm` — rewriting and equality manipulation.
- `aesop` — not explicitly used here, but `isBoundedDefault` hints at use of `aesop`-style automation.

---

### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  - Unfolding definitions (`intro y hy`, `intro x hx`, etc.).
  - Case analysis on membership (`by_cases h : x ∈ s`).
  - Using order-theoretic lemmas (e.g., `exists_between`, `exists_Ioc_subset_of_mem_nhds`) to construct neighborhoods.
  - Applying filter lemmas (`filter_upwards`, `eventually_of_forall`, `Filter.Eventually.filter_mono`).
  - Leveraging continuity assumptions (e.g., `hg (Ioi_mem_nhds hy)`).
  - Using liminf characterizations (`le_liminf_of_le`, `eventually_lt_of_lt_liminf`) in dense complete orders.
  - For composition: monotonicity + continuity → preservation of semicontinuity; antitone → flips to upper.
  - For sums: reduce to binary case via induction (`Finset.induction_on`) and use `add'` with continuity of addition.
  - For suprema: use `ciSup`/`iSup` lemmas with boundedness assumptions and monotonicity of sup.

- **Duality via `OrderDual`**: Upper semicontinuity results are often deduced from lower ones by dualizing codomain (`δᵒᵈ`), as noted in the docstring.

---

### **5. Imports**

- `Mathlib.Algebra.GroupWithZero.Indicator` — for `indicator` function.
- `Mathlib.Topology.ContinuousOn` — for continuity notions (`ContinuousAt`, `ContinuousWithinAt`, etc.).
- `Mathlib.Topology.Instances.ENNReal` — extended nonnegative reals, used in examples (e.g., infinite sums of `ℝ≥0∞`-valued functions).

---

### **Domain-Specific AI Agent Notes**

- **Scope**: Real analysis / topology / order theory.
- **Typical tasks**: Proving closure properties of semicontinuous functions, verifying semicontinuity of constructions (e.g., indicators, sums, suprema), converting between equivalent definitions.
- **Key patterns**:
  - Use `lowerSemicontinuous_iff_isOpen_preimage` to reduce to openness of level sets.
  - Use `lowerSemicontinuousWithinAt_iff_le_liminf` in dense complete linear orders.
  - Use `indicator` lemmas with `IsOpen`/`IsClosed` assumptions.
  - Use `add'`/`sum'` variants when continuity of addition is not assumed (e.g., `EReal`).
- **Common pitfalls**:
  - Forgetting boundedness assumptions in `ciSup` lemmas.
  - Confusing monotone vs antitone composition behavior.
  - Missing `OrderTopology` or `DenselyOrdered` assumptions for liminf/epigraph characterizations.

Let me know if you'd like a formalized tactic guide or a proof assistant agent prompt based on this metadata.