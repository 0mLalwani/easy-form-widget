import type { formProps } from "./types";

//whole object goes to easy form widget
let form: formProps = {
  fields: [
    // Text validation
    {
      name: "username",
      label: "Username (3–20 characters)",
      type: "text",
      rules: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: "displayName",
      label: "Display name (optional)",
      type: "text",
      rules: {
        required: false,
        minLength: 2,
        maxLength: 40,
      },
    },

    // Email
    {
      name: "email",
      label: "Email address",
      type: "email",
      rules: {
        required: true,
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      },
    },

    // Password
    {
      name: "password",
      label: "Password (8–32 characters)",
      type: "password",
      rules: {
        required: true,
        minLength: 8,
        maxLength: 32,
      },
    },

    // URL
    {
      name: "website",
      label: "Portfolio URL",
      type: "url",
      rules: {
        required: false,
      },
    },

    // Telephone
    {
      name: "phone",
      label: "Phone number (10 digits)",
      type: "tel",
      rules: {
        required: true,
        pattern: "^[0-9]{10}$",
      },
    },

    // Date
    {
      name: "birthDate",
      label: "Date of birth",
      type: "date",
      rules: {
        required: true,
      },
    },

    // Number
    {
      name: "age",
      label: "Age (18–100)",
      type: "number",
      rules: {
        required: true,
        min: 18,
        max: 100,
        step: 1,
      },
    },

    // Select
    {
      name: "country",
      label: "Country",
      type: "select",
      rules: {
        required: true,
      },
      options: [
        { option_name: "", option_label: "Choose a country" },
        { option_name: "IN", option_label: "India" },
        { option_name: "DE", option_label: "Germany" },
        { option_name: "NL", option_label: "Netherlands" },
      ],
    },

    // Radio group
    {
      name: "experience",
      type: "radio",
      rules: {
        required: true,
      },
      options: [
        { radio_value: "beginner", radio_label: "Beginner" },
        { radio_value: "intermediate", radio_label: "Intermediate" },
        { radio_value: "advanced", radio_label: "Advanced" },
      ],
    },

    // Checkbox
    {
      name: "terms",
      label: "I accept the terms and conditions",
      type: "checkbox",
      rules: {
        required: true,
      },
    },

    // Textarea
    {
      name: "bio",
      label: "Short bio (10–200 characters)",
      type: "textarea",
      rules: {
        required: true,
        minLength: 10,
        maxLength: 200,
      },
    },
  ],
  submit_button: {
    handleSubmit: (data, errs) => {
      if (errs) {
        console.log(data, errs);
        return;
      }
      console.log(data);
    },
    label: "Submit",
    labelWhileSubmit: "Ok submitting...",
  },
};
export default form;
