import type { SemanticTokenGroup } from "../types"

export const sizeSemantics: SemanticTokenGroup = {
  name: "size",
  control: {
    xs: { value: "{size.6}" },
    sm: { value: "{size.8}" },
    md: { value: "{size.10}" },
    lg: { value: "{size.12}" },
    xl: { value: "{size.14}" },
  },
  selectionControl: {
    sm: { value: "{size.3}" },
    md: { value: "{size.4}" },
    lg: { value: "{size.5}" },
  },
  selectionIndicator: {
    sm: { value: "{size.1}" },
    md: { value: "{size.2}" },
    lg: { value: "{size.2}" },
  },
  switch: {
    width: {
      sm: { value: "{size.9}" },
      md: { value: "{size.11}" },
      lg: { value: "{size.13}" },
    },
    height: {
      sm: { value: "{size.5}" },
      md: { value: "{size.6}" },
      lg: { value: "{size.7}" },
    },
    thumb: {
      sm: { value: "{size.4}" },
      md: { value: "{size.5}" },
      lg: { value: "{size.6}" },
    },
    thumbTranslate: {
      sm: { value: "{size.4}" },
      md: { value: "{size.5}" },
      lg: { value: "{size.6}" },
    },
  },
  track: {
    sm: { value: "{size.1}" },
    md: { value: "{size.2}" },
    lg: { value: "{size.3}" },
  },
  thumb: {
    sm: { value: "{size.4}" },
    md: { value: "{size.5}" },
    lg: { value: "{size.6}" },
  },
}
