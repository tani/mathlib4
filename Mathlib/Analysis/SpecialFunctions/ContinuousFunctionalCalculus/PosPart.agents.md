### Technical Metadata Brief: Positive/Negative Parts in Nonunital C*-Algebras (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `posPart` | `NoncomputableInstance (posPart : A → A)` | Defines the *positive part* `a⁺` of an element `a : A` via nonunital continuous functional calculus: `a⁺ = cfcₙ (·⁺) a`. |
| `negPart` | `NoncomputableInstance (negPart : A → A)` | Defines the *negative part* `a⁻` via `a⁻ = cfcₙ (·⁻) a`. |
| `posPart_def`, `negPart_def` | `a⁺ = cfcₙ (·⁺) a`, `a⁻ = cfcₙ (·⁻) a` | Definitional lemmas for `posPart`/`negPart`. |
| `posPart_mul_negPart`, `negPart_mul_posPart` | `a⁺ * a⁻ = 0`, `a⁻ * a⁺ = 0` | Orthogonality of positive and negative parts. |
| `posPart_sub_negPart` | `a⁺ - a⁻ = a` (for `IsSelfAdjoint a`) | Fundamental decomposition of selfadjoint elements. |
| `posPart_neg`, `negPart_neg` | `(-a)⁺ = a⁻`, `(-a)⁻ = a⁺` | Behavior under negation. |
| `posPart_smul`, `negPart_smul` | `(r • a)⁺ = r • a⁺`, `(r • a)⁻ = r • a⁻` for `r ≥ 0` | Compatibility with nonnegative scalar multiplication. |
| `posPart_smul_of_nonneg`, `posPart_smul_of_nonpos`, etc. | Extended scalar behavior for arbitrary real scalars | Handles sign-sensitive scaling. |
| `posPart_nonneg`, `negPart_nonneg` | `0 ≤ a⁺`, `0 ≤ a⁻` | Positivity of parts. |
| `posPart_eq_self` | `a⁺ = a ↔ 0 ≤ a` | Characterization of nonnegative elements via their positive part. |
| `negPart_eq_zero_iff` | `a⁻ = 0 ↔ 0 ≤ a` | Vanishing of negative part iff nonnegative. |
| `negPart_eq_neg` | `a⁻ = -a ↔ a ≤ 0` | Characterization of nonpositive elements. |
| `posPart_eq_zero_iff` | `a⁺ = 0 ↔ a ≤ 0` | Vanishing of positive part iff nonpositive. |
| `posPart_negPart_unique` | `a = b - c ∧ b * c = 0 ∧ 0 ≤ b ∧ 0 ≤ c ⇒ a⁺ = b ∧ a⁻ = c` | **Uniqueness**: the positive/negative parts are the *only* such decomposition. |
| `CStarAlgebra.linear_combination_nonneg` | `ℜ a⁺ - ℜ a⁻ + i(ℑ a⁺ - ℑ a⁻) = a` | Expresses any element as complex linear combination of nonnegative elements. |
| `CStarAlgebra.span_nonneg` | `Submodule.span ℂ {a | 0 ≤ a} = ⊤` | **Spanning theorem**: nonnegative elements span the algebra over ℂ. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `posPart_`, `negPart_`: for properties of positive/negative parts.
  - `smul_`: for scalar multiplication interactions.
  - `eq_`, `_iff`: for equivalence characterizations (e.g., `posPart_eq_self`, `negPart_eq_zero_iff`).
- **Suffixes**:
  - `_def`: definitional lemmas.
  - `_zero`: behavior at zero.
  - `_neg`: behavior under negation.
  - `_of_nonneg`, `_of_nonpos`: conditional variants for sign-restricted scalars.
- **Function names**:
  - `·⁺`, `·⁻`: standard notation for positive/negative part functions on ℝ.
  - `cfcₙ`: nonunital continuous functional calculus operator.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `cfc_tac` | Custom tactic (likely for discharging `IsSelfAdjoint` goals in functional calculus contexts). |
