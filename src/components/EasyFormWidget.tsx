import { useEffect, useState } from "react";
import type { Field, formProps } from "../utils/types";
import FormField from "./FieldRenderer";
import SubmitButton from "./SubmitButton";

function EasyForm({ form }: { form: formProps }) {
  let [isSubmitting, setIsSubmitting] = useState(false);

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
  // main core part of validation engine
  const getErrors = (
    rule: string,
    value: string | number | boolean,
    fieldValue: string | boolean | number,
    fieldType: Field["type"],
  ) => {
    if (rule == "required" && value == true) {
      //gotta handle the boolean check and other strings check seperately
      if (fieldType === "checkbox" && fieldValue !== true) {
        return "Hey you have to check this.";
      }
      if (fieldType !== "checkbox" && fieldValue === "") {
        return "Hey this is required.";
      }
    }
    if (fieldValue === "" && rule !== "required") {
      return;
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
  //this is built for 1 field at a time
  const validateFields = (field: Field, fieldValue: string | boolean) => {
    const fieldErrors: string[] = [];

    for (const [rule, value] of Object.entries(field.rules)) {
      const err = getErrors(rule, value, fieldValue, field.type);

      if (err !== undefined) {
        fieldErrors.push(err);
      }
    }
    setErrorData((prev) => ({
      ...prev,
      [field.name]: fieldErrors,
    }));
    //works and returns only 1 field's errors
    return fieldErrors;
  };

  const handleSubmitClick = (event: React.SubmitEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    //building up errors to submit
    const newErrors: Record<string, string[]> = {};

    for (const field of form.fields) {
      newErrors[field.name] = validateFields(field, formData[field.name]);
    }

    const hasErrors = Object.values(newErrors).some(
      (errors) => errors.length > 0,
    );

    if (hasErrors) {
      form.submit_button.handleSubmit(
        newErrors,
        `we still got some errors there buddy`,
      );
    } else {
      form.submit_button.handleSubmit(formData);
    }
    setIsSubmitting(false);
  };

  //TEST to print on console
  useEffect(() => console.log(formData, errorData), [formData]);

  return (
    <form
      className="flex flex-col items-center gap-2 bg-zinc-700"
      onSubmit={handleSubmitClick}
      noValidate
    >
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
      <SubmitButton
        isSubmitting={isSubmitting}
        label={form.submit_button.label}
        submittingLabel={form.submit_button.labelWhileSubmit}
      />
    </form>
  );
}

export default EasyForm;
