# Neurex — Architecture v2 (LOCKED)

## Status

**LOCKED ARCHITECTURE DECISION**

This document defines the long-term architecture for Neurex.

Neurex is not a traditional npm-only component library.  
It is a registry-first UI framework inspired by the shadcn model, built with:

- Base UI as the internal headless behavior engine
- Tailwind as the user-facing styling layer
- Neurex design tokens as the design-system source of truth
- A CLI and registry workflow for installing copyable components

---

## 1. Product Direction

Neurex is a **registry-first UI framework**.

The primary product experience is:

```bash
npx neurex add button
```

The CLI installs component source code directly into the consumer project.

This means installed components become user-owned code, not black-box runtime imports.

### Core Principle

```txt
Neurex provides the system.
The user owns the installed code.
```

---

## 2. Distribution Model

### Primary Distribution

The primary distribution model is a CLI/registry workflow:

```txt
Neurex registry
      ↓
Neurex CLI
      ↓
Consumer project
      ↓
User-owned components
```

### Optional Future Distribution

An npm package may be introduced later as an additional distribution layer.

This must remain optional.

The architecture must not depend on npm-only component usage.

---

## 3. High-Level Architecture

```txt
neurex/
├── apps/
│   ├── docs/
│   └── playground/
│
├── packages/
│   ├── ui/
│   ├── registry/
│   ├── cli/
│   └── tokens/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── STYLE.md
│   ├── STYLEGUIDE.md
│   └── DEPLOY.md
│
├── AGENTS.md
└── package.json
```

### Package Responsibilities

```txt
packages/ui
  Source/reference implementation for components.

packages/registry
  Installable templates, metadata, dependency information, and registry item definitions.

packages/cli
  Command-line interface that reads registry metadata and installs components into user projects.

packages/tokens
  Full design-token system and generated theme outputs.
```

---

## 4. Source vs Registry Output

Neurex separates source components from installable registry output.

```txt
packages/ui
  ↓ source/reference components

packages/registry
  ↓ installable registry templates

packages/cli
  ↓ install process

consumer project
  ↓ generated user-owned files
```

### Rule

The CLI must read registry metadata.

It must not hardcode component-specific install behavior.

---

## 5. Component Output Contract

Each installed component follows a structured multi-file format.

```txt
src/components/ui/ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
└── ComponentName.variants.ts
```

### Purpose

- `ComponentName.tsx` contains the component implementation.
- `ComponentName.types.ts` contains public and internal component types.
- `ComponentName.variants.ts` contains variant styling logic, usually CVA + Tailwind.

### Default Registry Output

Tests, stories, examples, and internal development files are not installed by default.

They may exist in `packages/ui`, docs, or examples, but they are not part of the default consumer output.

---

## 6. Self-Contained Components

Installed components must work immediately after installation.

The CLI is responsible for installing all required dependencies.

### Requirements

- No hidden dependencies
- No undocumented manual setup
- No missing utility files
- No missing token/theme CSS
- No missing Tailwind integration

After running:

```bash
npx neurex add button
```

the installed Button must be usable without manual wiring.

---

## 7. Design System Strategy

Neurex uses a full design-token system as the styling source of truth.

### Style Preset vs Theme Mode

Neurex separates style presets from theme modes.

```txt
style preset = design personality, density, radius, component feel
theme mode   = light/dark/brand mapping inside that style
```

The first style preset is `default` / `Neurex Default`.

### Token Layers

```txt
primitives
  ↓ raw values

semantics
  ↓ meaning and roles

component tokens
  ↓ component-specific design decisions

themes
  ↓ generated CSS variables and theme output
```

### User-Facing Styling

The user-facing DX remains Tailwind-first.

Users should work with normal Tailwind classes and component variants, while Neurex controls the values through generated CSS variables and theme outputs.

```txt
Tailwind classes
  ↓
CSS variables
  ↓
Neurex tokens
```

### Goal

Neurex keeps enterprise-grade design-system control internally without forcing users to manually understand the entire token pipeline.

---

## 8. Base UI Role

Base UI is the default headless foundation for interactive Neurex components.

Base UI provides:

- accessibility behavior
- keyboard navigation
- state primitives
- interaction logic

Neurex provides:

- public component API
- styling
- variants
- tokens
- registry output

### Rule

Base UI is an internal implementation detail.

It must not define the public identity of Neurex.

```txt
User sees:
  <Dialog />
  <Button />

Internally:
  Base UI behavior
  Neurex API
  Tailwind styling
  Neurex tokens
```

