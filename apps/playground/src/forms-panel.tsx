import {
  Button,
  Checkbox,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
  Fieldset,
  FieldsetLegend,
  Form,
  Input,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  Select,
  SelectArrow,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@neurex/ui"

interface FormsPanelProps {
  submittedFormValues: string
  onSubmittedFormValuesChange: (value: string) => void
}

export const FormsPanel = ({
  submittedFormValues,
  onSubmittedFormValuesChange,
}: FormsPanelProps) => {
  return (
    <section className="component-panel" aria-labelledby="field-title">
      <div className="panel-header">
        <div>
          <p className="playground-label">Field</p>
          <h2 id="field-title">Labeling and validation</h2>
        </div>
      </div>

      <Form
        className="field-board"
        validationMode="onChange"
        onFormSubmit={(formValues) => {
          onSubmittedFormValuesChange(JSON.stringify(formValues, null, 2))
        }}
      >
        <Field
          name="workspace"
          validate={(value) => {
            return typeof value === "string" && value.trim().length >= 3
              ? null
              : "Use at least 3 characters."
          }}
        >
          <FieldLabel>Workspace name</FieldLabel>
          <FieldControl required defaultValue="Neurex" />
          <FieldDescription>
            Shown in generated project metadata.
          </FieldDescription>
          <FieldError match="valueMissing">
            Workspace name is required.
          </FieldError>
          <FieldError match="customError">
            Use at least 3 characters.
          </FieldError>
        </Field>

        <Field
          name="notes"
          validate={(value) => {
            return typeof value === "string" && value.trim().length >= 10
              ? null
              : "Use at least 10 characters."
          }}
        >
          <FieldLabel>Project notes</FieldLabel>
          <Textarea rows={4} placeholder="Describe the setup" />
          <FieldDescription>
            Multi-line field control rendered through Base UI Field.
          </FieldDescription>
          <FieldError match="customError">
            Use at least 10 characters.
          </FieldError>
        </Field>

        <Field name="theme-preset">
          <FieldLabel>Theme preset</FieldLabel>

          <Select name="theme-preset" defaultValue="default">
            <SelectTrigger size="md" aria-label="Theme preset">
              <SelectValue placeholder="Choose a theme preset" />
              <SelectIcon />
            </SelectTrigger>

            <SelectPortal>
              <SelectPositioner sideOffset={8} alignItemWithTrigger={false}>
                <SelectPopup>
                  <SelectArrow />

                  <SelectScrollUpArrow />

                  <SelectList>
                    <SelectGroup>
                      <SelectGroupLabel>Official presets</SelectGroupLabel>

                      <SelectItem value="default">
                        <SelectItemIndicator />
                        <SelectItemText>Neurex Default</SelectItemText>
                      </SelectItem>

                      <SelectItem value="graphite">
                        <SelectItemIndicator />
                        <SelectItemText>Graphite</SelectItemText>
                      </SelectItem>

                      <SelectItem value="midnight">
                        <SelectItemIndicator />
                        <SelectItemText>Midnight</SelectItemText>
                      </SelectItem>

                      <SelectItem value="solar" disabled>
                        <SelectItemIndicator />
                        <SelectItemText>Solar — coming soon</SelectItemText>
                      </SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectGroupLabel>Experimental presets</SelectGroupLabel>

                      <SelectItem value="ocean">
                        <SelectItemIndicator />
                        <SelectItemText>Oceanic</SelectItemText>
                      </SelectItem>

                      <SelectItem value="dawn">
                        <SelectItemIndicator />
                        <SelectItemText>Dawn</SelectItemText>
                      </SelectItem>

                      <SelectItem value="ember">
                        <SelectItemIndicator />
                        <SelectItemText>Ember</SelectItemText>
                      </SelectItem>

                      <SelectItem value="violet">
                        <SelectItemIndicator />
                        <SelectItemText>Violet</SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectList>

                  <SelectScrollDownArrow />
                </SelectPopup>
              </SelectPositioner>
            </SelectPortal>
          </Select>

          <FieldDescription>
            Tests grouped items, disabled states, popup positioning, keyboard
            navigation, scroll arrows, and selected item indicators.
          </FieldDescription>
        </Field>

        <Field name="seats">
          <FieldLabel>Seats</FieldLabel>
          <NumberField defaultValue={12} min={1} max={99}>
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label="Decrease seats" />
              <NumberFieldInput aria-label="Seats" />
              <NumberFieldIncrement aria-label="Increase seats" />
            </NumberFieldGroup>
          </NumberField>
          <FieldDescription>Compound stepper input.</FieldDescription>
        </Field>

        <Field name="email" invalid touched>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" defaultValue="broken-email" />
          <FieldDescription>Use a reachable account address.</FieldDescription>
          <FieldError match>Enter a valid email address.</FieldError>
          <FieldValidity>
            {(state: { validity: { valid: boolean | null } }) => (
              <p className="field-validity-note">
                {state.validity.valid === false ? "Invalid" : "Ready"}
              </p>
            )}
          </FieldValidity>
        </Field>

        <Fieldset>
          <FieldsetLegend>Preferences</FieldsetLegend>
          <Field name="updates">
            <FieldItem>
              <Checkbox defaultChecked>Product updates</Checkbox>
              <FieldDescription>
                Receive release notes for new registry items.
              </FieldDescription>
            </FieldItem>
          </Field>
        </Fieldset>

        <div className="field-submit-row">
          <Button size="sm" type="submit">
            Submit fields
          </Button>
          <pre>{submittedFormValues}</pre>
        </div>
      </Form>
    </section>
  )
}
