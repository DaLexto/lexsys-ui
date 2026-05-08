declare module "@base-ui/react/alert-dialog" {
  export namespace AlertDialog {
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
        disabled?: boolean
        handle?: unknown
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
      export interface State {
        open: boolean
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        forceRender?: boolean
      }
    }

    export namespace Viewport {
      export interface State {
        nested: boolean
        nestedDialogOpen: boolean
        open: boolean
        transitionStatus: string
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Popup {
      export interface State {
        nested: boolean
        nestedDialogOpen: boolean
        open: boolean
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        finalFocus?: boolean
        initialFocus?: boolean
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

  export const AlertDialog: {
    Root<Payload = unknown>(
      props: AlertDialog.Root.Props<Payload>,
    ): TemplateElement
    Trigger<Payload = unknown>(
      props: AlertDialog.Trigger.Props<Payload> &
        TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(props: AlertDialog.Portal.Props): TemplateElement
    Backdrop(
      props: AlertDialog.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Viewport(
      props: AlertDialog.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: AlertDialog.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Title(
      props: AlertDialog.Title.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Description(
      props: AlertDialog.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Close(
      props: AlertDialog.Close.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
  }
}
