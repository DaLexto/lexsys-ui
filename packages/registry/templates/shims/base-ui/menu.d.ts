declare module "@base-ui/react/menu" {
  export namespace Menu {
    export namespace Root {
      export type State = Record<string, never>
      export interface Actions {
        unmount: () => void
      }
      export interface Props<Payload = unknown> {
        actionsRef?: TemplateRef<Actions>["ref"]
        children?: TemplateNode
        defaultOpen?: boolean
        defaultTriggerId?: string | null
        handle?: { readonly payload?: Payload }
        modal?: boolean
        open?: boolean
        triggerId?: string | null
        onOpenChange?: (open: boolean, eventDetails: unknown) => void
        onOpenChangeComplete?: (open: boolean) => void
      }
    }

    export namespace Trigger {
      export interface State extends TemplateDisabledState {
        open: boolean
      }
      export interface Props<
        Payload = unknown,
      > extends TemplatePartProps<State> {
        closeDelay?: number
        delay?: number
        disabled?: boolean
        handle?: unknown
        id?: string
        nativeButton?: boolean
        openOnHover?: boolean
        payload?: Payload
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Portal {
      export interface Props {
        children?: TemplateNode
        container?: HTMLElement | null
        keepMounted?: boolean
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
        instant: string | undefined
        open: boolean
        side: string
      }
      export interface Props extends TemplatePartProps<State> {
        align?: string
        alignOffset?: number
        collisionAvoidance?: unknown
        collisionBoundary?: unknown
        collisionPadding?: number | Record<string, number>
        side?: string
        sideOffset?: number
      }
    }

    export namespace Popup {
      export interface State {
        align: string
        instant: "dismiss" | "click" | undefined
        open: boolean
        side: string
        transitionStatus: string
      }
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

    export namespace Viewport {
      export interface State {
        activationDirection: string | undefined
        instant: "dismiss" | "click" | undefined
        transitioning: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Item {
      export interface State extends TemplateDisabledState {
        highlighted: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        closeOnClick?: boolean
        disabled?: boolean
        label?: string
      }
    }

    export namespace LinkItem {
      export interface State {
        highlighted: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        closeOnClick?: boolean
        href?: string
        label?: string
      }
    }

    export namespace CheckboxItem {
      export interface State extends TemplateDisabledState {
        checked: boolean
        highlighted: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        checked?: boolean
        closeOnClick?: boolean
        defaultChecked?: boolean
        disabled?: boolean
        label?: string
        onCheckedChange?: (checked: boolean, eventDetails: unknown) => void
      }
    }

    export namespace CheckboxItemIndicator {
      export interface State {
        checked: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }

    export namespace RadioGroup {
      export type State = TemplateDisabledState
      export interface Props<Value = unknown> extends TemplatePartProps<State> {
        defaultValue?: Value
        disabled?: boolean
        value?: Value
        onValueChange?: (value: Value, eventDetails: unknown) => void
      }
    }

    export namespace RadioItem {
      export interface State extends TemplateDisabledState {
        checked: boolean
        highlighted: boolean
      }
      export interface Props<Value = unknown> extends TemplatePartProps<State> {
        closeOnClick?: boolean
        disabled?: boolean
        label?: string
        value: Value
      }
    }

    export namespace RadioItemIndicator {
      export interface State {
        checked: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }

    export namespace Group {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace GroupLabel {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace Separator {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace SubmenuRoot {
      export type State = Record<string, never>
      export interface Props {
        children?: TemplateNode
        delay?: number
      }
    }

    export namespace SubmenuTrigger {
      export interface State extends TemplateDisabledState {
        highlighted: boolean
        open: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        label?: string
      }
    }
  }

  export const Menu: {
    Root<Payload = unknown>(props: Menu.Root.Props<Payload>): TemplateElement
    Trigger<Payload = unknown>(
      props: Menu.Trigger.Props<Payload> & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(props: Menu.Portal.Props): TemplateElement
    Backdrop(
      props: Menu.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Positioner(
      props: Menu.Positioner.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Menu.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Arrow(
      props: Menu.Arrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Viewport(
      props: Menu.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Item(props: Menu.Item.Props & TemplateRef<HTMLElement>): TemplateElement
    LinkItem(props: Menu.LinkItem.Props & TemplateRef<Element>): TemplateElement
    CheckboxItem(
      props: Menu.CheckboxItem.Props & TemplateRef<HTMLElement>,
    ): TemplateElement
    CheckboxItemIndicator(
      props: Menu.CheckboxItemIndicator.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    RadioGroup(
      props: Menu.RadioGroup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    RadioItem(
      props: Menu.RadioItem.Props & TemplateRef<HTMLElement>,
    ): TemplateElement
    RadioItemIndicator(
      props: Menu.RadioItemIndicator.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    Group(
      props: Menu.Group.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    GroupLabel(
      props: Menu.GroupLabel.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Separator(
      props: Menu.Separator.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    SubmenuRoot(props: Menu.SubmenuRoot.Props): TemplateElement
    SubmenuTrigger(
      props: Menu.SubmenuTrigger.Props & TemplateRef<HTMLElement>,
    ): TemplateElement
  }
}
