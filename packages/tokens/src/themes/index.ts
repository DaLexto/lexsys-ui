import type { ThemeDefinition } from "../types/index.js"
import { darkTheme } from "./dark.js"
import { lightTheme } from "./light.js"

export { darkTheme } from "./dark.js"
export { lightTheme } from "./light.js"

export const themes: ThemeDefinition[] = [lightTheme, darkTheme]
