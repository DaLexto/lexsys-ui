import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Checkbox,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Meter,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Toggle,
  ToggleGroup,
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@neurex/ui"

export const InteractionsPanel = () => {
  return (
    <section className="component-panel" aria-labelledby="base-ui-title">
      <div className="panel-header">
        <div>
          <p className="playground-label">Base UI behavior</p>
          <h2 id="base-ui-title">Interaction primitives</h2>
        </div>
      </div>

      <div className="interaction-board">
        <article className="interaction-section">
          <h3>Form controls</h3>
          <div className="control-stack">
            <Checkbox defaultChecked size="lg">
              Accept terms
            </Checkbox>
            <Switch defaultChecked size="lg" aria-label="Enable sync" />
            <Toggle defaultPressed size="sm">
              Pressed toggle
            </Toggle>
            <ToggleGroup
              defaultValue={["preview"]}
              aria-label="Preview density"
            >
              <Toggle size="sm" value="code">
                Code
              </Toggle>
              <Toggle size="sm" value="preview">
                Preview
              </Toggle>
              <Toggle size="sm" value="docs">
                Docs
              </Toggle>
            </ToggleGroup>
          </div>
        </article>

        <article className="interaction-section">
          <h3>Radio group</h3>
          <RadioGroup defaultValue="tokens" aria-label="System layer">
            <RadioGroupItem size="sm" value="tokens">
              Tokens
            </RadioGroupItem>
            <RadioGroupItem value="themes">Themes</RadioGroupItem>
            <RadioGroupItem size="lg" value="registry">
              Registry
            </RadioGroupItem>
          </RadioGroup>
        </article>

        <article className="interaction-section">
          <h3>Progress and slider</h3>
          <div className="control-stack">
            <Progress size="lg" value={64} label="Build confidence" />
            <Meter size="md" value={82} label="Registry coverage" showValue />
            <Slider defaultValue={42} aria-label="Density" />
          </div>
        </article>

        <article className="interaction-section">
          <h3>Tabs</h3>
          <Tabs defaultValue="api">
            <TabsList>
              <TabsTab value="api">API</TabsTab>
              <TabsTab value="style">Style</TabsTab>
            </TabsList>
            <TabsPanel value="api">
              Base UI owns keyboard and selection behavior.
            </TabsPanel>
            <TabsPanel value="style">
              Neurex owns tokens, variants, and Tailwind classes.
            </TabsPanel>
          </Tabs>
        </article>

        <article className="interaction-section">
          <h3>Accordion</h3>
          <Accordion defaultValue={["one"]} multiple>
            <AccordionItem value="one">
              <AccordionHeader>
                <AccordionTrigger>Behavior layer</AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                Base UI handles state, focus, keyboard, and ARIA.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="two">
              <AccordionHeader>
                <AccordionTrigger>Design layer</AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>
                Neurex keeps the visual contract token-driven.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </article>

        <article className="interaction-section">
          <h3>Collapsible</h3>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Registry install contract</CollapsibleTrigger>
            <CollapsiblePanel>
              New component templates sync from UI source, while registry item
              metadata defines install dependencies and target paths.
            </CollapsiblePanel>
          </Collapsible>
        </article>

        <article className="interaction-section">
          <h3>Tooltip and separator</h3>
          <div className="control-stack">
            <Tooltip>
              <TooltipTrigger className="tooltip-demo-trigger">
                Hover or focus
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipPositioner side="top">
                  <TooltipPopup>
                    Neurex tooltip, Base UI positioning.
                    <TooltipArrow />
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
            <Separator />
            <div className="separator-demo">
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Right</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
