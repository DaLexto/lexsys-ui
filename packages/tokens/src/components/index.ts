import type { ComponentTokenGroup } from "../types/index.js"
import { buttonComponentTokens } from "./button.js"
import { cardComponentTokens } from "./card.js"

export { buttonComponentTokens } from "./button.js"
export { cardComponentTokens } from "./card.js"

export const componentTokens: ComponentTokenGroup[] = [
  buttonComponentTokens,
  cardComponentTokens,
]
