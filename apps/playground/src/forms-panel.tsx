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

        <Field name="style">
          <FieldLabel>Style preset</FieldLabel>
          <Select name="style" defaultValue="default">
            <SelectTrigger>
              <SelectValue placeholder="Choose style" />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectPositioner sideOffset={6}>
                <SelectPopup>
                  <SelectArrow />
                  <SelectList>
                    <SelectGroup>
                      <SelectGroupLabel>Official</SelectGroupLabel>
                      <SelectItem value="default">
                        <SelectItemIndicator />
                        <SelectItemText>Neurex Default</SelectItemText>
                      </SelectItem>
                      <SelectItem value="graphite">
                        <SelectItemIndicator />
                        <SelectItemText>Neurex Graphite</SelectItemText>
                      </SelectItem>
                      <SelectItem value="solar" disabled>
                        <SelectItemIndicator />
                        <SelectItemText>Neurex Solar</SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectList>
                </SelectPopup>
              </SelectPositioner>
            </SelectPortal>
          </Select>
          <FieldDescription>
            Popup, selection, and keyboard behavior.
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
