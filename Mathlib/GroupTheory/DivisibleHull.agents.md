**Technical Brief: `DivisibleHull.lean`**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DivisibleHull M` | `Type u` (when `M : Type u [AddCommMonoid M]`) | The divisible hull of an `AddCommMonoid` $M$, defined as the localization $S^{-1}M$ at $S = \mathbb{N}_+$ (via `nonZeroDivisors ℕ`). |
| `mk m s` | `DivisibleHull M` | Element $m/s$ in the localization; `s : ℕ+`. |
| `coe m` | `DivisibleHull M` | Coercion $m \mapsto m/1$. |
| `Module ℚ≥0 (DivisibleHull M)` | instance | Makes `DivisibleHull M` a $\mathbb{Q}_{\ge 0}$-module. |
| `neg_mk` | `-mk m s = mk (-m) s` | Negation in the hull when $M$ is a group. |
| `SMul ℚ (DivisibleHull M)` | instance | Extends scalar multiplication to all $\mathbb{Q}$ when $M$ is a group. |
| `qsmul_mk` | `a • mk m s = mk (a.num • m) (⟨a.den, a.den_pos⟩ * s)` | Explicit formula for $\mathbb{Q}$-scalar multiplication. |
| `LE (DivisibleHull M)` | instance | Defines order via $m/s \le n/t \iff t \cdot m \le s \cdot n$. |
| `LinearOrder (DivisibleHull M)` | instance | Proves the induced order is linear, compatible with addition. |
| `IsOrderedCancelAddMonoid (DivisibleHull M)` | instance | Preserves ordered cancellative monoid structure. |
| `IsStrictOrderedModule ℚ≥0 (DivisibleHull M)` | instance | $\mathbb{Q}_{\ge 0}$-module is strictly ordered (scalar multiplication preserves strict order). |
| `archimedeanClassOrderIso M` | `ArchimedeanClass M ≃o ArchimedeanClass (DivisibleHull M)` | Order-isomorphism of Archimedean classes; preserves Archimedean property. |
| `archimedeanClassMk_mk_eq` | `ArchimedeanClass.mk (mk m s) = ArchimedeanClass.mk (mk m s')` | Archimedean class of $m/s$ depends only on numerator $m$. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `mk_`: construction of localization elements (e.g., `mk`, `mk_add_mk`, `mk_le_mk`).
  - `coe_`: coercion-related (e.g., `coe`, `coe_add`, `coe_injective`, `coeOrderAddMonoidHom`).
  - `liftOn`, `liftOn₂`: universal properties of localization.
  - `archimedeanClass_`: Archimedean class constructions.
- **Suffixes**:
  - `_mk`: properties of `mk`.
  - `_hom`, `_orderHom`: homomorphism / order-homomorphism variants.
  - `_iff`: characterizations via biconditionals (e.g., `mk_eq_mk_iff_smul_eq_smul`, `mk_le_mk`).
- **Notation**:
  - `↑ⁿ`: coercion `PNat.equivNonZeroDivisorsNat`.
  - `↑m`: coercion from `M` to `DivisibleHull M`.

---

### 3. TACTIC STACK

Frequently used tactics:
- `simp` (especially with `mk`, `coe`, `smul`, `add`, `le`, `lt`)
- `rw` (often with `mk_eq_mk`, `mk_le_mk`, `zsmul_mk`, `qsmul_def`)
- `induction x with | mk m s` (induction on localization elements)
- `aesop` (for automated reasoning in torsion-free section)
- `ring`, `ring_nf` (for algebraic simplifications in rational scalar proofs)
- `convert ... using n` (to reduce proof obligations to ring equalities)
- `obtain ⟨u, hu⟩` (from localization equivalence)
- `apply_fun` (to apply functions to equalities, e.g., `ArchimedeanClass.mk`)
- `exact`, `refine`, `have`, `suffices` (for modular proof structure)

---

### 4. PROOF LOGIC

**General proof strategy**:
1. **Induction on localization representatives**: Most proofs proceed by induction on `x : DivisibleHull M` using `LocalizedModule.induction_on`, reducing to `x = mk m s`.
2. **Reduction to $M$-level properties**: Use `mk_eq_mk_iff_smul_eq_smul` (or its torsion-free variant) to translate equality/inequality in `DivisibleHull M` to scaled inequalities in $M$.
3. **Lift properties via universal property**: Define operations (e.g., order, scalar multiplication) using `liftOn`/`liftOn₂`, then verify well-definedness using `lift_aux` or similar lemmas.
4. **Preservation lemmas**: For structural properties (e.g., ordered group, Archimedean), show that the structure on `DivisibleHull M` is inherited from $M$ via the embedding `coe : M → DivisibleHull M`.

**Typical flow**:
- Define object (e.g., order, scalar mult) on representatives.
- Prove compatibility with localization equivalence (e.g., `lift_aux`).
- Apply `liftOn`/`liftOn₂`.
- Prove module/ordered structure axioms by reducing to $M$-level axioms via `mk_*` lemmas and `ring`/`simp`.

---

### 5. IMPORTS (PRIMARY DEPENDENCIES)

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Module.LocalizedModule.Basic` | Core localization theory; `LocalizedModule`, `mk`, induction, lifting. |
| `Mathlib.Algebra.Order.Module.Archimedean` | Archimedean classes, order-homomorphisms. |
| `Mathlib.Algebra.Order.Monoid.PNat` | Positive naturals (`ℕ+`), used for localization denominator. |
| `Mathlib.Data.Sign.Defs` | Sign type for extending $\mathbb{Q}_{\ge 0}$-action to $\mathbb{Q}$. |
| `Mathlib.RingTheory.Localization.FractionRing` | General localization theory (used implicitly via `LocalizedModule`). |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[DivisibleHull M] --> B[LocalizedModule (nonZeroDivisors ℕ) M]
  B --> C[Mathlib.Algebra.Module.LocalizedModule.Basic]
  A --> D[Module ℚ≥0 (DivisibleHull M)]
  A --> E[LinearOrder (DivisibleHull M)]
  A --> F[ArchimedeanClass M ≃o ArchimedeanClass (DivisibleHull M)]
  D --> G[Mathlib.Algebra.Order.Module.Archimedean]
  E --> H[Mathlib.Algebra.Order.Monoid.PNat]
  F --> G
  C --> I[Mathlib.RingTheory.Localization.FractionRing]
```

#### Overview of `DivisibleHull.lean`

```mermaid
flowchart LR
  subgraph Setup
    M[AddCommMonoid M] -->|localize at| S[ℕ+]
    S --> L[LocalizedModule]
  end

  subgraph Structure
    L -->|Module ℚ≥0| QG[ℚ≥0-module]
    L -->|if M is group| Q[Module ℚ]
    L -->|if M linear ordered| LO[LinearOrder]
    LO -->|+ cancellative| OCA[IsOrderedCancelAddMonoid]
    QG -->|+ ordered| SOMP[IsStrictOrderedModule ℚ≥0]
    Q -->|+ ordered group| SOP[IsStrictOrderedModule ℚ]
  end

  subgraph Archimedean
    LO -->|ArchimedeanClass preserved| ACI[ArchimedeanClass M ≃o ArchimedeanClass (DivisibleHull M)]
  end

  M -->|coerce| L
```

---

### 7. THEORY SCOPE

This file implements the **divisible hull** of an additive commutative monoid $M$ as its localization at $\mathbb{N}_+$, yielding:
- A $\mathbb{Q}_{\ge 0}$-module (always),
- A $\mathbb{Q}$-module if $M$ is a group,
- A linearly ordered module if $M$ is an ordered cancellative monoid or ordered group,
- Preservation of the Archimedean property via an order-isomorphism.

It does **not** implement `DivisibleBy` (left as future work on `LocalizedModule`), focusing instead on the $\mathbb{Q}_{\ge 0}$/$\mathbb{Q}$-module and order-theoretic structure induced by the localization.

--- 

**End of Technical Brief**
