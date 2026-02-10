### Technical Brief: Valuative Criterion in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ValuativeCommSq` | `structure` | Encodes a commutative square involving `Spec K → X`, `Spec R → Y`, where `R` is a valuation ring, `K = Frac(R)`. Models the “valuative diagram”. |
| `ValuativeCriterion.Existence` | `MorphismProperty` | Morphism satisfies *existence* of lifts for all valuative squares. |
| `ValuativeCriterion.Uniqueness` | `MorphismProperty` | Morphism satisfies *uniqueness* of lifts (i.e., at most one lift). |
| `ValuativeCriterion` | `MorphismProperty` | Morphism satisfies *both* existence and uniqueness (i.e., unique lift). Defined as `Existence ⊓ Uniqueness`. |
| `ValuativeCriterion.iff` | `lemma` | `ValuativeCriterion f ↔ Existence f ∧ Uniqueness f`. |
| `ValuativeCriterion.eq` | `lemma` | `ValuativeCriterion = Existence ⊓ Uniqueness`. |
| `ValuativeCriterion.Existence.specializingMap` | `lemma` (`[stacks 01KE]`) | If `f` satisfies existence, then `f.base` is a *specializing map*. |
| `ValuativeCriterion.Existence.of_specializingMap` | `lemma` | Converse: if `f` is *universally specializing*, then it satisfies existence. |
| `ValuativeCriterion.Existence.eq` | `lemma` (`[stacks 01KE]`) | `ValuativeCriterion.Existence = (topologically @SpecializingMap).universally`. |
| `UniversallyClosed.eq_valuativeCriterion` | `lemma` (`[stacks 01KF]`) | `UniversallyClosed f ↔ ValuativeCriterion.Existence f ∧ QuasiCompact f`. |
| `IsSeparated.eq_valuativeCriterion` | `lemma` (`[stacks 01L0, 01KZ]`) | `IsSeparated f ↔ ValuativeCriterion.Uniqueness f ∧ QuasiSeparated f`. |
| `IsProper.eq_valuativeCriterion` | `lemma` (`[stacks 0BX5]`) | `IsProper f ↔ ValuativeCriterion f ∧ QuasiCompact f ∧ QuasiSeparated f ∧ LocallyOfFiniteType f`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ValuativeCriterion.`: Namespace for all valuative-related properties.
  - `Existence`, `Uniqueness`: Subproperties of `ValuativeCriterion`.
  - `eq`: For equivalences/characterizations (e.g., `eq_valuativeCriterion`).
- **Suffixes**:
  - `of_`: Implication *from* a property to another (e.g., `of_valuativeCriterion`).
  - `specializingMap`: Refers to the topological property of preserving specialization relations.
- **Stamps**:
  - `[stacks 01KE]`, `[stacks 01KF]`, etc.: References to the Stacks Project tags.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions, especially `commSq.w`, `stalkMap`, `fromSpecStalk`, etc. |
| `simp` | Simplifying homs, stalks, pullbacks, and `Spec`-related constructions. |
| `ext` | Extensionality for morphisms (stalks, rings, schemes). |
| `apply` / `exact` | Applying lemmas (e.g., `hf`, `hf S'`) or constructing terms. |
| `have` / `suffices` | Introducing intermediate claims (e.g., `hαβ`, `hbij`). |
| `convert` / `congr_arg` | Proving equality of structures via component-wise equality. |
| `tauto` | In `IsProper.eq_valuativeCriterion`, to finish propositional logic. |
| `dsimp`, `erw` | Deep simplification and rewriting with definitional equalities. |
| `apply hP.hom_ext`, `apply IsPullback.hom_ext` | Scheme-specific extensionality principles. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Forward direction** (`→`): Use the valuative criterion to construct or constrain lifts → derive topological properties (e.g., `specializingMap`, separatedness).
  - **Reverse direction** (`←`): Assume topological property (e.g., universally specializing), then construct lifts using valuation rings and their fraction fields.

- **Typical Flow**:
  1. Introduce a valuative square `S`.
  2. Use assumption (e.g., `H : ValuativeCriterion.Existence f`) to get a lift.
  3. Extract points (e.g., `l.base (closedPoint R)`) and verify compatibility.
  4. Use properties of valuation rings (e.g., `bijective_rangeRestrict_comp_of_valuationRing`) to build ring maps.
  5. For uniqueness: Show two lifts must be equal via subsingleton property or diagonal argument.

- **Key Lemmas**:
  - `ValuativeCriterion.Existence.specializingMap`: Lifts ⇒ specializing map.
  - `ValuativeCriterion.Existence.of_specializingMap`: Universally specializing ⇒ existence of lifts (uses valuation ring factorization).
  - `IsSeparated.valuativeCriterion`: Separated ⇒ uniqueness (uses diagonal immersion and affine local analysis).
  - `IsSeparated.of_valuativeCriterion`: Uniqueness + quasi-separated ⇒ separated (via diagonal immersion and closed map criteria).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.Immersion` | For immersion/closed immersion properties (used in separatedness proofs). |
| `Mathlib.AlgebraicGeometry.Morphisms.Proper` | For definitions of proper, universally closed, etc. |
| `Mathlib.RingTheory.RingHom.Injective` | For injectivity of algebra maps (e.g., `algebraMap R K`). |
| `Mathlib.RingTheory.Valuation.LocalSubring` | For valuation ring theory (e.g., `ValuationRing`, `IsFractionRing`, `closedPoint`, `stalkClosedPointIso`). |

**Domain**: Algebraic geometry over schemes (`Scheme.{u}`), with heavy use of:
- Stalks, residue fields, specialization maps.
- Pullbacks, diagonals, immersions.
- Valuation rings and their fraction fields.

---

#### **6. Future Work (per docstring)**

- Show that *discrete* valuation rings suffice for checking the valuative criterion when the base is Noetherian.

--- 

Let me know if you'd like a formalized summary (e.g., for a Lean 4 module header or a tactic documentation snippet).