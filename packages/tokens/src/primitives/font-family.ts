import type { PrimitiveTokenGroup } from "../types"

export const fontFamilyPrimitives: PrimitiveTokenGroup = {
  name: "font-family",
  sans: {
    value:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  mono: {
    value:
      '"JetBrains Mono", "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
}
