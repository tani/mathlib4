### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsTotalPreorder.swap` | `∀ {r : α → α → Prop}, IsTotalPreorder α r → IsTotalPreorder α (swap r)` | Proves that swapping the arguments of a total preorder relation preserves the `IsTotalPreorder` property. |
| `[LinearOrder α] → IsTotalPreorder α (· ≤ ·)` | Instance | Shows that the standard order `≤` on a `LinearOrder` satisfies `IsTotalPreorder`. |
| `[LinearOrder α] → IsTotalPreorder α (· ≥ ·)` | Instance | Shows that the reverse order `≥` on a `LinearOrder` also satisfies `IsTotalPreorder`. |
| `[LinearOrder α] → IsIncompTrans α (· < ·)` | Instance | Proves that the strict order `<` on a `LinearOrder` is intransitive and transitive in the sense required by `IsIncompTrans`. |

> **Note**: All theorems/instances are marked `@[deprecated]`, indicating they belong to legacy code and should not be used in new developments.

#### 2. **Naming Conventions**
- **Prefixes**:
  - `Is*`: Used for relation class predicates (e.g., `IsTotalPreorder`, `IsIncompTrans`).
- **Suffixes**:
  - None prominent here; naming is mostly descriptive (`swap`, `swap r`).
- **Operator notation**:
  - Uses Lean’s infix syntax: `· ≤ ·`, `· ≥ ·`, `· < ·` — indicating binary relations defined by typeclass instances.

#### 3. **Tactic Stack**
- **`infer_instance`**: Used in the last theorem to synthesize the `IsIncompTrans` instance automatically.
- **Implicit use of `constructor` / `intro` / `apply`**: Likely used internally by `IsTotalPreorder.swap` (via `with` syntax combining two sub-proofs), though not explicitly shown.

#### 4. **Proof Logic**
- **Structure**:
  - For `IsTotalPreorder.swap`: Deconstructs the `IsTotalPreorder` instance into its components (`IsPreorder`, `IsTotal`) and re-applies them using corresponding lemmas (`IsPreorder.swap`, `IsTotal.swap`).
  - For the `LinearOrder` instances: Relies on existing typeclass resolution (`infer_instance`) to derive properties from the `LinearOrder` axioms.
- **Pattern**: Minimal manual proof scripting; mostly leveraging existing structure via `with` and `infer_instance`.

#### 5. **Imports**
- `Mathlib.Deprecated.AlgebraClasses`: Source of the `Is*` relation classes (e.g., `IsTotalPreorder`, `IsIncompTrans`).
- `Mathlib.Order.RelClasses`: Provides foundational definitions and lemmas about binary relations (e.g., `swap`, `IsPreorder`, `IsTotal`).

---

### Summary
This file contains **deprecated lemmas and instances** concerning *unbundled* relation classes (`Is*`) over types, particularly focusing on how total preorders and strict orders behave under swapping or arise from `LinearOrder`. It serves as a bridge for backward compatibility and is not intended for active use. The proofs are lightweight, relying on existing infrastructure in `RelClasses` and typeclass inference.