---

## 9. CLI Automation

The Neurex CLI must provide full automation.

When a user runs:

```bash
npx neurex add button
```

the CLI should:

- copy required component files
- install required dependencies
- add or update shared utilities
- add or update token/theme CSS
- update Tailwind configuration when needed
- avoid manual setup whenever possible

### Goal

The installation experience should be fast, safe, and close to shadcn-level DX, while adding Neurex design-system integration.

---

## 10. Registry Metadata

Neurex uses registry metadata to describe installable items.

Each registry item must define:

- name
- type
- category
- aliases
- files
- dependencies
- registry dependencies
- required utilities
- required styles/tokens
- target install paths

### Example Shape

```json
{
  "name": "button",
  "canonicalName": "Button",
  "type": "component",
  "category": "actions",
  "aliases": ["btn"],
  "files": [
    "components/Button/Button.tsx",
    "components/Button/Button.types.ts",
    "components/Button/Button.variants.ts"
  ],
  "dependencies": ["class-variance-authority", "clsx", "tailwind-merge"],
  "registryDependencies": [],
  "utilities": ["cn"],
  "styles": ["theme"],
  "target": "src/components/ui/Button"
}
```

Registry-level utility and style manifests define the shared install contract.
The validator must verify that item references point to known manifests and that
every referenced local template file exists.

---

## 11. Idempotent Installs

Registry installs must be idempotent.

Running install commands multiple times must not duplicate or damage existing project files.

### Behavior

```txt
Resource missing
  → install it

Resource already exists and is identical
  → skip it

Resource already exists and differs
  → report conflict and require confirmation

Dependency already exists
  → do not reinstall unnecessarily

Shared utility already exists
  → reuse or safely patch
```

### Rule

The CLI must never overwrite user code silently.

---

## 12. Global Shared Layer

Neurex uses a global shared layer for reusable resources.

Default locations:

```txt
src/lib/
styles/
```

Shared resources include:

- utilities
- shared helpers
- token/theme CSS
- Tailwind integration
- shared primitives required by installed components

### Rule

Components must not duplicate shared utilities or theme resources per component.

---

## 13. Default Install Paths

Default consumer project output:

```txt
project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── Button/
│   │           ├── Button.tsx
│   │           ├── Button.types.ts
│   │           └── Button.variants.ts
│   │
│   └── lib/
│       └── utils.ts
│
├── styles/
│   ├── tokens.css
│   └── theme.css
│
└── neurex.config.json
```

### Rules

- Components install to `src/components/ui/ComponentName/`
- Utilities install to `src/lib/`
- Styles and tokens install to `styles/`
- Generated imports use the configured user-facing aliases, starting with
  `@/lib/utils`
- Project configuration lives in `neurex.config.json`

---

## 14. Component API Philosophy

Neurex components use a hybrid API model.

Components must support:

- structured variants
- `className` overrides

### Example

```tsx
<Button variant="primary" size="md" />
<Button className="bg-red-500" />
```

### Rationale

```txt
Variants provide consistency.
className provides flexibility.
```

Neither approach should block the other.

---

## 15. Composition Model

Complex components use a hybrid composition model.

They must support:

- simple API for common use cases
- compound API for advanced control

### Simple Usage

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogTitle>Confirm action</DialogTitle>
        <DialogDescription>
          This uses Base UI behavior underneath.
        </DialogDescription>
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

### Advanced Usage

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogClose aria-label="Close dialog" />
        <DialogTitle>Publish registry item</DialogTitle>
        <DialogDescription>
          Compound parts preserve advanced control.
        </DialogDescription>
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

### Rule

Simple mode improves speed and DX.  
Compound mode preserves flexibility and power.

---

## 16. Update Strategy

Installed components are user-owned code.

The CLI may provide update helpers, but it must never silently overwrite modified files.

### Update Behavior

```txt
Unchanged generated file
  → safe to update

User-modified file
  → report diff/conflict

Missing file
  → restore only with confirmation

Shared dependency/config update
  → patch idempotently when safe
```

### Batch Updates

The CLI must support updating multiple components in one command.

```bash
neurex update button textfield dialog
neurex update --all
```

Batch updates must follow the same safety rules.

---

## 17. Configuration System

Neurex uses a hybrid configuration model.

The CLI must:

- auto-detect project structure and defaults
- support an optional explicit config file

Default config file:

```txt
neurex.config.json
```

