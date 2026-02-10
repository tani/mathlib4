### Technical Metadata Brief: `MvPolynomial.Nullstellensatz` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `zeroLocus I` | `Ideal (MvPolynomial σ k) → Set (σ → k)` | Maps an ideal to the set of common zeros of all polynomials in the ideal (evaluated at points `σ → k`). |
| `vanishingIdeal V` | `Set (σ → k) → Ideal (MvPolynomial σ k)` | Maps a set of points to the ideal of polynomials vanishing on all points in the set. |
| `pointToPoint x` | `σ → k → PrimeSpectrum (MvPolynomial σ k)` | Sends a point `x` to the prime ideal `vanishingIdeal {x}`, which is maximal under the assumptions. |
| `vanishingIdeal_pointToPoint` | Equality of `vanishingIdeal` over image of `pointToPoint` and `MvPolynomial.vanishingIdeal` | Connects geometric and algebraic definitions of vanishing ideals via prime spectrum. |
| `isMaximal_iff_eq_vanishingIdeal_singleton` | `I.IsMaximal ↔ ∃ x, I = vanishingIdeal {x}` | Characterizes maximal ideals as those vanishing at a single point (requires `k` algebraically closed, `σ` finite). |
| `vanishingIdeal_zeroLocus_eq_radical` | `vanishingIdeal (zeroLocus I) = I.radical` | **Main theorem**: Nullstellensatz — the ideal of the zero locus of `I` equals the radical of `I`. |
| `IsPrime.vanishingIdeal_zeroLocus` | For prime `P`, `vanishingIdeal (zeroLocus P) = P` | Immediate corollary of main theorem for prime ideals (since `P.radical = P`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zeroLocus_`: for properties of `zeroLocus` (e.g., `zeroLocus_anti_mono`, `zeroLocus_bot`, `zeroLocus_top`).
  - `vanishingIdeal_`: for properties of `vanishingIdeal` (e.g., `vanishingIdeal_anti_mono`, `vanishingIdeal_empty`, `vanishingIdeal_singleton_isMaximal`).
  - `pointToPoint_`: for constructions linking points to prime spectrum.
- **Suffixes**:
  - `_iff`: for biconditional characterizations (`mem_zeroLocus_iff`, `mem_vanishingIdeal_iff`, `isMaximal_iff_eq_vanishingIdeal_singleton`).
  - `_le`: for inclusion lemmas (`le_vanishingIdeal_zeroLocus`, `zeroLocus_vanishingIdeal_le`, `pointToPoint_zeroLocus_le`).
  - `_iff_le`: for Galois connection equivalences (`le_zeroLocus_iff_le_vanishingIdeal`).
- **Functional suffixes**:
  - `_mono`: monotonicity (`vanishingIdeal_anti_mono`, `zeroLocus_anti_mono`).
  - `_singleton`: for singleton sets (`vanishingIdeal_singleton_isMaximal`, `mem_vanishingIdeal_singleton_iff`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying membership conditions, especially using `mem_zeroLocus_iff`, `mem_vanishingIdeal_iff`, `mem_vanishingIdeal_singleton_iff`. |
| `rw` / `rwa` | Rewriting using equalities, especially `vanishingIdeal_zeroLocus_eq_radical`, `isMaximal_iff_eq_vanishingIdeal_singleton`, and quotient ring properties. |
| `exact` / `refine` | Constructing proofs, especially when applying lemmas like `le_antisymm`, `mem_sInf.mp`, or `IsMaximal.eq_of_le`. |
| `intro` / `intro h` | Standard proof introduction steps. |
| `cases` / `obtain ⟨x, hx⟩` | Extracting witnesses from existential quantifiers (e.g., from `isMaximal_iff_eq_vanishingIdeal_singleton`). |
| `convert` / `congr_arg` | Proving equality of expressions via functional extensionality or ring homomorphism properties. |
| `aesop` / `ring` | Not heavily used here; proofs are mostly structural and rely on algebraic properties. |
| `apply` / `apply_fun` | For applying ring homomorphism lemmas (e.g., `eval x).map_zero`, `ϕ.map_mul`). |

---

#### **4. Proof Logic**

- **High-level strategy**:
  - Use **Galois connection** between `zeroLocus` and `vanishingIdeal` to derive adjointness and inclusion lemmas.
  - Prove `vanishingIdeal_zeroLocus_eq_radical` by:
    1. Showing `vanishingIdeal (zeroLocus I) ≤ I.radical` via `sInf`-based argument over maximal ideals.
    2. Showing reverse inclusion using `le_vanishingIdeal_zeroLocus` and maximality of `vanishingIdeal {x}`.
  - Key lemma: `isMaximal_iff_eq_vanishingIdeal_singleton`, which uses:
     - Algebraically closed field ⇒ surjectivity of algebra map from `k`.
     - Jacobson ring property of `MvPolynomial σ k` (via `IsJacobsonRing`).
     - Bijectivity of induced map on quotients to construct a point `x` such that `I = vanishingIdeal {x}`.
- **Inductive or case-based reasoning**:
  - Mostly **algebraic case analysis**, especially when lifting elements from quotients or constructing points from maximal ideals.
  - No explicit induction on terms or natural numbers; relies on structural properties of ideals and evaluation.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.RingTheory.Jacobson.Ring` | Provides `IsJacobsonRing`, used to show `MvPolynomial σ k` is Jacobson (needed for Nullstellensatz). |
| `Mathlib.FieldTheory.IsAlgClosed.Basic` | Provides properties of algebraically closed fields (e.g., surjectivity of algebra maps). |
| `Mathlib.RingTheory.MvPolynomial` | Core theory of multivariate polynomials. |
| `Mathlib.RingTheory.PrimeSpectrum` | Used for `PrimeSpectrum`, `vanishingIdeal` on spectra, and `pointToPoint` construction. |

**Domain**: Algebraic geometry over affine space `σ → k`, with `k` algebraically closed and `σ` finite. Focuses on the correspondence between geometric objects (zero sets) and algebraic objects (ideals), culminating in Hilbert’s Nullstellensatz for `MvPolynomial`.

---

Let me know if you'd like a diagram of the Galois connection or a proof sketch of `vanishingIdeal_zeroLocus_eq_radical`.