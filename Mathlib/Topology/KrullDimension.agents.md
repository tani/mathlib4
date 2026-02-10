### Technical Metadata Brief: Krull Dimension of a Topological Space (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `topologicalKrullDim` | `TopologicalSpace T → WithBot ℕ∞` | Defines the Krull dimension of a topological space as the Krull dimension of the poset of closed irreducible subsets. |
| `IrreducibleCloseds.map` | `(f : X → Y) → Continuous f → IsClosedMap f → IrreducibleCloseds X → IrreducibleCloseds Y` | Pushforward of closed irreducible subsets along a closed continuous map. |
| `IrreducibleCloseds.map_strictMono` | `(hf : IsClosedEmbedding f) → StrictMono (IrreducibleCloseds.map …)` | Shows that image under a closed embedding strictly preserves inclusion order on irreducible closed subsets. |
| `IsClosedEmbedding.topologicalKrullDim_le` | `(f : X → Y) → IsClosedEmbedding f → topologicalKrullDim X ≤ topologicalKrullDim Y` | Monotonicity of Krull dimension under closed embeddings. |
| `IsHomeomorph.topologicalKrullDim_eq` | `(f : X → Y) → IsHomeomorph f → topologicalKrullDim X = topologicalKrullDim Y` | Invariance of Krull dimension under homeomorphisms. |
| `alias ClosedEmbedding.topologicalKrullDim_le` | `ClosedEmbedding.topologicalKrullDim_le := IsClosedEmbedding.topologicalKrullDim_le` | Backward compatibility alias for deprecated name. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `topologicalKrullDim`: Combines domain (`topological`) with concept (`KrullDim`).
  - `IrreducibleCloseds.*`: Namespace for constructions on the type `IrreducibleCloseds T`.
- **Suffixes**:
  - `_le`: Indicates an inequality direction (≤).
  - `_eq`: Indicates equality.
  - `_map`: Indicates a functorial or mapping construction.
  - `_stricMono`: Indicates strict monotonicity.
- **Adjectives**:
  - `is_closed`, `is_irreducible`: Boolean predicates on subsets.
  - `isClosedEmbedding`, `isHomeomorph`: Properties of maps.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `fun ⦃_ _⦄ … ↦ …`: Implicit lambda with implicit arguments.
  - `hf.injective.image_strictMono UltV`: Uses `injective` and `image_strictMono` lemmas.
  - `le_antisymm fwd bwd`: Standard antisymmetry for partial orders.
  - `have fwd := …; have bwd := …`: Local proof construction.
  - `hf.isClosedEmbedding`, `(h.homeomorph f).symm.isClosedEmbedding`: Projection of structure fields.

- **No explicit automation tactics** like `aesop`, `ring`, or `simp` appear in this snippet — proofs are largely *constructive* and *structure-based*.

---

#### **4. Proof Logic**

- **General Strategy**:
  - Leverages existing order-theoretic Krull dimension (`krullDim`) on the preorder `IrreducibleCloseds T`.
  - For monotonicity: Show that a closed embedding induces a *strictly monotone* map on irreducible closed subsets → apply `krullDim_le_of_strictMono`.
  - For invariance under homeomorphism: Use bidirectional inequality via forward and backward embeddings (since a homeomorphism is both an embedding and its inverse is too).

- **Logical Flow**:
  1. Construct induced map on irreducible closed subsets.
  2. Prove it's strictly monotone (using injectivity of the embedding).
  3. Apply general order-theoretic lemma (`krullDim_le_of_strictMono`) to get inequality.
  4. For equality, apply inequality twice (forward + inverse) and use antisymmetry.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Order.KrullDimension` | Provides `krullDim`, `StrictMono`, `krullDim_le_of_strictMono`, and the order-theoretic foundation. |
| `Mathlib.Topology.Sets.Closeds` | Provides `IrreducibleCloseds`, related topology on closed subsets, and basic properties (e.g., image of irreducible under continuous map is irreducible). |

> **Note**: The module builds on top of `Order.KrullDimension`, interpreting topological irreducible closed subsets as an ordered structure.

--- 

Let me know if you'd like a formalized summary for documentation or a tactic-level trace of a specific proof.