import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
  Input,
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
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@neurex/ui"
import { buttonExamples, inputExamples } from "./examples"
import "./styles.css"

const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
  const [inputValue, setInputValue] = useState("Neurex Input")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark")
  }, [themeMode])

  return (
    <main className="playground-shell">
      <section className="playground-header">
        <div>
          <p className="playground-label">Neurex Default</p>
          <h1>Component QA</h1>
        </div>

        <div className="theme-control" aria-label="Theme mode">
          <Button
            size="sm"
            variant={themeMode === "light" ? "primary" : "secondary"}
            onClick={() => {
              setThemeMode("light")
            }}
          >
            Light
          </Button>
          <Button
            size="sm"
            variant={themeMode === "dark" ? "primary" : "secondary"}
            onClick={() => {
              setThemeMode("dark")
            }}
          >
            Dark
          </Button>
        </div>
      </section>

      <section className="component-grid" aria-label="Component examples">
        <section className="component-panel" aria-labelledby="button-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Button</p>
              <h2 id="button-title">Variants and states</h2>
            </div>
          </div>

          <div className="button-board">
            {buttonExamples.map((example) => (
              <article className="button-row" key={example.label}>
                <span>{example.label}</span>
                <Button {...example.props} />
              </article>
            ))}
          </div>
        </section>

        <section className="component-panel" aria-labelledby="input-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Input</p>
              <h2 id="input-title">Sizes and states</h2>
            </div>
          </div>

          <div className="input-board">
            {inputExamples.map((example) => (
              <article className="input-row" key={example.label}>
                <span>{example.label}</span>
                <Input {...example.props} />
              </article>
            ))}
          </div>

          <div className="input-example-grid">
            <article className="input-example">
              <label htmlFor="controlled-input">Controlled</label>
              <Input
                id="controlled-input"
                value={inputValue}
                onValueChange={setInputValue}
                placeholder="Type a value"
              />
              <p>{inputValue || "Empty value"}</p>
            </article>

            <article className="input-example">
              <label htmlFor="state-input">State className</label>
              <Input
                id="state-input"
                defaultValue="Focus or edit me"
                className={(state: { dirty?: boolean; focused?: boolean }) =>
                  state.focused
                    ? "border-green-600 ring-green-600/20"
                    : state.dirty
                      ? "border-blue-600"
                      : undefined
                }
              />
              <p>Focus and dirty state flow through Base UI.</p>
            </article>

            <article className="input-example">
              <label htmlFor="render-input">Render prop</label>
              <Input
                id="render-input"
                defaultValue="Custom render element"
                render={<input data-render-mode="custom" />}
                className="font-mono"
              />
              <p>Neurex classes merge into Base UI render output.</p>
            </article>
          </div>
        </section>

        <section className="component-panel" aria-labelledby="field-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Field</p>
              <h2 id="field-title">Labeling and validation</h2>
            </div>
          </div>

          <div className="field-board">
            <Field
              name="workspace"
              validationMode="onChange"
              validate={(value) => {
                return typeof value === "string" && value.trim().length >= 3
                  ? null
                  : "Use at least 3 characters."
              }}
            >
              <FieldLabel>Workspace name</FieldLabel>
              <FieldControl required defaultValue="Neurex" />
              <FieldDescription>
                Shown in generated project metadata.
              </FieldDescription>
              <FieldError match="valueMissing">
                Workspace name is required.
              </FieldError>
              <FieldError match="customError">
                Use at least 3 characters.
              </FieldError>
            </Field>

            <Field name="email" invalid touched>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" defaultValue="broken-email" />
              <FieldDescription>
                Use a reachable account address.
              </FieldDescription>
              <FieldError match>Enter a valid email address.</FieldError>
              <FieldValidity>
                {(state: { validity: { valid: boolean | null } }) => (
                  <p className="field-validity-note">
                    {state.validity.valid === false ? "Invalid" : "Ready"}
                  </p>
                )}
              </FieldValidity>
            </Field>

            <Field name="updates">
              <FieldItem>
                <Checkbox defaultChecked>Product updates</Checkbox>
                <FieldDescription>
                  Receive release notes for new registry items.
                </FieldDescription>
              </FieldItem>
            </Field>
          </div>
        </section>

        <section className="component-panel" aria-labelledby="card-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Card</p>
              <h2 id="card-title">Surface variants</h2>
            </div>
          </div>

          <div className="card-board">
            <Card>
              <CardHeader>
                <CardTitle>Surface Card</CardTitle>
                <CardDescription>
                  Token-driven background, border, radius, and spacing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                This card uses the default surface mapping from the active
                theme.
              </CardContent>
              <CardFooter>
                <Button size="sm">Install card</Button>
                <Button size="sm" variant="secondary">
                  Preview
                </Button>
              </CardFooter>
            </Card>

            <Card variant="muted">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
                <CardDescription>
                  The same structure with a quieter surface treatment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                This checks that Card variants still compose with semantic theme
                tokens.
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="component-panel" aria-labelledby="badge-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Badge</p>
              <h2 id="badge-title">Tone and variant matrix</h2>
            </div>
          </div>

          <div className="badge-board">
            <Badge size="sm">Neutral sm</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="destructive">Destructive</Badge>
            <Badge variant="outline">Neutral outline</Badge>
            <Badge tone="primary" variant="outline">
              Primary outline
            </Badge>
            <Badge
              tone="primary"
              className="border-green-600 bg-green-600 text-white"
            >
              Tailwind override
            </Badge>
          </div>
        </section>

        <section className="component-panel" aria-labelledby="alert-title">
          <div className="panel-header">
            <div>
              <p className="playground-label">Alert</p>
              <h2 id="alert-title">Feedback tones</h2>
            </div>
          </div>

          <div className="alert-board">
            <Alert>
              <AlertTitle>Neutral alert</AlertTitle>
              <AlertDescription>
                A calm system message using surface and border tokens.
              </AlertDescription>
            </Alert>
            <Alert tone="primary">
              <AlertTitle>Primary alert</AlertTitle>
              <AlertDescription>
                A highlighted message mapped through primary semantic tokens.
              </AlertDescription>
            </Alert>
            <Alert tone="destructive">
              <AlertTitle>Destructive alert</AlertTitle>
              <AlertDescription>
                A critical message using destructive semantic token mapping.
              </AlertDescription>
            </Alert>
          </div>
        </section>

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
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
