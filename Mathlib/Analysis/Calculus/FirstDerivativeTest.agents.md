Here is the **technical metadata extraction** for the provided Lean 4 file on the **First-Derivative Test**, formatted as a structured technical brief:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isLocalMax_of_deriv_Ioo` | `{f : ℝ → ℝ} → {a b c : ℝ} → a < b → b < c → ContinuousAt f b → DifferentiableOn ℝ f (Ioo a b) → DifferentiableOn ℝ f (Ioo b c) → (∀ x ∈ Ioo a b, 0 ≤ deriv f x) → (∀ x ∈ Ioo b c, deriv f x ≤ 0) → IsLocalMax f b` | Proves local maximum under sign conditions on derivative on left/right intervals. |
| `isLocalMin_of_deriv_Ioo` | Dual of above, with derivative ≤ 0 on left and ≥ 0 on right. | Proves local minimum under sign conditions on derivative. |
| `isLocalMax_of_deriv'` | Uses filters (`𝓝[<]`, `𝓝[>]`) to express derivative sign conditions asymptotically near `b`. | Filter-based version of max test; more general (avoids explicit interval endpoints). |
| `isLocalMin_of_deriv'` | Dual of `isLocalMax_of_deriv'`. | Filter-based version of min test. |
| `isLocalMax_of_deriv` | Uses neighborhood `𝓝[≠] b` for differentiability and one-sided filters for derivative signs. | Most general and commonly used form of the first-derivative test for maxima. |
| `isLocalMin_of_deriv` | Dual of `isLocalMax_of_deriv`. | Most general form for minima. |

> All theorems rely on `ContinuousAt`, `DifferentiableOn`, `deriv`, and order-theoretic monotonicity/antitonicity results like `monotoneOn_of_deriv_nonneg` and `antitoneOn_of_deriv_nonpos`.

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `isLocalMax_`, `isLocalMin_`: Indicates the type of extremum.
  - `deriv_`: Indicates dependence on derivative behavior.
  - `Ioo`, `Ioc`, `Ico`: Interval notation (`Ioo = open-open`, `Ioc = open-closed`, etc.), used in interval-based versions.
- **Suffixes**:
  - `'` (prime): Used for filter-based formulations (`isLocalMax_of_deriv'`).
  - No suffix: Standard interval-based version (`isLocalMax_of_deriv_Ioo`).
- **Helper lemmas**:
  - `neg_neg`, `deriv.neg`: Used to transfer minima results from maxima via negation.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `have`: To introduce intermediate facts.
- `exact`: To conclude with a matching hypothesis.
- `by simp_all`: Simplifies using local hypotheses and known lemmas.
- `by tauto`: For trivial logical implications (e.g., filter inclusion).
- `obtain ⟨a, ha⟩`: To extract witnesses from existential/universal quantifiers (via `eventually_iff.mp`).
- `neg`: To apply properties of negation (e.g., `deriv.neg`, `neg_neg`).
- `union_continuousAt`, `Ioo_union_right`, `Ioo_union_left`: To glue continuity on adjacent intervals.

---

### 🔹 **Proof Logic**

- **Structure**:
  1. **Interval-based proofs** (`Ioo` versions):
     - Use continuity on union of intervals (`Ioc`, `Ico`) via `Ioo_union_*`.
     - Apply `monotoneOn_of_deriv_nonneg` / `antitoneOn_of_deriv_nonpos` to get monotonicity.
     - Conclude extremum via `isLocalMax_of_mono_anti`.
  2. **Filter-based proofs** (`deriv'` versions):
     - Use basis lemmas (`nhdsLT_basis`, `nhdsGT_basis`) to extract intervals from filter conditions.
     - Reduce to interval-based version via `isLocalMax_of_deriv_Ioo`.
  3. **General versions** (`deriv`):
     - Use inclusion of filters (`nhdsLT_le_nhdsNE`, `nhdsGT_le_nhdsNE`) to weaken differentiability assumptions.
     - Reduce to `deriv'` versions.

- **Symmetry**: Minima results are derived from maxima via function negation (`f ↦ -f`), using `deriv.neg` and `neg_neg`.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.MeanValue` | Provides `monotoneOn_of_deriv_nonneg`, `antitoneOn_of_deriv_nonpos`, and related calculus lemmas. |
| `Mathlib.Topology.Order.OrderClosedExtr` | Supplies `isLocalMax_of_mono_anti`, linking monotonicity to extremum properties. |
| `Set`, `Topology` (via `open Set Topology`) | Provides interval types (`Ioo`, `Ioc`, `Ico`), continuity, and filter machinery. |

---

Let me know if you'd like a **diagram of dependencies**, **proof sketch in natural language**, or **formalization recommendations** for extending this to higher dimensions or Banach spaces.