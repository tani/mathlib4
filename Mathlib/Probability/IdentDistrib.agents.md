### Technical Brief: `ProbabilityTheory.IdentDistrib` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IdentDistrib f g μ ν` | `Prop` | States that `f : α → γ` and `g : β → γ` are *identically distributed* w.r.t. measures `μ`, `ν`: both are a.e. measurable, and their pushforwards (image measures) coincide. |
| `IdentDistrib.refl` | `hf : AEMeasurable f μ → IdentDistrib f f μ μ` | Reflexivity of identically distributed relation. |
| `IdentDistrib.symm` | `IdentDistrib f g μ ν → IdentDistrib g f ν μ` | Symmetry: if `f ~ g`, then `g ~ f`. |
| `IdentDistrib.trans` | `IdentDistrib f g μ ν → IdentDistrib g h ν ρ → IdentDistrib f h μ ρ` | Transitivity: chaining identically distributed pairs. |
| `IdentDistrib.comp` | `IdentDistrib f g μ ν → Measurable u → IdentDistrib (u ∘ f) (u ∘ g) μ ν` | Stability under measurable composition. |
| `IdentDistrib.measure_mem_eq` | `IdentDistrib f g μ ν → MeasurableSet s → μ(f⁻¹' s) = ν(g⁻¹' s)` | Probabilities of measurable sets agree under identically distributed variables. |
| `IdentDistrib.integral_eq` | `IdentDistrib f g μ ν → ∫ f dμ = ∫ g dν` | Integrals (expectations) agree. |
| `IdentDistrib.variance_eq` | `IdentDistrib f g μ ν → variance f μ = variance g ν` | Variances agree (requires integrability). |
| `IdentDistrib.aestronglyMeasurable_snd` | `IdentDistrib f g μ ν → AEStronglyMeasurable f μ → AEStronglyMeasurable g ν` | Strong measurability transfers from one to the other. |
| `IdentDistrib.memℒp_snd` | `IdentDistrib f g μ ν → Memℒp f p μ → Memℒp g p ν` | Membership in `ℒᵖ` spaces transfers. |
| `IdentDistrib.uniformIntegrable_of_identDistrib` | `∀ i, IdentDistrib (f i) (f j) μ μ → Memℒp (f j) p μ → UniformIntegrable f p μ` | Uniform integrability of identically distributed `ℒᵖ` families. |
| `indepFun_of_identDistrib_pair` | `IndepFun X Y μ → IdentDistrib (X, Y) (X', Y') μ μ' → IndepFun X' Y' μ'` | Independence is preserved under identically distributed pairs. |

**Dot-notation shortcuts** (e.g., `h.sq`, `h.norm`, `h.pow 3`, `h.inv`, `h.mul_const c`) are derived via `h.comp` with standard measurable operations.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `aemeasurable_`, `aestronglyMeasurable_`: for a.e. (strong) measurability conditions.
  - `memℒp_`, `eLpNorm_`, `integral_`, `variance_`, `evariance_`: for functional-analytic properties.
  - `measure_`, `ae_`, `ae_mem_`: for measure-theoretic statements.
- **Suffixes**:
  - `_fst`, `_snd`: denote which argument (first or second) a property is transferred *from* or *to*.  
    - `IdentDistrib.foo_fst`: property holds for `f` implies it holds for `g` (via `h.symm.foo_snd`).
    - `IdentDistrib.foo_snd`: property holds for `f` ⇒ property holds for `g`.
  - `_iff`: iff-characterizations (e.g., `integrable_iff`, `aestronglyMeasurable_iff`).
- **Operation-based names**:
  - `norm`, `nnnorm`, `sq`, `pow n`, `mul_const`, `div_const`, `inv`: derived via `h.comp (measurable_...)`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `rwa`: rewriting using `map_eq`, `map_eq.symm`, `integral_map`, etc.
- `simp_rw`: for rewriting under binders (e.g., `norm_toNNReal`, `Set.indicator`).
- `apply`, `exact`, `refine`: for constructing proofs stepwise.
- `congr`, `congrArg`: for equality of expressions (e.g., in `eLpNorm_eq`).
- `filter_upwards`: for almost-everywhere statements.
- `aesop`, `norm_cast`, `ring`: for simplification and algebraic manipulation.
- `rcases`, `obtain`: to unpack existential/structure proofs.
- `convert`: for equational reasoning with convertible terms (e.g., `evariance_eq`).
- `ext`: extensionality for set equality.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most lemmas follow a two-step pattern:
    1. **Transfer of structure**: Use `aemeasurable_fst`, `aemeasurable_snd`, and `map_eq` to lift measurable/measure-theoretic structure.
    2. **Apply known theorems**: Use `integral_map`, `lintegral_map'`, `essSup_eq`, etc., to equate quantities.
- **Common proof patterns**:
  - **Induction-like reasoning**: For `uniformIntegrable_of_identDistrib`, reduce to the strongly measurable case via `aes`-approximation (`hfmeas`, `g`, `hgeq`).
  - **Symmetry exploitation**: Use `h.symm` to flip direction of implications (`foo_fst` vs `foo_snd`).
  - **Composition closure**: Prove stability under operations (`norm`, `sq`, etc.) via `h.comp measurable_...`.
  - **Almost-everywhere arguments**: Use `ae_map_iff`, `Measure.map_congr`, `ae_eq_mk`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Probability.Variance`: for `variance`, `evariance`.
  - `Mathlib.MeasureTheory.Function.UniformIntegrable`: for `UniformIntegrable`.
- **Scope & assumptions**:
  - Works in general measurable spaces (`MeasurableSpace α`, etc.).
  - Often assumes:
    - `TopologicalSpace γ`, `MetrizableSpace γ`, `BorelSpace γ`, `SecondCountableTopology γ` for strong measurability equivalences.
    - `NormedAddCommGroup γ`, `NormedSpace ℝ γ`, `BorelSpace γ` for `ℒᵖ`, `integral`, `variance`.
    - `IsFiniteMeasure μ` in uniform integrability section.
- **Noncomputable section**: Required for measure-theoretic constructions (e.g., integrals over `ℝ≥0∞`).

---

### Summary

This module formalizes the foundational theory of *identically distributed random variables* in a general measure-theoretic setting. It emphasizes:
- **Equational reasoning** via pushforward measures,
- **Transfer principles** (properties of `f` ⇒ properties of `g`),
- **Stability under operations** (norm, power, multiplication, etc.),
- **Applications** to uniform integrability and independence.

The design reflects Lean’s emphasis on reusable, composable lemmas with clear naming (`_fst`, `_snd`, `comp`, `norm`, etc.), enabling efficient formalization of probabilistic arguments.