import React from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@neurex/ui"
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
        <h1>Neurex Button</h1>
        <p>
          A committed Vite consumer for checking package exports, token CSS,
          Tailwind classes, and component states while the registry grows.
        </p>
      </section>

      <section className="button-board" aria-label="Button examples">
        {buttonExamples.map((example) => (
          <article className="button-row" key={example.label}>
            <span>{example.label}</span>
            <Button {...example.props} />
          </article>
        ))}
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
