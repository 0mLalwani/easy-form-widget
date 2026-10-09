TODO:

- split and clean up code in fieldrenderer.tsx
- add debounce to input onchange
- add submit functionality (w/ throttle & isSubmitting)
- add theming functionality
- add animation & final polishes

## What is this trying to solve?

Writing your own custom validated form from scratch is not easy. This widget aims to keep it simple for the developer while providing built-in validation from the very start.

## What does this package handle?

1. Multiple field Rendering
2. Error UI

### Usage example

```typescript
  <ValidatedForm
    fields={[...array of field objects]},
    submit_button={
      label: "Log In",
      labelWhileSubmit: "Logging In...",
      handleSubmit
      },
  />
```

### Field object structure examples

```typescript
[{
  input_name: "email"
  input_label: "Your Email",
  input_type: email,
  rules: {
    required: true,
    minLength: 8,
    maxLength: 20,
    regex_pattern: \some-regex\
  }
},
{
  input_name: "breakfast_options"
  input_label: "Choose a breakfast",
  input_type: radio,
  input_options: [
    {
      option_name: "pancakes",
      option_label: "Pancakes"
    },
    {
      option_name: "oatmeal",
      option_label: "Oatmeal"
    }
  ]
  rules: {
    required: true,
  }
}]
```

### Supported input types

- text
- textarea
- email
- password
- number
- checkbox
- radio
- select
- date
- url
- tel

### Supported validation rules for each input

- required
- min_length
- max_length
- valid_regex (for each)
