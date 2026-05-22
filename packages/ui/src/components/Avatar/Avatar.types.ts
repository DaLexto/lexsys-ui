import type { Ref } from "react"
/**
 * Avatar.types.ts
 *
 * Public and internal types for Avatar component.
 */

import type { Avatar as BaseAvatar } from "@base-ui/react/avatar"

export interface AvatarProps extends Omit<
  BaseAvatar.Root.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLSpanElement>
  size?: "sm" | "md" | "lg"
  shape?: "circle" | "square"
  className?: BaseAvatar.Root.Props["className"]
}

export interface AvatarImageProps extends Omit<
  BaseAvatar.Image.Props,
  "className"
> {
  className?: BaseAvatar.Image.Props["className"]
}

export type AvatarFallbackProps = BaseAvatar.Fallback.Props
