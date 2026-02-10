### Technical Metadata Brief: `e-transforms` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mulDysonETransform` | `α → (Finset α × Finset α) → Finset α × Finset α` | Dyson e-transform: `(s, t) ↦ (s ∪ e • t, t ∩ e⁻¹ • s)`; reduces product set while preserving sum of cardinalities. |
| `mulDysonETransform.subset` | `(mulDysonETransform e x).1 * (mulDysonETransform e x).2 ⊆ x.1 * x.2` | Shows product set non-increases under Dyson transform. |
| `mulDysonETransform.card` | `card(s₁) + card(t₁) = card(s) + card(t)` | Cardinality sum invariant under Dyson transform. |
| `mulDysonETransform_idem` | `mulDysonETransform e (mulDysonETransform e x) = mulDysonETransform e x` | Idempotence of Dyson transform. |
| `mulDysonETransform.smul_finset_snd_subset_fst` | `e • t₁ ⊆ s₁` | Key structural property: scaled second component lies in first. |
| `mulETransformLeft` | `(s, t) ↦ (s ∩ e • s, t ∪ e⁻¹ • t)` | Left e-transform; reduces product set. |
| `mulETransformRight` | `(s, t) ↦ (s ∪ e • s, t ∩ e⁻¹ • t)` | Right e-transform; also reduces product set. |
| `mulETransformLeft.fst_mul_snd_subset` / `mulETransformRight.fst_mul_snd_subset` | Product sets shrink under both transforms. |
| `mulETransformLeft.card`, `mulETransformRight.card` | Relate sums of cardinalities of transformed components to original. |
| `MulETransform.card` | Total cardinality sum preserved across *both* transforms combined: `card(L(x)) + card(R(x)) = 2·card(x)` | Enables averaging arguments (e.g., one increases, one decreases). |
| `mulETransformLeft_inv`, `mulETransformRight_inv` | Relate transforms at `e` and `e⁻¹` via swap. | Symmetry under inversion. |

> **Note**: Additive analogues are provided via `to_additive`, e.g., `addDysonETransform`, `addETransformLeft`, etc., with `+ᵥ` for additive action and `-e` instead of `e⁻¹`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mul_`: Multiplicative version (vs. additive `add_` via `to_additive`).
  - `ETransform`: Generic e-transform family.
  - `DysonETransform`: Specific named transform.
- **Suffixes**:
  - `Left` / `Right`: Distinguish the two complementary transforms.
  - `idem`: Idempotent property.
  - `card`: Cardinality-related lemmas.
  - `subset`: Subset relations on product/sum sets.
- **Variables**:
  - `e : α`: Transform parameter (group element).
  - `x : Finset α × Finset α`: Input pair of finite sets.
  - `op e`: Used internally to handle multiplicative vs additive uniformly (via `MulOpposite`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw`: Rewriting using lemmas like `smul_finset_inter`, `inv_smul_smul`, `card_smul_finset`.
- `simp`: Especially with `to_additive (attr := simp)` attributes.
- `exact`, `refine`: For subset proofs (e.g., `inter_subset_union`).
- `ext : 1`: Extensionality for pairs (used in `mulDysonETransform_idem`).
- `dsimp`: Simplify definitions before rewriting.
- `rw [mul_add, two_mul]`: Arithmetic simplifications in cardinality proofs.

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs often proceed by unfolding definitions (`dsimp`), then applying algebraic identities (e.g., `smul_inv_smul`, `inv_smul_smul`).
  - Subset proofs use standard lattice properties (`inter_subset_union`, `union_subset`).
  - Cardinality proofs rely on:
    - `card_smul_finset`: Invariance under group action.
    - `card_union_add_card_inter` / `card_inter_add_card_union`: To relate intersections/unions to sums.
    - `two_mul`, `mul_add`: Arithmetic normalization.
- **Key reasoning pattern**:
  - Show *invariance* (e.g., Dyson transform preserves `|s| + |t|`).
  - Show *monotonicity* (e.g., product set shrinks).
  - Use combinatorial lemmas like `le_or_lt_of_add_le_add` (mentioned in docstring) to deduce existence of a “good” transform.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Algebra.Group.Pointwise.Finset.Basic
  ```
  - Provides:
    - `Pointwise` namespace (`•`, `⁻¹ •`, `op`, etc.).
    - `Finset` operations: `union`, `inter`, `smul_finset`, `card`.
    - Basic group-theoretic lemmas for finite sets.

- **No additional heavy imports** — relies on foundational algebra and finset infrastructure.

---

#### **6. Domain Context**

- **Mathematical area**: Additive combinatorics (sumset estimates, e.g., Cauchy-Davenport, Roth numbers).
- **Use case**: Internal tool for proofs involving set transformations that control growth of sum/product sets while preserving or controlling size invariants.
- **Notable applications** (per docstring):
  - Sanders’ bound on Roth numbers.
  - DeVos’ proof of Cauchy-Davenport.

--- 

Let me know if you'd like a formalized summary of the *Dyson e-transform invariance* (currently marked as TODO), or a tactic-level trace of one of the proofs.