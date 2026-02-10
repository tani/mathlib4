Here's a structured technical brief extracted from the provided Lean 4 file on **Kummer Extensions**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `K[n√a]` | Notation for `AdjoinRoot (X^n - C a)` — the simple extension by an `n`-th root of `a`. |
| `autAdjoinRootXPowSubCHom` | Monoid hom `rootsOfUnity n K →* (K[n√a] →ₐ[K] K[n√a])`, sending `η ↦ (ⁿ√a ↦ η • ⁿ√a)`. |
| `autAdjoinRootXPowSubC` | Group hom `rootsOfUnity n K →* (K[n√a] ≃ₐ[K] K[n√a])`, the unit group version of the above. |
| `autAdjoinRootXPowSubCEquiv` | **Main equivalence**: `rootsOfUnity n K ≃* (K[n√a] ≃ₐ[K] K[n√a])`, assuming `K` has all `n`-th roots of unity and `X^n - a` is irreducible. |
| `autEquivRootsOfUnity` | `Gal(L/K) ≃* rootsOfUnity n K`, when `L` is the splitting field of `X^n - a`. |
| `autEquivZmod` | `Gal(L/K) ≃* Multiplicative (ZMod n)`, given a primitive `n`-th root of unity `ζ ∈ K`. |
| `isCyclic_tfae` (implied by `isCyclic_of_isSplittingField_X_pow_sub_C`) | If `L/K` is finite of degree `n`, and `K` contains all `n`-th roots of unity, then `L/K` is cyclic iff `L = K[α]` with `αⁿ ∈ K`, iff `L` is the splitting field of `X^n - a` for some `a`. |
| `X_pow_sub_C_irreducible_of_prime` | For prime `p`, `X^p - a` is irreducible iff `a` is not a `p`-th power in `K`. |
| `X_pow_sub_C_irreducible_iff_of_prime` | Equivalence version of the above. |
| `X_pow_sub_C_irreducible_iff_of_odd` | For odd `n`, `X^n - a` is irreducible iff `a` is not a `d`-th power for any proper divisor `d ∣ n`, `d ≠ 1`. |
| `X_pow_sub_C_irreducible_of_prime_pow` | For odd prime power `p^k`, irreducibility of `X^{p^k} - a` ⇔ `a` not a `p`-th power. |
| `separable_X_pow_sub_C_of_irreducible` | If `X^n - a` is irreducible and `K` contains all `n`-th roots of unity, then it is separable. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `aut_`: Galois automorphisms (e.g., `autAdjoinRootXPowSubC`, `autEquivRootsOfUnity`)
  - `X_pow_sub_C_`: Polynomials of the form `X^n - a` (e.g., `X_pow_sub_C_irreducible_of_prime`)
  - `root_`: Roots of such polynomials (e.g., `root_X_pow_sub_C_pow`, `rootOfSplitsXPowSubC`)
  - `isSplittingField_`: Properties of splitting fields (e.g., `isSplittingField_AdjoinRoot_X_pow_sub_C`)
- **Suffixes**:
  - `_hom`: Monoid/group homomorphisms (e.g., `autAdjoinRootXPowSubCHom`)
  - `_equiv`: Equivalences (e.g., `autAdjoinRootXPowSubCEquiv`)
  - `_iff`: Biconditional theorems (e.g., `X_pow_sub_C_irreducible_iff_of_prime`)
- **Notation**:
  - `K[n√a]`: Kummer extension notation for `AdjoinRoot (X^n - C a)`
  - `rootsOfUnity n K`: Multiplicative group of `n`-th roots of unity in `K`
  - `primitiveRoots n K`: Set of primitive `n`-th roots of unity

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting with equalities (especially `map_pow`, `map_sub`, `eval₂`, `aeval`)
- `simp` / `simp_rw`: Simplification with algebraic lemmas (e.g., `map_C`, `map_X`, `smul_comm`)
- `apply_fun`: Applying a function to both sides of an equation
- `exact`, `refine`, `obtain`: Constructing proofs and extracting witnesses
- `cases`: Case analysis (e.g., on `n = 0` or `n = 1`)
- `have`, `suffices`: Introducing intermediate claims
- `apply_fun ... using`: For injective maps (e.g., algebra maps into fraction fields)
- `aesop`: For routine first-order reasoning (used in some later lemmas)
- `ring`: For commutative ring identities (e.g., in norm computations)

---

### **4. Proof Logic**

- **Structure of main equivalences**:
  - Construct a natural map (e.g., `η ↦ (ⁿ√a ↦ η • ⁿ√a)`)
  - Prove it's a homomorphism
  - Construct an inverse using division `σ ↦ σ(ⁿ√a)/ⁿ√a`
  - Verify left/right inverses using properties of roots of unity and irreducibility
- **Irreducibility criteria**:
  - Use norm arguments: `N(α)^p = a^{deg g}` ⇒ `a` is a `p`-power if `deg g < p`
  - Induction on `n` using prime factorization (especially for odd `n`)
  - Reduce to prime case via composition of polynomials (`X^{nm} - a = (X^n)^m - a`)
- **Galois group computations**:
  - Use splitting field universal property to lift maps
  - Use `AlgEquiv.ofBijective` for isomorphisms between splitting fields
  - Conjugate equivalences via `adjoinRootXPowSubCEquiv` to reduce to base case `K[n√a]`
- **Cyclicity**:
  - Use eigenvector argument for generator `σ` of Galois group
  - Show `σ`-eigenvector `v` satisfies `vⁿ ∈ K`, and `K⟮v⟯ = L`

---

### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.RingTheory.RootsOfUnity.PrimitiveRoots`: Roots of unity, primitive roots, `rootsOfUnity`, `primitiveRoots`
- `Mathlib.RingTheory.AdjoinRoot`: Construction of `K[α]` via quotient of polynomial ring
- `Mathlib.FieldTheory.Galois.Basic`: Galois groups, intermediate fields, `IsGalois`, `IsCyclic`
- `Mathlib.LinearAlgebra.Eigenspace.Minpoly`: Minimal polynomials, eigenvalues, eigenvectors
- `Mathlib.RingTheory.Norm.Basic`: Field norms, especially `Algebra.norm`

**Scope**:
- Finite extensions `L/K` of degree `n`
- Assumption: `K` contains all `n`-th roots of unity (often via `primitiveRoots n K`.Nonempty)
- Focus on extensions generated by radicals: `X^n - a`
- Goal: Characterize when such extensions are cyclic Galois, and compute their Galois groups

---

Let me know if you'd like a diagram of the equivalences or a summary of the TODOs (e.g., even `n` irreducibility criteria).