### Technical Metadata Brief: `AlgebraicGeometry.Scheme.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsReduced` | `class IsReduced : Prop` | A scheme `X` is *reduced* if all its structure sheaf sections `𝒪ₓ(U)` are reduced rings. |
| `isReduced_of_isReduced_stalk` | `∀ x, IsReduced (X.presheaf.stalk x) ⇒ IsReduced X` | Proves reducedness globally from stalkwise reducedness. |
| `isReduced_stalk_of_isReduced` | `IsReduced X ⇒ ∀ x, IsReduced (X.presheaf.stalk x)` | Converse: global reducedness implies stalkwise reducedness. |
| `isReduced_of_isOpenImmersion` | `IsOpenImmersion f ⇒ IsReduced Y ⇒ IsReduced X` | Reducedness descends along open immersions. |
| `isReduced_of_isAffine_isReduced` | `IsAffine X ⇒ IsReduced Γ(X, ⊤) ⇒ IsReduced X` | Affine case: reducedness of global sections implies reducedness of scheme. |
| `eq_zero_of_basicOpen_eq_bot` | `[IsReduced X] ⇒ X.basicOpen s = ⊥ ⇒ s = 0` | In reduced schemes, a section with empty basic open is zero. |
| `basicOpen_eq_bot_iff` | `[IsReduced X] ⇒ X.basicOpen s = ⊥ ↔ s = 0` | Equivalence characterizing zero sections via basic opens in reduced schemes. |
| `IsIntegral` | `class IsIntegral : Prop` | A scheme is *integral* if nonempty and all nonempty open sections are integral domains. |
| `isReduced_of_isIntegral` | `IsIntegral X ⇒ IsReduced X` | Integral ⇒ reduced (since domains are reduced). |
| `irreducibleSpace_of_isIntegral` | `IsIntegral X ⇒ IrreducibleSpace X` | Integral schemes are irreducible (topologically). |
| `isIntegral_of_irreducibleSpace_of_isReduced` | `IsReduced X ⇒ IrreducibleSpace X ⇒ IsIntegral X` | Converse: reduced + irreducible ⇒ integral. |
| `isIntegral_iff_irreducibleSpace_and_isReduced` | `IsIntegral X ↔ IrreducibleSpace X ∧ IsReduced X` | Full characterization of integral schemes. |
| `isIntegral_of_isOpenImmersion` | `IsOpenImmersion f ⇒ IsIntegral Y ⇒ Nonempty X ⇒ IsIntegral X` | Integral descends along open immersions. |
| `affine_isIntegral_iff` | `IsIntegral (Spec R) ↔ IsDomain R` | Affine case: `Spec R` is integral iff `R` is a domain. |
| `map_injective_of_isIntegral` | `[IsIntegral X] ⇒ Nonempty U ⇒ Injective (X.presheaf.map i.op)` | Restriction maps are injective in integral schemes over nonempty opens. |
| `reduce_to_affine_global` | Elimination principle for proving properties on all opens of all schemes | Reduces global proofs to affine case + open immersion + local-to-global. |
| `reduce_to_affine_nbhd` | Local version of above: proves pointwise properties by reducing to affine neighborhoods | Useful for stalk-level arguments. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isReduced_`, `isIntegral_`: indicate properties of schemes or rings.
  - `affine_`: relates to affine schemes (`Spec R`).
  - `basicOpen_`: pertains to basic open subsets `D(s)`.
  - `reduce_to_affine_`: elimination principles for reduction to affine case.

- **Suffixes:**
  - `_of_`: implication direction (e.g., `isReduced_of_isOpenImmersion`).
  - `_iff`: biconditional statements (e.g., `basicOpen_eq_bot_iff`, `affine_isIntegral_iff`).
  - `_stalk`: stalk-level properties.
  - `_global` / `_nbhd`: global vs. local (pointwise) versions.

- **Other patterns:**
  - `component_`: refers to sections over open subsets (e.g., `component_reduced`, `component_integral`).
  - `map_injective_`, `eq_zero_of_`: functional-analytic style naming for injectivity or zero-section lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `exact`, `rw`, `simp`, `refine`, `apply`, `convert`
- `ext1`, `ext`: extensionality for sets/functions
- `induction ... using reduce_to_affine_global`: structural induction via elimination principles
- `dsimp`, `change`, `convert`, `erw`: advanced rewriting and definitional simplification
- `haveI`, `letI`, `obtain`: typeclass inference and existential unpacking
- `infer_instance`: synthesizes typeclass instances
- `by_contra`, `contrapose!`: classical reasoning
- `ring`, `simp_rw`: algebraic simplification (especially in affine cases)
- `apply_fun`, `convert`, `rw [← ...]`: manipulating morphisms and isomorphisms

---

#### **4. Proof Logic**

- **Global-to-local reductions**: Many proofs use `reduce_to_affine_global` or `reduce_to_affine_nbhd` to reduce to:
  1. Local-to-global: if property holds on an open cover, it holds globally.
  2. Open immersion descent: if property holds on target, it holds on source.
  3. Affine base case: verify for `Spec R`.

- **Stalk-based arguments**: For reducedness, often reduce to stalks via:
  - `isReduced_of_isReduced_stalk`
  - Use germ maps and localization (e.g., `Localization.AtPrime`)

- **Irreducibility + reducedness ⇒ integral**:
  - Uses `nonempty_preirreducible_inter` to find a point in intersection of basic opens.
  - Then uses stalks to show zero divisors would contradict integrality at stalk.

- **Injectivity of restriction maps** in integral schemes:
  - Uses `basicOpen_res` and `eq_zero_of_basicOpen_eq_bot` to reduce to showing basic open nonempty ⇒ section ≠ 0.

- **Affine case handling**:
  - Leverages `StructureSheaf.stalkIso`, `Scheme.ΓSpecIso`, and localization properties.
  - Uses `PrimeSpectrum.basicOpen_eq_bot_iff` for explicit computation.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.AlgebraicGeometry.AffineScheme`: defines `Spec R`, structure sheaf, affine schemes.
  - `Mathlib.RingTheory.LocalProperties.Reduced`: provides `IsReduced` for rings and localizations.

- **Implicit imports** (via `TopCat`, `CategoryTheory`, etc.):
  - Sheaf theory, limits/colimits, locales, topological spaces, ringed spaces, locally ringed spaces.

- **Scope**:
  - Focuses on *scheme-theoretic* properties: reducedness, integrality, irreducibility.
  - Bridges ring-theoretic properties (e.g., `IsDomain`, `IsReduced`) with geometric ones (e.g., `IrreducibleSpace`).
  - Provides foundational lemmas for further development (e.g., properties of morphisms, base change, gluing).

---

This file serves as a foundational module for scheme-theoretic reasoning in Lean, especially for properties stable under open immersions and local-to-global principles. It sets up key equivalences and elimination principles used throughout algebraic geometry in Mathlib.