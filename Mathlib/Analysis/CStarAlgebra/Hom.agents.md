Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `IsSelfAdjoint.map_spectrum_real` | `∀ {a : A}, IsSelfAdjoint a → φ : F → Injective φ → spectrum ℝ (φ a) = spectrum ℝ a` | Shows that injective star algebra morphisms preserve the *real* spectrum of self-adjoint elements. |
| `NonUnitalStarAlgHom.norm_map` | `∀ φ : F, Injective φ → ∀ a : A, ‖φ a‖ = ‖a‖` | Proves that injective non-unital star algebra homomorphisms between complex non-unital C*-algebras are **isometric**. |
| `NonUnitalStarAlgHom.nnnorm_map` | `∀ φ : F, Injective φ → ∀ a : A, ‖φ a‖₊ = ‖a‖₊` | Immediate corollary of `norm_map`, for the non-negative normed space version (`nnnorm`). |
| `NonUnitalStarAlgHom.isometry` | `∀ φ : F, Injective φ → Isometry φ` | Concludes that such homomorphisms are isometries (as additive monoid homomorphisms). |

Also used internally:
- `cfc`: Continuous functional calculus (`CStarAlgebra.continuousFunctionalCalculus`).
- `spectralRadius`: Spectral radius in a C*-algebra.
- `Unitization`: Unitization of a non-unital C*-algebra.
- `StarAlgHomClass.map_cfc`: Compatibility of star algebra homomorphisms with continuous functional calculus.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `map_`: for properties of morphisms (e.g., `norm_map`, `nnnorm_map`, `map_spectrum_real`).
  - `isometry`: for properties of maps preserving distances.
- **Suffixes**:
  - `_real`: for real spectra (e.g., `map_spectrum_real`).
  - `_toReal`: for converting spectral radius to norm via the C*-identity.
- **Class-based naming**:
  - `AlgHomClass`, `StarHomClass`, `NonUnitalAlgHomClass`: indicate typeclass interfaces for algebraic structure.
  - `isClosed`, `singleton`, `isSelfAdjoint`: standard Mathlib predicates.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with lemmas (e.g., `simp only [spectralRadius, ha.map_spectrum_real]`).
- `rw`: rewriting using equalities (e.g., `rw [← sq_eq_sq₀ ...]`).
- `calc`: chaining equalities (e.g., in `norm_map` proof).
- `by_contra`: proof by contradiction (used in `map_spectrum_real`).
- `obtain ⟨f, h_eqOn, h_eqOn_x, -⟩ := ...`: destructuring existential statements.
- `exact`, `refine`, `apply`: proof construction.
- `aesop`: likely used implicitly (though not explicit here), especially for routine goals.
- ` positivity`: used to discharge positivity goals (e.g., `by positivity` in `sq_eq_sq₀`).

---

### **4. Proof Logic**

- **Main proof strategy**:
  - Reduce to the **unital case** via unitization (functoriality and isometric embedding).
  - Use the **C*-identity**: `‖x‖² = ‖x* x‖`, reducing norm equality to self-adjoint elements.
  - For self-adjoint elements, use the **spectral radius formula**: `‖a‖ = r(a)` for self-adjoint `a`.
  - Show equality of spectra (via `map_spectrum_real`) ⇒ equality of spectral radii ⇒ equality of norms.

- **Subproof for `map_spectrum_real`**:
  - Use Urysohn’s lemma to construct a continuous function separating a point outside the spectrum from the spectrum.
  - Use injectivity and functional calculus to derive a contradiction if the spectrum shrinks.

---

### **5. Imports**

- `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Order`: Provides order-theoretic and spectral properties of C*-algebras, especially regarding functional calculus and spectra over `ℝ`.

Other implicit dependencies (via typeclasses and lemmas used):
- `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus`: for `cfc`, functional calculus.
- `Mathlib.Analysis.CStarAlgebra.Unitization`: for unitization and its properties.
- `Mathlib.Algebra.Star.Module`: for `StarAlgHomClass`, `StarHomClass`.
- `Mathlib.Analysis.Normed.Group.NormedSpace.Basic`: for norms, `nnnorm`, `Isometry`.
- `Mathlib.Topology.UrysohnBounded`: for Urysohn’s lemma (used in `map_spectrum_real`).

---

Let me know if you'd like a formalized dependency graph or a summary of how this fits into the broader C*-algebra library.