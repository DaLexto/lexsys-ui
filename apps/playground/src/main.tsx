import React from "react"
import ReactDOM from "react-dom/client"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neurex/ui"
import "./styles.css"

const buttonExamples = [
  {
    label: "Primary / sm",
    props: { children: "Create", size: "sm" as const },
  },
  {
    label: "Primary / md",
    props: { children: "Install button" },
  },
  {
    label: "Primary / lg loading",
    props: { children: "Generating", isLoading: true, size: "lg" as const },
  },
  {
    label: "Secondary",
    props: { children: "Preview", variant: "secondary" as const },
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
  return (
    <main className="playground-shell">
      <section className="playground-header">
        <p className="playground-label">Reference playground</p>
        <h1>Neurex Components</h1>
        <p>
          A committed Vite consumer for checking package exports, token CSS,
          Tailwind classes, and component states while the registry grows.
        </p>
      </section>

      <section className="component-grid" aria-label="Component examples">
        <div className="button-board">
          {buttonExamples.map((example) => (
            <article className="button-row" key={example.label}>
              <span>{example.label}</span>
              <Button {...example.props} />
            </article>
          ))}
        </div>

        <Card className="card-preview">
          <CardHeader>
            <CardTitle>Registry Card</CardTitle>
            <CardDescription>
              A passive layout component that validates slot exports, semantic
              color tokens, spacing tokens, and user-owned template structure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Card is intentionally low-risk: it adds composition surface without
            introducing popover, focus trap, or keyboard navigation behavior.
          </CardContent>
          <CardFooter>
            <Button size="sm">Install card</Button>
            <Button size="sm" variant="secondary">
              Preview
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
