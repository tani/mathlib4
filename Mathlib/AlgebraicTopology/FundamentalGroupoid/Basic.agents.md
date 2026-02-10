### Technical Metadata Brief: Fundamental Groupoid Construction in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `reflTransSymmAux` | `I × I → ℝ` — auxiliary function defining a homotopy square for `refl * symm * trans`. Ensures image lies in `I`. |
| `reflTransSymm` | `Homotopy (Path.refl x₀) (p.trans p.symm)` — constructs a homotopy from the constant path at `x₀` to `p ⋅ p⁻¹`. |
| `reflSymmTrans` | `Homotopy (Path.refl x₁) (p.symm.trans p)` — homotopy from constant path at `x₁` to `p⁻¹ ⋅ p`. |
| `transReflReparamAux` | `I → ℝ` — reparameterization function for right unit law: `p ⋅ const ~ p`. |
| `transRefl` | `Homotopy (p.trans (Path.refl x₁)) p` — homotopy showing right identity up to homotopy. |
| `reflTrans` | `Homotopy ((Path.refl x₀).trans p) p` — homotopy showing left identity up to homotopy. |
| `transAssocReparamAux` | `I → ℝ` — reparameterization for associativity of path composition. |
| `transAssoc` | `Homotopy ((p.trans q).trans r) (p.trans (q.trans r))` — homotopy witnessing associativity up to homotopy. |
| `FundamentalGroupoid` | `Type u → Type u` — structure wrapping points of `X` as objects of a groupoid. |
| `equiv` | `FundamentalGroupoid X ≃ X` — equivalence used to transfer properties between `X` and its fundamental groupoid. |
| `instance : Groupoid (FundamentalGroupoid X)` | Constructs the groupoid structure using homotopy classes of paths, with: <br> • `Hom = Path.Homotopic.Quotient` <br> • `id = [refl]` <br> • `comp = Quotient.comp` <br> • `inv = [p ↦ p⁻¹]` <br> Verified via homotopies above. |
| `fundamentalGroupoidFunctor` | `TopCat ⥤ Grpd` — functor from topological spaces (as objects of `TopCat`) to groupoids, mapping continuous maps to induced functors on fundamental groupoids. |
| `πₓ`, `πₘ`, `toTop`, `fromTop`, `toPath`, `fromPath` | Scoped notations and abbreviations for convenient manipulation of objects/morphisms in the fundamental groupoid. |

---

#### **2. Naming Conventions**

- **Auxiliary functions**: `*_aux` suffix (e.g., `reflTransSymmAux`, `transReflReparamAux`)
- **Homotopy constructors**: `refl*`, `trans*`, `assoc*`, `symm*` prefixes indicating the homotopy type:
  - `reflTransSymm`, `reflSymmTrans`: identity-like homotopies
  - `transRefl`, `reflTrans`: unit laws
  - `transAssoc`: associativity
- **Reparameterization functions**: `*_reparam_aux`, `*_reparam` (e.g., `transReflReparamAux`, `transAssocReparamAux`)
- **Quotient-based morphisms**: `⟦_⟧` notation for homotopy classes; `Quotient.sound`, `Quotient.inductionOn` used heavily in proofs.
- **Functoriality**: `fundamentalGroupoidFunctor`, `πₓ`, `πₘ`, `mapFn`, `map_map`, `map_id`, `map_comp`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `continuity` | To prove continuity of auxiliary functions and homotopies. |
| `simp` / `simp only` | Simplify goals using definitions and lemmas like `Path.refl_apply`, `Path.trans_apply`, `reparam`, etc. |
| `split_ifs` | Handle piecewise-defined functions (`if ... then ... else ...`). |
| `norm_num` | Normalize numeric expressions (especially for `1/2`, `2 * t`, etc.). |
| `unit_interval` | Custom tactic (from `unitInterval`) to verify membership in the unit interval `I = [0,1]`. |
| `linarith` | Solve linear inequalities involving real numbers and bounds from `unitInterval`. |
| `congr` / `congr 1` | Prove equality of function applications or lambda expressions. |
| `ext` | Extensionality for functions/paths (e.g., `ext x` to show two paths equal by extensionality). |
| `rw [← ...]` / `conv_rhs => rw [...]` | Rewriting with reversed lemmas or in specific positions. |
| `cases hx` | Case analysis on disjunctions in hypotheses (`hx : t ∈ {0,1}` etc.). |
| `exfalso` + `linarith` | Derive contradiction from inconsistent assumptions (common in `transAssoc` proof). |
| `ring` | Prove polynomial identities (e.g., in `transAssoc` proof). |

---

#### **4. Proof Logic**

- **Structure of homotopy proofs**:
  - Define an *auxiliary reparameterization* or *homotopy map* (e.g., `reflTransSymmAux`).
  - Prove it maps into `I` (`*_mem_I` lemmas).
  - Prove continuity (`continuous_*` lemmas).
  - Verify boundary conditions (`map_zero_left`, `map_one_left`, etc.).
  - Use `Homotopy.mk` to construct the homotopy.
  - For reparameterized paths, use `Homotopy.reparam` and `cast` to adjust endpoints.

- **Groupoid axioms**:
  - Proven via `Quotient.inductionOn` or `inductionOn₃`, reducing to path-level homotopies.
  - Unit laws (`id_comp`, `comp_id`) use `reflTrans`, `transRefl`.
  - Associativity (`assoc`) uses `transAssoc`.
  - Inverses (`inv_comp`, `comp_inv`) use `reflSymmTrans`, `reflTransSymm`.

- **Functoriality**:
  - `fundamentalGroupoidFunctor` maps:
    - Objects: `X ↦ πₓ X`
    - Morphisms: `f : X → Y` ↦ `πₘ f : πₓ X → πₓ Y`, defined via `Path.Homotopic.Quotient.mapFn`.
  - Verified using `map_map`, `map_id`, `map_comp`, and properties of `mapFn`.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Category.Grpd` | Defines the category of groupoids and functors between them. |
| `Mathlib.CategoryTheory.Groupoid` | Basic definitions and properties of groupoids in category theory. |
| `Mathlib.Topology.Category.TopCat.Basic` | Category of topological spaces and continuous maps. |
| `Mathlib.Topology.Homotopy.Path` | Path spaces, path composition, homotopies, and their properties. |
| `Mathlib.Data.Set.Subsingleton` | Tools for reasoning about sub-singletons (used in `FundamentalGroupoid` properties). |

**Domain**: Algebraic topology, specifically homotopy theory and category theory.  
**Core idea**: Construct the *fundamental groupoid* `πₓ X` of a space `X` as a groupoid whose morphisms are homotopy classes of paths, and show this assignment is functorial.

--- 

Let me know if you'd like a visual diagram of the homotopies or a summary of how this fits into the broader Mathlib library.