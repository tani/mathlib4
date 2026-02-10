### Technical Brief: Ultraproducts and Łoś’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `setoidPrestructure` | `L.Prestructure ((u : Filter α).productSetoid M)` | Constructs a prestructure on the product setoid induced by the ultrafilter `u`, defining function and relation maps via pointwise operations and eventual behavior. |
| `structure` | `L.Structure ((u : Filter α).Product M)` | Lifts `setoidPrestructure` to a full structure on the quotient (i.e., the ultraproduct), via `Language.quotientStructure`. |
| `funMap_cast` | `funMap f (x : Fin n → ∀ a, M a)` maps to pointwise `funMap f (x i a)` | Justifies that function symbols behave pointwise on representatives before quotienting. |
| `term_realize_cast` | `t.realize (x i : ultraproduct)` = `fun a => t.realize (x i a)` | Shows term evaluation commutes with the quotient map; terms evaluate pointwise almost everywhere. |
| `boundedFormula_realize_cast` | `φ.Realize (x i : ultraproduct, v i : ultraproduct) ↔ ∀ᶠ a ∈ u, φ.Realize (x i a, v i a)` | Core technical lemma: bounded formulas are realized in the ultraproduct iff they hold `u`-eventually. Proven by induction on formulas. |
| `realize_formula_cast` | Same as above but for *all* formulas (not just bounded) | Extends the previous result to full first-order formulas using equivalence of bounded and unrestricted realizability. |
| `sentence_realize` (**Łoś’s Theorem**) | `ultraproduct ⊨ φ ↔ ∀ᶠ a ∈ u, M a ⊨ φ` | Main theorem: a sentence holds in the ultraproduct iff the set of indices where it holds is in the ultrafilter. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cast`: Indicates coercion or lifting along quotient maps (`funMap_cast`, `term_realize_cast`, `realize_formula_cast`).
  - `setoidPrestructure`: Combines `setoid` + `prestructure`, reflecting the intermediate step before quotienting.
  - `«structure»`: Quoted identifier for the instance (nonrec), indicating it's defined via quotient.
- **Suffixes**:
  - `_cast`: As above — transport of definitions through quotient.
  - `_realize`: Relates to satisfaction/realization of terms/formulas.
- **Other patterns**:
  - `eventually` / `∀ᶠ`: Central to filter-based reasoning; used in `eventually_imp`, `eventually_not`, etc.
  - `Product`: Refers to filter product (`Filter.Product M`) and its quotient (ultraproduct).

---

#### **3. Tactic Stack**

The proofs rely heavily on:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise lemmas (e.g., `term_realize_cast`, `ih`, `h2`). |
| `rw [...]` | Rewriting using definitional equalities and induction hypotheses. |
| `convert ... using 2` | For term/structure definitions where only the outer constructor matters. |
| `ext a` | Extensionality for functions (e.g., proving `funext ha2`). |
| `induction φ with ...` | Structural induction on formulas (bounded → imp → all). |
| `refine ...` / `exact ...` | Goal-directed construction, especially in filter membership arguments. |
| `contrapose!` | Used in the `∀`-case to construct a counterexample family via choice. |
| `erw [...]` | Eager rewriting (used for complex substitutions like `term_realize_cast` under `RelMap`). |
| `apply relMap_quotient_mk'` | Applies the universal property of quotient structures for relations. |
| `classical` / `Classical.epsilon` | Choice-based constructions (e.g., picking witnesses for negated universals). |

---

#### **4. Proof Logic**

- **Inductive structure** dominates the development:
  - **Base cases**: `falsum`, `equal`, `rel` — handled via simplification and properties of quotient maps (`Quotient.eq''`, `relMap_quotient_mk'`).
  - **Inductive steps**:
    - `imp`: Uses `Ultrafilter.eventually_imp`.
    - `all`: Most complex case:
      - Reduces to quantification over the ultraproduct via `Quotient.forall`.
      - Uses `Fin.snoc` and `Fin.comp_snoc` to handle variable extensions.
      - Proves equivalence by constructing:
        - ⇒ direction: From failure in ultraproduct, builds a `u`-large set where failure occurs (using choice).
        - ⇐ direction: From eventual satisfaction, lifts to full satisfaction in the quotient.
- **Filter-theoretic reasoning**:
  - Relies on `eventually`, `mem_of_superset`, `inter_mem`, `iInter_mem`.
  - Ultrafilter-specific lemmas: `eventually_imp`, `eventually_not`, `Ultrafilter.eventually_iff`.
- **Quotient machinery**:
  - Central use of `quotientStructure`, `quotient_mk'`, and related lemmas to lift operations to the ultraproduct.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.ModelTheory.Quotients` | Provides general quotient structure machinery (e.g., `quotientStructure`, `quotient_mk'`). |
| `Mathlib.Order.Filter.Germ.Basic` | Supplies germ/filter-based constructions (e.g., `productSetoid`, `Product`). |
| `Mathlib.Order.Filter.Ultrafilter` | Ultrafilter-specific lemmas (`eventually_imp`, `eventually_not`, choice-based constructions). |

**Domain Scope**:  
This file formalizes **first-order model theory** over **ultraproducts**, with emphasis on:
- Constructing ultraproducts as filter-based quotients.
- Proving Łoś’s Theorem for arbitrary languages and structures.
- Handling bounded and full formulas uniformly via realizability.

It serves as a foundational module for further model-theoretic developments (e.g., compactness, saturation, nonstandard analysis).

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader Mathlib model theory hierarchy.