import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@dalexto/lexsys-ui"

const scrollAreaLines = [
  "Primitives hold raw values only.",
  "Brand tokens map palette decisions.",
  "Semantics express usage intent.",
  "Component tokens reference semantics.",
  "Themes override semantics per mode.",
  "CSS is generated, never handwritten.",
  "Registry metadata drives CLI installs.",
  "Installed components become user-owned code.",
  "ScrollArea uses Base UI scroll primitives.",
  "Thumb and track colors come from scroll-area tokens.",
] as const

const scrollAreaColumns = [
  "Layer",
  "Package",
  "Responsibility",
  "Output",
] as const

const scrollAreaRows = [
  ["Primitives", "tokens", "Raw scales", "TS + CSS vars"],
  ["Brand", "tokens", "Palette", "Semantic refs"],
  ["Components", "ui", "Reference React", "Registry templates"],
  ["Registry", "registry", "Install metadata", "CLI copies"],
  ["CLI", "cli", "Project installer", "User-owned files"],
  ["Playground", "apps", "Visual verification", "Local preview"],
] as const

const viewportTokens = [
  { label: "Mobile (sm)", token: "--lex-layout-viewport-sm" },
  { label: "Tablet (md)", token: "--lex-layout-viewport-md" },
  { label: "Desktop (lg)", token: "--lex-layout-viewport-lg" },
  { label: "Wide (xl)", token: "--lex-layout-viewport-xl" },
  { label: "Ultrawide (2xl)", token: "--lex-layout-viewport-2xl" },
] as const

const aspectRatioTokens = [
  { label: "Square", token: "--lex-layout-aspect-ratio-square" },
  { label: "Standard", token: "--lex-layout-aspect-ratio-standard" },
  { label: "Photo", token: "--lex-layout-aspect-ratio-photo" },
  { label: "Portrait", token: "--lex-layout-aspect-ratio-portrait" },
  { label: "Video", token: "--lex-layout-aspect-ratio-video" },
  { label: "Ultrawide", token: "--lex-layout-aspect-ratio-ultrawide" },
] as const

export const LayoutPanel = () => {
  return (
    <section className="component-panel" aria-labelledby="layout-title">
      <div className="panel-header">
        <div>
          <p className="playground-label">Layout</p>
          <h2 id="layout-title">Viewport and aspect ratio tokens</h2>
        </div>
      </div>

      <div className="layout-viewport-board">
        {viewportTokens.map((entry) => (
          <article className="layout-viewport-row" key={entry.token}>
            <span>{entry.label}</span>
            <code>{entry.token}</code>
          </article>
        ))}
      </div>

      <div className="layout-ratio-grid">
        {aspectRatioTokens.map((entry) => (
          <article className="layout-ratio-card" key={entry.token}>
            <div
              className="layout-ratio-chip"
              style={{ aspectRatio: `var(${entry.token})` }}
              aria-hidden="true"
            />
            <div className="layout-ratio-copy">
              <strong>{entry.label}</strong>
              <code>{entry.token}</code>
            </div>
          </article>
        ))}
      </div>

      <div className="layout-scroll-area-board">
        <article className="layout-scroll-area-demo">
          <h3>Vertical overflow</h3>
          <ScrollArea className="scroll-area-demo scroll-area-demo-vertical">
            <ScrollAreaViewport>
              <ScrollAreaContent>
                <ul className="scroll-area-demo-list">
                  {scrollAreaLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </article>

        <article className="layout-scroll-area-demo">
          <h3>Horizontal and vertical</h3>
          <ScrollArea className="scroll-area-demo scroll-area-demo-both">
            <ScrollAreaViewport>
              <ScrollAreaContent>
                <table className="scroll-area-demo-table">
                  <thead>
                    <tr>
                      {scrollAreaColumns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scrollAreaRows.map((row) => (
                      <tr key={row.join("-")}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </article>
      </div>
    </section>
  )
}
