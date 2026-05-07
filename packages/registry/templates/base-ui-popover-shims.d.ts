declare module "@base-ui/react/popover" {
  export namespace Popover {
    export namespace Root {
      export type State = Record<string, never>
      export interface Actions {
        close: () => void
        unmount: () => void
      }
      export interface Props<Payload = unknown> {
        actionsRef?: TemplateRef<Actions>["ref"]
        children?: TemplateNode
        defaultOpen?: boolean
        defaultTriggerId?: string | null
        handle?: { readonly payload?: Payload }
        modal?: boolean | "trap-focus"
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
      export type State = Record<string, never>
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
      export interface Props extends TemplatePartProps<State> {
        finalFocus?: boolean
        initialFocus?: boolean
      }
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

    export namespace Title {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace Description {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace Close {
      export type State = Record<string, never>
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Viewport {
      export interface State {
        activationDirection: string | undefined
        instant: "dismiss" | "click" | undefined
        transitioning: boolean
      }
      export type Props = TemplatePartProps<State>
    }
  }

  export const Popover: {
    Root<Payload = unknown>(props: Popover.Root.Props<Payload>): TemplateElement
    Trigger<Payload = unknown>(
      props: Popover.Trigger.Props<Payload> & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(
      props: Popover.Portal.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Backdrop(
      props: Popover.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Positioner(
      props: Popover.Positioner.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Popover.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Arrow(
      props: Popover.Arrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Title(
      props: Popover.Title.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Description(
      props: Popover.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Close(
      props: Popover.Close.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Viewport(
      props: Popover.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}
