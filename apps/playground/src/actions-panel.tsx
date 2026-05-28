import { useState } from "react"
import { Button, Input } from "@dalexto/lexsys-ui"
import { buttonExamples, inputExamples } from "./examples"

export const ActionsPanel = () => {
  const [inputValue, setInputValue] = useState("Lexsys Input")

  return (
    <>
      <section className="component-panel" aria-labelledby="button-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Button</p>
            <h2 id="button-title">Variants and states</h2>
          </div>
        </div>

        <div className="button-board">
          {buttonExamples.map((example) => (
            <article className="button-row" key={example.label}>
              <span>{example.label}</span>
              <Button {...example.props} />
            </article>
          ))}
        </div>
      </section>

      <section className="component-panel" aria-labelledby="input-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Input</p>
            <h2 id="input-title">Sizes and states</h2>
          </div>
        </div>

        <div className="input-board">
          {inputExamples.map((example) => (
            <article className="input-row" key={example.label}>
              <span>{example.label}</span>
              <Input {...example.props} />
            </article>
          ))}
        </div>

        <div className="input-example-grid">
          <article className="input-example">
            <label htmlFor="controlled-input">Controlled</label>
            <Input
              id="controlled-input"
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Type a value"
            />
            <p>{inputValue || "Empty value"}</p>
          </article>

          <article className="input-example">
            <label htmlFor="state-input">State className</label>
            <Input
              id="state-input"
              defaultValue="Focus or edit me"
              className={(state: { dirty?: boolean; focused?: boolean }) =>
                state.focused
                  ? "border-(--lex-input-focus-border-color) ring-(length:--lex-input-focus-ring-width) ring-(--lex-input-focus-ring-color) ring-offset-(length:--lex-input-focus-ring-offset) ring-offset-(--lex-input-focus-ring-offset-color)"
                  : state.dirty
                    ? "border-(--lex-brand-color-accent-base)"
                    : undefined
              }
            />
            <p>Focus and dirty state flow through Base UI.</p>
          </article>

          <article className="input-example">
            <label htmlFor="render-input">Render prop</label>
            <Input
              id="render-input"
              defaultValue="Custom render element"
              render={<input data-render-mode="custom" />}
              className="font-mono"
            />
            <p>Lexsys classes merge into Base UI render output.</p>
          </article>
        </div>
      </section>
    </>
  )
}
