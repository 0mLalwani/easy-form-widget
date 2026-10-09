import { useEffect, useState, type SubmitEventHandler } from "react";
import type { Field } from "../utils/types";
import FormField from "./FieldRenderer";
import SubmitButton, { type submit_button } from "./SubmitButton";

export type formProps = {
  fields: Field[];
  submit_button: submit_button;
  handleSubmit: SubmitEventHandler;
};

function EasyForm({ form }: { form: formProps }) {
  //set initial form & errors object
  const initialForm: Record<string, string | boolean> = Object.fromEntries(
    form.fields.map((singular_field) => {
      if (singular_field.type == "checkbox") {
        return [singular_field.name, false];
      } else {
        return [singular_field.name, ""];
      }
    }),
  );
  const initialErrors: Record<string, string[]> = Object.fromEntries(
    form.fields.map((singular_field) => {
      return [singular_field.name, []];
    }),
  );
  let [formData, setFormData] = useState(initialForm);
  //errors are updated on change too, BUT validated first time while onblur and onsubmit, then onChange onblur and onsubmit
  let [errorData, setErrorData] = useState(initialErrors);

  //parent sends updateValue function as prop to each child (child calls updateValue onChange)
  const updateValue = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getErrors = (
    rule: string,
    value: string | number | boolean,
    fieldValue: string | boolean | number,
  ) => {
    if (rule == "required") {
      if (fieldValue == "") {
        return "Hey this is required.";
      }
    }
    if (rule == "minLength") {
      if (String(fieldValue).length < Number(value)) {
        return `Minimum required character length is ${value}, you have entered ${String(fieldValue).length}`;
      }
    }
    if (rule == "maxLength") {
      if (String(fieldValue).length > Number(value)) {
        return `Maximum required character length is ${value}, you have entered ${String(fieldValue).length}`;
      }
    }
    if (rule == "pattern") {
      if (!RegExp(String(value)).test(String(fieldValue))) {
        return "Invalid Regex Matched";
      }
    }
    if (rule == "min") {
      if (Number(fieldValue) < Number(value)) {
        return `Minimum value is ${value}`;
      }
    }
    if (rule == "max") {
      if (Number(fieldValue) > Number(value)) {
        return `Maximum value is ${value}`;
      }
    }
  };
  const validateFields = (field: Field, fieldValue: string | boolean) => {
    const fieldErrors: string[] = [];

    for (const [rule, value] of Object.entries(field.rules)) {
      const err = getErrors(rule, value, fieldValue);

      if (err !== undefined) {
        fieldErrors.push(err);
      }
    }
    setErrorData((prev) => ({
      ...prev,
      [field.name]: fieldErrors,
    }));
  };
  //TEST to print on console
  useEffect(() => console.log(formData, errorData), [formData]);

  return (
    <form onSubmit={form.handleSubmit}>
      {form.fields.map((singular_field) => {
        return (
          <FormField
            key={singular_field.name}
            field={singular_field}
            updateFn={updateValue}
            validateFn={validateFields}
            value={formData[singular_field.name]}
            errors={errorData[singular_field.name]}
          />
        );
      })}
      <SubmitButton fields={form.submit_button} />
    </form>
  );
}

export default EasyForm;
