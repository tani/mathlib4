### Technical Brief: `Kolmogorov.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsKolmogorovProcess` | `structure` | Captures the **Kolmogorov condition**: measurability of pairs `(X s, X t)` and integrability bound `∫⁻ edist(X s, X t)^p ≤ M * edist(s,t)^q` for `p, q > 0`. |
| `IsAEKolmogorovProcess` | `def` | A process is an **a.e. modification** of a Kolmogorov process: ∃ `Y` s.t. `Y` satisfies `IsKolmogorovProcess` and `X t =ᵐ[P] Y t` ∀ `t`. |
| `IsKolmogorovProcess.mk_of_secondCountableTopology` | `lemma` | In a second-countable space `E`, it suffices to assume each `X s` is measurable and the Kolmogorov inequality holds — the pair measurability follows. |
| `IsAEKolmogorovProcess.mk` | `noncomputable def` | Constructs a representative `Y` (the "Kolmogorov version") of an `IsAEKolmogorovProcess` process `X`. |
| `kolmogorovCondition` (for `IsAEKolmogorovProcess`) | `lemma` | Shows the Kolmogorov inequality holds for `X` itself (not just its modification `Y`), using a.e.-equality. |
| `edist_eq_zero` (for `IsAEKolmogorovProcess`) | `lemma` | If `edist(s,t) = 0`, then `edist(X s, X t) = 0` almost surely — i.e., the process is "constant along zero-distance indices". |
| `stronglyMeasurable_edist`, `measurable_edist` | `lemma`s | Measurability properties of the distance function `ω ↦ edist(X s ω, X t ω)`. |
| `aestronglyMeasurable_edist`, `aemeasurable_edist` | `lemma`s | A.e. versions of the above for `IsAEKolmogorovProcess`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: for properties (`IsKolmogorovProcess`, `IsAEKolmogorovProcess`)
  - `ae_`: for "almost everywhere" variants (`aemeasurable`, `aestronglyMeasurable`)
  - `mk_`: for construction lemmas/defs (`mk`, `mk_of_secondCountableTopology`)
- **Suffixes**:
  - `_condition`: for conditions (`kolmogorovCondition`)
  - `_edist`: for lemmas involving `edist`
  - `_zero`: for zero-distance cases (`edist_eq_zero`, `edist_eq_zero_of_const_eq_zero`)
- **Structure fields**:
  - `measurablePair`, `kolmogorovCondition`, `p_pos`, `q_pos`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `filter_upwards` | To combine almost-everywhere equalities (e.g., `hω₁`, `hω₂`) and deduce properties a.e. |
| `simp_rw` | To rewrite using definitional equalities (e.g., `hω₁`, `hω₂`) |
| `convert ... using 1` | To match goals up to definitional equality (e.g., in `kolmogorovCondition`) |
| `borelize` | To convert Borel sigma-algebra goals into measurable space equalities |
| `fun_prop` | To prove measurability of functions built from measurable components |
| `lintegral_congr_ae`, `lintegral_eq_zero_iff'` | For reasoning about non-negative integrals and a.e. equality |
| `simp`, `by simp` | For trivial simplifications (e.g., `hp_pos`, `hq_pos` in `edist_eq_zero`) |
| `rwa`, `rw` | Rewriting with equivalences (e.g., `Prod.borelSpace.measurable_eq`) |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction/Case analysis** is *not* used here — this is measure-theoretic, not inductive.
  - **Main logical flow**:
    1. **Measurability**: Show `ω ↦ (X s ω, X t ω)` is measurable (via `fun_prop`, `borelize`, or `measurablePair`).
    2. **Integrability bound**: Use the hypothesis `kolmogorovCondition` directly or via a.e.-equality (`kolmogorovCondition` lemma for `IsAEKolmogorovProcess`).
    3. **A.e. equality reasoning**: Use `filter_upwards` on multiple `=ᵐ[P]` facts to deduce properties of `X` from its modification `Y`.
    4. **Zero-distance implications**: Combine `kolmogorovCondition` with `lintegral_eq_zero_iff'` to deduce `edist(X s, X t) = 0` a.e. when `edist(s,t) = 0`.

- **Key pattern**:
  > *Prove a property for the modification `Y = h.mk X`, then lift it to `X` using `X t =ᵐ[P] Y t` and `filter_upwards`.*

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.MeasureTheory.Function.SpecialFunctions.Basic` | Basic facts about measurable functions, e.g., `edist` continuity/measurability |
| `Mathlib.MeasureTheory.Function.StronglyMeasurable.AEStronglyMeasurable` | Tools for `StronglyMeasurable`, `AEStronglyMeasurable`, `AEMeasurable` |
| `Mathlib.MeasureTheory.Integral.Lebesgue.Basic` | Definitions and lemmas for `lintegral`, `∫⁻`, and a.e. equality |

**Domain**: *Stochastic processes*, *measure theory*, *metric geometry*, *measurable selection*.

---

#### **8. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[Kolmogorov.lean] --> B[Mathlib.MeasureTheory.Function.SpecialFunctions.Basic]
  A --> C[Mathlib.MeasureTheory.Function.StronglyMeasurable.AEStronglyMeasurable]
  A --> D[Mathlib.MeasureTheory.Integral.Lebesgue.Basic]

  B --> E[edist continuity, measurability]
  C --> F[AEStronglyMeasurable, AEMeasurable]
  D --> G[lintegral, a.e. equality, monotone convergence]

  A --> H[Kolmogorov-Chentsov theorem (future)]
```

##### **Overview of Theory Flow**

```mermaid
flowchart LR
  A[Stochastic Process X : T → Ω → E] --> B{Is X a Kolmogorov process?}
  B -->|Yes| C[IsKolmogorovProcess X]
  B -->|No, but X ~ Y a.e.| D[IsAEKolmogorovProcess X]
  C --> E[Measurable pairs, integrability bound]
  D --> F[Exists Y with IsKolmogorovProcess Y, X t =ᵐ[P] Y t]
  E & F --> G[Apply Kolmogorov-Chentsov: continuous modification exists]
```

##### **Structure of `IsKolmogorovProcess`**

```mermaid
flowchart LR
  A[IsKolmogorovProcess X P p q M] --> B[measurablePair]
  A --> C[kolmogorovCondition]
  A --> D[p_pos]
  A --> E[q_pos]

  B --> F[(X s, X t) measurable]
  C --> G[∫⁻ edist^p ≤ M·edist^q]
  D --> H[p > 0]
  E --> I[q > 0]
```

---

#### **Summary**

This module formalizes the **Kolmogorov condition** for stochastic processes in Lean 4, enabling future development of the **Kolmogorov–Chentsov continuity theorem**. It distinguishes between *strict* (`IsKolmogorovProcess`) and *almost-everywhere* (`IsAEKolmogorovProcess`) versions, and provides tools to reason about measurability, integrability, and zero-distance behavior. The proofs rely heavily on measure-theoretic a.e.-equality reasoning and properties of the extended distance function `edist`.
