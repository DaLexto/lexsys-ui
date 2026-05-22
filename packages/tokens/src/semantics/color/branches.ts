export const colorBackgroundBranch = {
  background: {
    $type: "color",
    base: { $value: "{color.white}" },
    surface: { $value: "{color.white}" },
    subtle: { $value: "{color.neutral.50}" },
    overlay: { $value: "{color.neutral.800}" },
  },
} as const

export const colorTextBranch = {
  text: {
    $type: "color",
    primary: { $value: "{color.neutral.900}" },
    secondary: { $value: "{color.neutral.600}" },
    disabled: { $value: "{color.neutral.400}" },
    inverse: { $value: "{color.white}" },
    link: { $value: "{color.blue.600}" },
    accent: { $value: "{color.purple.600}" },
  },
} as const

export const colorFeedbackBranch = {
  feedback: {
    info: {
      $type: "color",
      background: { $value: "{color.blue.50}" },
      foreground: { $value: "{color.blue.700}" },
    },
    success: {
      $type: "color",
      background: { $value: "{color.green.50}" },
      foreground: { $value: "{color.green.700}" },
    },
    warning: {
      $type: "color",
      background: { $value: "{color.yellow.50}" },
      foreground: { $value: "{color.yellow.700}" },
    },
    danger: {
      $type: "color",
      background: { $value: "{color.red.50}" },
      foreground: { $value: "{color.red.700}" },
    },
  },
} as const
