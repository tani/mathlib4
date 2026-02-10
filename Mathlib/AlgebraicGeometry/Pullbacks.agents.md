Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the formalization of **fibred products (pullbacks) of schemes** via open cover gluing.

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `v 𝒰 f g i j` | `Scheme` — Intersection of `Uᵢ ×[Z] Y` and `Uⱼ ×[Z] Y`, defined as `(Uᵢ ×[Z] Y) ×[X] Uⱼ`. |
| `t 𝒰 f g i j` | `v i j ⟶ v j i` — Canonical symmetry/associativity isomorphism between double intersections. |
| `t' 𝒰 f g i j k` | `pullback (fV i j) (fV i k) ⟶ pullback (fV j k) (fV j i)` — Transition map for gluing triple intersections. |
| `gluing 𝒰 f g` | `Scheme.GlueData` — Data for gluing the pullback over an open cover `𝒰`, using `v`, `t`, `t'`. |
| `gluedIsLimit 𝒰 f g` | `IsLimit (PullbackCone.mk _ _ (p_comm))` — Shows the glued object is the pullback (i.e., universal cone). |
| `hasPullback_of_cover` | `HasPullback f g` — If pullbacks exist over an open cover, then the global pullback exists. |
| `affine_hasPullback` | `HasPullback (Spec A ⟶ Spec C) (Spec B ⟶ Spec C)` — Pullback of affine schemes exists (via tensor product). |
| `pullbackP1Iso i` | `pullback (p1) (𝒰.map i) ≅ pullback (𝒰.map i ≫ f) g` — Preimage of `Uᵢ` in the glued pullback is `Uᵢ ×[Z] Y`. |
| `openCoverOfLeft 𝒰 f g` | `OpenCover (pullback f g)` — Pullback covered by `Uᵢ ×[Z] Y`. |
| `openCoverOfRight 𝒰 f g` | `OpenCover (pullback f g)` — Pullback covered by `X ×[Z] Vⱼ`. |
| `openCoverOfLeftRight 𝒰X 𝒰Y f g` | `OpenCover (pullback f g)` — Pullback covered by `Uᵢ ×[Z] Vⱼ`. |
| `openCoverOfBase 𝒰 f g` | `OpenCover (pullback f g)` — Pullback covered by `Xᵢ ×[Zᵢ] Yᵢ`, where `Xᵢ = X ×[Z] Zᵢ`, etc. |
| `diagonalCover f 𝒰 𝒱` | `OpenCover (pullback.diagonalObj f)` — Cover of the diagonal using base and refinement covers. |
| `pullbackSpecIso` | `pullback (Spec.map f) (Spec.map g) ≅ Spec (S ⊗[R] T)` — Pullback of affines is `Spec` of tensor product. |

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `v`, `t`, `t'`: Standard notation for gluing data (like Čech cocycle data).
  - `gluing`: Gluing construction.
  - `pullbackP1Iso`, `pullbackFstιToV`: Maps involving pullbacks and projections.
  - `openCoverOf*`: Covers of pullbacks induced from covers of factors/base.
  - `diagonal*`: Related to diagonal morphism and its refinements.

- **Suffixes**:
  - `Iso`: Isomorphism.
  - `hom`, `inv`: Component maps of isomorphisms.
  - `assoc`, `symm`: Associativity/symmetry of pullbacks.
  - `fst`, `snd`: First/second projection maps.

- **Variables**:
  - `𝒰`, `𝒱`: Open covers.
  - `i, j, k`: Indices in cover category `𝒰.J`.
  - `s`: A pullback cone.

---

### ⚙️ **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using many `@[simp]` lemmas (e.g., `t_fst_fst`, `pullback.condition`, `gluing_ι`). |
| `rw [...]` | Rewrite using definitions or lemmas (e.g., `← pullback.condition`, `Category.assoc`). |
| `apply pullback.hom_ext` | Prove equality of pullback morphisms by checking compositions with `fst`/`snd`. |
| `congr 1` / `congr'` | Reduce goals by congruence (e.g., in `cocycle` proof). |
| `apply Multicoequalizer.hom_ext` | Prove equality of maps out of glued scheme. |
| `ext` / `ext : 1` | Extensionality for morphisms or components. |
| `simp_rw [...]` | Rewrite + simplify in one step (especially for nested compositions). |
| `have / refine / fapply` | Construct intermediate objects/morphisms. |
| `apply Iso.trans_hom`, `Iso.refl_hom`, etc. | Work with isomorphisms. |

> Note: `by tidy` is commented out due to timeout — suggests heavy automation is avoided in favor of explicit, structured proofs.

---

### 🧠 **Proof Logic**

The logical flow follows a **gluing strategy**:

1. **Local Construction**:
   - Assume pullbacks `Uᵢ ×[Z] Y` exist for each `Uᵢ` in an open cover `𝒰` of `X`.
   - Define double and triple intersections (`v`, `t`, `t'`) and verify cocycle conditions (`cocycle`).

2. **Gluing**:
   - Assemble `gluing 𝒰 f g : Scheme.GlueData`.
   - Use `Multicoequalizer` to define the glued scheme and projections `p1`, `p2`.

3. **Universal Property**:
   - Construct `gluedLift` for any cone `s` over `f, g`.
   - Show uniqueness via cover-based extensionality (`𝒰.pullbackCover s.fst.hom_ext`).

4. **Reduction to Affine Case**:
   - Use `hasPullback_of_cover` with `Z.affineCover` to reduce to affine schemes.
   - Affine case uses `Spec(S ⊗[R] T)`.

5. **Cover Refinements**:
   - Construct open covers of the pullback from covers of `X`, `Y`, or `Z`.
   - Use `openCoverOf*` lemmas to relate to standard constructions.

6. **Diagonal & Isomorphisms**:
   - For diagonal morphism `X → X ×ₛ X`, construct refined covers (`diagonalCover`) and show compatibility with diagonals on opens.

---

### 📦 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.Gluing` | Core gluing machinery (`Scheme.GlueData`, `Multicoequalizer`). |
| `Mathlib.CategoryTheory.Limits.Opposites` | Opposite categories, used in limits. |
| `Mathlib.AlgebraicGeometry.AffineScheme` | Affine schemes, `Spec`, `Γ`, etc. |
| `Mathlib.CategoryTheory.Limits.Shapes.Diagonal` | Diagonal morphisms and pullbacks. |

**Key algebraic geometry infrastructure used**:
- `Scheme`, `OpenCover`, `PullbackCone`, `IsLimit`, `IsPullback`.
- `Multicoequalizer` for gluing.
- `Spec`, `TensorProduct`, `Γ` (global sections) for affine reduction.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch of `cocycle`**, or a **formalization checklist** for similar constructions.