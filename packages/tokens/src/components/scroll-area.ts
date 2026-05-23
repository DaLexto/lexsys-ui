import { componentTokens } from "../types/authoring"

export const scrollAreaComponentTokens = componentTokens("scroll-area", {
  scrollbar: {
    $type: "dimension",
    size: { $value: "{size.control.xs}" },
    padding: { $value: "{spacing.control.x.xs}" },
  },
  thumb: {
    $type: "color",
    background: { $value: "{border.strong}" },
    radius: { $value: "{radius.pill}" },
  },
})
