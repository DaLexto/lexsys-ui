import { Button, Input } from "@dalexto/lexsys-ui"

const fontSizes = [
  { key: "xs", value: "0.75rem" },
  { key: "sm", value: "0.875rem" },
  { key: "base", value: "1rem" },
  { key: "lg", value: "1.125rem" },
  { key: "xl", value: "1.25rem" },
  { key: "2xl", value: "1.5rem" },
  { key: "3xl", value: "1.875rem" },
  { key: "4xl", value: "2.25rem" },
  { key: "5xl", value: "3rem" },
  { key: "6xl", value: "3.75rem" },
] as const

const radii = [
  { key: "none", label: "none — 0" },
  { key: "sm", label: "sm — 0.25rem" },
  { key: "md", label: "md — 0.375rem" },
  { key: "lg", label: "lg — 0.5rem" },
  { key: "xl", label: "xl — 0.75rem" },
  { key: "2xl", label: "2xl — 1rem" },
  { key: "full", label: "full" },
] as const

const semanticRadii = [
  { key: "control", label: "control (→ md)" },
  { key: "selection", label: "selection (→ sm)" },
  { key: "surface", label: "surface (→ lg)" },
  { key: "pill", label: "pill (→ full)" },
] as const

const spacings = [
  { key: "1", value: "0.25rem" },
  { key: "2", value: "0.5rem" },
  { key: "3", value: "0.75rem" },
  { key: "4", value: "1rem" },
  { key: "6", value: "1.5rem" },
  { key: "8", value: "2rem" },
  { key: "10", value: "2.5rem" },
  { key: "12", value: "3rem" },
  { key: "16", value: "4rem" },
] as const

const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const
const inputSizes = ["sm", "md", "lg"] as const

const shadows = [
  { key: "floating", label: "floating" },
  { key: "raised", label: "raised" },
] as const

export const SizesPanel = () => {
  return (
    <>
      <section className="component-panel" aria-labelledby="sizes-type-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Typography</p>
            <h2 id="sizes-type-title">Font size scale</h2>
          </div>
        </div>
        <div className="sizes-type-stack">
          {fontSizes.map(({ key, value }) => (
            <div key={key} className="sizes-type-row">
              <code className="sizes-scale-label">
                {key} — {value}
              </code>
              <p
                style={{
                  fontSize: `var(--lex-font-size-${key})`,
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="component-panel"
        aria-labelledby="sizes-control-title"
      >
        <div className="panel-header">
          <div>
            <p className="playground-label">Controls</p>
            <h2 id="sizes-control-title">Button and Input sizes</h2>
          </div>
        </div>
        <div className="sizes-control-row">
          {buttonSizes.map((size) => (
            <div key={size} className="sizes-control-item">
              <Button size={size} variant="secondary">
                Button
              </Button>
              <code className="sizes-scale-label">{size}</code>
            </div>
          ))}
        </div>
        <div className="sizes-control-row">
          {inputSizes.map((size) => (
            <div key={size} className="sizes-control-item sizes-control-item--wide">
              <Input size={size} defaultValue={`Input ${size}`} readOnly />
              <code className="sizes-scale-label">{size}</code>
            </div>
          ))}
        </div>
      </section>

      <section
        className="component-panel"
        aria-labelledby="sizes-radius-title"
      >
        <div className="panel-header">
          <div>
            <p className="playground-label">Border radius</p>
            <h2 id="sizes-radius-title">Primitive and semantic radius scale</h2>
          </div>
        </div>
        <div className="sizes-swatch-row">
          {radii.map(({ key, label }) => (
            <div key={key} className="sizes-radius-item">
              <div
                className="sizes-radius-box"
                style={{ borderRadius: `var(--lex-radius-${key})` }}
              />
              <code className="sizes-scale-label">{label}</code>
            </div>
          ))}
        </div>
        <div className="sizes-swatch-row" style={{ marginTop: "8px" }}>
          {semanticRadii.map(({ key, label }) => (
            <div key={key} className="sizes-radius-item">
              <div
                className="sizes-radius-box sizes-radius-box--semantic"
                style={{ borderRadius: `var(--lex-radius-${key})` }}
              />
              <code className="sizes-scale-label">{label}</code>
            </div>
          ))}
        </div>
      </section>

      <section
        className="component-panel"
        aria-labelledby="sizes-spacing-title"
      >
        <div className="panel-header">
          <div>
            <p className="playground-label">Spacing</p>
            <h2 id="sizes-spacing-title">Spacing scale</h2>
          </div>
        </div>
        <div className="sizes-spacing-stack">
          {spacings.map(({ key, value }) => (
            <div key={key} className="sizes-spacing-row">
              <code className="sizes-scale-label sizes-scale-label--fixed">
                {key} — {value}
              </code>
              <div className="sizes-spacing-track">
                <div
                  className="sizes-spacing-bar"
                  style={{ height: `var(--lex-spacing-${key})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="component-panel"
        aria-labelledby="sizes-shadow-title"
      >
        <div className="panel-header">
          <div>
            <p className="playground-label">Elevation</p>
            <h2 id="sizes-shadow-title">Shadow levels</h2>
          </div>
        </div>
        <div className="sizes-swatch-row">
          {shadows.map(({ key, label }) => (
            <div key={key} className="sizes-shadow-item">
              <div
                className="sizes-shadow-box"
                style={{
                  boxShadow: `var(--lex-elevation-shadow-${key}-box-shadow)`,
                }}
              />
              <code className="sizes-scale-label">{label}</code>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
