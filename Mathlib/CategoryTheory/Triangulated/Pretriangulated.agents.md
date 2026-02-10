Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pretriangulated` | `class` | Defines a pretriangulated category: a preadditive category with ℤ-shift and a class of *distinguished triangles* satisfying five axioms (isomorphism closure, contractible triangles, existence of cones, rotation equivalence, and morphism completion). |
| `distinguishedTriangles` | `Set (Triangle C)` | The class of distinguished triangles in a pretriangulated category. |
| `distTriang C` | Notation for `distinguishedTriangles C` | Shorthand for distinguished triangles. |
| `contractibleTriangle X` | `Triangle C` | Triangle `(X, X, 0, id, 0, 0)`; always distinguished. |
| `rotate`, `invRotate` | Triangle → Triangle | Rotation functors on triangles; rotation preserves distinguishedness. |
| `shortComplexOfDistTriangle T hT` | `ShortComplex C` | Constructs a 2-term short complex from a distinguished triangle. |
| `completeDistinguishedTriangleMorphism` | Function | Given a commutative square between two distinguished triangles, produces a full triangle morphism extending it. |
| `comp_distTriang_mor_zero₁₂`, `zero₂₃`, `zero₃₁` | Theorems | In any distinguished triangle, consecutive morphisms compose to zero. |
| `yoneda_exact₂`, `yoneda_exact₃`, `coyoneda_exact₁`, etc. | Theorems | Exactness properties of Hom-functors applied to distinguished triangles (analogues of long exact sequences in homology). |
| `mor₃_eq_zero_iff_epi₂`, `mono₂`, etc. | Theorems | Characterizations of zero morphisms ↔ (co)kernel properties in distinguished triangles. |
| `isZero₁_iff_isIso₂`, etc. | Theorems | Object is zero iff adjacent morphism is iso (e.g., `T.obj₁ = 0 ⇔ T.mor₂` iso). |
| `shift_distinguished` | Theorem | Shifts of distinguished triangles are distinguished. |
| `exists_iso_binaryBiproduct_of_distTriang` | Theorem | In a pretriangulated category, any distinguished triangle with `mor₃ = 0` splits as a binary biproduct. |
| `HasBinaryBiproducts`, `HasFiniteBiproducts` | Instances | Pretriangulated categories have all finite biproducts. |
| `isIso₂_of_isIso₁₃`, `isIso₃_of_isIso₁₂`, `isIso₁_of_isIso₂₃` | Theorems | If two legs of a triangle morphism are isos, so is the third. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `distTriang`: for distinguished triangles (`distTriang C`, `hT : T ∈ distTriang C`)
  - `contractible_`: for canonical distinguished triangles (e.g., `contractible_distinguished`, `contractible_distinguished₁`)
  - `complete_`: for morphism-completion constructions (`completeDistinguishedTriangleMorphism`, `complete_distinguished_triangle_morphism`)
  - `yoneda_`, `coyoneda_`: for exactness lemmas (analogous to Yoneda lemma in abelian categories)
  - `mor₁`, `mor₂`, `mor₃`: for triangle morphisms (e.g., `comp_distTriang_mor_zero₁₂`)
  - `isZero₁`, `isZero₂`, `isZero₃`: for zero-object characterizations of objects in triangle
  - `epi₁`, `epi₂`, `epi₃`, `mono₁`, `mono₂`, `mono₃`: for epimono characterizations

- **Suffixes**:
  - `_iff_`: biconditional characterizations (`mor₃_eq_zero_iff_epi₂`, `isZero₁_iff_isIso₂`)
  - `_of_`: implication direction or construction source (`epi₂_of_mor₃_eq_zero`, `isIso₂_of_isIso₁₃`)
  - `_distinguished`: properties of distinguished triangles (`rot_of_distTriang`, `inv_rot_of_distTriang`)

- **Shift notation**:
  - `⟦n⟧` for shift by integer `n`
  - `shiftFunctor`, `shiftEquiv`, `shift_shiftFunctorCompIsoId_inv_app`, etc.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Automated category-theoretic simplification (commutativity, associativity, identities) |
| `simp only [...]` | Targeted simplification using explicit lemmas |
| `rw [...]` | Rewriting using equalities or definitions |
| `dsimp` | Definitional simplification (especially for shift functors) |
| `ext` | Extensionality for morphisms (e.g., in biproducts) |
| `obtain ⟨x, hx⟩` | Existential elimination (e.g., from `complete_distinguished_triangle_morphism`) |
| `refine ⟨...⟩` | Constructing structured objects (e.g., triangle morphisms, biproduct data) |
| `infer_instance` | Solving typeclass constraints (e.g., `IsIso`, `Epi`, `Mono`) |
| `induction n` | Structural induction on integers (for `shift_distinguished`) |
| `have h := ...; ...; exact h` | Intermediate lemma introduction |
| `rw [← cancel_mono ..., ...]` | Cancellation lemmas for mono/epi reasoning |
| `simp only [IsZero.iff_id_eq_zero]` | Specialized simplifications for zero objects |

---

### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  1. **Reduction to axioms**: Use `complete_distinguished_triangle_morphism` to lift squares to triangle morphisms.
  2. **Rotation & inversion**: Leverage `rotate_distinguished_triangle` and `invRotate` to shift focus between morphisms.
  3. **Zero-composition lemmas**: Use `comp_distTriang_mor_zero₁₂`, etc., to simplify compositions.
  4. **Exactness via Yoneda**: Apply `yoneda_exact₂`, `coyoneda_exact₁`, etc., to lift/extend morphisms using representability.
  5. **Biproduct splitting**: When `mor₃ = 0`, construct biproduct structure via `binaryBiproductData`.
  6. **Isomorphism criteria**: Use `isIso_of_yoneda_map_bijective`, `isIso₂_of_isIso₁₃`, etc., to prove morphisms are iso.

- **Common proof patterns**:
  - *Diagram chase*: Combine exactness lemmas with cancellation and zero-composition.
  - *Shift induction*: Prove properties for all integer shifts by verifying base cases (`0`, `1`, `-1`) and closure under addition.
  - *Iso-closure*: Use `isomorphic_distinguished` to transfer distinguishedness along triangle isomorphisms.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Homology.ShortComplex.Basic` | Short complexes, used to model triangles as 2-term complexes. |
| `Mathlib.CategoryTheory.Limits.Constructions.FiniteProductsOfBinaryProducts` | Enables finite products/biproducts from binary ones. |
| `Mathlib.CategoryTheory.Triangulated.TriangleShift` | Shift functors, triangle rotation, and shift equivalences. |

**Core dependencies**:  
- `Preadditive` categories  
- `HasZeroObject`  
- `HasShift C ℤ` (ℤ-indexed shift functors)  
- `Functor.Additive` (additivity of shifts)  

---

Let me know if you'd like a **graphical dependency map**, **proof automation suggestions**, or a **Lean-to-English glossary** for this module.