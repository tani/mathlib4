Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Probability Density Function Formalization in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasPDF` | `class HasPDF (X : Ω → E) (ℙ : Measure Ω) (μ : Measure E) : Prop` | Defines when a random variable `X` has a probability density function w.r.t. `ℙ` and `μ`: requires `AEMeasurable X ℙ`, absolute continuity `map X ℙ ≪ μ`, and existence of Lebesgue decomposition. |
| `pdf` | `def pdf (X : Ω → E) (ℙ : Measure Ω) (μ : Measure E) : E → ℝ≥0∞` | The Radon–Nikodym derivative `rnDeriv (map X ℙ) μ`, i.e., the density function when it exists. |
| `HasPDF.aemeasurable` | `[HasPDF X ℙ μ] → AEMeasurable X ℙ` | Extracts the a.e. measurable part of `HasPDF`. |
| `HasPDF.absolutelyContinuous` | `[HasPDF X ℙ μ] → map X ℙ ≪ μ` | Extracts absolute continuity. |
| `map_eq_withDensity_pdf` | `[HasPDF X ℙ μ] → map X ℙ = μ.withDensity (pdf X ℙ μ)` | Core identity: law of `X` equals `μ`-density of its pdf. |
| `integral_pdf_smul` | `[IsFiniteMeasure ℙ] [HasPDF X ℙ μ] → ∫ x, (pdf X ℙ μ x).toReal • f x ∂μ = ∫ x, f (X x) ∂ℙ` | **Law of the Unconscious Statistician (LOTUS)**: expectation of `f(X)` equals integral of `f` against the pdf. |
| `integral_mul_eq_integral` | `[IsFiniteMeasure ℙ] [HasPDF X ℙ] → ∫ x, x * (pdf X ℙ volume x).toReal = ∫ x, X x ∂ℙ` | Expectation of real RV `X` equals `∫ x * f(x) dx`. |
| `indepFun_iff_pdf_prod_eq_pdf_mul_pdf` | `[IsFiniteMeasure ℙ] [SigmaFinite μ] [SigmaFinite ν] [HasPDF (X, Y) ℙ (μ.prod ν)]` | Independence of `X, Y` iff joint pdf equals product of marginals a.e. |
| `lintegral_eq_measure_univ` | `[HasPDF X ℙ μ] → ∫⁻ x, pdf X ℙ μ x ∂μ = ℙ univ` | Normalization: total mass of pdf equals 1 (since `ℙ` is probability). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasPDF_`: properties/constructors for `HasPDF`.
  - `pdf_`: lemmas about the `pdf` function (e.g., `pdf_def`, `measurable_pdf`, `pdf.congr`).
  - `integral_`: results about integrals involving pdfs (e.g., `integral_pdf_smul`, `integral_mul_eq_integral`).
  - `setLIntegral_`: lemmas about restricted integrals (deprecated alias `set_lintegral_`).
- **Suffixes**:
  - `_iff`: characterizations via biconditionals (e.g., `hasPDF_iff`, `Real.hasPDF_iff`).
  - `_aemeasurable`: conditions involving a.e. measurability.
  - `_congr`: congruence lemmas under a.e. equality.
- **Special**:
  - `quasiMeasurePreserving_`: for pushforwards under QMP maps.
  - `indeps_`/`indepFun_`: independence-related lemmas.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp_rw`: rewriting definitions (`pdf_def`, `map_eq_withDensity_pdf`, etc.).
- `exact`, `refine`, `apply`: constructing proofs via typeclass instances and lemmas.
- `congr`: for functional extensionality (e.g., in `integral_mul_eq_integral`).
- `filter_upwards`: for almost-everywhere arguments.
- `erw`: extended rewriting (used for composition notation, e.g., `f (X x)`).
- `aesop`, `simp`, `linarith`: for routine measure-theoretic simplifications.
- `rw [← ...]` + `map_congr`, `lintegral_congr_ae`: for handling a.e. equal functions.
- `have` + `exact`: modular proof assembly.

#### **4. Proof Logic & Strategy**

- **Structure**: Most proofs follow a standard pattern:
  1. Unfold `HasPDF` or `pdf` via definitions (`rw [pdf_def]`, `rw [hasPDF_iff]`).
  2. Use known lemmas: `rnDeriv`, `withDensity`, `map`, `lintegral_map'`.
  3. Apply measure-theoretic tools: absolute continuity, Lebesgue decomposition, a.e. equality.
  4. For LOTUS-style results: reduce to known integral identities (`lintegral_rnDeriv_mul`, `integral_rnDeriv_smul`).
- **Common patterns**:
  - Proving `HasPDF` via `hasPDF_of_map_eq_withDensity`.
  - Using `map_eq_withDensity_pdf` to replace pushforward with density.
  - Leveraging `congr` lemmas (`HasPDF.congr`, `pdf.congr`) for a.e.-equivalent versions.
  - For independence: reduce to product measure equality via `indepFun_iff_map_prod_eq_prod_map_map`.

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.MeasureTheory.Decomposition.RadonNikodym`: defines `rnDeriv`, `withDensity`, `HaveLebesgueDecomposition`.
- `Mathlib.MeasureTheory.Measure.Haar.OfBasis`: used for `volume` (Lebesgue measure) on `ℝ`.
- `Mathlib.Probability.Independence.Basic`: defines `IndepFun`, product measures, independence criteria.

**Scope & Notation**:
- `Classical`, `MeasureTheory`, `NNReal`, `ENNReal`, `TopologicalSpace` opened.
- `noncomputable section`: necessary due to use of `rnDeriv` and integrals over `ℝ≥0∞`.
- Measures typically denoted `ℙ` (probability), `μ`, `ν`, `volume` (Lebesgue on `ℝ`).
- Random variables: `X, Y : Ω → E`; functions on codomain: `f, g : E → F`.

---

This summary captures the formalization’s core structure, idioms, and mathematical content, suitable for building a domain-specific AI agent for measure-theoretic probability in Lean 4.