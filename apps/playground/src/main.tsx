import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@dalexto/lexsys-ui"
import { BrandPanel } from "./brand-panel"
import { SizesPanel } from "./sizes-panel"
import { ActionsPanel } from "./actions-panel"
import { OverlaysPanel } from "./overlays-panel"
import { SurfacesPanel } from "./surfaces-panel"
import { InteractionsPanel } from "./interactions-panel"
import { LayoutPanel } from "./layout-panel"
import "./styles.css"

const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark")
  }, [themeMode])

  const panels = [
    { id: "brand", label: "Brand", render: () => <BrandPanel /> },
    { id: "sizes", label: "Sizes", render: () => <SizesPanel /> },
    { id: "actions", label: "Actions", render: () => <ActionsPanel /> },
    { id: "overlays", label: "Overlays", render: () => <OverlaysPanel /> },
    { id: "surfaces", label: "Surfaces", render: () => <SurfacesPanel /> },
    {
      id: "interactions",
      label: "Interactions",
      render: () => <InteractionsPanel />,
    },
    { id: "blocks", label: "Blocks", render: () => <LayoutPanel /> },
  ]

  return (
    <main className="playground-shell">
      <header className="playground-top">
        <section className="playground-header">
          <div>
            <p className="playground-label">Lexsys playground</p>
            <h1>Component smoke</h1>
            <p className="playground-subtitle">
              Monorepo reference — not the CLI install path
            </p>
          </div>
          <div className="playground-toolbar">
            <div className="theme-control" aria-label="Theme mode">
              <Button
                size="sm"
                variant={themeMode === "light" ? "primary" : "secondary"}
                onClick={() => setThemeMode("light")}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={themeMode === "dark" ? "primary" : "secondary"}
                onClick={() => setThemeMode("dark")}
              >
                Dark
              </Button>
            </div>
          </div>
        </section>
        <nav className="playground-nav" aria-label="Component categories">
          {panels.map(({ id, label }) => (
            <a
              key={id}
              className="playground-nav-link"
              href={`#category-${id}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="playground-categories">
        {panels.map(({ id, label, render }) => (
          <section
            key={id}
            id={`category-${id}`}
            className="playground-category"
            aria-labelledby={`${id}-title`}
          >
            <header className="category-header">
              <p className="playground-label">{label}</p>
              <h2 id={`${id}-title`}>{label}</h2>
            </header>
            {render()}
          </section>
        ))}
      </div>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
