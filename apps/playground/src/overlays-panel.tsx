import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
  MenuViewport,
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
            <DialogBackdrop />
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

        <AlertDialog>
          <AlertDialogTrigger>Delete item</AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogViewport>
              <AlertDialogPopup>
                <AlertDialogClose aria-label="Close alert dialog" />
                <AlertDialogTitle>Delete registry item?</AlertDialogTitle>
                <AlertDialogDescription>
                  AlertDialog keeps the confirmation flow modal and prevents
                  casual outside-click dismissal while Neurex owns the
                  destructive visual intent.
                </AlertDialogDescription>
                <div className="field-submit-row">
                  <AlertDialogClose
                    render={<Button size="sm" variant="secondary" />}
                  >
                    Cancel
                  </AlertDialogClose>
                  <Button
                    size="sm"
                    className="bg-[var(--nx-alert-dialog-trigger-background)] text-[var(--nx-alert-dialog-trigger-foreground)] hover:bg-[var(--nx-alert-dialog-trigger-hover-background)]"
                  >
                    Delete
                  </Button>
                </div>
              </AlertDialogPopup>
            </AlertDialogViewport>
          </AlertDialogPortal>
        </AlertDialog>

        <Menu>
          <MenuTrigger>Open menu</MenuTrigger>
          <MenuPortal>
            <MenuPositioner sideOffset={8}>
              <MenuPopup>
                <MenuArrow />
                <MenuViewport>
                  <MenuGroup>
                    <MenuGroupLabel>Registry</MenuGroupLabel>
                    <MenuItem>Add component</MenuItem>
                    <MenuLinkItem href="#overlays-title">
                      View overlay docs
                    </MenuLinkItem>
                  </MenuGroup>

                  <MenuSeparator />

                  <MenuGroup>
                    <MenuGroupLabel>Preferences</MenuGroupLabel>
                    <MenuCheckboxItem defaultChecked>
                      <MenuCheckboxItemIndicator />
                      Install styles
                    </MenuCheckboxItem>
                    <MenuCheckboxItem>
                      <MenuCheckboxItemIndicator />
                      Dry run
                    </MenuCheckboxItem>
                  </MenuGroup>

                  <MenuSeparator />

                  <MenuGroup>
                    <MenuGroupLabel>Scaffold</MenuGroupLabel>
                    <MenuRadioGroup defaultValue="vite">
                      <MenuRadioItem value="vite">
                        <MenuRadioItemIndicator />
                        Vite
                      </MenuRadioItem>
                      <MenuRadioItem value="next">
                        <MenuRadioItemIndicator />
                        Next.js
                      </MenuRadioItem>
                    </MenuRadioGroup>
                  </MenuGroup>

                  <MenuSeparator />

                  <MenuSubmenuRoot>
                    <MenuSubmenuTrigger>More actions</MenuSubmenuTrigger>
                    <MenuPortal>
                      <MenuPositioner sideOffset={8}>
                        <MenuPopup>
                          <MenuViewport>
                            <MenuItem>Validate registry</MenuItem>
                            <MenuItem>Sync templates</MenuItem>
                          </MenuViewport>
                        </MenuPopup>
                      </MenuPositioner>
                    </MenuPortal>
                  </MenuSubmenuRoot>
                </MenuViewport>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </div>
    </section>
  )
}
