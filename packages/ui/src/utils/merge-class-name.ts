import type { ClassValue } from "clsx"
import { cn } from "./cn"

type StatefulClassName<State> =
  | string
  | ((state: State) => string | undefined)
  | undefined

export const mergeClassName = <State>(
  baseClassName: ClassValue,
  className: StatefulClassName<State>,
) => {
  return (state: State) =>
    cn(
      baseClassName,
      typeof className === "function" ? className(state) : className,
    )
}
