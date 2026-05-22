const viewportTokens = [
  { label: "Mobile (sm)", token: "--nx-layout-viewport-sm" },
  { label: "Tablet (md)", token: "--nx-layout-viewport-md" },
  { label: "Desktop (lg)", token: "--nx-layout-viewport-lg" },
  { label: "Wide (xl)", token: "--nx-layout-viewport-xl" },
  { label: "Ultrawide (2xl)", token: "--nx-layout-viewport-2xl" },
] as const

const aspectRatioTokens = [
  { label: "Square", token: "--nx-layout-aspect-ratio-square" },
  { label: "Standard", token: "--nx-layout-aspect-ratio-standard" },
  { label: "Photo", token: "--nx-layout-aspect-ratio-photo" },
  { label: "Portrait", token: "--nx-layout-aspect-ratio-portrait" },
  { label: "Video", token: "--nx-layout-aspect-ratio-video" },
  { label: "Ultrawide", token: "--nx-layout-aspect-ratio-ultrawide" },
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
    </section>
  )
}
