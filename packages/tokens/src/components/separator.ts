import { componentTokens } from "../types/authoring"

export const separatorComponentTokens = componentTokens("separator", {
  color: { $value: "{border.default}" },
  thickness: { $type: "dimension", $value: { value: 1, unit: "px" } },
})
