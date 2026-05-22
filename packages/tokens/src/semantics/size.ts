import { semanticTokens } from "../types/authoring"

export const sizeSemantics = semanticTokens("size", {
  control: {
    $type: "dimension",
    xs: { $value: "{size.6}" },
    sm: { $value: "{size.8}" },
    md: { $value: "{size.10}" },
    lg: { $value: "{size.12}" },
    xl: { $value: "{size.14}" },
  },
  selectionControl: {
    $type: "dimension",
    sm: { $value: "{size.3}" },
    md: { $value: "{size.4}" },
    lg: { $value: "{size.5}" },
  },
  area: {
    swipe: {
      $type: "dimension",
      sm: { $value: "{size.12}" },
      md: { $value: "{size.16}" },
      lg: { $value: "{size.20}" },
    },
  },
  selectionIndicator: {
    $type: "dimension",
    sm: { $value: "{size.1}" },
    md: { $value: "{size.2}" },
    lg: { $value: "{size.2}" },
  },
  track: {
    $type: "dimension",
    sm: { $value: "{size.1}" },
    md: { $value: "{size.2}" },
    lg: { $value: "{size.3}" },
  },
  thumb: {
    $type: "dimension",
    sm: { $value: "{size.4}" },
    md: { $value: "{size.5}" },
    lg: { $value: "{size.6}" },
  },
})
