import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@neurex/ui"
import { BrandPanel } from "./brand-panel"
import { ActionsPanel } from "./actions-panel"
import { FormsPanel } from "./forms-panel"
import { InteractionsPanel } from "./interactions-panel"
import { OverlaysPanel } from "./overlays-panel"
import { SurfacesPanel } from "./surfaces-panel"
import "./styles.css"

const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
  const [submittedFormValues, setSubmittedFormValues] =
    useState("Not submitted")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark")
  }, [themeMode])

  return (
    <main className="playground-shell">
      <section className="playground-header">
        <div>
          <p className="playground-label">Neurex Default</p>
          <h1>Design system preview</h1>
        </div>

        <div className="playground-toolbar">
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

          <div className="style-control" aria-label="Style preset">
            <Button size="sm">Default</Button>
            <Button size="sm" variant="secondary" disabled>
              Graphite
            </Button>
            <Button size="sm" variant="secondary" disabled>
              Solar
            </Button>
          </div>
        </div>
      </section>

      <section className="component-grid" aria-label="Component examples">
        <BrandPanel />
        <ActionsPanel />

        <FormsPanel
          submittedFormValues={submittedFormValues}
          onSubmittedFormValuesChange={setSubmittedFormValues}
        />

        <OverlaysPanel />
        <SurfacesPanel />
        <InteractionsPanel />
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
