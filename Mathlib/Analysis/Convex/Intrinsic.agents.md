Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Intrinsic Topological Operations in Normed Additive Torsors**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `intrinsicInterior` | `Set P → Set P` | Defines the interior of a set `s` *relative to its affine span*; i.e., `coe '' interior (coe ⁻¹' s : Set (affineSpan 𝕜 s))`. |
| `intrinsicFrontier` | `Set P → Set P` | Defines the frontier (boundary) of `s` relative to its affine span. |
| `intrinsicClosure` | `Set P → Set P` | Defines the closure of `s` relative to its affine span. |
| `mem_intrinsicInterior` | `x ∈ intrinsicInterior 𝕜 s ↔ ∃ y, y ∈ interior ((↑) ⁻¹' s) ∧ ↑y = x` | Characterizes membership in intrinsic interior via preimage under inclusion. |
| `mem_intrinsicFrontier`, `mem_intrinsicClosure` | Analogous to above | Membership characterizations for frontier and closure. |
| `intrinsicInterior_subset` | `intrinsicInterior 𝕜 s ⊆ s` | Intrinsic interior is always contained in the original set. |
| `intrinsicClosure_mono` | `s ⊆ t ⇒ intrinsicClosure 𝕜 s ⊆ intrinsicClosure 𝕜 t` | Monotonicity of intrinsic closure. |
| `interior_subset_intrinsicInterior` | `interior s ⊆ intrinsicInterior 𝕜 s` | Topological interior is contained in intrinsic interior. |
| `intrinsicClosure_subset_closure` | `intrinsicClosure 𝕜 s ⊆ closure s` | Intrinsic closure is contained in topological closure. |
| `intrinsicFrontier_subset_frontier` | `intrinsicFrontier 𝕜 s ⊆ frontier s` | Intrinsic frontier is contained in topological frontier. |
| `intrinsicClosure_diff_intrinsicFrontier` | `intrinsicClosure 𝕜 s \ intrinsicFrontier 𝕜 s = intrinsicInterior 𝕜 s` | Decomposition of intrinsic closure into interior and frontier. |
| `intrinsicClosure_idem` | `intrinsicClosure 𝕜 (intrinsicClosure 𝕜 s) = intrinsicClosure 𝕜 s` | Idempotency of intrinsic closure. |
| `image_intrinsicInterior`, `image_intrinsicFrontier`, `image_intrinsicClosure` | Commutation with affine isometries | `φ '' intrinsicOp 𝕜 s = intrinsicOp 𝕜 (φ '' s)` for `φ : P →ᵃⁱ Q`. |
| `Set.Nonempty.intrinsicInterior` | `Convex ℝ s → s.Nonempty → (intrinsicInterior ℝ s).Nonempty` | Nonemptiness of intrinsic interior for nonempty convex sets (finite-dimensional case). |
| `closure_diff_intrinsicInterior`, `closure_diff_intrinsicFrontier` | Simplified decompositions when `intrinsicClosure = closure` | Holds in finite-dimensional normed spaces over `ℝ`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `intrinsic_`: Indicates relative (affine-span-based) version of standard topological notions.
- **Suffixes**:
  - `_subset`, `_mono`, `_idem`, `_diff`, `_union`: Describe algebraic/set-theoretic properties.
  - `_eq_`, `_iff_`: Used for equality or biconditional characterizations.
- **Function names**:
  - `mem_`, `image_`, `preimage_`: Standard for membership/image/preimage lemmas.
  - `aux`, `of_`, `intrinsic_`: Descriptive naming for auxiliary or derived facts.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: For simplifying definitions and rewriting using `@[simp]` lemmas.
- `rw`: Rewriting with equalities and equivalences.
- `exact`, `refine`, `intro`, `cases`: Basic proof construction.
- `ext`: Extensionality for set equality.
- `image_subset_iff.2`, `subset_iff.2`: Standard set inclusion reasoning.
- `continuous_*`, `isClosed_*`, `isometryEquivMap`, `AffineIsometry.*`: Leveraging structure-specific lemmas.
- `aux` helper lemma uses `image_symm`, `image_interior`, `image_nonempty`.
- `by_contra` in finite-dimensional closure proof.

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a pattern: unfold definitions → reduce via `simp`/`rw` → apply continuity/closure properties → use injectivity/surjectivity of inclusions or isometries.
  - For `image_intrinsic*`, the key idea is:
    - Reduce to nonempty case.
    - Use `isometryEquivMap` to identify affine spans.
    - Transport topological operations via homeomorphism (`f.symm.image_interior`, etc.).
  - For `Set.Nonempty.intrinsicInterior`:
    - Translate set to pass through origin via `constVSub`.
    - Use convexity and finite-dimensionality to reduce to interior nonemptiness in vector space.
    - Apply known result: convex set with full affine span has nonempty interior.

#### **5. Imports & Scope**

- **Primary import**:
  - `Mathlib.Analysis.Normed.Affine.AddTorsorBases`: Provides foundational structure for normed additive torsors and affine subspaces.
- **Scope assumptions**:
  - `𝕜`: Ring / NormedField / NontriviallyNormedField / `ℝ`
  - `V`, `W`: Normed vector spaces over `𝕜`
  - `P`, `Q`: Normed additive torsors over `V`, `W`
  - `s`, `t`: Subsets of `P`
- **Key structures used**:
  - `AffineSubspace`, `TopologicalSpace`, `AddTorsor`, `NormedAddTorsor`, `AffineIsometry`, `Convex`

---

This summary captures the core formal content, structure, and methodology of the file, suitable for building a domain-specific AI agent focused on convex geometry and affine topology in Lean 4.