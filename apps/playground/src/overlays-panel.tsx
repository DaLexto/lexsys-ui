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
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandleIndicator,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
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
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToastManager,
} from "@neurex/ui"

const ToastDemo = () => {
  const toastManager = useToastManager<{ source: "playground" }>()

  const showSuccessToast = () => {
    toastManager.add({
      title: "Registry synced",
      description:
        "Toast uses Base UI timers, focus behavior, and swipe state.",
      type: "success",
      data: { source: "playground" },
      actionProps: {
        children: "Undo",
        onClick: () => toastManager.close(),
      },
    })
  }

  const showDestructiveToast = () => {
    toastManager.add({
      title: "Build failed",
      description:
        "High-priority toasts announce urgently and keep styling tokenized.",
      type: "destructive",
      priority: "high",
      data: { source: "playground" },
      timeout: 0,
      actionProps: {
        children: "Dismiss",
        onClick: () => toastManager.close(),
      },
    })
  }

  return (
    <>
      <div className="field-submit-row">
        <Button size="sm" onClick={showSuccessToast}>
          Send toast
        </Button>
        <Button size="sm" variant="secondary" onClick={showDestructiveToast}>
          Sticky alert
        </Button>
      </div>

      <ToastPortal>
        <ToastViewport placement="bottom-right">
          {toastManager.toasts.map((toast) => (
            <Toast key={toast.id} toast={toast}>
              <ToastContent>
                <ToastTitle>{toast.title}</ToastTitle>
                <ToastDescription>{toast.description}</ToastDescription>
                <ToastAction />
              </ToastContent>
              <ToastClose aria-label="Close toast" />
            </Toast>
          ))}
        </ToastViewport>
      </ToastPortal>
    </>
  )
}

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

        <ToastProvider limit={4} timeout={5000}>
          <ToastDemo />
        </ToastProvider>

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
                    className="bg-(--nx-alert-dialog-trigger-background) text-(--nx-alert-dialog-trigger-foreground) hover:bg-(--nx-alert-dialog-trigger-hover-background)"
                  >
                    Delete
                  </Button>
                </div>
              </AlertDialogPopup>
            </AlertDialogViewport>
          </AlertDialogPortal>
        </AlertDialog>

        <Drawer snapPoints={["18rem", 1]} defaultSnapPoint="18rem">
          <DrawerTrigger>Open action sheet</DrawerTrigger>
          <DrawerSwipeArea side="bottom" swipeDirection="up" />
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side="bottom">
              <DrawerPopup side="bottom" size="md">
                <DrawerHandleIndicator />
                <DrawerClose aria-label="Close drawer" />
                <DrawerContent>
                  <DrawerTitle>Install component batch</DrawerTitle>
                  <DrawerDescription>
                    Review generated registry output before adding the next
                    component family. Drag the sheet to expand or dismiss it.
                  </DrawerDescription>
                  <div className="field-submit-row">
                    <DrawerClose
                      render={<Button size="sm" variant="secondary" />}
                    >
                      Cancel
                    </DrawerClose>
                    <Button size="sm">Install selected</Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>

        <DrawerProvider>
          <DrawerIndentBackground />
          <DrawerIndent className="rounded-(--nx-card-radius) border border-(--nx-card-border-color) bg-(--nx-card-background) p-(--nx-card-padding)">
            <Drawer swipeDirection="right">
              <DrawerTrigger>Open inspector</DrawerTrigger>
              <DrawerPortal>
                <DrawerBackdrop forceRender />
                <DrawerViewport side="right">
                  <DrawerPopup side="right" size="md">
                    <DrawerClose aria-label="Close drawer" />
                    <DrawerContent>
                      <DrawerTitle>Component inspector</DrawerTitle>
                      <DrawerDescription>
                        Side drawers are useful for editing metadata without
                        leaving the current registry workflow.
                      </DrawerDescription>
                      <div className="control-stack">
                        <Button size="sm">Save changes</Button>
                        <DrawerClose
                          render={<Button size="sm" variant="secondary" />}
                        >
                          Close
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </DrawerPopup>
                </DrawerViewport>
              </DrawerPortal>
            </Drawer>
          </DrawerIndent>
        </DrawerProvider>

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
