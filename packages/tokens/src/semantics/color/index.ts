import { semanticTokens } from "../../types/authoring"
import {
  colorBackgroundBranch,
  colorFeedbackBranch,
  colorTextBranch,
} from "./branches"

export const colorSemantics = semanticTokens("color", {
  ...colorBackgroundBranch,
  ...colorTextBranch,
  ...colorFeedbackBranch,
})

export {
  colorBackgroundBranch,
  colorFeedbackBranch,
  colorTextBranch,
} from "./branches"
