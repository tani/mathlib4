### Technical Metadata Brief: Projective Resolutions in Abelian Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `liftFZero` | `(f : Y ⟶ Z) → P : ProjectiveResolution Y → Q : ProjectiveResolution Z → P.complex.X 0 ⟶ Q.complex.X 0` | Constructs the 0-th component of a chain map lift using projectivity of `P.complex.X 0`. |
| `liftFOne` | `(f : Y ⟶ Z) → P Q → P.complex.X 1 ⟶ Q.complex.X 1` | Constructs the 1-st component using exactness and projectivity. |
| `liftFSucc` | `(P Q : ProjectiveResolution Y Z) → (n : ℕ) → ... → Σ'g'' : ...` | Inductive step to extend chain map to higher degrees. |
| `lift` | `(f : Y ⟶ Z) → P Q → P.complex ⟶ Q.complex` | Lifts a morphism `f : X ⟶ Y` to a chain map between projective resolutions. |
| `lift_commutes` | `lift f P Q ≫ Q.π = P.π ≫ (ChainComplex.single₀ C).map f` | Ensures the lift commutes with the resolution maps (`ι` in the docstring). |
| `liftHomotopyZero` | `(f : P.complex ⟶ Q.complex) → (f ≫ Q.π = 0) → Homotopy f 0` | Shows any lift of zero is null-homotopic. |
| `liftHomotopy` | `(f : Y ⟶ Z) → g h : P.complex ⟶ Q.complex → ... → Homotopy g h` | Any two lifts of the same `f` are homotopic. |
| `liftIdHomotopy` | `Homotopy (lift (𝟙 X) P P) (𝟙 P.complex)` | Identity lifts are homotopic to identity chain maps. |
| `liftCompHomotopy` | `Homotopy (lift (f ≫ g) P R) (lift f P Q ≫ lift g Q R)` | Composition of lifts is homotopic to lift of composition. |
| `homotopyEquiv` | `P Q : ProjectiveResolution X → HomotopyEquiv P.complex Q.complex` | Any two projective resolutions of the same object are homotopy equivalent. |
| `projectiveResolutions` | `C ⥤ HomotopyCategory C (ComplexShape.down ℕ)` | Functor assigning to each object its projective resolution in the homotopy category. |
| `ofComplex` | `ChainComplex C ℕ` | Underlying chain complex of the canonical projective resolution. |
| `of` | `ProjectiveResolution Z` | Canonical projective resolution constructed via syzygies. |
| `exact_d_f` | `(ShortComplex.mk (d f) f ...).Exact` | Exactness of the short complex formed by `d f` and `f`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lift*`: Constructs components of a chain map lifting a morphism.
  - `homotopy*`: Constructs homotopies or homotopy equivalences.
  - `of*`: Part of the canonical resolution construction (`ofComplex`, `of`).
  - `exact*`: Proves exactness properties.

- **Suffixes**:
  - `Zero`, `One`, `Succ`: Denote degree-specific constructions (0th, 1st, and inductive step).
  - `comm`: Indicates a commutativity condition (e.g., `lift_commutes`).
  - `naturality`: Used for naturality squares up to homotopy.

- **Other patterns**:
  - `iso*`: Isomorphisms in the homotopy category.
  - `homotopyEquiv`: Homotopy equivalence between resolutions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities and lemmas like `lift_commutes_zero`, `exact_d_f`. |
| `aesop_cat` | Automated category-theoretic reasoning (e.g., in naturality lemmas). |
| `apply ...` | Applying lemmas like `liftFromProjective`, `exact_of_g_is_cokernel`. |
| `rw [assoc, comp_zero, kernel.condition]` | Rewriting using categorical axioms. |
| `match n with | 0 => ... | n+1 => ...` | Structural induction on natural numbers. |
| `infer_instance` | Solving typeclass constraints (e.g., `Projective`, `Abelian`). |
| `HomotopyCategory.eq_of_homotopy` | Proving equality of morphisms in the homotopy category. |
| `dsimp`, `convert`, `refine` | Fine-grained definitional reasoning. |

---

#### **4. Proof Logic**

- **Inductive construction of chain maps**:
  - Base cases (`0`, `1`) use projectivity and exactness to construct maps.
  - Inductive step (`n → n+1`) uses `liftFSucc`, relying on exactness of the resolution and projectivity of the source objects.

- **Homotopy uniqueness**:
  - Lifts of zero are null-homotopic (`liftHomotopyZero`).
  - Any two lifts differ by a null-homotopic map ⇒ they are homotopic (`liftHomotopy`).
  - Homotopy classes form a category ⇒ functoriality of `projectiveResolutions`.

- **Functoriality**:
  - Defined on objects via `projectiveResolution`.
  - On morphisms via `lift`.
  - Identity and composition preserved *up to homotopy*, then descended to the homotopy category.

- **Canonical resolution**:
  - Built via `ofComplex`, using `Projective.over`, `Projective.syzygies`, and `Projective.d`.
  - Exactness at all positive degrees via `ofComplex_exactAt_succ`, using `exact_d_f`.
  - Quasi-isomorphism at degree 0 via `ShortComplex.exact_and_epi_g_iff_of_iso`.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Preadditive.ProjectiveResolution` | Core definitions and properties of projective resolutions. |
| `Mathlib.Algebra.Homology.HomotopyCategory` | Homotopy category of chain complexes, homotopy equivalences. |
| `Mathlib.Tactic.SuppressCompilation` | Optimization for large proofs (avoids compilation of proof terms). |

**Domain**:  
- **Abelian categories** with **enough projectives**.
- Targets: Chain complexes over `ℕ`-indexed `ComplexShape.down ℕ`.
- Main objects: Projective resolutions, chain maps, homotopies, homotopy categories.

---

This metadata captures the formal structure, proof strategy, and design patterns used in the Lean 4 development of projective resolutions in abelian categories.