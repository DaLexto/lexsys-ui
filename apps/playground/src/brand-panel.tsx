import { Badge, Button } from "@dalexto/lexsys-ui"
import { brandSwatches, semanticColorExamples } from "./examples"

export const BrandPanel = () => {
  return (
    <section className="component-panel" aria-labelledby="brand-title">
      <div className="panel-header">
        <div>
          <p className="playground-label">Brand</p>
          <h2 id="brand-title">Orange primary and space indigo accent</h2>
        </div>
      </div>

      <div className="brand-swatch-grid">
        {brandSwatches.map((swatch) => (
          <article className="brand-swatch" key={swatch.token}>
            <div
              className="brand-swatch-chip"
              style={{ backgroundColor: `var(${swatch.token})` }}
              aria-hidden="true"
            />
            <div className="brand-swatch-copy">
              <strong>{swatch.label}</strong>
              <code>{swatch.token}</code>
            </div>
          </article>
        ))}
      </div>

      <div className="brand-semantic-board">
        {semanticColorExamples.map((example) => (
          <article className="brand-semantic-row" key={example.label}>
            <span>{example.label}</span>
            <div className={example.className}>{example.content}</div>
          </article>
        ))}
      </div>

      <div className="brand-badge-row">
        <Badge variant="primary">Primary badge</Badge>
        <Badge variant="primary" appearance="outline">
          Primary outline
        </Badge>
        <Badge
          appearance="outline"
          className="border-(--lsys-border-accent) text-(--lsys-color-text-accent)"
        >
          Accent outline
        </Badge>
      </div>

      <article className="brand-escape-hatch">
        <p className="playground-label">Escape hatch</p>
        <p className="brand-escape-copy">
          Tailwind overrides stay possible, but they are isolated from the token
          contract below.
        </p>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          Tailwind override
        </Button>
      </article>
    </section>
  )
}
