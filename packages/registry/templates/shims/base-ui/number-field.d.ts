declare module "@base-ui/react/number-field" {
  export namespace NumberField {
    export namespace Root {
      export interface State extends TemplateDisabledState {
        dirty?: boolean
        filled?: boolean
        focused?: boolean
        inputValue: string
        readOnly: boolean
        required: boolean
        scrubbing: boolean
        touched?: boolean
        valid?: boolean | null
        value: number | null
      }
      export interface Props extends TemplatePartProps<State> {
        allowOutOfRange?: boolean
        allowWheelScrub?: boolean
        defaultValue?: number
        disabled?: boolean
        form?: string
        format?: Intl.NumberFormatOptions
        id?: string
        inputRef?: TemplateRef<HTMLInputElement>["ref"]
        largeStep?: number
        locale?: Intl.LocalesArgument
        max?: number
        min?: number
        name?: string
        readOnly?: boolean
        required?: boolean
        smallStep?: number
        snapOnStep?: boolean
        step?: number | "any"
        value?: number | null
        onValueChange?: (value: number | null, eventDetails: unknown) => void
        onValueCommitted?: (value: number | null, eventDetails: unknown) => void
      }
    }

    export namespace Group {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }

    export namespace Input {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
        "aria-roledescription"?: string
      }
    }

    export namespace Increment {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Decrement {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace ScrubArea {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        direction?: "horizontal" | "vertical"
        pixelSensitivity?: number
        teleportDistance?: number
      }
    }

    export namespace ScrubAreaCursor {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }
  }

  export const NumberField: {
    Root(
      props: NumberField.Root.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Group(
      props: NumberField.Group.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Input(
      props: NumberField.Input.Props & TemplateRef<HTMLInputElement>,
    ): TemplateElement
    Increment(
      props: NumberField.Increment.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Decrement(
      props: NumberField.Decrement.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    ScrubArea(
      props: NumberField.ScrubArea.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
    ScrubAreaCursor(
      props: NumberField.ScrubAreaCursor.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}
