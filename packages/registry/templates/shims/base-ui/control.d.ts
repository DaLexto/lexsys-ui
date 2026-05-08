declare module "@base-ui/react/button" {
  export namespace Button {
    export type State = TemplateDisabledState
    export interface Props extends TemplatePartProps<State> {
      disabled?: boolean
      type?: "button" | "submit" | "reset"
      "aria-busy"?: boolean
      focusableWhenDisabled?: boolean
      render?:
        | Exclude<TemplateElement, null>
        | ((props: Record<string, unknown>, state: State) => TemplateElement)
    }
  }

  export function Button(
    props: Button.Props & TemplateRef<HTMLElement>,
  ): TemplateElement
}

declare module "@base-ui/react/input" {
  export namespace Input {
    export interface State extends Partial<TemplateCheckedState> {
      dirty?: boolean
      filled?: boolean
      focused?: boolean
      touched?: boolean
      valid?: boolean | null
    }
    export interface ChangeEventDetails {
      reason?: string
    }
    export interface Props extends TemplatePartProps<State> {
      "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
      defaultValue?: string | number | readonly string[]
      disabled?: boolean
      placeholder?: string
      type?: string
      value?: string | number | readonly string[]
      onValueChange?: (value: string, eventDetails: ChangeEventDetails) => void
      render?:
        | Exclude<TemplateElement, null>
        | ((props: Record<string, unknown>, state: State) => TemplateElement)
    }
  }

  export function Input(
    props: Input.Props & TemplateRef<HTMLElement>,
  ): TemplateElement
}

declare module "@base-ui/react/field" {
  export namespace Field {
    export namespace Root {
      export interface State {
        disabled: boolean
        touched: boolean
        dirty: boolean
        valid: boolean | null
        filled: boolean
        focused: boolean
      }
      export interface Actions {
        validate: () => void
      }
      export interface Props extends TemplatePartProps<State> {
        actionsRef?: TemplateActionRef<Actions>
        dirty?: boolean
        disabled?: boolean
        invalid?: boolean
        name?: string
        touched?: boolean
        validate?: (
          value: unknown,
          formValues: Record<string, unknown>,
        ) => string | string[] | Promise<string | string[] | null> | null
        validationDebounceTime?: number
        validationMode?: "onSubmit" | "onBlur" | "onChange"
      }
    }

    export namespace Label {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        nativeLabel?: boolean
      }
    }

    export namespace Control {
      export type State = Root.State
      export interface ChangeEventDetails {
        reason?: string
      }
      export interface Props extends TemplatePartProps<State> {
        "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
        defaultValue?: string | number | readonly string[]
        disabled?: boolean
        placeholder?: string
        required?: boolean
        type?: string
        value?: string | number | readonly string[]
        onValueChange?: (
          value: string,
          eventDetails: ChangeEventDetails,
        ) => void
        render?:
          | Exclude<TemplateElement, null>
          | ((props: Record<string, unknown>, state: State) => TemplateElement)
      }
    }

    export namespace Description {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }

    export namespace Item {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
      }
    }

    export namespace Error {
      export interface State extends Root.State {
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        match?: boolean | keyof ValidityState
      }
    }

    export namespace Validity {
      export interface State {
        validity: {
          badInput: boolean
          customError: boolean
          patternMismatch: boolean
          rangeOverflow: boolean
          rangeUnderflow: boolean
          stepMismatch: boolean
          tooLong: boolean
          tooShort: boolean
          typeMismatch: boolean
          valueMissing: boolean
          valid: boolean | null
        }
        transitionStatus: string
        error: string
        errors: string[]
        value: unknown
        initialValue: unknown
      }
      export interface Props {
        children: (state: State) => TemplateNode
      }
    }
  }

  export const Field: {
    Root(props: Field.Root.Props & TemplateRef<HTMLDivElement>): TemplateElement
    Label(props: Field.Label.Props & TemplateRef<HTMLElement>): TemplateElement
    Control(
      props: Field.Control.Props & TemplateRef<HTMLElement>,
    ): TemplateElement
    Description(
      props: Field.Description.Props & TemplateRef<HTMLParagraphElement>,
    ): TemplateElement
    Item(props: Field.Item.Props & TemplateRef<HTMLDivElement>): TemplateElement
    Error(
      props: Field.Error.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Validity(props: Field.Validity.Props): TemplateElement
  }
}

declare module "@base-ui/react/form" {
  export namespace Form {
    export type State = Record<string, never>
    export interface Actions {
      validate: (fieldName?: string) => void
    }
    export type ValidationMode = "onSubmit" | "onBlur" | "onChange"
    export interface SubmitEventDetails {
      reason: "none"
      event: Event
    }
    export type Values = Record<string, unknown>
    export type Errors = Record<string, string | string[] | null | undefined>
    export interface Props extends TemplatePartProps<State> {
      actionsRef?: TemplateActionRef<Actions>
      errors?: Errors
      validationMode?: ValidationMode
      onFormSubmit?: (
        formValues: Values,
        eventDetails: SubmitEventDetails,
      ) => void
    }
  }

  export function Form(
    props: Form.Props & TemplateRef<HTMLFormElement>,
  ): TemplateElement
}

