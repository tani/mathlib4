### Technical Brief: `MultipliableUniformlyOn.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TendstoUniformlyOn.comp_cexp` | `(hf : TendstoUniformlyOn f g p K) → (hg : BddAbove (g.re '' K)) → TendstoUniformlyOn (cexp ∘ f) (cexp ∘ g) p K` | Lifts uniform convergence through complex exponential, using bounded real part on compact sets. |
| `Summable.hasSumUniformlyOn_log_one_add` | `(hu : Summable u) → (∀ᶠ i, ∀ x ∈ K, ‖f i x‖ ≤ u i) → HasSumUniformlyOn (log ∘ (1 + ·)) (∑' i, log (1 + f i ·)) K` | Ensures uniform convergence of the series of logs `∑ log(1 + f i x)` under norm domination by a summable sequence. |
| `Summable.tendstoUniformlyOn_tsum_nat_log_one_add` | Similar to above but for sequences indexed by `ℕ`, using `Finset.range n` partial sums. | Converts cofinite-filtered uniform convergence to standard sequence convergence (`atTop`). |
| `hasProdUniformlyOn_of_clog` | `(hf : SummableUniformlyOn (log ∘ f) s) → (∀ x ∈ s, ∀ i, f i x ≠ 0) → BddAbove ((∑' i, log (f i ·)).re '' s) → HasProdUniformlyOn f (∏' i, f i ·) s` | Main result: uniform convergence of infinite product `∏ f i x` follows from uniform convergence of its complex logs, non-vanishing, and bounded real part of the log-sum. |
| `multipliableUniformlyOn_of_clog` | Same hypotheses as above | Asserts *multipliability* (i.e., existence of uniform limit of finite products) under same conditions. |
| `hasProdUniformlyOn_one_add` | `(hK : IsCompact K) → Summable u → (∀ᶠ i, ∀ x ∈ K, ‖f i x‖ ≤ u i) → ContinuousOn (f i) K → HasProdUniformlyOn (1 + f ·) (∏' i, (1 + f i ·)) K` | Core application: uniform convergence of `∏ (1 + f i x)` on compact sets under norm domination and continuity. |
| `multipliableUniformlyOn_one_add` | Same as above | Multipliability version of `hasProdUniformlyOn_one_add`. |
| `hasProdUniformlyOn_nat_one_add`, `multipliableUniformlyOn_nat_one_add` | Specializations to `ι = ℕ`. | Enables use of standard sequence convergence (`atTop`). |
| `hasProdLocallyUniformlyOn_one_add`, `multipliableLocallyUniformlyOn_one_add` | Same as above but for open sets `K`, using compact subsets. | Local uniform convergence on open sets in locally compact spaces. |
| `hasProdLocallyUniformlyOn_nat_one_add`, `multipliableLocallyUniformlyOn_nat_one_add` | `ℕ`-indexed versions of the above. | Practical for series indexed by natural numbers. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasProd*`: asserts existence of uniform limit of finite products (`HasProdUniformlyOn`).
  - `multipliable*`: asserts *multipliability* — i.e., the finite products form a Cauchy net converging uniformly (`MultipliableUniformlyOn`).
  - `hasSum*`: for series (`HasSumUniformlyOn`, `TendstoUniformlyOn_tsum`).
  - `tendstoUniformlyOn_*`: general uniform convergence statements.
- **Suffixes**:
  - `*_on_one_add`: product of the form `∏ (1 + f i x)`.
  - `*_nat_*`: for sequences indexed by `ℕ`.
  - `*_locally_*`: local uniform convergence.
- **Helper functions**:
  - `log_one_add`, `cexp`, `clog`: complex log/exp.
  - `f' : C(K, R)`: continuous functions on compact `K`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `filter_upwards` | Handles cofinite filter arguments (e.g., eventually conditions). |