| `aesop` | Automated reasoning for order, positivity, and algebraic goals (e.g., `posPart_nonneg`). |
| `simp` / `simp only` | Simplification using definitional lemmas and `@[simp]` lemmas. |
| `rw` / `conv_rhs` | Rewriting using equalities (especially `posPart_sub_negPart`, `cfcₙ_congr`). |
| `congr!` / `congr` | Congruence reasoning for functional calculus (`cfcₙ_congr`). |
| `by_cases` | Splitting on `IsSelfAdjoint a` (common in proofs involving `cfcₙ`). |
| `have` / `obtain` / `rintro` | Introducing intermediate facts or decomposing hypotheses. |
| `refine` / `exact` | Constructing proofs via partial goals or direct application. |
| `lift x to σₙ ℝ _ using hx` | Working with elements of spectra via subtype lifting. |
| `calc` | Chain-of-equalities reasoning (especially in `posPart_negPart_unique`). |

---

#### **4. Proof Logic & Strategy**

- **Core strategy**: Leverage the **nonunital continuous functional calculus** (`cfcₙ`) to reduce algebraic/order-theoretic properties to pointwise properties on ℝ.
- **Typical flow**:
  1. **Case split** on `IsSelfAdjoint a` (since `cfcₙ` is only defined for selfadjoint elements).
  2. Use `cfcₙ_congr` to reduce to verifying identities on spectra (e.g., `x⁺ * x⁻ = 0` on ℝ).
  3. Apply real analysis facts (e.g., `le_total x 0`, `x⁺ - x⁻ = x`).
  4. For uniqueness (`posPart_negPart_unique`):
     - Construct a *unified spectrum* `s = σ(a) ∪ σ(b) ∪ σ(-c)`.
     - Define two star homomorphisms: `f ↦ cfcₙ f a` and `f ↦ cfcₙ f b + cfcₙ f (-c)`.
     - Show they agree on `id`, hence equal by uniqueness of functional calculus.
     - Evaluate at `f = ·⁺` to conclude `b = a⁺`, `c = a⁻`.
- **Inductive/structural reasoning**: Rare; mostly algebraic + functional calculus + order theory.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Topology.ContinuousMap.StarOrdered` | Star-ordered topological algebras, `C(X)`-style positivity. |
| `Mathlib.Analysis.InnerProductSpace.Basic` | Preliminary analysis (likely for C*-algebra context). |
| `Mathlib.Topology.ContinuousMap.StoneWeierstrass` | Stone–Weierstrass for functional calculus foundations. |
| `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.NonUnital` | **Core dependency**: nonunital continuous functional calculus (`cfcₙ`, `IsSelfAdjoint`, `NonUnitalContinuousFunctionalCalculus`). |

**Domain**:  
- **Nonunital C*-algebras** over ℝ (with star, topology, scalar multiplication).
- Extended to **unital** case via `UniqueNonUnitalContinuousFunctionalCalculus` + `ContinuousFunctionalCalculus`.
- Includes **star-ordered** and **spanning-by-nonnegatives** results.

---

#### **6. Notable Design Choices**

- **Noncomputability**: `posPart`, `negPart` are `noncomputable` (functional calculus is nonconstructive).
- **Uniqueness assumption**: Many lemmas assume `[UniqueNonUnitalContinuousFunctionalCalculus ℝ A]` to ensure functional calculus is well-defined and rigid.
- **Order-theoretic interface**: Uses `PartialOrder A`, `StarOrderedRing A`, and `NonnegSpectrumClass` to connect spectral theory with order.
- **Spanning lemma**: `span_nonneg` is a structural result—nonnegative elements generate the algebra as a ℂ-module.

---

This metadata captures the formalization’s mathematical essence, proof methodology, and Lean-specific conventions—ideal for training a domain-specific AI agent in functional analysis or C*-algebra formalization.