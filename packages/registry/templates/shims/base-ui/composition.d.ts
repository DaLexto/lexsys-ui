interface TemplateOpenState {
  open: boolean
}

declare module "@base-ui/react/tabs" {
  type Orientation = "horizontal" | "vertical"

  export namespace Tabs {
    export namespace Root {
      export interface State {
        orientation: Orientation
      }
      export interface Props extends TemplatePartProps<State> {
        defaultValue?: unknown
        orientation?: Orientation
        value?: unknown
        onValueChange?: (value: unknown, eventDetails: unknown) => void
      }
    }
    export namespace List {
      export type Props = TemplatePartProps<Root.State>
    }
    export namespace Tab {
      export interface State extends Root.State, TemplateDisabledState {
        active: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        value?: unknown
      }
    }
    export namespace Panel {
      export interface Props extends TemplatePartProps<Root.State> {
        value?: unknown
      }
    }
  }

  export const Tabs: {
    Root(props: Tabs.Root.Props & TemplateRef<HTMLDivElement>): TemplateElement
    List(props: Tabs.List.Props & TemplateRef<HTMLDivElement>): TemplateElement
    Tab(props: Tabs.Tab.Props & TemplateRef<HTMLElement>): TemplateElement
    Panel(
      props: Tabs.Panel.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/accordion" {
  export namespace Accordion {
    export namespace Root {
      export type State = TemplateDisabledState
      export interface Props extends TemplatePartProps<State> {
        defaultValue?: unknown[]
        multiple?: boolean
        value?: unknown[]
        onValueChange?: (value: unknown[], eventDetails: unknown) => void
      }
    }
    export namespace Item {
      export interface State extends Root.State {
        open: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        value?: unknown
      }
    }
    export namespace Header {
      export type Props = TemplatePartProps<Item.State>
    }
    export namespace Trigger {
      export interface Props extends TemplatePartProps<Item.State> {
        disabled?: boolean
      }
    }
    export namespace Panel {
      export type Props = TemplatePartProps<Item.State>
    }
  }

  export const Accordion: {
    Root(
      props: Accordion.Root.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Item(
      props: Accordion.Item.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Header(
      props: Accordion.Header.Props & TemplateRef<HTMLHeadingElement>,
    ): TemplateElement
    Trigger(
      props: Accordion.Trigger.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Panel(
      props: Accordion.Panel.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}

declare module "@base-ui/react/tooltip" {
  export namespace Tooltip {
    export namespace Root {
      export interface Props {
        children?: TemplateNode
        defaultOpen?: boolean
        open?: boolean
        onOpenChange?: (open: boolean, eventDetails: unknown) => void
      }
    }
    export namespace Trigger {
      export type State = TemplateOpenState
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
      }
    }
    export namespace Positioner {
      export type State = TemplateOpenState
      export interface Props extends TemplatePartProps<State> {
        side?: "top" | "right" | "bottom" | "left"
      }
    }
    export namespace Popup {
      export type State = TemplateOpenState
      export type Props = TemplatePartProps<State>
    }
    export namespace Arrow {
      export type Props = TemplatePartProps<Popup.State>
    }
    export namespace Portal {
      export interface Props {
        children?: TemplateNode
      }
    }
  }

  export const Tooltip: {
    Root(props: Tooltip.Root.Props): TemplateElement
    Trigger(
      props: Tooltip.Trigger.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Portal(props: Tooltip.Portal.Props): TemplateElement
    Positioner(
      props: Tooltip.Positioner.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Popup(
      props: Tooltip.Popup.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Arrow(
      props: Tooltip.Arrow.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}
