### Technical Metadata Brief: Kruskal–Katona Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `shadow` (`∂`) | `Finset (Finset α) → Finset (Finset α)` | The *shadow* of a family of sets: all subsets of size one less that are contained in some set in the family. |
| `initSeg s` | `Finset (Finset α)` | Initial segment of the colex order up to `s`. |
| `toColex` | `Finset (Fin n) → ℕ` | Encodes a finite subset of `Fin n` as a natural number via binary representation (colex order). |
| `compress U V s` | `Finset (Fin n) → Finset (Fin n) → Finset (Fin n) → Finset (Fin n)` | A *compression* operation shifting elements from `U` to `V` when `max U < max V`. |
| `UsefulCompression U V` | `Prop` | `U` and `V` are disjoint, same size, nonempty, and `max U < max V`. |
| `familyMeasure` | `Finset (Finset (Fin n)) → ℕ` | A measure quantifying how "uncompressed" a family is: sum over sets and elements of powers of 2. |
| `kruskal_katona` | `(𝒜 : Finset (Finset (Fin n))) → (r : ℕ) → (𝒜 : Set _) .Sized r → (𝒞 : Finset _) → IsInitSeg 𝒞 r → #𝒜 ≥ #𝒞 → #(∂ 𝒞) ≤ #(∂ 𝒜)` | Main Kruskal–Katona theorem: initial segments minimize shadow size. |
| `iterated_kk` | `(#(∂^[k] 𝒞) ≤ #(∂^[k] 𝒜))` | Iterated shadow version: same result for `k`-fold shadows. |
| `kruskal_katona_lovasz_form` | `(i ≤ r ≤ k ≤ n) → k.choose r ≤ #𝒜 → k.choose (r - i) ≤ #(∂^[i] 𝒜)` | Lovász form: gives explicit lower bounds using binomial coefficients. |
| `erdos_ko_rado` | `(𝒜 : Finset (Finset (Fin n))) → Intersecting 𝒜 → Sized r → r ≤ n / 2 → #𝒜 ≤ (n - 1).choose (r - 1)` | Classic intersecting families bound; uses Kruskal–Katona in proof. |
| `shadow_initSeg` | `∂ (initSeg s) = initSeg (erase s (min' s hs))` | Shadow of an initial segment is again an initial segment. |
| `isInitSeg_of_compressed` | `∀ U V, UsefulCompression U V → IsCompressed U V ℬ ⇒ IsInitSeg ℬ r` | Fully compressed families are initial segments. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: predicates (e.g., `isInitSeg`, `IsCompressed`)
  - `mem_`: membership lemmas (e.g., `mem_shadow_iff_insert_mem`, `mem_initSeg`)
  - `card_`: cardinality-related (e.g., `card_erase_of_mem`, `card_compression`)
  - `compress_`: compression lemmas (e.g., `compress_sdiff_sdiff`, `compression_improved`)
  - `toColex_`: colex encoding lemmas (e.g., `toColex_compress_lt_toColex`, `toColex_image_lt_toColex_image`)
  - `familyMeasure_`: measure-related (e.g., `familyMeasure_compression_lt_familyMeasure`)
  - `initSeg_`: initial segment lemmas (e.g., `initSeg_initSeg`, `shadow_initSeg`)

- **Suffixes**:
  - `_le`, `_lt`, `_ge`, `_gt`: inequality directions
  - `_mem`, `_nonempty`, `_disjoint`: structural properties
  - `_iter`, `_iterate`: iteration-related (e.g., `iterated_kk`, `shadow_iterate`)
  - `_form`: formulations (e.g., `kruskal_katona_lovasz_form`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `ext` | Extensionality for set equality |
| `simp only`, `simp_rw` | Simplification with rewrite rules (especially for `mem_`, `card_`, `filter_`, `sum_`) |
| `rw [← ...]` | Rewriting using equalities (often to substitute definitions) |
| `cases'` / `cases` | Case analysis on `Nat`, `Finset`, or `or`/`and` structure |
| `obtain` / `have` / `suffices` | Introducing intermediate results or goals |
| `convert` / `congr!` | Congruence-based goal simplification (especially for equalities involving `#`, `∂`, `choose`) |
| `omega` | Solving linear arithmetic over `ℕ` (e.g., inequalities involving `r ≤ n / 2`) |
| `aesop` / `tauto` | Logical reasoning (less frequent, but used in simpler parts) |
| `ring` / `linarith` | Arithmetic simplification (e.g., binomial coefficient identities) |
| `exact`, `refine`, `apply` | Proof term construction |
| `termination_by` | Well-founded recursion (used in `kruskal_katona_helper`) |

---

#### **4. Proof Logic**

- **Inductive/Recursive Strategy**:
  - **Main proof of `kruskal_katona`**:
    1. Reduce to case `#𝒜 = #𝒞` via subset extraction.
    2. Use `kruskal_katona_helper` to compress `𝒜` into a fully compressed family `ℬ` with no larger shadow.
    3. Show `ℬ` is an initial segment via `isInitSeg_of_compressed`.
    4. Conclude `ℬ = 𝒞` by totality of colex order and equal size.

- **`kruskal_katona_helper`**:
  - Uses *well-founded recursion* on `familyMeasure`.
  - At each step, applies the *smallest* useful compression (by cardinality of `U`) that changes the family.
  - Stops when no useful compression remains ⇒ fully compressed ⇒ initial segment.

- **Iterated shadow (`iterated_kk`)**:
  - Induction on `k`.
  - Base case trivial.
  - Inductive step: apply `kruskal_katona` to shadows and use `h₃.shadow` to propagate initial segment property.

- **Erdős–Ko–Rado**:
  - Uses *complement families* and *disjointness* of `𝒜` and its high iterated shadow.
  - Applies `kruskal_katona_lovasz_form` to get lower bound on shadow size.
  - Derives contradiction if family too large.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Combinatorics.Colex`: Colex order, encoding (`toColex`), initial segments.
- `Mathlib.Combinatorics.SetFamily.Compression.UV`: `compress`, `UsefulCompression`, `familyMeasure`.
- `Mathlib.Combinatorics.SetFamily.Intersecting`: Intersecting families, used in EKR.
- `Mathlib.Data.Finset.Fin`: Finite sets over `Fin n`, cardinality arithmetic.

**Key Scope Openings**:
- `open Nat`
- `open scoped FinsetFamily`
- `open Finset Colex Nat UV`

**Notable Local Variables**:
- `α : Type* [LinearOrder α]`
- `𝒜, 𝒞 : Finset (Finset α)`
- `r, k, i, n : ℕ`
- `U, V, s : Finset α`

---

#### **6. Future Work (from File)**

- Define `k`-cascade representation and prove corresponding KK version.
- Generalize beyond `Fin n` (e.g., `LocallyFiniteOrderBot`).
- Characterize equality cases (currently not formalized).

--- 

This metadata reflects the structure, proof methodology, and formalization style of the Kruskal–Katona theorem in Lean 4, suitable for domain-specific AI agent training or formal verification tooling.