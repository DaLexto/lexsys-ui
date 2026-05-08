declare module "@base-ui/react/avatar" {
  export namespace Avatar {
    export namespace Root {
      export interface State {
        imageLoadingStatus: "idle" | "loading" | "loaded" | "error"
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Image {
      export interface State extends Root.State {
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        alt?: string
        src?: string
        onLoadingStatusChange?: (
          status: Root.State["imageLoadingStatus"],
        ) => void
      }
    }

    export namespace Fallback {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        delay?: number
      }
    }
  }

  export const Avatar: {
    Root(
      props: Avatar.Root.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    Image(
      props: Avatar.Image.Props & TemplateRef<HTMLImageElement>,
    ): TemplateElement
    Fallback(
      props: Avatar.Fallback.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}
