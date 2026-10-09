type Rules = {
  required?: boolean;
};

type TextRules = Rules & {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};
type NumberRules = Rules & {
  min?: number;
  max?: number;
  step?: number;
};

type TextField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "url" | "tel" | "date";
  rules: TextRules;
};
type NumberField = {
  type: "number";
  name: string;
  label: string;
  rules: NumberRules;
};

type SelectField = {
  type: "select";
  name: string;
  label: string;
  options: {
    option_name: string;
    option_label: string;
  }[];
  rules: Rules;
};

type RadioField = {
  type: "radio";
  name: string;
  options: {
    radio_value: string;
    radio_label: string;
  }[];
  rules: Rules;
};

//other input types
type CheckboxField = {
  type: "checkbox";
  name: string;
  label: string;
  rules: Rules;
};
type TextareaField = {
  type: "textarea";
  name: string;
  label: string;
  rules: TextRules;
};

//final combination
export type Field =
  | TextField
  | NumberField
  | SelectField
  | RadioField
  | CheckboxField
  | TextareaField;
