### Technical Metadata Brief: Maschke’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `conjugate (g : G)` | `W →ₗ[k] V` | Defines the *conjugate* of a `k`-linear map `π : W →ₗ[k] V` by group element `g`, via `g⁻¹ • π(g • -)`. |
| `sumOfConjugates` | `W →ₗ[k] V` | Sum over all `g ∈ G` of `conjugate π g`, a `k`-linear map. |
| `sumOfConjugatesEquivariant` | `W →ₗ[MonoidAlgebra k G] V` | Proves `sumOfConjugates` is `MonoidAlgebra k G`-linear (i.e., `G`-equivariant), using commutativity and bijectivity of right-multiplication. |
| `equivariantProjection` | `W →ₗ[MonoidAlgebra k G] V` | The *averaged retraction*: `1/|G| • sumOfConjugatesEquivariant`. Central construction in Maschke’s proof. |
| `equivariantProjection_condition` | `∀ v, equivariantProjection (i v) = v` | Shows `equivariantProjection` is a retraction of `i`, assuming `|G|` invertible in `k`. |
| `exists_leftInverse_of_injective` | `(f : V →ₗ[A] W), ker f = ⊥ ⇒ ∃ g, g.comp f = id` | Key corollary: injective module maps over `MonoidAlgebra k G` split when `|G|` is invertible. |
| `exists_isCompl` | `∀ p, ∃ q, IsCompl p q` | Every submodule has a complement ⇒ semisimplicity of `MonoidAlgebra k G`-modules. |
| `complementedLattice` | `ComplementedLattice (Submodule (MonoidAlgebra k G) V)` | Formalizes that the lattice of submodules is complemented (i.e., every element has a complement). |
| `IsSemisimpleRing (AddMonoidAlgebra k G)` | Instance | Concludes that the group algebra of a finite *abelian* group is semisimple under the same invertibility condition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `conjugate_`: action of group elements on linear maps.
  - `sumOfConjugates_`: aggregation over group elements.
  - `equivariantProjection_`: final averaged projection.
  - `exists_`: existential constructions (e.g., splitting, complements).
- **Suffixes**:
  - `_apply`: application lemmas (e.g., `conjugate_apply`, `equivariantProjection_apply`).
  - `_condition`: key property (e.g., retraction condition).
  - `_equivariant`: equivariance under group action.
- **Other**:
  - `subtype`, `restrictScalars`, `compHom`, `isCompl_of_proj`: standard module/submodule terminology.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw` / `simp only`: for rewriting definitions and simplifying expressions involving `•`, `sum`, `single`, `mul`, `inv`.
- `simp only [Finset.sum_const, Finset.card_univ]`: arithmetic on finite sums over groups.
- `refine` + `simp only [...]`: to construct proofs by applying lemmas and discharging goals.
- `exact`, `intro`, `cases`: basic proof structure.
- `ring`, `aesop`: likely used implicitly in algebraic simplifications (e.g., verifying `inv_mul_cancel`, `single_mul_single`).
- `convert`, `ext`: for extensionality (e.g., `DFunLike.ext`).

---

#### **4. Proof Logic Flow**

- **Core idea**: Given a `k`-linear retraction `π` of an inclusion `i`, construct a `G`-equivariant retraction via averaging:
  $$
  v \mapsto \frac{1}{|G|} \sum_{g \in G} g^{-1} \cdot \pi(g \cdot v)
  $$
- **Steps**:
  1. Define `conjugate π g` as `g⁻¹ • π(g • -)`.
  2. Show `conjugate π g ∘ i = id_V` for all `g`, using `i`’s equivariance and `π ∘ i = id`.
  3. Sum over `G` to get `sumOfConjugates`, still a retraction.
  4. Prove `sumOfConjugates` is `G`-equivariant (i.e., `MonoidAlgebra k G`-linear) using:
     - Bijectivity of `x ↦ x·g` (to reindex sums),
     - Commutativity of `k` and action compatibility.
  5. Divide by `|G|` (using `IsUnit` assumption) to get `equivariantProjection`.
  6. Apply to inclusion `i` to get a *module-theoretic* retraction.
  7. Use this to split injective maps (`exists_leftInverse_of_injective`).
  8. Deduce existence of complements (`exists_isCompl`) and hence semisimplicity.

- **Induction**: Not used directly; relies on finite sums and group-theoretic bijections.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.MonoidAlgebra.Basic`: group algebra structure.
  - `Mathlib.LinearAlgebra.Basis.VectorSpace`: vector space / basis tools (for retraction existence over fields).
  - `Mathlib.RingTheory.SimpleModule`: semisimplicity and module decomposition.

- **Scope**:
  - General setting: `k` a commutative ring, `G` a finite group, modules over `MonoidAlgebra k G`.
  - Key assumption: `IsUnit (Fintype.card G : k)` (equivalently, `¬(ringChar k ∣ Fintype.card G)`).
  - Final results over fields (`Field k`) with `NeZero (Fintype.card G : k)`.

- **Future work hint**: Extending to full semisimplicity (every finite-dimensional rep decomposes into irreducibles) is straightforward from `complementedLattice`.

--- 

Let me know if you'd like a diagram of the key maps or a formalized statement of Maschke’s theorem in the style of Mathlib’s `theorem maschke`.