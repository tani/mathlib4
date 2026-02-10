Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Inseparable Points in Topological Spaces**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Specializes x y` (notation: `x ⤳ y`) | `Prop` | `x ⤳ y` iff `𝓝 x ≤ 𝓝 y`, i.e., every neighborhood of `x` is a neighborhood of `y`. |
| `Inseparable x y` (notation: `x ~ᵢ y`) | `Prop` | `x ~ᵢ y` iff `𝓝 x = 𝓝 y`. Equivalently, `x ⤳ y ∧ y ⤳ x`. |
| `InseparableSetoid X` | `Setoid X` | The equivalence relation `~ᵢ` on `X`, used to form the separation quotient. |
| `SeparationQuotient X` | `Type*` | Quotient `X / ~ᵢ`, equipped with the quotient topology. |
| `mk : X → SeparationQuotient X` | `X → SeparationQuotient X` | Canonical projection map (quotient map). |
| `specializes_TFAE x y` | `TFAE [...]` | Equivalence of 7 characterizations of `x ⤳ y`, including via open/closed sets, closure, and cluster points. |
| `inseparable_def` | `x ~ᵢ y ↔ 𝓝 x = 𝓝 y` | Definition of inseparability. |
| `inseparable_iff_specializes_and` | `x ~ᵢ y ↔ x ⤳ y ∧ y ⤳ x` | Inseparability as mutual specialization. |
| `mk_eq_mk` | `mk x = mk y ↔ x ~ᵢ y` | Characterization of equality in the quotient. |
| `isInducing_mk` | `IsInducing mk` | The quotient map is an inducing embedding (i.e., initial topology w.r.t. itself). |
| `isOpenMap_mk`, `isClosedMap_mk` | `IsOpenMap mk`, `IsClosedMap mk` | The quotient map is both open and closed. |
| `stableUnderSpecialization s` | `Prop` | `s` is lower-closed under `⤳`: `x ∈ s ∧ x ⤳ y ⇒ y ∈ s`. |
| `stableUnderGeneralization s` | `Prop` | `s` is upper-closed under `⤳`: `y ⤳ x ∧ x ∈ s ⇒ y ∈ s`. |
| `SpecializingMap f` | `Prop` | `f` lifts specializations: `f x' ⤳ y ⇒ ∃ x, x' ⤳ x ∧ f x = y`. |
| `GeneralizingMap f` | `Prop` | `f` lifts generalizations: `y ⤳ f x' ⇒ ∃ x, x ⤳ x' ∧ f x = y`. |

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `specializes_`: for lemmas about `⤳`.
  - `inseparable_`: for lemmas about `~ᵢ`.
  - `stableUnderSpecialization` / `stableUnderGeneralization`: for closure properties under `⤳`.
  - `specializingMap` / `generalizingMap`: for maps preserving/reflecting specialization structure.
  - `mk`: for the quotient projection.
  - `lift` / `lift₂`: for universal properties of the quotient.
- **Suffixes**:
  - `_iff`: equivalence with a standard form.
  - `__iff_*`: characterizations via open/closed sets, closure, etc.
  - `_closure`, `_open`, `_closed`: specialized versions for closure/open/closed sets.

#### **3. Tactic Stack**

- **Core tactics**:
  - `tfae_have`, `tfae_finish`: for proving equivalence of multiple conditions.
  - `simp`, `rw`, `exact`, `intro`, `cases`, `refine`, `apply`, `assumption`.
  - `push_neg`: for negating universal statements.
  - `ext`, `funext`: extensionality for sets/functions.
  - `subset_antisymm`, `le_antisymm`: equality via double inclusion/order.
  - `isQuotientMap_quot_mk`, `continuous_quot_mk`, `isOpen_preimage`, `preimage_image_mk_*`: topology-specific lemmas.
  - `rwa`, `conv_rhs`, `simp only`, `convert`, `change`, `swap`, `by_cases`.

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Equivalence chains**: Many theorems use `tfae_have`/`tfae_finish` to prove multiple equivalent conditions (e.g., `specializes_TFAE`).
  - **Logical equivalences**: `inseparable_iff_*` lemmas often reduce to `specializes_iff_*` + `le_antisymm`.
  - **Continuity arguments**: Use `continuous_iff_le_induced`, `continuousAt`, `tendsto_lift_nhds_mk`, etc.
  - **Quotient lifting**: Prove properties of `lift f hf` by reducing to `f` via `lift_mk`, `tendsto_lift_nhds_mk`, etc.
  - **Set-theoretic closure**: Stability under `⤳` ↔ lower/upper sets ↔ unions of closed sets / intersections of open sets.
  - **Inductive/structural reasoning**: For `SpecializingMap`, `GeneralizingMap`, use `Relation.Fibration` and image/closure properties.

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Tactic.TFAE`: for multi-way equivalence proofs.
  - `Mathlib.Topology.ContinuousOn`: continuity and neighborhoods.
  - `Mathlib.Topology.Maps.OpenQuotient`: quotient topology and maps.
  - `Mathlib.Order.UpperLower.Basic`: lower/upper sets, stability under specialization.

- **Domain scope**:
  - Topological spaces, specialization preorders, separation axioms (via quotient).
  - Neighborhood filters, closures, interiors, boundaries.
  - Monotonicity, continuity, openness, closedness of maps.
  - Product and pi-topologies.
  - Subtypes, quotients, lifting properties.

---

Let me know if you'd like a dependency graph, a summary of the separation axioms formalized, or a mapping to standard topology terminology (e.g., Kolmogorov/T₀ quotient).