declare module "@base-ui/react/fieldset" {
  export namespace Fieldset {
    export namespace Root {
      export type State = TemplateDisabledState
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
      }
    }

    export namespace Legend {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }
  }

  export const Fieldset: {
    Root(props: Fieldset.Root.Props & TemplateRef<HTMLElement>): TemplateElement
    Legend(
      props: Fieldset.Legend.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/checkbox" {
  export namespace Checkbox {
    export namespace Root {
      export interface State extends TemplateCheckedState {
        indeterminate: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        checked?: boolean
        defaultChecked?: boolean
        disabled?: boolean
        indeterminate?: boolean
        name?: string
        required?: boolean
        value?: string
        onCheckedChange?: (checked: boolean, eventDetails: unknown) => void
      }
    }
    export namespace Indicator {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }
  }

  export const Checkbox: {
    Root(props: Checkbox.Root.Props & TemplateRef<HTMLElement>): TemplateElement
    Indicator(
      props: Checkbox.Indicator.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/switch" {
  export namespace Switch {
    export namespace Root {
      export type State = TemplateCheckedState
      export interface Props extends TemplatePartProps<State> {
        checked?: boolean
        defaultChecked?: boolean
        disabled?: boolean
        name?: string
        required?: boolean
        value?: string
        onCheckedChange?: (checked: boolean, eventDetails: unknown) => void
      }
    }
    export namespace Thumb {
      export type State = Root.State
      export type Props = TemplatePartProps<State>
    }
  }

  export const Switch: {
    Root(props: Switch.Root.Props & TemplateRef<HTMLElement>): TemplateElement
    Thumb(
      props: Switch.Thumb.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/toggle" {
  export namespace Toggle {
    export interface State extends TemplateDisabledState {
      pressed: boolean
    }
    export interface Props extends TemplatePartProps<State> {
      defaultPressed?: boolean
      disabled?: boolean
      pressed?: boolean
      type?: "button" | "submit" | "reset"
      value?: string
      onPressedChange?: (pressed: boolean, eventDetails: unknown) => void
    }
  }

  export function Toggle(
    props: Toggle.Props & TemplateRef<HTMLButtonElement>,
  ): TemplateElement
}

declare module "@base-ui/react/separator" {
  type Orientation = "horizontal" | "vertical"

  export namespace Separator {
    export interface State {
      orientation: Orientation
    }
    export interface Props extends TemplatePartProps<State> {
      orientation?: Orientation
    }
  }

  export function Separator(
    props: Separator.Props & TemplateRef<HTMLDivElement>,
  ): TemplateElement
}

declare module "@base-ui/react/radio" {
  export namespace Radio {
    export namespace Root {
      export type State = TemplateCheckedState
      export interface Props<Value = unknown> extends TemplatePartProps<State> {
        disabled?: boolean
        required?: boolean
        value?: Value
      }
    }
    export namespace Indicator {
      export interface State {
        checked: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        keepMounted?: boolean
      }
    }
  }

  export const Radio: {
    Root<Value>(
      props: Radio.Root.Props<Value> & TemplateRef<HTMLElement>,
    ): TemplateElement
    Indicator(
      props: Radio.Indicator.Props & TemplateRef<HTMLSpanElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/radio-group" {
  export namespace RadioGroup {
    export interface State extends Partial<TemplateDisabledState> {
      required?: boolean
    }
    export interface Props<Value = unknown> extends TemplatePartProps<State> {
      defaultValue?: Value
      disabled?: boolean
      name?: string
      value?: Value
      onValueChange?: (value: Value, eventDetails: unknown) => void
    }
  }

  export function RadioGroup<Value>(
    props: RadioGroup.Props<Value> & TemplateRef<HTMLDivElement>,
  ): TemplateElement
}

declare module "@base-ui/react/progress" {
  export namespace Progress {
    export namespace Root {
      export interface State {
        status: "indeterminate" | "progressing" | "complete"
      }
      export interface Props extends TemplatePartProps<State> {
        max?: number
        min?: number
        value?: number | null
      }
    }
    export namespace Track {
      export type Props = TemplatePartProps<Root.State>
    }
    export namespace Indicator {
      export type Props = TemplatePartProps<Root.State>
    }
  }

  export const Progress: {
    Root(
      props: Progress.Root.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Track(
      props: Progress.Track.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Indicator(
      props: Progress.Indicator.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/slider" {
  export namespace Slider {
    export namespace Root {
      export interface State extends TemplateDisabledState {
        dragging: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        defaultValue?: number | readonly number[]
        disabled?: boolean
        max?: number
        min?: number
        step?: number
        value?: number | readonly number[]
        onValueChange?: (
          value: number | readonly number[],
          eventDetails: unknown,
        ) => void
      }
    }
    export namespace Control {
      export type Props = TemplatePartProps<Root.State>
    }
    export namespace Track {
      export type Props = TemplatePartProps<Root.State>
    }
    export namespace Indicator {
      export type Props = TemplatePartProps<Root.State>
    }
    export namespace Thumb {
      export type Props = TemplatePartProps<Root.State>
    }
  }

  export const Slider: {
    Root(
      props: Slider.Root.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Control(
      props: Slider.Control.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Track(
      props: Slider.Track.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Indicator(
      props: Slider.Indicator.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Thumb(
      props: Slider.Thumb.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}
