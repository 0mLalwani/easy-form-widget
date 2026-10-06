##### What is this trying to solve?

Writing your own custom validated form from scratch is not easy. This widget aims to keep it simple for the developer while providing built-in validation from the very start.

##### Usage example

```typescript
  <ValidatedForm
    fields={}, //object with types of input to have in ur custom form widget?
    initialValues={}, //placeholder object?
    rules={}, //enter all that apply?
    onSubmit={handleSubmitFn}, //allow dev to handle the submit

    // in-future
    onError={errorPopupFn}
    theme=dark,
    animation=true
  />
```

You have a customized validated form ready to use
