import type { ThemeDefinition } from "../types"
import { lexsysDarkTheme } from "./lexsys/dark"
import { lexsysLightTheme } from "./lexsys/light"

export { lexsysDarkTheme as darkTheme } from "./lexsys/dark"
export { lexsysLightTheme as lightTheme } from "./lexsys/light"

export const themes: ThemeDefinition[] = [lexsysLightTheme, lexsysDarkTheme]
