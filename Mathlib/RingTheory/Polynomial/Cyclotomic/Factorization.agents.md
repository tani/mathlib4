### Technical Brief: Factorization of Cyclotomic Polynomials over Finite Fields (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cyclotomic n K` | `Polynomial K` | The $n$-th cyclotomic polynomial over field $K$. |
| `orderOf u` | `ℕ` (for unit $u$ in a finite monoid) | Multiplicative order of unit $u$. |
| `unitOfCoprime n h` | `Units (ZMod n)` | Unit in $\mathbb{Z}/n\mathbb{Z}$ induced by $a \mapsto a \bmod n$, where $\gcd(a,n)=1$. |
| `normalizedFactors p` | `Multiset (Polynomial K)` | Multiset of irreducible monic factors of $p$, up to associates. |
| `natDegree P` | `ℕ` | Degree of polynomial $P$, as a natural number. |
| `AdjoinRoot P` | `Type*` | Field extension of $K$ obtained by adjoining a root of irreducible $P$. |
| `frobeniusAlgEquivOfAlgebraic K L` | `K →ₐ[K] L ≃ₐ[K] L` | Algebra isomorphism induced by Frobenius $x \mapsto x^{|K|}$. |

**Main Theorems:**

- **`natDegree_of_dvd_cyclotomic_of_irreducible_of_monic`**  
  Let $P$ be a *monic irreducible* factor of $\Phi_n(K)$, with $\gcd(p,n)=1$. Then  
  $$
  \deg(P) = \operatorname{ord}_{n}(p^f),
  $$
  where $|K| = p^f$.

- **`natDegree_of_dvd_cyclotomic_of_irreducible`**  
  Same as above, but drops the monic assumption (uses normalization via leading coefficient).

- **`irreducible_of_dvd_cyclotomic_of_natDegree`**  
  Converse: if $P \mid \Phi_n(K)$ and $\deg(P) = \operatorname{ord}_n(p^f)$, then $P$ is irreducible.

- **`ZMod.irreducible_of_dvd_cyclotomic_of_natDegree`**  
  Special case over $K = \mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$ (i.e., $f=1$).

- **`normalizedFactors_cyclotomic_card`**  
  Number of distinct irreducible factors of $\Phi_n(K)$ is  
  $$
  \frac{\varphi(n)}{\operatorname{ord}_n(p^f)}.
  $$

---

#### **2. Naming Conventions**

| Pattern | Meaning | Examples |
|--------|---------|----------|
| `*_of_dvd_*` | Factorization-related results (divisibility hypothesis) | `natDegree_of_dvd_cyclotomic_of_irreducible` |
| `*_of_irreducible` | Hypothesis includes irreducibility | `natDegree_of_dvd_cyclotomic_of_irreducible_of_monic` |
| `*_of_natDegree` | Degree condition used as hypothesis/conclusion | `irreducible_of_dvd_cyclotomic_of_natDegree` |
| `*_of_mem_normalizedFactors_*` | Membership in normalized factor multiset | `natDegree_of_mem_normalizedFactors_cyclotomic` |
| `*_of_algebraic` | Involves algebraic extensions / Frobenius | `frobeniusAlgEquivOfAlgebraic` |
| `*_of_finite` | Finite field assumptions | `f_ne_zero`, `finite_adjoinRoot` |

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `simp` / `simp only` | Very High | Simplify goals using definitional equalities, algebraic laws, and lemmas like `isRoot_cyclotomic_iff`, `powerBasis_gen`, etc. |
| `rw` / `nth_rewrite` | High | Rewrite using key equalities (e.g., `hζ.eq_orderOf`, `natCast_eq_natCast_iff`). |
| `exact` / `refine` | High | Apply known lemmas (e.g., `orderOf_dvd_iff_pow_eq_one.mpr`). |
| `have` / `suffices` | High | Introduce intermediate lemmas (e.g., `NeZero (n : K)`, `hζ : IsPrimitiveRoot ...`). |
| `cases` / `obtain` | Medium | Extract witnesses (e.g., `⟨A, hA⟩` from divisibility). |
| `aesop` / `linarith` | Low-Medium | For arithmetic reasoning (e.g., `orderOf_pos`, `count_le_one`). |
| `ring` | Medium | Simplify polynomial/ring expressions (e.g., in `natDegree_of_dvd_cyclotomic_of_irreducible_of_monic`). |
| `convert` / `congr` | Rare | For congruence-based rewriting. |
| `by_contra!` | Medium | For contradiction proofs (e.g., in `normalizedFactors_cyclotomic_card`). |

