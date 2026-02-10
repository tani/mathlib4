### Technical Brief: `QExpansion.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `iteratedDerivWithin_cexp_aux` | `lemma` | Computes the $k$-th iterated derivative of $z \mapsto \exp(2\pi i m z / p)$ on an open set $S$; shows it equals $(2\pi i m / p)^k \cdot \exp(2\pi i m z / p)$. |
| `aux_IsBigO_mul` | `lemma` | Controls growth of polynomially bounded sequences under multiplication by powers of linear terms; used for asymptotic estimates. |
| `summableLocallyUniformlyOn_iteratedDerivWithin_smul_cexp` | `theorem` | Establishes local uniform summability of series involving iterated derivatives of exponentials weighted by polynomially bounded coefficients. |
| `summableLocallyUniformlyOn_iteratedDerivWithin_cexp` | `theorem` | Special case of above with weight $f(n)=1$, crucial for differentiability and termwise differentiation of $q$-series. |
| `iteratedDerivWithin_tsum_cexp_eq` | `lemma` | Justifies termwise differentiation of $\sum_{n=0}^\infty q^n$ on the upper half-plane $\mathbb{H}$. |
| `contDiffOn_tsum_cexp` | `lemma` | Proves smoothness (in fact, complex analyticity) of the geometric series on $\mathbb{H}$. |
| `iteratedDerivWithin_tsum_exp_aux_eq` | `lemma` | Relates derivatives of the expansion of $\pi \cot(\pi z)$ to exponential sums: key step toward the main identity. |
| `EisensteinSeries.qExpansion_identity` | `theorem` | Core identity: $\displaystyle \sum_{n \in \mathbb{Z}} \frac{1}{(z+n)^{k+1}} = \frac{(-2\pi i)^{k+1}}{k!} \sum_{n \in \mathbb{N}} n^k q^n$, where $q = e^{2\pi i z}$. |
| `EisensteinSeries.qExpansion_identity_pnat` | `theorem` | Variant of above with sum over $\mathbb{N}^+$ instead of $\mathbb{N}$. |
| `summable_eisSummand`, `summable_prod_eisSummand` | `lemmas` | Ensure absolute convergence of Eisenstein series summands and their product extensions. |
| `tsum_eisSummand_eq_tsum_sigma_mul_cexp_pow` | `lemma` | Expresses the Eisenstein series as a combination of Riemann zeta values and a $q$-series involving divisor function $\sigma_{k-1}(n)$. |
| `tsum_eisSummand_eq_riemannZeta_mul_eisensteinSeries` | `lemma` | Relates the full Eisenstein series (sum over coprime integer pairs) to $\zeta(k)$ times the normalized Eisenstein series. |
| `EisensteinSeries.q_expansion_riemannZeta` | `lemma` | First form of $q$-expansion: includes $\zeta(k)$ explicitly. |
| `eisensteinSeries_coeff_identity` | `lemma` | Converts coefficient $\frac{(-2\pi i)^k}{(k-1)! \zeta(k)}$ into $-\frac{2k}{B_k}$ using known formula $\zeta(2m) = (-1)^{m+1} \frac{(2\pi)^{2m} B_{2m}}{2(2m)!}$. |
| `EisensteinSeries.q_expansion_bernoulli` | `theorem` | Final main result: normalized Eisenstein series $E_k(z) = 1 - \frac{2k}{B_k} \sum_{n=1}^\infty \sigma_{k-1}(n) q^n$, for even $k \ge 3$. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `iteratedDerivWithin_`: derivatives within a domain (e.g., `iteratedDerivWithin_cexp_aux`)
  - `summableLocallyUniformlyOn_`: convergence properties of series of functions
  - `eisSummand_`: related to Eisenstein summands
  - `qExpansion_`: $q$-expansion related results
  - `contDiffOn_`: smoothness on subsets

- **Suffixes:**
  - `_eq`: equality lemmas (often intermediate steps)
  - `_identity`: key identities (e.g., `qExpansion_identity`)
  - `_pnat`: versions restricted to positive naturals
  - `_aux`: auxiliary technical lemmas
  - `_smul_cexp`: involving scalar multiplication with exponentials

- **Function names:**
  - `eisensteinSeries`, `eisensteinSeries_MF`, `eisensteinSeries_SIF`: different realizations of Eisenstein series
  - `riemannZeta`, `bernoulli`, `sigma`: standard arithmetic functions
  - `cexp`: complex exponential (`exp` in Lean’s complex analysis library)

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities and known lemmas (e.g., `simp only [exp_nsmul']`) |
| `ring` / `ring_nf` | Algebraic simplification in commutative rings/fields |
| `grind` | Custom tactic (likely from `Mathlib.Tactic`) for grinding through arithmetic and inequalities (e.g., `grind [Nat.factorial_succ]`) |
| `aesop` | Automated reasoning for first-order logic + arithmetic goals |
| `convert ... using n` | Allows flexible proof refinement by matching up to $n$ levels |
| `rw [← ...]` | Rewriting with reversed lemmas (e.g., converting sums over $\mathbb{Z}$ to $\mathbb{N}^+$) |
| `congr` + `ext` | Proving extensionality of functions/series |
| `gcongr` | Generalized congruence for inequalities involving norms |
| `field_simp`, `ring_nf`, `norm_cast` | Field simplifications and lifting to reals/complexes |
| `exact`, `refine`, `apply` | Standard proof construction |
| `have`, `suffices` | Introducing intermediate claims |

---

