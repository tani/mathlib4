### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAtFilter.star` | `HasDerivAtFilter f f' x L → HasDerivAtFilter (star ∘ f) (star f') x L` | Propagates derivative existence through `star` at a filter. |
| `HasDerivWithinAt.star` | `HasDerivWithinAt f f' s x → HasDerivWithinAt (star ∘ f) (star f') s x` | Propagates *within-set* derivative existence through `star`. |
| `HasDerivAt.star` | `HasDerivAt f f' x → HasDerivAt (star ∘ f) (star f') x` | Propagates *pointwise* derivative existence through `star`. |
| `HasStrictDerivAt.star` | `HasStrictDerivAt f f' x → HasStrictDerivAt (star ∘ f) (star f') x` | Propagates *strict* derivative existence through `star`. |
| `derivWithin.star` | `UniqueDiffWithinAt 𝕜 s x → derivWithin (star ∘ f) s x = star (derivWithin f s x)` | Computes derivative *within a set* under `star`, assuming unique differentiability. |
| `deriv.star` | `deriv (star ∘ f) x = star (deriv f x)` | Computes pointwise derivative under `star`. |
| `deriv.star'` | `(deriv (star ∘ f)) = star ∘ deriv f` | Global equality of derivative functions (extensional). |

> **Note**: All theorems assume:
> - `𝕜` is a *nontrivially normed field* with `StarRing` and `TrivialStar`.
> - `F` is a *normed additive commutative group* and *normed space* over `𝕜`, with `StarAddMonoid`, `ContinuousStar`, and `StarModule` structure.
> - `TrivialStar 𝕜` ensures `star : 𝕜 → 𝕜` is the identity (e.g., rules out `𝕜 = ℂ`).

#### 2. **Naming Conventions**
- **Prefixes**:
  - `HasDerivAt*`, `deriv*`: Standard derivative notions in Mathlib (`HasDerivAt`, `HasDerivWithinAt`, `deriv`, `derivWithin`).
  - `star`: Applied as a suffix to indicate composition with `star`.
- **Suffixes**:
  - `.star`: Indicates the theorem applies the `star` operation to the function and/or derivative value.
- **Modifiers**:
  - `protected nonrec`: Used to avoid name clashes and prevent unfolding of definitions during simplification.
  - `[simp]`: Applied to `deriv.star'` to enable automatic simplification.

#### 3. **Tactic Stack**
- `simpa`: Used to simplify goals using lemmas (e.g., `h.star.hasDerivAtFilter`, `h.star`).
- `exact`: Implicit via `simpa` or ` rfl` (not explicit here, but `simpa` suffices).
- `DFunLike.congr_fun`: Used to convert pointwise equality of functions into function equality (via extensionality).
- `funext`: Explicitly used in `deriv.star'` to prove function extensionality.

#### 4. **Proof Logic**
- **Pattern**: All proofs follow a *structural induction* or *composition chain* logic:
  1. Use the fact that `star` is a morphism (e.g., `StarAddMonoid`, `StarModule`) to lift derivative properties.
  2. For filter-based derivatives (`HasDerivAtFilter`, `HasStrictDerivAt`), rely on pre-existing lemmas like `h.star` or `h.star.hasDerivAtFilter`.
  3. For `deriv`/`derivWithin`, use `fderiv_star` (from `Mathlib.Analysis.Calculus.FDeriv.Star`) and apply `DFunLike.congr_fun` to extract pointwise equality.
  4. For `deriv.star'`, conclude via `funext` to lift pointwise equality to function equality.

#### 5. **Imports**
- `Mathlib.Analysis.Calculus.Deriv.Basic`: Core derivative definitions (`HasDerivAt`, `deriv`, etc.).
- `Mathlib.Analysis.Calculus.FDeriv.Star`: Provides `fderiv_star`, the key lemma used in `derivWithin.star` and `deriv.star`.

---

**Domain-Specific AI Agent Notes**:
- This module formalizes *calculus with involution* (star operations), restricted to *trivially starred fields*.
- Critical assumptions: `TrivialStar 𝕜` (so `star = id` on `𝕜`) and `StarModule 𝕜 F` (compatibility of scalar multiplication with `star`).
- Avoids complex numbers (`ℂ`) due to nontrivial `star` (complex conjugation), aligning with the comment in the docstring.