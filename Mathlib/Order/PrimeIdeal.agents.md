### Technical Metadata Brief: Prime Ideals and Filters in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `PrimePair` | `structure` | Encodes a partition of a preorder `P` into an ideal `I` and a filter `F`. Represents the data of a prime ideal *or* prime filter. |
| `IsPrime.Ideal` (`Ideal.IsPrime`) | `class` | Predicate stating that an ideal `I` is *prime*: its complement is a filter (`IsPFilter`). |
| `IsPrime.PFilter` (`PFilter.IsPrime`) | `class` | Predicate stating that a filter `F` is *prime*: its complement is an ideal (`IsIdeal`). |
| `IsPrime.toPrimePair` | `def` | Converts a prime ideal (or filter) into a `PrimePair`. |
| `PrimePair.I_isPrime` / `PrimePair.F_isPrime` | `theorem` | Shows that the ideal/filter in a `PrimePair` is prime. |
| `IsPrime.mem_or_mem` | `theorem` | In a semilattice with inf, `x ⊓ y ∈ I → x ∈ I ∨ y ∈ I` for prime ideal `I`. |
| `IsPrime.of_mem_or_mem` | `theorem` | Converse: if `x ⊓ y ∈ I → x ∈ I ∨ y ∈ I`, then `I` is prime (under `IsProper`). |
| `isPrime_iff_mem_or_mem` | `theorem` | Equivalence: `IsPrime I ↔ ∀ x y, x ⊓ y ∈ I → x ∈ I ∨ y ∈ I`. |
| `IsPrime.mem_or_compl_mem` | `theorem` | In a Boolean algebra, for prime ideal `I`, `x ∈ I ∨ xᶜ ∈ I`. |
| `isPrime_iff_mem_or_compl_mem` | `theorem` | Equivalence in Boolean algebras: `IsPrime I ↔ ∀ x, x ∈ I ∨ xᶜ ∈ I`. |
| `IsMaximal.isPrime` | `instance` | In a distributive lattice, every maximal ideal is prime. |
| `IsPrime.isMaximal` | `instance` | In a Boolean algebra, every prime ideal is maximal. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate classes (`IsPrime`, `IsProper`, `IsMaximal`).
  - `to_`: Conversion functions (`toPrimePair`).
- **Suffixes**:
  - `_iff_`: Equivalence theorems (`isPrime_iff_mem_or_mem`, `isPrime_iff_mem_or_compl_mem`).
  - `_or_`, `_compl_`: Logical structure in Boolean/algebraic contexts (`mem_or_mem`, `mem_or_compl_mem`).
- **Structure/Class Names**:
  - `PrimePair`, `IsPrime`: Standard naming for mathematical objects and properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `compl_I_eq_F`, `coe_sup_eq`). |
| `simp only [...]` | Simplifying with precise lemmas (e.g., Boolean algebra identities). |
| `contrapose!` | Turning implications into contrapositive form (common in prime ideal proofs). |
| `exact` / `refine` | Constructing proofs from hypotheses or partial goals. |
| `cases'` | Destructuring `IsCompl`, `nonempty`, or `exists` hypotheses. |
| `rwa` | `rw` + `assumption` (e.g., `rwa [← IF.compl_I_eq_F] at h`). |
| `intro` / `intro h` | Introducing hypotheses for implications. |
| `apply` / `exact` | Applying lemmas or class instances (e.g., `apply hynI`). |
| `have` / `suffices` | Introducing intermediate claims. |
| `rcases` | Destructuring existential or conjunction hypotheses. |
| `rwa` / `rw [...] at` | Rewriting in hypotheses. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Equivalence proofs** (`↔`) are split into two directions using `⟨...⟩` and `rwa`.
  - **Prime ideal ↔ complement is filter**: Central theme; often proven via `mk_iff` and `rw [isPrime_iff]`.
  - **SemilatticeInf section**: Uses inf (`⊓`) and properties of filters/ideals under inf-closure.
  - **DistribLattice section**: Leverages maximality → primality via sup with principal ideals and lattice identities.
  - **BooleanAlgebra section**: Exploits complementation (`xᶜ`) and identities like `inf_compl_eq_bot`, `sup_inf_inf_compl`.
- **Inductive/Case-based reasoning**:
  - Rarely inductive; mostly algebraic reasoning with lattice operations.
  - Common pattern: assume `x ∉ I`, `y ∉ I`, show `x ⊓ y ∉ I` (via filter properties of complement).
- **Instance proofs**:
  - Use `simp only [...]` + `intro` + `rcases` + `exact` to discharge maximality/primality instances.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Order.Ideal` | Core definitions: `Ideal`, `principal`, `sup`, `compl`, `IsProper`, `IsMaximal`, etc. |
| `Mathlib.Order.PFilter` | Definitions: `PFilter`, `IsPFilter`, `toIdeal`, `toPFilter`, `compl`, etc. |

These imports define the foundational order-theoretic structures used throughout.

--- 

### Summary

This module formalizes the equivalence between prime ideals and prime filters via `PrimePair`, and establishes key characterizations in different algebraic contexts (preorders, semilattices, distributive lattices, Boolean algebras). The proofs rely heavily on lattice identities, complementation (in Boolean case), and duality between ideals and filters. The naming and structure follow Lean/Mathlib conventions, with heavy use of `mk_iff`, `rw`, and `simp` for equivalence proofs.