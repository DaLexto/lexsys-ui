import type { ComponentTokenGroup } from "../types/index.js"

export const separatorComponentTokens: ComponentTokenGroup = {
  component: "separator",
  color: { $value: "{color.border.default}" },
  thickness: { $type: "dimension", $value: { value: 1, unit: "px" } },
}
