import type { ThemeDefinition } from "../types"
import { neurexDarkTheme } from "./neurex/dark"
import { neurexLightTheme } from "./neurex/light"

export { neurexDarkTheme as darkTheme } from "./neurex/dark"
export { neurexLightTheme as lightTheme } from "./neurex/light"

export const themes: ThemeDefinition[] = [neurexLightTheme, neurexDarkTheme]
