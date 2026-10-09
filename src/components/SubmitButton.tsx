export type submit_button = {
  label: string;
  labelWhileSubmit?: string;
};

function SubmitButton(props: { fields: submit_button }) {
  //gotta show submitting state and set disabled too but need form context for that
  return <button type="submit">{props.fields.label}</button>;
}

export default SubmitButton;
