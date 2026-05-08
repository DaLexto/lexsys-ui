declare module "@base-ui/react/meter" {
  export namespace Meter {
    export namespace Root {
      export interface State {
        max: number
        min: number
        value: number | null
      }
      export interface Props extends TemplatePartProps<State> {
        format?: Intl.NumberFormatOptions
        max?: number
        min?: number
        value?: number | null
      }
    }

    export namespace Track {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }

    export namespace Indicator {
      export interface State extends Root.State {
        complete: boolean
      }
      export type Props = TemplatePartProps<State>
    }

    export namespace Value {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }

    export namespace Label {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }
  }

  export const Meter: {
    Root(props: Meter.Root.Props & TemplateRef<HTMLDivElement>): TemplateElement
    Track(
      props: Meter.Track.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Indicator(
      props: Meter.Indicator.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Value(
      props: Meter.Value.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    Label(
      props: Meter.Label.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}
