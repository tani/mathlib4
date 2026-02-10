### Technical Brief: `Hom.lean` — Bundled Hom Instances for Module and Multiplicative Actions

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ZeroHom.instModule` | `[Semiring R] [AddMonoid A] [AddCommMonoid B] [Module R B] → Module R (ZeroHom A B)` | Equips the type of zero-preserving homomorphisms with an $R$-module structure induced pointwise from $B$. |
| `AddMonoidHom.instModule` | `[Semiring R] [AddMonoid A] [AddCommMonoid B] [Module R B] → Module R (A →+ B)` | Equips additive monoid homs with pointwise $R$-module structure. |
| `AddMonoidHom.instDomMulActModule` | `[Semiring S] [AddCommMonoid M] [AddCommMonoid M₂] [Module S M] → Module Sᵈᵐᵃ (M →+ M₂)` | Equips additive homs with a module structure over the *dominant multiplicative action* monoid $S^{d.m.a.}$, encoding how $S$ acts on homs via conjugation. |
| `AddMonoid.End.instModule` | `[Semiring R] [AddCommMonoid A] [Module R A] → Module R (AddMonoid.End A)` | Restricts the `AddMonoidHom.instModule` to endomorphisms. |
| `AddMonoid.End.applyModule` | `[AddCommMonoid A] → Module (AddMonoid.End A) A` | The *tautological action* of endomorphisms on the underlying type $A$, generalizing `applyDistribMulAction`. |
| `AddMonoidHom.smulLeft` | `[AddMonoid A] [DistribSMul M A] → M → A →+ A` | For fixed scalar $c$, the map $a \mapsto c • a$ is an additive monoid hom. Deprecated in favor of `DistribSMul.toAddMonoidHom`. |
| `AddMonoidHom.smul` | `[Semiring R] [AddCommMonoid M] [Module R M] → R →+ M →+ M` | Curried scalar multiplication: $r \mapsto (m \mapsto r • m)$, viewed as a hom of additive monoids. |

**Simp lemmas / theorems:**
- `AddMonoidHom.coe_smul'`: `⇑(.smul : R →+ M →+ M) = DistribSMul.toAddMonoidHom _`
- `AddMonoid.End.coe_smul`, `AddMonoid.End.smul_apply`: describe action on underlying functions.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `inst` for typeclass instances (`instModule`, `instDomMulActModule`, `instDistribSMul`, etc.)
  - `coe_` for coercion lemmas (`coe_smul`, `coe_smul'`)
  - `smul` for scalar multiplication–related definitions (`smulLeft`, `smul`)
- **Suffixes:**
  - `_apply` for lemmas about application: `smul_apply`
  - `_hom` for homomorphism types: `ZeroHom`, `AddMonoidHom`, `AddMonoid.End`
- **Special:**
  - `DomMulAct` refers to `DomAct` (domain action) constructions in `GroupAction.DomAct`.
  - `Sᵈᵐᵃ` is notation for `DomMulAct.S`, the monoid underlying the dominant multiplicative action.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `ext`: extensionality for homs (e.g., `AddMonoidHom.ext`, `ZeroHom.ext`)
- `simp_rw` / `simp`: rewriting with simp lemmas, especially for `map_add`, `add_smul`, `smul_add`
- `rw`: direct rewriting (e.g., `rw [DomMulAct.smul_addMonoidHom_apply]`)
- `rfl`: for definitional equalities (e.g., `coe_smul` is definitionally `rfl`)
- `by simp [DomMulAct.mk, MulOpposite.opEquiv]`: ad-hoc simplification for Opposite/`mk` constructions.

No heavy automation like `aesop` or `linarith` is used—proofs are mostly structural and rely on definitional properties.

---

#### **4. Proof Logic**

- **Pointwise lifting**: Module structure on homs is defined pointwise; proofs reduce to properties in the codomain.
  - E.g., `add_smul` for `AddMonoidHom` is proved by extensionality: show $(r • (f + g))(x) = (r • f + r • g)(x)$ for all $x$, using `add_smul` in $B$.
- **Currying / uncurrying**: `smul : R →+ M →+ M` uses curried structure; proofs use `AddMonoidHom.ext` and `simp_rw` to unfold application.
- **Opposite/`DomMulAct` handling**: For `instDomMulActModule`, the action is defined via `DomMulAct.smul_addMonoidHom_apply`, and proofs use algebraic identities like `← map_add`, `← add_smul`.
- **Endomorphism specialization**: Instances for `AddMonoid.End` are mostly copied or derived from `AddMonoidHom` instances, with additional lemmas about `smul_apply`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Hom.Instances` | Basic hom instances (e.g., `ZeroHom`, `AddMonoidHom`) |
| `Mathlib.Algebra.GroupWithZero.Action.End` | Endomorphism actions (e.g., `MulAction.End`, `DistribMulAction.End`) |
| `Mathlib.Algebra.GroupWithZero.Action.Hom` | Homomorphism actions (e.g., `DomMulAct`) |
| `Mathlib.Algebra.Module.End` | Module endomorphism ring structure |
| `Mathlib.Algebra.Ring.Opposite` | Opposite monoids/rings (`MulOpposite`, `opEquiv`) |
| `Mathlib.GroupTheory.GroupAction.DomAct.Basic` | Dominant multiplicative action (`DomMulAct`) |

→ This file lives in the *module/hom interface layer*, bridging bundled homs with module theory and group actions.

---

#### **8. Mermaid Diagrams**

##### **Dependency Graph (Top-Level)**

```mermaid
graph TD
  Hom --> GroupHomInstances
  Hom --> ActionEnd
  Hom --> ActionHom
  Hom --> ModuleEnd
  Hom --> RingOpposite
  Hom --> DomActBasic

  GroupHomInstances --> "Algebra.Group.Hom"
  ActionEnd --> "GroupWithZero.Action.End"
  ActionHom --> "GroupWithZero.Action.Hom"
  ModuleEnd --> "Algebra.Module.End"
  RingOpposite --> "Algebra.Ring.Opposite"
  DomActBasic --> "GroupTheory.GroupAction.DomAct"
```

##### **Overview of `Hom.lean` Structure**

```mermaid
flowchart LR
  A[ZeroHom] -->|instModule| B[Module R (ZeroHom A B)]
  C[AddMonoidHom] -->|instModule| D[Module R (A →+ B)]
  C -->|instDomMulActModule| E[Module Sᵈᵐᵃ (M →+ M₂)]
  F[AddMonoid.End] -->|instModule| G[Module R (End A)]
  F -->|applyModule| H[Module (End A) A]
  C -->|smulLeft| I[M → A →+ A]
  C -->|smul| J[R →+ M →+ M]
```

##### **Layered Theory Context**

```mermaid
flowchart TB
  subgraph "Bundled Hom Types"
    Z[ZeroHom A B]
    A[AddMonoidHom A B]
    E[AddMonoid.End A]
  end

  subgraph "Module Theory"
    M[Module R B]
    ME[Module R (End A)]
    MA[Module R (A →+ B)]
    MD[Module Sᵈᵐᵃ (M →+ M₂)]
  end

  subgraph "Group Actions"
    DA[DistribMulAction R A]
    DAA[DistribMulAction R (End A)]
    DD[DomMulAct S A]
  end

  Z -->|pointwise| M
  A -->|pointwise| M
  E -->|restriction| MA
  A -->|DomMulAct| DD
  DA -->|induces| DAA
```

---

This file formalizes the *algebra of homomorphisms* in the bundled setting, enabling reasoning about module structures on function spaces and endomorphism rings in a way compatible with Lean’s typeclass inference and simp machinery.
