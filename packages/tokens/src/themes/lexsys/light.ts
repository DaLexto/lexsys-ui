import { themeTokens } from "../../types/authoring"

export const lexsysLightTheme = themeTokens(
  {
    name: "light",
    selector: ":root",
    brand: "lexsys",
    colorScheme: "light",
  },
  {
    color: {
      background: {
        $type: "color",
        overlay: {
          $value: {
            colorSpace: "oklch",
            components: [0, 0, 0],
            alpha: 0.15,
            hex: "#000000",
          },
        },
      },
    },
  },
)
