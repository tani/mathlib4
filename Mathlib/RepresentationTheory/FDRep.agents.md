### Technical Metadata Brief: `FDRep k G` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FDRep k G` | `abbrev FDRep (k G : Type u) [Field k] [Monoid G] := Action (FGModuleCat k) (MonCat.of G)` | Defines the category of finite-dimensional $k$-linear representations of a monoid $G$. |
| `ρ V` | `G →* V →ₗ[k] V` | The action homomorphism of $G$ on a representation $V$. |
| `of ρ` | `{V : Type u} [AddCommGroup V] [Module k V] [FiniteDimensional k V] → Representation k G V → FDRep k G` | Bundles an unbundled representation into `FDRep`. |
| `isoToLinearEquiv i` | `V ≅ W → V ≃ₗ[k] W` | Extracts the underlying linear isomorphism from an isomorphism of representations. |
| `forget₂HomLinearEquiv X Y` | `((forget₂ ...).obj X ⟶ ... ) ≃ₗ[k] X ⟶ Y` | Shows the forgetful functor to `Rep k G` preserves hom-spaces linearly. |
| `finrank_hom_simple_simple` | `[IsAlgClosed k] → [Simple V] → [Simple W] → finrank k (V ⟶ W) = if Nonempty (V ≅ W) then 1 else 0` | **Schur’s Lemma**: dimension of $\mathrm{Hom}$-space between simples is 0 or 1. |
| `dualTensorIsoLinHom ρV W` | `FDRep.of ρV.dual ⊗ W ≅ FDRep.of (linHom ρV W.ρ)` | Isomorphism of representations induced by `dualTensorHomEquiv`, linking dual tensor and internal hom. |
| `RightRigidCategory FDRep k G` | Instance (when `G` is a group) | Establishes rigidity (duals exist) for `FDRep k G`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Not used here, but common elsewhere (e.g., `is_simple`).
  - `finrank_`: For finite-dimensional rank (e.g., `finrank_hom_simple_simple`).
  - `dual_`, `linHom_`: Related to dual representations and internal homs.
  - `forget₂_`: Forgetting structure along a 2-functor (e.g., `forget₂_ρ`, `forget₂HomLinearEquiv`).
  - `hom_`: For hom-space related constructions (e.g., `hom_action_ρ`).
- **Suffixes**:
  - `_aux`: For auxiliary definitions (e.g., `dualTensorIsoLinHomAux`).
  - `_iso`: For isomorphisms (e.g., `dualTensorIsoLinHom`, `isoToLinearEquiv`).
  - `_of`: For constructing bundled objects from unbundled data (e.g., `of`, `dualTensorIsoLinHom`).
- **Other patterns**:
  - `conj_ρ`: Conjugation action of isomorphisms on representation maps.
  - `endMulEquiv_*`: Relating monoid homs to endomorphism rings.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and instance searches:

| Tactic | Usage |
|--------|-------|
| `infer_instance` | To synthesize typeclass instances (e.g., `Preadditive`, `HasFiniteLimits`, `RightRigidCategory`). |
| `rw`, `erw` | Rewriting using lemmas (e.g., `rw [Iso.conj_apply]`, `erw [FDRep.isoToLinearEquiv]`). |
| `ext` | Extensionality for homomorphisms, linear maps, or functions (e.g., `ext g v`, `ext : 1`). |
| `rfl` | Reflexivity for definitional equalities (e.g., `rfl` in `simp`-like lemmas). |
| `change` | To adjust the goal to match a known instance (e.g., `change Module k ...`). |
| `exact` | To finish a goal with a given term (e.g., `exact (i.hom.comm g).symm`). |
| `simp_rw` | Not explicitly used, but `rw` + `simp`-like behavior is common. |
| `change RightRigidCategory ...; infer_instance` | Pattern for lifting rigid structure via equivalence. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Instance synthesis**: Most structural properties (e.g., `Preadditive`, `HasFiniteLimits`, `RightRigidCategory`) are derived via `infer_instance`, relying on upstream lemmas in `Mathlib`.
  - **Isomorphism constructions**: Typically involve:
    1. Defining an underlying linear isomorphism (`dualTensorHomEquiv`, `dualTensorHom`).
    2. Proving equivariance under the group action (`dualTensorHom_comm`).
    3. Using `Action.mkIso` to lift to `FDRep`.
  - **Schur’s Lemma**: Uses `CategoryTheory.finrank_hom_simple_simple`, which is imported from `Mathlib.CategoryTheory.Preadditive.Schur`.
  - **Forgetful functor lemmas**: Prove equality on underlying homs via `ext` and `rfl`, leveraging definitional equality of coercion paths.

- **Inductive/structural reasoning**: Minimal; mostly algebraic manipulation of homomorphisms and linear maps.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Category.FGModuleCat.Limits` | Provides finite limits, kernels, etc., for finitely generated modules over a field. |
| `Mathlib.CategoryTheory.Monoidal.Rigid.Braided` | Supplies rigid/monoidal structure for braided categories (used for `RightRigidCategory`). |
| `Mathlib.CategoryTheory.Preadditive.Schur` | Contains Schur’s Lemma (`finrank_hom_simple_simple`). |
| `Mathlib.RepresentationTheory.Basic` | Basic representation theory definitions (e.g., `Representation`, `linHom`, `dual`). |
| `Mathlib.RepresentationTheory.Rep` | Defines `Rep k G`, the unbundled category of representations. |

**Scope & universe usage**:
- Universe `u` declared for type parameters.
- Uses `MonCat.of G` (monoid as discrete category) and `Grp.of G` (group version).
- `Action` is the main construction: `Action C D` = functors $D \to C$.

---

### Summary

This file formalizes the **category of finite-dimensional representations** of a monoid/group over a field, establishing:
- Its structure as a **preadditive**, **$k$-linear**, **monoidal**, and **rigid** category (when $G$ is a group),
- **Finite limits** (including kernels),
- **Schur’s Lemma** for simple representations,
- An explicit **dual-tensor/hom adjunction** isomorphism.

It leverages existing infrastructure in `Mathlib` for module categories, actions, and monoidal categories, minimizing ad-hoc proofs by reusing general categorical results.