import { themeTokens } from "../../types/authoring"

export const neurexDarkTheme = themeTokens(
  {
    name: "dark",
    brand: "neurex",
    selector: ".dark",
    colorScheme: "dark",
  },
  {
    color: {
      background: {
        $type: "color",
        base: { $value: "{color.neutral.950}" },
        surface: { $value: "{color.neutral.900}" },
        subtle: { $value: "{color.neutral.800}" },
        overlay: {
          $value: {
            colorSpace: "oklch",
            components: [0, 0, 0],
            alpha: 0.6,
            hex: "#000000",
          },
        },
      },
      text: {
        $type: "color",
        primary: { $value: "{color.neutral.50}" },
        secondary: { $value: "{color.neutral.400}" },
        disabled: { $value: "{color.neutral.600}" },
        inverse: { $value: "{color.neutral.950}" },
        link: { $value: "{color.blue.300}" },
        accent: { $value: "{color.purple.300}" },
      },
      feedback: {
        info: {
          $type: "color",
          background: { $value: "{color.blue.950}" },
          foreground: { $value: "{color.blue.200}" },
        },
        success: {
          $type: "color",
          background: { $value: "{color.green.950}" },
          foreground: { $value: "{color.green.200}" },
        },
        warning: {
          $type: "color",
          background: { $value: "{color.yellow.950}" },
          foreground: { $value: "{color.yellow.200}" },
        },
        danger: {
          $type: "color",
          background: { $value: "{color.red.950}" },
          foreground: { $value: "{color.red.200}" },
        },
      },
    },
    border: {
      $type: "color",
      default: { $value: "{color.neutral.700}" },
      strong: { $value: "{color.neutral.500}" },
      focus: { $value: "{color.blue.400}" },
      accent: { $value: "{color.purple.400}" },
    },
    action: {
      primary: {
        $type: "color",
        base: { $value: "{color.purple.400}" },
        hover: { $value: "{color.purple.300}" },
        active: { $value: "{color.purple.200}" },
        disabled: { $value: "{color.purple.700}" },
      },
      secondary: {
        $type: "color",
        base: { $value: "{color.neutral.800}" },
        hover: { $value: "{color.neutral.700}" },
        active: { $value: "{color.neutral.600}" },
      },
      danger: {
        $type: "color",
        base: { $value: "{color.red.400}" },
        hover: { $value: "{color.red.300}" },
        active: { $value: "{color.red.200}" },
        disabled: { $value: "{color.red.700}" },
      },
    },
  },
)
