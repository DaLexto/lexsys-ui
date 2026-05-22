import { themeTokens } from "../../types/authoring"

export const neurexLightTheme = themeTokens(
  {
    name: "light",
    selector: ":root",
    brand: "neurex",
    colorScheme: "light",
  },
  {
    color: {
      background: {
        $type: "color",
        base: { $value: "{color.white}" },
        surface: { $value: "{color.white}" },
        subtle: { $value: "{color.neutral.50}" },
        overlay: {
          $value: {
            colorSpace: "oklch",
            components: [0, 0, 0],
            alpha: 0.15,
            hex: "#000000",
          },
        },
      },
      text: {
        $type: "color",
        primary: { $value: "{color.neutral.900}" },
        secondary: { $value: "{color.neutral.600}" },
        disabled: { $value: "{color.neutral.400}" },
        inverse: { $value: "{color.white}" },
        link: { $value: "{color.blue.600}" },
        accent: { $value: "{color.purple.600}" },
      },
      border: {
        $type: "color",
        default: { $value: "{color.neutral.200}" },
        strong: { $value: "{color.neutral.400}" },
        focus: { $value: "{color.blue.600}" },
        accent: { $value: "{color.purple.500}" },
      },
      feedback: {
        info: {
          $type: "color",
          bg: { $value: "{color.blue.50}" },
          text: { $value: "{color.blue.700}" },
        },
        success: {
          $type: "color",
          bg: { $value: "{color.green.50}" },
          text: { $value: "{color.green.700}" },
        },
        warning: {
          $type: "color",
          bg: { $value: "{color.yellow.50}" },
          text: { $value: "{color.yellow.700}" },
        },
        danger: {
          $type: "color",
          bg: { $value: "{color.red.50}" },
          text: { $value: "{color.red.700}" },
        },
      },
      action: {
        primary: {
          $type: "color",
          base: { $value: "{color.purple.600}" },
          hover: { $value: "{color.purple.700}" },
          active: { $value: "{color.purple.800}" },
          disabled: { $value: "{color.purple.300}" },
        },
        secondary: {
          $type: "color",
          base: { $value: "{color.neutral.100}" },
          hover: { $value: "{color.neutral.200}" },
          active: { $value: "{color.neutral.300}" },
        },
        danger: {
          $type: "color",
          base: { $value: "{color.red.600}" },
          hover: { $value: "{color.red.700}" },
          active: { $value: "{color.red.800}" },
          disabled: { $value: "{color.red.300}" },
        },
      },
    },
  },
)
