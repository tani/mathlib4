**Technical Brief: Krull Dimension of Polynomial Rings (Lean 4)**  
*Based on `Polynomial.lean` (2025, Apache 2.0)*

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ringKrullDim` | `CommRing R → WithBot ℕ` | Returns Krull dimension of a commutative ring, extended with `⊥` for non-Noetherian pathologies. |
| `Polynomial.ringKrullDim_le` | `ringKrullDim R[X] ≤ 2 * ringKrullDim R + 1` | General upper bound for polynomial ring over *any* commutative ring. |
| `Polynomial.height_eq_height_add_one_of_isMaximal` | `p.IsMaximal → P.IsMaximal → P.LiesOver p → P.height = p.height + 1` | Height jump for maximal ideals lying over maximal ideals. |
| `Polynomial.height_eq_height_add_one` | `p.IsPrime → P.IsMaximal → P.LiesOver p → P.height = p.height + 1` | General height jump for prime ideals under maximal extensions (uses localization + going-down). |
| `Polynomial.height_map_C` | `p.IsMaximal → (p.map C).height = p.height` | Height preserved under extension to constant polynomials (for maximal ideals). |
| `Polynomial.ringKrullDim_of_isNoetherianRing` | `ringKrullDim R[X] = ringKrullDim R + 1` | Exact formula for Noetherian base rings. |
| `MvPolynomial.ringKrullDim_of_isNoetherianRing` | `ringKrullDim R[X₁,…,Xₙ] = ringKrullDim R + n` | Multivariate extension via induction on number of variables. |

---

### 2. NAMING CONVENTIONS

- **`height_` prefix**: Used for ideal height lemmas (`height_eq_height_add_one`, `height_map_C`, `height_map_of_disjoint`).
- **`ringKrullDim_` prefix**: For Krull dimension equalities/inequalities (`ringKrullDim_le`, `ringKrullDim_of_isNoetherianRing`).
- **`map` / `comap`**: Standard notation for ideal extension and contraction under ring maps.
- **`LiesOver`**: Predicate for lying-over relation between ideals in extension rings.
- **`IsLocalization` / `Localization.AtPrime`**: Localizing at prime ideals; key for going-down arguments.
- **`disj` / `disjoint`**: Used for disjointness from multiplicative sets (e.g., `p.primeCompl`).
- **`e` / `e.symm`**: Commonly used for ring/ideal isomorphisms (e.g., `polynomialQuotientEquivQuotientPolynomial`, `MvPolynomial.optionEquivLeft`).

---

### 3. TACTIC STACK

| Tactic | Frequency | Role |
|--------|-----------|------|
| `rw` | Very High | Rewriting definitions (`ringKrullDim`, `height`, `LiesOver`, `map`, `comap`). |
| `simp` | High | Simplifying using `IsMaximal`, `IsPrime`, `LiesOver`, `map`, `comap`. |
| `apply` / `refine` | High | Applying lemmas like `height_eq_height_add_of_liesOver_of_hasGoingDown`. |
| `convert` | Medium | Matching up equalities modulo ring isomorphisms. |
| `induction` | Medium | Structural induction on finite types for multivariate case. |
| `gcongr` | Medium | Handling inequalities in `WithBot ℕ`. |
| `infer_instance` | High | Inferring class instances (`IsField`, `IsMaximal`, `IsPrime`, `IsLocalization`). |
| `nontriviality` | Low-Medium | Ensuring ring is nontrivial before dimension arguments. |
| `rwa`, `convert`, `exact` | Medium | Fine-grained proof completion. |

---

### 4. PROOF LOGIC

#### General Strategy:
- **Localization + Going-Down**: For height jumps, localize at a prime `p`, lift ideals to `Rₚ[X]`, and use properties of maximal ideals in polynomial rings over local rings (often fields or DVRs).
- **Disjointness Argument**: Key step: show `P` is disjoint from `S = p.primeCompl.map C`, enabling `comap_map` bijection between ideals in `R[X]` localized at `S` and ideals in `Rₚ[X]`.
- **Reduction to Field Case**: When `p` is maximal, `R/p` is a field, and ` (R/p)[X]` is a PID ⇒ height-1 maximal ideals.
- **Induction for Multivariate**: Use `MvPolynomial.optionEquivLeft` to reduce `n+1` variables to `1 + n`, then apply univariate result.

#### Typical Flow (e.g., `height_eq_height_add_one`):
1. Show `p` is prime (via `LiesOver`).
2. Localize at `p`: pass to `Rₚ`.
3. Show `p' = pRₚ` is maximal.
4. Lift `P` to `P' ⊆ Rₚ[X]`, verify `P'` is maximal and lies over `p'`.
5. Apply `height_eq_height_add_one_of_isMaximal` to get `ht(P') = ht(p') + 1`.
6. Use disjointness to relate heights in `R[X]` and `Rₚ[X]`.

---

### 5. IMPORTS & DEPENDENCIES

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.FieldDivision` | Polynomial division over fields; used for PID structure of `k[X]`. |
| `Mathlib.RingTheory.KrullDimension.PID` | Krull dimension of PID = 1 (or 0 if field). |
| `Mathlib.RingTheory.LocalRing.ResidueField.Fiber` | Fiber description of primes in polynomial extensions; used for going-down. |
| `Mathlib.RingTheory.Ideal.KrullsHeightTheorem` | General height bounds (e.g., for chains of primes). |
| `Mathlib.RingTheory.KrullDimension.NonZeroDivisors` | Localization at multiplicative sets of non-zero-divisors; needed for `comap_map` bijections. |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (Core Theories)

```mermaid
graph TD
  A[CommRing R] --> B[Polynomial R]
  A --> C[Localization Rₚ]
  B --> D[PrimeSpectrum (R[X])]
  C --> E[PrimeSpectrum (Rₚ[X])]
  D --> F[Height of ideals]
  E --> F
  F --> G[ringKrullDim R]
  F --> H[ringKrullDim R[X]]
  G --> H
  style A fill:#f9f,stroke:#333
  style B fill:#bbf,stroke:#333
  style C fill:#bfb,stroke:#333
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Theory
    A[General bound: dim R[X] ≤ 2·dim R + 1] --> B[Height jump for maximal ideals]
    B --> C[Height jump for prime ideals (localization)]
    C --> D[Noetherian case: dim R[X] = dim R + 1]
    D --> E[Multivariate: dim R[X₁,…,Xₙ] = dim R + n]
  end

  subgraph Tools
    F[Localization at prime] --> C
    G[Going-down property] --> C
    H[PID structure of k[X]] --> B
    I[Disjointness & comap-map bijection] --> C
  end

  A -->|uses| H
  B -->|uses| G
  C -->|uses| F
  D -->|uses| I
```

---

### 7. SUMMARY

This file establishes foundational results on Krull dimension of polynomial rings. It begins with a general inequality (no Noetherian hypothesis), then refines it to an equality in the Noetherian case using deep tools: localization, going-down, and structure theory of polynomial rings over fields/local rings. The multivariate case follows cleanly by induction using `MvPolynomial.optionEquivLeft`. The proofs are highly structured, leveraging Lean’s algebraic library for ideal theory and dimension.
