Here's a structured technical metadata summary extracted from the provided Lean 4 file on **partially defined linear maps** (`LinearPMap`):

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LinearPMap R E F` | `Type u → Ring u → Type v → AddCommGroup v → Module R v → Type w → AddCommGroup w → Module R w → Type w` | A partial linear map: domain is a submodule of `E`, codomain map is linear into `F`. |
| `mkSpanSingleton' x y H` | `E → F → (∀ c, c • x = 0 → c • y = 0) → E →ₗ.[R] F` | Constructs a partial linear map on `R ∙ x` sending `x ↦ y`, valid over rings. |
| `mkSpanSingleton x y hx` | `[DivisionRing K] → E → F → x ≠ 0 → E →ₗ.[K] F` | Specialization of `mkSpanSingleton'` for division rings (no need for `H` proof). |
| `sup f g h` | `∀ h : f,g agree on intersection, ∃! h' : f.domain ⊔ g.domain → F extending f,g` | Combines two compatible partial maps into one on the join of domains. |
| `sSup c hc` | `DirectedOn (≤) c ⇒ ∃! f : ⋃ doms → F extending all in c` | Supremum of a directed set of compatible partial maps. |
| `graph f` | `Submodule R (E × F)` | Graph of `f` as a submodule of the product. |
| `eqLocus f g` | `Submodule R E` | Submodule where `f` and `g` agree (used in ordering & `inf`). |
| `fst p p'`, `snd p p'` | `E × F →ₗ.[R] E / F` | Projections from product submodule as partial maps. |
| `domRestrict f S` | `E →ₗ.[R] F` | Restrict domain of `f` to `S ⊓ f.domain`. |
| `codRestrict f p H` | `E →ₗ.[R] p` | Restrict codomain to submodule `p ≤ F`. |
| `comp g f H` | `∀ x ∈ dom f, f x ∈ dom g ⇒ E →ₗ.[R] G` | Composition of partial linear maps. |
| `coprod f g` | `E × F →ₗ.[R] G` | Combines `f : E →ₗ.[R] G`, `g : F →ₗ.[R] G` into `f(p.1) + g(p.2)`. |
| `toPMap f p` | `E →ₗ.[R] F` | Restrict a total linear map `f` to submodule `p`. |
| `compPMap g f` | `E →ₗ.[R] G` | Precompose total `g` with partial `f`. |

**Key Theorems:**
- `sup_apply`: Explicit formula for `sup` on sums of elements from domains.
- `left_le_sup`, `right_le_sup`: `f ≤ f.sup g h`, `g ≤ f.sup g h`.
- `sup_le`: Universal property of `sup`.
- `sSup_apply`: Evaluation of `sSup` on elements in any member of the directed set.
- `mem_graph_iff`: Characterization of graph membership.
- `graph_map_fst_eq_domain`, `graph_map_snd_eq_range`: Graph projects to domain and range.

---

### **2. Naming Conventions**

- **Prefixes:**
  - `mk*`: Constructors (`mkSpanSingleton`, `mkSpanSingleton'`, `mk` for `mk p f`).
  - `sup*`: Supremum-related (`sup`, `sup_apply`, `sup_h_of_disjoint`, `supSpanSingleton`, `domain_sup`).
  - `dom*`: Domain-related (`domRestrict`, `domain_mono`, `domain_sup`, `domain_mkSpanSingleton`).
  - `graph*`: Graph-related (`graph`, `mem_graph`, `mem_graph_iff`, `smul_graph`, `neg_graph`).
  - `comp*`: Composition (`comp`, `compPMap`).
  - `cod*`: Codomain restriction (`codRestrict`).
  - `eqLocus`: Agreement locus.

- **Suffixes:**
  - `'` (prime): Variant of previous definition (e.g., `mkSpanSingleton'` vs `mkSpanSingleton`).
  - `_apply`: Evaluation formula (e.g., `sup_apply`, `mkSpanSingleton'_apply`).
  - `_domain`: Domain description (e.g., `domain_sup`, `domain_mkSpanSingleton`).
  - `_le`, `_ge`: Order-theoretic properties (e.g., `le_of_eqLocus_ge`, `sup_le`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`, `congr`, `ext`, `simp`, `rw`
- `exact`, `convert`, `refine'`, `cases'`
- `beta_reduce`, `dsimp`, `erw`
- `simpa`, `suffices`, `have`, `set`
- `classical`, ` Classical.choose`, `Classical.indefiniteDescription`
- `aesop` (implied by `simp`-heavy style)
- `ring`, `linarith` (for module/ring arithmetic)
- `subsingleton.elim`, `subtype.ext`, `Prod.mk.inj_iff`

---

### **4. Proof Logic**

- **Structure:** Most proofs follow a pattern:
  1. **Extensionality**: Use `ext` or `ext'` to reduce to equality on domains and values.
  2. **Case analysis**: On membership in submodules, using `mem_span_singleton`, `mem_sup`, `mem_inf`, etc.
  3. **Choice & classical logic**: Use `Classical.choose`/` Classical.indefiniteDescription` for existence (e.g., `sup`, `sSup`).
  4. **Directedness**: For `sSup`, use `DirectedOn` to find common upper bounds in the set.
  5. **Algebraic manipulation**: Use linearity lemmas (`map_add`, `map_smul`, `map_zero`) and module axioms.

- **Induction**: Not used heavily (no recursive structures beyond submodules), but `induction` may appear in auxiliary lemmas (e.g., on `n` for `nsmul`, `zsmul`).

- **Order-theoretic reasoning**: Central to `sup`, `sSup`, `inf`, `le`, `bot`. Proofs often reduce to:
  - Domain inclusion (`≤`)
  - Agreement on overlaps (`∀ x = y, f x = g y`)

---

### **5. Imports**

- `Mathlib.LinearAlgebra.Prod`: Provides product modules and projections.
- Core dependencies (implicit via universe polymorphism & typeclass inference):
  - `Ring`, `AddCommGroup`, `Module`
  - `Submodule`, `LinearMap`
  - `Order.Bot`, `Order.Inf`, `DirectedOn`, `Classical`

---

Let me know if you'd like a diagram of the lattice structure or a summary of how `sSup` enables the Hahn-Banach theorem.