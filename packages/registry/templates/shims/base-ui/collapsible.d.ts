declare module "lucide-react" {
  export interface LucideProps {
    "aria-hidden"?: boolean | "true" | "false"
    className?: string
    size?: number | string
  }

  export function Plus(props: LucideProps): TemplateElement
}

declare module "@base-ui/react/collapsible" {
  export namespace Collapsible {
    export namespace Root {
      export interface State extends TemplateDisabledState {
        open: boolean
      }
      export interface Props extends TemplatePartProps<State> {
        defaultOpen?: boolean
        disabled?: boolean
        open?: boolean
        onOpenChange?: (open: boolean, eventDetails: unknown) => void
      }
    }

    export namespace Trigger {
      export type State = Root.State
      export interface Props extends TemplatePartProps<State> {
        disabled?: boolean
        type?: "button" | "submit" | "reset"
      }
    }

    export namespace Panel {
      export interface State extends Root.State {
        transitionStatus: string
      }
      export interface Props extends TemplatePartProps<State> {
        hiddenUntilFound?: boolean
        keepMounted?: boolean
      }
    }
  }

  export const Collapsible: {
    Root(
      props: Collapsible.Root.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
    Trigger(
      props: Collapsible.Trigger.Props & TemplateRef<HTMLButtonElement>,
    ): TemplateElement
    Panel(
      props: Collapsible.Panel.Props & TemplateRef<HTMLDivElement>,
    ): TemplateElement
  }
}
