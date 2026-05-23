/**
 * Avatar.tsx
 *
 * Reference Avatar component implementation.
 */

import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from "./Avatar.types"
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "./Avatar.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Avatar = ({ ref, size, shape, className, ...props }: AvatarProps) => {
  return (
    <BaseAvatar.Root
      ref={ref}
      className={mergeClassName(avatarVariants({ size, shape }), className)}
      {...props}
    />
  )
}

Avatar.displayName = "Avatar"

const AvatarImage = ({ ref, className, ...props }: AvatarImageProps) => {
  return (
    <BaseAvatar.Image
      ref={ref}
      className={mergeClassName(avatarImageVariants(), className)}
      {...props}
    />
  )
}

AvatarImage.displayName = "AvatarImage"

const AvatarFallback = ({ ref, className, ...props }: AvatarFallbackProps) => {
  return (
    <BaseAvatar.Fallback
      ref={ref}
      className={mergeClassName(avatarFallbackVariants(), className)}
      {...props}
    />
  )
}

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
