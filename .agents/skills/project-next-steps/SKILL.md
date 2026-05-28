---
name: project-next-steps
description: >
  Analyze Lexsys monorepo maturity and suggest realistic next steps from
  REVIEW_TODO execution queue, ROADMAP phase status, and domain docs. Use when
  asked what to work on next, project status, backlog triage, stale plans,
  unfinished foundations, or implementation vs planned vs deferred architecture.
  Outputs three categories: nastavak (continuation), cleanup, improvements.
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
| 2     | [docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md)                  | Execution queue rows, **Known Gaps** table, open P-sections                      |
| 3     | [docs/ROADMAP.md](../../docs/ROADMAP.md) header + phase tables    | Phase status; **Explicitly deferred**                                            |
| 4     | Domain doc for the active track only                              | Owner from REVIEW_TODO link or [docs/INDEX.md](../../docs/INDEX.md)              |

Do **not** treat ROADMAP "Current State" or REVIEW_TODO "Current State" bullet
lists as backlog — they describe **what already shipped**.

**Primary signals to extract from REVIEW_TODO:**

- Execution Queue table — rows with `in progress` or `planned`
- Known Gaps table — always check; these are open regardless of M-phase status
- P2 / P3 open bullets — product and architecture follow-ups

Mechanics: [analysis-mechanics.md](./analysis-mechanics.md).

---

## Step 1b — Post-queue scenario (when execution queue is empty)

When all M-phases and execution-queue rows are `shipped`, switch analysis to:

1. **Known Gaps** — REVIEW_TODO Known Gaps table is the primary signal
2. **Next release milestone** — REVIEW_TODO § M10 "Next milestone" line (e.g. `0.1.0` on `latest`)
3. **Undefined phases** — ROADMAP phase table rows that are `reserved` / not yet defined
4. **Catalog expansion** — new blocks/templates beyond the pilot set (see UI_CATALOG.md)
5. **Cleanup signals** — run probes from [analysis-mechanics.md § Cleanup signal probes](./analysis-mechanics.md#cleanup-signal-probes) to find dead code / duplicates

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
- Stale version numbers in doc headers (e.g. ROADMAP status line)

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

Always deliver output in **three categories**. Aim for 2–3 items per category.

```markdown
## Project snapshot

- Branch: …
- Active queue: … (from REVIEW_TODO execution table — cite row names, or "empty" if all shipped)
- Phase: … (from ROADMAP / REVIEW_TODO status columns)
- Doc health: drift found yes/no — …

## Predlozi za nastavak (continuation)

Items that directly continue the current trajectory — open Known Gaps, next release
milestone, next undefined phase, or consumer sandbox verification.

1. **[Category]** … — why high leverage; owner doc link
2. …

## Predlozi za cleanup

Tech debt, dead code, stale docs, inconsistencies. Use cleanup signal probes from
[analysis-mechanics.md § Cleanup signal probes](./analysis-mechanics.md#cleanup-signal-probes)
to find candidates.

1. …
2. …

## Predlozi za improvements

New features, catalog expansion, DX improvements, tooling enhancements — things that
add value without being required for stability.

1. …
2. …

## Explicitly not now

- Deferred: …
- Speculative: …
- Already shipped (do not re-suggest): …
```

---

## Do not

- Duplicate REVIEW_TODO queue into skill files — update docs when backlog changes
- Suggest rewrites when [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) contracts still hold
- Recommend work marked **shipped** or ~~strikethrough~~ in REVIEW_TODO
- Duplicate ROADMAP vision as urgent without REVIEW_TODO backing
- Start dev servers as a "next step"
- Create or update a local continuity file — session state is git + REVIEW_TODO
- Mix all recommendations into one flat list — always use the three-category format

---

## Related

- `$docs-alignment` — after finding doc drift; also when closing/shipping backlog rows
- `$monorepo-check-gate` — before recommending "merge-ready"
- `$consumer-sandbox-verify` — when next step touches CLI/registry/blocks
- `$ui-component-change` — when next step is new primitive/block/template
- [docs/operations/TESTING.md § Verification surfaces](../../docs/operations/TESTING.md#verification-surfaces)
