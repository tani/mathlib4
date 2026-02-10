**Technical Metadata Brief: `sleep_heartbeats` Tactic (Lean 4)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sleepAtLeastHeartbeats` | `Nat → IO Unit` | Low-level IO action that busy-waits until at least `n` heartbeats have elapsed. Uses `IO.getNumHeartbeats` to poll heartbeat count. |
| `sleep_heartbeats` | Elaborator (`elab` tactic) | User-facing tactic syntax: `sleep_heartbeats n` (where `n` is a literal natural number). Internally multiplies `n` by 1000 before calling `sleepAtLeastHeartbeats`. |
| `example` | `1 = 1` | Demonstrative usage: tactic block that sleeps for ≥1,000,000 heartbeats before proving trivial equality via `rfl`. |

---

### 2. **Naming Conventions**

- **Prefixes**:  
  - `sleep_` — indicates delay/sleep behavior.  
  - `isNatLit?` — standard Lean `Syntax` utility for pattern-matching numeric literals (note: not a user-defined convention, but part of the elaborator API).
- **Suffixes**:  
  - `_heartbeats` — clarifies the unit of measurement (heartbeats, not wall-clock time).  
  - `_at_least_` — in `sleepAtLeastHeartbeats`, emphasizes non-strict lower bound semantics.

---

### 3. **Tactic Stack**

- **Core tactics used**:  
  - `sleep_heartbeats` itself is an *elaborator tactic* (not a runtime tactic), so it doesn’t compose with standard tactics like `simp`, `rw`, etc., in the usual sense.  
  - In the example: `rfl` (reflexivity) is used after the delay.  
- **Elaborator-specific utilities**:  
  - `Syntax.isNatLit?` — to extract numeric literal from syntax.  
  - `throwIllFormedSyntax` — for error handling on malformed input.  
  - `IO.getNumHeartbeats`, `IO.Unit`, `while` loop — standard IO primitives.

---

### 4. **Proof Logic / Elaboration Flow**

- **Elaboration phase (compile-time)**:  
  1. Parse input syntax `n` as a numeric literal.  
  2. If invalid → raise syntax error via `throwIllFormedSyntax`.  
  3. If valid → multiply literal `m` by `1000` (to align with `maxHeartbeats` option scaling).  
  4. Call `sleepAtLeastHeartbeats (m * 1000)` — an `IO` action executed *during tactic elaboration*, blocking until heartbeat threshold is reached.  
- **Runtime (proof execution)**:  
  - The tactic *does not appear in the final proof term* — it’s purely an elaborator-time side effect.  
  - After delay, the rest of the tactic block (e.g., `rfl`) proceeds normally.

> **Note**: This is *not* a proof tactic in the logical sense — it’s a debugging/demo tool that injects a controlled delay into tactic elaboration.

---

### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Init` | Provides foundational Lean infrastructure (including `IO`, basic types). |
| `Lean.Elab.Tactic.Basic` | Supplies elaborator tactic infrastructure: `elab`, `tactic` kind, syntax parsing utilities (`Syntax.isNatLit?`, `throwIllFormedSyntax`). |

> **No Mathlib theorems or definitions are used** — this is a self-contained utility relying only on Lean’s core IO and elaboration APIs.

---

### Summary

The `sleep_heartbeats` tactic is a **low-level, non-logical debugging tool** for simulating delays in tactic elaboration by consuming a specified number of Lean heartbeats. It is explicitly documented as unstable and unsuitable for production use, intended only for testing, demos, or performance profiling. Its implementation is minimal, relying on polling `IO.getNumHeartbeats` in a tight loop.