import type { Ref } from "react"
/**
 * Avatar.types.ts
 *
 * Public and internal types for Avatar component.
 */

import type { Avatar as BaseAvatar } from "@base-ui/react/avatar"

export type AvatarSize = "sm" | "md" | "lg"

export type AvatarShape = "circle" | "square"

export interface AvatarProps extends Omit<
  BaseAvatar.Root.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLSpanElement>
  size?: AvatarSize
  shape?: AvatarShape
  className?: BaseAvatar.Root.Props["className"]
}

export interface AvatarImageProps extends Omit<
  BaseAvatar.Image.Props,
  "className"
> {
  className?: BaseAvatar.Image.Props["className"]
}

export type AvatarFallbackProps = BaseAvatar.Fallback.Props
