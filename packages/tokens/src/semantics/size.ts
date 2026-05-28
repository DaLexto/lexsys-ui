import { semanticTokens } from "../types/authoring"

export const sizeSemantics = semanticTokens("size", {
  control: {
    $type: "dimension",
    xs: { $value: "{size.6}" },
    compact: { $value: "{size.7}" },
    sm: { $value: "{size.8}" },
    md: { $value: "{size.10}" },
    lg: { $value: "{size.12}" },
    xl: { $value: "{size.14}" },
    "2xl": { $value: "{size.16}" },
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
  switchTrack: {
    width: {
      $type: "dimension",
      sm: { $value: "{size.9}" },
      md: { $value: "{size.11}" },
      lg: { $value: "{size.13}" },
    },
    height: {
      $type: "dimension",
      sm: { $value: "{size.5}" },
      md: { $value: "{size.6}" },
      lg: { $value: "{size.7}" },
    },
  },
  panel: {
    width: {
      $type: "dimension",
      sm: { $value: "{size.80}" },
      md: { $value: "{size.96}" },
      lg: { $value: "{size.128}" },
      xl: { $value: "{size.160}" },
    },
    height: {
      $type: "dimension",
      sm: { $value: "{size.48}" },
      md: { $value: "{size.80}" },
      lg: { $value: "{size.128}" },
    },
  },
  overlay: {
    list: {
      $type: "dimension",
      maxHeight: { $value: "{size.panel.height.sm}" },
    },
    viewport: {
      $type: "dimension",
      maxHeight: { $value: "{layout.viewport.full}" },
    },
  },
  sidebar: {
    $type: "dimension",
    width: { $value: "{size.64}" },
  },
  commandPalette: {
    list: {
      $type: "dimension",
      maxHeight: { $value: "{size.64}" },
    },
  },
})
