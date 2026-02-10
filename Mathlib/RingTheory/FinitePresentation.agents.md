### Technical Metadata Brief: Finiteness Conditions in Commutative Algebra (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `Algebra.FinitePresentation` | `class` | Expresses that an algebra `A` over `R` is *finitely presented*: isomorphic to a quotient `MvPolynomial ι R ⧸ I` with `ι` finite and `I` finitely generated. |
| `RingHom.FinitePresentation` | `def` | A ring homomorphism `f : A →+* B` is finitely presented iff `B` is finitely presented as an `A`-algebra via `f`. |
| `AlgHom.FinitePresentation` | `def` | An algebra morphism `f : A →ₐ[R] B` is finitely presented iff its underlying ring homomorphism is. |
| `Algebra.FiniteType` | `class` (imported/used) | `A` is finitely generated as an `R`-algebra (quotient of `MvPolynomial ι R` for finite `ι`). |
| `Algebra.Finite` | `class` (imported/used) | `A` is finitely generated as an `R`-module. |
| `of_finitePresentation` | `instance` | Every finitely presented algebra is of finite type. |
| `of_finiteType` | `theorem` (under `IsNoetherianRing R`) | Over a Noetherian base, finite type ⇔ finite presentation. |
| `equiv` | `theorem` | Finite presentation is preserved under algebra isomorphism. |
| `mvPolynomial` | `instance` | `MvPolynomial ι R` is finitely presented over `R` when `ι` is finite. |
| `self`, `polynomial`, `mvPolynomial_of_finitePresentation` | `instance`/`theorem` | `R`, `R[X]`, and `MvPolynomial ι A` (for `A` f.p.) are finitely presented. |
| `quotient` | `theorem` | Quotient of a f.p. algebra by a fg ideal is f.p. |
| `of_surjective` | `theorem` | If `A → B` is surjective with fg kernel and `A` is f.p., then `B` is f.p. |
| `iff` / `iff_quotient_mvPolynomial'` | `theorem` | Characterizations of finite presentation via quotients of multivariate polynomial rings. |
| `ker_fg_of_mvPolynomial` | `theorem` | Kernel of a surjection `MvPolynomial (Fin n) R → A` (with `A` f.p.) is fg. |
| `ker_fG_of_surjective` | `theorem` | Kernel of a surjection between f.p. algebras is fg. |
| `trans` | `theorem` | Transitivity: if `A/R` and `B/A` are f.p., then `B/R` is f.p. |
| `of_restrict_scalars_finitePresentation` | `theorem` | If `B/R` is f.p. and `A/R` is finite type, then `B/A` is f.p. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: Implying an implication or derivation (e.g., `of_surjective`, `of_finiteType`).
  - `ker_`: Relating to kernels of ring/algebra maps (e.g., `ker_fg_of_mvPolynomial`, `ker_fG_of_surjective`).
  - `mvPolynomial_`: Relating to multivariate polynomial rings (e.g., `mvPolynomial`, `mvPolynomial_of_finitePresentation`).
  - `equiv`: For isomorphism-based preservation (e.g., `equiv`).
- **Suffixes**:
  - `_of_`: Often used in reverse implications or restrictions (e.g., `of_comp_finiteType`, `of_restrict_scalars_finitePresentation`).
  - `_surjective`: For results about surjective maps (e.g., `comp_surjective`, `of_surjective`).
- **Class names**:
  - `FinitePresentation`, `FiniteType`, `Finite`: All denote module/algebra finiteness conditions.
- **Aliases**:
  - `RingHom.FinitePresentation`, `AlgHom.FinitePresentation`: Lift `Algebra.FinitePresentation` to morphisms.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `obtain`, `cases`, `use`, `exact`, `refine`, `convert`
- **Algebraic simplification**:
  - `rw`, `erw`, `simp_rw`, `change`, `congrArg`
- **Ring/module reasoning**:
  - `ring`, `simp`, `aesop`, `apply`, `intro`, `intro v`, `rintro`
- **Ideal/module theory**:
  - `Ideal.span_le`, `Ideal.subset_span`, `Ideal.mem_ker`, `Ideal.map_comap_of_surjective`
  - `Submodule.fg_bot`, `fg_ker_comp`, `fg_ker_comp _ _ ?_ ?_`
- **Equivalence/extensional reasoning**:
  - `funext`, `ext`, `congr_arg`, `apply_fun`
- **Universe management**:
  - `universe`, `max`, `inferInstance`, `letI`, `haveI`

---

#### **4. Proof Logic & Strategy**

- **Standard pattern**:
  1. **Unfold definition**: Use `FinitePresentation.out` to get `⟨n, f, hf_surj, hf_ker⟩`.
  2. **Construct candidate**: Build a new algebra map (e.g., composition, `aeval`, `mapAlgHom`).
  3. **Verify surjectivity**: Often via `hf_surj.comp`, `Ideal.Quotient.mkₐ_surjective`, or `aeval_surjective`.
  4. **Control kernel**: Use lemmas like:
     - `Ideal.fg_ker_comp`
     - `RingHom.ker_eq_comap_bot`
     - `Ideal.map_comap_of_surjective`
     - `MvPolynomial.ker_map`
  5. **Apply Noetherian assumptions** (e.g., `isNoetherianRing_iff` + `noetherian`).
  6. **Use induction on adjoin** (`adjoin_induction`) for containment proofs in generated subalgebras/ideals.
  7. **Leverage equivalences**: `Ideal.quotientKerAlgEquivOfSurjective`, `MvPolynomial.renameEquiv`, `MvPolynomial.sumAlgEquiv`.

- **Notable techniques**:
  - **Reduction to polynomial rings**: Many proofs reduce to the case of `MvPolynomial (Fin n) R`.
  - **Universe management**: Explicit universe parameters (`.{w₁, w₂}`, `max v w₂`) to ensure consistency.
  - **Classical reasoning**: `classical` used in non-constructive steps (e.g., `of_restrict_scalars_finitePresentation`).
  - **Set-theoretic ideal equality**: Prove `I = J` via `Ideal.span_le` + antisymmetry.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Data.Finite.Sum`: For finite types and sums.
  - `Mathlib.RingTheory.FiniteType`: Defines finite type for algebras/rings.
  - `Mathlib.RingTheory.Finiteness.Ideal`: FG ideals, Noetherian modules.
  - `Mathlib.RingTheory.Ideal.Quotient.Operations`: Quotients, kernels, maps.
  - `Mathlib.RingTheory.MvPolynomial.Tower`: Tower law for `MvPolynomial`, `aeval`, etc.

- **Scope**:
  - Focuses on *finiteness conditions* in commutative algebra: finite generation (module/algebra), finite presentation.
  - Works in the context of **commutative rings/algebras**, with universe polymorphism.
  - Builds on `MvPolynomial` as a universal constructor for finitely presented algebras.

--- 

This metadata reflects the structure and methodology of a mature formalization of commutative algebra in Lean 4, aligned with the Stacks Project and EGA-style treatments.