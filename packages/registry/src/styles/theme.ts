import type { RegistryStyle } from "../registry.types.js"

export const themeRegistryStyle: RegistryStyle = {
  name: "theme",
  version: "0.0.1",
  files: [
    {
      path: "styles/tokens.css",
      target: "tokens.css",
    },
    {
      path: "styles/theme.css",
      target: "theme.css",
    },
  ],
}
