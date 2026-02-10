Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Von Neumann Algebras in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `WStarAlgebra` | `class (M : Type u) [CStarAlgebra M] : Prop` | Abstract von Neumann algebra: a C*-algebra with a Banach space predual (Sakai’s definition). Asserts existence of a predual `X` such that `X* ≅ₗᵢ⋆ M`. |
| `VonNeumannAlgebra` | `structure (H : Type u) [...] extends StarSubalgebra ℂ (H →L[ℂ] H)` | Concrete von Neumann algebra: a *-closed subalgebra of bounded operators on a Hilbert space `H`, equal to its double commutant. Bundled over `H`. |
| `centralizer_centralizer'` | `Set.centralizer (Set.centralizer carrier) = carrier` | Defining property of `VonNeumannAlgebra`: algebra equals its double centralizer. |
| `commutant` | `def (S : VonNeumannAlgebra H) : VonNeumannAlgebra H` | Commutant of a von Neumann algebra, again a von Neumann algebra. |
| `commutant_commutant` | `S.commutant.commutant = S` | Double commutant theorem for von Neumann algebras (proven in this file). |
| `mem_commutant_iff` | `z ∈ S.commutant ↔ ∀ g ∈ S, g * z = z * g` | Characterization of membership in the commutant. |
| `instSetLike`, `instStarMemClass`, `instSubringClass` | `SetLike`, `StarMemClass`, `SubringClass` instances | Enable set-like reasoning and membership tests for elements of `VonNeumannAlgebra`. |

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `centralizer_`: for double centralizer / commutant operations (`centralizer_centralizer`, `centralizer_centralizer'`).
  - `commutant`: used for the commutant construction and its properties (`commutant`, `coe_commutant`, `mem_commutant_iff`, `commutant_commutant`).
  - `coe_`: for coercion lemmas (`coe_toStarSubalgebra`, `coe_mk`, `coe_commutant`).
  - `mem_`: for membership equivalences (`mem_carrier`, `mem_commutant_iff`).
  - `ext`: for extensionality lemmas (`ext`).
  - `toStarSubalgebra`: for forgetting the von Neumann algebra structure to a `StarSubalgebra`.

#### **3. Tactic Stack**

- **Frequently used tactics**:
  - `simp` / `simp_rw`: heavily used for simplifying coercions and definitions (e.g., `simp [commutant]`, `simp` in `commutant_commutant`).
  - `rw`: for rewriting using lemmas like `SetLike.mem_coe`.
  - `obtain` / `cases`: in `coe_injective'`, to unpack bundled structure.
  - `congr`: to finish equality proofs after unpacking structure.
  - `ext`: extensionality for von Neumann algebras.
  - ` rfl`: many `simp` lemmas are definitional (`rfl`).

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs are *definitional* or rely on `simp`-based reasoning about bundled structures.
  - For `commutant_commutant`, the proof uses `SetLike.coe_injective` and `simp` to reduce to a set equality.
  - The `ext` lemma uses `SetLike.ext`, reflecting the set-like nature of the coercion.
  - The `instSetLike` instance uses a long `obtain` + `cases` to enforce injectivity of coercion.

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.CStarAlgebra.ContinuousLinearMap`: for `CStarAlgebra`, `H →L[ℂ] H`.
  - `Mathlib.Analysis.Normed.Module.Dual`: for `NormedSpace.Dual`, used in `WStarAlgebra.exists_predual`.

- **Scope**:
  - Focuses on *foundational definitions* of von Neumann algebras (abstract and concrete).
  - Does *not* yet include the equivalence between the two definitions or the double commutant theorem (as a theorem, only the equivalence of concrete definition with double centralizer is formalized).
  - The `VonNeumannAlgebra` structure is parameterized over a Hilbert space `H`, and is a *bundled structure*, not a typeclass on the underlying type.

---

Let me know if you'd like a formalization plan for the double commutant theorem or the equivalence between `WStarAlgebra` and `VonNeumannAlgebra`.