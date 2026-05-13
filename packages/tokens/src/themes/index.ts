import type { ThemeDefinition } from "../types/index.js"
import { neurexDarkTheme } from "./neurex/dark.js"
import { neurexLightTheme } from "./neurex/light.js"

export { neurexDarkTheme as darkTheme } from "./neurex/dark.js"
export { neurexLightTheme as lightTheme } from "./neurex/light.js"

export const themes: ThemeDefinition[] = [neurexLightTheme, neurexDarkTheme]
