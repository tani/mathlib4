### Technical Metadata Brief: Universally Closed Morphisms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `UniversallyClosed` | `class UniversallyClosed (f : X ⟶ Y) : Prop` | Defines a morphism `f` as *universally closed*: all base changes `X ×[Y] Y' → Y'` are closed maps. |
| `universallyClosed_iff` | `UniversallyClosed f ↔ universally (topologically @IsClosedMap) f` | Equivalence defining `UniversallyClosed` via `universally` applied to `IsClosedMap`. |
| `Scheme.Hom.isClosedMap` | `[UniversallyClosed f] → IsClosedMap f.base` | Shows that a universally closed morphism is itself a closed map (on underlying topological spaces). |
| `universallyClosed_respectsIso` | `RespectsIso @UniversallyClosed` | Stability under isomorphism of schemes. |
| `universallyClosed_isStableUnderBaseChange` | `IsStableUnderBaseChange @UniversallyClosed` | Closed under arbitrary base change. |
| `universallyClosed_isStableUnderComposition` | `IsStableUnderComposition @UniversallyClosed` | Closed under composition of morphisms. |
| `UniversallyClosed.of_comp_surjective` | `(f ≫ g)` universally closed + `f` surjective ⇒ `g` universally closed | A technical lemma for descent along surjective maps. |
| `universallyClosedTypeComp` | `[UniversallyClosed f] → [UniversallyClosed g] → UniversallyClosed (f ≫ g)` | Instantiates composition stability. |
| `universallyClosed_fst`, `universallyClosed_snd` | `[hg] → UniversallyClosed (pullback.fst f g)`, etc. | Stability of universally closed under pullback projections. |
| `universallyClosed_isLocalAtTarget` | `IsLocalAtTarget @UniversallyClosed` | Locality at the target: `f` is universally closed iff covered by universally closed opens in the target. |
| `compactSpace_of_universallyClosed` | `f : X → Spec K` universally closed ⇒ `X` compact | Key geometric consequence: universally closed over a field implies quasi-compactness. |
| `Scheme.Hom.isProperMap` | `[UniversallyClosed f] → IsProperMap f.base` | Universally closed ⇒ topologically proper (i.e., universally closed + separated + finite type ⇒ proper in classical sense). |
| `universallyClosed_eq_universallySpecializing` | `UniversallyClosed = (SpecializingMap).universally ⊓ QuasiCompact` | Structural characterization: universally closed = universally specializing + quasi-compact. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `universallyClosed_`: for properties and instances related to the `UniversallyClosed` class.
  - `isClosedMap_`: for lemmas about `IsClosedMap` (often used internally).
  - `comp_mem`, `pullback_fst`, `pullback_snd`: standard `MorphismProperty`-style naming for stability properties.

- **Suffixes**:
  - `_iff`: for equivalence lemmas (`universallyClosed_iff`).
  - `_eq`: for definitional equalities (`universallyClosed_eq`, `universallyClosed_eq_universallySpecializing`).
  - `_of_`: for implication-based lemmas (`of_comp_surjective`).
  - `_isLocalAtTarget`, `_isStableUnder_`: for categorical stability properties.

- **Class naming**: `UniversallyClosed` (capitalized, noun-like), following Mathlib’s `MorphismProperty` conventions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw [universallyClosed_iff]` | Rewriting definition to/from `universally (topologically @IsClosedMap)`. |
| `intro ...; apply ...` | Standard intro/apply for class instances and lemmas. |
| `simp_rw [...]` | Simplification with rewrite rules (e.g., `morphismRestrict_base`). |
| `exact`, `assumption`, `infer_instance` | For closing goals via typeclass inference. |
| `contrapose!` | Logical contrapositive + simplification (e.g., in `compactSpace_of_universallyClosed`). |
| `cases`, `obtain`, `have` | For decomposing hypotheses and constructing intermediate results. |
| `aesop`, `ring` | Not heavily used here; more algebraic geometry-specific tactics dominate. |
| `set`, `let` | For constructing auxiliary objects (e.g., opens, maps, ideals). |
| `apply ...; exact ...` | Common pattern in `compactSpace_of_universallyClosed` for constructing covers and contradictions. |

---

#### **4. Proof Logic & Strategy**

- **Structure of proofs**:
  - **Class instances**: Prove stability properties (base change, composition, locality) by reducing to `universallyClosed_eq` and applying generic lemmas like `universally_isStableUnderBaseChange`.
  - **Descent lemmas** (e.g., `of_comp_surjective`): Use surjectivity to lift closedness from a composite to a factor.
  - **Geometric consequences** (e.g., `compactSpace_of_universallyClosed`):
    - Construct a large pullback diagram involving `Spec MvPolynomial`.
    - Use open covers (affine cover), basic opens, and specialization arguments.
    - Derive contradiction via evaluation maps (`aeval`) and variable truncation (`σ = vars g`).
  - **Properness** (`isProperMap`): Combine `universallyClosed` ⇒ `IsClosedMap` + `compactSpace_of_universallyClosed` on fibers.
  - **Characterization** (`universallyClosed_eq_universallySpecializing`): Use lattice-theoretic properties of `universally` and `⊓`, plus equivalence `IsClosedMap ↔ SpecializingMap ∧ QuasiCompact`.

- **Inductive/constructive style**: Rare; mostly classical reasoning (e.g., compactness, existence of preimages, use of `Subsingleton.elim`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.ClosedImmersion` | Provides `IsClosedImmersion` and its properties (used for `instance [IsClosedImmersion f] : UniversallyClosed f`). |
| `Mathlib.AlgebraicGeometry.PullbackCarrier` | Defines pullbacks and their universal properties (used in base change arguments). |
| `Mathlib.Topology.LocalAtTarget` | Supplies `IsLocalAtTarget` and related machinery (e.g., `universally_isLocalAtTarget`). |

**Domain scope**:  
- **Category theory**: `CategoryTheory`, `Limits`, `Opposite`, `MorphismProperty`.  
- **Algebraic geometry**: `Scheme`, `Pullback`, `PrimeSpectrum`, `Affine`, `MvPolynomial`.  
- **Topology**: `TopologicalSpace`, `CompactSpace`, `isOpen`, `isClosed`, `SpecializingMap`.  
- **Commutative algebra**: `CommRingCat`, `Field`, `aeval`, `vars`, `MvPolynomial`.

---

### Summary

This file formalizes the foundational theory of **universally closed morphisms** in the context of schemes, aligning with the Stacks Project (e.g., [04XU](https://stacks.math.columbia.edu/tag/04XU)). It emphasizes categorical stability (base change, composition, locality), geometric consequences (properness, compactness), and structural characterizations (via specializing maps). The proofs rely heavily on the interplay between topology (closed maps, compactness), category theory (pullbacks, universality), and algebra (polynomial rings, evaluation maps).