import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

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
