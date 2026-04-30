import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import {
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
} from "@neurex/ui"
import "./styles.css"

const buttonExamples: Array<{
  label: string
  props: React.ComponentProps<typeof Button>
}> = [
  {
    label: "Primary sm",
    props: { children: "Create", size: "sm" },
  },
  {
    label: "Primary md",
    props: { children: "Install button" },
  },
  {
    label: "Primary lg loading",
    props: { children: "Generating", isLoading: true, size: "lg" },
  },
  {
    label: "Secondary",
    props: { children: "Preview", variant: "secondary" },
  },
  {
    label: "Custom class",
    props: {
      children: "Tailwind override",
      className: "bg-green-600 text-white hover:bg-green-700",
    },
  },
  {
    label: "Disabled",
    props: {
      children: "Unavailable",
      disabled: true,
      variant: "secondary" as const,
    },
  },
]

const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")

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
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
