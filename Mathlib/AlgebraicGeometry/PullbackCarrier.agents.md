Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Underlying Topological Space of Scheme Fiber Products**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Triplet f g` | Structure representing a triple `(x, y, s)` with `f x = s = g y`. Used to index points in the fiber product over a common base point. |
| `tensor T` | `CommRingCat`: For a triplet `T = (x, y, s)`, this is the tensor product `κ(x) ⊗[κ(s)] κ(y)` of residue fields. |
| `tensorInl T`, `tensorInr T` | Morphisms `κ(x) → T.tensor`, `κ(y) → T.tensor`, induced by the universal property of pushouts. |
| `SpecTensorTo T` | Morphism `Spec(T.tensor) → pullback f g`, constructed via the universal property of pullbacks using `Spec.map tensorInl` and `Spec.map tensorInr`. |
| `ofPoint t` | Triplet associated to a point `t : pullback f g`, given by projections to `X`, `Y`, and `S`. |
| `ofPointTensor t` | Canonical ring map `T.tensor → κ(t)` for `t : pullback f g`, induced by the universal property of pushouts. |
| `SpecOfPoint t` | Point in `Spec(T.tensor)` corresponding to the unique point in `Spec(κ(s))` mapping into `Spec(T.tensor)`. |
| `carrierEquiv` | **Main theorem**: Equivalence `↑(pullback f g) ≃ Σ T : Triplet f g, Spec(T.tensor)`. Describes points of the fiber product as pairs `(T, p)` where `T` is a triplet and `p` is a prime ideal in the tensor product of residue fields. |
| `Triplet.exists_preimage T` | For any triplet `T`, there exists a point `t : pullback f g` projecting to `x` and `y`. |
| `exists_preimage_pullback x y h` | Unpacked version: For `x : X`, `y : Y` with `f x = g y`, there exists `z : pullback f g` with `(fst z = x) ∧ (snd z = y)`. |
| `range_fst`, `range_snd`, `range_fst_comp`, `range_snd_comp` | Descriptions of images of `pullback.fst`, `pullback.snd`, and their compositions with `f`, `g`. |
| `range_map` | Description of image of a map between fiber products induced by morphisms `i₁, i₂, i₃`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `tensor*`: Related to the tensor product of residue fields.
  - `Spec*`: Related to `Spec` of rings/ring maps.
  - `ofPoint*`: Derived from a point in the pullback.
  - `carrierEquiv*`: Related to the main equivalence describing the underlying space.
- **Suffixes**:
  - `Congr`: For isomorphisms induced by propositional equalities (e.g., `tensorCongr`).
  - `inv`, `hom`, `symm`: Standard categorical notation for inverses, homs, and symmetries.
  - `assoc`: For reassociation lemmas (e.g., `ofPointTensor_SpecTensorTo_assoc`).
- **`mk'`**: Constructor for triplets when `f x = g y` is given explicitly.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `aesop`, `simp_rw`, `cases`, `subst`, `ext`
- **Category-theoretic helpers**:
  - `pushout.desc`, `pushout.inl`, `pushout.inr`
  - `pullback.lift`, `pullback.fst`, `pullback.snd`, `pullback.condition`
  - `Iso.hom_inv_id_assoc`, `cancel_mono`, `Category.assoc`
- **Scheme-specific lemmas**:
  - `Scheme.comp_base_apply`, `Scheme.Hom.Spec_map_residueFieldMap_fromSpecResidueField`
  - `residueFieldCongr_*`, `fromSpecResidueField`, `residueFieldMap_*`

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction / case analysis** on equalities (e.g., `Triplet.ext`, `ofPoint_SpecTensorTo`).
  - **Universal properties** (pushout, pullback) used to construct morphisms and verify commutativity.
  - **Equivalence proofs** via `carrierEquiv_eq_iff` and `Σ`-type reasoning.
  - **Surjectivity arguments** via `Triplet.exists_preimage` and `mk'`.
- **Common pattern**:
  - Construct a candidate object/morphism using universal properties.
  - Verify projections or base maps match using `simp` and `rw`.
  - Use `hom_ext` or `PrimeSpectrum.ext` to conclude equality of morphisms/points.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Algebra.Category.Ring.LinearAlgebra`: For tensor products and pushouts in `CommRingCat`.
  - `Mathlib.AlgebraicGeometry.ResidueField`: For residue fields and maps between them.
- **Scope**:
  - Works in a single universe `u`.
  - Focuses on **topological** aspects of fiber products of schemes (not sheaves or structure sheaves).
  - Uses categorical language (`CategoryTheory`, `Limits`, `IsLocalRing`).

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for extending this to sheaves.