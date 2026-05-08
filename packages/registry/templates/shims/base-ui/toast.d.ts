declare module "@base-ui/react/toast" {
  type ToastType = "foreground" | "background" | "success" | "destructive"

  export namespace Toast {
    export interface Manager<Data extends object = object> {
      toasts: Root.ToastObject<Data>[]
      add: (toast: Omit<Root.ToastObject<Data>, "id">) => string
      close: (id: string) => void
      update: (
        id: string,
        toast: Partial<Omit<Root.ToastObject<Data>, "id">>,
      ) => void
      promise: <Value>(
        promise: Promise<Value>,
        states: {
          loading: Omit<Root.ToastObject<Data>, "id">
          success?: Omit<Root.ToastObject<Data>, "id">
          error?: Omit<Root.ToastObject<Data>, "id">
        },
      ) => Promise<Value>
    }

    export namespace Provider {
      export interface Props {
        children?: TemplateNode
        limit?: number
        timeout?: number
        toastManager?: Manager
      }
    }

    export namespace Portal {
      export interface Props {
        children?: TemplateNode
        container?: HTMLElement | null
        keepMounted?: boolean
      }
    }

    export namespace Viewport {
      export interface State {
        expanded: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Root {
      export interface ToastObject<Data extends object = object> {
        id: string
        title?: TemplateNode
        description?: TemplateNode
        type?: ToastType
        timeout?: number
        priority?: "low" | "high"
        actionProps?: Action.Props
        positionerProps?: Positioner.Props
        data?: Data
      }

      export interface State {
        expanded: boolean
        limited: boolean
        swipeDirection: "up" | "down" | "left" | "right"
        swiping: boolean
        transitionStatus: string
        type: ToastType
      }

      export interface Props extends TemplatePartProps<State> {
        toast: ToastObject
        swipeDirection?: "up" | "down" | "left" | "right"
      }
    }

    export namespace Positioner {
      export interface State {
        side: string
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Content {
      export interface State {
        behind: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Arrow {
      export interface State {
        side: string
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

    export namespace Action {
      export type State = TemplateDisabledState
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Close {
      export type State = TemplateDisabledState
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }
  }

  export const Toast: {
    Provider(props: Toast.Provider.Props): TemplateElement
    Portal(
      props: Toast.Portal.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Viewport(
      props: Toast.Viewport.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Root(props: Toast.Root.Props & TemplateRef<HTMLDivElement>): TemplateElement
    Positioner(
      props: Toast.Positioner.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Content(
      props: Toast.Content.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Arrow(
      props: Toast.Arrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Title(
      props: Toast.Title.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Description(
      props: Toast.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Action(
      props: Toast.Action.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Close(
      props: Toast.Close.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    useToastManager: <Data extends object = object>() => Toast.Manager<Data>
    createToastManager: <Data extends object = object>() => Toast.Manager<Data>
  }
}
