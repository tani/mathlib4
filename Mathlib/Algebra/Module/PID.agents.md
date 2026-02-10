### Technical Brief: Structure of Finitely Generated Modules over a PID (`PID.lean`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Submodule.isSemisimple_torsionBy_of_irreducible` | `Irreducible a → IsSemisimpleModule R (torsionBy R M a)` | Shows that the $a$-torsion submodule (for irreducible $a$) is semisimple over a PID. |
| `Submodule.isInternal_prime_power_torsion_of_pid` | `[Module.Finite R M] → Module.IsTorsion R M → DirectSum.IsInternal ...` | Proves that a finitely generated torsion module over a PID decomposes as an *internal* direct sum of its $p^e$-torsion submodules. |
| `Submodule.exists_isInternal_prime_power_torsion_of_pid` | `[Module.Finite R M] → Module.IsTorsion R M → ∃ ι, p, e, DirectSum.IsInternal ...` | Existential version of the above, abstracting over indexing type. |
| `Ideal.torsionOf_eq_span_pow_pOrder` | `torsionOf R M x = span {p ^ pOrder hM x}` | Identifies the torsion ideal of a vector $x$ under $p^\infty$-torsion as a principal power ideal. |
| `p_pow_smul_lift` | `p^k • x ∈ R ∙ y → ∃ a, p^k • x = p^k • a • y` | Lifting property for scalar multiples modulo cyclic submodule under torsion constraints. |
| `exists_smul_eq_zero_and_mk_eq` | `∃ x, p^k • x = 0 ∧ mk x = f 1` | Surjectivity-like lifting for linear maps from cyclic quotients into torsion modules. |
| `torsion_by_prime_power_decomposition` | `[Module.Finite R M] → ∃ d, k, Nonempty (M ≃ₗ ⨁ i, R ⧸ R ∙ p ^ k i)` | Main decomposition for $p^\infty$-torsion modules: isomorphic to direct sum of cyclic quotients $R / (p^{e_i})$. |
| `equiv_directSum_of_isTorsion` | `[Module.Finite R M] → Module.IsTorsion R M → ∃ ι, p, e, Nonempty (M ≃ₗ ⨁ i, R ⧸ R ∙ p i ^ e i)` | Full classification of finitely generated torsion modules over a PID. |
| `equiv_free_prod_directSum` | `[Module.Finite R M] → ∃ n, ι, p, e, Nonempty (M ≃ₗ (Fin n →₀ R) × ⨁ i, R ⧸ R ∙ p i ^ e i)` | **Structure theorem**: any finitely generated module over a PID splits as free part × torsion part. |
| `exists_ker_toSpanSingleton_eq_annihilator` | `[Module.Finite R M] → ∃ x, ker(toSpanSingleton x) = annihilator M` | Connects annihilator ideal with kernel of evaluation map to cyclic submodule. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: properties (e.g., `isInternal`, `isSemisimple`, `isTorsion`, `isTorsion'`)
  - `torsionBy`, `torsionOf`: torsion-related submodules/ideals
  - `pOrder`, `p_pow_smul`: $p$-power torsion specific
  - `quot`, `mkQ`, `liftQSpanSingleton`: quotient module constructions
  - `annihilator`: ideal of elements killing the module

- **Suffixes**:
  - `_of_pid`: specialized to PID setting (vs. more general Dedekind domain)
  - `_decomposition`, `_equiv`: decomposition or classification results
  - `_powers`: monoid of powers of an element (e.g., `Submonoid.powers p`)

- **Variables**:
  - `p`: irreducible / prime element
  - `e`, `k`, `n`: natural numbers (exponents)
  - `ι`, `d`: indexing types (finite/fintype)
  - `M`, `R`: module and ring

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `rw` / `simp` | Very High | Rewriting definitions, simplifying quotients, annihilators, direct sums |
| `convert` | High | Matching goals up to definitional equality (e.g., `Ideal.span_singleton_generator`) |
| `obtain` / `rcases` | High | Extracting witnesses from existential hypotheses |
| `induction` | Medium | Structural induction on finite module rank |
| `exact` / `refine` | High | Completing proofs with constructed terms |
| `ext` / `funext` | Medium | Extensionality for functions/morphisms |
| `dsimp`, `change` | Medium | Simplifying definitions, changing targets for unification |
| `have`, `suffices` | Medium | Introducing intermediate lemmas |
| `convert` + `rw` + `simp` chains | Very High | Bridging between module-theoretic and ideal-theoretic characterizations |
| `linear_combination` / `ring` | Low | Rarely needed due to algebraic normalization via `Ideal` API |

---

#### **4. Proof Logic Flow**

The proof follows a layered strategy:

1. **Semisimplicity of $p$-torsion**  
   Use that $R/(p)$ is a field (since $p$ irreducible ⇒ maximal ideal in PID) ⇒ torsionBy $p$ is semisimple.

