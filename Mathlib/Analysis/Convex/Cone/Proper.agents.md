Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Metadata Brief: `ProperCone` in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ProperCone` | `structure ProperCone (𝕜 : Type*) (E : Type*) [...] extends Submodule {c : 𝕜 // 0 ≤ c} E` | A *pointed* cone (submodule over nonnegative scalars) that is *closed* in the topology. Used to model cones in conic programming. |
| `toPointedCone` | `ProperCone 𝕜 E → PointedCone 𝕜 E` | Forgets the `isClosed'` condition; casts a proper cone to a pointed cone. |
| `positive` | `ProperCone 𝕜 E` | The cone of nonnegative elements in an ordered module. |
| `map` | `(f : E →L[ℝ] F) → ProperCone ℝ E → ProperCone ℝ F` | Pushforward of a proper cone along a continuous linear map (closure of image). |
| `dual` | `ProperCone ℝ E → ProperCone ℝ E` | Inner dual cone: `{ y | ∀ x ∈ K, ⟨x, y⟩ ≥ 0 }`. |
| `comap` | `(f : E →L[ℝ] F) → ProperCone ℝ F → ProperCone ℝ E` | Pullback of a proper cone along a continuous linear map (preimage). |
| `dual_dual` | `K.dual.dual = K` | Double dual of a proper cone equals itself (key property for duality theory). |
| `hyperplane_separation` | `b ∈ K.map f ↔ ∀ y, adjoint f y ∈ K.dual → 0 ≤ ⟨y, b⟩` | Equivalence form of Farkas’ lemma: membership in image cone iff nonnegative pairing with all dual vectors pulled back via adjoint. |
| `hyperplane_separation_of_nmem` | `b ∉ K.map f → ∃ y, adjoint f y ∈ K.dual ∧ ⟨y, b⟩ < 0` | Separating hyperplane version: if `b` not in image cone, there exists a dual vector separating it strictly. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isClosed'`: internal field name for closedness (prime suffix for internal field).
  - `mem_`: membership lemmas (e.g., `mem_positive`, `mem_dual`, `mem_comap`).
  - `coe_`: coercion lemmas (e.g., `coe_map`, `coe_dual`, `coe_comap`).
  - `pointed_`: properties about pointedness (e.g., `pointed_zero`).
- **Suffixes**:
  - `_injective`: injectivity proofs (e.g., `toPointedCone_injective`).
  - `_inhabited`, `_zero`: instance names for `Inhabited`/`Zero`.
- **Adjectives**:
  - `positive`, `dual`, `comap`, `map`: standard cone operations.
- **Adjoint-related**:
  - `adjoint_inner_right`, `real_inner_comm`: inner product and adjoint lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: for automated reasoning (e.g., in `mem_dual`).
- `simp_rw`: for rewriting with simplification rules (dominant in proofs).
- `intro`, `contrapose!`, `refine`, `exact`, `apply`: standard natural deduction.
- `rw`, `congr`, `ext`: equality reasoning.
- `cases`, `obtain`, `have`: destructuring and construction.
- `set`, `let`: local definitions.
- `norm_cast`, `simp`: normalization and simplification.
- `ge_of_tendsto'`, `seqContinuous`: analysis-specific tactics for limits.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *biconditional* (`↔`) structure: prove both directions separately.
  - For `hyperplane_separation`, the forward direction uses:
    - Sequential characterization of closure (`mem_closure_iff_seq_limit`).
    - Continuity of inner product.
    - Algebraic manipulation of inner products (`real_inner_comm`, `adjoint_inner_right`).
  - The reverse direction uses:
    - Contrapositive + separation theorem (`hyperplane_separation_of_nmem`).
    - Construction of separating hyperplane via `ConvexCone.hyperplane_separation_of_nonempty_of_isClosed_of_nmem`.
- **Induction/Recursion**: Not used here (focus is on topological/conic properties).
- **Key logical pattern**:
  > *Membership in image cone ⇔ nonnegativity against all dual vectors pulled back via adjoint*  
  This is the core logical equivalence underlying Farkas’ lemma.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.Convex.Cone.Closure`: closure of convex cones, separation theorems.
  - `Mathlib.Analysis.InnerProductSpace.Adjoint`: adjoint operators, inner product properties.
- **Assumed typeclass instances**:
  - `[OrderedSemiring 𝕜]`, `[Module 𝕜 E]`, `[TopologicalSpace E]`, `[T1Space E]`, `[OrderClosedTopology E]`, `[InnerProductSpace ℝ E]`, `[CompleteSpace E]`.
- **Domain scope**:
  - Real inner product spaces (mostly `ℝ`-modules).
  - Proper cones as closed, pointed submodules over nonnegative scalars.
  - Applications to conic programming duality (Farkas’ lemma, dual cones, separation).

---

#### **6. Future Work (from TODO)**

- Introduce `ConvexConeClass` to generalize `SetLike` instances.
- Define primal/dual conic programs and prove weak/strong duality.
- Define linear programs and derive LP duality as a corollary.
- Improve reference (seek textbook over lecture notes).

--- 

Let me know if you'd like a diagram of the category of proper cones with `map`/`comap`, or a formalization of conic programs built on top of this.