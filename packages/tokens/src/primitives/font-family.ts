import type { PrimitiveTokenGroup } from "../types"

export const fontFamilyPrimitives: PrimitiveTokenGroup = {
  name: "font-family",
  sans: {
    $value:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  serif: {
    $value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },
  mono: {
    $value:
      '"JetBrains Mono", "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
}
