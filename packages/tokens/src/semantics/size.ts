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
  dialog: {
    $type: "dimension",
    maxWidth: { $value: "{size.128}" },
  },
  drawer: {
    maxWidth: { $value: "{size.160}" },
    width: {
      $type: "dimension",
      sm: { $value: "{size.80}" },
      md: { $value: "{size.96}" },
      lg: { $value: "{size.128}" },
    },
    height: {
      $type: "dimension",
      sm: { $value: "{size.48}" },
      md: { $value: "{size.80}" },
      lg: { $value: "{size.128}" },
    },
  },
  popover: {
    $type: "dimension",
    maxWidth: { $value: "{size.80}" },
  },
  selectionControl: {
    $type: "dimension",
    sm: { $value: "{size.3}" },
    md: { $value: "{size.4}" },
    lg: { $value: "{size.5}" },
  },
  badge: {
    $type: "dimension",
    md: { $value: "{size.7}" },
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
  switch: {
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
    thumb: {
      $type: "dimension",
      sm: { $value: "{size.4}" },
      md: { $value: "{size.5}" },
      lg: { $value: "{size.6}" },
    },
    thumbTranslate: {
      $type: "dimension",
      sm: { $value: "{size.4}" },
      md: { $value: "{size.5}" },
      lg: { $value: "{size.6}" },
    },
  },
  track: {
    $type: "dimension",
    sm: { $value: "{size.1}" },
    md: { $value: "{size.2}" },
    lg: { $value: "{size.3}" },
  },
  textarea: {
    minHeight: {
      $type: "dimension",
      sm: { $value: "{size.14}" },
      md: { $value: "{size.16}" },
      lg: { $value: "{size.16}" },
    },
  },
  toast: {
    $type: "dimension",
    viewportWidth: { $value: "{size.96}" },
  },
  thumb: {
    $type: "dimension",
    sm: { $value: "{size.4}" },
    md: { $value: "{size.5}" },
    lg: { $value: "{size.6}" },
  },

})
