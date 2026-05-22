import { componentTokens } from "../types/authoring"

export const separatorComponentTokens = componentTokens("separator", {
  color: { $value: "{color.border.default}" },
  thickness: { $type: "dimension", $value: { value: 1, unit: "px" } },

})
