### Technical Metadata Brief: Probability Theory Notations in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name / Notation | Type / Definition | Purpose |
|----------------|-------------------|---------|
| `𝔼[X | m]` | `MeasureTheory.condexp m MeasureSpace.volume X` | Conditional expectation of `X` w.r.t. σ-algebra `m` and the volume measure. |
| `P[X]` | `∫ x, X x ∂P` | Expectation of `X` under measure `P`. Implemented as a macro. |
| `𝔼[X]` | `∫ a, (X : _ → _) a` | Unconditional expectation (integration w.r.t. volume measure). |
| `P⟦s | m⟧` | `MeasureTheory.condexp m P (Set.indicator s fun ω => (1 : ℝ))` | Conditional probability of set `s` given σ-algebra `m`, under measure `P`. |
| `X =ₐₛ Y` | `X =ᵐ[MeasureSpace.volume] Y` | Almost sure equality (w.r.t. volume measure). |
| `X ≤ₐₛ Y` | `X ≤ᵐ[MeasureSpace.volume] Y` | Almost sure inequality (w.r.t. volume measure). |
| `∂P/∂Q` | `MeasureTheory.Measure.rnDeriv P Q` | Radon–Nikodym derivative of `P` w.r.t. `Q`. Applies to `Measure`, `SignedMeasure`, and `ComplexMeasure`. |
| `ℙ` | `MeasureSpace.volume` | Standard probability measure (volume) on the measurable space. |

> **Note**: `P[X]` is implemented as a *macro* (not a notation), allowing flexible parsing but potentially conflicting with list indexing (`l[i]`) if typeclass inference fails.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `condexp` → conditional expectation (`condexp m P f`)
  - `indicator` → used for set-indicator functions (`Set.indicator s f`)
  - `rnDeriv` → Radon–Nikodym derivative
  - `volume` → default measure (often Lebesgue or counting measure on the space)
  - `≤ₐₛ`, `=ₐₛ` → *almost surely* suffix (`ₐₛ` = `a.s.` in Unicode)
  - `⟦…⟧` → double-bracket notation for conditional probability (analogous to logic/probability literature)

- **Scope Tags**:
  - All notations/macros are scoped under `ProbabilityTheory`, requiring `open scoped ProbabilityTheory` or `open ProbabilityTheory`.

---

#### **3. Tactic Stack**

While this file is *notation-only* (no proofs), the surrounding ecosystem (e.g., `MeasureTheory.Function.ConditionalExpectation.Basic`) uses:

- `simp` / `simp_rw` — for rewriting conditional expectations and integrals.
- `aesop` — for automated measure-theoretic reasoning (e.g., measurability, integrability).
- `ring` / `norm_num` — for simplifying real-valued expressions.
- `rw [condexp]` — to unfold conditional expectation definitions.
- `change` / `convert` — when adjusting measurable space structures (`m ≤ m0`).

---

#### **4. Proof Logic (Inferred from Dependencies)**

The file builds on foundational measure-theoretic infrastructure:

- **Induction / Cases**: Not used here, but in related files (e.g., `ConditionalExpectation.Basic`), proofs often proceed by:
  - Approximating functions by simple functions,
  - Using monotone class theorems,
  - Leveraging `ae_eq_of_integral_eq` or uniqueness of conditional expectation.
- **Measure-theoretic reasoning** relies heavily on:
  - `MeasurableSet`, `MeasurableSpace`, `MeasureSpace` typeclasses,
  - `h : m ≤ m0` for measurable space refinement,
  - `rnDeriv` properties (e.g., chain rule, change of measure).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.MeasureTheory.Function.ConditionalExpectation.Basic` | Provides `condexp`, basic properties of conditional expectation, and `P[X|m]`. |
| `Mathlib.MeasureTheory.Decomposition.Lebesgue` | Supplies Lebesgue decomposition, Radon–Nikodym theorems, and `rnDeriv`. |

> These imports indicate the module assumes a rich measure-theoretic background, including absolute continuity, decomposition, and integration theory.

---

### Summary

This file is a **notation layer** for probability theory in Lean, enabling concise expression of expectations, conditional expectations, probabilities, and Radon–Nikodym derivatives. It leverages existing infrastructure in `Mathlib.MeasureTheory`, especially around conditional expectation and measure derivatives. The design prioritizes readability and alignment with standard probability notation, while carefully scoping to avoid conflicts (e.g., with list indexing).