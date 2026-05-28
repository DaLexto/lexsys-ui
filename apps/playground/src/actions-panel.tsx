import { Button, Toggle, ToggleGroup } from "@dalexto/lexsys-ui"

const buttonVariants = [
  "primary",
  "secondary",
  "ghost",
  "outline",
  "danger",
] as const

const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const

export const ActionsPanel = () => {
  return (
    <>
      <section className="component-panel" aria-labelledby="button-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Button</p>
            <h2 id="button-title">Variants × sizes matrix</h2>
          </div>
        </div>

        <div className="btn-matrix">
          <div className="btn-matrix-head">
            <div />
            {buttonSizes.map((s) => (
              <div key={s}>
                <code>{s}</code>
              </div>
            ))}
          </div>

          {buttonVariants.map((v) => (
            <div className="btn-matrix-row" key={v}>
              <code className="btn-matrix-label">{v}</code>
              {buttonSizes.map((s) => (
                <div key={s} className="btn-matrix-cell">
                  <Button variant={v} size={s}>
                    Action
                  </Button>
                </div>
              ))}
            </div>
          ))}

          <div className="btn-matrix-row">
            <code className="btn-matrix-label">loading</code>
            {buttonSizes.map((s) => (
              <div key={s} className="btn-matrix-cell">
                <Button size={s} isLoading>
                  Loading
                </Button>
              </div>
            ))}
          </div>

          <div className="btn-matrix-row">
            <code className="btn-matrix-label">disabled</code>
            {buttonSizes.map((s) => (
              <div key={s} className="btn-matrix-cell">
                <Button size={s} disabled>
                  Disabled
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="component-panel" aria-labelledby="toggle-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Toggle / ToggleGroup</p>
            <h2 id="toggle-title">Toggle and ToggleGroup sizes</h2>
          </div>
        </div>

        <div className="control-stack">
          <div className="sizes-control-row">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="sizes-control-item">
                <Toggle size={size} defaultPressed={size === "md"}>
                  Toggle {size}
                </Toggle>
                <code className="sizes-scale-label">{size}</code>
              </div>
            ))}
          </div>

          <div className="control-stack">
            {(["sm", "md", "lg"] as const).map((size) => (
              <ToggleGroup
                key={size}
                defaultValue={["preview"]}
                aria-label={`View mode ${size}`}
              >
                <Toggle size={size} value="code">
                  Code
                </Toggle>
                <Toggle size={size} value="preview">
                  Preview
                </Toggle>
                <Toggle size={size} value="docs">
                  Docs
                </Toggle>
              </ToggleGroup>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
