/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module "@base-ui/react/drawer" {
  type DrawerSide = "bottom" | "top" | "right" | "left"
  type DrawerSnapPoint = number | string

  interface DrawerOpenState {
    open: boolean
    transitionStatus: string
  }

  interface DrawerNestedState extends DrawerOpenState {
    nested: boolean
    nestedDrawerOpen: boolean
  }

  export namespace Drawer {
    export type Handle<Payload = unknown> = { readonly payload?: Payload }

    export namespace Root {
      export type State = Record<string, never>
      export interface Actions {
        close: () => void
        unmount: () => void
      }
      export interface Props<Payload = unknown> {
        actionsRef?: import("react").RefObject<Actions | null>
        children?: TemplateNode
        defaultOpen?: boolean
        defaultSnapPoint?: DrawerSnapPoint | null
        defaultTriggerId?: string | null
        disablePointerDismissal?: boolean
        handle?: Handle<Payload>
        modal?: boolean | "trap-focus"
        open?: boolean
        snapPoint?: DrawerSnapPoint | null
        snapPoints?: DrawerSnapPoint[]
        snapToSequentialPoints?: boolean
        swipeDirection?: DrawerSide
        triggerId?: string | null
        onOpenChange?: (open: boolean, eventDetails: unknown) => void
        onOpenChangeComplete?: (open: boolean) => void
        onSnapPointChange?: (
          snapPoint: DrawerSnapPoint | null,
          eventDetails: unknown,
        ) => void
      }
    }

    export namespace Provider {
      export interface Props {
        children?: TemplateNode
      }
    }

    export namespace IndentBackground {
      export interface State {
        active: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Indent {
      export interface State {
        active: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Trigger {
      export interface State extends TemplateDisabledState {
        open: boolean
      }
      export interface Props<
        Payload = unknown,
      > extends TemplatePartProps<State> {
        disabled?: boolean
        handle?: Handle<Payload>
        id?: string
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
      export type State = DrawerOpenState
      export interface Props extends TemplatePartProps<State> {
        forceRender?: boolean
      }
    }

    export namespace Viewport {
      export interface State extends DrawerOpenState {
        nested: boolean
        nestedDialogOpen: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Popup {
      export interface State extends DrawerNestedState {
        expanded: boolean
        nestedDrawerSwiping: boolean
        swipeDirection: DrawerSide
        swiping: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        finalFocus?: boolean
        initialFocus?: boolean
      }
    }

    export namespace Content {
      export type State = Record<string, never>
      export type Props = TemplatePartProps<State>
    }

    export namespace SwipeArea {
      export interface State extends TemplateDisabledState {
        open: boolean
        swipeDirection: DrawerSide
        swiping: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        swipeDirection?: DrawerSide
      }
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
      export type State = TemplateDisabledState
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }
  }

  export const Drawer: {
    Root<Payload = unknown>(props: Drawer.Root.Props<Payload>): TemplateElement
    Provider(props: Drawer.Provider.Props): TemplateElement
    IndentBackground(
      props: Drawer.IndentBackground.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Indent(
      props: Drawer.Indent.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Trigger<Payload = unknown>(
      props: Drawer.Trigger.Props<Payload> & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(
      props: Drawer.Portal.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Backdrop(
      props: Drawer.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Viewport(
      props: Drawer.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Drawer.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Content(
      props: Drawer.Content.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    SwipeArea(
      props: Drawer.SwipeArea.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Title(
      props: Drawer.Title.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Description(
      props: Drawer.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Close(
      props: Drawer.Close.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
  }
}
