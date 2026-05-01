import type { ThemeDefinition } from "../types/index.js"

export const lightTheme: ThemeDefinition = {
  name: "light",
  selector: ":root",
  colorScheme: "light",
  color: {
    background: { value: "{color.white}" },
    foreground: { value: "{color.neutral.950}" },
    muted: {
      DEFAULT: { value: "{color.neutral.100}" },
      foreground: { value: "{color.neutral.500}" },
    },
    surface: {
      DEFAULT: { value: "{color.white}" },
      foreground: { value: "{color.neutral.950}" },
    },
    border: { value: "{color.neutral.200}" },
    ring: { value: "{color.blue.600}" },
    primary: {
      DEFAULT: { value: "{color.blue.600}" },
      foreground: { value: "{color.white}" },
      hover: { value: "{color.blue.700}" },
    },
    destructive: {
      DEFAULT: { value: "{color.red.600}" },
      foreground: { value: "{color.white}" },
    },
  },
}
