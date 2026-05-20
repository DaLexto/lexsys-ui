# Neurex Resolver Roadmap

## Status

**ARCHITECTING**

This document defines the technical evolution of the Neurex token resolver—transitioning from a static reference mapper to an intelligent design compiler.

---

## Core Vision: The "Brooklyn Bridge" Model

The resolver is the structural guardian of the Neurex design system. Its primary responsibility is to ensure that the token foundation remains indestructible, predictable, and immune to manual design errors.

---

## 1. Core Architecture (The Foundation)

The resolver is not a simple string replacement script; it is a dedicated **interpreter** designed to preserve system integrity.

### Responsibilities

- **Layer Enforcement:** Strict validation of the "Build-Failing Violations" rules. Prevents components from bypassing semantics to target primitives directly.
- **DTCG Compliance:** Native support for the standard `$value`, `$type`, and `$description` authoring shape.
- **Circular Detection:** Deep-tree analysis to prevent infinite reference loops during the resolution phase.

---

## 2. Advanced Resolution (The "Beast" Logic)

The "Beast" engine introduces calculation and transformation capabilities directly into the resolution chain.

### A. Color & Math Engine

- **OKLCH Manipulation:** Perceptually accurate transformations.
  - _Example:_ `oklch-modify({brand.color.primary}, l -10%)`
- **Unit-Aware Math:** Intelligent calculation across disparate units (`rem`, `px`, `%`).
  - _Note:_ Requires a built-in unit converter using a configurable `baseFontSize` (e.g., 16px) to normalize values before output.

### B. Composite Token Expansion (The "Exploder")

Handles complex object tokens such as typography, shadows, and borders.

- **Flattening:** Decomposes a single composite token (e.g., `typography.body`) into individual atomic variables while maintaining internal alias links (e.g., `fontSize` still resolving to `{font.size.base}`).

### C. Contextual Overrides (The Transformer)

- **Theme Switching:** Resolves values based on active `ThemeModeId` without altering the consumer-facing token name.
- **Auto-Dark Algorithm:** Programmatic dark theme generation by algorithmically inverting Lightness channels while preserving brand chroma levels.

---

## 3. Reliability & Diagnostics (The Bridge Guards)

Stability is ensured through automated diagnostics that catch errors before they reach the user project.

### A. A11y Guard (Contrast Police)

- **Automatic Validation:** Performs build-time contrast checks between semantic foreground and background pairs.
- **Failure Condition:** If a combination fails WCAG AA standards, the build is halted.

### B. Traceability & Deprecation

- **Metadata Tunneling:** Propagates `$description` and `$deprecated` metadata from the primitive source through the entire chain to the component output.
- **Provenance Tracking:** Generates a "Deprecation Report" identifying exactly which components depend on obsolete tokens.

### C. Dead Token Elimination

- Analyzes the graph to identify unused primitives, allowing the generator to strip "dead weight" from the final CSS output.

---

## 4. Technical Strategy: AST Compiler

The next-generation resolver abandons Regex in favor of a formal **Abstract Syntax Tree (AST)** approach.

1. **Tokenizer:** Breaks complex values (e.g., `({space.md} * 2) + 4px`) into atomic tokens.
2. **Parser:** Constructs a logical operation tree based on precedence.
3. **Evaluator:** Recursively resolves references and executes mathematical or color functions.
4. **Serializer:** Outputs the final calculated value in the format required by the specific Generator (CSS, JSON, etc.).

---

## 5. Guiding Principle

**"Nemože mi niko ništa" (Invincibility)**

The Bridge is complete when no design decision can pass through the system without verification. The Neurex Resolver transforms artistic intent into a **predictable, secure, and scalable engineering product**.