| `simp only [...]` | Simplifies using precise lemmas, avoids over-simplification. |
| `rw [...]` | Rewrites using equalities (e.g., `← Nat.cofinite_eq_atTop`). |
| `exact`, `refine`, `convert` | Build proofs stepwise, often with partial application. |
| `haveI`, `letI` | Introduces instances (e.g., `CompactSpace K`, `Nonempty K`). |
| `norm_num`, `simpa`, `linarith` | Arithmetic and norm simplifications. |
| `continuousOn_iff_continuous_restrict`, `funext` | Topological/functional reasoning. |
| `mul_left`, `of_norm_bounded_eventually` | Norm-based summability manipulations. |

---

#### **4. Proof Logic**

The logical flow across most proofs follows this pattern:

1. **Reduction to known convergence**:
   - Use `hasProdUniformlyOn_iff_tendstoUniformlyOn` to reduce product convergence to convergence of finite products.
   - For logs, use `hasSumUniformlyOn_iff_tendstoUniformlyOn`.

2. **Bounding & domination**:
   - Extract a uniform bound `v` on real parts (via `BddAbove`).
   - Use `∀ᶠ i` (eventually) to control norms: `‖f i x‖ ≤ u i`, with `u` summable.

3. **Apply key lemmas**:
   - `log(1 + z)` approximates `z` for small `z`, and `‖log(1 + z)‖ ≤ 2‖z‖` when `‖z‖ ≤ 1/2`.
   - Use `cexp ∘ sum = prod ∘ exp` (via `exp_sum`, `exp_log`) to lift log convergence to product convergence.

4. **Handle technical conditions**:
   - Non-vanishing (`f i x ≠ 0`) ensures `log(f i x)` is defined.
   - Continuity + compactness → uniform control via `ContinuousMap.norm_le_of_nonempty`.

5. **Index shifting**:
   - Use `Nat.cofinite_eq_atTop` to switch between cofinite and sequential convergence.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Normed.Group.FunctionSeries` | Series of functions, uniform convergence, `tsum`, `hasSumUniformlyOn`. |
| `Mathlib.Analysis.SpecialFunctions.Log.Summable` | Properties of `log`, especially `log(1 + z)` and summability. |
| `Mathlib.Topology.Algebra.InfiniteSum.UniformOn` | Infinite sums and products in uniform/topological settings. |
| `Mathlib.Topology.Algebra.IsUniformGroup.Order` | Ordered uniform groups, used for bounding real parts. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Uniform Convergence Theory] --> B[FunctionSeries]
  A --> C[InfiniteSum.UniformOn]
  A --> D[IsUniformGroup.Order]
  B --> E[Log.Summable]
  
  E --> F[log(1 + z) estimates]
  D --> G[BddAbove & order control]
  C --> H[TendstoUniformlyOn, HasProdUniformlyOn]
  
  F --> I[hasSumUniformlyOn_log_one_add]
  G --> J[comp_cexp]
  H --> K[hasProdUniformlyOn_of_clog]
  I & J & K --> L[main product convergence results]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Theory
    A[Uniform convergence of logs] --> B[Uniform convergence of products]
    B --> C[Multipliability]
    C --> D[Applications: 1 + f i x]
    D --> E[Compact K]
    D --> F[Open K (locally compact)]
  end

  subgraph Tools
    G[Complex exponential & log]
    H[Summable domination]
    I[Non-vanishing]
    J[Continuity + compactness]
  end

  G & H & I & J --> A
```

---

#### **7. Summary**

This file formalizes a robust framework for proving **uniform convergence of infinite products** of complex-valued functions, especially of the form  
$$
x \mapsto \prod_{i} (1 + f_i(x))
$$  
or more generally  
$$
x \mapsto \prod_i f_i(x),
$$  
by reducing to convergence of logarithmic series. Key innovations include:

- A clean equivalence between product convergence and log-series convergence (via `hasProdUniformlyOn_of_clog`).
- Practical sufficient conditions for `∏ (1 + f i x)` to converge uniformly on compact sets (via norm domination by a summable sequence).
- Local uniform convergence on open sets in locally compact spaces.
- Full support for both general index types `ι` and countable sequences `ℕ`.

The formalization is highly modular, leveraging existing `Mathlib` infrastructure for uniform convergence, infinite sums, and complex analysis.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.lean`-level imports) or a proof sketch of a specific lemma.
