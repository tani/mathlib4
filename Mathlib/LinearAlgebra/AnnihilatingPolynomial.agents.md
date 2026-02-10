### Technical Metadata Brief: `Polynomial.annIdeal` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `annIdeal` | `annIdeal (a : A) : Ideal R[X]` | Defines the ideal of polynomials over `R` that annihilate `a ∈ A` under evaluation: `ker(aeval a)`. |
| `mem_annIdeal_iff_aeval_eq_zero` | `p ∈ annIdeal R a ↔ aeval a p = 0` | Characterizes membership in the annihilating ideal via evaluation. |
| `annIdealGenerator` | `annIdealGenerator (a : A) : 𝕜[X]` | Monic generator of `annIdeal 𝕜 a` (when `𝕜` is a field); zero if ideal is trivial. |
| `span_singleton_annIdealGenerator` | `Ideal.span {annIdealGenerator 𝕜 a} = annIdeal 𝕜 a` | Shows `annIdealGenerator` generates the annihilating ideal. |
| `annIdealGenerator_mem` | `annIdealGenerator 𝕜 a ∈ annIdeal 𝕜 a` | Confirms the generator lies in its own ideal. |
| `mem_iff_eq_smul_annIdealGenerator` | `p ∈ annIdeal 𝕜 a ↔ ∃ s, p = s • annIdealGenerator 𝕜 a` | Membership ⇔ divisibility by generator (since PID). |
| `monic_annIdealGenerator` | `hg ≠ 0 ⇒ Monic(annIdealGenerator 𝕜 a)` | Nonzero generator is monic. |
| `annIdealGenerator_aeval_eq_zero` | `aeval a (annIdealGenerator 𝕜 a) = 0` | Generator annihilates `a`. |
| `mem_iff_annIdealGenerator_dvd` | `p ∈ annIdeal 𝕜 a ↔ annIdealGenerator 𝕜 a ∣ p` | Membership ⇔ divisibility by generator. |
| `degree_annIdealGenerator_le_of_mem` | `p ∈ annIdeal ⇒ deg(gen) ≤ deg(p)` for `p ≠ 0` | Minimality of degree among nonzero annihilators. |
| `annIdealGenerator_eq_minpoly` | `annIdealGenerator 𝕜 a = minpoly 𝕜 a` | Main result: generator = minimal polynomial. |
| `monic_generator_eq_minpoly` | Uniqueness: any monic generator = `minpoly`. |
| `span_minpoly_eq_annihilator` | `Ideal.span {minpoly f} = Module.annihilator f` | Special case for endomorphisms: connects minimal polynomial to module annihilator. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `annIdeal*`: for the annihilating ideal and its generator.
  - `mem_*`: for membership equivalences (`mem_annIdeal_iff_aeval_eq_zero`, `mem_iff_eq_smul_*`, `mem_iff_annIdealGenerator_dvd`).
  - `*_eq_zero_iff`: for characterizations of when something is zero (`annIdealGenerator_eq_zero_iff`).
- **Suffixes**:
  - `_iff_*`: logical equivalences.
  - `_le_of_mem`: degree minimality lemmas.
  - `_eq_minpoly`: identification with minimal polynomial.
- **Functional style**:
  - `annIdealGenerator` (not `ann_ideal_gen` or similar) — uses camelCase, consistent with Mathlib naming.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw` / `simp only`: for rewriting using definitional equivalences.
- `rw`: for rewriting using lemmas (e.g., `← Ideal.mem_span_singleton`).
- `by_cases`: to split on equality to zero (common for PID/field cases).
- `apply`, `exact`, `refine`: for constructing proofs term-by-term.
- `apply ... .mpr` / `.mp`: for direction-specific use of `iff`.
- `ext`: extensionality for ideal equality.
- `rwa`, `rw [...] at *`: for rewriting in hypotheses.
- `apply ... .not.mpr`: for contrapositive reasoning (e.g., nonzero leading coefficient).
- `ring` / `aesop`: likely used implicitly in algebraic simplifications (not explicit here, but standard in such contexts).

---

#### **4. Proof Logic Flow**

- **Structure**:
  1. Define `annIdeal` as kernel of `aeval`.
  2. Prove basic membership equivalence.
  3. In field case (`𝕜`), use PID structure to define `annIdealGenerator` as monic generator.
  4. Prove key properties:
     - Generator is in ideal.
     - Ideal = span of generator.
     - Generator is monic if nonzero.
     - Divisibility ⇔ membership.
     - Minimal degree.
  5. **Main theorem**: Show generator = minimal polynomial via `minpoly.unique`, using:
     - Monicity of generator.
     - Annihilation (`aeval = 0`).
     - Minimality of degree (via divisibility).
  6. Derive corollaries: uniqueness of monic generator, equivalence with module annihilator.

- **Common pattern**:
  - Case split on `annIdealGenerator = 0`.
  - Use `minpoly.unique` with three conditions: monic, annihilates, minimal degree.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.FieldTheory.Minpoly.Field`: minimal polynomial theory over fields.
  - `Mathlib.RingTheory.PrincipalIdealDomain`: PID structure of `𝕜[X]`.
  - `Mathlib.Algebra.Polynomial.Module.AEval`: evaluation of polynomials in algebras.

- **Scope**:
  - General setting: `R` commutative semiring, `A` an `R`-algebra.
  - Specialized to field case: `𝕜` field, `A` a `𝕜`-algebra.
  - Further specialization: `A = End_𝕜(M)` or matrix algebra.

- **Mathlib module**: Part of `Polynomial` namespace, under `FieldTheory` and `RingTheory` interplay.

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `minpoly` ecosystem.