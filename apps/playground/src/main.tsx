import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@dalexto/lexsys-ui"
import { BrandPanel } from "./brand-panel"
import { SizesPanel } from "./sizes-panel"
import { ActionsPanel } from "./actions-panel"
import { FormsPanel } from "./forms-panel"
import { OverlaysPanel } from "./overlays-panel"
import { SurfacesPanel } from "./surfaces-panel"
import { InteractionsPanel } from "./interactions-panel"
import { BlocksPanel } from "./blocks-panel"
import "./styles.css"

type CategoryEntry = {
  id: string
  label: string
  render: () => React.ReactNode
}

const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark")
  }, [themeMode])

  const categories: CategoryEntry[] = [
    { id: "category-brand", label: "Brand", render: () => <BrandPanel /> },
    { id: "category-sizes", label: "Sizes", render: () => <SizesPanel /> },
    {
      id: "category-actions",
      label: "Actions",
      render: () => <ActionsPanel />,
    },
    { id: "category-forms", label: "Forms", render: () => <FormsPanel /> },
    {
      id: "category-overlays",
      label: "Overlays",
      render: () => <OverlaysPanel />,
    },
    {
      id: "category-surfaces",
      label: "Surfaces",
      render: () => <SurfacesPanel />,
    },
    {
      id: "category-interactions",
      label: "Interactions",
      render: () => <InteractionsPanel />,
    },
    {
      id: "category-blocks",
      label: "Blocks",
      render: () => <BlocksPanel />,
    },
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
          {categories.map(({ id, label }) => (
            <a key={id} className="playground-nav-link" href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="playground-categories">
        {categories.map(({ id, label, render }) => (
          <section
            key={id}
            id={id}
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
