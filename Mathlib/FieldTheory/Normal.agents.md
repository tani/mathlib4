Here's a structured technical metadata summary extracted from the provided Lean 4 file on **normal field extensions**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Normal F K` | `class Normal extends Algebra.IsAlgebraic F K : Prop` | Defines a *normal field extension*: every element of `K` has a minimal polynomial over `F` that splits in `K`. |
| `Normal.splits' x` | `Splits (algebraMap F K) (minpoly F x)` | Core property: minimal polynomials split in the extension. |
| `normal_iff` | `Normal F K ↔ ∀ x : K, IsIntegral F x ∧ Splits (algebraMap F K) (minpoly F x)` | Equivalent characterization of normality. |
| `Normal.of_isSplittingField p` | `IsSplittingField F E p → Normal F E` | Any splitting field is normal. |
| `Normal.exists_isSplittingField` | `[Normal F K] → [FiniteDimensional F K] → ∃ p, IsSplittingField F K p` | For finite extensions, normal ⇔ splitting field. |
| `Normal.tower_top_of_normal` | `[Normal F E] → Normal K E` | Transitivity: if `E/F` is normal, then `E/K` is normal (for intermediate `K`). |
| `Normal.of_algEquiv f` | `Normal F E → (E ≃ₐ[F] E') → Normal F E'` | Normality is preserved under algebra isomorphism. |
| `AlgEquiv.restrictNormalHom E` | `(K₁ ≃ₐ[F] K₁) →* E ≃ₐ[F] E` | Group homomorphism from automorphisms of `K₁` to automorphisms of a normal subfield `E`. |
| `Normal.algHomEquivAut` | `(E →ₐ[F] K₁) ≃ E ≃ₐ[F] E` | For `E/F` normal, algebra homs `E → K₁` correspond bijectively to automorphisms of `E`. |
| `minpoly.exists_algEquiv_of_root` | `[Normal K L] → minpoly K y.eval x = 0 → ∃ σ, σ x = y` | Roots of minimal polynomials are Galois conjugates in a normal extension. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `normal_`: e.g., `normal_self`, `normal_iSup`, `normal_iInf`, `normal_sup`, `normal_inf`
  - `AlgHom.restrictNormal`, `AlgEquiv.restrictNormal`: restriction to normal subfields
  - `AlgHom.liftNormal`, `AlgEquiv.liftNormal`: lifting maps across normal extensions
- **Suffixes**:
  - `_of_`: e.g., `of_isSplittingField`, `of_algEquiv`, `of_injective_field`
  - `_comp`: e.g., `restrictNormal_comp`, `restrictNormalHom_comp`
  - `_hom`: e.g., `restrictNormalHom`, `algHomEquivAut`
- **Predicate-style**:
  - `Normal F K`: typeclass for normal extensions
  - `isAlgebraic`, `isIntegral`, `splits`, `isSplittingField`: standard field-theoretic predicates

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw` / `simp`: rewriting and simplification (especially with `minpoly`, `aeval`, `algebraMap`)
- `exact`, `refine`, `apply`: constructing proofs term-by-term
- `cases'`, `obtain ⟨…⟩`: destructuring existential/universal hypotheses
- `ext`: extensionality for functions/structures
- `convert`: flexible unification for proof goals
- `aesop`: automation for first-order reasoning (used implicitly in many `by` blocks)
- `ring`: for commutative ring identities (e.g., in `aeval` computations)
- `simp_rw`: specialized simplification with rewrite rules
- `infer_instance`: typeclass resolution
- `nontriviality`, `classical`: for classical reasoning (e.g., basis existence)

---

### **4. Proof Logic & Strategy**

- **Inductive/structural decomposition**:
  - Prove properties for generators (e.g., elements in a basis or root set), then extend via algebra generation.
  - Use `adjoin`/`IntermediateField` to reduce to finitely generated subextensions.
- **Splitting field machinery**:
  - Leverage `IsSplittingField.lift`, `adjoin_rootSet`, and `splits_prod` to construct maps into splitting fields.
- **Galois correspondence**:
  - Use `AlgEquiv.restrictNormal`, `liftNormal`, and `algHomEquivAut` to relate automorphism groups and subfields.
- **Tower arguments**:
  - Use `IsScalarTower` assumptions to commute algebra maps and apply `splits_map_iff`.
- **Minimal polynomial analysis**:
  - Exploit `minpoly.aeval`, `minpoly.irreducible`, `minpoly.dvd_map_of_isScalarTower`, and `aeval_algHom_apply`.
- **Group-theoretic reasoning**:
  - Prove solvability via kernel/range arguments (`solvable_of_ker_le_range`), and use `AlgEquiv.restrictNormalHom_surjective`.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.FieldTheory.Extension`: field extensions, algebra maps, adjoin
- `Mathlib.FieldTheory.SplittingField.Construction`: splitting fields, roots, `IsSplittingField`
- `Mathlib.GroupTheory.Solvable`: solvable groups, group homomorphisms

**Domain scope**:
- Classical field theory (no constructivity assumptions)
- Finite and infinite extensions
- Intermediate fields, composita, intersections
- Galois groups, automorphism groups, restriction/lifting of maps
- Minimal polynomials, integrality, splitting

---

Let me know if you'd like a diagrammatic summary (e.g., of tower lemmas) or a formalization roadmap for related results (e.g., fundamental theorem of Galois theory).