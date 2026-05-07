declare module "lucide-react" {
  export interface LucideProps {
    "aria-hidden"?: boolean | "true" | "false"
    className?: string
    size?: number | string
  }

  export function Check(props: LucideProps): TemplateElement
  export function ChevronDown(props: LucideProps): TemplateElement
  export function ChevronUp(props: LucideProps): TemplateElement
}

declare module "@base-ui/react/select" {
  type TemplateSelectValue<
    Value,
    Multiple extends boolean | undefined,
  > = Multiple extends true ? Value[] : Value

  export namespace Select {
    export namespace Root {
      export type State = Record<string, never>
      export interface Actions {
        unmount: () => void
      }
      export interface Props<
        Value = unknown,
        Multiple extends boolean | undefined = false,
      > {
        actionsRef?: TemplateRef<Actions>["ref"]
        autoComplete?: string
        children?: TemplateNode
        defaultOpen?: boolean
        defaultValue?: TemplateSelectValue<Value, Multiple> | null
        disabled?: boolean
        form?: string
        highlightItemOnHover?: boolean
        id?: string
        inputRef?: TemplateRef<HTMLInputElement>["ref"]
        itemToStringLabel?: (itemValue: Value) => string
        itemToStringValue?: (itemValue: Value) => string
        isItemEqualToValue?: (itemValue: Value, value: Value) => boolean
        items?:
          | Record<string, TemplateNode>
          | ReadonlyArray<{ label: TemplateNode; value: Value }>
        modal?: boolean
        multiple?: Multiple
        name?: string
        open?: boolean
        readOnly?: boolean
        required?: boolean
        value?: TemplateSelectValue<Value, Multiple> | null
        onOpenChange?: (open: boolean, eventDetails: unknown) => void
        onOpenChangeComplete?: (open: boolean) => void
        onValueChange?: (
          value:
            | TemplateSelectValue<Value, Multiple>
            | (Multiple extends true ? never : null),
          eventDetails: unknown,
        ) => void
      }
    }

    export namespace Label {
      export type State = TemplateDisabledState
      export type Props = Omit<TemplatePartProps<State>, "id">
    }

    export namespace Trigger {
      export interface State extends TemplateDisabledState {
        open: boolean
        placeholder: boolean
        readOnly: boolean
        value: unknown
      }
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Value {
      export interface State {
        placeholder: boolean
        value: unknown
      }
      export interface Props extends Omit<
        TemplatePartProps<State>,
        "children"
      > {
        children?: TemplateNode
        placeholder?: TemplateNode
      }
    }

    export namespace Icon {
      export interface State {
        open: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Portal {
      export type State = Record<string, never>
      export interface Props {
        children?: TemplateNode
        container?: HTMLElement | null
      }
    }

    export namespace Backdrop {
      export interface State {
        open: boolean
        transitionStatus: string
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Positioner {
      export interface State {
        align: string
        anchorHidden: boolean
        open: boolean
        side: string
      }
      export interface Props extends TemplatePartProps<State> {
        align?: string
        alignItemWithTrigger?: boolean
        side?: string
        sideOffset?: number
      }
    }

    export namespace Popup {
      export interface State {
        align: string
        open: boolean
        side: string
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        finalFocus?: boolean
      }
    }

    export namespace List {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace Item {
      export interface State extends TemplateDisabledState {
        highlighted: boolean
        selected: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        label?: string
        value?: unknown
      }
    }

    export namespace ItemIndicator {
      export interface State {
        selected: boolean
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }

    export namespace ItemText {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace Arrow {
      export interface State {
        align: string
        open: boolean
        side: string
        uncentered: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace ScrollDownArrow {
      export type State = Record<string, never>
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }

    export namespace ScrollUpArrow {
      export type State = ScrollDownArrow.State
      export type Props = ScrollDownArrow.Props
    }

    export namespace Group {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace GroupLabel {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }
  }

  export const Select: {
    Root<Value = unknown, Multiple extends boolean | undefined = false>(
      props: Select.Root.Props<Value, Multiple>,
    ): TemplateElement
    Label(
      props: Select.Label.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Trigger(
      props: Select.Trigger.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Value(
      props: Select.Value.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    Icon(
      props: Select.Icon.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    Portal(
      props: Select.Portal.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Backdrop(
      props: Select.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Positioner(
      props: Select.Positioner.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Select.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    List(
      props: Select.List.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Item(props: Select.Item.Props & TemplateRef<HTMLElement>): TemplateElement
    ItemIndicator(
      props: Select.ItemIndicator.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    ItemText(
      props: Select.ItemText.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Arrow(
      props: Select.Arrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    ScrollUpArrow(
      props: Select.ScrollUpArrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    ScrollDownArrow(
      props: Select.ScrollDownArrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Group(
      props: Select.Group.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    GroupLabel(
      props: Select.GroupLabel.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}
