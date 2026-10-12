import { useState } from "react";

// DO NOT MOVE THIS TYPE UP, this guy isnt getting the handle submit, its being passed specific data from the original object via props
type submit_button = {
  isSubmitting: boolean;
  label: string;
  submittingLabel: string;
};
function SubmitButton({ isSubmitting, label, submittingLabel }: submit_button) {
  return (
    <button
      className="rounded-sm border-2 border-zinc-300 px-8 py-4 text-lg font-bold text-zinc-300 hover:animate-spin hover:bg-zinc-800"
      type="submit"
    >
      {isSubmitting ? submittingLabel : label}
    </button>
  );
}

export default SubmitButton;
