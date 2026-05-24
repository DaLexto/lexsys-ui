---
name: project-next-steps
description: >
  Analyze Lexsys monorepo maturity and suggest realistic next steps from
  REVIEW_TODO execution queue, ROADMAP phase status, and domain docs. Use when
  asked what to work on next, project status, backlog triage, stale plans,
  unfinished foundations, or implementation vs planned vs deferred architecture.
---

# Project next steps

Use this skill when the user asks **what to do next**, **project status**, or
**where the repo stands** — not when implementing a task already chosen.

Routing hub: [docs/INDEX.md](../../docs/INDEX.md).  
Agent guardrails: [AGENTS.md](../../AGENTS.md).

**Backlog owner:** [docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md) (what to do).
This skill owns **how to analyze** — do not copy queue rows into the skill files.

## When to use

- "What's next?" / "Where are we?" / "Suggest next steps"
- Picking work after a merge or between phases
- Detecting doc drift, stale counts, or backlog vs reality mismatch
- Choosing between foundation work and feature expansion

## When not to use

- User already named a task, branch, or PR scope — implement instead
- Pure doc edit pass — use **`$docs-alignment`**
- Pre-commit verification — use **`$monorepo-check-gate`**

---

## Step 1 — Read active state (in order)

| Order | Source                                                            | Extract                                                                          |
| ----- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1     | `git status`, `git branch --show-current`, `git log -5 --oneline` | In-flight work, recent merges                                                    |
| 2     | [docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md)                  | Execution queue, **in progress** / **partial** rows, Known Gaps, open P-sections |
| 3     | [docs/ROADMAP.md](../../docs/ROADMAP.md) header + phase tables    | Phase status; **Explicitly deferred**                                            |
| 4     | Domain doc for the active track only                              | Owner from REVIEW_TODO link or [docs/INDEX.md](../../docs/INDEX.md)              |
| 5     | [docs/INDEX.md](../../docs/INDEX.md)                              | Confirm canonical owner before deep-reading specs                                |

Do **not** treat ROADMAP "Current State" or REVIEW_TODO "Current State" bullet
lists as backlog — they describe **what already shipped**.

Mechanics: [analysis-mechanics.md](./analysis-mechanics.md).

---

## Step 2 — Classify findings

Label every candidate item with **one** category:

| Category        | Meaning                         | Source signals                                                     |
| --------------- | ------------------------------- | ------------------------------------------------------------------ |
| **Current**     | Shipped and enforced in code/CI | REVIEW_TODO Current State, ROADMAP `shipped`, tests green          |
| **In progress** | Active queue item               | REVIEW_TODO `in progress`, `partial`, open branch                  |
| **Planned**     | Committed backlog, not started  | REVIEW_TODO / ROADMAP `planned` rows without implementation        |
| **Deferred**    | Explicitly postponed            | ROADMAP § Explicitly deferred; REVIEW_TODO deferred notes          |
| **Speculative** | Vision without schedule         | Target doc says deferred / not scheduled (e.g. RESOLVER_EVOLUTION) |

If docs disagree with code, flag **doc drift** and prefer **`$docs-alignment`**
before recommending feature work.

---

## Step 3 — Maturity spot-check (lightweight)

Verify claims only for tracks you might recommend — not a full audit.

```sh
pnpm check   # only if user wants verify in analysis; otherwise note "unverified"
```

Probes: [analysis-mechanics.md § Layer spot-checks](./analysis-mechanics.md#layer-spot-checks-by-track).

Also check:

- Catalog counts vs package READMEs and domain docs
- REVIEW_TODO rows still open but marked shipped elsewhere (strikethrough / git history)

---

## Step 4 — Prioritize recommendations

Apply in order (read **current** queue from REVIEW_TODO each time):

1. **Finish in-progress execution-queue rows** — do not start parallel tracks
2. **Close Known Gaps** — REVIEW_TODO Known Gaps table
3. **Resolve partial rows** on the active track before catalog expansion
4. **Foundation before expansion** — CI gates, install smoke, registry sync, contracts
5. **Planned rows with defined scope** — skip reserved/TBD phases until ROADMAP defines them
6. **Deferred / speculative last** — only if user explicitly wants R&D

**High leverage** (prefer when multiple options exist):

- Closes an **in progress** or **partial** REVIEW_TODO row
- Adds a **missing verification gate** named in Known Gaps or TESTING.md
- Fixes **doc/code drift** that misroutes future agents
- Advances **release readiness** per current ROADMAP + DEPLOY.md (when publish is near)

**Low leverage** (deprioritize unless requested):

- New catalog items while active track has open partial rows
- Playground product UX (maintenance-only per TESTING.md)
- Rewrites without broken architecture contracts
- Re-doing work marked **shipped** in REVIEW_TODO or ROADMAP

Tie-breakers: [analysis-mechanics.md § Prioritization tie-breakers](./analysis-mechanics.md#prioritization-tie-breakers-timeless).

---

## Step 5 — Output format

Deliver a concise report:

```markdown
## Project snapshot

- Branch: …
- Active queue: … (from REVIEW_TODO execution table — cite row names)
- Phase: … (from ROADMAP / REVIEW_TODO status columns)

## Maturity (by layer)

| Layer | Status | Evidence |
| tokens | … | … |
| ui / registry / cli | … | … |
| composition / other active track | … | REVIEW_TODO row refs |

## Doc health

- Drift found: yes/no — …

## Recommended next steps (ordered)

1. **[In progress | Planned]** … — why high leverage; owner doc link
2. …
3. …

## Explicitly not now

- Deferred: …
- Speculative: …
- Already shipped (do not re-suggest): …
```

Offer **2–4** concrete next steps max unless user asks for full backlog dump.

---

## Do not

- Duplicate REVIEW_TODO queue into skill files — update docs when backlog changes
- Suggest rewrites when [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) contracts still hold
- Recommend work marked **shipped** or ~~strikethrough~~ in REVIEW_TODO
- Duplicate ROADMAP vision as urgent without REVIEW_TODO backing
- Start dev servers as a "next step"
- Create or update a local continuity file — session state is git + REVIEW_TODO

---

## Related

- `$docs-alignment` — after finding doc drift; also when closing/shipping backlog rows
- `$monorepo-check-gate` — before recommending "merge-ready"
- `$consumer-sandbox-verify` — when next step touches CLI/registry/blocks
- `$ui-component-change` — when next step is new primitive/block/template
- [docs/TESTING.md § Verification surfaces](../../docs/TESTING.md#verification-surfaces)
