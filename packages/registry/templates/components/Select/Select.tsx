/**
 * Select.tsx
 *
 * Reference Select component implementation.
 */

import { forwardRef } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Select as BaseSelect } from "@base-ui/react/select"
import type {
  SelectArrowProps,
  SelectBackdropProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectProps,
  SelectScrollArrowProps,
  SelectTriggerProps,
  SelectValueProps,
} from "./Select.types"
import {
  selectArrowVariants,
  selectBackdropVariants,
  selectGroupLabelVariants,
  selectGroupVariants,
  selectIconVariants,
  selectItemIndicatorVariants,
  selectItemTextVariants,
  selectItemVariants,
  selectLabelVariants,
  selectListVariants,
  selectPopupVariants,
  selectPositionerVariants,
  selectScrollArrowVariants,
  selectTriggerVariants,
  selectValueVariants,
} from "./Select.variants"
import { cn } from "@/lib/utils"

export const Select = <
  Value = string,
  Multiple extends boolean | undefined = false,
>(
  props: SelectProps<Value, Multiple>,
) => {
  return <BaseSelect.Root {...props} />
}

Select.displayName = "Select"

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => {
    const labelClassName: SelectLabelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectLabelVariants(), userClassName)
    }

    return <BaseSelect.Label ref={ref} className={labelClassName} {...props} />
  },
)

SelectLabel.displayName = "SelectLabel"

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ size, className, ...props }, ref) => {
    const triggerClassName: SelectTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectTriggerVariants({ size }), userClassName)
    }

    return (
      <BaseSelect.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => {
    const valueClassName: SelectValueProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectValueVariants(), userClassName)
    }

    return <BaseSelect.Value ref={ref} className={valueClassName} {...props} />
  },
)

SelectValue.displayName = "SelectValue"

export const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => {
    const iconClassName: SelectIconProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectIconVariants(), userClassName)
    }

    return (
      <BaseSelect.Icon ref={ref} className={iconClassName} {...props}>
        {children ?? <ChevronDown aria-hidden="true" size={16} />}
      </BaseSelect.Icon>
    )
  },
)

SelectIcon.displayName = "SelectIcon"

export const SelectPortal = (props: SelectPortalProps) => {
  return <BaseSelect.Portal {...props} />
}

SelectPortal.displayName = "SelectPortal"

export const SelectBackdrop = forwardRef<HTMLDivElement, SelectBackdropProps>(
  ({ className, ...props }, ref) => {
    const backdropClassName: SelectBackdropProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectBackdropVariants(), userClassName)
    }

    return (
      <BaseSelect.Backdrop ref={ref} className={backdropClassName} {...props} />
    )
  },
)

SelectBackdrop.displayName = "SelectBackdrop"

export const SelectPositioner = forwardRef<
  HTMLDivElement,
  SelectPositionerProps
>(({ className, ...props }, ref) => {
  const positionerClassName: SelectPositionerProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(selectPositionerVariants(), userClassName)
  }

  return (
    <BaseSelect.Positioner
      ref={ref}
      className={positionerClassName}
      {...props}
    />
  )
})

SelectPositioner.displayName = "SelectPositioner"

export const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: SelectPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectPopupVariants(), userClassName)
    }

    return <BaseSelect.Popup ref={ref} className={popupClassName} {...props} />
  },
)

SelectPopup.displayName = "SelectPopup"

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  ({ className, ...props }, ref) => {
    const listClassName: SelectListProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectListVariants(), userClassName)
    }

    return <BaseSelect.List ref={ref} className={listClassName} {...props} />
  },
)

SelectList.displayName = "SelectList"

export const SelectItem = forwardRef<HTMLElement, SelectItemProps>(
  ({ className, ...props }, ref) => {
    const itemClassName: SelectItemProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectItemVariants(), userClassName)
    }

    return <BaseSelect.Item ref={ref} className={itemClassName} {...props} />
  },
)

SelectItem.displayName = "SelectItem"

export const SelectItemIndicator = forwardRef<
  HTMLSpanElement,
  SelectItemIndicatorProps
>(({ className, children, ...props }, ref) => {
  const indicatorClassName: SelectItemIndicatorProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(selectItemIndicatorVariants(), userClassName)
  }

  return (
    <BaseSelect.ItemIndicator
      ref={ref}
      className={indicatorClassName}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseSelect.ItemIndicator>
  )
})

SelectItemIndicator.displayName = "SelectItemIndicator"

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => {
    const textClassName: SelectItemTextProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectItemTextVariants(), userClassName)
    }

    return (
      <BaseSelect.ItemText ref={ref} className={textClassName} {...props} />
    )
  },
)

SelectItemText.displayName = "SelectItemText"

export const SelectArrow = forwardRef<HTMLDivElement, SelectArrowProps>(
  ({ className, ...props }, ref) => {
    const arrowClassName: SelectArrowProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectArrowVariants(), userClassName)
    }

    return <BaseSelect.Arrow ref={ref} className={arrowClassName} {...props} />
  },
)

SelectArrow.displayName = "SelectArrow"

export const SelectScrollUpArrow = forwardRef<
  HTMLDivElement,
  SelectScrollArrowProps
>(({ className, children, ...props }, ref) => {
  const arrowClassName: SelectScrollArrowProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(selectScrollArrowVariants(), userClassName)
  }

  return (
    <BaseSelect.ScrollUpArrow ref={ref} className={arrowClassName} {...props}>
      {children ?? <ChevronUp aria-hidden="true" size={16} />}
    </BaseSelect.ScrollUpArrow>
  )
})

SelectScrollUpArrow.displayName = "SelectScrollUpArrow"

export const SelectScrollDownArrow = forwardRef<
  HTMLDivElement,
  SelectScrollArrowProps
>(({ className, children, ...props }, ref) => {
  const arrowClassName: SelectScrollArrowProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(selectScrollArrowVariants(), userClassName)
  }

  return (
    <BaseSelect.ScrollDownArrow ref={ref} className={arrowClassName} {...props}>
      {children ?? <ChevronDown aria-hidden="true" size={16} />}
    </BaseSelect.ScrollDownArrow>
  )
})

SelectScrollDownArrow.displayName = "SelectScrollDownArrow"

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    const groupClassName: SelectGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(selectGroupVariants(), userClassName)
    }

    return <BaseSelect.Group ref={ref} className={groupClassName} {...props} />
  },
)

SelectGroup.displayName = "SelectGroup"

export const SelectGroupLabel = forwardRef<
  HTMLDivElement,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => {
  const labelClassName: SelectGroupLabelProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(selectGroupLabelVariants(), userClassName)
  }

  return (
    <BaseSelect.GroupLabel ref={ref} className={labelClassName} {...props} />
  )
})

SelectGroupLabel.displayName = "SelectGroupLabel"
