import type { ThemeDefinition } from "../types/index.js"
import { neurexDarkTheme } from "./neurex/neurex.dark.js"
import { neurexLightTheme } from "./neurex/neurex.light.js"

export { neurexDarkTheme as darkTheme } from "./neurex/neurex.dark.js"
export { neurexLightTheme as lightTheme } from "./neurex/neurex.light.js"

export const themes: ThemeDefinition[] = [neurexLightTheme, neurexDarkTheme]
