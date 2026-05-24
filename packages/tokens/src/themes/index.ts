import type { ThemeDefinition } from "../types"
import { neurexDarkTheme } from "./lexsys/dark"
import { neurexLightTheme } from "./lexsys/light"

export { neurexDarkTheme as darkTheme } from "./lexsys/dark"
export { neurexLightTheme as lightTheme } from "./lexsys/light"

export const themes: ThemeDefinition[] = [neurexLightTheme, neurexDarkTheme]
