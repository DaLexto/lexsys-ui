# UI component tests

Test files live under `packages/ui/test/components/<Name>/`.

---

## When each test type is required

| Test file                 | Required for                                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `<Name>.variants.test.ts` | All primitives — assert CVA class output contains correct token vars                                                                |
| `<Name>.render.test.tsx`  | All primitives AND all blocks/templates — DOM render smoke                                                                          |
| `<Name>.variants.test.ts` | Blocks/templates: optional (plain `*Classes()` helpers produce simple strings — assert only if there is meaningful branching logic) |

---

## File locations

```txt
packages/ui/test/
├── config/
│   └── prefix.ts          ← testCssVarPrefix constant (do not hardcode in tests)
└── components/
    └── <Name>/
        ├── <Name>.variants.test.ts
        └── <Name>.render.test.tsx
```

---

## testCssVarPrefix — why and how

Variant test assertions contain CSS var names like `--lex-button-radius`. If the
prefix ever changes (via `pnpm tokens:re-prefix --to <new>`), hardcoded strings
silently break every test.

**Always import the prefix constant instead of hardcoding it:**

```ts
import { testCssVarPrefix as p } from "../../config/prefix.js"

// Bad
expect(cls).toContain("bg-(--lex-button-primary-background)")

// Good
expect(cls).toContain(`bg-(--${p}-button-primary-background)`)
```

`packages/ui/test/config/prefix.ts` mirrors `cssVarPrefix` from
`packages/tokens/src/generators/generator.config.ts`. The rename script
(`scripts/rebrand/rename-prefix.mjs`) keeps both in sync automatically.

---

## Variants test pattern

```ts
import { describe, it, expect } from "vitest"
import { testCssVarPrefix as p } from "../../config/prefix.js"
import { buttonClasses } from "../../../../src/components/primitives/Button/Button.variants"

describe("buttonClasses", () => {
  it("default variant contains primary background token", () => {
    const cls = buttonClasses({ variant: "primary" })
    expect(cls).toContain(`bg-(--${p}-button-primary-background)`)
  })
})
```

---

## Render test pattern

Uses `@testing-library/react` + Vitest jsdom environment.

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "../../../../src/components/primitives/Button/Button"

describe("Button render", () => {
  it("renders with correct role", () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument()
  })

  it("merges className", () => {
    const { container } = render(<Button className="custom">Click</Button>)
    expect(container.firstChild).toHaveClass("custom")
  })
})
```

---

## Running tests

```sh
pnpm ui:test        # variant + render tests only (fast)
pnpm ui:check       # lint + typecheck + tests + audit (full gate)
```
