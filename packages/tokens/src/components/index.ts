import type { ComponentTokenGroup } from "../types/index.js"
import { alertComponentTokens } from "./alert.js"
import { badgeComponentTokens } from "./badge.js"
import { buttonComponentTokens } from "./button.js"
import { cardComponentTokens } from "./card.js"
import { inputComponentTokens } from "./input.js"

export { alertComponentTokens } from "./alert.js"
export { badgeComponentTokens } from "./badge.js"
export { buttonComponentTokens } from "./button.js"
export { cardComponentTokens } from "./card.js"
export { inputComponentTokens } from "./input.js"

export const componentTokens: ComponentTokenGroup[] = [
  alertComponentTokens,
  badgeComponentTokens,
  buttonComponentTokens,
  cardComponentTokens,
  inputComponentTokens,
]
