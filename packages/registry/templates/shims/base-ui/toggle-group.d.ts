declare module "@base-ui/react/toggle-group" {
  type Orientation = "horizontal" | "vertical"

  export namespace ToggleGroup {
    export interface State extends TemplateDisabledState {
      orientation: Orientation
    }

    export interface Props<
      Value extends string = string,
    > extends TemplatePartProps<State> {
      defaultValue?: readonly Value[]
      disabled?: boolean
      loopFocus?: boolean
      multiple?: boolean
      orientation?: Orientation
      value?: readonly Value[]
      onValueChange?: (value: Value[], eventDetails: unknown) => void
    }
  }

  export function ToggleGroup<Value extends string = string>(
    props: ToggleGroup.Props<Value> & TemplateRef<HTMLDivElement>,
  ): TemplateElement
}