---

#### **4. Proof Logic**

The proofs follow a **structured algebraic strategy**:

1. **Reduction to monic case**  
   Use normalization: $P \mapsto P / \text{lc}(P)$ to reduce general irreducible factors to monic ones.

2. **Field extension via `AdjoinRoot`**  
   Adjoin a root $\zeta$ of $P$ to $K$, forming $L = K[X]/(P)$. Then:
   - $\zeta$ is a primitive $n$-th root of unity (via `isRoot_cyclotomic_iff`).
   - $L/K$ is a finite separable extension (since $\gcd(p,n)=1$).

3. **Frobenius action & order computation**  
   - Use Frobenius automorphism $\varphi(x) = x^{|K|} = x^{p^f}$ on $L$.
   - Show $\varphi^d(\zeta) = \zeta$ iff $p^f{}^d \equiv 1 \pmod{n}$.
   - Conclude $\deg(P) = [L:K] = \operatorname{ord}_n(p^f)$.

4. **Converse direction**  
   Use unique factorization in $K[X]$: if a factor has minimal possible degree (equal to order), it must be irreducible.

5. **Counting factors**  
   - Use $\deg(\Phi_n) = \varphi(n)$.
   - All irreducible factors have equal degree $d = \operatorname{ord}_n(p^f)$.
   - Hence number of factors = $\varphi(n)/d$.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.FieldTheory.Finite.GaloisField` | Finite fields, Frobenius, Galois theory |
| `Mathlib.RingTheory.SimpleModule.Basic` | Finite-dimensional algebras, `AdjoinRoot` |
| `Mathlib.RingTheory.Polynomial.Cyclotomic.Roots` | Cyclotomic polynomials, roots of unity, `isRoot_cyclotomic_iff` |
| `Mathlib.Algebra.CharP.CharAndCard` | Characteristic & cardinality relations, `charP_of_card_eq_prime_pow` |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Theory Level)**

```mermaid
graph TD
  A[Finite Fields] --> B[GaloisField]
  C[Cyclotomic Polynomials] --> D[Roots]
  E[Ring Theory] --> F[SimpleModule]
  G[Characteristic & Cardinality] --> H[CharP]

  B --> I[Factorization of Φₙ over 𝔽_q]
  D --> I
  F --> I
  H --> I

  I --> J[natDegree = orderOf(p^f mod n)]
  I --> K[Counting factors = φ(n)/order]
```

##### **File Overview (Code Structure)**

```mermaid
flowchart LR
  subgraph Setup
    K[Field K, Fintype K] 
    hK[|K| = p^f]
    hp[Fact p.Prime]
    hn[gcd(p,n)=1]
  end

  subgraph Core Results
    A[monic case] -->|natDegree_of_dvd_cyclotomic_of_irreducible_of_monic| B[deg(P) = ord_n(p^f)]
    C[general case] -->|natDegree_of_dvd_cyclotomic_of_irreducible| B
    D[converse] -->|irreducible_of_dvd_cyclotomic_of_natDegree| E[if deg = ord ⇒ irreducible]
    F[ZMod p case] -->|ZMod.irreducible_of_dvd_cyclotomic_of_natDegree| E
  end

  subgraph Applications
    G[natDegree_of_mem_normalizedFactors_cyclotomic] --> H[All factors have same degree]
    H --> I[normalizedFactors_cyclotomic_card]
  end

  K --> A
  C --> G
```

---

#### **7. Summary**

This file formalizes a classical result in algebraic number theory:  
> Over a finite field $\mathbb{F}_q$ with $\gcd(q,n)=1$, every irreducible factor of the $n$-th cyclotomic polynomial $\Phi_n(X)$ has degree equal to the multiplicative order of $q$ modulo $n$, and the number of such factors is $\varphi(n)/\operatorname{ord}_n(q)$.

The Lean proof leverages:
- `AdjoinRoot` to construct splitting extensions,
- Frobenius automorphism to relate field degrees to modular arithmetic,
- Unique factorization and properties of normalized factors to count irreducibles.

It is a canonical example of *algebraic computation* in Lean, combining field theory, group theory (orders), and commutative algebra (UFDs, factorization).
