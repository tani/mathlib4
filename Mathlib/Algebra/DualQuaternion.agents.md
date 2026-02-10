### Technical Metadata Brief: `Quaternion.dualNumberEquiv` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `Quaternion.dualNumberEquiv` | `Quaternion (DualNumber R) ≃ₐ[R] DualNumber (Quaternion R)` | Establishes an **`R`-algebra isomorphism** between dual quaternions (quaternions over dual numbers) and dual numbers over quaternions. This shows the two constructions are equivalent. |
| `re_fst_dualNumberEquiv`, `imI_fst_dualNumberEquiv`, etc. | `∀ q, (dualNumberEquiv q).fst.re = q.re.fst` (and analogues) | Simplification lemmas characterizing how `dualNumberEquiv` acts component-wise on the real and imaginary parts of the quaternion. |
| `fst_re_dualNumberEquiv_symm`, `fst_imI_dualNumberEquiv_symm`, etc. | `∀ d, (dualNumberEquiv.symm d).re.fst = d.fst.re` (and analogues) | Simplification lemmas for the inverse map (`symm`), describing how the inverse isomorphism reconstructs dual-number coefficients. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `re_`, `imI_`, `imJ_`, `imK_`: refer to the four components of a quaternion (real + three imaginary units).
  - `fst_`, `snd_`: refer to the two components of a `DualNumber` (i.e., `⟨a, ε b⟩` where `a, b : R`, and `ε² = 0`).
- **Suffixes**:
  - `_dualNumberEquiv`: for lemmas about the forward direction of the equivalence.
  - `_dualNumberEquiv_symm`: for lemmas about the inverse direction.

> Example: `imJ_snd_dualNumberEquiv` = “the `imJ` component of the *second* (ε) part of `dualNumberEquiv(q)` equals `q.imJ.snd`”.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `rfl`: for definitional equalities (used extensively in `left_inv`, `right_inv`, and all `@[simp]` lemmas).
  - `ext : 1`: extensionality for functions/structures, focusing on the first component.
  - `congr 1 <;> simp <;> ring`: used in `map_mul'` to reduce multiplication preservation to algebraic identities over `R`.
  - `rfl`: also used in `map_add'` and `commutes'`, indicating the map is definitionally linear and additive.

> Notably, no induction or heavy algebraic manipulation beyond `ring` is needed — the isomorphism is *definitional* on components.

---

#### **4. Proof Logic**

- **Structure of proof**:
  1. Define forward map (`toFun`) by unpacking dual-number coefficients into two quaternions (real and ε-part).
  2. Define inverse (`invFun`) by pairing real and ε-parts of each quaternion component into dual numbers.
  3. Prove inverse properties (`left_inv`, `right_inv`) by `rfl` — the maps are *definitionally* inverses.
  4. Prove algebra homomorphism properties:
     - `map_add'`: immediate by `rfl` (addition is component-wise).
     - `commutes'`: immediate by `rfl` (scalar multiplication is component-wise).
     - `map_mul'`: requires expanding multiplication in both algebras, then simplifying using `simp` and `ring` to verify component-wise multiplication matches.

- **Key insight**: The isomorphism is *purely structural* — it exploits the fact that `DualNumber R = R ⊕ εR` with `ε² = 0`, and quaternion multiplication distributes over this direct sum.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Algebra.DualNumber`: defines `DualNumber R` and its algebra structure.
  - `Mathlib.Algebra.Quaternion`: defines `Quaternion R` and its ring/`R`-algebra structure.

- **Domain scope**:
  - Works over any `CommRing R` (commutative ring).
  - Applies to *dual quaternions* as a tool for modeling rigid body motions (as noted in docstring).
  - Related to `Matrix.dualNumberEquiv` (mentioned in docstring), suggesting a broader pattern of “dualization commuting with algebra constructions”.

---

### Summary

This file formalizes a foundational structural equivalence: **dual quaternions ≅ dual numbers over quaternions**, as `R`-algebras. The proof is lightweight and definitional, leveraging Lean’s ability to reason about structured types via `ext` and `rfl`. The naming and lemmas follow a predictable pattern, optimized for simplification (`simp`) in downstream geometry/robotics applications (e.g., kinematics using dual quaternions).