#### **4. Proof Logic**

The logical flow follows a standard structure for analytic number theory proofs:

1. **Analytic Setup**  
   - Prove convergence and differentiability of exponential series on $\mathbb{H}$ (`summableLocallyUniformlyOn_*`, `contDiffOn_tsum_cexp`).
   - Justify termwise differentiation (`iteratedDerivWithin_tsum_cexp_eq`).

2. **Fourier Expansion via Cotangent Identity**  
   - Use known expansion of $\pi \cot(\pi z)$:  
     $\pi \cot(\pi z) = \frac{1}{z} + \sum_{n \ne 0} \left( \frac{1}{z+n} - \frac{1}{n} \right)$  
   - Differentiate $k$ times to relate $\sum_{n \in \mathbb{Z}} (z+n)^{-(k+1)}$ to exponential sums.

3. **Relate to Eisenstein Series**  
   - Express Eisenstein series as sum over coprime pairs $(c,d)$, then relate to sum over all integer pairs via grouping by gcd (using `gammaSetDivGcdSigmaEquiv`).
   - Use `tsum_eisSummand_eq_riemannZeta_mul_eisensteinSeries` to factor out $\zeta(k)$.

4. **Arithmetic Simplification**  
   - Use identity:  
     $\sum_{(c,d)=1} \frac{1}{(cz+d)^k} = \zeta(k) \cdot E_k(z)$  
   - Replace $\zeta(k)$ using Bernoulli number formula for even $k$:  
     $\zeta(k) = (-1)^{k/2+1} \frac{(2\pi)^k B_k}{2 \cdot k!}$

5. **Final Form**  
   - Combine all to get:  
     $E_k(z) = 1 - \frac{2k}{B_k} \sum_{n=1}^\infty \sigma_{k-1}(n) q^n$

---

#### **5. Imports & Dependencies**

**Primary Dependencies:**
- `Mathlib.Analysis.Complex.SummableUniformlyOn`: Uniform convergence on subsets of $\mathbb{C}$
- `Mathlib.Analysis.SpecialFunctions.Trigonometric.Cotangent`: Expansion of $\pi \cot(\pi z)$
- `Mathlib.NumberTheory.LSeries.Dirichlet`, `HurwitzZetaValues`: Zeta functions and $L$-series
- `Mathlib.NumberTheory.ModularForms.EisensteinSeries.Basic`: Eisenstein series definitions
- `Mathlib.NumberTheory.TsumDivisorsAntidiagonal`: Summation over divisor lattices

**Key Libraries Used:**
- `Complex`, `ArithmeticFunction`, `ModularForm`, `EisensteinSeries`
- `UpperHalfPlane`, `ℍₒ` (notation for upper half-plane set)
- `Pointwise`, `ArithmeticFunction.sigma` (for $\sigma_k$)

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[QExpansion.lean] --> B[Mathlib.Analysis.Complex.SummableUniformlyOn]
  A --> C[Mathlib.Analysis.SpecialFunctions.Trigonometric.Cotangent]
  A --> D[Mathlib.NumberTheory.LSeries.Dirichlet]
  A --> E[Mathlib.NumberTheory.LSeries.HurwitzZetaValues]
  A --> F[Mathlib.NumberTheory.ModularForms.EisensteinSeries.Basic]
  A --> G[Mathlib.NumberTheory.TsumDivisorsAntidiagonal]

  C --> H[π cot(πz) expansion]
  D & E --> I[ζ(k) formula]
  F --> J[Eisenstein series def]
  G --> K[σ_{k−1}(n) = ∑_{d|n} d^{k−1}]

  H --> L[qExpansion_identity]
  I --> M[eisensteinSeries_coeff_identity]
  J --> N[tsum_eisSummand_eq_riemannZeta_mul_eisensteinSeries]
  K --> O[tsum_eisSummand_eq_tsum_sigma_mul_cexp_pow]

  L & N & O & M --> P[q_expansion_bernoulli]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Analysis
    A1[Convergence lemmas] --> A2[Termwise differentiation]
    A2 --> A3[ContDiffOn_tsum_cexp]
  end

  subgraph Fourier
    B1[π cot(πz) expansion] --> B2[Derivative identity]
    B2 --> B3[qExpansion_identity]
  end

  subgraph Arithmetic
    C1[σ_{k−1}] --> C2[Sum over coprime pairs]
    C2 --> C3[tsum_eisSummand_eq_tsum_sigma_mul_cexp_pow]
  end

  subgraph ModularForms
    D1[Eisenstein series def] --> D2[Factor ζ(k)]
    D2 --> D3[q_expansion_riemannZeta]
  end

  subgraph Final
    E1[ζ(k) → Bernoulli] --> E2[q_expansion_bernoulli]
  end

  A3 --> B3
  C3 --> D3
  D3 --> E2
```

---

### Summary

This file formalizes the classical $q$-expansion of the normalized Eisenstein series of weight $k \ge 3$, even, and level 1:
$$
E_k(z) = 1 - \frac{2k}{B_k} \sum_{n=1}^\infty \sigma_{k-1}(n) e^{2\pi i n z}.
$$
The proof combines:
- Complex analytic tools (uniform convergence, termwise differentiation),
- Fourier analysis (via $\pi \cot(\pi z)$),
- Number-theoretic identities (sums over divisors, zeta–Bernoulli relation),
- Modular forms machinery (Eisenstein series definitions and symmetries).

It exemplifies Lean’s strength in unifying analysis, algebra, and number theory in a single formalized development.
