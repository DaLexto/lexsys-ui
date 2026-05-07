import {
  Button,
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@neurex/ui"

export const OverlaysPanel = () => {
  return (
    <section className="component-panel" aria-labelledby="overlays-title">
      <div className="panel-header">
        <div>
          <p className="playground-label">Overlays</p>
          <h2 id="overlays-title">Overlay foundations</h2>
        </div>
      </div>

      <div className="control-stack">
        <Dialog>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogViewport>
              <DialogPopup>
                <DialogClose aria-label="Close dialog" />
                <DialogTitle>Publish registry item</DialogTitle>
                <DialogDescription>
                  Base UI owns focus trap, escape key, aria wiring, and modal
                  behavior. Neurex owns the tokenized surface.
                </DialogDescription>
                <div className="field-submit-row">
                  <DialogClose
                    render={<Button size="sm" variant="secondary" />}
                  >
                    Cancel
                  </DialogClose>
                  <Button size="sm">Continue</Button>
                </div>
              </DialogPopup>
            </DialogViewport>
          </DialogPortal>
        </Dialog>

        <Popover>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup>
                <PopoverArrow />
                <PopoverClose aria-label="Close popover" />
                <PopoverTitle>Theme intent</PopoverTitle>
                <PopoverDescription>
                  Popover keeps positioning, focus return, escape key, and
                  outside press behavior in Base UI while Neurex owns styling.
                </PopoverDescription>
                <div className="field-submit-row">
                  <Button size="sm" variant="secondary">
                    Neutral
                  </Button>
                  <Button size="sm">Apply</Button>
                </div>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>
    </section>
  )
}
