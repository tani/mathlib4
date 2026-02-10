### Technical Metadata Brief: `Dart` in `SimpleGraph`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Dart` | `structure Dart extends V × V` with `adj : G.Adj fst snd` | Represents an *oriented edge* (half-edge/bond) as an ordered pair of adjacent vertices. |
| `Dart.ext` / `Dart.ext_iff` | `d₁ = d₂ ↔ d₁.toProd = d₂.toProd` | Extensionality principle: two darts are equal iff their underlying pairs are equal. |
| `Dart.fst_ne_snd` / `Dart.snd_ne_fst` | `d.fst ≠ d.snd` | No loops: endpoints of a dart are distinct (uses irreflexivity of adjacency). |
| `Dart.toProd_injective` | `Function.Injective Dart.toProd` | Injectivity of the projection from darts to vertex pairs. |
| `Dart.fintype` | `[Fintype V] [DecidableRel G.Adj] ⇒ Fintype G.Dart` | Constructs a finite type structure on darts via equivalence with `Σ v, G.neighborSet v`. |
| `Dart.edge` | `d.edge : Sym2 V` | Maps a dart to its underlying *undirected* edge (symmetric pair). |
| `Dart.symm` | `d.symm : G.Dart` | Reverses orientation of a dart (swaps endpoints, uses symmetry of adjacency). |
| `Dart.symm_symm` | `d.symm.symm = d` | Involution property of reversal. |
| `Dart.symm_involutive` | `Function.Involutive Dart.symm` | Restates involution in functional terms. |
| `Dart.symm_ne` | `d.symm ≠ d` | A dart is never equal to its reverse (again, no loops). |
| `dart_edge_eq_iff` | `d₁.edge = d₂.edge ↔ d₁ = d₂ ∨ d₁ = d₂.symm` | Two darts have same underlying edge iff they are equal or reverses of each other. |
| `dartOfNeighborSet` | `v : V → w : G.neighborSet v ↦ dart` | Bijection between neighbors of `v` and darts starting at `v`. |
| `dartOfNeighborSet_injective` | Injectivity of `dartOfNeighborSet v` | Ensures distinct neighbors give distinct darts from `v`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Dart.`: All definitions/theorems about darts are prefixed with `Dart.`.
  - `dart_`: Some theorems (e.g., `dart_edge_eq_iff`) use lowercase `dart_` for lemmas internal to the module.
- **Suffixes**:
  - `_mk`: For simplification lemmas about constructors (`Dart.mk`, e.g., `Dart.edge_mk`, `Dart.symm_mk`).
  - `_iff`: Logical equivalences (`ext_iff`, `edge_eq_iff`, etc.).
  - `_involutive`, `_injective`, `_ne`: Properties of operations (`symm_involutive`, `toProd_injective`, `symm_ne`).
- **Projection names**: `fst`, `snd` used for components (via `toProd`), but direct field projections like `Dart.fst` are *not* declared as lemmas (see comment).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: For simplification, especially with `@[simp]` lemmas.
- `ext`: Extensionality (e.g., for subtype equality, product equality).
- `cases`: To destructure darts or subtypes.
- `intro` / `intro h`: For implication/quantifier handling.
- `convert`, `congr_arg`: For equational reasoning on structured terms.
- `apply`, `exact`: For direct proof steps.
- `rw`: Rewriting using known equalities.
- `aesop`: Not explicitly used here, but `simp`-based automation suffices.

---

#### **4. Proof Logic**

- **Structure-based reasoning**: Proofs often proceed by destructuring darts as `⟨p, hp⟩` (using `cases` or pattern matching).
- **Equational reasoning**: Many proofs are short and rely on simplification (`simp`) using `@[simp]` lemmas (e.g., `Dart.symm_symm`, `Dart.edge_symm`).
- **Logical equivalences**: Prove `↔` by splitting into `→` and `←`, often using `simp` or `apply Sym2.mk_eq_mk_iff`.
- **Injectivity/surjectivity**: Proven via direct construction of inverses or using `Subtype.ext`.
- **No-loops arguments**: Use `G.irrefl` and `h ▸ d.adj` to derive contradictions from equality of endpoints.

---

#### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Basic`: Core definitions of simple graphs (`SimpleGraph`, `Adj`, `edgeSet`, `Sym2`, etc.).
- `Mathlib.Data.Fintype.Sigma`: Used to construct `Fintype G.Dart` via equivalence with `Σ v, G.neighborSet v`.

---

### Summary

This module formalizes *darts* (oriented edges) in simple graphs, establishing foundational properties: injectivity, involution of reversal, bijection with neighbor sets, and relationship to undirected edges via `Sym2`. The proofs are mostly straightforward, leveraging Lean’s simplifier and extensionality principles, with heavy use of `@[simp]` annotations for automation. The design reflects Lean’s preference for structured data (`structure Dart extends V × V`) and avoids redundant projections (`fst`, `snd`) in favor of `toProd`.