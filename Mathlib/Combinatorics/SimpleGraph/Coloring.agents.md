Here's a structured technical brief extracted from the provided Lean 4 file on **Graph Coloring**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Coloring α` | `G →g (⊤ : SimpleGraph α)` | Type of proper colorings of `G` with colors in `α`; equivalently, graph homomorphisms to the complete graph on `α`. |
| `Colorable n` | `Prop` | `G` is *n*-colorable: there exists a coloring with at most `n` colors (i.e., `G →g ⊤[Fin n]`). |
| `chromaticNumber` | `ℕ∞` | Minimal number of colors needed to color `G`; `⊤` if no finite coloring exists. |
| `colorClass c` | `Set V` | Set of vertices assigned color `c` under coloring `C`. |
| `colorClasses` | `Set (Set V)` | Partition of `V` induced by `C`, i.e., kernel classes of `C`. |
| `Coloring.mk` | `(V → α) → (∀ {v w}, G.Adj v w → color v ≠ color w) → G.Coloring α` | Constructor for colorings via a function satisfying properness. |
| `selfColoring` | `G.Coloring V` | Tautological coloring using vertices as colors (`id` map). |
| `recolorOfEmbedding` | `(α ↪ β) → G.Coloring α ↪ G.Coloring β` | Induced embedding of colorings along an embedding of color sets. |
| `recolorOfEquiv` | `(α ≃ β) → G.Coloring α ≃ G.Coloring β` | Equivalence of colorings under bijection of color sets. |
| `chromaticNumber_le_iff_colorable` | `G.chromaticNumber ≤ n ↔ G.Colorable n` | Fundamental equivalence linking chromatic number and colorability. |
| `chromaticNumber_eq_iff_forall_surjective` | `G.chromaticNumber = n ↔ ∀ C : G.Coloring (Fin n), Surjective C` | Characterization of exact chromatic number via surjectivity of all colorings. |
| `IsClique.card_le_chromaticNumber` | `G.IsClique s → s.card ≤ G.chromaticNumber` | Size of any clique ≤ chromatic number (lower bound). |
| `Colorable.cliqueFree` | `G.Colorable n → n < m → G.CliqueFree m` | If `G` is `n`-colorable, it has no clique of size `> n`. |
| `chromaticNumber_top` | `[Fintype V] ⇒ (⊤ : SimpleGraph V).chromaticNumber = Fintype.card V` | Chromatic number of complete graph = number of vertices. |
| `chromaticNumber_bot` | `[Nonempty V] ⇒ (⊥ : SimpleGraph V).chromaticNumber = 1` | Chromatic number of empty graph = 1. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `colorable_`: propositions about existence of colorings (`colorable_of_isEmpty`, `colorable_chromaticNumber`).
  - `chromaticNumber_`: properties of the chromatic number (`chromaticNumber_le_iff_colorable`, `chromaticNumber_pos`).
  - `recolorOf_`: constructions for transforming colorings (`recolorOfEmbedding`, `recolorOfEquiv`, `recolorOfCardLE`).
  - `colorClass`, `colorClasses`: related to partitioning by color.

- **Suffixes**:
  - `_of_`: derived from a condition (`colorable_of_isEmpty`, `isEmpty_of_chromaticNumber_eq_zero`).
  - `_iff_`: biconditional characterizations (`chromaticNumber_le_iff_colorable`, `card_le_chromaticNumber_iff_forall_surjective`).
  - `_mono`: monotonicity lemmas (`Colorable.mono`, `chromaticNumber_mono`).

- **Type suffixes**:
  - `_Coloring`: type of colorings (`G.Coloring α`).
  - `_Colorable`: proposition of colorability (`G.Colorable n`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification of goals and hypotheses, especially with `Fin`, `Fin.val`, `Setoid`, `Fintype`, `ENat`.
- `rw`: rewriting using equivalences and definitions (e.g., `chromaticNumber`, `colorClasses`).
- `exact`, `apply`, `intro`, `cases`: standard proof scripting.
- `convert`: for approximate unification (e.g., in `card_colorClasses_le`).
- `by_contra`, `contrapose!`: for contradiction arguments (e.g., in `chromaticNumber_pos`, `card_le_chromaticNumber_iff_forall_surjective`).
- `aesop`: likely used in simpler automation (not explicitly shown but common in modern Mathlib).
- `norm_cast`: for lifting inequalities over `ℕ → ℕ∞`.
- `ext`: extensionality for functions/sets.
- `classical`: for classical reasoning (e.g., in `recolorOfCardLE`, `Colorable.toColoring`).

---

### **4. Proof Logic**

- **Inductive/constructive style**: Most definitions are constructive (e.g., `Coloring.mk`, `recolorOfEmbedding`).
- **Case analysis**: Common on finite types (`Fin n`, `Bool`, `Sum`) and embeddings (`v.isRight`, `Sum.inl/inr`).
- **Cardinality arguments**: Many proofs rely on finite type cardinalities (`Fintype.card`, `Finset.card`), especially for bounding chromatic number.
- **Surjectivity ↔ bijectivity**: Used in characterizations of exact chromatic number (e.g., `chromaticNumber_eq_iff_forall_surjective`).
- **Contrapositive reasoning**: Frequent in lower bound proofs (e.g., clique size ≤ chromatic number).
- **Monotonicity**: Proofs often reduce to monotonicity lemmas (`Colorable.mono`, `chromaticNumber_mono`).
- **Equivalence/Embedding transport**: Colorings are transported along embeddings/equivalences of color sets.

---

### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Combinatorics.SimpleGraph.Clique`: clique theory.
- `Mathlib.Data.ENat.Lattice`: extended naturals (`ℕ∞`) for chromatic number.
- `Mathlib.Data.Nat.Lattice`: natural numbers with lattice structure.
- `Mathlib.Data.Setoid.Partition`: partitions and kernel classes.
- `Mathlib.Order.Antichain`: antichains (used in `color_classes_independent`).
- `Mathlib.Data.Nat.Cast.Order.Ring`: ordered ring structure of `ℕ`.

---

Let me know if you'd like a dependency graph, API summary, or formalization recommendations for the "TODO" items (trees, planar graphs, chromatic polynomials, partial colorings).