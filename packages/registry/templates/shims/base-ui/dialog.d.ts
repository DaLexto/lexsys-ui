declare module "lucide-react" {
  export interface LucideProps {
    "aria-hidden"?: boolean | "true" | "false"
    className?: string
    size?: number | string
  }

  export function X(props: LucideProps): TemplateElement
}

declare module "@base-ui/react/dialog" {
  export namespace Dialog {
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
        disablePointerDismissal?: boolean
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
        disabled?: boolean
        handle?: unknown
        id?: string
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

  export const Dialog: {
    Root<Payload = unknown>(props: Dialog.Root.Props<Payload>): TemplateElement
    Trigger<Payload = unknown>(
      props: Dialog.Trigger.Props<Payload> & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(
      props: Dialog.Portal.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Backdrop(
      props: Dialog.Backdrop.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Viewport(
      props: Dialog.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Dialog.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Title(
      props: Dialog.Title.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Description(
      props: Dialog.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Close(
      props: Dialog.Close.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
  }
}
