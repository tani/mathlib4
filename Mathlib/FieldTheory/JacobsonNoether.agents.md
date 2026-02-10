### Technical Metadata Brief: Jacobson-Noether Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `k` | `local notation3 "k" => Subring.center D` | Notation for the center of the division ring `D`. |
| `exists_pow_mem_center_of_inseparable` | `∀ p, ExpChar D p → a : D → (∀ x, IsSeparable k x → x ∈ k) → ∃ n, a ^ (p ^ n) ∈ k` | In a purely inseparable extension of `k` of char `p`, every element has a `p^n`-power in `k`. |
| `exists_pow_mem_center_of_inseparable'` | Same as above, but with `a ∉ k` ⇒ `∃ n ≥ 1, a ^ (p^n) ∈ k` | Refinement ensuring exponent `n > 0` when `a ∉ k`. |
| `exist_pow_eq_zero_of_le` | `a ∉ k → (∀ x, IsSeparable k x → x ∈ k) → ∃ m ≥ 1, ∀ n ≥ p^m, (ad k D a)^[n] = 0` | For `a ∉ k`, high enough iterates of the adjoint map `ad(k, D, a)` vanish. |
| `exists_separable_and_not_isCentral` | `k ≠ ⊤ → ∃ x ∉ k, IsSeparable k x` | **Jacobson–Noether theorem**: In a noncommutative algebraic division algebra over its center, there exists a separable element outside the center. |
| `exists_separable_and_not_isCentral'` | `(⊥ : Subalgebra L D) ≠ ⊤ → ∃ x ∉ (⊥ : Subalgebra L D), IsSeparable L x` | Variant where base field `L` is the center; equivalent but more flexible for applications. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exists_...`: Existence lemmas (e.g., `exists_pow_mem_center_of_inseparable`).
  - `is_...`: Properties (e.g., `IsSeparable`, `IsAlgebraic`, `IsCentral`).
  - `mem_...`: Membership in structures (e.g., `Subring.mem_center_iff`).
- **Suffixes**:
  - `_of_...`: Conditions or assumptions (e.g., `of_inseparable`, `of_le`).
  - `_iff`: Biconditional characterizations (e.g., `isPurelyInseparable_iff_pow_mem`).
- **Adjoint notation**:
  - `ad k D a`: Adjoint action of `a` on `D` over center `k`, i.e., `x ↦ a * x - x * a`.
  - `(ad k D a)^[n]`: `n`-th iterate of the adjoint map.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `obtain` / `rcases` | Extracting witnesses from existential hypotheses. |
| `rw` / `simp_rw` | Rewriting using definitions (e.g., `Subring.mem_center_iff`, `ad_eq_lmul_left_sub_lmul_right`). |
| `ext` | Extensionality for functions/maps (e.g., proving two linear maps equal). |
| `apply_fun` | Applying a function to both sides of an equation (often invertible maps like `a⁻¹ * ·`). |
| `convert` | Matching goals up to definitional equality. |
| `omega` | Solving linear arithmetic goals (e.g., `0 < n`, `n ≥ 1`). |
| `rwa` | Rewrite + assumption (common after `have` or `set`). |
| `simpa` | Simplify + discharge goal using assumptions. |
| `congr` | Congruence reasoning (e.g., for ring isomorphisms). |
| `linarith` | Linear arithmetic over ordered structures. |

---

#### **4. Proof Logic**

- **Structure of main proof (`exists_separable_and_not_isCentral`)**:
  1. **Assume contrary**: Suppose all separable elements lie in `k`.
  2. **Pick noncentral element `a ∉ k`** using nontriviality of `k ≠ ⊤`.
  3. **Find `b` such that `[a, b] ≠ 0`** (i.e., `ad a b ≠ 0`) using non centrality of `a`.
  4. **Maximal nilpotency index**: Find largest `n > 0` such that `(ad a)^n b ≠ 0`, but `(ad a)^{n+1} b = 0`.
  5. **Define `c = (ad a)^n b ≠ 0`**, invert it, and show `c` commutes with `a`.
  6. **Construct `d = c⁻¹ a (ad a)^{n-1} b`**, derive key identity: `ad a d = a`.
  7. **Contradiction via Frobenius**: Raise both sides to `p^r`, use separability assumption to force `a ∈ k`, violating `a ∉ k`.

- **Key logical flow**:
  - *Indirect proof* (by contradiction) + *construction of a nilpotent-like element* + *Frobenius twist* in positive characteristic.
  - Uses properties of purely inseparable extensions and the adjoint representation.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Central.Defs`: Centers of algebras/subrings.
- `Mathlib.Algebra.CharP.LinearMaps`: Characteristic `p` and linear maps (e.g., Frobenius).
- `Mathlib.Algebra.CharP.Subring`: Interaction of characteristic with subrings.
- `Mathlib.Algebra.GroupWithZero.Conj`: Conjugation and invertibility.
- `Mathlib.Algebra.Lie.OfAssociative`: Lie algebra from associative algebra (`ad` map).
- `Mathlib.FieldTheory.PurelyInseparable`: Theory of purely inseparable extensions.

**Domain Scope**:
- Noncommutative division algebras (`DivisionRing D`) algebraic over their center.
- Use of `ExpChar D p` for positive characteristic.
- Central subrings (`Subring.center D`) and subalgebras (`Subalgebra.center L D`).
- Separability over rings/fields (`IsSeparable`).

---

Let me know if you'd like a diagram of the logical dependencies or a formalized summary for integration into a domain-specific AI agent.