2. **Internal direct sum decomposition of torsion modules**  
   - Use factorization of the annihilator ideal (UFD structure of PID)  
   - Show internal direct sum over $p^e$-torsion submodules via `isInternal_prime_power_torsion` (Dedekind domain version)  
   - Specialize to PID using generator properties (`Ideal.span_singleton_generator`, etc.)

3. **Decomposition of $p^\infty$-torsion modules**  
   - Induction on finite rank $d$  
   - Pick a maximal-order torsion vector $s j$  
   - Reduce to quotient module $M / R ∙ s j$  
   - Apply induction hypothesis and lift basis via `exists_smul_eq_zero_and_mk_eq` and `p_pow_smul_lift`

4. **Combine torsion and torsion-free parts**  
   - Torsion-free finitely generated modules over PID are free (`Module.free_of_finite_type_torsion_free'`)  
   - Use splitting of short exact sequence $0 → \mathrm{torsion}(M) → M → M/\mathrm{torsion}(M) → 0$ (projectivity of free modules)  
   - Assemble via `lequivProdOfRightSplitExact`

5. **Annihilator characterization**  
   - Use structure theorem to reduce to product case  
   - Compute annihilator of product: annihilator of free part is $0$, torsion part is intersection of annihilators of cyclic quotients  
   - Match kernel of `toSpanSingleton x` with this intersection

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Module.DedekindDomain` | General torsion decomposition for Dedekind domains (used as base for PID case) |
| `Mathlib.LinearAlgebra.FreeModule.PID` | Key result: torsion-free + finite type ⇒ free over PID |
| `Mathlib.Algebra.Module.Projective` | Projective lifting property for splitting SES |
| `Mathlib.Algebra.Category.ModuleCat.Biproducts` | Categorical perspective on direct sums/biproducts (used implicitly via `DirectSum`) |
| `Mathlib.RingTheory.SimpleModule.Basic` | Semisimplicity and simple module theory (used in `isSemisimple_torsionBy_of_irreducible`) |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Top-Level Theorems)**

```mermaid
graph TD
  A[CommRing R] --> B[IsPrincipalIdealRing R]
  A --> C[IsDomain R]
  B --> D[IsPrincipalIdealRing.isMaximal_of_irreducible]
  C --> E[UniqueFactorizationMonoid R]
  E --> F[factors annihilator]
  D & F --> G[Submodule.isInternal_prime_power_torsion_of_pid]
  G --> H[Submodule.exists_isInternal_prime_power_torsion_of_pid]
  H --> I[torsion_by_prime_power_decomposition]
  I --> J[equiv_directSum_of_isTorsion]
  J --> K[equiv_free_prod_directSum]
  K --> L[exists_ker_toSpanSingleton_eq_annihilator]

  M[Module.Finite R M] --> G
  M --> J
  M --> K
  Module.IsTorsion R M --> G
  Module.IsTorsion R M --> J
  Module.IsTorsion' M (powers p) --> I
```

##### **Overview of Proof Structure**

```mermaid
flowchart LR
  subgraph Setup
    A[CommRing R] --> B[PID]
    C[AddCommGroup M] --> D[Module R M]
    M[Module.Finite R M] --> D
  end

  subgraph Torsion Decomposition
    B --> E[Semisimple p-torsion]
    E --> F[Internal direct sum over p^e-torsion]
    F --> G[equiv_directSum_of_isTorsion]
  end

  subgraph p^∞-torsion Case
    B --> H[Induction on rank]
    H --> I[Pick maximal-order vector]
    I --> J[Quotient & lift basis]
    J --> K[torsion_by_prime_power_decomposition]
  end

  subgraph Full Structure
    G --> L[equiv_free_prod_directSum]
    M --> M2[Free of torsion-free part]
    M2 --> L
    L --> N[exists_ker_toSpanSingleton_eq_annihilator]
  end
```

---

#### **7. Summary**

This file formalizes the **Structure Theorem for Finitely Generated Modules over a Principal Ideal Domain**, a cornerstone of commutative algebra. It proceeds by:

- Decomposing torsion modules into primary components (prime power torsion),
- Classifying $p^\infty$-torsion modules as direct sums of cyclic quotients $R/(p^e)$,
- Splitting off the torsion-free part (which is free),
- Assembling the full decomposition.

The formalization leverages:
- UFD structure of PID (for annihilator factorization),
- Categorical tools (`DirectSum`, `lequivProdOfRightSplitExact`),
- Module-theoretic lifting lemmas (`p_pow_smul_lift`, `exists_smul_eq_zero_and_mk_eq`),
- And connects to ideal theory via `annihilator`, `torsionOf`, and `quotient` constructions.

The final theorem `equiv_free_prod_directSum` is the Lean counterpart of the classical invariant factor / elementary divisor decomposition.
