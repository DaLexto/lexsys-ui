/**
 * Avatar.tsx
 *
 * Reference Avatar component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size, shape, className, ...props }, ref) => {
    const avatarClassName: AvatarProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(avatarVariants({ size, shape }), userClassName)
    }

    return <BaseAvatar.Root ref={ref} className={avatarClassName} {...props} />
  },
)

Avatar.displayName = "Avatar"

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    const imageClassName: AvatarImageProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(avatarImageVariants(), userClassName)
    }

    return <BaseAvatar.Image ref={ref} className={imageClassName} {...props} />
  },
)

AvatarImage.displayName = "AvatarImage"

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    const fallbackClassName: AvatarFallbackProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(avatarFallbackVariants(), userClassName)
    }

    return (
      <BaseAvatar.Fallback ref={ref} className={fallbackClassName} {...props} />
    )
  },
)

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