The config file may define:

- install paths
- styling preferences
- token/theme options
- component behavior overrides

If missing, the CLI falls back to sensible defaults.

---

## 18. CLI Command Surface

Neurex CLI uses a full DX command surface.

Required commands:

```bash
neurex init
neurex add <component...>
neurex update <component...>
neurex update --all
neurex list
neurex doctor
```

### Interactive Add

If the user runs:

```bash
neurex add
```

without component names, the CLI must show an interactive/selectable list of available components.

```txt
? Select components to add:
  ◯ Button
  ◯ Dialog
  ◯ Input
  ◯ Menu
  ◯ Select
```

---

## 19. Registry Taxonomy

Registry items are grouped by category.

Initial categories:

- actions
- forms
- overlays
- navigation
- feedback
- layout
- data-display
- utilities

### Usage

Categories are used for:

- CLI interactive selection
- search/filtering
- documentation grouping
- discoverability

---

## 20. CLI Naming and Aliases

The CLI accepts flexible component names.

Requirements:

- case-insensitive input
- canonical name normalization
- alias support

### Examples

```txt
button → Button
Button → Button
BUTTON → Button
input → Input
modal → Dialog
```

Each registry item may define:

- canonical name
- aliases

---

## 21. Dependency Strategy

Neurex uses a hybrid dependency versioning strategy.

Dependencies are divided into:

- core dependencies
- secondary dependencies

### Core Dependencies

Core dependencies are stability-critical.

They must use fixed or tightly controlled versions.

Examples:

- Base UI
- React integration dependencies
- core styling/runtime dependencies when breaking changes are likely

### Secondary Dependencies

Secondary dependencies may use semver ranges when safe.

The CLI is responsible for installing compatible versions and avoiding breaking changes.

---

## 22. Framework Support

The CLI supports multiple React environments.

It must detect:

- Next.js
- Vite
- CRA
- Tailwind presence
- TypeScript presence

If detection fails, the CLI must:

- notify the user
- proceed with a safe default React-compatible setup

Manual override may be supported:

```bash
neurex init --framework next
neurex init --framework vite
```

---

## 23. Theming Strategy

Neurex uses a multi-theme CSS-variable strategy.

Themes are activated through CSS selectors/classes.

Default strategy:

```txt
:root       → default theme
.dark       → dark theme
.theme-*    → optional custom/brand themes
```

### Runtime Provider

Neurex does not require a runtime theme provider by default.

Theme switching is left to the consumer application.

Consumers may use:

- class toggling
- framework-specific theme tools
- `next-themes`
- custom theme state

### Goal

Strong theming support without forcing runtime complexity.

---

## 24. End-to-End Install Flow

```txt
User runs:
  npx neurex add button

CLI:
  1. Loads neurex.config.json if present
  2. Detects framework and project structure
  3. Resolves "button" to Button registry item
  4. Reads registry metadata
  5. Checks existing files and dependencies
  6. Installs missing dependencies
  7. Installs shared utilities if missing
  8. Installs token/theme CSS if missing
  9. Copies component files
  10. Reports created/updated/skipped/conflicted resources
```

---

## 25. Architecture Diagram

```txt
                       ┌────────────────────┐
                       │   packages/tokens   │
                       │  Design token source│
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │   Generated CSS     │
                       │ tokens / themes     │
                       └─────────┬──────────┘
                                 │
                                 ▼
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│   packages/ui       │   │ packages/registry  │   │   packages/cli      │
│ source components   │──▶│ templates/metadata │──▶│ installer/generator │
└────────────────────┘   └────────────────────┘   └─────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌────────────────────┐
                                                   │ consumer project    │
                                                   │ user-owned code     │
                                                   └────────────────────┘
```

---

## 26. Anti-Patterns

Avoid:

- npm-only architecture as the primary model
- hardcoded CLI install logic
- silent file overwrites
- duplicated shared utilities per component
- exposing Base UI as the public identity
- forcing a runtime theme provider
- installing files without metadata
- requiring manual setup after component installation
- treating generated code as owned by Neurex after installation

---

## 27. Final Statement

Neurex is a registry-first design-system framework.

It combines:

- shadcn-like installation DX
- Base UI accessibility and behavior
- Tailwind styling ergonomics
- full Neurex token architecture
- safe, idempotent CLI workflows

The long-term goal is to provide a professional UI framework where users get copyable, editable, production-ready components while Neurex maintains strong architectural consistency behind the scenes.
